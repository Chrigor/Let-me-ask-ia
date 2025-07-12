import lib from 'dayjs'
import locale from 'dayjs/locale/pt-BR'
import relativeTime from 'dayjs/plugin/relativeTime'

lib.locale(locale)
lib.extend(relativeTime)

export const dayjs = lib
