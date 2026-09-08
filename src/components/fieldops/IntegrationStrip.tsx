import React from 'react';
import type { Integration } from '../../types';
import { Reveal } from '../ui/motion';

export const IntegrationStrip: React.FC<{ items: Integration[] }> = ({ items }) => (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((it, i) => {
            const Icon = it.icon;
            return (
                <Reveal key={it.name} delay={(i % 3) * 0.08}>
                    <div className="panel panel-hover flex h-full flex-col p-6">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl border border-sky-400/20 bg-sky-400/5 p-2.5">
                                <Icon className="h-5 w-5 text-sky-400" />
                            </div>
                            <h3 className="font-display text-base font-semibold text-white">{it.name}</h3>
                        </div>
                        <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-500">{it.desc}</p>
                        <div className="mt-4 border-t border-white/[0.06] pt-3 font-mono text-xs text-emerald-400">{it.evidence}</div>
                    </div>
                </Reveal>
            );
        })}
    </div>
);
