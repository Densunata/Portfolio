import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ResumeButton } from './ResumeButton'

const href = '/resume/Raiden-Victor-CV.pdf'

describe('ResumeButton', () => {
  it('shows a disabled placeholder and no PDF link while the resume is unavailable', () => {
    render(<ResumeButton resume={{ href, available: false }} />)

    expect(screen.getByRole('button', { name: 'Resume coming soon' })).toBeDisabled()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('opens the resume in a new tab and offers a download of the same file', () => {
    render(<ResumeButton resume={{ href, available: true }} />)

    const view = screen.getByRole('link', { name: /^View My Resume\s*\(opens in a new tab\)$/ })
    expect(view).toHaveAttribute('href', href)
    expect(view).toHaveAttribute('target', '_blank')
    expect(view).toHaveAttribute('rel', 'noopener noreferrer')
    expect(view).not.toHaveAttribute('download')

    const download = screen.getByRole('link', { name: 'Download resume (PDF)' })
    expect(download).toHaveAttribute('href', href)
    expect(download).toHaveAttribute('download')
  })
})
