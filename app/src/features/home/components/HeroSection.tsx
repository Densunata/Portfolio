import { ArrowRight, MapPin } from 'lucide-react'
import { Link } from 'react-router'

import { Container } from '@/components/shared/Container'
import { ResumeButton } from '@/components/shared/ResumeButton'
import { Reveal } from '@/components/shared/Reveal'
import { SocialLinks } from '@/components/shared/SocialLinks'
import { Button } from '@/components/ui/button'
import { profile } from '@/content/profile'

import { ProfileSummaryCard } from './ProfileSummaryCard'

export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="border-b">
      <Container className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[3fr_2fr] lg:gap-16 lg:py-28">
        <Reveal>
          <p className="inline-flex items-center gap-1.5 rounded-full border bg-muted/60 px-3 py-1 text-sm text-muted-foreground">
            <MapPin aria-hidden="true" className="size-3.5" />
            {profile.location}
          </p>
          <h1
            id="hero-heading"
            className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            {profile.name}
          </h1>
          <p className="mt-3 text-xl font-medium text-primary sm:text-2xl">{profile.title}</p>
          <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
            {profile.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/#projects">
                View projects
                <ArrowRight aria-hidden="true" data-icon="inline-end" />
              </Link>
            </Button>
            <ResumeButton />
          </div>
          <SocialLinks includeEmail className="mt-8" />
        </Reveal>
        <Reveal delay={0.1}>
          <ProfileSummaryCard />
        </Reveal>
      </Container>
    </section>
  )
}
