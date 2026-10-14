// Pré-renderiza as landing pages no HTML do build (roda depois de `vite build`
// e `vite build --ssr`). O navegador desenha o hero a partir do HTML, sem
// esperar o JS baixar e o React montar; o index.tsx hidrata em cima dele.
import { log } from 'node:console';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const { render, PRERENDER_ROUTES } = await import(
  pathToFileURL(path.join(root, 'build', 'ssr', 'entry-server.js')).href
);

const PLACEHOLDER = '<div id="root"></div>';

for (const route of PRERENDER_ROUTES) {
  const file = path.join(
    dist,
    route === '/' ? 'index.html' : `${route.slice(1)}/index.html`
  );
  const html = await readFile(file, 'utf8');
  if (!html.includes(PLACEHOLDER)) {
    throw new Error(`prerender: ${file} sem ${PLACEHOLDER}`);
  }
  const body = await render(route);
  if (!body.includes('<h1')) {
    throw new Error(
      `prerender: ${route} renderizou sem <h1> (lazy não resolveu?)`
    );
  }
  await writeFile(
    file,
    html.replace(PLACEHOLDER, `<div id="root">${body}</div>`)
  );
  log(`prerender: ${route} (${(body.length / 1024).toFixed(1)} kB)`);
}
