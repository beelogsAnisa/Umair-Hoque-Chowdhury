# Rent A Party NY — website concept

An independent responsive site concept adapted from the KAD Party Rentals design project. The original KAD project remains in `/home/user/kad-party-rentals/`; this folder is a separate copy tailored to Rent A Party NY.

## Preview locally

From this folder, run:

```bash
python3 -m http.server 4180 --bind 0.0.0.0
```

Then open `http://localhost:4180` in a local browser. The prototype is plain HTML, CSS, JavaScript, and optimized local images; there is no build step or external runtime dependency.

## What’s included

- Responsive home page with an image carousel, section navigation, category cards, gallery/lightbox, FAQs, and reduced-motion/accessibility behavior.
- Searchable, filterable rental list based on categories and details published on Rent A Party NY’s public Wix pages.
- Interactive quote list with quantity controls, local browser storage, and a request form for event date, location, contact details, and notes.
- Email and phone links using the contact details listed on the supplied official site.
- A tailored outreach draft (`outreach-message.md`), prospect notes (`pitch-notes.md`), primary-source research notes, and image provenance.

## Accuracy and connection limits

- This is a **concept only**, not Rent A Party NY’s official site. It is not connected to their booking, inventory, email, CRM, or payment systems.
- The quote form assembles a draft email to `rentapartyny@gmail.com` or copies the request. It does not submit or reserve anything.
- The official service pages do not publish item-specific rates. The separate store route currently uses generic “I’m a product” placeholder listings; those sample prices are not attributed to real rental items here.
- Confirm current inventory, rates, availability, service area, delivery/setup options, terms, capacities, and all final copy with the business before launch. A public inquiry/quote flow shows the site solicits inquiries, but it does not establish date-specific availability.
- No official Instagram handle was verifiable from the supplied site or exact-name/contact searches, so the concept intentionally has no Instagram link.
- Gallery and product images are optimized copies of images displayed on Rent A Party NY’s public Wix site. Confirm permission and obtain approved, current assets before publishing a commercial site.

## Project files

- `index.html` — site structure and copy.
- `styles.css` — responsive visual system and component states.
- `app.js` — catalog filtering, quote builder, mobile navigation, carousel, and gallery interactions.
- `assets/` — optimized local images, favicon, and concept wordmark assets.
- `research/` — primary sources, verification notes, and image provenance.
- `outreach-message.md` — draft outreach only; no message was sent.
