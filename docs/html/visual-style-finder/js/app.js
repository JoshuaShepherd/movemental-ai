/**
 * Visual Style Finder — client app (ES modules).
 * React migration: split render* into route/step components; state → useReducer or URL params.
 */
import { IMAGES } from './data/images.js';
import { APPROACHES, APPROACH_TAGS, APPROACH_PROMPTS } from './data/approaches.js';
import { PALETTES } from './data/palettes.js';
import { TEMPLATES } from './data/templates.js';
import { TYPE_PAIRS, ARTICLE_HTML } from './data/typography.js';
import { FAMILIES, FAM_ORDER, FAM_LABEL, LIGHT_RAMP, DARK_RAMP, ROLE_ORDER } from './data/color-families.js';
import { rand, pick, pickS, hsl2hex, bestText } from './utils/color-math.js';
import { buildApproachPrompt, buildTemplatePrompt, buildPaletteText, buildTypePrompt, buildGenText } from './utils/prompts.js';

const CHECK = '<span class="check"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg></span>';
const COPY_ICON = '<svg viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>';
const CHECK_SM = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 13l4 4L19 7"/></svg>';

/* ---------- ten approaches, each a live specimen ---------- */




const PAGES = ['typography','templates','images','colors','results'];
const STEP_LABELS = {approaches:'Approaches', typography:'Typography', templates:'Templates', images:'Images', colors:'Colors', palettes:'Colors', generator:'Colors', results:'Results'};
let page = 0;
const sel = { approaches:new Set(), type:new Set(), templates:new Set(), images:new Set(), palettes:new Set(), generated:[] };
function stepK(key){ const w=PAGES.filter(p=>p!=='results'); return 'Step '+(w.indexOf(key)+1)+' of '+w.length; }
function stepNum(key){ return PAGES.filter(p=>p!=='results').indexOf(key)+1; }

const $ = s => document.querySelector(s);
const stage = $('#stage');

function totalSel(){ return sel.type.size + sel.templates.size + sel.images.size + sel.palettes.size + sel.generated.length; }

function renderSteps(){
  const el = $('#steps'); el.innerHTML='';
  PAGES.forEach((p,i)=>{
    const b=document.createElement('button');
    b.className='step'+(i===page?' on':'')+(i<page?' done':'');
    b.innerHTML=`<span class="num">${i+1}</span><span class="lbl">${STEP_LABELS[p]}</span>`;
    b.onclick=()=>{ page=i; render(); };
    el.appendChild(b);
  });
  const t=totalSel();
  $('#tally').innerHTML = `<b>${t}</b> selected`;
}

function tileToggle(kind,id,node){
  if(sel[kind].has(id)) sel[kind].delete(id); else sel[kind].add(id);
  node.classList.toggle('sel', sel[kind].has(id));
  node.setAttribute('aria-pressed', sel[kind].has(id));
  renderSteps(); renderBar();
}

function makeTile(kind,id,inner,extraClass='',aria=''){
  const d=document.createElement('div');
  d.className='tile '+extraClass+(sel[kind].has(id)?' sel':'');
  d.setAttribute('role','button'); d.tabIndex=0;
  d.setAttribute('aria-pressed', sel[kind].has(id));
  if(aria) d.setAttribute('aria-label',aria);
  d.innerHTML=CHECK+inner;
  const cb=document.createElement('button');
  cb.className='copy'; cb.setAttribute('data-noselect','');
  cb.setAttribute('aria-label', kind==='images'?'Copy image':kind==='palettes'?'Copy palette':'Copy Stitch prompt');
  cb.title=cb.getAttribute('aria-label');
  cb.innerHTML=COPY_ICON;
  cb.addEventListener('click',e=>{ e.stopPropagation(); copyItem(kind,id,cb); });
  d.appendChild(cb);
  const go=()=>tileToggle(kind,id,d);
  d.addEventListener('click',e=>{ if(e.target.closest('a,[data-noselect]')) return; go(); });
  d.addEventListener('keydown',e=>{ if((e.key==='Enter'||e.key===' ')&&!e.target.closest('a,[data-noselect]')){e.preventDefault();go();} });
  return d;
}

function render(){
  renderSteps();
  const p=PAGES[page];
  stage.scrollTop=0;
  if(p==='approaches') renderApproaches();
  else if(p==='typography') renderTypography();
  else if(p==='templates') renderTemplates();
  else if(p==='images') renderImages();
  else if(p==='colors') renderColors();
  else renderResults();
  renderBar();
}

function lead(kh,h,sub){
  return `<div class="lead"><span class="k">${kh}</span><h2>${h}</h2><p>${sub}</p></div>`;
}

