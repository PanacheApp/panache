import usePath from '#common/ui/hooks/use_path'
import { Link } from '@inertiajs/react'
import clsx from 'clsx'
import * as React from 'react'

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
}

const NavItem: React.FunctionComponent<NavItemProps> = ({ href, icon, label }) => {
  const path = usePath()
  return (
    <Link
      className={clsx(
        'inline-flex space-x-2 items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-start',
        path === href ? 'bg-accent text-accent-foreground border' : 'border border-transparent'
      )}
      href={href}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

export default NavItem
