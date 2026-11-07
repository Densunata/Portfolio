import { describe, expect, it } from 'vitest'

import indexHtml from '../../../index.html?raw'
import appleTouchIcon from '../../public/apple-touch-icon.png?inline'
import ogImage from '../../public/og-image.png?inline'
import { siteDescription, siteTitle } from './site'

/** The PNG header fields from a base64 data URL: signature, then the IHDR chunk. */
function readPngHeader(dataUrl: string) {
  const bytes = Uint8Array.from(atob(dataUrl.split(',')[1] ?? ''), (char) => char.charCodeAt(0))
  const view = new DataView(bytes.buffer)
  return {
    isPng: view.getUint32(0) === 0x89504e47,
    width: view.getUint32(16),
    height: view.getUint32(20),
    colorType: bytes[25],
  }
}

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

  it.each([
    ['og-image.png', ogImage, 1200, 630],
    ['apple-touch-icon.png', appleTouchIcon, 180, 180],
  ])('%s is an opaque PNG at the expected size', (_file, dataUrl, width, height) => {
    // Color type 2 is RGB, with no alpha channel.
    expect(readPngHeader(dataUrl)).toEqual({ isPng: true, width, height, colorType: 2 })
  })

  it('declares the dimensions of the social image', () => {
    expect(staticMeta('meta[property="og:image:width"]').content).toBe('1200')
    expect(staticMeta('meta[property="og:image:height"]').content).toBe('630')
  })
})