function renderApproaches(){
  let html = lead('Step 1 of 4','Which approaches pull at you?','Pick every one that feels right — these are directions, not final looks. There are no wrong answers.');
  html += '<div class="grid g-approaches" id="grid"></div>';
  stage.innerHTML=html;
  const g=$('#grid');
  APPROACHES.forEach(a=>{
    const inner = a.sp + `<div class="cap"><div class="nm">${a.nm}</div><div class="tg">${a.tg}</div></div>`;
    g.appendChild(makeTile('approaches',a.id,inner,'',a.nm));
  });
}

function renderTemplates(){
  let html = lead(stepK('templates'),'Real sites &amp; templates.','Actual living websites and template starting points. Tap the ones you would happily launch from — <b style="color:var(--ink-blue)">Open&nbsp;↗</b> shows you the real thing. Thumbnails load as you browse.');
  html += '<div class="grid g-templates" id="grid"></div>';
  stage.innerHTML=html;
  const g=$('#grid');
  TEMPLATES.forEach(t=>{
    const kind = t.kind==='template' ? 'Template' : 'Live site';
    const inner =
      `<span class="tpl-kind">${kind}</span>`+
      `<div class="shot"><div class="ph"><div class="pn">${t.nm}</div><div class="pd">${t.dm}</div></div></div>`+
      `<div class="tmeta"><div><div class="nm">${t.nm}</div><div class="dm">${t.dm} · ${t.tag}</div></div>`+
      `<a class="open" href="${t.url}" target="_blank" rel="noopener">Open ↗</a></div>`;
    const tile = makeTile('templates',t.id,inner,'tpl',t.nm+' — '+t.dm);
    g.appendChild(tile);
    // screenshot with retry + fallback; placeholder card shows through until it loads
    const shot = tile.querySelector('.shot');
    const img = document.createElement('img');
    img.alt = t.nm+' screenshot'; img.loading='lazy';
    let tries = 0, viaThum = false;
    const mshot = () => 'https://s.wordpress.com/mshots/v1/'+encodeURIComponent(t.url)+'?w=640'+(tries?'&r='+tries:'');
    img.onload = () => {
      img.classList.add('ok');
      if(!viaThum && tries < 2){ tries++; setTimeout(()=>{ img.src = mshot(); }, 4200); }
    };
    img.onerror = () => { if(!viaThum){ viaThum = true; img.src = 'https://image.thum.io/get/width/640/'+t.url; } };
    img.src = mshot();
    shot.appendChild(img);
  });
}

function renderImages(){
  let html = lead(stepK('images'),'Now — the images.','Same idea: tap the ones you love. Look for what keeps catching your eye, not what you think you should pick.');
  html += '<div class="grid g-images" id="grid"></div>';
  stage.innerHTML=html;
  const g=$('#grid');
  IMAGES.forEach(im=>{
    const inner = `<span class="idx">${String(im.n).padStart(2,'0')}</span><img src="${im.src}" alt="${im.alt}" loading="lazy">`;
    g.appendChild(makeTile('images',im.id,inner,'img',im.alt));
  });
}

let colorMode='curated';
function renderColors(){
  let html = lead(stepK('colors'),'Colour you could live in.','Two ways to land on colour — start from a ready-made palette, or roll your own. Do either, or both; everything you keep flows to your results.');
  html += '<div class="mode-toggle" id="colorMode"></div>';
  html += '<div id="colorsBody"></div>';
  stage.innerHTML=html;
  const mt=$('#colorMode');
  [{k:'curated',t:'Curated palettes',d:'20 ready-made, on-brand'},
   {k:'generate',t:'Generate your own',d:'Roll infinite palettes'}].forEach(m=>{
    const b=document.createElement('button'); b.className='mode-opt'+(colorMode===m.k?' on':'');
    b.innerHTML='<span class="mo-t">'+m.t+'</span><span class="mo-d">'+m.d+'</span>';
    b.onclick=()=>{ colorMode=m.k; renderColors(); renderBar(); };
    mt.appendChild(b);
  });
  renderColorsBody();
}
function renderColorsBody(){
  const body=$('#colorsBody'); if(!body) return;
  if(colorMode==='curated') buildCuratedPalettes(body);
  else buildGenerator(body);
}
function buildCuratedPalettes(container){
  container.innerHTML='<div class="grid g-palettes" id="grid"></div>';
  const g=container.querySelector('#grid');
  PALETTES.forEach(pl=>{
    const bands = pl.c.map(c=>`<i style="background:${c}"></i>`).join('');
    const hex = pl.c.join('  ');
    const inner = `<div class="bands">${bands}</div><div class="pmeta"><div class="nm">${pl.nm}</div><div class="hex">${hex}</div></div>`;
    g.appendChild(makeTile('palettes',pl.id,inner,'pal',pl.nm+' palette'));
  });
}

