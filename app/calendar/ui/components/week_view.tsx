import { useWeeklyView } from '#calendar/ui/hooks/use_weekly_view'
import { cn } from '#common/ui/lib/cn'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { format } from 'date-fns'
import { ComponentRef, Fragment, useEffect, useRef, useState } from 'react'

const getTextColorForBackground = (backgroundColor: string) => {
  const calculateRelativeLuminance = (color: any) => {
    const gammaCorrection = (c: number) => {
      const sRGB = c / 255
      return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4)
    }

    const r = gammaCorrection(color.r)
    const g = gammaCorrection(color.g)
    const b = gammaCorrection(color.b)

    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }

  const calculateContrastRatio = (l1: number, l2: number) => {
    const [lDark, lLight] = l1 > l2 ? [l2, l1] : [l1, l2]
    return (lLight + 0.05) / (lDark + 0.05)
  }

  const parseColor = (colorString: string) => {
    const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
    const match = colorString.match(hexRegex)

    if (match) {
      return {
        r: Number.parseInt(match[1], 16),
        g: Number.parseInt(match[2], 16),
        b: Number.parseInt(match[3], 16),
      }
    } else {
      throw new Error('Invalid color format')
    }
  }

  try {
    const bg = parseColor(backgroundColor)
    const bgLuminance = calculateRelativeLuminance(bg)

    const whiteContrast = calculateContrastRatio(bgLuminance, 1)
    const blackContrast = calculateContrastRatio(bgLuminance, 0)

    if (whiteContrast > blackContrast) {
      return 'white'
    } else {
      return 'black'
    }
  } catch (error) {
    return 'black'
  }
}

type DivRef = ComponentRef<'div'>

const participants = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    photo: 'https://example.com/photo.jpg',
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    photo: 'https://example.com/photo.jpg',
  },
]

const events = [
  {
    id: '1',
    title: 'Patrick <> John',
    start: '2024-08-04T06:00',
    end: '2024-08-04T06:30',
    description: 'some description',
    location: 'some location',
    eventColor: '#21bee6',
    organizer: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      photo: 'https://example.com/photo.jpg',
    },
    participants: participants,
  },
  {
    id: '2',
    title: 'Meeting with design team at Disney',
    start: '2024-08-09T07:30',
    end: '2024-08-09T11:45',
    description: 'some description',
    location: 'some location',
    eventColor: '#b32929',
    organizer: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      photo: 'https://example.com/photo.jpg',
    },
    participants: participants,
  },
  {
    id: '3',
    title: 'Flight to Paris',
    start: '2024-08-10T07:30',
    end: '2024-08-10T09:30',
    description: 'some description',
    location: 'some location',
    eventColor: '#f5d0fe',
    organizer: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      photo: 'https://example.com/photo.jpg',
    },
    participants: participants,
  },
]

