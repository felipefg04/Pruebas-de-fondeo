// Revisa que cada página del sitemap exista, se publique y cuente visitas.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const BASE = "https://felipefg04.github.io/Pruebas-de-fondeo/";
const sitemap = readFileSync("sitemap.xml", "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const publicar = readFileSync(".github/workflows/publicar.yml", "utf8");

test("el sitemap tiene páginas", () => assert.ok(urls.length >= 4));

for (const url of urls) {
  assert.ok(url.startsWith(BASE), url);
  let file = url.slice(BASE.length);
  if (file === "" || file.endsWith("/")) file += "index.html";
  test(`página ${file}`, () => {
    assert.ok(existsSync(file), `falta ${file}`);
    const html = readFileSync(file, "utf8");
    assert.match(html, /data-goatcounter=/, "sin GoatCounter");
    assert.match(html, /<title>[^<]+<\/title>/, "sin título");
    const top = file.split("/")[0];
    assert.ok(publicar.includes(top === file ? file : top), `publicar.yml no copia ${file}`);
  });
}
