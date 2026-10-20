# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.1] - 2026-10-20

### Fixed

- Custom numeric and percentage widths now stay centered within their selected toast position.

### Changed

- Provider and per-toast `width` now accept dp numbers and percentage strings such as `"92%"`, in addition to `full` and `hug`.

## [0.4.0] - 2026-10-20

### Added

- `dimensions` on the provider and toast options for custom width, height, padding, icon size and text sizes.
- `showCloseButton` at provider and toast level.

### Changed

- Replaced pastel colors with monochrome black, white and gray palettes; `theme="system"` continues to follow device appearance.
- Removed the `glass` variant and its sheen effect. Supported variants are now `toast`, `notification` and `popover`.

## [0.3.2] - 2026-10-20

### Fixed

- **Reanimated/Worklets remote function crash** — explicitly mark bundled animated style and animation completion callbacks as worklets so consumers' Babel plugin can serialize them even when the bundler renames imports.

## [0.2.1] - 2026-10-01

### Changed

- Patch republish — published from the same commit as `0.2.0` (`bd831e9`); only the package version changed, no code or API differences.

## [0.3.1] - 2026-10-20

### Fixed

- **Crash on toast exit with Reanimated 4 / `react-native-worklets`** — the exit animation callback (`withTiming`) runs on the UI runtime and called `onExited` synchronously, throwing `[Worklets] Tried to synchronously call a Remote Function. Called "anonymous" on the UI Runtime.` The completion callback is now scheduled with `runOnJS(onExited)()`.

## [0.3.0] - 2026-10-20

### Removed

- **Web support** — Glass Toast now targets React Native only (iOS / Android / Expo). `react-native-web` is no longer a supported target; stay on `v0.2.x` if you need the browser build.
- **Portal rendering** — the `portal` provider option and the `react-dom` peer dependency are gone; overlays always render inline in the component tree.
- **Backdrop blur option** — the `blur` provider option and the `GlassSurface` `blur` prop were removed (the effect only ever applied through CSS `backdrop-filter` on the web).
- **Playground and web tooling** — Vite config, `index.html`, the browser demo (`src/App.tsx`, `src/main.tsx`), `public/`, `patches/` and the inline-playground script.

### Changed

- Overlays now always use `position: 'absolute'` (the web-only `fixed` layer is gone).
- `useSystemColorScheme` relies solely on React Native's `Appearance`; the `prefers-color-scheme` media-query listener was dropped.
- Web-only styles (`cursor`, `backdrop-filter`) were removed from the surfaces and buttons.
- Peer dependencies reduced to `react`, `react-native`, `react-native-reanimated` and `react-native-svg` (optional).
- Tooling: a single `tsconfig.json`, ESLint without the Vite / React-Refresh preset, and a new `npm test` script (`typecheck` + `lint` + `build` + `pack:check`).

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
[0.2.0]: https://github.com/MarioEstima/glass-toast/releases/tag/v0.2.0
[0.2.1]: https://github.com/MarioEstima/glass-toast/releases/tag/v0.2.1
[0.3.0]: https://github.com/MarioEstima/glass-toast/releases/tag/v0.3.0
[0.3.1]: https://github.com/MarioEstima/glass-toast/releases/tag/v0.3.1
[0.3.2]: https://github.com/MarioEstima/glass-toast/releases/tag/v0.3.2
[0.4.0]: https://github.com/MarioEstima/glass-toast/releases/tag/v0.4.0
[0.4.1]: https://github.com/MarioEstima/glass-toast/releases/tag/v0.4.1
