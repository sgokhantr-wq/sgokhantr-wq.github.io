import { DocumentFrame } from '../../components/DocumentFrame'
import { Stamp } from '../../components/Stamp'
import { CUMULATIVE, DISBURSEMENTS, NET, RECEIPTS, WEEKS, type Row } from './data'
import s from './CashGrid.module.css'

const CAPTION =
  'Receipts by terms measured on 90 paid jobs, not assumed · committed material enters cash only once its job is sequenced · parked orders are a memo, not cash'

/** U+00A0, built at runtime so no irregular whitespace sits in the source. */
const NBSP = String.fromCharCode(0xa0)

/**
 * A ledger figure: negatives in parentheses, memo lines in brackets, zeros as a dash.
 * Positives and dashes carry a trailing no-break space so their digits sit under the
 * parenthesised ones instead of under the closing bracket.
 */
function fig(v: number, memo = false): string {
  if (v === 0) return `—${NBSP}`
  const abs = Math.abs(v).toFixed(1)
  if (memo) return `[${abs}]`
  return v < 0 ? `(${abs})` : `${abs}${NBSP}`
}

function RowLabel({ label, short }: { label: string; short: string }) {
  return (
    <>
      <span className={s.long}>{label}</span>
      <span className={s.short}>{short}</span>
    </>
  )
}

function LineRow({ row }: { row: Row }) {
  const memo = row.kind === 'memo'
  const sign = row.kind === 'disbursement' ? -1 : 1
  const cls = [memo && s.memo, row.note && s.annotated].filter(Boolean).join(' ')
  return (
    <tr className={cls || undefined}>
      <th scope="row">
        <RowLabel label={row.label} short={row.short} />
      </th>
      {row.values.map((v, i) => {
        const note = row.note && row.note.week === i ? row.note : undefined
        return (
          <td key={WEEKS[i]} className={note ? s.noteCell : undefined}>
            <span className={v === 0 ? s.zero : undefined}>{fig(sign * v, memo)}</span>
            {note && <span className={s.note}>{note.text}</span>}
          </td>
        )
      })}
    </tr>
  )
}

function TotalRow({ label, values }: { label: string; values: readonly number[] }) {
  return (
    <tr>
      <th scope="row">
        <RowLabel label={label} short={label} />
      </th>
      {values.map((v, i) => (
        <td key={WEEKS[i]}>
          <span className={v === 0 ? s.zero : undefined}>{fig(v)}</span>
        </td>
      ))}
    </tr>
  )
}

/** The 13-week cash forecast as a ruled sheet: sticky line labels, one column per week, totals in the foot. */
export default function CashGrid() {
  return (
    <DocumentFrame
      title="13-WEEK CASH FORECAST"
      meta="$K · weeks 36–48 · 2026"
      scroll
      label="13-week cash forecast, synthetic figures in thousands"
      caption={CAPTION}
    >
      <table className={`ledger ledger--dense ${s.table}`}>
        <caption className={s.srOnly}>
          Figures in thousands. Disbursements and negative totals are shown in parentheses. The parked-materials row is a memo in
          brackets and is excluded from Net. Cumulative is the running sum of Net from week 36.
        </caption>
        <thead>
          <tr>
            <th scope="col" className={s.corner}>
              Line · $K
            </th>
            {WEEKS.map((w) => (
              <th key={w} scope="col">
                {w}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {RECEIPTS.map((r) => (
            <LineRow key={r.id} row={r} />
          ))}
        </tbody>
        <tbody>
          {DISBURSEMENTS.map((r) => (
            <LineRow key={r.id} row={r} />
          ))}
        </tbody>
        <tfoot>
          <TotalRow label="Net" values={NET} />
          <TotalRow label="Cumulative" values={CUMULATIVE} />
        </tfoot>
      </table>
      {/* The sheet is figures edge to edge, so the stamp goes under it rather than over the data. */}
      <div className="doc__mark">
        <Stamp label="Specimen" sub="synthetic figures" size="sm" />
      </div>
    </DocumentFrame>
  )
}
