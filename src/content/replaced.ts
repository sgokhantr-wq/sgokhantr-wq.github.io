/** "What the paperwork used to be": the FROM / TO register. */
export interface ReplacedRow {
  from: string
  to: string
  evidence: string
}

export const REPLACED_INTRO = 'The contractor ran on documents. The job was to make the documents true.'

export const REPLACED: ReplacedRow[] = [
  {
    from: 'a weekly borrowing-base package assembled by hand and emailed to a bank',
    to: 'imported, reconciled against the operational system, recomputed and re-exported in the bank’s own four layouts',
    evidence: '4 workbooks a week · all 12 must-match lines exact',
  },
  {
    from: 'a spreadsheet pace board',
    to: 'a burn-down board that judges each day on its own terms and states the rule',
    evidence: 'verdict computed server-side · 7 KPIs byte-identical in the A/B harness',
  },
  {
    from: 'an intake log sitting between “the phone rang” and “a job exists”',
    to: 'a live intake page: four panes over two doctypes, triage ordered by priority band then age',
    evidence: '4 open emergency rows had averaged 210 days · 20 of 80 rows genuinely unscheduled',
  },
  {
    from: 'two spreadsheet trackers for procurement',
    to: 'first-class pages with an upsert contract, so a row edited in the app survives the next import',
    evidence: 'deduplicating key verified unique · only genuinely changed fields are pinned',
  },
  {
    from: 'a per-salesperson commission workbook',
    to: 'a statement reconciled against it before being trusted',
    evidence: 'draw schedule an exact match · one quarter’s bookings an exact match',
  },
  {
    from: 'a manual export-and-refresh routine',
    to: 'a browser bot every two hours and a five-minute poller',
    evidence: 'new jobs reach the crew’s chat in ~5 min instead of ~2.5 h',
  },
  {
    from: 'per-job chat groups whose invite volume matched the canonical spam signature',
    to: 'one forum with a topic per job; topic creation adds nobody and imports nothing',
    evidence: '~560 invites + ~50 contact imports a day → one API call per job',
  },
  {
    from: 'a takeoff script on one estimator’s laptop',
    to: 'ported into the ERP as a five-sheet breakout, validated cell-exact',
    evidence: '0 diffs across all 5 sheets, including formulas, merges and the download filename',
  },
  {
    from: 'a desktop accounting package',
    to: 'five entry screens, built only after measuring which documents are still typed natively',
    evidence: '~8,900 documents a year identified as the real gap',
  },
]
