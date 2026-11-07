import { describe, expect, it } from 'vitest'

import {
  academicProjects,
  featuredProjects,
  getAdjacentProjects,
  getProjectBySlug,
  getProjectExperience,
  nonAcademicProjects,
  projects,
} from './projects'

describe('project helpers', () => {
  it('finds projects by slug', () => {
    expect(getProjectBySlug('malayohub')?.name).toBe('MalayoHub')
    expect(getProjectBySlug('missing')).toBeUndefined()
  })

  it('returns neighbours in content order', () => {
    const [first, second, third] = projects

    expect(getAdjacentProjects(first?.slug ?? '')).toEqual({ previous: undefined, next: second })
    expect(getAdjacentProjects(second?.slug ?? '')).toEqual({ previous: first, next: third })
    expect(getAdjacentProjects('missing')).toEqual({})
  })

  it('features Prime after MalayoHub and leaves out academic work', () => {
    expect(featuredProjects.map((project) => project.slug)).toEqual([
      'malayohub',
      'prime',
      'leave-management-system',
    ])
  })

  it('separates the capstone from the other projects without losing any', () => {
    expect(academicProjects.map((project) => project.slug)).toEqual([
      'medication-management-system',
    ])
    expect(nonAcademicProjects).toHaveLength(projects.length - academicProjects.length)
    expect(nonAcademicProjects.some((project) => project.academic)).toBe(false)
  })

  it('resolves the related experience entry, if any', () => {
    const malayoHub = getProjectBySlug('malayohub')
    const capstone = getProjectBySlug('medication-management-system')
    if (!malayoHub || !capstone) throw new Error('Expected seeded projects')

    expect(getProjectExperience(malayoHub)?.role).toBe('System Developer / Full-Stack Developer')
    expect(getProjectExperience(capstone)).toBeUndefined()
  })
})
