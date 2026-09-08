import type { Accent } from '../../types';

export interface AccentClasses {
    text: string;
    textSoft: string;
    border: string;
    hoverBorder: string;
    iconBg: string;
    gradient: string;
    dot: string;
    pill: string;
}

/* Complete literal class strings so Tailwind can see them; content only carries the accent key. */
export const ACCENTS: Record<Accent, AccentClasses> = {
    emerald: {
        text: 'text-emerald-400',
        textSoft: 'text-emerald-400/80',
        border: 'border-emerald-400/20',
        hoverBorder: 'hover:border-emerald-400/30',
        iconBg: 'border-emerald-400/20 bg-emerald-400/5',
        gradient: 'from-emerald-400 to-teal-400',
        dot: 'bg-emerald-400',
        pill: 'border-emerald-400/20 bg-emerald-400/5 text-emerald-300',
    },
    sky: {
        text: 'text-sky-400',
        textSoft: 'text-sky-400/80',
        border: 'border-sky-400/20',
        hoverBorder: 'hover:border-sky-400/30',
        iconBg: 'border-sky-400/20 bg-sky-400/5',
        gradient: 'from-sky-400 to-blue-400',
        dot: 'bg-sky-400',
        pill: 'border-sky-400/20 bg-sky-400/5 text-sky-300',
    },
    amber: {
        text: 'text-amber-400',
        textSoft: 'text-amber-400/80',
        border: 'border-amber-400/20',
        hoverBorder: 'hover:border-amber-400/30',
        iconBg: 'border-amber-400/20 bg-amber-400/5',
        gradient: 'from-amber-400 to-orange-400',
        dot: 'bg-amber-400',
        pill: 'border-amber-400/20 bg-amber-400/5 text-amber-300',
    },
    zinc: {
        text: 'text-zinc-400',
        textSoft: 'text-zinc-400/80',
        border: 'border-white/[0.08]',
        hoverBorder: 'hover:border-white/20',
        iconBg: 'border-white/[0.08] bg-white/[0.03]',
        gradient: 'from-zinc-300 to-zinc-500',
        dot: 'bg-zinc-400',
        pill: 'border-white/[0.08] bg-white/[0.03] text-zinc-300',
    },
};

/** Hex values for SVG, three.js and recharts, matching Tailwind's *-400 shades. */
export const ACCENT_HEX: Record<Accent, string> = {
    emerald: '#34d399',
    sky: '#38bdf8',
    amber: '#fbbf24',
    zinc: '#a1a1aa',
};
