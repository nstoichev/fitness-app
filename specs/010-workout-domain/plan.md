# Implementation Plan: Workout Domain

**Branch**: `010-workout-domain` | **Date**: 2025-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specifications from `/specs/010-workout-domain/`, `/specs/000-product-overview/`

## Summary

Implement the workout domain for the fitness application. This includes workout definitions, segment formats (AMRAP, EMOM, For Time, Chipper, Ladder, Straight Sets, Fartlek), timer generation logic, and fatigue/stamina tracking. Workouts are composed of ordered segments, each with a format, exercises, and optional timing/rest rules. The system generates timers when all segments are time-bindable and tracks muscle-group-based fatigue accumulation.

## Technical Context

**Language/Version**: JavaScript/ES6+ (React 19+)  
**Primary Dependencies**: React 19+, Vite, Firebase SDK (Firestore), React Router v6  
**Storage**: Firestore (NoSQL database for workout definitions, segment data)  
**Testing**: Vitest + React Testing Library  
**Target Platform**: Web browsers (desktop and mobile), Progressive Web App capable  
**Project Type**: Single Page Application (SPA)  
**Performance Goals**: Workout creation < 500ms, Timer generation < 100ms, Segment rendering < 50ms  
**Constraints**: Workout definitions must be explainable, timers are execution aids not validation, fatigue is informational not prescriptive  
**Scale/Scope**: MVP: < 1,000 workouts; Growth: 1,000-10,000 workouts; Scale: > 10,000 workouts

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Component-Based Architecture
✅ **PASS**: Using React functional components with hooks aligns with constitution. Workout components, segment components, and timer components will be implemented as reusable functional components.

### II. File Organization
✅ **PASS**: Organized by feature/domain (workout components in `src/components/workout/`, workout services in `src/services/workoutService.js`, workout hooks in `src/hooks/useWorkout.js`). Following constitution guidance for feature-based organization.

### III. State Management
✅ **PASS**: Using React Context API for workout state management where needed. Local component state for workout creation/editing. Firestore for persistence. No external state management library needed - complexity is justified and minimal.

### IV. Build Tooling
✅ **PASS**: Using Vite as specified in constitution. All builds will pass linting checks. Testing framework (Vitest) integrates natively with Vite.

### V. Code Quality
✅ **PASS**: ESLint rules will be followed. Code uses functional components and hooks exclusively. Testing framework (Vitest + React Testing Library) ensures code quality.

**Gate Status**: ✅ **PASS** - All constitution principles satisfied. No violations.

## Project Structure

### Documentation (this feature)

```text
specs/010-workout-domain/
├── plan.md              # This file
├── spec.md              # Feature specification
├── segment-formats.md   # Segment format definitions
├── timer-model.md       # Timer generation rules
└── fatigue-stamina.md   # Fatigue and stamina model
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── workout/
│   │   ├── WorkoutBuilder.jsx
│   │   ├── WorkoutViewer.jsx
│   │   ├── SegmentEditor.jsx
│   │   ├── SegmentViewer.jsx
│   │   ├── TimerDisplay.jsx
│   │   └── FormatSelector.jsx
│   └── common/
│       └── [shared components]
├── hooks/
│   ├── useWorkout.js
│   ├── useTimer.js
│   └── useFatigue.js
├── services/
│   ├── workoutService.js      # Workout CRUD operations
│   ├── segmentService.js      # Segment format logic
│   ├── timerService.js        # Timer generation logic
│   └── fatigueService.js      # Fatigue calculation
├── models/
│   ├── workout.js             # Workout data model
│   ├── segment.js             # Segment data model
│   └── fatigue.js             # Fatigue data model
├── utils/
│   ├── timerUtils.js          # Timer utility functions
│   └── fatigueUtils.js        # Fatigue calculation utilities
└── [existing files]
```

**Structure Decision**: Single SPA project structure. Workout domain organized under `src/components/workout/`, `src/services/`, and `src/models/`. Following constitution principle II (File Organization) - organizing by feature/domain.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [None] | [N/A] | [N/A] |
