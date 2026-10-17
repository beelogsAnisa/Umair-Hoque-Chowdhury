# Open-source UI & motion research

Research date: **17 October 2026**. The shipped site is dependency-free: the examples below were studied for patterns, not loaded from a CDN.

## Uiverse — copyable UI pattern library

- Platform: [Uiverse](https://uiverse.io/) presents community-created HTML/CSS, Tailwind and React UI snippets with source code.
- Reference snippets reviewed: [cbolson's checkbox](https://uiverse.io/cbolson/calm-wasp-75), [Jeremy's CSS loader](https://uiverse.io/jeremyssocial/ugly-bullfrog-62), and [Darlley's Tailwind switch](https://uiverse.io/Darlley/jolly-yak-41). The pages identify the examples as MIT-licensed.
- **Used as a pattern:** the menu category chips borrow the checkbox's clear hover/focus/selected feedback: a small checkmark reveals on hover/focus and stays present for the selected state. This is adapted to real buttons with `aria-pressed` (not a decorative fake checkbox), touch-friendly hit areas, and Puglia's palette. The attribution is also commented in `styles.css`.
- Why use the pattern: menu category selection should be understandable both by sight and by assistive tech, and should not depend on hover for touch users.

## AOS — Animate On Scroll

- Repository/docs: [AOS on GitHub](https://github.com/michalsnik/aos) · [documentation](https://michalsnik.github.io/aos/).
- AOS popularized declarative `data-aos` reveal patterns and provides a useful catalogue of fades, flips, and zooms. The repository page showed its 3.0.0 beta line last updated in 2018; rather than introduce a stale dependency for a small set of entrances, the site uses native `IntersectionObserver` with a handful of CSS transforms.
- `data-reveal="up|left|right"` makes the effect easy to inspect/change in `index.html`; `prefers-reduced-motion` disables motion and leaves content visible. No scroll-triggered animation is required to understand the page.

## Animista — generated CSS animation reference

- [Animista license](https://animista.net/license) states its generated CSS is free for personal and commercial use under the FreeBSD License.
- Reviewed as a source of lightweight timing/transform ideas. No Animista code is bundled into this concept; the hero entrance, ticker and stamp use short custom keyframes in `styles.css`.

## Visible code patterns used here

The actual hover/focus/selected-state CSS is in `styles.css` (the menu filter controls use real buttons, not hover-only pseudo-checkboxes):

```css
.menu-filter:hover .filter-mark,
.menu-filter:focus-visible .filter-mark { opacity: .72; transform: scale(1) rotate(0); }
.menu-filter.is-active .filter-mark { opacity: 1; transform: scale(1) rotate(0); }
```

The scroll entrance is a small native observer in `app.js`; it stops observing an element once it has appeared:

```js
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.13, rootMargin: '0px 0px -36px 0px' });
```

## Where to inspect the implementation

- `styles.css`: menu-filter hover/focus/selected mark; reveal transitions; ticker/stamp/hero keyframes; `prefers-reduced-motion` fallback.
- `app.js`: `IntersectionObserver`, keyboard menu-search shortcut, responsive menu filtering, mouse-only hero parallax, and standard `<dialog>` behavior.
- No AOS or animation package is imported. This keeps assets local, the page fast and motion easy to audit.
