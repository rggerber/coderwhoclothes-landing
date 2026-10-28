# Website content feeds

## Instagram: connection required

The server endpoint `/api/instagram` uses Meta's Instagram API with Instagram
Login for the `coderwhoclothes` Professional (Creator or Business) account.
An arbitrary Facebook/Page token is not interchangeable with this token.

1. Authorize the account through a Meta developer app configured for Instagram
   Login with the read permission `instagram_business_basic`.
2. In Vercel, open this project's Settings → Environment Variables.
3. Add `INSTAGRAM_ACCESS_TOKEN` with the Instagram user access token. Select
   Production and Preview and mark it Sensitive. Do not prefix it with VITE_.
4. Redeploy. The updated frontend will call `/api/instagram` automatically.
5. Test that the endpoint returns three public post links and that the UI says
   “The latest three.” A 503 means the token is missing; a 502 means Meta rejected
   the request, returned no posts, or the account didn't match.

The endpoint validates the account, fetches up to 100 media records, sorts by
publication time and returns the latest three. Includes photo, carousel and reel
posts; excludes Stories. Collaboration-only posts not returned by the account's
media endpoint are not included. Cached for 15 minutes, plus up to five minutes
stale while refreshing. An open page rechecks every 15 minutes. This is periodic
refresh, not immediate push. On connection failure it keeps the existing posts.
The three fixed posts remain a fallback until the account is connected.

Token expiry/revocation is still a maintenance requirement. This implementation
does not provision OAuth or persist token renewal. Replace the token in Vercel
and redeploy when required. A managed Instagram feed provider is an alternative
if maintaining a Meta app/token is undesirable.

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
