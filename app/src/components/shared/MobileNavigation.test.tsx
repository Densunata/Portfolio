import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { renderRoute } from '@/test/render-route'

function setup() {
  const user = userEvent.setup()
  const view = renderRoute('/')
  const toggle = screen.getByRole('button', { name: 'Menu' })
  return { user, toggle, ...view }
}

function mobileNav() {
  return screen.queryByRole('navigation', { name: 'Mobile' })
}

describe('MobileNavigation', () => {
  it('starts closed and opens with the toggle', async () => {
    const { user, toggle } = setup()

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(mobileNav()).not.toBeInTheDocument()

    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    const nav = mobileNav()
    expect(nav).toBeInTheDocument()
    expect(toggle).toHaveAttribute('aria-controls', nav?.id)
    expect(within(nav as HTMLElement).getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'href',
      '/contact',
    )
  })

  it('closes with Escape and returns focus to the toggle', async () => {
    const { user, toggle } = setup()
    await user.click(toggle)
    await user.tab()

    await user.keyboard('{Escape}')

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(mobileNav()).not.toBeInTheDocument()
    expect(toggle).toHaveFocus()
  })

  it('closes after navigating', async () => {
    const { user, toggle, router } = setup()
    await user.click(toggle)

    const nav = mobileNav() as HTMLElement
    await user.click(within(nav).getByRole('link', { name: 'Projects' }))

    expect(router.state.location.pathname).toBe('/projects')
    expect(await screen.findByRole('heading', { level: 1, name: 'Projects' })).toBeInTheDocument()
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(mobileNav()).not.toBeInTheDocument()
  })

  it('marks the current page in the menu', async () => {
    const user = userEvent.setup()
    renderRoute('/experience')
    await user.click(screen.getByRole('button', { name: 'Menu' }))

    const nav = mobileNav() as HTMLElement
    expect(within(nav).getByRole('link', { name: 'Experience' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(within(nav).getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current')
  })

  it('closes when clicking outside', async () => {
    const { user, toggle } = setup()
    await user.click(toggle)

    await user.click(screen.getByRole('heading', { level: 1 }))

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('toggles closed when pressed again', async () => {
    const { user, toggle } = setup()
    await user.click(toggle)
    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})
