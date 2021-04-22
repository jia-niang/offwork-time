import { useLocalStorageState } from 'ahooks'

import { Config, defaultConfig } from '@/def/ConfigDef'

const storageKey = process.env.REACT_APP_CONFIG_STORAGE_KEY as string

export default function useConfig(): [Config, (p: Config) => void] {
  const [config, setConfig] = useLocalStorageState(storageKey, defaultConfig)

  return [config as Config, setConfig]
}
