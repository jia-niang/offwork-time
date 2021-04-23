import { set, differenceInMinutes } from 'date-fns'

import { durationToMinutes, minutesToDuration } from '@utils/Duration'

export interface ITime {
  hour: number
  minute: number
}

export interface IDuration {
  hour: number
  minute: number
}

export interface IDayWorkhour {
  begin: ITime
  end: ITime
  hasRest: boolean
  restBegin?: ITime
  restDuration?: IDuration
}

export const defaultWorkhour: IDayWorkhour = {
  begin: { hour: 9, minute: 0 },
  end: { hour: 18, minute: 0 },
  hasRest: true,
  restBegin: { hour: 12, minute: 0 },
  restDuration: { hour: 1, minute: 0 },
}

export const timeToNative = (time: ITime) => new Date(0, 0, 0, time.hour, time.minute, 0, 0)

export const nativeToTime: (p?: Date) => ITime = nativeTime => ({
  hour: nativeTime?.getHours() ?? 0,
  minute: nativeTime?.getMinutes() ?? 0,
})

export function getDayWorkhours(workHour: IDayWorkhour, useMoonRest: boolean = true): IDuration {
  const { begin, end } = workHour
  const diffMins = differenceInMinutes(timeToNative(end), timeToNative(begin))

  const moonRestMins =
    useMoonRest && workHour.hasRest ? durationToMinutes(workHour.restDuration!) : 0

  return minutesToDuration(diffMins - moonRestMins)
}

export function calcLeftWorkhours(workHour: IDayWorkhour, current: Date = new Date()): IDuration {
  const { begin, end } = workHour

  const beginTime = set(current, { hours: begin.hour, minutes: begin.minute })
  const endTime = set(current, { hours: end.hour, minutes: end.minute })

  if (current < beginTime) {
    return { hour: NaN, minute: NaN }
  }

  const diffMins = differenceInMinutes(endTime, current)

  return minutesToDuration(diffMins)
}
