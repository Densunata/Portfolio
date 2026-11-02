import type { Service, SkillGroup } from '@/types/content'

// Source: CV skills list and experience entries, plus the owner's stated stack
// (ABP Framework, MySQL).
export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend Development',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'HTML', 'CSS', 'Bootstrap'],
  },
  {
    id: 'backend',
    label: 'Backend Development',
    items: ['C# / .NET 10', 'ASP.NET Core', 'ABP Framework', 'PHP / Laravel', 'REST APIs'],
  },
  { id: 'database', label: 'Database Management', items: ['PostgreSQL', 'MySQL'] },
  { id: 'tools', label: 'Tools & Technologies', items: ['Git', 'Docker'] },
]

export const competencies: string[] = [
  'Full-Stack Web Application Development',
  'System Design & Development',
  'Backend API Development',
  'Database Design & Management',
  'Frontend Development',
  'Technical Troubleshooting',
]

export const services: Service[] = [
  {
    id: 'full-stack',
    title: 'Full-Stack Development',
    description:
      'Building web applications end to end, from REST APIs and data models to responsive React and TypeScript interfaces.',
  },
  {
    id: 'backend-api',
    title: 'Backend API Development',
    description:
      'Developing backend services and REST APIs with ASP.NET Core and Laravel, structured with layered architecture and Domain-Driven Design.',
  },
  {
    id: 'database-design',
    title: 'Database Design',
    description:
      'Designing and managing relational databases with PostgreSQL and MySQL to support reliable application data.',
  },
  {
    id: 'system-development',
    title: 'System Development',
    description:
      'Analyzing requirements and developing business systems, from role-based internal tools to an academic healthcare capstone.',
  },
]
