# SUNDAY C&C BAKERY — static site

A custom, responsive café website concept for **SUNDAY C&C BAKERY** in Bushwick. The visual language is specific to Sunday: warm cream, orange and cocoa tones, bakery/editorial type, a real orange-tile interior, and a persistent five-stop bottom dock inspired by the supplied app-screen reference (without reusing its branding or copy).

## Preview locally

No build step or third-party packages are required. From this directory:

```bash
python3 -m http.server 4175 --bind 0.0.0.0
```

Open `http://localhost:4175/` on your machine. Keep `index.html`, `styles.css`, `app.js`, and `assets/` together. The intended static-host path is `/eatatsunday/` (for example, `umairhoquechowdhury.site/eatatsunday/`); **this package has not been deployed and does not configure that domain**.

## Included interactions and accessibility

- Persistent bottom navigation on small and large screens; in-page links update the active section while scrolling.
- Custom inline SVG icons in the mobile dock, category controls, and decorative marks—no emoji glyphs for interface icons.
- Synchronized, keyboard-operable menu filters and a random “Pick me a treat” highlight, with screen-reader announcements.
- Fluid hero, decorative sticker, photo hover, scroll reveal, and a subtle fine-pointer-only parallax.
- Deliberate hover, visible keyboard-focus, and touch press states; motion is disabled for `prefers-reduced-motion`.
- Skip-to-content link, semantic sections, image alt text, native hours disclosure, and responsive layouts.
- External links use the official social and Square ordering destinations; telephone and directions links are included.

## Accuracy and content guardrails

- **Address:** 189 Wilson Ave, Brooklyn, NY 11237.
- **Phone:** (305) 200-9414.
- **Instagram:** [@eatatsunday](https://www.instagram.com/eatatsunday/?hl=en).
- The hours disclosure labels a captured Google Maps schedule as listing data and immediately flags conflicting hours from other public sources. There is no “open now” claim.
- Guava morning bun, croissant, coffee and focaccia are editorial menu highlights—not a promise of current stock, a complete menu, or dietary/allergen guidance. No prices or vegan/plant-based guarantees are presented.
- Square has displayed a conflicting Bowery address on its main storefront while its ordering page exposes a Wilson Ave location. The page prominently asks customers to confirm **189 Wilson Ave** before checkout.
- See [`research/RESEARCH-NOTES.md`](research/RESEARCH-NOTES.md) for the source-by-source checks and remaining launch caveats.

## Asset-use note — resolve before public launch

The wordmark and origin photo were taken from the business’s Square-hosted materials. The selected café and food photos were pulled from the Google Maps photo gallery via Corner’s listing/CDN. Their individual photographer credits and reuse permissions could not be verified. The site is therefore a prototype: obtain owner/photographer approval or replace those images with approved business assets before commercial publication. The unoptimized source pulls are retained in `research/source-assets/` in the workspace; the release ZIP omits them. Filenames used by the page are documented in the research notes.
