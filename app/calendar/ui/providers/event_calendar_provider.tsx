import React, { PropsWithChildren, useState } from 'react'

type EventCalendarProviderProps = {
  isWeekView: boolean
  selectedDate: Date
  userTimezone: string
  setIsWeekView: (isWeekView: boolean) => void
  setSelectedDate: (selectedDate: Date) => void
  handleNextMonth: () => void
  handlePreviousMonth: () => void
  handleNextWeek: () => void
  handlePreviousWeek: () => void
}

const EventCalendarContext = React.createContext<EventCalendarProviderProps>(
  {} as EventCalendarProviderProps
)

export const EventCalendarProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isWeekView, setIsWeekView] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [userTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)

  const handleNextMonth = () => {
    const nextMonth = new Date(selectedDate)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    setSelectedDate(nextMonth)
  }

  const handlePreviousMonth = () => {
    const previousMonth = new Date(selectedDate)
    previousMonth.setMonth(previousMonth.getMonth() - 1)
    setSelectedDate(previousMonth)
  }

  const handleNextWeek = () => {
    const nextWeek = new Date(selectedDate)
    nextWeek.setDate(nextWeek.getDate() + 7)
    setSelectedDate(nextWeek)
  }

  const handlePreviousWeek = () => {
    const previousWeek = new Date(selectedDate)
    previousWeek.setDate(previousWeek.getDate() - 7)
    setSelectedDate(previousWeek)
  }

  return (
    <EventCalendarContext.Provider
      value={{
        isWeekView,
        selectedDate,
        userTimezone,
        setIsWeekView,
        setSelectedDate,
        handleNextMonth,
        handlePreviousMonth,
        handleNextWeek,
        handlePreviousWeek,
      }}
    >
      {children}
    </EventCalendarContext.Provider>
  )
}

export const useEventCalendar = () => {
  if (!EventCalendarContext) {
    throw new Error('useEventCalendar must be used within a EventCalendarProvider')
  }

  return React.useContext(EventCalendarContext)
}
