export interface Time {
  hour: number
  minute: number
}

export interface Duration {
  hour: number
  minute: number
}

export interface DayWorkHour {
  begin: Time
  end: Time
  hasRest: boolean
  restBegin?: Time
  restDuration?: Duration
}

export const defaultWorkhour: DayWorkHour = {
  begin: { hour: 9, minute: 0 },
  end: { hour: 18, minute: 0 },
  hasRest: true,
  restBegin: { hour: 12, minute: 0 },
  restDuration: { hour: 1, minute: 0 },
}

export const timeToNative = (time: Time) =>
  new Date(0, 0, 0, time.hour, time.minute, 0, 0)

export const nativeToTime: (p?: Date) => Time = nativeTime => ({
  hour: nativeTime?.getHours() ?? 0,
  minute: nativeTime?.getMinutes() ?? 0,
})
