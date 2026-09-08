import { Register } from '../components/Register'
import { Section } from '../components/Section'
import { P } from '../content/proof'

const METHODS: Array<{ id: string; method: string; catches: string; strip?: string[] }> = [
  { id: 'ver-tieouts', method: 'Cross-page tie-outs, per job', catches: 'a new surface that disagrees with the page that already owns the number' },
  { id: 'ver-fingerprint', method: 'Cell-by-cell workbook fingerprints', catches: 'drift in value, style, height or merge, attributable to one document' },
  { id: 'ver-jsdom', method: 'jsdom harness over the shipped JavaScript', catches: 'exceptions a browser swallows inside promise callbacks' },
  {
    id: 'ver-noop',
    method: 'Deterministic snapshot, before and after',
    catches: 'an engine change that is not the no-op it claims to be',
    strip: ['before  13 periods × 202 jobs', 'after   13 periods × 202 jobs', 'diff    0 cells', 'override  one per-day edit → +24 h, nothing else moved'],
  },
  { id: 'ver-snapshot-revert', method: 'Snapshot / diff / revert on one mirror generation', catches: 'phantom differences from a two-hourly refresh landing mid-test' },
  { id: 'ver-browser-measure', method: 'Geometry probes in a real browser', catches: 'a chart at height zero, a jerky animation, a sticky cell that never sticks' },
  { id: 'ver-backup-audit', method: 'Dump diffed against the live schema', catches: 'a custom table missing from the backup' },
  { id: 'ver-concurrent-edits', method: 'Patch scripts with asserted anchors + diff against a fresh backup', catches: 'a concurrent edit or an encoding corruption a green test run cannot see' },
]

const REJECTED = ['rej-learned-lag', 'rej-item-match', 'rej-won-only', 'rej-material-cost']

export function Verification() {
  return (
    <Section id="verification" stamp="Verified" title="Measure, don’t assert" kicker="Nothing here is externally verifiable, so the method comes first">
      <Register
        prose
        columns={[
          { key: 'method', label: 'Method', width: '28%' },
          { key: 'catches', label: 'What it catches', width: '30%' },
          { key: 'evidence', label: 'Evidence' },
        ]}
        rows={METHODS.map((m) => ({
          method: m.method,
          catches: m.catches,
          evidence: (
            <>
              <span className="evidence" style={{ display: 'block', marginTop: 0 }}>
                {P(m.id).evidence}
              </span>
              {m.strip && (
                <pre className="mono" style={{ margin: '10px 0 0', padding: '8px 10px', border: '1px solid var(--hairline)', background: 'var(--galvanized)', fontSize: 12, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                  {m.strip.join('\n')}
                </pre>
              )}
            </>
          ),
        }))}
      />

      <h3 style={{ margin: '40px 0 14px' }}>Rejected and recorded, with the number</h3>
      <Register
        prose
        columns={[
          { key: 'what', label: 'Rejected', width: '40%' },
          { key: 'why', label: 'Measured' },
        ]}
        rows={REJECTED.map((id) => ({ what: P(id).text, why: <span className="evidence" style={{ marginTop: 0 }}>{P(id).evidence}</span> }))}
      />
    </Section>
  )
}
