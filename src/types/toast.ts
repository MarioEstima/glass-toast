import type { ComponentType, ReactNode } from 'react'

/** Visual type of a toast. */
export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info'

/** Screen corner where the toast stack is anchored. */
export type ToastPosition = 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right'

/** Visual variant of the toast surface. */
export type ToastVariant = 'toast' | 'notification' | 'popover' | 'glass'

/** Size preset controlling icon, text and paddings. */
export type ToastSize = 'sm' | 'md' | 'lg'

/** Color scheme used to render the glass surface. */
export type ToastTheme = 'light' | 'dark'

/** Resolved color scheme alias. */
export type ToastScheme = 'light' | 'dark'

/**
 * How the glass depth effect is layered.
 * - `stack`: iOS-style collapsed stack; behind-toasts peek under the active one (default).
 * - `list`: toasts are laid out vertically without the collapsed-stack effect.
 */
export type StackMode = 'stack' | 'list'

/** Gap between toasts, in dp/px. */
export type StackGap = 'tight' | 'normal' | 'loose'

/** Offset from the screen edges, in dp/px. */
export type EdgeInset = number

export interface ToastOptions {
  /** Custom toast identifier. One is generated when omitted. */
  id?: string
  /** Primary text. */
  title?: string
  /** Secondary text. */
  description?: string
  /** Visual type. Drives the animated icon and accent color. */
  type?: ToastType
  /** Time in ms before automatic dismissal. `0` keeps the toast visible until dismissed. */
  duration?: number
  /** Screen corner where this toast appears. */
  position?: ToastPosition
  /** Whether the toast can be dismissed by the user (close button / swipe aside on native). */
  dismissible?: boolean
  /** Called when the toast body is pressed. */
  onPress?: () => void
  /** Called after the toast is dismissed, for any reason. */
  onDismiss?: () => void
  /** Visual variant. Overrides the provider default. */
  variant?: ToastVariant
  /** Size preset. Overrides the provider default. */
  size?: ToastSize
  /** Custom icon component rendered instead of the built-in animated one. */
  icon?: ComponentType<ToastIconProps>
  /** Whether the toast is announced to screen readers. */
  accessibilityLive?: 'polite' | 'assertive' | 'off'
}

export type ToastConfig = Required<Omit<ToastOptions, 'icon' | 'accessibilityLive' | 'onPress' | 'onDismiss'>> & {
  icon?: ComponentType<ToastIconProps>
  accessibilityLive: 'polite' | 'assertive' | 'off'
  onPress?: () => void
  onDismiss?: () => void
}

/** Runtime state of a toast in the store. */
export interface ToastEntry extends ToastConfig {
  /** True while the toast is animating out, before being removed from the store. */
  exiting: boolean
}

/** Props received by custom icon components. */
export interface ToastIconProps {
  type: ToastType
  size: number
  color: string
}

/** Material tokens for the liquid-glass variant (translucent + blur). */
export interface GlassTokens {
  /** Translucent base surface color. */
  surface: string
  /** Highlight overlay that simulates the glass sheen. */
  surfaceHighlight: string
  /** Border color. */
  border: string
  /** Primary text color. */
  text: string
  /** Secondary text color. */
  textMuted: string
  /** Close button color. */
  close: string
  /** Accent color per toast type: default, success, error, warning, info. */
  accents: Record<ToastType, string>
  /** Tint applied behind the glass per toast type. */
  tints: Record<ToastType, string>
}

/** Material tokens for the solid card variants (toast / notification / popover). */
export interface SolidTokens {
  /** Opaque surface color. */
  surface: string
  /** Border color. */
  border: string
  /** Primary text color. */
  text: string
  /** Secondary text color. */
  textMuted: string
  /** Close button color. */
  close: string
  /** Accent color per toast type. */
  accents: Record<ToastType, string>
}

/** Resolved theme tokens consumed by the presentation components. */
export interface ToastThemeTokens {
  glass: GlassTokens
  solid: SolidTokens
}

export interface ToastProviderProps {
  children?: ReactNode
  /** Default position. Default: `'top'`. */
  position?: ToastPosition
  /** Default duration in ms. Default: `4000`. `0` disables auto-dismiss. */
  duration?: number
  /** Maximum visible toasts. Older ones are dismissed. Default: `4`. */
  maxToasts?: number
  /** Visual variant applied by default. Default: `'toast'`. */
  variant?: ToastVariant
  /** Size preset applied by default. Default: `'md'`. */
  size?: ToastSize
  /** Color scheme: `'system'` follows the OS appearance. Default: `'system'`. */
  theme?: ToastTheme | 'system'
  /** Glass depth layering between toasts. Default: `'stack'`. */
  stackMode?: StackMode
  /** Spacing between stacked toasts. Default: `'normal'`. */
  stackGap?: StackGap
  /** Offset from the safe area edges. Default: `12`. */
  inset?: EdgeInset
  /** Blur radius of the glass surface, in px. Default: `20`. Use `0` for opaque surfaces. */
  blur?: number
  /** Enables the animated icon by default. Default: `true`. */
  animatedIcon?: boolean
  /** Whether toasts are rendered inside a Portal on web. Default: `true`. */
  portal?: boolean
  /** Called when any toast is dismissed. */
  onToastDismiss?: (toast: ToastConfig) => void
}

export interface ToastAPI {
  show: (options?: ToastOptions) => string
  success: (title?: string, options?: Omit<ToastOptions, 'type' | 'title'>) => string
  error: (title?: string, options?: Omit<ToastOptions, 'type' | 'title'>) => string
  warning: (title?: string, options?: Omit<ToastOptions, 'type' | 'title'>) => string
  info: (title?: string, options?: Omit<ToastOptions, 'type' | 'title'>) => string
  dismiss: (id: string) => void
  dismissAll: () => void
}
