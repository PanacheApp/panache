import { Button } from '#common/ui/components/button'
import DashboardLayout from '#common/ui/components/dashboard_layout'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#common/ui/components/select'
import { format } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEventCalendar } from '#calendar/ui/hooks/use_event_calendar'
import { CalendarSidebar } from './calendar_sidebar'
import { MonthlyViewCalendar } from './monthly_view'
import { WeeklyViewCalendar } from './week_view'

export const EventCalendar = () => {
  const {
    isWeekView,
    selectedDate,
    setIsWeekView,
    handleNextMonth,
    handlePreviousMonth,
    handleNextWeek,
    handlePreviousWeek,
  } = useEventCalendar()

  return (
    <DashboardLayout
      moduleName="Calendar"
      className="p-0 lg:p-0"
      topChildren={
        <nav className="flex items-center justify-between gap-2 text-xl w-full">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{format(selectedDate, 'MMMM')}</h3>
            <span className="text-lg text-muted-foreground">{format(selectedDate, 'yyyy')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 pr-2 border-r border-gray-100 ">
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 md:hidden lg:flex items-center justify-center p-2 h-8"
                onClick={isWeekView ? handlePreviousWeek : handlePreviousMonth}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="shrink-0 md:hidden lg:flex items-center justify-center p-2 h-8"
                onClick={isWeekView ? handleNextWeek : handleNextMonth}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 md:hidden lg:flex items-center justify-center p-2 h-8"
              >
                <span className="text-sm font-normal">Today</span>
              </Button>

              <Select
                value={isWeekView ? 'weekly' : 'monthly'}
                onValueChange={(value) => setIsWeekView(value === 'weekly')}
              >
                <SelectTrigger className="w-[90px] p-2 h-8">
                  <SelectValue placeholder={isWeekView ? 'Weekly' : 'Monthly'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </nav>
      }
      leftChildren={<CalendarSidebar />}
    >
      {isWeekView ? <WeeklyViewCalendar /> : <MonthlyViewCalendar />}
    </DashboardLayout>
  )
}
