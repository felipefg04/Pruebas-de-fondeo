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
