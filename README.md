# Glass Toast

A lightweight, cross-platform toast notification library for React, designed for Web and React Native.

[![npm version](https://img.shields.io/npm/v/glass-toast.svg)](https://www.npmjs.com/package/glass-toast)
[![npm downloads](https://img.shields.io/npm/dm/glass-toast.svg)](https://www.npmjs.com/package/glass-toast)
[![License](https://img.shields.io/npm/l/glass-toast.svg)](LICENSE)

## Overview

Glass Toast is a toast notification library built with React and TypeScript.

It is designed with cross-platform support in mind, allowing the same API and architecture to be used across Web and React Native applications.

The project focuses on:

* Simple API
* TypeScript-first development
* Cross-platform architecture
* Lightweight implementation
* Smooth animations
* Customizable appearance
* Accessibility
* Developer experience

## Status

> Glass Toast is currently under active development.

The API may change before the first stable release.

Current target:

```text
v0.1.0
```

## Installation

```bash
npm install glass-toast
```

## Basic Usage

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

Other built-in types:

```tsx
toast.success("Operation completed.");
toast.error("Something went wrong.");
toast.warning("Please check your information.");
toast.info("A new update is available.");
```

## API

### `toast.show()`

Create a custom toast.

```tsx
toast.show({
  title: "Payment",
  description: "Your payment was completed successfully.",
  type: "success",
});
```

### `toast.success()`

Display a success notification.

```tsx
toast.success("Successfully saved.");
```

### `toast.error()`

Display an error notification.

```tsx
toast.error("Unable to save your changes.");
```

### `toast.warning()`

Display a warning notification.

```tsx
toast.warning("Please review your information.");
```

### `toast.info()`

Display an informational notification.

```tsx
toast.info("A new version is available.");
```

### `toast.dismiss()`

Dismiss a specific toast.

```tsx
toast.dismiss(toastId);
```

### `toast.dismissAll()`

Dismiss all active toasts.

```tsx
toast.dismissAll();
```

## Toast Options

A toast can be customized using options:

```tsx
toast.show({
  title: "Payment completed",
  description: "Your payment was successfully processed.",
  type: "success",
  duration: 5000,
  position: "top-right",
});
```

### Available options

| Option        | Type            | Description                                 |
| ------------- | --------------- | ------------------------------------------- |
| `id`          | `string`        | Custom toast identifier                     |
| `title`       | `string`        | Toast title                                 |
| `description` | `string`        | Additional information                      |
| `type`        | `ToastType`     | Visual notification type                    |
| `duration`    | `number`        | Time before automatic dismissal             |
| `position`    | `ToastPosition` | Toast position                              |
| `dismissible` | `boolean`       | Whether the toast can be manually dismissed |
| `onPress`     | `function`      | Callback when the toast is pressed          |
| `onDismiss`   | `function`      | Callback when the toast is dismissed        |

## Toast Types

Glass Toast provides the following built-in types:

```text
default
success
error
warning
info
```

## Positions

Supported positions:

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

The provider can define application-wide defaults:

```tsx
<ToastProvider
  position="top-right"
  duration={4000}
  maxToasts={5}
>
  <App />
</ToastProvider>
```

Individual toast options can override these defaults.

## Cross-platform

Glass Toast is designed to share the same API between:

```text
Web
Android
iOS
```

The project uses a cross-platform architecture so that application code does not need to change when moving between platforms.

## Architecture

The project is divided into several layers:

```text
Public API
    ↓
Toast Manager
    ↓
Toast Store
    ↓
Toast Provider
    ↓
Toast Container
    ↓
Toast Component
```

The core toast logic is kept independent from the presentation layer.

This allows the internal rendering and animation implementation to evolve without unnecessarily changing the public API.

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

## Project Structure

```text
glass-toast/
│
├── src/
│   ├── components/
│   ├── context/
│   ├── core/
│   ├── hooks/
│   ├── animations/
│   ├── types/
│   ├── constants/
│   ├── utils/
│   └── index.ts
│
├── playground/
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── CHANGELOG.md
├── LICENSE
├── package.json
└── vite.config.ts
```

## Contributing

Contributions are welcome.

Before opening a pull request, please read:

[CONTRIBUTING.md](CONTRIBUTING.md)

For larger changes, consider opening an issue first so the proposed solution can be discussed before implementation.

## Roadmap

### v0.1.0

* [ ] Basic toast API
* [ ] Success toast
* [ ] Error toast
* [ ] Warning toast
* [ ] Info toast
* [ ] Toast provider
* [ ] Toast dismissal
* [ ] Automatic dismissal
* [ ] Toast stacking
* [ ] Position support
* [ ] Animations
* [ ] TypeScript support
* [ ] Web support
* [ ] Initial React Native support

### Future

Potential features include:

* Promise-based toasts
* Loading state
* Toast updates
* Action buttons
* Custom icons
* Custom components
* Advanced animations
* Gesture dismissal
* Progress indicators
* Advanced theming

## Versioning

Glass Toast follows Semantic Versioning.

```text
MAJOR.MINOR.PATCH
```

Until `1.0.0`, breaking changes may occur between minor versions.

## License

Glass Toast is open source and available under the MIT License.

See [LICENSE](LICENSE) for details.
