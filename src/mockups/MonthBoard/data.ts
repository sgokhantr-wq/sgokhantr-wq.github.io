// synthetic — no real jobs, customers, people or dollars
export interface Job {
  id: string
  name: string
  short: string
  crew: number
  /** September 2026 day numbers, inclusive; chips draw on weekdays only. */
  start: number
  end: number
  /** 0-5, one of the six board hues. Assigned greedily so no two jobs sharing a week match. */
  hue: number
}

export const JOBS: Job[] = [
  { id: 'rtu', name: 'RTU replacement — distribution center', short: 'RTU replacement', crew: 3, start: 1, end: 11, hue: 0 },
  { id: 'chiller', name: 'Chiller tie-in — hospital wing B', short: 'Chiller tie-in', crew: 1, start: 2, end: 9, hue: 1 },
  { id: 'boiler', name: 'Boiler swap — school gym', short: 'Boiler swap', crew: 5, start: 7, end: 10, hue: 2 },
  { id: 'mua', name: 'Make-up air — commercial kitchen', short: 'Make-up air', crew: 2, start: 14, end: 18, hue: 0 },
  { id: 'vrf', name: 'VRF install — office fit-out', short: 'VRF install', crew: 4, start: 15, end: 24, hue: 1 },
  { id: 'exhaust', name: 'Exhaust fans — parking deck', short: 'Exhaust fans', crew: 6, start: 16, end: 17, hue: 2 },
  { id: 'split', name: 'Split systems — dental suite', short: 'Split systems', crew: 2, start: 21, end: 23, hue: 0 },
  { id: 'hydronic', name: 'Hydronic loop — rec center', short: 'Hydronic loop', crew: 1, start: 21, end: 30, hue: 2 },
  { id: 'curbs', name: 'Rooftop curb adapters — retail', short: 'Curb adapters', crew: 3, start: 22, end: 25, hue: 3 },
  { id: 'gas', name: 'Gas piping — bakery', short: 'Gas piping', crew: 5, start: 24, end: 25, hue: 4 },
  { id: 'bms', name: 'BMS points — data room', short: 'BMS points', crew: 6, start: 28, end: 30, hue: 0 },
  { id: 'tab', name: 'Test & balance — clinic', short: 'Test & balance', crew: 4, start: 29, end: 30, hue: 1 },
]

/** A hard-blocked leave run: Fri 11 → Mon 14, the weekend bridged so the crew is not half-available. */
export const PTO = { from: 11, to: 14, crew: 5, label: 'PTO — bridged weekend · Crew 5 · a hard block, not a warning' }

/** One flagged conflict with the dispatch board: flagged, never auto-corrected. */
export const CLASH = { day: 8, job: 'boiler', label: 'dispatch clash — flagged, not corrected' }

/** One auto-detected inspection day (visit wording + exactly one clocked employee + job type). */
export const INSP = { day: 3, label: 'inspection day — auto-detected from three simultaneous tests' }

/** The grid runs Mon 2026-08-31 → Sun 2026-10-04: index 0 is Aug 31, index d (1–30) is Sep d, 31–34 are Oct 1–4. */
export const CELLS = 35
export const DOW = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export const isWeekend = (i: number) => i % 7 >= 5
export const dayLabel = (i: number) => (i === 0 ? '31' : i > 30 ? String(i - 30) : String(i))
export const isPadding = (i: number) => i === 0 || i > 30
