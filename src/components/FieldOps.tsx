import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FIELDOPS } from '../content/fieldops';
import { Reveal } from './ui/motion';
import { fadeUp } from './ui/variants';
import { Marquee } from './ui/Marquee';
import { ArchitectureMap } from './ui/ArchitectureMap';
import { StatPills } from './ui/StatsRow';
import { ACCENTS } from './ui/accents';
import { ModuleGrid } from './fieldops/ModuleGrid';
import { IntegrationStrip } from './fieldops/IntegrationStrip';
import { VerificationStrip } from './fieldops/VerificationStrip';
import { BuildTimeline } from './fieldops/BuildTimeline';

const SectionHeader: React.FC<{ eyebrow: string; title: string; sub: string }> = ({ eyebrow, title, sub }) => (
    <Reveal className="mb-12 max-w-3xl">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">{title}</h2>
        <p className="mt-4 text-lg leading-relaxed text-zinc-400">{sub}</p>
    </Reveal>
);

const FieldOps: React.FC = () => {
    const { hero, architecture, domains, modules, integrations, verification, verificationPrinciple, timeline, stack } = FIELDOPS;
    return (
        <div className="relative">
            {/* ── Hero ── */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 grid-bg pointer-events-none" />
                <div className="pointer-events-none absolute -top-32 left-1/3 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.05] blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-sky-500/[0.04] blur-3xl" />

                <div className="container relative z-10 mx-auto px-4 pb-20 pt-16 lg:pt-24">
                    <motion.span {...fadeUp(0)} className="eyebrow">{hero.eyebrow}</motion.span>
                    <motion.h1 {...fadeUp(0.1)} className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl">
                        {hero.headline}{' '}
                        <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">{hero.highlight}</span>
                    </motion.h1>
                    <motion.p {...fadeUp(0.2)} className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-400">{hero.sub}</motion.p>
                    <motion.div {...fadeUp(0.3)} className="mt-10 flex justify-start">
                        <StatPills stats={hero.stats} />
                    </motion.div>
                    <motion.div {...fadeUp(0.35)} className="mt-8 flex flex-wrap gap-2">
                        {domains.map((d) => (
                            <a key={d.id} href={`#domain-${d.id}`}
                                onClick={(e) => { e.preventDefault(); document.getElementById(`domain-${d.id}`)?.scrollIntoView({ behavior: 'smooth' }); }}
                                className={`rounded-full border px-3 py-1 font-mono text-[11px] transition-colors hover:bg-white/[0.06] ${ACCENTS[d.accent].pill}`}>
                                {d.label}
                            </a>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Marquee items={stack} />

            {/* ── Architecture ── */}
            <section className="container mx-auto px-4 py-24">
                <SectionHeader
                    eyebrow="01 · Architecture"
                    title="Five sources, one mirror, one ERP, many surfaces"
                    sub="Everything financial reads a DuckDB mirror of the field-service SaaS, refreshed every two hours and proven to zero row drift on every backup. The ERP owns what the SaaS cannot: plans, forecasts, bank reporting, HR and the AI layer."
                />
                <Reveal delay={0.1}><ArchitectureMap spec={architecture} /></Reveal>
            </section>

            {/* ── Modules ── */}
            <section className="border-t border-white/[0.06] bg-white/[0.01]">
                <div className="container mx-auto px-4 py-24">
                    <SectionHeader
                        eyebrow="02 · Modules"
                        title={`${modules.length} modules across ${domains.length} domains`}
                        sub="Each card is a shipped desk page or engine. The tags carry the measurement that justified it."
                    />
                    <ModuleGrid domains={domains} modules={modules} />
                </div>
            </section>

            {/* ── Integrations ── */}
            <section className="container mx-auto px-4 py-24">
                <SectionHeader
                    eyebrow="03 · Integrations"
                    title="Six systems that did not want to talk to each other"
                    sub="A SaaS with a nightly export and a partly documented API, an accounting ledger, two spreadsheet products, a photo tree and a chat platform. Each one got a narrow, verified path in and, where it mattered, a narrow path back out."
                />
                <IntegrationStrip items={integrations} />
            </section>

            {/* ── Verification ── */}
            <section className="border-t border-white/[0.06] bg-white/[0.01]">
                <div className="container mx-auto px-4 py-24">
                    <SectionHeader
                        eyebrow="04 · How it was verified"
                        title="Numbers that were gone and got"
                        sub="A finance system nobody trusts is a spreadsheet with extra steps. Every consolidation shipped with a tie-out, and every rejected optimisation is recorded with the measurement that rejected it."
                    />
                    <VerificationStrip items={verification} principle={verificationPrinciple} />
                </div>
            </section>

            {/* ── Timeline ── */}
            <section className="container mx-auto px-4 py-24">
                <SectionHeader
                    eyebrow="05 · Timeline"
                    title="Sixteen weeks, start to running"
                    sub="Work began on 14 May 2026. The platform was carrying the weekly bank package by July and the field crews by August."
                />
                <BuildTimeline entries={timeline} />
            </section>

            {/* ── CTA ── */}
            <section className="border-t border-white/[0.06]">
                <div className="container mx-auto px-4 py-24 text-center">
                    <Reveal>
                        <p className="font-mono text-xs tracking-[0.25em] text-zinc-500">WANT THE WALKTHROUGH?</p>
                        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold text-white md:text-5xl">
                            Happy to open any of these on a call.
                        </h2>
                        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link to="/contact"
                                className="inline-flex items-center rounded-xl bg-emerald-400 px-8 py-3.5 font-semibold text-ink-950 shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-300">
                                Get in touch
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                            <Link to="/portfolio"
                                className="inline-flex items-center rounded-xl border border-white/10 px-8 py-3.5 font-semibold text-zinc-200 transition-all hover:border-white/20 hover:bg-white/[0.04]">
                                Read the case studies
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
};

export default FieldOps;
