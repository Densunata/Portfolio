import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/useTheme'

interface ThemeToggleProps {
  className?: string
}

/** Switches between light and dark. The icon shows the active theme. */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon-lg"
      className={className}
      aria-label="Toggle dark mode"
      aria-pressed={theme === 'dark'}
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
      }}
    >
      <Sun aria-hidden="true" className="dark:hidden" />
      <Moon aria-hidden="true" className="hidden dark:block" />
    </Button>
  )
}
