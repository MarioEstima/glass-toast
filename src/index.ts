// Components
export { ToastProvider } from './context/ToastProvider'
export { ToastContext } from './context/ToastContext'
export { ToastIcon } from './components/icons'
export { GlassSurface } from './components/GlassSurface'

// Imperative API (works outside the React tree once the provider mounted)
export { toast } from './core/toast-manager'

// Hooks
export { useToast } from './hooks/useToast'
export { useToastTheme } from './hooks/useToastTheme'
export { useSystemColorScheme } from './hooks/useSystemColorScheme'

// Theme tokens for custom surfaces
export { GLASS_TOKENS } from './constants/defaults'

// Types
export type {
  ToastType,
  ToastPosition,
  ToastVariant,
  ToastSize,
  ToastTheme,
  ToastScheme,
  ToastAnimation,
  ToastWidth,
  IconBadgeStyle,
  ToastAction,
  StackMode,
  StackGap,
  EdgeInset,
  ToastOptions,
  ToastConfig,
  ToastEntry,
  ToastIconProps,
  ToastThemeTokens,
  GlassTokens,
  SolidTokens,
  ToastProviderProps,
  ToastAPI,
} from './types/toast'
