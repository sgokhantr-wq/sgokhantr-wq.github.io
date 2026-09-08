import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { SKILL_SECTIONS, SKILLS_HEADLINE } from '../content/skills';
import { SKILLS_STATS } from '../content/stats';
import { ACCENTS, type AccentClasses } from './ui/accents';
import { StatPills } from './ui/StatsRow';

/* ─────────────────────────── Sub-components ───────────────────────────── */

const SectionHeader: React.FC<{
  label: string; title: string; subtitle: string; accent: AccentClasses;
}> = ({ label, title, subtitle, accent }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <div ref={ref} className="mb-12">
      <motion.span
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className={`inline-block font-mono text-xs font-bold tracking-[0.25em] ${accent.text}`}
      >
        SECTION {label}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-3 font-display text-3xl font-bold text-white md:text-4xl"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-400 md:text-lg"
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

const SkillCard: React.FC<{
  icon: LucideIcon; title: string; desc: string; index: number; accent: AccentClasses;
}> = ({ icon: Icon, title, desc, index, accent }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: 'easeOut' }}
      className={`panel ${accent.hoverBorder} p-6 transition-all duration-300`}
    >
      <div className="flex items-start gap-4">
        <div className={`shrink-0 rounded-lg border p-2.5 ${accent.iconBg}`}>
          <Icon size={18} className={accent.text} />
        </div>
        <div>
          <h3 className="mb-1.5 text-sm font-semibold leading-snug text-white">{title}</h3>
          <p className="text-xs leading-relaxed text-zinc-500">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
};

const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[100] h-0.5 bg-white/[0.06]">
      <div
        className="h-full bg-gradient-to-r from-sky-400 via-emerald-400 to-amber-400"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const HeroBanner: React.FC = () => (
  <div className="relative overflow-hidden px-4 py-24 text-center md:py-28">
    <div className="grid-bg pointer-events-none absolute inset-0" />
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.05] blur-3xl" />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative mx-auto max-w-4xl"
    >
      <span className="eyebrow">{SKILLS_HEADLINE.eyebrow}</span>
      <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-white md:text-6xl">
        {SKILLS_HEADLINE.lead}{' '}
        <span className="bg-gradient-to-r from-sky-400 via-emerald-400 to-amber-400 bg-clip-text text-transparent">
          {SKILLS_HEADLINE.highlight}
        </span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
        {SKILLS_HEADLINE.sub}
      </p>

      <div className="mt-10">
        <StatPills stats={SKILLS_STATS} />
      </div>
    </motion.div>
  </div>
);

/* ─────────────────────────── Main Page ───────────────────────────────── */

const SkillSet: React.FC = () => (
  <div className="min-h-screen">
    <ScrollProgress />
    <HeroBanner />

    <div className="container mx-auto space-y-28 px-4 pb-24">
      {SKILL_SECTIONS.map((section) => {
        const accent = ACCENTS[section.accent];
        return (
          <section key={section.id}>
            <SectionHeader label={section.label} title={section.title} subtitle={section.subtitle} accent={accent} />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {section.skills.map((skill, i) => (
                <SkillCard key={skill.title} icon={skill.icon} title={skill.title} desc={skill.desc} index={i} accent={accent} />
              ))}
            </div>
          </section>
        );
      })}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="border-t border-white/[0.06] py-12 text-center"
      >
        <p className="mb-4 font-mono text-sm text-zinc-500">READY TO COLLABORATE?</p>
        <h3 className="mb-6 font-display text-2xl font-bold text-white md:text-3xl">
          Let's build something that{' '}
          <span className="text-emerald-400">actually works.</span>
        </h3>
        <Link
          to="/contact"
          className="inline-block rounded-xl bg-emerald-400 px-8 py-3 font-semibold text-ink-950 transition-all duration-300 hover:bg-emerald-300"
        >
          Get in Touch
        </Link>
      </motion.div>
    </div>
  </div>
);

export default SkillSet;
