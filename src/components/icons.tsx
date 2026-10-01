import { useEffect, type ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { AlertTriangle, Bell, Check, Info, X } from 'lucide-react-native'

import type { ToastIconProps } from '../types/toast'

type GlyphProps = { size: number; color: string; animated: boolean }

const SPRING = { damping: 15, stiffness: 170, mass: 0.7 }

/** Scale pop-in applied to every glyph. */
function usePopIn(animated: boolean) {
  const scale = useSharedValue(animated ? 0.55 : 1)

  useEffect(() => {
    if (!animated) return
    scale.value = withDelay(60, withSpring(1, SPRING))
    return () => cancelAnimation(scale)
  }, [animated, scale])

  return useAnimatedStyle(
    () => ({ transform: [{ scale: scale.value }] }),
    [scale],
  )
}

/** Fade + slide intro used as the secondary beat of each glyph. */
function useFadeRise(animated: boolean, from: number, delay: number) {
  const progress = useSharedValue(animated ? 0 : 1)

  useEffect(() => {
    if (!animated) return
    progress.value = withDelay(delay, withTiming(1, { duration: 240 }))
    return () => cancelAnimation(progress)
  }, [animated, progress, delay])

  return useAnimatedStyle(
    () => ({
      opacity: progress.value,
      transform: [{ translateY: (1 - progress.value) * from }],
    }),
    [progress, from],
  )
}

function Glyph(props: GlyphProps & { children: ReactNode; beat: 'check' | 'cross' | 'rise' | 'drop' }) {
  const { size, animated, children, beat } = props
  const pop = usePopIn(animated)
  const rise = useFadeRise(animated, beat === 'rise' ? size * 0.18 : -size * 0.18, beat === 'check' ? 140 : 200)

  return (
    <Animated.View style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, pop]}>
      <Animated.View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center' }, rise]}>
        {children}
      </Animated.View>
    </Animated.View>
  )
}

/** Built-in animated icon rendered for each toast type (lucide glyphs). */
export function ToastIcon({ type, size, color, animated }: ToastIconProps & { animated: boolean }) {
  const stroke = Math.max(2, size * 0.11)

  switch (type) {
    case 'success':
      return (
        <Glyph size={size} color={color} animated={animated} beat="check">
          <Check width={size} height={size} color={color} strokeWidth={stroke} />
        </Glyph>
      )
    case 'error':
      return (
        <Glyph size={size} color={color} animated={animated} beat="cross">
          <X width={size} height={size} color={color} strokeWidth={stroke} />
        </Glyph>
      )
    case 'warning':
      return (
        <Glyph size={size} color={color} animated={animated} beat="rise">
          <AlertTriangle width={size} height={size} color={color} strokeWidth={stroke} />
        </Glyph>
      )
    case 'info':
      return (
        <Glyph size={size} color={color} animated={animated} beat="rise">
          <Info width={size} height={size} color={color} strokeWidth={stroke} />
        </Glyph>
      )
    default:
      return (
        <Glyph size={size} color={color} animated={animated} beat="drop">
          <Bell width={size} height={size} color={color} strokeWidth={stroke} />
        </Glyph>
      )
  }
}
