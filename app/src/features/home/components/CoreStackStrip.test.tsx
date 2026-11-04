import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { profile } from '@/content/profile'

import { CoreStackStrip } from './CoreStackStrip'

describe('CoreStackStrip', () => {
  it('lists every core-stack technology from the profile under its heading', () => {
    render(<CoreStackStrip />)

    expect(screen.getByText(profile.coreStackHeading)).toBeInTheDocument()
    const list = screen.getByRole('list', { name: 'Core stack' })
    const items = within(list).getAllByRole('listitem')
    expect(items.map((item) => item.textContent)).toEqual(profile.coreStack)
  })
})
