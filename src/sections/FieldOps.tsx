import { Note, Notes } from '../components/Note'
import { Register } from '../components/Register'
import { Section, SubSheet } from '../components/Section'
import MonthBoard from '../mockups/MonthBoard'
import CashGrid from '../mockups/CashGrid'
import CertificateLines from '../mockups/CertificateLines'
import G703Sheet from '../mockups/G703Sheet'

export function FieldOps() {
  return (
    <Section id="fieldops" stamp="FieldOps" title="FieldOps: three sheets from the platform" kicker="The ERP, through the three documents a mechanical contractor’s office lives by">
      <SubSheet stamp="Scheduling" title="One demand engine, four boards that cannot disagree">
        <div className="grid">
          <div className="span-5">
            <Notes ids={['sched-one-engine', 'sched-greedy-colour', 'sched-timeoff-block', 'sched-dispatch-conflicts', 'sched-inspection', 'sched-shortfall-viewport']} />
          </div>
          <div className="span-7">
            <MonthBoard />
          </div>
        </div>
      </SubSheet>

      <SubSheet stamp="Cash" title="A forecast that was back-tested before it was believed">
        <div className="grid">
          <div className="span-5">
            <Notes ids={['cash-backtest', 'cash-billing-timing', 'cash-committed-gate', 'cert-line-for-line', 'cert-joins']} />
          </div>
          <div className="span-7">
            <CashGrid />
          </div>
          <div className="span-6">
            <CertificateLines />
          </div>
          <div className="span-6">
            <Notes head="The certificate twin" ids={['cert-five-jobs', 'cert-four-bugs', 'bank-package']} />
          </div>
        </div>
      </SubSheet>

      <SubSheet stamp="Billing" title="The screen is the workbook">
        <div className="grid">
          <div className="span-12">
            <G703Sheet />
          </div>
          <div className="span-4">
            <Notes ids={['sov-workbook', 'sov-glossary']} />
          </div>
          <div className="span-4">
            <Notes head="Estimating labour hours">
              <Note id="est-range" />
              <Note id="est-no-llm" />
            </Notes>
            <Register
              dense
              className="mono"
              caption="Estimator vs the baselines it had to beat"
              columns={[
                { key: 'method', label: 'Method' },
                { key: 'err', label: 'Median error', num: true },
              ]}
              rows={[
                { method: 'size-normalised nearest neighbours (shipped)', err: '35.8%' },
                { method: 'log-log regression', err: '45%' },
                { method: 'flat hours-per-dollar', err: '55%' },
                { method: 'global median', err: '74%' },
              ]}
            />
          </div>
          <div className="span-4">
            <Notes head="Caught before it moved money" ids={['sov-reseed-trap', 'jp-decomposition', 'jp-hours-drive']} />
          </div>
        </div>
      </SubSheet>
    </Section>
  )
}
