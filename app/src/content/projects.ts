import type { Experience, Project } from '@/types/content'

import { experience } from './experience'

// Only facts confirmed by the CV or by Raiden belong here. Anything unknown is
// left out and listed in `caseStudy.pending`; do not fill it in with guesses.
export const projects: Project[] = [
  {
    // Source: owner confirmation (built during the Sept–Nov 2026 project-based
    // role) + that role's CV entry, which describes the application's stack.
    // Positioning and purpose: owner correction (Nov 2026). It is an internal
    // system platform, not a business management platform.
    slug: 'malayohub',
    name: 'MalayoHub',
    summary:
      'Internal system platform for company employees and client managers, developed during a project-based engagement at Malayo International Inc.',
    category: 'Internal system platform',
    role: 'System Developer / Full-Stack Developer',
    experienceId: 'malayo-system-developer',
    tech: ['.NET', 'ASP.NET Core', 'React', 'TypeScript', 'PostgreSQL', 'Docker'],
    featured: true,
    coverImage: '/images/malayohub-sign-in.webp',
    caseStudy: {
      overview: [
        'MalayoHub is an internal system platform designed for company employees and client managers. I developed it as a full-stack web application during a project-based engagement as System Developer / Full-Stack Developer at Malayo International Inc.',
      ],
      purpose: [
        'Built for internal company use, MalayoHub supports internal operations, collaboration between employees, client management activities, and internal management processes.',
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
      // Source: screenshot provided by Raiden (Nov 2026).
      screenshots: [
        {
          src: '/images/malayohub-sign-in.webp',
          alt: 'MalayoHub sign-in page with work email and password fields beside a "Your people. Your progress. Your Hub." welcome panel',
          caption: 'Sign-in page',
        },
      ],
      pending: ['links'],
    },
  },
  {
    // Source: owner-provided project brief (Nov 2026), checked against the Prime
    // repository's README, docs, and code. Keep `developmentStatus` in step with
    // the project: organization-level UI, data isolation, and business modules
    // are not finished. Do not add repository URLs or local configuration.
    slug: 'prime',
    name: 'Prime – Business Management Platform',
    summary:
      'Full-stack business management platform foundation built with .NET, ABP Framework, and React, with a focus on backend architecture, application security, and organization-scoped authorization.',
    category: 'Full-Stack Application',
    projectType: 'Personal Project',
    status: 'In Development',
    tech: [
      'C#',
      '.NET 10',
      'ASP.NET Core',
      'ABP Framework',
      'Entity Framework Core',
      'PostgreSQL',
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'shadcn/ui',
      'OpenID Connect',
    ],
    cardTech: [
      '.NET 10',
      'ABP Framework',
      'PostgreSQL',
      'React 19',
      'TypeScript',
      'OpenID Connect',
    ],
    featured: true,
    coverImage: '/images/prime-sign-in.webp',
    caseStudy: {
      overview: [
        'Prime is a full-stack business management platform foundation built with .NET 10, ABP Framework, PostgreSQL, React, and TypeScript. It focuses on secure authentication, organization-scoped authorization, administrative capabilities, and scalable modular architecture.',
      ],
      purpose: [
        'Prime is being built to host several organizations in one installation, where a user can belong to more than one organization and hold different roles in each. The current work establishes the secure platform foundation that business modules will be added to, one at a time.',
      ],
      contributions: [
        'Backend architecture, built on a layered ABP and .NET 10 solution.',
        'Application security, including authentication and permission enforcement.',
        'Modular frontend development with React and TypeScript.',
        'A particular focus on organization-scoped authorization and database-level integrity constraints.',
      ],
      features: [
        'OAuth 2.0 / OpenID Connect authentication using Authorization Code + PKCE.',
        'User, role, and permission administration.',
        'Organization management and administrator assignment.',
        'Permission-aware navigation and dashboard.',
        'Modular frontend architecture.',
        'Light and dark theme support.',
        'PostgreSQL database integration.',
      ],
      implementation: [
        'Layered ABP backend on .NET 10 and ASP.NET Core, following Domain-Driven Design, with one host serving the API, the OpenID Connect sign-in server, and the sign-in pages.',
        "Sign-in uses Authorization Code + PKCE: passwords go only to the host's sign-in page, the password grant is refused, and signing out revokes the tokens.",
        'The API enforces permissions on every request; the frontend uses them only to decide what to show.',
        'Requests made in an organization are validated against an active membership before authorization runs. Organization roles are separate from platform roles, so being a platform administrator does not grant access inside an organization.',
        'PostgreSQL protects integrity at the database level: composite foreign keys refuse links between organizations, and case-insensitive unique constraints cover values such as organization codes and role names.',
        'Entity Framework Core maps the data model and manages schema migrations.',
        'Frontend organized into lazily loaded feature modules, built with React 19, TypeScript, Vite, Tailwind CSS, and shadcn/ui.',
        'Automated backend and frontend tests, including tests through the real sign-in and authorization pipeline and PostgreSQL tests against the real migrations.',
      ],
      developmentStatus: {
        implemented: [
          'OpenID Connect sign-in with token renewal and revocation on sign-out.',
          'Platform administration of users, roles, role permissions, and organizations, including organization creation, suspension, and administrator assignment.',
          'Organization data model with database-level integrity constraints.',
          'Organization request context and organization role permissions in the API.',
          'Permission-aware navigation and dashboard, with light and dark themes.',
        ],
        inDevelopment: [
          'Organization-level interfaces, such as managing members and roles within an organization.',
          'Organization data isolation.',
          'Business modules.',
        ],
      },
      // Source: screenshot provided by Raiden (Nov 2026).
      screenshots: [
        {
          src: '/images/prime-sign-in.webp',
          alt: 'Prime sign-in page with email or username and password fields beside an "Everything your business needs. One connected workspace." welcome panel',
          caption: 'Sign-in page',
        },
      ],
      sections: [
        { id: 'overview', title: 'Project overview' },
        { id: 'purpose' },
        { id: 'role', title: 'My role and engineering focus' },
        { id: 'features' },
        { id: 'implementation', title: 'Architecture and technical implementation' },
        { id: 'technologies', title: 'Technology stack' },
        { id: 'status' },
        { id: 'screenshots' },
      ],
      pending: ['timeline', 'links'],
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
    coverImage: '/images/leave-management-sign-in.webp',
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
      // Source: screenshots provided by Raiden (Nov 2026).
      screenshots: [
        {
          src: '/images/leave-management-sign-in.webp',
          alt: 'Leave Management System login page with email and password fields beside a Leave Management Portal welcome panel showing the Malayo logo',
          caption: 'Login page',
        },
        {
          src: '/images/leave-management-admin-dashboard.webp',
          alt: 'Leave Management System admin dashboard with total, pending, approved, and rejected leave request counts above a list of upcoming employee leaves',
          caption: 'Admin dashboard',
        },
      ],
      pending: ['purpose', 'links'],
    },
  },
  {
    // Source: owner-provided project brief (Nov 2026). Do not describe the system
    // as deployed in a live clinical environment.
    slug: 'medication-management-system',
    name: 'Medication Management System',
    summary:
      'Academic capstone: a medication management system for St. Camillus Medhaven Nursing Home, with an Arduino-controlled pill dispenser and SMS alerts.',
    category: 'Capstone Project',
    role: 'System Analyst & Programmer',
    organization: 'St. Camillus Medhaven Nursing Home, Antipolo City, Rizal',
    period: 'School Year 2024–2025',
    tech: [
      'C#',
      'Microsoft Visual Studio 2022',
      'MySQL Workbench',
      'Krypton Framework',
      'Arduino Uno',
      'Servo SG90 Motor',
      'RTC (Real-Time Clock) Module',
      'IR Sensor',
      'GSM Module',
      'I2C LCD',
      'Buzzer',
      'Push Button',
    ],
    cardTech: ['C#', 'MySQL Workbench', 'Arduino Uno', 'GSM Module'],
    techGroups: [
      {
        label: 'Software',
        items: ['C#', 'Microsoft Visual Studio 2022', 'MySQL Workbench', 'Krypton Framework'],
      },
      {
        label: 'Hardware',
        items: [
          'Arduino Uno',
          'Servo SG90 Motor',
          'RTC (Real-Time Clock) Module',
          'IR Sensor',
          'GSM Module',
          'I2C LCD',
          'Buzzer',
          'Push Button',
        ],
      },
    ],
    featured: false,
    academic: true,
    coverImage: '/images/medication-management-landing.webp',
    caseStudy: {
      overview: [
        'An academic capstone project: a Medication Management System developed for St. Camillus Medhaven Nursing Home in Antipolo City, Rizal.',
        'The system provides separate access levels for nurses and caregivers and integrates a hardware-based pill dispenser to support scheduled medication administration.',
      ],
      purpose: [
        'The system is meant to assist healthcare professionals in managing medication schedules and automating medicine dispensing.',
      ],
      contributions: [
        'Involved in developing the software system.',
        'Involved in integrating the automated medication dispensing hardware.',
      ],
      features: [
        'Role-based access for nurses and caregivers.',
        'Patient medication records and scheduling.',
        'Automated pill dispensing using an Arduino-controlled mechanism.',
        'SMS notifications for medication dispensing and pill-jam alerts.',
        'Buzzer alerts for scheduled dispensing and dispensing errors.',
        'LCD displays for date, time, alerts, and dispenser status.',
        'Confirmation button for caregivers to verify medication administration.',
      ],
      implementation: [
        'Software system built with C# in Microsoft Visual Studio 2022, using the Krypton Framework and MySQL Workbench.',
        'Arduino-based pill dispenser integrated as the hardware part of the project, to support scheduled medication administration.',
      ],
      // Source: images provided by Raiden (Nov 2026). The landing page screenshot
      // has the nursing home's phone number covered; keep it covered.
      screenshots: [
        {
          src: '/images/medication-management-landing.webp',
          alt: 'St. Camillus Medhaven Nursing Home landing page listing its care services, with log in, register, and about us buttons beside an illustration of a caregiver with two elderly residents',
          caption: 'Landing page',
        },
        {
          src: '/images/medication-management-dashboard.webp',
          alt: 'Admin dashboard with counts for patients, today’s medication, upcoming medication, and caregivers, beside a menu with patient, intake record, pill schedule, caregiver, and history pages',
          caption: 'Admin dashboard',
        },
        {
          src: '/images/medication-management-hardware-wiring.webp',
          alt: 'Wiring diagram of the pill dispenser hardware, connecting an Arduino Uno to LCD displays, sensors, a GSM module, a buzzer, a push button, and servo motors',
          caption: 'Pill dispenser wiring diagram',
        },
      ],
      pending: ['links'],
    },
  },
]

export const featuredProjects = projects.filter((project) => project.featured)

export const academicProjects = projects.filter((project) => project.academic)

export const nonAcademicProjects = projects.filter((project) => !project.academic)

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
