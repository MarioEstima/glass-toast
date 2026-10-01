import { useMemo } from 'react'
import { useSystemColorScheme } from './useSystemColorScheme'
import { GLASS_TOKENS } from '../constants/defaults'
import type { ToastThemeTokens } from '../types/toast'

/**
 * Resolves the effective color scheme for toasts.
 *
 * - `'system'` follows the OS appearance live.
 * - `'light'` / `'dark'` are forced regardless of the OS setting.
 *
 * Returns the resolved scheme and the matching glass tokens.
 */
export function useToastTheme(preference: 'system' | 'light' | 'dark' | undefined): {
  scheme: 'light' | 'dark'
  tokens: ToastThemeTokens
} {
  const systemScheme = useSystemColorScheme()
  const scheme = preference && preference !== 'system' ? preference : systemScheme
  const tokens = useMemo(() => GLASS_TOKENS[scheme], [scheme])
  return { scheme, tokens }
}
