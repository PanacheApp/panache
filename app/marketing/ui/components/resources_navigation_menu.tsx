import * as React from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '#common/ui/components/navigation_menu'
import { cn } from '#common/ui/lib/cn'

const resources: { title: string; href: string; description: string }[] = [
  {
    title: 'Documentation',
    href: 'https://docs.panache.so',
    description: 'Learn more about Panache.',
  },
  {
    title: 'GitHub repository',
    href: 'https://github.com/panacheapp/panache.git',
    description: 'Explore the source code.',
  },
]

export default function ResourcesNavigationMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuItem>
        <NavigationMenuTrigger
          className="text-sm pr-3 text-white inline-flex h-10 items-center justify-center"
          unstyled
        >
          <button>Resources</button>
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[350px] gap-3 p-4">
            {resources.map((component) => (
              <ListItem key={component.title} title={component.title} href={component.href}>
                {component.description}
              </ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  }
)
