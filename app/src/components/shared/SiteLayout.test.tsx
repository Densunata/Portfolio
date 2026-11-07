import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { renderRoute } from '@/test/render-route'

const STORAGE_KEY = 'react-router-scroll-positions'

async function renderWithSavedPositions(path: string, positions: Record<string, number>) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions))
  renderRoute(path)
  await screen.findByRole('heading', { level: 1 })
}

describe('SiteLayout scroll restoration', () => {
  const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined)

  beforeEach(() => {
    sessionStorage.clear()
    scrollTo.mockClear()
  })

  it('does not apply a position saved by a different page on a full page load', async () => {
    await renderWithSavedPositions('/projects/prime', { default: 1500, '/': 1500 })

    expect(scrollTo).not.toHaveBeenCalledWith(0, 1500)
  })

  it('restores the position saved for the same URL, as a refresh should', async () => {
    await renderWithSavedPositions('/projects/prime', { '/projects/prime': 700 })

    expect(scrollTo).toHaveBeenCalledWith(0, 700)
  })
})
