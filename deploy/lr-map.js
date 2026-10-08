/* Land Readjustment Platform — MapLibre wrapper */
(function(){
const LR = window.LR = window.LR || {};
/* Basemaps: swap in NLA's own orthophoto or tile service here (XYZ raster tiles). Keys are used by the Layers panel. */
LR.BASEMAPS = {
  streets:{label:'Streets', tiles:['https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'], tileSize:256, maxzoom:16, attribution:'Basemap © Esri, HERE, Garmin, © OpenStreetMap contributors'},
  sat:{label:'Satellite', tiles:['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'], tileSize:256, maxzoom:19, attribution:'Imagery © Esri'}
};
/* Find my land framing: old parcel ≈ widthShare of the map width, at most maxHeightShare of the free height, never closer than minSpanM across. */
LR.FOCUS = {widthShare:0.45, maxHeightShare:0.85, minSpanM:50, maxZoom:20.5};
const BLUE900='#004059', BLUE300='#73CBED';
function hatchImg(color, bg){
  const n=8,c=document.createElement('canvas');c.width=c.height=n;const x=c.getContext('2d');
  if(bg){x.fillStyle=bg;x.fillRect(0,0,n,n);} x.strokeStyle=color;x.lineWidth=1.4;x.beginPath();
  x.moveTo(0,n);x.lineTo(n,0);x.moveTo(-2,2);x.lineTo(2,-2);x.moveTo(n-2,n+2);x.lineTo(n+2,n-2);x.stroke();
  return x.getImageData(0,0,n,n);
}
function style(){const B=LR.BASEMAPS,src=k=>({type:'raster',tiles:B[k].tiles,tileSize:B[k].tileSize||256,maxzoom:B[k].maxzoom||19,attribution:B[k].attribution||''});return{version:8,sources:{
  sat:src('sat'),streets:src('streets')},
  layers:[{id:'bg',type:'background',paint:{'background-color':'#EEF1F4'}},{id:'streets',type:'raster',source:'streets',paint:{'raster-opacity':1,'raster-opacity-transition':{duration:600}}},{id:'sat',type:'raster',source:'sat',layout:{visibility:'none'},paint:{'raster-opacity':1}}]};}

class LRMap{
  constructor(el,o={}){
    this.el=el;this.o=o;this.h={};this.markers=[];this.D=null;this.vis={};this.op={layout:0.85,parcels:1,roads:0.9,overlay:0.85};
    this.colorBy='zc';this.sets={plots:null,parcels:null};this.focus=null;this.overlay=null;this.lines=true;this.measuring=false;this.mpts=[];
    this.map=new maplibregl.Map({container:el,style:style(),center:o.center||[29.9,-1.95],zoom:o.zoom||7.4,attributionControl:{compact:true},interactive:o.interactive!==false,preserveDrawingBuffer:true,fadeDuration:150,dragRotate:false,pitchWithRotate:false});
    this.map.on('error',e=>console.warn('map: '+((e&&e.error&&(e.error.message||String(e.error)))||String(e))));this.ready=new Promise(r=>this.map.on('load',()=>{const m=this.map;
      m.addImage('hatch',hatchImg('rgba(16,24,40,0.55)'));m.addImage('hatch-grey',hatchImg('rgba(52,64,84,0.75)','rgba(176,183,190,0.55)'));
      m.on('click',e=>this._click(e));m.on('mousemove',e=>this._move(e));m.on('movestart',()=>this.emit('movestart'));r();}));
    this._ro=new ResizeObserver(()=>this.map.resize());this._ro.observe(el);
  }
  on(n,f){(this.h[n]=this.h[n]||[]).push(f);return this;} emit(n,a){(this.h[n]||[]).forEach(f=>f(a));}
  destroy(){try{this._ro.disconnect();this.clearMarkers();if(this.cmp)this.cmp.destroy();this.map.remove();}catch(e){}}
  setBasemap(b){const m=this.map;m.setLayoutProperty('streets','visibility',b==='streets'?'visible':'none');m.setLayoutProperty('sat','visibility',b==='sat'?'visible':'none');this.basemap=b;}
  _src(id,data){const m=this.map;if(m.getSource(id))m.getSource(id).setData(data);else m.addSource(id,{type:'geojson',data});}
  _lay(def){if(!this.map.getLayer(def.id))this.map.addLayer(def);}
  setSite(D){
    const m=this.map;this.D=D;this.clearFocus(true);
    this._src('boundary',D.fc.boundary);this._src('parcels',D.fc.parcels);this._src('plots',D.fc.plots);this._src('links',D.fc.links);this._src('villages',D.fc.villages);this._src('resurvey-src',D.fc.rs||{type:'FeatureCollection',features:[]});
    this._src('lines',{type:'FeatureCollection',features:[]});this._src('measure',{type:'FeatureCollection',features:[]});
    const none={visibility:'none'};
    this._lay({id:'villages-fill',type:'fill',source:'villages',layout:none,paint:{'fill-color':'#00A1DE','fill-opacity':0.06}});
    this._lay({id:'villages-line',type:'line',source:'villages',layout:none,paint:{'line-color':'#73CBED','line-width':2.5,'line-dasharray':[3,2]}});
    this._lay({id:'overlay-fill',type:'fill',source:'parcels',layout:none,paint:{'fill-color':'#00A1DE','fill-opacity':0.85}});
    this._lay({id:'plots-fill',type:'fill',source:'plots',filter:['!=',['get','cat'],'Road'],paint:{'fill-color':['get','zc'],'fill-opacity':0.85,'fill-opacity-transition':{duration:500}}});
    this._lay({id:'roads-fill',type:'fill',source:'plots',filter:['==',['get','cat'],'Road'],paint:{'fill-color':'#B0B7BE','fill-opacity':0.9,'fill-opacity-transition':{duration:500}}});
    this._lay({id:'plots-line',type:'line',source:'plots',paint:{'line-color':'#FFFFFF','line-width':['interpolate',['linear'],['zoom'],15,0.3,18,1],'line-opacity':0.9}});
    this._lay({id:'rel-hatch',type:'fill',source:'plots',filter:['==','id','__'],paint:{'fill-pattern':'hatch','fill-opacity':0.9}});
    this._lay({id:'pieces-fill',type:'fill',source:'links',filter:['==','upi','__'],paint:{'fill-color':['get','zc'],'fill-opacity':1}});
    this._lay({id:'pieces-road',type:'fill',source:'links',filter:['==','upi','__'],paint:{'fill-pattern':'hatch-grey'}});
    this._lay({id:'pieces-line',type:'line',source:'links',filter:['==','upi','__'],paint:{'line-color':'#101828','line-width':0.8,'line-opacity':0.7}});
    this._lay({id:'parcels-hit',type:'fill',source:'parcels',paint:{'fill-color':'#000','fill-opacity':0}});
    this._lay({id:'parcels-line',type:'line',source:'parcels',paint:{'line-color':BLUE900,'line-width':['interpolate',['linear'],['zoom'],14,0.5,18,1.4],'line-opacity':1,'line-opacity-transition':{duration:500}}});
    this._lay({id:'rs-line',type:'line',source:'resurvey-src',layout:none,filter:['==',['get','flag'],0],paint:{'line-color':'#20603D','line-width':['interpolate',['linear'],['zoom'],14,0.8,18,2],'line-dasharray':[3,1.5]}});
    this._lay({id:'rs-flag',type:'line',source:'resurvey-src',filter:['==',['get','flag'],1],layout:none,paint:{'line-color':'#B42318','line-width':['interpolate',['linear'],['zoom'],14,1.4,18,3]}});
    this._lay({id:'overlay-line',type:'line',source:'parcels',layout:none,filter:['>',['get','loss'],50],paint:{'line-color':'#B42318','line-width':1.6}});
    this._lay({id:'boundary-line',type:'line',source:'boundary',paint:{'line-color':'#101828','line-width':2.5,'line-dasharray':[4,2]}});
    this._lay({id:'src-parcels',type:'line',source:'parcels',filter:['==','id','__'],paint:{'line-color':BLUE900,'line-width':2.5}});
    this._lay({id:'focus-halo',type:'line',source:'parcels',filter:['==','id','__'],paint:{'line-color':BLUE300,'line-width':9,'line-opacity':0.8}});
    this._lay({id:'focus-parcel',type:'line',source:'parcels',filter:['==','id','__'],paint:{'line-color':BLUE900,'line-width':4}});
    this._lay({id:'focus-plot-halo',type:'line',source:'plots',filter:['==','id','__'],paint:{'line-color':BLUE300,'line-width':7}});
    this._lay({id:'focus-plot',type:'line',source:'plots',filter:['==','id','__'],paint:{'line-color':'#101828','line-width':2.5}});
    this._lay({id:'hover-line',type:'line',source:'plots',filter:['==','id','__'],paint:{'line-color':'#101828','line-width':1.5}});
    this._lay({id:'lines',type:'line',source:'lines',paint:{'line-color':BLUE900,'line-width':1.4,'line-dasharray':[2,1.5]}});
    this._lay({id:'lines-pt',type:'circle',source:'lines',filter:['==',['geometry-type'],'Point'],paint:{'circle-radius':3.5,'circle-color':'#fff','circle-stroke-color':BLUE900,'circle-stroke-width':1.5}});
    this._lay({id:'measure',type:'line',source:'measure',paint:{'line-color':'#E5BE01','line-width':3}});
    this._lay({id:'measure-pt',type:'circle',source:'measure',filter:['==',['geometry-type'],'Point'],paint:{'circle-radius':4,'circle-color':'#101828','circle-stroke-color':'#E5BE01','circle-stroke-width':2}});
    this.applyAll();
  }
  fit(bb,o={}){const p=o.padding||40;this.map.fitBounds([[bb[0],bb[1]],[bb[2],bb[3]]],{padding:p,duration:o.duration??1200,maxZoom:o.maxZoom||19.5,essential:true,...(o.fly?{linear:false}:{})});}
  fitSite(o){if(this.D)this.fit(this.D.bb,o);}
  setLayers(vis,op){this.vis=Object.assign(this.vis,vis||{});if(op)this.op=Object.assign(this.op,op);this.applyAll();}
  setColorBy(k){this.colorBy={zone:'zc',nsrc:'nc',link:'lc'}[k]||k;this.applyAll();}
  setSets(plots,parcels){this.sets={plots:plots?[...plots]:null,parcels:parcels?[...parcels]:null};this.applyAll();}
  setOverlay(k){this.overlay=k;this.applyAll();}
  setLines(b){this.lines=b;if(this.focus)this._drawLines();}
  applyAll(){
    const m=this.map;if(!this.D||!m.getLayer('plots-fill'))return;const v=this.vis,F=this.focus;
    const vis=(id,b)=>m.getLayer(id)&&m.setLayoutProperty(id,'visibility',b?'visible':'none');
    if(v.basemap)this.setBasemap(v.basemap);
    vis('boundary-line',v.boundary!==false);vis('parcels-line',v.parcels!==false);vis('plots-fill',v.layout!==false);vis('plots-line',v.layout!==false||v.roads!==false);vis('roads-fill',v.roads!==false);
    vis('villages-fill',!!v.villages);vis('villages-line',!!v.villages);vis('rs-line',!!v.resurvey);vis('rs-flag',!!v.resurvey);
    const inSet=(k,arr)=>['in',['get','id'],['literal',arr]];
    const pf=this.sets.plots?inSet('id',this.sets.plots):true, parf=this.sets.parcels?inSet('id',this.sets.parcels):true;
    const zf=this.zoneShow?['in',['get','zone'],['literal',this.zoneShow]]:true;
    m.setFilter('plots-fill',['all',['!=',['get','cat'],'Road'],pf,zf]);m.setFilter('roads-fill',['all',['==',['get','cat'],'Road'],pf,zf]);m.setFilter('plots-line',['all',pf,zf]);
    m.setFilter('parcels-line',parf);m.setFilter('parcels-hit',parf);
    m.setPaintProperty('plots-fill','fill-color',['get',this.colorBy]);
    let rel=null;if(F)rel=F.rel;
    const dimExp=(base)=>rel?['case',['in',['get','id'],['literal',rel]],F.type==='parcel'?0.32:0.25,0.08]:(this.hl?['case',['in',['get','zone'],['literal',this.hl]],base,0.12]:base);
    m.setPaintProperty('plots-fill','fill-opacity',dimExp(this.op.layout));m.setPaintProperty('roads-fill','fill-opacity',dimExp(this.op.roads));
    m.setPaintProperty('parcels-line','line-opacity',F?0.25:this.op.parcels);
    // overlay
    const ov=this.overlay;vis('overlay-fill',!!ov);vis('overlay-line',ov==='loss');
    if(ov){const c={
      loss:['step',['get','loss'],'#EBF7FC',5,'#73CBED',18,'#00A1DE',30,'#006990',50,'#004059'],
      nplots:['step',['get','nnew'],'#F2F4F7',1,'#CCECF8',2,'#73CBED',4,'#00A1DE',7,'#004059'],
      enc:['match',['get','enc'],1,'#E5BE01',2,'#B42318',3,'#00A1DE','rgba(0,0,0,0)'],
      rsdiff:['step',['get','rsd'],'#D0D5DD',-998,'#E5BE01',-10,'#FFF2B3',-2,'#FFFFFF',2,'#73CBED',10,'#006990'],
      contrib:['step',['get','contrib'],'#EBF7FC',50,'#CCECF8',100,'#73CBED',250,'#00A1DE',500,'#006990',1000,'#004059']}[ov];
      m.setPaintProperty('overlay-fill','fill-color',c);m.setPaintProperty('overlay-fill','fill-opacity',this.op.overlay);m.setFilter('overlay-fill',parf);}
  }
  showZones(list){this.zoneShow=list;this.applyAll();}
  highlightZones(list){this.hl=list;this.applyAll();}
  clearMarkers(){this.markers.forEach(x=>x.remove());this.markers=[];}
  marker(ll,html,o={}){const d=document.createElement('div');d.innerHTML=html;const el=d.firstElementChild;if(o.onClick){el.style.cursor='pointer';el.addEventListener('click',ev=>{ev.stopPropagation();o.onClick();});}
    const mk=new maplibregl.Marker({element:el,anchor:o.anchor||'center'}).setLngLat(ll).addTo(this.map);this.markers.push(mk);return mk;}
  label(ll,t1,t2,accent){return this.marker(ll,'<div style="pointer-events:none;background:#fff;border:1px solid #D0D5DD;border-radius:4px;padding:2px 6px;font:600 12px/15px Inter,sans-serif;color:#101828;box-shadow:0 1px 2px rgba(16,24,40,.12);white-space:nowrap;text-align:center;'+(accent?'border-left:3px solid '+accent+';':'')+'">'+t1+(t2?'<div style="font-weight:400;color:#475467;font-variant-numeric:tabular-nums">'+t2+'</div>':'')+'</div>');}
  fitParcel(bb,o={}){
    const m=this.map,el=m.getContainer(),W=el.clientWidth,H=el.clientHeight,F=LR.FOCUS;
    let pad=o.padding==null?60:o.padding;if(typeof pad==='number')pad={top:pad,bottom:pad,left:pad,right:pad};
    if(!W||!H){this.fit(bb,{padding:pad,duration:o.duration});return;}
    const lat=(bb[1]+bb[3])/2,k=Math.cos(lat*Math.PI/180),wm=Math.max((bb[2]-bb[0])*111320*k,1),hm=Math.max((bb[3]-bb[1])*110574,1);
    const ah=Math.max(H-pad.top-pad.bottom,H*0.4);
    let mpp=Math.max(wm/(F.widthShare*W),hm/(F.maxHeightShare*ah),F.minSpanM/W);
    const z=Math.min(F.maxZoom,Math.log2(40075016.686*k/(512*mpp)));mpp=40075016.686*k/(512*Math.pow(2,z));
    const dx=(pad.left-pad.right)/2,dy=(pad.top-pad.bottom)/2;
    const c=[(bb[0]+bb[2])/2-dx*mpp/(111320*k),(bb[1]+bb[3])/2+dy*mpp/110574];
    m.easeTo({center:c,zoom:z,duration:o.duration??1200,essential:true});
  }
  focusParcel(upi,o={}){
    const D=this.D,p=D&&D.byUpi[upi];if(!p)return;const m=this.map;this.clearFocus(true);
    if(!p.polys.length){this.applyAll();if(o.fit!==false)this.fitSite({duration:o.duration??1200});return;}
    const rel=[...new Set(p.links.map(l=>l.plot))];this.focus={type:'parcel',id:upi,rel};
    m.setFilter('rel-hatch',['all',['in',['get','id'],['literal',rel]],['!=',['get','cat'],'Road']]);
    m.setFilter('pieces-fill',['all',['==',['get','upi'],upi],['==',['get','cat'],'Plot']]);
    m.setFilter('pieces-road',['all',['==',['get','upi'],upi],['!=',['get','cat'],'Plot']]);
    m.setFilter('pieces-line',['==',['get','upi'],upi]);
    m.setFilter('focus-halo',['==',['get','id'],upi]);m.setFilter('focus-parcel',['==',['get','id'],upi]);
    if(o.labels!==false)p.links.filter(l=>l.cat==='Plot').forEach(l=>this.label(l.c,l.plot,LR.fmt(l.m2)+' m²'));
    this.applyAll();this._drawLines();
    if(o.fit!==false)this.fitParcel(p.bb,{padding:o.padding||60,duration:o.duration??1400});
  }
  focusPlot(id,o={}){
    const D=this.D,q=D&&D.byPlot[id];if(!q)return;const m=this.map;this.clearFocus(true);if(!q.bb){this.applyAll();if(o.fit!==false)this.fitSite();return;}
    const big=u=>{const p=D.byUpi[u];return !!(p&&p.area>5*q.area);};
    const upis=q.links.map(l=>l.upi);this.focus={type:'plot',id,rel:[id],upis};
    const col=['match',['get','upi']];q.links.forEach((l,i)=>col.push(l.upi,LR.SRC_PAL[i%LR.SRC_PAL.length]));col.push('#ccc');
    m.setFilter('pieces-fill',['==',['get','plot'],id]);m.setPaintProperty('pieces-fill','fill-color',col);m.setFilter('pieces-line',['==',['get','plot'],id]);
    m.setFilter('src-parcels',['in',['get','id'],['literal',upis]]);
    m.setFilter('focus-plot-halo',['==',['get','id'],id]);m.setFilter('focus-plot',['==',['get','id'],id]);
    if(o.labels!==false)q.links.forEach((l,i)=>{const p=D.byUpi[l.upi];if(p&&p.c&&i<8)this.label(big(l.upi)?l.c:p.c,l.upi.split('/').slice(-1)[0]==l.upi?l.upi:'…/'+l.upi.split('/').slice(-2).join('/'),LR.fmt(l.m2)+' m² · '+LR.fmt(l.pctPlot,0)+'%',LR.SRC_PAL[i%LR.SRC_PAL.length]);});
    this.applyAll();this._drawLines();
    const qw=q.bb[2]-q.bb[0],qh=q.bb[3]-q.bb[1],win=[q.bb[0]-qw,q.bb[1]-qh,q.bb[2]+qw,q.bb[3]+qh];
    const clip=b=>[Math.max(b[0],win[0]),Math.max(b[1],win[1]),Math.min(b[2],win[2]),Math.min(b[3],win[3])];
    const bb=LR.bboxUnion([q.bb,...upis.map(u=>{const p=D.byUpi[u];return p&&p.bb?(big(u)?clip(p.bb):p.bb):null;}).filter(Boolean)]);
    if(o.fit!==false)this.fit(bb,{padding:o.padding||70,duration:o.duration??1400});
  }
  _drawLines(){
    const D=this.D,F=this.focus,src=this.map.getSource('lines');if(!src)return;const fs=[];
    if(F&&this.lines){
      if(F.type==='parcel'){const p=D.byUpi[F.id];p.links.filter(l=>l.cat==='Plot').forEach(l=>{const q=D.byPlot[l.plot];if(q&&q.c){fs.push({type:'Feature',geometry:{type:'LineString',coordinates:[p.c,q.c]},properties:{}});fs.push({type:'Feature',geometry:{type:'Point',coordinates:q.c},properties:{}});}});}
      else {const q=D.byPlot[F.id];F.upis.forEach(u=>{const p=D.byUpi[u];if(p){fs.push({type:'Feature',geometry:{type:'LineString',coordinates:[q.c,p.c]},properties:{}});fs.push({type:'Feature',geometry:{type:'Point',coordinates:p.c},properties:{}});}});}
    }
    src.setData({type:'FeatureCollection',features:fs});
  }
  clearFocus(silent){
    const m=this.map;this.focus=null;this.clearMarkers();if(!m.getLayer('rel-hatch'))return;
    ['rel-hatch','pieces-fill','pieces-road','pieces-line','focus-halo','focus-parcel','src-parcels','focus-plot-halo','focus-plot'].forEach(l=>m.setFilter(l,['==',['get','id'],'__']));
    m.setPaintProperty('pieces-fill','fill-color',['get','zc']);this._drawLines();if(!silent)this.applyAll();
  }
  hover(id){if(this.map.getLayer('hover-line'))this.map.setFilter('hover-line',['==',['get','id'],id||'__']);}
  _click(e){
    if(this.measuring){this.mpts.push([e.lngLat.lng,e.lngLat.lat]);this._drawMeasure();return;}
    const m=this.map;if(!m.getLayer('plots-fill'))return;
    const ls=['plots-fill','roads-fill','parcels-hit'].filter(l=>m.getLayoutProperty(l,'visibility')!=='none');
    const fs=m.queryRenderedFeatures(e.point,{layers:ls});
    const plot=fs.find(f=>f.layer.id!=='parcels-hit'),parcel=fs.find(f=>f.layer.id==='parcels-hit');
    this.emit('click',{plot:plot&&plot.properties.id,parcel:parcel&&parcel.properties.id,x:e.point.x,y:e.point.y});
  }
  _move(e){const m=this.map;if(!m.getLayer('plots-fill'))return;const fs=m.queryRenderedFeatures(e.point,{layers:['plots-fill','roads-fill','parcels-hit']});m.getCanvas().style.cursor=this.measuring?'crosshair':(fs.length?'pointer':'');}
  setMeasure(b){this.measuring=b;this.mpts=[];this._drawMeasure();}
  _drawMeasure(){const s=this.map.getSource('measure');if(!s)return;const pts=this.mpts,fs=pts.map(p=>({type:'Feature',geometry:{type:'Point',coordinates:p},properties:{}}));
    if(pts.length>1)fs.push({type:'Feature',geometry:{type:'LineString',coordinates:pts},properties:{}});s.setData({type:'FeatureCollection',features:fs});
    let d=0;for(let i=1;i<pts.length;i++){const [a,b]=[pts[i-1],pts[i]];const k=Math.cos(a[1]*Math.PI/180);d+=Math.hypot((b[0]-a[0])*111320*k,(b[1]-a[1])*110574);}this.emit('measure',{d,n:pts.length});}
  /* compare map (before = existing parcels) */
  attachCompare(el){
    if(this.cmp){this.cmp.destroy();this.cmp=null;} if(!el)return;
    const c=new LRMap(el,{center:this.map.getCenter(),zoom:this.map.getZoom()});this.cmp=c;
    c.ready.then(()=>{c.setSite(this.D);c.setLayers({basemap:this.basemap||'streets',layout:false,roads:false,boundary:true,parcels:true});c.map.setPaintProperty('parcels-line','line-width',1.4);
      c.setOverlay(null);c.map.setPaintProperty('parcels-hit','fill-color','#EBF7FC');c.map.setPaintProperty('parcels-hit','fill-opacity',0.45);
      c.map.jumpTo({center:this.map.getCenter(),zoom:this.map.getZoom()});});
    let lock=false;const sync=(a,b)=>()=>{if(lock)return;lock=true;b.jumpTo({center:a.getCenter(),zoom:a.getZoom(),bearing:a.getBearing()});lock=false;};
    this._s1=sync(this.map,c.map);this._s2=sync(c.map,this.map);this.map.on('move',this._s1);c.map.on('move',this._s2);
  }
  detachCompare(){if(this.cmp){this.map.off('move',this._s1);this.cmp.destroy();this.cmp=null;}}
}
LR.Map=LRMap;
})();
