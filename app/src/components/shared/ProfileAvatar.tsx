import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { profile } from '@/content/profile'
import { getInitials } from '@/lib/format'
import { cn } from '@/lib/utils'

interface ProfileAvatarProps {
  /** Hide from assistive technology when the name is shown next to the avatar. */
  decorative?: boolean
  /** Size, ring, and text classes, e.g. `size-24 text-2xl`. */
  className?: string
}

/**
 * Circular avatar for `profile.photoUrl`, or initials when no photo is set.
 * The photo is a plain `<img>` (not Radix `AvatarImage`) so it renders on the
 * first paint instead of waiting for a load event.
 */
export function ProfileAvatar({ decorative = false, className }: ProfileAvatarProps) {
  return (
    <Avatar className={cn('size-10 rounded-full bg-muted', className)}>
      {profile.photoUrl ? (
        <img
          src={profile.photoUrl}
          alt={decorative ? '' : profile.name}
          className="aspect-square size-full rounded-full object-cover"
        />
      ) : (
        <AvatarFallback
          aria-hidden={decorative || undefined}
          className="bg-primary [font-size:inherit] font-bold tracking-tight text-primary-foreground"
        >
          {getInitials(profile.name)}
        </AvatarFallback>
      )}
    </Avatar>
  )
}
