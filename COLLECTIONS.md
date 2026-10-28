# Collections

The existing React/Vite landing page remains at `/`. Its Collections section now links to two static, build-generated sections:

- `/collections/aesthetics/`: aesthetic groups, each containing any number of collages.
- `/collections/edits/`: thematic shopping groups, such as green bags.

Examples:

- `/collections/aesthetics/controlled-wild/`
- `/collections/aesthetics/controlled-wild/animal-print-controlled-dose/` (currently a draft)
- `/collections/edits/green-bags/`

## Repeatable content updates

Edit `content/collections.mjs`:

1. Add an aesthetic to `aesthetics`, or a shopping theme to `editTopics`.
2. Add a collage to `collages`, with `section`, `group`, a unique `slug`, title, useful description, accurate image alt text, product names and the image filename. Multiple entries may share one group; there is no one-collage limit.
3. Place the image in `content/drafts/assets/`. This source folder is outside `public`; unpublished images are not copied into a production build.
4. Review image usage, product colors, current availability, affiliate disclosures and the matching collection destination. The initial boards include items with unresolved stock/destination issues and are intentionally drafts.
5. Set `status: 'published'` on the reviewed collage. Its group and detail page will appear automatically on the next normal build.

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

## Homepage content and rotation

The homepage is a mixed-format portfolio. Edit `content/home.mjs` to add real
articles, videos, photos or edits. Existing entries are channel destinations,
not claims that particular posts have been imported. Keep newest pieces first;
set `featured: true` to include a piece in the spotlight. Each entry supports
`category`, `label`, `title`, `description`, `url`, `visual`, `tone`, `image`, and
`action`. Use only existing, authorized images. No social feeds are synced yet.
The spotlight has manual selectors and optional eight-second rotation, disabled
for reduced-motion preferences. Search and category filters act on this list.
