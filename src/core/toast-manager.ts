import type { ToastAPI, ToastOptions, ToastType } from '../types/toast'

const NOT_MOUNTED_MESSAGE =
  '[glass-toast] No <ToastProvider> was found. Wrap your app with <ToastProvider> before calling toast methods.'

let hasWarnedUnmounted = false

/**
 * Fallback API used before `<ToastProvider>` mounts. Warns once and no-ops,
 * so calling `toast.*` at module scope never crashes the app.
 */
export function createUnmountedToastApi(): ToastAPI {
  const warn = () => {
    if (!hasWarnedUnmounted) {
      hasWarnedUnmounted = true
      console.warn(NOT_MOUNTED_MESSAGE)
    }
  }

  return {
    show: () => {
      warn()
      return ''
    },
    success: () => {
      warn()
      return ''
    },
    error: () => {
      warn()
      return ''
    },
    warning: () => {
      warn()
      return ''
    },
    info: () => {
      warn()
      return ''
    },
    dismiss: () => warn(),
    dismissAll: () => warn(),
  }
}

/**
 * Creates the API implementation bound to a live provider.
 * Shorthand methods preset the toast `type`.
 */
export function createToastApi(
  show: (options?: ToastOptions) => string,
  requestDismiss: (id: string) => void,
  dismissAll: () => void,
): ToastAPI {
  const typed =
    (type: ToastType) =>
    (title?: string, options?: Omit<ToastOptions, 'type' | 'title'>): string =>
      show({ ...options, title, type })

  return {
    show,
    success: typed('success'),
    error: typed('error'),
    warning: typed('warning'),
    info: typed('info'),
    dismiss: requestDismiss,
    dismissAll,
  }
}

let unmountedApi: ToastAPI | null = null
let activeApi: ToastAPI | null = null

/** Binds the standalone `toast` object to a provider's API (or unbinds with `null`). */
export function setActiveToastApi(api: ToastAPI | null): void {
  activeApi = api
}

/**
 * Standalone toast API, usable outside the React tree (event handlers,
 * stores, tests). Before `<ToastProvider>` mounts it warns once and no-ops.
 */
export const toast: ToastAPI = {
  show: (options) => (activeApi ?? ensureUnmountedApi()).show(options),
  success: (title, options) => (activeApi ?? ensureUnmountedApi()).success(title, options),
  error: (title, options) => (activeApi ?? ensureUnmountedApi()).error(title, options),
  warning: (title, options) => (activeApi ?? ensureUnmountedApi()).warning(title, options),
  info: (title, options) => (activeApi ?? ensureUnmountedApi()).info(title, options),
  dismiss: (id) => (activeApi ?? ensureUnmountedApi()).dismiss(id),
  dismissAll: () => (activeApi ?? ensureUnmountedApi()).dismissAll(),
}

function ensureUnmountedApi(): ToastAPI {
  if (!unmountedApi) unmountedApi = createUnmountedToastApi()
  return unmountedApi
}
