// Motor de simulación de evaluaciones de prop firms. Puro: sin DOM, sin red.
// Lo usan la página (assets/app.js) y las pruebas (tests/sim.test.mjs).

export const PRESETS = {
  dos: { label: "2 fases", targets: [10, 5], daily: 5, max: 10, minDays: 4, trailing: false, bestDay: false },
  una: { label: "1 fase", targets: [10], daily: 3, max: 10, minDays: 0, trailing: true, bestDay: true },
};

export const RISK_GRID = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3];

// Generador con semilla: mismas entradas, misma respuesta.
export function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function poisson(lambda, r) {
  const L = Math.exp(-lambda);
  let k = 0, p = 1;
  do { k++; p *= r(); } while (p > L);
  return k - 1;
}

// Estrategia descrita por % de aciertos y ganancia media (pérdida = -1R).
export function fromStats(winRatePct, avgWinR) {
  const p = Math.min(0.99, Math.max(0.01, winRatePct / 100));
  const w = Math.max(0.05, avgWinR);
  return { kind: "bin", p, w, mean: p * w - (1 - p) };
}

// Estrategia descrita por sus operaciones reales, en R.
export function fromList(values) {
  const vals = values.filter(Number.isFinite);
  const mean = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  return { kind: "list", vals, mean };
}

export function parseList(text) {
  // Coma entre dígitos = decimal ("1,5"); coma con espacio, punto y coma o salto = separador.
  return String(text)
    .replace(/(\d),(\d)/g, "$1.$2")
    .split(/[\s;,]+/)
    .map((x) => parseFloat(x))
    .filter(Number.isFinite);
}

// La misma volatilidad con la ventaja en cero: lo que haría la suerte.
export function luckOf(d) {
  if (d.kind === "bin") return { kind: "bin", p: d.p, w: (1 - d.p) / d.p, mean: 0 };
  return { kind: "list", vals: d.vals.map((v) => v - d.mean), mean: 0 };
}

function drawR(d, r) {
  return d.kind === "bin" ? (r() < d.p ? d.w : -1) : d.vals[Math.floor(r() * d.vals.length)];
}

// Una fase desde saldo 100 (unidades = % del saldo inicial).
// tradesForDay: () => número de operaciones del día (permite pruebas deterministas).
export function phase(d, rules, target, risk, r, tradesForDay) {
  const start = 100;
  let bal = start, peak = start, traded = 0, pos = 0, best = 0;
  for (let day = 1; day <= rules.horizon; day++) {
    const n = tradesForDay ? tradesForDay(day) : poisson(rules.tpd, r);
    const dayStart = bal;
    for (let i = 0; i < n; i++) {
      bal += drawR(d, r) * risk;
      if (dayStart - bal >= rules.daily) return { ok: false, why: "diaria", days: day };
      if (bal <= (rules.trailing ? peak : start) - rules.max) return { ok: false, why: "max", days: day };
    }
    if (n > 0) traded++;
    const gain = bal - dayStart;
    if (gain > 0) { pos += gain; best = Math.max(best, gain); }
    peak = Math.max(peak, bal);
    let done = bal - start >= target && traded >= rules.minDays;
    if (done && rules.bestDay && pos > 0 && best > 0.5 * pos) done = false;
    if (done) return { ok: true, days: day };
  }
  return { ok: false, why: "tiempo", days: rules.horizon };
}

export function simulate(d, rules, risk, sims = 2000, seed = 7) {
  const r = rng(seed);
  const out = { pasa: 0, diaria: 0, max: 0, tiempo: 0 };
  const days = [];
  for (let s = 0; s < sims; s++) {
    let total = 0, res = { ok: true };
    for (const t of rules.targets) {
      res = phase(d, rules, t, risk, r);
      total += res.days;
      if (!res.ok) break;
    }
    if (res.ok) { out.pasa++; days.push(total); } else out[res.why]++;
  }
  days.sort((a, b) => a - b);
  for (const k of Object.keys(out)) out[k] /= sims;
  out.median = days.length ? days[Math.floor(days.length / 2)] : null;
  return out;
}

export function curve(d, rules, sims = 700, seed = 11) {
  const luck = luckOf(d);
  return RISK_GRID.map((x) => ({
    x,
    me: simulate(d, rules, x, sims, seed).pasa,
    luck: simulate(luck, rules, x, sims, seed).pasa,
  }));
}

// Lectura en palabras simples del resultado.
export function verdict(me, luck, edge, risk, horizon, lang = "es") {
  const en = lang === "en";
  const pct = (v) => Math.round(v * 100) + (en ? "%" : " %");
  const r = en ? +risk.toFixed(2) + "%" : String(+risk.toFixed(2)).replace(".", ",") + " %";
  if (edge <= 0) return { tone: "bad", label: en ? "No edge" : "Sin ventaja",
    text: en ? "Your strategy loses or breaks even on average. If you pass, it would be luck: raising risk only makes you fail faster."
      : `Tu estrategia pierde o empata en promedio. Si pasas, sería suerte: subir el riesgo solo hace que falles más rápido.` };
  if (me.pasa >= 0.6 && me.pasa - luck.pasa >= 0.2) return { tone: "good", label: en ? "Good bet" : "Buena opción",
    text: en ? `At ${r} per trade you would pass ${pct(me.pasa)} of the time; on luck alone it would be ${pct(luck.pasa)}. Your edge makes the difference.`
      : `Con ${r} por operación pasarías ${pct(me.pasa)} de las veces; solo por suerte serían ${pct(luck.pasa)}. Tu ventaja hace la diferencia.` };
  if (me.tiempo > 0.4) return { tone: "warn", label: en ? "Too slow" : "Muy lento",
    text: en ? `Most of the time you don't reach the target within ${horizon} trading days. With a positive edge, a bit more risk or more trades per day shortens it: check the chart.`
      : `La mayoría de las veces no llegas a la meta en ${horizon} días hábiles. Con ventaja positiva, un poco más de riesgo o más operaciones por día lo acortan: mira el gráfico.` };
  return { tone: "warn", label: en ? "Risky" : "Arriesgado",
    text: en ? `You would pass ${pct(me.pasa)} of the time and fail on a loss limit ${pct(me.diaria + me.max)}. Check the chart to see if a different risk suits you better.`
      : `Pasarías ${pct(me.pasa)} de las veces y fallarías por pérdida ${pct(me.diaria + me.max)}. Mira el gráfico para ver si otro riesgo te conviene más.` };
}
