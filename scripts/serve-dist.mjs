/** A tiny static server over dist/ for the render and screenshot scripts. */
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain',
  '.pdf': 'application/pdf',
}

export function serveDist(port, dir = 'dist') {
  const server = createServer(async (req, res) => {
    let p = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname)
    if (p.endsWith('/')) p += 'index.html'
    const file = normalize(join(dir, p))
    try {
      const data = await readFile(file)
      res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' })
      res.end(data)
    } catch {
      res.writeHead(404, { 'content-type': 'text/plain' })
      res.end('not found')
    }
  })
  return new Promise((resolve) => server.listen(port, () => resolve(server)))
}

export const CHROME = process.env.CHROME ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
export const CHROME_ARGS = ['--use-angle=swiftshader', '--enable-unsafe-swiftshader']
