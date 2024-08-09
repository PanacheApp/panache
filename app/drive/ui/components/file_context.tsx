import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "#common/ui/components/context_menu"
import { PropsWithChildren } from "react"
import { useToggle } from "#common/ui/hooks/use_toggle";
import { router, useForm } from "@inertiajs/react";
import { RenameFileModal } from "./rename_file_modal";
import { File } from "#drive/types/file";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "#common/ui/components/dialog";
import { Button } from "#common/ui/components/button";

type Props = PropsWithChildren<Pick<File, 'id' | 'name'>>;

export function FileContextMenu({ children, id, name }: Props) {
  const { value: open, toggle } = useToggle(); 
  const { value: openCloseModal, toggle: toggleCloseModal } = useToggle(); 
  
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
            <ContextMenuItem onClick={() => toggleCloseModal()} >
                Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <ConfirmDeleteModal open={openCloseModal} toggle={toggleCloseModal} id={id} name={name}  />
        <RenameFileModal open={open} toggle={toggle} id={id} name={name} />
      </>
    )
  }
  
  type ConfirmDeleteModalProps = { open: boolean; toggle: () => void; name: string; id: string }

function ConfirmDeleteModal({ open, toggle, name, id }: ConfirmDeleteModalProps) {
  const form = useForm();
  const onDelete = (e: React.FormEvent) => {
    e.preventDefault();
    form.delete('/drive/file/' + id)
  }

  return <Dialog open={open}>
    <DialogContent className="sm:max-w-[425px]" hideCloseButton>
    <DialogHeader>
          <DialogTitle>Send {name} to trash ?</DialogTitle>
          <DialogDescription>This document and all children will be moved to trash.</DialogDescription>
        </DialogHeader>
         
        <DialogFooter>
          <div className="space-x-2">
            <Button onClick={() => toggle()} variant='outline' type="submit">Cancel</Button>
            <form onSubmit={onDelete} className="inline">
              <Button type="submit" variant='destructive'>Trash</Button>
            </form>
          </div>
        </DialogFooter>
    </DialogContent>
  </Dialog>
}
