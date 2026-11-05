import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { THEME_COLORS, THEME_COOKIE } from '@/lib/theme'
import { renderRoute } from '@/test/render-route'
import { stubPrefersDark } from '@/test/theme'

function isDark() {
  return document.documentElement.classList.contains('dark')
}

/** The sidebar and top bar each have a toggle; CSS shows one per breakpoint. */
function toggles() {
  return screen.getAllByRole('button', { name: 'Toggle dark mode' })
}

function firstToggle() {
  const [toggle] = toggles()
  if (!toggle) throw new Error('No theme toggle rendered')
  return toggle
}

describe('ThemeToggle', () => {
  it('is available in both the sidebar and the top bar', () => {
    renderRoute('/')

    expect(toggles()).toHaveLength(2)
    const headers = screen.getAllByRole('banner')
    for (const header of headers) {
      expect(within(header).getByRole('button', { name: 'Toggle dark mode' })).toBeInTheDocument()
    }
  })

  it('switches theme by mouse and keyboard and saves the choice', async () => {
    const user = userEvent.setup()
    renderRoute('/')
    const toggle = firstToggle()
    expect(isDark()).toBe(false)
    expect(toggle).toHaveAttribute('aria-pressed', 'false')

    await user.click(toggle)

    expect(isDark()).toBe(true)
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(document.cookie).toContain(`${THEME_COOKIE}=dark`)

    toggle.focus()
    await user.keyboard(' ')

    expect(isDark()).toBe(false)
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(document.cookie).toContain(`${THEME_COOKIE}=light`)
  })

  it('keeps every toggle in sync', async () => {
    const user = userEvent.setup()
    renderRoute('/')

    await user.click(firstToggle())

    for (const toggle of toggles()) {
      expect(toggle).toHaveAttribute('aria-pressed', 'true')
    }
  })

  it('updates the browser UI color', async () => {
    const user = userEvent.setup()
    const metaTag = document.createElement('meta')
    metaTag.name = 'theme-color'
    document.head.append(metaTag)
    renderRoute('/')

    await user.click(firstToggle())
    expect(metaTag.content).toBe(THEME_COLORS.dark)

    await user.click(firstToggle())
    expect(metaTag.content).toBe(THEME_COLORS.light)

    metaTag.remove()
  })

  it('starts from the saved choice over the system setting', () => {
    stubPrefersDark(true)
    document.cookie = `${THEME_COOKIE}=light; path=/`

    renderRoute('/')

    expect(isDark()).toBe(false)
    expect(firstToggle()).toHaveAttribute('aria-pressed', 'false')
  })

  it('restores a saved dark theme after a reload', async () => {
    const user = userEvent.setup()
    const first = renderRoute('/')
    await user.click(firstToggle())
    first.unmount()

    renderRoute('/')

    expect(isDark()).toBe(true)
    expect(firstToggle()).toHaveAttribute('aria-pressed', 'true')
  })

  it('follows the system setting without saving it until the visitor chooses', () => {
    stubPrefersDark(true)

    renderRoute('/')

    expect(isDark()).toBe(true)
    expect(document.cookie).not.toContain(THEME_COOKIE)
  })

  it('keeps the theme when navigating between routes', async () => {
    const user = userEvent.setup()
    const { router } = renderRoute('/')
    await user.click(firstToggle())

    await router.navigate('/projects')

    expect(await screen.findByRole('heading', { level: 1, name: 'Projects' })).toBeInTheDocument()
    expect(isDark()).toBe(true)
    expect(firstToggle()).toHaveAttribute('aria-pressed', 'true')
  })
})
