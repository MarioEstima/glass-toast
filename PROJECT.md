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
Feature-complete for v0.1.0 — pending publish
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

**Decision:** Glass Toast uses a token-based styling system (`GLASS_TOKENS` + `StyleSheet`) instead of NativeWind/Tailwind.

Rationale:

* The library ships prebuilt (tsup); requiring consumers to run a NativeWind/Tailwind pipeline for a single component family would raise integration cost for little gain.
* Tokens give full control over the liquid-glass material (translucency, blur, sheen, depth shadows) on both platforms without class-name translation layers.
* It follows the dependency philosophy: `nativewind` stays out of the runtime.

Styling remains:

* Predictable.
* Minimal.
* Cross-platform.
* Customizable (tokens are exported for custom surfaces; variants/sizes map to metrics tables).

---

# Animation

Animations are implemented with React Native Reanimated.

The animation layer is isolated from the core toast logic (`AnimatedToast`).

The initial animation system supports:

* Toast entering (spring slide from the screen edge).
* Toast leaving (timed slide + fade; the store owns the lifecycle and a fallback removal timer).
* Toast stacking transitions (tuck under the active toast: slide, scale, fade).

Because the library must work on the web without the Worklets Babel plugin, every Reanimated hook call passes an explicit dependency array (valid on web and native).

Advanced gesture-based interactions are outside the initial `v0.1.0` scope.

---

# v0.1.0 Roadmap

## 1. Project Setup

* [x] Initialize repository
* [x] Configure TypeScript
* [x] Configure Vite
* [x] Configure library build (tsup)
* [x] Configure package exports
* [x] Configure package metadata

## 2. Cross-platform Foundation

* [x] Configure React Native Web (alias + `__DEV__`/`global` globals)
* [x] Configure styling tokens (see Styling decision — NativeWind dropped)
* [x] Configure Reanimated (explicit dependency arrays for web)
* [x] Verify Web compatibility (playground verified in browser)
* [x] Verify architecture for React Native (no web-only APIs in the core)

## 3. Types

* [x] Create `ToastType`
* [x] Create `ToastPosition`
* [x] Create `ToastOptions`
* [x] Create toast state types (`ToastEntry`, `ToastConfig`)
* [x] Create provider options

## 4. Core Toast System

* [x] Create toast creation logic
* [x] Generate toast IDs
* [x] Support toast types
* [x] Support title
* [x] Support description
* [x] Support duration
* [x] Support positions
* [x] Support dismissible toasts

## 5. Store

* [x] Create toast store
* [x] Add toast
* [x] Remove toast
* [x] Remove all toasts
* [x] Read toast state
* [x] Handle maximum visible toasts

## 6. Toast Manager

* [x] Implement `toast.show()`
* [x] Implement `toast.success()`
* [x] Implement `toast.error()`
* [x] Implement `toast.warning()`
* [x] Implement `toast.info()`
* [x] Implement `toast.dismiss()`
* [x] Implement `toast.dismissAll()`

## 7. React Integration

* [x] Create Toast Context
* [x] Create Toast Provider
* [x] Connect provider to store
* [x] Create toast hooks

## 8. Components

* [x] Create Toast component (AnimatedToast + GlassSurface)
* [x] Create Toast Container
* [x] Create Toast Content
* [x] Create Toast Icon
* [x] Create Toast Close
* [x] Verify accessibility (roles, labels, live region option)

## 9. Animation

* [x] Enter animation
* [x] Exit animation
* [x] Stack transition
* [x] Verify animation behavior on Web (verified in browser)

## 10. Visual Design

* [x] Glass appearance (liquid glass + depth)
* [x] Default variant
* [x] Success variant
* [x] Error variant
* [x] Warning variant
* [x] Info variant
* [x] Responsive behavior (max width + columns)

## 11. Customization

* [x] Provider defaults
* [x] Per-toast overrides
* [x] Position configuration
* [x] Duration configuration
* [x] Maximum toast configuration

## 12. Public Exports

* [x] Export `ToastProvider`
* [x] Export `toast`
* [x] Export public types
* [x] Verify package entry point

## 13. Playground

* [x] Create development playground
* [x] Test every toast type
* [x] Test positions
* [x] Test dismissal
* [x] Test stacking
* [x] Test duration
* [x] Test provider configuration

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

* [x] Configure package name
* [x] Configure version
* [x] Configure exports
* [x] Configure build output
* [x] Configure TypeScript declarations
* [x] Configure package files
* [x] Verify dependencies and peer dependencies

## 16. Build

* [x] Production build
* [x] Type checking
* [x] Verify generated files
* [x] Verify package size (~32 kB packed)

## 17. Package Preview

* [x] Run `npm pack --dry-run`
* [x] Inspect package contents
* [ ] Install packed package locally
* [ ] Test package from another project

## 18. Release

* [ ] Finalize `v0.1.0`
* [x] Update `CHANGELOG.md`
* [x] Verify README
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
