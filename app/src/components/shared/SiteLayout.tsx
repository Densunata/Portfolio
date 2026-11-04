import { Outlet, ScrollRestoration } from 'react-router'

import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

/**
 * Two-column shell on large screens (sticky sidebar + content); a top bar with a
 * disclosure menu replaces the sidebar below `lg`.
 */
export function SiteLayout() {
  return (
    <div className="min-h-svh lg:grid lg:grid-cols-[16.5rem_minmax(0,1fr)]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Sidebar className="hidden lg:flex" />
      <div className="flex min-h-svh min-w-0 flex-col">
        <Navbar className="lg:hidden" />
        <main id="main" className="flex-1 pb-12 sm:pb-16">
          <Outlet />
        </main>
        <Footer />
      </div>
      <ScrollRestoration />
    </div>
  )
}
