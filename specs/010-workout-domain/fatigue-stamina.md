# Fatigue and Stamina Model

## Overview

The system tracks muscle-group-specific fatigue.
Fatigue affects recovery visibility, not execution permission.

## Two Fatigue Layers

### Short-Term Fatigue
- Occurs within a workout
- Recovers via rest intervals
- Used implicitly during execution

### Long-Term Fatigue
- Accumulates across workouts
- Triggers recovery windows (24–72h)
- Displayed in stamina view

## Fatigue Accumulation

Each exercise contributes:
- muscle group
- intensity factor
- volume factor

Accumulated fatigue decays over time based on muscle group recovery rates.

## Display Philosophy

- No warnings during workouts
- Recovery status shown outside execution context
- Visual emphasis over numeric precision
