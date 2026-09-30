# Upstream provenance

Repository: https://github.com/rubzip/academic-portfolio-astro
Commit: 6f296c22bd2dc1712d39545835dc9cd4e4f4854b
License: MIT, copyright 2026 Rubén Gijón (included alongside this file).

`academic-portfolio.css` is copied from `src/styles/global.css`, removing only the Tailwind `@import`, `@custom-variant`, and `@theme` build directives. Original CSS rules are retained. Site markup uses its card, card-title, card-meta, body-sm, tag, btn, sidebar-avatar, sidebar-name, nav-links, and nav-link classes. Site-specific CSS adapts those components to the requested D-style single-page layout.

The light palette is copied from `light_default` in `src/config/themes.ts`. Font families and weights match `src/layouts/BaseLayout.astro`; local font files come from @fontsource/inter and @fontsource/jetbrains-mono 5.2.8, with their licenses included.

## D: layout and interactions

Repository: https://github.com/korbinianmoller/personal_website_template
Commit: 050a1f921e29f253efa392631cc866a44d5af754
License: MIT, copyright 2026 Korbinian Moller (included).

Downloaded the original live page HTML, `styles.css`, and `scripts/main.js` from https://korbinianmoller.github.io/ for comparison. The live page has search and single-selection filter chips which are absent from the published starter. We adapted that observed behavior to the existing publication data without copying the live page's personal content.

Adapted from the licensed template: hero-container / hero-image / hero-text structure; bio link-buttons row; responsive auto-fit 300px-minimum card grids with 2rem gaps; separate teaching/poster cards; mobile nav toggle; scroll-to-top behavior. `d-navigation.js` contains adapted template code. Native dialog semantics and reduced-motion support are retained. B's fonts, palette, and flat component styling replace D's decorative styling. CV content and the requested visitor map remain personal additions.
