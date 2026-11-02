import { CheckCircle2 } from 'lucide-react'

interface CaseStudyListProps {
  items: string[]
}

export function CaseStudyList({ items }: CaseStudyListProps) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
