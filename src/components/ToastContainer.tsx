import { useCallback, useState } from 'react'
import { Platform, StyleSheet, View } from 'react-native'

import type { ToastEntry, ToastScheme, ToastThemeTokens, GlassTokens, SolidTokens } from '../types/toast'
import { STACK_GAP, STACK_PEEK } from '../constants/defaults'
import { AnimatedToast } from './AnimatedToast'
import { GlassSurface } from './GlassSurface'
import { ToastContent } from './ToastContent'
import { ToastClose } from './ToastClose'

type SurfaceProps = {
  scheme: ToastScheme
  tokens: ToastThemeTokens
  blur: number
  animatedIcon: boolean
}

type MaterialTokens = GlassTokens | SolidTokens

/** Resolves the material for a toast: liquid glass vs solid card. */
function materialOf(tokens: ToastThemeTokens, variant: ToastEntry['variant']): MaterialTokens {
  return variant === 'glass' ? tokens.glass : tokens.solid
}

type StackProps = {
  stackMode: 'stack' | 'list'
  stackGap: 'tight' | 'normal' | 'loose'
  inset: number
}

type ContainerProps = {
  side: 'top' | 'bottom'
  toasts: ToastEntry[]
  surfaceProps: SurfaceProps
  stackProps: StackProps
  /** User intent to dismiss: plays the exit animation. */
  onDismiss: (id: string) => void
  /** Exit animation finished: removes the toast from the store. */
  onRemoved: (id: string) => void
}

type Column = 'left' | 'center' | 'right'

const ESTIMATED_TOAST_HEIGHT = 64

/** Fixed on web (portal + scrollable page); absolute on native. */
const LAYER_POSITION = Platform.OS === 'web' ? 'fixed' : 'absolute'

const COLUMN_ALIGNMENT: Record<Column, 'flex-start' | 'center' | 'flex-end'> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
}

function columnOf(position: string): Column {
  if (position.endsWith('-left')) return 'left'
  if (position.endsWith('-right')) return 'right'
  return 'center'
}

/**
 * Overlay for one screen side (`top` / `bottom`). Splits toasts into
 * left / center / right columns and applies the collapsed-stack depth
 * effect: behind toasts slide under the active one, leaving a small
 * peek of glass visible.
 */
export function ToastContainer(props: ContainerProps) {
  const { side, toasts, surfaceProps, stackProps, onDismiss, onRemoved } = props
  const { scheme, tokens, blur, animatedIcon } = surfaceProps
  const { stackMode, stackGap, inset } = stackProps

  const [heights, setHeights] = useState<Record<string, number>>({})

  const measure = useCallback((id: string, height: number) => {
    setHeights((prev) => (prev[id] === height ? prev : { ...prev, [id]: height }))
  }, [])

  if (toasts.length === 0) return null

  const gap = STACK_GAP[stackGap]

  const columns: Record<Column, ToastEntry[]> = { left: [], center: [], right: [] }
  for (const toast of toasts) {
    columns[columnOf(toast.position)].push(toast)
  }

  return (
    <View pointerEvents="box-none" style={[styles.layer, side === 'top' ? { top: inset } : { bottom: inset }]}>
      {(['center', 'left', 'right'] as const).map((column) => {
        const columnToasts = columns[column]
        if (columnToasts.length === 0) return null

        // Back-to-front so the active toast paints above the others.
        const ordered = [...columnToasts].reverse()

        return (
          <View key={column} pointerEvents="box-none" style={[styles.column, { alignItems: COLUMN_ALIGNMENT[column] }]}>
            {ordered.map((toast, index) => {
              const depth = ordered.length - 1 - index
              const stacked = stackMode === 'stack' && depth > 0
              const frontHeight =
                index + 1 < ordered.length ? heights[ordered[index + 1].id] ?? ESTIMATED_TOAST_HEIGHT : 0

              // Tuck position: the toast slides under the one in front,
              // leaving STACK_PEEK px of itself visible below (top) or
              // above (bottom) that toast's edge.
              const tuckOffset = stacked ? Math.max(0, frontHeight - STACK_PEEK) : 0
              // The flow slot reserves peek + gap so hidden toasts stay reachable.
              const marginTop = depth > 0 ? (stacked ? STACK_PEEK + gap : gap) : 0

              return (
                <AnimatedToast
                  key={toast.id}
                  side={side}
                  column={column}
                  exiting={toast.exiting}
                  tuckOffset={tuckOffset}
                  onExited={() => onRemoved(toast.id)}
                  style={[styles.toastWrapper, { marginTop, zIndex: 50 - depth, elevation: 50 - depth }]}
                >
                  <View
                    onLayout={(event) => measure(toast.id, event.nativeEvent.layout.height)}
                    style={styles.measurer}
                    pointerEvents="box-none"
                  >
                    <GlassSurface scheme={scheme} tokens={materialOf(tokens, toast.variant)} variant={toast.variant} blur={blur}>
                      <ToastContent toast={toast} tokens={materialOf(tokens, toast.variant)} animatedIcon={animatedIcon} />
                      {toast.dismissible ? (
                        <ToastClose
                          tokens={materialOf(tokens, toast.variant)}
                          size={toast.size}
                          onPress={() => onDismiss(toast.id)}
                        />
                      ) : null}
                    </GlassSurface>
                  </View>
                </AnimatedToast>
              )
            })}
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  layer: {
    position: LAYER_POSITION,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    pointerEvents: 'box-none',
  } as import('react-native').ViewStyle,
  column: {
    flex: 1,
    pointerEvents: 'box-none',
  },
  toastWrapper: {
    width: '100%',
    maxWidth: 420,
  },
  measurer: {
    width: '100%',
  },
})
