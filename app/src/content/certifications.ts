import type { Credential } from '@/types/content'

export const certifications: Credential[] = [
  {
    id: 'tesda-css-nc2',
    name: 'Computer Systems Servicing NC II',
    issuer: 'TESDA, San Benildo-Rizal TESDA Training Center',
  },
  { id: 'fcc-responsive-web', name: 'Responsive Web Design', issuer: 'freeCodeCamp' },
  { id: 'azure-ai', name: 'AI Azure' },
  { id: 'data-privacy-gdpr', name: 'Data Privacy and General Data Protection Regulation (GDPR)' },
]

export const trainings: Credential[] = [
  { id: 'python-beginners', name: 'Python Programming for Absolute Beginners' },
  { id: 'figma-uiux', name: 'Beyond the Frames: Introduction to UI/UX Designing using Figma' },
  { id: 'cyber-ready', name: 'Cyber-ready Webinar Session' },
  { id: 'cloud-devops', name: 'Cloud and DevOps Basics' },
  {
    id: 'cybersecurity-month',
    name: 'Cyber Security Month: Awareness Seminar for Students and Faculties',
  },
  { id: 'design-thinking', name: 'Design Thinking and Mobile App Wireframing' },
]
