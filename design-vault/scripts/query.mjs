#!/usr/bin/env node
// Read-only, dependency-free public catalog query (Node 20+).
const opts={};
for(let i=2;i<process.argv.length;i++){
  const a=process.argv[i];
  if(['--query','--q','--category','--limit','--api','--file'].includes(a)){
    if(!process.argv[i+1]||process.argv[i+1].startsWith('--')){console.error('Missing value for '+a);process.exit(2);}
    opts[a.slice(2)]=process.argv[++i];
  }else if(a==='--help'){console.log('Usage: node scripts/query.mjs [--query scroll] [--category icons] [--limit 10] [--api https://.../api/resources] [--file ./resources.json]');process.exit(0);}
  else{console.error('Unknown option: '+a);process.exit(2);}
}
const catalogFile=opts.file;
const api=opts.api||process.env.DESIGN_VAULT_API||'https://donaldai-design-vault.vercel.app/api/resources';
const limit=Math.max(1,Math.min(50,Number(opts.limit)||10));
try{
 let records;
 if(catalogFile){
  const fs=await import('node:fs/promises');const data=JSON.parse(await fs.readFile(catalogFile,'utf8'));
  records=Array.isArray(data)?data:data.resources;
  if(!Array.isArray(records))throw new Error('JSON needs a resources array');
  if(opts.category)records=records.filter(r=>r.category===opts.category);
  if(opts.query||opts.q){const words=String(opts.query||opts.q).toLowerCase().trim().split(/\s+/);records=records.filter(r=>words.every(w=>[r.name,r.summary,r.subcategory,r.category,...(r.tags||[])].join(' ').toLowerCase().includes(w)));}
 } else {
  const url=new URL(api);
  if(!['https:','http:'].includes(url.protocol))throw new Error('API must use http/https');
  if(opts.query||opts.q)url.searchParams.set('q',opts.query||opts.q);
  if(opts.category)url.searchParams.set('category',opts.category);
  url.searchParams.set('limit',String(limit));
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),12000);
  try{const r=await fetch(url,{signal:controller.signal,headers:{Accept:'application/json'}});if(!r.ok)throw new Error('HTTP '+r.status);const data=await r.json();if(!Array.isArray(data.resources))throw new Error('Unexpected API response');records=data.resources;}finally{clearTimeout(timeout);}
 }
 records=records.slice(0,limit);
 console.log(JSON.stringify({source:catalogFile||api,count:records.length,resources:records.map(r=>({id:r.id,name:r.name,category:r.category,subcategory:r.subcategory,summary:r.summary,url:r.url,github:r.github,install:r.install,usage:r.usage,skill:r.skill,notes:r.notes}))},null,2));
}catch(e){console.error('Design Vault query failed:',e.message);process.exitCode=1;}
