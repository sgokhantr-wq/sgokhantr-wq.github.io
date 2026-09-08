#!/usr/bin/env node
/**
 * verify-copy: fail the build on any forbidden string.
 *   node scripts/verify-copy.mjs        → scans src/, index.html, og.html, README.md
 *   node scripts/verify-copy.mjs dist   → scans the built dist/ (html gets every rule; js/css the string-safe subset)
 *
 * The rules encode the site's content contract: the employer, its vendors, customers, lenders
 * and staff are never named; no dollar figure from the company's books; no job / invoice
 * numbers; no model tags. Add a name here the moment it appears anywhere in the research
 * material, before it can reach a copy file.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { extname, join } from 'node:path'

const mode = process.argv[2] === 'dist' ? 'dist' : 'src'
const ROOTS = mode === 'dist' ? ['dist'] : ['src', 'index.html', 'og.html', 'README.md', 'public/robots.txt', 'public/sitemap.txt']
const EXTS = new Set(['.ts', '.tsx', '.css', '.html', '.js', '.md', '.svg', '.txt', '.json'])
const SKIP_DIRS = new Set(['node_modules', 'docs', 'shots', '.git'])

/** { re, why, minified } — `minified: false` rules only run on source and HTML, never on bundled JS/CSS
 *  (minified identifiers and library code produce false positives for short tokens and digit runs). */
const RULES = [
  { re: /\bM3\b/, why: 'employer name', minified: false },
  { re: /m3hvac|m3\s*mechanical/i, why: 'employer domain or name', minified: true },
  { re: /buildops/i, why: 'SaaS vendor name', minified: true },
  { re: /\$\s?\d/, why: 'dollar figure', minified: false },
  { re: /\b(nemotron|glm-?5|minimax|gemma)\b/i, why: 'model tag', minified: true },
  // Job and invoice numbers here are five digits starting 3-5. A number joined by a hyphen is
  // part of a standard's name (MIL-DTL-38999), not a job.
  { re: /(?<![-\w])[3-5]\d{4}(?![-\w])/, why: 'looks like a job or invoice number', minified: false },
  { re: /\b(lessen|sigler|casco|hc pacific|wells fargo|citadel|payrunner|apopka)\b/i, why: 'customer, vendor or lender name', minified: true },
  { re: /\b(Angela|Tony|Rick|Nicholas|Vanessa|Cathy|Francine|Ulloa)\b/, why: 'employee name', minified: false },
]

function* walk(p) {
  let st
  try {
    st = statSync(p)
  } catch {
    return
  }
  if (st.isDirectory()) {
    for (const name of readdirSync(p)) {
      if (SKIP_DIRS.has(name)) continue
      yield* walk(join(p, name))
    }
  } else if (EXTS.has(extname(p))) {
    yield p
  }
}

let files = 0
const hits = []
for (const root of ROOTS) {
  for (const file of walk(root)) {
    files++
    const ext = extname(file)
    const bundled = mode === 'dist' && (ext === '.js' || ext === '.css')
    const text = readFileSync(file, 'utf8')
    const lines = text.split('\n')
    for (const rule of RULES) {
      if (bundled && !rule.minified) continue
      lines.forEach((line, i) => {
        const m = line.match(rule.re)
        if (m) hits.push(`${file}:${i + 1}: [${rule.why}] "${m[0]}"  ←  ${line.trim().slice(0, 120)}`)
      })
    }
  }
}

if (hits.length) {
  console.error(`verify-copy (${mode}): ${hits.length} hit(s) in ${files} files\n` + hits.join('\n'))
  process.exit(1)
}
console.log(`verify-copy (${mode}): ${files} files scanned, 0 hits`)
