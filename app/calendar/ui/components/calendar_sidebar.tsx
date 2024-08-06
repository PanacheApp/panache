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
import { useEventCalendar } from '#calendar/ui/hooks/use_event_calendar'
import NewEventForm from './new_event_form'

export const CalendarSidebar = () => {
  const { selectedDate, setSelectedDate, isNewEventModalOpen, setIsNewEventModalOpen } =
    useEventCalendar()

  return (
    <aside className="px-3 pt-1 flex flex-col h-full overflow-y-auto">
      <AddEvent isOpen={isNewEventModalOpen} onOpenChange={setIsNewEventModalOpen} />

      <div className="mt-auto mb-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate as any}
          className="text-xs"
        />
      </div>
    </aside>
  )
}

export function AddEvent(props: { isOpen: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline" onClick={() => props.onOpenChange(true)}>
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
