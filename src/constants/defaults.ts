import type {
  StackGap,
  ToastAnimation,
  ToastProviderProps,
  ToastSize,
  ToastThemeTokens,
  ToastVariant,
} from '../types/toast'

/**
 * Material palettes per color scheme — fully OPAQUE pastel surfaces.
 *
 * - `glass`: kept for the `glass` variant (soft pastel tint, no blur needed
 *   since the base is opaque).
 * - `solid`: pastel pill cards used by the toast / notification / popover
 *   variants.
 */
export const GLASS_TOKENS: Record<'light' | 'dark', ToastThemeTokens> = {
  light: {
    glass: {
      surface: '#F4F1FF',
      surfaceHighlight: 'rgba(255, 255, 255, 0.6)',
      border: '#E4DEF9',
      text: '#3B3663',
      textMuted: 'rgba(59, 54, 99, 0.62)',
      close: 'rgba(59, 54, 99, 0.45)',
      accents: {
        default: '#8B87A8',
        success: '#5BAE8C',
        error: '#D97787',
        warning: '#D9A05B',
        info: '#7B87D9',
      },
      tints: {
        default: '#EDEAF6',
        success: '#E3F2EB',
        error: '#FBE7EA',
        warning: '#FAF0DE',
        info: '#E7EAFB',
      },
      badgeSoft: {
        default: '#ECEAF4',
        success: '#E0F2EA',
        error: '#FAE5E8',
        warning: '#F9EFDD',
        info: '#E6E9FA',
      },
      actionBg: '#EDEBFB',
      actionText: '#6C63D9',
    },
    solid: {
      surface: '#FFFFFF',
      border: '#ECE9F1',
      text: '#4A4458',
      textMuted: 'rgba(74, 68, 88, 0.58)',
      close: 'rgba(74, 68, 88, 0.42)',
      accents: {
        default: '#8B87A8',
        success: '#5BAE8C',
        error: '#D97787',
        warning: '#D9A05B',
        info: '#7B87D9',
      },
      badgeSoft: {
        default: '#F1EFF7',
        success: '#E4F4EC',
        error: '#FBE9EC',
        warning: '#F9F0DF',
        info: '#E8EBFA',
      },
      actionBg: '#EDEBFB',
      actionText: '#6C63D9',
    },
  },
  dark: {
    glass: {
      surface: '#26233A',
      surfaceHighlight: 'rgba(255, 255, 255, 0.06)',
      border: '#383452',
      text: '#E4E1F2',
      textMuted: 'rgba(228, 225, 242, 0.6)',
      close: 'rgba(228, 225, 242, 0.48)',
      accents: {
        default: '#A8A4C4',
        success: '#8CCBB2',
        error: '#E39AA6',
        warning: '#E3BD8C',
        info: '#9AA8E3',
      },
      tints: {
        default: '#312E47',
        success: '#24382F',
        error: '#3B2A2F',
        warning: '#3A3226',
        info: '#282E42',
      },
      badgeSoft: {
        default: '#332F4A',
        success: '#26382F',
        error: '#3B2A2F',
        warning: '#3A3226',
        info: '#282E42',
      },
      actionBg: '#373352',
      actionText: '#B4ADEF',
    },
    solid: {
      surface: '#26233A',
      border: '#383452',
      text: '#E4E1F2',
      textMuted: 'rgba(228, 225, 242, 0.6)',
      close: 'rgba(228, 225, 242, 0.48)',
      accents: {
        default: '#A8A4C4',
        success: '#8CCBB2',
        error: '#E39AA6',
        warning: '#E3BD8C',
        info: '#9AA8E3',
      },
      badgeSoft: {
        default: '#332F4A',
        success: '#26382F',
        error: '#3B2A2F',
        warning: '#3A3226',
        info: '#282E42',
      },
      actionBg: '#373352',
      actionText: '#B4ADEF',
    },
  },
}

export const DEFAULT_PROVIDER: Omit<
  Required<ToastProviderProps>,
  'children' | 'onToastDismiss' | 'action' | 'borderRadius' | 'fontFamily'
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
  blur: 0,
  animatedIcon: true,
  portal: true,
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
  glass: { radius: 26, borderWidth: 1, paddingX: 20 },
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
