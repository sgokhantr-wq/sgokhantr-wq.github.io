import { DocumentFrame } from '../../components/DocumentFrame'
import { Stamp } from '../../components/Stamp'
import { APPLICATION, COLUMNS, LINES, NOTE, PROJECT, TOTALS, cells, fmt, type Line } from './data'
import s from './G703Sheet.module.css'

/* Sheet geometry in viewBox units (1152 × 380): title block, column-letter band,
   48px of heads (bottom-aligned lines, WORK COMPLETED merged over D–E), eight 26px rows,
   a 28px totals row under a 1px ink rule, and a footer line with the arithmetic. */
const W = 1152
const H = 380
const PAD = 6
const BAND_Y = 56
const HEAD_Y = 74
const MERGE_Y = 90
const ROW_Y = 122
const ROW_H = 26
const TOT_Y = ROW_Y + ROW_H * LINES.length
const TOT_H = 28
const GRID_END = TOT_Y + TOT_H
const HEAD_STEP = 12

const WIDTHS = [52, 320, 98, 98, 98, 98, 114, 58, 104, 112]
const X: number[] = []
for (let i = 0, x = 0; i < WIDTHS.length; i++) {
  X.push(x)
  x += WIDTHS[i]
}
const D = 3
const E = 4

/** Hairlines stay 1px at any scale and snap to the pixel grid. */
const crisp = { vectorEffect: 'non-scaling-stroke', shapeRendering: 'crispEdges' } as const

