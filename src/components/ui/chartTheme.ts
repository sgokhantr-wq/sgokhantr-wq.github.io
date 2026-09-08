/** Recharts colours aligned with the ink / emerald / sky / amber design system. */
export const CHART = {
    grid: '#27272a',
    axis: '#52525b',
    tick: '#a1a1aa',
    tooltipBg: '#131318',
    tooltipBorder: '#27272a',
    tooltipText: '#fafafa',
    tooltipLabel: '#d4d4d8',
    demand: '#fbbf24',
    capacity: '#38bdf8',
    inventory: '#71717a',
    production: '#34d399',
    emerald: '#34d399',
    sky: '#38bdf8',
    amber: '#fbbf24',
    red: '#f87171',
    zinc: '#71717a',
} as const;

export const tooltipStyle = {
    backgroundColor: CHART.tooltipBg,
    border: `1px solid ${CHART.tooltipBorder}`,
    borderRadius: '12px',
    color: CHART.tooltipText,
    fontSize: '12px',
};
