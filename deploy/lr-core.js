/* Land Readjustment Platform — data + compute core (site-agnostic) */
(function(){
const LR = window.LR = window.LR || {};
LR.STAGES = ['Sensitization','Existing parcel data','Layout design','Land contribution','Plot reallocation','Registration','Infrastructure'];
LR.ZONES = {
  R1:{c:'#FFF2A8',n:'Low density residential zone'}, R1A:{c:'#FFE066',n:'Low density residential densification zone'},
  R1B:{c:'#F3E7B3',n:'Rural residential zone'}, R3:{c:'#F4A259',n:'Medium density residential – Expansion zone'},
  C1:{c:'#E4572E',n:'Mixed use commercial zone'}, PF1:{c:'#7E6BC4',n:'Education and research facilities'},
  PF3:{c:'#9C8ED3',n:'Religious facilities'}, PF5:{c:'#5B4A9E',n:'Sport, leisure facilities'},
  ET:{c:'#8BC34A',n:'Eco-tourism and open space zone'}, F1:{c:'#2E7D32',n:'Forest plantation zone'}, T1:{c:'#B0B7BE',n:'Road reserve'}
};
LR.ZONE_ORDER = ['R1A','T1','R3','R1B','C1','F1','R1','ET','PF1','PF3','PF5'];
LR.NSRC_C = {1:'#CCECF8',2:'#73CBED',3:'#006990',4:'#004059'};
LR.LINK_C = {single:'#73CBED',multiple:'#006990',outside:'#E5BE01'};
LR.SRC_PAL = ['#00A1DE','#20603D','#E5BE01','#E4572E','#7E6BC4','#006990','#8BC34A','#F4A259','#004059','#73CBED','#153E28','#B42318','#9C8ED3','#FFE066','#5B4A9E'];

LR.sites = [
  { id:'kabeza', code:'KBZ', name:'Kabeza Site', sector:'Masoro', district:'Rulindo', province:'Northern', cells:['Nyamyumba','Kigarama'],
    areaHa:63.14, lastUpdated:'12 Sep 2026', stage:3, layoutVersion:'Layout v1', existingSource:'Existing parcels: LAIS extract',
    dataUrl:'data/kabeza.json', summaryUrl:'data/kabeza_summary.json', mock:false, center:[30.058,-1.829],
    stageDates:[] /* set by the site team in Data manager; blank = "Date to be confirmed" */ },
  { id:'demo-b', code:'DMB', name:'Demo Site B', sector:'Tumba', district:'Huye', province:'Southern', cells:['Cyarwa'],
    areaHa:null, lastUpdated:'3 Aug 2026', stage:2, layoutVersion:'Layout v0 (draft)', existingSource:'Existing parcels: mock data',
    mock:true, center:[29.7400,-2.6023],
    stageDates:[] }
];
LR.site = id => LR.sites.find(s=>s.id===id);

/* ---------- geometry ---------- */
function decode(polys, base){
  return polys.map(p=>p.map(r=>{const o=[];let x=0,y=0;for(let i=0;i<r.length;i+=2){x+=r[i];y+=r[i+1];o.push([base[0]+x/1e6, base[1]+y/1e6]);}return o;}));
}
function geomOf(polys){ return polys.length===1?{type:'Polygon',coordinates:polys[0]}:{type:'MultiPolygon',coordinates:polys}; }
function bboxOf(polys){let a=[1e9,1e9,-1e9,-1e9];for(const p of polys)for(const r of p)for(const [x,y] of r){if(x<a[0])a[0]=x;if(y<a[1])a[1]=y;if(x>a[2])a[2]=x;if(y>a[3])a[3]=y;}return a;}
function ringArea(r){let s=0;for(let i=0,j=r.length-1;i<r.length;j=i++)s+=(r[j][0]+r[i][0])*(r[j][1]-r[i][1]);return s/2;}
function centroid(polys){ // area-weighted centroid of largest polygon outer ring
  let best=null,ba=-1;for(const p of polys){const a=Math.abs(ringArea(p[0]));if(a>ba){ba=a;best=p[0];}}
  if(!best)return[0,0];let cx=0,cy=0,A=0;for(let i=0,j=best.length-1;i<best.length;j=i++){const f=best[j][0]*best[i][1]-best[i][0]*best[j][1];cx+=(best[j][0]+best[i][0])*f;cy+=(best[j][1]+best[i][1])*f;A+=f;}
  if(Math.abs(A)<1e-14){const b=bboxOf(polys);return[(b[0]+b[2])/2,(b[1]+b[3])/2];}return[cx/(3*A),cy/(3*A)];
}
function hull(pts){pts=pts.slice().sort((a,b)=>a[0]-b[0]||a[1]-b[1]);const cr=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);const lo=[],up=[];for(const p of pts){while(lo.length>=2&&cr(lo[lo.length-2],lo[lo.length-1],p)<=0)lo.pop();lo.push(p);}for(let i=pts.length-1;i>=0;i--){const p=pts[i];while(up.length>=2&&cr(up[up.length-2],up[up.length-1],p)<=0)up.pop();up.push(p);}up.pop();lo.pop();const h=lo.concat(up);h.push(h[0]);return h;}
LR.bboxUnion = bbs => bbs.reduce((a,b)=>[Math.min(a[0],b[0]),Math.min(a[1],b[1]),Math.max(a[2],b[2]),Math.max(a[3],b[3])],[1e9,1e9,-1e9,-1e9]);

/* ---------- mock site generator (Demo Site B) ---------- */
function rng(seed){return()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};}
function genDemo(){
  const R=rng(42), lon0=29.7372, lat0=-2.6048, mx=1/111205, my=1/110574;
  const rect=(x0,y0,x1,y1)=>[[[lon0+x0*mx,lat0+y0*my],[lon0+x1*mx,lat0+y0*my],[lon0+x1*mx,lat0+y1*my],[lon0+x0*mx,lat0+y1*my],[lon0+x0*mx,lat0+y0*my]]];
  const W=330,H=270, villages=['Cyarwa','Kaburemera','Matyazo'], uses=['Agricultural','Agricultural','Residential','Agricultural','Residential','Commercial activities'];
  const parcels=[]; let n=1;
  for(let row=0;row<6;row++){let x=0;const y0=row*45,y1=y0+45;while(x<W-8){let w=22+R()*48;if(W-x-w<18)w=W-x;const r={x0:x,y0,x1:x+w,y1};x+=w;
    const own='Owner B-'+String(1+Math.floor(R()*38)).padStart(3,'0');
    parcels.push({upi:'2/03/07/02/'+(700+n++),owner:R()<0.05?'Government of Rwanda':own,joint:R()<0.45,village:villages[Math.floor(row/2)],cell:'Cyarwa',sector:'Tumba',
      landUse:uses[Math.floor(R()*uses.length)],mort:R()<0.06?1:0,restr:R()<0.03?1:0,prov:R()<0.04?1:0,pend:0,r,polys:[rect(r.x0,r.y0,r.x1,r.y1)]});}}
  const plots=[];let k=1;const pid=()=> 'DMB-'+String(k++).padStart(4,'0');
  const roads=[[0,130,W,142],[100,0,110,270],[215,0,225,270]];
  const blocks=[[0,0,100,130],[110,0,215,130],[225,0,W,130],[0,142,100,H],[110,142,215,H],[225,142,W,H]];
  blocks.forEach((b,bi)=>{const rows=4,rh=(b[3]-b[1])/rows,cols=Math.max(1,Math.floor((b[2]-b[0])/17)),cw=(b[2]-b[0])/cols;
    for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){const r={x0:b[0]+j*cw,y0:b[1]+i*rh,x1:b[0]+(j+1)*cw,y1:b[1]+(i+1)*rh};
      let zone=(i===1||i===2)&&(bi===1||bi===4)?'C1':(bi===0||bi===3?'R1A':'R3');let cat='Plot';
      if(bi===5&&i>=2&&j>=cols-3){zone='ET';cat='Public';} if(bi===2&&i===0&&j<3){zone='PF1';cat='Public';}
      plots.push({id:pid(),zone,cat,r,polys:[rect(r.x0,r.y0,r.x1,r.y1)]});}});
  roads.forEach(rr=>{const r={x0:rr[0],y0:rr[1],x1:rr[2],y1:rr[3]};plots.push({id:pid(),zone:'T1',cat:'Road',r,polys:[rect(r.x0,r.y0,r.x1,r.y1)]});});
  const links=[];
  for(const q of plots)for(const p of parcels){const a=q.r,b=p.r;const x0=Math.max(a.x0,b.x0),x1=Math.min(a.x1,b.x1),y0=Math.max(a.y0,b.y0),y1=Math.min(a.y1,b.y1);
    if(x1<=x0||y1<=y0)continue;const m2=(x1-x0)*(y1-y0),qa=(a.x1-a.x0)*(a.y1-a.y0),pa=(b.x1-b.x0)*(b.y1-b.y0);if(m2<5||m2<qa*0.01)continue;
    links.push({upi:p.upi,plot:q.id,m2:+m2.toFixed(1),pctPlot:+(m2/qa*100).toFixed(1),pctParcel:+(m2/pa*100).toFixed(1),polys:[rect(x0,y0,x1,y1)]});}
  const rate=0.2;
  const P=parcels.map(p=>{const area=(p.r.x1-p.r.x0)*(p.r.y1-p.r.y0);return{upi:p.upi,owner:p.owner,joint:p.joint,village:p.village,cell:p.cell,sector:p.sector,area:+area.toFixed(1),
    contrib:+(area*rate).toFixed(1),output:+(area*(1-rate)).toFixed(1),landUse:p.landUse,mort:p.mort,restr:p.restr,prov:p.prov,pend:p.pend,polys:p.polys};});
  const Q=plots.map(q=>({id:q.id,zone:q.zone,cat:q.cat,area:+((q.r.x1-q.r.x0)*(q.r.y1-q.r.y0)).toFixed(1),outside:0,polys:q.polys}));
  return {parcels:P,plots:Q,links,boundary:[rect(0,0,W,H)]};
}

