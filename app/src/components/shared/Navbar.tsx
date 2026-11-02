import { Link, NavLink } from 'react-router'

import { Button } from '@/components/ui/button'
import { profile } from '@/content/profile'
import { getInitials } from '@/lib/format'
import { contactNavItem, navItems } from '@/lib/navigation'
import { cn } from '@/lib/utils'

import { Container } from './Container'
import { MobileNavigation } from './MobileNavigation'

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2.5 rounded-md font-semibold tracking-tight">
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-md bg-primary text-xs font-bold text-primary-foreground"
          >
            {getInitials(profile.name)}
          </span>
          <span className="text-foreground">{profile.name}</span>
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          <nav aria-label="Primary">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                        isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <Button asChild className="aria-[current=page]:ring-3 aria-[current=page]:ring-ring/40">
            <NavLink to={contactNavItem.href}>{contactNavItem.label}</NavLink>
          </Button>
        </div>

        <MobileNavigation className="md:hidden" />
      </Container>
    </header>
  )
}
