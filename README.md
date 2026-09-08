# gokhan.sahin — personal website

Personal site of Gokhan Sahin: systems designer & tools builder for manufacturing and
field-service operations (ERP architecture, planning engines, data pipelines, AI automation).

**Live:** https://sgokhantr-wq.github.io/gokhans/

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS · framer-motion · recharts · three.js

## Pages

| Route | What it is |
|---|---|
| `/` | Home — animated terminal, system architecture map, tools bento, stats |
| `/fieldops` | Platform deep-dive — the 2026 field-service ERP: architecture, 40 modules, integrations, verification, timeline |
| `/portfolio` | Case studies in two groups: the field-service ERP platform (2026) and earlier manufacturing work |
| `/centaurus` | Centaurus AI — the ERP's AI layer: capabilities, guardrails, two deployments (three.js) |
| `/live-demo` | Interactive production-planning simulators (MRP, BOM netting, digital twin) |
| `/skills` | Full skill profile: systems design, tool building, operations leadership |
| `/contact` | Contact info + form (opens a prefilled email — no backend needed) |

Heavy pages (`/fieldops`, `/live-demo`, `/centaurus`) are lazy-loaded so the home page stays light.

## Where the content lives

All copy and data is in `src/content/` (typed by `src/types.ts`); components only render it.

| File | Drives |
|---|---|
| `site.ts` | Name, email, LinkedIn, resume filename, the nav (navbar + mobile menu + footer) |
| `tools.ts` | Home bento tiles |
| `stats.ts` | Home stat row, Skills stat pills |
| `terminal.ts` | The animated terminal script |
| `stack.ts` | Home marquee |
| `architecture.ts` | Home architecture map (nodes + edges) |
| `caseStudies.ts` | Portfolio groups and cards |
| `fieldops.ts` | Everything on `/fieldops` |
| `centaurus.ts` | Everything on `/centaurus` |
| `skills.ts` | Skill sections |

Colours in content are `accent` keys (`emerald` / `sky` / `amber` / `zinc`) resolved by
`src/components/ui/accents.ts`, so Tailwind always sees the full class names.

## Development

```bash
npm install
npm run dev       # local dev server (served at /)
npm run lint
npm run build     # typecheck + production build to dist/
npm run preview   # serve the production build locally at http://localhost:4173/
```

## Deployment

Every push to `main` deploys twice: Vercel builds it at the domain root, and
`.github/workflows/deploy.yml` lints, builds and publishes `dist/` to GitHub Pages under
`/gokhans/`. `vite.config.ts` picks the base path from the `GITHUB_ACTIONS` env var, and
`src/lib/assets.ts` resolves `public/` files against whichever base is active.

Routing uses `HashRouter`, so deep links are `/#/route` (or `/gokhans/#/route` on Pages) and no 404 fallback is needed.
