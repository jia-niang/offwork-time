import { useLocalStorageState } from 'ahooks'

import { IDayWorkhour, defaultWorkhour } from '@/def/DayWorkDef'

const storageKey = process.env.REACT_APP_WORKHOUR_STORAGE_KEY as string

export default function useWorkhours(): [IDayWorkhour, (p: IDayWorkhour) => void] {
  const [workhour, setWorkhour] = useLocalStorageState(storageKey, defaultWorkhour)

  return [workhour as IDayWorkhour, setWorkhour]
}
