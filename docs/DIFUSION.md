# Difusión — Prueba de Fondeo / Challenge Odds

Lo llena el agente de difusión una vez por semana. Solo canales gratuitos. Felipe publica y envía todo
(el agente no crea cuentas ni publica en su nombre). Métricas diarias: `docs/METRICAS.md`.

## Qué funcionó (resumen acumulado)
- Hasta el 02-11: 1–2 visitas por semana, casi todas desde X (t.co). 0 correos medibles, 0 clics de afiliado.
- Las respuestas sugeridas en X del 29-10, 30-10 y 02-11 no se publicaron: el cuello de botella es el tiempo
  de Felipe, no la falta de ideas. Por eso las acciones de cada semana deben ser pocas y cortas.

## Semana del 2026-11-05

### Cambio SEO hecho
- Páginas guía nuevas: `probabilidad-pasar-challenge.html` (ES) y `en/challenge-pass-rate.html` (EN), con
  ejemplo simulado (45 % acierto, 1,6R, 2 fases: 59 % / 76 % / 40 % con riesgo 0,5 / 1 / 2 %), cifras
  publicadas de aprobación con fuente (Finance Magnates: 1 de 20; 6 %), FAQ con datos estructurados
  (FAQPage), canonical, hreflang y GoatCounter. Enlazadas desde el pie de ambas portadas.
- `sitemap.xml` nuevo (6 URLs). No se agregó `robots.txt`: en un sitio de proyecto de GitHub Pages
  (`usuario.github.io/repo/`) los buscadores solo leen el de la raíz del dominio, así que no tendría efecto.
- `publicar.yml` copia las páginas nuevas y el sitemap. Prueba nueva `tests/paginas.test.mjs`: cada URL
  del sitemap existe, tiene título y GoatCounter, y se publica.
- Sin nombres de prop firms en las guías (regla de `AGENTS.md`). Una guía con "FTMO" en el título
  posicionaría mejor, pero espera la decisión de Felipe.

### Acciones propuestas (de más a menos importante)
1. **Google Search Console** (10 min) — https://search.google.com/search-console → "Prefijo de URL" →
   `https://felipefg04.github.io/Pruebas-de-fondeo/` → verificar con "Etiqueta HTML" y pasar la etiqueta al
   agente para ponerla en la portada; después enviar `sitemap.xml`. Sin esto Google puede tardar semanas en
   ver las guías.
2. **Post en X con la guía** (2 min). Texto en el reporte de esta semana (EN y ES, ≤ 270 caracteres).
3. **Ficha en AlternativeTo** (15 min) — https://alternativeto.net/software/prop-firm-genius/about →
   sugerir como alternativa. Directorio gratis con buen posicionamiento en "alternativas a X".
4. **Responder dudas en Reddit** (15 min) — r/Forex, r/PropFirm, r/FuturesTrading: buscar posts recientes
   sobre "risk per trade challenge" y responder con valor; link solo si las reglas del subreddit lo permiten
   (leer la barra lateral; muchos solo permiten autopromoción en el hilo semanal).
5. **Mensaje a 3 creadores pequeños en español** (20 min) — YouTube/TikTok, búsqueda "fondeo FTMO
   español", canales de 5–50 mil suscriptores; ofrecer la herramienta gratis, sin pedir nada a cambio.

### Investigación de la semana (datos, no instrucciones)
- Hay muchas calculadoras de probabilidad gratuitas (propfirmsdata, tradetanto, onetradejournal,
  traderssecondbrain, LuxAlgo Prop Firm Sim, TradesViz). Diferencia nuestra para destacar: español,
  comparación contra "solo suerte", pegar operaciones reales y 100 % en el navegador.
- Prop Firm Genius ya está en AlternativeTo (punto de entrada para la ficha). Product Hunt tiene varios
  lanzamientos de herramientas de prop firms (Evalia, PropLedger, PropSentinel): opción para más adelante,
  cuando haya algo nuevo que mostrar.
