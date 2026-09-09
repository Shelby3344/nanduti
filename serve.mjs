import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('./site/', import.meta.url)));
const T = {
  '.html': 'text/html;charset=utf-8',
  '.css':  'text/css;charset=utf-8',
  '.js':   'text/javascript;charset=utf-8',
  '.svg':  'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg':  'image/jpeg',
  '.png':  'image/png',
  '.woff2':'font/woff2',
};

createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const rel = normalize(p).replace(/^[/\\]+/, '');
  const abs = resolve(join(ROOT, rel));
  if (abs !== ROOT && !abs.startsWith(ROOT + sep)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403');
    return;
  }
  try {
    const buf = await readFile(abs);
    res.writeHead(200, {
      'Content-Type': T[extname(p)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(buf);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 ' + rel);
  }
}).listen(4321, '0.0.0.0', () => console.log('http://127.0.0.1:4321 e LAN'));
