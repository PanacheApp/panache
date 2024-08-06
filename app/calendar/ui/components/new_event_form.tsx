import { Button } from '#common/ui/components/button'
import { Calendar } from '#common/ui/components/calendar'
import { Input } from '#common/ui/components/input'
import { Popover, PopoverContent, PopoverTrigger } from '#common/ui/components/popover'
import { cn } from '#common/ui/lib/cn'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import * as React from 'react'

const NewEventForm = () => {
  return (
    <div className="grid gap-4 py-4">
      <Input id="name" value="Pedro Duarte" className="col-span-3" placeholder="Event title" />
      <DatePickerDemo />
    </div>
  )
}

export default NewEventForm

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'min-w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          className="w-full p-1 pt-3"
        />
      </PopoverContent>
    </Popover>
  )
}
