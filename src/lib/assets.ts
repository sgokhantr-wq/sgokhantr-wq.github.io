/** Resolve a public/ asset against Vite's base path (the site is served under /gokhans/ on GitHub Pages). */
export const asset = (path: string): string => import.meta.env.BASE_URL + path.replace(/^\//, '');
