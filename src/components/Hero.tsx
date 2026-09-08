import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import type { Tool } from '../types';
import { SITE } from '../content/site';
import { TOOLS } from '../content/tools';
import { HOME_STATS } from '../content/stats';
import { PRINCIPLES } from '../content/principles';
import { TERMINAL_SCRIPT, TERMINAL_TITLE } from '../content/terminal';
import { STACK } from '../content/stack';
import { HOME_ARCHITECTURE } from '../content/architecture';
import { asset } from '../lib/assets';
import { Reveal } from './ui/motion';
import { fadeUp } from './ui/variants';
import { Marquee } from './ui/Marquee';
import { ArchitectureMap } from './ui/ArchitectureMap';
import { Terminal } from './ui/Terminal';
import { Tag } from './ui/Tag';

/* ────────────────────────── Tools bento ────────────────────────── */

const ToolCard: React.FC<{ tool: Tool; index: number }> = ({ tool, index }) => {
    const Icon = tool.icon;
    const inner = (
        <>
            <div className="flex items-start justify-between">
                <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-2.5">
                    <Icon className="h-5 w-5 text-emerald-400" />
                </div>
                {tool.to && (
                    <ArrowUpRight className="h-4 w-4 text-zinc-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-400" />
                )}
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold text-white">{tool.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500">{tool.desc}</p>
            <div className="mt-5 flex flex-wrap gap-2">
                {tool.tags.map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
            <div className="mt-4 border-t border-white/[0.06] pt-3 font-mono text-xs text-emerald-400">{tool.metric}</div>
        </>
    );
    const cls = 'panel panel-hover group flex h-full flex-col p-6';
    const span = tool.size === 'wide' ? 'md:col-span-6' : tool.size === 'big' ? 'md:col-span-3' : 'md:col-span-2';
    return (
        <Reveal delay={(index % 3) * 0.08} className={span}>
            {tool.to
                ? <Link to={tool.to} className={cls}>{inner}</Link>
                : <div className={cls}>{inner}</div>}
        </Reveal>
    );
};

/* ────────────────────────── Page ────────────────────────── */

const scrollToSystems = () => {
    document.getElementById('systems')?.scrollIntoView({ behavior: 'smooth' });
};

const Hero: React.FC = () => {
    return (
        <div className="relative">
            {/* ── Hero ── */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 grid-bg pointer-events-none" />
                <div className="pointer-events-none absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.05] blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-sky-500/[0.04] blur-3xl" />

                <div className="container relative z-10 mx-auto px-4 pb-24 pt-16 lg:pt-24">
                    <div className="grid items-center gap-14 lg:grid-cols-2">
                        <div className="space-y-8">
                            <motion.div {...fadeUp(0)}>
                                <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-1.5 font-mono text-xs text-emerald-300">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                                    </span>
                                    Open to roles · Operations Tech · ERP · AI
                                </div>
                            </motion.div>

                            <motion.h1 {...fadeUp(0.1)} className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
                                I design the system.
                                <span className="block bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                                    Then I build the tools
                                </span>
                                that run it.
                            </motion.h1>

                            <motion.p {...fadeUp(0.2)} className="max-w-lg text-lg leading-relaxed text-zinc-400">
                                Production planner turned systems architect. I design ERP architectures,
                                planning engines and data pipelines for manufacturing and field-service
                                operations, then write the Python, SQL and AI agents that keep them running.
                                Most recently: a complete field-service ERP, built solo in 17 weeks.
                            </motion.p>

                            <motion.div {...fadeUp(0.3)} className="flex flex-col gap-4 sm:flex-row">
                                <button type="button" onClick={scrollToSystems}
                                    className="inline-flex items-center justify-center rounded-xl bg-emerald-400 px-6 py-3.5 text-base font-semibold text-ink-950 shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:bg-emerald-300 hover:shadow-emerald-400/30">
                                    See how I build systems
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </button>
                                <a href={asset(SITE.resumeFile)} download={SITE.resumeDownloadName}
                                    className="inline-flex items-center justify-center rounded-xl border border-white/10 px-6 py-3.5 text-base font-semibold text-zinc-200 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]">
                                    <Download className="mr-2 h-4 w-4 text-emerald-400" />
                                    Resume
                                </a>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
                        >
                            <Terminal script={TERMINAL_SCRIPT} title={TERMINAL_TITLE} />
                        </motion.div>
                    </div>
                </div>
            </section>

            <Marquee items={STACK} />

            {/* ── System design ── */}
            <section id="systems" className="container mx-auto scroll-mt-24 px-4 py-24">
                <Reveal className="mb-12 max-w-3xl">
                    <span className="eyebrow">01 · System Design</span>
                    <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">
                        Every tool lives inside a system I designed first
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-zinc-400">
                        From raw signals to decisions in the office and in the field: the same architecture
                        pattern sits behind the field-service platform, Centaurus AI, the ERP migration and
                        the planning automations below.
                    </p>
                </Reveal>

                <Reveal delay={0.1}><ArchitectureMap spec={HOME_ARCHITECTURE} /></Reveal>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {PRINCIPLES.map((p, i) => (
                        <Reveal key={p.title} delay={i * 0.08}>
                            <div className="panel panel-hover h-full p-6">
                                <p.icon className="h-5 w-5 text-emerald-400" />
                                <h3 className="mt-4 font-display text-base font-semibold text-white">{p.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{p.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ── Tools ── */}
            <section id="tools" className="border-t border-white/[0.06] bg-white/[0.01]">
                <div className="container mx-auto px-4 py-24">
                    <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
                        <div className="max-w-2xl">
                            <span className="eyebrow">02 · Tools I've Built</span>
                            <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">
                                Software that runs real operations
                            </h2>
                            <p className="mt-4 text-lg leading-relaxed text-zinc-400">
                                Not portfolio pieces: tools running in production, each one built to remove a
                                specific bottleneck. The 2026 platform work is the newest.
                            </p>
                        </div>
                        <Link to="/portfolio" className="group inline-flex items-center gap-2 font-mono text-sm text-emerald-400 hover:text-emerald-300">
                            full case studies
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Reveal>

                    <div className="grid gap-4 md:grid-cols-6">
                        {TOOLS.map((tool, i) => <ToolCard key={tool.name} tool={tool} index={i} />)}
                    </div>
                </div>
            </section>

            {/* ── Stats ── */}
            <section className="border-t border-white/[0.06]">
                <div className="container mx-auto grid grid-cols-2 gap-px overflow-hidden px-4 py-16 md:grid-cols-4">
                    {HOME_STATS.map((s, i) => (
                        <Reveal key={s.label} delay={i * 0.06}>
                            <div className="p-6 text-center md:text-left">
                                <p className="font-display text-4xl font-bold text-white">{s.value}</p>
                                <p className="mt-2 text-sm leading-snug text-zinc-500">{s.label}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="border-t border-white/[0.06]">
                <div className="container mx-auto px-4 py-24 text-center">
                    <Reveal>
                        <p className="font-mono text-xs tracking-[0.25em] text-zinc-500">READY WHEN YOU ARE</p>
                        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold text-white md:text-5xl">
                            Need someone who can <span className="text-emerald-400">design it</span> and <span className="text-sky-400">build it</span>?
                        </h2>
                        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link to="/contact"
                                className="inline-flex items-center rounded-xl bg-emerald-400 px-8 py-3.5 font-semibold text-ink-950 shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-300">
                                Get in touch
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                            <Link to="/fieldops"
                                className="inline-flex items-center rounded-xl border border-white/10 px-8 py-3.5 font-semibold text-zinc-200 transition-all hover:border-white/20 hover:bg-white/[0.04]">
                                Explore the platform
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
};

export default Hero;
