# sgokhantr-wq.github.io

Gokhan Sahin's personal site: one sheet promoting **FieldOps** (a field-service ERP built solo on
Frappe/ERPNext since 2026-05-14) and **Centaurus AI** (its AI layer) to hiring managers.
Live at https://sgokhantr-wq.github.io/.

The design is a filled-in contractor's form: the "Continuation Sheet". Steel-biased paper, blue-black
ink, one safety-orange stamp colour, a condensed industrial display face, a quiet humanist body and a
cockpit mono for every figure. No hero, no gradients, no icons, radius 0. Every section is a document
with ruled columns carrying real, measured engineering numbers; every mockup carries synthetic data.

## Stack

Vite 7 · React 19 · TypeScript · plain CSS (tokens + CSS Modules) · self-hosted fonts via @fontsource.
No Tailwind, no animation library, no router, no icon or chart library.

```
npm install
npm run dev        # http://localhost:5173
npm run lint       # eslint + the copy contract (scripts/verify-copy.mjs)
npm run build      # tsc -b, vite build, then verify-copy over dist/
npm run og         # after build: rasterize og.html → public/og.png (needs Chrome on this machine)
npm run shoot      # after build: screenshots + overflow/opacity/focus/banned-text checks → shots/
```

Deploys to GitHub Pages from `main` via `.github/workflows/deploy.yml`. `og.png` is committed, not
rendered in CI.

## Where things live

- `src/content/` — all copy. `proof.ts` is the registry of every claim with the number behind it;
  `totals.ts` the header totals with the command that measured each; `milestones.ts` the build log;
  `replaced.ts`, `earlier.ts`, `withheld.ts`, `site.ts`.
- `src/components/` — the form primitives: `Stamp`, `DocumentFrame`, `Register`, `Section`, `Note`,
  `SheetHeader`, `SignatureBlock`, `Nav`, `ThemeToggle`, `OgCard`.
- `src/mockups/` — the eight illustrated documents (month board, 13-week cash grid, certificate lines,
  G703 sheet, job topic, Centaurus chat, guard log, build grid). Each ships its own `data.ts` headed
  "synthetic".
- `src/styles/tokens.css` — both themes at token level. `base.css` — reset and shared primitives.

## The content contract (enforced by `scripts/verify-copy.mjs`)

- The employer is "a commercial HVAC & mechanical contractor (~70 field staff, ~200 live jobs)".
  Never its name or domain.
- The field-service SaaS is "the field-service SaaS". Never the vendor.
- No absolute dollar figure from the company's books. Engineering scale, record volumes,
  percentages, X→Y improvements, timings and test counts are fine.
- No customer, employee, lender or vendor names. No job, quote or invoice numbers.
- No model tags: "a hosted open-weight model via Ollama".
- Withheld on purpose (kept as `publishable: false` in `proof.ts` so they cannot be re-added by
  accident): backlog-vs-capacity hours, per-job dollar magnitudes, tax-compliance stats, security
  findings, the model-egress story, headcount reconciliations, customer/city counts, endpoint
  re-gating, and anything recorded as unproven live.

## Re-measuring the totals

Each entry in `src/content/totals.ts` carries the command that produced it. Re-run them against the
bench, update the values, and bump `SITE.measuredOn` in `src/content/site.ts`; every stamp and the
footer read that constant.