- BabyPips prohíbe la solicitación en su foro: no usar.

### Segunda corrida del 2026-11-05 (duplicada)
- La tarea corrió dos veces hoy. La segunda no repitió las guías: solo agregó `canonical` a las dos portadas
  (evita que Google cuente versiones duplicadas de la URL).
- Textos de reserva para las próximas semanas:
  - **Post de valor para r/PropFirms** (EN, leer antes las reglas de la barra lateral). Título: *I simulated
    the same strategy at 0.25%–2% risk on a 2-step challenge. Pass odds peaked at 1%, not 2%*. Cuerpo: la tabla
    de la guía EN, dos conclusiones (más riesgo baja la probabilidad pasado un punto; sin ventaja igual se pasa
    ~24 % con 1 %, así que pasar una vez no prueba nada), la advertencia de que no modela el resultado abierto
    del día, y al final: "I built the simulator as a free side project (no sign-up, runs in your browser; the
    site has a couple of clearly labeled affiliate links). Happy to share it if useful."
  - **Newsletter Delphic Alpha**, que publicó "Prop Firm Math" (mismo tema):
    https://delphicalpha.substack.com/p/prop-firm-math-what-the-rules-actually — comentario o respuesta al
    correo: "Hi! I enjoyed 'Prop Firm Math', it's the same question I've been working on. I built a free
    simulator that runs thousands of challenges with a trader's own win rate, R and risk per trade, and
    compares the result with a zero-edge version of the same strategy. No sign-up, runs in the browser:
    https://felipefg04.github.io/Pruebas-de-fondeo/en/ . If it's useful for your readers, feel free to
    mention it. Feedback on the math is welcome. — Felipe"

## Semana del 2026-11-11

### Estado al empezar
- `METRICAS.md` no tiene filas nuevas desde el 05-11 (0 visitas en 7 días ese día). Ninguna acción de la semana
  del 05-11 aparece hecha: la portada aún no tiene etiqueta de Google Search Console y no hay posts nuevos en X.
  Se repite Search Console como primera acción porque sin ella las guías no se indexan rápido.

### Cambio SEO hecho
- Guía nueva en ES y EN: `drawdown-fijo-vs-trailing.html` y `en/static-vs-trailing-drawdown.html` (búsquedas
  "trailing drawdown vs static", "drawdown trailing fondeo"; en español casi no hay contenido con cifras).
  Ejemplo simulado con `assets/sim.js` (45 % acierto, 1,6R, 1,5 op/día, 2 fases 10 %/5 %, diaria 5 %, total
  10 %, 90 días, 4.000 simulaciones): fijo vs. trailing al cierre del día = 59/59 % (0,5 %), 76/67 % (1 %),
  40/35 % (2 %); fallos por pérdida total 15 % → 29 % con 1 %. FAQ con datos estructurados (FAQPage),
  canonical, hreflang, GoatCounter. Sin nombres de prop firms.
- Enlazada desde el pie de las dos portadas y de las dos guías anteriores. `sitemap.xml` (8 URLs) y
  `publicar.yml` actualizados. Tests 21/21. Revisada en Chromium a 375 px: sin desborde horizontal.

### Acciones propuestas (de más a menos importante)
1. **Google Search Console** (10 min) — pendiente desde el 05-11. https://search.google.com/search-console →
   "Prefijo de URL" → `https://felipefg04.github.io/Pruebas-de-fondeo/` → "Etiqueta HTML" → pasar la etiqueta
   al agente → enviar `sitemap.xml`.
2. **Responder en el foro de Rankia** (15 min, ES) — https://www.rankia.co/foros/bolsa/temas/4690406-simulador-prueba-fondeo
   (hilo justo sobre "simulador de prueba de fondeo"). Leer antes las normas del foro sobre enlaces.
