const version = process.env.REACT_APP_VERSION as string

export interface Config {
  version: string
  backgroundIndex: number
  timer: number
}

export const defaultConfig: Config = {
  version,
  backgroundIndex: 1,
  timer: 10 * 1000,
}
