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
 * System color scheme with live updates, backed by React Native's
 * `Appearance` listener. Works on iOS, Android and any other platform
 * implementing `Appearance`.
 */
export function useSystemColorScheme(): ResolvedToastTheme {
  const [scheme, setScheme] = useState<ResolvedToastTheme>(readSystemTheme)

  useEffect(() => {
    let mounted = true

    const sync = () => {
      if (mounted) setScheme(readSystemTheme())
    }

    const subscription = Appearance.addChangeListener(sync)

    return () => {
      mounted = false
      subscription.remove()
    }
  }, [])

  return scheme
}
