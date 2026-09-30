# Ning Liang — academic website

A responsive static website combining restrained neutral styling with a single-page research portfolio. No build process or package dependencies.

## Preview

From this directory run `python3 -m http.server 8000` and open http://localhost:8000.

## Publish on GitHub Pages

1. Create a repository named `YOUR-USERNAME.github.io`, or use an existing website repository.
2. Put this directory's contents at the repository root, including `.nojekyll`.
3. In the repository's **Settings → Pages**, select **Deploy from a branch**, then **main / (root)** and save.
4. The personal site will be available at `https://YOUR-USERNAME.github.io/` after deployment. Relative asset paths also support project repositories.

## Visitor geography

The map is currently an honest empty state, not a live analytics integration. No simulated visitors or counts are shown, and no tracking requests are sent without configuration.

1. Register your deployed URL at https://mapmyvisitors.com/ and choose the flat map widget.
2. Copy the `d` parameter (widget ID) from the generated `map.js` embed URL into `visitorMapId` in `config.js`.
3. Redeploy. Verify with a real visit to the public website and the provider dashboard. Ad blockers may prevent the widget from loading.

The map uses approximate IP geography, not device GPS. With the widget enabled, the visitor's browser connects to MapMyVisitors. Its rendering, availability, and geographic accuracy depend on that service. Real tracking could not be tested without a user-owned widget ID.

## Content editing

- `index.html`: biography, projects, education, experience, teaching, recognition, and contact.
- `publications.js`: six publications and their exact CV statuses. Contribution summaries are derived from the CV and are not paper abstracts. Citation records use only available CV metadata.
- `style.css`: visual styling and responsive layout.
- `config.js`: optional visitor-map configuration.
- `assets/Ning_Liang_CV.pdf`: original CV, linked for download. It includes the phone number present in the source CV; the phone number is not displayed in the page itself.

The supplied myprofilepic.jpg is used as the profile photo. GitHub, Google Scholar, code links, and full abstracts were not supplied and have not been invented.

## Source and attribution

Personal and research content was adapted from the user-provided Ning_Liang_CV.pdf. Publication status and ongoing dates follow that document as supplied, including PhantomBox (ASPLOS 2027, to appear), TinyAct (MICRO 2026, to appear), and the CXL research project’s VLDB 2027 submission. The KV-cache project describes ongoing work targeting 4-bit precision or lower, rather than the superseded compression-result claim.

The empty map's geographic boundaries are derived from https://github.com/johan/world.geo.json, which uses public-domain Natural Earth data. Styling now directly reuses Academic Portfolio Astro’s MIT-licensed CSS, default light palette, component classes, and self-hosted fonts. See `vendor/UPSTREAM.md` for the pinned source commit and adaptation notes, and `vendor/LICENSE-academic-portfolio.txt` for its license. The layout and navigation are adapted from the downloaded MIT-licensed Korbinian Moller template. Publication filter buttons follow the downloaded live site’s single-active-filter behavior. The template’s mobile menu, bio navigation buttons, adaptive card grids, and scroll-to-top interaction are included. See `vendor/UPSTREAM.md` for provenance and intentional adaptations.

## User corrections after CV import

Ambarella internship ended August 2026. Added CSE550 Graduate Teaching Assistant for 2026, with the 2025 entry retained. Master’s degrees are separate entries. Projects and selected recognition are commented out. Teaching/posters use one column. Publication years 2026 onward have an accent border. The original downloadable CV is preserved as supplied.
