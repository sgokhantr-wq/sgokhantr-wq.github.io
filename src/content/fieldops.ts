import {
    Activity, Banknote, BarChart2, Bot, Boxes, Braces, Calculator, CalendarDays, Camera,
    ClipboardCheck, Compass, Database, FileCheck, FileSpreadsheet, FileText, FlaskConical, Gauge,
    Hammer, Images, Landmark, ListChecks, Lock, Map, MessageSquare, Package, Radio, Receipt, Route,
    Scale, Search, Send, ShieldCheck, Table2, Timer, TrendingUp, Truck, UserCheck, Users, Wrench,
    BrainCircuit,
} from 'lucide-react';
import type { FieldOpsContent } from '../types';

export const FIELDOPS: FieldOpsContent = {
    hero: {
        eyebrow: 'Platform deep-dive · May → Sep 2026',
        headline: 'FieldOps: a field-service ERP,',
        highlight: 'built solo in 17 weeks.',
        sub: 'For a commercial HVAC & mechanical contractor with roughly 70 field staff and 200 live jobs. It replaced spreadsheets, Smartsheet grids, a hand-assembled weekly bank package and a chat app, on one workstation with no cloud budget. Everything below reads one mirrored source of truth, and every figure on this page is an engineering measurement, not a company financial.',
        stats: [
            { value: '68', label: 'desk pages', accent: 'emerald' },
            { value: '364', label: 'doctypes', accent: 'sky' },
            { value: '547', label: 'API endpoints', accent: 'sky' },
            { value: '227K', label: 'lines of code', accent: 'emerald' },
            { value: '204', label: 'test scripts', accent: 'amber' },
            { value: '17', label: 'weeks', accent: 'amber' },
        ],
    },

    architecture: {
        title: 'PLATFORM ARCHITECTURE · SOURCES → MIRROR → ERP → SURFACES',
        badge: 'IN PRODUCTION',
        viewBox: { w: 900, h: 372 },
        edges: [
            { d: 'M 165 44 C 215 44 200 172 245 172', accent: 'sky' },
            { d: 'M 165 112 C 215 112 205 178 245 178', accent: 'sky' },
            { d: 'M 165 180 H 245', accent: 'sky' },
            { d: 'M 165 248 C 215 248 205 186 245 186', accent: 'sky' },
            { d: 'M 165 316 C 320 316 420 250 470 196', accent: 'sky' },
            { d: 'M 395 180 H 470' },
            { d: 'M 550 154 V 92' },
            { d: 'M 630 66 C 665 66 665 200 700 208', dim: true },
            { d: 'M 630 168 C 665 160 665 44 700 44', accent: 'amber' },
            { d: 'M 630 174 C 665 170 665 126 700 126', accent: 'amber' },
            { d: 'M 630 186 C 665 190 665 208 700 208', accent: 'amber' },
            { d: 'M 630 192 C 665 200 665 290 700 290', accent: 'amber' },
            { d: 'M 785 234 C 790 345 420 345 170 336', accent: 'amber', dim: true },
        ],
        nodes: [
            { id: 'saas', x: 15, y: 18, label: 'FIELD-SERVICE SAAS', sub: 'api · 1.45M-row exports', accent: 'sky' },
            { id: 'qb', x: 15, y: 86, label: 'QUICKBOOKS', sub: 'ledger · A/P · payroll', accent: 'sky' },
            { id: 'smartsheet', x: 15, y: 154, label: 'SMARTSHEET', sub: 'procurement · permits', accent: 'sky' },
            { id: 'sharepoint', x: 15, y: 222, label: 'SHAREPOINT', sub: '30K jobsite photos', accent: 'sky' },
            { id: 'telegram', x: 15, y: 290, label: 'TELEGRAM', sub: 'crew chat · cards · DMs', accent: 'sky' },
            { id: 'mirror', x: 245, y: 154, label: 'DUCKDB MIRROR', sub: 'refresh · drift check', accent: 'emerald' },
            { id: 'erp', x: 470, y: 154, w: 160, label: 'FRAPPE · ERPNEXT', sub: 'MariaDB · 364 doctypes', accent: 'zinc' },
            { id: 'ai', x: 470, y: 40, w: 160, label: 'CENTAURUS AI', sub: 'governed sql · guards', accent: 'emerald' },
            { id: 'planning', x: 700, y: 18, w: 170, label: 'PLANNING BOARDS', sub: 'schedule · calendar · map', accent: 'amber' },
            { id: 'money', x: 700, y: 100, w: 170, label: 'CASH & BILLING', sub: 'forecast · G703 · bank pkg', accent: 'amber' },
            { id: 'cards', x: 700, y: 182, w: 170, label: 'FIELD CARDS', sub: 'topics · hotline · pace', accent: 'amber' },
            { id: 'hr', x: 700, y: 264, w: 170, label: 'HR · SALES · BUYING', sub: 'hub · quotes · buy board', accent: 'amber' },
        ],
        caption: { x: 380, y: 366, text: '← taps, clock punches and photos flow back into the office' },
    },

    domains: [
        { id: 'scheduling', label: 'Scheduling & capacity', accent: 'sky', icon: CalendarDays, blurb: 'One demand engine feeds five surfaces, so the board, the chart, the calendar and the game never disagree about what work exists.' },
        { id: 'finance', label: 'Finance & billing', accent: 'emerald', icon: Banknote, blurb: 'Every money figure has one definition in one place, and each consolidation shipped with a tie-out proving nothing moved.' },
        { id: 'procurement', label: 'Procurement & materials', accent: 'amber', icon: Package, blurb: 'Material demand is seen the day a quote is sold, not the day someone raises a purchase order.' },
        { id: 'ai', label: 'Centaurus AI', accent: 'emerald', icon: BrainCircuit, blurb: 'An assistant that answers from the database and refuses to invent, with the guardrails measured rather than assumed.' },
        { id: 'field-comms', label: 'Field comms', accent: 'sky', icon: Send, blurb: 'A Telegram forum with one topic per job, designed around what the Bot API actually permits.' },
        { id: 'hr', label: 'HR', accent: 'amber', icon: Users, blurb: 'Seven purpose-built doctypes and a calendar that is a view, gated to the five people who need it.' },
        { id: 'sales', label: 'Sales & quoting', accent: 'sky', icon: BarChart2, blurb: 'A four-page report family sharing one column engine, one search helper and one export spec.' },
    ],

    modules: [
        /* scheduling */
        { domain: 'scheduling', icon: Map, name: 'Master Schedule', summary: 'Technician gantt, geo map and weekly flow mounted from one 12,500-line core: Leaflet + OSRM routing, sketch and annotation layers, saved views, Excel and PNG export.', tags: ['Leaflet', 'OSRM', 'Canvas'] },
        { domain: 'scheduling', icon: CalendarDays, name: 'Job Calendar', summary: 'One chip per job per day; the days a job occupies are its sequence window. Drag, resize, merge, greedy graph colouring, and a plan-vs-actual mode that recovered destroyed plan history.', tags: ['Realtime', 'Plan vs actual'] },
        { domain: 'scheduling', icon: Gauge, name: 'Capacity engine', summary: 'Dominance-ranked demand bands, backward due-packing and open backfill. What-if is a delta on the server baseline, so "no edits" is structurally identical output.', tags: ['Shared engine', '5 surfaces'] },
        { domain: 'scheduling', icon: Route, name: 'Route planner', summary: 'Multi-state crew itineraries with real road distances, drive and fly legs, day-by-day timelines and a push of computed dates into the shared sequence table.', tags: ['1,746 mi / 31.5 h verified'] },
        { domain: 'scheduling', icon: Lock, name: 'Time-off hard block', summary: 'One authority function: a technician booked off cannot be scheduled anywhere that day, on either page, with a weekend bridge so a two-week vacation does not leave the middle weekend open.', tags: ['Server-side'] },

        /* finance */
        { domain: 'finance', icon: TrendingUp, name: 'Cash Flow Forecast', summary: 'A 13-week forecast back-tested on 90 paid jobs; committed materials count as cash only when the job is scheduled; sales-tax remittance forecast by state.', tags: ['90-job back-test'] },
        { domain: 'finance', icon: Landmark, name: 'ABL bank package', summary: 'Upload the lender\'s four exports, stage, tie out, and reproduce the borrowing-base certificate cell-for-cell in the bank\'s own workbook layout.', tags: ['12/12 lines match'] },
        { domain: 'finance', icon: Table2, name: 'Schedule of Values (AIA G703)', summary: 'The continuation sheet rendered as the workbook itself: every border, width and merge transcribed from the server-built file, with sections, versions and immutable filed applications.', tags: ['openpyxl', '22-workbook fingerprint suite'] },
        { domain: 'finance', icon: FileCheck, name: 'Progress billing & lien waivers', summary: 'Per-invoice vendor waiver checklist; prefill fills the vendor\'s own AcroForm PDF, validated against four human-filled prelims with every field landing in the same slot.', tags: ['AcroForm', 'AI-assisted'] },
        { domain: 'finance', icon: Receipt, name: 'Invoice Wizard', summary: 'A rolling two-week billing review grouped by job, flagging under-billed work with a three-segment gauge and a one-hue-one-meaning colour vocabulary.', tags: ['Ties to 109 jobs, 0 mismatches'] },
        { domain: 'finance', icon: Scale, name: 'Job Profitability', summary: 'Estimate-vs-actual with an exact price/volume decomposition: labour variance splits into an hours effect and a rate effect, verified to a 0.0 residual on 315 jobs.', tags: ['82% of overrun is hours'] },
        { domain: 'finance', icon: Calculator, name: 'Commission Worksheet', summary: 'Per-rep statements from encoded plan rules, with pay tracking read out of payroll-check lines. Reconciled to the old workbook: draws exact, bookings 99%.', tags: ['QuickBooks-driven'] },
        { domain: 'finance', icon: Timer, name: 'Daily Pace', summary: 'A burn-down toward a dated target with a hand-rolled SVG physics bucket: floor narrows daily, rim height is crew hours, ball area is contract size, waterlines are % invoiced and % paid.', tags: ['SVG physics'] },

        /* procurement */
        { domain: 'procurement', icon: Boxes, name: 'Material Forecast', summary: 'A weekly buy board fed by sold-quote material lines and typed lead times, with bands ordered by actionability. Overdue lines fell 433 → 85 once false alarms were removed.', tags: ['Conservation test'] },
        { domain: 'procurement', icon: ClipboardCheck, name: 'Procurement Tracker', summary: 'Two Smartsheet-fed grids that became editable pages: upsert on a synthetic row key with a local-edits contract so in-app changes survive re-import.', tags: ['Shared grid engine'] },
        { domain: 'procurement', icon: Package, name: 'Kit Master', summary: 'Twenty-one warehouse install kits with search across part names and a print view that is the print DOM: one bordered count sheet per kit.', tags: ['Print-first'] },
        { domain: 'procurement', icon: Truck, name: 'Committed-materials gate', summary: 'Open purchase orders become cash only when the job is dispatched or sequenced; parked POs move to a non-cash memo row instead of sitting in week zero forever.', tags: ['Cash-flow rule'] },

        /* ai */
        { domain: 'ai', icon: ShieldCheck, name: 'Governed SQL', summary: 'SELECT-only, single statement, table allowlist, finance-column gate anywhere in the statement, row cap, timeout, audit log. Thirty-one adversarial cases, all blocked.', tags: ['31/31'] },
        { domain: 'ai', icon: ListChecks, name: 'Metric registry', summary: '"How is this calculated?" is answered only from a hand-written registry of formulas and exclusions, with self-tests that detect when the code underneath was rewritten.', tags: ['Never invented'] },
        { domain: 'ai', icon: Compass, name: 'Navigation screenshots', summary: '"How do I get to X?" returns live click steps and a screenshot with the tile ringed; a staleness guard withholds the image rather than ringing the wrong tile.', tags: ['Playwright', '58 pages'] },
        { domain: 'ai', icon: Camera, name: 'Photo vision', summary: 'A disk-driven gallery over the jobsite photo library with vision-model descriptions and per-job summaries fusing photos with chat.', tags: ['30,926 photos described'] },
        { domain: 'ai', icon: MessageSquare, name: 'Chat intelligence', summary: 'Per-day analysis of crew chat and a per-job reasoner that queues action items for office review, with evidence notes and a materiality gate (116 → 37 open).', tags: ['2,790 job-days'] },
        { domain: 'ai', icon: Calculator, name: 'Estimation Engine', summary: 'Labour hours from size-normalised nearest neighbours over 1,355 quotes, with a P10–P90 range that captures 79% of actuals. No LLM, by choice.', tags: ['Calibrated'] },

        /* field comms */
        { domain: 'field-comms', icon: Radio, name: 'Job topics', summary: 'One forum supergroup, one topic per job, created by a bot action that adds nobody and invites nobody, after per-job groups got the company phone number banned.', tags: ['Bot API only'] },
        { domain: 'field-comms', icon: ClipboardCheck, name: 'Pinned progress card', summary: '0–100% progress, feedback and location capture on a card whose first line fits Telegram\'s one-line pinned banner: two 8-cell bars, 27 characters worst case.', tags: ['Tested on a phone'] },
        { domain: 'field-comms', icon: Hammer, name: 'Hammer Down', summary: 'A one-tap "good to invoice, finished or not" button. The callback carries the target state, not a toggle verb, so a redelivered batch is harmless.', tags: ['Idempotent', '52-check harness'] },
        { domain: 'field-comms', icon: Activity, name: 'Labour bar', summary: 'The card\'s second bar (% of quoted hours used) updates itself as technicians clock, from a cron that composes the canonical hours helpers.', tags: ['Cron'] },
        { domain: 'field-comms', icon: Send, name: 'Pace post', summary: 'Each weekday morning the bot posts the Daily Pace numbers into the group, reading the same payload the home banner reads so the two can never disagree.', tags: ['Same payload'] },
        { domain: 'field-comms', icon: Bot, name: 'DM hotline', summary: 'Direct messages answered by Centaurus as an HR and office assistant, with identity bound in a closure, a fabrication guard, guaranteed escalation and a 23-check suite.', tags: ['Profile-gated tools'] },
        { domain: 'field-comms', icon: FileText, name: 'Form handout', summary: 'DM the bot for the mileage, reimbursement or time-off PDF. The intent gate is the design: "can I take time off next week" routes to the hotline, not to a PDF.', tags: ['Regression-tested'] },

        /* hr */
        { domain: 'hr', icon: Users, name: 'HR Hub', summary: 'Requests, a time-off ledger, employee files, certifications, onboarding tasks and a searchable policy corpus, built in seven doctypes instead of importing a 40-doctype module.', tags: ['Role held to 5 users'] },
        { domain: 'hr', icon: CalendarDays, name: 'HR Calendar', summary: 'A full-year month board composing four sources with auto-derived milestones (probation, insurance, 401k) that stay editable and report drift instead of overwriting.', tags: ['Zero new doctypes'] },
        { domain: 'hr', icon: Search, name: 'Day-off classifier', summary: 'Vacation, sick, no-pay, family, bereavement, jury: read from the timesheet note body after measuring that the PDF checkboxes contradicted the office in 8 of 22 readable forms.', tags: ['411 of 429 classified', '31 pinned cases'] },
        { domain: 'hr', icon: UserCheck, name: 'Payroll reconciliation KPI', summary: 'The identity behind a recurring payroll-hours gap, verified to the cent on two weeks, then shipped as an Off-Roster KPI that names the cause automatically.', tags: ['36.17 h = one typo'] },

        /* sales */
        { domain: 'sales', icon: Search, name: 'Quote List & Lookup', summary: 'One row per quote across 25 columns with shared named filters; per-quote cost-line breakdown searchable by quote or job number, with a stale-quote KPI.', tags: ['Version collapse'] },
        { domain: 'sales', icon: BarChart2, name: 'Quote Performance', summary: 'Bookings, win rates, per-rep compare mode and an awarded-vs-lost margin scatter shared with Job Profitability; every KPI tile is a drill-down whose total recomputes.', tags: ['297 jobs verified'] },
        { domain: 'sales', icon: UserCheck, name: 'Sold-By resolution', summary: 'Six pages resolved the salesperson six different ways. One helper now: job value wins, primary quote falls back, largest quote breaks ties.', tags: ['One definition'] },
        { domain: 'sales', icon: Table2, name: 'Report column engine', summary: 'Adjustable, reorderable, freezable columns and spec-driven exports across four report pages, verified byte-identical to the old exports.', tags: ['4 pages'] },
        { domain: 'sales', icon: Wrench, name: 'Service & maintenance calls', summary: 'Dispatch intake that creates jobs in the SaaS through its API, plus the quarterly preventive-maintenance programme with one visit booked per technician.', tags: ['API write-back'] },
    ],

    integrations: [
        { icon: Database, name: 'Field-service SaaS', desc: 'A 331 MB, 137-sheet, 1.45M-row export mirrored into DuckDB and 137 generated doctypes; a Playwright bot replaced the daily manual export; a 5-minute API poller lands new jobs; visits are written back with an idempotent two-call create.', evidence: '331 operations mapped · 0 row drift · lag 2.5 h → 5 min' },
        { icon: Banknote, name: 'QuickBooks', desc: 'A one-shot import turned into a repeatable refresh that cancels what went stale, diffs on edit sequence and re-posts only when the amount moved. The ledger foots, debit equals credit, seven anchors reproduce.', evidence: '585,706 rows staged · 228,481 GL entries' },
        { icon: FileSpreadsheet, name: 'Smartsheet', desc: 'Procurement and permit grids upserted on a synthetic row key with a local-edits contract; the permit comment log is a true mirror with similarity matching at a measured 0.80 threshold.', evidence: '3 date conventions handled' },
        { icon: Images, name: 'SharePoint photos', desc: 'A disk-driven index over the synced jobsite photo tree with stale-while-revalidate caching, thumbnails and a merged media-plus-message timeline per job.', evidence: '30,926 photos · 0 failed' },
        { icon: Send, name: 'Telegram Bot API', desc: 'Forum topics, pinned cards, inline keyboards, documents, locations and long-polling, with the four legal markup paths probed live before anything shipped.', evidence: '4 markups probed · 1 works' },
        { icon: BrainCircuit, name: 'Ollama / Anthropic', desc: 'One client, two providers, every call proxied through the backend because the desk is HTTPS. Tool calling normalised across both; a thinking-spill repair for reasoning models.', evidence: '1 in 7 corrupted replies → 0' },
    ],

    verification: [
        { icon: FlaskConical, title: '90-job cash back-test', desc: 'Forecast assumptions checked against a seeded sample of fully-paid jobs before any of them were trusted.', evidence: 'terms +7 d · learned lag deleted' },
        { icon: FileCheck, title: 'Certificate twin', desc: 'The borrowing-base certificate compared cell-for-cell against a filed workbook with an explicit allowed-deltas list.', evidence: '12 of 12 lines exact' },
        { icon: ShieldCheck, title: 'Adversarial SQL suite', desc: 'Writes, stacked statements, comment-hidden payloads, file exports, session variables, star-selects and backticked columns.', evidence: '31 cases, all blocked' },
        { icon: Braces, title: 'jsdom runtime harnesses', desc: 'Harnesses that execute a page\'s real JavaScript and record exceptions the browser would swallow silently.', evidence: '3 fatal-on-load bugs caught, 3 for 3' },
        { icon: Scale, title: 'Cross-page tie-outs', desc: 'Quoted, billed and outstanding figures compared job by job across pages after every consolidation.', evidence: '5,598 jobs · 0 mismatches' },
        { icon: ListChecks, title: '204 test scripts', desc: 'Runtime harnesses, physics probes, workbook fingerprints, guard suites, before/after snapshot pairs and a counterfactual script.', evidence: 'measure, don\'t assert' },
    ],
    verificationPrinciple: 'Rejected optimisations are recorded with their number so nobody re-proposes them: learned lags measured worse than static terms; item-name matching rejected at a 1-in-8 overlap; won-only comparables measured worse; the estimator\'s midpoint interpolation measured worse.',

    timeline: [
        { month: '2026-05', label: 'May', title: 'Foundation', desc: 'Frappe bench on WSL2, the SaaS export mirrored into DuckDB, the QuickBooks migration, and the first Master Schedule board.', milestone: true },
        { month: '2026-06', label: 'Jun', title: 'Money on screen', desc: 'WIP list, Billing Worksheet, Cash Flow Forecast, Quote Lookup and Quote Performance, the shared report column engine.' },
        { month: '2026-07', label: 'Jul', title: 'Bank & billing', desc: 'ABL bank package and certificate twin, Progress Tracker, Kit Master, Platform Roadmap, Commission Worksheet, the 90-job back-test.' },
        { month: '2026-08', label: 'Aug', title: 'AI, HR and the field', desc: 'Calendar, Weekly Flow and Map split out; Centaurus governed SQL; Estimation Engine; Material Forecast rewrite; HR Hub; Telegram redesigned after the ban; photo AI.', milestone: true },
        { month: '2026-09', label: 'Sep', title: 'Contracts & hygiene', desc: 'Schedule of Values (AIA G703), Service & Maintenance Calls, Daily Pace physics, and an app-wide code-hygiene review.' },
    ],

    stack: [
        'Python', 'Frappe v15', 'ERPNext', 'MariaDB', 'Redis', 'DuckDB', 'pandas', 'openpyxl',
        'Plotly', 'Leaflet', 'OSRM', 'Playwright', 'jsdom', 'Telegram Bot API', 'Ollama',
        'Anthropic API', 'nginx', 'WSL2', 'Cloudflare Tunnel', 'Windows Task Scheduler',
    ],
};
