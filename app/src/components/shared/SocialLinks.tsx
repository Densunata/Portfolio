import { Mail } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { profile } from '@/content/profile'
import { cn } from '@/lib/utils'

import { socialIcons, type IconComponent } from './social-icons'

interface SocialItem {
  label: string
  href: string
  Icon: IconComponent
  external: boolean
}

function getSocialItems(includeEmail: boolean): SocialItem[] {
  const socials = profile.socials.map((social) => ({
    label: social.label,
    href: social.href,
    Icon: socialIcons[social.platform],
    external: true,
  }))
  const email = { label: 'Email', href: `mailto:${profile.email}`, Icon: Mail, external: false }
  return includeEmail ? [email, ...socials] : socials
}

interface SocialLinksProps {
  /** `icon`: square icon buttons. `labeled`: icon + text buttons. */
  variant?: 'icon' | 'labeled'
  includeEmail?: boolean
  className?: string
}

/** Links to the profiles listed in `profile.socials` (and optionally email). */
export function SocialLinks({
  variant = 'icon',
  includeEmail = false,
  className,
}: SocialLinksProps) {
  const items = getSocialItems(includeEmail)
  const iconOnly = variant === 'icon'

  return (
    <ul className={cn('flex flex-wrap items-center gap-2', className)}>
      {items.map(({ label, href, Icon, external }) => (
        <li key={href}>
          <Button asChild variant="outline" size={iconOnly ? 'icon-lg' : 'lg'}>
            <a
              href={href}
              {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
              aria-label={
                iconOnly ? (external ? `${label} (opens in a new tab)` : label) : undefined
              }
            >
              <Icon aria-hidden="true" className="size-4" />
              {!iconOnly && (
                <>
                  {label}
                  {external && <span className="sr-only"> (opens in a new tab)</span>}
                </>
              )}
            </a>
          </Button>
        </li>
      ))}
    </ul>
  )
}
