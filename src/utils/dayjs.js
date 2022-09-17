import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
const duration = require('dayjs/plugin/duration')
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
dayjs.extend(duration)
export default dayjs
