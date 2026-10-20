# Glass Toast

A lightweight toast notification library for **React Native** — clean black and white pill toasts with circular icon badges, action buttons (`GOT IT`), animated icons, light/dark themes and deep customization (sizes, fonts, animations, layout).

![glass-toast toasts](https://raw.githubusercontent.com/MarioEstima/glass-toast/main/src/assets/screenshot.png)

[![npm version](https://img.shields.io/npm/v/glass-toast.svg)](https://www.npmjs.com/package/glass-toast)
[![npm downloads](https://img.shields.io/npm/dm/glass-toast.svg)](https://www.npmjs.com/package/glass-toast)
[![License](https://img.shields.io/npm/l/glass-toast.svg)](LICENSE.md)

## Status

```text
v0.4.1
```

The API may change before the first stable release.

## Highlights

- **Monochrome design** — clean black, white and gray surfaces that adapt to light and dark system appearance.
- **Action buttons** — `action: { label, onPress }` renders a call-to-action pill (`GOT IT`) that replaces the close button.
- **Animation presets** — `spring`, `bounce`, `slide` or `fade` enter/exit styles, provider- or toast-level.
- **Light / dark / system theme** — follows the OS appearance live (`Appearance`) or can be forced.
- **Animated icons** — lucide glyphs (`Check`, `X`, `AlertTriangle`, `Info`, `Bell`) with spring pop + fade/rise intro beats, driven by Reanimated. Custom icons via the `icon` option; `iconBadge` styles: `solid`, `soft`, `bare`.
- **3 variants** — `toast`, `notification` and `popover`, with no glass or sheen effects.
- **3 sizes** — `sm`, `md`, `lg`.
- **6 positions** — `top`, `top-left`, `top-right`, `bottom`, `bottom-left`, `bottom-right`.
- **Smart stacking** — collapsed stack with peek (`stack`) or plain list (`list`), with tight/normal/loose gaps.
- **Imperative API** — `toast.success(...)` works inside or outside the React tree.
- TypeScript-first, zero runtime dependencies, ~17 kB minified (ESM).

## Installation

```bash
npm install glass-toast
```

Peer dependencies: `react >= 18`, `react-native >= 0.74`, `react-native-reanimated >= 3.17` and `react-native-svg >= 15` (optional peer — required by the built-in lucide icons; skip it only if every toast passes a custom `icon`).

`react-native-reanimated` requires its Babel plugin in your app:

```js
// babel.config.js
plugins: ['react-native-reanimated/plugin']
```

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
| `showCloseButton`    | `boolean`                                 | Show or hide the X close button                    |
| `dimensions`         | `ToastDimensions`                         | Custom width, height, padding, icon and text sizes |
| `onPress`            | `() => void`                              | Called when the toast body is pressed              |
| `onDismiss`          | `() => void`                              | Called after dismissal, for any reason             |
| `variant`            | `'toast' \| 'notification' \| 'popover'` | Visual variant |
| `size`               | `'sm' \| 'md' \| 'lg'`                    | Size preset; `dimensions` can override individual values |
| `action`             | `{ label: string; onPress: () => void }`  | Call-to-action button (e.g. `GOT IT`); replaces the close button and dismisses the toast after the callback |
| `animation`          | `'spring' \| 'bounce' \| 'slide' \| 'fade'` | Enter/exit animation style                        |
| `borderRadius`       | `number`                                  | Corner radius override (`0` = variant default)     |
| `width`              | `'full' \| 'hug' \| number \| \`${number}%\`` | Fill, hug, or set an exact width in dp or percent |
| `fontFamily`         | `string`                                  | Font family for title, description and action      |
| `iconBadge`          | `'solid' \| 'soft' \| 'bare'`             | Leading icon badge style                           |
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
  showCloseButton={false} // hide the X globally
  theme="system"        // 'system' | 'light' | 'dark'
  animation="spring"    // 'spring' | 'bounce' | 'slide' | 'fade'
  width="92%"           // 'full' | 'hug' | number | percentage
  iconBadge="solid"     // 'solid' | 'soft' | 'bare'
  fontFamily={undefined}// custom font family for texts
  borderRadius={0}      // corner radius override (0 = variant default)
  stackMode="stack"     // 'stack' | 'list'
  stackGap="normal"     // 'tight' | 'normal' | 'loose'
  inset={12}            // distance from screen edges
  animatedIcon
  onToastDismiss={(t) => console.log('dismissed', t.id)}
>
  <App />
</ToastProvider>
```

Per-toast options override provider defaults.

## Custom dimensions

Use `size` for a preset or override dimensions directly at the provider or on an individual toast. Width accepts `full`, `hug`, a dp number or percentage string, and custom widths stay aligned to their selected screen position.

```tsx
<ToastProvider width="92%" dimensions={{ maxWidth: 520, minHeight: 72, paddingHorizontal: 24, paddingVertical: 18, titleFontSize: 18, descriptionFontSize: 14, iconSize: 24 }}>
  <App />
</ToastProvider>

toast.show({ title: 'Saved', showCloseButton: false, dimensions: { width: 320, minHeight: 80, titleFontSize: 20 } });
```

`theme="system"` follows the app device appearance and switches between black and white palettes. Set `theme="light"` or `theme="dark"` to force a scheme.

### Actions

```tsx
toast.show({
  title: "Hit / to explore Experts",
  type: "info",
  duration: 0,
  action: { label: "GOT IT", onPress: () => console.log("dismissed") },
});
```

Stacked toasts add physical depth: toasts behind the active one **slide under it, scale down and fade**, leaving a 10 px peek visible — the iOS-style collapsed stack. Choose `stackGap` (`tight` / `normal` / `loose`) to control spacing and `stackMode="list"` for a plain vertical list.

## Hooks

- `useToast()` — the toast API from context (same as the standalone `toast`).
- `useToastTheme(preference)` — resolves `'system' | 'light' | 'dark'` into the active monochrome theme tokens (`THEME_TOKENS` is also exported for custom surfaces).
- `useSystemColorScheme()` — live `'light' | 'dark'` from the OS appearance (`Appearance`).

## Platform support

Glass Toast targets React Native only:

- **iOS**
- **Android**
- **Expo** (and any other React Native runtime)

> Web support (`react-native-web`) was removed in `v0.3.0`. If you relied on it, stay on `v0.2.x`.

## Development

```bash
git clone https://github.com/MarioEstima/glass-toast.git
cd glass-toast
npm install
npm test           # typecheck + lint + build + pack:check
npm run typecheck  # tsc --noEmit
npm run lint
npm run build      # library build (tsup: dist/)
npm run pack:check # npm pack --dry-run
```

## Contributing

Contributions are welcome. Before contributing, please read the [Contributing Guide](CONTRIBUTING.md).

## License

Glass Toast is open source software licensed under the MIT License. See [LICENSE.md](LICENSE.md) for details.
