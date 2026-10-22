# AGENTS.md — Reglas para los agentes de Prueba de Fondeo

Producto: **Prueba de Fondeo**, simulador web para traders de prop firms. Sitio estático (HTML, CSS y
JavaScript sin compilar) publicado en GitHub Pages. Titular: Felipe (@felipefg04, no programador).
Desarrollo: Mati (@Flowe040120) y agentes (Claude).

## Mapa
| Pieza | Archivo |
|---|---|
| Motor de simulación (puro, sin DOM) | `assets/sim.js` |
| Interfaz | `index.html`, `assets/app.js`, `assets/styles.css` |
| Configuración (enlace de lista de espera) | `assets/config.js` |
| Pruebas | `tests/*.test.mjs` (`node --test tests/*.test.mjs`) |
| Publicación | `.github/workflows/publicar.yml` (GitHub Pages, desde `main`) |
| Plan de lanzamiento | `docs/PLAN_LANZAMIENTO.md` |

## Reglas
- Todo cambio al motor lleva prueba. La publicación corre las pruebas y no publica si fallan.
- Los cálculos se hacen en el navegador: **no enviar los datos del usuario a ningún servidor** sin
  decisión de Felipe y sin actualizar `privacidad.html`.
- No usar nombres, logos ni colores de prop firms reales: la herramienta es independiente. Las reglas
  predefinidas se describen como "2 fases" / "1 fase" con su fecha.
- No prometer resultados ni dar recomendaciones de inversión. Mantener el aviso legal.
- Textos en español simple, para traders hispanohablantes.
- Integración: PR con pruebas en verde se integra solo. Esperan el "Aprobado" de Felipe: cobrar a
  usuarios, guardar datos personales, cambios legales o de marca.
- Cada commit termina con `Co-Authored-By: Claude <noreply@anthropic.com>`.
