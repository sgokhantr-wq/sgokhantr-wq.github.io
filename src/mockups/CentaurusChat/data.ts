// synthetic — no real jobs, customers, people or dollars
export const JOBS_THIS_WEEK = [
  { job: 'Boiler swap — school gym', type: 'Construction', created: '2026-09-01' },
  { job: 'Rooftop curb adapters — retail', type: 'Service', created: '2026-09-02' },
  { job: 'Exhaust fans — parking deck', type: 'Service', created: '2026-09-02' },
  { job: 'Hydronic loop — rec center', type: 'Construction', created: '2026-09-03' },
  { job: 'Gas piping — bakery', type: 'Service', created: '2026-09-03' },
  { job: 'BMS points — data room', type: 'Service', created: '2026-09-04' },
]

export const TOOL_CHIP = 'sql · 1 statement · 6 rows · 0.4 s · business date: created_on (not sync time)'

export const Q = {
  jobs: 'Which jobs did we create this week?',
  billed: 'How is % billed calculated?',
  where: 'Where is the buy board?',
  address: 'What is the site address for the hospital job?',
}

export const A = {
  jobs: 'Six jobs, created between Monday and today, by the business date, not the sync stamp.',
  billed: 'From the metric registry: issued invoices ÷ primary quote total, voids and drafts excluded.',
  billedEvidence: 'anchor self-test OK · registry entry 21 of 35',
  whereSteps: ['Workspaces', 'Procurement', 'Material Forecast'],
  whereEvidence: 'steps derived live from the workspace · pixels cached',
  address1: 'I need a lookup for that.',
  address2: 'Retrying with a tool… no result returned. I will not guess.',
}

export const PLACEHOLDER = 'Ask about a job, a quote, an invoice, a figure, or how to get somewhere…'
