import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

/* Raiz do projeto: `/` serve site/, `/admin` serve site/admin/.
   `/grupo` e `/entrar` servem as pastas do clube de ofertas
   (landing + redirecionador do grupo de WhatsApp).
   Pastas sem `/` final (ex. `/grupo`) devolvem o index.html da
   pasta, como a Vercel faz com `cleanUrls: true`.
   Arquivos sob `/admin/...` vêm de site/admin/; todo o resto vem de site/.
   Sem build, sem fallback: 404 honesto quando o arquivo não existe. */
const REPO = resolve(fileURLToPath(new URL('./', import.meta.url)));
const SITE = join(REPO, 'site');
const ADMIN = join(SITE, 'admin');
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

function pick(p) {
  if (p === '/admin' || p === '/admin/') return { root: ADMIN, rel: 'index.html' };
  if (p === '/admin/' || p.startsWith('/admin/')) return { root: ADMIN, rel: p.slice('/admin/'.length) || 'index.html' };
  if (p === '/grupo' || p === '/grupo/' || p === '/entrar' || p === '/entrar/') return { root: SITE, rel: p.replace(/^[/\\]+/, '').replace(/[/\\]+$/, '') + '/index.html' };
  if (p === '/') return { root: SITE, rel: 'index.html' };
  return { root: SITE, rel: p.replace(/^[/\\]+/, '') };
}

createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  const { root, rel } = pick(p === '/' ? '/' : p);
  const norm = normalize(rel).replace(/^[/\\]+/, '');
  const abs = resolve(join(root, norm || 'index.html'));
  if (abs !== root && !abs.startsWith(root + sep)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403');
    return;
  }
  try {
    const buf = await readFile(abs);
    res.writeHead(200, {
      'Content-Type': T[extname(abs)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(buf);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 ' + rel);
  }
}).listen(4321, '0.0.0.0', () => console.log('http://127.0.0.1:4321 e LAN'));
