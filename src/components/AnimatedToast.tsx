import { useEffect } from 'react'
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { ANIMATION } from '../constants/defaults'

type AnimatedToastProps = {
  /** Screen edge the toast belongs to. */
  side: 'top' | 'bottom'
  column: 'left' | 'center' | 'right'
  exiting: boolean
  /**
   * Distance between the toast's untucked (flow) position and its tucked
   * position under the toast in front, in px. `0` = front toast.
   */
  tuckOffset: number
  onExited: () => void
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

const SPRING_CONFIG = { damping: 17, stiffness: 210, mass: 0.8 }

/**
 * Toast lifecycle animations:
 *
 * - enter: slides in from the screen edge with a spring.
 * - exit: slides back out and fades, then reports completion.
 * - stack depth: slides toward the active toast while shrinking slightly,
 *   leaving a peek of glass visible behind it.
 */
export function AnimatedToast(props: AnimatedToastProps) {
  const { side, column, exiting, tuckOffset, onExited, children, style } = props

  const hiddenOffset = side === 'top' ? -120 : 120
  const sign = side === 'top' ? 1 : -1

  const progress = useSharedValue(0)
  const tuckProgress = useSharedValue(tuckOffset > 0 ? 0 : 1)

  useEffect(() => {
    if (exiting) {
      cancelAnimation(progress)
      progress.value = withTiming(0, { duration: ANIMATION.exit }, (finished) => {
        if (finished) onExited()
      })
    } else {
      progress.value = withSpring(1, SPRING_CONFIG)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exiting])

  useEffect(() => {
    tuckProgress.value = withTiming(tuckOffset > 0 ? 1 : 0, { duration: ANIMATION.stack })
  }, [tuckOffset, tuckProgress])

  const animated = useAnimatedStyle(() => {
    const base = progress.value
    const tucked = tuckProgress.value

    const enterOffset = (1 - base) * hiddenOffset
    // Untucked toasts rest at their flow position; tucked ones slide under
    // the toast in front, toward the screen edge.
    const untuck = (1 - tucked) * tuckOffset * sign

    return {
      transform: [
        { translateY: enterOffset + untuck },
        { translateX: column === 'left' ? (1 - base) * -40 : column === 'right' ? (1 - base) * 40 : 0 },
        { scale: 1 - tucked * 0.06 },
      ],
      opacity: base * (1 - tucked * 0.35),
    }
  }, [progress, tuckProgress, hiddenOffset, sign, column, tuckOffset])

  return (
    <Animated.View style={[style, animated]} pointerEvents={exiting ? 'none' : 'auto'}>
      {children}
    </Animated.View>
  )
}
