/** Page copy. Short on purpose: the screens carry the page, the words caption them. */

export const PLATFORM = {
  eyebrow: 'The platform',
  title: 'One system, six departments',
  lede: 'It replaced a bank package assembled by hand every week, a spreadsheet pace board, two procurement trackers, a commission workbook and a chat group per job.',
  cards: [
    {
      title: 'Scheduling & capacity',
      body: 'One demand engine feeds the calendar, the sequence board and the capacity chart, so they cannot disagree. Time off is a hard block, not a warning.',
      chip: 'four boards, one engine',
      tone: 'sched' as const,
    },
    {
      title: 'Money',
      body: 'A thirteen-week cash forecast, progress billing, an AIA continuation sheet rendered as the workbook itself, and an A/R worklist that scores every customer.',
      chip: 'ties out to the cent',
      tone: 'brand' as const,
    },
    {
      title: 'The field',
      body: 'One forum, one topic per job. A pinned progress card, a one-tap “good to invoice”, and clocked-hour corrections the crew make themselves.',
      chip: '~70 field staff',
      tone: 'ai' as const,
    },
  ],
  cash: {
    title: 'A forecast that was back-tested before it was believed',
    body: 'Ninety fully-paid jobs from the prior year, replayed against the model. Customers pay in about 35 days, not the 30 the terms claim. A learned-lag feature measured worse than the plain rule, so I deleted it.',
    evidence: 'median 35 d, mean 46 d · learned lag 34 d error against 26 d · removed',
  },
  crew: {
    title: 'Built for a phone, against a bot API',
    body: 'Chat groups per job meant hundreds of invites a day, which got the company number banned. It was rebuilt as one forum with a topic per job. The pinned banner shows a single clipped line on a real phone, which is why the worst case is 27 characters.',
    evidence: '~560 invites a day → one API call per job · 52 offline checks on the one-tap button',
  },
}

export const AI = {
  eyebrow: 'Centaurus AI',
  title: 'It answers from the database, or it refuses',
  lede: 'A language model with SQL access will confidently report the entire invoice table as created today. Most of the work is the part that stops it.',
  points: [
    {
      title: 'Governed SQL',
      body: 'SELECT only, one statement per call, a 39-table allowlist, a row cap, a timeout, a pay-column gate that applies in the WHERE clause too, and an audit line for every attempt.',
    },
    {
      title: 'No invented formulas',
      body: 'How a figure is calculated is answered only from a hand-written registry of 35 entries, each anchored to the code that computes it. A miss returns “I don’t know”.',
    },
    {
      title: 'No invented facts',
      body: 'It once produced a site address in 718 ms with no lookup at all, reproducibly. Data-shaped questions now require a tool call, get one retry, then a refusal.',
    },
  ],
  reading: {
    title: 'It reads what the crew writes',
    body: 'Two levels: one pass over each job-day of crew chat, then a reasoner per job that files action items behind a materiality gate. Every quote it cites is verified against the transcript before anything is loaded.',
    evidence: '32,921 photos described · a queue of 116 items cut to 37 · zero fabricated citations',
  },
}

export const PROOF = {
  eyebrow: 'Proof',
  title: 'Measured, not asserted',
  lede: 'Nothing here is externally verifiable, so the method comes first: every new financial surface has to reproduce the page that already owns the number before it ships.',
  numbers: [
    { n: '0', t: 'mismatches when five financial surfaces are compared per job, across 5,598 jobs' },
    { n: '31', t: 'adversarial SQL cases the guard blocks, re-run after every change to it' },
    { n: '12 / 12', t: 'lines of the filed bank certificate reproduced exactly by the rebuilt engine' },
    { n: '5 min', t: 'for a new job to reach the crew’s chat, down from two and a half hours' },
    { n: '204', t: 'test and verification scripts across four harnesses' },
    { n: '79%', t: 'of actual labour hours land inside the estimator’s published range' },
  ],
  detailIds: [
    'ver-noop',
    'ver-jsdom',
    'ver-fingerprint',
    'cash-backtest',
    'cert-four-bugs',
    'cai-creation-stamp',
    'cai-thinking-spill',
    'sched-dispatch-conflicts',
    'buy-board-defects',
    'est-baselines',
    'rej-material-cost',
    'ver-concurrent-edits',
  ],
}

export const ABOUT = {
  eyebrow: 'About',
  title: 'I design the system, then build the tools that run it',
  paragraphs: [
    'Pages, engines, bots, and the tests that prove they agree. Before field service I did production planning and ERP work in manufacturing, on Dynamics 365 Business Central and Dynamics AX, in MIL-SPEC connector and automotive Tier 1 plants.',
    'I work from one workstation, measure before I ship, and write the rejected option down with its number so nobody re-proposes it. Bilingual in English and Spanish on the shop floor and in the field. Open to relocation.',
  ],
  earlier: [
    ['2025', 'An email-to-quote agent at a connector manufacturer: inbox watcher, a fine-tuned open-source model, catalog matching, and a human approving every draft.'],
    ['2024–25', 'Automated purchase-order issuance around Business Central. Stockouts down 24%, twelve hours a week of manual review removed.'],
    ['2024', 'A vision agent that read a 15-year-old terminal emulator with no API and no export, ending manual re-typing.'],
    ['2023', 'An inventory-aging model on SQL Server that surfaced capital nobody could see. The monthly report runs itself.'],
  ] as const,
  withheld:
    'Employer, customers, lenders, vendors and staff are unnamed here, and no figure from the company’s books appears. Engineering scale, record volumes and measured improvements do.',
}
