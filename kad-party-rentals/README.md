# KAD Party Rentals — responsive website concept

A pitch-ready, single-page website concept built as a no-dependency static project. It is designed for the business and its customers; the footer and quote builder identify it as a concept, not an official or connected booking system.

## Preview locally

From this directory, run:

```bash
python3 -m http.server 4180 --bind 0.0.0.0
```

Then open `http://localhost:4180`. The project is plain HTML, CSS, and JavaScript—no install step, framework, external font, or CDN is needed. All site images are local WebP files in `assets/`.

## What is interactive

- Responsive navigation with keyboard-friendly controls.
- Three-photo hero carousel with manual controls, touch swipe, and reduced-motion support.
- Occasion cards that jump to a relevant curated subset of rental categories.
- Searchable, category-filtered catalog based on KAD’s public listings.
- Persistent quantity-based quote list (only item IDs and quantities are saved in local storage).
- Indicative item subtotal, with call-for-price items kept separate.
- Quote request form that prepares an email to `kadpartyrental@gmail.com`, plus a copy-request fallback.
- Horizontal, draggable gallery with a keyboard-accessible photo viewer.
- Expandable FAQ, responsive layout, and reduced-motion styles.

## Before any public launch

This is a front-end demonstration, not a live booking or inventory system. The quote action opens the visitor’s own email application; this project does not transmit or store inquiries. Before launch, KAD should confirm current prices, rental periods, policies, email/phone routing, image rights, and the preferred social account. Replace the `mailto:` flow with an approved form endpoint if direct web submissions are desired, and add the appropriate privacy/security disclosures.

Catalog data is in the `products` array near the top of `app.js`. Every listed rate should be treated as indicative: the official pages’ sitemap dates to 2020, and one table rate is shown without a currency symbol. The site includes prominent customer-facing caveats for this reason.

## Files

- `index.html` — page structure and content.
- `styles.css` — responsive visual system and component states.
- `app.js` — catalog, filters, quote list, email generation, carousel, and gallery behavior.
- `assets/` — compressed images sourced from KAD’s public site/gallery for concept use.
- `research/RESEARCH-NOTES.md` — source-backed findings, uncertainties, and image provenance.
- `pitch-notes.md` — concise concept rationale and meeting talking points.
- `outreach-message.md` — optional first-contact draft.

## Booking-status note

On 2026-10-16, the user confirmed that KAD is currently taking bookings. This is user-provided confirmation; the public sources reviewed did not independently establish recent booking activity. See the research notes for details.
