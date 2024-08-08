import { DndContext } from '@dnd-kit/core'
import { EventCalendar } from '../components/event_calendar'
import { EventCalendarProvider } from '../providers/event_calendar_provider'

const CalendarPage = () => {
  return (
    <DndContext>
      <EventCalendarProvider>
        <EventCalendar />
      </EventCalendarProvider>
    </DndContext>
  )
}

export default CalendarPage
