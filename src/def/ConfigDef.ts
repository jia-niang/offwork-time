const version = process.env.REACT_APP_VERSION as string

export interface IConfig {
  version: string
  backgroundIndex: number
  timer: number
}

export const defaultConfig: IConfig = {
  version,
  backgroundIndex: 1,
  timer: 10 * 1000,
}
