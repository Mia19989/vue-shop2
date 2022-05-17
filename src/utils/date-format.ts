import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

// 让dayjs支持utc转换
dayjs.extend(utc)

// 默认转化成的format格式
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export default function formatUtcSring(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.utc(utcString).format(format)
}
