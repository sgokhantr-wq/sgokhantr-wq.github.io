import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// This is the GitHub *user* site (sgokhantr-wq.github.io), so it is served from the
// domain root and needs no base path. og.html is a second entry used only by
// scripts/og-render.mjs to rasterize the Open Graph card; it is not linked anywhere.
export default defineConfig({
  base: '/',
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
