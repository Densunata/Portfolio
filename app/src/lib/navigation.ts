export interface NavItem {
  label: string
  /** Route path. Must match `app/src/app/routes.tsx`. */
  href: string
}

/** Primary navigation (sidebar, mobile menu, footer). */
export const navItems: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
]

export const homeNavItem: NavItem = { label: 'Home', href: '/' }

/** Rendered as the header call-to-action. */
export const contactNavItem: NavItem = { label: 'Contact', href: '/contact' }

/** Every page, in display order: Home, primary items, Contact. */
export const siteNavItems: NavItem[] = [homeNavItem, ...navItems, contactNavItem]
