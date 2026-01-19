# Tasks: Calendar and Workout Logging

**Input**: Design documents from `/specs/030-calendar-and-logging/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), workout-completion.md, coaches-and-athletes.md

**Tests**: Tests are OPTIONAL and not included in this task list. Add test tasks if TDD approach is desired.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths shown below assume single project structure per plan.md

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Install date manipulation library dependency: `npm install date-fns` (or dayjs) if not already installed
- [ ] T002 [P] Create directory structure: `src/components/calendar/`, `src/components/execution/`, `src/components/logging/`, `src/services/`, `src/models/`, `src/hooks/`, `src/utils/`
- [ ] T003 [P] Create Firestore collections structure documentation for scheduled workouts and performance logs

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Create scheduled workout data model `src/models/scheduledWorkout.js` with ScheduledWorkout class/object structure (workout reference, scheduled date, scheduled time optional, status, user reference)
- [ ] T005 Create performance log data model `src/models/performanceLog.js` with PerformanceLog class/object structure (workout reference, completion timestamp, execution time optional, user reference)
- [ ] T006 Create exercise performance data model `src/models/exercisePerformance.js` with ExercisePerformance class/object structure (exercise reference, working weight, execution time optional, reps completed, performance log reference)
- [ ] T007 Create calendar service `src/services/calendarService.js` with Firestore operations for scheduled workouts (create, read, update, delete, query by date range)
- [ ] T008 Create execution service `src/services/executionService.js` for workout execution state management
- [ ] T009 Create logging service `src/services/loggingService.js` with Firestore operations for performance logs (create, read, query by workout, query by date range)
- [ ] T010 Create calendar utility `src/utils/calendarUtils.js` with date manipulation and calendar calculation functions
- [ ] T011 Create date utility `src/utils/dateUtils.js` with date formatting and timezone handling functions

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Schedule Workouts on Calendar (Priority: P1) 🎯 MVP

**Goal**: Enable users to schedule workouts on specific calendar dates

**Independent Test**: A user can navigate to the calendar view, select a date, schedule a workout for that date, and see it appear on the calendar. They can view, edit, or remove scheduled workouts.

### Implementation for User Story 1

- [ ] T012 [P] [US1] Create CalendarView component `src/components/calendar/CalendarView.jsx` with calendar month view
- [ ] T013 [US1] Create CalendarMonth component `src/components/calendar/CalendarMonth.jsx` to display month grid with dates
- [ ] T014 [US1] Create CalendarDay component `src/components/calendar/CalendarDay.jsx` to display individual day with scheduled workouts
- [ ] T015 [US1] Add month navigation (previous/next month) in `src/components/calendar/CalendarView.jsx`
- [ ] T016 [US1] Create WorkoutScheduleModal component `src/components/calendar/WorkoutScheduleModal.jsx` for scheduling workouts on dates
- [ ] T017 [US1] Add workout selection in `src/components/calendar/WorkoutScheduleModal.jsx` (requires workout domain to be available)
- [ ] T018 [US1] Add date selection in `src/components/calendar/WorkoutScheduleModal.jsx`
- [ ] T019 [US1] Add optional time selection in `src/components/calendar/WorkoutScheduleModal.jsx`
- [ ] T020 [US1] Integrate workout scheduling with `calendarService.create()` in `src/components/calendar/WorkoutScheduleModal.jsx`
- [ ] T021 [US1] Create ScheduledWorkoutCard component `src/components/calendar/ScheduledWorkoutCard.jsx` to display scheduled workout on calendar day
- [ ] T022 [US1] Add scheduled workout click handler to view workout details in `src/components/calendar/ScheduledWorkoutCard.jsx`
- [ ] T023 [US1] Add scheduled workout edit functionality (change date, change workout) in calendar components
- [ ] T024 [US1] Add scheduled workout delete functionality with confirmation in calendar components
- [ ] T025 [US1] Create useCalendar hook `src/hooks/useCalendar.js` for calendar state management
- [ ] T026 [US1] Add route for `/calendar` in `src/App.jsx` that renders CalendarView
- [ ] T027 [US1] Add loading state for calendar data fetching in CalendarView
- [ ] T028 [US1] Add error handling for calendar operations in calendar components

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Users can schedule workouts on calendar dates and manage scheduled workouts.

---

## Phase 4: User Story 2 - Execute Scheduled Workouts (Priority: P2)

**Goal**: Enable users to execute scheduled workouts with timers and execution aids

**Independent Test**: A user can select a scheduled workout from the calendar, start the workout execution, interact with timers, complete segments, and finish the workout. Timers are generated based on workout segment formats.

### Implementation for User Story 2

- [ ] T029 [P] [US2] Create WorkoutExecution component `src/components/execution/WorkoutExecution.jsx` for workout execution interface
- [ ] T030 [US2] Add workout start functionality in `src/components/execution/WorkoutExecution.jsx` (initialize execution state, start timers if applicable)
- [ ] T031 [US2] Create SegmentExecution component `src/components/execution/SegmentExecution.jsx` to display and execute individual segments
- [ ] T032 [US2] Integrate timer display in `src/components/execution/WorkoutExecution.jsx` (requires timer generation from workout domain)
- [ ] T033 [US2] Add segment completion functionality in `src/components/execution/SegmentExecution.jsx` (mark segment complete, advance to next)
- [ ] T034 [US2] Add manual segment advance functionality in `src/components/execution/WorkoutExecution.jsx` (user can skip to next segment)
- [ ] T035 [US2] Add timer auto-advance logic between segments in `src/services/executionService.js` (if all segments time-bindable)
- [ ] T036 [US2] Create ExecutionControls component `src/components/execution/ExecutionControls.jsx` with controls (pause, finish early, complete)
- [ ] T037 [US2] Add manual workout completion functionality in `src/components/execution/ExecutionControls.jsx` (user can mark workout complete before timer finishes)
- [ ] T038 [US2] Add automatic workout completion when timer finishes in `src/services/executionService.js`
- [ ] T039 [US2] Create useWorkoutExecution hook `src/hooks/useWorkoutExecution.js` for execution state management
- [ ] T040 [US2] Update scheduled workout status to "in-progress" when execution starts in `src/services/executionService.js`
- [ ] T041 [US2] Update scheduled workout status to "completed" when execution finishes in `src/services/executionService.js`
- [ ] T042 [US2] Add route for `/calendar/:workoutId/execute` in `src/App.jsx` that renders WorkoutExecution
- [ ] T043 [US2] Add loading state for workout execution in WorkoutExecution component
- [ ] T044 [US2] Add error handling for execution operations in execution components

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Users can schedule workouts and execute them with timers.

---

## Phase 5: User Story 3 - Log Workout Performance (Priority: P3)

**Goal**: Enable users to log performance data after workout completion

**Independent Test**: After completing a workout, a user is prompted to log performance data. They can enter working weights (stored as conditioning weight or set weight based on workout intent), execution times, and reps. Performance data is stored and associated with exercises.

### Implementation for User Story 3

- [ ] T045 [P] [US3] Create PerformanceLogForm component `src/components/logging/PerformanceLogForm.jsx` for logging performance after workout completion
- [ ] T046 [US3] Add performance log prompt after workout completion in `src/components/execution/WorkoutExecution.jsx` (show modal or redirect)
- [ ] T047 [US3] Create ExercisePerformanceInput component `src/components/logging/ExercisePerformanceInput.jsx` for entering performance for individual exercises
- [ ] T048 [US3] Add working weight input in `src/components/logging/ExercisePerformanceInput.jsx`
- [ ] T049 [US3] Add execution time input in `src/components/logging/ExercisePerformanceInput.jsx` (if applicable for exercise/segment)
- [ ] T050 [US3] Add reps completed input in `src/components/logging/ExercisePerformanceInput.jsx` (if applicable)
- [ ] T051 [US3] Implement performance data storage logic in `src/services/loggingService.js` (store conditioning weight for conditioning workouts, set weight for strength workouts)
- [ ] T052 [US3] Associate performance data with exercises in `src/services/loggingService.js` (update exercise performance history)
- [ ] T053 [US3] Create performance log in Firestore when user submits performance data in `src/services/loggingService.js`
- [ ] T054 [US3] Add optional skip functionality in `src/components/logging/PerformanceLogForm.jsx` (user can skip logging if desired)
- [ ] T055 [US3] Create PerformanceSummary component `src/components/logging/PerformanceSummary.jsx` to display logged performance summary
- [ ] T056 [US3] Create usePerformanceLogging hook `src/hooks/usePerformanceLogging.js` for performance logging state management
- [ ] T057 [US3] Add route for `/calendar/:workoutId/log` in `src/App.jsx` that renders PerformanceLogForm (optional, can be modal)
- [ ] T058 [US3] Add loading state for performance logging in PerformanceLogForm component
- [ ] T059 [US3] Add error handling for performance logging operations in logging components

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently. Users can schedule, execute, and log performance for workouts.

---

## Phase 6: User Story 4 - View Workout History and Calendar (Priority: P4)

**Goal**: Enable users to view completed workouts and filter calendar view

**Independent Test**: A user can view the calendar with completed workouts visually distinct from scheduled workouts. They can navigate between months, filter by completion status, and view details of completed workouts including logged performance.

### Implementation for User Story 4

- [ ] T060 [P] [US4] Add visual distinction for completed workouts in `src/components/calendar/CalendarDay.jsx` (different styling, icon, or badge)
- [ ] T061 [US4] Add visual distinction for scheduled workouts in `src/components/calendar/CalendarDay.jsx`
- [ ] T062 [US4] Add calendar filter functionality in `src/components/calendar/CalendarView.jsx` (filter by status: all, scheduled only, completed only)
- [ ] T063 [US4] Add completed workout click handler to view workout details and performance in `src/components/calendar/ScheduledWorkoutCard.jsx`
- [ ] T064 [US4] Display logged performance data when viewing completed workout in workout detail view
- [ ] T065 [US4] Add date range navigation in calendar (jump to specific month/year)
- [ ] T066 [US4] Add workout count display in calendar (number of scheduled/completed workouts per month)
- [ ] T067 [US4] Add performance summary display for completed workouts in calendar view (optional: show execution time, weights used)
- [ ] T068 [US4] Create workout history view component (optional: separate view for completed workouts list)
- [ ] T069 [US4] Add search functionality for completed workouts (search by workout name, date range)

**Checkpoint**: At this point, all user stories should be independently functional. The calendar and logging system is complete.

---

## Phase 7: Fatigue Integration (Priority: P5)

**Goal**: Trigger fatigue accumulation when workouts are completed

**Independent Test**: When a workout is completed, fatigue is calculated based on exercises and their muscle groups. Fatigue accumulates and is stored. Fatigue calculation integrates with workout completion flow.

### Implementation for Fatigue Integration

- [ ] T070 [P] [Fatigue] Integrate fatigue calculation with workout completion in `src/services/executionService.js` (call fatigue service when workout marked complete)
- [ ] T071 [Fatigue] Trigger fatigue accumulation after performance logging in `src/services/loggingService.js` (if performance data affects fatigue calculation)
- [ ] T072 [Fatigue] Update fatigue service to use exercise performance data for calculation (requires exercise domain muscle groups)
- [ ] T073 [Fatigue] Store fatigue snapshots in Firestore when workouts are completed
- [ ] T074 [Fatigue] Add fatigue display in calendar or workout views (optional: show muscle group fatigue status)

**Checkpoint**: At this point, fatigue tracking is integrated with workout completion and logging.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T075 [P] Add loading states for all calendar and execution operations
- [ ] T076 [P] Improve error message display consistency across calendar, execution, and logging components
- [ ] T077 [P] Add form input validation feedback (visual indicators for valid/invalid fields)
- [ ] T078 [P] Enhance responsive design for mobile devices (touch targets, spacing, layout, calendar grid)
- [ ] T079 [P] Add accessibility improvements (ARIA labels, keyboard navigation, focus management, calendar navigation)
- [ ] T080 [P] Optimize calendar loading performance (lazy loading, pagination, efficient date range queries)
- [ ] T081 [P] Add calendar view preferences (start of week, timezone display)
- [ ] T082 [P] Add workout execution analytics (total workouts completed, total time, etc.)
- [ ] T083 [P] Code cleanup and refactoring (extract common components if needed)
- [ ] T084 [P] Security review: Verify Firestore security rules for scheduled workouts and performance logs
- [ ] T085 [P] Performance testing: Verify calendar load < 500ms, workout scheduling < 300ms, timer generation < 100ms, performance logging < 1s targets are met

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed) or sequentially in priority order (P1 → P2 → P3 → P4)
- **Fatigue Integration (Phase 7)**: Depends on workout completion and fatigue domain
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - Depends on workout domain for workout selection
- **User Story 2 (P2)**: Depends on User Story 1 - Needs scheduled workouts to execute. Also depends on workout domain for timers
- **User Story 3 (P3)**: Depends on User Story 2 - Needs completed workouts to log performance for. Also depends on exercise domain
- **User Story 4 (P4)**: Depends on User Stories 1, 2, 3 - Needs scheduled and completed workouts to display

### Domain Dependencies

- **Workout Domain**: Must be complete for workout selection and timer generation
- **Exercise Domain**: Must be complete for exercise performance tracking and muscle group data
- **Fatigue Domain**: Must be complete for fatigue integration (Phase 7)

### Within Each User Story

- Models/Components before services integration
- Services before UI integration
- Core implementation before error handling and polish
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002, T003)
- All Foundational tasks can be worked on in parallel after models are defined (T007, T008, T009, T010, T011)
- Calendar components (T012-T014) can be worked on in parallel
- Execution components (T029-T031) can be worked on in parallel
- Logging components (T045-T047) can be worked on in parallel
- Polish phase tasks marked [P] can all run in parallel

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004-T011) - CRITICAL - blocks all stories
3. Complete Phase 3: User Story 1 (T012-T028)
4. **STOP and VALIDATE**: Test User Story 1 independently
   - Schedule workout on calendar date
   - View scheduled workout on calendar
   - Edit scheduled workout
   - Remove scheduled workout
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Calendar Scheduling)
   - Developer B: User Story 2 (Workout Execution) - starts after US1 begins
   - Developer C: User Story 3 (Performance Logging) - starts after US2 begins
   - Developer D: User Story 4 (History View) - can start after US1/US2/US3

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Firestore configuration requires actual Firebase project setup (not in code tasks)
- All file paths are relative to repository root
- Workout domain must be complete for workout selection and execution
- Exercise domain must be complete for performance tracking
- Fatigue domain must be complete for fatigue integration
- Calendar uses local timezone
- Performance logging is optional - users can skip if desired

---

## Task Summary

- **Total Tasks**: 85
- **Setup Phase**: 3 tasks
- **Foundational Phase**: 8 tasks
- **User Story 1 (P1)**: 17 tasks
- **User Story 2 (P2)**: 16 tasks
- **User Story 3 (P3)**: 15 tasks
- **User Story 4 (P4)**: 10 tasks
- **Fatigue Integration (P5)**: 5 tasks
- **Polish Phase**: 11 tasks
- **Parallel Opportunities**: Multiple tasks can run in parallel within each phase
- **MVP Scope**: Phases 1-3 (Setup + Foundational + User Story 1)