3. **Post en X** (2 min) — ES y EN con la guía nueva (textos abajo).
4. **Post de valor en r/PropFirms** (15 min, EN) — leer la barra lateral; si no permite enlaces, publicar sin link
   y solo compartirlo si alguien lo pide.
5. **Find My Moat** (10 min, EN) — directorio curado de herramientas de inversión con secciones gratis y para
   day traders: https://www.findmymoat.com/contact (formulario de contacto para sugerir la herramienta).

### Textos listos
- **Rankia (ES):** "Hola. Para saber si una operativa aguanta un challenge antes de pagarlo, lo que más me sirvió fue
  simular miles de intentos con mi % de acierto, mi ganancia media en R y las reglas exactas (meta, pérdida diaria y
  si la pérdida total es fija o trailing). Dos cosas que salen siempre: arriesgar más de ~1 % por operación suele
  bajar la probabilidad, porque la pérdida diaria corta antes; y con drawdown trailing la misma estrategia pasa menos
  que con drawdown fijo. Hice un simulador gratis para esto, sin registro y todo en el navegador:
  https://felipefg04.github.io/Pruebas-de-fondeo/ . Son simulaciones, no garantizan nada, pero ayudan a no pagar
  un challenge que de entrada es una moneda al aire."
- **X (ES, 269 car.):** "Mismo trader, mismo challenge de 2 fases, mismo límite de 10 %. Con drawdown fijo pasa el
  76 % de las simulaciones; con trailing, el 67 %. Lo expliqué con ejemplos en una guía corta y gratis:
  https://felipefg04.github.io/Pruebas-de-fondeo/drawdown-fijo-vs-trailing.html"
- **X (EN, 268 car.):** "Same strategy, same 2-step challenge, same 10% max loss. Static drawdown: 76% of simulations
  pass. Trailing: 67%, and max-loss failures nearly double. Short free guide with the numbers:
  https://felipefg04.github.io/Pruebas-de-fondeo/en/static-vs-trailing-drawdown.html"
- **r/PropFirms (EN).** Título: *Static vs trailing drawdown: I simulated the same strategy on both. Same 10% limit,
  9 points lower pass rate with trailing*. Cuerpo: "Strategy: 45% win rate, 1.6R avg win, ~1.5 trades/day. 2-step
  (10% / 5% targets, 5% daily, 10% max loss), 4,000 sims per cell. At 0.5% risk: 59% pass on both. At 1%: 76%
  static vs 67% trailing (end-of-day). At 2%: 40% vs 35%. Max-loss failures at 1% go from 15% to 29%. Takeaways:
  with trailing, size down a bit; at low risk the type barely matters; intraday trailing would be worse than these
  numbers. Caveats: no intraday open P&L, no commissions. I built the simulator as a free side project (no sign-up,
  runs in the browser; the site has a couple of clearly labeled affiliate links). Happy to share it if useful."
