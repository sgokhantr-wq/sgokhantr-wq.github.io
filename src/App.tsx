import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Linkedin, Mail, TerminalSquare } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import SkillSet from './components/SkillSet';
import { NAV_LINKS, SITE } from './content/site';
import { asset } from './lib/assets';

// Heavy pages (recharts / three.js / the platform deep-dive) load on demand so the home page stays light
const ProductionPlanningDemo = lazy(() => import('./components/ProductionPlanningDemo'));
const CentaurusAI = lazy(() => import('./components/CentaurusAI'));
const FieldOps = lazy(() => import('./components/FieldOps'));

const PageLoader: React.FC = () => (
    <div className="flex min-h-[60vh] items-center justify-center">
        <span className="font-mono text-sm text-zinc-500">
            loading<span className="animate-blink text-emerald-400">_</span>
        </span>
    </div>
);

const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const exploreLinks = NAV_LINKS.filter((l) => l.kind !== 'cta' && l.to !== '/');

const Footer: React.FC = () => (
    <footer className="border-t border-white/[0.06] bg-ink-900">
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
                <div className="text-center md:text-left">
                    <div className="flex items-center justify-center gap-2.5 md:justify-start">
                        <div className="rounded-lg border border-emerald-400/25 bg-emerald-400/10 p-1.5">
                            <TerminalSquare size={16} className="text-emerald-400" />
                        </div>
                        <span className="font-display text-base font-semibold text-white">
                            gokhan<span className="text-emerald-400">.sahin</span>
                        </span>
                    </div>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
                        {SITE.tagline}
                    </p>
                </div>

                <div className="flex gap-12 text-sm">
                    <div className="space-y-2.5">
                        <p className="font-mono text-xs uppercase tracking-widest text-zinc-600">Explore</p>
                        {exploreLinks.map((l) => (
                            <Link key={l.to} to={l.to} className="block text-zinc-400 transition-colors hover:text-emerald-400">{l.label}</Link>
                        ))}
                    </div>
                    <div className="space-y-2.5">
                        <p className="font-mono text-xs uppercase tracking-widest text-zinc-600">Connect</p>
                        <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-emerald-400">
                            <Mail size={14} /> Email
                        </a>
                        <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-emerald-400">
                            <Linkedin size={14} /> LinkedIn
                        </a>
                        <a href={asset(SITE.resumeFile)} download={SITE.resumeDownloadName} className="block text-zinc-400 transition-colors hover:text-emerald-400">
                            Resume (PDF)
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-10 border-t border-white/[0.06] pt-6 text-center font-mono text-xs text-zinc-600">
                © {new Date().getFullYear()} {SITE.name} · designed & built by me, naturally
            </div>
        </div>
    </footer>
);

const App: React.FC = () => {
    return (
        <HashRouter>
            <ScrollToTop />
            <div className="flex min-h-screen flex-col bg-ink-950 text-zinc-300">
                <Navbar />
                <main className="flex-grow pt-16">
                    <Suspense fallback={<PageLoader />}>
                        <Routes>
                            <Route path="/" element={<Hero />} />
                            <Route path="/fieldops" element={<FieldOps />} />
                            <Route path="/live-demo" element={<ProductionPlanningDemo />} />
                            <Route path="/centaurus" element={<CentaurusAI />} />
                            <Route path="/skills" element={<SkillSet />} />
                            <Route path="/portfolio" element={<Portfolio />} />
                            <Route path="/contact" element={<Contact />} />
                        </Routes>
                    </Suspense>
                </main>
                <Footer />
            </div>
        </HashRouter>
    );
};

export default App;
