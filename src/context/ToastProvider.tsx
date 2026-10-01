import {
  useCallback,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from 'react'
import { Platform } from 'react-native'
import { ToastContext } from './ToastContext'
import { createToastApi, setActiveToastApi } from '../core/toast-manager'
import { createToastStore } from '../core/toast-store'
import { DEFAULT_PROVIDER } from '../constants/defaults'
import { resolveProviderDefaults } from '../utils/merge-options'
import { useToastTheme } from '../hooks/useToastTheme'
import { ToastContainer } from '../components/ToastContainer'
import { ToastPortal } from '../components/ToastPortal'

import type {
  ToastAPI,
  ToastOptions,
  ToastProviderProps,
} from '../types/toast'

const IS_WEB = Platform.OS === 'web'

/** Safety net for the exit animation, in ms. */
const EXIT_FALLBACK_MS = 900

/**
 * Root provider. Owns the store instance and renders one overlay per
 * screen side (`top` / `bottom`). All toast lifecycle rules (timers,
 * exit fallbacks, finalize callbacks) live in the store, so this
 * component stays free of refs and effects.
 */
export function ToastProvider(props: ToastProviderProps) {
  const {
    position = DEFAULT_PROVIDER.position,
    duration = DEFAULT_PROVIDER.duration,
    maxToasts = DEFAULT_PROVIDER.maxToasts,
    variant = DEFAULT_PROVIDER.variant,
    size = DEFAULT_PROVIDER.size,
    theme = DEFAULT_PROVIDER.theme,
    stackMode = DEFAULT_PROVIDER.stackMode,
    stackGap = DEFAULT_PROVIDER.stackGap,
    inset = DEFAULT_PROVIDER.inset,
    blur = DEFAULT_PROVIDER.blur,
    animatedIcon = DEFAULT_PROVIDER.animatedIcon,
    portal = DEFAULT_PROVIDER.portal,
    animation = DEFAULT_PROVIDER.animation,
    borderRadius,
    width = DEFAULT_PROVIDER.width,
    fontFamily,
    iconBadge = DEFAULT_PROVIDER.iconBadge,
    onToastDismiss,
    children,
  } = props

  const { scheme, tokens } = useToastTheme(theme)

  // One store for the provider's lifetime; config changes flow through setConfig.
  const store = useMemo(
    () => createToastStore(resolveProviderDefaults({ position, duration, variant, size, animation, width, iconBadge, fontFamily, borderRadius }), maxToasts, EXIT_FALLBACK_MS),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useEffect(() => {
    store.setConfig({
      providerDefaults: resolveProviderDefaults({ position, duration, variant, size, animation, width, iconBadge, fontFamily, borderRadius }),
      maxToasts,
      onFinalize: (entry) => {
        entry.onDismiss?.()
        onToastDismiss?.(entry)
      },
    })
  }, [store, position, duration, maxToasts, variant, size, animation, width, iconBadge, fontFamily, borderRadius, onToastDismiss])

  useEffect(() => () => store.clearTimers(), [store])

  const state = useSyncExternalStore(store.subscribe, store.getState, store.getState)
  const toasts = state.toasts

  const show = useCallback((options?: ToastOptions) => store.show(options).id, [store])
  const dismiss = useCallback((id: string) => store.dismiss(id), [store])
  const dismissAll = useCallback(() => store.dismissAll(), [store])

  const api = useMemo<ToastAPI>(
    () => createToastApi(show, dismiss, dismissAll),
    [show, dismiss, dismissAll],
  )

  // Bind the standalone `toast` singleton to this provider while mounted.
  useEffect(() => {
    setActiveToastApi(api)
    return () => setActiveToastApi(null)
  }, [api])

  // Auto-dismiss scheduling for visible, non-exiting toasts.
  useEffect(() => {
    for (const toast of toasts) {
      if (!toast.exiting && !store.hasTimer(toast.id)) {
        store.scheduleAutoDismiss(toast.id, toast.duration)
      }
    }
  }, [toasts, store])

  const surfaceProps = useMemo(
    () => ({ scheme, tokens, blur, animatedIcon, onActionPress: (toast: import('../types/toast').ToastEntry) => store.dismiss(toast.id) }),
    [scheme, tokens, blur, animatedIcon, store],
  )

  const stackProps = useMemo(
    () => ({ stackMode, stackGap, inset }),
    [stackMode, stackGap, inset],
  )

  const overlays = (
    <>
      {(['top', 'bottom'] as const).map((side) => (
        <ToastContainer
          key={side}
          side={side}
          toasts={toasts.filter((toast) => toast.position.startsWith(side))}
          surfaceProps={surfaceProps}
          stackProps={stackProps}
          onDismiss={dismiss}
          onRemoved={(id) => store.confirmExit(id)}
        />
      ))}
    </>
  )

  return (
    <ToastContext.Provider value={api}>
      {children}
      {portal && IS_WEB ? <ToastPortal>{overlays}</ToastPortal> : overlays}
    </ToastContext.Provider>
  )
}
