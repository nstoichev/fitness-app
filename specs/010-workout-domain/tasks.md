# Tasks: Workout Domain

**Input**: Design documents from `/specs/010-workout-domain/`
**Prerequisites**: plan.md (required), spec.md (required), segment-formats.md, timer-model.md, fatigue-stamins.md

**Tests**: Tests are OPTIONAL and not included in this task list. Add test tasks if TDD approach is desired.

**Organization**: Tasks are grouped by feature area to enable independent implementation and testing.

## Format: `[ID] [P?] [Feature] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Feature]**: Which feature area this task belongs to (e.g., Workout, Segment, Timer, Fatigue)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths shown below assume single project structure per plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Install date manipulation library dependency: `npm install date-fns` (or dayjs)
- [ ] T002 [P] Create directory structure: `src/components/workout/`, `src/services/`, `src/models/`, `src/hooks/`, `src/utils/`
- [ ] T003 [P] Create Firestore collections structure documentation for workouts, segments, and fatigue data

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before feature implementation

**⚠️ CRITICAL**: No feature work can begin until this phase is complete

- [ ] T004 Create workout data model `src/models/workout.js` with Workout class/object structure (intent, segments array, metadata)
- [ ] T005 Create segment data model `src/models/segment.js` with Segment class/object structure (format, exercises, timing rules, rest rules, isTimeBindable)
- [ ] T006 Create fatigue data model `src/models/fatigue.js` with Fatigue class/object structure (muscle group, intensity factor, volume factor, timestamp)
- [ ] T007 Create workout service `src/services/workoutService.js` with Firestore CRUD operations (create, read, update, delete workouts)
- [ ] T008 Create segment service `src/services/segmentService.js` with segment format validation and format-specific logic
- [ ] T009 Create timer utility `src/utils/timerUtils.js` with timer generation logic (check if all segments are time-bindable, generate timer config)

**Checkpoint**: Foundation ready - feature implementation can now begin

---

## Phase 3: Workout Creation and Management (Priority: P1) 🎯 MVP

**Goal**: Enable users to create, view, and edit workouts with segments

**Independent Test**: A user can create a workout with multiple segments, each with a format and exercises, save it, and later view and edit it. Workout intent (conditioning/strength) is selectable.

### Implementation for Workout Creation

- [ ] T010 [P] [Workout] Create WorkoutBuilder component `src/components/workout/WorkoutBuilder.jsx` with workout creation form
- [ ] T011 [Workout] Add workout intent selector (Conditioning/Strength) in `src/components/workout/WorkoutBuilder.jsx`
- [ ] T012 [Workout] Add workout name and description fields in `src/components/workout/WorkoutBuilder.jsx`
- [ ] T013 [Workout] Integrate workout creation form with `workoutService.create()` in `src/components/workout/WorkoutBuilder.jsx`
- [ ] T014 [Workout] Add workout list view component `src/components/workout/WorkoutList.jsx` to display user's workouts
- [ ] T015 [Workout] Add workout detail view component `src/components/workout/WorkoutViewer.jsx` to display workout details
- [ ] T016 [Workout] Add workout edit functionality in `src/components/workout/WorkoutBuilder.jsx` for editing existing workouts
- [ ] T017 [Workout] Add workout delete functionality with confirmation in workout components
- [ ] T018 [Workout] Create useWorkout hook `src/hooks/useWorkout.js` for workout state management
- [ ] T019 [Workout] Add route for `/workouts` in `src/App.jsx` that renders WorkoutList
- [ ] T020 [Workout] Add route for `/workouts/new` in `src/App.jsx` that renders WorkoutBuilder
- [ ] T021 [Workout] Add route for `/workouts/:id` in `src/App.jsx` that renders WorkoutViewer
- [ ] T022 [Workout] Add route for `/workouts/:id/edit` in `src/App.jsx` that renders WorkoutBuilder in edit mode

**Checkpoint**: At this point, users can create, view, and edit workouts (without segments). Workout management is functional.

---

## Phase 4: Segment Creation and Formats (Priority: P2)

**Goal**: Enable users to add segments to workouts with different formats

**Independent Test**: A user can add segments to a workout, select a format (AMRAP, EMOM, etc.), configure format-specific properties, add exercises, and save the segment. All segment formats are supported.

### Implementation for Segments

