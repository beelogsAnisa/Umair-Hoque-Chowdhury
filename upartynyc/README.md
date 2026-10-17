# U Party — Rental Quote Website (redesign concept)

A static, no-build website for **U Party** (East Harlem, Manhattan).
Plain HTML, CSS and JavaScript. Works offline from a folder, on GitHub Pages, or on any host.

## What's inside

| File | Purpose |
|---|---|
| `index.html` | Full single-page site: hero, catalog, planner, process, quote form, visit |
| `css/styles.css` | Dusk palette (plum / coral / orange / gold, from the reference), glassmorphism, animations, responsive layout |
| `js/config.js` | **Contact details and optional form endpoint. Edit this first.** |
| `js/data.js` | **The catalog (names, prices, categories).** Edit prices here. |
| `js/app.js` | Basket, planner, quote builder, validation, motion |

## Features

- **Catalog with live quantities.** Filter by category, search, +/− steppers.
- **Persistent basket.** Saved in the visitor's browser (localStorage). Floating basket drawer.
- **Smart planner.** Enter guest count and chair style. It suggests chairs (+10% spare) and one 48" round table per four guests, then adds them to the basket.
- **Quote request.** Collects event date, time, guests, delivery or pickup, address and ZIP, then sends the basket with it. Built-in validation and honeypot spam protection.
- **Two send modes:**
  - *No setup (default):* opens the visitor's email app with the full quote pre-filled to U Party.
  - *Inbox endpoint (optional):* paste a Formspree (or similar) URL into `formEndpoint` in `js/config.js` and requests arrive as form submissions.
- **Copy summary** button for phone or text.
- **Motion:** scroll reveals, 3D tilt cards with light sheen, magnetic buttons, cursor glow, animated marquee, parallax sun, count-up. Turned off automatically for users who prefer reduced motion. Touch devices get the touch-friendly versions.
- **Responsive:** desktop, tablet and phone. Phones get a bottom action bar (Call / Basket / Quote).

## Put it live at umairhoquechowdhury.site/upartynyc

GitHub Pages serves a custom domain from its root, so `/upartynyc` has to be a folder inside the site that already serves `umairhoquechowdhury.site`:

1. In the repo that serves `umairhoquechowdhury.site`, create a folder named `upartynyc`.
2. Put the **contents** of this folder inside it (`index.html`, `css/`, `js/`, etc.). The zip already has the right top-level folder, so you can extract it straight into the repo.
3. Commit and push. The site is then at `https://umairhoquechowdhury.site/upartynyc/`.

All links are relative, so the site works at any sub-path.

Preview locally: open `index.html` in a browser, or run `python3 -m http.server 8080` in this folder and visit `http://localhost:8080`.

## Before you send it to U Party: verify these

- **Prices.** Taken from `upartynyc.com/rentals`, checked Oct 2026. Confirm each one with the owner. Items marked *Quote* have no public price.
- **Tent and mesh sizes.** The rentals page lists "10x10 Gazebo Tent", "10x20 Gazebo Tent", "10x10 Mesh Net" and "10x20" with no price. The last item's wording is ambiguous, so confirm it is a 10x20 mesh net.
- **Hours.** The site doesn't publish hours, so the page says "call ahead to confirm hours". Add real hours if they give them.
- **Instagram and Facebook.** Both come from the homepage (`@upartynyc`). I could not load the Instagram profile to check it, so open it once before sending.
- **Award.** "Best Party & Event Rentals, Manhattan, 2024 reader vote" is from bestofnewyorkcity.com. Use the wording they agree to.
- **Photos.** The site uses no client photos, so the design stays clean and nothing is misattributed. Adding real event photos from their own shoot would strengthen the sell.

## Connect a real inbox (recommended before launch)

1. Create a free form at formspree.io, copy the endpoint URL (`https://formspree.io/f/xxxx`).
2. Paste it into `formEndpoint` in `js/config.js`.
3. Quote requests will arrive by email instead of relying on the visitor's mail app.

## Editing

- Add or change products: edit the `PRODUCTS` array in `js/data.js`. Each item has `id`, `cat`, `name`, `price` (use `null` for quote-only), `unit` and `note`.
- Colours: the `:root` block at the top of `css/styles.css`.
- Contact details: `js/config.js`.
