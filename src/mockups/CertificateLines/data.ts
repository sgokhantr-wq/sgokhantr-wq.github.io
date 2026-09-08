// synthetic — no real jobs, customers, people or dollars
// The twelve must-match lines of a borrowing-base certificate. Money lines are $K; the
// arithmetic is kept consistent here so the register can never show a sum that does not add.

export type LineKind = 'money' | 'pct' | 'count'

export interface CertLine {
  /** Line number as printed, 01–12. */
  n: string
  label: string
  /** Qualifier printed after the label on non-money lines (what the count is of). */
  qualifier?: string
  kind: LineKind
  /** A computed subtotal or result line, printed bold. */
  total?: boolean
  /** Recomputed from the bank's own imported rows. */
  twin: number
  /** The certificate as sent. */
  filed: number
}

const GROSS = 2450
const OVER_90 = 180
const RETAINAGE = 210
const CONCENTRATION = 140
const CONTRA = 60
const ELIGIBLE = GROSS - OVER_90 - RETAINAGE - CONCENTRATION - CONTRA // 1,860
const ADVANCE_RATE = 85
const AVAILABILITY = (ELIGIBLE * ADVANCE_RATE) / 100 // 1,581
const OUTSTANDING = 1200
const EXCESS = AVAILABILITY - OUTSTANDING // 381
const RESERVE_JOBS = 5
const CROSS_AGE_CUSTOMERS = 15

function money(n: string, label: string, v: number, total = false): CertLine {
  return { n, label, kind: 'money', total, twin: v, filed: v }
}

export const LINES: CertLine[] = [
  money('01', 'Gross receivables', GROSS),
  money('02', 'Less over-90', OVER_90),
  money('03', 'Less retainage', RETAINAGE),
  money('04', 'Less concentration carve-out', CONCENTRATION),
  money('05', 'Less contra reserve', CONTRA),
  money('06', 'Eligible receivables', ELIGIBLE, true),
  { n: '07', label: 'Advance rate', kind: 'pct', twin: ADVANCE_RATE, filed: ADVANCE_RATE },
  money('08', 'Availability', AVAILABILITY, true),
  money('09', 'Outstanding', OUTSTANDING),
  money('10', 'Excess / shortfall', EXCESS, true),
  { n: '11', label: 'Reserve jobs', qualifier: 'found by rule', kind: 'count', twin: RESERVE_JOBS, filed: RESERVE_JOBS },
  { n: '12', label: 'Cross-age check', qualifier: 'customers', kind: 'count', twin: CROSS_AGE_CUSTOMERS, filed: CROSS_AGE_CUSTOMERS },
]

export const MATCHED = LINES.filter((l) => l.twin === l.filed).length

export const FOOT = `${MATCHED} of ${LINES.length} lines reproduce the filed workbook · ${RESERVE_JOBS} reserve jobs the hand list omitted`

export const CAPTION = 'Twin = recomputed from the bank’s own imported rows · Filed = the certificate as sent'