/* ---------- build a site dataset ---------- */
function build(site, raw){
  const D={site,parcels:[],plots:[],links:[],byUpi:{},byPlot:{}};
  const CAT={P:'Plot',R:'Road',G:'Public'};
  if(raw.compact){
    const b=raw.base;
    D.boundary=decode(raw.boundary,b);
    for(const a of raw.parcels){const polys=decode(a[18],b);D.parcels.push({upi:a[0],owner:a[1],joint:!!a[2],village:a[3],cell:a[4],sector:a[3]?'Masoro':null,area:a[5],contrib:a[6],output:a[7],landUse:a[8],mort:a[9],restr:a[10],prov:a[11],pend:a[12],polys});}
    for(const a of raw.plots){const polys=decode(a[6],b);D.plots.push({id:a[0],zone:a[1],cat:CAT[a[2]],area:a[3],lt:a[4],outside:a[5],polys});}
    for(const a of raw.links){D.links.push({upi:a[0],plot:a[1],m2:a[2],pctPlot:a[3],pctParcel:a[4],polys:decode(a[5],b)});}
  } else { D.boundary=raw.boundary; D.parcels=raw.parcels; D.plots=raw.plots; D.links=raw.links; }
  for(const p of D.parcels){p.links=[];p.noGeom=!p.polys.length;p.bb=p.noGeom?null:bboxOf(p.polys);p.c=p.noGeom?null:centroid(p.polys);p.contribPct=p.area?p.contrib/p.area*100:0;D.byUpi[p.upi]=p;}
  for(const q of D.plots){q.links=[];q.bb=q.polys.length?bboxOf(q.polys):null;q.c=q.polys.length?centroid(q.polys):null;q.zoneName=(LR.ZONES[q.zone]||{}).n||q.zone;D.byPlot[q.id]=q;}
  for(const l of D.links){const q=D.byPlot[l.plot],p=D.byUpi[l.upi];l.cat=q?q.cat:'Plot';l.zone=q?q.zone:'';l.c=centroid(l.polys);if(q)q.links.push(l);if(p)p.links.push(l);}
  for(const q of D.plots){q.links.sort((a,b)=>b.m2-a.m2);q.links.forEach((l,i)=>l.rank=i+1);q.nSrc=q.links.length;
    if(q.lt==null){const lm=q.links.reduce((s,l)=>s+l.m2,0);q.outside=Math.max(0,+(q.area-lm).toFixed(1));if(q.outside<5)q.outside=0;}
    q.partlyOutside=q.lt!=null?(q.lt>=2):q.outside>0; q.multi=q.nSrc>1; q.nsrcBin=q.nSrc>=4?4:Math.max(1,q.nSrc);
    q.primary=q.links[0]||null;}
  for(const p of D.parcels){p.links.sort((a,b)=>b.m2-a.m2);
    const sum=c=>p.links.filter(l=>c.includes(l.cat)).reduce((s,l)=>s+l.m2,0);
    if(p.toNew==null){p.toNew=+sum(['Plot']).toFixed(1);p.toRoad=+sum(['Road']).toFixed(1);p.toPub=+sum(['Public']).toFixed(1);p.loss=p.area?+((p.toRoad+p.toPub)/p.area*100).toFixed(1):0;}
    p.newPlots=p.links.filter(l=>l.cat==='Plot');p.nNew=p.newPlots.length;
    p.onlyInfra=p.nNew===0&&!p.noGeom; p.enc=p.mort?1:p.restr?2:p.prov?3:0;}
  // extra per-parcel from compact
  if(raw.compact){raw.parcels.forEach((a,i)=>{const p=D.parcels[i];p.toNew=a[14];p.toRoad=a[15];p.toPub=a[16];p.loss=a[17];});}
  // village hulls
  const vs={};for(const p of D.parcels){if(!p.village)continue;(vs[p.village]=vs[p.village]||[]);for(const r of p.polys)for(const pt of r[0])vs[p.village].push(pt);}
  D.villages=Object.keys(vs).map(v=>{const h=hull(vs[v]);return{name:v,ring:h,c:centroid([[h]]),n:D.parcels.filter(p=>p.village===v).length};});
  D.bb=bboxOf(D.boundary);
  D.villageNames=Object.keys(vs).sort(); D.cellNames=[...new Set(D.parcels.map(p=>p.cell).filter(Boolean))].sort();
  D.zoneCodes=LR.ZONE_ORDER.filter(z=>D.plots.some(q=>q.zone===z));
  D.landUses=[...new Set(D.parcels.map(p=>p.landUse).filter(Boolean))];
  D.maxOutput=Math.ceil(Math.max(...D.parcels.map(p=>p.output))/100)*100; D.maxNNew=Math.max(...D.parcels.map(p=>p.nNew));
  // field resurvey (additional layer; LAIS figures stay the reference)
  D.rs=null; for(const p of D.parcels)p.rs=null;
  if(raw.rs){const RS=raw.rs,cnt={};
    const recs=RS.recs.map((a,i)=>({id:'RS-'+String(i+1).padStart(3,'0'),upi:a[0]||null,name:a[1],village:a[2],cell:a[3],area:a[4],lais:a[5],contrib:a[6],remain:a[7],noteRw:a[8],noteEn:a[9],noteType:a[10],polys:decode(a[11],RS.base).map(p=>p.map(r=>r.filter((c,k)=>!k||c[0]!==r[k-1][0]||c[1]!==r[k-1][1])).filter(r=>r.length>=4)).filter(p=>p.length)}));
    recs.forEach(r=>{if(r.upi)cnt[r.upi]=(cnt[r.upi]||0)+1;});
    recs.forEach(r=>{r.inLais=!!(r.upi&&D.byUpi[r.upi]);r.dup=!!r.upi&&cnt[r.upi]>1;r.status=!r.upi?'noupi':!r.inLais?'notlais':'matched';
      r.issues=[!r.upi&&'No valid UPI',r.upi&&!r.inLais&&'UPI not in LAIS extract',r.dup&&'Same UPI on '+cnt[r.upi]+' resurveyed pieces',r.noteRw&&'Field note'].filter(Boolean);r.flag=r.issues.length>0;
      r.bb=r.polys.length?bboxOf(r.polys):null;r.c=r.polys.length?centroid(r.polys):null;if(r.inLais)(D.byUpi[r.upi]._rs=D.byUpi[r.upi]._rs||[]).push(r);});
    for(const p of D.parcels){const rr=p._rs;delete p._rs;if(!rr)continue;const sum=k=>+rr.reduce((s,r)=>s+r[k],0).toFixed(1),area=sum('area');
      p.rs={n:rr.length,area,contrib:sum('contrib'),remain:sum('remain'),diff:+(area-p.area).toFixed(1),diffPct:p.area>0?(area-p.area)/p.area*100:null,notes:rr.filter(r=>r.noteRw),recs:rr};}
    const M=D.parcels.filter(p=>p.rs),band=[['Smaller by more than 10%',-1e9,-10],['2–10% smaller',-10,-2],['Within ±2%',-2,2],['2–10% larger',2,10],['Larger by more than 10%',10,1e9]];
    D.rs={recs,source:RS.source,rate:RS.rate,n:recs.length,matched:M.length,notResurveyed:D.parcels.filter(p=>!p.rs&&!p.noGeom).length,
      noUpi:recs.filter(r=>r.status==='noupi').length,notLais:recs.filter(r=>r.status==='notlais').length,dupUpis:Object.keys(cnt).filter(u=>cnt[u]>1).length,
      notes:recs.filter(r=>r.noteRw).length,flagged:recs.filter(r=>r.flag).length,laisM2:M.reduce((s,p)=>s+p.area,0),rsM2:M.reduce((s,p)=>s+p.rs.area,0),
      rsAll:recs.reduce((s,r)=>s+r.area,0),contribAll:recs.reduce((s,r)=>s+r.contrib,0),
      bands:band.map(([l,lo,hi])=>({l,lo,hi,n:M.filter(p=>p.rs.diffPct!=null&&p.rs.diffPct>=lo&&p.rs.diffPct<hi).length}))};}
  // GeoJSON
  const F=(g,pr)=>({type:'Feature',geometry:g,properties:pr});
  D.fc={
    boundary:{type:'FeatureCollection',features:[F(geomOf(D.boundary),{})]},
    parcels:{type:'FeatureCollection',features:D.parcels.filter(p=>!p.noGeom).map(p=>F(geomOf(p.polys),{id:p.upi,loss:p.loss,nnew:p.nNew,enc:p.enc,contrib:p.contrib,v:p.village||'',rsd:p.rs&&p.rs.diffPct!=null?p.rs.diffPct:-999}))},
    rs:{type:'FeatureCollection',features:D.rs?D.rs.recs.filter(r=>r.polys.length).map(r=>F(geomOf(r.polys),{id:r.id,upi:r.upi||'',flag:r.flag?1:0})):[]},
    plots:{type:'FeatureCollection',features:D.plots.filter(q=>q.polys.length).map(q=>F(geomOf(q.polys),{id:q.id,zone:q.zone,cat:q.cat,
      zc:(LR.ZONES[q.zone]||{}).c||'#ccc',nc:q.cat==='Plot'?LR.NSRC_C[q.nsrcBin]:'#D0D5DD',lc:q.cat!=='Plot'?'#D0D5DD':q.partlyOutside?LR.LINK_C.outside:q.multi?LR.LINK_C.multiple:LR.LINK_C.single}))},
    links:{type:'FeatureCollection',features:D.links.map(l=>F(geomOf(l.polys),{upi:l.upi,plot:l.plot,cat:l.cat,zc:(LR.ZONES[l.zone]||{}).c||'#ccc'}))},
    villages:{type:'FeatureCollection',features:D.villages.map(v=>F({type:'Polygon',coordinates:[v.ring]},{name:v.name}))}
  };
  D.summary=computeSummary(D);
  if(raw.summary) D.official=raw.summary;
  return D;
}

