import { render } from '@testing-library/react'
import type { ReactNode } from 'react'
import { createMemoryRouter, RouterProvider } from 'react-router'

import { Providers } from '@/app/providers'
import { routes } from '@/app/routes'

/** Renders the real route tree at `path` inside an in-memory router. */
export function renderRoute(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  const result = render(
    <Providers>
      <RouterProvider router={router} />
    </Providers>,
  )
  return { ...result, router }
}

/** Renders a single component that needs router context (e.g. uses <Link>). */
export function renderWithRouter(ui: ReactNode) {
  const router = createMemoryRouter([{ path: '*', element: ui }])
  return render(
    <Providers>
      <RouterProvider router={router} />
    </Providers>,
  )
}
