import React from 'react';

/** Mono tag chip used on tool tiles, case studies and module cards. */
export const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-zinc-400">
        {children}
    </span>
);