function computeSummary(D){
  const P=D.parcels, Q=D.plots, ha=m=>m/1e4;
  const exA=P.reduce((s,p)=>s+p.area,0), layA=Q.reduce((s,q)=>s+q.area,0), con=P.reduce((s,p)=>s+p.contrib,0), out=P.reduce((s,p)=>s+p.output,0);
  const road=Q.filter(q=>q.cat==='Road').reduce((s,q)=>s+q.area,0);
  const bp=Q.filter(q=>q.cat==='Plot');
  return {existing_parcels:P.length, existing_area_ha:ha(exA), layout_area_ha:ha(layA), new_plots_excl_roads:Q.filter(q=>q.cat!=='Road').length,
    building_plots:bp.length, public_plots:Q.filter(q=>q.cat==='Public').length, contribution_ha:ha(con), contribution_pct:exA?con/exA*100:0, output_ha:ha(out),
    road_reserve_ha:ha(road), road_reserve_pct:layA?road/layA*100:0, owners:new Set(P.map(p=>p.owner)).size};
}

LR.load = async function(siteId){
  const site=LR.site(siteId); if(site._D) return site._D;
  let raw;
  if(site.mock){ raw=genDemo(); }
  else {
    // Embedded data (data/<site>.data.js) is the primary source; wait briefly in case the script is still evaluating.
    for(let i=0;i<40&&!(window.LR_DATA&&window.LR_DATA[site.id]);i++) await new Promise(r=>setTimeout(r,75));
    if(window.LR_DATA&&window.LR_DATA[site.id]){ const P=window.LR_DATA[site.id]; raw=Object.assign({},P.data,{compact:true,summary:P.summary}); }
    else {
      const getJSON=async url=>{if(!url)return null;try{const r=await fetch(url);if(!r.ok)return null;const t=await r.text();try{return JSON.parse(t);}catch(_){return null;}}catch(_){return null;}};
      const RES=window.__resources||{},rid={kabeza:['kabeza-json','kabeza-summary']}[site.id]||[];
      const [d,s]=await Promise.all([getJSON(RES[rid[0]]||site.dataUrl),getJSON(RES[rid[1]]||site.summaryUrl)]);
      if(!d||!d.parcels) throw new Error(site.name+' data is not available in this copy of the platform');
      raw=Object.assign(d,{compact:true,summary:s});
    }
  }
  if(window.LR_RS&&window.LR_RS[site.id]) raw.rs=window.LR_RS[site.id];
  const D=build(site,raw); site._D=D;
  if(site.areaHa==null) site.areaHa=+D.summary.layout_area_ha.toFixed(2);
  return D;
};

