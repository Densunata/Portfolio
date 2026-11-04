# Architecture

## Source layout

```
app/
  src/
    app/            App.tsx, routes.tsx (route table), providers.tsx
    components/
      ui/           shadcn/ui generated primitives
      shared/       cross-feature components: layout (SiteLayout, Sidebar, Navbar, MobileNavigation, Footer),
                    building blocks (Container, PageHeader, SectionGrid, Section, SectionHeading,
                    IconTile, Reveal),
                    and SocialLinks, ResumeButton, TechnologyBadge/TechnologyList, NotFoundPage
    features/
      home|about|projects|experience|contact/
        components/ feature-only components
        pages/      route-level page components
    content/        typed site content: profile, projects, experience, skills, education,
                    certifications, site (page titles, intros, meta descriptions)
    types/          content.ts: the content model
    lib/            utils (cn), navigation (nav items), format (dates, initials)
    hooks/          usePageMetadata (per-route title, description, social tags)
    styles/         globals.css: Tailwind entry and theme tokens
    test/           Vitest setup and helpers (renderRoute)
    main.tsx        entry point (loaded by /index.html)
  public/           copied as-is to the site root (/favicon.svg, /images/..., /resume/...)
    favicon.svg, apple-touch-icon.png, og-image.png (1200×630 link preview), robots.txt
    images/         project screenshots
    resume/         redacted public CV (PDF); not present yet
```

Imports use the `@/` alias (→ `app/src/`), configured in `tsconfig.json`, `tsconfig.app.json`, and `vite.config.ts`. `index.html` and all tool configs stay at the project root, so Vite's root and every `npm` script are unchanged. Vite is pointed at `app/public` via `publicDir`.

## Routes

| Path              | Page                                                       |
| ----------------- | ---------------------------------------------------------- |
| `/`               | Home: all sections, with in-page anchors (`/#projects`, …) |
| `/about`          | Background, skills, education, certifications, training    |
| `/projects`       | All projects                                               |
| `/projects/:slug` | Project case study (slug from content)                     |
| `/experience`     | Employment history with links to related case studies      |
| `/contact`        | Email, LinkedIn, location, resume (pending)                |
| `*`               | Not found (`noindex`)                                      |

The sidebar (large screens), the mobile menu, and the footer link to the pages. `NavLink` sets `aria-current="page"` on the current link, and Projects stays highlighted on case-study pages.

## Conventions

The full rules for both people and AI agents are in [`config/ai/agents/instructions.md`](../config/ai/agents/instructions.md). Key points:

- **Content is separate from presentation.** Edit text in `app/src/content/*.ts`, not inside components. Only add facts that the CV supports or that Raiden has confirmed.
- **Feature-first.** A component used by one feature stays in that feature. Move it to `components/shared` once a second feature needs it.
- **Theme tokens, not raw colors.** Use `bg-primary`, `text-muted-foreground`, and similar classes. Change the palette in `app/src/styles/globals.css`.
- **Accessible by default.** Use semantic landmarks, one `h1` per page, visible focus states, and AA contrast. Respect reduced motion.
- **Tests sit next to the code** (`*.test.ts(x)`) and query by role.

## Homepage

`features/home/pages/HomePage.tsx` composes the sections in order: Hero (with the core-stack strip), About, Skills, What I Do, Featured Projects, Experience, Education, Certifications, Contact. Each section uses the shared `Section` component and lives in the feature it belongs to. The dedicated pages reuse the same section and list components. In-page links such as the hero's "View projects" (`/#projects`) still work, because React Router's `ScrollRestoration` scrolls to the target section.

## Layout

- **Shell** (`SiteLayout`): on `lg` and up, a sticky `Sidebar` (profile, social links, primary navigation) sits beside the content. Below `lg`, a compact top bar (`Navbar`) with the disclosure menu (`MobileNavigation`) replaces it. Both render in the DOM; CSS hides one, so only the sidebar carries the `Primary` navigation landmark.
- **Bento panels**: pages place `Section` panels inside a `SectionGrid` (a tinted, 12-column board on `lg`). Each `Section` takes `span="full" | "wide" | "narrow"` (12, 7, or 5 columns). Section bodies are container-query contexts (`@container`), so lists inside (project grid, experience, contact methods) adapt to the panel's width with `@2xl:`/`@3xl:` variants rather than viewport breakpoints.

## SEO and metadata

- **Static defaults** live in `index.html`: title, description, Open Graph and Twitter tags, favicon, touch icon, and theme color. Link-preview scrapers don't run JavaScript, so these are what they see on every URL. `app/src/content/site.test.ts` keeps the description in sync with `app/src/content/site.ts`.
- **Per-route values:** each page calls `usePageMetadata`, which updates the title, description, social titles, and `robots` in place. The not-found page is `noindex`.
- **Page copy:** titles, intros, and meta descriptions live in `app/src/content/site.ts`. Case studies use the project's name and summary.

## Decisions

1. **Static, content-driven SPA.** A portfolio needs no backend. Typed TS modules give compile-time checking of content without a CMS.
2. **TypeScript 6.0 instead of 7.** The Vite template now ships TS 7 (the native Go compiler), but `typescript-eslint` supports only `<6.1`. TS is pinned to `~6.0` so type-aware linting works. Revisit when typescript-eslint supports TS 7.
3. **ESLint instead of oxlint.** The Vite template's default is oxlint. ESLint was chosen for typescript-eslint's strict type-checked rules and the React Hooks plugin.
4. **React Router data router (`createBrowserRouter`)** with a single route table in `app/src/app/routes.tsx`. Tests reuse the same table through `createMemoryRouter`.
5. **No global state library.** Content is static imports, and UI state stays local.
6. **`cn` package.** Recent shadcn versions install the official `cn` package (a replacement for clsx + tailwind-merge). `@/lib/utils` re-exports it.
7. **Dark mode ready, not shipped.** `.dark` tokens exist in `globals.css`, but there is no toggle yet.
8. **`usePageMetadata` instead of React 19's `<title>`/`<meta>` hoisting.** Hoisting adds new tags alongside the static ones in `index.html`, which leaves duplicate descriptions and the wrong document title. The hook updates the existing tags in place. No helmet library is needed.
9. **Disclosure-style mobile menu, not a modal sheet.** A modal locks page scroll, which can stop `/#section` links from scrolling. The menu is an `aria-expanded` disclosure that closes on link click, Escape (focus returns to the toggle), outside click, and any navigation.
10. **`LazyMotion` with `domAnimation`.** This loads only the Motion features the site uses and cut about 50 KB from the bundle. `strict` mode throws an error if the full `motion.*` component is used.
11. **Application code under `app/`, tooling at the root.** `app/src` and `app/public` keep application files separate from configuration, docs, and AI-assistant files. `index.html` stays at the root so Vite's defaults (root, dev server, build) still apply. The only extra settings are `publicDir` and the `@/` alias path.
