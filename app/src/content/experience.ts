import type { Experience } from '@/types/content'

// Source: CV. Ordered most recent first.
export const experience: Experience[] = [
  {
    id: 'malayo-system-developer',
    organization: 'Malayo International Inc.',
    role: 'System Developer / Full-Stack Developer',
    engagement: 'Project-based',
    period: { start: '2026-09', end: '2026-11' },
    highlights: [
      'Developed a full-stack web application using .NET, ASP.NET Core, React, and TypeScript, with REST APIs, PostgreSQL, and a responsive UI.',
      'Applied Domain-Driven Design (DDD) and layered architecture, with Docker for development and deployment.',
    ],
    tech: ['.NET', 'ASP.NET Core', 'React', 'TypeScript', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'malayo-ojt',
    organization: 'Malayo International Inc.',
    role: 'On-the-Job Trainee',
    engagement: 'On-the-job training',
    period: { start: '2026-02', end: '2026-05' },
    highlights: [
      'Built a Leave Management System using PHP Laravel with HTML, CSS, and Bootstrap.',
      'Implemented secure authentication with role-based access and an admin dashboard.',
      'Designed a responsive user interface.',
    ],
    tech: ['PHP', 'Laravel', 'HTML', 'CSS', 'Bootstrap'],
  },
]
