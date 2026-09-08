// synthetic — no real jobs, customers, people or dollars
// A continuation sheet for an invented project. Every derived figure is computed here,
// never typed: G = D + E + F, % = G ÷ C, balance = C − G, retainage = 10% of G.

export const PROJECT = 'Rooftop unit replacement — six units, distribution center'

export const APPLICATION = {
  no: 4,
  periodTo: '2026-08-31',
  retainageRate: 0.1,
}

/** The shorthand-expansion example for the marginal note. */
export const NOTE = {
  short: 'Demo ex. RTU (6)',
  long: 'Demolition of existing rooftop units (6)',
}

interface LineInput {
  item: string
  description: string
  /** C — scheduled value */
  scheduled: number
  /** D — from previous application */
  previous: number
  /** E — this period */
  thisPeriod: number
  /** F — materials presently stored */
  stored: number
}

export interface Line extends LineInput {
  /** G = D + E + F */
  completed: number
  /** G ÷ C, as a fraction */
  pct: number
  /** C − G */
  balance: number
  /** 10% of G */
  retainage: number
}

const INPUT: LineInput[] = [
  { item: '01', description: 'Mobilization', scheduled: 4800, previous: 4800, thisPeriod: 0, stored: 0 },
  { item: '02', description: 'Demolition of existing rooftop units (6)', scheduled: 18000, previous: 18000, thisPeriod: 0, stored: 0 },
  { item: '03', description: 'Curb adapters & rigging', scheduled: 24000, previous: 16800, thisPeriod: 7200, stored: 0 },
  { item: '04', description: 'RTU-1 through RTU-6 set', scheduled: 62400, previous: 15600, thisPeriod: 24960, stored: 6240 },
  { item: '05', description: 'Gas piping', scheduled: 9600, previous: 0, thisPeriod: 7200, stored: 0 },
  { item: '06', description: 'Controls & BMS points', scheduled: 14400, previous: 0, thisPeriod: 3600, stored: 4320 },
  { item: '07', description: 'Test & balance', scheduled: 7200, previous: 0, thisPeriod: 0, stored: 0 },
  { item: '08', description: 'Closeout', scheduled: 3600, previous: 0, thisPeriod: 0, stored: 0 },
]

function derive(l: LineInput): Line {
  const completed = l.previous + l.thisPeriod + l.stored
  return {
    ...l,
    completed,
    pct: l.scheduled === 0 ? 0 : completed / l.scheduled,
    balance: l.scheduled - completed,
    retainage: Math.round(completed * APPLICATION.retainageRate),
  }
}

export const LINES: Line[] = INPUT.map(derive)

const sum = (k: keyof LineInput & ('scheduled' | 'previous' | 'thisPeriod' | 'stored')) =>
  INPUT.reduce((acc, l) => acc + l[k], 0)

export const TOTALS: Line = derive({
  item: '',
  description: 'Totals',
  scheduled: sum('scheduled'),
  previous: sum('previous'),
  thisPeriod: sum('thisPeriod'),
  stored: sum('stored'),
})

/** Thousands separators, no currency sign — the unit lives in the column head. */
export function fmt(n: number): string {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function fmtPct(fraction: number): string {
  return (fraction * 100).toFixed(1)
}

/** The ten cells of a row, formatted, in column order A–J. */
export function cells(l: Line): string[] {
  return [
    l.item,
    l.description,
    fmt(l.scheduled),
    fmt(l.previous),
    fmt(l.thisPeriod),
    fmt(l.stored),
    fmt(l.completed),
    fmtPct(l.pct),
    fmt(l.balance),
    fmt(l.retainage),
  ]
}

export interface Column {
  letter: string
  /** Two- or three-line caps head for the sheet. */
  head: string[]
  /** One-word head for the condensed table. */
  short: string
  numeric: boolean
  /** Shown in the five-column condensed variant. */
  condensed: boolean
}

export const COLUMNS: Column[] = [
  { letter: 'A', head: ['ITEM', 'NO.'], short: 'Item', numeric: false, condensed: true },
  { letter: 'B', head: ['DESCRIPTION', 'OF WORK'], short: 'Description', numeric: false, condensed: true },
  { letter: 'C', head: ['SCHEDULED', 'VALUE'], short: 'Scheduled', numeric: true, condensed: true },
  { letter: 'D', head: ['FROM PREVIOUS', 'APPLICATION'], short: 'From previous', numeric: true, condensed: false },
  { letter: 'E', head: ['THIS', 'PERIOD'], short: 'This period', numeric: true, condensed: false },
  { letter: 'F', head: ['MATERIALS', 'PRESENTLY', 'STORED'], short: 'Stored', numeric: true, condensed: false },
  { letter: 'G', head: ['TOTAL COMPLETED', 'AND STORED', 'TO DATE'], short: 'Completed to date', numeric: true, condensed: false },
  { letter: 'H', head: ['%', '(G ÷ C)'], short: '%', numeric: true, condensed: true },
  { letter: 'I', head: ['BALANCE', 'TO FINISH'], short: 'Balance', numeric: true, condensed: true },
  { letter: 'J', head: ['RETAINAGE', '(10% OF G)'], short: 'Retainage', numeric: true, condensed: false },
]
