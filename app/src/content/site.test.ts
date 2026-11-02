import { describe, expect, it } from 'vitest'

import indexHtml from '../../../index.html?raw'
import { siteDescription, siteTitle } from './site'

function staticMeta(selector: string) {
  const doc = new DOMParser().parseFromString(indexHtml, 'text/html')
  return {
    title: doc.title,
    content: doc.querySelector<HTMLMetaElement>(selector)?.content,
  }
}

describe('index.html static metadata', () => {
  it('matches the site defaults in app/src/content/site.ts', () => {
    expect(staticMeta('meta[name="description"]')).toEqual({
      title: siteTitle,
      content: siteDescription,
    })
    expect(staticMeta('meta[property="og:description"]').content).toBe(siteDescription)
    expect(staticMeta('meta[name="twitter:description"]').content).toBe(siteDescription)
    expect(staticMeta('meta[property="og:title"]').content).toBe(siteTitle)
  })

  it('references social image and icons that exist in /public', () => {
    expect(staticMeta('meta[property="og:image"]').content).toBe('/og-image.png')
    expect(indexHtml).toContain('href="/favicon.svg"')
    expect(indexHtml).toContain('href="/apple-touch-icon.png"')
  })
})
