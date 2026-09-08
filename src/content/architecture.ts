import type { ArchitectureMapSpec } from '../types';

/** Home page: the generic signal → decision pattern behind every system. */
export const HOME_ARCHITECTURE: ArchitectureMapSpec = {
    title: 'REFERENCE ARCHITECTURE · SIGNAL → DECISION',
    badge: 'LIVE FLOW',
    viewBox: { w: 900, h: 330 },
    edges: [
        { d: 'M 165 60 C 220 60 210 140 255 148', accent: 'sky' },
        { d: 'M 165 158 H 255', accent: 'sky' },
        { d: 'M 165 256 C 220 256 210 175 255 166', accent: 'sky' },
        { d: 'M 405 145 C 440 130 440 95 470 88' },
        { d: 'M 405 170 C 440 185 440 220 470 228' },
        { d: 'M 620 88 C 655 88 655 150 685 152' },
        { d: 'M 620 228 C 655 228 655 168 685 164' },
        { d: 'M 835 140 C 870 120 850 60 815 52 L 745 52', accent: 'amber' },
        { d: 'M 835 175 C 870 195 850 262 815 268 L 745 268', accent: 'amber' },
        { d: 'M 540 268 C 420 320 340 300 330 200', accent: 'amber', dim: true },
    ],
    nodes: [
        { id: 'signals', x: 15, y: 40, label: 'FIELD & CUSTOMER', sub: 'emails · chat · photos', accent: 'sky' },
        { id: 'txn', x: 15, y: 138, label: 'ERP TRANSACTIONS', sub: 'jobs · quotes · ledgers', accent: 'sky' },
        { id: 'floor', x: 15, y: 236, label: 'SHOP & SITE DATA', sub: 'clock punches · output', accent: 'sky' },
        { id: 'etl', x: 255, y: 131, label: 'ETL · PYTHON', sub: 'mirror · validate · shape', accent: 'emerald' },
        { id: 'ai', x: 470, y: 62, label: 'CENTAURUS AI', sub: 'answer · draft · flag', accent: 'emerald' },
        { id: 'plan', x: 470, y: 202, label: 'PLANNING ENGINE', sub: 'capacity · routing · netting', accent: 'emerald' },
        { id: 'erp', x: 685, y: 131, w: 150, label: 'ERP', sub: 'single source of truth', accent: 'zinc' },
        { id: 'quotes', x: 595, y: 30, label: 'QUOTES & BILLING', accent: 'amber' },
        { id: 'pos', x: 595, y: 246, label: 'POs + SCHEDULE', accent: 'amber' },
    ],
    caption: { x: 330, y: 318, text: '← outcomes feed back into the pipeline' },
};
