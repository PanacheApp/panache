import * as React from 'react'
import { Button } from '#common/ui/components/button'
import {
  HomeIcon,
  SearchIcon,
  BellIcon,
  MessageSquareIcon,
  UserIcon,
  ListIcon,
  SettingsIcon,
} from 'lucide-react'
import DashboardLayout from '#common/ui/components/dashboard_layout'

interface SocialLayoutProps extends React.PropsWithChildren {
  className?: string
}

const SocialLayout: React.FunctionComponent<SocialLayoutProps> = ({ className, children }) => {
  const leftMenu = (
    <div className="flex flex-col h-full px-3 py-1">
      <Button className="mb-4 w-full">Nouveau post</Button>
      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          <HomeIcon className="mr-2 h-5 w-5" />
          Accueil
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <SearchIcon className="mr-2 h-5 w-5" />
          Recherche
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <BellIcon className="mr-2 h-5 w-5" />
          Notifications
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <MessageSquareIcon className="mr-2 h-5 w-5" />
          Discussions
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <ListIcon className="mr-2 h-5 w-5" />
          Fils d'actu
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <ListIcon className="mr-2 h-5 w-5" />
          Listes
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <UserIcon className="mr-2 h-5 w-5" />
          Profil
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <SettingsIcon className="mr-2 h-5 w-5" />
          Paramètres
        </Button>
      </div>
    </div>
  )

  return (
    <DashboardLayout
      moduleName="Social"
      className={className}
      leftChildren={leftMenu}
      topChildren={<h1 className="text-lg font-bold">Accueil</h1>}
    >
      <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
        <div className="space-y-4">{children}</div>
      </div>
    </DashboardLayout>
  )
}

export default SocialLayout
