import { set, differenceInDays, nextSaturday, nextSunday, startOfDay } from 'date-fns'

import { calcTodayLeftWorkhours, IDayWorkhour, getDailyWorkhours, IDuration } from '@def/DayWorkDef'
import { durationToMinutes, minutesToDuration } from '@utils/Duration'

export enum WeekRestType {
  Double = '双休',
  SingleAtSat = '周六单休',
  SingleAtSun = '周日单休',
}

export interface IWeekendRest {
  type: WeekRestType
}

export const defaultWeekendRest: IWeekendRest = {
  type: WeekRestType.Double,
}

export const nextWeekendMap: Record<WeekRestType, (p: Date) => Date> = {
  [WeekRestType.Double]: nextSaturday,
  [WeekRestType.SingleAtSat]: nextSaturday,
  [WeekRestType.SingleAtSun]: nextSunday,
}

export function calcLeftWeekend(
  restType: WeekRestType,
  workHour: IDayWorkhour,
  current: Date = new Date()
): IDuration {
  const startOfNextDay = startOfDay(set(current, { date: current.getDate() + 1 }))
  const nextWeekend = nextWeekendMap[restType](current)
  const nextWeekendBegin = set(nextWeekend, {
    hours: workHour.begin.hour,
    minutes: workHour.begin.minute,
  })

  const todayMinsLeft = Math.max(0, durationToMinutes(calcTodayLeftWorkhours(workHour)))
  const dayWorkMins = durationToMinutes(getDailyWorkhours(workHour))

  const diffMins = differenceInDays(nextWeekendBegin, startOfNextDay) * dayWorkMins + todayMinsLeft

  return minutesToDuration(diffMins)
}
