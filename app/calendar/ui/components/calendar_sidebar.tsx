import { Button } from '#common/ui/components/button'
import { Calendar } from '#common/ui/components/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#common/ui/components/dialog'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import NewEventForm from './new_event_form'

export const CalendarSidebar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <aside className="px-3 pt-1 flex flex-col h-full overflow-y-auto">
      <AddEvent />

      <div className="mt-auto mb-4">
        <Calendar mode="single" selected={date} onSelect={setDate} className="text-xs" />
      </div>
    </aside>
  )
}

export function AddEvent() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          <PlusIcon className="h-4.5 w-4.5" />
          <span>Add Event</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
          <DialogDescription>Add a new event to your calendar.</DialogDescription>
        </DialogHeader>
        <NewEventForm />
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
