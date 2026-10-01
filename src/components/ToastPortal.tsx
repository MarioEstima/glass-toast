import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'

/**
 * Renders children into `document.body` on the client so toasts escape
 * any stacking context. Falls back to inline rendering during SSR.
 */
export function ToastPortal({ children }: { children: ReactNode }) {
  if (typeof document === 'undefined') return <>{children}</>
  return createPortal(children, document.body)
}
