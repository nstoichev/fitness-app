# Fitness App Constitution

## Core Principles

### I. Component-Based Architecture
All UI functionality is built using React functional components with hooks. Components should be reusable, single-purpose, and follow React best practices. Use composition over inheritance.

### II. File Organization
Organize code by feature/domain when possible, or by type (components, hooks, utils) for smaller projects. Keep components co-located with their styles and related files when appropriate.

### III. State Management
Use React hooks (useState, useEffect, useContext) for local and shared state. Avoid external state management libraries unless complexity demands it. Keep state as local as possible.

### IV. Build Tooling
Vite is the build tool and dev server. All builds must pass linting checks. Production builds must be optimized and tested before deployment.

### V. Code Quality
ESLint rules must be followed. Code should be readable, maintainable, and follow React conventions. Prefer functional components and hooks over class components.

## Technology Stack

- React 19+ (functional components with hooks)
- Vite (build tool and dev server)
- ESLint (code quality and linting)

## Development Workflow

- Run `npm run dev` for local development
- Run `npm run build` for production builds
- Run `npm run lint` to check code quality
- All code changes should maintain existing functionality unless explicitly refactoring

## Governance

This constitution defines the core principles for the Fitness App. All development should align with these principles. When exceptions are needed, document the rationale.

**Version**: 1.0.0 | **Ratified**: 2025-01-27 | **Last Amended**: 2025-01-27
