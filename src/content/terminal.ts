import type { TerminalEntry } from '../types';

export const TERMINAL_TITLE = 'gokhan@ops — tools in production';

export const TERMINAL_SCRIPT: TerminalEntry[] = [
    {
        cmd: 'bench refresh --source field-service-saas',
        out: [
            { kind: 'out', text: '1,449,960 rows · 137 sheets → duckdb' },
            { kind: 'out', text: '82 mirror tables · 0 row drift' },
            { kind: 'ok', text: 'mirror refreshed in 4.5 min' },
        ],
    },
    {
        cmd: 'centaurus ask "billed total for job 4821"',
        out: [
            { kind: 'out', text: 'sql guard: allowlist ok · single statement · 200-row cap' },
            { kind: 'warn', text: 'draft retention invoice excluded (metric registry)' },
            { kind: 'ok', text: 'answer grounded in 2 tool calls' },
        ],
    },
    {
        cmd: 'python backtest.py --jobs 90 --year 2025',
        out: [
            { kind: 'out', text: 'median issue→pay 35 d · terms assumed 30 d' },
            { kind: 'warn', text: 'learned-lag error 34 d > static terms 26 d' },
            { kind: 'ok', text: 'feature deleted · default terms +7 d' },
        ],
    },
    {
        cmd: 'jobbot card --topic job-4821 --pin',
        out: [
            { kind: 'out', text: '▓▓▓▓▓▓░░|▓▓▓░░░░░' },
            { kind: 'ok', text: '27 chars · fits the one-line pinned banner' },
        ],
    },
];
