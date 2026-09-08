import React from 'react';
import type { VerificationItem } from '../../types';
import { Reveal } from '../ui/motion';

export const VerificationStrip: React.FC<{ items: VerificationItem[]; principle: string }> = ({ items, principle }) => (
    <div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((it, i) => {
                const Icon = it.icon;
                return (
                    <Reveal key={it.title} delay={(i % 3) * 0.08}>
                        <div className="panel flex h-full flex-col p-5 transition-all duration-300 hover:border-amber-400/30">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-2">
                                    <Icon size={16} className="text-amber-400" />
                                </div>
                                <h3 className="text-sm font-semibold text-white">{it.title}</h3>
                            </div>
                            <p className="mt-3 flex-1 text-xs leading-relaxed text-zinc-500">{it.desc}</p>
                            {it.evidence && (
                                <p className="mt-3 border-t border-white/[0.06] pt-3 font-mono text-[11px] text-emerald-400">{it.evidence}</p>
                            )}
                        </div>
                    </Reveal>
                );
            })}
        </div>
        <Reveal delay={0.2}>
            <blockquote className="panel mt-6 border-l-2 border-l-amber-400/60 p-6">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400">Measure, don't assert</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{principle}</p>
            </blockquote>
        </Reveal>
    </div>
);
