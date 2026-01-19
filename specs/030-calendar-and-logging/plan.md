# Implementation Plan: Calendar and Workout Logging

**Branch**: `030-calendar-and-logging` | **Date**: 2025-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specifications from `/specs/030-calendar-and-logging/`, `/specs/000-product-overview/`, `/specs/010-workout-domain/`, `/specs/020-exercise-domain/`

## Summary

Implement calendar scheduling and workout logging for the fitness application. This includes a calendar interface for scheduling workouts on dates, workout execution interface with timers, performance logging after workout completion, and calendar history viewing. The system triggers fatigue accumulation when workouts are completed and updates exercise performance history based on logged data.

## Technical Context

**Language/Version**: JavaScript/ES6+ (React 19+)  
**Primary Dependencies**: React 19+, Vite, Firebase SDK (Firestore), React Router v6, date manipulation library (date-fns or dayjs)  
**Storage**: Firestore (NoSQL database for scheduled workouts, performance logs)  
**Testing**: Vitest + React Testing Library  
**Target Platform**: Web browsers (desktop and mobile), Progressive Web App capable  
**Project Type**: Single Page Application (SPA)  
**Performance Goals**: Calendar load < 500ms, Workout scheduling < 300ms, Timer generation < 100ms, Performance logging < 1s  
**Constraints**: Calendar uses local timezone, performance logging is optional, timers are execution aids  
**Scale/Scope**: MVP: < 1,000 scheduled workouts; Growth: 1,000-10,000 scheduled workouts; Scale: > 10,000 scheduled workouts

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Component-Based Architecture
✅ **PASS**: Using React functional components with hooks aligns with constitution. Calendar components, workout execution components, and performance logging components will be implemented as reusable functional components.

### II. File Organization
✅ **PASS**: Organized by feature/domain (calendar components in `src/components/calendar/`, logging components in `src/components/logging/`, services in `src/services/`). Following constitution guidance for feature-based organization.

### III. State Management
✅ **PASS**: Using React Context API for calendar state where needed. Local component state for workout execution and performance logging. Firestore for persistence. No external state management library needed - complexity is justified and minimal.

### IV. Build Tooling
✅ **PASS**: Using Vite as specified in constitution. All builds will pass linting checks. Testing framework (Vitest) integrates natively with Vite.

### V. Code Quality
✅ **PASS**: ESLint rules will be followed. Code uses functional components and hooks exclusively. Testing framework (Vitest + React Testing Library) ensures code quality.

**Gate Status**: ✅ **PASS** - All constitution principles satisfied. No violations.

## Project Structure

### Documentation (this feature)

```text
specs/030-calendar-and-logging/
├── plan.md              # This file
├── spec.md              # Feature specification
├── workout-completion.md  # Workout completion rules
└── coaches-and-athletes.md  # Future extension notes
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── calendar/
│   │   ├── CalendarView.jsx
│   │   ├── CalendarMonth.jsx
│   │   ├── CalendarDay.jsx
│   │   ├── WorkoutScheduleModal.jsx
│   │   └── ScheduledWorkoutCard.jsx
│   ├── execution/
│   │   ├── WorkoutExecution.jsx
│   │   ├── SegmentExecution.jsx
│   │   └── ExecutionControls.jsx
│   ├── logging/
│   │   ├── PerformanceLogForm.jsx
│   │   ├── ExercisePerformanceInput.jsx
│   │   └── PerformanceSummary.jsx
│   └── common/
│       └── [shared components]
├── hooks/
│   ├── useCalendar.js
│   ├── useWorkoutExecution.js
│   └── usePerformanceLogging.js
├── services/
│   ├── calendarService.js      # Calendar and scheduling operations
│   ├── executionService.js      # Workout execution state management
│   └── loggingService.js        # Performance logging operations
├── models/
│   ├── scheduledWorkout.js      # Scheduled workout data model
│   ├── performanceLog.js        # Performance log data model
│   └── exercisePerformance.js   # Exercise performance data model
├── utils/
│   ├── calendarUtils.js         # Calendar utility functions
│   └── dateUtils.js             # Date manipulation utilities
└── [existing files]
```

**Structure Decision**: Single SPA project structure. Calendar and logging domain organized under `src/components/calendar/`, `src/components/execution/`, `src/components/logging/`, and corresponding services. Following constitution principle II (File Organization) - organizing by feature/domain.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [None] | [N/A] | [N/A] |
