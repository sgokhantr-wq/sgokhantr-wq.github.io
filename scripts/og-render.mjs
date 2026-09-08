#!/usr/bin/env node
/**
 * Rasterize the Open Graph card: dist/og.html → public/og.png (and dist/og.png).
 * Run after `vite build`. Uses the installed Chrome through playwright-core; light theme only.
 */
import { copyFile } from 'node:fs/promises'
import { chromium } from 'playwright-core'
import { CHROME, CHROME_ARGS, serveDist } from './serve-dist.mjs'

const PORT = 4174
const server = await serveDist(PORT)
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: CHROME_ARGS })
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, colorScheme: 'light' })
  await page.goto(`http://localhost:${PORT}/og.html`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(300)
  await page.screenshot({ path: 'public/og.png', clip: { x: 0, y: 0, width: 1200, height: 630 } })
  await copyFile('public/og.png', 'dist/og.png')
  console.log('og-render: wrote public/og.png and dist/og.png (1200×630)')
} finally {
  await browser.close()
  server.close()
}
