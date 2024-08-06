import React from 'react'
import { EventCalendar } from '../components/event_calendar'
import { EventCalendarProvider } from '../providers/event_calendar_provider'

const CalendarPage = () => {
  return (
    <EventCalendarProvider>
      <EventCalendar />
    </EventCalendarProvider>
  )
}

export default CalendarPage
