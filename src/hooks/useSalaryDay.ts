import { useLocalStorageState } from 'ahooks'

import { ISalaryDay, defaultSalaryDay } from '@/def/SalaryDayDef'

const storageKey = process.env.REACT_APP_SALARYDAY_STORAGE_KEY as string

export default function useSalaryDay(): [ISalaryDay, (p: ISalaryDay) => void] {
  const [salaryDay, setSalaryDay] = useLocalStorageState(storageKey, defaultSalaryDay)

  return [salaryDay as ISalaryDay, setSalaryDay]
}
