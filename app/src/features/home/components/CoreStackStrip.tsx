import { profile } from '@/content/profile'

/** Hero strip listing `profile.coreStack`. */
export function CoreStackStrip() {
  return (
    <div className="rounded-2xl bg-muted/70 p-1.5 ring-1 ring-border">
      <div className="flex flex-col gap-4 rounded-xl bg-card px-5 py-4 shadow-xs ring-1 ring-foreground/5 xl:flex-row xl:items-center xl:gap-6">
        <div className="shrink-0 xl:border-r xl:pr-6">
          <p className="text-[0.6875rem] font-bold tracking-[0.16em] text-primary uppercase">
            Core stack
          </p>
          <p className="mt-0.5 font-semibold text-foreground">{profile.coreStackHeading}</p>
        </div>
        <ul
          aria-label="Core stack"
          className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-2.5 xl:justify-between"
        >
          {profile.coreStack.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-sm font-medium whitespace-nowrap text-foreground"
            >
              <span aria-hidden="true" className="size-1.5 rounded-full bg-primary/70" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
