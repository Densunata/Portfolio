import { useEffect } from 'react'

import { profile } from '@/content/profile'
import { siteDescription, siteTitle } from '@/content/site'

interface PageMetadata {
  /** Page name; omitted for the homepage. Rendered as `<title> | <name>`. */
  title?: string
  description?: string
  /** Ask search engines not to index the page (e.g. not-found). */
  noIndex?: boolean
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.append(element)
  }
  element.setAttribute('content', content)
}

/**
 * Syncs the document title and description/social meta tags with the current
 * route. It updates the static tags from `index.html` in place rather than
 * adding duplicates.
 */
export function usePageMetadata({ title, description, noIndex = false }: PageMetadata) {
  const fullTitle = title ? `${title} | ${profile.name}` : siteTitle
  const fullDescription = description ?? siteDescription

  useEffect(() => {
    document.title = fullTitle
    setMeta('name', 'description', fullDescription)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', fullDescription)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', fullDescription)
    setMeta('name', 'robots', noIndex ? 'noindex' : 'index, follow')
  }, [fullTitle, fullDescription, noIndex])
}
