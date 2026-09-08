import { DocumentFrame } from '../../components/DocumentFrame'
import { Stamp } from '../../components/Stamp'
import { CAPTION, FOOT, LINES, MATCHED, type CertLine } from './data'
import s from './CertificateLines.module.css'

function fmt(l: CertLine, v: number): string {
  if (l.kind === 'money') return v.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
  if (l.kind === 'pct') return `${v}%`
  return String(v)
}

/** The borrowing-base certificate tab: twelve must-match lines, twin against filed, one match mark per line. */
export default function CertificateLines() {
  return (
    <DocumentFrame
      title="CERTIFICATE · MUST-MATCH LINES"
      meta={`${MATCHED} / ${LINES.length} exact`}
      label="Borrowing-base certificate: twelve must-match lines, recomputed twin against the filed value"
      caption={CAPTION}
    >
      <table className={`ledger ledger--dense ${s.table}`}>
        <caption className={s.sr}>Certificate lines: recomputed twin against the filed workbook, in thousands</caption>
        <thead>
          <tr>
            <th scope="col" className={s.n}>
              #
            </th>
            <th scope="col">Line</th>
            <th scope="col" className="num">
              Twin $K
            </th>
            <th scope="col" className="num">
              Filed $K
            </th>
            <th scope="col" className={s.match}>
              Match
            </th>
          </tr>
        </thead>
        <tbody>
          {LINES.map((l) => {
            const exact = l.twin === l.filed
            return (
              <tr key={l.n} className={l.total ? s.total : undefined}>
                <td className={s.n}>{l.n}</td>
                <th scope="row" className={s.line}>
                  {l.label}
                  {l.qualifier && <span className={s.qualifier}> · {l.qualifier}</span>}
                </th>
                <td className="num">{fmt(l, l.twin)}</td>
                <td className="num">{fmt(l, l.filed)}</td>
                <td className={s.match}>
                  <span aria-hidden="true" className={exact ? undefined : 'verdict--blocked'}>
                    {exact ? '=' : '≠'}
                  </span>
                  <span className={s.sr}>{exact ? 'exact' : 'differs'}</span>
                </td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>{FOOT}</td>
          </tr>
        </tfoot>
      </table>
      {/* Every column carries a figure, so the stamp goes under the table rather than over it. */}
      <div className="doc__mark">
        <Stamp label="Specimen" sub="synthetic figures" size="sm" />
      </div>
    </DocumentFrame>
  )
}
