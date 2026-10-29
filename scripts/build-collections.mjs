import { mkdir, writeFile, copyFile, readFile, rm } from 'node:fs/promises';
import { aesthetics, editTopics, collages } from '../content/collections.mjs';
const preview = process.argv.includes('--drafts');
// Remove previous generated output when switching between preview and production.
await rm('dist/collections', { recursive: true, force: true });
await rm('dist/collection-assets', { recursive: true, force: true });
const origin = 'https://www.coderwhoclothes.com';
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const visible = collages.filter(c => c.status === 'published' || preview);
const paths = ['/collections/', '/collections/aesthetics/', '/collections/edits/'];
const groups = [...aesthetics, ...editTopics];
const disclosure = '<p class="disclosure">Ad · I may earn a commission from purchases through links on this page.</p>';
function cover(group) {
  if(group.cover)return `<img class="collection-cover" src="${esc(group.cover)}" alt="${esc(group.coverAlt || group.title)}" width="900" height="1600" loading="lazy">`;
  return `<div class="cover" style="--cover:${esc(group.color)}"><span>CODER WHO CLOTHES</span><strong>${esc(group.title)}</strong><i>Style is cultivated.</i></div>`;
}
function card(group, section) {
  const count = visible.filter(c => c.section === section && c.group === group.slug).length;
  return `<a class="collection-card" href="/collections/${section}/${group.slug}/">${cover(group)}<div class="card-info"><h2>${esc(group.title)}</h2><p>${esc(group.description)}</p><span class="small">${count ? `${count} ${count === 1 ? 'edit' : 'edits'}${preview ? ' · preview' : ''}` : 'Explore the collection'} <span aria-hidden="true">↗</span></span></div></a>`;
}
function collageCard(c) {
  return `<a class="collage-card" href="/collections/${c.section}/${c.group}/${c.slug}/"><img src="/collection-assets/${esc(c.image)}" alt="${esc(c.alt)}" width="1000" height="1500" loading="lazy"><h2>${esc(c.title)}</h2><p>${esc(c.description)}</p>${c.status === 'draft' ? '<span class="draft-tag">Draft preview</span>' : ''}</a>`;
}
async function page(path, title, description, body, {draft = false, type = 'CollectionPage', items = [], image = null} = {}) {
  const canonical = `${origin}${path}`;
  const schema = {'@context':'https://schema.org','@type':type,name:title,description,url:canonical, ...(image ? {image:`${origin}${image}`} : {}), ...(items.length ? {mainEntity:{'@type':'ItemList',itemListElement:items.map((item,i)=>({'@type':'ListItem',position:i+1,name:item.title,url:`${origin}${item.path}`}))}} : {})};
  const head = `<title>${esc(title)} | Coder Who Clothes</title><meta name="description" content="${esc(description)}"><meta name="robots" content="${draft || preview ? 'noindex,nofollow' : 'index,follow'}"><link rel="canonical" href="${canonical}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="website"><meta property="og:url" content="${canonical}">${image ? `<meta property="og:image" content="${origin}${esc(image)}"><meta name="twitter:card" content="summary_large_image">` : ''}<link rel="stylesheet" href="/collections.css"><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script>`;
  const doc = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${head}</head><body><a class="skip" href="#content">Skip to content</a>${preview ? '<aside class="preview-banner">Draft preview · not for publication · product availability and image permissions need review</aside>' : ''}<header><a class="wordmark" href="/">Rebecca Gerber<span>Coder Who Clothes</span></a><nav aria-label="Main navigation"><a href="/">Home</a><a href="/collections/">Collections</a><a href="/collections/aesthetics/" ${path.includes('/aesthetics/')?'aria-current="page"':''}>Aesthetics</a><a href="/collections/edits/" ${path.includes('/edits/')?'aria-current="page"':''}>Edits</a></nav></header><main id="content">${body}</main><footer><p>Software engineer. Fashion thinker.</p><a href="mailto:hello@coderwhoclothes.com">Contact</a><a href="/privacy_policy.html">Privacy policy</a><span>© ${new Date().getFullYear()} Coder Who Clothes</span></footer></body></html>`;
  await mkdir(`dist${path}`, {recursive:true}); await writeFile(`dist${path}index.html`,doc);
}
await mkdir('dist/collection-assets',{recursive:true});
await copyFile('src/collections.css','dist/collections.css');
for (const c of visible) await copyFile(`content/drafts/assets/${c.image}`,`dist/collection-assets/${c.image}`);
await page('/collections/','Collections','Explore fashion aesthetics and shopping edits curated by Rebecca Gerber.',`<p class="eyebrow">The collections</p><h1>A considered eye.<br>An evolving collection.</h1><p class="intro">Two ways into the pieces: by aesthetic, or by the detail that caught your eye.</p><div class="section-choices"><a href="/collections/aesthetics/"><span class="small">01 / A point of view</span><h2>Aesthetics <span>↗</span></h2><p>Explore a style vocabulary. Each aesthetic gathers its own outfit studies and collages.</p></a><a href="/collections/edits/"><span class="small">02 / A particular find</span><h2>Edits <span>↗</span></h2><p>Color stories, standout accessories and shopping themes that cross aesthetic boundaries.</p></a></div>`, {items:[{title:'Aesthetics',path:'/collections/aesthetics/'},{title:'Edits',path:'/collections/edits/'}]});
for (const [section,title,description,data] of [
  ['aesthetics','Aesthetics','A style vocabulary, collected over time. Explore each aesthetic and the outfit studies within it.',aesthetics],
  ['edits','Edits','A color, a shape, a particular detail. Focused shopping edits from across the collections.',editTopics]
]) {
  await page(`/collections/${section}/`,title,description,`<a class="back" href="/collections/">← Collections</a><p class="eyebrow">${section==='aesthetics'?'A point of view':'A particular find'}</p><h1>${title}</h1><p class="intro">${description}</p><div class="grid collection-grid">${data.map(g=>card(g,section)).join('')}</div>`,{items:data.map(g=>({title:g.title,path:`/collections/${section}/${g.slug}/`}))});
  for (const group of data) {
    const entries=visible.filter(c=>c.group===group.slug&&c.section===section);
    const path=`/collections/${section}/${group.slug}/`;paths.push(path);
    await page(path,group.title,group.description,`<a class="back" href="/collections/${section}/">← ${title}</a><p class="eyebrow">${title} / ${esc(group.title)}</p><div class="group-heading"><div><h1>${esc(group.title)}</h1><p class="intro">${esc(group.description)}</p></div><div class="swatch" style="background:${esc(group.color)}" aria-hidden="true"></div></div>${disclosure}<a class="shop-link" href="${esc(group.shopUrl)}" target="_blank" rel="sponsored noopener noreferrer">${esc(group.shopLabel || 'Shop the aesthetic')} <span aria-hidden="true">↗</span></a><h2 class="section-title">${section==='aesthetics'?'Within this aesthetic':'The edits'}</h2>${entries.length?`<div class="grid">${entries.map(collageCard).join('')}</div>`:'<p class="empty">New collages are on the way. In the meantime, explore the linked collection.</p>'}`, {items:entries.map(c=>({title:c.title,path:`${path}${c.slug}/`}))});
    for (const c of entries) {
      const articlePath=`${path}${c.slug}/`; if(c.status==='published')paths.push(articlePath);
      await page(articlePath,c.searchTitle,c.description,`<a class="back" href="${path}">← ${esc(group.title)}</a><p class="eyebrow">${esc(group.title)} / An outfit study</p><h1>${esc(c.title)}</h1><p class="intro">${esc(c.description)}</p><p class="byline">Curated by Rebecca Gerber · Coder Who Clothes</p>${disclosure}<div class="article-layout"><img class="article-image" src="/collection-assets/${esc(c.image)}" alt="${esc(c.alt)}" width="1000" height="1500"><div class="product-list"><h2>In this edit</h2><ol>${c.products.map(p=>`<li>${esc(p)}</li>`).join('')}</ol><p>These are shopping finds and styling ideas, rather than wear-tested reviews. The linked collection includes a wider selection.</p>${c.status==='draft'?'<p class="draft-note">Draft: confirm current product links, pictured variants, stock and image permissions before publishing.</p>':''}<a class="shop-link" href="${esc(group.shopUrl)}" target="_blank" rel="sponsored noopener noreferrer">Shop the edit ↗</a></div></div>`,{draft:c.status!=='published',type:'WebPage',image:`/collection-assets/${c.image}`});
    }
  }
}
if (!preview) {
  const publicPaths=['/',...paths];await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicPaths.map(p=>`<url><loc>${origin}${p}</loc></url>`).join('')}</urlset>`);
  await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
} else {
  // Preview pages must not leak via a sitemap or robots defaults.
  await writeFile('dist/robots.txt','User-agent: *\nDisallow: /\n');
}
console.log(`Built collections: ${aesthetics.length} aesthetics, ${editTopics.length} edit topic, ${visible.length} collages${preview?' (draft preview, noindex)':''}.`);