/* ---------- formatting ---------- */
LR.fmt = (n,d=0)=>n==null||isNaN(n)?'—':Number(n).toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
LR.m2 = n=>LR.fmt(n)+' m²'; LR.ha=(m,d=2)=>LR.fmt(m/1e4,d)+' ha'; LR.pct=(n)=>LR.fmt(n,1)+'%';

/* ---------- search ---------- */
LR.normUpi = s=>String(s||'').trim().replace(/[\s\-\\]+/g,'/').replace(/\/+/g,'/').toUpperCase();
LR.normPlot = s=>{const m=String(s||'').trim().toUpperCase().match(/^([A-Z]{2,4})[\s\-\/_]*0*(\d{1,4})$/);return m?m[1]+'-'+m[2].padStart(4,'0'):null;};
LR.search = function(q, datasets, role){
  q=String(q||'').trim(); if(!q) return {kind:'empty'};
  const pid=LR.normPlot(q);
  for(const D of datasets){ if(pid&&D.byPlot[pid]) return {kind:'plot',site:D.site.id,id:pid}; }
  const u=LR.normUpi(q);
  for(const D of datasets){ if(D.byUpi[u]) return {kind:'parcel',site:D.site.id,id:u}; }
  if(role!=='public' && /[a-z]/i.test(q)){
    const ql=q.toLowerCase(); const hits=[];
    for(const D of datasets) for(const p of D.parcels) if(p.owner&&p.owner.toLowerCase().includes(ql)) hits.push({site:D.site.id,upi:p.upi,owner:p.owner,area:p.area,output:p.output,village:p.village});
    if(hits.length){ const owners=[...new Set(hits.map(h=>h.owner))]; return {kind:'owner',q,hits,owners}; }
  }
  // partial UPI suggestions
  const sugg=[]; for(const D of datasets) for(const p of D.parcels) if(p.upi.includes(u)&&u.length>=3) {sugg.push({site:D.site.id,upi:p.upi}); if(sugg.length>=5)break;}
  return {kind:'none',q,sugg,nameBlocked:role==='public'&&/[a-z]{3,}/i.test(q)&&!pid};
};
LR.suggest = function(q, datasets, role){
  q=String(q||'').trim(); if(q.length<2) return [];
  const out=[]; const u=LR.normUpi(q), pid=LR.normPlot(q), ql=q.toLowerCase();
  for(const D of datasets){
    for(const p of D.parcels){ if(out.length>=7)break;
      if(p.upi.includes(u)) out.push({kind:'parcel',site:D.site.id,id:p.upi,label:p.upi,sub:(p.village||'—')+' · '+LR.m2(p.area)});
      else if(role!=='public'&&/[a-z]/i.test(q)&&p.owner&&p.owner.toLowerCase().includes(ql)) out.push({kind:'owner',site:D.site.id,id:p.owner,label:p.owner,sub:'Owner · '+p.upi});
    }
    if(/^[a-z]{2,4}/i.test(q)) for(const x of D.plots){ if(out.length>=7)break; if(x.id.toLowerCase().includes(ql.replace(/\s/g,'-'))||(pid&&x.id===pid)) out.push({kind:'plot',site:D.site.id,id:x.id,label:x.id,sub:x.zone+' · '+LR.m2(x.area)}); }
  }
  const seen={};return out.filter(o=>{const k=o.kind+o.id;if(seen[k])return false;seen[k]=1;return true;});
};

