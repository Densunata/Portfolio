import { Link, NavLink } from 'react-router'

import { Button } from '@/components/ui/button'
import { profile } from '@/content/profile'
import { contactNavItem } from '@/lib/navigation'
import { cn } from '@/lib/utils'

import { Container } from './Container'
import { MobileNavigation } from './MobileNavigation'
import { ProfileAvatar } from './ProfileAvatar'
import { ThemeToggle } from './ThemeToggle'

interface NavbarProps {
  className?: string
}

/** Compact top bar for small and medium screens; the menu holds the page links. */
export function Navbar({ className }: NavbarProps) {
  return (
    <header
      className={cn('sticky top-0 z-40 border-b bg-background/90 backdrop-blur-sm', className)}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2.5 rounded-md font-semibold tracking-tight"
        >
          <ProfileAvatar decorative className="size-9 rounded-full text-xs" />
          <span className="truncate text-foreground">{profile.name}</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden aria-[current=page]:ring-3 aria-[current=page]:ring-ring/40 sm:inline-flex"
          >
            <NavLink to={contactNavItem.href}>{contactNavItem.label}</NavLink>
          </Button>
          <ThemeToggle />
          <MobileNavigation />
        </div>
      </Container>
    </header>
  )
}
