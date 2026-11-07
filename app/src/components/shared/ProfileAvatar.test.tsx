import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { profile } from '@/content/profile'

import { ProfileAvatar } from './ProfileAvatar'

describe('ProfileAvatar', () => {
  it('shows the local profile photo, named for assistive technology', () => {
    render(<ProfileAvatar />)

    const photo = screen.getByRole('img', { name: profile.name })
    expect(photo).toHaveAttribute('src', profile.photoUrl)
    expect(photo).toHaveClass('aspect-square', 'object-cover')
  })

  it('hides the photo from assistive technology when decorative', () => {
    render(<ProfileAvatar decorative />)

    expect(screen.queryByRole('img', { name: profile.name })).not.toBeInTheDocument()
  })
})
