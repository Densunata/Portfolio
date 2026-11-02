import type { RouteObject } from 'react-router'

import { NotFoundPage } from '@/components/shared/NotFoundPage'
import { SiteLayout } from '@/components/shared/SiteLayout'
import { AboutPage } from '@/features/about/pages/AboutPage'
import { ContactPage } from '@/features/contact/pages/ContactPage'
import { ExperiencePage } from '@/features/experience/pages/ExperiencePage'
import { HomePage } from '@/features/home/pages/HomePage'
import { ProjectDetailPage } from '@/features/projects/pages/ProjectDetailPage'
import { ProjectsPage } from '@/features/projects/pages/ProjectsPage'

export const routes: RouteObject[] = [
  {
    Component: SiteLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'about', Component: AboutPage },
      { path: 'projects', Component: ProjectsPage },
      { path: 'projects/:slug', Component: ProjectDetailPage },
      { path: 'experience', Component: ExperiencePage },
      { path: 'contact', Component: ContactPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]
