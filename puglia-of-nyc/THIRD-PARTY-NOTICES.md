# Third-party notices

## Uiverse component pattern

`styles.css` includes an adapted menu-filter hover/focus/selected-state microinteraction informed by cbolson's Uiverse checkbox example: <https://uiverse.io/cbolson/calm-wasp-75>. The Uiverse example page identifies the snippet as MIT-licensed. The concept uses semantic buttons with `aria-pressed`, not the original control markup. See the comment beside `.menu-filter` in `styles.css` and `research/ANIMATION-RESEARCH.md`.

The header/footer wordmark and hero title use Unifraktur Maguntia, downloaded from Google Fonts and bundled locally under the SIL Open Font License. The complete license text is included at `research/font-licenses/UnifrakturMaguntia-OFL.txt`. It is a visual approximation inspired by the user's signboard image, not an assertion that this is the sign's original typeface.

No third-party scripts, libraries or image-CDN calls are bundled in the site. Uiverse, AOS and Animista are research references only; the shipped motion implementation is custom CSS plus native browser APIs.
