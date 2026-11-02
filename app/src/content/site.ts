import { profile } from './profile'
import { projects } from './projects'

/**
 * Site-wide metadata. `siteDescription` is duplicated in `index.html` (static
 * tags for crawlers and link previews); `site.test.ts` keeps them in sync.
 */
export const siteDescription =
  'Raiden A. Victor: Programmer and System Developer specializing in full-stack web applications with .NET, React, and Laravel.'

export const siteTitle = `${profile.name} | ${profile.title}`

export interface PageContent {
  /** Short name used in the document title: `<title> | Raiden A. Victor`. */
  title: string
  /** Visible `<h1>`. */
  heading: string
  /** Lead paragraph under the heading. */
  intro: string
  /** `<meta name="description">` for the route. */
  metaDescription: string
}

export type PageKey = 'about' | 'projects' | 'experience' | 'contact'

export const pages: Record<PageKey, PageContent> = {
  about: {
    title: 'About',
    heading: 'About me',
    intro:
      'Programmer and system developer focused on full-stack web applications, backend APIs, and database-driven business systems.',
    metaDescription: `About ${profile.name}: professional background, technical skills, education, certifications, and training.`,
  },
  projects: {
    title: 'Projects',
    heading: 'Projects',
    intro:
      'Professional, training, and academic projects. Each case study covers my role, the technologies used, and key implementation details.',
    metaDescription: `Projects by ${profile.name}: ${projects.map((project) => project.name).join(', ')}.`,
  },
  experience: {
    title: 'Experience',
    heading: 'Experience',
    intro: 'Professional experience in system and full-stack development.',
    metaDescription: `Professional experience of ${profile.name}, ${profile.title}.`,
  },
  contact: {
    title: 'Contact',
    heading: 'Contact',
    intro: profile.contactMessage,
    metaDescription: `Contact ${profile.name} by email or LinkedIn.`,
  },
}
