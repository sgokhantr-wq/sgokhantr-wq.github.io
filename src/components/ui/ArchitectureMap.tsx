import React from 'react';
import type { Accent, ArchitectureMapSpec, ArchitectureNode } from '../../types';
import { ACCENT_HEX } from './accents';

const NODE_STROKE: Record<Accent, string> = {
    emerald: '#34d39966',
    sky: '#38bdf866',
    amber: '#fbbf2466',
    zinc: '#3f3f46',
};

const MapNode: React.FC<ArchitectureNode> = ({ x, y, w = 150, label, sub, accent = 'zinc' }) => {
    const h = sub ? 52 : 40;
    return (
        <g>
            <rect x={x} y={y} width={w} height={h} rx={10} fill="#101014" stroke={NODE_STROKE[accent]} strokeWidth={1.2} />
            <text x={x + w / 2} y={y + (sub ? 22 : 25)} textAnchor="middle" fill={ACCENT_HEX[accent]}
                style={{ font: '600 11.5px "JetBrains Mono", monospace' }}>{label}</text>
            {sub && (
                <text x={x + w / 2} y={y + 38} textAnchor="middle" fill="#52525b"
                    style={{ font: '400 9.5px "JetBrains Mono", monospace' }}>{sub}</text>
            )}
        </g>
    );
};

const FlowPath: React.FC<{ d: string; color: string; dim?: boolean }> = ({ d, color, dim }) => (
    <>
        <path d={d} fill="none" stroke="#27272a" strokeWidth={1.5} />
        <path d={d} fill="none" stroke={color} strokeWidth={1.5} strokeDasharray="4 10"
            strokeLinecap="round" className="animate-flow-dash" opacity={dim ? 0.4 : 0.85} />
    </>
);

/** Animated SVG system diagram driven by a content spec. */
export const ArchitectureMap: React.FC<{ spec: ArchitectureMapSpec }> = ({ spec }) => (
    <div className="panel relative overflow-hidden p-4 sm:p-8">
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />
        <div className="relative mb-6 flex items-center justify-between gap-4">
            <p className="font-mono text-xs tracking-[0.2em] text-zinc-500">{spec.title}</p>
            {spec.badge && (
                <span className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 font-mono text-[10px] text-emerald-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> {spec.badge}
                </span>
            )}
        </div>
        <svg viewBox={`0 0 ${spec.viewBox.w} ${spec.viewBox.h}`} className="relative w-full">
            {spec.edges.map((e, i) => (
                <FlowPath key={i} d={e.d} color={ACCENT_HEX[e.accent ?? 'emerald']} dim={e.dim} />
            ))}
            {spec.nodes.map((n) => <MapNode key={n.id} {...n} />)}
            {spec.caption && (
                <text x={spec.caption.x} y={spec.caption.y} fill="#52525b" style={{ font: '400 10px "JetBrains Mono", monospace' }}>
                    {spec.caption.text}
                </text>
            )}
        </svg>
    </div>
);
