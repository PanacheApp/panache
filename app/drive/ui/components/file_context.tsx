import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
  } from "#common/ui/components/context_menu"
import { PropsWithChildren } from "react"
  
export function FileContextMenu({ children, id, name }: PropsWithChildren<Pick<File, 'id' | 'name'>>) {
  const { value: open, toggle } = useToggle();   
  
  const onDelete = () => {
      router.delete('/drive/file/' + id, {
        onSuccess() {
          toast.success('File deleted successfully.')
        }
      })
  }

  return (
      <>
        <ContextMenu>
          <ContextMenuTrigger asChild>
              {children}
          </ContextMenuTrigger>
          <ContextMenuContent className="w-64">
            <ContextMenuItem onClick={() => toggle()} >
                Rename
            </ContextMenuItem>
            <ContextMenuItem onClick={() => onDelete()} >
                Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <RenameFileModal open={open} toggle={toggle} id={id} name={name} />
      </>
    )
  }
  

import { Button } from "#common/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "#common/ui/components/dialog"
import { Input } from "#common/ui/components/input"
import { useToggle } from "#common/ui/hooks/use_toggle"
import { File } from "#drive/types/file";
import { router, useForm } from "@inertiajs/react";
import { toast } from "sonner";

export function RenameFileModal({ open, toggle, name, id }: { open: boolean; toggle: () => void; name: string; id: string }) {
 
  const form = useForm({
    name
  });
 
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.put('/drive/file/'+ id)
  }
 
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
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
            <Button onClick={() => toggle()} variant='secondary' type="submit">Annuler</Button>
            <Button form="rename-file" type="submit">Rename</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
