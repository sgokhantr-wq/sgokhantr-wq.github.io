import { Crosshair, Network, Users } from 'lucide-react';
import type { Principle } from '../types';

export const PRINCIPLES: Principle[] = [
    {
        icon: Crosshair,
        title: 'Constraint first',
        desc: 'Every system starts at the bottleneck. Find where delay is created, design around it, automate what remains. Theory of Constraints applied daily.',
    },
    {
        icon: Network,
        title: 'Signals over reports',
        desc: 'Dashboards describe yesterday. I design pipelines that turn raw events (emails, ledgers, clock punches, crew chat) into triggers people can act on today.',
    },
    {
        icon: Users,
        title: 'Human + AI, by design',
        desc: 'AI drafts, humans decide. Each tool I ship keeps accountability visible: who changed what, when, and why it was suggested. And it measures instead of asserting.',
    },
];