function leaning(){
  const count={};
  sel.approaches.forEach(id=>(APPROACH_TAGS[id]||[]).forEach(t=>count[t]=(count[t]||0)+1));
  sel.type.forEach(id=>{ const p=TYPE_PAIRS.find(x=>x.id===id); if(p)(p.tags||[]).forEach(t=>count[t]=(count[t]||0)+1); });
  sel.templates.forEach(id=>{ const t=TEMPLATES.find(x=>x.id===id); if(t)(APPROACH_TAGS[t.ap]||[]).forEach(tag=>count[tag]=(count[tag]||0)+1); });
  const moodWord={warm:'warm',earthy:'earthy',muted:'muted',dark:'dramatic',bold:'bold',painterly:'painterly',ink:'editorial'};
  sel.palettes.forEach(id=>{ const p=PALETTES.find(x=>x.id===id); if(p){const w=moodWord[p.mood]; count[w]=(count[w]||0)+1;} });
  const top=Object.entries(count).sort((a,b)=>b[1]-a[1]).slice(0,3).map(x=>x[0]);
  return top;
}

function renderResults(){
  const typs = TYPE_PAIRS.filter(p=>sel.type.has(p.id));
  const tpls = TEMPLATES.filter(t=>sel.templates.has(t.id));
  const imgs = IMAGES.filter(im=>sel.images.has(im.id));
  const pals = PALETTES.filter(p=>sel.palettes.has(p.id));
  const gens = sel.generated;
  const top = leaning();

  let leanLine='Make a few selections and your leaning will take shape here.';
  if(top.length){
    leanLine = `Your eye leans <b>${top.join('</b>, <b>')}</b>. That's the starting brief — a direction to build from, not a template to accept.`;
  }

  let html = `<div class="res">
    <div class="hero">
      <div class="k">Your style signature</div>
      <h2>What you're drawn to</h2>
      <div class="lean">${leanLine}</div>
    </div>`;

  html += `<div class="share">
      <div><div class="share-t">Send these results to Josh</div><div class="share-d">Download the visual sheet, then attach it to the pre-filled email — josh@movemental.ai.</div></div>
      <div class="share-b"><button class="btn pri" id="dlBtn">Download results sheet</button><a class="btn" id="emailBtn" href="#" target="_blank" rel="noopener">Email to Josh</a></div>
    </div>`;

  html += `<div class="rsec"><div class="rh"><h3>Typography</h3><span class="c">${typs.length} chosen</span></div>`;
  html += typs.length ? `<div class="chips2">${typs.map(p=>`<span class="chip2" style="font-family:${p.head}">${p.nm} · ${p.hn} / ${p.bn}</span>`).join('')}</div>` : `<div class="empty">None yet — step ${stepNum('typography')}.</div>`;
  html += `</div>`;

  html += `<div class="rsec"><div class="rh"><h3>Templates &amp; sites</h3><span class="c">${tpls.length} chosen</span></div>`;
  html += tpls.length ? `<div class="chips2">${tpls.map(t=>`<a class="chip2" href="${t.url}" target="_blank" rel="noopener" style="text-decoration:none">${t.nm} ↗</a>`).join('')}</div>` : `<div class="empty">None yet — step ${stepNum('templates')}.</div>`;
  html += `</div>`;

  html += `<div class="rsec"><div class="rh"><h3>Images</h3><span class="c">${imgs.length} chosen</span></div>`;
  html += imgs.length ? `<div class="rthumbs">${imgs.map(im=>`<img src="${im.src}" alt="${im.alt}">`).join('')}</div>` : `<div class="empty">None yet — step ${stepNum('images')}.</div>`;
  html += `</div>`;

  html += `<div class="rsec"><div class="rh"><h3>Palettes</h3><span class="c">${pals.length} chosen</span></div>`;
  html += pals.length ? `<div class="rpals">${pals.map(p=>`<div class="rpal"><div class="bands">${p.c.map(c=>`<i style="background:${c}"></i>`).join('')}</div><div class="nm">${p.nm} · ${p.c.join(' ')}</div></div>`).join('')}</div>` : `<div class="empty">None yet — step ${stepNum('colors')}.</div>`;
  html += `</div>`;

  html += `<div class="rsec"><div class="rh"><h3>Generated palettes</h3><span class="c">${gens.length} saved</span></div>`;
  html += gens.length ? `<div class="rpals">${gens.map(p=>`<div class="rpal"><div class="bands">${p.c.map(c=>`<i style="background:${c}"></i>`).join('')}</div><div class="nm">${p.nm} · ${p.c.map(x=>x.toUpperCase()).join(' ')}</div></div>`).join('')}</div>` : `<div class="empty">None yet — step ${stepNum('colors')}.</div>`;
  html += `</div>`;

  html += `</div>`;
  stage.innerHTML=html;
  const _db=$('#dlBtn'); if(_db) _db.onclick=downloadResults;
  const _eb=$('#emailBtn'); if(_eb) _eb.href=mailtoHref();
}

