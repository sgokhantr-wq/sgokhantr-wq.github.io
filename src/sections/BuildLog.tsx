import { Section } from '../components/Section'
import { BUILD_LOG_FOOTNOTE } from '../content/milestones'
import BuildGrid from '../mockups/BuildGrid'

export function BuildLog() {
  return (
    <Section id="build-log" stamp="Period" title="Build log: seventeen weeks on one grid" kicker="Order matters here, so a time axis is earned">
      <BuildGrid />
      <p className="notes" style={{ marginTop: 20, fontSize: 15, color: 'var(--slate)' }}>
        {BUILD_LOG_FOOTNOTE}
      </p>
    </Section>
  )
}
