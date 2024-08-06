import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '#common/ui/components/context_menu'
import { cn } from '#common/ui/lib/cn'
import { isSameDay } from 'date-fns'
import { useMemo } from 'react'
import { useMonthlyView } from '../hooks/use_monthly_view'
import { useEventCalendar } from '../providers/event_calendar_provider'

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const MonthlyViewCalendar = () => {
  const { setIsNewEventModalOpen, eventTitle, setSelectedDate } = useEventCalendar()
  const { allDays, setClickedDayIndex } = useMonthlyView()

  const newEventActions = useMemo(
    () => [
      { label: 'Duplicate', onClick: () => console.log('Duplicate') },
      { label: 'Export', onClick: () => console.log('Export') },
      { label: 'Delete', onClick: () => console.log('Delete') },
    ],
    []
  )

  const addNewEvent = (date: Date, dayIndex: number) => {
    setSelectedDate(date)
    setClickedDayIndex(dayIndex)
    setIsNewEventModalOpen(true)
  }

  const navigateToWeek = (date: Date, weekIndex: number) => {
    // TODO: Navigate to weekly view
    console.log(date, weekIndex)
  }

  return (
    <div className="h-full">
      <div className="grid grid-cols-7 gap-2 border-b">
        {days.map((day, index) => (
          <div key={index} className="col-span-1 flex items-center justify-center py-2">
            <h3 className="text-center text-sm font-semibold uppercase">{day}</h3>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 grid-rows-[repeat(6,minmax(0vh,14.8vh))] overflow-hidden">
        {allDays.map((day, index) => (
          <div
            key={`${day.day}-${index}`}
            className="col-span-1 row-span-1 relative  border-b border-r"
          >
            <div
              className="flex justify-end h-full w-full"
              onClick={() => addNewEvent(day.date, index)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateToWeek(day.date, index)
                }}
                className={cn(
                  'text-center text-sm font-semibold uppercase self-start pt-[1.5px] m-2 h-6 w-6 rounded-full',
                  isSameDay(new Date(), day.date)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {day.day}
              </button>
            </div>
            {day.isModalOpen && (
              <ContextMenu>
                <ContextMenuTrigger
                  onClick={() => {
                    setSelectedDate(day.date)
                    setIsNewEventModalOpen(true)
                  }}
                >
                  <div className="bg-primary text-primary-foreground absolute top-10 left-2 right-2 px-2 flex items-center rounded cursor-pointer">
                    <small>{eventTitle || 'Untitled event'}</small>
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
