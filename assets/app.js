import { PRESETS, fromStats, fromList, parseList, luckOf, simulate, curve, verdict } from "./sim.js";
import { WAITLIST_URL, FIRMS } from "./config.js";

const $ = (id) => document.getElementById(id);
let mode = "numeros";
const EN = document.documentElement.lang.startsWith("en");
const TXT = EN ? {
  minTrades: "Paste at least 5 trades (ideally 20 or more).", needTarget: "Set at least the phase 1 target.", missing: "Missing data",
  best: (p, x, l) => `Highest odds: ${p} at ${x} per trade (luck alone: ${l}). More risk isn't always better: past that point, the daily and total loss limits cut you off sooner.`,
  noEdge: "With no edge, no risk level is a good bet: your line and the luck line move together.",
  aria: "Probability of passing by risk per trade", yourRisk: "your risk", yourStrat: "your strategy", luck: "luck only",
} : {
  minTrades: "Pega al menos 5 operaciones (idealmente 20 o más).", needTarget: "Define al menos la meta de la fase 1.", missing: "Faltan datos",
  best: (p, x, l) => `Mayor probabilidad: ${p} con ${x} por operación (solo suerte: ${l}). Más riesgo no siempre es mejor: pasado ese punto, la pérdida diaria y total te cortan antes.`,
  noEdge: "Sin ventaja, ningún nivel de riesgo es una buena apuesta: tu línea y la de la suerte van juntas.",
  aria: "Probabilidad de pasar según el riesgo por operación", yourRisk: "tu riesgo", yourStrat: "tu estrategia", luck: "solo suerte",
};
const dec = (s) => (EN ? s : s.replace(".", ","));

