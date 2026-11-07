import { describe, expect, it } from 'vitest'

import { getScrollRestorationKey } from './scroll'

describe('getScrollRestorationKey', () => {
  it('keys a full page load by its URL, so pages do not share a position', () => {
    const about = { key: 'default', pathname: '/about', search: '', hash: '' }
    const prime = { key: 'default', pathname: '/projects/prime', search: '', hash: '' }

    expect(getScrollRestorationKey(about)).toBe('/about')
    expect(getScrollRestorationKey(prime)).toBe('/projects/prime')
  })

  it('keeps the query and hash in a full page load key', () => {
    expect(
      getScrollRestorationKey({ key: 'default', pathname: '/', search: '?a=1', hash: '#projects' }),
    ).toBe('/?a=1#projects')
  })

  it('keeps the unique key of in-app navigation, so back and forward restore per entry', () => {
    expect(
      getScrollRestorationKey({ key: 'abc123', pathname: '/about', search: '', hash: '' }),
    ).toBe('abc123')
  })
})
