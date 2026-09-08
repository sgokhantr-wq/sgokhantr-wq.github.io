/**
 * Resolve a file in public/ against whatever base the build was made with.
 * The same source ships to two repositories: the user site and the Vercel-hosted
 * project repo, whose GitHub Pages build is served from /<repo>/. A hard-coded
 * "/resume.pdf" works on one and 404s on the other.
 */
export const asset = (path: string): string => import.meta.env.BASE_URL + path.replace(/^\//, '')
