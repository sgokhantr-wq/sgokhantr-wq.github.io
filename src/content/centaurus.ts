import { Bell, Bot, Camera, Compass, Database, ListChecks } from 'lucide-react';
import type { CentaurusContent } from '../types';

export const CENTAURUS: CentaurusContent = {
    badge: 'Built and deployed twice · 2025 manufacturing · 2026 field service',
    sub: 'An AI layer that lives inside the ERP, answers from the data, and refuses to invent.',
    intro: [
        'Centaurus started in 2025 as an email-to-quote agent at a connector manufacturer: forwarded customer inquiries in, structured draft quotes out, a human approving every one. In 2026 it became the AI module of a field-service ERP I built from scratch.',
        'The second version is a config-driven module inside the application: one settings record, one client, provider-swappable between a self-hosted Ollama model and the Anthropic API, with every call proxied through the backend. The interesting work is not the model. It is everything that stops the model from being confidently wrong.',
    ],
    capabilities: [
        { icon: Database, title: 'Governed read-only SQL', desc: 'The assistant writes its own queries against a curated table allowlist: SELECT only, single statement, comments and string literals blanked before the keyword scan, a 200-row cap, a statement timeout, and every query audited.' },
        { icon: ListChecks, title: 'Metric registry', desc: '"How is this figure calculated?" is answered only from a hand-written registry of formulas, source columns and exclusions. Each entry carries an anchor so a self-test reports when the code underneath it was rewritten.' },
        { icon: Compass, title: 'Navigation with live screenshots', desc: '"How do I get to X?" returns click steps derived live from the workspace records plus a screenshot with the tile ringed. A staleness guard withholds the image rather than ringing the wrong tile.' },
        { icon: Bot, title: 'Telegram hotline for technicians', desc: 'Direct messages to the job bot are answered as an HR and office assistant. Technicians get eight identity-bound tools and no SQL; the employee id is a closure, never a model argument.' },
        { icon: Camera, title: 'Photo and chat intelligence', desc: 'A vision model describes every jobsite photo (30,926 so far) and a two-level reasoner reads crew chat per job-day, proposing progress percentages with evidence notes for the billing team to review.' },
        { icon: Bell, title: 'Recommendation queue with a materiality gate', desc: 'Action items are validated (can the evidence support this?) and separately scored for materiality (is it worth interrupting the office?). A re-score cut 116 open items to 37 without deleting anything.' },
    ],
    guardrails: [
        { title: 'Finance-column gate', desc: 'A finance role gates whole tables and named columns anywhere in the statement, WHERE clauses included, with post-hoc result redaction because SELECT * only expands at the database. Refusals name the near miss.', evidence: '31 adversarial cases, all blocked' },
        { title: 'Mirror-trap guard', desc: 'Thirty of forty readable tables carry a sync timestamp on every row. The data-access layer refuses any query that treats it as business time and names the right column instead, so "what was created today" is answered on the first query.', evidence: '5+ refused attempts → 1 query' },
        { title: 'Fabrication guard', desc: 'Asked for a job address, the model once returned an invented one in 718 ms with zero tool calls, reproducibly 2 times in 4. A heuristic now forces a tool call, discards a tool-less answer, allows one nudged retry, then refuses.', evidence: '6 of 6 correct after the fix' },
        { title: 'Thinking-spill repair', desc: 'Roughly one reply in seven from a reasoning model lost the opening characters of its answer into the thinking field (".73 hours" for "29.73 hours"). A boundary-detection repair with four guards fixes it, covered by a 14-case unit test.', evidence: '4 of 15 mangled → 0' },
        { title: 'Guaranteed non-empty answers', desc: 'Replies hit the token cap mid-thought and surfaced as "(no response)". A per-turn token floor, a tool-less re-ask path and a labelled diagnostic mean the user always sees something honest.', evidence: 'Root-caused, not patched' },
    ],
    versions: [
        { version: 'v1', year: '2025', title: 'Email-to-quote agent', desc: 'Inbox watcher → fine-tuned open-source model → catalog matching in Business Central → human review gate. Ran in production at a MIL-SPEC connector manufacturer.' },
        { version: 'v2', year: '2026', title: 'The ERP\'s AI layer', desc: 'Governed SQL, metric registry, navigation help, a technician hotline, photo and chat intelligence, and a materiality-gated recommendation queue, inside a field-service ERP.' },
    ],
    stack: ['Ollama', 'Anthropic API', 'Tool calling', 'Python', 'Frappe', 'Playwright', 'Telegram Bot API'],
};
