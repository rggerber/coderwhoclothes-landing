import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { articles } from '../content/articles.mjs';
import { videos } from '../content/videos.mjs';
import { instagramPosts } from '../content/instagram.mjs';
const html=await readFile('dist/index.html','utf8');
for(const a of articles)assert(html.includes(a.url),`Prerendered article ${a.slug}`);
for(const v of videos){assert(html.includes(`/embed/${v.id}`),'Video player in initial HTML');assert(html.includes(`/shorts/${v.id}`),'Native video link')}
assert(html.indexOf('id="recent-edits"')<html.indexOf('id="recent-writing"'),'Shopping before writing');
assert(!html.includes('In the spotlight'),'Spotlight removed');
assert(html.includes('Style is cultivated. Attention refines it.'),'Philosophy retained');
assert(html.includes('rel="canonical"')&&html.includes('application/ld+json'),'Homepage metadata');
for(const id of instagramPosts)assert(html.includes(`https://www.instagram.com/p/${id}/embed/`),'Selected Instagram embed in initial HTML');
assert(!html.includes('/api/instagram'),'No token feed dependency');
console.log(`Verified ${articles.length} article links, ${videos.length} video embeds, three selected Instagram embeds, section order and homepage metadata.`);
