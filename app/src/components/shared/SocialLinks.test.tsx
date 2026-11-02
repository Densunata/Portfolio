import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { profile } from '@/content/profile'

import { SocialLinks } from './SocialLinks'

describe('SocialLinks', () => {
  it('renders each profile link opening safely in a new tab', () => {
    render(<SocialLinks />)

    const linkedIn = screen.getByRole('link', { name: 'LinkedIn (opens in a new tab)' })
    expect(linkedIn).toHaveAttribute('href', 'https://www.linkedin.com/in/victor-raiden-anore')
    expect(linkedIn).toHaveAttribute('target', '_blank')
    expect(linkedIn).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getAllByRole('link')).toHaveLength(profile.socials.length)
  })

  it('optionally includes email', () => {
    render(<SocialLinks includeEmail />)

    expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute(
      'href',
      `mailto:${profile.email}`,
    )
  })

  it('shows visible labels in the labeled variant', () => {
    render(<SocialLinks variant="labeled" />)

    expect(screen.getByRole('link', { name: /LinkedIn/ })).toHaveTextContent('LinkedIn')
  })

  it('does not render a GitHub link without a real profile URL', () => {
    render(<SocialLinks includeEmail />)

    expect(screen.queryByRole('link', { name: /GitHub/ })).not.toBeInTheDocument()
  })
})
