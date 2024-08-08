import React from 'react'
import { EventCalendarContext } from '../providers/event_calendar_provider'

export const useEventCalendar = () => {
  const eventCalendarContext = React.useContext(EventCalendarContext)

  if (!eventCalendarContext) {
    throw new Error('useEventCalendar must be used within a EventCalendarProvider')
  }

  return eventCalendarContext
}
