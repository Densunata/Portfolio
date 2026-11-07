# Deployment

The site is a static build: `npm run build` writes everything to `dist/`. It is hosted on Vercel and **live at <https://victor-portfolio-dusky-eight.vercel.app>**. Every push to `main` deploys to production.

## Vercel

### Project settings

| Setting          | Value                                                  |
| ---------------- | ------------------------------------------------------ |
| Framework Preset | Vite                                                   |
| Root Directory   | `./` (repository root, **not** `app`)                  |
| Install Command  | Default (`npm install`)                                |
| Build Command    | `npm run build`                                        |
| Output Directory | `dist`                                                 |
| SPA rewrite      | [`vercel.json`](../vercel.json) at the repository root |

The Root Directory is the repository root because `package.json`, `index.html`, and `vite.config.ts` live there. `app/` only holds `src` and `public`, so a build from `app` fails.

Vercel serves real files first, so the rewrite doesn't affect `/assets`, `/images`, or `/resume`. A path that matches no file gets `index.html`, and React Router then renders the page or the in-app "Page not found".

### Environment variables

`SITE_URL` is the only one, and it's optional. It's read at build time in `vite.config.ts` and isn't exposed to client code.

| Environment | Value                                                                    |
| ----------- | ------------------------------------------------------------------------ |
| Preview     | Leave unset. Preview URLs change with each deployment.                   |
| Production  | Set to `https://victor-portfolio-dusky-eight.vercel.app`, the live site. |

### Preview deployment

Run these from the repository root. `vercel deploy` without `--prod` creates a preview from the local files, including uncommitted changes.

```bash
vercel login
vercel link
vercel deploy
```

**A new project can't start with a preview.** Vercel assigns a project's first deployment to Production and refuses a preview until that exists (CLI 65.12.1 reports `first_deployment_production`). For this project, that first deployment was made with `vercel deploy --prod --skip-domain`, which assigned no production domain, and later `vercel deploy` runs create previews.

Preview URLs are behind Vercel Authentication, so viewers must sign in to Vercel with access to the project. The production domain is public.

`vercel link` writes the project link to `.vercel/` and a short-lived `VERCEL_OIDC_TOKEN` to `.env.local`. Both are ignored by Git and left out of the upload. It also tries to connect the GitHub repository automatically, so check the project's Git settings afterwards. When it asks where the code is located, answer `./`.

**The GitHub repository is connected to Vercel, with `main` as the production branch.** Every push to `main`, including a merged pull request, deploys to production. Every push to another branch creates a preview, so open changes can be reviewed there first.

### Production deployment

Merging into `main` is the release step:

1. Review the change on its branch's preview.
2. Merge the pull request into `main`. Vercel builds and deploys it automatically.
3. Repeat the checks in [Verifying before going live](#verifying-before-going-live) on the production URL.

## Build settings for any host

| Setting          | Value                                                              |
| ---------------- | ------------------------------------------------------------------ |
| Install command  | `npm ci`                                                           |
| Build command    | `npm run build` (or `npm run check` to gate on tests)              |
| Output directory | `dist`                                                             |
| Node.js          | 22.12 or newer                                                     |
| `SITE_URL` (env) | Optional. Set it to the public origin, e.g. `https://example.com`. |

`SITE_URL` makes the Open Graph and Twitter image URLs absolute and adds `og:url`. Most link-preview scrapers need this. Without it, the build keeps relative URLs.

## Required: SPA rewrite

Routing happens in the browser. A direct visit or refresh on `/about`, `/projects/malayohub`, and similar paths asks the server for a file that doesn't exist. **The host must serve `/index.html` (status 200) for any path that isn't a real file.** Without this rewrite, every direct link except `/` returns a 404.

Vercel's is in place. Other hosts would need their own:

| Host             | Configuration                                                                                                                                      |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Netlify          | `app/public/_redirects` containing `/*  /index.html  200`                                                                                          |
| Vercel           | `vercel.json` at the project root: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`                                         |
| Cloudflare Pages | Nothing needed: serves `index.html` for unmatched paths when no `404.html` exists                                                                  |
| Firebase Hosting | `firebase.json` → `"hosting": { "public": "dist", "rewrites": [{ "source": "**", "destination": "/index.html" }] }`                                |
| GitHub Pages     | No rewrites. It needs a `404.html` copy of `index.html`, plus a `base` change in `vite.config.ts` if it's served from `/<repo>/`. Not recommended. |
| Nginx            | `location / { try_files $uri /index.html; }`                                                                                                       |

Hashed files in `dist/assets/` can be cached long-term (`Cache-Control: public, max-age=31536000, immutable`). `index.html` should not be cached.

## Verifying before going live

1. Run `npm run check`.
2. Run `npm run preview`. Vite's preview server applies the SPA fallback, so it behaves like a correctly configured host.
3. Open `/projects/malayohub` directly and refresh. The case study should render with the title "MalayoHub | Raiden A. Victor".
4. Open `/projects/not-real`. The in-app "Page not found" page should render.

Known limitation: unknown URLs return HTTP 200 with the in-app not-found page (a "soft 404"), which is normal for SPAs. The page sets `robots: noindex`.

## Changing the domain

- Update `SITE_URL` in the host's build environment and redeploy. It's read at build time, so the change needs a new build.
- Optionally add a `sitemap.xml` listing `/`, `/about`, `/projects`, `/experience`, `/contact`, and each `/projects/<slug>`, and reference it from `app/public/robots.txt`. It's omitted for now because it needs absolute URLs.
