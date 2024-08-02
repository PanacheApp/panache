import * as React from 'react'
import DashboardLayout from '#common/ui/components/dashboard_layout'
import { InboxIcon, SendIcon, SquarePenIcon, StickyNoteIcon, Trash2Icon } from 'lucide-react'
import { Button } from '#common/ui/components/button'
import NavItem from '#common/ui/components/nav_item'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#common/ui/components/dialog'
import { Label } from '#common/ui/components/label'
import { Input } from '#common/ui/components/input'
import useUser from '#common/ui/hooks/use_user'
import { Textarea } from '#common/ui/components/textarea'

interface MailsLayoutProps {}

const MailsLayout: React.FunctionComponent<MailsLayoutProps> = () => {
  return (
    <DashboardLayout
      moduleName="Emails"
      topChildren={<p className="font-semibold text-lg">Inbox</p>}
      leftChildren={
        <div className="px-3 pt-1">
          <NewMail />
          <nav className="mt-4 grid gap-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
            <NavItem
              href="/emails/inbox"
              icon={<InboxIcon className="h-4.5 w-4.5" />}
              label="Inbox"
            />
            <NavItem href="/emails/sent" icon={<SendIcon className="h-4.5 w-4.5" />} label="Sent" />
            <NavItem
              href="/emails/drafts"
              icon={<StickyNoteIcon className="h-4.5 w-4.5" />}
              label="Drafts"
            />
            <NavItem
              href="/emails/trash"
              icon={<Trash2Icon className="h-4.5 w-4.5" />}
              label="Trash"
            />
          </nav>
        </div>
      }
    ></DashboardLayout>
  )
}

export default MailsLayout

function NewMail() {
  const user = useUser()
  const [showCc, setShowCc] = React.useState(false)
  const [showBcc, setShowBcc] = React.useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          <SquarePenIcon className="h-4.5 w-4.5" />
          <span>New Mail</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Email</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid grid-cols-[50px_1fr] items-center gap-4">
            <Label htmlFor="from">From</Label>
            <Input
              className="disabled:cursor-default"
              id="from"
              placeholder="From"
              readOnly
              value={user.localPart + '@panache.so'}
              disabled
            />
          </div>
          <div className="grid grid-cols-[50px_1fr] items-center gap-4">
            <Label htmlFor="recipient">To</Label>
            <div className="flex items-center space-x-2">
              <Input id="recipient" placeholder="Recipients" />
              {!showCc && (
                <button
                  className="text-sm text-accent-foreground hover:opacity-75 transition"
                  onClick={() => setShowCc(true)}
                >
                  CC
                </button>
              )}
              {!showBcc && (
                <button
                  className="text-sm text-accent-foreground hover:opacity-75 transition"
                  onClick={() => setShowBcc(true)}
                >
                  BCC
                </button>
              )}
            </div>
          </div>

          {showCc && (
            <div className="grid grid-cols-[50px_1fr] items-center gap-4">
              <Label htmlFor="cc">CC:</Label>
              <Input id="cc" placeholder="CC Recipients" />
            </div>
          )}
          {showBcc && (
            <div className="grid grid-cols-[50px_1fr] items-center gap-4">
              <Label htmlFor="bcc">BCC:</Label>
              <Input id="bcc" placeholder="BCC Recipients" />
            </div>
          )}
          <div className="grid grid-cols-[50px_1fr] items-center gap-4">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Subject" />
          </div>
          <Textarea
            id="body"
            placeholder="Compose your email message here..."
            className="min-h-[200px]"
          />
        </div>

        <DialogFooter className="justify-between sm:justify-between">
          <DialogClose asChild>
            <Button type="reset" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Send</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
