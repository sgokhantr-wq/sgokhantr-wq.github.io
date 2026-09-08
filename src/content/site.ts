import type { NavLink, SiteMeta } from '../types';

export const SITE: SiteMeta = {
    name: 'Gokhan Sahin',
    email: 'gokusahin@gmail.com',
    linkedin: 'https://www.linkedin.com/in/gokhan-sahin-417b8a171/',
    linkedinHandle: 'gokhan-sahin-417b8a171',
    github: 'https://github.com/sgokhantr-wq',
    resumeFile: 'resume.pdf',
    resumeDownloadName: 'Gokhan_Sahin_Resume.pdf',
    tagline: 'Systems designer & tools builder for manufacturing and field-service operations. Turning signals into decisions.',
};

/** Single source of truth for the navbar, mobile menu and footer. */
export const NAV_LINKS: NavLink[] = [
    { label: 'Home', to: '/' },
    { label: 'Platform', to: '/fieldops' },
    { label: 'Work', to: '/portfolio' },
    { label: 'Centaurus AI', to: '/centaurus' },
    { label: 'Live Demo', to: '/live-demo' },
    { label: 'Skills', to: '/skills' },
    { label: 'Contact', to: '/contact', kind: 'cta' },
];
