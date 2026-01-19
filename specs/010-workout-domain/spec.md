# Workout Domain Specification

## Workout Definition

A workout is composed of ordered segments.
Each segment defines:
- a format
- one or more exercises
- optional timing rules
- optional rest rules

A workout may or may not produce a global timer.

## Workout Intent

Each workout has an intent:
- Conditioning
- Strength
- Mixed (future)

Intent affects how performance data is stored but does not change execution rules.
