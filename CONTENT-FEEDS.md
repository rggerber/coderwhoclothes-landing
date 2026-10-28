# Website content feeds

## Instagram: manually selected posts

No API application, account connection or token is required. The three selected
post IDs are in `content/instagram.mjs`, in display order. Each renders as a public
Instagram embed with a native link. On phones/tablets the row scrolls sideways.
Change that list and redeploy to swap the pictures. It does not claim to show the
latest posts or auto-import new ones. Instagram controls the embed and may show
a login/fallback state in some browsers. Existing `INSTAGRAM_ACCESS_TOKEN`
variables in Vercel are unused and can be removed if previously added.

## Writing

The nine user-supplied article URLs are in `content/articles.mjs`. Every build
runs `scripts/sync-articles.mjs` to read the source title, description, cover and
publication date from the actual page metadata. If unavailable it preserves
existing metadata and still renders a direct article link. It does not invent
cover photos or summaries, and it does not copy full article bodies.

Local verification on Oct 28: Substack returned an unavailable page for all nine
articles; zero cover images were fetched. Test the Vercel build's metadata summary
and rendered previews. This does not automatically discover future articles;
new article URLs must be added to the list or a working RSS feed integrated.

## Videos

`content/videos.mjs` contains six verified YouTube video IDs and their titles,
including the supplied Short and additional videos found on the public channel.
Players and native text links appear in a swipeable row. They are not labelled
newest-first because publication dates have not been verified. New YouTube
uploads are not automatically imported yet. The two supplied TikTok short links
remain direct links; individual players need their resolved canonical post IDs.
TikTok's profile embed is available as a separate browseable section.

## Search discovery

The homepage is prerendered into the initial HTML with native headings, article
and video links and collection descriptions. React hydrates it for interactions.
The homepage has a canonical, social metadata and ProfilePage/Article structured
data based on visible content. No dates, prices, inventory or claims are invented.
Published collections have static HTML routes, canonicals, metadata and sitemap
entries. Preview builds have noindex and disallow crawling; draft collages are
excluded from production. Production robots.txt permits all crawlers, including
search crawlers used by AI services. This provides crawlability, not a guarantee
of indexing, rankings, AI citations, or indexing third-party iframe contents as
native website content. The original articles/videos remain on their platforms.
