import type {
  StackGap,
  ToastAnimation,
  ToastProviderProps,
  ToastSize,
  ToastThemeTokens,
  ToastVariant,
} from '../types/toast'

/**
 * Monochrome opaque palettes used by every toast variant.
 */
export const THEME_TOKENS: Record<'light' | 'dark', ToastThemeTokens> = {
  light: {
    solid: {
      surface: '#FFFFFF', border: '#E5E5E5', text: '#111111', textMuted: '#555555', close: '#555555',
      accents: { default: '#111111', success: '#111111', error: '#111111', warning: '#111111', info: '#111111' },
      badgeSoft: { default: '#EEEEEE', success: '#EEEEEE', error: '#EEEEEE', warning: '#EEEEEE', info: '#EEEEEE' },
      actionBg: '#111111', actionText: '#FFFFFF',
    },
  },
  dark: {
    solid: {
      surface: '#111111', border: '#333333', text: '#FFFFFF', textMuted: '#BBBBBB', close: '#BBBBBB',
      accents: { default: '#FFFFFF', success: '#FFFFFF', error: '#FFFFFF', warning: '#FFFFFF', info: '#FFFFFF' },
      badgeSoft: { default: '#2A2A2A', success: '#2A2A2A', error: '#2A2A2A', warning: '#2A2A2A', info: '#2A2A2A' },
      actionBg: '#FFFFFF', actionText: '#111111',
    },
  },
}

export const DEFAULT_PROVIDER: Omit<
  Required<ToastProviderProps>,
  'children' | 'onToastDismiss' | 'action' | 'borderRadius' | 'fontFamily' | 'dimensions' | 'showCloseButton'
> = {
  position: 'top',
  duration: 4000,
  maxToasts: 4,
  variant: 'toast' as ToastVariant,
  size: 'md' as ToastSize,
  theme: 'system',
  stackMode: 'stack',
  stackGap: 'normal',
  inset: 12,
  animatedIcon: true,
  animation: 'spring' as ToastAnimation,
  width: 'full' as const,
  iconBadge: 'solid' as const,
}

/** Visual metrics per variant: radius, border width and horizontal padding. */
export const VARIANT_METRICS: Record<
  ToastVariant,
  { radius: number; borderWidth: number; paddingX: number }
> = {
  toast: { radius: 999, borderWidth: 1, paddingX: 20 },
  notification: { radius: 999, borderWidth: 1, paddingX: 22 },
  popover: { radius: 20, borderWidth: 1, paddingX: 18 },
}

/** Size presets: icon, title, description, close sizes and vertical rhythm. */
export const SIZE_METRICS: Record<
  ToastSize,
  { icon: number; title: number; description: number; paddingY: number; gap: number; close: number; badge: number }
> = {
  sm: { icon: 14, title: 13, description: 11, paddingY: 12, gap: 2, close: 12, badge: 32 },
  md: { icon: 18, title: 15, description: 13, paddingY: 15, gap: 3, close: 14, badge: 40 },
  lg: { icon: 24, title: 17, description: 15, paddingY: 18, gap: 4, close: 16, badge: 48 },
}

/** Call-to-action button metrics per size. */
export const ACTION_METRICS: Record<ToastSize, { fontSize: number; paddingX: number; paddingY: number }> = {
  sm: { fontSize: 11, paddingX: 11, paddingY: 5 },
  md: { fontSize: 13, paddingX: 14, paddingY: 7 },
  lg: { fontSize: 15, paddingX: 17, paddingY: 9 },
}

/** Spacing between stacked toasts, in dp/px. */
export const STACK_GAP: Record<StackGap, number> = {
  tight: 4,
  normal: 8,
  loose: 14,
}

/** How much of a collapsed toast peeks behind the active one, in dp/px. */
export const STACK_PEEK = 10

/** Enter/exit animation timings, in ms. */
export const ANIMATION = {
  enter: 420,
  exit: 240,
  stack: 280,
}

/** Spring configs per animation preset. */
export const ANIMATION_SPRINGS: Record<ToastAnimation, { damping: number; stiffness: number; mass: number }> = {
  spring: { damping: 17, stiffness: 210, mass: 0.8 },
  bounce: { damping: 9, stiffness: 260, mass: 0.7 },
  slide: { damping: 26, stiffness: 180, mass: 1 },
  fade: { damping: 26, stiffness: 180, mass: 1 },
}
