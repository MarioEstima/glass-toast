# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-10-01

### Added

- **Action button** — `action: { label, onPress }` renders a call-to-action pill (e.g. `GOT IT`) inside the toast; it replaces the close button and dismisses the toast after the callback.
- **Animation presets** — provider/toast `animation`: `'spring'` (default), `'bounce'`, `'slide'` or `'fade'`.
- **Layout options** — provider/toast `width` (`'full'` | `'hug'` content-width pills) and `borderRadius` override.
- **Typography option** — provider/toast `fontFamily` applied to title, description and action.
- **Icon badge styles** — `iconBadge`: `'solid'` (colored circle with white glyph, default), `'soft'` (tinted circle) or `'bare'` (icon only).

### Changed

- **Pastel opaque design** — light and dark palettes reworked into soft pastel tones with fully opaque surfaces (no transparency by default).
- **Pill shape** — `toast` and `notification` variants are fully rounded pills; more generous padding on every size.
- `blur` is now opt-in (default `0`); pass `blur={20}` on web to restore the translucent backdrop-filter effect on the `glass` variant.

## [0.1.0] - 2026-10-01

### Added

- `ToastProvider` with provider-level defaults: `position`, `duration`, `maxToasts`, `variant`, `size`, `theme`, `stackMode`, `stackGap`, `inset`, `blur`, `animatedIcon`, `portal` and `onToastDismiss`.
- Imperative toast API: `toast.show()`, `toast.success()`, `toast.error()`, `toast.warning()`, `toast.info()`, `toast.dismiss()`, `toast.dismissAll()`. Works outside the React tree once the provider has mounted (warns once before that).
- Toast types: `default`, `success`, `error`, `warning`, `info` — each with an animated glyph icon (check, X, exclamation, info, bell) built from pure React Native primitives + Reanimated.
- Positions: `top`, `top-left`, `top-right`, `bottom`, `bottom-left`, `bottom-right`, grouped in left/center/right columns.
- Liquid glass surface: translucent tinted base, backdrop blur on web (`GlassSurface`), sheen overlay, inner light ring and layered depth shadows.
- Stack depth: collapsed stack where toasts behind the active one tuck under it (slide, scale, fade) leaving a 10 px peek; `list` mode and `tight`/`normal`/`loose` gaps as alternatives.
- Variants `toast`, `notification`, `popover` and sizes `sm`, `md`, `lg`.
- Light/dark/system color scheme with live updates on web (`prefers-color-scheme`) and native (`Appearance`).
- Custom icons via `icon` option; custom `id` reuse fronts and resets an existing toast.
- Spring enter animations, timed exit animations with store-owned lifecycle and fallback removal, auto-dismiss timers, dedupe and `maxToasts` enforcement.
- Web portal rendering (SSR-safe) with fixed overlay layers; library build (tsup, ESM + dts) and playground (`npm run dev`).

[0.1.0]: https://github.com/MarioEstima/glass-toast/releases/tag/v0.1.0
