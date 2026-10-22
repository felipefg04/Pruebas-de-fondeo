// node --test tests/
import test from "node:test";
import assert from "node:assert/strict";
import { PRESETS, fromStats, fromList, parseList, luckOf, phase, simulate, curve, verdict, rng } from "../assets/sim.js";

const rules = (p, extra = {}) => ({ ...PRESETS[p], horizon: 90, tpd: 1.5, ...extra });
const always = (n) => () => n;

test("pérdida diaria corta la fase", () => {
  const res = phase(fromList([-3]), rules("dos"), 10, 2, rng(1), always(1));
  assert.deepEqual([res.ok, res.why], [false, "diaria"]);
});

test("ganador constante pasa las dos fases respetando días mínimos", () => {
  const out = simulate(fromList([1]), { ...rules("dos"), tpd: 50 }, 1, 20);
  assert.equal(out.pasa, 1);
});

test("días mínimos: meta el día 1 igual espera 4 días con operaciones", () => {
  const res = phase(fromList([20]), rules("dos"), 10, 1, rng(1), always(1));
  assert.deepEqual([res.ok, res.days], [true, 4]);
});

test("pérdida total que sube con el mejor cierre (1 fase) vs fija (2 fases)", () => {
  // 5 días a +2,5 y luego días a -2,5 (dentro del 3 % diario). Con pérdida que sube, el piso
  // queda en 112,5 - 10 = 102,5 y se toca el día 9; con pérdida fija (piso 90) no se toca.
  const d = fromList([2.5, -2.5]);
  const seq = () => { let n = 0; return () => (n++ < 5 ? 0 : 0.9); };
  const una = phase(d, { ...rules("una"), horizon: 12 }, 1000, 1, seq(), always(1));
  assert.deepEqual([una.why, una.days], ["max", 9]);
  const fija = phase(d, { ...rules("una"), trailing: false, horizon: 12 }, 1000, 1, seq(), always(1));
  assert.equal(fija.why, "tiempo");
});

test("regla del mejor día retrasa el aprobado", () => {
  const res = phase(fromList([12]), rules("una"), 10, 1, rng(1), always(1));
  assert.deepEqual([res.ok, res.days], [true, 2]);
});

test("la ventaja supera a la suerte", () => {
  const d = fromStats(45, 1.8);
  const me = simulate(d, rules("dos"), 0.75, 800);
  const luck = simulate(luckOf(d), rules("dos"), 0.75, 800);
  assert.ok(me.pasa > luck.pasa + 0.2, `${me.pasa} vs ${luck.pasa}`);
});

test("la suerte tiene media cero", () => {
  assert.ok(Math.abs(luckOf(fromStats(40, 2)).p * luckOf(fromStats(40, 2)).w - 0.6) < 1e-9);
  assert.ok(Math.abs(luckOf(fromList([2, -1, -1, 3])).vals.reduce((a, b) => a + b, 0)) < 1e-9);
});

test("mismas entradas, mismo resultado", () => {
  const d = fromStats(50, 1.2);
  assert.deepEqual(simulate(d, rules("una"), 0.5, 300), simulate(d, rules("una"), 0.5, 300));
});

test("lista con comas decimales y separadores mixtos", () => {
  assert.deepEqual(parseList("1,5\n-1\n2.0; -0,5 3"), [1.5, -1, 2, -0.5, 3]);
  assert.deepEqual(parseList("1.5, -1, 2"), [1.5, -1, 2]);
});

test("veredicto sin ventaja siempre advierte", () => {
  const v = verdict({ pasa: 0.3, diaria: 0, max: 0.5, tiempo: 0.2 }, { pasa: 0.3 }, -0.1, 1, 90);
  assert.equal(v.label, "Sin ventaja");
});

test("curva cubre todos los riesgos y está entre 0 y 1", () => {
  const c = curve(fromStats(45, 1.6), rules("dos"), 100);
  assert.equal(c.length, 10);
  for (const p of c) assert.ok(p.me >= 0 && p.me <= 1 && p.luck >= 0 && p.luck <= 1);
});
