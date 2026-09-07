# Glass Toast

Universal toast notification library for React, Web and React Native.

## Stack

* TypeScript
* React
* React Native
* React Native Web
* Vite
* NativeWind
* Tailwind CSS
* React Native Reanimated
* npm

---

# 1. Project Structure

```text
glass-toast/
│
├── src/
│   │
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
│   └── ...
│
├── public/
│
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── global.css
├── README.md
└── .gitignore
```

---

# 2. Architecture

```text
                    Public API
                       │
              ┌────────┴────────┐
              │                 │
        toast.success()    toast.error()
              │                 │
              └────────┬────────┘
                       │
                       ▼
                Toast Manager
                       │
                       ▼
                  Toast Store
                       │
                       ▼
                Toast Provider
                       │
                       ▼
                Toast Container
                       │
                       ▼
                     Toast
                       │
              ┌────────┴────────┐
              │                 │
            Styling          Animation
              │                 │
         NativeWind         Reanimated
```

## Core principle

The core logic must not depend on the UI.

```text
core/
    ↓
state + toast lifecycle

components/
    ↓
rendering

animations/
    ↓
animations

types/
    ↓
public contracts
```

This allows the rendering layer to evolve without changing the public API.

---

# 3. Public API

The first version should expose:

```ts
toast.show()
toast.success()
toast.error()
toast.warning()
toast.info()

toast.dismiss()
toast.dismissAll()
```

Provider:

```tsx
<ToastProvider>
  <App />
</ToastProvider>
```

Hook:

```ts
const toast = useToast()
```

---

# 4. Toast Types

```ts
type ToastType =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info";
```

---

# 5. Toast Options

Initial API:

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

---

# 6. Positions

Initial positions:

```ts
type ToastPosition =
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right";
```

---

# 7. Animation

The toast should support:

* enter animation
* exit animation
* opacity
* translate
* stacking
* smooth removal

Animation library:

```text
React Native Reanimated
```

The animation implementation should remain isolated inside:

```text
src/animations/
```

---

# 8. Styling

Use:

```text
NativeWind
Tailwind CSS
```

Do not introduce a second styling system unless there is a real requirement.

The visual design should be:

* clean
* minimal
* modern
* glass-inspired
* customizable
* responsive

---

# 9. Implementation Checklist

## Phase 1 — Project Setup

* [ ] Create Vite project
* [ ] Configure React + TypeScript
* [ ] Remove application-specific Vite files
* [ ] Configure library entry point
* [ ] Configure Vite Library Mode
* [ ] Configure TypeScript
* [ ] Configure package exports
* [ ] Configure build output
* [ ] Configure peer dependencies
* [ ] Configure development dependencies

---

## Phase 2 — Cross-platform Foundation

* [ ] Install React Native
* [ ] Install React Native Web
* [ ] Install NativeWind
* [ ] Install Tailwind CSS
* [ ] Install React Native Reanimated
* [ ] Configure NativeWind
* [ ] Configure Tailwind
* [ ] Configure Reanimated
* [ ] Verify Web compatibility
* [ ] Verify production build

---

## Phase 3 — Types

Create:

```text
src/types/
```

Implement:

* [ ] ToastType
* [ ] ToastPosition
* [ ] ToastOptions
* [ ] ToastData
* [ ] ToastState
* [ ] ToastAction
* [ ] ToastContextValue

---

## Phase 4 — Core Toast System

Create:

```text
src/core/
```

Implement:

* [ ] Toast ID generation
* [ ] Toast creation
* [ ] Toast removal
* [ ] Toast update
* [ ] Toast queue
* [ ] Toast limit
* [ ] Toast duration
* [ ] Toast auto-dismiss
* [ ] Toast dismissal
* [ ] Dismiss all
* [ ] Unique IDs
* [ ] Multiple simultaneous toasts

---

## Phase 5 — Store

Implement:

```text
toast-store.ts
```

Responsibilities:

* [ ] Store toast state
* [ ] Add toast
* [ ] Remove toast
* [ ] Update toast
* [ ] Clear all
* [ ] Notify subscribers

The store should not know about React components.

---

## Phase 6 — Toast Manager

Implement:

```text
toast-manager.ts
```

Responsibilities:

* [ ] `show`
* [ ] `success`
* [ ] `error`
* [ ] `warning`
* [ ] `info`
* [ ] `dismiss`
* [ ] `dismissAll`

Example:

```ts
toast.success("Account created");
```

---

## Phase 7 — React Integration

Create:

```text
src/context/
```

Implement:

* [ ] ToastContext
* [ ] ToastProvider
* [ ] Connect store to React
* [ ] Expose toast state
* [ ] Subscribe/unsubscribe correctly

---

## Phase 8 — Components

Create:

```text
src/components/
```

Implement:

### ToastContainer

* [ ] Positioning
* [ ] Stacking
* [ ] Maximum visible toasts
* [ ] Multiple positions

### Toast

* [ ] Base layout
* [ ] Title
* [ ] Description
* [ ] Close button
* [ ] Press handling
* [ ] Type variants

### ToastContent

