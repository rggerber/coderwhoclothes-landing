import { writeFile } from 'node:fs/promises';
import { articles } from '../content/articles.mjs';
import { originalArticleImage } from '../content/article-images.mjs';
const decode=s=>s?.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const meta=(html,key)=>{for(const tag of html.matchAll(/<meta\b[^>]*>/gi)){const attrs=Object.fromEntries([...tag[0].matchAll(/([\w:-]+)\s*=\s*(["'])([\s\S]*?)\2/g)].map(m=>[m[1].toLowerCase(),decode(m[3])]));if(attrs.property===key||attrs.name===key)return attrs.content}return null};
let enriched=0;
const result=await Promise.all(articles.map(async article=>{try{
 const r=await fetch(article.url,{signal:AbortSignal.timeout(8000)});if(!r.ok)return article;const html=await r.text();
 const title=meta(html,'og:title');if(!title||/unavailable|access denied/i.test(title))return article;
 const raw=meta(html,'og:image');let image=article.image;try{const u=new URL(raw);if(u.protocol==='https:')image=originalArticleImage(u.href)}catch{}
 enriched++;return {...article,title,image,description:meta(html,'og:description')||article.description,publishedAt:meta(html,'article:published_time')||article.publishedAt};
 }catch{return article}}));
await writeFile('content/articles.mjs',`// Source metadata; user-supplied URLs. Retains previous metadata when a source is unavailable.\nexport const articles = ${JSON.stringify(result,null,2)};\n`);
console.log(`Article metadata: ${enriched}/${articles.length} sources reached; ${result.filter(a=>a.image).length} real cover images available.`);
