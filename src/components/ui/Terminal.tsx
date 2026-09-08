import React, { useEffect, useState } from 'react';
import type { TermLine, TerminalEntry } from '../../types';

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** Animated typing terminal that loops over a content script. */
export const Terminal: React.FC<{ script: TerminalEntry[]; title: string }> = ({ script, title }) => {
    const [lines, setLines] = useState<TermLine[]>([]);
    const [typing, setTyping] = useState('');

    useEffect(() => {
        let cancelled = false;
        const run = async () => {
            while (!cancelled) {
                for (const entry of script) {
                    if (cancelled) return;
                    for (let i = 1; i <= entry.cmd.length; i++) {
                        if (cancelled) return;
                        setTyping(entry.cmd.slice(0, i));
                        await sleep(26);
                    }
                    await sleep(350);
                    setTyping('');
                    setLines((prev) => [...prev.slice(-9), { kind: 'cmd', text: entry.cmd }]);
                    for (const out of entry.out) {
                        if (cancelled) return;
                        await sleep(520);
                        setLines((prev) => [...prev.slice(-9), out]);
                    }
                    await sleep(2200);
                }
                setLines([]);
            }
        };
        run();
        return () => { cancelled = true; };
    }, [script]);

    const lineColor = (kind: TermLine['kind']) =>
        kind === 'cmd' ? 'text-zinc-100'
            : kind === 'ok' ? 'text-emerald-400'
                : kind === 'warn' ? 'text-amber-400'
                    : 'text-zinc-500';

    return (
        <div className="panel overflow-hidden shadow-2xl shadow-black/60">
            <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.02] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-3 font-mono text-xs text-zinc-500">{title}</span>
            </div>
            <div className="h-[340px] space-y-2 overflow-hidden p-5 font-mono text-[13px] leading-relaxed">
                {lines.map((l, i) => (
                    <div key={i} className={lineColor(l.kind)}>
                        {l.kind === 'cmd'
                            ? <span className="text-emerald-400">$ </span>
                            : <span className="text-zinc-700">{l.kind === 'warn' ? '⚠ ' : l.kind === 'ok' ? '✓ ' : '→ '}</span>}
                        {l.text}
                    </div>
                ))}
                <div className="text-zinc-100">
                    <span className="text-emerald-400">$ </span>
                    {typing}
                    <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-emerald-400 animate-blink" />
                </div>
            </div>
        </div>
    );
};
