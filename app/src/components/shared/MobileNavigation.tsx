import { Menu, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router'

import { Button } from '@/components/ui/button'
import { contactNavItem, navItems } from '@/lib/navigation'
import { cn } from '@/lib/utils'

import { Container } from './Container'

interface MobileNavigationProps {
  className?: string
}

/**
 * Disclosure-style menu for small screens. It closes on link click, Escape
 * (returning focus to the toggle), outside click, and any navigation. A
 * disclosure is used instead of a modal sheet so page scroll is never locked,
 * which keeps `/#section` links scrolling correctly.
 */
export function MobileNavigation({ className }: MobileNavigationProps) {
  const location = useLocation()
  // Tie the open state to the current location so any navigation closes the menu.
  const [openAt, setOpenAt] = useState<string | null>(null)
  const open = openAt === location.key

  const panelId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const close = () => {
    setOpenAt(null)
  }

  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setOpenAt(null)
      toggleRef.current?.focus()
    }
    function onPointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setOpenAt(null)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className={className}>
      <Button
        ref={toggleRef}
        variant="ghost"
        size="icon-lg"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          setOpenAt(open ? null : location.key)
        }}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </Button>

      <nav
        id={panelId}
        aria-label="Mobile"
        hidden={!open}
        className={cn(
          'absolute inset-x-0 top-full border-b bg-background shadow-lg',
          open && 'animate-in duration-150 fade-in slide-in-from-top-2 motion-reduce:animate-none',
        )}
      >
        <Container className="py-4">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  onClick={close}
                  className={({ isActive }) =>
                    cn(
                      'block rounded-md px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
                      isActive && 'bg-accent text-accent-foreground',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-3 w-full">
            <NavLink to={contactNavItem.href} onClick={close}>
              {contactNavItem.label}
            </NavLink>
          </Button>
        </Container>
      </nav>
    </div>
  )
}
