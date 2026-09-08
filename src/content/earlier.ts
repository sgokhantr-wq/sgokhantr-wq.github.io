/** Earlier work (2023–2025), the manufacturing years. Approved anonymized wording; no dollar figures. */
export interface Earlier {
  period: string
  title: string
  desc: string
  evidence: string
}

export const EARLIER: Earlier[] = [
  {
    period: '2025',
    title: 'Centaurus v1: email-to-quote agent',
    desc: 'Inbox watcher → fine-tuned open-source model → catalog matching in Dynamics 365 Business Central → a human review gate before anything is sent. Ran in production at a MIL-SPEC connector manufacturer.',
    evidence: 'quotes drafted in seconds, not hours · humans approve, AI drafts',
  },
  {
    period: '2024–25',
    title: 'Automated PO issuance around Business Central',
    desc: 'A replenishment loop: inventory monitor → reorder-point engine that accounts for lead-time variability → PO drafting service → planner approval.',
    evidence: 'stockouts down 24% · 12 hours a week of manual review removed',
  },
  {
    period: '2024',
    title: 'Legacy vision scraper',
    desc: 'Shipping data lived inside a 15-year-old AS/400 terminal emulator with no API and no export. A desktop agent: screen capture → template matching → OCR → validation → clean CSV to the ERP.',
    evidence: 'manual entry eliminated',
  },
  {
    period: '2023',
    title: 'Inventory aging model',
    desc: 'Raw transaction ledgers turned into aging buckets on SQL Server, refreshed monthly with finance-ready outputs.',
    evidence: 'the monthly report runs itself',
  },
]

export const ABOUT_PARAGRAPHS = [
  'I design the systems an operation actually runs on and build the tools myself: pages, engines, bots, and the tests that prove they agree.',
  'Before field service I did production planning and ERP work in manufacturing, on Dynamics 365 Business Central and Dynamics AX, in MIL-SPEC connector and automotive Tier 1 environments.',
  'I work from one workstation, measure before I ship, and write the rejected option down with its number so nobody has to re-propose it.',
  'Bilingual (English and Spanish) in production, logistics and field-crew settings; open to relocation.',
]