- [ ] T023 [P] [Segment] Create SegmentEditor component `src/components/workout/SegmentEditor.jsx` with segment creation form
- [ ] T024 [Segment] Add format selector in `src/components/workout/SegmentEditor.jsx` (AMRAP, EMOM, For Time, Chipper, Ladder, Straight Sets, Fartlek)
- [ ] T025 [Segment] Implement AMRAP format configuration in `src/components/workout/SegmentEditor.jsx` (duration field)
- [ ] T026 [Segment] Implement EMOM format configuration in `src/components/workout/SegmentEditor.jsx` (interval duration, total rounds)
- [ ] T027 [Segment] Implement For Time format configuration in `src/components/workout/SegmentEditor.jsx` (task definition, optional time cap)
- [ ] T028 [Segment] Implement Chipper format configuration in `src/components/workout/SegmentEditor.jsx` (ordered task list, optional time cap)
- [ ] T029 [Segment] Implement Ladder format configuration in `src/components/workout/SegmentEditor.jsx` (exercises, start reps, step increment, optional cap)
- [ ] T030 [Segment] Implement Straight Sets format configuration in `src/components/workout/SegmentEditor.jsx` (exercises, sets, reps, rest rules, alternation flag)
- [ ] T031 [Segment] Implement Fartlek format configuration in `src/components/workout/SegmentEditor.jsx` (work/rest pattern list, optional total duration)
- [ ] T032 [Segment] Add exercise selection to segment editor (requires exercise domain to be available)
- [ ] T033 [Segment] Add rest rules configuration in `src/components/workout/SegmentEditor.jsx` (optional rest between sets, exercises)
- [ ] T034 [Segment] Add segment ordering/reordering in WorkoutBuilder (drag-and-drop or up/down buttons)
- [ ] T035 [Segment] Integrate segment creation with workout save in `src/components/workout/WorkoutBuilder.jsx`
- [ ] T036 [Segment] Add segment validation in `src/services/segmentService.js` (format-specific validation rules)
- [ ] T037 [Segment] Create SegmentViewer component `src/components/workout/SegmentViewer.jsx` to display segment details
- [ ] T038 [Segment] Add segment edit functionality in `src/components/workout/SegmentEditor.jsx`
- [ ] T039 [Segment] Add segment delete functionality in workout builder

**Checkpoint**: At this point, users can create workouts with segments of all supported formats. Segment management is functional.

---

## Phase 5: Timer Generation (Priority: P3)

**Goal**: Generate and display appropriate timers based on workout segment configurations

**Independent Test**: A workout with all time-bindable segments generates a global timer. Workouts with mixed segments show segment-specific timers. Timer types (countdown, count-up, interval) are correctly generated based on segment formats.

### Implementation for Timers

- [ ] T040 [P] [Timer] Create timer generation logic in `src/utils/timerUtils.js` to check if workout generates global timer (all segments time-bindable)
- [ ] T041 [Timer] Implement countdown timer logic in `src/utils/timerUtils.js` for AMRAP and capped segments
- [ ] T042 [Timer] Implement count-up timer logic in `src/utils/timerUtils.js` for For Time without cap
- [ ] T043 [Timer] Implement interval-based timer logic in `src/utils/timerUtils.js` for EMOM and Fartlek
- [ ] T044 [Timer] Create TimerDisplay component `src/components/workout/TimerDisplay.jsx` to display timer
- [ ] T045 [Timer] Add timer controls (start, pause, reset) in `src/components/workout/TimerDisplay.jsx`
- [ ] T046 [Timer] Create useTimer hook `src/hooks/useTimer.js` for timer state management
- [ ] T047 [Timer] Add timer service `src/services/timerService.js` for timer calculations and state
- [ ] T048 [Timer] Integrate timer display in WorkoutViewer for preview (read-only mode)
- [ ] T049 [Timer] Add segment timer display for individual segments when global timer not available
- [ ] T050 [Timer] Add timer auto-advance logic between segments (future: for workout execution)

**Checkpoint**: At this point, timers are generated and displayed correctly based on workout configuration. Timer logic is functional.

---

## Phase 6: Fatigue Tracking (Priority: P4)

**Goal**: Track and display muscle-group-based fatigue accumulation

**Independent Test**: When a workout is completed (future integration), fatigue is calculated based on exercises and their muscle groups. Fatigue accumulates and decays over time. Fatigue is displayed in stamina view (informational, not prescriptive).

### Implementation for Fatigue

