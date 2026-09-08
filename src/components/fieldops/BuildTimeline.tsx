import React from 'react';
import type { TimelineEntry } from '../../types';
import { Reveal } from '../ui/motion';

/** Vertical rail on mobile, horizontal rail from md up. */
export const BuildTimeline: React.FC<{ entries: TimelineEntry[] }> = ({ entries }) => (
    <ol className="relative grid gap-8 border-l border-white/[0.08] pl-6 md:grid-cols-5 md:border-l-0 md:border-t md:pl-0 md:pt-8">
        {entries.map((e, i) => (
            <li key={e.month} className="relative">
                <span
                    className={`absolute -left-[31px] top-1 h-3 w-3 rounded-full ring-4 ring-ink-950 md:-top-[39px] md:left-0 ${
                        e.milestone ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}
                    aria-hidden="true"
                />
                <Reveal delay={i * 0.08}>
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">{e.label} 2026</p>
                    <h3 className="mt-2 font-display text-base font-semibold text-white">{e.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-500 md:pr-6">{e.desc}</p>
                </Reveal>
            </li>
        ))}
    </ol>
);
