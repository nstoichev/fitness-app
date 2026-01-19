# Tasks: Exercise Domain

**Input**: Design documents from `/specs/020-exercise-domain/`
**Prerequisites**: plan.md (required), spec.md (required), performance-tracking.md

**Tests**: Tests are OPTIONAL and not included in this task list. Add test tasks if TDD approach is desired.

**Organization**: Tasks are grouped by feature area to enable independent implementation and testing.

## Format: `[ID] [P?] [Feature] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Feature]**: Which feature area this task belongs to (e.g., Exercise, Performance)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths shown below assume single project structure per plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 [P] Create directory structure: `src/components/exercise/`, `src/services/`, `src/models/`, `src/hooks/`, `src/utils/`
- [ ] T002 [P] Create Firestore collections structure documentation for exercises and performance history

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before feature implementation

**⚠️ CRITICAL**: No feature work can begin until this phase is complete

- [ ] T003 Create exercise data model `src/models/exercise.js` with Exercise class/object structure (name, muscle groups array, movement type, equipment, metadata)
- [ ] T004 Create performance data model `src/models/performance.js` with Performance class/object structure (exercise reference, weight, time, reps, workout intent, timestamp)
- [ ] T005 Create exercise service `src/services/exerciseService.js` with Firestore CRUD operations (create, read, update, delete exercises)
- [ ] T006 Create performance service `src/services/performanceService.js` with Firestore operations for performance history (create, read, query by exercise, query by date range)
- [ ] T007 Create exercise utility `src/utils/exerciseUtils.js` with helper functions (muscle group validation, equipment filtering, search utilities)

**Checkpoint**: Foundation ready - feature implementation can now begin

---

## Phase 3: Exercise Library Management (Priority: P1) 🎯 MVP

**Goal**: Enable users to create, view, search, and manage exercises in their library

**Independent Test**: A user can create an exercise with name, muscle groups, movement type, and equipment. They can search and filter exercises, view exercise details, and edit or delete exercises. Exercises are reusable across workouts.

### Implementation for Exercise Library

- [ ] T008 [P] [Exercise] Create ExerciseLibrary component `src/components/exercise/ExerciseLibrary.jsx` with exercise list view
- [ ] T009 [Exercise] Create ExerciseEditor component `src/components/exercise/ExerciseEditor.jsx` with exercise creation form
- [ ] T010 [Exercise] Add exercise name field in `src/components/exercise/ExerciseEditor.jsx`
- [ ] T011 [Exercise] Add muscle group selection (multi-select) in `src/components/exercise/ExerciseEditor.jsx` (chest, back, legs, arms, shoulders, core, etc.)
- [ ] T012 [Exercise] Add movement type selector in `src/components/exercise/ExerciseEditor.jsx` (push, pull, squat, hinge, carry, etc.)
- [ ] T013 [Exercise] Add equipment selector (multi-select) in `src/components/exercise/ExerciseEditor.jsx` (barbell, dumbbell, bodyweight, kettlebell, machine, etc.)
- [ ] T014 [Exercise] Integrate exercise creation form with `exerciseService.create()` in `src/components/exercise/ExerciseEditor.jsx`
- [ ] T015 [Exercise] Create ExerciseViewer component `src/components/exercise/ExerciseViewer.jsx` to display exercise details
- [ ] T016 [Exercise] Add exercise edit functionality in `src/components/exercise/ExerciseEditor.jsx` for editing existing exercises
- [ ] T017 [Exercise] Add exercise delete functionality with confirmation in exercise components
- [ ] T018 [Exercise] Create ExerciseSearch component `src/components/exercise/ExerciseSearch.jsx` with search input and filters
- [ ] T019 [Exercise] Implement exercise search by name in `src/components/exercise/ExerciseSearch.jsx`
- [ ] T020 [Exercise] Create MuscleGroupFilter component `src/components/exercise/MuscleGroupFilter.jsx` for filtering by muscle group
- [ ] T021 [Exercise] Add equipment filter in `src/components/exercise/ExerciseSearch.jsx`
- [ ] T022 [Exercise] Add movement type filter in `src/components/exercise/ExerciseSearch.jsx`
- [ ] T023 [Exercise] Create useExercise hook `src/hooks/useExercise.js` for exercise state management
- [ ] T024 [Exercise] Add route for `/exercises` in `src/App.jsx` that renders ExerciseLibrary
- [ ] T025 [Exercise] Add route for `/exercises/new` in `src/App.jsx` that renders ExerciseEditor
- [ ] T026 [Exercise] Add route for `/exercises/:id` in `src/App.jsx` that renders ExerciseViewer
- [ ] T027 [Exercise] Add route for `/exercises/:id/edit` in `src/App.jsx` that renders ExerciseEditor in edit mode

**Checkpoint**: At this point, users can create, view, search, and manage exercises. Exercise library is functional.

---

## Phase 4: Performance History Tracking (Priority: P2)

**Goal**: Track and display performance history for exercises

**Independent Test**: When performance data is logged (from workout completion), it is stored and associated with exercises. Users can view performance history for an exercise, including weights and times over time. Performance data is stored correctly based on workout intent (conditioning weight vs set weight).

### Implementation for Performance History

