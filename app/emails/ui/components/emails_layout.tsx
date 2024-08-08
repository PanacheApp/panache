import * as React from 'react'
import DashboardLayout from '#common/ui/components/dashboard_layout'
import {
  InboxIcon,
  LoaderIcon,
  SendIcon,
  SquarePenIcon,
  StickyNoteIcon,
  Trash2Icon,
} from 'lucide-react'
import { Button } from '#common/ui/components/button'
import NavItem from '#common/ui/components/nav_item'
import { useForm } from '@inertiajs/react'
import usePageProps from '#common/ui/hooks/use_page_props'

interface EmailsLayoutProps extends React.PropsWithChildren {
  topChildren?: React.ReactNode
}

const EmailsLayout: React.FunctionComponent<EmailsLayoutProps> = ({ children, topChildren }) => {
  const pageProps = usePageProps<{
    draftsCount: string
    inboxCount: string
  }>()
  return (
    <DashboardLayout
      className=" lg:!gap-4 lg:!p-4"
      topChildren={topChildren}
      moduleName="Emails"
      leftChildren={
        <div className="px-3 pt-1">
          <NewMail />
          <nav className="mt-4 grid gap-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
            <NavItem
              href="/emails/inbox"
              icon={<InboxIcon className="h-4.5 w-4.5" />}
              label="Inbox"
              count={pageProps.inboxCount}
            />
            <NavItem href="/emails/sent" icon={<SendIcon className="h-4.5 w-4.5" />} label="Sent" />
            <NavItem
              href="/emails/drafts"
              icon={<StickyNoteIcon className="h-4.5 w-4.5" />}
              label="Drafts"
              count={pageProps.draftsCount}
            />
            <NavItem
              href="/emails/trash"
              icon={<Trash2Icon className="h-4.5 w-4.5" />}
              label="Trash"
            />
          </nav>
        </div>
      }
    >
      {children}
    </DashboardLayout>
  )
}

export default EmailsLayout

function NewMail() {
  const form = useForm()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.post('/emails')
  }
  return (
    <form onSubmit={handleSubmit}>
      <Button className="w-full" disabled={form.processing} type="submit">
        {form.processing ? (
          <LoaderIcon className="w-4.5 h-4.5" />
        ) : (
          <SquarePenIcon className="h-4.5 w-4.5" />
        )}
        <span>Compose Message</span>
      </Button>
    </form>
  )
}
