# Glass Toast

A lightweight, cross-platform toast notification library for React, designed for Web and React Native.

[![npm version](https://img.shields.io/npm/v/glass-toast.svg)](https://www.npmjs.com/package/glass-toast)
[![npm downloads](https://img.shields.io/npm/dm/glass-toast.svg)](https://www.npmjs.com/package/glass-toast)
[![License](https://img.shields.io/npm/l/glass-toast.svg)](LICENSE)

## Status

Glass Toast is currently under active development.

The project is currently targeting its first release:

```text
v0.1.0
```

The API may change before the first stable release.

## Installation

```bash
npm install glass-toast
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

Then use the toast API:

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
```

## API

### `toast.show()`

Creates a toast with custom options.

```tsx
toast.show({
  title: "Payment",
  description: "Your payment was completed successfully.",
  type: "success",
});
```

### `toast.success()`

Displays a success notification.

```tsx
toast.success("Successfully saved.");
```

### `toast.error()`

Displays an error notification.

```tsx
toast.error("Unable to save your changes.");
```

### `toast.warning()`

Displays a warning notification.

```tsx
toast.warning("Please review your information.");
```

### `toast.info()`

Displays an informational notification.

```tsx
toast.info("A new version is available.");
```

### `toast.dismiss()`

Dismisses a specific toast.

```tsx
toast.dismiss(toastId);
```

### `toast.dismissAll()`

Dismisses all active toasts.

```tsx
toast.dismissAll();
```

## Toast Options

Toasts can be customized using options:

```tsx
toast.show({
  title: "Payment completed",
  description: "Your payment was successfully processed.",
  type: "success",
  duration: 5000,
  position: "top-right",
});
```

### Available Options

| Option        | Type            | Description                                 |
| ------------- | --------------- | ------------------------------------------- |
| `id`          | `string`        | Custom toast identifier                     |
| `title`       | `string`        | Toast title                                 |
| `description` | `string`        | Additional information                      |
| `type`        | `ToastType`     | Toast notification type                     |
| `duration`    | `number`        | Time before automatic dismissal             |
| `position`    | `ToastPosition` | Toast position                              |
| `dismissible` | `boolean`       | Whether the toast can be manually dismissed |
| `onPress`     | `function`      | Callback when the toast is pressed          |
| `onDismiss`   | `function`      | Callback when the toast is dismissed        |

## Positions

Glass Toast supports the following positions:

```text
top
top-left
top-right
bottom
bottom-left
bottom-right
```

Example:

```tsx
toast.success("Saved successfully.", {
  position: "bottom-right",
});
```

## Provider Configuration

Application-wide defaults can be configured through `ToastProvider`:

```tsx
<ToastProvider
  position="top-right"
  duration={4000}
  maxToasts={5}
>
  <App />
</ToastProvider>
```

Individual toast options can override provider defaults.

## Cross-platform

Glass Toast is designed to provide a consistent API across:

* Web
* Android
* iOS

The library is built around a cross-platform architecture so that the toast API remains consistent between platforms.

## Features

* TypeScript-first API
* Success, error, warning, info and default toasts
* Automatic dismissal
* Manual dismissal
* Configurable duration
* Toast stacking
* Maximum visible toasts
* Multiple positions
* Animations
* Cross-platform architecture
* Web support
* React Native support

## Development

Clone the repository:

```bash
git clone https://github.com/MarioEstima/glass-toast.git
```

Enter the project:

```bash
cd glass-toast
```

Install dependencies:

```bash
npm install
```

Start the development environment:

```bash
npm run dev
```

Build the library:

```bash
npm run build
```

## Contributing

Contributions are welcome.

Before contributing, please read the [Contributing Guide](CONTRIBUTING.md).

For larger changes, consider opening an issue first to discuss the proposed approach.

## License

Glass Toast is open source software licensed under the MIT License.

See [LICENSE](LICENSE) for details.
