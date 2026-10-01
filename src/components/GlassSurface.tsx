import { Platform, StyleSheet, View, type ViewStyle } from 'react-native'

import type { ReactNode } from 'react'
import type { ToastScheme, ToastVariant, GlassTokens, SolidTokens } from '../types/toast'
import { VARIANT_METRICS } from '../constants/defaults'

type MaterialTokens = GlassTokens | SolidTokens

const IS_WEB = Platform.OS === 'web'

/**
 * Toast surface in two materials:
 *
 * - **glass** (liquid glass): translucent tinted base with a real
 *   `backdrop-filter` blur on web, a sheen overlay and an inner light ring.
 * - **solid** (toast / notification / popover): opaque soft card with a
 *   hairline border and depth shadows.
 *
 * Both share the same depth shadows and per-variant metrics.
 */
export function GlassSurface(props: {
  scheme: ToastScheme
  tokens: MaterialTokens
  variant: ToastVariant
  blur: number
  children?: ReactNode
  style?: ViewStyle | ViewStyle[]
}) {
  const { scheme, tokens, variant, blur, children, style } = props
  const metrics = VARIANT_METRICS[variant]
  const isGlass = variant === 'glass'
  const glass = isGlass ? (tokens as GlassTokens) : null

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
        {
          backgroundColor: tokens.surface,
          borderRadius: metrics.radius,
          borderWidth: metrics.borderWidth,
          borderColor: tokens.border,
          shadowColor,
          shadowOpacity: scheme === 'dark' ? 0.45 : 0.16,
          shadowRadius: 24,
          shadowOffset: { width: 0, height: 12 },
          elevation: 8,
          boxShadow: `0 12px 32px rgba(2, 6, 23, ${scheme === 'dark' ? 0.45 : 0.14}), 0 2px 8px rgba(2, 6, 23, ${scheme === 'dark' ? 0.3 : 0.08})`,
        },
        webBlur,
        style,
      ]}
    >
      {glass ? (
        <View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, styles.sheen, { backgroundColor: glass.surfaceHighlight, borderRadius: metrics.radius }]}
        />
      ) : null}
      {glass ? (
        <View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, styles.innerRing, { borderColor: glass.border, borderRadius: Math.max(0, metrics.radius - 1) }]}
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
  sheen: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
  },
  innerRing: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderWidth: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
