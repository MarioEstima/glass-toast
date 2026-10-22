import { StyleSheet, View, type ViewStyle } from 'react-native'

import type { ReactNode } from 'react'
import type { ToastScheme, ToastVariant, SolidTokens, ToastWidth, ToastDimensions } from '../types/toast'
import { VARIANT_METRICS } from '../constants/defaults'

type MaterialTokens = SolidTokens

/**
 * Opaque monochrome toast surface with optional layout overrides.
 */
export function GlassSurface(props: {
  scheme: ToastScheme
  tokens: MaterialTokens
  variant: ToastVariant
  width?: ToastWidth
  borderRadius?: number
  dimensions?: ToastDimensions
  children?: ReactNode
  style?: ViewStyle | ViewStyle[]
}) {
  const { scheme, tokens, variant, width = 'full', borderRadius = 0, dimensions, children, style } = props
  const metrics = VARIANT_METRICS[variant]
  const radius = borderRadius > 0 ? borderRadius : metrics.radius
  const customWidth = width !== 'hug' && width !== 'full' ? width : dimensions?.width

  const shadowColor = scheme === 'dark' ? 'rgba(0, 0, 0, 1)' : 'rgba(15, 23, 42, 1)'

  return (
    <View
      style={[
        styles.surface,
        width === 'hug' && styles.hug,
        {
          backgroundColor: tokens.surface,
          paddingHorizontal: dimensions?.paddingHorizontal ?? metrics.paddingX,
          width: customWidth ?? (width === 'hug' ? 'auto' : '100%'),
          maxWidth: dimensions?.maxWidth ?? 420,
          height: dimensions?.height,
          minHeight: dimensions?.minHeight,
          borderRadius: radius,
          borderWidth: 0,
          shadowColor,
          shadowOpacity: scheme === 'dark' ? 0.4 : 0.14,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 10 },
          elevation: 6,
          boxShadow: `0 10px 28px rgba(2, 6, 23, ${scheme === 'dark' ? 0.4 : 0.12}), 0 2px 6px rgba(2, 6, 23, ${scheme === 'dark' ? 0.28 : 0.06})`,
        },
        style,
      ]}
    >
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
