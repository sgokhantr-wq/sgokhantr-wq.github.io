import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, FileText, Send, CheckCircle2, Linkedin, MapPin } from 'lucide-react';
import { SITE } from '../content/site';
import { asset } from '../lib/assets';
import { fadeUp } from './ui/variants';

const inputCls =
    'w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3 text-sm text-white ' +
    'placeholder:text-zinc-700 transition-all focus:border-emerald-400/50 focus:outline-none focus:ring-1 focus:ring-emerald-400/20';

const TOPICS = ['Job Opportunity', 'ERP / Operations Platform Build', 'ERP Implementation Project', 'Automation Consultation', 'General Inquiry'];

const WHAT_I_BRING = [
    'Field-service and manufacturing ERP architecture (Frappe/ERPNext, D365 BC)',
    'Cash-flow, billing and bank-reporting systems that tie out to the cent',
    'AI agents with guardrails, running in production',
    'Python data pipelines and integrations (field-service SaaS, QuickBooks, Telegram)',
];

const Contact: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: '', company: '', email: '', topic: TOPICS[0], message: '' });

    const set = (field: keyof typeof form) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
            setForm({ ...form, [field]: e.target.value });

    // Static site, no backend: compose the message into a prefilled email instead.
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent(`[${form.topic}] ${form.name}${form.company ? ' · ' + form.company : ''}`);
        const body = encodeURIComponent(
            `${form.message}\n\n—\n${form.name}\n${form.company}\n${form.email}`
        );
        window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
        setSubmitted(true);
    };

    return (
        <div className="relative min-h-screen">
            <div className="grid-bg pointer-events-none absolute inset-0" />
            <div className="pointer-events-none absolute right-1/4 top-0 h-[400px] w-[500px] rounded-full bg-emerald-500/[0.04] blur-3xl" />

            <section className="container relative z-10 mx-auto max-w-5xl px-4 py-20">

                <motion.div {...fadeUp(0)} className="mb-14">
                    <span className="eyebrow">Get in Touch</span>
                    <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
                        Ready to <span className="text-emerald-400">contribute</span> from day one
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
                        Whether it's an operations platform, ERP architecture, production planning or AI tools
                        for the office and the field, reach out and let's talk.
                    </p>
                </motion.div>

                <div className="grid gap-10 lg:grid-cols-2">

                    <motion.div {...fadeUp(0.15)} className="space-y-4">
                        <a href={`mailto:${SITE.email}`}
                            className="panel panel-hover group flex items-center gap-4 p-4">
                            <div className="flex-shrink-0 rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-2.5">
                                <Mail size={16} className="text-emerald-400" />
                            </div>
                            <div>
                                <p className="mb-0.5 font-mono text-xs uppercase tracking-wider text-zinc-600">Email</p>
                                <p className="text-sm font-medium text-zinc-300 transition-colors group-hover:text-emerald-300">{SITE.email}</p>
                            </div>
                        </a>

                        <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer"
                            className="panel panel-hover group flex items-center gap-4 p-4">
                            <div className="flex-shrink-0 rounded-lg border border-sky-400/20 bg-sky-400/5 p-2.5">
                                <Linkedin size={16} className="text-sky-400" />
                            </div>
                            <div>
                                <p className="mb-0.5 font-mono text-xs uppercase tracking-wider text-zinc-600">LinkedIn</p>
                                <p className="text-sm font-medium text-zinc-300 transition-colors group-hover:text-sky-300">{SITE.linkedinHandle}</p>
                            </div>
                        </a>

                        <div className="panel flex items-center gap-4 p-4">
                            <div className="flex-shrink-0 rounded-lg border border-white/[0.08] bg-white/[0.03] p-2.5">
                                <MapPin size={16} className="text-zinc-500" />
                            </div>
                            <div>
                                <p className="mb-0.5 font-mono text-xs uppercase tracking-wider text-zinc-600">Availability</p>
                                <p className="text-sm font-medium text-zinc-400">Open to remote and on-site roles</p>
                            </div>
                        </div>

                        <div className="panel p-6">
                            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-300">
                                <FileText className="text-emerald-400" size={16} />
                                Resume
                            </h3>
                            <a href={asset(SITE.resumeFile)} download={SITE.resumeDownloadName}
                                className="group flex items-center justify-between rounded-xl border border-white/[0.08] bg-black/30 p-4 transition-all duration-300 hover:border-emerald-400/30 hover:bg-emerald-400/[0.03]">
                                <div>
                                    <div className="text-sm font-medium text-zinc-200 transition-colors group-hover:text-emerald-300">Download Full CV</div>
                                    <div className="mt-0.5 text-xs text-zinc-600">PDF · Certifications and project timeline</div>
                                </div>
                                <FileText className="flex-shrink-0 text-zinc-700 transition-colors group-hover:text-emerald-400" size={15} />
                            </a>
                        </div>

                        <div className="panel p-6">
                            <h3 className="mb-4 text-sm font-semibold text-zinc-300">What I bring</h3>
                            <div className="space-y-3">
                                {WHAT_I_BRING.map((item) => (
                                    <div key={item} className="flex items-start gap-3">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                                        <span className="text-sm leading-relaxed text-zinc-500">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div {...fadeUp(0.25)}>
                        <div className="panel h-full p-8">
                            {submitted ? (
                                <div className="flex h-full min-h-[420px] flex-col items-center justify-center space-y-4 text-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
                                        <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                                    </div>
                                    <h3 className="font-display text-xl font-bold text-white">Email Drafted</h3>
                                    <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
                                        Your mail app should have opened with the message ready to send.
                                        I respond to every message personally, usually within 24 hours.
                                    </p>
                                    <button onClick={() => setSubmitted(false)}
                                        className="mt-4 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300">
                                        Write another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="mb-6">
                                        <h3 className="font-display text-xl font-bold text-white">Let's connect</h3>
                                        <p className="mt-1 text-sm text-zinc-500">Tell me about the role or opportunity.</p>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Name</label>
                                            <input required type="text" value={form.name} onChange={set('name')}
                                                className={inputCls} placeholder="Your name" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Company</label>
                                            <input type="text" value={form.company} onChange={set('company')}
                                                className={inputCls} placeholder="Company name" />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Email</label>
                                        <input required type="email" value={form.email} onChange={set('email')}
                                            className={inputCls} placeholder="your@email.com" />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Topic</label>
                                        <select value={form.topic} onChange={set('topic')}
                                            className={`${inputCls} appearance-none`}>
                                            {TOPICS.map((t) => <option key={t}>{t}</option>)}
                                        </select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Message</label>
                                        <textarea rows={4} required value={form.message} onChange={set('message')}
                                            className={`${inputCls} resize-none`}
                                            placeholder="Tell me about the role, project, or what you need..." />
                                    </div>

                                    <button type="submit"
                                        className="flex w-full items-center justify-center rounded-xl bg-emerald-400 py-3.5 font-bold text-ink-950 shadow-lg shadow-emerald-500/15 transition-all duration-300 hover:bg-emerald-300">
                                        <Send className="mr-2 h-4 w-4" />
                                        Send Message
                                    </button>

                                    <p className="text-center text-xs text-zinc-700">
                                        Opens your mail app with the message prefilled. No spam, ever.
                                    </p>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
