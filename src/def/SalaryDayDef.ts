import { differenceInDays, set, add, startOfDay } from 'date-fns'

import { calcTodayLeftWorkhours, getDailyWorkhours, IDayWorkhour, IDuration } from './DayWorkDef'
import { IWeekendRest } from './WeekendDef'
import calcRestDay from '@utils/CalcRestDay'
import { durationToMinutes, minutesToDuration } from '@utils/Duration'

export enum SalaryDayCalcFn {
  FixDate = '固定日',
  CountBackward = '倒数日',
}

export interface ISalaryDay {
  type: SalaryDayCalcFn
  dateNumber: number
}

export const defaultSalaryDay: ISalaryDay = {
  type: SalaryDayCalcFn.CountBackward,
  dateNumber: 1,
}

export function calcLeftSalaryDay(
  salaryDay: ISalaryDay,
  workHour: IDayWorkhour,
  weekendRest: IWeekendRest,
  current: Date = new Date()
): IDuration {
  const startOfNextDay = startOfDay(set(current, { date: current.getDate() + 1 }))

  const currentMonthSalaryDay = startOfDay(
    set(current, {
      date:
        salaryDay.type === SalaryDayCalcFn.FixDate ? salaryDay.dateNumber : -salaryDay.dateNumber,
    })
  )
  const nextSalaryDay =
    current < currentMonthSalaryDay
      ? currentMonthSalaryDay
      : set(currentMonthSalaryDay, { month: currentMonthSalaryDay.getMonth() + 1 })

  const nextSalaryDayWithWorktime =
    salaryDay.type === SalaryDayCalcFn.FixDate ? nextSalaryDay : add(nextSalaryDay, { days: 1 })

  const todayMinsLeft = Math.max(0, durationToMinutes(calcTodayLeftWorkhours(workHour, current)))
  const dayWorkMins = durationToMinutes(getDailyWorkhours(workHour))
  const leftWorkDays =
    differenceInDays(nextSalaryDayWithWorktime, startOfNextDay) -
    calcRestDay(weekendRest, startOfNextDay, nextSalaryDayWithWorktime)
  const diffMins = leftWorkDays * dayWorkMins + todayMinsLeft

  return minutesToDuration(diffMins)
}
