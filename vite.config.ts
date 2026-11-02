import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * Link-preview scrapers need absolute URLs. When `SITE_URL` (e.g.
 * `https://example.com`) is set at build time, make social image URLs absolute
 * and add `og:url`. Without it, the relative defaults in index.html are kept.
 */
function siteUrlPlugin(): Plugin {
  return {
    name: 'portfolio-site-url',
    transformIndexHtml(html) {
      const raw = process.env.SITE_URL?.trim()
      if (!raw) return html

      const origin = new URL(raw).origin
      return html
        .replaceAll('content="/og-image.png"', `content="${origin}/og-image.png"`)
        .replace(
          '<meta property="og:type"',
          `<meta property="og:url" content="${origin}/" />\n    <meta property="og:type"`,
        )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteUrlPlugin()],
  // Source lives in app/src; static files in app/public. index.html stays at the
  // project root so Vite's root (and `npm run dev/build/preview`) is unchanged.
  publicDir: 'app/public',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./app/src', import.meta.url)),
    },
  },
  // `base` stays "/": assets load from absolute /assets/... paths, which nested
  // routes like /projects/:slug need after a host rewrite to index.html.
})
