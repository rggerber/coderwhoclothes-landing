// Keep Substack's CDN delivery, removing the fixed social-card crop.
// Direct S3 originals may reject browser requests even when the CDN serves them.
export function originalArticleImage(value){
 if(!value)return value;
 try{
  const outer=new URL(value);let source;
  if(outer.hostname==='substackcdn.com'&&outer.pathname.startsWith('/image/fetch/')){
   const tail=outer.pathname.match(/\/(https?(?:%3A|:)(?:%2F|\/){2}.*)$/i)?.[1];
   if(tail)source=new URL(decodeURIComponent(tail));
  }else if(outer.hostname==='substack-post-media.s3.amazonaws.com')source=outer;
  if(source?.protocol==='https:'&&['substack-post-media.s3.amazonaws.com','substackcdn.com'].includes(source.hostname))return 'https://substackcdn.com/image/fetch/f_auto,q_auto/'+encodeURIComponent(source.href);
 }catch{}
 return value;
}
