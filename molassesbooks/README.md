# Molasses Books — storefront redesign concept

A responsive, editorial storefront concept for Molasses Books in Bushwick. Built as a lightweight static site so it can be previewed immediately without a build step or third-party dependencies.

## Publish at `umairhoquechowdhury.site/molassesbooks`

This package is structured to be a **folder inside the existing GitHub Pages repository** that publishes `umairhoquechowdhury.site`—not a second Pages site.

1. Unzip `molassesbooks-github-pages.zip`.
2. Add the included `molassesbooks/` folder to the repository’s published root (or to its `docs/` folder if Pages is configured to publish `/docs`). Keep `index.html`, `styles.css`, `app.js`, and `assets/` together inside that folder.
3. Commit and push. The intended URL is `https://umairhoquechowdhury.site/molassesbooks/`; the page also redirects `/molassesbooks` to the trailing-slash version so relative assets resolve correctly.

Example layout when Pages publishes the repository root:

```text
your-personal-site-repo/
├── CNAME                  # keep the existing domain file here
├── index.html              # your existing personal homepage
└── molassesbooks/          # copy this whole folder from the zip
    ├── index.html
    ├── styles.css
    ├── app.js
    └── assets/
```

Keep the existing GitHub Pages settings and root `CNAME` for your personal domain; **do not** replace the root homepage or add a second `CNAME` inside `molassesbooks/`. If the site publishes from `/docs`, put the folder at `docs/molassesbooks/` instead. No build step, npm install, or framework is required.

## Run it locally

From inside the `molassesbooks/` folder:

```bash
python3 -m http.server 4173 --bind 0.0.0.0
```

Then open `http://localhost:4173/`.

## Interactions in this prototype

- Responsive navigation with a compact mobile menu.
- Searchable book catalog with category filters and price/title sorting.
- Book-detail dialogs and an inquiry bag that persists in the browser with `localStorage`.
- Quantity controls, removal, an inquiry-list builder, and copy-to-clipboard before continuing to Instagram.
- Copyable street address, map directions link, and newsletter form validation/feedback.
- Keyboard focus styles, Escape-to-close behavior, reduced-motion handling, and semantic labels.
- Cursor-reactive glass highlights, gentle 3D tilt on desktop, scroll-in reveals, an animated reading ticker, floating photo card, route pulse, and scroll-progress line. Touch users get press feedback without the hover-only tilt.
- “Surprise me” opens a random listed title from the catalog.

## Research notes / content decisions

- The official homepage describes Molasses Books as “a small used bookstore and bar in Brooklyn” and Molasses Books Publishing as an even smaller, infrequent imprint: [molassesbooks.org](https://www.molassesbooks.org/).
- Product titles, listed prices, sample images, and sold-out labels were drawn from the shop’s [homepage catalog](https://www.molassesbooks.org/) and [releases page](https://www.molassesbooks.org/releases). The live inventory can change; the prototype deliberately says to confirm availability and uses an inquiry bag rather than implying a live checkout.
- The shop’s contact page says it is not currently taking submissions: [contact page](https://www.molassesbooks.org/contact). No open-call copy or fabricated events were added.
- The address shown is 770 Hart Street, Brooklyn, NY 11237, consistent with the shop’s public listings. Third-party directories disagree on hours, so this design avoids publishing a potentially stale schedule and links visitors to a live listing instead.
- The public Instagram handle used for updates is [@molassesbooks](https://www.instagram.com/molassesbooks/).

## Before a real launch

This is a front-end demo, not a production commerce integration. The inquiry bag does not take payment or reserve stock. The newsletter form intentionally gives a transparent demo response and does not send/store email. Connect the shop’s chosen commerce, inventory, newsletter, and contact services before launch; then confirm all stock, prices, hours, text, and photo permissions with Molasses Books.

The storefront photos are reference images from public coverage (including [Bushwick Daily](https://bushwickdaily.com/fashion-and-shopping/618-bushwick-finally-gets-a-bookstore/) and [Brooklyn Paper](https://www.brooklynpaper.com/get-lit-faced-new-bushwick-bookstore-plans-to-serve-beer-wine-coffee/)); the shop photos should be replaced with current, approved photography or cleared for production use. Product imagery was drawn from the shop’s public catalog. The header/footer logo is based on the logo image provided for this redesign and recolored to fit the dark palette; confirm the final brand asset and usage rights before launch.
