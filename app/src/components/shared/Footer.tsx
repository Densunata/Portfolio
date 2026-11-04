import { Link } from 'react-router'

import { profile } from '@/content/profile'
import { siteNavItems } from '@/lib/navigation'

import { Container } from './Container'
import { SocialLinks } from './SocialLinks'

export function Footer() {
  return (
    <footer>
      <Container>
        <div className="flex flex-col gap-5 border-t py-8 text-sm lg:flex-row lg:items-center lg:justify-between">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. Built with React and TypeScript.
          </p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {siteNavItems.map((item) => (
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
          {/* The desktop sidebar already shows these links. */}
          <SocialLinks includeEmail className="lg:hidden" />
        </div>
      </Container>
    </footer>
  )
}
