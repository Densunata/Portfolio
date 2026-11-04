/**
 * Content model for the portfolio. All site copy lives in `app/src/content/*` and
 * conforms to these types; components only render what they receive.
 */

/** Month-precision date in `YYYY-MM` form, e.g. `2026-02`. */
export type YearMonth = `${number}-${number}`

export interface DateRange {
  start: YearMonth
  /** Omit for ongoing roles. */
  end?: YearMonth
}

export interface Link {
  label: string
  href: string
}

export type SocialPlatform = 'linkedin' | 'github'

export interface SocialLink extends Link {
  platform: SocialPlatform
}

export interface Resume {
  /** Public path of the redacted CV (no phone number or street address). */
  href: string
  /** Set to `true` only after the file exists in `/public`. */
  available: boolean
}

export interface Profile {
  name: string
  title: string
  /** One- or two-sentence pitch for the hero. */
  tagline: string
  /** Bio paragraphs for the About section. */
  summary: string[]
  /** Short list shown in the hero core-stack strip. */
  coreStack: string[]
  /** Visible heading for `coreStack` in the hero strip. */
  coreStackHeading: string
  location: string
  email: string
  socials: SocialLink[]
  resume: Resume
  /** Message shown in the Contact section. */
  contactMessage: string
  /** Public path, e.g. `/images/profile.jpg`. */
  photoUrl?: string
}

export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools'

export interface SkillGroup {
  id: SkillCategory
  label: string
  items: string[]
}

export type ServiceId = 'full-stack' | 'backend-api' | 'database-design' | 'system-development'

/** A "What I do" focus area. */
export interface Service {
  id: ServiceId
  title: string
  description: string
}

export interface Screenshot {
  /** Public path under `/images`. Real screenshots only. */
  src: string
  /** Describes what the screenshot shows. */
  alt: string
  caption?: string
}

/** Details known to be missing for a project. */
export type PendingDetail =
  | 'purpose'
  | 'technologies'
  | 'contributions'
  | 'implementation'
  | 'screenshots'
  | 'timeline'
  | 'links'

/**
 * Long-form content for `/projects/:slug`. Optional sections are omitted from
 * the page when absent; list them in `pending` instead of guessing.
 */
export interface CaseStudy {
  /** Paragraphs describing what the project is. */
  overview: string[]
  /** Paragraphs on the problem the project addresses or why it exists. */
  purpose?: string[]
  /** What Raiden personally did. */
  contributions?: string[]
  /** Key technical implementation details. */
  implementation?: string[]
  screenshots?: Screenshot[]
  /** Maintainer-only list of missing details. Never rendered. */
  pending?: PendingDetail[]
}

export interface Project {
  /** URL-safe and unique. Used for `/projects/:slug`. */
  slug: string
  name: string
  summary: string
  category: string
  role?: string
  /**
   * Related `Experience.id`. The case study derives organization, period, and
   * engagement from it, so those facts are not duplicated here.
   */
  experienceId?: string
  /** Organization or client, when there is no related experience entry. */
  organization?: string
  tech: string[]
  featured: boolean
  links?: Link[]
  /** Public path under `/images`. */
  coverImage?: string
  caseStudy?: CaseStudy
}

export interface Experience {
  id: string
  organization: string
  role: string
  engagement: string
  period: DateRange
  highlights: string[]
  tech: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  period: { start: number; end: number }
}

export interface Credential {
  id: string
  name: string
  issuer?: string
}