function setPreset(name) {
  document.querySelectorAll("[data-preset]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.preset === name)));
  const p = PRESETS[name];
  if (!p) return;
  $("meta1").value = p.targets[0];
  $("meta2").value = p.targets[1] ?? 0;
  $("diaria").value = p.daily;
  $("maxima").value = p.max;
  $("dmin").value = p.minDays;
  $("tipo").value = p.trailing ? "sube" : "fija";
  $("mejordia").value = p.bestDay ? "si" : "no";
}

function setMode(name) {
  mode = name;
  document.querySelectorAll("[data-mode]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === name)));
  $("modo-numeros").hidden = name !== "numeros";
  $("modo-lista").hidden = name !== "lista";
  schedule();
}

const num = (id, def) => { const v = parseFloat(String($(id).value).replace(",", ".")); return Number.isFinite(v) ? v : def; };
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const pct = (v) => Math.round(v * 100) + (EN ? "%" : " %");
const fmtPct = (v) => dec(String(+v.toFixed(2))) + (EN ? "%" : " %");
const fmtR = (v) => (v >= 0 ? "+" : "−") + dec(Math.abs(v).toFixed(2)) + "R";

function readRules() {
  return {
    targets: [num("meta1", 10), num("meta2", 0)].filter((x) => x > 0),
    daily: num("diaria", 5), max: num("maxima", 10), minDays: Math.max(0, Math.round(num("dmin", 0))),
    trailing: $("tipo").value === "sube", bestDay: $("mejordia").value === "si",
    horizon: Math.max(5, Math.round(num("horizonte", 90))), tpd: clamp(num("tpd", 1.5), 0.05, 50),
  };
}

function readStrategy() {
  return mode === "numeros" ? fromStats(num("winrate", 45), num("winr", 1.6)) : fromList(parseList($("lista").value));
}

function run() {
  const d = readStrategy(), rules = readRules(), risk = clamp(num("riesgo", 0.5), 0.01, 10);
  if (d.kind === "list" && d.vals.length < 5) return empty(TXT.minTrades);
  if (!rules.targets.length) return empty(TXT.needTarget);
  const me = simulate(d, rules, risk), luck = simulate(luckOf(d), rules, risk);
  render(me, luck, d.mean, risk, rules, curve(d, rules));
}

function empty(msg) {
  $("prob").innerHTML = "–<small>%</small>";
  setPill("warn", TXT.missing);
  $("say").textContent = msg;
}

function render(me, luck, edge, risk, rules, points) {
  $("prob").innerHTML = `${Math.round(me.pasa * 100)}<small>%</small>`;
  const v = verdict(me, luck, edge, risk, rules.horizon, EN ? "en" : "es");
  setPill(v.tone, v.label);
  $("say").textContent = v.text;
  for (const k of ["pasa", "diaria", "max", "tiempo"]) {
    $("b-" + k).style.width = me[k] * 100 + "%";
    $("l-" + k).textContent = pct(me[k]);
  }
  $("s-dias").textContent = me.median ?? "—";
  $("s-suerte").textContent = pct(luck.pasa);
  $("s-ventaja").textContent = fmtR(edge);
  drawChart(points, risk);
  const top = points.reduce((a, b) => (b.me > a.me + 0.005 ? b : a));
  $("mejor").textContent = edge > 0 ? TXT.best(pct(top.me), fmtPct(top.x), pct(top.luck)) : TXT.noEdge;
}

function setPill(tone, text) { const p = $("pill"); p.className = "pill " + tone; p.textContent = text; }

function drawChart(points, current) {
  const W = 640, H = 240, L = 44, R = 14, T = 14, B = 34;
  const x = (v) => L + (Math.log(v) - Math.log(0.1)) / (Math.log(3) - Math.log(0.1)) * (W - L - R);
  const y = (v) => T + (1 - v) * (H - T - B);
  const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const path = (key) => points.map((p, i) => `${i ? "L" : "M"}${x(p.x).toFixed(1)},${y(p[key]).toFixed(1)}`).join("");
  const mono = 'font-family="IBM Plex Mono, monospace" font-size="11"';
  const grid = [0, 0.25, 0.5, 0.75, 1].map((v) =>
    `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" stroke="${css("--line")}"/><text x="${L - 8}" y="${y(v) + 4}" text-anchor="end" fill="${css("--muted")}" ${mono}>${v * 100}%</text>`).join("");
  const ticks = [0.1, 0.25, 0.5, 1, 2, 3].map((v) =>
    `<text x="${x(v)}" y="${H - 12}" text-anchor="middle" fill="${css("--muted")}" ${mono}>${dec(String(v))}%</text>`).join("");
  const cur = clamp(current, 0.1, 3), last = points[points.length - 1];
  const dots = points.map((p) => `<circle cx="${x(p.x)}" cy="${y(p.me)}" r="3" fill="${css("--accent")}"/>`).join("");
  $("chart").innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${TXT.aria}">
    ${grid}${ticks}
    <line x1="${x(cur)}" x2="${x(cur)}" y1="${T}" y2="${H - B}" stroke="${css("--muted")}" stroke-dasharray="3 4"/>
    <text x="${x(cur) + 5}" y="${T + 10}" fill="${css("--muted")}" ${mono}>${TXT.yourRisk}</text>
    <path d="${path("luck")}" fill="none" stroke="${css("--luck")}" stroke-width="2" stroke-dasharray="5 4"/>
    <path d="${path("me")}" fill="none" stroke="${css("--accent")}" stroke-width="2.5"/>${dots}
    <text x="${W - R}" y="${y(last.me) - 8}" text-anchor="end" font-size="11" fill="${css("--accent")}">${TXT.yourStrat}</text>
    <text x="${W - R}" y="${y(last.luck) + 16}" text-anchor="end" font-size="11" fill="${css("--luck")}">${TXT.luck}</text>
  </svg>`;
}

let timer;
function schedule() { clearTimeout(timer); timer = setTimeout(run, 180); }

document.querySelectorAll("[data-preset]").forEach((b) => b.addEventListener("click", () => { setPreset(b.dataset.preset); schedule(); }));
document.querySelectorAll("[data-mode]").forEach((b) => b.addEventListener("click", () => setMode(b.dataset.mode)));
$("form").addEventListener("input", (e) => {
  if (["meta1", "meta2", "diaria", "maxima", "dmin", "tipo", "mejordia"].includes(e.target.id)) {
    document.querySelectorAll("[data-preset]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.preset === "custom")));
  }
  schedule();
});
$("form").addEventListener("submit", (e) => e.preventDefault());
matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", schedule);

if (WAITLIST_URL) {
  $("waitlist-link").href = WAITLIST_URL;
  document.querySelectorAll("[data-waitlist]").forEach((el) => { el.hidden = false; });
}

if (FIRMS.length && $("firmas-list")) {
  const lang = EN ? "en" : "es";
  for (const f of FIRMS) {
    const a = document.createElement("a");
    a.className = "firm"; a.href = f.url; a.target = "_blank"; a.rel = "sponsored noopener";
    a.dataset.goatcounterClick = "afiliado-" + f.name.toLowerCase().replace(/\W+/g, "");
    a.dataset.goatcounterTitle = f.name;
    const b = document.createElement("b"); b.textContent = f.name;
    const s = document.createElement("span"); s.textContent = f[lang];
    const go = document.createElement("i"); go.textContent = EN ? "Visit →" : "Ver →";
    a.append(b, s, go);
    $("firmas-list").append(a);
  }
  $("firmas").hidden = false;
}

setPreset("dos");
run();
