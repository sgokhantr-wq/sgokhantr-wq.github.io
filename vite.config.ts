import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// The same source ships to two repositories:
//   sgokhantr-wq/sgokhantr-wq.github.io  → GitHub Pages at the domain root
//   sgokhantr-wq/gokhans                 → Vercel at the domain root, Pages at /gokhans/
// Only a GitHub Actions build of a *project* repo needs a base path, and it can read the
// repo name from the environment, so neither copy has to be edited by hand.
// og.html is a second entry used only by scripts/og-render.mjs to rasterize the Open
// Graph card; it is not linked anywhere.
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const needsProjectBase = !!process.env.GITHUB_ACTIONS && !!repoName && !repoName.endsWith('.github.io')

export default defineConfig({
  base: needsProjectBase ? `/${repoName}/` : '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        og: resolve(__dirname, 'og.html'),
      },
    },
  },
})