- [ ] T051 [P] [Fatigue] Create fatigue calculation logic in `src/utils/fatigueUtils.js` (intensity factor, volume factor calculation)
- [ ] T052 [Fatigue] Implement fatigue accumulation logic in `src/utils/fatigueUtils.js` (add fatigue from exercises to muscle groups)
- [ ] T053 [Fatigue] Implement fatigue decay logic in `src/utils/fatigueUtils.js` (decay over time based on muscle group recovery rates)
- [ ] T054 [Fatigue] Create fatigue service `src/services/fatigueService.js` for fatigue CRUD operations in Firestore
- [ ] T055 [Fatigue] Create useFatigue hook `src/hooks/useFatigue.js` for fatigue state management
- [ ] T056 [Fatigue] Create StaminaView component `src/components/workout/StaminaView.jsx` to display muscle group recovery status
- [ ] T057 [Fatigue] Add visual fatigue indicators in StaminaView (color coding, visual emphasis over numeric precision)
- [ ] T058 [Fatigue] Integrate fatigue calculation with workout completion (future: when workout execution is implemented)
- [ ] T059 [Fatigue] Add muscle group recovery rate configuration (default rates, user customization future)
- [ ] T060 [Fatigue] Add fatigue history tracking in Firestore (timestamped fatigue snapshots)

**Checkpoint**: At this point, fatigue tracking and display is functional. Fatigue calculation and visualization work correctly.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple features

- [ ] T061 [P] Add loading states for workout operations (create, read, update, delete)
- [ ] T062 [P] Add error handling and user-friendly error messages across workout components
- [ ] T063 [P] Add form validation feedback (visual indicators for valid/invalid fields)
- [ ] T064 [P] Enhance responsive design for mobile devices (touch targets, spacing, layout)
- [ ] T065 [P] Add accessibility improvements (ARIA labels, keyboard navigation, focus management)
- [ ] T066 [P] Optimize workout loading performance (lazy loading, pagination for workout lists)
- [ ] T067 [P] Add workout search and filtering functionality
- [ ] T068 [P] Add workout duplication/cloning functionality
- [ ] T069 [P] Add workout templates (future: pre-built workout library)
- [ ] T070 [P] Code cleanup and refactoring (extract common components if needed)
- [ ] T071 [P] Security review: Verify Firestore security rules for workout data access
- [ ] T072 [P] Performance testing: Verify workout creation < 500ms, timer generation < 100ms targets are met

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all features
- **Workout Creation (Phase 3)**: Depends on Foundational - Can start independently
- **Segments (Phase 4)**: Depends on Workout Creation - Needs workouts to attach segments to
- **Timers (Phase 5)**: Depends on Segments - Needs segments to generate timers from
- **Fatigue (Phase 6)**: Depends on Workout Creation - Needs workouts/exercises for calculation (can be partially implemented)
- **Polish (Final Phase)**: Depends on all desired features being complete

### Feature Dependencies

- **Workout Creation**: Can start after Foundational - No dependencies on other features
- **Segments**: Depends on Workout Creation - Segments belong to workouts
- **Timers**: Depends on Segments - Timers generated from segment configurations
- **Fatigue**: Depends on Workout Creation and Exercise Domain - Needs exercises with muscle groups

### Within Each Feature

- Models before services
- Services before components
- Components before integration
- Core implementation before error handling and polish

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002, T003)
- All Foundational tasks can be worked on in parallel after models are defined (T007, T008, T009)
- Segment format implementations (T025-T031) can be worked on in parallel
- Timer type implementations (T041-T043) can be worked on in parallel
- Fatigue utility functions (T051-T053) can be worked on in parallel
- Polish phase tasks marked [P] can all run in parallel

---

## Implementation Strategy

### MVP First (Workout Creation Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004-T009) - CRITICAL - blocks all features
3. Complete Phase 3: Workout Creation (T010-T022)
4. **STOP and VALIDATE**: Test workout creation independently
   - Create workout with intent
   - View workout list
   - Edit workout
   - Delete workout
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add Workout Creation → Test independently → Deploy/Demo (MVP!)
3. Add Segments → Test independently → Deploy/Demo
4. Add Timers → Test independently → Deploy/Demo
5. Add Fatigue → Test independently → Deploy/Demo
6. Each feature adds value without breaking previous features

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: Workout Creation (Phase 3)
   - Developer B: Segment Formats (Phase 4) - can start after Phase 3 begins
   - Developer C: Timer Generation (Phase 5) - starts after Phase 4
   - Developer D: Fatigue Tracking (Phase 6) - can start in parallel with Phase 4/5

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
- Exercise domain must be available for segment exercise selection (T032)
- Workout execution (from calendar domain) will integrate with timers and fatigue

---

## Task Summary

- **Total Tasks**: 72
- **Setup Phase**: 3 tasks
- **Foundational Phase**: 6 tasks
- **Workout Creation (P1)**: 13 tasks
- **Segments (P2)**: 17 tasks
- **Timers (P3)**: 11 tasks
- **Fatigue (P4)**: 10 tasks
- **Polish Phase**: 12 tasks
- **Parallel Opportunities**: Multiple tasks can run in parallel within each phase
- **MVP Scope**: Phases 1-3 (Setup + Foundational + Workout Creation)
