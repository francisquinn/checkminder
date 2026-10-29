import { createHash } from 'node:crypto'
import { readdir, readFile } from 'node:fs/promises'
import { relative, sep } from 'node:path'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'

function offlineServiceWorker(): Plugin {
  let base = '/'
  let publicDir: string | false = false

  return {
    name: 'checkminder-offline-service-worker',
    enforce: 'post',
    apply: 'build',
    configResolved(config) {
      base = config.base
      publicDir = config.publicDir
    },
    async generateBundle(_options, bundle) {
      const assets = new Map<string, string>()
      const addAsset = (path: string, content: string | Uint8Array) => {
        const url = `${base}${path}`
        const revision = createHash('sha256').update(content).digest('hex')
        assets.set(url, revision)
      }

      for (const [path, output] of Object.entries(bundle)) {
        if (path === 'serviceworker.js') continue
        addAsset(path, output.type === 'chunk' ? output.code : output.source)
      }

      if (publicDir) {
        const addPublicFiles = async (directory: string) => {
          for (const entry of await readdir(directory, { withFileTypes: true })) {
            if (entry.name.startsWith('.') || entry.name === 'serviceworker.js') continue

            const path = `${directory}${sep}${entry.name}`
            if (entry.isDirectory()) {
              await addPublicFiles(path)
            } else if (entry.isFile()) {
              addAsset(relative(publicDir, path).split(sep).join('/'), await readFile(path))
            }
          }
        }

        await addPublicFiles(publicDir)
      }

      const shellUrl = `${base}index.html`
      if (!assets.has(shellUrl)) assets.set(shellUrl, 'app-shell')

      const precache = [...assets.entries()].map(([url, revision]) => ({ url, revision }))
      const cacheRevision = createHash('sha256')
        .update(JSON.stringify(precache))
        .digest('hex')
        .slice(0, 12)

      this.emitFile({
        type: 'asset',
        fileName: 'serviceworker.js',
        source: `const CACHE_NAME = 'checkminder-${cacheRevision}';
const CACHE_PREFIX = 'checkminder-';
const BASE_URL = ${JSON.stringify(base)};
const PRECACHE_URLS = ${JSON.stringify(precache.map(({ url }) => url))};
const APP_SHELL = new URL('index.html', self.registration.scope).href;
const getAppShell = () => caches.open(CACHE_NAME).then(cache => cache.match(APP_SHELL));

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  if (
    request.method !== 'GET' ||
    url.origin !== self.location.origin ||
    !url.pathname.startsWith(new URL(BASE_URL, self.location.origin).pathname)
  ) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => response.ok ? response : getAppShell())
        .catch(getAppShell)
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME)
      .then(cache => cache.match(request))
      .then(cached => cached || fetch(request))
  );
});
`,
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), offlineServiceWorker()],
  base: '/checkminder/'
})
