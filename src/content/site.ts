/** Site-wide constants. Every dated figure reads measuredOn from here. */
export const SITE = {
  name: 'Gokhan Sahin',
  short: 'G. Sahin',
  role: 'Systems designer & tools builder',
  email: 'gokusahin@gmail.com',
  linkedin: 'https://www.linkedin.com/in/gokhan-sahin-417b8a171',
  linkedinHandle: 'linkedin.com/in/gokhan-sahin-417b8a171',
  github: 'https://github.com/sgokhantr-wq',
  githubHandle: 'github.com/sgokhantr-wq',
  url: 'https://sgokhantr-wq.github.io/',
  resumeFile: '/resume.pdf',
  resumeDownloadName: 'Gokhan_Sahin_Resume.pdf',
  measuredOn: '2026-09-07',
  workStart: '14 May 2026',

  headline: 'I built a field-service ERP and its AI layer.',
  headlineAccent: 'Alone. In seventeen weeks.',
  lede: 'For a commercial HVAC & mechanical contractor with about 70 field staff and 200 live jobs. Scheduling, cash flow, billing, procurement, field comms and an AI assistant, on one workstation.',
  footer: 'Every figure measured 7 September 2026. Every screen on this page uses synthetic data.',
} as const

export const NAV = [
  { href: '#platform', label: 'The platform' },
  { href: '#ai', label: 'Centaurus AI' },
  { href: '#proof', label: 'Proof' },
  { href: '#about', label: 'About' },
] as const

export const HERO_STATS = [
  { v: '68', l: 'desk pages' },
  { v: '364', l: 'doctypes' },
  { v: '547', l: 'API endpoints' },
  { v: '227K', l: 'lines of code' },
]
