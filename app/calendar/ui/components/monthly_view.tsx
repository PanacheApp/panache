import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '#common/ui/components/context_menu'
import { cn } from '#common/ui/lib/cn'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { isToday } from 'date-fns'
import { useState } from 'react'
import { useEventCalendar } from '../providers/event_calendar_provider'

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const newEventActions = [
  { label: 'Duplicate', onClick: () => console.log('Duplicate') },
  { label: 'Export', onClick: () => console.log('Export') },
  { label: 'Delete', onClick: () => console.log('Delete') },
]

export const MonthlyViewCalendar = () => {
  const { isOver, node, setNodeRef } = useDroppable({
    id: 'droppable',
  })
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
  } = useDraggable({
    id: 'draggable',
  })
  const { selectedDate, setIsNewEventModalOpen } = useEventCalendar()
  const [clickedDayIndex, setClickedDayIndex] = useState<number | null>(null)

  const month = selectedDate.getMonth()
  const year = selectedDate.getFullYear()

  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const currentMonthDays = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1)

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)

  const firstDayOfWeek = firstDayOfMonth.getDay()
  const lastDayOfWeek = lastDayOfMonth.getDay()

  // Overflow days calculation
  const firstWeekOverflow = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1
  const lastWeekOverflow = lastDayOfWeek === 0 ? 0 : 6 - lastDayOfWeek

  // Dates for first week overflow
  const firstWeekOverflowDates = Array.from(
    { length: firstWeekOverflow },
    (_, i) => daysInPrevMonth - firstWeekOverflow + i + 1
  )

  // Dates for last week overflow
  const lastWeekOverflowDates = Array.from({ length: lastWeekOverflow }, (_, i) => i + 1)

  // Calculate total number of days to display (including overflows)
  const totalDays =
    firstWeekOverflowDates.length + currentMonthDays.length + lastWeekOverflowDates.length
  const remainingDays = 42 - totalDays

  // Add remaining days from the next month to fill the 6 rows
  const fullLastWeekOverflowDates = lastWeekOverflowDates.concat(
    Array.from({ length: remainingDays }, (_, i) => lastWeekOverflow + i + 1)
  )

  const allDays = [
    ...firstWeekOverflowDates,
    ...currentMonthDays,
    ...fullLastWeekOverflowDates,
  ].map((day, index) => ({
    day,
    date: new Date(year, month, day),
    openModal: clickedDayIndex === index,
  }))

  const addNewEvent = (dayIndex: number) => {
    setClickedDayIndex(dayIndex)
    setIsNewEventModalOpen(true)
  }


  return (
    <div className="h-full">
      <div className="grid grid-cols-7 gap-2 border rounded-t">
        {days.map((day, index) => (
          <div key={index} className="col-span-1 flex items-center justify-center py-2">
            <h3 className="text-center text-sm font-semibold uppercase">{day}</h3>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 grid-rows-[repeat(6,minmax(14.2vh,7vh))] border-l rounded-b overflow-hidden">
        {allDays.map((day, index) => (
          <div className="col-span-1 row-span-1 relative" ref={setNodeRef}>
            <div
              key={index}
              className="flex justify-end h-full w-full border-b border-r last:rounded-b"
              onClick={() => addNewEvent(index)}
            >
              <h3
                className={cn(
                  'text-center text-sm font-semibold uppercase self-start pt-[1.5px] m-2 h-6 w-6 rounded-full',
                  isToday(day.date) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                )}
              >
                {day.day}
              </h3>
            </div>
            {day.openModal && (
              <ContextMenu>
                <ContextMenuTrigger>
                  <div
                    ref={setDraggableRef}
                    {...listeners}
                    {...attributes}
                    className="bg-primary text-primary-foreground absolute top-10 left-3 right-3 px-2 flex items-center rounded"
                  >
                    <small>New Event</small>
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  {newEventActions.map((action) => (
                    <ContextMenuItem key={action.label} onClick={action.onClick}>
                      {action.label}
                    </ContextMenuItem>
                  ))}
                </ContextMenuContent>
              </ContextMenu>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