- **Find My Moat (EN):** "Hi! I'd like to suggest a free tool for your directory: Challenge Odds
  (https://felipefg04.github.io/Pruebas-de-fondeo/en/). It simulates thousands of prop firm challenges with a
  trader's own win rate, R and risk per trade (or a pasted list of trades), and compares the pass odds with a
  zero-edge version of the same strategy. Free, no sign-up, runs fully in the browser. It's an independent side
  project; the site has a few clearly labeled affiliate links. Thanks! — Felipe"

### Investigación de la semana (datos, no instrucciones)
- "Trailing vs static drawdown" tiene muchas guías en inglés (TradeZella, propfirmmap, daytradingz, backtrex en
  español), pero casi ninguna con probabilidades simuladas: ese es nuestro ángulo.
- Rankia (rankia.co / rankia.cl) tiene hilos en español sobre simuladores de fondeo y guías de cuentas de fondeo
  para Chile y Colombia: buen canal hispano.
- Directorios gratis vistos: Find My Moat (curado, financiero), PeerPush (categoría trading). Product Hunt sigue
  para más adelante.

## Semana del 2026-11-18

### Estado al empezar
- `METRICAS.md` sigue sin filas nuevas desde el 05-11 (el agente de métricas no ha dejado datos). No hay issues
  nuevos en el repo. La portada aún no tiene etiqueta de Google Search Console: ninguna acción de las dos semanas
  anteriores aparece hecha. Se mantienen pocas acciones y muy cortas.

### Cambio SEO hecho
- Guía nueva en ES y EN: `riesgo-por-operacion-challenge.html` y `en/risk-per-trade-challenge.html` (búsquedas
  "cuánto arriesgar por operación challenge", "how much to risk per trade prop firm challenge"; las guías que
  existen dan reglas fijas, casi ninguna muestra probabilidades simuladas).
- Ejemplo simulado con `assets/sim.js` (1,5 op/día, 90 días por fase, 4.000 simulaciones por celda). 2 fases
  (10 %/5 %, diaria 5 %, total 10 % fija), mejor riesgo: 40 %·2R → 80 % con 0,75 %; 45 %·1,6R → 77 % con 0,75 %;
  55 %·1,1R → 82 % con 1 %. Con 2 %: 36 / 40 / 52 %. 1 fase (diaria 3 %, trailing) con 45 %·1,6R: 67–68 % con
  0,5–0,75 %, 43 % con 1 %, 21 % con 1,5 %. Solo suerte (45 %, 2 fases): 24–26 % con 1–1,5 %. Mediana de días
  (45 %, 2 fases): 59 con 0,75 %, 16 con 2 %. Regla simple de la guía: pérdida diaria ÷ riesgo = pérdidas
  seguidas que aguantas en un día; lo mejor fue 4–6.
- FAQ con datos estructurados (FAQPage), canonical, hreflang, GoatCounter. Sin nombres de prop firms. Enlazada
  desde el pie de las dos portadas y de las cuatro guías. `sitemap.xml` (10 URLs) y `publicar.yml` actualizados.
  Tests 23/23. Revisada en Chromium a 375 px: sin desborde horizontal (la tabla cabe con encabezados cortos).

### Acciones propuestas (de más a menos importante)
1. **Google Search Console** (10 min) — pendiente desde el 05-11. https://search.google.com/search-console →
   "Prefijo de URL" → `https://felipefg04.github.io/Pruebas-de-fondeo/` → "Etiqueta HTML" → pasar la etiqueta
   al agente (o pegarla en un issue) → enviar `sitemap.xml`.
2. **Hilo semanal "Software Sunday" de r/Daytrading** (5 min, EN, domingo 22-11) —
   https://www.reddit.com/r/Daytrading/ → buscar el hilo fijado "Software Sunday" que abre AutoModerator. Es el
   lugar permitido para compartir herramientas, así que el link no es spam.
3. **Post en X** (2 min) — ES y EN con la guía nueva.
4. **Foro de Rankia** (15 min, ES) — https://www.rankia.co/foros/bolsa/temas/4690406-simulador-prueba-fondeo
   (texto de la semana del 11-11, sigue vigente). Leer antes las normas sobre enlaces.
5. **Comentario en la newsletter "Ideas de inversión by FI"** (5 min, ES) — Substack en español sobre cuentas
   fondeadas: https://ideasdeinversionbyfi.substack.com/p/5-errores-comunes-al-operar-con-cuentas-fondeadas-prop-firm-trading-como-evitarlos
   Comentar con valor; si se puede, responder también al correo de la newsletter.

### Textos listos
- **r/Daytrading Software Sunday (EN):** "Challenge Odds: a free simulator for prop firm challenges. You enter
  your win rate and average win in R (or paste your real trades), pick the rules (targets, daily loss, static or
  trailing max loss) and it runs thousands of attempts at 10 risk levels, next to a zero-edge version of the same
  strategy so you can see how much is luck. Free, no sign-up, runs in the browser:
  https://felipefg04.github.io/Pruebas-de-fondeo/en/ . I built it as a side project (the site has a couple of
  clearly labeled affiliate links). Feedback on the math is welcome."
