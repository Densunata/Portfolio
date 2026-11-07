import { ArrowRight, MapPin, Send } from 'lucide-react'
import { Link } from 'react-router'

import { Container } from '@/components/shared/Container'
import { ResumeButton } from '@/components/shared/ResumeButton'
import { Reveal } from '@/components/shared/Reveal'
import { Button } from '@/components/ui/button'
import { profile } from '@/content/profile'

import { CoreStackStrip } from './CoreStackStrip'

export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading">
      <Container className="pt-8 pb-8 sm:pt-12 sm:pb-10 lg:pt-14">
        <Reveal>
          <p className="inline-flex items-center gap-1.5 rounded-full border bg-muted/60 px-3 py-1 text-sm text-muted-foreground">
            <MapPin aria-hidden="true" className="size-3.5" />
            {profile.location}
          </p>
          <h1
            id="hero-heading"
            className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            {profile.name}
          </h1>
          <p className="mt-3 text-lg font-semibold text-primary sm:text-xl">{profile.title}</p>
          <p className="mt-4 max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg">
            {profile.tagline}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/#projects">
                View projects
                <ArrowRight aria-hidden="true" data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">
                Get in touch
                <Send aria-hidden="true" data-icon="inline-end" />
              </Link>
            </Button>
            <ResumeButton />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="mt-8 sm:mt-10">
          <CoreStackStrip />
        </Reveal>
      </Container>
    </section>
  )
}
