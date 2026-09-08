import React from 'react';
import type { Stat } from '../../types';
import { ACCENTS } from './accents';

/** Compact stat pills (Skills / FieldOps hero). */
export const StatPills: React.FC<{ stats: Stat[] }> = ({ stats }) => (
    <div className="flex flex-wrap justify-center gap-4">
        {stats.map((s) => (
            <div key={s.label} className="panel px-5 py-3 text-center">
                <p className={`font-mono text-xl font-bold ${ACCENTS[s.accent ?? 'emerald'].text}`}>{s.value}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{s.label}</p>
            </div>
        ))}
    </div>
);
