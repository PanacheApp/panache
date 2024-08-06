import React, { PropsWithChildren, useState } from 'react'

type EventCalendarProviderProps = {
  isWeekView: boolean
  selectedDate: Date
  userTimezone: string
  isNewEventModalOpen: boolean
  eventTitle: string | null
  // eventDescriptionRef: InputRef | null
  // eventLocationRef: InputRef | null
  setIsWeekView: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>
  setIsNewEventModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setEventTitle: React.Dispatch<React.SetStateAction<string | null>>
  handleNextMonth: () => void
  handlePreviousMonth: () => void
  handleNextWeek: () => void
  handlePreviousWeek: () => void
}

const EventCalendarContext = React.createContext<EventCalendarProviderProps>(
  {} as EventCalendarProviderProps
)

// type InputRef = React.RefObject<HTMLInputElement>

export const EventCalendarProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isWeekView, setIsWeekView] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [userTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false)
  const [eventTitle, setEventTitle] = useState<string | null>(null)
  // const eventDescriptionRef = useRef<InputRef | null>(null)
  // const eventLocationRef = useRef<InputRef | null>(null)

  const handleNextMonth = () => {
    const nextMonth = new Date(selectedDate as Date)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    setSelectedDate(nextMonth)
  }

  const handlePreviousMonth = () => {
    const previousMonth = new Date(selectedDate as Date)
    previousMonth.setMonth(previousMonth.getMonth() - 1)
    setSelectedDate(previousMonth)
  }

  const handleNextWeek = () => {
    const nextWeek = new Date(selectedDate as Date)
    nextWeek.setDate(nextWeek.getDate() + 7)
    setSelectedDate(nextWeek)
  }

  const handlePreviousWeek = () => {
    const previousWeek = new Date(selectedDate as Date)
    previousWeek.setDate(previousWeek.getDate() - 7)
    setSelectedDate(previousWeek)
  }

  return (
    <EventCalendarContext.Provider
      value={{
        isWeekView,
        selectedDate,
        userTimezone,
        isNewEventModalOpen,
        eventTitle,
        setIsWeekView,
        setSelectedDate,
        setIsNewEventModalOpen,
        setEventTitle,
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
