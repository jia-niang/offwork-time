import { IDuration } from '@/def/DayWorkDef'

export const durationToMinutes: (duration: IDuration) => number = duration =>
  duration.hour * 60 + duration.minute

export const minutesToDuration: (mins: number) => IDuration = mins => ({
  hour: Math.floor(mins / 60),
  minute: mins % 60,
})

export const diffDuration: (left: IDuration, right: IDuration) => IDuration = (left, right) =>
  minutesToDuration(left.hour * 60 + left.minute - (right.hour * 60 + right.minute))
