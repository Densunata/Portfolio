import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithRouter } from '@/test/render-route'
import type { Project } from '@/types/content'

import { ProjectCard } from './ProjectCard'

const baseProject: Project = {
  slug: 'sample-project',
  name: 'Sample Project',
  summary: 'A sample summary.',
  category: 'Web application',
  tech: ['React', 'TypeScript'],
  featured: true,
}

describe('ProjectCard', () => {
  it('renders title, category, summary, technologies, and a details link', async () => {
    renderWithRouter(<ProjectCard project={baseProject} />)

    expect(
      await screen.findByRole('heading', { level: 3, name: 'Sample Project' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Web application')).toBeInTheDocument()
    expect(screen.getByText('A sample summary.')).toBeInTheDocument()

    const tech = screen.getByRole('list', { name: 'Technologies used' })
    expect(tech).toHaveTextContent('React')
    expect(tech).toHaveTextContent('TypeScript')

    expect(screen.getByRole('link', { name: 'View details about Sample Project' })).toHaveAttribute(
      'href',
      '/projects/sample-project',
    )
  })

  it('shows a placeholder when there is no cover image', async () => {
    renderWithRouter(<ProjectCard project={baseProject} />)

    expect(await screen.findByTestId('image-placeholder')).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('renders the cover image with alt text when provided', async () => {
    renderWithRouter(<ProjectCard project={{ ...baseProject, coverImage: '/images/sample.png' }} />)

    expect(
      await screen.findByRole('img', { name: 'Screenshot of Sample Project' }),
    ).toHaveAttribute('src', '/images/sample.png')
  })

  it('omits the technology list when none are recorded', async () => {
    renderWithRouter(<ProjectCard project={{ ...baseProject, tech: [] }} />)

    await screen.findByRole('heading', { name: 'Sample Project' })
    expect(screen.queryByRole('list', { name: 'Technologies used' })).not.toBeInTheDocument()
  })
})
