// Meta Instagram Login token stays on the server; never use a VITE_ variable.
export function newestPosts(data) {
 return (Array.isArray(data)?data:[]).filter(p=>(/^https:\/\/(www\.)?instagram\.com\/(p|reel)\/[A-Za-z0-9_-]+\/?$/.test(p.permalink||''))&&Number.isFinite(Date.parse(p.timestamp)))
 .sort((a,b)=>Date.parse(b.timestamp)-Date.parse(a.timestamp)).slice(0,3)
 .map(({id,permalink,timestamp})=>({id,permalink,timestamp}));
}
export default async function handler(req,res){
 if(req.method!=='GET'){res.setHeader('Allow','GET');return res.status(405).json({error:'Method not allowed'})}
 if(!process.env.INSTAGRAM_ACCESS_TOKEN)return res.status(503).json({error:'Feed not connected'});
 try{
  const identity=await fetch('https://graph.instagram.com/v25.0/me?fields=id,username',{headers:{Authorization:`Bearer ${process.env.INSTAGRAM_ACCESS_TOKEN}`},signal:AbortSignal.timeout(8000)});
  if(!identity.ok)return res.status(502).json({error:'Feed temporarily unavailable'});
  const account=await identity.json();if(account.username!=='coderwhoclothes')return res.status(502).json({error:'Feed account does not match'});
  const url=new URL('https://graph.instagram.com/v25.0/me/media');url.searchParams.set('fields','id,permalink,timestamp');url.searchParams.set('limit','100');
  const r=await fetch(url,{headers:{Authorization:`Bearer ${process.env.INSTAGRAM_ACCESS_TOKEN}`},signal:AbortSignal.timeout(8000)});
  if(!r.ok)return res.status(502).json({error:'Feed temporarily unavailable'});
  const data=await r.json();const posts=newestPosts(data.data);if(!posts.length)return res.status(502).json({error:'No posts available'});
  res.setHeader('Cache-Control','public, s-maxage=900, stale-while-revalidate=300');return res.status(200).json({posts});
 }catch{return res.status(502).json({error:'Feed temporarily unavailable'})}
}
