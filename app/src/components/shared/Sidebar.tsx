import {
  Briefcase,
  FolderKanban,
  House,
  Mail,
  MapPin,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import { NavLink } from 'react-router'

import { profile } from '@/content/profile'
import { getInitials } from '@/lib/format'
import { siteNavItems } from '@/lib/navigation'
import { cn } from '@/lib/utils'

import { SocialLinks } from './SocialLinks'
import { ThemeToggle } from './ThemeToggle'

const navIcons: Record<string, LucideIcon> = {
  '/': House,
  '/about': UserRound,
  '/projects': FolderKanban,
  '/experience': Briefcase,
  '/contact': Mail,
}

interface SidebarProps {
  className?: string
}

/** Desktop site header: profile summary, social links, and the primary navigation. */
export function Sidebar({ className }: SidebarProps) {
  return (
    <header className={cn('sticky top-0 h-svh flex-col border-r bg-background', className)}>
      <div className="relative flex flex-1 flex-col overflow-y-auto px-5 py-8">
        <ThemeToggle className="absolute top-3 right-3" />
        <div className="flex flex-col items-center text-center">
          {profile.photoUrl ? (
            <img
              src={profile.photoUrl}
              alt=""
              className="size-24 rounded-full object-cover shadow-sm ring-4 ring-muted"
            />
          ) : (
            <span
              aria-hidden="true"
              className="grid size-24 place-items-center rounded-full bg-primary text-2xl font-bold tracking-tight text-primary-foreground shadow-sm ring-4 ring-muted"
            >
              {getInitials(profile.name)}
            </span>
          )}
          <p className="mt-4 text-lg font-bold tracking-tight text-foreground">{profile.name}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">{profile.title}</p>
          <p className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin aria-hidden="true" className="size-3.5" />
            {profile.location}
          </p>
          <SocialLinks includeEmail className="mt-5 justify-center" />
        </div>

        <nav aria-label="Primary" className="mt-8 border-t pt-6">
          <ul className="flex flex-col gap-1">
            {siteNavItems.map((item) => {
              const Icon = navIcons[item.href]
              return (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    end={item.href === '/'}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-card text-foreground shadow-sm ring-1 ring-foreground/10'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                      )
                    }
                  >
                    {Icon && <Icon aria-hidden="true" className="size-4 shrink-0" />}
                    {item.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
