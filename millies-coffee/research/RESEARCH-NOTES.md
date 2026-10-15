# Millie's Coffee Co research notes

**Checked:** October 14, 2026. Primary sources were prioritized. Menus, hours, loyalty terms, and seasonal specials can change; confirm them with Millie's before public launch.

## Official channels and location

- [Millie's Coffee Co on Instagram](https://www.instagram.com/milliescoffeenyc/) — the supplied business account. Page-reader retrieval returned HTTP 403; its search-indexed profile description says “Coffee | Community | Creative Culture” and references in-house roaster @kapetidroasters.
- [Millie's Coffee Co on Toast](https://toast.app/r/millies-coffee-co-25-83-31st-street/order) — location-specific menu, order, directions, and loyalty listing.
- [Millie's Coffee Co on Google Maps](https://www.google.com/maps/search/?api=1&query=25-83+31st+St+Astoria+NY+11102) — directions link used by the concept.
- No separate official standalone website surfaced in the search. The confirmed ordering channel is Toast, and the supplied Instagram is the confirmed social account. A speculative demo domain appearing in search was not treated as an official source.

Toast identifies Millie's Coffee Co at **25-83 31st Street, 1st Floor, Queens, NY 11102** and provides **(929) 661-8519**. The Toast order page displayed the location as closed and its hours table as closed at the time of retrieval; this can be a live availability or incomplete-hours state. The concept links to Toast instead of hard-coding a schedule or promising orders are available.

## Menu and product copy

- The Toast menu search result lists signature drinks including **OG Millie Latte**, **Purple Crown Latte**, **Rice and Shine Oat Latte**, **Silk + Sonic Soy Latte**, **Manila Mist Espresso Tonic**, **Sunset in Siargao**, **Strawberry Fields Matcha Latte**, **Sakura Blossom Latte**, and **Knickstape Thai Tea Latte**. Item names only are treated as current-menu highlights; prices are omitted.
- The official Toast page states **10 points per dollar spent** and **50 points for signing up**. The estimator on the concept illustrates points only and does not invent a redemption value.
- **Sage Séance** and the seasonal ingredient list—matcha, milk, housemade fig & sage jam, vanilla cold foam, black lava salt, and dehydrated fig—come from the user-supplied Fall-menu post. A [Mommypoppins fall feature](https://mommypoppins.com/new-york-city-kids/restaurants/fall-eats-treats-kids-nyc) also identifies Sage Séance and its housemade fig-and-sage jam as a Millie's seasonal drink. Availability is seasonal and not guaranteed.
- **Purple Crown**: a local [Infatuation review](https://www.theinfatuation.com/new-york/reviews/millies-coffee-co) describes Millie's ube cheesecake cold foam; the Toast menu lists Purple Crown Latte. The concept describes this as a menu highlight, not a complete recipe.
- **Filipino-inspired, sibling-run café**: supported by the same Infatuation review and the supplied café reference. The concept uses the business's official Instagram phrase “Coffee · Community · Creative Culture.”

No weekly hours, static prices, or online-order availability are promised. Current items and participation rules should be confirmed through Toast.

## Asset provenance

- `assets/millies-logo.webp` — transparency-processed copy of the official Toast banner wordmark. Original PNG: `research/source-assets/millies-toast-banner.png`.
- `assets/drink-lineup.webp` — optimized from supplied `image-4.png`.
- `assets/cafe-interior.webp` — crop from supplied `image-5.png`, trimmed to remove carousel controls and overlaid caption.
- `assets/fall-drinks.webp` — crop from supplied `image-2.png`, trimmed to focus on the seasonal drink lineup.
- `assets/sage-seance-product.webp` — crop from supplied `image-1.png`, centered on the seasonal drink.
- `assets/sage-seance-glass.webp` — transparent cutout of the featured drink glass from supplied `image-1.png`.
- `assets/sage-seance-glass-curved.webp` — a derived texture from that cutout, horizontally remapped for a front-facing view on curved cup facets; it is not a separately generated angle or sprite frame.

The images were user-provided; no generated food photography is used. Their availability in the conversation does not itself establish publication rights. Ask Millie's for approval or approved assets before launch.

## Design notes

The supplied image-7 is the composition and UI blueprint for the dark-coffee hero, centered product, stacked menu-card, story, and quiz rhythm; Millie's identity, copy, and supplied imagery replace its unrelated brand elements. The site uses four switchable color stories—Roast (default), Sage, Fig, and Caramel—based on the supplied references. Its enlarged cup is a 48-facet CSS 3D frustum: the real Sage Séance photo cutout is sampled across curved front facets rather than rotated as one flat billboard or a pre-rendered sprite sequence; shaded facets form the sides and back. It has eased scroll-linked rotation, pointer tilt, tap-to-spin, facet-level glass highlights, and a scroll-responsive liquid-wave slosh. The coffee-bean motion, hover lifts, filters, points estimator, and mood picker are concept interactions. Respect reduced-motion preferences.

The site is an independent pitch concept; it is not official, connected to Toast, or deployed. Secure user accounts, unique member IDs, a loyalty database, and admin systems are not included in the prototype and would require a scoped implementation phase.
