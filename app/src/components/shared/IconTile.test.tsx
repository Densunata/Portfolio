import { render } from '@testing-library/react'
import { Award } from 'lucide-react'
import { describe, expect, it } from 'vitest'

import { IconTile } from './IconTile'

describe('IconTile', () => {
  it('renders its icon hidden from assistive technology', () => {
    const { container } = render(<IconTile icon={Award} />)

    const tile = container.firstElementChild
    expect(tile).toHaveAttribute('aria-hidden', 'true')
    expect(tile?.querySelector('svg')).toBeInTheDocument()
  })

  it('uses a filled primary tile by default and a light tile for the soft tone', () => {
    const { container, rerender } = render(<IconTile icon={Award} />)
    expect(container.firstElementChild).toHaveClass('bg-primary', 'text-primary-foreground')

    rerender(<IconTile icon={Award} tone="soft" className="size-10" />)
    expect(container.firstElementChild).toHaveClass('bg-card', 'text-primary', 'size-10')
    expect(container.firstElementChild).not.toHaveClass('bg-primary')
  })
})
