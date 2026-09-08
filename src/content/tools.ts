import {
    Bot, Boxes, Calculator, Factory, Landmark, Send, TrendingUp, Workflow,
} from 'lucide-react';
import type { Tool } from '../types';

/** Home-page bento. `big` spans half the row, `wide` spans the full row. */
export const TOOLS: Tool[] = [
    {
        icon: Boxes,
        name: 'FieldOps Platform',
        desc: 'A complete field-service ERP built solo on Frappe/ERPNext: scheduling, cash flow, billing, procurement, HR, field comms and an AI layer, all reading one mirrored source of truth.',
        tags: ['Frappe', 'Python', 'DuckDB', 'Telegram'],
        metric: '68 pages · 364 doctypes · 17 weeks',
        to: '/fieldops',
        size: 'big',
    },
    {
        icon: Bot,
        name: 'Centaurus AI',
        desc: 'The ERP\'s AI layer: governed read-only SQL behind a table allowlist, a metric registry so figures are never invented, a fabrication guard, and a Telegram hotline for technicians.',
        tags: ['Ollama', 'Anthropic API', 'Tool calling'],
        metric: '31 adversarial SQL cases · all blocked',
        to: '/centaurus',
        size: 'big',
    },
    {
        icon: TrendingUp,
        name: 'Cash-flow back-test',
        desc: '13-week forecast validated against 90 fully-paid jobs. The "learned lag" feature measured worse than static terms and was deleted.',
        tags: ['Python', 'Forecasting', 'MariaDB'],
        metric: 'error 34 d → 26 d by deleting a feature',
    },
    {
        icon: Landmark,
        name: 'Bank package twin',
        desc: 'Reproduces the lender\'s borrowing-base certificate cell-for-cell from raw exports; the contra rule caught 5 jobs the hand list missed.',
        tags: ['openpyxl', 'QuickBooks', 'Finance'],
        metric: '12 of 12 lines match the filed certificate',
    },
    {
        icon: Calculator,
        name: 'Estimation Engine',
        desc: 'Labour-hours estimator with no LLM: size-normalised nearest neighbours over 1,355 quotes, leading with a P10–P90 range and its comparables.',
        tags: ['Statistics', 'Python', 'DuckDB'],
        metric: '79% of actuals inside the range',
    },
    {
        icon: Send,
        name: 'Telegram field comms',
        desc: 'One forum, one topic per job: a pinned progress card with a 27-character banner, a one-tap "ready to invoice" button and a self-updating labour bar.',
        tags: ['Telegram Bot API', 'Python', 'Cron'],
        metric: '2.5 h → 5 min job-to-topic lag',
    },
    {
        icon: Workflow,
        name: 'Planning Engine Simulator',
        desc: 'Interactive MRP sandbox: inventory dynamics, multi-level BOM netting and a digital-twin radar you can drive from the browser.',
        tags: ['React', 'Recharts', 'MRP'],
        metric: 'Try it live',
        to: '/live-demo',
    },
    {
        icon: Factory,
        name: 'Manufacturing tools',
        desc: 'Earlier work: automated PO issuance around Business Central (−24% stockouts), a vision scraper for an AS/400 terminal with no API, a 750K-item ERP migration toolkit, and an inventory-aging model.',
        tags: ['D365 BC', 'OpenCV', 'SQL Server', 'pandas'],
        metric: 'four case studies',
        to: '/portfolio',
        size: 'wide',
    },
];
