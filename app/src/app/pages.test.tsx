import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { certifications, trainings } from '@/content/certifications'
import { experience } from '@/content/experience'
import { profile } from '@/content/profile'
import { getProjectsByExperience, projects } from '@/content/projects'
import { renderRoute } from '@/test/render-route'

async function renderPage(path: string) {
  const view = renderRoute(path)
  await screen.findByRole('heading', { level: 1 })
  return view
}

describe('/about', () => {
  it('composes the about, skills, education, certification, and training sections', async () => {
    await renderPage('/about')

    for (const name of [
      'Software and system development',
      'Technical skills',
      'Education',
      'Certifications',
      'Training and seminars',
    ]) {
      expect(screen.getByRole('region', { name })).toBeInTheDocument()
    }
    const training = screen.getByRole('region', { name: 'Training and seminars' })
    for (const item of trainings) expect(training).toHaveTextContent(item.name)
    const certs = screen.getByRole('region', { name: 'Certifications' })
    for (const item of certifications) expect(certs).toHaveTextContent(item.name)
  })
})

describe('/projects', () => {
  it('lists every project with a link to its case study', async () => {
    await renderPage('/projects')

    const list = screen.getByRole('region', { name: 'All projects' })
    for (const project of projects) {
      expect(
        within(list).getByRole('heading', { level: 3, name: project.name }),
      ).toBeInTheDocument()
      expect(
        within(list).getByRole('link', { name: `View details about ${project.name}` }),
      ).toHaveAttribute('href', `/projects/${project.slug}`)
    }
  })
})

describe('/experience', () => {
  it('lists every role with links to related case studies', async () => {
    await renderPage('/experience')

    const history = screen.getByRole('region', { name: 'Employment history' })
    for (const item of experience) {
      expect(
        within(history).getByRole('heading', { level: 3, name: item.role }),
      ).toBeInTheDocument()
      for (const project of getProjectsByExperience(item.id)) {
        expect(
          within(history).getByRole('link', { name: `Case study: ${project.name}` }),
        ).toHaveAttribute('href', `/projects/${project.slug}`)
      }
    }
  })
})

describe('/contact', () => {
  it('shows email, LinkedIn, and general location only', async () => {
    await renderPage('/contact')

    const details = screen.getByRole('region', { name: 'Contact details' })
    expect(within(details).getByRole('link', { name: profile.email })).toHaveAttribute(
      'href',
      `mailto:${profile.email}`,
    )
    expect(within(details).getByRole('link', { name: /linkedin\.com/ })).toHaveAttribute(
      'rel',
      'noopener noreferrer',
    )
    expect(within(details).getByText(profile.location)).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /github/i })).not.toBeInTheDocument()
  })

  it('keeps the resume download disabled until the redacted PDF exists', async () => {
    await renderPage('/contact')

    expect(screen.getByRole('button', { name: 'Resume coming soon' })).toBeDisabled()
    expect(document.querySelector('a[href$=".pdf"]')).toBeNull()
  })
})

describe('privacy', () => {
  // Matches Philippine mobile numbers such as 09xx xxx xxxx or +63 9xx xxx xxxx.
  const phPhoneNumber = /(\+63|\b0)9\d{2}[\s-]?\d{3}[\s-]?\d{4}\b/

  it('profile content has no phone or street address fields', () => {
    expect(Object.keys(profile)).not.toEqual(
      expect.arrayContaining([expect.stringMatching(/phone|address|street/i)]),
    )
  })

  it.each([
    '/',
    '/about',
    '/projects',
    '/experience',
    '/contact',
    ...projects.map((project) => `/projects/${project.slug}`),
  ])('%s does not render a phone number', async (path) => {
    await renderPage(path)

    expect(document.body.textContent).not.toMatch(phPhoneNumber)
  })
})
