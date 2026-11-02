import { Link } from 'react-router'

import { profile } from '@/content/profile'
import { contactNavItem, navItems } from '@/lib/navigation'

import { Container } from './Container'
import { SocialLinks } from './SocialLinks'

const footerLinks = [{ label: 'Home', href: '/' }, ...navItems, contactNavItem]

export function Footer() {
  return (
    <footer className="border-t bg-muted/60">
      <Container className="flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-foreground">{profile.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{profile.title}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="rounded-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <SocialLinks includeEmail />
      </Container>
      <Container>
        <p className="border-t py-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}. Built with React and TypeScript.
        </p>
      </Container>
    </footer>
  )
}
