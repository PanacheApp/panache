import * as React from 'react'
import logo from '../assets/logo.png'
import { Button } from './button'
import { Sheet, SheetTrigger, SheetContent } from './sheet'
import {
  BriefcaseBusinessIcon,
  CalendarIcon,
  HardDrive,
  LogOutIcon,
  MailIcon,
  MenuIcon,
  Settings2Icon,
  Share2Icon,
  UsersIcon,
} from 'lucide-react'
import { Avatar, AvatarFallback } from './avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown_menu'
import { cn } from '#common/ui/lib/cn'
import { Link, useForm } from '@inertiajs/react'
import useUser from '#common/ui/hooks/use_user'
import usePath from '#common/ui/hooks/use_path'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog'
import { Badge } from './badge'

interface VanillaDashboardLayoutProps extends React.PropsWithChildren {
  moduleName: string
  className?: string
  leftChildren?: React.ReactNode
  topChildren?: React.ReactNode
}

const VanillaDashboardLayout: React.FunctionComponent<VanillaDashboardLayoutProps> = ({
  topChildren,
  leftChildren,
  moduleName,
  className,
  children,
}) => {
  const user = useUser()

  const signOutForm = useForm()
  const handleSignOut = () => {
    signOutForm.post('/auth/sign_out')
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <SwitchProductMenu moduleName={moduleName} />
          <div className="flex-1 flex flex-col items-between h-full">
            <div>{leftChildren}</div>
            <SettingsDialog>
              <DropdownMenu>
                <DropdownMenuTrigger className="mt-auto flex py-2 px-4 items-center space-x-4 lg:px-6 border-t">
                  <Avatar>
                    <AvatarFallback className="border">
                      {user.firstName[0].toUpperCase()}
                      {user.lastName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm">
                    {user.firstName} {user.lastName}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DialogTrigger asChild>
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings2Icon className="h-4 w-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
                    <LogOutIcon className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SettingsDialog>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <MenuIcon className="h-4 w-4" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              {leftChildren}
            </SheetContent>
          </Sheet>
          {topChildren}
        </header>
        <main
          className={cn(
            'overflow-y-auto !max-h-[calc(100vh-60px)] flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6',
            className
          )}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default VanillaDashboardLayout

export function SwitchProductMenu({ moduleName }: { moduleName: string }) {
  const path = usePath()
  const products: {
    title: string
    href: string
    description: string
    icon: React.ReactNode
    isCurrent: boolean
    isComingSoon?: boolean
  }[] = [
    {
      title: 'Panache Emails',
      href: '/emails',
      description: 'Send and receive emails.',
      icon: <MailIcon className="h-4 w-4 mr-2 text-primary" />,
      isCurrent: path.startsWith('/emails'),
    },
    {
      title: 'Panache Drive',
      href: '/drive',
      description: 'Store and share your files.',
      icon: <HardDrive className="h-4 w-4 mr-2 text-primary" />,
      isCurrent: path.startsWith('/drive'),
      isComingSoon: true,
    },
    {
      title: 'Panache Teams',
      href: '/teams',
      description: 'Collaborate with your team in real-time.',
      icon: <UsersIcon className="h-4 w-4 mr-2 text-primary" />,
      isCurrent: path.startsWith('/teams'),
      isComingSoon: true,
    },
    {
      title: 'Panache Calendar',
      href: '/calendar',
      description: 'Manage your schedule and events.',
      icon: <CalendarIcon className="h-4 w-4 mr-2 text-primary" />,
      isCurrent: path.startsWith('/calendar'),
      isComingSoon: true,
    },
    {
      title: 'Panache Social',
      href: '/social',
      description: 'Share your thoughts and connect with others.',
      icon: <Share2Icon className="h-4 w-4 mr-2 text-primary" />,
      isCurrent: path.startsWith('/social'),
      isComingSoon: true,
    },
    {
      title: 'Panache Business',
      href: '/business',
      description: 'A set of tools tailored to your business needs.',
      icon: <BriefcaseBusinessIcon className="h-4 w-4 mr-2 text-primary" />,
      isCurrent: path.startsWith('/business'),
      isComingSoon: true,
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-14 items-center border-b lg:h-[60px] w-full px-4 sm:px-6">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Panache" className="h-12 w-auto" />
          <p className="font-bold">
            Panache <span className="font-normal">{moduleName}</span>
          </p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="grid w-[400px] gap-3 p-4 mx-4 my-2 md:grid-cols-2">
        {products.map((product) => (
          <ListItem
            key={product.title}
            title={product.title}
            icon={product.icon}
            href={product.href}
            isCurrent={product.isCurrent}
            isComingSoon={product.isComingSoon}
          >
            {product.description}
          </ListItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ListItem = ({
  className,
  title,
  children,
  icon,
  href,
  isCurrent,
  isComingSoon,
}: {
  className?: string
  title: string
  children: React.ReactNode
  icon: React.ReactNode
  href: string
  isCurrent: boolean
  isComingSoon?: boolean
}) => {
  return (
    <Link
      className={cn(
        'h-full flex p-3 no-underline outline-none transition-colors rounded-md leading-none focus:bg-accent focus:text-accent-foreground',
        isCurrent && 'bg-accent border',
        isComingSoon ? 'cursor-default' : 'hover:bg-accent hover:text-accent-foreground'
      )}
      href={isComingSoon ? '' : href}
      disabled={isComingSoon}
    >
      <div>{icon}</div>
      <div className={cn('block select-none space-y-1', className)}>
        <div className="text-sm font-medium leading-none flex items-start">
          <span>{title}</span>
          {isComingSoon && <Badge className="mt-full">Soon</Badge>}
        </div>
        <p className="text-sm leading-snug text-muted-foreground">{children}</p>
      </div>
    </Link>
  )
}

function SettingsDialog({ children }: React.PropsWithChildren) {
  return (
    <Dialog>
      {children}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Manage your account settings and preferences.</DialogDescription>
        </DialogHeader>

        <DialogFooter className="justify-between sm:justify-between">
          <DialogClose asChild>
            <Button type="reset" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
