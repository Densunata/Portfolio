import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Section } from './Section'

describe('Section', () => {
  it('renders an anchored region labelled by its heading', () => {
    render(
      <Section id="skills" eyebrow="Skills" title="Technical skills" description="What I use.">
        <p>Body</p>
      </Section>,
    )

    const region = screen.getByRole('region', { name: 'Technical skills' })
    expect(region).toHaveAttribute('id', 'skills')
    expect(screen.getByRole('heading', { level: 2, name: 'Technical skills' })).toHaveAttribute(
      'id',
      'skills-heading',
    )
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('What I use.')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
  })
})
