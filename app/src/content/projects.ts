import type { Experience, Project } from '@/types/content'

import { experience } from './experience'

// Only facts confirmed by the CV or by Raiden belong here. Anything unknown is
// left out and listed in `caseStudy.pending`; do not fill it in with guesses.
export const projects: Project[] = [
  {
    // Source: owner confirmation (built during the Sept–Nov 2026 project-based
    // role) + that role's CV entry, which describes the application's stack.
    slug: 'malayohub',
    name: 'MalayoHub',
    summary:
      'General business management platform developed during a project-based engagement at Malayo International Inc.',
    category: 'Business management platform',
    role: 'System Developer / Full-Stack Developer',
    experienceId: 'malayo-system-developer',
    tech: ['.NET', 'ASP.NET Core', 'React', 'TypeScript', 'PostgreSQL', 'Docker'],
    featured: true,
    caseStudy: {
      overview: [
        'MalayoHub is a general business management platform. I developed it as a full-stack web application during a project-based engagement as System Developer / Full-Stack Developer at Malayo International Inc.',
      ],
      contributions: [
        'Developed the full-stack web application, covering both the backend and the frontend.',
        'Applied Domain-Driven Design (DDD) and a layered architecture to structure the system.',
        'Used Docker for development and deployment.',
      ],
      implementation: [
        'Backend built with .NET and ASP.NET Core, exposing REST APIs.',
        'PostgreSQL database.',
        'Responsive frontend built with React and TypeScript.',
        'Layered architecture following Domain-Driven Design principles.',
        'Docker-based development and deployment.',
      ],
      pending: ['purpose', 'screenshots', 'links'],
    },
  },
  {
    // Source: CV, on-the-job training entry.
    slug: 'leave-management-system',
    name: 'Leave Management System',
    summary:
      'Leave management application with secure role-based authentication, an admin dashboard, and a responsive interface.',
    category: 'Web application',
    role: 'Developer (on-the-job training)',
    experienceId: 'malayo-ojt',
    tech: ['PHP', 'Laravel', 'HTML', 'CSS', 'Bootstrap'],
    featured: true,
    caseStudy: {
      overview: [
        'The Leave Management System is a web application I built during on-the-job training at Malayo International Inc., using PHP Laravel with HTML, CSS, and Bootstrap.',
      ],
      contributions: [
        'Built the application using PHP Laravel with HTML, CSS, and Bootstrap.',
        'Implemented secure authentication with role-based access.',
        'Designed the responsive user interface.',
      ],
      implementation: [
        'Built on the PHP Laravel framework.',
        'Secure authentication with role-based access.',
        'Admin dashboard.',
        'Responsive user interface built with HTML, CSS, and Bootstrap.',
      ],
      pending: ['purpose', 'screenshots', 'links'],
    },
  },
  {
    // Source: CV, Projects → Capstone. Technology stack not yet provided.
    slug: 'medication-management-system',
    name: 'Medication Management System',
    summary:
      'Academic capstone: a medication management system for St. Camillus Medhaven Nursing Home, Antipolo City.',
    category: 'Capstone project',
    role: 'System Analyst & Programmer',
    organization: 'St. Camillus Medhaven Nursing Home, Antipolo City',
    tech: [],
    featured: true,
    caseStudy: {
      overview: [
        'An academic capstone project: the development of a Medication Management System for St. Camillus Medhaven Nursing Home in Antipolo City.',
      ],
      contributions: ['Served as System Analyst and Programmer on the project.'],
      pending: ['purpose', 'technologies', 'implementation', 'screenshots', 'timeline', 'links'],
    },
  },
]

export const featuredProjects = projects.filter((project) => project.featured)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

/** Neighbouring projects in content order, for case-study navigation. */
export function getAdjacentProjects(slug: string): {
  previous?: Project
  next?: Project
} {
  const index = projects.findIndex((project) => project.slug === slug)
  if (index === -1) return {}
  return { previous: projects[index - 1], next: projects[index + 1] }
}

/** Projects linked to an experience entry via `experienceId`. */
export function getProjectsByExperience(experienceId: string): Project[] {
  return projects.filter((project) => project.experienceId === experienceId)
}

export function getProjectExperience(project: Project): Experience | undefined {
  if (!project.experienceId) return undefined
  return experience.find((entry) => entry.id === project.experienceId)
}
