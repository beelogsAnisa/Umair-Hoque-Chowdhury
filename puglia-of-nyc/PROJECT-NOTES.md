# Project notes — Original Puglia concept

**Status:** Static responsive concept built for review. This is not an official restaurant site, a reservation backend, a ticketing platform, or an availability checker.

## Product direction

An original “Little Italy after dark” direction, refined around the signboard image supplied by the user: charcoal texture, cream typography, and a stacked “Original Puglia” wordmark/hero headline in a locally bundled blackletter face chosen to echo that lettering. The overhead pizza is a true transparent cutout, enlarged and set half beyond the hero's right edge with a slow 2D spin; no 3D perspective. A reservation inquiry bar, menu spotlights and a marquee complete the layout. Puglia's own red/green/gold accents keep it specific without copying the supplied artwork as a page background.

## User journeys

1. **Find the basics:** address, public opening times, phone, map directions and linked social channels.
2. **Explore food:** searchable/filterable menu list with category controls and source/price caveats; links to Puglia’s full public pages.
3. **Ask about a table:** an optional date/time/party-size planner prepares a copyable inquiry summary, then routes users to phone or Instagram/Facebook DM; it does not check availability or create a booking, and reservations are never routed to email.
4. **Plan a gathering:** learn that Puglia describes two dining rooms and group menus; call for current pricing, rules and confirmation.
5. **See the atmosphere:** local image gallery with click-to-enlarge lightbox; captions make clear that the images came from the existing public site.

## Interaction and accessibility

- Semantic sections and headings, skip link, labelled controls, `aria-pressed` menu filters, live result count, keyboard `/` search shortcut and Escape support.
- Mobile nav opens as a disclosure; menu chips are touch-scrollable; gallery is tap-to-open, not hover-only.
- Native `<dialog>` elements, visible focus states and no forced custom cursor on touch.
- `IntersectionObserver` reveals, reduced-motion override, a low-cost scroll-progress indicator and desktop-only restrained pointer response.
- No external scripts/font requests or runtime library dependency; Unifraktur Maguntia is bundled locally under its SIL Open Font License. Uiverse/AOS/Animista findings and adaptation notes are in `research/ANIMATION-RESEARCH.md`.

## Content guardrails

- The logo is text-only—“Original Puglia” in a bundled Unifraktur Maguntia blackletter face selected to echo the user-supplied signboard. The sign's exact typeface has not been independently identified; no monogram is used.
- The hero pizza is generated illustrative artwork with a transparent background, not Puglia footage, an actual restaurant photo or a verified dish. Replace it with client-approved current photography/video before production.
- Family-history statements are attributed to Puglia's own account; no independent historical verification is claimed. The homepage says 107 years while the About-page headline says 106; the site avoids repeating a current-year count.
- Opening-time display intentionally uses the hours listed on the newer official homepage and omits closing times that page does not state. It flags that hours/days can vary.
- Public online menu prices are not represented as guaranteed current. Dinner, pizza and drink/dessert pages differ in age; consult the restaurant.
- Group-package prices are omitted from the concept because the official site has conflicting published prices and terms.
- No historical event, performer residency, review, dietary certification, online order service or current social posting is claimed.
- General email is labelled for general inquiries only. Reservation requests go by phone or direct message, not email.
- The concept does not independently verify current social account activity or photo rights.

## Before launch

1. Obtain written approval for the business name/brand and a final decision on domain/ownership.
2. Confirm current business hours, phone, contact route, live-music schedule and any upcoming event details.
3. Confirm the current dinner, pizza, dessert, drinks and party menus, prices, modifiers, group policies, deposit/payment terms, tax/gratuity language and accessibility/allergen information.
4. Confirm permitted image use or replace with licensed/current photography; approve captions and performer/guest images.
5. Confirm social profile URLs, current account ownership and whether messages should link to them.
6. Test with Puglia on real devices, assistive technology, keyboard-only navigation, screen-reader output and restaurant Wi-Fi/mobile conditions.
7. Connect the approved production domain, privacy/cookie practices, analytics (if desired) and a real booking workflow only if Puglia provides/authorizes one.

## Latest iteration & QA

- The pizza is now a true-alpha transparent cutout (the generated checkerboard preview was removed), enlarged and cropped by the hero edge; the image rotates slowly in 2D and respects reduced-motion preferences.
- Header/footer and hero title use a text-only blackletter wordmark inspired by the supplied signboard. Unifraktur Maguntia is a licensed visual approximation; the original sign typeface remains unidentified. The former P monogram is removed.
- Final static checks pass: `node --check app.js`; HTML/CSS parsing; 37 unique IDs; 26 local resources resolved; PNG verified RGBA with transparent corners; font/license/favicon files present. HTTP returns 200 for the page, CSS, JS, pizza cutout, font, favicon and supplied signboard reference. Browser automation was unavailable for this pass; the live preview is served on port 4181 for visual review.
- Updated package rebuilt and archive-tested successfully: `/home/user/puglia-of-nyc-concept.zip`.

**Research checked:** 17 October 2026. See `research/RESEARCH-NOTES.md`.
