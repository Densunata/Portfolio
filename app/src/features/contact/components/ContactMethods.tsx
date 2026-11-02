import { Mail, MapPin, type LucideIcon } from 'lucide-react'

import { Reveal } from '@/components/shared/Reveal'
import { socialIcons, type IconComponent } from '@/components/shared/social-icons'
import { Card, CardContent } from '@/components/ui/card'
import { profile } from '@/content/profile'

interface ContactMethod {
  id: string
  label: string
  value: string
  Icon: IconComponent | LucideIcon
  href?: string
  external?: boolean
}

function getContactMethods(): ContactMethod[] {
  return [
    {
      id: 'email',
      label: 'Email',
      value: profile.email,
      Icon: Mail,
      href: `mailto:${profile.email}`,
    },
    ...profile.socials.map((social) => ({
      id: social.platform,
      label: social.label,
      value: social.href.replace(/^https?:\/\/(www\.)?/, ''),
      Icon: socialIcons[social.platform],
      href: social.href,
      external: true,
    })),
    { id: 'location', label: 'Location', value: profile.location, Icon: MapPin },
  ]
}

/** Contact details from `profile`: email, social profiles, and general location. */
export function ContactMethods() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {getContactMethods().map(({ id, label, value, Icon, href, external }, index) => (
        <li key={id}>
          <Reveal delay={index * 0.05} className="h-full">
            <Card className="h-full py-6">
              <CardContent className="flex gap-4 px-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground">{label}</h3>
                  {href ? (
                    <a
                      href={href}
                      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                      className="mt-1 block text-sm font-medium break-words text-primary underline-offset-4 hover:underline"
                    >
                      {value}
                      {external && <span className="sr-only"> (opens in a new tab)</span>}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-muted-foreground">{value}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </li>
      ))}
    </ul>
  )
}
