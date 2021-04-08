import { useLocalStorageState } from 'ahooks'

import { DayWorkHour, defaultWorkhour } from '@/def/DayWorkDef'

const storageKey = process.env.REACT_APP_WORKHOUR_STORAGE_KEY as string

export default function useWorkhours(): [
  DayWorkHour,
  (p: DayWorkHour) => void
] {
  const [workhour, setWorkhour] = useLocalStorageState(
    storageKey,
    defaultWorkhour
  )

  return [workhour as DayWorkHour, setWorkhour]
}