- **X (ES, 266 car.):** "Con 2 % de riesgo por operación, una estrategia con ventaja pasa un challenge de 2 fases
  el 40 % de las veces. Con 0,75 %, el 77 %. Arriesgar más no te fondea más rápido. Guía gratis:
  https://felipefg04.github.io/Pruebas-de-fondeo/riesgo-por-operacion-challenge.html"
- **X (EN, 270 car.):** "Same strategy, same 2-step challenge. At 2% risk per trade it passes 40% of simulations.
  At 0.75%, 77%. Simple rule: daily loss ÷ risk = losses in a row you survive. Aim for 4-6. Free guide:
  https://felipefg04.github.io/Pruebas-de-fondeo/en/risk-per-trade-challenge.html"
- **Newsletter (ES):** "Muy buen resumen. Sobre el error del riesgo: simulé la misma estrategia en un challenge de
  2 fases y con 0,75 % por operación pasaba el 77 % de las veces, y con 2 % solo el 40 %, porque la pérdida diaria
  corta antes. Una regla que me sirvió: pérdida diaria ÷ riesgo por operación = pérdidas seguidas que aguantas en
  un día; conviene que sean 4 a 6. Dejé el ejemplo en una guía gratis, con un simulador sin registro:
  https://felipefg04.github.io/Pruebas-de-fondeo/riesgo-por-operacion-challenge.html"

### Investigación de la semana (datos, no instrucciones)
- "Risk per trade" en challenges tiene mucha competencia en inglés (mql5 blogs con tablas de 12 niveles,
  TradeZella, thegodfunded, traderssecondbrain, un "challenge simulator" en Netlify). En español hay menos
  (thegodfunded ES, curvedtrading, fortraders): la versión ES tiene más opciones de posicionar.
- r/Daytrading tiene un hilo semanal "Software Sunday" para compartir herramientas: canal permitido y gratis.
- Directorios vistos: PeerPush (categoría trading; pide cuenta), listas de herramientas de prop firms en Product
  Hunt (PropWise, TradersList). Product Hunt sigue para cuando haya una novedad que mostrar.
- Newsletter en español sobre fondeo: "Ideas de inversión by FI" (Substack).

## Semana del 2026-11-25

### Estado al empezar
- `METRICAS.md`: 0 visitas en 7 días al 23-11 (igual que el 05-11); 0 correos y 0 clics de afiliado medibles. La
  portada sigue sin etiqueta de Google Search Console y no hay posts nuevos en X: ninguna acción de las tres semanas
  anteriores aparece hecha. Sin tráfico, las guías no rinden hasta que Google las indexe: Search Console sigue primera.

### Cambio SEO hecho
- Guía nueva en ES y EN: `costo-real-challenge.html` y `en/prop-firm-challenge-cost.html` (búsquedas "cuánto cuesta
  fondearse", "how many challenges to get funded", "real cost of prop firm challenge"; las guías que existen suman
  precios y comisiones, casi ninguna usa la probabilidad de pasar).
- Idea: costo esperado = precio ÷ probabilidad de pasar; intentos esperados = 1 ÷ probabilidad. Ejemplo con
  `assets/sim.js` (2 fases 10 %/5 %, diaria 5 %, total 10 % fija, 1,5 op/día, 90 días por fase, 4.000
  simulaciones, precio de referencia US$100): ventaja clara (45 %·1,6R) → 1,3 intentos / US$130 con 0,75 % y
  2,5 / US$253 con 2 %; poca ventaja (40 %·1,6R) → mínimo 2,8 / US$276 con 1 %; solo suerte → mínimo 3,9 / US$386
  con 1,5 %. Probabilidad de fallar 3 seguidos: 26 % (poca ventaja, 1 %) y 41 % (suerte, 1,5 %).
