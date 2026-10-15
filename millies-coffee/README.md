# Millie's Coffee Co — Astoria website concept

A responsive, high-energy website concept for Millie's Coffee Co at **25-83 31st Street, Astoria, Queens**. The visual system follows the dark-roast direction in the supplied site reference, then makes it Millie's: an enlarged CSS 3D Sage Séance cup with the actual drink photo wrapped onto its curved front facets, smooth scroll rotation, gentle liquid slosh, and touch interaction. Kinetic coffee-bean details, interactive drink cards, a four-palette switcher, a points estimator, and a tap-friendly flavor finder round out the experience.

## Preview locally

From this directory:

```bash
python3 -m http.server 4178 --bind 0.0.0.0
```

Open `http://localhost:4178/`. The site uses no build step, framework, external font, CDN script, or runtime dependency.

## Project files

- `index.html` — accessible site structure, menu, loyalty widget, flavor finder, and contact links.
- `styles.css` — four persistent color stories (Roast, Sage, Fig, Caramel), responsive layouts, a curved photo texture on the cup's 48 CSS-3D facets, faceted glass highlights, liquid-wave motion, visible hover/focus/touch states, and reduced-motion styling.
- `app.js` — theme persistence, responsive navigation, 48-facet cup construction and eased scroll/pointer/tap rotation with scroll-triggered liquid slosh, drink filters, points estimator, flavor finder, and reveal motion.
- `assets/` — Millie's Toast wordmark, supplied café/product photos, optimized seasonal drink crops, and the Sage Séance glass cutout plus curved-texture variant used by the hero cup's 3D facets.
- `research/RESEARCH-NOTES.md` — primary sources, checked facts, menu and hours caveats, and asset provenance.
- `outreach-messages.md` — personal and business-page DM drafts.

## Research and accuracy

Toast lists the Astoria address, phone, current menu names, and Millie's points program. No weekly hours or menu prices are hard-coded. The seasonal **Sage Séance** is presented as a fall feature based on the supplied seasonal post; the Toast menu is linked for current selection and terms. The feature menu cards are highlights, not a promise that every drink is available today.

## Photography and rights

The wordmark is from Millie's official Toast banner. The café and drink photographs are from the supplied reference files. Permission should be confirmed with Millie's before any public launch. No generated food photography is used.

## Scope

This is an independent presentation concept—not an official Millie's website, connected ordering system, or deployed site. Custom customer accounts, unique member IDs, account databases, and admin tools are not implemented in this prototype; they can be scoped as a separate production phase.
