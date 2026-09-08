// synthetic — no real jobs, customers, people or dollars
/** Thirteen weekly figures in thousands, one decimal, stored as magnitudes. */
export type Weekly = readonly [number, number, number, number, number, number, number, number, number, number, number, number, number]

export type RowKind = 'receipt' | 'disbursement' | 'memo'

export interface Row {
  id: string
  label: string
  /** Label used under 720px, where the sticky column has to stay narrow. */
  short: string
  kind: RowKind
  /** Magnitudes. Disbursements render in parentheses, the memo line in brackets. */
  values: Weekly
  /** One cell carries a small annotation written on the ruled line under its value. */
  note?: { week: number; text: string }
}

/** Horizon: ISO weeks 36 to 48 of 2026. */
export const WEEKS: readonly string[] = Array.from({ length: 13 }, (_, i) => `W${36 + i}`)

export const RECEIPTS: readonly Row[] = [
  {
    id: 'billings',
    label: 'Progress billings',
    short: 'Progress billings',
    kind: 'receipt',
    values: [184.2, 96.5, 210.0, 142.8, 0, 318.4, 88.0, 176.6, 0, 244.0, 132.5, 90.0, 205.2],
    note: { week: 0, text: 'terms: median 35 d (back-tested)' },
  },
  {
    id: 'service',
    label: 'Service invoices',
    short: 'Service invoices',
    kind: 'receipt',
    values: [42.0, 38.5, 45.2, 40.8, 36.0, 44.6, 41.2, 39.0, 43.5, 37.8, 46.0, 40.4, 42.2],
  },
  {
    id: 'retainage',
    label: 'Retainage release',
    short: 'Retainage release',
    kind: 'receipt',
    values: [0, 0, 64.0, 0, 0, 0, 0, 120.0, 0, 0, 0, 48.5, 0],
  },
  {
    id: 'promise',
    label: 'Promise-to-pay (collections)',
    short: 'Promise-to-pay',
    kind: 'receipt',
    values: [28.0, 0, 55.0, 0, 32.5, 0, 0, 70.0, 0, 24.0, 0, 0, 36.0],
  },
]

export const DISBURSEMENTS: readonly Row[] = [
  {
    id: 'payroll',
    label: 'Payroll',
    short: 'Payroll',
    kind: 'disbursement',
    values: [98.0, 96.5, 97.2, 99.0, 96.0, 101.4, 97.8, 96.4, 98.6, 100.2, 97.0, 96.8, 99.4],
  },
  {
    id: 'committed',
    label: 'Materials — committed (sequenced)',
    short: 'Committed materials',
    kind: 'disbursement',
    values: [64.0, 22.5, 0, 148.0, 40.0, 0, 76.5, 0, 58.0, 0, 92.0, 30.0, 0],
  },
  {
    id: 'parked',
    label: 'Materials — parked (memo, non-cash)',
    short: 'Parked orders (memo)',
    kind: 'memo',
    values: [45.0, 45.0, 80.0, 80.0, 80.0, 24.5, 24.5, 0, 0, 132.0, 132.0, 132.0, 132.0],
  },
  {
    id: 'vendors',
    label: 'Vendor payments',
    short: 'Vendor payments',
    kind: 'disbursement',
    values: [52.0, 48.5, 61.0, 44.0, 57.5, 50.0, 46.0, 63.0, 49.5, 55.0, 47.0, 58.5, 51.0],
  },
  {
    id: 'salestax',
    label: 'Sales tax remittance',
    short: 'Sales tax',
    kind: 'disbursement',
    values: [0, 0, 0, 0, 0, 0, 0, 0, 38.4, 0, 0, 0, 0],
  },
]

/* Totals are computed in integer tenths so the printed arithmetic is exact. */
const tenths = (v: number): number => Math.round(v * 10)
const sumAt = (rows: readonly Row[], week: number): number => rows.reduce((acc, r) => acc + tenths(r.values[week]), 0)
const CASH_OUT = DISBURSEMENTS.filter((r) => r.kind !== 'memo')

/** Receipts less cash disbursements. The memo row never enters. */
export const NET: readonly number[] = WEEKS.map((_, i) => (sumAt(RECEIPTS, i) - sumAt(CASH_OUT, i)) / 10)

/** Running sum of NET from the first week of the horizon. */
export const CUMULATIVE: readonly number[] = NET.map((_, i) => NET.slice(0, i + 1).reduce((acc, n) => acc + tenths(n), 0) / 10)
