import { createContext } from 'react'
import type { ToastAPI } from '../types/toast'
import { createUnmountedToastApi } from '../core/toast-manager'

/**
 * Context with the toast API. Defaults to the unmounted fallback so calls
 * made before the provider mounts warn once instead of crashing.
 */
export const ToastContext = createContext<ToastAPI>(createUnmountedToastApi())
