import type { LucideIcon } from 'lucide-react';

/* Shared content types. Content modules in src/content/ carry `accent` keys,
   never Tailwind class strings, so the Tailwind scanner sees every class it
   needs in src/components/ui/accents.ts. */

export type Accent = 'emerald' | 'sky' | 'amber' | 'zinc';

export interface Stat {
    value: string;
    label: string;
    accent?: Accent;
}

export interface NavLink {
    label: string;
    to: string;
    kind?: 'link' | 'cta';
}

export interface SiteMeta {
    name: string;
    email: string;
    linkedin: string;
    linkedinHandle: string;
    github: string;
    resumeFile: string;
    resumeDownloadName: string;
    tagline: string;
}

export interface Tool {
    icon: LucideIcon;
    name: string;
    desc: string;
    tags: string[];
    metric: string;
    to?: string;
    size?: 'default' | 'big' | 'wide';
}

export interface Principle {
    icon: LucideIcon;
    title: string;
    desc: string;
}

export type TermLineKind = 'cmd' | 'out' | 'ok' | 'warn';
export interface TermLine {
    kind: TermLineKind;
    text: string;
}
export interface TerminalEntry {
    cmd: string;
    out: TermLine[];
}

export interface Skill {
    icon: LucideIcon;
    title: string;
    desc: string;
}
export interface SkillSection {
    id: string;
    label: string;
    accent: Accent;
    title: string;
    subtitle: string;
    skills: Skill[];
}

export type CaseStudyGroupId = 'fieldops' | 'manufacturing';
export interface CaseStudyGroup {
    id: CaseStudyGroupId;
    eyebrow: string;
    title: string;
    blurb: string;
}
export interface CaseStudy {
    id: string;
    group: CaseStudyGroupId;
    featured?: boolean;
    icon: LucideIcon;
    title: string;
    problem: string;
    system: string;
    tools: string;
    tags: string[];
    results: string[];
    link?: { to: string; label: string };
}

export interface ArchitectureNode {
    id: string;
    x: number;
    y: number;
    w?: number;
    label: string;
    sub?: string;
    accent?: Accent;
}
export interface ArchitectureEdge {
    d: string;
    accent?: Accent;
    dim?: boolean;
}
export interface ArchitectureMapSpec {
    title: string;
    badge?: string;
    viewBox: { w: number; h: number };
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
    caption?: { x: number; y: number; text: string };
}

export type FieldOpsDomain =
    | 'scheduling'
    | 'finance'
    | 'procurement'
    | 'ai'
    | 'field-comms'
    | 'hr'
    | 'sales';

export interface FieldOpsDomainMeta {
    id: FieldOpsDomain;
    label: string;
    accent: Accent;
    icon: LucideIcon;
    blurb: string;
}
export interface FieldOpsModule {
    domain: FieldOpsDomain;
    icon: LucideIcon;
    name: string;
    summary: string;
    tags?: string[];
}
export interface Integration {
    icon: LucideIcon;
    name: string;
    desc: string;
    evidence: string;
}
export interface VerificationItem {
    icon: LucideIcon;
    title: string;
    desc: string;
    evidence?: string;
}
export interface TimelineEntry {
    month: string;
    label: string;
    title: string;
    desc: string;
    milestone?: boolean;
}
export interface FieldOpsContent {
    hero: {
        eyebrow: string;
        headline: string;
        highlight: string;
        sub: string;
        stats: Stat[];
    };
    architecture: ArchitectureMapSpec;
    domains: FieldOpsDomainMeta[];
    modules: FieldOpsModule[];
    integrations: Integration[];
    verification: VerificationItem[];
    verificationPrinciple: string;
    timeline: TimelineEntry[];
    stack: string[];
}

export interface CentaurusCapability {
    icon: LucideIcon;
    title: string;
    desc: string;
}
export interface CentaurusGuardrail {
    title: string;
    desc: string;
    evidence?: string;
}
export interface CentaurusVersion {
    version: string;
    year: string;
    title: string;
    desc: string;
}
export interface CentaurusContent {
    badge: string;
    sub: string;
    intro: string[];
    capabilities: CentaurusCapability[];
    guardrails: CentaurusGuardrail[];
    versions: CentaurusVersion[];
    stack: string[];
}
