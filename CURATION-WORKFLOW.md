---
name: cwc-curation-pipeline
description: Create Rebecca Gerber's Coder Who Clothes four-product fashion collages, complete Pinterest copy, matching website collection pages and performance-led iterations. Use for new ShopMy edits, aesthetic or color collections, batch creation and recurring curation.
---

# Coder Who Clothes curation

## Select before checking stock
- Read current public ShopMy collections at https://shopmy.us/shop/coderwhoclothes and existing batch/website records. Choose exactly four distinct products for styling fit FIRST; then check exact retailer model, color and stock.
- Retain sold-out or unverified selections until Rebecca decides. Show clearly identified alternatives beside the originals. Never silently replace products, shrink to two or three items, alter tracked destinations or claim universal availability.
- Maintain stable batch/pin IDs and preserve approved originals. Keep stock status, image permissions, creative approval and publication status separate. Collage format does not establish image permission.

## Produce the visual
- Make 1000 × 1500 PNGs with the approved two-by-two four-product layout, cream or muted aesthetic backgrounds, readable dark type, Coder Who Clothes branding and exact CTA SHOP THE EDIT.
- Use exact product photos or supplied original photos. Preserve colors, garment details and proportions; do not generate invented garments. Keep a short visible commission disclosure. Do not put internal permission or stock labels on the artwork.
- Inspect every rendered image for four products, correct variants, legibility and clipping. Deliver individual images with descriptive filenames and native Library file-page links; ZIPs and tool-only previews repeatedly failed for Rebecca. Supply ZIPs only when requested.

## Deliver every Pinterest field together
- Supply image link, search-led title (at most 100 characters), full natural-language description, styling advice, a small relevant hashtag set, exact destination, suggested board, tagged-topic search terms and descriptive alt text. Keep description plus hashtags within 800 characters.
- Begin descriptions with Ad · I may earn a commission from purchases through my links. End editorial copy with Shop the edit.
- Omit Some selections may be sold out; check current availability. Do not replace it with a generic availability disclaimer. Keep stock findings internal.
- Link each collage to one existing matching ShopMy collection, not multiple product links. Use Aesthetics for aesthetic collages. Suggest a suitable board for color/category edits, such as Statement Bags & Clutches for green bags. Do not invent board IDs or Pinterest topic labels; offer topic search terms unless picker options were actually observed.
- Apply exact-product-title and hashtag-caption preference only to separately requested individual-product pins, retaining affiliate disclosure.
- Space pins across different days unless instructed otherwise. Use America/Chicago with correct daylight-saving offsets; do not describe guessed times as proven best times. Never duplicate posts Rebecca has already scheduled.
- Verify current Metricool access (previously brand 7724677, coderwhoclothes). The native integration previously lacked board lookup and local-image upload; do not claim these are solved. Do not repeat Google account recovery attempts. Verify queue/post state after any publishing action and report limitations honestly.

## Add website content
- Target https://github.com/rggerber/coderwhoclothes-landing, deployed on Vercel. Read current main and changed files, preserve external changes and mobile layout. Keep ANI off this website.
- Preserve separate Aesthetics and Edits. Edits uses `editCategories` → `editTopics` (with `category`) → `collages` in `content/collections.mjs`. New categories may cover seasonal fashion, jewelry, footwear or accessories; each category supports multiple edits and every edit supports multiple visuals. Use `groupPath` for all routes and retain existing URL overrides such as Green Bags. See COLLECTIONS.md.
- Put aesthetic collages inside their matching aesthetic, allowing multiple per group; put color/category/accessory themes under Edits. Keep original user-selected moodboard group covers unless asked otherwise.
- For explicitly approved supplied editorial visuals such as Nico, use `layout: 'editorial'`, original image dimensions, a cover and a gallery. Preserve the supplied images without cropping or generating substitutions. These may contain more than four items; the four-product rule applies to newly commissioned product collages. If exact correspondence is unverified, visibly identify AI-assisted styling interpretations, omit unverified product names and do not mix in another ShopMy collection. Nico must use only https://shopmy.us/collections/8644947 for shopping CTAs.
- Follow content/collections.mjs and scripts/build-collections.mjs. Add the matching approved image, verified product names where available, readable styling description, alt text and existing ShopMy destination. Preserve affiliate disclosures and sponsored link attributes. Do not invent prices, discounts or stock Offers.
- Provide canonical URL, descriptive title/description, uncropped image, social preview metadata, crawlable initial HTML, structured metadata and sitemap entries for public pages. Do not guarantee indexing, ranking or AI recommendations.
- When Rebecca asks to put approved collages on the website, prepare them as public in a tested PR for the existing merge workflow. Do not claim deployment until merged and verified. Keep new unapproved recurring batches as drafts for review unless separately authorized. Run `npm run build`, `node scripts/check-collections.mjs`, `node scripts/check-content.mjs` and `git diff --check`; inspect desktop/mobile navigation and full-size galleries. Keep the approval gate: no merge, publication or production deployment until Rebecca approves the PR. Keep the workflow in CURATION-WORKFLOW.md in the website repository.

## Measure and repeat
- Fetch verified Pinterest impressions, saves and OUTBOUND clicks. Do not substitute pin clicks. Compare matching pin-age windows at 7, 30 and 60 days; never sum cumulative snapshots. Preserve raw extracts, capture dates and stable IDs. Missing is unknown, not zero.
- Keep confirmed ShopMy commissions and reversals separate. Do not attribute collection-wide sales to Pinterest or individual pins without a verified source. Avoid winners based on tiny samples. Different aesthetics are not controlled tests; propose one-variable creative/title iterations.
- Coordinate with the existing Monday afternoon Pinterest performance review. Use a separate creation task for new batches, avoid duplicate tasks and duplicate edits, and report concrete drafts/actions/blockers. Do not claim automatic intake, posting or deployment works before verified access exists.
