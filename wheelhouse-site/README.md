# The Wheelhouse — Bushwick site concept

A bespoke, responsive static-site concept for The Wheelhouse in Bushwick. It uses the supplied visual direction—acid-lime fields, forest-green type, orange accents, oversized condensed display type, loose circular marks, and food photography—while keeping the copy and calls to action specific to Wheelhouse.

## Run the site

No build step or third-party dependencies are required. From this folder:

```bash
python3 -m http.server 4174 --bind 0.0.0.0
```

Then open `http://localhost:4174/` locally. The page also works as a folder on a static host; keep `index.html`, `styles.css`, `app.js`, and `assets/` together. No Wheelhouse deployment destination or public path has been configured in this package.

## Interactions

- Responsive navigation with a compact mobile menu, Escape-to-close, and link-close behavior.
- Filterable featured menu highlights: sandwiches and comfort-food classics.
- “Let the Wheelhouse pick” highlights a random item in the active category.
- Open-now / next-opening status uses `America/New_York` and the official posted schedule.
- Happy-hour badge changes when the viewer is within the posted 3–7 PM window.
- Smooth anchor links, hover feedback, reduced-motion handling, and scroll-in reveals.
- Order links open the official ChowNow location. Directions, telephone, email, Instagram, and catering inquiry links are included.

## Research and content decisions

Primary sources reviewed for this build:

- [Wheelhouse official homepage](https://www.wheelhousebushwick.com/) — current homepage promotes daily happy hour, Wednesday trivia at 7 PM, weekend bottomless brunch, gourmet sandwiches, craft beer, wine, and catering; it also lists the address, phone, email, and hours.
- [Wheelhouse home page](https://www.wheelhousebushwick.com/home) — official visit information and food/menu imagery.
- [Wheelhouse menu page](https://www.wheelhousebushwick.com/menu) — image-based menu scans.
- [Official online ordering](https://order.chownow.com/order/33202/locations/49635?add_cn_ordering_class=true) — featured item names, descriptions, and prices used for the menu cards.
- [Wheelhouse Instagram](https://www.instagram.com/thewheelhousebk/) — official social profile linked from the business site.
- [Bushwick Daily opening coverage](https://bushwickdaily.com/restaurants/2252-the-wheelhouse-opens-on-wilson-ave-making-bushwick-a-bonafide-grilled-cheese-mecca/) — historical context for the restaurant’s grilled-cheese roots.

Details represented in the prototype:

- **Address:** 165 Wilson Ave, Brooklyn, NY 11237
- **Phone:** (718) 483-9970
- **Email:** wheelhousebushwick@gmail.com
- **Official posted hours:** Sunday–Thursday, 11:30 AM–10 PM; Friday–Saturday, 11:30 AM–11 PM
- **Official homepage promotions:** happy hour every day, 3–7 PM; Wednesday trivia at 7 PM; weekend bottomless brunch. No brunch price, time window, or reservation claim is invented.
- **Online-menu examples:** Panavia Tornado $19, Braised Short-Rib Sandwich $19, Jerky Boy Sandwich $18, Build Your Own Grilled Cheese $11, Creamy Mac & Cheese $9, Roasted Tomato Soup $6, and Wheelhouse Cheeseburger $18. The Panavia description and “award-winning” label are from the ordering page.

The older printed menu scans and the online ordering menu show different prices for some dishes. This concept uses the ordering menu’s more recent listed prices and sends visitors to the live ordering page for current availability and pricing. The ordering page returned only its skip-navigation text on the final automated recheck, so verify the featured items and prices before launch. Prices, hours, and weekly promotions may change; reconfirm them before publishing. The official event archive includes old dated listings, so those are not presented as current events. No “book a table” or reservation button is included because the official site has no reservation destination.

## Before a public launch

This is a front-end concept, not a live ordering, reservations, or catering system. Ordering is handed off to ChowNow; catering inquiries go to the publicly listed Wheelhouse email. Confirm the current menu/prices, hours, promotions, approved image usage, and catering workflow with the restaurant before publishing. The downloaded photography and logo are official-site assets for this prototype; obtain any necessary permission for production use.