export const WeeklyViewCalendar = () => {
  const {
    timeSlots,
    weekDays,
    calculatePosition,
    getCurrentTime,
    isNextWeek,
    isLastWeek,
    getGridRowEnd,
    getGridRowStart,
  } = useWeeklyView()

  const {
    isDragging,
    setNodeRef: setDraggable,
    listeners,
    attributes,

    node,
  } = useDraggable({
    id: 'draggable-item',
  })
  const { isOver, setNodeRef: setDroppable } = useDroppable({
    id: 'droppable-item',
  })
  const container = useRef<DivRef>(null)
  const containerNav = useRef<DivRef>(null)
  const containerOffset = useRef<DivRef>(null)
  const [currentPosition, setCurrentPosition] = useState(0)

  useEffect(() => {
    const currentMinute = new Date().getHours() * 60
    if (!container.current || !containerNav.current || !containerOffset.current) return
    container.current.scrollTop =
      ((container?.current.scrollHeight -
        containerNav?.current.offsetHeight -
        containerOffset?.current.offsetHeight) *
        currentMinute) /
      2000
  }, [])

  useEffect(() => {
    const updatePosition = () => {
      const { hours, minutes } = getCurrentTime()
      const position = calculatePosition(hours, minutes)
      setCurrentPosition(position)
    }

    updatePosition()
    const intervalId = setInterval(updatePosition, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div
      ref={container}
      className="isolate flex flex-auto flex-col overflow-x-hidden overflow-y-auto bg-white"
    >
      <div
        style={{ width: '165%' }}
        className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
      >
        <div
          ref={containerNav}
          className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5"
        >
          {/* Mobile view */}
          <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
            {weekDays.map((weekDay) => (
              <button
                key={`${weekDay.day}-${weekDay.date}`}
                type="button"
                className="flex flex-col items-center pb-3 pt-2"
              >
                {weekDay.day.slice(0, 1)}
                <span
                  className={cn(
                    'mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900',
                    weekDay.isToday && 'bg-primary rounded text-primary-foreground',
                    weekDay.isFirstDayOfWeek &&
                      !weekDay.isToday &&
                      'bg-gray-50 rounded text-primary'
                  )}
                >
                  {weekDay.date.getDate()}
                </span>
              </button>
            ))}
          </div>

          <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
            <div className="col-end-1 w-14" />
            {weekDays.map((weekDay) => (
              <div
                key={`${weekDay.day}-${weekDay.date}`}
                className="flex items-center justify-center py-3"
              >
                <span>
                  {weekDay.day}{' '}
                  <span
                    className={cn(
                      'items-center justify-center font-semibold text-gray-900 px-2 py-1 ',
                      weekDay.isToday && 'bg-primary rounded text-primary-foreground',
                      weekDay.isFirstDayOfWeek &&
                        !weekDay.isToday &&
                        'bg-gray-50 px-2 rounded text-primary'
                    )}
                  >
                    {weekDay.date.getDate()}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-auto">
          <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
          <div className="grid flex-auto grid-cols-1 grid-rows-1">
            {/* Horizontal lines */}
            <div
              // ref={setDroppable}
              className={cn(
                'col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100 relative',
                isOver && 'bg-blue-50'
              )}
              style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}
            >
              <div ref={containerOffset} className="row-end-1 h-" />
              {timeSlots.map((timeSlot) => (
                <Fragment key={`${timeSlot.start}`}>
                  <div>
                    <div
                      className={cn(
                        'sticky left-0 z-20 -ml-14 -mt-1 w-14 pr-2 text-right text-xs leading-5 text-gray-400'
                      )}
                    >
                      {format(timeSlot.start, 'h a')}
                    </div>
                  </div>
                  <div />
                </Fragment>
              ))}
              {/* Current time indicator */}
              {currentPosition && (
                <div
                  className="h-[3px] bg-black w-full absolute"
                  style={{ top: `${currentPosition}px` }}
                />
              )}
            </div>

            {/* Vertical lines */}
            <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
              <div className="col-start-1 row-span-full" />
              <div className="col-start-2 row-span-full" />
              <div className="col-start-3 row-span-full" />
              <div className="col-start-4 row-span-full" />
              <div className="col-start-5 row-span-full" />
              <div className="col-start-6 row-span-full" />
              <div className="col-start-7 row-span-full" />
            </div>

            {/* Events */}
            <ol
              className={cn('col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7')}
              style={{ gridTemplateRows: 'repeat(288, minmax(0, 1fr)) auto' }}
            >
              {events.map(
                (event) =>
                  !isLastWeek(new Date(event.start)) &&
                  !isNextWeek(new Date(event.start)) && (
                    <li
                      ref={setDraggable}
                      key={event.id}
                      className="relative sm:col-start-[--colStart] sm:flex"
                      style={
                        {
                          'gridColumnStart': new Date(event.start).getDay() + 1,
                          'gridRow': `${getGridRowStart(event.start)} / span ${getGridRowEnd(event.start, event.end)}`,
                          '--colStart': getGridRowStart(event.start) > 90 ? '8' : '3',
                        } as any
                      }
                      {...attributes}
                      {...listeners}
                    >
                      <a
                        href="#"
                        className="group absolute inset-1 flex flex-col rounded-lg bg-blue-50 p-2 text-xs leading-4 hover:bg-blue-100"
                        style={{ backgroundColor: event.eventColor }}
                      >
                        <p
                          className="order-1 font-semibold text-[--textColor] truncate"
                          style={
                            { '--textColor': getTextColorForBackground(event.eventColor) } as any
                          }
                        >
                          {event.title}
                        </p>
                        <p
                          className="text-[--textColor] group-hover:text-[--textColor]"
                          style={
                            { '--textColor': getTextColorForBackground(event.eventColor) } as any
                          }
                        >
                          <time dateTime={event.start}>{format(event.start, 'h:mm a')}</time>
                        </p>
                      </a>
                    </li>
                  )
              )}
              {/* <li
                className="relative mt-px flex sm:col-start-3 border border-red-300"
                style={{ gridRow: '74 / span 12' }}
              >
                <a
                  href="#"
                  className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
                >
                  <p className="order-1 font-semibold text-blue-700">Breakfast</p>
                  <p className="text-blue-500 group-hover:text-blue-700">
                    <time dateTime="2022-01-12T06:00">6:00 AM</time>
                  </p>
                </a>
              </li>
              <li
                className="relative mt-px flex sm:col-start-3"
                style={{ gridRow: '92 / span 30' }}
              >
                <a
                  href="#"
                  className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100"
                >
                  <p className="order-1 font-semibold text-pink-700">Flight to Paris</p>
                  <p className="text-pink-500 group-hover:text-pink-700">
                    <time dateTime="2022-01-12T07:30">7:30 AM</time>
                  </p>
                </a>
              </li>
              <li
                className="relative mt-px hidden sm:col-start-6 sm:flex"
                style={{ gridRow: '122 / span 24' }}
              >
                <a
                  href="#"
                  className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs leading-5 hover:bg-gray-200"
                >
                  <p className="order-1 font-semibold text-gray-700">
                    Meeting with design team at Disney
                  </p>
                  <p className="text-gray-500 group-hover:text-gray-700">
                    <time dateTime="2022-01-15T10:00">10:00 AM</time>
                  </p>
                </a>
              </li> */}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