/* ---------- filtering ---------- */
LR.emptyFilters = ()=>({zones:[],villages:[],cells:[],landUse:[],enc:[],linkType:[],nsrc:[],fromUpi:'',text:'',loss:[0,100],output:null,nnew:null});
LR.activeChips = function(f,D){
  const c=[];f.zones.forEach(z=>c.push({k:'zones',v:z,l:'Zone '+z}));f.villages.forEach(v=>c.push({k:'villages',v,l:v}));f.cells.forEach(v=>c.push({k:'cells',v,l:'Cell '+v}));
  f.landUse.forEach(v=>c.push({k:'landUse',v,l:v}));f.enc.forEach(v=>c.push({k:'enc',v,l:{mort:'Mortgaged',restr:'Restricted',prov:'Provisional'}[v]}));
  f.linkType.forEach(v=>c.push({k:'linkType',v,l:{single:'From a single UPI',multiple:'From multiple UPIs',outside:'Partly outside old parcels'}[v]}));
  f.nsrc.forEach(v=>c.push({k:'nsrc',v,l:v+(v==='1'?' source UPI':' source UPIs')}));
  if(f.fromUpi)c.push({k:'fromUpi',v:f.fromUpi,l:'Subdivided from '+f.fromUpi});if(f.text)c.push({k:'text',v:f.text,l:'“'+f.text+'”'});
  if(f.loss[0]>0||f.loss[1]<100)c.push({k:'loss',l:'Physical loss '+f.loss[0]+'–'+f.loss[1]+'%'});
  if(f.output)c.push({k:'output',l:'Output '+LR.fmt(f.output[0])+'–'+LR.fmt(f.output[1])+' m²'});
  if(f.nnew)c.push({k:'nnew',l:'New plots/parcel '+f.nnew[0]+'–'+f.nnew[1]});
  return c;
};
LR.applyFilters = function(D,f,role){
  const pf = f.villages.length||f.cells.length||f.landUse.length||f.enc.length||f.text||f.loss[0]>0||f.loss[1]<100||f.output||f.nnew;
  const qf = f.zones.length||f.linkType.length||f.nsrc.length||f.fromUpi;
  const tl=f.text.toLowerCase();
  let parcels=D.parcels.filter(p=>{
    if(f.villages.length&&!f.villages.includes(p.village))return false;
    if(f.cells.length&&!f.cells.includes(p.cell))return false;
    if(f.landUse.length&&!f.landUse.includes(p.landUse))return false;
    if(f.enc.length&&!f.enc.some(e=>p[e]))return false;
    if(tl&&!(p.upi.toLowerCase().includes(tl)||(role!=='public'&&p.owner&&p.owner.toLowerCase().includes(tl))))return false;
    if(p.loss<f.loss[0]||p.loss>f.loss[1])return false;
    if(f.output&&(p.output<f.output[0]||p.output>f.output[1]))return false;
    if(f.nnew&&(p.nNew<f.nnew[0]||p.nNew>f.nnew[1]))return false;
    return true;});
  let plots=D.plots.filter(q=>{
    if(f.zones.length&&!f.zones.includes(q.zone))return false;
    if(f.linkType.length){ if(q.cat!=='Plot')return false; const t=[]; if(!q.multi)t.push('single'); if(q.multi)t.push('multiple'); if(q.partlyOutside)t.push('outside'); if(!f.linkType.some(x=>t.includes(x)))return false; }
    if(f.nsrc.length){ if(q.cat!=='Plot')return false; if(!f.nsrc.includes(q.nsrcBin>=4?'4+':String(q.nsrcBin)))return false; }
    if(f.fromUpi&&!q.links.some(l=>l.upi===f.fromUpi))return false;
    return true;});
  if(pf){const s=new Set(parcels.map(p=>p.upi));plots=plots.filter(q=>q.links.some(l=>s.has(l.upi)));}
  if(qf){const s=new Set(plots.map(q=>q.id));parcels=parcels.filter(p=>p.links.some(l=>s.has(l.plot)));}
  return {parcels,plots,active:!!(pf||qf)};
};

