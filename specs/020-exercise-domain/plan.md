# Implementation Plan: Exercise Domain

**Branch**: `020-exercise-domain` | **Date**: 2025-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specifications from `/specs/020-exercise-domain/`, `/specs/000-product-overview/`, `/specs/010-workout-domain/`

## Summary

Implement the exercise domain for the fitness application. This includes exercise definitions (reusable entities with muscle groups, movement types, equipment), exercise library management, and performance history tracking. Exercises do not define reps or sets (those belong to segments). The system tracks performance history for each exercise, including working weights and execution times, with different storage rules based on workout intent (conditioning vs strength).

## Technical Context

**Language/Version**: JavaScript/ES6+ (React 19+)  
**Primary Dependencies**: React 19+, Vite, Firebase SDK (Firestore), React Router v6  
**Storage**: Firestore (NoSQL database for exercise definitions and performance history)  
**Testing**: Vitest + React Testing Library  
**Target Platform**: Web browsers (desktop and mobile), Progressive Web App capable  
**Project Type**: Single Page Application (SPA)  
**Performance Goals**: Exercise creation < 300ms, Exercise search < 200ms, Performance history load < 500ms  
**Constraints**: Exercises are reusable entities, performance data must be explainable, One Rep Max is always manually entered  
**Scale/Scope**: MVP: < 500 exercises; Growth: 500-5,000 exercises; Scale: > 5,000 exercises

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Component-Based Architecture
✅ **PASS**: Using React functional components with hooks aligns with constitution. Exercise components (ExerciseLibrary, ExerciseEditor, ExerciseViewer, PerformanceHistory) will be implemented as reusable functional components.

### II. File Organization
✅ **PASS**: Organized by feature/domain (exercise components in `src/components/exercise/`, exercise services in `src/services/exerciseService.js`, exercise hooks in `src/hooks/useExercise.js`). Following constitution guidance for feature-based organization.

### III. State Management
✅ **PASS**: Using React Context API for exercise library state where needed. Local component state for exercise creation/editing. Firestore for persistence. No external state management library needed - complexity is justified and minimal.

### IV. Build Tooling
✅ **PASS**: Using Vite as specified in constitution. All builds will pass linting checks. Testing framework (Vitest) integrates natively with Vite.

### V. Code Quality
✅ **PASS**: ESLint rules will be followed. Code uses functional components and hooks exclusively. Testing framework (Vitest + React Testing Library) ensures code quality.

**Gate Status**: ✅ **PASS** - All constitution principles satisfied. No violations.

## Project Structure

### Documentation (this feature)

```text
specs/020-exercise-domain/
├── plan.md              # This file
├── spec.md              # Feature specification
└── performance-tracking.md  # Performance tracking rules
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── exercise/
│   │   ├── ExerciseLibrary.jsx
│   │   ├── ExerciseEditor.jsx
│   │   ├── ExerciseViewer.jsx
│   │   ├── ExerciseSearch.jsx
│   │   ├── PerformanceHistory.jsx
│   │   └── MuscleGroupFilter.jsx
│   └── common/
│       └── [shared components]
├── hooks/
│   ├── useExercise.js
│   └── usePerformance.js
├── services/
│   ├── exerciseService.js      # Exercise CRUD operations
│   └── performanceService.js   # Performance history operations
├── models/
│   ├── exercise.js             # Exercise data model
│   └── performance.js           # Performance data model
├── utils/
│   └── exerciseUtils.js        # Exercise utility functions
└── [existing files]
```

**Structure Decision**: Single SPA project structure. Exercise domain organized under `src/components/exercise/`, `src/services/`, and `src/models/`. Following constitution principle II (File Organization) - organizing by feature/domain.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [None] | [N/A] | [N/A] |
