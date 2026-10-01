import { Platform, StyleSheet, View, type ViewStyle } from 'react-native'

import type { ReactNode } from 'react'
import type { ToastScheme, ToastVariant, GlassTokens, SolidTokens, ToastWidth } from '../types/toast'
import { VARIANT_METRICS } from '../constants/defaults'

type MaterialTokens = GlassTokens | SolidTokens

const IS_WEB = Platform.OS === 'web'

/**
 * Toast surface in two materials:
 *
 * - **glass**: soft pastel surface (opaque by default; add `blur > 0` on web
 *   to restore the translucent backdrop-filter effect).
 * - **solid**: opaque pastel card used by toast / notification / popover.
 *
 * Both share the same depth shadows and per-variant metrics, with optional
 * overrides for width behavior and corner radius.
 */
export function GlassSurface(props: {
  scheme: ToastScheme
  tokens: MaterialTokens
  variant: ToastVariant
  blur: number
  width?: ToastWidth
  borderRadius?: number
  children?: ReactNode
  style?: ViewStyle | ViewStyle[]
}) {
  const { scheme, tokens, variant, blur, width = 'full', borderRadius = 0, children, style } = props
  const metrics = VARIANT_METRICS[variant]
  const isGlass = variant === 'glass'
  const glass = isGlass ? (tokens as GlassTokens) : null
  const radius = borderRadius > 0 ? borderRadius : metrics.radius

  const webBlur: ViewStyle | null =
    isGlass && IS_WEB && blur > 0
      ? ({
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
        } as unknown as ViewStyle)
      : null

  const shadowColor = scheme === 'dark' ? 'rgba(0, 0, 0, 1)' : 'rgba(15, 23, 42, 1)'

  return (
    <View
      style={[
        styles.surface,
        width === 'hug' && styles.hug,
        {
          backgroundColor: tokens.surface,
          borderRadius: radius,
          borderWidth: metrics.borderWidth,
          borderColor: tokens.border,
          shadowColor,
          shadowOpacity: scheme === 'dark' ? 0.4 : 0.14,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 10 },
          elevation: 6,
          boxShadow: `0 10px 28px rgba(2, 6, 23, ${scheme === 'dark' ? 0.4 : 0.12}), 0 2px 6px rgba(2, 6, 23, ${scheme === 'dark' ? 0.28 : 0.06})`,
        },
        webBlur,
        style,
      ]}
    >
      {glass ? (
        <View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, styles.sheen, { backgroundColor: glass.surfaceHighlight, borderRadius: radius }]}
        />
      ) : null}
      <View style={styles.content}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  surface: {
    overflow: 'hidden',
    maxWidth: 420,
    width: '100%',
  },
  hug: {
    width: 'auto',
    alignSelf: 'flex-start',
  },
  sheen: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