function summaryText(){
  const typs=TYPE_PAIRS.filter(p=>sel.type.has(p.id));
  const tpls=TEMPLATES.filter(t=>sel.templates.has(t.id));
  const imgs=IMAGES.filter(im=>sel.images.has(im.id)).map(im=>String(im.n).padStart(2,'0'));
  const pals=PALETTES.filter(p=>sel.palettes.has(p.id));
  const gens=sel.generated;
  const top=leaning();
  let s='VISUAL STYLE FINDER — SELECTIONS\n\n';
  s+='Leaning: '+(top.length?top.join(', '):'—')+'\n\n';
  s+='Typography ('+typs.length+'):\n'+(typs.length?typs.map(p=>'  • '+p.nm+' — headings '+p.hn+', body '+p.bn).join('\n'):'  —')+'\n\n';
  s+='Templates & sites ('+tpls.length+'):\n'+(tpls.length?tpls.map(t=>'  • '+t.nm+' — '+t.url).join('\n'):'  —')+'\n\n';
  s+='Images ('+imgs.length+'): '+(imgs.length?imgs.join(', '):'—')+'\n\n';
  s+='Palettes ('+pals.length+'):\n'+(pals.length?pals.map(p=>'  • '+p.nm+' — '+p.c.join(' ')).join('\n'):'  —')+'\n\n';
  s+='Generated palettes ('+gens.length+'):\n'+(gens.length?gens.map(p=>'  • '+p.nm+' — '+p.c.map(x=>x.toUpperCase()).join(' ')).join('\n'):'  —')+'\n';
  return s;
}

function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),1400); }

