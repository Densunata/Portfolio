import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import type { Screenshot } from '@/types/content'

import { ScreenshotGallery } from './ScreenshotGallery'

const screenshot: Screenshot = {
  src: '/images/sample.webp',
  alt: 'Sample sign-in page',
  caption: 'Sign-in page',
}

describe('ScreenshotGallery', () => {
  it('shows a placeholder when there are no screenshots', () => {
    render(<ScreenshotGallery />)

    expect(screen.getByText('Screenshots coming soon')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('opens a screenshot full size in a modal and closes it with Escape', async () => {
    const user = userEvent.setup()
    render(<ScreenshotGallery screenshots={[screenshot]} />)

    const trigger = screen.getByRole('button', { name: /View full size/ })
    await user.click(trigger)

    const dialog = screen.getByRole('dialog', { name: 'Sign-in page' })
    expect(within(dialog).getByRole('img', { name: screenshot.alt })).toHaveAttribute(
      'src',
      screenshot.src,
    )
    expect(within(dialog).getByRole('link', { name: /Open original/ })).toHaveAttribute(
      'href',
      screenshot.src,
    )

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('closes with the close button', async () => {
    const user = userEvent.setup()
    render(<ScreenshotGallery screenshots={[screenshot]} />)

    await user.click(screen.getByRole('button', { name: /View full size/ }))
    await user.click(screen.getByRole('button', { name: 'Close' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
