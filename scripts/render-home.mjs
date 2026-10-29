import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { readFile,writeFile } from 'node:fs/promises';
import { articles } from '../content/articles.mjs';
const preview=process.argv.includes('--drafts');
const vite=await createServer({server:{middlewareMode:true},appType:'custom',logLevel:'error'});
try{
 const {default:Home}=await vite.ssrLoadModule('/src/ComingSoon.jsx');
 const markup=renderToString(React.createElement(Home));
 let html=await readFile('dist/index.html','utf8');
 html=html.replace('<div id="root"></div>',()=>`<div id="root">${markup}</div>`);
 const origin='https://www.coderwhoclothes.com';
 const schema={'@context':'https://schema.org','@type':'ProfilePage','@id':origin+'/#profile',url:origin+'/',name:'Rebecca Gerber | Coder Who Clothes',mainEntity:{'@type':'Person',name:'Rebecca Gerber',url:origin+'/',sameAs:['https://www.instagram.com/coderwhoclothes/','https://www.youtube.com/@coderwhoclothes','https://www.tiktok.com/@coderwhoclothess','https://coderwhoclothes.substack.com/']},hasPart:articles.map(a=>({'@type':'Article',headline:a.title,url:a.url,author:{'@type':'Person',name:'Rebecca Gerber'},...(a.image?{image:a.image}:{}),...(a.publishedAt?{datePublished:a.publishedAt}:{})}))};
 const tags=`<link rel="canonical" href="${origin}/"><meta name="robots" content="${preview?'noindex,nofollow':'index,follow,max-image-preview:large,max-video-preview:-1'}"><meta property="og:title" content="Rebecca Gerber | Coder Who Clothes"><meta property="og:description" content="Writing, videos, personal style and shopping collections by Rebecca Gerber."><meta property="og:url" content="${origin}/"><meta property="og:type" content="website"><meta property="og:image" content="${origin}/hero.jpg"><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script>`;
 html=html.replace('</head>',()=>tags+'</head>');
 await writeFile('dist/index.html',html);
 console.log(`Prerendered homepage: ${articles.length} article links, video and collection content in initial HTML.`);
}finally{await vite.close()}
