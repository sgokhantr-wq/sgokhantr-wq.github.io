/** Site-wide constants. Every dated figure on the sheet reads MEASURED_ON from here. */
export const SITE = {
  name: 'Gokhan Sahin',
  short: 'G. Sahin',
  role: 'systems designer & tools builder',
  email: 'gokusahin@gmail.com',
  linkedin: 'https://www.linkedin.com/in/gokhan-sahin-417b8a171',
  linkedinHandle: 'linkedin.com/in/gokhan-sahin-417b8a171',
  github: 'https://github.com/sgokhantr-wq',
  githubHandle: 'github.com/sgokhantr-wq',
  url: 'https://sgokhantr-wq.github.io/',
  previousSite: 'https://sgokhantr-wq.github.io/gokhans/',
  previousSiteLabel: 'sgokhantr-wq.github.io/gokhans',
  resumeFile: '/resume.pdf',
  resumeDownloadName: 'Gokhan_Sahin_Resume.pdf',
  measuredOn: '2026-09-07',
  workStart: '2026-05-14',
  workTo: '2026-09-07',
  weeks: 17,
  employer: 'a commercial HVAC & mechanical contractor (~70 field staff, ~200 live jobs)',
  descriptionOfWork: 'A field-service ERP and its AI layer, built alone in seventeen weeks.',
  standfirst:
    'Since 14 May 2026 I have been building FieldOps solo: a field-service ERP on Frappe/ERPNext for a commercial HVAC & mechanical contractor (~70 field staff, ~200 live jobs). Centaurus is the AI layer inside it. This sheet is what you need to decide whether to call.',
  stackLine: 'Python · Frappe v15 · ERPNext · MariaDB · DuckDB · openpyxl · Playwright · jsdom · Telegram Bot API · Ollama',
} as const

export const NAV = [
  { href: '#replaced', label: 'Replaced' },
  { href: '#fieldops', label: 'FieldOps' },
  { href: '#crew', label: 'Crew' },
  { href: '#centaurus', label: 'Centaurus' },
  { href: '#verification', label: 'Verified' },
  { href: '#build-log', label: 'Build log' },
  { href: '#about', label: 'About' },
] as const
