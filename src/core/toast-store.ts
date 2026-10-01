import { generateToastId } from '../utils/generate-id'
import { mergeToastOptions } from '../utils/merge-options'
import type { ProviderDefaults } from '../utils/merge-options'
import type { ToastEntry, ToastOptions } from '../types/toast'

export type ToastState = {
  /** Ordered toasts, front = closest to the screen edge. Includes exiting toasts still animating out. */
  toasts: ToastEntry[]
}

/** Called once per toast, after it leaves the store for good. */
export type FinalizeHandler = (toast: ToastEntry) => void

export type StoreConfig = {
  providerDefaults: ProviderDefaults
  maxToasts: number
  /** Safety net for the exit animation, in ms. */
  exitFallbackMs: number
  onFinalize?: FinalizeHandler
}

export type ToastStore = {
  getState: () => ToastState
  subscribe: (listener: () => void) => () => void
  /** Updates provider defaults / limits / finalize callback. */
  setConfig: (config: Partial<StoreConfig>) => void
  /** Creates (or re-fronts) a toast and returns its entry. */
  show: (options?: ToastOptions) => ToastEntry
  /** Marks a toast as exiting and schedules the removal fallback. */
  dismiss: (id: string) => void
  /** Marks every visible toast as exiting and schedules removal fallbacks. */
  dismissAll: () => void
  /** Removes a toast immediately; returns it when it existed. */
  confirmExit: (id: string) => ToastEntry | undefined
  /** Schedules auto-dismissal; no-op when a timer already exists. */
  scheduleAutoDismiss: (id: string, duration: number) => void
  /** True when an auto-dismiss timer is pending for the id. */
  hasTimer: (id: string) => boolean
  /** Clears every pending timer (called on provider unmount). */
  clearTimers: () => void
}

/**
 * UI-agnostic toast store. Owns the queue rules (dedupe, max visible)
 * and the full dismissal lifecycle: exiting → exit animation → confirm
 * → finalize callbacks. Timers live here so React never touches them.
 */
export function createToastStore(
  providerDefaults: ProviderDefaults,
  maxToasts: number,
  exitFallbackMs: number,
): ToastStore {
  let state: ToastState = { toasts: [] }
  let config: StoreConfig = { providerDefaults, maxToasts, exitFallbackMs }

  const timers = new Map<string, ReturnType<typeof setTimeout>>()
  const listeners = new Set<() => void>()

  const emit = () => {
    for (const listener of listeners) listener()
  }

  const clearTimer = (id: string) => {
    const timer = timers.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.delete(id)
    }
  }

  const store: ToastStore = {
    getState: () => state,

    subscribe(listener) {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },

    setConfig(partial) {
      config = { ...config, ...partial }
    },

    show(options) {
      const merged = mergeToastOptions(options, config.providerDefaults)
      const id = options?.id ?? generateToastId()
      const existingIndex = state.toasts.findIndex((toast) => toast.id === id)

      if (existingIndex >= 0) {
        // Re-showing an id fronts it again and cancels any exit in progress.
        const next = state.toasts.slice()
        const [existing] = next.splice(existingIndex, 1)
        clearTimer(id)
        state = { toasts: [{ ...existing, ...merged, id, exiting: false }, ...next] }
        emit()
        return state.toasts[0]
      }

      let toasts: ToastEntry[] = [{ ...merged, id, exiting: false }, ...state.toasts]

      // Enforce the max visible limit on non-exiting toasts.
      const limit = config.maxToasts
      let activeCount = toasts.filter((toast) => !toast.exiting).length
      if (activeCount > limit) {
        toasts = toasts.map((toast) => {
          if (toast.exiting || activeCount <= limit) return toast
          activeCount -= 1
          return { ...toast, exiting: true }
        })
        for (const toast of toasts) {
          if (toast.exiting && !timers.has(toast.id)) {
            timers.set(
              toast.id,
              setTimeout(() => store.confirmExit(toast.id), config.exitFallbackMs),
            )
          }
        }
      }

      state = { toasts }
      emit()
      return state.toasts[0]
    },

    dismiss(id) {
      const entry = state.toasts.find((toast) => toast.id === id)
      if (!entry || entry.exiting) return

      const next = state.toasts.slice()
      const index = next.findIndex((toast) => toast.id === id)
      next[index] = { ...next[index], exiting: true }
      state = { toasts: next }
      emit()

      // Fallback removal in case the exit animation never reports completion.
      clearTimer(id)
      timers.set(
        id,
        setTimeout(() => store.confirmExit(id), config.exitFallbackMs),
      )
    },

    dismissAll() {
      const active = state.toasts.filter((toast) => !toast.exiting)
      if (active.length === 0) return

      state = { toasts: state.toasts.map((toast) => (toast.exiting ? toast : { ...toast, exiting: true })) }
      emit()

      for (const toast of active) {
        timers.set(
          toast.id,
          setTimeout(() => store.confirmExit(toast.id), config.exitFallbackMs),
        )
      }
    },

    confirmExit(id) {
      const entry = state.toasts.find((toast) => toast.id === id)
      if (!entry) return undefined

      clearTimer(id)
      state = { toasts: state.toasts.filter((toast) => toast.id !== id) }
      emit()
      config.onFinalize?.(entry)
      return entry
    },

    scheduleAutoDismiss(id, duration) {
      if (duration <= 0 || timers.has(id)) return
      timers.set(
        id,
        setTimeout(() => store.dismiss(id), duration),
      )
    },

    hasTimer: (id) => timers.has(id),

    clearTimers() {
      for (const timer of timers.values()) clearTimeout(timer)
      timers.clear()
    },
  }

  return store
}
