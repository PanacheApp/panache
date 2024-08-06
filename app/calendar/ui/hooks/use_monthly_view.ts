import { useEventCalendar } from '#calendar/ui/providers/event_calendar_provider'

import { useState } from 'react'

const ROWS_TO_SHOW = 6

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
const getOverflowDates = (daysInMonth: number, overflow: number) =>
  Array.from({ length: overflow }, (_, i) => daysInMonth - overflow + i + 1)

export const useMonthlyView = () => {
  const { selectedDate } = useEventCalendar()
  const [clickedDayIndex, setClickedDayIndex] = useState<number | null>(null)

  const month = selectedDate.getMonth()
  const year = selectedDate.getFullYear()

  // Dates calculations
  const daysInCurrentMonth = getDaysInMonth(year, month)
  const daysInPrevMonth = getDaysInMonth(year, month - 1)

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const lastDayOfMonth = new Date(year, month + 1, 0).getDay()

  const firstWeekOverflow = firstDayOfMonth === 0 ? ROWS_TO_SHOW : firstDayOfMonth - 1
  const lastWeekOverflow = lastDayOfMonth === 0 ? 0 : ROWS_TO_SHOW - lastDayOfMonth

  const firstWeekOverflowDates = getOverflowDates(daysInPrevMonth, firstWeekOverflow + 1)
  const lastWeekOverflowDates = Array.from({ length: lastWeekOverflow }, (_, i) => i + 1)
  const currentMonthDays = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1)

  const totalDays =
    firstWeekOverflowDates.length + currentMonthDays.length + lastWeekOverflowDates.length
  const remainingDays = 42 - totalDays

  const fullLastWeekOverflowDates = lastWeekOverflowDates.concat(
    Array.from({ length: remainingDays }, (_, i) => lastWeekOverflow + i + 1)
  )

  const allDays = [
    ...firstWeekOverflowDates,
    ...currentMonthDays,
    ...fullLastWeekOverflowDates,
  ].map((day, index) => {
    let monthToUse = month

    if (index < firstWeekOverflowDates.length) {
      monthToUse = month - 1
    } else if (index >= firstWeekOverflowDates.length + currentMonthDays.length) {
      monthToUse = month + 1
    }

    // safe guard to prevent overflow
    monthToUse = (monthToUse + 12) % 12

    return {
      day,
      date: new Date(year, monthToUse, day),
      isModalOpen: clickedDayIndex === index,
    }
  })

  return {
    allDays,
    setClickedDayIndex,
  }
}
