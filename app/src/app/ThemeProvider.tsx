import { useEffect, useState, type ReactNode } from 'react'

import { ThemeContext } from '@/hooks/useTheme'
import { applyTheme, getInitialTheme, writeThemeCookie, type Theme } from '@/lib/theme'

interface ThemeProviderProps {
  children: ReactNode
}

/**
 * Holds the active theme. Only an explicit choice is saved, so a visitor who
 * never uses the toggle keeps following their system setting on later visits.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setTheme = (next: Theme) => {
    writeThemeCookie(next)
    setThemeState(next)
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
