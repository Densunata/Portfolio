import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'

/** App-wide context providers. Keep this list short. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    // LazyMotion + `m` components keep Motion's bundle small; `strict` throws if
    // the full `motion` component is used by mistake.
    <LazyMotion features={domAnimation} strict>
      {/* Respect the OS "reduce motion" setting for every animation. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
