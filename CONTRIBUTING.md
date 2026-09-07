# Contributing to Glass Toast

Thank you for your interest in contributing to Glass Toast.

Glass Toast is an open-source project, and contributions are welcome. This document explains how to set up the project, work on changes, and submit contributions.

## Before You Start

Before making a significant change, please consider opening an issue to discuss the proposed approach.

For small fixes, documentation improvements, and isolated changes, you can usually proceed directly with a pull request.

## Development Setup

### Requirements

Make sure you have the following installed:

* Node.js
* npm
* Git

### Clone the Repository

```bash
git clone https://github.com/MarioEstima/glass-toast.git
cd glass-toast
```

### Install Dependencies

```bash
npm install
```

### Start Development

```bash
npm run dev
```

### Build the Library

```bash
npm run build
```

Always make sure the project builds successfully before submitting a pull request.

## Branches

Create a dedicated branch for your work.

Recommended naming:

```text
feature/add-toast-actions
fix/toast-dismiss-animation
docs/update-installation
refactor/toast-store
test/toast-manager
```

Avoid working directly on the `main` branch.

## Commits

Use clear and descriptive commit messages.

The project follows a conventional commit style:

```text
feat: add toast positioning
fix: prevent duplicate toast dismissal
docs: update installation guide
refactor: simplify toast store
test: add toast manager tests
chore: update dependencies
```

Keep commits focused. Avoid combining unrelated changes into a single commit.

## Pull Requests

Before opening a pull request:

* Make sure the project builds successfully.
* Make sure the changes are focused.
* Review your own diff.
* Update documentation when necessary.
* Add or update tests when appropriate.
* Make sure no unnecessary dependencies were introduced.
* Make sure the public API remains consistent.

Pull requests should clearly explain:

1. What changed.
2. Why the change was necessary.
3. How the change was implemented.
4. Whether the change affects the public API.

## Code Style

Glass Toast is written primarily in TypeScript.

When contributing:

* Prefer TypeScript over JavaScript.
* Keep components focused.
* Keep core logic independent from presentation.
* Avoid unnecessary abstractions.
* Prefer explicit and readable code.
* Avoid introducing dependencies for functionality that can reasonably remain internal.
* Keep cross-platform concerns isolated.

## Architecture

Glass Toast is designed around a separation between the public API, core logic, state management, and presentation.

The general architecture is:

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

The core toast logic should not depend directly on platform-specific UI implementations.

This separation is important because Glass Toast targets both Web and React Native.

## Dependencies

New dependencies should be introduced only when they provide meaningful value to the project.

Before adding a dependency, consider:

* Does the project actually need it?
* Is there already an internal solution?
* Does it support the required platforms?
* Does it significantly increase package size?
* Is it actively maintained?
* Does it introduce unnecessary complexity?

Avoid dependencies for small utilities that can be implemented internally.

## Public API

Changes to the public API require additional consideration.

The following are considered public API:

* Exported functions.
* Exported components.
* Exported hooks.
* Exported types.
* Provider properties.
* Toast methods.

Avoid breaking existing behavior without a clear reason and documentation.

## Documentation

If a contribution changes user-facing behavior, update the appropriate documentation.

This may include:

* `README.md`
* API documentation
* `CHANGELOG.md`
* `PROJECT.md`

## Bug Reports

When reporting a bug, provide enough information to reproduce it.

Include:

* Glass Toast version.
* React version.
* Platform.
* Node.js version when relevant.
* Reproduction steps.
* Expected behavior.
* Actual behavior.
* Error messages or stack traces.

A minimal reproduction is highly appreciated.

## Feature Requests

Feature requests are welcome.

A useful feature request should explain:

* The problem it solves.
* Why the feature is useful.
* How you expect it to work.
* Whether it affects the public API.

Please avoid proposing implementation details unless they are relevant to the discussion.

## Security

Do not report security vulnerabilities through public GitHub issues.

Please follow the instructions in [`SECURITY.md`](SECURITY.md).

## Code of Conduct

All contributors are expected to follow the project's [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).

## License

By contributing to Glass Toast, you agree that your contributions will be licensed under the MIT License.

See [`LICENSE`](LICENSE) for details.

## Questions

If you are unsure about an implementation or architectural decision, open an issue or start a discussion before making a large change.

Contributions should improve the project while keeping the API simple, maintainable, and cross-platform.
