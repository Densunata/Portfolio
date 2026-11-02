import { m } from 'motion/react'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Seconds. Use small values (≤ 0.2) to stagger siblings. */
  delay?: number
}

/**
 * Subtle fade-up when the element first enters the viewport. Under
 * `MotionConfig reducedMotion="user"`, only the fade remains.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -64px 0px' }}
      transition={{ duration: 0.4, ease: 'easeOut', delay }}
    >
      {children}
    </m.div>
  )
}
