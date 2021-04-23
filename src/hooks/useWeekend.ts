import { useLocalStorageState } from 'ahooks'

import { IWeekendRest, defaultWeekendRest } from '@def/WeekendDef'

const storageKey = process.env.REACT_APP_WEEKEND_STORAGE_KEY as string

export default function useWeekendRest(): [IWeekendRest, (p: IWeekendRest) => void] {
  const [weekendRest, setWeekendRest] = useLocalStorageState(storageKey, defaultWeekendRest)

  return [weekendRest as IWeekendRest, setWeekendRest]
}
