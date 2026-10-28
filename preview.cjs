const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const pages = new Set(['index.html']);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2' };
http.createServer((req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
  let relative;
  try { relative = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/+/, '') || 'index.html'; }
  catch { res.writeHead(400).end(); return; }
  const parts = relative.split(/[\\/]/);
  if (parts.some(part => part.startsWith('.')) || !(pages.has(relative) || relative.startsWith('assets/'))) {
    res.writeHead(404).end(); return;
  }
  const file = path.resolve(root, relative);
  fs.stat(file, (error, stat) => {
    if (error || !stat.isFile()) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Content-Length': stat.size, 'Cache-Control': 'no-cache' });
    if (req.method === 'HEAD') { res.end(); return; }
    fs.createReadStream(file).on('error', () => res.destroy()).pipe(res);
  });
}).listen(5500, '127.0.0.1', () => console.log('Preview: http://127.0.0.1:5500'));