function cls(...parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Text x for column i: numbers hang off the right edge, labels sit on the left. */
function tx(i: number): number {
  return COLUMNS[i].numeric ? X[i] + WIDTHS[i] - PAD : X[i] + PAD
}

function rowTexts(line: Line, y: number, bold = false) {
  return cells(line).map((v, i) => (
    <text key={i} x={tx(i)} y={y} className={cls(s.cell, COLUMNS[i].numeric && s.end, v === '0' && s.zero, bold && s.tot)}>
      {v}
    </text>
  ))
}

/** The AIA-style continuation sheet, drawn as the workbook the export writes. */
export default function G703Sheet() {
  const meta = `Application No. ${APPLICATION.no} · period to ${APPLICATION.periodTo}`
  return (
    <DocumentFrame
      title="CONTINUATION SHEET · G703"
      meta={meta}
      specimen
      ruled={false}
      scroll
      label={`Continuation sheet G703, application ${APPLICATION.no}, specimen figures`}
      caption="Every border, width and merge is transcribed from the same template the export writes, so the screen and the download cannot disagree"
    >
      <div className={s.sheet}>
        <svg className={s.svg} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMinYMin meet" aria-hidden="true">
          <title>Continuation sheet G703 drawn as a spreadsheet: eight line items and totals</title>

          {/* title block */}
          <text x={12} y={25} className={s.title}>
            {PROJECT}
          </text>
          <text x={12} y={45} className={s.small}>
            Schedule of values · contract sum {fmt(TOTALS.scheduled)} · retainage 10% · sheet 1 of 1
          </text>

          {/* column-letter band */}
          <rect x={0} y={BAND_Y} width={W} height={HEAD_Y - BAND_Y} className={s.band} />
          {COLUMNS.map((c, i) => (
            <text key={c.letter} x={X[i] + PAD} y={BAND_Y + 13} className={s.small}>
              {c.letter}
            </text>
          ))}

          {/* heads: WORK COMPLETED merged over D–E, then two- or three-line heads bottom-aligned */}
          <text x={X[D] + PAD} y={MERGE_Y - 5} className={s.small}>
            Work completed
          </text>
          {COLUMNS.map((c, i) =>
            c.head.map((line, j) => (
              <text
                key={`${c.letter}-${j}`}
                x={tx(i)}
                y={ROW_Y - 5 - (c.head.length - 1 - j) * HEAD_STEP}
                className={cls(s.small, c.numeric && s.end)}
              >
                {line}
              </text>
            )),
          )}

          {/* line items */}
          {LINES.map((line, r) => (
            <g key={line.item}>{rowTexts(line, ROW_Y + r * ROW_H + 17)}</g>
          ))}

          {/* totals */}
          <g>{rowTexts(TOTALS, TOT_Y + 18, true)}</g>

          {/* footer: the arithmetic the sheet obeys */}
          <text x={12} y={GRID_END + 15} className={s.small}>
            G = D + E + F · H = G ÷ C · I = C - G · J = G × 10% · every figure computed, none typed
          </text>

          {/* gridlines: horizontals */}
          <line {...crisp} className={s.rule} x1={0} y1={BAND_Y} x2={W} y2={BAND_Y} />
          <line {...crisp} className={s.rule} x1={0} y1={HEAD_Y} x2={W} y2={HEAD_Y} />
          <line {...crisp} className={s.rule} x1={X[D]} y1={MERGE_Y} x2={X[E] + WIDTHS[E]} y2={MERGE_Y} />
          <line {...crisp} className={s.ruleInk} x1={0} y1={ROW_Y} x2={W} y2={ROW_Y} />
          {LINES.slice(1).map((_, r) => {
            const y = ROW_Y + (r + 1) * ROW_H
            return <line key={y} {...crisp} className={s.rule} x1={0} y1={y} x2={W} y2={y} />
          })}
          <line {...crisp} className={s.ruleInk} x1={0} y1={TOT_Y} x2={W} y2={TOT_Y} />
          <line {...crisp} className={s.rule} x1={0} y1={GRID_END} x2={W} y2={GRID_END} />

          {/* gridlines: verticals; the D|E divider yields to the merged head */}
          {X.slice(1).map((x, i) =>
            i + 1 === E ? (
              <g key={x}>
                <line {...crisp} className={s.rule} x1={x} y1={BAND_Y} x2={x} y2={HEAD_Y} />
                <line {...crisp} className={s.rule} x1={x} y1={MERGE_Y} x2={x} y2={GRID_END} />
              </g>
            ) : (
              <line key={x} {...crisp} className={s.rule} x1={x} y1={BAND_Y} x2={x} y2={GRID_END} />
            ),
          )}
        </svg>
      </div>

      {/* condensed variant: off-screen for assistive tech above 720px, the visible sheet below it */}
      <div className={s.tableWrap}>
        {/* the same title block as the sheet, so the SPECIMEN stamp has room beside it */}
        <div className={s.condHead}>
          <p className={s.condTitle}>{PROJECT}</p>
          <p className="head">Schedule of values · retainage 10%</p>
        </div>
        <table className={`ledger ledger--dense ${s.table}`}>
          <caption className={s.srOnly}>
            Continuation sheet, application {APPLICATION.no}: eight line items and totals, synthetic figures
          </caption>
          <thead>
            <tr>
              {COLUMNS.map((c) => (
                <th key={c.letter} scope="col" className={cls(c.numeric && 'num', !c.condensed && s.wide)}>
                  {c.short}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LINES.map((line) => (
              <tr key={line.item}>
                {cells(line).map((v, i) => (
                  <td key={i} className={cls(COLUMNS[i].numeric && 'num', i === 1 && s.desc, !COLUMNS[i].condensed && s.wide)}>
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              {cells(TOTALS).map((v, i) => (
                <td key={i} className={cls(COLUMNS[i].numeric && 'num', i === 1 && s.desc, !COLUMNS[i].condensed && s.wide)}>
                  {v}
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      <div className={s.margin}>
        <p className={`evidence ${s.note}`}>
          shorthand expanded from the corpus: ‘{NOTE.short}’ → ‘{NOTE.long}’
        </p>
        <Stamp label="Filed" sub="rates stamped · immutable" size="sm" flat />
      </div>
    </DocumentFrame>
  )
}
