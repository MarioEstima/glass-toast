import type { ToastConfig, ToastOptions, ToastProviderProps } from '../types/toast'
import { DEFAULT_PROVIDER } from '../constants/defaults'

/** Provider-level resolved options shared by all toasts. */
export type ProviderDefaults = Pick<
  ToastConfig,
  | 'position'
  | 'duration'
  | 'dismissible'
  | 'variant'
  | 'size'
  | 'accessibilityLive'
  | 'animation'
  | 'width'
  | 'iconBadge'
  | 'fontFamily'
  | 'borderRadius'
>

/**
 * Merges a per-call options object over the provider defaults.
 * Any option left undefined falls back to the provider value.
 */
export function mergeToastOptions(
  options: ToastOptions | undefined,
  provider: ProviderDefaults,
): ToastConfig {
  const merged: ToastConfig = {
    id: options?.id ?? '',
    title: options?.title ?? '',
    description: options?.description ?? '',
    type: options?.type ?? 'default',
    duration: options?.duration ?? provider.duration,
    position: options?.position ?? provider.position,
    dismissible: options?.dismissible ?? true,
    variant: options?.variant ?? provider.variant,
    size: options?.size ?? provider.size,
    accessibilityLive: options?.accessibilityLive ?? provider.accessibilityLive,
    animation: options?.animation ?? provider.animation,
    width: options?.width ?? provider.width,
    iconBadge: options?.iconBadge ?? provider.iconBadge,
    fontFamily: options?.fontFamily ?? provider.fontFamily,
    borderRadius: options?.borderRadius ?? provider.borderRadius,
    action: options?.action,
    onPress: options?.onPress,
    onDismiss: options?.onDismiss,
    icon: options?.icon,
  }
  return merged
}

/** Resolves the provider defaults from the configured props. */
export function resolveProviderDefaults(props: ToastProviderProps): ProviderDefaults {
  return {
    position: props.position ?? DEFAULT_PROVIDER.position,
    duration: props.duration ?? DEFAULT_PROVIDER.duration,
    dismissible: true,
    variant: props.variant ?? DEFAULT_PROVIDER.variant,
    size: props.size ?? DEFAULT_PROVIDER.size,
    accessibilityLive: 'polite',
    animation: props.animation ?? DEFAULT_PROVIDER.animation,
    width: props.width ?? DEFAULT_PROVIDER.width,
    iconBadge: props.iconBadge ?? DEFAULT_PROVIDER.iconBadge,
    fontFamily: props.fontFamily ?? '',
    borderRadius: props.borderRadius ?? 0,
  }
}
