# Deployment

The site is a static build: `npm run build` writes everything to `dist/`. Any static host works. **It has not been deployed, and no hosting account is connected.**

## Build settings

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

Add the matching config when the host is chosen (not committed yet):

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

## After choosing a domain

- Set `SITE_URL` in the host's build environment.
- Optionally add a `sitemap.xml` listing `/`, `/about`, `/projects`, `/experience`, `/contact`, and each `/projects/<slug>`, and reference it from `app/public/robots.txt`. It's omitted for now because it needs absolute URLs.