LR.kpis = function(D,parcels,plots,active){
  const O=D.official&&!active?D.official.kpis:null, ha=m=>m/1e4;
  const exA=parcels.reduce((s,p)=>s+p.area,0), con=parcels.reduce((s,p)=>s+p.contrib,0), out=parcels.reduce((s,p)=>s+p.output,0);
  const layA=plots.reduce((s,q)=>s+q.area,0), road=plots.filter(q=>q.cat==='Road').reduce((s,q)=>s+q.area,0);
  const nNew=plots.filter(q=>q.cat!=='Road').length, owners=new Set(parcels.map(p=>p.owner)).size;
  return {
    totalHa: O?O.layout_area_ha:ha(layA), existingHa: O?O.existing_area_ha:ha(exA),
    parcels: O?O.existing_parcels:parcels.length, newPlots: O?O.new_plots_excl_roads:nNew,
    conHa: O?O.contribution_ha:ha(con), conPct: O?O.contribution_pct:(exA?con/exA*100:0),
    roadHa: O?O.road_reserve_ha:ha(road), roadPct: O?O.road_reserve_pct_of_layout:(layA?road/layA*100:0),
    outHa: O?O.output_ha:ha(out), owners: O?O.unique_owner_records:owners
  };
};

/* ---------- analytics ---------- */
LR.analytics = function(D,parcels,plots,active){
  const O=D.official&&!active?D.official:null, A=O?O.analytics:null, L=O?O.lineage:null;
  const bp=plots.filter(q=>q.cat==='Plot');
  const zones=D.zoneCodes.map(z=>{const qs=plots.filter(q=>q.zone===z);const a=qs.reduce((s,q)=>s+q.area,0);return{z,plots:qs.length,m2:a};});
  const layA=zones.reduce((s,z)=>s+z.m2,0); zones.forEach(z=>z.pct=layA?z.m2/layA*100:0);
  if(O){ zones.forEach(z=>{const o=O.zones.find(x=>x.zone_code===z.z); if(o){z.plots=o.plots;z.m2=o.area_m2;z.pct=o.area_pct;}}); }
  const exA=parcels.reduce((s,p)=>s+p.area,0), con=parcels.reduce((s,p)=>s+p.contrib,0);
  const roadOn=parcels.reduce((s,p)=>s+p.toRoad,0), pubOn=parcels.reduce((s,p)=>s+p.toPub,0);
  const losses=parcels.map(p=>p.loss).sort((a,b)=>a-b), med=a=>a.length?(a.length%2?a[(a.length-1)/2]:(a[a.length/2-1]+a[a.length/2])/2):0;
  const lossHist=Array.from({length:10},(_,i)=>({lo:i*10,hi:i*10+10,n:0})); parcels.forEach(p=>{lossHist[Math.min(9,Math.floor(p.loss/10))].n++;});
  const nplotHist=Array.from({length:11},(_,i)=>({k:i===10?'10+':String(i),n:0})); parcels.forEach(p=>{nplotHist[Math.min(10,p.nNew)].n++;});
  const bins=[['<100',0,100],['100–300',100,300],['300–500',300,500],['500–1000',500,1000],['1000–2000',1000,2000],['>2000',2000,1e12]];
  const binOf=(arr)=>bins.map(b=>arr.filter(v=>v>=b[1]&&v<b[2]).length);
  let before=binOf(parcels.map(p=>p.area)), after=binOf(parcels.map(p=>p.output));
  if(A){before=Object.values(A.existing_size_bins_m2);after=Object.values(A.output_size_bins_m2);}
  const srcBins=[1,2,3,4].map(k=>bp.filter(q=>q.nsrcBin===k).length);
  const lin = L?{from1:L.from_1_upi,from2:L.from_2_upis,from3:L.from_3_upis,from4:L.from_4plus_upis,outside:L.plots_partly_outside_old_parcels,withPlots:L.old_parcels_with_new_plots,onlyInfra:L.old_parcels_entirely_road_or_public,bp:L.building_plots,medPer:L.new_plots_per_old_parcel_median,maxPer:L.new_plots_per_old_parcel_max}
    :{from1:srcBins[0],from2:srcBins[1],from3:srcBins[2],from4:srcBins[3],outside:bp.filter(q=>q.partlyOutside).length,withPlots:parcels.filter(p=>p.nNew>0).length,onlyInfra:parcels.filter(p=>p.nNew===0&&!p.noGeom).length,bp:bp.length,medPer:med(parcels.map(p=>p.nNew).sort((a,b)=>a-b)),maxPer:Math.max(0,...parcels.map(p=>p.nNew))};
  const byV=D.villageNames.map(v=>{const ps=parcels.filter(p=>p.village===v);return{v,parcels:ps.length,m2:ps.reduce((s,p)=>s+p.area,0),con:ps.reduce((s,p)=>s+p.contrib,0),over50:ps.filter(p=>p.loss>50).length,mort:ps.filter(p=>p.mort).length,restr:ps.filter(p=>p.restr).length,prov:ps.filter(p=>p.prov).length};}).filter(x=>x.parcels);
  const medZone={};D.zoneCodes.forEach(z=>{const a=plots.filter(q=>q.zone===z&&q.cat==='Plot').map(q=>q.area).sort((x,y)=>x-y);if(a.length)medZone[z]=med(a);}); if(A)Object.assign(medZone,A.median_new_plot_m2_by_zone);
  // land-use change matrix
  let luMatrix;
  if(A) luMatrix=A.existing_land_use_to_dominant_new_zone;
  else {luMatrix={};parcels.forEach(p=>{if(!p.landUse||!p.links.length)return;const by={};p.links.forEach(l=>by[l.zone]=(by[l.zone]||0)+l.m2);const dz=Object.keys(by).sort((a,b)=>by[b]-by[a])[0];(luMatrix[p.landUse]=luMatrix[p.landUse]||{});luMatrix[p.landUse][dz]=(luMatrix[p.landUse][dz]||0)+1;});}
  return {
    zones, conHa:O?O.kpis.contribution_ha:con/1e4, conPct:O?O.kpis.contribution_pct:(exA?con/exA*100:0),
    existingHa:O?O.kpis.existing_area_ha:exA/1e4, outHa:O?O.kpis.output_ha:parcels.reduce((s,p)=>s+p.output,0)/1e4,
    roadHa:O?O.kpis.road_reserve_ha:zones.filter(z=>z.z==='T1').reduce((s,z)=>s+z.m2,0)/1e4, roadPct:O?O.kpis.road_reserve_pct_of_layout:(zones.find(z=>z.z==='T1')||{pct:0}).pct,
    roadOnHa:A?A.road_inside_parcels_ha:roadOn/1e4, pubOnHa:A?A.public_space_inside_parcels_ha:pubOn/1e4,
    outsideHa:A?A.layout_outside_parcels_ha:Math.max(0,(layA-parcels.reduce((s,p)=>s+p.toNew+p.toRoad+p.toPub,0))/1e4),
    lossMed:A?A.physical_loss_pct_median:med(losses), lossMean:A?A.physical_loss_pct_mean:(losses.reduce((s,v)=>s+v,0)/(losses.length||1)),
    over18:A?A.parcels_physical_loss_over_18pct:parcels.filter(p=>p.loss>18).length, over50:A?A.parcels_physical_loss_over_50pct:parcels.filter(p=>p.loss>50).length,
    under300:A?A.landholders_output_under_300m2:parcels.filter(p=>p.output<300).length, under100:A?A.landholders_output_under_100m2:parcels.filter(p=>p.output<100).length,
    multiOwners:A?A.owners_with_multiple_parcels:(()=>{const c={};parcels.forEach(p=>c[p.owner]=(c[p.owner]||0)+1);return Object.values(c).filter(n=>n>1).length;})(),
    mort:A?A.mortgaged:parcels.filter(p=>p.mort).length, restr:A?A.restricted:parcels.filter(p=>p.restr).length, prov:A?A.provisional:parcels.filter(p=>p.prov).length,
    lossHist, nplotHist, before, after, binLabels:bins.map(b=>b[0]), lin, byV, medZone, luMatrix, roadKm:A?O.kpis.road_length_km_est:null, roadKmHa:A?A.road_density_km_per_ha:null, layoutHa:O?O.kpis.layout_area_ha:layA/1e4,
    outputs:parcels.map(p=>p.output)
  };
};

