/**
 * The build log: 17 weeks from 2026-05-14 to 2026-09-07, one row per workstream.
 * Dates are the day a thing shipped. Entries marked `approx` are dated "by" that day:
 * the roadmap page reconstructed the early weeks from page and doctype creation
 * timestamps because version control would have collapsed six weeks onto five dates.
 */
export const WORK_START = '2026-05-14'
export const WORK_TO = '2026-09-07'
export const WEEKS = 17

export const WORKSTREAMS = [
  'Platform & data',
  'Scheduling',
  'Finance & billing',
  'Procurement & estimating',
  'Centaurus',
  'Field comms',
  'HR',
  'Verification',
] as const
export type Workstream = (typeof WORKSTREAMS)[number]

export interface Milestone {
  date: string
  stream: Workstream
  label: string
  approx?: boolean
}

export const MILESTONES: Milestone[] = [
  { date: '2026-05-14', stream: 'Platform & data', label: 'first day: bench stood up' },
  { date: '2026-06-09', stream: 'Platform & data', label: 'mirror of the field-service SaaS, 137 doctypes', approx: true },
  { date: '2026-06-08', stream: 'Centaurus', label: 'chat page live, provider-swappable client', approx: true },
  { date: '2026-06-09', stream: 'Verification', label: 'production baseline taken' },
  { date: '2026-06-18', stream: 'Platform & data', label: 'report pages; API + mirror tooling' },
  { date: '2026-07-10', stream: 'Finance & billing', label: '13-week cash forecast, back-tested on 90 jobs' },
  { date: '2026-07-14', stream: 'Scheduling', label: 'planning board: geo sketch, jobs-in-shape panel', approx: true },
  { date: '2026-07-14', stream: 'Platform & data', label: 'documentation moved behind page-role gates' },
  { date: '2026-07-15', stream: 'Platform & data', label: 'uptime hardening after a repeat outage' },
  { date: '2026-07-16', stream: 'Centaurus', label: 'AI photo insights + per-job summaries' },
  { date: '2026-07-17', stream: 'Platform & data', label: 'source + git-bundle backup every 2 days' },
  { date: '2026-07-21', stream: 'Finance & billing', label: 'open-jobs register with saved filters + export' },
  { date: '2026-07-21', stream: 'Procurement & estimating', label: '1,798 quotes re-attributed through the API, 0 failures' },
  { date: '2026-07-23', stream: 'Finance & billing', label: 'commission statement, reconciled' },
  { date: '2026-07-24', stream: 'Procurement & estimating', label: 'warehouse kit lists, printable count sheets' },
  { date: '2026-07-27', stream: 'Finance & billing', label: 'weekly bank package page' },
  { date: '2026-07-28', stream: 'Finance & billing', label: 'certificate reproduced line for line' },
  { date: '2026-07-29', stream: 'Procurement & estimating', label: 'trackers with an upsert contract' },
  { date: '2026-07-31', stream: 'Finance & billing', label: 'A/P settlement reconciliation' },
  { date: '2026-08-03', stream: 'Verification', label: 'column engine verified across 4 report pages' },
  { date: '2026-08-04', stream: 'Procurement & estimating', label: 'committed-materials schedule gate' },
  { date: '2026-08-06', stream: 'Scheduling', label: 'capacity + sequence on one engine; visit write-back' },
  { date: '2026-08-11', stream: 'Finance & billing', label: 'accounting reload procedure; certificate twin' },
  { date: '2026-08-13', stream: 'Centaurus', label: 'governed SQL + adversarial suite' },
  { date: '2026-08-14', stream: 'Scheduling', label: 'month calendar board' },
  { date: '2026-08-14', stream: 'Procurement & estimating', label: 'labour estimator with published accuracy' },
  { date: '2026-08-17', stream: 'Centaurus', label: 'per-job / quote / invoice drill-down, tied out' },
  { date: '2026-08-19', stream: 'Centaurus', label: 'navigation answers with a ringed screenshot' },
  { date: '2026-08-20', stream: 'Procurement & estimating', label: 'weekly buy board' },
  { date: '2026-08-20', stream: 'Finance & billing', label: 'schedule of values as a billing basis' },
  { date: '2026-08-21', stream: 'Scheduling', label: 'three views became three pages, one core' },
  { date: '2026-08-25', stream: 'Field comms', label: 'one forum, one topic per job' },
  { date: '2026-08-25', stream: 'Verification', label: 'board audit: 39 defects fixed' },
  { date: '2026-08-26', stream: 'HR', label: 'HR calendar with zero new doctypes' },
  { date: '2026-08-27', stream: 'Field comms', label: 'hotline answering staff DMs' },
  { date: '2026-08-27', stream: 'Centaurus', label: 'job chat intelligence' },
  { date: '2026-08-28', stream: 'Procurement & estimating', label: 'purchase-order mirror repaired' },
  { date: '2026-08-31', stream: 'Scheduling', label: '5-minute poller: 2.5 h → 5 min' },
  { date: '2026-08-31', stream: 'Centaurus', label: 'materiality gate on the review queue' },
  { date: '2026-08-31', stream: 'Field comms', label: 'one-tap “good to invoice”' },
  { date: '2026-09-01', stream: 'Platform & data', label: 'vendored chat app removed, 1.3 GB' },
  { date: '2026-09-01', stream: 'Finance & billing', label: 'continuation sheet rendered as the workbook' },
  { date: '2026-09-02', stream: 'Verification', label: 'app-wide hygiene review' },
  { date: '2026-09-03', stream: 'Finance & billing', label: 'A/R collections worklist' },
  { date: '2026-09-03', stream: 'Centaurus', label: 'model verified per capability' },
  { date: '2026-09-03', stream: 'Platform & data', label: 'export automation repaired' },
  { date: '2026-09-03', stream: 'HR', label: 'PII-free who-handles-what directory' },
  { date: '2026-09-04', stream: 'Finance & billing', label: 'five accounting entry screens' },
  { date: '2026-09-04', stream: 'Field comms', label: 'hour corrections; bilingual DMs' },
  { date: '2026-09-05', stream: 'Centaurus', label: 'incremental governance review by content hash' },
  { date: '2026-09-06', stream: 'Finance & billing', label: 'commission bonus rule settled' },
]

/** 1-based week number of a date within the build period. */
export function weekOf(date: string): number {
  const start = Date.UTC(2026, 4, 14)
  const [y, m, d] = date.split('-').map(Number)
  const t = Date.UTC(y, m - 1, d)
  return Math.floor((t - start) / (7 * 86_400_000)) + 1
}

export const BUILD_LOG_FOOTNOTE =
  'The early weeks were reconstructed into a dated roadmap from page and doctype creation timestamps rather than from version control, which would have collapsed six weeks of work onto five dates. Excluded on purpose: the outreach engine and the intake write path, both recorded as unproven live.'
