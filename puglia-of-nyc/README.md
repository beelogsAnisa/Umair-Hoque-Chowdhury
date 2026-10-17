# Original Puglia — Little Italy website concept

A responsive, static-site concept for Original Puglia at 189 Hester Street in New York's Little Italy. The latest pass keeps the charcoal editorial base but uses a signboard-inspired, locally bundled blackletter wordmark and hero headline. The overhead pizza is an isolated transparent cutout, enlarged and slowly spinning in 2D with roughly half cropped beyond the hero’s right edge—no 3D perspective. It is a review concept, not an official Puglia website or a live booking system.

## Preview

No build step, install, package manager or external runtime is required. From this folder, run:

```bash
python3 -m http.server 4181 --bind 0.0.0.0
```

Then open `http://localhost:4181`. The preview server for this project may be started on port **4181**; port 4180 is used by another project.

## What works

- Responsive navigation with mobile disclosure and keyboard support.
- Menu filters and search across dishes, descriptions, prices and menu sections; `/` focuses search and Escape clears it.
- Reservation inquiry planner for preferred date/time/party size, followed by a copyable inquiry summary and the restaurant's published phone/DM paths; it does not submit a request or claim availability.
- Click-to-enlarge image viewer.
- Scroll progress, in-view reveals, restrained hero pointer response, and reduced-motion handling.
- Address/directions, `tel:` and general-inquiry email links, plus the social URLs linked from Puglia's official home page.
- All page imagery and the UnifrakturMaguntia display font are local; the preview needs no external fonts, scripts or stylesheets.

## Files

- `index.html`, `styles.css`, `app.js` — site source.
- `assets/` — local site imagery, the transparent pizza cutout, bundled display font, and text-only SVG favicon.
- `research/RESEARCH-NOTES.md` — source review, factual guardrails and known conflicts.
- `research/ANIMATION-RESEARCH.md` — open-source interaction research and implementation choices.
- `research/ASSET-ATTRIBUTION.md` — source and rights notes for the downloaded site imagery.
- `PROJECT-NOTES.md` — launch checklist and content decisions.

## Important verification before any public launch

Puglia's home page invites reservation requests by phone or Facebook/Instagram direct message and says hours/days can vary. Its menu/footer says not to email reservation requests. The concept follows that instruction and offers only contact links. It does not check booking availability or promise a date.

Hours and party-package pricing conflict across official pages, and the drinks/dessert and pizza pages are older. The design therefore shows only opening times stated on the newer home page, clearly qualifies the hours, and warns that online prices may have changed. Confirm all details with Puglia before publication. The restaurant's history and live-music copy are attributed to its own site rather than presented as independently verified facts.

The hero pizza is an AI-generated illustrative cutout with a true transparent background, not a Puglia photograph or verified menu dish; replace it with approved current photography or video before launch. The original site images are public-gallery reference material, but reuse permission has not been independently verified. Clear or replace them before publishing a commercial site.
