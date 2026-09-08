import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The site is served from two roots at once:
//  - Vercel (and local dev/preview) serve it at the domain root
//  - GitHub Pages serves a project repo under /<repo>/, and a user repo at the root
// Deriving the base from GITHUB_REPOSITORY means neither copy has to be edited by hand.
// src/lib/assets.ts reads import.meta.env.BASE_URL, so public/ links follow the active base.
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const needsProjectBase = !!process.env.GITHUB_ACTIONS && !!repoName && !repoName.endsWith('.github.io')

export default defineConfig({
  base: needsProjectBase ? `/${repoName}/` : '/',
  plugins: [react()],
})
