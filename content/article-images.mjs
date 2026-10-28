// Substack's social-preview URL may crop before the browser receives the image.
// Use its original uploaded asset when the CDN wrapper exposes that URL.
export function originalArticleImage(value){
 if(!value)return value;
 try{
  const outer=new URL(value);
  if(outer.hostname==='substackcdn.com'&&outer.pathname.startsWith('/image/fetch/')){
   const tail=outer.pathname.match(/\/(https?(?:%3A|:)(?:%2F|\/){2}.*)$/i)?.[1];
   if(tail){const source=new URL(decodeURIComponent(tail));if(source.protocol==='https:'&&(['substack-post-media.s3.amazonaws.com','substackcdn.com'].includes(source.hostname)))return source.href}
  }
 }catch{}
 return value;
}
