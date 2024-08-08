import * as React from 'react'
import { Input } from '#common/ui/components/input'
import { Button } from '#common/ui/components/button'
import { ScrollArea } from '#common/ui/components/scroll_area'
import { Avatar, AvatarFallback } from '#common/ui/components/avatar'
import { Separator } from '#common/ui/components/separator'
import {
  Hash,
  ChevronDown,
  Plus,
  Users,
  Settings,
  MessageSquare,
  Bell,
  Search,
  Mic,
  Headphones,
  Settings2,
} from 'lucide-react'
import DashboardLayout from '#common/ui/components/dashboard_layout'

interface TeamsLayoutProps extends React.PropsWithChildren {
  className?: string
}

const TeamsLayout: React.FunctionComponent<TeamsLayoutProps> = ({ className, children }) => {
  const [activeChannel, setActiveChannel] = React.useState('general')

  const leftSidebar = (
    <div className="flex flex-col h-full bg-secondary text-secondary-foreground">
      <div className="p-4 font-semibold">Panache Teams</div>
      <Separator />
      <ScrollArea className="flex-grow">
        <div className="p-2 space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <MessageSquare className="mr-2 h-4 w-4" />
            Threads
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Separator className="my-2" />
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-semibold">Channels</span>
            <Plus className="h-4 w-4 cursor-pointer" />
          </div>
          {['general', 'random', 'project-a', 'project-b'].map((channel) => (
            <Button
              key={channel}
              variant={activeChannel === channel ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveChannel(channel)}
            >
              <Hash className="mr-2 h-4 w-4" />
              {channel}
            </Button>
          ))}
          <Separator className="my-2" />
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-semibold">Direct Messages</span>
            <Plus className="h-4 w-4 cursor-pointer" />
          </div>
          {['Alice', 'Bob', 'Charlie'].map((user) => (
            <Button key={user} variant="ghost" className="w-full justify-start">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
              {user}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <Separator />
      <div className="p-2">
        <Button variant="ghost" className="w-full justify-start">
          <Users className="mr-2 h-4 w-4" />
          People & User Groups
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings & Administration
        </Button>
      </div>
    </div>
  )

  const topBar = (
    <div className="flex items-center justify-between w-full px-4 py-2 bg-background border-b">
      <div className="flex items-center space-x-2">
        <h2 className="text-lg font-semibold">#{activeChannel}</h2>
        <ChevronDown className="h-4 w-4" />
      </div>
      <div className="flex items-center space-x-4">
        <Search className="h-5 w-5" />
        <Bell className="h-5 w-5" />
        <Avatar className="h-8 w-8">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )

  return (
    <DashboardLayout
      moduleName="Teams"
      className={className}
      leftChildren={leftSidebar}
      topChildren={topBar}
    >
      <div className="flex flex-col h-full">
        <ScrollArea className="flex-grow">{children}</ScrollArea>
        <div className="p-4 border-t">
          <Input placeholder={`Message #${activeChannel}`} />
        </div>
        <div className="flex items-center justify-between px-4 py-2 bg-muted">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span>Your Name</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mic className="h-5 w-5" />
            <Headphones className="h-5 w-5" />
            <Settings2 className="h-5 w-5" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default TeamsLayout
