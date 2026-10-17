# Puglia business & site research

**Checked:** 17 October 2026. Primary-source-first review of Puglia's public website. This is a factual working note for a design concept, not legal, historical or operational due diligence.

## Business basics

| Detail | Public source / wording | Handling in the concept |
|---|---|---|
| Name | Official site metadata: “Original Puglia Restaurant”; site branding: Original Puglia | Uses “Original Puglia” and clearly labels the redesign as a concept. |
| Address | Official site metadata and footer: 189 Hester Street, New York, NY 10013 | Used in contact, map and footer. |
| Phone | Official site: (212) 966-6006 | `tel:+12129666006` contact links. |
| General email | Official metadata/footer: `inquiry@pugliaofnyc.com` | Offered for general inquiries only. |
| Reservations | Current homepage asks guests to DM Facebook/Instagram or call; menu footer explicitly says not to email reservations. | Phone and DM links only. No online reservation submission, no availability promise, and no booking confirmation. |
| Social | Official homepage schema links Facebook, Instagram `pugliarestaurantny` and TikTok `pugliarestaurantnyc`. | Uses these linked URLs; current account activity/ownership was not independently checked. |

## History and positioning

- The restaurant's own [About page](https://www.pugliaofnyc.com/about) and [Welcome/story page](https://www.pugliaofnyc.com/welcome) say Gregorio Garofalo began the business in 1919, that the restaurant is family-run, and that it remains at the original Hester Street location. These are **the business's claims**, not independently verified history.
- The homepage says “Celebrating 107 years,” while the About-page headline says “Family owned × family operated for 106 years.” Both are business-authored claims and the displayed count conflicts. The concept uses the 1919 founding date only as attributed brand history; it avoids a current year-count and does not state independent verification.
- The [party page](https://www.pugliaofnyc.com/party) describes two dining rooms and asks groups to call. The concept repeats that description and sends users to the phone rather than inventing venue capacities or party services.
- The [homepage](https://www.pugliaofnyc.com/) advertises “Live music every night.” The concept says live music is advertised on open nights, with lineup/schedule subject to confirmation. It does not name a current residency.

## Hours: unresolved discrepancy

- The primary [homepage](https://www.pugliaofnyc.com/) lists: Wednesday from 4 pm; Thursday from 4 pm; Friday from 12 pm; Saturday from 12 pm; Sunday from 3 pm. It says hours/days can sometimes vary. The page does not state closing times or a Monday/Tuesday schedule.
- The separate [welcome2 page](https://www.pugliaofnyc.com/welcome2) gives different details (Thursday from 3 pm, Friday/Saturday from noon, Sunday from 3 pm, with 11 pm closings) and is much older: sitemap modification date 2021-02-03. The homepage is newer (sitemap modification date 2026-02-27).
- The concept shows **opening times only** from the newer homepage, omits Monday/Tuesday and closing-time assumptions, and advises callers to confirm. Confirm directly with Puglia before launch.

## Menu and group-pricing caveats

- Parsed public pages: [dinner menu](https://www.pugliaofnyc.com/menu), [pizza menu](https://www.pugliaofnyc.com/pizza-menu), [drinks/dessert menu](https://www.pugliaofnyc.com/dessert-menu), [party page](https://www.pugliaofnyc.com/party), [published $28.95 menu](https://www.pugliaofnyc.com/pre-fixed-menu-2395), [published $46.95 menu](https://www.pugliaofnyc.com/prefixedlunch-menu) and [published $56.95 menu](https://www.pugliaofnyc.com/prefixedlunch-menu-1).
- Sitemap modification dates observed: dinner menu 2026-02-19; pizza and drinks/dessert 2023-08-24; $56.95 group page 2026-06-18; $28.95/$46.95 group pages have older/unclear freshness. The `$56.95` page describes a Friday/Saturday 8 pm requirement and other party-of-10 terms; details need confirmation before reuse.
- Price conflict: stale welcome page lists $35.95/$49.95; the current set of party/menu pages publishes $28.95, $46.95 and $56.95 in different contexts. Do not present a single fixed package price as current without confirmation.
- Dinner entries/prices were transcribed from the public dinner page; the pizza and drinks/dessert categories were parsed from their public pages. The concept labels online prices as subject to change, includes a specific note that some source pages are older, and links out to original pages. Confirm current menu, modifiers, beverages, ingredients and prices with the restaurant.
- A 3.5% cash discount is stated on some menu pages, but omitted from the concept pending operational confirmation. No allergy/dietary claims are added; guests are told to ask the restaurant about ingredients.
- `/catering-menu` currently returns 404; do not use it as a working menu link.

## Events and entertainment

- The [entertainment page](https://www.pugliaofnyc.com/entertainment) has performer bios and historic photos (including Jorge Buccio and Debra Ente). It does not prove a current lineup or residency; the redesign links to the page but does not promise either performer.
- The [events/news page](https://www.pugliaofnyc.com/eventsholidays) contains past dated items as of 17 October 2026. It is omitted as an upcoming-events source until Puglia confirms current events.
- The homepage advertises music; the redesign uses “check the schedule” language and directs visitors to phone/social channels.

## Images and rights

- The source asset set contains 41 images downloaded from the restaurant's public Squarespace CDN, with a contact sheet at `contact-sheet-source.jpg`. The chosen WebP files are optimized versions in `/assets` and listed in `ASSET-ATTRIBUTION.md`.
- Most gallery/performance photos are older images from Puglia's existing public site. Their presence online does not establish reuse rights. The concept labels them as historical/public-gallery material; obtain written permission or replace them before production.

## Open-source motion research

See `ANIMATION-RESEARCH.md` for Uiverse (MIT-identified component examples), AOS and Animista. Production code is intentionally dependency-free, with custom CSS and native `IntersectionObserver`, touch-safe controls and reduced-motion handling.
