import React from 'react';

/** Infinite horizontal tech-stack ticker. */
export const Marquee: React.FC<{ items: string[] }> = ({ items }) => (
    <div className="relative overflow-hidden border-y border-white/[0.06] bg-white/[0.01] py-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
        <div className="flex w-max animate-marquee gap-10">
            {[...items, ...items].map((item, i) => (
                <span key={i} className="flex items-center gap-10 whitespace-nowrap font-mono text-sm text-zinc-600">
                    {item}
                    <span className="text-emerald-500/40">·</span>
                </span>
            ))}
        </div>
    </div>
);