- [ ] T028 [P] [Performance] Create PerformanceHistory component `src/components/exercise/PerformanceHistory.jsx` to display exercise performance over time
- [ ] T029 [Performance] Add performance data visualization in `src/components/exercise/PerformanceHistory.jsx` (charts or timeline view)
- [ ] T030 [Performance] Implement performance data storage logic in `src/services/performanceService.js` (store conditioning weight for conditioning workouts, set weight for strength workouts)
- [ ] T031 [Performance] Add performance data query by exercise in `src/services/performanceService.js` (get all performance records for an exercise)
- [ ] T032 [Performance] Add performance data query by date range in `src/services/performanceService.js` (get performance records within date range)
- [ ] T033 [Performance] Create usePerformance hook `src/hooks/usePerformance.js` for performance state management
- [ ] T034 [Performance] Integrate performance history display in ExerciseViewer component
- [ ] T035 [Performance] Add performance data filtering (by date range, by workout intent) in PerformanceHistory
- [ ] T036 [Performance] Add One Rep Max (1RM) manual entry field in exercise or performance components (always manually entered, never calculated)
- [ ] T037 [Performance] Display 1RM in exercise performance history if available
- [ ] T038 [Performance] Add performance statistics calculation (personal records, recent trends) in `src/utils/exerciseUtils.js`
- [ ] T039 [Performance] Display performance statistics in PerformanceHistory component (PR dates, recent improvements)

**Checkpoint**: At this point, performance history tracking and display is functional. Performance data is stored and retrieved correctly.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple features

- [ ] T040 [P] Add loading states for exercise operations (create, read, update, delete, search)
- [ ] T041 [P] Add error handling and user-friendly error messages across exercise components
- [ ] T042 [P] Add form validation feedback (visual indicators for valid/invalid fields)
- [ ] T043 [P] Enhance responsive design for mobile devices (touch targets, spacing, layout)
- [ ] T044 [P] Add accessibility improvements (ARIA labels, keyboard navigation, focus management)
- [ ] T045 [P] Optimize exercise loading performance (lazy loading, pagination for exercise lists, search debouncing)
- [ ] T046 [P] Add exercise duplication/cloning functionality
- [ ] T047 [P] Add exercise favorites/starring functionality
- [ ] T048 [P] Add exercise categories/tags for better organization
- [ ] T049 [P] Code cleanup and refactoring (extract common components if needed)
- [ ] T050 [P] Security review: Verify Firestore security rules for exercise data access
- [ ] T051 [P] Performance testing: Verify exercise creation < 300ms, exercise search < 200ms, performance history load < 500ms targets are met

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all features
- **Exercise Library (Phase 3)**: Depends on Foundational - Can start independently
- **Performance History (Phase 4)**: Depends on Exercise Library - Needs exercises to track performance for
- **Polish (Final Phase)**: Depends on all desired features being complete

### Feature Dependencies

- **Exercise Library**: Can start after Foundational - No dependencies on other features
- **Performance History**: Depends on Exercise Library - Performance belongs to exercises
- **Performance Logging**: Depends on Calendar/Workout Execution domain - Performance is logged after workout completion

### Within Each Feature

- Models before services
- Services before components
- Components before integration
- Core implementation before error handling and polish

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T001, T002)
- All Foundational tasks can be worked on in parallel after models are defined (T005, T006, T007)
- Exercise form fields (T010-T013) can be worked on in parallel
- Search and filter components (T018-T022) can be worked on in parallel
- Performance query functions (T031-T032) can be worked on in parallel
- Polish phase tasks marked [P] can all run in parallel

---

## Implementation Strategy

### MVP First (Exercise Library Only)

1. Complete Phase 1: Setup (T001-T002)
2. Complete Phase 2: Foundational (T003-T007) - CRITICAL - blocks all features
3. Complete Phase 3: Exercise Library (T008-T027)
4. **STOP and VALIDATE**: Test exercise library independently
   - Create exercise with all fields
   - Search exercises by name
   - Filter by muscle group
   - View exercise details
   - Edit exercise
   - Delete exercise
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add Exercise Library → Test independently → Deploy/Demo (MVP!)
3. Add Performance History → Test independently → Deploy/Demo
4. Each feature adds value without breaking previous features

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: Exercise Library (Phase 3)
   - Developer B: Performance History (Phase 4) - can start after Phase 3 begins
   - Developer C: Polish tasks - can work in parallel

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Feature] label maps task to specific feature area for traceability
- Each feature should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate feature independently
- Avoid: vague tasks, same file conflicts, cross-feature dependencies that break independence
- Firestore configuration requires actual Firebase project setup (not in code tasks)
- All file paths are relative to repository root
- Exercise domain must be available for workout segment exercise selection
- Performance logging integration will come from calendar/workout execution domain
- One Rep Max is always manually entered, never calculated automatically

---

## Task Summary

- **Total Tasks**: 51
- **Setup Phase**: 2 tasks
- **Foundational Phase**: 5 tasks
- **Exercise Library (P1)**: 20 tasks
- **Performance History (P2)**: 12 tasks
- **Polish Phase**: 12 tasks
- **Parallel Opportunities**: Multiple tasks can run in parallel within each phase
- **MVP Scope**: Phases 1-3 (Setup + Foundational + Exercise Library)
