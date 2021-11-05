import { isSaturday, isSunday, nextSaturday, nextSunday } from 'date-fns'

import { IWeekendRest, WeekRestType } from '@/def/WeekendDef'

function calcRestDay(weekendRest: IWeekendRest, start: Date, end: Date): number {
  let satCount = 0
  let sunCount = 0
  let date = null

  for (date = start; date < end; date = nextSaturday(date)) {
    if (isSaturday(date)) {
      ++satCount
    }
  }

  for (date = start; date < end; date = nextSunday(date)) {
    if (isSunday(date)) {
      ++sunCount
    }
  }

  return {
    [WeekRestType.Double]: satCount + sunCount,
    [WeekRestType.SingleAtSat]: satCount,
    [WeekRestType.SingleAtSun]: sunCount,
  }[weekendRest.type]
}

export default calcRestDay
