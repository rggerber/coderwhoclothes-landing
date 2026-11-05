import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import { aesthetics, editCategories, editTopics, collages, groupPath } from '../content/collections.mjs';
const slugs = new Set();
for (const c of collages) {
  assert(['aesthetics','edits'].includes(c.section), 'Valid collage section');
  assert((c.section==='aesthetics'?aesthetics:editTopics).some(g=>g.slug===c.group), `Missing group: ${c.group}`);
  const key=`${c.section}/${c.group}/${c.slug}`;assert(!slugs.has(key),'Unique collage paths');slugs.add(key);
  assert(c.alt && (c.products?.length || c.interpretation) && c.image,'Complete editorial data or explicit interpretation');
}
async function walk(dir) {let out=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=`${dir}/${e.name}`;if(e.isDirectory())out.push(...await walk(p));else out.push(p);}return out;}
const files=await walk('dist/collections');
for (const file of files.filter(f=>f.endsWith('.html'))) {
  const html=await readFile(file,'utf8');
  assert(!html.includes('Draft preview'),'Production excludes preview UI');
  assert(html.includes('name="description"') && html.includes('rel="canonical"'),'Page metadata');
  for(const [,href] of html.matchAll(/href="(\/collections\/[^"#]*)"/g))await access(`dist${href}index.html`);
  for(const [,src] of html.matchAll(/src="(\/collection-assets\/[^"#]*)"/g))await access(`dist${src}`);
}
const sitemap=await readFile('dist/sitemap.xml','utf8');
for(const c of collages.filter(c=>c.status==='draft')) {
  const group=(c.section==='edits'?editTopics:aesthetics).find(g=>g.slug===c.group);
  const path=`${groupPath(c.section,group)}${c.slug}/`;
  assert(!sitemap.includes(path),'Drafts excluded from sitemap');
  await assert.rejects(access(`dist${path}index.html`));
  if(!collages.some(p=>p.status==='published'&&p.image===c.image))await assert.rejects(access(`dist/collection-assets/${c.image}`));
}
for(const g of [...aesthetics,...editTopics]) {
  const section=aesthetics.includes(g)?'aesthetics':'edits';const text=await readFile(`dist${groupPath(section,g)}index.html`,'utf8');assert(text.includes('rel="sponsored noopener noreferrer"'),'Affiliate disclosure and link attributes');assert(text.includes('Ad ·'),'Commission disclosure');
}
console.log(`Verified ${files.filter(f=>f.endsWith('.html')).length} public HTML pages, internal routes, metadata, affiliate disclosures and draft/image exclusion.`);

// Category routes and legacy URL exceptions are data-driven; forbid collisions.
const routes = new Set();
for(const category of editCategories) {
  const path = `/collections/edits/${category.slug}/`;
  assert(!routes.has(path), 'Unique category route'); routes.add(path);
  const html = await readFile(`dist${path}index.html`, 'utf8');
  assert(sitemap.includes(path), 'Category in sitemap');
  for(const g of editTopics.filter(g=>g.category===category.slug)) assert(html.includes(`href="${groupPath('edits',g)}"`), 'Category links to edit');
  assert(html.includes('og:image') && html.includes('BreadcrumbList'), 'Category sharing and breadcrumb metadata');
}
for(const group of editTopics) {
  assert(editCategories.some(c=>c.slug===group.category), 'Valid edit category');
  const path=groupPath('edits',group);
  assert(!routes.has(path), 'Unique edit route'); routes.add(path);
}
const directory=await readFile('dist/collections/edits/index.html','utf8');
assert(!directory.includes('href="/collections/edits/green-bags/"'), 'Edits directory shows categories, not individual edits');
const nico=editTopics.find(g=>g.slug==='nico');
for(const path of [groupPath('edits',nico), ...collages.filter(c=>c.group==='nico').map(c=>`${groupPath('edits',nico)}${c.slug}/`)]) {
  const html=await readFile(`dist${path}index.html`,'utf8');
  const links=[...html.matchAll(/class="shop-link" href="([^"]+)"[^>]*rel="([^"]+)"/g)];
  assert(links.length && links.every(m=>m[1]==='https://shopmy.us/collections/8644947' && m[2].includes('sponsored')), 'Nico uses only approved affiliate destination');
  assert(html.includes('AI-assisted') && html.includes('not been independently verified'), 'Interpretations visibly qualified');
  assert(html.includes('og:image') && html.includes('twitter:image') && html.includes('BreadcrumbList'), 'Nico social and breadcrumb metadata');
  assert(sitemap.includes(path), 'Nico public routes in sitemap');
}
const nicoHtml=await readFile(`dist${groupPath('edits',nico)}index.html`,'utf8');
assert.equal((nicoHtml.match(/class="outfit-visual"/g)||[]).length,3,'All three final visuals in Nico gallery');
for(const c of collages.filter(c=>c.group==='nico')) {
  const source=await readFile(`content/drafts/assets/${c.image}`);
  assert(source.equals(await readFile(`dist/collection-assets/${c.image}`)), 'Original image copied without transformation');
  assert(nicoHtml.includes(`width="${c.width}" height="${c.height}"`), 'Native image dimensions');
}
console.log('Verified nested categories, legacy Green Bags routes, three Nico originals, disclosures, approved ShopMy destinations, breadcrumbs and sharing metadata.');
for (const [slug, count, destination] of [
  ['gifts-under-50', 9, 'https://shopmy.us/collections/8678994'],
  ['gifts-under-100', 11, 'https://shopmy.us/collections/8678998'],
  ['gifts-under-250', 10, 'https://shopmy.us/collections/8679003'],
  ['the-splurge', 10, 'https://shopmy.us/collections/8679006'],
  ['whats-on-my-wishlist', 8, 'https://shopmy.us/collections/8679008'],
  ['gifts-for-the-homebody', 8, 'https://shopmy.us/collections/8679009'],
  ['jewelry-shell-actually-wear', 11, 'https://shopmy.us/collections/8679011'],
  ['vintage-designer-gifts', 3, 'https://shopmy.us/collections/8679012'],
  ['gifts-for-him', 4, 'https://shopmy.us/collections/8679014'],
]) {
  const group = editTopics.find(g => g.slug === slug);
  const path = groupPath('edits', group);
  const html = await readFile(`dist${path}index.html`, 'utf8');
  const slides = collages.filter(c => c.group === slug);
  assert.equal(slides.length, count, 'Complete gift guide');
  assert.equal((html.match(/class="outfit-visual"/g) || []).length, count, 'Each slide displayed once');
  assert.equal((html.match(/class="shop-link"/g) || []).length, 2, 'Top and bottom shopping CTAs');
  assert([...html.matchAll(/class="shop-link" href="([^"]+)"[^>]*rel="([^"]+)"/g)].every(m => m[1] === destination && m[2].includes('sponsored')), 'Approved gift guide destination');
  assert(html.includes('Ad ·') && html.includes('BreadcrumbList') && sitemap.includes(path), 'Disclosure and discovery');
  for (const slide of slides) {
    assert(html.includes(`src="/collection-assets/${slide.image}"`), 'Slide in gallery');
    assert((await readFile(`content/drafts/assets/${slide.image}`)).equals(await readFile(`dist/collection-assets/${slide.image}`)), 'Original image copied exactly');
  }
}
console.log('Verified 74 gift guide slides, direct ShopMy links, disclosures and gallery routes.');
