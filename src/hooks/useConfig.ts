import { useLocalStorageState } from 'ahooks'

import { IConfig, defaultConfig } from '@def/ConfigDef'

const storageKey = process.env.REACT_APP_CONFIG_STORAGE_KEY as string

export default function useConfig(): [IConfig, (p: IConfig) => void] {
  const [config, setConfig] = useLocalStorageState(storageKey, defaultConfig)

  return [config as IConfig, setConfig]
}
