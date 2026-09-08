// synthetic — no real jobs, customers, people or dollars
export type Tint = 0 | 1 | 2 | 3
export type Fill = 'solid' | 'hatch' | 'dots'

export interface Job {
  id: string
  name: string
  short: string
  crew: number
  /** September 2026 day numbers, inclusive; chips draw on weekdays only. */
  start: number
  end: number
  tint: Tint
  fill: Fill
}

/** 12 invented jobs, 12 chip styles (4 tints × 3 fills); no two jobs sharing a week share a style. */
export const JOBS: Job[] = [
  { id: 'rtu', name: 'RTU replacement — distribution center', short: 'RTU·DC', crew: 3, start: 1, end: 11, tint: 0, fill: 'solid' },
  { id: 'chiller', name: 'Chiller tie-in — hospital wing B', short: 'Chiller', crew: 1, start: 2, end: 9, tint: 1, fill: 'solid' },
  { id: 'boiler', name: 'Boiler swap — school gym', short: 'Boiler', crew: 5, start: 7, end: 10, tint: 2, fill: 'solid' },
  { id: 'mua', name: 'Make-up air — commercial kitchen', short: 'MUA·kit', crew: 2, start: 14, end: 18, tint: 3, fill: 'solid' },
  { id: 'vrf', name: 'VRF install — office fit-out', short: 'VRF·off', crew: 4, start: 15, end: 24, tint: 0, fill: 'hatch' },
  { id: 'exhaust', name: 'Exhaust fans — parking deck', short: 'Exhaust', crew: 6, start: 16, end: 17, tint: 1, fill: 'hatch' },
  { id: 'split', name: 'Split systems — dental suite', short: 'Splits', crew: 2, start: 21, end: 23, tint: 2, fill: 'hatch' },
  { id: 'hydronic', name: 'Hydronic loop — rec center', short: 'Hydronic', crew: 1, start: 21, end: 30, tint: 3, fill: 'hatch' },
  { id: 'curbs', name: 'Rooftop curb adapters — retail', short: 'Curbs', crew: 3, start: 22, end: 25, tint: 0, fill: 'dots' },
  { id: 'gas', name: 'Gas piping — bakery', short: 'Gas·bake', crew: 5, start: 24, end: 25, tint: 1, fill: 'dots' },
  { id: 'bms', name: 'BMS points — data room', short: 'BMS', crew: 6, start: 28, end: 30, tint: 2, fill: 'dots' },
  { id: 'tab', name: 'Test & balance — clinic', short: 'T&B', crew: 4, start: 29, end: 30, tint: 3, fill: 'dots' },
]

/** A hard-blocked leave run: Fri 11 → Mon 14, the weekend bridged so the crew is not half-available. */
export const PTO = { from: 11, to: 14, crew: 5, short: 'PTO', label: 'PTO — bridged weekend · Crew 5 · hard block, not a warning' }

/** One flagged conflict with the dispatch board: flagged, never auto-corrected. */
export const CLASH = { day: 8, job: 'boiler', label: 'dispatch clash — flagged, not corrected' }

/** One auto-detected inspection day (visit wording + exactly one clocked employee + job type). */
export const INSP = { day: 3, short: 'INSP', label: 'inspection day — auto-detected from three simultaneous tests' }

/** The grid runs Mon 2026-08-31 → Sun 2026-10-04: index 0 is Aug 31, index d (1–30) is Sep d, 31–34 are Oct 1–4. */
export const CELLS = 35
export const DOW = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export const isWeekend = (i: number) => i % 7 >= 5
export const dayLabel = (i: number) => (i === 0 ? '31' : i > 30 ? String(i - 30) : String(i))
export const isPadding = (i: number) => i === 0 || i > 30
