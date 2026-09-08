/** The header totals row. Re-measure with the `method` command, then bump SITE.measuredOn. */
export interface Total {
  label: string
  value: string
  detail?: string
  method: string
}

export const TOTALS: Total[] = [
  {
    label: 'Desk pages',
    value: '68',
    method: 'ls -d apps/fieldops/fieldops/*/page/*/ | grep -v __pycache__ | wc -l',
  },
  {
    label: 'Doctypes',
    value: '364',
    detail: '137 mirror the field-service SaaS',
    method: 'ls -d apps/fieldops/fieldops/*/doctype/*/ | grep -v __pycache__ | wc -l',
  },
  {
    label: 'Whitelisted endpoints',
    value: '547',
    method: 'grep -r "@frappe.whitelist" --include=*.py apps/fieldops | wc -l',
  },
  {
    label: 'Lines authored',
    value: '~227K',
    detail: '129.7K Python · 87.1K JS · 10.3K HTML',
    method: 'find . -name "*.py" -o -name "*.js" -o -name "*.html" | xargs wc -l (generated JSON schema excluded)',
  },
  {
    label: 'Workspaces',
    value: '15',
    method: 'ls -d apps/fieldops/fieldops/*/workspace/*/ | grep -v __pycache__ | wc -l',
  },
  {
    label: 'Test scripts',
    value: '204',
    detail: 'across 4 harness directories',
    method: 'ls <harness dir> | wc -l for pt_tests, centaurus_tests, nav_tests, wip_tests; summed',
  },
  {
    label: 'Scheduled handlers',
    value: '24',
    detail: '9 cron specs',
    method: 'ast.parse(hooks.py) → len() of each scheduler_events list',
  },
]

export const MIRRORED = [
  { label: 'jobs', value: '8,230' },
  { label: 'visits', value: '53,378' },
  { label: 'quotes', value: '8,093' },
  { label: 'invoices', value: '7,579' },
  { label: 'AI photo insights', value: '32,921' },
]

export const FEEDS = [
  'the field-service SaaS export, every two hours',
  'a five-minute API poller for new jobs',
  'a staged accounting extract with anchor figures asserted on every load',
  'spreadsheet imports with an upsert contract',
  'the crew, through a messaging bot',
]

export const MEASURED_STAMP = { label: 'Measured 2026-09-07', sub: 'read-only count · JSON schema excluded' }