function mailtoHref(){
  const d=new Date().toISOString().slice(0,10);
  let body=summaryText()+'\n\n(Visual results sheet attached: style-results-'+d+'.html)';
  if(body.length>1800) body=body.slice(0,1750)+'\n… full detail is in the attached sheet.';
  return 'mailto:josh@movemental.ai?subject='+encodeURIComponent('Visual style results')+'&body='+encodeURIComponent(body);
}
function downloadResults(){
  try{
    const blob=new Blob([resultsHTML()],{type:'text/html'});
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download='style-results-'+new Date().toISOString().slice(0,10)+'.html';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(()=>URL.revokeObjectURL(a.href),2000);
    toast('Results sheet downloaded');
  }catch(e){ toast('Download failed'); }
}
function resultsHTML(){
  const typs=TYPE_PAIRS.filter(p=>sel.type.has(p.id));
  const tpls=TEMPLATES.filter(t=>sel.templates.has(t.id));
  const imgs=IMAGES.filter(im=>sel.images.has(im.id));
  const pals=PALETTES.filter(p=>sel.palettes.has(p.id));
  const gens=sel.generated;
  const top=leaning();
  const fonts=[...document.querySelectorAll('link[rel="stylesheet"]')].map(l=>'<link rel="stylesheet" href="'+l.href+'">').join('');
  const date=new Date().toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'});
  const palRow=(p,up)=>{ const c=p.c.map(x=>up?x.toUpperCase():x); return '<div class="prow"><div class="sw">'+c.map(x=>'<i style="background:'+x+'"></i>').join('')+'</div><div class="pmeta"><b>'+p.nm+'</b><span>'+c.join('  ')+'</span></div></div>'; };
  let b='<header><div class="k">Visual style results</div><h1>What they\'re drawn to</h1><div class="date">'+date+'</div>';
  if(top.length) b+='<p class="lean">Leaning: <b>'+top.join('</b>, <b>')+'</b>.</p>';
  b+='</header>';
  if(typs.length){ b+='<section><h2>Typography</h2><div class="tgrid">'+typs.map(p=>'<div class="tcard"><div class="tnm">'+p.nm+'</div><div class="tsamp" style="font-family:'+p.head+'">Ag &middot; '+p.hn+'</div><div class="tbody" style="font-family:'+p.body+'">'+p.bn+' — The quick brown fox jumps over the lazy dog.</div></div>').join('')+'</div></section>'; }
  if(tpls.length){ b+='<section><h2>Templates &amp; sites</h2><ul class="links">'+tpls.map(t=>'<li><a href="'+t.url+'">'+t.nm+'</a> — <span>'+t.tag+'</span></li>').join('')+'</ul></section>'; }
  if(imgs.length){ b+='<section><h2>Images ('+imgs.length+')</h2><div class="igrid">'+imgs.map(im=>'<img src="'+im.src+'" alt="">').join('')+'</div></section>'; }
  if(pals.length){ b+='<section><h2>Palettes</h2>'+pals.map(p=>palRow(p,false)).join('')+'</section>'; }
  if(gens.length){ b+='<section><h2>Generated palettes</h2>'+gens.map(p=>palRow(p,true)).join('')+'</section>'; }
  if(!typs.length&&!tpls.length&&!imgs.length&&!pals.length&&!gens.length) b+='<section><p class="lean">No selections were made.</p></section>';
  b+='<footer>Made with the Movemental Visual Style Finder · '+date+'</footer>';
  const css=`:root{--paper:#FBFAF6;--ink:#1A1A1A;--muted:#5C5651;--border:#E5DFD2;--blue:#22409B}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--paper);color:var(--ink);font-family:'Inter',Arial,sans-serif;line-height:1.5;padding:clamp(20px,5vw,54px);max-width:940px;margin:0 auto}
header{border-bottom:1px solid var(--border);padding-bottom:16px;margin-bottom:22px}
.k{font-family:'IBM Plex Mono',monospace;font-size:.64rem;letter-spacing:.2em;text-transform:uppercase;color:var(--blue)}
h1{font-family:'Playfair Display',Georgia,serif;font-weight:600;font-size:clamp(1.6rem,4vw,2.3rem);margin:.3rem 0}
.date{font-family:'IBM Plex Mono',monospace;font-size:.7rem;color:var(--muted)}
.lean{font-family:'Playfair Display',Georgia,serif;font-style:italic;font-size:1.05rem;color:var(--muted);margin-top:.5rem}
.lean b{color:var(--blue);font-style:normal;font-weight:600}
section{margin:22px 0}
h2{font-family:'Playfair Display',Georgia,serif;font-weight:600;font-size:1.15rem;border-bottom:1px solid var(--border);padding-bottom:.3rem;margin-bottom:.8rem}
.tgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px}
.tcard{border:1px solid var(--border);border-radius:5px;padding:12px;background:#FFFDF7}
.tnm{font-family:'IBM Plex Mono',monospace;font-size:.58rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.tsamp{font-size:1.7rem;line-height:1.1;margin:.35rem 0 .3rem}
.tbody{font-size:.85rem;color:#2b2824}
.links{list-style:none}.links li{padding:.25rem 0;font-size:.9rem}.links a{color:var(--blue);text-decoration:none}
.igrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
.igrid img{width:100%;height:150px;object-fit:cover;border-radius:4px;border:1px solid var(--border)}
.prow{display:flex;align-items:center;gap:12px;margin-bottom:8px}
.prow .sw{display:flex;width:200px;height:40px;border-radius:4px;overflow:hidden;border:1px solid var(--border);flex:0 0 auto}
.prow .sw i{flex:1}
.prow .pmeta b{font-family:'Playfair Display',Georgia,serif;font-weight:600;font-size:.95rem;display:block}
.prow .pmeta span{font-family:'IBM Plex Mono',monospace;font-size:.62rem;color:var(--muted)}
footer{margin-top:30px;border-top:1px solid var(--border);padding-top:12px;font-family:'IBM Plex Mono',monospace;font-size:.58rem;letter-spacing:.06em;color:var(--muted)}`;
  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Visual style results</title>'+fonts+'<style>'+css+'</style></head><body>'+b+'</body></html>';
}
function copySummary(){
  const txt=summaryText();
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(()=>toast('Selections copied')).catch(()=>fallbackCopy(txt));
  } else fallbackCopy(txt);
}
function fallbackCopy(txt){
  const ta=document.createElement('textarea'); ta.value=txt; ta.style.position='fixed'; ta.style.opacity='0';
  document.body.appendChild(ta); ta.select();
  try{ document.execCommand('copy'); toast('Selections copied'); }catch(e){ toast('Copy failed'); }
  document.body.removeChild(ta);
}

/* ---------- per-item copy (for round-tripping to Stitch) ---------- */
function rawCopyText(txt){
  if(navigator.clipboard&&navigator.clipboard.writeText) return navigator.clipboard.writeText(txt);
  return new Promise((res,rej)=>{
    try{ const ta=document.createElement('textarea'); ta.value=txt; ta.style.position='fixed'; ta.style.opacity='0';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); res(); }
    catch(e){ rej(e); }
  });
}
function okBtn(btn){ if(!btn) return; btn.classList.add('done'); const prev=btn.innerHTML; btn.innerHTML=CHECK_SM;
  setTimeout(()=>{ btn.classList.remove('done'); btn.innerHTML=prev; },1200); }
