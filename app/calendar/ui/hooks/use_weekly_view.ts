import { DAYS_IN_WEEK, HOUR_HEIGHT } from '#calendar/constants/index'
import { isToday } from 'date-fns'
import { useMemo } from 'react'
import { useEventCalendar } from './use_event_calendar'

export const useWeeklyView = () => {
  const { selectedDate } = useEventCalendar()

  const getStartOfWeek = (date: Date) => {
    const startOfWeek = new Date(date)
    const dayOfWeek = startOfWeek.getDay() // 0 (Sunday) to 6 (Saturday)
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek)
    startOfWeek.setHours(0, 0, 0, 0)
    return startOfWeek
  }

  const getEndOfWeek = (startOfWeek: Date) => {
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)
    return endOfWeek
  }

  const isDateInRange = (date: Date, start: Date, end: Date) => {
    return date >= start && date <= end
  }

  const startOfWeek = getStartOfWeek(selectedDate)

  const weekDays = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startOfWeek)
        date.setDate(startOfWeek.getDate() + i)

        return {
          day: DAYS_IN_WEEK[date.getDay()],
          date: date,
          isToday: isToday(date),
          isFirstDayOfWeek: date.getDay() === 0,
        }
      }),
    [selectedDate]
  )

  const timeSlots = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        const start = new Date(selectedDate)
        start.setHours(i)

        return { start }
      }),
    [selectedDate]
  )

  const getCurrentTime = () => {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    return { hours, minutes }
  }

  const calculatePosition = (hours: number, minutes: number) => {
    const hourHeight = HOUR_HEIGHT * 2
    return hours * hourHeight + 1 + (minutes / 60) * hourHeight
  }

  const isLastWeek = (date: Date) => {
    const currentDate = new Date()
    const startOfCurrentWeek = getStartOfWeek(currentDate)

    const startOfLastWeek = new Date(startOfCurrentWeek)
    startOfLastWeek.setDate(startOfCurrentWeek.getDate() - 7)
    const endOfLastWeek = getEndOfWeek(startOfLastWeek)

    const dateToCheck = new Date(date)
    return isDateInRange(dateToCheck, startOfLastWeek, endOfLastWeek)
  }

  const isNextWeek = (date: Date) => {
    const currentDate = new Date()
    const startOfCurrentWeek = getStartOfWeek(currentDate)

    const startOfNextWeek = new Date(startOfCurrentWeek)
    startOfNextWeek.setDate(startOfCurrentWeek.getDate() + 7)
    const endOfNextWeek = getEndOfWeek(startOfNextWeek)

    const dateToCheck = new Date(date)
    return isDateInRange(dateToCheck, startOfNextWeek, endOfNextWeek)
  }

  const getGridRowEnd = (startDate: string, endDate: string) => {
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()
    const differenceMs = end - start
    const gridRowEnd = Math.round(differenceMs / (1000 * 60))
    return Math.ceil(gridRowEnd * 6) / 30
  }

  const getGridRowStart = (startDate: string) => {
    const DIVIDER = 4.95
    const start = new Date(startDate)
    const hours = start.getHours()
    const minutes = start.getMinutes()
    const totalMinutes = hours * 60 + minutes
    const gridRowStart = Math.round(totalMinutes / DIVIDER)

    return gridRowStart
  }

  return {
    weekDays,
    timeSlots,
    isNextWeek,
    isLastWeek,
    getGridRowEnd,
    getCurrentTime,
    getGridRowStart,
    calculatePosition,
  }
}
