import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import { aesthetics, editTopics, collages } from '../content/collections.mjs';
const slugs = new Set();
for (const c of collages) {
  assert(['aesthetics','edits'].includes(c.section), 'Valid collage section');
  assert((c.section==='aesthetics'?aesthetics:editTopics).some(g=>g.slug===c.group), `Missing group: ${c.group}`);
  const key=`${c.section}/${c.group}/${c.slug}`;assert(!slugs.has(key),'Unique collage paths');slugs.add(key);
  assert(c.alt && c.products.length && c.image,'Complete editorial data');
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
  const path=`/collections/${c.section}/${c.group}/${c.slug}/`;
  assert(!sitemap.includes(path),'Drafts excluded from sitemap');
  await assert.rejects(access(`dist${path}index.html`));
  if(!collages.some(p=>p.status==='published'&&p.image===c.image))await assert.rejects(access(`dist/collection-assets/${c.image}`));
}
for(const g of [...aesthetics,...editTopics]) {
  const section=aesthetics.includes(g)?'aesthetics':'edits';const text=await readFile(`dist/collections/${section}/${g.slug}/index.html`,'utf8');assert(text.includes('rel="sponsored noopener noreferrer"'),'Affiliate disclosure and link attributes');assert(text.includes('Ad ·'),'Commission disclosure');
}
console.log(`Verified ${files.filter(f=>f.endsWith('.html')).length} public HTML pages, internal routes, metadata, affiliate disclosures and draft/image exclusion.`);
