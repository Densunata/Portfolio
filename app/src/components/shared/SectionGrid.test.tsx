import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Section } from './Section'
import { SectionGrid } from './SectionGrid'

describe('SectionGrid', () => {
  it('lays out its panels as a single column that becomes 12 columns on large screens', () => {
    render(
      <SectionGrid>
        <Section id="about" title="About" span="wide">
          <p>About body</p>
        </Section>
        <Section id="skills" title="Skills" span="narrow">
          <p>Skills body</p>
        </Section>
      </SectionGrid>,
    )

    const about = screen.getByRole('region', { name: 'About' })
    const skills = screen.getByRole('region', { name: 'Skills' })
    const grid = about.parentElement

    expect(grid).toBe(skills.parentElement)
    expect(grid).toHaveClass('grid', 'lg:grid-cols-12')
    expect(about).toHaveClass('lg:col-span-7')
    expect(skills).toHaveClass('lg:col-span-5')
  })

  it('merges a custom class onto the grid', () => {
    render(
      <SectionGrid className="items-start">
        <Section id="facts" title="Facts">
          <p>Body</p>
        </Section>
      </SectionGrid>,
    )

    expect(screen.getByRole('region', { name: 'Facts' }).parentElement).toHaveClass(
      'grid',
      'items-start',
    )
  })
})