/* ---------- SVG mini-map helper (data-driven paths) ---------- */
LR.svg = function(layers, bb, W, H, pad=8){
  const k=Math.cos(((bb[1]+bb[3])/2)*Math.PI/180);
  const sx=(W-2*pad)/((bb[2]-bb[0])*k||1e-9), sy=(H-2*pad)/((bb[3]-bb[1])||1e-9), s=Math.min(sx,sy);
  const ox=pad+((W-2*pad)-(bb[2]-bb[0])*k*s)/2, oy=pad+((H-2*pad)-(bb[3]-bb[1])*s)/2;
  const P=([x,y])=>((x-bb[0])*k*s+ox).toFixed(1)+','+((bb[3]-y)*s+oy).toFixed(1);
  return layers.map(L=>({d:L.polys.map(p=>p.map(r=>'M'+r.map(P).join('L')+'Z').join('')).join(''),fill:L.fill||'none',stroke:L.stroke||'none',sw:L.sw||1,op:L.op==null?1:L.op,dash:L.dash||''}));
};
/* ---------- SVG chart renderer (mounted with <x-import component-from-global-scope="LRSvg">) ---------- */
function cssObj(s){const o={};String(s||'').split(';').forEach(d=>{const i=d.indexOf(':');if(i>0)o[d.slice(0,i).trim().replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=d.slice(i+1).trim();});return o;}
window.LRSvg=function(p){const R=window.React,h=R.createElement,kids=[];
  // paths with the same style are merged (keeps paint order of first appearance; 'group' merges globally for non-overlapping maps)
  const G=[],idx={};(p.paths||[]).forEach(q=>{if(!q||!q.d)return;const k=[q.fill,q.stroke,q.sw,q.op,q.dash].join('|');const last=G[G.length-1];
    if(p.group&&idx[k]!=null)G[idx[k]].d+=q.d;else if(!p.group&&last&&last.k===k)last.d+=q.d;else{idx[k]=G.length;G.push({k,d:q.d,q});}});
  G.forEach((g,i)=>kids.push(h('path',{key:'p'+i,d:g.d,fill:g.q.fill,stroke:g.q.stroke,strokeWidth:g.q.sw,fillOpacity:g.q.op,strokeDasharray:g.q.dash||undefined})));
  const s=p.strip;if(s){if(isFinite(s.bx)&&isFinite(s.bw))kids.push(h('rect',{key:'band',x:s.bx,y:10,width:s.bw,height:110,fill:'#FDFAEB',stroke:'#E5BE01',strokeDasharray:'3 2'}));
    const dc={},r=2.6;(s.dots||[]).forEach(d=>{const x=+d.x,y=+d.y;dc[d.c]=(dc[d.c]||'')+'M'+(x-r).toFixed(1)+','+y+'a'+r+','+r+' 0 1,0 '+(2*r)+',0a'+r+','+r+' 0 1,0 '+(-2*r)+',0';});
    Object.keys(dc).forEach(k=>kids.push(h('path',{key:'d'+k,d:dc[k],fill:k,fillOpacity:0.75})));
    kids.push(h('line',{key:'ax',x1:0,x2:560,y1:124,y2:124,stroke:'#E4E7EC'}));
    (s.ticks||[]).forEach((k,i)=>kids.push(h('text',{key:'t'+i,x:k.x,y:142,fontSize:12,fill:'#667085',textAnchor:'middle'},k.l)));}
  return h('svg',{viewBox:p.vb,style:cssObj(p.css)},kids);};
})();
