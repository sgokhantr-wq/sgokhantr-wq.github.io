import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import type { CaseStudy } from '../types';
import { CASE_STUDIES, CASE_STUDY_GROUPS } from '../content/caseStudies';
import { Tag } from './ui/Tag';

const CaseCard: React.FC<{ cs: CaseStudy; index: number }> = ({ cs, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const Icon = cs.icon;
    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: 'easeOut' }}
            className={`panel panel-hover flex h-full flex-col p-7 ${cs.featured ? 'lg:col-span-2 border-emerald-400/20' : ''}`}
        >
            <div className="flex items-center gap-4">
                <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-2.5">
                    <Icon className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="font-display text-lg font-semibold leading-snug text-white">{cs.title}</h3>
                {cs.featured && (
                    <span className="ml-auto hidden rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-emerald-400 sm:inline-block">
                        featured
                    </span>
                )}
            </div>

            <dl className={`mt-6 flex-1 gap-4 text-sm leading-relaxed ${cs.featured ? 'grid md:grid-cols-3' : 'space-y-4'}`}>
                <div>
                    <dt className="font-mono text-[11px] uppercase tracking-widest text-amber-400/80">The problem</dt>
                    <dd className="mt-1 text-zinc-400">{cs.problem}</dd>
                </div>
                <div>
                    <dt className="font-mono text-[11px] uppercase tracking-widest text-sky-400/80">The system I designed</dt>
                    <dd className="mt-1 text-zinc-400">{cs.system}</dd>
                </div>
                <div>
                    <dt className="font-mono text-[11px] uppercase tracking-widest text-emerald-400/80">The tools I built</dt>
                    <dd className="mt-1 text-zinc-400">{cs.tools}</dd>
                </div>
            </dl>

            <div className="mt-6 flex flex-wrap gap-2">
                {cs.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
            </div>

            <div className="mt-5 flex flex-col gap-4 border-t border-white/[0.06] pt-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                    {cs.results.map((r) => (
                        <div key={r} className="flex items-center gap-2.5">
                            <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
                            <span className="font-mono text-xs text-emerald-400">{r}</span>
                        </div>
                    ))}
                </div>
                {cs.link && (
                    <Link to={cs.link.to}
                        className="group inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-white/10 px-3.5 py-2 font-mono text-xs text-zinc-200 transition-all hover:border-emerald-400/40 hover:text-emerald-300">
                        {cs.link.label}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                )}
            </div>
        </motion.article>
    );
};

const Portfolio: React.FC = () => {
    return (
        <div className="relative min-h-screen">
            <div className="grid-bg pointer-events-none absolute inset-0" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/[0.04] blur-3xl" />

            <section className="container relative z-10 mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="mb-14 max-w-3xl"
                >
                    <span className="eyebrow">Case Studies</span>
                    <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
                        Problem → <span className="text-sky-400">System</span> → <span className="text-emerald-400">Tool</span> → Result
                    </h1>
                    <p className="mt-5 text-lg leading-relaxed text-zinc-400">
                        Every project follows the same arc: find the bottleneck, design the system around it,
                        then build the tool that makes it permanent. {CASE_STUDIES.length} that shipped, newest first.
                    </p>
                </motion.div>

                <div className="space-y-20">
                    {CASE_STUDY_GROUPS.map((group) => {
                        const items = CASE_STUDIES.filter((cs) => cs.group === group.id);
                        return (
                            <div key={group.id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{ duration: 0.6 }}
                                    className="mb-8 max-w-3xl"
                                >
                                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">{group.eyebrow}</p>
                                    <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">{group.title}</h2>
                                    <p className="mt-3 text-base leading-relaxed text-zinc-400">{group.blurb}</p>
                                </motion.div>
                                <div className="grid gap-5 lg:grid-cols-2">
                                    {items.map((cs, i) => <CaseCard key={cs.id} cs={cs} index={i} />)}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <p className="text-zinc-500">Want the full architecture walkthrough on any of these?</p>
                    <Link to="/contact"
                        className="mt-5 inline-flex items-center rounded-xl bg-emerald-400 px-7 py-3 font-semibold text-ink-950 transition-all hover:bg-emerald-300">
                        Let's talk
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </motion.div>
            </section>
        </div>
    );
};

export default Portfolio;