function copyText(txt,btn,label){ rawCopyText(txt).then(()=>{ okBtn(btn); toast(label); }).catch(()=>toast('Copy failed')); }
function downloadBlob(blob,name){ const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),1500); }
function copyImage(id,btn){
  const im=IMAGES.find(x=>x.id===id); if(!im) return;
  const image=new Image();
  image.onload=()=>{
    const c=document.createElement('canvas'); c.width=image.naturalWidth; c.height=image.naturalHeight;
    c.getContext('2d').drawImage(image,0,0);
    c.toBlob(blob=>{
      if(!blob){ toast('Copy failed'); return; }
      if(navigator.clipboard&&window.ClipboardItem){
        navigator.clipboard.write([new ClipboardItem({'image/png':blob})])
          .then(()=>{ okBtn(btn); toast('Image copied — paste into Stitch'); })
          .catch(()=>{ downloadBlob(blob,im.id+'.png'); okBtn(btn); toast('Copy blocked — image downloaded'); });
      } else { downloadBlob(blob,im.id+'.png'); okBtn(btn); toast('Image downloaded'); }
    },'image/png');
  };
  image.onerror=()=>toast('Image unavailable');
  image.src=im.src;
}




function copyItem(kind,id,btn){
  if(kind==='approaches'){ const a=APPROACHES.find(x=>x.id===id); if(a) copyText(buildApproachPrompt(a),btn,'Stitch prompt copied'); }
  else if(kind==='type'){ const p=TYPE_PAIRS.find(x=>x.id===id); if(p) copyText(buildTypePrompt(p),btn,'Stitch prompt copied'); }
  else if(kind==='templates'){ const t=TEMPLATES.find(x=>x.id===id); if(t) copyText(buildTemplatePrompt(t),btn,'Stitch prompt copied'); }
  else if(kind==='palettes'){ const p=PALETTES.find(x=>x.id===id); if(p) copyText(buildPaletteText(p),btn,'Palette copied'); }
  else if(kind==='images'){ copyImage(id,btn); }
}

function renderBar(){
  const p=PAGES[page];
  const hint=$('#hint'), acts=$('#acts');
  const counts={typography:sel.type.size, templates:sel.templates.size, images:sel.images.size};
  if(p==='colors'){
    hint.innerHTML = colorMode==='generate'
      ? `press <b>space</b> or Generate · lock a swatch to keep it while you roll · Save to keep`
      : `<b>${sel.palettes.size}</b> selected · pick as many as you like · copy icon → Stitch`;
  } else if(p!=='results'){
    hint.innerHTML = `<b>${counts[p]||0}</b> selected · pick as many as you like · copy icon → Stitch`;
  } else {
    hint.innerHTML = `<b>${totalSel()}</b> selected in total`;
  }
  acts.innerHTML='';
  if(page>0){
    const back=document.createElement('button'); back.className='btn'; back.textContent='Back';
    back.onclick=()=>{ page--; render(); }; acts.appendChild(back);
  }
  if(p!=='results'){
    const next=document.createElement('button'); next.className='btn pri'; next.textContent = page===PAGES.length-2?'See results':'Continue';
    next.onclick=()=>{ page++; render(); }; acts.appendChild(next);
  } else {
    const over=document.createElement('button'); over.className='btn'; over.textContent='Start over';
    over.onclick=()=>{ sel.type.clear(); sel.templates.clear(); sel.images.clear(); sel.palettes.clear(); sel.generated=[]; gen=[]; page=0; render(); };
    acts.appendChild(over);
    const copy=document.createElement('button'); copy.className='btn pri'; copy.textContent='Copy selections';
    copy.onclick=copySummary; acts.appendChild(copy);
  }
}

/* ---------- typography pairings (same article, many voices) ---------- */


