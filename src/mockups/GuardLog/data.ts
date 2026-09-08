// synthetic — no real jobs, customers, people or dollars
export type Verdict = 'ALLOWED' | 'BLOCKED' | 'REFUSED'

export interface GuardRow {
  time: string
  role: string
  verdict: Verdict
  reason: string
  rows: string
  ms: string
}

/** The seven rows the ledger shows at rest. */
export const SEED: GuardRow[] = [
  { time: '09:41:07', role: 'finance', verdict: 'ALLOWED', reason: '—', rows: '42', ms: '118' },
  { time: '09:41:31', role: 'dispatcher', verdict: 'BLOCKED', reason: 'unlisted table', rows: '', ms: '' },
  { time: '09:42:02', role: 'dispatcher', verdict: 'BLOCKED', reason: 'stacked statement', rows: '', ms: '' },
  { time: '09:42:40', role: 'sales', verdict: 'BLOCKED', reason: 'comment-hidden keyword', rows: '', ms: '' },
  { time: '09:43:15', role: 'dispatcher', verdict: 'BLOCKED', reason: 'pay column in WHERE', rows: '', ms: '' },
  { time: '09:43:58', role: 'finance', verdict: 'ALLOWED', reason: '—', rows: '200 (capped)', ms: '1,204' },
  { time: '09:44:20', role: 'sales', verdict: 'REFUSED', reason: 'sync-time used as business date — use created_on', rows: '', ms: '' },
]

/** The ticker rotates through these; `delta` seconds are added to the previous row's time. */
export const POOL: Array<Omit<GuardRow, 'time'> & { delta: number }> = [
  { delta: 27, role: 'office', verdict: 'ALLOWED', reason: '—', rows: '6', ms: '92' },
  { delta: 33, role: 'sales', verdict: 'BLOCKED', reason: 'salary column in SELECT', rows: '', ms: '' },
  { delta: 21, role: 'finance', verdict: 'ALLOWED', reason: '—', rows: '17', ms: '241' },
  { delta: 38, role: 'dispatcher', verdict: 'BLOCKED', reason: 'INTO OUTFILE', rows: '', ms: '' },
  { delta: 24, role: 'office', verdict: 'REFUSED', reason: 'no lookup for a data-shaped question', rows: '', ms: '' },
  { delta: 30, role: 'finance', verdict: 'ALLOWED', reason: '— (2 columns redacted, named back)', rows: '58', ms: '176' },
]

export const STAGES = [
  'blank comments & literals',
  'SELECT/WITH only',
  'single statement',
  '39-table allowlist',
  'pay gate (SELECT and WHERE)',
  'execute (200 rows · 15 s)',
  'redact on returned columns',
  'audit line',
]

/** Real, publishable tie-out counts. Keep exact. */
export const TIEOUTS = [
  { pair: 'progress billing vs invoice review', population: '262 rows', mismatches: '0' },
  { pair: 'five financial surfaces', population: '5,598 jobs', mismatches: '0' },
  { pair: 'lookup page vs owner page', population: '1,651 values / 127 jobs', mismatches: '0' },
  { pair: 'quote totals per job', population: '1,983 jobs', mismatches: '0' },
  { pair: 'certificate must-match lines', population: '12', mismatches: '12/12 exact' },
]

export function addSeconds(hms: string, delta: number): string {
  const [h, m, s] = hms.split(':').map(Number)
  const t = (h * 3600 + m * 60 + s + delta) % 86_400
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(Math.floor(t / 3600))}:${pad(Math.floor((t % 3600) / 60))}:${pad(t % 60)}`
}
