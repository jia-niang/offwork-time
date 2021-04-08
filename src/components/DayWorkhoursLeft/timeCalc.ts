import { DayWorkHour, Duration } from '@/def/DayWorkDef'
import { set, differenceInMinutes, differenceInHours } from 'date-fns'

export function calcLeftWorkhours(workHour: DayWorkHour): Duration {
  const now = new Date()
  const { begin, end } = workHour

  const beginTime = set(now, { hours: begin.hour, minutes: begin.minute })
  const endTime = set(now, { hours: end.hour, minutes: end.minute })

  const diffHours = differenceInHours(endTime, now)
  const diffMins = differenceInMinutes(endTime, now) - diffHours * 60

  return { hour: diffHours, minute: diffMins }
}
