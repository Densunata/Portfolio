export interface NavItem {
  label: string
  /** Route path. Must match `app/src/app/routes.tsx`. */
  href: string
}

/** Primary navigation (header, mobile menu, footer). */
export const navItems: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
]

/** Rendered as the header call-to-action. */
export const contactNavItem: NavItem = { label: 'Contact', href: '/contact' }
