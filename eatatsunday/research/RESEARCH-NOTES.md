# Sunday C&C Bakery — research notes

**Checked:** 2026-10-14 (America/New_York)  
**Target:** a distinctive, small-business website for SUNDAY C&C BAKERY, not a redesign of the Square ordering storefront.

## Identity and verified contact details

- **Name:** SUNDAY C&C BAKERY. The Google Maps listing and the business’s Square materials use this name.
- **Address:** 189 Wilson Ave, Brooklyn, NY 11237. This is shown by the Google Maps business listing and the recent Bushwick coverage/listings reviewed.
- **Phone:** (305) 200-9414, as listed on Google Maps and several business directories.
- **Social:** [Instagram @eatatsunday](https://www.instagram.com/eatatsunday/?hl=en). Direct page retrieval returned HTTP 403; use indexed profile information only as secondary evidence.
- **Official Square storefront:** [eatatsunday.square.site](https://eatatsunday.square.site/). Its root page has displayed “now located on 348 Bowery, New York, NY,” while the [order page](https://eatatsunday.square.site/s/order) offers a SUNDAY C&C BAKERY location at 189 Wilson Ave. This is a meaningful inconsistency, so the site links to Square only with a visible request to verify the Wilson Ave location before checkout.

## Hours — public sources disagree

The site intentionally does not calculate “open now.” Its native disclosure says **“Google Maps currently lists”** the following schedule: Tuesday–Thursday and Sunday, 9 AM–3 PM; Friday–Saturday, 9 AM–3 PM and 5–10 PM; Monday closed. The page then notes that the listing differs from other public information and that dinner is described as select-night service.

Cross-checks did not produce a single reliable, consistent schedule:

- The supplied Google Maps listing showed 9 AM–3 PM Tuesday–Thursday and Sunday, plus 5–10 PM dinner on Friday and Saturday, with Monday closed (captured during the initial listing review).
- Instagram’s indexed bio showed Tuesday–Sunday, 9 AM–5 PM. The Instagram page itself was not accessible for direct confirmation.
- The [Corner listing](https://www.corner.inc/place/paWq2FcVwg3b), updated October 13, 2026, displayed 9 AM–3 PM daily except Monday.
- The [Apple Maps listing](https://maps.apple.com/place?place-id=IC3F33336CCA31C18) displayed 9 AM–5 PM Tuesday–Sunday and Monday closed in the October 14 search snapshot.
- Indexed TikTok content said dinner is on select nights. Aggregators and older listings also conflict.

**Decision:** keep the Google Maps schedule explicitly attributed inside a disclosure; show the discrepancy and link directly to current Maps/Instagram. Do not treat any schedule as independently verified by the business.

## Brand story and menu cues

- The official [Square about page](https://eatatsunday.square.site/about) describes owner/chef Christian Torres, the Miami food-truck origin, the nostalgic “slow Sunday” idea, seasonal menu changes, and the original plant-based concept. This is the source for the restrained founder-story copy. The public page’s old address context is not carried over as a current location claim.
- The [Corner listing](https://www.corner.inc/place/paWq2FcVwg3b), reviewed alongside public customer reviews, describes guava morning buns, non-traditional croissants, focaccia sandwiches, arepas, and coffee drinks. These are **third-party menu cues, not a confirmed current menu**.
- The website shows four examples—Guava Morning Bun, Croissant, Coffee + Cositas, and Focaccia Sandwich—with no prices. The copy calls them editorial highlights, asks visitors to check current availability, and avoids a claim that any named dish is always stocked.
- No vegan/plant-based promise, allergen guarantee, or dietary suitability claim is made for the current Bushwick menu. No exact price is published.
- [The Infatuation’s January 8, 2026 review](https://www.theinfatuation.com/new-york/reviews/sunday-c-and-c-bakery) describes the concept’s move from its earlier market locations to Bushwick and its bakery/small-lunch direction. It is used as context, not as proof of present stock or hours.

## Image and brand assets

The first gallery/interior image the user approved—warm café lighting and orange ceramic tile—is preserved as `assets/cafe-interior.jpg` and featured prominently in the visit section. Other page imagery uses these optimized local files:

- `assets/brand-mark.png` — cropped/optimized from the Square-hosted Sunday wordmark.
- `assets/sunday-origin.jpg` — optimized Square-hosted story photo showing a person beside a SUNDAY-branded trailer; the HTML alt text does not assign the person a name.
- `assets/morning-table.jpg`, `assets/pastry-case.jpg`, `assets/coffee-table.jpg`, `assets/focaccia-sandwich.jpg`, `assets/cafe-interior.jpg`, `assets/cafe-counter.jpg` — selected and optimized from photos served in the Google Maps gallery through Corner’s listing/CDN.

**Rights status:** attribution and commercial reuse rights for the gallery photographs were not independently established. The source pages are referenced here for provenance, not as a license. Before launch, obtain photographer/business permission or swap in approved assets. The visual preference for orange ceramic is honored, but the current file should still be approved for commercial reuse.

## Primary/secondary sources reviewed

1. [Google Maps business listing](https://www.google.com/maps/place/SUNDAY+C%26C+BAKERY/@40.7002296,-73.9235163,19z/data=!4m15!1m8!3m7!1s0x89c25c11aa458453:0x8b29c89949c0c67c!2sBushwick,+Brooklyn,+NY!3b1!8m2!3d40.6957755!4d-73.9170604!16z!3m5!1s0x89c25930e8abf21f:0x8d3712d0c265cc1c!8m2!3d40.6995019!4d-73.923208!16s%2Fg%2F11t__699j0) — business name, address, phone, rating snapshot (4.8 / 235 at initial review), gallery, and the hours schedule captured for the on-page disclosure.
2. [Official Square storefront](https://eatatsunday.square.site/) — current brand presentation and the conflicting Bowery address.
3. [Official Square about page](https://eatatsunday.square.site/about) — story, founder, seasonal/plant-based origin context.
4. [Official Square order page](https://eatatsunday.square.site/s/order) — link destination and Wilson Ave option; item list is not treated as current because of location/rotation ambiguity.
5. [Instagram profile](https://www.instagram.com/eatatsunday/?hl=en) — direct page blocked (403); indexed bio used only as conflicting hours evidence.
6. [Corner business/photo listing](https://www.corner.inc/place/paWq2FcVwg3b) — updated Oct 13, 2026; third-party menu descriptions, reported hours, and source for Maps-gallery photo links.
7. [The Infatuation review](https://www.theinfatuation.com/new-york/reviews/sunday-c-and-c-bakery) — Jan 8, 2026 context on the business’s relocation and bakery/small-lunch format.
8. [Apple Maps listing](https://maps.apple.com/place?place-id=IC3F33336CCA31C18) — additional conflicting hours snapshot; not used as the definitive schedule.
9. Indexed [TikTok account](https://www.tiktok.com/@eatatsunday) — “select nights” dinner phrasing; not direct confirmation of current service.

## Publication checklist

- Confirm the canonical public address and which Square location is current.
- Ask the business to approve hours, menu highlights, ordering destination, copy, logo, and image rights.
- Replace third-party user-gallery photography if commercial permission cannot be documented.
- Recheck hours, ordering link, Instagram, and availability on launch day.
- Deploy the static `eatatsunday/` directory under the requested `/eatatsunday/` path only after approval. **No domain deployment or DNS changes have been made.**
