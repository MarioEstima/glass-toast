import { useEffect } from 'react'
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type { ToastAnimation } from '../types/toast'
import { ANIMATION, ANIMATION_SPRINGS } from '../constants/defaults'

type AnimatedToastProps = {
  /** Screen edge the toast belongs to. */
  side: 'top' | 'bottom'
  column: 'left' | 'center' | 'right'
  exiting: boolean
  /** Enter/exit animation preset. */
  animation: ToastAnimation
  /**
   * Distance between the toast's untucked (flow) position and its tucked
   * position under the toast in front, in px. `0` = front toast.
   */
  tuckOffset: number
  onExited: () => void
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

/**
 * Toast lifecycle animations:
 *
 * - enter: slides in from the screen edge (spring/bounce/slide) or fades in.
 * - exit: slides back out and fades, then reports completion.
 * - stack depth: slides toward the active toast while shrinking slightly,
 *   leaving a peek of glass visible behind it.
 */
export function AnimatedToast(props: AnimatedToastProps) {
  const { side, column, exiting, tuckOffset, onExited, children, style, animation } = props

  const hiddenOffset = side === 'top' ? -120 : 120
  const sign = side === 'top' ? 1 : -1

  const progress = useSharedValue(0)
  const tuckProgress = useSharedValue(tuckOffset > 0 ? 0 : 1)

  useEffect(() => {
    if (exiting) {
      cancelAnimation(progress)
      // The timing callback runs on the UI runtime (Reanimated 4 / Worklets);
      // `onExited` is a JS-thread React closure, so it must be scheduled with
      // `runOnJS` — calling it synchronously throws
      // "Tried to synchronously call a Remote Function. Called 'anonymous' on
      // the UI Runtime."
      progress.value = withTiming(0, { duration: ANIMATION.exit }, (finished) => {
        // Runs on the UI runtime. The directive is mandatory for a bundled
        // library: the Worklets Babel plugin only auto-workletizes callbacks
        // it recognises by callee name, and bundlers rename duplicate imports
        // (e.g. `useAnimatedStyle` -> `useAnimatedStyle2`), which would leave
        // this callback as a remote function and throw
        // "Tried to synchronously call a Remote Function" in the consumer app.
        'worklet'
        if (finished) runOnJS(onExited)()
      })
    } else {
      progress.value = withSpring(1, ANIMATION_SPRINGS[animation])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exiting, animation])

  useEffect(() => {
    tuckProgress.value = withTiming(tuckOffset > 0 ? 1 : 0, { duration: ANIMATION.stack })
  }, [tuckOffset, tuckProgress])

  const animated = useAnimatedStyle(() => {
    // See the note in the exit callback: bundled libraries must workletize
    // explicitly instead of relying on the plugin's name-based detection.
    'worklet'
    const base = progress.value
    const tucked = tuckProgress.value

    // `fade` keeps the slide distance at zero and relies on opacity only.
    const travel = animation === 'fade' ? 0 : hiddenOffset
    const enterOffset = (1 - base) * travel
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
  }, [progress, tuckProgress, hiddenOffset, sign, column, tuckOffset, animation])

  return (
    <Animated.View style={[style, animated]} pointerEvents={exiting ? 'none' : 'auto'}>
      {children}
    </Animated.View>
  )
}
