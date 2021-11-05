import * as React from 'react'
import { PickerTimeProps } from 'antd/es/date-picker/generatePicker'

import DatePicker from './DatePicker'

export interface TimePickerProps
  extends Omit<PickerTimeProps<Date>, 'picker'> {}

const TimePicker = React.forwardRef<any, TimePickerProps>((props, ref) => {
  return <DatePicker {...props} picker="time" ref={ref} />
})

TimePicker.displayName = 'TimePicker'

export default TimePicker
