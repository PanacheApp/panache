
import { Button } from "#common/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "#common/ui/components/dialog"
import { Input } from "#common/ui/components/input"
import { useForm } from "@inertiajs/react";

type Props= { open: boolean; toggle: () => void; name: string; id: string }

export function RenameFileModal({ open, toggle, name, id }: Props) {
  
  const form = useForm({
    name
  });
 
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.put('/drive/file/'+ id)
  }
 
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]" hideCloseButton>
        <DialogHeader>
          <DialogTitle>Rename {name}</DialogTitle>
        </DialogHeader>
          <form id="rename-file" onSubmit={onSubmit} className="">
            <Input
              id="name"
              defaultValue={name}
              value={form.data.name}
              onChange={(e) => form.setData('name', e.target.value)}
            />
          </form>
        <DialogFooter>
          <div className="space-x-2.5">
            <Button onClick={() => toggle()} variant='secondary' type="submit">Cancel</Button>
            <Button form="rename-file" type="submit">Rename</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
