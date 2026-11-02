import type { Profile } from '@/types/content'

// Source: Raiden A. Victor CV (Oct 2026). Phone number and street address are
// intentionally kept off the public site.
export const profile: Profile = {
  name: 'Raiden A. Victor',
  title: 'Programmer / System Developer',
  tagline:
    'Full-stack developer building web applications and business systems with .NET, React, and Laravel.',
  summary: [
    'Aspiring System Developer and Programmer with experience in software development, system implementation, and technical troubleshooting. Proficient in developing and maintaining applications, managing databases, and providing IT technical support for hardware, software, and network-related concerns.',
    'Equipped with strong analytical, problem-solving, and communication skills, with a passion for leveraging technology to improve business processes and user experience.',
  ],
  coreStack: ['C# / .NET', 'ASP.NET Core', 'React', 'TypeScript', 'Laravel', 'PostgreSQL'],
  location: 'Rizal, Philippines',
  email: 'anoreraiden4@gmail.com',
  socials: [
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/victor-raiden-anore',
    },
  ],
  resume: {
    href: '/resume/RaidenVictor-CV-Public.pdf',
    // Pending: flip to true once the redacted PDF is added to app/public/resume/.
    available: false,
  },
  contactMessage:
    'I am open to opportunities in software and system development. Whether you are a recruiter, an employer, or someone with a project in mind, feel free to reach out by email or LinkedIn.',
}
