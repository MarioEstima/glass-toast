# Glass Toast

A lightweight, cross-platform toast notification library for **React Native** and **Web**, with a *liquid glass* look: translucent surfaces, backdrop blur, light borders and real depth between stacked toasts.

[![npm version](https://img.shields.io/npm/v/glass-toast.svg)](https://www.npmjs.com/package/glass-toast)
[![npm downloads](https://img.shields.io/npm/dm/glass-toast.svg)](https://www.npmjs.com/package/glass-toast)
[![License](https://img.shields.io/npm/l/glass-toast.svg)](LICENSE.md)

## Status

Glass Toast is currently targeting its first release:

```text
v0.1.0
```

The API may change before the first stable release.

## Highlights

- **Liquid glass with depth** — translucent surfaces, backdrop blur (web), sheen, light ring and soft shadows; stacked toasts *tuck* behind the active one with scale and fade.
- **Light / dark / system theme** — follows the OS appearance live (`prefers-color-scheme` on web, `Appearance` on native) or can be forced.
- **Animated icons** — lucide glyphs (`Check`, `X`, `AlertTriangle`, `Info`, `Bell`) with spring pop + fade/rise intro beats, driven by Reanimated. Custom icons via the `icon` option.
- **4 variants** — `toast`, `notification`, `popover` (solid cards) and `glass` (the liquid-glass material).
- **3 sizes** — `sm`, `md`, `lg`.
- **6 positions** — `top`, `top-left`, `top-right`, `bottom`, `bottom-left`, `bottom-right`.
- **Smart stacking** — collapsed stack with peek (`stack`) or plain list (`list`), with tight/normal/loose gaps.
- **Imperative API** — `toast.success(...)` works inside or outside the React tree.
- TypeScript-first, zero runtime dependencies, ~35 kB minified (ESM).

## Installation

```bash
npm install glass-toast
```

Peer dependencies: `react >= 18`, `react-native >= 0.74`, `react-native-reanimated >= 3.17` (`react-dom` and `react-native-svg` optional, for web portals and the built-in icons).

> On the web, alias `react-native` → `react-native-web` in your bundler and define the globals `__DEV__` and `global` (Metro usually provides them; Vite example below).

## Usage

Wrap your application with `ToastProvider`:

```tsx
import { ToastProvider } from "glass-toast";

export function App() {
  return (
    <ToastProvider>
      <YourApplication />
    </ToastProvider>
  );
}
```

Then call the toast API:

```tsx
import { toast } from "glass-toast";

toast.success("Account created successfully.");
```

### Toast Types

```tsx
toast.success("Operation completed.");
toast.error("Something went wrong.");
toast.warning("Please check your information.");
toast.info("A new update is available.");
toast.show({ title: "Syncing…", description: "No type icon accent." });
```

## API

### `toast.show(options)`

Creates a toast with custom options and returns its `id`.

```tsx
toast.show({
  title: "Payment",
  description: "Your payment was completed successfully.",
  type: "success",
});
```

### `toast.success / error / warning / info(title, options?)`

Typed shortcuts that preset the icon and accent color.

```tsx
toast.success("Successfully saved.");
```

### `toast.dismiss(id)`

Dismisses a specific toast (plays the exit animation).

```tsx
const id = toast.info("Working…");
toast.dismiss(id);
```

### `toast.dismissAll()`

Dismisses all active toasts.

```tsx
toast.dismissAll();
```

## Toast Options

| Option               | Type                                      | Description                                        |
| -------------------- | ----------------------------------------- | -------------------------------------------------- |
| `id`                 | `string`                                  | Custom toast identifier (re-showing an id fronts it) |
| `title`              | `string`                                  | Toast title                                        |
| `description`        | `string`                                  | Additional information                             |
| `type`               | `'default' \| 'success' \| 'error' \| 'warning' \| 'info'` | Icon and accent color            |
| `duration`           | `number`                                  | ms before auto-dismiss (`0` = persistent)          |
| `position`           | `'top' \| 'top-left' \| 'top-right' \| 'bottom' \| 'bottom-left' \| 'bottom-right'` | Screen corner |
| `dismissible`        | `boolean`                                 | Whether the user can dismiss it                    |
| `onPress`            | `() => void`                              | Called when the toast body is pressed              |
| `onDismiss`          | `() => void`                              | Called after dismissal, for any reason             |
| `variant`            | `'toast' \| 'notification' \| 'popover' \| 'glass'` | Visual variant (`glass` = liquid glass material)  |
| `size`               | `'sm' \| 'md' \| 'lg'`                    | Size preset                                        |
| `icon`               | `ComponentType<ToastIconProps>`           | Custom icon component                              |
| `accessibilityLive`  | `'polite' \| 'assertive' \| 'off'`        | Screen reader announcement                         |

## Positions

```text
top   top-left   top-right
bottom   bottom-left   bottom-right
```

```tsx
toast.success("Saved successfully.", { position: "bottom-right" });
```

## Provider Configuration

```tsx
<ToastProvider
  position="top-right"
  duration={4000}
  maxToasts={5}
  variant="notification"
  size="md"
  theme="system"        // 'system' | 'light' | 'dark'
  stackMode="stack"     // 'stack' | 'list'
  stackGap="normal"     // 'tight' | 'normal' | 'loose'
  inset={12}            // distance from screen edges
  blur={20}             // glass blur radius (web); 0 = opaque
  animatedIcon
  portal                // render through a portal on web
  onToastDismiss={(t) => console.log('dismissed', t.id)}
>
  <App />
</ToastProvider>
```

Per-toast options override provider defaults.

## Liquid Glass & Depth

The `glass` variant renders toasts in a liquid-glass material, built in layers:

1. **Translucent tinted base** with dual soft shadows (real `backdrop-filter: blur()` on web).
2. **Sheen overlay** — the glass highlight.
3. **Inner light ring** — sells the material edge.
4. **Content**, above every layer.

The `toast`, `notification` and `popover` variants render as opaque soft cards (light and dark palettes included).

Stacked toasts add physical depth: toasts behind the active one **slide under it, scale down and fade**, leaving a 10 px peek of glass visible — the iOS-style collapsed stack. Choose `stackGap` (`tight` / `normal` / `loose`) to control spacing and `stackMode="list"` for a plain vertical list.

On native, the same token palette and layered shadows apply; the backdrop blur degrades gracefully to the translucent tint (you can wrap your own blur view later without API changes).

## Hooks

- `useToast()` — the toast API from context (same as the standalone `toast`).
- `useToastTheme(preference)` — resolves `'system' | 'light' | 'dark'` into the active glass tokens (`GLASS_TOKENS` is also exported for custom surfaces).

## Cross-platform

Glass Toast is designed to provide a consistent API across:

- **Web** (via `react-native-web`)
- **Android**
- **iOS**

## Development

```bash
git clone https://github.com/MarioEstima/glass-toast.git
cd glass-toast
npm install
npm run dev          # playground on http://localhost:5173
npm run typecheck    # tsc -b
npm run lint
npm run build        # library build (tsup: dist/)
npm run build:web    # playground build (dist-playground/)
npm run pack:check   # npm pack --dry-run
```

## Contributing

Contributions are welcome. Before contributing, please read the [Contributing Guide](CONTRIBUTING.md).

## License

Glass Toast is open source software licensed under the MIT License. See [LICENSE.md](LICENSE.md) for details.
