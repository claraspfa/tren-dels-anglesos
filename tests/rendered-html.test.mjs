import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the route explorer", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>El tren dels Anglesos · audioguia<\/title>/i);
  assert.match(html, /<h1>El tren dels Anglesos<\/h1>/i);
  assert.match(html, /Explora la ruta/);
  assert.match(html, /aria-label="Llegenda"/);
  assert.match(html, /class="language-trigger"[^>]*>.*Valencià/);
  assert.match(html, /aria-pressed="true"/);
  assert.match(html, /class="leaflet-map"/);
  assert.match(html, /Estacions i baixadors/);
  assert.match(html, /Vols seguir la ruta amb Wikiloc/);
  assert.match(html, /283561629/);
  assert.match(html, /Has trobat alguna incidència/);
  assert.match(html, /Enviar incidència/);
  assert.doesNotMatch(html, /Building your site|Your site is taking shape/);
});

test("keeps responsive and accessible explorer interactions in source", async () => {
  const [page, css, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /type ViewMode = "map" \| "list"/);
  assert.match(page, /function clusterPoints/);
  assert.match(page, /function LegendPanel/);
  assert.match(page, /function ModalShell/);
  assert.match(page, /function PointDetail/);
  assert.match(page, /aria-pressed=/);
  assert.match(page, /document\.documentElement\.lang/);
  assert.match(page, /searchParams\.set\("punt", point\.id\)/);
  assert.match(page, /searchParams\.set\("guia", "benvinguda"\)/);
  assert.match(page, /addEventListener\("popstate", syncModalFromUrl\)/);
  assert.match(page, /history\.pushState/);
  assert.match(page, /history\.replaceState/);
  assert.match(page, /setIncidentSent\(true\)/);
  assert.match(page, /Pont de Tancaes/);
  assert.match(page, /Dipòsit de locomotores d'Alcoi/);
  assert.match(page, /pont-barranc-morata\.jpg/);
  assert.match(css, /@media \(max-width: 800px\)/);
  assert.match(css, /min-height: 44px/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /\.legend-scrim\.is-open/);
  assert.match(css, /\.modal-backdrop/);
  assert.match(layout, /El tren dels Anglesos · audioguia/);
});
