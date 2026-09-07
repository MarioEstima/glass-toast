# Glass Toast — Project

This document describes the internal development plan, architecture, technical decisions, and roadmap for Glass Toast.

Unlike the README, which is intended primarily for users, this document is intended for maintainers and contributors.

## Project Goal

Glass Toast is a lightweight, cross-platform toast notification library for React.

The project aims to provide:

* A simple public API.
* A consistent developer experience.
* TypeScript-first development.
* Cross-platform support.
* Lightweight implementation.
* Smooth animations.
* Customizable presentation.
* Maintainable architecture.

The primary platforms are:

```text
Web
Android
iOS
```

## Current Version

```text
v0.1.0
```

Status:

```text
In development
```

The goal of `v0.1.0` is to establish the initial usable version of the library without introducing unnecessary complexity.

---

# Architecture

Glass Toast separates the public API, state management, core logic, and presentation.

The high-level architecture is:

```text
Application
    ↓
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
    ↓
Animation / Presentation
```

## Core Principle

The core toast logic should remain independent from the UI layer.

The core should be responsible for:

* Creating toasts.
* Updating toast state.
* Removing toasts.
* Generating identifiers.
* Handling duration.
* Managing limits.
* Managing toast positions.

The presentation layer should be responsible for:

* Rendering.
* Styling.
* Animations.
* User interaction.
* Platform-specific behavior.

This separation allows the UI implementation to evolve without unnecessarily changing the public API.

---

# Project Structure

The planned structure is:

```text
glass-toast/

├── src/
│   ├── components/
│   │   ├── Toast.tsx
│   │   ├── ToastContainer.tsx
│   │   ├── ToastContent.tsx
│   │   ├── ToastIcon.tsx
│   │   └── ToastClose.tsx
│   │
│   ├── context/
│   │   ├── ToastContext.tsx
│   │   └── ToastProvider.tsx
│   │
│   ├── core/
│   │   ├── toast.ts
│   │   ├── toast-store.ts
│   │   └── toast-manager.ts
│   │
│   ├── hooks/
│   │   ├── useToast.ts
│   │   └── useToastStore.ts
│   │
│   ├── animations/
│   │   ├── toast-animation.ts
│   │   └── toast-transitions.ts
│   │
│   ├── types/
│   │   ├── toast.ts
│   │   ├── toast-options.ts
│   │   └── toast-position.ts
│   │
│   ├── constants/
│   │   └── defaults.ts
│   │
│   ├── utils/
│   │   ├── generate-id.ts
│   │   └── merge-options.ts
│   │
│   └── index.ts
│
├── playground/
│
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── CHANGELOG.md
├── LICENSE
├── PROJECT.md
│
├── package.json
├── tsconfig.json
└── vite.config.ts
```

The structure may evolve during development if a simpler or more maintainable organization is identified.

---

# Public API

The initial API is intentionally small.

## Provider

```tsx
<ToastProvider>
  <App />
</ToastProvider>
```

## Toast Methods

```ts
toast.show()
toast.success()
toast.error()
toast.warning()
toast.info()
toast.dismiss()
toast.dismissAll()
```

The API should remain predictable and easy to learn.

---

# Toast Types

Initial supported types:

```text
default
success
error
warning
info
```

---

# Toast Positions

Initial supported positions:

```text
top
top-left
top-right
bottom
bottom-left
bottom-right
```

---

# Toast Options

Initial options:

```ts
interface ToastOptions {
  id?: string;
  title?: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
  dismissible?: boolean;
  onPress?: () => void;
  onDismiss?: () => void;
}
```

Provider-level defaults will also be supported.

---

# State Management

The first implementation should use an internal store rather than introducing an external state-management dependency.

React Context will be used for integration with the React component tree.

The architecture should allow the store implementation to evolve independently from the public API.

Avoid adding Zustand, Redux, or another external state-management library unless there is a demonstrated need.

---

# Styling

Glass Toast will use Tailwind CSS through NativeWind for cross-platform styling.

The goal is to avoid maintaining separate styling systems for Web and React Native.

Styling should remain:

* Predictable.
* Minimal.
* Cross-platform.
* Customizable.

---

# Animation

Animations will be implemented using React Native Reanimated.

The animation layer should remain isolated from the core toast logic.

The initial animation system should support:

* Toast entering.
* Toast leaving.
* Toast stacking transitions.

Advanced gesture-based interactions are outside the initial `v0.1.0` scope.

---

# v0.1.0 Roadmap

## 1. Project Setup

* [x] Initialize repository
* [x] Configure TypeScript
* [x] Configure Vite
* [ ] Configure library build
* [ ] Configure package exports
* [ ] Configure package metadata

## 2. Cross-platform Foundation

* [ ] Configure React Native Web
* [ ] Configure NativeWind
* [ ] Configure Tailwind CSS
* [ ] Configure Reanimated
* [ ] Verify Web compatibility
* [ ] Verify architecture for React Native

## 3. Types

* [ ] Create `ToastType`
* [ ] Create `ToastPosition`
* [ ] Create `ToastOptions`
* [ ] Create toast state types
* [ ] Create provider options

## 4. Core Toast System

* [ ] Create toast creation logic
* [ ] Generate toast IDs
* [ ] Support toast types
* [ ] Support title
* [ ] Support description
* [ ] Support duration
* [ ] Support positions
* [ ] Support dismissible toasts

