import type { ComponentType } from 'react'

import type { SocialPlatform } from '@/types/content'

import { GitHubIcon, LinkedInIcon } from './brand-icons'

export type IconComponent = ComponentType<{ className?: string; 'aria-hidden'?: 'true' }>

export const socialIcons: Record<SocialPlatform, IconComponent> = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
}
