# Segment Formats Specification

## Common Properties

All segment formats share:
- exercises[]
- rest rules (optional)
- isTimeBindable (boolean)

## AMRAP
- duration (required)
- isTimeBindable = true

## EMOM
- interval duration (required)
- total rounds (required)
- isTimeBindable = true

## For Time
- task definition
- optional time cap
- isTimeBindable = true only if time cap exists

## Chipper
- ordered task list
- optional time cap
- isTimeBindable = true only if time cap exists

## Ladder
- minimum 2 exercises
- start reps
- step increment
- optional cap
- isTimeBindable = optional

## Straight Sets
- exercises[]
- sets
- reps per exercise
- rest between sets
- rest between exercises
- optional alternation flag
- isTimeBindable = false

## Fartlek
- variable intensity intervals
- work/rest pattern list
- optional total duration
- isTimeBindable = true
