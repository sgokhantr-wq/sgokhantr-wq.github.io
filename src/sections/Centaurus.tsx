import { Note, Notes } from '../components/Note'
import { Register } from '../components/Register'
import { Section } from '../components/Section'
import { P } from '../content/proof'
import CentaurusChat from '../mockups/CentaurusChat'
import GuardLog from '../mockups/GuardLog'

const FAILURES: Array<{ found: string; cause: string; fix: string; id: string }> = [
  {
    id: 'cai-creation-stamp',
    found: '“What did we create today?” returned the whole invoice table.',
    cause: 'Most mirror tables carry the sync time in their creation column.',
    fix: 'A per-table business-date map in the data layer; the refusal names the right column.',
  },
  {
    id: 'cai-metric-registry',
    found: 'Asked how a page figure is computed, it built plausible arithmetic out of column names.',
    cause: 'No table holds day counts, pro-rata shares or per-chip pricing; SQL cannot reach them.',
    fix: 'A hand-written metric registry with code anchors that self-test; a miss returns “I don’t know”.',
  },
  {
    id: 'cai-fabrication',
    found: 'A site address and contact, invented in 718 ms with zero tool calls.',
    cause: 'Reproducible 2 times in 4 on replay: a coin flip, not an anomaly.',
    fix: 'Data-shaped questions require a lookup; one forced retry, then a refusal.',
  },
  {
    id: 'cai-blank-answers',
    found: 'Intermittent “(no response)”.',
    cause: 'A reasoning model spent its whole turn thinking inside a shared token budget.',
    fix: 'A per-turn token floor and a guaranteed non-empty exit path.',
  },
  {
    id: 'cai-thinking-spill',
    found: 'Roughly one reply in seven arrived with its first characters missing.',
    cause: 'The transport split the answer across the thinking field at a boundary.',
    fix: 'Boundary-detection repair behind four guards and 14 offline unit cases.',
  },
  {
    id: 'cai-audit-log',
    found: 'An audit trail with zero lines since creation.',
    cause: 'The logger was pinned at error level on the production bench.',
    fix: 'Level fixed; the lesson: an empty log is not proof a feature never ran.',
  },
  {
    id: 'cai-join-keys',
    found: 'Generated queries assumed a parent–child relationship flat mirror tables do not have.',
    cause: 'Join paths existed only in people’s heads.',
    fix: 'Join keys published to the model as structured metadata.',
  },
  {
    id: 'cai-materiality',
    found: 'A review queue of 116 open items nobody read.',
    cause: 'Nothing gated materiality; a dirty filter was queued like unquoted scope.',
    fix: 'Evidence and materiality judged separately: Light 89 · Moderate 70 · Aggressive 37.',
  },
  {
    id: 'cai-governance-1',
    found: 'A governance review that could have cited things that were never said.',
    cause: 'A self-reported “complete” is not proof.',
    fix: 'Every cited quote verified verbatim against the exported transcript before loading; 0 fabricated.',
  },
]

export function Centaurus() {
  return (
    <Section id="centaurus" stamp="Centaurus" title="Everything that stops the model from being confidently wrong" kicker="Centaurus AI: answers from the database, refuses to invent">
      <div className="grid">
        <div className="span-6">
          <CentaurusChat />
        </div>
        <div className="span-6">
          <GuardLog />
        </div>
      </div>

      <div className="grid" style={{ marginTop: 32 }}>
        <div className="span-6">
          <Notes ids={['cai-governed-sql', 'cai-adversarial', 'cai-redaction']} />
        </div>
        <div className="span-6">
          <Notes ids={['cai-navigation', 'cai-hotline', 'cai-model-verified']} />
        </div>
      </div>

      <h3 style={{ margin: '40px 0 14px' }}>Failure register: found by asking real questions and checking the answers</h3>
      <Register
        prose
        columns={[
          { key: 'found', label: 'Found', width: '32%' },
          { key: 'cause', label: 'Cause', width: '30%' },
          { key: 'fix', label: 'Fix' },
        ]}
        rows={FAILURES.map((f) => ({
          found: f.found,
          cause: f.cause,
          fix: (
            <>
              {f.fix}
              <span className="evidence">{P(f.id).evidence}</span>
            </>
          ),
        }))}
      />

      <div className="grid" style={{ marginTop: 32 }}>
        <div className="span-6">
          <Notes head="Reading the crew, at scale">
            <Note id="cai-photo-backfill" />
            <Note id="cai-offline-track" />
            <Note id="cai-governance-2" />
          </Notes>
        </div>
        <div className="span-6">
          <Notes head="Where the answers end up">
            <Note id="cai-directory" />
            <Note id="cai-local-vs-hosted" />
          </Notes>
          <p className="evidence" style={{ marginTop: 8 }}>
            23 files / 10.5K lines · 39-table allowlist · 35 registry entries · 5 desk tools + 18 hotline tools · 23 starter prompts in 7 groups · one hosted open-weight model via Ollama for chat, tools and vision
          </p>
        </div>
      </div>
    </Section>
  )
}
