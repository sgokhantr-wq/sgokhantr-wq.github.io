import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, TerminalSquare, Linkedin } from 'lucide-react';
import { NAV_LINKS, SITE } from '../content/site';

const links = NAV_LINKS.filter((l) => l.kind !== 'cta');
const cta = NAV_LINKS.find((l) => l.kind === 'cta');

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                scrolled || isOpen
                    ? 'border-b border-white/[0.07] bg-ink-950/85 backdrop-blur-xl'
                    : 'border-b border-transparent bg-transparent'
            }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="group flex items-center gap-2.5">
                        <div className="rounded-lg border border-emerald-400/25 bg-emerald-400/10 p-1.5 transition-colors group-hover:bg-emerald-400/20">
                            <TerminalSquare size={18} className="text-emerald-400" />
                        </div>
                        <span className="font-display text-base font-semibold tracking-tight text-white">
                            gokhan<span className="text-emerald-400">.sahin</span>
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden items-center gap-1 md:flex">
                        {links.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                                    isActive(link.to)
                                        ? 'bg-white/[0.06] text-white'
                                        : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <a
                            href={SITE.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn profile"
                            className="ml-1 rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-white"
                        >
                            <Linkedin size={16} />
                        </a>
                        {cta && (
                            <Link
                                to={cta.to}
                                className="ml-2 rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-ink-950 transition-colors hover:bg-emerald-300"
                            >
                                {cta.label}
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="rounded-lg p-2 text-zinc-300 hover:bg-white/[0.06] hover:text-white md:hidden"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile nav */}
            {isOpen && (
                <div className="border-b border-white/[0.07] bg-ink-950/95 backdrop-blur-xl md:hidden">
                    <div className="space-y-1 px-4 pb-6 pt-2">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setIsOpen(false)}
                                className={`block rounded-lg px-3 py-2.5 text-base font-medium ${
                                    isActive(link.to)
                                        ? 'bg-white/[0.06] text-emerald-400'
                                        : link.kind === 'cta'
                                            ? 'text-emerald-300 hover:bg-emerald-400/10'
                                            : 'text-zinc-300 hover:bg-white/[0.04] hover:text-white'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <a
                            href={SITE.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block rounded-lg px-3 py-2.5 text-base font-medium text-zinc-300 hover:bg-white/[0.04] hover:text-white"
                        >
                            LinkedIn ↗
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
