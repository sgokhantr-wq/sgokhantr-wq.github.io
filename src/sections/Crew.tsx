import { Notes } from '../components/Note'
import { Register } from '../components/Register'
import { Section } from '../components/Section'
import JobTopic from '../mockups/JobTopic'

export function Crew() {
  return (
    <Section id="crew" stamp="Field" title="Designed on a phone, against what the bot API actually permits" kicker="The crew’s side of it">
      <div className="grid">
        <div className="span-4">
          <JobTopic />
        </div>
        <div className="span-7">
          <Notes
            ids={[
              'crew-forum',
              'crew-pinned-card',
              'crew-hammer-down',
              'crew-hour-corrections',
              'crew-bilingual',
              'crew-location-button',
              'crew-location-declined',
              'crew-photo-summaries',
              'crew-auto-topics',
            ]}
          />
          <Register
            dense
            caption="The field write contract"
            columns={[
              { key: 'rule', label: 'Rule' },
              { key: 'why', label: 'Why' },
            ]}
            rows={[
              {
                rule: 'every write carries a deduplication key',
                why: 'the poller commits its cursor per batch; an absolute set replays harmlessly, a relative change would apply twice',
              },
              { rule: 'two key shapes: tap and command', why: 'the replay case has its own regression test' },
              { rule: 'callbacks carry the target state', why: 'a replayed batch is idempotent; the undo is the safety' },
              { rule: 'money never enters the crew channel', why: 'the group is a wider audience than the page’s gate' },
            ]}
          />
        </div>
      </div>
    </Section>
  )
}
