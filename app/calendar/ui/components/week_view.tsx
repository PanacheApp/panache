import { cn } from '#common/ui/lib/cn'
import { format } from 'date-fns'
import { Fragment, useEffect, useRef } from 'react'
import { useEventCalendar } from '../providers/event_calendar_provider'

export const WeeklyViewCalendar = () => {
  const { selectedDate } = useEventCalendar()
  const container = useRef(null)
  const containerNav = useRef(null)
  const containerOffset = useRef(null)

  // Generate week days with the date
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Calculate the start of the week based on the selected date
  const startOfWeek = new Date(selectedDate)
  startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay())

  const today = new Date()

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: date.getMonth() + 1, // Month is 0-based, so add 1
      year: date.getFullYear(),
      isToday:
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear(),
      isFirstDayOfWeek: date.getDay() === 0,
    }
  })

  // time from 00:00 to 23:59 on the selected date
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const start = new Date(selectedDate)
    start.setHours(i)
    start.setMinutes(0)
    start.setSeconds(0)

    const end = new Date(selectedDate)
    end.setHours(i + 1)
    end.setMinutes(0)
    end.setSeconds(0)

    return {
      start,
      end,
    }
  })


  useEffect(() => {
    // Set the container scroll position based on the current time.
    const currentMinute = new Date().getHours() * 60
    if (!container.current || !containerNav.current || !containerOffset.current) return
    container.current.scrollTop =
      ((container?.current.scrollHeight -
        containerNav?.current.offsetHeight -
        containerOffset?.current.offsetHeight) *
        currentMinute) /
      1440
  }, [])

  return (
    <div ref={container} className="isolate flex flex-auto flex-col overflow-auto bg-white">
      <div
        style={{ width: '165%' }}
        className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
      >
        <div
          ref={containerNav}
          className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5"
        >
          <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
            {weekDays.map((day) => (
              <button
                key={`${day.day}-${day.date}`}
                type="button"
                className="flex flex-col items-center pb-3 pt-2"
              >
                {day.day.slice(0, 1)}
                <span
                  className={cn(
                    'mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900',
                    day.isToday && 'bg-primary rounded text-primary-foreground',
                    day.isFirstDayOfWeek && !day.isToday && 'bg-gray-50 rounded text-primary'
                  )}
                >
                  {day.date}
                </span>
              </button>
            ))}
          </div>

          <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
            <div className="col-end-1 w-14" />
            {weekDays.map((day) => (
              <div key={`${day.day}-${day.date}`} className="flex items-center justify-center py-3">
                <span>
                  {day.day}{' '}
                  <span
                    className={cn(
                      'items-center justify-center font-semibold text-gray-900 px-2 py-1 ',
                      day.isToday && 'bg-primary rounded text-primary-foreground',
                      day.isFirstDayOfWeek && !day.isToday && 'bg-gray-50 px-2 rounded text-primary'
                    )}
                  >
                    {day.date}
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
              className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
              style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}
            >
              <div ref={containerOffset} className="row-end-1 h-7"></div>
              {timeSlots.map((timeSlot) => (
                <Fragment key={`${timeSlot.start}-${timeSlot.end}`}>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      {format(timeSlot.start, 'h a')}
                    </div>
                  </div>
                  <div />
                </Fragment>
              ))}
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
              {/* <div className="col-start-8 row-span-full w-8" /> */}
            </div>

            {/* Events */}
            <ol
              className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7"
              style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}
            >
              <li
                className="relative mt-px flex sm:col-start-3"
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
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

/*
     {/* <div className="grid grid-cols-8 gap-2">
        <div className="col-span-1 flex items-center justify-center sticky top-0">
          <ComboboxDemo />
        </div>
        {weekDays.map((day, index) => (
          <div key={index} className="col-span-1 flex items-center justify-center sticky top-0">
            <h3
              className={cn(
                'text-center text-sm py-1 font-semibold uppercase',
                day.isToday && 'bg-primary px-2 rounded text-primary-foreground',
                day.isFirstDayOfWeek && !day.isToday && 'bg-gray-50 px-2 rounded text-primary'
              )}
            >
              {day.day} {day.date}
            </h3>
          </div>
        ))}
      </div> 
      {/* <div className="col-span-1 gap-2">
        {timeSlots.map((timeSlot, index) => (
          <div key={index} className="col-span-1 flex items-center justify-center py-2">
            <h3 className="text-center text-sm font-semibold uppercase">
              {format(timeSlot.start, 'HH:mm')}
            </h3>
          </div>
        ))}
      </div>

*/
