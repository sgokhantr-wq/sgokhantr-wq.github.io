import { Screen } from '../../components/Screen'
import { CUM, DIPS, FLOOR, IN, NET, NOTE, OUT, WEEKS } from './data'
import s from './CashChart.module.css'

/* Geometry: one drawing, one scale. Bars are weekly cash in and out; the line is the
   running balance, which is the figure the office actually watches. */
const W = 900
const H = 380
const PAD = { t: 22, r: 18, b: 34, l: 46 }
const PLOT_W = W - PAD.l - PAD.r
const PLOT_H = H - PAD.t - PAD.b

const MAX = 320 // $K, top of the bar scale
/** The balance band is sized to the data with headroom, so the line cannot leave the drawing. */
const CUM_MIN = Math.min(...CUM, FLOOR) - 20
const CUM_MAX = Math.max(...CUM, 0) + 20

const band = PLOT_W / WEEKS.length
const barW = band * 0.3
const xMid = (i: number) => PAD.l + band * i + band / 2
const yBar = (v: number) => PAD.t + PLOT_H * 0.62 * (1 - v / MAX)
const barBase = PAD.t + PLOT_H * 0.62
const yCum = (v: number) => PAD.t + PLOT_H * 0.66 + (PLOT_H * 0.34) * (1 - (v - CUM_MIN) / (CUM_MAX - CUM_MIN))

const linePath = CUM.map((v, i) => `${i ? 'L' : 'M'}${xMid(i).toFixed(1)},${yCum(v).toFixed(1)}`).join(' ')
const areaPath = `${linePath} L${xMid(CUM.length - 1).toFixed(1)},${yCum(CUM_MIN).toFixed(1)} L${xMid(0).toFixed(1)},${yCum(CUM_MIN).toFixed(1)} Z`

/** The 13-week cash forecast: money in and out per week, with the running balance over it. */
export default function CashChart() {
  const firstDip = DIPS[0]
  return (
    <Screen
      title="Cash forecast"
      meta="13 weeks · $K · specimen figures"
      lifted
      label="Thirteen-week cash forecast with synthetic figures"
      foot={
        <span className={s.legend}>
          <span className={s.key}>
            <span className={`${s.swatch} ${s.swIn}`} /> money in
          </span>
          <span className={s.key}>
            <span className={`${s.swatch} ${s.swOut}`} /> money out
          </span>
          <span className={s.key}>
            <span className={`${s.swatch} ${s.swCum}`} /> running balance
          </span>
          <span className="chip chip--blocked">
            {DIPS.length} weeks below the floor, first in W{firstDip + 36}
          </span>
          <span className="chip chip--done">net over 13 weeks {NET.reduce((a, b) => a + b, 0) > 0 ? '+' : ''}{NET.reduce((a, b) => a + b, 0)}</span>
        </span>
      }
    >
      <div className={s.wrap}>
        <svg className={s.svg} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Weekly cash in and out with a running balance that dips below the floor in week 41">
          {[0, 80, 160, 240, 320].map((v) => (
            <g key={v}>
              <line className={s.grid} x1={PAD.l} x2={W - PAD.r} y1={yBar(v)} y2={yBar(v)} />
              <text className={s.axisNum} x={PAD.l - 8} y={yBar(v) + 4}>
                {v}
              </text>
            </g>
          ))}
          <line className={s.zero} x1={PAD.l} x2={W - PAD.r} y1={barBase} y2={barBase} />

          {WEEKS.map((w, i) => (
            <g key={w}>
              <rect className={s.barIn} x={xMid(i) - barW - 2} y={yBar(IN[i])} width={barW} height={barBase - yBar(IN[i])} rx="2" />
              <rect className={s.barOut} x={xMid(i) + 2} y={yBar(OUT[i])} width={barW} height={barBase - yBar(OUT[i])} rx="2" />
              <text className={s.axis} x={xMid(i)} y={H - 12} textAnchor="middle">
                {w}
              </text>
            </g>
          ))}

          <line className={s.floor} x1={PAD.l} x2={W - PAD.r} y1={yCum(FLOOR)} y2={yCum(FLOOR)} />
          <text className={s.note} x={W - PAD.r} y={yCum(FLOOR) - 6} textAnchor="end">
            floor
          </text>

          <path className={s.area} d={areaPath} />
          <path className={s.line} d={linePath} />
          {CUM.map((v, i) =>
            DIPS.includes(i) ? (
              <circle key={i} className={s.nodeAlert} cx={xMid(i)} cy={yCum(v)} r="5.5" />
            ) : (
              <circle key={i} className={s.node} cx={xMid(i)} cy={yCum(v)} r="4" />
            ),
          )}

          <line className={s.calloutLine} x1={xMid(firstDip)} x2={xMid(firstDip)} y1={yCum(CUM[firstDip]) + 10} y2={H - PAD.b + 2} />
          <text className={s.callout} x={xMid(firstDip) + 6} y={H - PAD.b - 4}>
            {CUM[firstDip].toFixed(1)}
          </text>

          <text className={s.note} x={PAD.l} y={PAD.t - 8}>
            {NOTE}
          </text>
        </svg>
      </div>
    </Screen>
  )
}