## 5. Store

* [ ] Create toast store
* [ ] Add toast
* [ ] Remove toast
* [ ] Remove all toasts
* [ ] Read toast state
* [ ] Handle maximum visible toasts

## 6. Toast Manager

* [ ] Implement `toast.show()`
* [ ] Implement `toast.success()`
* [ ] Implement `toast.error()`
* [ ] Implement `toast.warning()`
* [ ] Implement `toast.info()`
* [ ] Implement `toast.dismiss()`
* [ ] Implement `toast.dismissAll()`

## 7. React Integration

* [ ] Create Toast Context
* [ ] Create Toast Provider
* [ ] Connect provider to store
* [ ] Create toast hooks

## 8. Components

* [ ] Create Toast component
* [ ] Create Toast Container
* [ ] Create Toast Content
* [ ] Create Toast Icon
* [ ] Create Toast Close
* [ ] Verify accessibility

## 9. Animation

* [ ] Enter animation
* [ ] Exit animation
* [ ] Stack transition
* [ ] Verify animation behavior on Web

## 10. Visual Design

* [ ] Glass appearance
* [ ] Default variant
* [ ] Success variant
* [ ] Error variant
* [ ] Warning variant
* [ ] Info variant
* [ ] Responsive behavior

## 11. Customization

* [ ] Provider defaults
* [ ] Per-toast overrides
* [ ] Position configuration
* [ ] Duration configuration
* [ ] Maximum toast configuration

## 12. Public Exports

* [ ] Export `ToastProvider`
* [ ] Export `toast`
* [ ] Export public types
* [ ] Verify package entry point

## 13. Playground

* [ ] Create development playground
* [ ] Test every toast type
* [ ] Test positions
* [ ] Test dismissal
* [ ] Test stacking
* [ ] Test duration
* [ ] Test provider configuration

## 14. Testing

* [ ] Test toast creation
* [ ] Test toast dismissal
* [ ] Test automatic dismissal
* [ ] Test toast stacking
* [ ] Test maximum visible toasts
* [ ] Test positions
* [ ] Test provider defaults
* [ ] Test public API

## 15. Package Configuration

* [ ] Configure package name
* [ ] Configure version
* [ ] Configure exports
* [ ] Configure build output
* [ ] Configure TypeScript declarations
* [ ] Configure package files
* [ ] Verify dependencies and peer dependencies

## 16. Build

* [ ] Production build
* [ ] Type checking
* [ ] Verify generated files
* [ ] Verify package size

## 17. Package Preview

* [ ] Run `npm pack --dry-run`
* [ ] Inspect package contents
* [ ] Install packed package locally
* [ ] Test package from another project

## 18. Release

* [ ] Finalize `v0.1.0`
* [ ] Update `CHANGELOG.md`
* [ ] Verify README
* [ ] Create Git tag
* [ ] Publish package
* [ ] Create GitHub release

---

# Future Features

These features are intentionally outside the initial `v0.1.0` scope.

Potential future additions include:

```text
toast.promise()
toast.loading()
toast.update()
```

Other possible features:

* Action buttons.
* Custom icons.
* Custom components.
* Advanced animations.
* Gesture dismissal.
* Progress indicators.
* Advanced theming.
* Haptic feedback.
* Sound.
* Accessibility improvements.
* More customization options.

These should only be implemented when there is a clear use case and the resulting API remains simple.

---

# Dependency Philosophy

Glass Toast should remain lightweight.

Before introducing a dependency, consider:

1. Is it necessary?
2. Does it solve a meaningful problem?
3. Does it support Web and React Native?
4. Does it increase bundle size significantly?
5. Is it actively maintained?
6. Can the functionality reasonably be implemented internally?

The goal is not to minimize the number of dependencies at any cost, but to avoid unnecessary dependencies.

---

# Versioning

Glass Toast follows Semantic Versioning:

```text
MAJOR.MINOR.PATCH
```

Before `1.0.0`, the API may change as the project matures.

The `CHANGELOG.md` file should document user-facing changes for every release.

---

# Definition of Done — v0.1.0

Version `0.1.0` is considered ready when:

* The library builds successfully.
* TypeScript declarations are generated.
* The package can be installed from npm.
* `ToastProvider` works correctly.
* The basic toast API works.
* Success, error, warning, info, and default toasts work.
* Automatic dismissal works.
* Manual dismissal works.
* Toast stacking works.
* Position configuration works.
* Maximum visible toast configuration works.
* Animations work on Web.
* The architecture remains compatible with React Native.
* The public API is documented.
* The package can be installed and used from another project.
* No known critical issues remain.

---

# Project Principles

Glass Toast should follow these principles throughout development:

### Keep the API simple

Users should not need to understand the internal architecture to use the library.

### Keep core logic independent

The toast system should not be tightly coupled to a specific renderer or styling implementation.

### Prefer composition

Small components and focused modules are preferred over large monolithic components.

### Avoid premature abstraction

Do not create abstractions without a demonstrated need.

### Cross-platform by design

Web and React Native should be considered during architectural decisions, even when implementing Web first.

### Developer experience matters

The library should be easy to install, understand, configure, and debug.

### Stability over unnecessary features

A small, reliable API is preferable to a large API with inconsistent behavior.
