import dayFnsGenerateConfig from 'rc-picker/lib/generate/dateFns'
import generateCalendar from 'antd/es/calendar/generateCalendar'
import 'antd/es/calendar/style'

const Calendar = generateCalendar<Date>(dayFnsGenerateConfig)

export default Calendar