let activeType='tp01';
function applyType(){
  const p=TYPE_PAIRS.find(x=>x.id===activeType); const art=$('#typeArticle'); if(!p||!art) return;
  art.style.setProperty('--tf-head',p.head);
  art.style.setProperty('--tf-body',p.body);
  art.style.setProperty('--tf-hw',p.hw||600);
}
function paintTypeRail(){
  document.querySelectorAll('.trow').forEach(r=>{
    const id=r.dataset.id;
    r.classList.toggle('active', id===activeType);
    r.classList.toggle('sel', sel.type.has(id));
  });
}
function updateTypeBar(){
  const p=TYPE_PAIRS.find(x=>x.id===activeType); const nm=$('#typeSelName'); const btn=$('#typeSelBtn');
  if(nm) nm.textContent=p?('Viewing: '+p.nm+' — '+p.hn+' / '+p.bn):'';
  if(btn){ const on=sel.type.has(activeType); btn.textContent=on?'Selected ✓':'Select this pairing'; btn.classList.toggle('pri',!on); btn.classList.toggle('on',on); }
}
function setActiveType(id){ activeType=id; applyType(); paintTypeRail(); updateTypeBar(); }
function toggleType(id){ if(sel.type.has(id)) sel.type.delete(id); else sel.type.add(id); paintTypeRail(); updateTypeBar(); renderSteps(); }
function renderTypography(){
  let html = lead(stepK('typography'),'Typography — the same words, many voices.','Flip through trending font pairings and the article restyles live. Select as many as you like; the copy icon sends a pairing to Stitch.');
  html += '<div class="type-wrap">'+
    '<div class="type-rail" id="typeRail"></div>'+
    '<div class="type-article-wrap">'+
      '<div class="type-bar"><span class="mono-note" id="typeSelName"></span><button class="btn pri" id="typeSelBtn">Select this pairing</button></div>'+
      '<article class="type-article" id="typeArticle">'+ARTICLE_HTML+'</article>'+
    '</div></div>';
  stage.innerHTML=html;
  const rail=$('#typeRail');
  TYPE_PAIRS.forEach(p=>{
    const row=document.createElement('div'); row.className='trow'; row.dataset.id=p.id;
    row.innerHTML=
      '<button class="tselbtn" title="Select pairing" data-noselect><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 13l4 4L19 7"/></svg></button>'+
      '<div class="tinfo">'+
        '<div class="tname">'+p.nm+'</div>'+
        '<div class="tpv"><span class="tpv-h" style="font-family:'+p.head+'">Ag</span>'+
          '<span class="tpv-meta"><span style="font-family:'+p.head+'">'+p.hn+'</span> + <span style="font-family:'+p.body+'">'+p.bn+'</span></span></div>'+
        '<div class="tvibe">'+p.vibe+'</div>'+
      '</div>'+
      '<button class="tcopy" title="Copy Stitch prompt" data-noselect>'+COPY_LT+'</button>';
    row.querySelector('.tinfo').onclick=()=>setActiveType(p.id);
    row.querySelector('.tselbtn').onclick=e=>{ e.stopPropagation(); toggleType(p.id); };
    row.querySelector('.tcopy').onclick=e=>{ e.stopPropagation(); copyText(buildTypePrompt(p), e.currentTarget, 'Stitch prompt copied'); };
    rail.appendChild(row);
  });
  $('#typeSelBtn').onclick=()=>toggleType(activeType);
  applyType(); paintTypeRail(); updateTypeBar();
}

/* ---------- palette generator (local, family-seeded) ---------- */






const LOCK_OFF='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0"/></svg>';
const LOCK_ON ='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
const COPY_LT ='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>';

let genFamily='ink';
let gen=[];
let genDrag=-1;

function genSlot(f, r) {
  let h = r.hue === 'accent' ? pick(f.accent) : pick(f.base);
  h = (h + rand(-6, 6) + 360) % 360;
  const sr = pickS(f, r.S);
  return hsl2hex(h, rand(sr[0], sr[1]), rand(r.L[0], r.L[1]));
}
function curFam() {
  return genFamily === 'any' ? FAMILIES[pick(FAM_ORDER)] : FAMILIES[genFamily];
}
function genGenerate() {
  const f = curFam();
  const ramp = f.dark ? DARK_RAMP : LIGHT_RAMP;
  if (!gen.length) {
    gen = ROLE_ORDER.map((role) => ({ hex: genSlot(f, ramp[role]), locked: false, role }));
  } else {
    gen = gen.map((it) => (it.locked ? it : { hex: genSlot(f, ramp[it.role]), locked: false, role: it.role }));
  }
  renderCols();
}

function moveCol(i,d){ const j=i+d; if(j<0||j>=gen.length) return; const t=gen[i];gen[i]=gen[j];gen[j]=t; renderCols(); }
function dropCol(target){ if(genDrag<0||genDrag===target) return; const it=gen.splice(genDrag,1)[0]; gen.splice(target,0,it); genDrag=-1; renderCols(); }
function renderCols(){
  const wrap=$('#genCols'); if(!wrap) return; wrap.innerHTML='';
  gen.forEach((it,i)=>{
    const bt=bestText(it.hex);
    const col=document.createElement('div');
    col.className='gcol'+(it.locked?' locked':''); col.style.background=it.hex; col.draggable=true;
    col.innerHTML=
      '<div class="ctrl">'+
        '<button class="cbtn lockbtn" title="Lock" style="color:'+bt.t+'">'+(it.locked?LOCK_ON:LOCK_OFF)+'</button>'+
        '<button class="cbtn copybtn" title="Copy hex" style="color:'+bt.t+'">'+COPY_LT+'</button>'+
      '</div>'+
      '<div class="hexwrap" style="color:'+bt.t+'"><span class="hex">'+it.hex.toUpperCase()+'</span><span class="cc">'+bt.r.toFixed(1)+':1'+(bt.r>=4.5?' AA':'')+'</span></div>'+
      '<div class="move">'+
        '<button class="mvbtn" title="Move left" style="color:'+bt.t+'">&#8249;</button>'+
        '<button class="mvbtn" title="Move right" style="color:'+bt.t+'">&#8250;</button>'+
      '</div>';
    col.querySelector('.lockbtn').onclick=e=>{e.stopPropagation(); it.locked=!it.locked; renderCols();};
    col.querySelector('.copybtn').onclick=e=>{e.stopPropagation(); copyText(it.hex.toUpperCase(), e.currentTarget, 'Hex copied');};
    const mv=col.querySelectorAll('.mvbtn');
    mv[0].onclick=e=>{e.stopPropagation(); moveCol(i,-1);};
    mv[1].onclick=e=>{e.stopPropagation(); moveCol(i,1);};
    col.addEventListener('dragstart',()=>{genDrag=i; col.classList.add('drag');});
    col.addEventListener('dragend',()=>{genDrag=-1; col.classList.remove('drag');});
    col.addEventListener('dragover',e=>e.preventDefault());
    col.addEventListener('drop',e=>{e.preventDefault(); dropCol(i);});
    wrap.appendChild(col);
  });
}

