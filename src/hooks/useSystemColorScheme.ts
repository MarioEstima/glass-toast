import { useEffect, useState } from 'react'
import { Appearance } from 'react-native'

export type ResolvedToastTheme = 'light' | 'dark'

function readSystemTheme(): ResolvedToastTheme {
  try {
    return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

/**
 * Cross-platform system color scheme with live updates.
 *
 * On web it combines RN's `Appearance` listener with the native
 * `prefers-color-scheme` media query, so it works even when RNW's
 * `useColorScheme` was not wired up by the host app.
 * Returns `'light'` during SSR and in non-browser environments.
 */
export function useSystemColorScheme(): ResolvedToastTheme {
  const [scheme, setScheme] = useState<ResolvedToastTheme>(readSystemTheme)

  useEffect(() => {
    let mounted = true

    const sync = () => {
      if (mounted) setScheme(readSystemTheme())
    }

    const subscription = Appearance.addChangeListener(sync)

    let removeMedia: (() => void) | undefined
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      try {
        const media = window.matchMedia('(prefers-color-scheme: dark)')
        media.addEventListener('change', sync)
        removeMedia = () => media.removeEventListener('change', sync)
      } catch {
        removeMedia = undefined
      }
    }

    return () => {
      mounted = false
      subscription.remove()
      removeMedia?.()
    }
  }, [])

  return scheme
}
