import { describe, expect, it } from 'vitest'

import { certifications, trainings } from './certifications'
import { education } from './education'
import { experience } from './experience'
import { projects } from './projects'
import { skillGroups } from './skills'

function duplicates(values: string[]) {
  return values.filter((value, index) => values.indexOf(value) !== index)
}

describe('content integrity', () => {
  it('project slugs are unique and URL-safe', () => {
    const slugs = projects.map((project) => project.slug)
    expect(duplicates(slugs)).toEqual([])
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  })

  it.each([
    ['experience', experience],
    ['education', education],
    ['certifications', certifications],
    ['trainings', trainings],
    ['skillGroups', skillGroups],
  ])('%s ids are unique', (_name, items: { id: string }[]) => {
    expect(duplicates(items.map((item) => item.id))).toEqual([])
  })

  it('project experience links point to existing experience entries', () => {
    const experienceIds = new Set(experience.map((entry) => entry.id))
    for (const project of projects) {
      if (project.experienceId) expect(experienceIds).toContain(project.experienceId)
    }
  })

  it('pending details are actually missing', () => {
    for (const { tech, caseStudy } of projects) {
      const pending = new Set(caseStudy?.pending)
      if (pending.has('technologies')) expect(tech).toEqual([])
      if (pending.has('purpose')) expect(caseStudy?.purpose ?? []).toEqual([])
      if (pending.has('contributions')) expect(caseStudy?.contributions ?? []).toEqual([])
      if (pending.has('implementation')) expect(caseStudy?.implementation ?? []).toEqual([])
      if (pending.has('screenshots')) expect(caseStudy?.screenshots ?? []).toEqual([])
    }
  })

  it('screenshots live under /images and have alt text', () => {
    for (const { caseStudy } of projects) {
      for (const screenshot of caseStudy?.screenshots ?? []) {
        expect(screenshot.src).toMatch(/^\/images\//)
        expect(screenshot.alt.trim()).not.toBe('')
      }
    }
  })

  it('experience periods use YYYY-MM and end after they start', () => {
    for (const { period } of experience) {
      expect(period.start).toMatch(/^\d{4}-(0[1-9]|1[0-2])$/)
      if (period.end) expect(period.end >= period.start).toBe(true)
    }
  })
})