function genSaveCurrent(){
  sel.generated.push({id:'gen'+Date.now(), nm:'Generated '+String(sel.generated.length+1).padStart(2,'0'), c:gen.map(c=>c.hex.toUpperCase()), roles:gen.map(c=>c.role)});
  renderSavedStrip(); renderSteps(); toast('Saved to results');
}
function renderSavedStrip(){
  const el=$('#genSaved'); if(!el) return;
  if(!sel.generated.length){ el.innerHTML=''; return; }
  el.innerHTML='<div class="saved-h">Saved '+sel.generated.length+'</div><div class="saved-row">'+
    sel.generated.map((p,idx)=>'<div class="saved-item"><div class="mini">'+p.c.map(c=>'<i style="background:'+c+'"></i>').join('')+'</div><button class="mini-x" data-i="'+idx+'" title="Remove">&times;</button></div>').join('')+'</div>';
  el.querySelectorAll('.mini-x').forEach(b=>b.onclick=()=>{ sel.generated.splice(parseInt(b.dataset.i),1); renderSavedStrip(); renderSteps(); });
}
function buildGenerator(container){
  container.innerHTML =
    '<div class="gen-how">'+
      '<div class="gh-title">How the generator works</div>'+
      '<ol class="gh-steps">'+
        '<li><b>Pick a family tab.</b> Each one — Ink, Warm, Earthy, Muted, Dark, Bold, Painterly — keeps every colour in that mood. <b>Surprise</b> rolls a random family each time.</li>'+
        '<li><b>Press the spacebar</b> (or tap Generate) to roll a fresh five-colour palette.</li>'+
        '<li><b>Lock what you like.</b> Tap a swatch\'s lock icon to hold that one colour, then keep rolling — the locked colour stays put while everything unlocked changes around it. Lock two, roll again, and so on until it clicks.</li>'+
        '<li><b>Save</b> to keep a palette; it lands in your results and the copied brief. <b>Copy</b> sends the current one to Stitch.</li>'+
      '</ol>'+
    '</div>'+
    '<div class="gen-bar"><div class="fam-chips" id="famChips"></div>'+
      '<div class="gen-actions"><button class="btn" id="genBtn">Generate</button><button class="btn" id="genCopy">Copy</button><button class="btn pri" id="genSave">Save</button></div>'+
    '</div>'+
    '<div class="gen-cols" id="genCols"></div>'+
    '<div class="gen-saved" id="genSaved"></div>';
  const fc=$('#famChips');
  [...FAM_ORDER,'any'].forEach(k=>{
    const b=document.createElement('button'); b.className='fchip'+(genFamily===k?' on':''); b.textContent=FAM_LABEL[k];
    if(k==='any') b.title='Rolls a random family each time';
    b.onclick=()=>{ genFamily=k; document.querySelectorAll('.fchip').forEach(x=>x.classList.remove('on')); b.classList.add('on'); genGenerate(); };
    fc.appendChild(b);
  });
  $('#genBtn').onclick=genGenerate;
  $('#genCopy').onclick=()=>{ rawCopyText(buildGenText(gen, genFamily)).then(()=>toast('Palette copied')).catch(()=>toast('Copy failed')); };
  $('#genSave').onclick=genSaveCurrent;
  if(!gen.length) genGenerate(); else renderCols();
  renderSavedStrip();
}
document.addEventListener('keydown',e=>{
  if(!(PAGES[page]==='colors' && colorMode==='generate')) return;
  if(e.code==='Space'||e.key===' '){
    const tag=(e.target.tagName||'').toLowerCase();
    if(tag==='input'||tag==='textarea') return;
    e.preventDefault(); genGenerate();
  }
});

render();
