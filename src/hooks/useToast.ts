import { useContext } from 'react'
import { ToastContext } from '../context/ToastContext'

/**
 * Returns the toast API from the nearest `<ToastProvider>`.
 * The standalone `toast` object shares the same underlying API.
 */
export function useToast() {
  return useContext(ToastContext)
}
