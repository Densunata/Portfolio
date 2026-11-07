# Project instructions — Raiden A. Victor portfolio

Canonical instructions for all coding agents. Tool-specific files (e.g. `config/ai/claude/CLAUDE.md`, loaded via the root `CLAUDE.md`) import this file; do not duplicate its content elsewhere. Human-facing docs live in `README.md` and `docs/`.

## Scope

- Frontend-only static SPA: React 19, TypeScript (strict), Vite, Tailwind CSS v4, shadcn/ui (radix-nova), React Router 8 (data router), Motion, Lucide.
- Not allowed without explicit approval: backend, database, auth, admin UI, Docker, global state libraries (Redux, Zustand), API integrations, new dependencies.
- Work in phases. Do not start the next phase without Raiden's approval.

## Content rules (important)

- All copy lives in `app/src/content/*.ts`, typed by `app/src/types/content.ts`. Components never hard-code biography, project, or experience text.
- Source of truth: Raiden's CV and facts Raiden provides. **Never invent** employers, dates, metrics, achievements, tech used, or project details. Leave a field empty and ask instead.
- Never publish phone number or street address.
- Case studies: omit any section you can't verify and add its key to `caseStudy.pending`. Keep `Experience` (employment) and `Project` (case study) as separate entries, linked by `experienceId`.

## Architecture

```
app/src/app/         App, router (routes.tsx), providers
app/src/components/  ui/ = shadcn generated · shared/ = cross-feature (layout, headings, cards)
app/src/features/<f>/components|pages   one folder per route area
app/src/content/     data only · app/src/types/ shared types · app/src/lib/ pure helpers
app/src/hooks/       shared hooks · app/src/test/ test setup + helpers
```

- A component used by one feature lives in that feature. Promote to `components/shared` only when a second feature needs it.
- Pages compose components; they don't own large markup blocks or data. `HomePage` composes section components exported by other features (e.g. `features/projects/components/FeaturedProjectsSection`).
- Content sections use `<Section id eyebrow title>` from `components/shared`. Primary nav (`app/src/lib/navigation.ts`) links to routes via `NavLink`, for active state. Homepage in-page links (`/#projects`) must match a `Section` id.
- Imports use the `@/` alias. No barrel `index.ts` files.

## TypeScript and React

- No `any`, no non-null `!` (narrow instead), no `@ts-ignore`. Use `import type` for types.
- Function components with named exports. Props typed via an `interface` named `<Component>Props`.
- Derive data in render; avoid `useEffect` for derived state. Add `useMemo`/`useCallback` only when profiling justifies it.
- Every page calls `usePageMetadata` (`app/src/hooks`) for its title and description; page copy lives in `app/src/content/site.ts`. Don't render `<title>`/`<meta>` in components: they would duplicate the static tags in `index.html`.
- Each page renders exactly one `<h1>`, via `PageHeader` (or the homepage hero). Lists under it go inside a titled `Section` so heading levels don't skip.

## Styling

- Tailwind utilities only; no CSS modules or inline `style`. Merge classes with `cn()` from `@/lib/utils`.
- Use semantic theme tokens (`bg-background`, `text-primary`, `text-muted-foreground`, `border`), never raw palette colors such as `blue-900`. Tokens are defined in `app/src/styles/globals.css`, light and `.dark`.
- Mobile-first: base styles for small screens, then `sm:`/`md:`/`lg:`. Content width `max-w-6xl` with `px-4 sm:px-6`.
- Design: navy and white, minimal, professional. No neon colors, heavy gradients, fake terminals, or decorative clutter.
- Motion: subtle (opacity/translate, <= 0.4s). Prefer the shared `<Reveal>`. Otherwise use `m.*` from `motion/react`, never `motion.*`: the app runs `LazyMotion strict` to keep the bundle small. `MotionConfig reducedMotion="user"` is global; don't bypass it.
- Project images: real screenshots only (`app/public/images`, served at `/images`). Without one, project cards omit the image area and the case-study Screenshots section shows `ImagePlaceholder`.
- Add shadcn components via `npx shadcn@latest add <name>`; don't hand-edit `components/ui` except for deliberate theme tweaks.

## Accessibility

- Semantic landmarks and one `<h1>` per page, with headings in order. Visible focus states. Icons are `aria-hidden` unless they are the only label.
- Maintain WCAG AA contrast with the token palette.

## Testing

- Vitest + React Testing Library. Tests sit next to the code as `*.test.ts(x)`.
- Query by role/label, not by class or test id. Use `renderRoute()` from `app/src/test/render-route.tsx` for page tests.
- New features need tests for rendering and any logic. Keep `app/src/content/content.test.ts` passing when editing content.

## Definition of done

Run `npm run check` (typecheck, lint, format check, tests, build) and confirm it passes before reporting work complete. Update `README.md` / `docs/` when commands, structure, or decisions change.