* [ ] Content layout
* [ ] Typography

### ToastIcon

* [ ] Default icons
* [ ] Type-based icon

### ToastClose

* [ ] Dismiss action
* [ ] Accessibility

---

# 10. Animation System

Create:

```text
src/animations/
```

Implement:

* [ ] Enter animation
* [ ] Exit animation
* [ ] Position animation
* [ ] Stacking animation
* [ ] Reanimated shared values
* [ ] Animated styles
* [ ] Smooth layout changes

Initial animation:

```text
opacity
+
translateY
```

Do not over-engineer animations in v1.

---

# 11. Glass Design

Initial visual system:

```text
Glass Toast
│
├── Background
├── Blur
├── Border
├── Shadow
├── Icon
├── Title
├── Description
└── Close
```

The visual design should work on:

```text
Light background
Dark background
```

and remain readable on both.

---

# 12. Customization

Support:

```tsx
<ToastProvider
  position="top-right"
  duration={4000}
  maxToasts={5}
/>
```

And individual configuration:

```ts
toast.show({
  title: "Payment",
  description: "Payment completed successfully.",
  type: "success",
  duration: 5000,
});
```

---

# 13. Public Exports

`src/index.ts` should expose only the public API.

Example:

```ts
export {
  ToastProvider,
  toast,
  useToast,
};
```

And the required public types:

```ts
export type {
  ToastType,
  ToastPosition,
  ToastOptions,
};
```

Internal files should not be part of the public API.

---

# 14. Playground

The playground exists only for development.

It should test:

```text
Basic Toast
Success
Error
Warning
Info
Custom Toast
Multiple Toasts
Dismiss
Dismiss All
Long Text
Short Text
Different Positions
Dark Mode
Animations
```

The playground must not be included in the published npm package.

---

# 15. Testing

Before publishing:

* [ ] Test `toast.show`
* [ ] Test success
* [ ] Test error
* [ ] Test warning
* [ ] Test info
* [ ] Test dismiss
* [ ] Test dismissAll
* [ ] Test duration
* [ ] Test multiple toasts
* [ ] Test maximum toast limit
* [ ] Test provider mounting/unmounting
* [ ] Test animation lifecycle
* [ ] Test TypeScript types
* [ ] Test production build

---

# 16. Package Configuration

Prepare:

* [ ] Package name
* [ ] Version
* [ ] Description
* [ ] Keywords
* [ ] License
* [ ] Repository
* [ ] Homepage
* [ ] Bugs URL
* [ ] `main`
* [ ] `module`
* [ ] `types`
* [ ] `exports`
* [ ] `files`
* [ ] `peerDependencies`

---

# 17. Build

Run:

```bash
npm run build
```

Verify:

```text
dist/
├── index.js
├── index.cjs
└── index.d.ts
```

The package must be usable after installation without access to the source repository.

---

# 18. Package Preview

Before publishing:

```bash
npm pack
```

Inspect the generated `.tgz`.

Verify that it contains only what is necessary.

It should not contain:

```text
node_modules/
playground/
.git/
temporary files
```

---

# 19. npm Publishing

Before publishing:

* [ ] Create npm account
* [ ] Login with npm
* [ ] Verify package name availability
* [ ] Verify package metadata
* [ ] Run build
* [ ] Run tests
* [ ] Run npm pack
* [ ] Inspect package
* [ ] Publish

Publish:

```bash
npm publish
```

For a public package:

```bash
npm publish --access public
```

---

# 20. README

The README must contain:

* [ ] Project description
* [ ] Installation
* [ ] Basic usage
* [ ] Provider setup
* [ ] Toast methods
* [ ] Toast options
* [ ] Positions
* [ ] Customization
* [ ] Examples
* [ ] API reference
* [ ] Browser/Web support
* [ ] React Native support
* [ ] License

---

# 21. Version 0.1.0 Definition

The first release is complete when the following works:

```tsx
import { ToastProvider, toast } from "glass-toast";
```

```tsx
<ToastProvider>
  <App />
</ToastProvider>
```

And:

```ts
toast.success("Success!");
toast.error("Something went wrong");
toast.warning("Warning");
toast.info("Information");
```

with:

* [ ] automatic dismissal
* [ ] manual dismissal
* [ ] animations
* [ ] stacking
* [ ] positions
* [ ] TypeScript
* [ ] Web support
* [ ] npm package
* [ ] documentation

---

# 22. Future Versions

Features that should NOT block v0.1.0:

```text
toast.promise()
toast.loading()
toast.update()
custom components
custom icons
custom animations
swipe gestures
progress indicators
action buttons
sound
haptic feedback
advanced themes
```

These can be introduced after the core library is stable.

---

# Definition of Done

`glass-toast` is considered finished for v0.1.0 when:

```text
Source
  ↓
Build
  ↓
dist
  ↓
npm pack
  ↓
Install in another React project
  ↓
ToastProvider
  ↓
toast.success()
  ↓
Toast appears
  ↓
Animation
  ↓
Auto dismiss
  ↓
Manual dismiss
```

The library must work without requiring the consumer to know or access its internal implementation.
