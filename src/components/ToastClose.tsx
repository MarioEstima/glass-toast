import { Platform, Pressable, StyleSheet, View } from 'react-native'

import type { GlassTokens, SolidTokens } from '../types/toast'
import { SIZE_METRICS } from '../constants/defaults'

/** Rounded close button drawn with two rotated bars (no vector dependency). */
export function ToastClose(props: {
  tokens: GlassTokens | SolidTokens
  size: keyof typeof SIZE_METRICS
  onPress: () => void
}) {
  const { tokens, size, onPress } = props
  const metrics = SIZE_METRICS[size]
  const bar = Math.max(8, metrics.close)
  const thickness = Math.max(1.5, bar * 0.14)
  const hit = Math.max(28, bar * 1.8)

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Dismiss notification"
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed, { width: hit, height: hit, borderRadius: hit / 2 }]}
    >
      <View style={[styles.x, { width: bar, height: bar }]}>
        <View
          style={[
            StyleSheet.absoluteFill,
            styles.bar,
            { height: thickness, top: bar / 2 - thickness / 2, backgroundColor: tokens.close, transform: [{ rotate: '45deg' }] },
          ]}
        />
        <View
          style={[
            StyleSheet.absoluteFill,
            styles.bar,
            { height: thickness, top: bar / 2 - thickness / 2, backgroundColor: tokens.close, transform: [{ rotate: '-45deg' }] },
          ]}
        />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    opacity: 0.9,
    cursor: Platform.select({ web: 'pointer' }) as never,
  },
  pressed: {
    opacity: 0.55,
  },
  x: {},
  bar: {
    borderRadius: 999,
    position: 'absolute',
    left: 0,
    right: 0,
  },
})
