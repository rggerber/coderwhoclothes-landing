# Collections

The existing React/Vite landing page remains at `/`. Its Collections section now links to two static, build-generated sections:

- `/collections/aesthetics/`: aesthetic groups, each containing any number of collages.
- `/collections/edits/`: categories → individual edits → outfit visuals.

Edits categories are separate from the unchanged Aesthetics grouping.

Examples:

- `/collections/aesthetics/controlled-wild/`
- `/collections/aesthetics/controlled-wild/animal-print-controlled-dose/`
- `/collections/edits/statement-bags-clutches/` → `/collections/edits/green-bags/` (legacy URL retained)
- `/collections/edits/fall-fashion/` → `/collections/edits/fall-fashion/nico/`
- `/collections/edits/fall-fashion/nico/elevated-denim/`

## Repeatable content updates

Edit `content/collections.mjs`:

1. For Aesthetics, add a group to `aesthetics`. For Edits, add a category to `editCategories` (slug, title, description, neutral cover color), then an individual edit to `editTopics` with its parent `category` slug. A category can contain any number of edits.
   - `groupPath(section, group)` is the single source for URLs. New edits use `/collections/edits/{category}/{edit}/`; never hard-code another URL pattern in templates or checks.
   - An optional explicit `path` retains a legacy URL. Green Bags remains at `/collections/edits/green-bags/`, including its existing `green-four-ways/` detail page. Its category membership changes navigation only; no redirect or duplicate page is needed.
   - Use `layout: 'editorial'` for an edit with an introduction, cover and responsive outfit gallery. Set `cover`, `coverAlt`, `coverWidth`, `coverHeight`, `searchTitle`, `metaDescription`, `shopUrl` and `shopLabel` in the content data. Every new edit can support any number of outfit visuals.
2. Add a collage to `collages`, with `section`, `group`, a unique `slug`, title, useful description, accurate image alt text, verified product names and the image filename. For supplied AI-assisted editorial interpretations, set `interpretation: true`, native `width` and `height` on each visual, and a visible `interpretation` explanation on its parent edit; omit unverified product names instead of inventing them. Multiple entries may share one group; there is no one-collage limit.
3. Place the image in `content/drafts/assets/`. This source folder is outside `public`; unpublished images are not copied into a production build.
4. Review image usage, product colors, current availability, affiliate disclosures and the matching collection destination. Keep new unapproved visuals as drafts; retain already approved content and destinations.
5. Nico uses only Rebecca's three final supplied JPEGs (`nico-elevated-denim.jpeg`, `nico-espresso-dressing.jpeg`, `nico-cream-camel-navy.jpeg`), copied without alteration. All Nico shopping CTAs use `https://shopmy.us/collections/8644947`. Exact product correspondence has not been independently verified, so visible copy identifies these as AI-assisted styling interpretations. Do not borrow products from Elevated Everyday or infer product names from these images.
6. Set `status: 'published'` on the reviewed collage. Its group and detail page will appear automatically on the next normal build.

Do not put normal retailer URLs in place of tracked affiliate destinations. The page-level collection CTA comes from the group's `shopUrl` and uses `rel="sponsored noopener noreferrer"`. Individual direct product CTAs can be added once their current tracked links are available; this version lists product names and provides the collection-level CTA.

## Build and preview

- `npm ci`
- `npm run build`: production collection pages with published collages only.
- `npm run preview:collections`: build and serve the six initial draft collages for review. All collection pages are `noindex,nofollow` in this mode, with a visible preview banner. This command is for review, not production.

`dist/` is the Vercel output directory. Keep Vercel's production build command as `npm run build`. Do not deploy `build:preview` as production. Static route directories include their own `index.html`, so links and refreshes work without a client-side catch-all rewrite; existing `/api/subscribe` is unchanged.

## Search and AI discovery

The generated HTML includes actual page content, product names, headings and internal links before JavaScript. Each page has a distinct title, description and canonical URL. CollectionPage/ItemList structured data mirrors the visible directory content. A normal build writes a sitemap containing public routes only, plus robots.txt. No fabricated product prices, inventory, ratings or offers are included. Search discovery and citations are not guaranteed.

Changing crawl/training access is separate from a content update. Current generated robots.txt allows normal crawling and does not opt out of training bots. Adjust explicit bot policies if desired before deploying.

## Verification

`node scripts/check-collections.mjs` checks the production build's routes, disclosures, internal links, sitemap and draft exclusion. Run after `npm run build`. The check also validates group references and unique collage paths in the content source.

## Homepage content

See `CONTENT-FEEDS.md` for article/video records, the Instagram feed connection,
cover metadata fetching, and prerendered search discovery.

## Editorial gallery and approval workflow

Images retain their original proportions (`height: auto`) with no cropping. Gallery links open an accessible native dialog with Escape/close controls and an original-image link; without JavaScript they open the original file directly. Outfit titles also link to crawlable detail pages. Category and edit breadcrumbs plus ItemList/BreadcrumbList data, canonical URLs, Open Graph/Twitter tags and sitemap entries are generated from the content records.

Keep category covers minimal and editorial. Optional image covers should include accurate alt text and native dimensions; preserve existing aesthetic moodboards. Gallery layout is three columns on desktop, two on tablet and one on phones.

Start from current main, make a feature branch, run `npm run build`, `node scripts/check-collections.mjs`, `node scripts/check-content.mjs` and `git diff --check`, then open a pull request. Inspect desktop and phone navigation, image opening/closing, disclosures and shopping destinations. Review the build's article-sync side effects and exclude unrelated content changes. Do not merge, publish or trigger production deployment until Rebecca approves the PR. Report an existing automatic Vercel preview if one is available; do not manually deploy one without approval.
