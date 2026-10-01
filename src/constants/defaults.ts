import type {
  StackGap,
  ToastProviderProps,
  ToastSize,
  ToastThemeTokens,
  ToastVariant,
} from '../types/toast'

/**
 * Material palettes per color scheme.
 *
 * - `glass`: translucent liquid-glass material with sheen, inner ring and
 *   backdrop blur on web.
 * - `solid`: opaque soft cards used by the toast / notification / popover
 *   variants.
 */
export const GLASS_TOKENS: Record<'light' | 'dark', ToastThemeTokens> = {
  light: {
    glass: {
      surface: 'rgba(255, 255, 255, 0.62)',
      surfaceHighlight: 'rgba(255, 255, 255, 0.55)',
      border: 'rgba(255, 255, 255, 0.8)',
      text: '#0B1220',
      textMuted: 'rgba(15, 23, 42, 0.62)',
      close: 'rgba(15, 23, 42, 0.45)',
      accents: {
        default: 'rgba(71, 85, 105, 0.95)',
        success: 'rgba(5, 150, 105, 0.95)',
        error: 'rgba(220, 38, 38, 0.95)',
        warning: 'rgba(180, 83, 9, 0.95)',
        info: 'rgba(29, 78, 216, 0.95)',
      },
      tints: {
        default: 'rgba(148, 163, 184, 0.14)',
        success: 'rgba(16, 185, 129, 0.12)',
        error: 'rgba(239, 68, 68, 0.1)',
        warning: 'rgba(245, 158, 11, 0.12)',
        info: 'rgba(59, 130, 246, 0.1)',
      },
    },
    solid: {
      surface: '#FFFFFF',
      border: 'rgba(15, 23, 42, 0.08)',
      text: '#0F172A',
      textMuted: 'rgba(15, 23, 42, 0.58)',
      close: 'rgba(15, 23, 42, 0.42)',
      accents: {
        default: 'rgba(71, 85, 105, 0.95)',
        success: 'rgba(5, 150, 105, 0.95)',
        error: 'rgba(220, 38, 38, 0.95)',
        warning: 'rgba(180, 83, 9, 0.95)',
        info: 'rgba(29, 78, 216, 0.95)',
      },
    },
  },
  dark: {
    glass: {
      surface: 'rgba(10, 15, 22, 0.55)',
      surfaceHighlight: 'rgba(255, 255, 255, 0.08)',
      border: 'rgba(255, 255, 255, 0.12)',
      text: '#F1F5F9',
      textMuted: 'rgba(226, 232, 240, 0.62)',
      close: 'rgba(226, 232, 240, 0.5)',
      accents: {
        default: 'rgba(203, 213, 225, 0.95)',
        success: 'rgba(52, 211, 153, 0.95)',
        error: 'rgba(248, 113, 113, 0.95)',
        warning: 'rgba(251, 191, 36, 0.95)',
        info: 'rgba(96, 165, 250, 0.95)',
      },
      tints: {
        default: 'rgba(148, 163, 184, 0.12)',
        success: 'rgba(16, 185, 129, 0.16)',
        error: 'rgba(239, 68, 68, 0.16)',
        warning: 'rgba(245, 158, 11, 0.16)',
        info: 'rgba(59, 130, 246, 0.16)',
      },
    },
    solid: {
      surface: '#171D28',
      border: 'rgba(255, 255, 255, 0.08)',
      text: '#F1F5F9',
      textMuted: 'rgba(226, 232, 240, 0.6)',
      close: 'rgba(226, 232, 240, 0.5)',
      accents: {
        default: 'rgba(203, 213, 225, 0.95)',
        success: 'rgba(52, 211, 153, 0.95)',
        error: 'rgba(248, 113, 113, 0.95)',
        warning: 'rgba(251, 191, 36, 0.95)',
        info: 'rgba(96, 165, 250, 0.95)',
      },
    },
  },
}

export const DEFAULT_PROVIDER: Omit<
  Required<ToastProviderProps>,
  'children' | 'onToastDismiss'
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
  blur: 20,
  animatedIcon: true,
  portal: true,
}

/** Visual metrics per variant: radius, border width and horizontal padding. */
export const VARIANT_METRICS: Record<
  ToastVariant,
  { radius: number; borderWidth: number; paddingX: number }
> = {
  toast: { radius: 20, borderWidth: 1, paddingX: 14 },
  notification: { radius: 26, borderWidth: 1, paddingX: 16 },
  popover: { radius: 14, borderWidth: 1, paddingX: 12 },
  glass: { radius: 24, borderWidth: 1, paddingX: 14 },
}

/** Size presets: icon, title, description, close sizes and vertical rhythm. */
export const SIZE_METRICS: Record<
  ToastSize,
  { icon: number; title: number; description: number; paddingY: number; gap: number; close: number }
> = {
  sm: { icon: 16, title: 13, description: 11, paddingY: 8, gap: 2, close: 12 },
  md: { icon: 20, title: 15, description: 13, paddingY: 10, gap: 3, close: 14 },
  lg: { icon: 26, title: 17, description: 15, paddingY: 13, gap: 4, close: 16 },
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
