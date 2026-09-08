import React from 'react';
import type { FieldOpsDomainMeta, FieldOpsModule } from '../../types';
import { ACCENTS } from '../ui/accents';
import { Reveal } from '../ui/motion';
import { Tag } from '../ui/Tag';

/** Modules grouped by domain; each domain owns an accent so the page reads as one system. */
export const ModuleGrid: React.FC<{ domains: FieldOpsDomainMeta[]; modules: FieldOpsModule[] }> = ({ domains, modules }) => (
    <div className="space-y-16">
        {domains.map((domain) => {
            const accent = ACCENTS[domain.accent];
            const items = modules.filter((m) => m.domain === domain.id);
            const DomainIcon = domain.icon;
            return (
                <div key={domain.id} id={`domain-${domain.id}`} className="scroll-mt-24">
                    <Reveal className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start">
                        <div className={`shrink-0 rounded-xl border p-3 ${accent.iconBg}`}>
                            <DomainIcon className={`h-5 w-5 ${accent.text}`} />
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-3">
                                <h3 className="font-display text-xl font-semibold text-white">{domain.label}</h3>
                                <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${accent.pill}`}>
                                    {items.length} modules
                                </span>
                            </div>
                            <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-zinc-500">{domain.blurb}</p>
                        </div>
                    </Reveal>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {items.map((m, i) => {
                            const Icon = m.icon;
                            return (
                                <Reveal key={m.name} delay={(i % 3) * 0.06}>
                                    <div className={`panel flex h-full flex-col p-5 transition-all duration-300 ${accent.hoverBorder}`}>
                                        <div className="flex items-start gap-3">
                                            <div className={`shrink-0 rounded-lg border p-2 ${accent.iconBg}`}>
                                                <Icon size={16} className={accent.text} />
                                            </div>
                                            <h4 className="text-sm font-semibold leading-snug text-white">{m.name}</h4>
                                        </div>
                                        <p className="mt-3 flex-1 text-xs leading-relaxed text-zinc-500">{m.summary}</p>
                                        {m.tags && m.tags.length > 0 && (
                                            <div className="mt-4 flex flex-wrap gap-1.5">
                                                {m.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                                            </div>
                                        )}
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            );
        })}
    </div>
);