- FAQ con datos estructurados (FAQPage), canonical, hreflang, GoatCounter. Sin nombres de prop firms. Enlazada
  desde el pie de las dos portadas y de las seis guías. `sitemap.xml` (12 URLs) y `publicar.yml` actualizados.
  Tests 25/25. Revisada en Chromium a 375 px: sin desborde (la tabla usa dos líneas por celda para caber).

### Acciones propuestas (de más a menos importante)
1. **Google Search Console** (10 min) — pendiente desde el 05-11. https://search.google.com/search-console →
   "Prefijo de URL" → `https://felipefg04.github.io/Pruebas-de-fondeo/` → "Etiqueta HTML" → mandar la etiqueta
   por Telegram como orden ("poner esta etiqueta en la portada de Prueba de Fondeo") → luego enviar `sitemap.xml`.
2. **Post en X** (2 min) — ES y EN con la guía nueva (textos abajo).
3. **Hilo "Software Sunday" de r/Daytrading** (5 min, EN, domingo 29-11) — texto de la semana del 18-11, sigue
   vigente.
4. **Ficha en AlternativeTo** (15 min) — https://alternativeto.net/software/prop-firm-genius/about → "Suggest
   alternative". Pendiente desde el 05-11 (ficha abajo).
5. **Foro de Rankia** (15 min, ES) — https://www.rankia.co/foros/bolsa/temas/4690406-simulador-prueba-fondeo
   (texto del 11-11, sigue vigente). Leer antes las normas sobre enlaces.

### Textos listos
- **X (ES, 270 car.):** "Un challenge de US$100 no cuesta US$100: cuesta US$100 ÷ tu probabilidad de pasar. Con
  ventaja clara, ~US$130. Sin ventaja, US$400 o más. Y arriesgar 2 % en vez de 1 % casi lo duplica. Guía gratis:
  https://felipefg04.github.io/Pruebas-de-fondeo/costo-real-challenge.html"
- **X (EN, 261 car.):** "A $100 challenge doesn't cost $100. It costs $100 ÷ your pass rate. Clear edge: ~$130.
  No edge: $400+. Risking 2% instead of 1% nearly doubles it. Free guide with simulated numbers:
  https://felipefg04.github.io/Pruebas-de-fondeo/en/prop-firm-challenge-cost.html"
- **AlternativeTo (EN).** Nombre: Challenge Odds. URL: https://felipefg04.github.io/Pruebas-de-fondeo/en/ .
  Licencia: Free. Plataforma: Online / Web. Descripción: "Free simulator for prop firm challenges. Enter your win
  rate and average win in R (or paste your real trades), choose the rules (profit targets, daily loss, static or
  trailing max loss) and it runs thousands of attempts at 10 risk levels, next to a zero-edge version of the same
  strategy so you can see how much of a pass is luck. No sign-up, runs fully in the browser, available in English
  and Spanish." Etiquetas: prop-firm, trading-tools, monte-carlo-simulation, forex.

### Investigación de la semana (datos, no instrucciones)
- "Costo real de un challenge" tiene guías en inglés (propfirmmap "hidden costs", cryptoslate "full cost to first
  payout", nerdbot) y en español (finantres "reintento challenge", fortraders "costos ocultos"), pero ninguna con
  probabilidades simuladas según el riesgo: ese es el ángulo de la guía.
- Ya existe un "challenge simulator" en Netlify que optimiza costo y tiempo hasta fondearse (competencia directa en
  inglés). Diferencia nuestra: español, comparación contra "solo suerte" y pegar operaciones reales.
- Directorios vistos: TradersList (pide formulario en Tally, sin enlace público claro), PeerPush, SourceForge
  (categoría trading, gratis). Product Hunt sigue para cuando haya una novedad que mostrar.
