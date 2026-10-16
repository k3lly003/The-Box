const h=(...a)=>React.createElement(...a);
const q=v=>Math.round(v*100)/100;
/* ---------- icon primitives (24px grid, 1.5px stroke) ---------- */
const pp=(d,m)=>({t:'p',d,m});
const cc=(cx,cy,r,m)=>({t:'c',cx,cy,r,m});
function lf(x1,y1,x2,y2,w,m){const mx=(x1+x2)/2,my=(y1+y2)/2,dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy)||1,nx=-dy/L*w,ny=dx/L*w;return pp(`M${q(x1)} ${q(y1)}Q${q(mx+nx)} ${q(my+ny)} ${q(x2)} ${q(y2)}Q${q(mx-nx)} ${q(my-ny)} ${q(x1)} ${q(y1)}Z`,m)}
function ov(x1,y1,x2,y2,w,m){const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L,P=(t,s)=>q(x1+dx*t+nx*w*s)+' '+q(y1+dy*t+ny*w*s);return pp(`M${q(x1)} ${q(y1)}C${P(.12,1)} ${P(.62,.9)} ${q(x2)} ${q(y2)}C${P(.62,-.9)} ${P(.12,-1)} ${q(x1)} ${q(y1)}Z`,m)}
const rib=(x1,y1,x2,y2)=>pp(`M${x1} ${y1}L${q(x1+(x2-x1)*.7)} ${q(y1+(y2-y1)*.7)}`,'i');
function star(cx,cy,R1,r,n,m){let d='';for(let i=0;i<n*2;i++){const a=-Math.PI/2+i*Math.PI/n,rr=i%2?r:R1;d+=(i?'L':'M')+q(cx+rr*Math.cos(a))+' '+q(cy+rr*Math.sin(a))}return pp(d+'Z',m)}
function lobed(x1,y1,x2,y2,hw,m){const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy),nx=-dy/L,ny=dx/L,A=[],B=[];for(let i=0;i<=30;i++){const t=i/30,w=hw*Math.pow(Math.sin(Math.PI*t),.75)*(1+.2*Math.cos(Math.PI*6*t));const x=x1+dx*t,y=y1+dy*t;A.push(q(x+nx*w)+' '+q(y+ny*w));B.unshift(q(x-nx*w)+' '+q(y-ny*w))}return pp('M'+A.concat(B).join('L')+'Z',m)}
const fan=(cx,cy,L,angs,w,m)=>angs.map(a=>{const r=a*Math.PI/180;return lf(cx,cy,q(cx+L*Math.cos(r)),q(cy+L*Math.sin(r)),w,m)});
function fileI(t){return[pp('M5.5 3h8.5l4.5 4.5V21h-13Z','f'),pp('M14 3v4.5h4.5','i'),{t:'r',x:2.5,y:11.5,w:15,h:7,m:'F'},{t:'t',x:10,y:16.6,s:5.6,txt:t}]}
const GLASS='M16.5 10.5a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z';
const I={
 cInya:[pp('M12 22V7.5'),ov(12,18.5,4,13.5,3.9,'f'),rib(12,18.5,4,13.5),ov(12,14.6,19.6,10.6,3.6,'f'),rib(12,14.6,19.6,10.6),ov(12,10.8,7.6,8,2.4,'f'),lf(12,8.2,14.4,1.8,3.6,'f'),pp('M12.5 6.1l1.4-.5M13.1 4.2l1.1-.4','i')],
 cIsogo:[pp('M11 22c0-3.6.3-7 1-10.5'),ov(11.2,18.2,3.8,15.6,3.7,'f'),rib(11.2,18.2,3.8,15.6),ov(11.9,13.6,18.4,10.8,3.3,'f'),rib(11.9,13.6,18.4,10.8),pp('M11.8 11.4c-.1-1.6-.6-3-1.4-4.2'),star(10,5,2.8,1.1,5,'f'),pp('M12.2 14l3.4 3.1M12.2 14l5.9 1.3M12.2 14l4.4 5.2'),cc(16.3,17.7,1.5,'f'),cc(19.6,15.6,1.5,'f'),cc(17.4,20.4,1.5,'f')],
 cIsogi:[pp('M12 22V8.8'),pp('M12 17.6L8.2 15.6'),...fan(8.2,15.6,5,[150,183,216,249,282],1.9,'f'),pp('M12 13.8l3.4-1.1'),...fan(15.4,12.7,4.2,[-62,-22,18],1.8,'f'),...fan(12,8.8,2.6,[160,200,340,20],1.5,'f'),pp('M12 8.8c-.2-2.6.3-4.6 1.8-6.2M12 8.8c1-1.9 2.8-3.1 5.2-3.3M12 8.8c-1.2-1.7-3.1-2.6-5.4-2.5'),cc(13.8,2.6,.75,'F'),cc(17.2,5.5,.75,'F'),cc(6.6,6.3,.75,'F')],
 cIntag:[pp('M12 22V10.8'),pp('M12 20.2l-1.3-.9M12 15.4l1.3-.9M12 12.4l-1.3-.9'),lobed(12,18,2.6,12.8,3.5,'f'),rib(12,18,2.6,12.8),lobed(12,14.6,19.8,16.4,2.5,'f'),pp('M12 10.8c.7-1 1.4-1.7 2.4-2.3'),cc(13.9,5.8,1.75,'f'),cc(17.4,4.6,1.75,'f'),cc(19.1,7.9,1.75,'f'),cc(15.9,9.3,1.75,'f')],
 xCabbage:[cc(12,12.6,8.4,'f'),pp('M12 21V8.6','i'),pp('M4.6 9.4c3.3.2 6 2.6 7.4 6.4 1.4-3.8 4.1-6.2 7.4-6.4','i'),pp('M7.4 18.6c.2-3.4 1.8-6 4.6-7.8 2.8 1.8 4.4 4.4 4.6 7.8','i')],
 xTomato:[cc(12,14,7,'f'),star(12,8,3.6,1.3,5,'i'),pp('M12 7.6V3.5'),pp('M12 4.8c1.2-1.3 2.7-1.6 4.2-1.2')],
 xCarrot:[pp('M8 8.6h8l-3.4 12.6a.6.6 0 0 1-1.2 0Z','f'),pp('M9.3 11.6h2.2M12.8 14.4h1.8M10.7 17.2h1.5','i'),pp('M12 8.6V3M12 8.6C11.4 6.4 10 5 8 4.4M12 8.6c.6-2.2 2-3.6 4-4.2')],
 xOnion:[pp('M12 21c-3.9 0-6.5-2.4-6.5-6 0-3.4 2.9-5.4 5-7.4.6-.6 1-1.2 1.5-1.9.5.7.9 1.3 1.5 1.9 2.1 2 5 4 5 7.4 0 3.6-2.6 6-6.5 6Z','f'),pp('M12 5.7V2.5M12 4.4c-1-.9-2-1.3-3.1-1.3'),pp('M10.4 21l-.8 1.4M12 21v1.6M13.6 21l.8 1.4'),pp('M12 18.8c-2.1 0-3.6-1.6-3.6-3.9 0-2.4 2-4 3.6-5.6','i')],
 xBanana:[pp('M5 8.2c.3 6.8 4.9 11.3 11 11.3 2 0 3.7-.6 4.9-1.7-.5-.5-1.1-.7-1.8-.7-5.1 0-9.3-3.6-10.6-8.9Z','f'),pp('M5 8.2L4.6 5h3l.3 3.6'),pp('M8.6 11.2c1.6 3.4 4.6 5.6 8.6 6.2','i')],
 mProfile:[lf(3,18,13.5,3,6.6,'f'),pp('M3 18L10.4 7.6','i'),cc(15.5,14.5,4.2,'f'),pp('M18.6 17.6l2.9 2.9'),pp('M13.4 13.4a2.4 2.4 0 0 1 1.9-1.3','i')],
 mHealth:[cc(12,12,9,'f'),cc(12,12,6,'i'),pp('M6.5 12.5h2.2l1.4-2.8 2.2 5.2 1.5-3.4.9 1h2.8','i')],
 mYields:[pp('M4.5 10.5h15l-1.6 7H6.1Z','f'),pp('M8.6 10.5l.5 7M15.4 10.5l-.5 7M5.3 14h13.4','i'),lf(9,10.5,6.2,4.6,2.8,'f'),lf(12,10.5,12.4,3,2.8,'f'),lf(15,10.5,17.8,4.6,2.8,'f'),pp('M12 17.5v3M3 20.5h18M6 20.5V22M18 20.5V22')],
 mSuit:[pp('M2 20.5c2.2-4.6 4.6-7 7.6-7 2 0 3.4 1 4.6 2.3 1.4-1.4 2.8-2.1 4.3-2.1 1 0 2 .3 3.5 1.2v5.6Z','f'),pp('M5.2 18h5.4M7.4 15.8h3.8M14.6 18h4.6','i'),pp('M10 11.5s-3.3-3-3.3-5.5a3.3 3.3 0 0 1 6.6 0c0 2.5-3.3 5.5-3.3 5.5Z','f'),cc(10,6,1.15,'i')],
 mCost:[pp('M3 12.5h18c0 4.4-4 8-9 8s-9-3.6-9-8Z','f'),pp('M9 21.5h6'),cc(12,6,3.3,'f'),pp('M12 4.6v2.8','i'),pp('M6.5 15.5c1 1.4 2.6 2.4 4.5 2.7','i')],
 mPolicy:[pp('M5.5 3h9l4 4v14h-13Z','f'),pp('M14.5 3v4h4','i'),pp('M8.5 8h4M8.5 11h7','i'),cc(14,16.5,3.2,'i'),lf(12.6,17.9,15.4,15.1,1.9,'i')],
 mIntl:[cc(10.5,10.5,7.5,'f'),pp('M3 10.5h15M10.5 3c-2.3 2-3.4 4.5-3.4 7.5S8.2 16 10.5 18M10.5 3c2.3 2 3.4 4.5 3.4 7.5S12.8 16 10.5 18','i'),lf(5.5,21.5,21.5,12,4.6,'f'),pp('M5.5 21.5L18 14.1','i')],
 mNutri:[pp('M12 5.2V20M8.5 20.5h7M4 7h16'),cc(12,4.3,1,'F'),pp('M4.5 7v4.6M19.5 7v4.6'),lf(1.6,13.2,7.4,13.2,3.4,'f'),lf(16.6,13.2,22.4,13.2,3.4,'f'),pp('M1.6 13.2h5.8M16.6 13.2h5.8','i')],
 mGap:[pp('M2.5 11.6c1.6 0 3 .6 4 1.8l1.8 2.2h7.4l1.8-2.2c1-1.2 2.4-1.8 4-1.8-.6 5.2-4.4 9-9.5 9s-8.9-3.8-9.5-9Z','f'),pp('M12 15.6v5','i'),pp('M12 13.6c-1.7 0-2.8-1.2-2.8-2.9s1.1-3.1 2.8-3.1 2.8 1.4 2.8 3.1-1.1 2.9-2.8 2.9Z','f'),pp('M12 7.6c0-2 1.3-3.6 3.5-4 0 2-1.4 3.6-3.5 4Z','f'),pp('M12 7.6c-.4-1.4-1.4-2.3-2.8-2.5')],
 dSafety:[lf(4,20,20,4,11,'f'),pp('M12 8.2v4.8M12 15.7v.1','i')],
 dSeed:[pp('M7.6 9h8.8l2.2 10.2a1.5 1.5 0 0 1-1.5 1.8H6.9a1.5 1.5 0 0 1-1.5-1.8Z','f'),pp('M9 9L8 5.4h8L15 9'),pp('M12 18.2c-1.2 0-2-.9-2-2.1s.8-2.5 2-2.5 2 1.2 2 2.5-.8 2.1-2 2.1Z','i')],
 dKnow:[cc(9.5,7,3.2,'f'),pp('M3.5 20.5c0-3.8 2.7-6.5 6-6.5s6 2.7 6 6.5Z','f'),lf(15.5,13.5,21,6,3.8,'f'),pp('M15.5 13.5l3.9-5.3','i')],
 dCircle:[cc(12,12,6.5,'f')],dTri:[pp('M12 5l7.5 13h-15Z','f')],dSquare:[pp('M5.8 5.8h12.4v12.4H5.8Z','f')],
 uArrowL:[pp('M19 12H5M11 6l-6 6 6 6')],uArrowR:[pp('M5 12h14M13 6l6 6-6 6')],
 uChevD:[pp('M6 9l6 6 6-6')],uChevU:[pp('M6 15l6-6 6 6')],uChevR:[pp('M9 6l6 6-6 6')],uChevL:[pp('M15 6l-6 6 6 6')],
 uMenu:[pp('M4 7h16M4 12h16M4 17h16')],uClose:[pp('M6 6l12 12M18 6L6 18')],
 uSearch:[pp(GLASS,'f'),pp('M15 15l5 5')],
 uDownload:[pp('M12 4v11M7 10l5 5 5-5M5 20h14')],uUpload:[pp('M12 15V4M7 9l5-5 5 5M5 20h14')],
 uAdd:[pp('M12 5v14M5 12h14')],
 uDelete:[pp('M4 7h16M10 4h4'),pp('M6 7l1 13h10l1-13Z','f'),pp('M10 11v5.5M14 11v5.5','i')],
 uZoomIn:[pp(GLASS,'f'),pp('M15 15l5 5'),pp('M8 10.5h5M10.5 8v5','i')],uZoomOut:[pp(GLASS,'f'),pp('M15 15l5 5'),pp('M8 10.5h5','i')],
 uHome:[pp('M3.5 11L12 4l8.5 7'),pp('M6 9.5V20h12V9.5','f'),pp('M10 20v-5h4v5','i')],
 uMail:[pp('M3.5 6h17v12h-17Z','f'),pp('M4 7l8 6 8-6','i')],
 uPhone:[pp('M7 4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1Z','f'),pp('M11 18h2','i')],
 uPrint:[pp('M7 9V4h10v5'),pp('M6 17H4V9h16v8h-2','f'),pp('M7 14h10v6.5H7Z')],
 uA11y:[cc(12,4.8,1.6,'F'),pp('M5 8.6l7 1.6 7-1.6M12 10.2v4.8M8.8 21l3.2-6 3.2 6')],
 uCaptions:[pp('M3 5.5h18v13H3Z','f'),pp('M10.5 10H9a1.5 1.5 0 0 0-1.5 1.5v1A1.5 1.5 0 0 0 9 14h1.5M16.5 10H15a1.5 1.5 0 0 0-1.5 1.5v1A1.5 1.5 0 0 0 15 14h1.5','i')],
 uCsv:fileI('CSV'),uXls:fileI('XLS'),uPdf:fileI('PDF'),
 uCopy:[pp('M8.5 8.5h11v12h-11Z','f'),pp('M5 15.5V4.5a1 1 0 0 1 1-1h10')],
 uSun:[cc(12,12,4,'f'),pp('M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4')],
 uMoon:[pp('M19.5 14.6A8 8 0 1 1 9.4 4.5a6.4 6.4 0 0 0 10.1 10.1Z','f')],
 uInfo:[cc(12,12,9,'f'),pp('M12 11v5.5M12 7.8v.1','i')],
 uWarn:[pp('M12 3.8l9 15.7H3Z','f'),pp('M12 10v4.4M12 17v.1','i')],
 uCheck:[pp('M5 12.5l4.5 4.5L19 7')],
 uFilter:[pp('M4 5h16l-6.2 7.6V19l-3.6-1.8v-4.6Z','f')],
 uSort:[pp('M8 9.5l4-4 4 4M8 14.5l4 4 4-4')],
 uReset:[pp('M4.5 12a7.5 7.5 0 1 0 2.2-5.3'),pp('M4.5 4.5v3.6h3.6')],
 uGlobe:[cc(12,12,9,'f'),pp('M3 12h18M12 3c-2.6 2.4-3.9 5.4-3.9 9s1.3 6.6 3.9 9M12 3c2.6 2.4 3.9 5.4 3.9 9s-1.3 6.6-3.9 9','i')]
};
function ico(name,size,o){size=size||24;o=o||{};const els=I[name]||[];const col=o.color||'currentColor',fil=!!o.filled,inn=o.inner||'#FFFFFF';
 return h('svg',{width:size,height:size,viewBox:'0 0 24 24',fill:'none',strokeWidth:1.5*24/size,strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':o.label?undefined:true,role:o.label?'img':undefined,'aria-label':o.label,focusable:'false',style:{flex:'none',display:'block',stroke:col,overflow:'visible'}},
 els.map((e,k)=>{const st={};if(e.m==='F'){st.fill=col;st.stroke='none'}else if(fil&&e.m==='f'){st.fill=col}else if(fil&&e.m==='i'){st.stroke=inn}
  if(e.t==='p')return h('path',{key:k,d:e.d,style:st});if(e.t==='c')return h('circle',{key:k,cx:e.cx,cy:e.cy,r:e.r,style:st});if(e.t==='r')return h('rect',{key:k,x:e.x,y:e.y,width:e.w,height:e.h,rx:1,style:st});
  return h('text',{key:k,x:e.x,y:e.y,textAnchor:'middle',style:{fill:inn,stroke:'none',fontSize:e.s+'px',fontWeight:800,fontFamily:'Inter,sans-serif'}},e.txt)}))}


Object.assign(I,{
 logo:[lf(12,21,12,4,5.5,'f'),pp('M12 21V8','i'),pp('M12 15l-3-2.5M12 12l3-2.5','i')],
 mStart:[pp('M3.5 11L12 4l8.5 7'),pp('M6 9.5V20h12V9.5','f'),pp('M10 20v-5h4v5','i')],
 mLearn:[pp('M3.5 5.5c2.8-1.2 5.6-1 8.5 1 2.9-2 5.7-2.2 8.5-1v13.5c-2.8-1.2-5.6-1-8.5 1-2.9-2-5.7-2.2-8.5-1Z','f'),pp('M12 6.5v13.5','i')],
 stPub:[cc(12,12,8.5),pp('M8 12.3l2.8 2.8L16.2 9.5')],
 stVer:[pp('M16.5 10.5a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z'),pp('M15 15l5 5'),pp('M10.5 8v3M10.5 13.2v.1')],
 stDer:[pp('M17 5H7l5.5 7L7 19h10')],
 stMod:[pp('M3 9c3-3 6 3 9 0s6 3 9 0M3 15c3-3 6 3 9 0s6 3 9 0')],
 stCon:[pp('M5 7h14M5 12h14M5 17h9')],
 stNd:[pp('M4 5h16v14H4Z'),pp('M8 12h1.5M11.25 12h1.5M14.5 12h1.5')],
 shield:[pp('M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6Z','f'),pp('M8.5 12.2l2.5 2.5 4.5-5','i')]
});
const PL={bg:'#FFFFFF',card:'#FFFFFF',ink:'#000F14',mut:'#4F4F4F',line:'#BDBDBD',track:'#F4F4F4',green:'#20603D',greenBg:'#20603D',bar:'#20603D',green2:'#20603D',deep:'#143E28',leaf:'#339961',gold:'#D9A520',yel:'#F2CE4B',blue:'#2B6CB0',orange:'#B4530A',chip:'#E9F5EE'};
const PD={bg:'#0E1B14',card:'#15261D',ink:'#E7F0EA',mut:'#A9BDB1',line:'#2F4A3B',track:'#1C3326',green:'#6CCB94',greenBg:'#20603D',bar:'#4CB27A',green2:'#20603D',deep:'#0A1610',leaf:'#4CB27A',gold:'#E5BE01',yel:'#F2CE4B',blue:'#8DB8F2',orange:'#F08A4B',chip:'#1E3A2B'};
const P={...PL};
const colName=i=>{let s='';i++;while(i>0){const m=(i-1)%26;s=String.fromCharCode(65+m)+s;i=Math.floor((i-1)/26)}return s};
const isNum=v=>/^-?\d+(\.\d+)?$/.test(String(v).trim());
const fmtN=v=>{if(!isNum(v))return String(v);const s=String(v).trim(),dec=(s.split('.')[1]||'').length;return (+s).toLocaleString('en-US',{minimumFractionDigits:dec,maximumFractionDigits:dec})};
const fmtU=(v,u)=>{u=(u||'').trim();const n=fmtN(v);if(!isNum(v))return u==='%'?n+'%':n;if(u==='%')return n+'%';if(u==='US$ million')return 'US$'+n+' million';if(u==='US$ billion')return 'US$'+n+' billion';if(u==='RWF billion')return 'RWF '+n+' billion';if(!u||u==='count')return n;return n+' '+u};
const isPend=v=>{const s=String(v??'').trim();return s===''||/^pending$/i.test(s)};
const STS={pub:{t:'Published',bg:P.green,fg:'#FFFFFF',bd:P.green,ic:'stPub'},ver:{t:'Published (to verify)',bg:P.yel,fg:P.ink,bd:P.yel,ic:'stVer'},der:{t:'Derived',bg:'#FFFFFF',fg:P.deep,bd:P.deep,ic:'stDer'},mod:{t:'Model',bg:'#FFFFFF',fg:P.blue,bd:P.blue,ic:'stMod'},con:{t:'Content',bg:'#FFFFFF',fg:P.mut,bd:P.mut,ic:'stCon'},nd:{t:'No data yet',bg:'#FFFFFF',fg:P.ink,bd:P.mut,ic:'stNd'}};
const stKeyOf=s=>{s=String(s||'').trim();if(/to verify/i.test(s))return 'ver';if(/^published/i.test(s))return 'pub';if(/derived/i.test(s))return 'der';if(/model/i.test(s))return 'mod';return 'con'};
const BAND=v=>v>=80?'Excellent':v>=60?'Good':v>=40?'Fair':'Limited';
const BANDC={Excellent:P.green,Good:P.leaf,Fair:P.yel,Limited:P.orange};
const BAND_DARK={Excellent:true,Good:false,Fair:false,Limited:true};
const NICE=[1,2,2.5,5,10,20,25,50,100,200,250,500,1000];
const niceStep=mx=>{const r=mx/5;return NICE.find(n=>n>=r)||1000};
const niceMax=v=>{const s=niceStep(v);return Math.ceil(v/s)*s||s};
const TN=[["Start here","Tangirira hano"],["Crop profile","Imiterere y’igihingwa"],["Health burdens","Ibibazo by’ubuzima"],["Yields & inputs","Umusaruro n’ibikenerwa"],["Growing zones","Uturere dukwiye"],["Cost of hunger","Igiciro cy’inzara"],["National policies","Politiki z’igihugu"],["International frameworks","Amahame mpuzamahanga"],["Nutrient comparison","Gereranya intungamubiri"],["Good practices","Uburyo bwiza"],["Sources","Aho amakuru aturuka"]];
const GROUPS=[["Begin","Tangira",[0]],["Understand the need","Sobanukirwa ikibazo",[2,5]],["Know the crops","Menya ibihingwa",[1,8,3,4]],["Grow and cook","Hinga uteke",[9]],["Policy and evidence","Politiki n’ibimenyetso",[6,7,10]]];
const ORDER=GROUPS.flatMap(g=>g[2]);
const MICON=['mStart','mProfile','mHealth','mYields','mSuit','mCost','mPolicy','mIntl','mNutri','mGap','mLearn'];
const NOMETA={st:{t:'',style:{display:'none'},icon:null,def:''},hasGrade:false,grade:'',gradeT:'',gradeStyle:{},srcs:[]};
const CF={isText:false,isStrong:false,isNd:false,isMeta:false,isLink:false,isMod:false,hasSub:false,sub:'',t:'',reason:'',href:'#',mods:[],meta:NOMETA};
const SECF={grid:{listStyle:'none',margin:0,padding:0,display:'flex',flexDirection:'column',gap:12},isHead:false,isH2:false,isH3:false,isCards:false,isChart:false,isTable:false,isMap:false,isNotice:false,isNodata:false,isText:false,isSteps:false,isFacts:false,isQuiz:false,isGloss:false,isFilters:false,isPlanner:false,isFaq:false,isHome:false,isMods:false,hasAside:false,aside:'',asideT:'',hasSub:false,hasNote:false,note:'',sub:'',hasTitle:false,title:''};

const IMF={"isogi":"Cleome gynandra 1DS-II 6937.jpg","isogo":"Morelle ogomo, jardins du muséum de Toulouse 01.JPG","intagarasoryo":"Solanum torvum fruit and flower.jpg","inyabutongo":"Amaranthus (6).jpg","terraces":"A hill with terraces.jpg","farm":"Farm outside of Kigali, Rwanda.jpg","dense":"Rwanda - dense agriculture.jpg","landscape":"Rwanda landscape.jpg","gishwati":"Gishwati Farmland, Western Rwanda.jpg","beans":"Intercropping maize and beans.jpg"};
const IMG=k=>(window.__resources&&window.__resources['img-'+k])||('https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(IMF[k])+'?width=1600');
const CROPIMG={Inyabutongo:'inyabutongo',Isogo:'isogo',Isogi:'isogi',Intagarasoryo:'intagarasoryo'};
const MODIMG={1:'isogi',2:'farm',3:'isogo',4:'terraces',5:'dense',6:'landscape',7:'gishwati',8:'inyabutongo',9:'intagarasoryo',10:'beans'};
function loadAll(){if(!window.__nicktData)window.__nicktData=Promise.all([fetch((window.__resources&&window.__resources.dataset)||'data/dataset.json').then(r=>{if(!r.ok)throw new Error('dataset '+r.status);return r.json()}),fetch((window.__resources&&window.__resources.districts)||'data/rwanda-districts.geojson').then(r=>{if(!r.ok)throw new Error('boundaries '+r.status);return r.json()})]);return window.__nicktData}

class Component extends DCLogic {
  uid='k'+Math.random().toString(36).slice(2,7);
  rootRef=el=>{this.root=el};
  scRef=el=>{this.sc=el};
  h1Ref=el=>{this.h1=el};
  errRef=el=>{this.errEl=el};
  leafRef=el=>{this.leafEl=el;if(el)setTimeout(()=>this.syncLeaf(),0)};
  state={dark:(()=>{if(this.props.dark!=null)return !!this.props.dark;try{const v=localStorage.getItem('kt-dark');return v===null?true:v==='1'}catch(e){return true}})(),ready:false,err:null,w:+this.props.width||(this.props.mobile?390:1280),mod:+(this.props.module??0),lang:this.props.lang||'en',menu:!!this.props.menuOpen,tbl:{},open:{},fact:0,qsel:{},qdone:{},srcQ:'',srcG:'All',srcHi:null,plArea:'20',plPr:'3',plChk:{'1':true,'2':true,'3':true},plView:'num',plRes:null,plErr:null,plTry:false};

  applyLang(){
    const m=this.i18n,root=this.root;if(!m||!root)return;const lang=this.state.lang==='fr'?'fr':'en';document.documentElement.lang=this.state.lang;
    this.tx=this.tx||new WeakMap();this.ax=this.ax||new WeakMap();
    if(this.mo)this.mo.disconnect();
    const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;
    while(n=w.nextNode()){const cur=n.nodeValue;if(!/[A-Za-z]{2}/.test(cur))continue;const r=this.tx.get(n);const orig=r&&r.t===cur?r.o:cur;const out=lang==='fr'?m.translate(orig,'fr'):orig;if(out!==cur)n.nodeValue=out;this.tx.set(n,{o:orig,t:out})}
    root.querySelectorAll('[aria-label],[title],[placeholder]').forEach(el=>['aria-label','title','placeholder'].forEach(a=>{const cur=el.getAttribute(a);if(!cur)return;let rec=this.ax.get(el);rec=rec||{};const r=rec[a];const orig=r&&r.t===cur?r.o:cur;const out=lang==='fr'?m.translate(orig,'fr'):orig;if(out!==cur)el.setAttribute(a,out);rec[a]={o:orig,t:out};this.ax.set(el,rec)}));
    if(!this.mo)this.mo=new MutationObserver(()=>{cancelAnimationFrame(this.mraf);this.mraf=requestAnimationFrame(()=>this.applyLang())});
    this.mo.observe(root,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder']});
  }
  componentDidMount(){
    Promise.all([import('./data/i18n.js'),import('./data/i18n-v5.js')]).then(([a,b])=>{this.i18n={translate:(s,l)=>b.tr(s,x=>a.translate(x,l))};this.applyLang()}).catch(e=>console.warn('i18n',e));
    this.onScr=()=>{const n=this.root&&this.root.querySelector('nav[aria-label="Modules"]');if(!n)return;const s=n.getBoundingClientRect().top<=1;if(s!==this.state.stuck)this.setState({stuck:s})};window.addEventListener('scroll',this.onScr,true);
    document.documentElement.dataset.theme=this.state.dark?'dark':'light';
    if(this.root&&window.ResizeObserver&&!this.props.width){this.ro=new ResizeObserver(e=>{const w=Math.round(e[0].contentRect.width);cancelAnimationFrame(this.raf);this.raf=requestAnimationFrame(()=>{if(w&&Math.abs(w-this.state.w)>8)this.setState({w})})});this.ro.observe(this.root);const w0=this.root.offsetWidth;if(w0)this.setState({w:w0})}
    loadAll().then(([raw,geo])=>{this.D=this.prep(raw,geo);this.setState({ready:true,...this.defaults(),...(this.props.base4?{base4:this.props.base4}:{}),...(this.props.prep1?{prep1:this.props.prep1}:{}),...(this.props.plError?{plArea:'0',plTry:true}:{})},()=>{if(this.props.plError)this.calc(false)})}).catch(e=>this.setState({err:String(e&&e.message||e)}));
  }
  componentWillUnmount(){this.mo&&this.mo.disconnect();window.removeEventListener('scroll',this.onScr,true);this.ro&&this.ro.disconnect();if(this.lmap){this.lmap.remove();this.lmap=null}}
  measureBg(){const l=this.liftEl;if(!l||this.state.mod===0)return;const box=this.root&&this.root.querySelector('[data-bgbox]');const p=box&&(box.offsetParent||document.body);if(!p)return;const h=Math.round(l.getBoundingClientRect().bottom-p.getBoundingClientRect().top);if(h>0&&Math.abs(h-(this.state.bgH||0))>3)this.setState({bgH:h})}
  componentDidUpdate(pp,ps){ps=ps||{};setTimeout(()=>this.measureBg(),0);
    if(ps.dark!==this.state.dark){document.documentElement.dataset.theme=this.state.dark?'dark':'light';try{localStorage.setItem('kt-dark',this.state.dark?'1':'0')}catch(e){}}
    if(ps.mod!==this.state.mod&&this.navFocus){this.navFocus=false;this.scrollTo(0);setTimeout(()=>{this.h1&&this.h1.focus({preventScroll:true})},30)}
    if(this.pendingSrc){const id=this.pendingSrc;this.pendingSrc=null;setTimeout(()=>{const el=this.root&&this.root.querySelector('#'+this.uid+'src-'+id);if(el)this.scrollTo(el,120)},60)}
    if(this.focusErr){this.focusErr=false;setTimeout(()=>{const el=this.root&&this.root.querySelector('[role=alert][tabindex="-1"]');el&&el.focus()},40)}
    this.syncLeaf();
  }
  scrollTo(target,off){const sc=this.sc;const inner=sc&&sc.scrollHeight>sc.clientHeight+4&&getComputedStyle(sc).overflowY!=='visible';
    if(target===0){if(inner)sc.scrollTop=0;else if(this.root){const t=this.root.getBoundingClientRect().top+window.scrollY;if(window.scrollY>t)window.scrollTo({top:t})}return}
    const r=target.getBoundingClientRect();if(inner){sc.scrollTop+=r.top-sc.getBoundingClientRect().top-(off||0)}else window.scrollTo({top:window.scrollY+r.top-(off||0)})}

  prep(raw,geo){const D={raw,geo};
    const rows=(sh,from=5)=>(raw[sh]||[]).filter(x=>x.r>=from&&x.c.some(v=>String(v).trim()!==''));
    D.rows=rows;D.row=(sh,r)=>(raw[sh]||[]).find(y=>y.r===r);D.cell=(sh,r,c)=>{const x=D.row(sh,r);return x?String(x.c[c]??''):''};
    D.find=(sh,pred,from=5)=>rows(sh,from).find(x=>pred(x.c));
    D.src={};rows('Sources').forEach(x=>{if(/^R\d/.test(x.c[0]))D.src[x.c[0]]={id:x.c[0],title:x.c[1],pub:x.c[2],year:x.c[3],link:x.c[4],grade:x.c[5],r:x.r}});
    D.crops=rows('Crops').filter(x=>x.c[1]);D.CN=D.crops.map(x=>x.c[0]);
    D.districts=rows('Districts').filter(x=>isNum(x.c[2]));D.dl={};D.districts.forEach(x=>{D.dl[x.c[0]]=[+x.c[3],+x.c[2]]});D.DN=D.districts.map(x=>x.c[0]);
    D.prov={};D.districts.forEach(x=>{D.prov[x.c[0]]=x.c[1]});
    D.sm=rows('Suitability_model').filter(x=>D.dl[x.c[0]]);
    D.sd=rows('Stunting_district_2025').filter(x=>D.dl[x.c[0]]&&isNum(x.c[2]));
    D.sdNat=D.find('Stunting_district_2025',c=>/^National stunting/.test(c[0]));
    D.sdAbove=D.find('Stunting_district_2025',c=>/^Districts above 30%/.test(c[0]));
    D.sdCount=D.find('Stunting_district_2025',c=>/^Published districts/.test(c[0]));
    D.readme=k=>{const x=D.find('README',c=>c[0]===k,1);return x?x.c[1]:''};
    const sk=D.readme('Status key');D.stDefs={};(sk.match(/(Published \(to verify\)|Published|Derived|Model|Content) = [^.]+\./g)||[]).forEach(s=>{const i=s.indexOf(' = ');const d0=s.slice(i+3);D.stDefs[stKeyOf(s.slice(0,i))]=d0.charAt(0).toUpperCase()+d0.slice(1)});
    D.chap=m=>D.find('Chapters',c=>String(c[0])===String(m));
    return D}
  defaults(){const D=this.D;return {crop1:D.CN[0],prep1:'raw',dist2:D.sd[0].c[0],brk2:D.rows('Stunting_breakdown_2025')[0].c[0],hv2:'district',cat2:'',yr2:'',crop4:'All four',per4:'today',dist4:[...D.DN].sort()[0],base4:'map',min6:'All',fam7:'All',nut:'Iron',prep8:'raw',crop9:D.CN[0],step9:'All',plCrop:D.CN[0],plDist:[...D.DN].sort()[0]}}

  /* ---------- primitives ---------- */
  t(st,en,rw){return st.lang==='rw'&&rw?rw:en}
  badge(k){const d=STS[k];return {t:d.t,def:(this.D&&this.D.stDefs[k])||(k==='nd'?'Not in the dataset yet. Nothing is estimated.':''),icon:ico(d.ic,16,{color:d.fg}),style:{display:'inline-flex',alignItems:'center',gap:6,minHeight:24,padding:'2px 9px',borderRadius:2,background:d.bg,color:d.fg,border:`1.5px ${k==='nd'?'dashed':'solid'} ${d.bd}`,fontSize:13,lineHeight:'18px',fontWeight:700,whiteSpace:'nowrap'}}}
  parseSrc(s){s=String(s||'');if(s.length>40){const ids=[...new Set(s.match(/R\d+b?/g)||[])];if(/deck/i.test(s))ids.push('Project deck');return ids}const out=[];s.split(/[,;]/).forEach(p=>{p=p.trim();if(!p)return;const m=p.match(/^(R\d+b?)/);if(m)out.push(m[1]);else if(/deck/i.test(p))out.push('Project deck')});return [...new Set(out)]}
  meta(status,grade,src){const k=stKeyOf(status),ids=this.parseSrc(src),D=this.D;
    let g=grade?String(grade).trim():'';
    if(!g&&(k==='pub'||k==='ver')){const gs=[];ids.forEach(id=>{if(D.src[id])gs.push(D.src[id].grade);else if(id==='Project deck')gs.push('C')});g=[...new Set(gs)].join(' / ')}
    const gc={A:'#20603D',B:'#2B6CB0',C:'#B4530A',D:'#6B4A33'}[g.charAt(0)]||'#4F4F4F';return {st:this.badge(k),hasGrade:!!g,grade:g,gradeT:'Grade '+g,gradeStyle:{display:'inline-flex',alignItems:'center',minHeight:24,padding:'2px 9px',borderRadius:2,background:gc,color:'#FFFFFF',fontSize:13,lineHeight:'18px',fontWeight:700,whiteSpace:'nowrap'},srcs:ids.map(id=>{const s=D.src[id];return s?{id,link:true,plain:false,title:`${s.title} · ${s.pub}, ${s.year} · Grade ${s.grade}`,aria:`Source ${id}: ${s.title}. Open in Learn and sources`,go:()=>this.goSource(id)}:{id,link:false,plain:true,title:id==='Project deck'?'Project deck: the GanzAfrica project presentation (not listed in the Sources sheet)':id,aria:id,go:null}})}}
  reg(ctx,label,sheet,r,col,v){if(ctx&&ctx.reg)ctx.reg.push({mod:ctx.mod,label,sheet,col,r,cell:colName(col)+r,v:String(v??'')})}
  F(ctx,o){const D=this.D,v=o.raw!==undefined?o.raw:D.cell(o.sheet,o.r,o.col);if(o.sheet)this.reg(ctx,o.label,o.sheet,o.r,o.col,v);
    const nd=isPend(v);let disp=nd?'':(o.pct100?(Math.round(+v*100*1e6)/1e6)+'%':fmtU(v,o.unit));if(o.suffix&&!nd)disp+=o.suffix;
    return {label:o.label,v,disp,nd,has:!nd,reason:o.reason||'',geo:o.geo||'',hasGeo:!!o.geo,note:o.note||'',hasNote:!!o.note,extraK:o.extraK||'',extraR:o.extraR||'',hasExtra:!!o.extraK,meta:o.status!==undefined?this.meta(o.status,o.grade,o.src):NOMETA}}
  span(st,n){return this.wide(st)&&n&&n<12?{gridColumn:`span ${n}`,minWidth:0}:{gridColumn:'1 / -1',minWidth:0}}
  wide(st){return st.w>=1024}
  mainW(st){const w=st.w,side=w<640?16:w<1024?32:Math.min(80,Math.round(w*0.04));return Math.min(1280,w-2*side)}
  sec(st,o,n){return Object.assign({},SECF,{wrap:this.span(st,n)},o)}
  head(st,h,sub,lvl){return this.sec(st,{isHead:true,isH2:lvl!==3,isH3:lvl===3,h,sub:sub||'',hasSub:!!sub,id:this.uid+'h'+(this._hid=(this._hid||0)+1)})}
  notice(st,tone,title,text,n){const c=tone==='model'?P.blue:tone==='warn'?P.gold:tone==='error'?P.orange:P.green;return this.sec(st,{isNotice:true,title:title||'',hasTitle:!!title,text,icon:ico(tone==='model'?'stMod':tone==='warn'?'uWarn':'uInfo',24,{color:tone==='model'?P.blue:P.ink}),box:{display:'flex',gap:12,alignItems:'flex-start',padding:'13px 18px',borderRadius:2,...(tone==='model'||tone==='info'?{background:'#509CFF',color:P.ink}:tone==='error'?{background:P.card,color:P.ink,border:'2px solid #D4351C'}:{background:'#E2B93B',color:P.ink})}},n)}
  nodata(st,title,reason,n){return this.sec(st,{isNodata:true,title:title||'',hasTitle:!!title,reason},n)}
  cards(st,items,n,min){return this.sec(st,{isCards:true,items,grid:{display:'grid',gridTemplateColumns:`repeat(auto-fill,minmax(min(100%,${min||240}px),1fr))`,gap:16}},n)}
  c(o){return Object.assign({},CF,o)}
  cT(t,sub,num){return this.c({isText:true,t:String(t),hasSub:!!sub,sub:sub||'',num})}
  cS(t,num){return this.c({isStrong:true,t:String(t),num})}
  cN(reason){return this.c({isNd:true,reason})}
  cM(meta){return this.c({isMeta:true,meta})}
  cL(t,href){return this.c({isLink:true,t,href})}
  cMods(list){return this.c({isMod:true,mods:this.modLinks(list)})}
  modLinks(list){return String(list||'').split(/[,\s]+/).filter(x=>/^\d+$/.test(x)).map(n=>({t:'M'+n,title:`Module ${n}: ${TN[+n]?TN[+n][0]:''}`,href:'#m'+n,go:e=>{e&&e.preventDefault&&e.preventDefault();this.go(+n)}}))}
  table(st,o,n){const cols=o.cols.map((c,i)=>({t:typeof c==='string'?c:c.t,style:{padding:'11px 14px',textAlign:(typeof c==='object'&&c.num)?'right':'left',background:'#20603D',color:'#FFFFFF',fontSize:14,lineHeight:'24px',fontWeight:600,verticalAlign:'bottom',whiteSpace:i===0?'nowrap':'normal'}}));
    const rows=o.rows.map((r,i)=>({head:r.head,headSub:r.headSub||'',hasHeadSub:!!r.headSub,id:r.id||undefined,style:{background:r.hl?'rgba(229,190,1,0.28)':(i%2?P.track:P.card)},cells:r.cells.map(x=>Object.assign({},x,{style:{padding:'11px 14px',verticalAlign:'top',textAlign:x.num?'right':'left',borderTop:`1px solid ${P.line}`,fontVariantNumeric:'tabular-nums'}}))}));
    return this.sec(st,{isTable:true,caption:o.caption,title:o.title||'',hasHead:!!o.title,tSub:o.sub||'',hasTSub:!!o.sub,hasToggle:!!o.toggle,toggle:o.toggle||null,toggleLabel:o.toggleLabel||'',open:!!o.open,summary:o.summary||'',hasSummary:!!o.summary,box:o.title?{background:P.card,border:'1px solid #BDBDBD',borderRadius:4,padding:24,display:'flex',flexDirection:'column',gap:16,minWidth:0}:{display:'flex',flexDirection:'column',gap:8,minWidth:0},cols,rows,note:o.note||'',hasNote:!!o.note,meta:o.meta||NOMETA,hasMeta:!!o.meta,tblStyle:{width:'100%',borderCollapse:'collapse',fontSize:15,lineHeight:'24px',minWidth:o.minW||480}},n)}
  toggleOf(st,id){const open=!!st.tbl[id];return {open,toggle:()=>this.setState(s=>({tbl:{...s.tbl,[id]:!s.tbl[id]}})),toggleLabel:open?'Hide table':'Show as table'}}
  chart(st,id,o,n){const tg=this.toggleOf(st,id);const s=this.sec(st,{isChart:true,hid:this.uid+'c'+id,title:o.title,sub:o.sub||'',hasSub:!!o.sub,legend:o.legend||[],hasLegend:!!(o.legend&&o.legend.length),nd:!!o.nd,ndReason:o.ndReason||'',el:o.el||null,hasEl:!o.nd&&!!o.el,summary:o.summary||'',hasSummary:!!o.summary,meta:o.meta||NOMETA,note:o.note||'',hasNote:!!o.note,hasToggle:!!o.tbl,...tg},n);
    return tg.open&&o.tbl?[this.table(st,{...o.tbl,title:o.title,sub:o.sub,toggle:tg.toggle,toggleLabel:'Show as chart',open:true,meta:o.meta,note:o.note,summary:o.summary},n)]:[s]}
  sw(bg,extra){return Object.assign({width:22,height:13,flex:'none',display:'inline-block',borderRadius:3,background:bg,border:`1px solid ${P.mut}`},extra||{})}
  ndEl(reason,lang){return h('span',{style:{display:'inline-flex',flexWrap:'wrap',alignItems:'center',gap:'6px 8px',fontSize:16,lineHeight:'20px',color:P.ink}},h('span',{style:{display:'inline-flex',alignItems:'center',gap:6,padding:'2px 8px',minHeight:28,border:`1px dashed ${P.mut}`,borderRadius:4,background:P.card,fontWeight:600,whiteSpace:'nowrap'}},ico('stNd',16,{color:P.mut}),lang==='rw'?'Nta makuru araboneka':'No data yet'),reason?h('span',null,reason):null)}

  /* ---------- charts ---------- */
  barChart(st,o){const vals=o.rows.filter(r=>r.v!=null).map(r=>r.v);const mx=o.max||niceMax(Math.max(1e-9,...vals)),step=niceStep(mx),ticks=[];for(let v=0;v<=mx+1e-9;v+=step)ticks.push(+v.toFixed(6));
    const mob=st.w<640,lw=o.labelW||(mob?112:190),grid={display:'grid',gridTemplateColumns:`${lw}px minmax(0,1fr)`,gap:12,alignItems:'center'},vw=mob?84:104;
    const fillOf=k=>k==='intro'?{background:'#4F4F4F'}:k==='ref'?{background:`repeating-linear-gradient(45deg, ${P.green} 0 2px, #FFFFFF 2px 6px)`,border:`2px solid ${P.green}`}:k==='alt'?{background:'#E5BE01'}:{background:P.bar};
    return h('div',{style:{display:'flex',flexDirection:'column',gap:6}},
      o.rows.map((r,i)=>h('div',{key:i,style:{...grid,minHeight:36,background:r.hl?'rgba(242,206,75,0.35)':'transparent',padding:'2px 0'}},
        h('div',{style:{fontSize:16,lineHeight:'20px',minWidth:0,overflowWrap:'anywhere'}},h('span',{style:{fontWeight:r.kind==='intro'?400:700}},r.label),r.sub?h('span',{style:{display:'block',color:P.mut}},r.sub):null),
        r.v==null?this.ndEl(r.reason,st.lang):h('div',{style:{display:'flex',alignItems:'center',gap:8,minWidth:0}},h('span',{'aria-hidden':true,style:{height:18,borderRadius:2,width:`calc((100% - ${vw}px) * ${Math.max(0.004,r.v/mx)})`,flex:'none',boxSizing:'border-box',...fillOf(r.kind)}}),h('span',{style:{fontSize:16,fontWeight:700,whiteSpace:'nowrap'}},r.vt)))),
      h('div',{'aria-hidden':true,style:grid},h('span'),h('div',{style:{position:'relative',height:22,borderTop:`1.5px solid ${P.ink}`,marginRight:vw}},ticks.map(t=>h('span',{key:t,style:{position:'absolute',left:(t/mx*100)+'%',top:4,transform:'translateX(-50%)',fontSize:14,color:P.mut,whiteSpace:'nowrap'}},fmtN(String(t)))))),
      h('div',{style:grid},h('span'),h('p',{style:{margin:'4px '+vw+'px 0 0',fontSize:16,fontWeight:700,textAlign:'center'}},o.axis)))}
  rangeChart(st,o){const mx=o.max||niceMax(Math.max(...o.rows.map(r=>r.hi))),step=niceStep(mx),ticks=[];for(let v=0;v<=mx+1e-9;v+=step)ticks.push(+v.toFixed(6));
    const mob=st.w<640,lw=mob?120:220,grid={display:'grid',gridTemplateColumns:`${lw}px minmax(0,1fr)`,gap:12,alignItems:'center'};
    return h('div',{style:{display:'flex',flexDirection:'column',gap:8}},
      o.rows.map((r,i)=>h('div',{key:i,style:{...grid,minHeight:44}},
        h('div',{style:{fontSize:16,lineHeight:'20px'}},h('span',{style:{fontWeight:700}},r.label),h('span',{style:{display:'block',color:P.ink}},r.lt)),
        h('div',{'aria-hidden':true,style:{position:'relative',height:24,background:P.track,borderRadius:2}},
          h('span',{style:{position:'absolute',top:3,height:18,left:(r.lo/mx*100)+'%',width:`max(4px, ${(r.hi-r.lo)/mx*100}%)`,background:'#20603D',borderRadius:2}}),
          r.mk!=null?h('span',{style:{position:'absolute',top:3,width:14,height:14,left:`calc(${r.mk/mx*100}% - 7px)`,marginTop:2,background:P.yel,border:`2px solid ${P.ink}`,transform:'rotate(45deg)'}}):null))),
      h('div',{'aria-hidden':true,style:grid},h('span'),h('div',{style:{position:'relative',height:22,borderTop:`1.5px solid ${P.ink}`}},ticks.map(t=>h('span',{key:t,style:{position:'absolute',left:(t/mx*100)+'%',top:4,transform:'translateX(-50%)',fontSize:14,color:P.mut}},fmtN(String(t)))))),
      h('div',{style:grid},h('span'),h('p',{style:{margin:'4px 0 0',fontSize:16,fontWeight:700,textAlign:'center'}},o.axis)))}
  dumbbell(st,o){const mx=o.max||100,step=niceStep(mx),ticks=[];for(let v=0;v<=mx+1e-9;v+=step)ticks.push(v);const mob=st.w<640,lw=mob?130:280,grid={display:'grid',gridTemplateColumns:`${lw}px minmax(0,1fr)`,gap:12,alignItems:'center'};
    return h('div',{style:{display:'flex',flexDirection:'column',gap:8}},o.rows.map((r,i)=>{const a=r.a/mx*100,b=r.b/mx*100;return h('div',{key:i,style:{...grid,minHeight:48}},
      h('div',{style:{fontSize:16,lineHeight:'20px'}},h('span',{style:{fontWeight:700}},r.label),h('span',{style:{display:'block'}},r.lt)),
      h('div',{'aria-hidden':true,style:{position:'relative',height:24}},h('span',{style:{position:'absolute',top:11,height:3,left:Math.min(a,b)+'%',width:Math.abs(b-a)+'%',background:P.mut}}),
        h('span',{style:{position:'absolute',top:4,left:`calc(${a}% - 8px)`,width:16,height:16,borderRadius:'50%',background:P.card,border:`3px solid ${P.ink}`}}),
        h('span',{style:{position:'absolute',top:4,left:`calc(${b}% - 8px)`,width:16,height:16,background:P.greenBg,border:`2px solid ${P.green}`}})))}),
      h('div',{'aria-hidden':true,style:grid},h('span'),h('div',{style:{position:'relative',height:22,borderTop:`1.5px solid ${P.ink}`}},ticks.map(t=>h('span',{key:t,style:{position:'absolute',left:(t/mx*100)+'%',top:4,transform:'translateX(-50%)',fontSize:14,color:P.mut}},t)))),
      h('div',{style:grid},h('span'),h('p',{style:{margin:'4px 0 0',fontSize:16,fontWeight:700,textAlign:'center'}},o.axis)))}
  lineChart(st,o){const W=Math.max(300,Math.min(860,this.mainW(st)-50)),H=o.H||300,L=64,R=24,T=32,B=64,ys=o.pts.map(p=>p.y),mx=o.max||niceMax(Math.max(...ys)),step=niceStep(mx),ticks=[];for(let v=0;v<=mx+1e-9;v+=step)ticks.push(+v.toFixed(6));
    const X=i=>L+(o.pts.length===1?0:i*(W-L-R)/(o.pts.length-1)),Y=v=>T+(1-v/mx)*(H-T-B),cy=(T+H-B)/2;
    return h('svg',{viewBox:`0 0 ${W} ${H}`,width:'100%',role:'img','aria-label':o.aria,style:{display:'block',maxWidth:W,height:'auto',fontFamily:'Inter,sans-serif',overflow:'visible'}},
      ticks.map(v=>h('g',{key:v},h('line',{x1:L,x2:W-R,y1:Y(v),y2:Y(v),stroke:P.line,strokeWidth:1}),h('text',{x:L-10,y:Y(v)+5,textAnchor:'end',fontSize:14,fill:P.mut},v+o.unit))),
      h('line',{x1:L,x2:L,y1:T-8,y2:H-B,stroke:P.ink,strokeWidth:1.5}),h('line',{x1:L,x2:W-R,y1:H-B,y2:H-B,stroke:P.ink,strokeWidth:1.5}),
      o.pts.map((p,i)=>h('text',{key:'x'+i,x:X(i),y:H-B+24,textAnchor:'middle',fontSize:14,fill:P.ink},p.x)),
      h('text',{x:(L+W-R)/2,y:H-10,textAnchor:'middle',fontSize:16,fontWeight:700,fill:P.ink},o.xTitle),
      h('text',{x:16,y:cy,textAnchor:'middle',fontSize:16,fontWeight:700,fill:P.ink,transform:`rotate(-90 16 ${cy})`},o.yTitle),
      h('polyline',{points:o.pts.map((p,i)=>X(i)+','+Y(p.y)).join(' '),fill:'none',stroke:P.green,strokeWidth:3,strokeLinejoin:'round'}),
      o.pts.map((p,i)=>h('g',{key:'p'+i},h('circle',{cx:X(i),cy:Y(p.y),r:6,fill:'#FFFFFF',stroke:P.green,strokeWidth:3}),h('text',{x:X(i),y:Y(p.y)-14,textAnchor:'middle',fontSize:16,fontWeight:700,fill:P.ink},p.lab))))}
  proj(W){if(this._pj&&this._pj.W===W)return this._pj;const g=this.D.geo;let x0=180,x1=-180,y0=90,y1=-90;const polys=f=>f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.coordinates;
    g.features.forEach(f=>polys(f).forEach(p=>p[0].forEach(([x,y])=>{if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y})));
    const kx=Math.cos((y0+y1)/2*Math.PI/180),pad=6,s=(W-2*pad)/((x1-x0)*kx),H=Math.round((y1-y0)*s+2*pad),pr=(x,y)=>[pad+(x-x0)*kx*s,pad+(y1-y)*s];
    const paths={};g.features.forEach(f=>{paths[f.properties.shapeName]=polys(f).map(p=>p.map(r=>'M'+r.map(([x,y])=>{const a=pr(x,y);return a[0].toFixed(1)+' '+a[1].toFixed(1)}).join('L')+'Z').join('')).join('')});
    this._pj={W,H,paths,pr};return this._pj}
  mapW(st){const mw=this.mainW(st)-50;return Math.round(this.wide(st)?Math.min(560,mw*0.6):Math.min(560,mw))}
  mapSvg(st,o){const W=this.mapW(st),pj=this.proj(W),pid=this.uid+o.k+'h',small=W<420,KG={Nyarugenge:[-9,2],Kicukiro:[9,6],Gasabo:[6,-4]};
    return h('svg',{viewBox:`0 0 ${pj.W} ${pj.H}`,width:'100%',role:'img','aria-label':o.aria,style:{display:'block',maxWidth:pj.W,height:'auto',fontFamily:'Inter,sans-serif'}},
      h('defs',null,h('pattern',{id:pid,width:8,height:8,patternUnits:'userSpaceOnUse',patternTransform:'rotate(45)'},h('rect',{width:8,height:8,fill:P.track}),h('line',{x1:0,y1:0,x2:0,y2:8,stroke:P.mut,strokeWidth:1.6}))),
      Object.keys(pj.paths).map(n=>{const f=o.fill(n),can=!!o.onSel&&(!o.can||o.can(n));return h('path',{key:n,d:pj.paths[n],fill:f||`url(#${pid})`,stroke:'#FFFFFF',strokeWidth:1.2,style:{cursor:can?'pointer':'default'},onClick:can?()=>o.onSel(n):undefined},h('title',null,o.tip(n)))}),
      o.sel&&pj.paths[o.sel]?h('path',{d:pj.paths[o.sel],fill:'none',stroke:P.ink,strokeWidth:3.5,style:{pointerEvents:'none'}}):null,
      Object.keys(pj.paths).map(n=>{const L=o.label(n),ll=this.D.dl[n];if(!L||!ll)return null;if(small&&KG[n])return null;const a=pj.pr(ll[0],ll[1]),off=KG[n]||[0,0];return h('text',{key:'l'+n,x:a[0]+off[0],y:a[1]+5+off[1],textAnchor:'middle',fontSize:small?11:13,fontWeight:700,fill:L.dark?'#FFFFFF':P.ink,stroke:L.dark?P.deep:'#FFFFFF',strokeWidth:3,paintOrder:'stroke',style:{pointerEvents:'none'}},L.t)}))}
  mapSec(st,id,o,n){const tg=this.toggleOf(st,id),wide=this.wide(st);const s=this.sec(st,{isMap:true,hid:this.uid+'m'+id,title:o.title,sub:o.sub||'',hasSub:!!o.sub,legend:o.legend,el:o.el,detail:Object.assign({hasSub:!!o.detail.sub,sub:'',meta:NOMETA},o.detail),summary:o.summary||'',hasSummary:!!o.summary,note:o.note||'',hasNote:!!o.note,split:{display:'flex',flexWrap:'wrap',gap:24,alignItems:'flex-start'},...tg,hasToggle:!!o.tbl},n);return tg.open&&o.tbl?[this.table(st,{...o.tbl,title:o.title,sub:o.sub,toggle:tg.toggle,toggleLabel:'Show as map',open:true,meta:o.detail&&o.detail.meta,note:o.note,summary:o.summary},n)]:[s]}
  lg(t,sw){return {isNd:false,isSw:true,t,sw}}
  lgNd(){return {isNd:true,isSw:false,t:'',sw:{}}}
  dRow(k,v,o){o=o||{};const nd=isPend(v)&&!o.force;return {k,v:String(v??''),has:!nd,nd,reason:o.reason||'',hasTag:!!o.tag,tag:o.tag||'',tagStyle:{display:'inline-flex',alignItems:'center',minHeight:24,padding:'0 8px',borderRadius:2,border:`1.5px solid ${P.blue}`,color:P.blue,fontSize:16,fontWeight:600}}}

  /* ---------- filters ---------- */
  fbox(st,auto){return st.w<640?{display:'flex',flexDirection:'column',gap:8,width:'100%'}:{display:'flex',flexDirection:'column',gap:8,flex:auto?'0 1 auto':'0 1 280px',minWidth:auto?0:220}}
  fSel(st,key,label,opts,hint){const uid=this.uid+'f'+key,hid=uid+'h';return {isSelect:true,isRadio:false,isText:false,uid,hid,label,hint:hint||'',hasHint:!!hint,desc:hint?hid:undefined,value:st[key],options:opts.map(o=>Array.isArray(o)?{v:o[0],t:o[1]}:{v:o,t:o}),onChange:e=>this.setState({[key]:e.target.value}),box:this.fbox(st)}}
  fRad(st,key,label,opts){const uid=this.uid+'f'+key;return {isSelect:false,isRadio:true,isText:false,uid,label,box:this.fbox(st,true),options:opts.map(o=>{const[v,t]=Array.isArray(o)?o:[o,o];const on=st[key]===v;return {v,t,on,pick:()=>this.setState({[key]:v}),style:{display:'inline-flex',alignItems:'center',gap:8,minHeight:44,padding:'4px 14px 4px 10px',border:`1.5px solid ${on?P.green2:P.mut}`,borderRadius:2,background:on?P.greenBg:P.card,color:on?'#FFFFFF':P.ink,fontSize:15,lineHeight:'20px',fontWeight:600,cursor:'pointer'}}})}}
  fTxt(st,key,label,hint){const uid=this.uid+'f'+key,hid=uid+'h';return {isSelect:false,isRadio:false,isText:true,uid,hid,label,hint:hint||'',hasHint:!!hint,desc:hint?hid:undefined,value:st[key],onChange:e=>this.setState({[key]:e.target.value}),box:this.fbox(st)}}
  filters(st,fields,summary,keys,title,aside){return this.sec(st,{isFilters:true,hasAside:!!aside,asideT:aside?aside[0]:'',aside:aside?aside[1]:'',hid:this.uid+'flt'+(st.mod),title:title||'Choose what to show',fields,summary,hasReset:!!(keys&&keys.length),reset:()=>{const d=this.defaults(),x={};keys.forEach(k=>x[k]=d[k]);this.setState(x)}})}
  text(st,items,n,min,o){o=o||{};const art={background:P.card,border:o.green?`2px solid ${P.green}`:`1px solid ${P.line}`,borderTop:o.green?`6px solid ${P.green}`:`1px solid ${P.line}`,borderRadius:2,padding:24,display:'flex',flexDirection:'column',gap:12,minWidth:0};return this.sec(st,{isText:true,hasNote:!!o.note,note:o.note||'',items:items.map(c=>Object.assign({art,eyebrow:'',hasEyebrow:false,flag:'',hasFlag:false,title:'',tlang:undefined,sub:'',hasSub:false,body:'',blang:undefined,hasBody:false,rows:[],hasRows:false,mods:[],hasMods:false,meta:NOMETA,hasMeta:false,action:'',hasAction:false,href:'#',go:null},c,{hasEyebrow:!!c.eyebrow,hasFlag:!!c.flag,hasSub:!!c.sub,hasBody:!!c.body,hasRows:!!(c.rows&&c.rows.length),hasMods:!!(c.mods&&c.mods.length),hasMeta:!!c.meta,hasAction:!!c.action})),grid:{display:'grid',gridTemplateColumns:`repeat(auto-fill,minmax(min(100%,${min||300}px),1fr))`,gap:16}},n)}

  /* ---------- data helpers ---------- */
  pf(ctx,ind,geo,o){const D=this.D,x=D.find('Published_figures',c=>c[1]===ind&&(!geo||c[4]===geo));if(!x)return null;return this.F(ctx,Object.assign({sheet:'Published_figures',r:x.r,col:2,label:x.c[1],unit:x.c[3],geo:x.c[4],src:x.c[5],grade:x.c[6],status:x.c[7]},o||{}))}
  cropRow(n){return this.D.crops.find(x=>x.c[0]===n)}
  suit(st,ci,per){const D=this.D,base=10+4*ci,out={};D.sm.forEach(x=>{const today=x.c[base],fut=x.c[base+1];const v=per==='2050s'?fut:today;out[x.c[0]]={v,band:per==='2050s'?BAND(+fut):x.c[base+3],r:x.r,col:per==='2050s'?base+1:base,row:x}});return out}
  cropIdx(name){const i=this.D.CN.indexOf(name);return i<0?4:i}

  /* ---------- modules ---------- */
  build(m,st,ctx){this._hid=0;return (this['b'+m]||(()=>[])).call(this,st,ctx)}

  b0(st,ctx){const D=this.D,t=(a,b)=>this.t(st,a,b),S=[],mob=st.w<640;
    const figs=[['Child stunting, under 5','Rwanda, 2025','Children under 5 who are stunted'],['Child anaemia, 6-59 months','Rwanda, 2019-20','Children 6–59 months with anaemia'],['NCD share of facility deaths','Rwanda, 2025','Deaths in health facilities from NCDs'],['Annual cost of child undernutrition','Published 2014','Yearly cost of child undernutrition'],['Indigenous species among foods in Kigali markets','Kigali, 2020','Indigenous species among foods in Kigali markets']];
    const stats=figs.map(([ind,geo,lab],i)=>{const f=this.pf(ctx,ind,geo);if(!f)return null;const m=String(f.disp).match(/^(\D*?)([\d.,]+)(.*)$/)||['',' ',f.disp,''];return {num:(m[1]||'')+m[2],suf:m[3].trim(),label:lab,year:f.geo,badge:f.meta.st,srcs:f.meta.srcs,pos:{marginTop:mob?0:[0,56,16,72,24][i]}}}).filter(Boolean);
    const facts=D.rows('Facts'),fi=((st.fact%facts.length)+facts.length)%facts.length,fr=facts[fi];this.reg(ctx,'Did you know? fact '+(fi+1),'Facts',fr.r,st.lang==='rw'?1:0,fr.c[st.lang==='rw'?1:0]);
    const hc=st.hc??0;
    const crops=D.crops.map((x,i)=>{this.reg(ctx,x.c[0]+' · English name','Crops',x.r,1,x.c[1]);this.reg(ctx,x.c[0]+' · species','Crops',x.r,2,x.c[2]);const on=hc===i;
      return {n:String(i+1).padStart(2,'0'),name:x.c[0],sub:`${x.c[1]} · ${x.c[2]} · ${x.c[4]} · ${x.c[5]}–${x.c[6]} days to first harvest`,img:IMG(CROPIMG[x.c[0]]),enter:()=>this.state.hc!==i&&this.setState({hc:i}),go:e=>{e&&e.preventDefault();this.setState({crop1:x.c[0]});this.go(1)},
        row:{display:'grid',gridTemplateColumns:mob?'40px minmax(0,1fr)':'56px minmax(0,1fr) 120px 96px',alignItems:'center',gap:mob?12:24,padding:mob?'16px 0':'20px 0',textDecoration:'none',color:'#FFFFFF'},
        title:{fontSize:mob?34:'clamp(40px, 5.6vw, 76px)',lineHeight:1,fontWeight:500,letterSpacing:'-0.02em',color:on?'#F6E27A':'#FFFFFF',transition:'color .25s'},
        thumb:{backgroundImage:`url("${IMG(CROPIMG[x.c[0]])}")`,backgroundSize:'cover',backgroundPosition:'center',display:mob?'none':'block',width:120,height:84,borderRadius:16,overflow:'hidden',opacity:on?1:0,transform:on?'scale(1) rotate(-3deg)':'scale(.85) rotate(0deg)',transition:'opacity .3s, transform .4s cubic-bezier(.2,.9,.3,1.2)'},
        dot:{display:mob?'none':'flex',width:92,height:92,borderRadius:'50%',background:'#F6E27A',color:'#14231B',alignItems:'center',justifyContent:'center',textAlign:'center',fontSize:12,fontWeight:700,lineHeight:1.2,padding:10,opacity:on?1:0,transform:on?'scale(1)':'scale(.6)',transition:'opacity .25s, transform .35s cubic-bezier(.2,.9,.3,1.3)'}}});
    S.push(this.sec(st,{isHome:true,hid:this.uid+'home',heroImg:IMG('terraces'),stats,keys:['pub','ver','der','mod','con','nd'].map(k=>this.badge(k)),factT:t('Did you know?','Wari uzi ko?'),factPos:`${fi+1} / ${facts.length}`,fact:fr.c[st.lang==='rw'&&fr.c[1]?1:0],flang:st.lang==='rw'&&fr.c[1]?'rw':'en',prev:()=>this.setState(s=>({fact:s.fact-1})),next:()=>this.setState(s=>({fact:s.fact+1})),crops}));
    const mods=GROUPS.slice(1).flatMap(g=>g[2].map(m=>({m,g}))).sort((a,b)=>a.m-b.m);
    S.push(this.sec(st,{isMods:true,hid:this.uid+'mods',title:t('Ten modules, from the plate to policy','Ibice icumi'),goSrc:e=>{e&&e.preventDefault();this.go(10)},items:mods.map(({m,g},i)=>{const c=D.chap(m);if(c){this.reg(ctx,`Module ${m} title`,'Chapters',c.r,2,c.c[2])}const y=i===0;
      return {n:String(m).padStart(2,'0'),title:c?(st.lang==='rw'&&c.c[3]?c.c[3]:c.c[2]):TN[m][0],group:t(g[0],g[1]),img:IMG(MODIMG[m]),href:'#m'+m,imgS:{position:'absolute',right:0,bottom:0,width:'62%',height:'52%',borderTopLeftRadius:22,backgroundImage:`url("${IMG(MODIMG[m])}")`,backgroundSize:'cover',backgroundPosition:'center'},go:e=>{e&&e.preventDefault();this.go(m)},
        numS:{fontSize:15,fontWeight:500,opacity:.75,position:'relative',zIndex:1},
        card:{position:'relative',minHeight:340,borderRadius:22,padding:28,overflow:'hidden',display:'flex',flexDirection:'column',gap:12,textDecoration:'none',background:y?'#FBEFA0':P.card,color:y?'#14231B':P.ink,border:y?'1px solid #FBEFA0':`1px solid ${P.line}`,transition:'transform .3s cubic-bezier(.2,.9,.3,1.2), box-shadow .3s'}}})}));
    return S}

  b1(st,ctx){const D=this.D,S=[],x=this.cropRow(st.crop1),c=x.c,r=x.r,ck=st.prep1==='cooked';
    S.push(this.filters(st,[this.fSel(st,'crop1','Crop',D.CN.map(n=>[n,`${n} (${this.cropRow(n).c[1]})`])),this.fRad(st,'prep1','Preparation',[['raw','Raw'],['cooked','Cooked']])],`${st.crop1} · ${ck?'cooked':'raw'}`,['crop1','prep1'],null,['Laboratory-measured nutrients','Laboratory nutrients have not been collected. The values below are compiled from the project deck (Grade C, to verify).']));
    {const mob=st.w<760,act=st.gh??st.crop1,TINT={Inyabutongo:'142,43,82',Isogo:'74,52,110',Isogi:'62,110,40',Intagarasoryo:'168,120,24'};
    const items=D.crops.map((q,i)=>{const nm=q.c[0],on=act===nm,sel=st.crop1===nm,rgb='20,72,46';
      return {n:String(i+1).padStart(2,'0'),name:nm,eng:q.c[1],sci:q.c[2],pressed:sel?'true':'false',pick:()=>this.setState({crop1:nm,gh:null}),enter:()=>st.gh!==nm&&this.setState({gh:nm}),
        stats:[{l:'First harvest',v:q.c[5]+'–'+q.c[6]+' d'},{l:'Eaten',v:q.c[4]},{l:'Yield',v:q.c[9]+'–'+q.c[10]+' kg/m²'}],ctaT:sel?'Showing below':'Select this crop',
        panel:{position:'relative',overflow:'hidden',border:sel?'2px solid #F6E27A':'2px solid transparent',borderRadius:0,padding:0,margin:0,cursor:'pointer',textAlign:'left',color:'#FFFFFF',fontFamily:'inherit',background:'#14231B',flex:on?(mob?'0 0 340px':'3.4 1 0'):(mob?'0 0 112px':'1 1 0'),minWidth:0,minHeight:mob?0:'100%',transition:'flex .55s cubic-bezier(.2,.7,.2,1), border-color .25s'},
        img:{position:'absolute',inset:0,backgroundImage:'url("'+IMG(CROPIMG[nm])+'")',backgroundSize:'cover',backgroundPosition:'center',transform:on?'scale(1.04)':'scale(1.18)',filter:on?'saturate(1.05)':'saturate(.6) brightness(.85)',transition:'transform .8s ease, filter .5s'},
        shade:{position:'absolute',inset:0,background:'linear-gradient(to top, rgba('+rgb+',.96) 0%, rgba('+rgb+',.62) '+(on?'38%':'70%')+', rgba('+rgb+',.12) 78%, rgba(10,22,16,.25) 100%)',transition:'background .5s'},
        num:{position:'absolute',top:16,left:18,fontSize:13,letterSpacing:'.12em',fontWeight:700,opacity:.9},
        body:{position:'absolute',left:0,right:0,bottom:0,padding:mob?'14px 16px':'24px 24px 26px',display:'flex',flexDirection:'column',gap:6},
        title:{fontSize:on?(mob?30:'clamp(32px,3.6vw,52px)'):(mob?22:'clamp(20px,1.9vw,28px)'),lineHeight:1,fontWeight:500,letterSpacing:'-0.02em',transition:'font-size .4s',overflowWrap:'anywhere'},
        sub:{fontSize:15,opacity:.92},
        more:{display:on?'flex':'none',flexDirection:'column',gap:12,marginTop:8},
        cta:{alignSelf:'flex-start',padding:'8px 16px',borderRadius:999,background:sel?'rgba(255,255,255,.2)':'#F6E27A',color:sel?'#FFFFFF':'#14231B',fontSize:14,fontWeight:700}};});
    S.push(this.sec(st,{isCropGal:true,items,box:{display:'flex',flexDirection:mob?'column':'row',gap:mob?10:14,height:mob?'auto':'clamp(420px, 56vh, 560px)'}}));}
    S.push(this.head(st,st.crop1,`${c[1]} · ${c[2]} · ${c[3]}`));
    const m=this.meta(c[15],'',c[14]),reg=(lab,col)=>this.reg(ctx,`${st.crop1} · ${lab}`,'Crops',r,col,c[col]);
    ['English name','Species','Family','Part eaten'].forEach((lab,i)=>reg(lab,i+1));[5,6,7,8,9,10,11,12,13].forEach(i=>reg(['','','','','','Days to harvest (min)','Days to harvest (max)','Cuts (min)','Cuts (max)','Yield low','Yield high','Improved-practice yield','Average of range','Price'][i],i));
    const cuts=/perennial/i.test(c[7])?'Perennial (no cut count)':`${c[7]}–${c[8]} cuts per season`;
    const price=/no documented price/i.test(c[13])?this.cN('No documented price in the sources.'):this.cT(c[13]);
    S.push(this.table(st,{caption:`About ${st.crop1}`,cols:['Item','Value'],minW:320,meta:m,note:'Average of range is Derived: (low + high) ÷ 2.',rows:[
      {head:'Species',cells:[this.cT(c[2])]},{head:'Family',cells:[this.cT(c[3])]},{head:'Part eaten',cells:[this.cT(c[4])]},
      {head:'Days to first harvest',cells:[this.cT(`${c[5]}–${c[6]} days`)]},{head:'Harvests per season',cells:[this.cT(cuts)]},
      {head:'Yield range',cells:[this.cT(`${c[9]}–${c[10]} kg/m² per season`)]},{head:'Improved-practice yield',cells:[this.cT(`${c[11]} kg/m² per season`)]},
      {head:'Average of range',cells:[this.cT(`${c[12]} kg/m² per season`,'Derived')]},
      {head:'Market price',cells:[price]}]},6));
    const nx=D.find('Nutrients',cc=>cc[0]===st.crop1),nm=this.meta(nx.c[9],'C',nx.c[8]);
    const nrow=(lab,col,unit)=>{this.reg(ctx,`${st.crop1} · ${lab} raw`,'Nutrients',nx.r,col,nx.c[col]);return {head:lab,cells:[this.cS(`${fmtN(nx.c[col])} ${unit}`,true)]}};
    let rows;if(!ck)rows=[nrow('Iron',3,'mg'),nrow('Vitamin C',4,'mg'),nrow('Protein',5,'g')];
    else{this.reg(ctx,`${st.crop1} · vitamin C after cooking, low`,'Nutrients',nx.r,6,nx.c[6]);this.reg(ctx,`${st.crop1} · vitamin C after cooking, high`,'Nutrients',nx.r,7,nx.c[7]);
      rows=[{head:'Iron',cells:[this.cN('No cooked values in the dataset.')]},{head:'Vitamin C',headSub:'after cooking (low–high)',cells:[this.cS(`${nx.c[6]}–${nx.c[7]} mg`,true)]},{head:'Protein',cells:[this.cN('No cooked values in the dataset.')]}]}
    ['Calcium','Zinc','Vitamin A','Folate','Fibre'].forEach(n=>rows.push({head:n,cells:[this.cN('Not available for the four crops.')]}));
    S.push(this.table(st,{caption:`Nutrients per 100 g, ${ck?'cooked':'raw'} edible portion`,cols:['Nutrient',{t:'Amount per 100 g',num:true}],rows,minW:320,meta:nm,note:D.cell('Nutrients',2,0)},6));
    const ns=D.find('Nutrient_score',cc=>cc[0]===st.crop1,5);
    const nsa=D.rows('Nutrient_score',5).filter(x=>isNum(x.c[4]));nsa.forEach(x=>this.reg(ctx,`${x.c[0]} nutrient score`,'Nutrient_score',x.r,4,x.c[4]));
    S.push(...this.chart(st,'ns1',{title:'Nutrient score, iron + vitamin C + protein',sub:`Out of 100. ${st.crop1} is highlighted.`,legend:[{t:st.crop1,sw:this.sw('#E5BE01')},{t:'Other foods',sw:this.sw(P.bar)}],el:this.barChart(st,{rows:nsa.map(x=>({label:x.c[0],v:+x.c[4],vt:fmtN(x.c[4])+' / 100',k:x.c[0]===st.crop1?'alt':undefined})),max:100,axis:'Nutrient score (0 to 100)'}),summary:nsa.map(x=>`${x.c[0]} ${fmtN(x.c[4])}`).join('; ')+'.',meta:this.meta('Derived'),note:D.cell('Nutrient_score',2,0)},6));
    const step=D.find('Practice_steps',cc=>cc[0]===st.crop1&&String(cc[1])==='8');
    if(step){this.reg(ctx,`${st.crop1} · cooking step`,'Practice_steps',step.r,4,step.c[4]);S.push(this.text(st,[{eyebrow:'From the growing guide (Module 9)',title:st.lang==='rw'?step.c[3]:step.c[2],tlang:st.lang==='rw'?'rw':'en',body:st.lang==='rw'&&step.c[5]?step.c[5]:step.c[4],blang:st.lang==='rw'&&step.c[5]?'rw':'en',meta:this.meta(step.c[6],'',step.c[4])}]))}
    return S}

  b2(st,ctx){const D=this.D,S=[];
    const BR=D.rows('Stunting_breakdown_2025'),groups=[...new Set(BR.map(x=>x.c[0]))];
    const VIEWS=[['district','District (published only)'],...groups.map(g=>[g,g==='Residence'?'Urban / rural':g.replace("'",'’')]),['trend','Trend since 2000']];
    const vw=VIEWS.some(v=>v[0]===st.hv2)?st.hv2:'district',nat=D.sdNat,natV=+nat.c[2];
    const tr=D.rows('Stunting_trend').filter(x=>/^\d{4}$/.test(x.c[0]));
    const r1=v=>Math.round(v*10)/10,sg=v=>(v>0?'+':'')+r1(v);
    const natCard=this.F(ctx,{sheet:'Stunting_district_2025',r:nat.r,col:2,label:'Rwanda, 2025',unit:'%',src:nat.c[3],status:nat.c[4]});
    const sd={};D.sd.forEach(x=>sd[x.c[0]]=x);const dx=sd[st.dist2]||D.sd[0];
    let f2,cards,sum,cx,rows,yx;
    if(vw==='district'){
      f2=this.fSel({...st,dist2:dx.c[0]},'dist2','District',D.sd.map(x=>x.c[0]),D.sd.length+' districts have a published 2025 value.');
      cards=[natCard,
        this.F(ctx,{sheet:'Stunting_district_2025',r:dx.r,col:2,label:dx.c[0]+', 2025',unit:'%',note:`${sg(+dx.c[6])} points vs national · rank ${dx.c[5]} of ${D.sd.length} published`,src:dx.c[3],status:dx.c[4]}),
        this.F(ctx,{sheet:'Stunting_district_2025',r:D.sdCount.r,col:2,label:'Published districts',suffix:' / '+D.DN.length,note:'The other districts are left off the map until published.',status:'Derived'}),
        this.F(ctx,{sheet:'Stunting_district_2025',r:D.sdAbove.r,col:2,label:'Published districts above 30%',status:'Derived'})];
      sum=`${dx.c[0]} · ${dx.c[2]}% of children under 5 stunted in 2025`;
    }else if(vw==='trend'){
      yx=tr.find(x=>x.c[0]===st.yr2)||tr[tr.length-1];
      f2=this.fSel({...st,yr2:yx.c[0]},'yr2','Survey year',tr.map(x=>x.c[0]));
      const pa=D.find('Stunting_trend',c=>/^Pace achieved/.test(c[0])),pn=D.find('Stunting_trend',c=>/^Pace needed/.test(c[0]));
      cards=[this.F(ctx,{sheet:'Stunting_trend',r:yx.r,col:1,label:'Rwanda, '+yx.c[0],unit:'%',src:yx.c[2],status:yx.c[3]}),
        yx.c[4]===''?this.F(ctx,{raw:'',label:'Change vs previous survey',reason:'This is the first survey in the series.'}):this.F(ctx,{sheet:'Stunting_trend',r:yx.r,col:4,label:'Change vs previous survey',suffix:' points',status:'Derived'}),
        this.F(ctx,{raw:r1(+yx.c[1]-+tr[0].c[1]),label:'Change since '+tr[0].c[0],suffix:' points',status:'Derived'}),
        pa&&this.F(ctx,{sheet:'Stunting_trend',r:pa.r,col:1,label:'Pace achieved 2020–2025',suffix:' points a year',status:'Derived'}),
        pn&&this.F(ctx,{sheet:'Stunting_trend',r:pn.r,col:1,label:'Pace needed to reach 15% by 2029',suffix:' points a year',status:'Derived'})].filter(Boolean);
      sum=`Rwanda · ${yx.c[1]}% of children under 5 stunted in ${yx.c[0]}`;
    }else{
      rows=BR.filter(x=>x.c[0]===vw);cx=rows.find(x=>x.c[1]===st.cat2)||rows[0];const lab=VIEWS.find(v=>v[0]===vw)[1];
      f2=this.fSel({...st,cat2:cx.c[1]},'cat2',lab,rows.map(x=>x.c[1]));
      const srt=[...rows].sort((p,q)=>+q.c[2]-+p.c[2]),hi=srt[0],lo=srt[srt.length-1];
      cards=[natCard,
        this.F(ctx,{sheet:'Stunting_breakdown_2025',r:cx.r,col:2,label:cx.c[1]+', 2025',unit:'%',note:`${sg(+cx.c[3])} points vs national · rank ${srt.indexOf(cx)+1} of ${rows.length}`,src:cx.c[4],status:cx.c[5]}),
        this.F(ctx,{sheet:'Stunting_breakdown_2025',r:hi.r,col:2,label:'Highest: '+hi.c[1],unit:'%',src:hi.c[4],status:hi.c[5]}),
        this.F(ctx,{raw:r1(+hi.c[2]-+lo.c[2]),label:`Gap to lowest (${lo.c[1]}, ${lo.c[2]}%)`,suffix:' points',status:'Derived'})];
      sum=`${cx.c[1]} · ${cx.c[2]}% of children under 5 stunted in 2025`;
    }
    S.push(this.filters(st,[this.fSel({...st,hv2:vw},'hv2','View by',VIEWS),f2],sum,['hv2','dist2','cat2','yr2']));
    S.push(this.cards(st,cards));
    if(vw==='district'){
      const cls=v=>v<15?0:v<30?1:v<35?2:3,CL=['#E9F5EE','#339961','#20603D','#143E28'],CLT=['Below 15%','15% to 29.9%','30% to 34.9%','35% and above'];
      D.sd.forEach(x=>this.reg(ctx,x.c[0]+' stunting 2025','Stunting_district_2025',x.r,2,x.c[2]));
      const dm=this.meta(dx.c[4],'',dx.c[3]);[5,6,7].forEach(col=>this.reg(ctx,`${dx.c[0]} · ${['','','','','','Rank','Difference vs national','Above 30%?'][col]}`,'Stunting_district_2025',dx.r,col,dx.c[col]));if(dx.c[8])this.reg(ctx,dx.c[0]+' stunting 2020','Stunting_district_2025',dx.r,8,dx.c[8]);
      const hi=D.sd[0],lo=D.sd[D.sd.length-1],unpub=D.DN.filter(n=>!sd[n]).sort();
      S.push(this.head(st,'Child stunting by district, 2025',D.cell('Stunting_district_2025',2,0)));
      S.push(...this.mapSec(st,'sd',{title:'Child stunting by district, 2025',sub:'Each district shows its published value. Select a district on the map or with the filter above.',
        legend:[...CL.map((c,i)=>this.lg(CLT[i],this.sw(c))),this.lgNd(),this.lg('Selected district',this.sw('#FFFFFF',{border:`3px solid ${P.ink}`}))],
        el:this.mapSvg(st,{k:'sd',aria:`Map of child stunting by district, 2025. ${D.sd.length} districts have published values; ${unpub.length} have no published data.`,fill:n=>sd[n]?CL[cls(+sd[n].c[2])]:null,label:n=>sd[n]?{t:sd[n].c[2],dark:cls(+sd[n].c[2])>=2}:null,sel:dx.c[0],onSel:n=>this.setState({dist2:n}),can:n=>!!sd[n],tip:n=>sd[n]?`${n}: ${sd[n].c[2]}% (2025)`:`${n}: No published data`}),
        detail:{kicker:'Selected district',title:dx.c[0],sub:dx.c[1]+' Province',rows:[this.dRow('Stunting, 2025',dx.c[2]+'%'),this.dRow('Rank of '+D.sd.length+' (1 = highest)',dx.c[5]),this.dRow('Difference vs national (points)',(+dx.c[6]>0?'+':'')+dx.c[6],{tag:'Derived'}),this.dRow('Above 30%?',dx.c[7],{tag:'Derived'}),dx.c[8]?this.dRow('Stunting, 2020',dx.c[8]+'%  ('+dx.c[9]+')'):this.dRow('Stunting, 2020','',{reason:'Published for Ngororero and Kicukiro only.'})],meta:dm},
        summary:`${D.sd.length} of ${D.DN.length} districts have a published 2025 value. Highest: ${hi.c[0]} ${hi.c[2]}%. Lowest: ${lo.c[0]} ${lo.c[2]}%. National: ${nat.c[2]}%.`,
        note:'Districts with no published value are hatched and left out of the colour scale: '+unpub.join(', ')+'.'}));
      S.push(...this.chart(st,'sdr',{title:'Published districts, ranked',sub:'Child stunting, 2025. National: '+nat.c[2]+'%.',el:this.barChart(st,{rows:D.sd.map(x=>({label:x.c[0],v:+x.c[2],vt:x.c[2]+'%'})),max:50,axis:'Children under 5 who are stunted (%)'}),summary:D.sd.map(x=>`${x.c[0]} ${x.c[2]}%`).join('; ')+'.',meta:this.meta('Published (to verify)','',dx.c[3])}));
    }else if(vw==='trend'){
      tr.forEach(x=>this.reg(ctx,'Stunting '+x.c[0],'Stunting_trend',x.r,1,x.c[1]));
      S.push(this.head(st,'Child stunting since 2000',D.cell('Stunting_trend',2,0)));
      S.push(...this.chart(st,'tr',{title:'Child stunting, under 5, Rwanda',sub:'Percentage of children under 5 who are stunted, by survey year',el:this.lineChart(st,{pts:tr.map(x=>({x:x.c[0],y:+x.c[1],lab:x.c[1]+'%'})),unit:'%',yTitle:'Children stunted (%)',xTitle:'Survey year',aria:'Line chart of child stunting: '+tr.map(x=>`${x.c[0]} ${x.c[1]}%`).join(', ')}),summary:`Stunting was ${tr[0].c[1]}% in ${tr[0].c[0]}, ${tr[1].c[1]}% in ${tr[1].c[0]} and ${tr[tr.length-1].c[1]}% in ${tr[tr.length-1].c[0]}.`,meta:this.meta('Published','',[...new Set(tr.map(x=>x.c[2]))].join(', '))}));
    }else{
      rows.forEach(x=>this.reg(ctx,'Stunting 2025 · '+x.c[1],'Stunting_breakdown_2025',x.r,2,x.c[2]));
      const lab=VIEWS.find(v=>v[0]===vw)[1];
      S.push(this.head(st,'Who is most affected, 2025',D.cell('Stunting_breakdown_2025',2,0)));
      S.push(...this.chart(st,'br',{title:`Child stunting by ${lab.toLowerCase()}, 2025`,sub:`National: ${nat.c[2]}%. The gap is in percentage points.`,el:this.barChart(st,{rows:rows.map(x=>({label:x.c[1],v:+x.c[2],vt:`${x.c[2]}% (${+x.c[3]>0?'+':''}${x.c[3]})`})),max:50,axis:'Children under 5 who are stunted (%)'}),summary:rows.map(x=>`${x.c[1]} ${x.c[2]}%`).join('; ')+'.',meta:this.meta('Published','',rows[0].c[4])}));
    }
    S.push(this.head(st,'National indicators','National values only. Province and district values are shown only where the dataset has them.'));
    const natOnly=/anaemi|^Wasting|^Underweight|NCD/i;
    S.push(this.cards(st,D.rows('Health_indicators').map(x=>this.F(ctx,{sheet:'Health_indicators',r:x.r,col:1,label:x.c[0],unit:x.c[2],geo:x.c[3],src:x.c[4],grade:x.c[5],status:x.c[6],...(natOnly.test(x.c[0])?{extraK:'Province and district values',extraR:'Only a national value is published.'}:{})}))));
    const fi=D.rows('Food_insecurity_province');fi.forEach(x=>this.reg(ctx,'Food-insecure households · '+x.c[0],'Food_insecurity_province',x.r,1,x.c[1]));
    S.push(...this.chart(st,'fi',{title:'Food-insecure households by province, 2022',sub:D.cell('Food_insecurity_province',2,0),el:this.barChart(st,{rows:fi.map(x=>({label:x.c[0],v:+x.c[1],vt:x.c[1]+'%'})),max:40,labelW:st.w<640?90:110,axis:'Households (%)'}),summary:fi.map(x=>`${x.c[0]} ${x.c[1]}%`).join('; ')+'.',meta:this.meta('Published','',fi[0].c[2])},6));
    const nc=D.rows('NCD_deaths');nc.forEach(x=>this.reg(ctx,'NCD share '+x.c[0],'NCD_deaths',x.r,1,x.c[1]));
    S.push(...this.chart(st,'ncd',{title:'NCD share of deaths in health facilities',sub:D.cell('NCD_deaths',2,0),el:this.barChart(st,{rows:nc.map(x=>({label:x.c[0],v:+x.c[1],vt:x.c[1]+'%'})),max:60,labelW:st.w<640?70:80,axis:'Share of facility deaths (%)'}),summary:nc.map(x=>`${x.c[0]} ${x.c[1]}%`).join('; ')+'. Years are not evenly spaced.',meta:this.meta('Published','',[...new Set(nc.map(x=>x.c[2]))].join(', '))},6));
    return S}

  b3(st,ctx){const D=this.D,S=[],cr=D.crops;
    S.push(this.head(st,'Published yield ranges',D.cell('Crops',2,0)));
    cr.forEach(x=>{[9,10,11].forEach(i=>this.reg(ctx,`${x.c[0]} · ${['','','','','','','','','','Yield low','Yield high','Improved-practice yield'][i]}`,'Crops',x.r,i,x.c[i]))});
    S.push(...this.chart(st,'yr',{title:'Leaf or fruit yield per season',sub:'Bar: published low to high range. Diamond: improved-practice yield.',legend:[{t:'Published range (low to high)',sw:this.sw('#20603D')},{t:'Improved-practice yield',sw:{width:14,height:14,background:P.yel,border:`2px solid ${P.ink}`,transform:'rotate(45deg)',display:'inline-block',margin:'0 7px'}}],
      el:this.rangeChart(st,{rows:cr.map(x=>({label:x.c[0],lo:+x.c[9],hi:+x.c[10],mk:+x.c[11],lt:`${x.c[9]}–${x.c[10]} kg/m² · improved ${x.c[11]}`})),max:5,axis:'Yield (kg per m² per season)'}),summary:cr.map(x=>`${x.c[0]} ${x.c[9]}–${x.c[10]} kg/m²`).join('; ')+'.',meta:this.meta(cr[0].c[15],'',cr[0].c[14]),
      tbl:{caption:'Published yields (kg per m² per season)',cols:['Crop',{t:'Low',num:true},{t:'High',num:true},{t:'Improved practice',num:true},{t:'Average of range',num:true},'Status and source'],minW:640,rows:cr.map(x=>({head:x.c[0],cells:[this.cT(x.c[9],null,true),this.cT(x.c[10],null,true),this.cT(x.c[11],null,true),this.cT(x.c[12],'Derived',true),this.cM(this.meta(x.c[15],'',x.c[14]))]}))}},8));
    S.push(this.nodata(st,'Pilot-plot yields','Pilot yields will be added after the pilot season. Only published ranges are shown.',4));
    cr.forEach(x=>{[5,6,7,8].forEach(i=>this.reg(ctx,`${x.c[0]} · ${['','','','','','Days min','Days max','Cuts min','Cuts max'][i]}`,'Crops',x.r,i,x.c[i]))});
    S.push(...this.chart(st,'dh',{title:'Days from sowing to first harvest',sub:'Published minimum to maximum.',el:this.rangeChart(st,{rows:cr.map(x=>({label:x.c[0],lo:+x.c[5],hi:+x.c[6],lt:`${x.c[5]}–${x.c[6]} days · ${/perennial/i.test(x.c[7])?'perennial':x.c[7]+'–'+x.c[8]+' cuts'}`})),max:200,axis:'Days to first harvest'}),summary:cr.map(x=>`${x.c[0]} ${x.c[5]}–${x.c[6]} days`).join('; ')+'.',meta:this.meta(cr[0].c[15],'',cr[0].c[14]),
      tbl:{caption:'Days to harvest and cuts per season',cols:['Crop',{t:'Days (min)',num:true},{t:'Days (max)',num:true},'Cuts per season','Status and source'],rows:cr.map(x=>({head:x.c[0],cells:[this.cT(x.c[5],null,true),this.cT(x.c[6],null,true),/perennial/i.test(x.c[7])?this.cT('Perennial'):this.cT(`${x.c[7]}–${x.c[8]}`),this.cM(this.meta(x.c[15],'',x.c[14]))]}))}}));
    const yi=D.rows('Yield_inputs').filter(x=>D.CN.includes(x.c[0]));
    S.push(this.head(st,'What each crop needs',D.cell('Yield_inputs',2,0)));
    const rng=(a,b)=>isPend(a)||isPend(b)?null:(a===b?a:`${a}–${b}`);
    const why={1:'Plant density is not in the sources yet.',6:'Nitrogen rate is not documented for this crop.',7:'Labour has not been measured.',8:'Water use has not been measured.',s:'Seed rate is not documented for this crop.',m:'Manure rate is not documented for this crop.'};
    S.push(this.table(st,{caption:'Inputs per m² (published methods)',cols:['Crop',{t:'Plants per m²',num:true},{t:'Seed (g/m²)',num:true},{t:'Manure (kg/m²)',num:true},{t:'Nitrogen (g/m²)',num:true},{t:'Labour (h/m²)',num:true},{t:'Water (L/week)',num:true},'Status'],minW:900,rows:yi.map(x=>{const per=x.c[0]==='Intagarasoryo',R=reason=>per?'Input rates for this perennial shrub are not documented yet.':reason;[1,2,3,4,5,6,7,8].forEach(i=>this.reg(ctx,`${x.c[0]} · ${D.cell('Yield_inputs',4,i)}`,'Yield_inputs',x.r,i,x.c[i]));
      const v=(val,reason)=>val==null||isPend(val)?this.cN(R(reason)):this.cS(val,true);return {head:x.c[0],cells:[v(x.c[1],why[1]),v(rng(x.c[2],x.c[3]),why.s),v(rng(x.c[4],x.c[5]),why.m),v(x.c[6],why[6]),v(x.c[7],why[7]),v(x.c[8],why[8]),this.cM(this.meta(x.c[10],'',x.c[9]))]}}),note:D.find('Yield_inputs',c=>/^Trial yields/.test(c[0]))?D.find('Yield_inputs',c=>/^Trial yields/.test(c[0])).c[0]:''}));
    S.push(this.text(st,yi.map(x=>{this.reg(ctx,`${x.c[0]} · method note`,'Yield_inputs',x.r,9,x.c[9]);return {title:x.c[0],tlang:'rw',body:x.c[9],blang:'en',meta:this.meta(x.c[10],'',x.c[9])}}),null,300));
    S.push(this.table(st,{caption:'Market price',cols:['Crop','Price'],minW:320,meta:this.meta(cr[0].c[15],'',cr[0].c[14]),rows:cr.map(x=>({head:x.c[0],cells:[/no documented price/i.test(x.c[13])?this.cN('No documented price in the sources.'):this.cT(x.c[13])]}))}));
    const tyx=D.find('Yield_inputs',c=>/^Trial yields/.test(c[0]));
    if(tyx){this.reg(ctx,'Trial yields note','Yield_inputs',tyx.r,0,tyx.c[0]);const tr=[];tyx.c[0].replace(/^Trial yields:\s*/,'').split(';').forEach(seg=>{const cm=(seg.match(/^\s*([a-zA-Z ]+?)\s+\d/)||[])[1];if(!cm)return;const re=/(\d+(?:\.\d+)?) t\/ha \((R\d+b?)\)/g;let mm;while((mm=re.exec(seg)))tr.push({crop:cm,t:mm[1],id:mm[2]})});
      S.push(this.head(st,'Trial yields from studies outside Rwanda','The published field trials behind the yield ranges above. Select a source ID to open it in Sources.'));
      S.push(this.table(st,{caption:'Trial yields from published studies',cols:['Crop (as named in the study)',{t:'Trial yield (t/ha)',num:true},{t:'Same in kg/m²',num:true},'Study','Status and source'],minW:900,rows:tr.map(x=>{const s=D.src[x.id];return {head:x.crop.charAt(0).toUpperCase()+x.crop.slice(1),cells:[this.cS(x.t,true),this.cT(String(Math.round(+x.t/10*100)/100),'Derived: t/ha ÷ 10',true),this.cT(s?s.title:x.id,s?`${s.pub}, ${s.year}`:''),this.cM(this.meta('Published (to verify)','',x.id))]}}),note:'From the dataset note: '+tyx.c[0]}))}
    const pc=st.plCrop||D.CN[0],six=D.rows('Practice_steps').filter(x=>x.c[0]===pc&&+x.c[1]>=1&&+x.c[1]<=6),rw=st.lang==='rw';six.forEach(x=>this.reg(ctx,`Good practice ${x.c[1]} · ${pc}`,'Practice_steps',x.r,4,x.c[4]));
    S.push(this.head(st,'The six good practices',`The planner counts how many of these you follow. The dataset does not name the six, so the tool uses steps 1 to 6 of the growing guide for ${pc} (Module 9). Change the crop in the planner to see that crop’s practices.`));
    S.push(this.sec(st,{isSteps:true,grid:{listStyle:'none',margin:0,padding:0,display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,320px),1fr))',gap:12},items:six.map(x=>({n:x.c[1],title:rw&&x.c[3]?x.c[3]:x.c[2],tlang:rw&&x.c[3]?'rw':'en',body:rw&&x.c[5]?x.c[5]:x.c[4],blang:rw&&x.c[5]?'rw':'en',hasNote:false,note:'',meta:this.meta(x.c[6],'',x.c[4])}))}));
    S.push(this.head(st,'Garden planner','Size a plot and see the expected harvest per season.'));
    S.push(this.planner(st,ctx));
    return S}

  planner(st,ctx){const D=this.D,fx=D.find('Yield_inputs',c=>/^Garden planner/.test(c[0]));if(fx)this.reg(ctx,'Garden planner formula','Yield_inputs',fx.r,0,fx.c[0]);
    const uid=this.uid+'pl',errs=st.plErr||{},hasErr=!!(st.plTry&&Object.keys(errs).length);
    const base=(id,label,hint)=>({uid:uid+id,hid:uid+id+'h',eid:uid+id+'e',label,hint:hint||'',hasHint:!!hint,isSelect:false,isInput:false,isChecks:false,hasLabel:true,hasErr:false,err:'',options:[],wrapStyle:{display:'flex',flexDirection:'column',gap:8}});
    const sel=(id,key,label,opts,hint)=>Object.assign(base(id,label,hint),{isSelect:true,value:st[key],options:opts.map(o=>Array.isArray(o)?{v:o[0],t:o[1]}:{v:o,t:o}),onChange:e=>this.setState({[key]:e.target.value}),desc:hint?uid+id+'h':undefined});
    const area=Object.assign(base('a','Garden area (m²)','Enter the area in square metres, for example 20.'),{isInput:true,value:st.plArea,onChange:e=>this.setState({plArea:e.target.value}),hasErr:hasErr&&!!errs.area,err:errs.area||''});
    area.desc=[area.hid,area.hasErr?area.eid:null].filter(Boolean).join(' ');
    area.inputStyle={minHeight:44,width:'10ch',maxWidth:'100%',padding:'8px 12px',border:`${area.hasErr?3:1.5}px solid ${area.hasErr?P.orange:P.mut}`,borderRadius:2,background:P.card,color:P.ink,fontFamily:'inherit',fontSize:16};
    if(area.hasErr)area.wrapStyle={display:'flex',flexDirection:'column',gap:8,borderLeft:`4px solid ${P.orange}`,paddingLeft:16};
    const six=D.rows('Practice_steps').filter(x=>x.c[0]===st.plCrop&&+x.c[1]>=1&&+x.c[1]<=6),nChk=six.filter(x=>st.plChk[x.c[1]]).length;
    const checks=Object.assign(base('p',`Good practices you will follow (${nChk} of 6)`,'Tick each practice you will follow. The formula uses the number ticked.'),{isChecks:true,hasLabel:false,hasHint:false,options:six.map(x=>{const on=!!st.plChk[x.c[1]];const u=st.lang==='rw'&&!!x.c[5];return {t:`${x.c[1]}. ${st.lang==='rw'&&x.c[3]?x.c[3]:x.c[2]}`,d:u?x.c[5]:x.c[4],on,toggle:()=>this.setState(s=>({plChk:{...s.plChk,[x.c[1]]:!s.plChk[x.c[1]]}})),style:{display:'flex',alignItems:'flex-start',gap:12,minHeight:44,padding:'10px 12px',border:`1.5px solid ${on?P.green2:P.line}`,borderRadius:2,background:on?P.chip:P.card,fontSize:15,cursor:'pointer'}}})});
    const fields=[sel('c','plCrop','Crop',D.CN),sel('d','plDist','District',[...D.DN].sort(),'Shows the modelled suitability of the crop in this district.'),area,checks];
    let res=null;if(st.plRes){const r=st.plRes;const x=this.cropRow(r.crop);const ci=this.cropIdx(r.crop),sm=D.sm.find(y=>y.c[0]===r.dist),base4=10+4*ci;
      const pv=st.plView||'num';res={views:[['num','Show with numbers'],['words','Show in words']].map(([v,t])=>{const on=pv===v;return {t,on,pick:()=>this.setState({plView:v}),style:{minHeight:44,padding:'8px 14px',border:`1.5px solid ${P.green2}`,borderRadius:2,background:on?P.greenBg:P.card,color:on?'#FFFFFF':P.green,fontFamily:'inherit',fontSize:14,fontWeight:600,cursor:'pointer'}}}),isNum:pv==='num',isWords:pv==='words',defs:[{k:'Area',v:`${r.area} m², your garden`},{k:'Low',v:`${x.c[9]} kg/m² per season, the published low yield for ${r.crop}`},{k:'Improved',v:`${x.c[11]} kg/m² per season, the improved-practice yield`},{k:'Practices followed',v:`${r.p} of the 6 good practices`}],v:r.v+' kg',calc:`${r.area} m² × [${x.c[9]} + (${x.c[11]} − ${x.c[9]}) × ${r.p} ÷ 6] = ${r.v} kg per season`,meta:{...this.meta('Derived'),srcs:this.meta('',null,x.c[14]).srcs},loc:`Modelled suitability of ${r.crop} in ${r.dist}: ${sm.c[base4]} (${sm.c[base4+3]})`,locSt:this.badge('mod')};
      this.reg(ctx,`Planner · ${r.crop} yield low`,'Crops',x.r,9,x.c[9]);this.reg(ctx,`Planner · ${r.crop} improved yield`,'Crops',x.r,11,x.c[11]);this.reg(ctx,`Planner · ${r.dist} suitability ${r.crop}`,'Suitability_model',sm.r,base4,sm.c[base4])}
    return this.sec(st,{isPlanner:true,hid:uid+'t',ehid:uid+'eh',title:'Plan a kitchen garden',intro:fx?fx.c[0]:'',fields,calc:()=>this.calc(true),hasErr,errRef:this.errRef,errs:hasErr?[{t:errs.area,href:'#'+area.uid,go:e=>{e.preventDefault();const el=document.getElementById(area.uid);el&&el.focus()}}]:[],hasRes:!!res&&!hasErr,res:res||{v:'',calc:'',meta:NOMETA,loc:'',locSt:this.badge('mod'),views:[],isNum:false,isWords:false,defs:[]}})}
  calc(focus){const st=this.state,raw=String(st.plArea).trim(),errs={};
    if(raw==='')errs.area='Enter the garden area in square metres';else if(!/^\d+(\.\d+)?$/.test(raw))errs.area='Garden area must be a number, like 20';else if(+raw<=0)errs.area='Garden area must be more than 0 m²';
    if(errs.area){this.setState({plErr:errs,plTry:true,plRes:null},()=>{if(focus)setTimeout(()=>{const el=this.root&&this.root.querySelector('[role=alert][tabindex="-1"]');el&&el.focus()},50)});return}
    const x=this.cropRow(st.plCrop),lo=+x.c[9],imp=+x.c[11],p=this.D.rows('Practice_steps').filter(y=>y.c[0]===st.plCrop&&+y.c[1]>=1&&+y.c[1]<=6&&st.plChk[y.c[1]]).length,a=+raw,v=Math.round(a*(lo+(imp-lo)*p/6)*100)/100;
    this.setState({plErr:null,plTry:true,plRes:{crop:st.plCrop,dist:st.plDist,area:raw,p,v:String(v)}})}

  b4(st,ctx){const D=this.D,S=[],ci=this.cropIdx(st.crop4),sc=this.suit(st,ci,st.per4),base=10+4*ci,label=ci===4?'all four crops':st.crop4;
    S.push(this.filters(st,[this.fSel(st,'crop4','Crop',[['All four','All four crops (combined score)'],...D.CN.map(n=>[n,n])]),this.fRad(st,'per4','Time',[['today','Today'],['2050s','2050s (+1.8 °C)']]),this.fSel(st,'dist4','District',[...D.DN].sort()),...(window.__resources?[]:[this.fRad(st,'base4','Base map',[['map','District map'],['sat','Satellite imagery']])])],`${label} · ${st.per4==='today'?'today':'2050s'} · ${st.dist4}`,['crop4','per4','dist4','base4']));
    this.reg(ctx,'Model caution','README',D.find('README',c=>c[0]==='Caution',1).r,1,'');
    S.push(this.notice(st,'model','Hypothesis map: model output, not observations',D.readme('Caution')));
    Object.keys(sc).forEach(n=>this.reg(ctx,`${n} suitability · ${label} · ${st.per4}`,'Suitability_model',sc[n].r,sc[n].col,sc[n].v));
    const dx=sc[st.dist4],row=dx.row,cnt={};Object.values(sc).forEach(s=>cnt[s.band]=(cnt[s.band]||0)+1);
    [2,5,6,7,8,9].forEach(i=>this.reg(ctx,`${st.dist4} · ${D.cell('Suitability_model',4,i)}`,'Suitability_model',row.r,i,row.c[i]));[0,1,2,3].forEach(k=>this.reg(ctx,`${st.dist4} · ${D.cell('Suitability_model',4,base+k)}`,'Suitability_model',row.r,base+k,row.c[base+k]));
    const sat=st.base4==='sat'&&!window.__resources;
    const el=sat?h('div',{style:{display:'flex',flexDirection:'column',gap:8}},h('div',{ref:this.leafRef,role:'region','aria-label':`Satellite map of Rwanda with modelled suitability for ${label}`,style:{height:Math.round(this.mapW(st)*0.9),width:'100%',background:P.deep,borderRadius:4}}),h('p',{style:{margin:0,fontSize:16,color:P.mut}},'Imagery © Esri, Maxar, Earthstar Geographics. Colours show the modelled score, not what the photo shows.'))
      :this.mapSvg(st,{k:'su',aria:`Map of modelled suitability for ${label}, ${st.per4}. ${Object.keys(cnt).map(b=>b+' '+cnt[b]).join(', ')} districts.`,fill:n=>sc[n]?BANDC[sc[n].band]:null,label:n=>sc[n]?{t:fmtN(sc[n].v),dark:BAND_DARK[sc[n].band]}:null,sel:st.dist4,onSel:n=>this.setState({dist4:n}),tip:n=>sc[n]?`${n}: ${sc[n].v} (${sc[n].band}) · Model`:n});
    S.push(this.head(st,`Where ${label} can grow, ${st.per4==='today'?'today':'in the 2050s'}`,D.cell('Suitability_model',2,0)));
    S.push(...this.mapSec(st,'su',{title:`Modelled suitability: ${label}, ${st.per4==='today'?'today':'2050s'}`,sub:'Scores 0 to 100. The label on each district is its score.',
      legend:[this.lg('Excellent (80 and above)',this.sw(BANDC.Excellent)),this.lg('Good (60 to 79)',this.sw(BANDC.Good)),this.lg('Fair (40 to 59)',this.sw(BANDC.Fair)),this.lg('Limited (below 40)',this.sw(BANDC.Limited)),this.lg('Selected district',this.sw('#FFFFFF',{border:`3px solid ${P.ink}`}))],el,
      detail:{kicker:'Selected district',title:st.dist4,sub:`${row.c[1]} Province · ${row.c[2]}`,rows:[this.dRow(`Score today (${label})`,row.c[base]),this.dRow('Score in the 2050s',row.c[base+1]),this.dRow('Change (points)',(+row.c[base+2]>0?'+':'')+row.c[base+2]),this.dRow('Band today',row.c[base+3]),...(st.per4==='2050s'?[this.dRow('Band in the 2050s',BAND(+row.c[base+1]),{tag:'Derived from band rule'})]:[]),this.dRow('Elevation',fmtN(row.c[5])+' m'),this.dRow('Rainfall',fmtN(row.c[6])+' mm',{tag:'to check'}),this.dRow('Mean temperature',row.c[7]+' °C',{tag:'to check'}),this.dRow('Mean temperature, 2050s',row.c[8]+' °C',{tag:'to check'}),this.dRow('Soil pH',row.c[9],{tag:'estimated'})],meta:this.meta('Model')},
      summary:`Modelled bands across 30 districts: ${['Excellent','Good','Fair','Limited'].map(b=>`${b} ${cnt[b]||0}`).join(', ')}.`,note:st.per4==='2050s'?'2050s bands are calculated with the reading-aid rule in the Suitability_model sheet (Derived).':'',
      tbl:{caption:`Modelled suitability: ${label}, ${st.per4}`,cols:['District','Province',{t:'Score',num:true},'Band','Status'],minW:560,rows:[...D.DN].sort().map(n=>({head:n,hl:n===st.dist4,cells:[this.cT(sc[n].row.c[1]),this.cS(sc[n].v,true),this.cT(sc[n].band),this.cM(this.meta('Model'))]}))}}));
    const sl=D.rows('Species_limits').filter(x=>ci===4||x.c[0]===st.crop4);sl.forEach(x=>[2,3,4,5].forEach(i=>this.reg(ctx,`${x.c[0]} · ${x.c[1]} · ${D.cell('Species_limits',4,i)}`,'Species_limits',x.r,i,x.c[i])));
    S.push(this.head(st,'Growing limits used by the model',D.cell('Species_limits',2,0)));
    S.push(this.table(st,{caption:`Growing limits${ci===4?'':': '+st.crop4}`,cols:['Crop','Variable',{t:'Absolute min',num:true},{t:'Optimum min',num:true},{t:'Optimum max',num:true},{t:'Absolute max',num:true},'Note'],minW:900,rows:sl.map(x=>({head:x.c[0],cells:[this.cT(x.c[1]),this.cT(x.c[2],null,true),this.cT(x.c[3],null,true),this.cT(x.c[4],null,true),this.cT(x.c[5],null,true),x.c[6]?this.cT(x.c[6]):this.cT('')]}))}));

    const pr=D.rows('Priority_districts').filter(x=>isNum(x.c[1]));pr.forEach(x=>{[1,2,3,4,5,6,7,8,9,10].forEach(i=>this.reg(ctx,`Priority · ${x.c[0]} · ${D.cell('Priority_districts',4,i)}`,'Priority_districts',x.r,i,x.c[i]))});
    S.push(this.head(st,'Priority districts',D.cell('Priority_districts',2,0)));
    S.push(this.table(st,{caption:'Priority districts: published stunting above 30% and modelled suitability of 60 or more',cols:['District',{t:'Stunting 2025',num:true},...D.CN.map(n=>`${n} score today`),{t:'Priority crops',num:true}],minW:900,rows:pr.map(x=>({head:x.c[0],hl:+x.c[10]>0,cells:[this.cT(x.c[1]+'%',null,true),...D.CN.map((n,k)=>x.c[6+k]==='Yes'?this.cS(`${x.c[2+k]} · Priority`):this.cT(`${x.c[2+k]} · No`)),this.cS(x.c[10],true)]})),note:`Derived from Stunting_district_2025 and Suitability_model. ${pr.filter(x=>+x.c[10]>0).length} districts have at least one priority crop. Only the 15 districts with a published stunting value can be assessed.`}));
    return S}

  syncLeaf(){const el=this.leafEl;if(!el||!document.body.contains(el)){if(this.lmap){this.lmap.remove();this.lmap=null;this.lmEl=null;this.lsig=null}return}
    if(!window.L||!this.D)return;const L=window.L;if(this.lmap&&this.lmEl!==el){this.lmap.remove();this.lmap=null;this.lsig=null}
    if(!this.lmap){const m=L.map(el,{zoomSnap:.25,scrollWheelZoom:false});L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{maxZoom:18,attribution:'Imagery © Esri, Maxar, Earthstar Geographics'}).addTo(m);this.lmap=m;this.lmEl=el;m.fitBounds(L.geoJSON(this.D.geo).getBounds(),{padding:[8,8]});setTimeout(()=>m.invalidateSize(),60)}
    const st=this.state,sig=[st.crop4,st.per4,st.dist4].join('|');if(sig===this.lsig)return;this.lsig=sig;
    const sc=this.suit(st,this.cropIdx(st.crop4),st.per4);if(this.lgj)this.lmap.removeLayer(this.lgj);if(this.lmk)this.lmap.removeLayer(this.lmk);
    this.lgj=L.geoJSON(this.D.geo,{style:f=>{const n=f.properties.shapeName,s=sc[n],sel=n===st.dist4;return {color:sel?P.yel:'#FFFFFF',weight:sel?4:1.2,fillColor:s?BANDC[s.band]:P.track,fillOpacity:.55}},onEachFeature:(f,l)=>{const n=f.properties.shapeName,s=sc[n];l.bindTooltip(s?`${n}: ${s.v} (${s.band}) · Model`:n,{sticky:true});l.on('click',()=>this.setState({dist4:n}))}}).addTo(this.lmap);
    this.lmk=L.layerGroup(Object.keys(sc).map(n=>{const ll=this.D.dl[n];return L.marker([ll[1],ll[0]],{interactive:false,keyboard:false,icon:L.divIcon({className:'',iconSize:[44,22],iconAnchor:[22,11],html:`<span style="display:inline-block;padding:1px 5px;background:#FFFFFF;color:#000F14;font:700 13px Inter,sans-serif;border-radius:3px;border:1px solid #000F14">${fmtN(sc[n].v)}</span>`})})})).addTo(this.lmap)}

  b5(st,ctx){const D=this.D,S=[],rows=D.rows('Cost_of_hunger');const card=x=>{const k=stKeyOf(x.c[4]);return this.F(ctx,{sheet:'Cost_of_hunger',r:x.r,col:1,label:x.c[0],unit:x.c[2],pct100:/Share of GDP/.test(x.c[0]),src:x.c[3]==='calc'?'':x.c[3],status:x.c[4],note:x.c[5]?`How: ${x.c[5]}`:''})};
    S.push(this.head(st,'The published estimate',D.cell('Cost_of_hunger',2,0)));
    S.push(this.cards(st,rows.filter(x=>stKeyOf(x.c[4])==='pub'||stKeyOf(x.c[4])==='ver').map(card)));
    S.push(this.head(st,'Calculated from the estimate','Each value shows the formula used in the dataset.'));
    S.push(this.cards(st,rows.filter(x=>stKeyOf(x.c[4])==='der').map(card)));
    const pa=D.find('Stunting_trend',c=>/^Pace achieved/.test(c[0])),pn=D.find('Stunting_trend',c=>/^Pace needed/.test(c[0]));this.reg(ctx,pa.c[0],'Stunting_trend',pa.r,1,pa.c[1]);this.reg(ctx,pn.c[0],'Stunting_trend',pn.r,1,pn.c[1]);
    S.push(this.head(st,'The pace of progress',null));
    S.push(...this.chart(st,'pace',{title:'Stunting reduction, points per year',sub:'Achieved 2020–2025 against what is needed to reach 15% by 2029.',el:this.barChart(st,{rows:[{label:'Achieved 2020–2025',v:+pa.c[1],vt:pa.c[1]+' points'},{label:'Needed to reach 15% by 2029',v:+pn.c[1],vt:pn.c[1]+' points',kind:'alt'}],max:4,axis:'Percentage points per year'}),summary:`The pace needed (${pn.c[1]} points a year) is about ${(Math.round(+pn.c[1]/+pa.c[1]*10)/10)} times the pace achieved (${pa.c[1]}).`,meta:this.meta('Derived'),legend:[{t:'Achieved',sw:this.sw('#20603D')},{t:'Needed',sw:this.sw('#E5BE01')}],
      tbl:{caption:'Pace of stunting reduction',cols:['Measure',{t:'Points per year',num:true},'Status'],rows:[pa,pn].map(x=>({head:x.c[0],cells:[this.cS(x.c[1],true),this.cM(this.meta(x.c[3]))]}))}}));
    return S}

  b6(st,ctx){const D=this.D,S=[],pol=D.rows('Policies'),mins=[...new Set(pol.map(x=>x.c[2]))];
    S.push(this.filters(st,[this.fSel(st,'min6','Ministry',['All',...mins])],st.min6==='All'?'All ministries':st.min6,['min6']));
    const f=pol.filter(x=>st.min6==='All'||x.c[2]===st.min6);
    S.push(this.head(st,'Policies this work aligns with',D.cell('Policies',2,0)));
    S.push(this.text(st,f.map(x=>{[0,1,3,4,5].forEach(i=>this.reg(ctx,`${x.c[0]} · ${D.cell('Policies',4,i)}`,'Policies',x.r,i,x.c[i]));const tc=/to confirm/i.test(x.c[1]);return {eyebrow:tc?'Period:':`Period: ${x.c[1]}`,flag:tc?'To confirm':'',title:x.c[0],sub:x.c[2],rows:[{k:'What it sets out',v:x.c[3],has:true,nd:false,reason:''},{k:'Alignment',v:x.c[4],has:true,nd:false,reason:''},{k:'In practice',v:x.c[5],has:true,nd:false,reason:''}],mods:this.modLinks(x.c[6]),meta:this.meta(x.c[8],'',x.c[7])}}),null,320));
    const tg=D.rows('Targets');tg.forEach(x=>{this.reg(ctx,`${x.c[0]} baseline`,'Targets',x.r,1,x.c[1]);this.reg(ctx,`${x.c[0]} target`,'Targets',x.r,2,x.c[2])});
    S.push(this.head(st,'National targets',D.cell('Targets',2,0)));
    S.push(...this.chart(st,'tg',{title:'Baseline and target',sub:'Circle: baseline. Square: target.',legend:[{t:'Baseline',sw:{width:16,height:16,borderRadius:'50%',border:`3px solid ${P.ink}`,background:P.card,display:'inline-block'}},{t:'Target',sw:{width:16,height:16,background:P.greenBg,display:'inline-block'}}],el:this.dumbbell(st,{rows:tg.map(x=>({label:x.c[0],a:+x.c[1],b:+x.c[2],lt:`${x.c[1]}% → ${x.c[2]}%`})),max:70,axis:'Percentage (%)'}),summary:tg.map(x=>`${x.c[0]}: ${x.c[1]}% to ${x.c[2]}%`).join('; ')+'.',meta:this.meta('Published','','R27, Project deck'),
      tbl:{caption:'National targets',cols:['Indicator',{t:'Baseline',num:true},{t:'Target',num:true},{t:'Points to close',num:true},'Status and source'],minW:640,rows:tg.map(x=>({head:x.c[0],cells:[this.cT(x.c[1]+'%',null,true),this.cS(x.c[2]+'%',true),this.cT(x.c[5],'Derived',true),this.cM(this.meta(x.c[4],'',x.c[3]))]}))}}));
    const ps=this.pf(ctx,'PSTA5 budget');S.push(this.cards(st,[ps],6,260));
    return S}

  b7(st,ctx){const D=this.D,S=[],all=D.rows('Frameworks'),hdr=all.find(x=>x.c[0]==='Recommendation');const fw=all.filter(x=>x.r<hdr.r&&isNum(x.c[2])),rc=all.filter(x=>x.r>hdr.r&&x.c[1]&&x.c[0]!=='Share addressed'),sh=all.find(x=>x.c[0]==='Share addressed');
    const fams=[...new Set(rc.map(x=>x.c[1]))],fam=fams.includes(st.fam7)?st.fam7:'All';
    const fmatch=n=>fam==='All'||(fam==='FAO'?/^FAO Toolkit/.test(n):fam==='WASAG'?/WASAG/.test(n):n.includes(fam));
    const names=[...new Set(fw.map(x=>x.c[0]))].filter(fmatch),mods=[...new Set(fw.filter(x=>names.includes(x.c[0])).map(x=>+x.c[2]))].sort((a,b)=>a-b),rf=rc.filter(x=>fam==='All'||x.c[1]===fam),ad=rf.filter(x=>/^Addressed/i.test(x.c[3])).length;
    S.push(this.filters(st,[this.fSel(st,'fam7','Framework family',[['All','All framework families'],...fams.map(x=>[x,x])])],`${fam==='All'?'All framework families':fam} · ${names.length} framework${names.length===1?'':'s'} · ${rf.length} recommendations`,['fam7']));
    S.push(this.cards(st,[fam==='All'?this.F(ctx,{sheet:'Frameworks',r:sh.r,col:3,label:'Recommendations addressed (project assessment)',pct100:true,status:'Derived',note:`Share of the ${rc.length} recommendations below marked “Addressed”.`}):this.F(ctx,{raw:`${ad} of ${rf.length}`,label:`${fam} recommendations addressed`,status:'Derived',note:'Counted from the recommendations table below (project assessment).'})],4,260));
    S.push(this.head(st,'Which module serves each framework',D.cell('Frameworks',2,0)));
    S.push(this.table(st,{caption:'Framework by module',cols:['Framework',...mods.map(m=>`M${m} ${TN[m][0]}`)],minW:Math.max(640,200+mods.length*120),rows:names.map(n=>({head:n,cells:mods.map(m=>{const x=fw.find(y=>y.c[0]===n&&+y.c[2]===m);if(x){this.reg(ctx,`${n} → M${m}`,'Frameworks',x.r,3,x.c[3]);return this.cT(x.c[3])}return this.cT('Not linked')})}))}));
    S.push(this.text(st,names.map(n=>{const x=fw.find(y=>y.c[0]===n);this.reg(ctx,`${n} · description`,'Frameworks',x.r,1,x.c[1]);return {title:n,body:x.c[1],mods:this.modLinks(fw.filter(y=>y.c[0]===n).map(y=>y.c[2]).join(',')),meta:this.meta(x.c[4],'',x.c[1])}}),null,320));
    rf.forEach(x=>this.reg(ctx,`Recommendation · ${x.c[0]}`,'Frameworks',x.r,3,x.c[3]));
    S.push(this.head(st,'Recommendations and how well they are addressed',null));
    S.push(this.table(st,{caption:`Recommendations${fam==='All'?'':': '+fam}`,cols:['Recommendation','Framework family','Modules','Status (project assessment)'],minW:640,rows:rf.map(x=>({head:x.c[0],cells:[this.cT(x.c[1]),this.cMods(x.c[2]),this.cS(x.c[3])]}))}));
    return S}

  b8(st,ctx){const D=this.D,S=[],NI={Iron:[3,'mg'],'Vitamin C':[4,'mg'],Protein:[5,'g']},[col,u]=NI[st.nut],vc=st.nut==='Vitamin C',ck=vc&&st.prep8==='cooked';
    const fl=[this.fRad(st,'nut','Nutrient',Object.keys(NI))];if(vc)fl.push(this.fRad(st,'prep8','Preparation',[['raw','Raw'],['cooked','Cooked']]));
    S.push(this.filters(st,fl,`${st.nut} · ${ck?'cooked':'raw'}`,['nut','prep8']));
    const all=D.rows('Nutrients').filter(x=>/Indigenous|Introduced|Reference/.test(x.c[1]));
    S.push(this.head(st,`${st.nut} per 100 g`,D.cell('Nutrients',2,0)));
    let rows;if(!ck){rows=all.map(x=>{this.reg(ctx,`${x.c[0]} · ${st.nut}`,'Nutrients',x.r,col,x.c[col]);return {label:x.c[0],sub:x.c[1],v:+x.c[col],vt:`${x.c[col]} ${u}`,kind:/Introduced/.test(x.c[1])?'intro':/Reference/.test(x.c[1])?'ref':'ind'}}).sort((a,b)=>b.v-a.v)}
    else rows=all.map(x=>{if(/Indigenous/.test(x.c[1])){this.reg(ctx,`${x.c[0]} · vitamin C cooked (high)`,'Nutrients',x.r,7,x.c[7]);this.reg(ctx,`${x.c[0]} · vitamin C cooked (low)`,'Nutrients',x.r,6,x.c[6]);return {label:x.c[0],sub:x.c[1],v:+x.c[7],vt:`${x.c[6]}–${x.c[7]} mg`,kind:'ind'}}return {label:x.c[0],sub:x.c[1],v:null,reason:'No cooked value in the dataset.'}});
    const lgd=[{t:'Indigenous crop',sw:this.sw('#20603D')},{t:'Introduced vegetable',sw:this.sw('#4F4F4F')},...(ck?[]:[{t:'Reference (USDA)',sw:this.sw(`repeating-linear-gradient(45deg, ${P.green} 0 2px, #FFFFFF 2px 6px)`,{border:`2px solid ${P.green}`})}])];
    S.push(...this.chart(st,'nu',{title:`${st.nut} per 100 g edible portion, ${ck?'after cooking (upper end of range)':'raw'}`,sub:ck?'Bars show the high end of the cooked range; the label gives the full range.':'Sorted from highest to lowest. Each label says whether the food is indigenous or introduced.',legend:lgd,el:this.barChart(st,{rows,axis:`${st.nut} (${u} per 100 g)`}),
      summary:ck?all.filter(x=>/Indigenous/.test(x.c[1])).map(x=>`${x.c[0]} ${x.c[6]}–${x.c[7]} mg`).join('; ')+'. Introduced vegetables have no cooked values.':rows.slice(0,3).map(r=>`${r.label} ${r.vt}`).join(', ')+` are highest; ${rows[rows.length-1].label} is lowest (${rows[rows.length-1].vt}).`,meta:this.meta('Published (to verify)','C','Project deck'),note:ck?D.rows('Nutrients').filter(x=>/^Vitamin C loss/.test(x.c[0])).map(x=>x.c[0]).join(' '):'Reference row: '+(all.find(x=>/Reference/.test(x.c[1]))||{c:['']}).c[0]+' (R36, Published).',
      tbl:{caption:`${st.nut} per 100 g, ${ck?'cooked':'raw'}`,cols:['Food','Type',{t:`${st.nut} (${u})`,num:true},'Status and source'],minW:600,rows:all.map(x=>({head:x.c[0],cells:[this.cT(x.c[1]),ck?(/Indigenous/.test(x.c[1])?this.cS(`${x.c[6]}–${x.c[7]}`,true):this.cN('No cooked value in the dataset.')):this.cS(x.c[col],true),this.cM(this.meta(x.c[9],/Reference/.test(x.c[1])?'':'C',x.c[8]))]}))}}));
    if(st.nut==='Iron'&&!ck){const x=D.find('Nutrients',c=>/^Check: inyabutongo iron vs USDA/.test(c[0]));if(x)S.push(this.cards(st,[this.F(ctx,{sheet:'Nutrients',r:x.r,col:3,label:'Inyabutongo iron compared with USDA amaranth leaves',suffix:' times',status:x.c[9]||'Derived'})],6,260))}
    const ns=D.rows('Nutrient_score',5);ns.forEach(x=>this.reg(ctx,`${x.c[0]} nutrient score`,'Nutrient_score',x.r,4,x.c[4]));const kind=n=>(D.find('Nutrients',c=>c[0]===n)||{c:['','']}).c[1];
    S.push(this.head(st,'Nutrient score',D.cell('Nutrient_score',2,0)));
    S.push(...this.chart(st,'ns',{title:'Nutrient score out of 100',sub:'Iron, vitamin C and protein against daily values. Preliminary.',legend:[{t:'Indigenous crop',sw:this.sw('#20603D')},{t:'Introduced vegetable',sw:this.sw('#4F4F4F')}],el:this.barChart(st,{rows:ns.map(x=>({label:x.c[0],sub:kind(x.c[0]),v:+x.c[4],vt:x.c[4],kind:/Introduced/.test(kind(x.c[0]))?'intro':'ind'})).sort((a,b)=>b.v-a.v),max:50,axis:'Score (0 to 100)'}),summary:ns.map(x=>`${x.c[0]} ${x.c[4]}`).join('; ')+'.',meta:this.meta('Derived'),
      tbl:{caption:'Nutrient score',cols:['Food',{t:'Iron (mg)',num:true},{t:'Vitamin C (mg)',num:true},{t:'Protein (g)',num:true},{t:'Score',num:true}],rows:ns.map(x=>({head:x.c[0],cells:[this.cT(x.c[1],null,true),this.cT(x.c[2],null,true),this.cT(x.c[3],null,true),this.cS(x.c[4],true)]}))}}));
    return S}

  b9(st,ctx){const D=this.D,S=[],rw=st.lang==='rw',all=D.rows('Practice_steps').filter(x=>x.c[0]===st.crop9),hasRw=all.some(x=>x.c[5]),cr=this.cropRow(st.crop9),c=cr.c;
    const stepOpts=[['All','All steps'],...all.map(x=>[String(x.c[1]),`${x.c[1]}. ${rw&&x.c[3]?x.c[3]:x.c[2]}`])],sel=stepOpts.some(o=>o[0]===st.step9)?st.step9:'All';
    S.push(this.filters(st,[this.fSel(st,'crop9','Crop',D.CN),this.fSel({...st,step9:sel},'step9',rw?'Intambwe':'Show step',stepOpts)],`${st.crop9} · ${sel==='All'?'all nine steps':'step '+sel}`,['crop9','step9']));
    const ck=all.find(x=>String(x.c[1])==='8');if(ck){const u=rw&&!!ck.c[5];this.reg(ctx,`${st.crop9} · safety (cooking step)`,'Practice_steps',ck.r,u?5:4,u?ck.c[5]:ck.c[4]);S.push(this.notice(st,'warn',rw?'Umutekano mbere':'Safety first',u?ck.c[5]:ck.c[4]))}
    [5,6,7,8,9,10].forEach(i=>this.reg(ctx,`${st.crop9} · ${D.cell('Crops',4,i)}`,'Crops',cr.r,i,c[i]));
    S.push(this.cards(st,[this.F(ctx,{raw:`${c[5]}–${c[6]} days`,label:`To first harvest · ${c[1]}`,geo:/perennial/i.test(c[7])?'Perennial':`${c[7]}–${c[8]} cuts per season`,status:c[15],src:c[14]}),this.F(ctx,{raw:c[9]===c[10]?`${c[9]} kg/m²`:`${c[9]}–${c[10]} kg/m²`,label:'Published yield',geo:'per season',status:c[15],src:c[14]})],null,260));
    if(rw&&!hasRw)S.push(this.notice(st,'info','Kinyarwanda translation not available yet',`The step titles are in Kinyarwanda. The step text for ${st.crop9} is shown in English until a translation is added.`));
    S.push(this.head(st,`${rw?'Intambwe ku yindi':'Step by step'}: ${st.crop9}`,D.cell('Practice_steps',2,0)));
    const steps=all.filter(x=>sel==='All'||String(x.c[1])===sel);
    S.push(this.sec(st,{isSteps:true,items:steps.map(x=>{const useRw=rw&&!!x.c[5];this.reg(ctx,`${st.crop9} step ${x.c[1]} · ${x.c[2]}`,'Practice_steps',x.r,useRw?5:4,useRw?x.c[5]:x.c[4]);return {n:x.c[1],title:rw&&x.c[3]?x.c[3]:x.c[2],tlang:rw&&x.c[3]?'rw':'en',body:useRw?x.c[5]:x.c[4],blang:useRw?'rw':'en',hasNote:rw&&!x.c[5],note:'Kinyarwanda translation not available yet.',meta:this.meta(x.c[6],'',x.c[4])}})}));
    const T=(a,b)=>rw&&b?b:a;
    S.push(this.head(st,T('When to plant','Igihe cyo guhinga'),T('Rwanda has two rainy seasons, and June to August is much drier (R70). Sow at the start of each rainy season; in the dry months water regularly. Ask your RAB extension worker for local dates.','U Rwanda rufite ibihe bibiri by’imvura, kandi Kamena–Kanama harumagara. Hinga mu ntangiriro y’imvura.')));
    S.push(this.head(st,T('Three simple ways to cook','Uburyo butatu bworoshye bwo guteka'),null));
    S.push(this.text(st,[["Quick sauté","Fry chopped onion in a little oil, add tomato, then the greens. Cover and steam for 3–5 minutes.","Gukaranga vuba","Karanga igitunguru mu mavuta make, ushyiremo inyanya n’amababi. Garagaza iminota 3–5."],["Greens with groundnut paste","Blanch the leaves for 2 minutes, stir in groundnut paste and simmer 5 minutes. Softens bitterness.","Amababi n’ubunyobwa","Yogoshe amababi iminota 2, ushyiremo ubunyobwa uteke iminota 5."],["Two-leaf mix","Cook two kinds of greens together with onion for more variety.","Imboga ebyiri hamwe","Teka imboga ebyiri hamwe n’igitunguru."]].map(r=>({title:T(r[0],r[2]),tlang:rw?'rw':'en',body:T(r[1],r[3]),blang:rw?'rw':'en'})),null,240,{note:T('Household cooking ideas, to be reviewed by nutritionists before release.','Inama zo guteka zizasuzumwa n’abahanga mu mirire.')}));
    S.push(this.head(st,T('Common questions','Ibibazo bikunze kubazwa'),null));
    S.push(this.sec(st,{isFaq:true,items:[["Can I eat it raw?","No. Always cook these leaves and berries.","Nshobora kubirya bibisi?","Oya. Buri gihe ubiteke."],["How do I keep the vitamins?","Cook briefly: steaming or blanching, under 10 minutes, and keep the cooking water.","Nabika nte vitamini?","Teka igihe gito ku ruhumuro."],["Why is my harvest small?","Check the garden planner in Module 3: spacing, manure, water, weeding and cutting method all matter.","Kuki umusaruro ari muke?","Reba ibisobanuro bya M3."]].map(q=>({q:T(q[0],q[2]),a:T(q[1],q[3]),lang:rw?'rw':'en'}))}));
    S.push(this.head(st,T('Join the seed network','Injira mu muryango w’imbuto'),null));
    S.push(this.text(st,[{body:T('Farmers, cooperatives and RAB stations who keep seed of these crops, and older knowledge holders, will be listed here at sector level once consent is recorded. Nothing is shown until people agree.','Abahinzi, amakoperative n’abafite ubumenyi bazashyirwa hano nyuma yo kwemera.'),blang:rw?'rw':'en'}],null,600));
    S.push(this.head(st,'Seed sources and knowledge holders',null));
    S.push(this.nodata(st,'Seed sources and seed network','Seed sources have not been collected yet.',6));
    S.push(this.nodata(st,'Knowledge holders','Community knowledge holders have not been recorded yet.',6));
    return S}

  b10(st,ctx){const D=this.D,S=[],rw=st.lang==='rw';
    S.push(this.head(st,'Glossary',null));
    const gl=D.rows('Glossary');gl.forEach(x=>this.reg(ctx,`Glossary · ${x.c[0]}`,'Glossary',x.r,rw?2:1,x.c[rw?2:1]));
    S.push(this.sec(st,{isGloss:true,row:{display:'grid',gridTemplateColumns:st.w<640?'1fr':'240px minmax(0,1fr)',gap:'4px 24px',padding:'16px 0',borderBottom:`1px solid ${P.line}`},items:gl.map(x=>({t:x.c[0],d:rw&&x.c[2]?x.c[2]:x.c[1],lang:rw&&x.c[2]?'rw':'en'}))}));
    S.push(this.head(st,'Test yourself','Choose an answer, then check it.'));
    const qz=D.rows('Quiz');qz.forEach(x=>this.reg(ctx,`Quiz ${x.c[0]}`,'Quiz',x.r,1,x.c[1]));
    S.push(this.sec(st,{isQuiz:true,items:qz.map(x=>{const i=x.c[0],sel=st.qsel[i],done=!!st.qdone[i],ok=done&&String(sel+1)===String(x.c[5]);
      return {n:i,q:x.c[1],label:`${i}. ${x.c[1]}`,name:this.uid+'q'+i,opts:[2,3,4].map((c,j)=>{const on=sel===j,isC=done&&String(j+1)===String(x.c[5]);return {t:x.c[c],on,pick:()=>this.setState(s=>({qsel:{...s.qsel,[i]:j},qdone:{...s.qdone,[i]:false}})),style:{display:'flex',alignItems:'center',gap:12,minHeight:44,padding:'8px 12px',border:`2px solid ${isC?P.green:on?P.ink:P.line}`,borderRadius:2,background:isC?P.chip:P.card,fontSize:16,cursor:'pointer',fontWeight:on?700:400}}}),
        check:()=>{if(sel===undefined)return;this.setState(s=>({qdone:{...s.qdone,[i]:true}}))},done:done&&sel!==undefined,resT:ok?'Correct.':'Not quite.',expl:x.c[6],resStyle:{margin:0,padding:'12px 16px',borderRadius:2,border:`2px solid ${ok?P.green:P.orange}`,background:P.card,fontSize:16,lineHeight:1.4}}})}));
    const src=Object.values(D.src),grades=[...new Set(src.map(s=>s.grade))].sort();
    S.push(this.head(st,'Sources',`All ${src.length} sources cited in the tool. ${D.find('Sources',c=>/^Each ID/.test(c[0]),2).c[0]}`));
    const qy=st.srcQ.trim().toLowerCase(),fs=src.filter(s=>(st.srcG==='All'||s.grade===st.srcG)&&(!qy||(s.id+' '+s.title+' '+s.pub).toLowerCase().includes(qy)));
    S.push(this.filters(st,[this.fTxt(st,'srcQ','Search sources','Search by ID, title or publisher.'),this.fSel(st,'srcG','Evidence grade',['All',...grades])],`${fs.length} of ${src.length} sources${st.srcG==='All'?'':' · grade '+st.srcG}${qy?' · “'+st.srcQ+'”':''}`,['srcQ','srcG'],'Find a source'));
    if(!fs.length)S.push(this.nodata(st,null,'No sources match this search. Try another word or reset the filters.'));
    else S.push(this.table(st,{caption:'Sources',cols:['ID','Title and publisher',{t:'Year',num:true},'Grade','Link'],minW:760,rows:fs.map(s=>({head:s.id,id:this.uid+'src-'+s.id,hl:st.srcHi===s.id,cells:[this.cT(s.title,s.pub),this.cT(s.year,null,true),this.cS(s.grade),this.cL('Open source',s.link)]}))}));
    return S}

  /* ---------- special views ---------- */
  compView(st){const D=this.D,S=[],ctx={reg:[]},sd={};D.sd.forEach(x=>sd[x.c[0]]=x);
    S.push(this.head(st,'“No data yet” component','One component, five variants. It is neutral (not an error colour), always has text, and gives a plain-language reason.'));
    S.push(this.nodata(st,'Card variant','District anaemia values are not yet published.',6));
    S.push(this.cards(st,[this.F(ctx,{raw:'',label:'Plants per m², Isogi',reason:'Plant density is not in the sources yet.',status:'Published (to verify)',src:'R51b'}),this.F(ctx,{raw:'26.8',unit:'%',label:'Inline variant inside a figure card',geo:'Rwanda, 2025',extraK:'Province and district values',extraR:'Only a national value is published.',status:'Published',grade:'B',src:'R01'})],6,240));
    S.push(...this.chart(st,'cmpnd',{title:'Chart variant: iron after cooking',sub:'When a whole chart has no data, the chart area is replaced.',nd:true,ndReason:'No cooked iron values in the dataset.',meta:this.meta('Published (to verify)','C','Project deck')},6));
    S.push(...this.chart(st,'cmprow',{title:'Chart variant: row level',sub:'Single rows without data keep their place in the chart.',el:this.barChart(st,{rows:[{label:'Inyabutongo',v:7.68,vt:'0.64–7.68 mg'},{label:'Cabbage',sub:'Introduced vegetable',v:null,reason:'No cooked value in the dataset.'}],max:10,axis:'Vitamin C after cooking (mg per 100 g)'}),meta:this.meta('Published (to verify)','C','Project deck')},6));
    S.push(this.table(st,{caption:'Table cell variant',cols:['Crop',{t:'Plants per m²',num:true},{t:'Labour (h/m²)',num:true}],rows:[{head:'Isogo',cells:[this.cS('10',true),this.cN('Labour has not been measured.')]},{head:'Isogi',cells:[this.cN('Plant density is not in the sources yet.'),this.cN('Labour has not been measured.')]}],note:'In tables the cell always reads “No data yet”, never “pending”, a dash or blank. The reason is read out by screen readers and shown on hover.'},6));
    S.push(...this.mapSec(st,'cmpmap',{title:'Map variant',sub:'Districts without data are hatched, left out of the colour scale, and say “No published data” on hover.',legend:[this.lg('Published value',this.sw(P.green2)),this.lgNd()],el:this.mapSvg(st,{k:'cm',aria:'Example map',fill:n=>sd[n]?P.green2:null,label:()=>null,tip:n=>sd[n]?n:`${n}: No published data`}),detail:{kicker:'Selected district',title:'Huye',sub:'Southern Province',rows:[this.dRow('Stunting, 2025','',{reason:'2025 value not yet published.'})],meta:NOMETA},tbl:{caption:'—',cols:['District','Value'],rows:[]}},12));
    S.push(this.head(st,'Status badges',D.readme('Status key')));
    S.push(this.text(st,['pub','ver','der','mod','con','nd'].map(k=>{const b=this.badge(k);return {title:b.t,body:b.def,meta:{st:b,hasGrade:false,grade:'',srcs:[]}}}),null,240));
    S.push(this.head(st,'Figure metadata',null));
    S.push(this.cards(st,[this.pf(ctx,'Child stunting by district','Gicumbi, 2025'),this.pf(ctx,'Annual cost in francs')],8,240));
    S.push(this.head(st,'Notices',null));
    S.push(this.notice(st,'model','Hypothesis map: model output, not observations',D.readme('Caution')));
    S.push(this.notice(st,'info','Kinyarwanda translation not available yet','The step text is shown in English until a translation is added.'));
    S.push(this.head(st,'Form error pattern','Error summary at the top, inline message, thicker border. Try “Calculate harvest” with an empty area.'));
    S.push(this.planner(st,ctx));
    return S}
  mappingView(st){const D=this.D,S=[],ctx={reg:[]},d=this.defaults(),base={...st,...d,tbl:{},open:{},qsel:{},qdone:{},srcQ:'',srcG:'All',plRes:null};
    for(let m=0;m<=10;m++){const vs=[{}];
      if(m===1)D.CN.forEach(c=>{vs.push({crop1:c});vs.push({crop1:c,prep1:'cooked'})});
      if(m===2){D.sd.forEach(x=>vs.push({hv2:'district',dist2:x.c[0]}));D.rows('Stunting_breakdown_2025').forEach(x=>vs.push({hv2:x.c[0],cat2:x.c[1]}));D.rows('Stunting_trend').filter(x=>/^\d{4}$/.test(x.c[0])).forEach(x=>vs.push({hv2:'trend',yr2:x.c[0]}))}
      if(m===4){['All four',...D.CN].forEach(c=>['today','2050s'].forEach(p=>vs.push({crop4:c,per4:p})));D.DN.forEach(n=>vs.push({dist4:n}))}
      if(m===8){['Iron','Vitamin C','Protein'].forEach(n=>vs.push({nut:n}));vs.push({nut:'Vitamin C',prep8:'cooked'})}
      if(m===9)D.CN.forEach(c=>vs.push({crop9:c}));
      if(m===0)D.rows('Facts').forEach((x,i)=>vs.push({fact:i}));
      if(m===3)D.CN.forEach(c=>vs.push({plRes:{crop:c,dist:d.plDist,area:'20',p:3,v:'–'}}));
      vs.forEach(v=>{ctx.mod=m;this.build(m,{...base,...v,mod:m},ctx)})}
    const seen={},by={};ctx.reg.forEach(e=>{const k=e.mod+'|'+e.sheet+'|'+e.cell;if(seen[k])return;seen[k]=1;(by[e.mod]=by[e.mod]||[]).push(e)});
    const total=Object.values(by).reduce((a,b)=>a+b.length,0);
    S.push(this.notice(st,'info','How to use this note',`Every value the dashboard shows is listed below with the sheet and cell it is read from in Indigenous_Crops_Tool_Dataset_Final.xlsx. The list is generated by the same code that draws the dashboard, across every filter option, so it cannot drift from the screen. ${total} references in total.`));
    S.push(this.head(st,'Rules applied',null));
    S.push(this.table(st,{caption:'Rules applied to the dataset',cols:['Rule','How it is applied'],minW:640,rows:[
      ['Values','Shown exactly as stored. Only thousands separators and units are added. Two stored fractions are shown as percentages: Cost_of_hunger!B7 (0.115 → 11.5%) and Frameworks!D33 (0.625 → 62.5%).'],
      ['Missing values','Empty or “pending” cells show the “No data yet” component with a reason. No zeros, dashes or estimates.'],
      ['Filters','Built from the sheet that feeds each view. District filter in Module 2 lists only the 15 districts in Stunting_district_2025. Cooked is offered in Module 8 only for vitamin C.'],
      ['Status','Read from each row’s Status column. Rows without one (Suitability_model, Species_limits, Priority_districts) use Model or Derived as the README defines.'],
      ['Evidence grade','From the row’s Grade column where present (Health_indicators, Published_figures). Otherwise from the Sources sheet grade of the cited ID. “Project deck” figures use Grade C, as in Published_figures.'],
      ['Calculated in the tool','Average-of-range labels, 2050s suitability bands (rule in Suitability_model!A2), the garden planner (formula in Yield_inputs!A12) and chart summaries. All are labelled Derived.']].map(r=>({head:r[0],cells:[this.cT(r[1])]}))}));
    S.push(this.head(st,'Issues for the data team',null));
    const chk=D.find('Nutrients',c=>/vs cabbage/.test(c[0]));
    S.push(this.table(st,{caption:'Points to check in the dataset',cols:['Where','Issue','What the tool does'],minW:760,rows:[
      chk?{head:`Nutrients!D${chk.r}`,cells:[this.cT(`“${chk.c[0]}” = ${chk.c[3]}, but 8.9 ÷ 0.47 = 18.9. Facts row 6 says “about 19 times”. 29.7 matches 8.9 ÷ 0.3 (banana, carrot or isogo).`),this.cT('Not shown. The Facts text is shown as written.')]}:null,
      {head:'Districts!F5:F34',cells:[this.cT('NISR codes are “to add”.'),this.cT('No code column is shown.')]},
      {head:'Policies (kitchen garden)',cells:[this.cT('Period is “to confirm”. “In practice” mentions recipes, which are not in the dataset.'),this.cT('Shown as “To confirm”. Recipe content removed.')]},
      {head:'Suitability_model',cols:null,cells:[this.cT('Climate values need checking; soil pH is estimated (README caution).'),this.cT('Tagged “to check” and “estimated” in the district panel, under a hypothesis-map notice.')]},
      {head:'Practice_steps, column F',cells:[this.cT('Kinyarwanda text exists for Inyabutongo only.'),this.cT('Other crops show the English text with a “translation not available yet” note.')]},
      {head:'Yield_inputs!A12 (planner)',cells:[this.cT('The formula divides by 6 good practices, but the dataset does not name them.'),this.cT('The tool uses steps 1–6 of the growing guide (Practice_steps) and says so on screen. Please confirm.')]},
      {head:'Sources, column E',cells:[this.cT('Some links may move or break over time; the tool cannot check them live.'),this.cT('Each source also has a “Search for this title” link. Please check the links before release.')]},
      {head:'Stunting_district_2025',cells:[this.cT('15 districts have no published 2025 value.'),this.cT('Hatched on the map, excluded from filters and colour scale.')]}].filter(Boolean)}));
    const ranges=rs=>{rs=[...new Set(rs)].sort((a,b)=>a-b);const out=[];let s=rs[0],p=rs[0];for(let i=1;i<=rs.length;i++){if(rs[i]===p+1){p=rs[i];continue}out.push(s===p?String(s):s+'–'+p);s=p=rs[i]}return out.join(', ')};
    Object.keys(by).sort((a,b)=>a-b).forEach(m=>{const g={};by[m].forEach(e=>{const k=e.sheet+'|'+e.col;(g[k]=g[k]||{sheet:e.sheet,col:e.col,rows:[],labels:[]});g[k].rows.push(e.r);if(g[k].labels.length<3&&!g[k].labels.includes(e.label))g[k].labels.push(e.label)});
      const list=Object.values(g).sort((a,b)=>a.sheet<b.sheet?-1:a.sheet>b.sheet?1:a.col-b.col);
      S.push(this.head(st,`Module ${m}: ${TN[m][0]}`,`${by[m].length} cell references in ${list.length} groups`,3));
      S.push(this.table(st,{caption:`Module ${m}: on-screen figures by sheet and column`,cols:['Sheet','Column','Rows used','Examples on screen',{t:'Cells',num:true}],minW:900,rows:list.map(x=>{const hd=D.cell(x.sheet,4,x.col);return {head:x.sheet,cells:[this.cS(colName(x.col)+(hd&&hd.length<48?' · '+hd:'')),this.cT(ranges(x.rows)),this.cT(x.labels.join('; ')+(new Set(x.rows).size>x.labels.length?'; …':'')),this.cT(String(new Set(x.rows).size),null,true)]}})}))});
    return S}

  /* ---------- navigation ---------- */
  go(m){this.setState({mod:m,menu:false},()=>setTimeout(()=>{this.scrollTo(0);const h=this.root&&this.root.querySelector('h1');h&&h.focus({preventScroll:true})},50))}
  goSource(id){this.setState({mod:10,srcHi:id,srcQ:'',srcG:'All',menu:false},()=>setTimeout(()=>{const el=this.root&&this.root.querySelector('#'+this.uid+'src-'+id);if(el)this.scrollTo(el,120)},80))}

  renderVals(){Object.assign(P,this.state.dark?PD:PL);const st=this.state,P0=this.props,view=P0.view||'app',w=st.w,desk=w>=1024,mob=w<640,pad=mob?16:32,rw=st.lang==='rw',t=(a,b)=>rw&&b?b:a;
    const fh=P0.frameHeight||'100vh';
    const side=mob?16:w<1024?32:Math.min(80,Math.round(w*0.04)),cont={width:`min(1280px, calc(100% - ${2*side}px))`,margin:'0 auto'};
    const shell={bar:{...cont,height:72,display:'flex',alignItems:'center',gap:mob?12:24},grid:{display:'block'},main:{minWidth:0,outline:'none',display:'block'},pbody:{...cont,padding:'8px 0 0',position:'relative'},hero:{...cont,padding:`${mob?32:56}px 0 ${mob?96:150}px`,position:'relative',zIndex:1,display:'flex',flexDirection:'column',gap:20},foot:{...cont,padding:`${mob?24:48}px 0 24px`,display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,260px),1fr))',gap:32},foot2:{...cont,padding:'16px 0 24px',display:'flex',flexWrap:'wrap',justifyContent:'space-between',gap:'8px 24px',fontSize:12,lineHeight:'18px',color:'#FFFFFF'}};
    const deco=(hd,hero)=>Object.assign(hd,{isHero:hero,notHero:!hero});
    const showNav=view==='app';
    const navGroups=[];const cmp=!mob&&w>=1200;const tabsStyle={listStyle:'none',margin:'0 auto',padding:mob?'0 4px':0,display:'flex',overflowX:cmp?'visible':'auto',scrollbarWidth:'none',...(mob?{}:{width:'min(1400px, calc(100% - 32px))'})};
    const tabs=ORDER.map(m=>{const on=st.mod===m;return {href:'#m'+m,cur:on?'page':undefined,go:e=>{e.preventDefault();this.go(m)},t:t(TN[m][0],TN[m][1]),icon:ico(MICON[m],24,{color:on?P.green:P.mut,filled:on,inner:'#FFFFFF'}),li:cmp?{flex:'1 1 0',minWidth:0,display:'flex'}:{flex:'none',display:'flex'},style:cmp?{flex:1,minWidth:0,display:'flex',flexDirection:'column',alignItems:'center',gap:6,padding:'12px 4px 10px',textDecoration:'none',borderBottom:`4px solid ${on?P.green:'transparent'}`,color:on?P.green:P.mut,textAlign:'center'}:{display:'flex',alignItems:'center',gap:8,padding:'0 16px',height:52,textDecoration:'none',borderBottom:`4px solid ${on?P.green:'transparent'}`,color:on?P.green:P.mut,whiteSpace:'nowrap'},lstyle:{fontSize:cmp?13:14,lineHeight:cmp?'16px':'24px',fontWeight:on?700:600,overflowWrap:'anywhere'}}});
    const langs=[['en','EN','English'],['rw','RW','Kinyarwanda'],['fr','FR','Français']].map(([v,l,title],i)=>{const on=st.lang===v,dis=false;return {code:v,t:l,title,on,dis,pick:()=>this.setState({lang:v},()=>this.applyLang()),style:{height:mob?44:36,minWidth:44,padding:'0 10px',display:'inline-flex',alignItems:'center',justifyContent:'center',border:'1px solid '+(dis?P.line:P.green),marginLeft:i?-1:0,background:dis?P.track:on?'#20603D':P.card,color:dis?P.mut:on?'#FFFFFF':P.green,fontFamily:'inherit',fontSize:14,fontWeight:600,cursor:dis?'not-allowed':'pointer',borderRadius:i===0?'2px 0 0 2px':i===2?'0 2px 2px 0':0}}});
    const ic={logo:ico('logo',22,{color:'#FFFFFF',filled:true,inner:'#20603D'}),menu:ico(st.menu?'uClose':'uMenu',22,{color:P.green}),shield:ico('shield',24,{color:P.ink}),home16:ico('mStart',16,{color:P.green}),chevR16:ico('uChevR',16,{color:P.mut}),arrow:ico('uArrowR',20,{color:P.green2}),info16:ico('uInfo',16,{color:P.ink})};
    const home=st.mod===0,MI=home?'terraces':(MODIMG[st.mod]||'terraces'),base={navGap:{height:mob?'max(120px, calc(45vh - 160px))':'max(160px, calc(50vh - 160px))'},homeView:true,notHome:!home,modImgAlt:'Photo: Rwandan farmland',liftRef:el=>{this.liftEl=el},liftStyle:home?{}:{position:'relative',padding:mob?'24px 0 56px':'48px 0 72px'},modImgStyle:{position:'absolute',top:mob?'calc(-1 * (max(120px, calc(45vh - 160px)) + 90px))':'calc(-1 * (max(160px, calc(50vh - 160px)) + 90px))',left:'50%',width:'100vw',marginLeft:'-50vw',bottom:0,zIndex:-1,pointerEvents:'none',backgroundImage:`linear-gradient(180deg, rgba(10,22,16,0.5) 0%, rgba(10,22,16,0.5) 100%), url("${IMG(MI)}")`,backgroundSize:'cover',backgroundPosition:'center 45%'},homeImgStyle:{position:'absolute',inset:0,backgroundImage:`url("${IMG(MI)}")`,backgroundSize:'cover',backgroundPosition:'center'},homeBgBox:{position:'absolute',left:0,top:0,width:'100%',height:home?'min(1250px, 150vh)':(st.bgH||420),zIndex:0,pointerEvents:'none',overflow:'hidden'},
      hdrStyle:true?{position:'relative',zIndex:40,background:'linear-gradient(180deg, var(--bg) 0%, rgba(14,27,20,0) 100%)'}:{position:'sticky',top:0,zIndex:40,background:'var(--card)',borderBottom:'1px solid var(--line)'},
      navStyle:true?{position:'sticky',top:0,zIndex:35,background:st.stuck?'#173D2A':'transparent',boxShadow:st.stuck?'0 2px 10px rgba(0,0,0,0.3)':'none',transition:'background .2s',borderBottom:'1px solid rgba(255,255,255,0.18)'}:{position:'sticky',top:72,zIndex:35,background:'var(--card)',borderBottom:'1px solid var(--line)',boxShadow:'0 2px 6px rgba(0,15,20,0.06)'},
      dark:st.dark,darkAria:st.dark?'true':'false',toggleDark:()=>this.setState(s=>({dark:!s.dark})),darkTrack:{position:'relative',display:'inline-block',width:44,height:24,borderRadius:12,background:st.dark?'#6CCB94':'rgba(255,255,255,0.35)',border:'1px solid rgba(255,255,255,0.6)',transition:'background .15s'},darkKnob:{position:'absolute',top:2,left:st.dark?22:2,width:18,height:18,borderRadius:'50%',background:'#FFFFFF',transition:'left .15s'},rootRef:this.rootRef,scRef:this.scRef,h1Ref:this.h1Ref,langCode:rw?'rw':'en',lang:st.lang,frame:{height:fh,overflowY:fh==='auto'?'visible':'auto',position:'relative'},shell,desk:desk&&showNav,notDesk:!desk&&showNav,menu:st.menu,menuLabel:st.menu?'Close':'Menu',toggleMenu:()=>this.setState({menu:!st.menu}),showMobileNav:!desk&&st.menu&&showNav,navGroups,tabs,tabsStyle,langs,ic,ids:{mnav:this.uid+'mnav',h1:this.uid+'h1'},prog:{bar:{display:'block',height:'100%',width:((ORDER.indexOf(st.mod)+1)/ORDER.length*100)+'%',background:'linear-gradient(90deg,#D9A520,#20603D)',borderRadius:2},t:`${t('Progress','Aho ugeze')} ${ORDER.indexOf(st.mod)+1} / ${ORDER.length}`},
      skipMain:e=>{e.preventDefault();const m=this.root&&this.root.querySelector('main');m&&m.focus()},goHome:e=>{e.preventDefault();this.go(0)},goSources:e=>{e.preventDefault();this.go(10)},
      banner:{t:t('Evidence you can trust.','Ibimenyetso wizera.'),b:t('Every figure carries a source ID (R01…). What is not yet published appears as a clearly marked gap; nothing is invented, and calculated values are labelled.','Buri gipimo gifite nomero y’isoko (R01…). Ibitaratangazwa bigaragazwa nk’icyuho; nta kintu cyahimbwe, kandi ibibarwa birabivugwa.')},
      rwNote:rw,rwNoteText:'Ibisobanuro bya Kinyarwanda ni igeragezwa; bisaba gusuzumwa n’umunyabumenyi w’ururimi. (Kinyarwanda text is a draft and needs review.)',
      loading:!st.ready&&!st.err,failed:!!st.err,errText:st.err||'',ready:st.ready,stKey:['pub','ver','der','mod','con','nd'].map(k=>this.badge(k)),
      footKey:['pub','ver','der','mod','con','nd'].map(k=>{const b=this.badge(k);return {...b,style:{...b.style,background:k==='pub'||k==='ver'?b.style.background:'#FFFFFF'}}}),footGrades:[],footSrc:'All sources are listed in Sources',
      hd:{eyebrow:'',h1:'',h1Lang:'en',lede:'',hasLede:false,ledeLang:'en',obj:[],hasObj:false,objLabel:'',showKey:false,showBanner:false,band:{},inner:{},h1Style:{},hasBtns:false,b1:null,b2:null,isHero:false,notHero:true,icon:null,hasCrumb:false,crumbGroup:'',crumbT:''},sections:[],hasPager:false,pager:{hasPrev:false,hasNext:false,prev:null,next:null,prevT:'',nextT:'',prevHref:'#',nextHref:'#'}};
    if(!st.ready)return base;
    const D=this.D;
    const sg=D.find('Sources',c=>/^Each ID/.test(c[0]),2);base.footGrades=sg?(sg.c[0].split(/Grade:\s*/)[1]||'').split(';').map(x=>x.trim().replace(/\.$/,'')).filter(x=>/^[A-Z] /.test(x)).map(x=>({k:x[0],v:x.slice(2)})):[];base.footSrc=`All ${Object.keys(D.src).length} sources are listed in Sources`;
    if(view==='components'){base.hd={...base.hd,eyebrow:'Design deliverable',h1:'Component sheet',hasLede:true,lede:'The reusable parts of the dashboard, shown with real dataset values.',showKey:true,showBanner:false,band:{},inner:{},h1Style:{},hasBtns:false,b1:null,b2:null};base.sections=this.compView(st);deco(base.hd,false);Object.assign(base.hd,{icon:ico('mLearn',32,{color:P.green}),hasCrumb:true,crumbGroup:'Design deliverables',crumbT:'Component sheet'});return base}
    if(view==='mapping'){base.hd={...base.hd,eyebrow:'Design deliverable',h1:'Data-mapping note',hasLede:true,lede:'Each on-screen figure, the sheet it comes from and its cell, so the team can check that nothing was invented.',showKey:false,showBanner:false,band:{},inner:{},h1Style:{},hasBtns:false,b1:null,b2:null};const mk=st.w+'|'+st.lang;if(!this._mv||this._mvk!==mk){this._mv=this.mappingView(st);this._mvk=mk}base.sections=this._mv;deco(base.hd,false);Object.assign(base.hd,{icon:ico('mLearn',32,{color:P.green}),hasCrumb:true,crumbGroup:'Design deliverables',crumbT:'Data-mapping note'});return base}
    const m=st.mod,grp=GROUPS.find(g=>g[2].includes(m)),ch=D.chap(m);
    base.hd={eyebrow:m===0?t('Begin','Tangira'):`${t('Module','Igice')} ${m} · ${t(grp[0],grp[1])}`,h1:m===0?'Rwanda’s indigenous crops: national knowledge tool':(ch?(rw&&ch.c[3]?ch.c[3]:ch.c[2]):TN[m][0]),h1Lang:m!==0&&rw&&ch&&ch.c[3]?'rw':'en',
      lede:m===0?(D.chap(10)?D.chap(10).c[4].split('. ')[0]+'.':''):(ch?ch.c[4]:''),hasLede:true,ledeLang:'en',objLabel:t('In this module you can:','Muri iki gice ushobora:'),obj:ch&&m!==0?String(ch.c[5]).split(/;\s*/).map(x=>({t:x})):[],hasObj:!!(ch&&m!==0),showKey:true,showBanner:true,band:{},inner:{},h1Style:{},hasBtns:false,b1:null,b2:null};
    try{base.sections=this.build(m,st,null)}catch(e){console.error('build '+m,e&&e.stack);base.sections=[this.notice(st,'error','There is a problem',String(e&&e.stack||e).slice(0,600))]}
    if(m===4&&st.base4==='sat')setTimeout(()=>this.syncLeaf(),0);
    const oi=ORDER.indexOf(m),pv=ORDER[oi-1],nx=ORDER[oi+1];
    base.hasPager=true;base.pager={hasPrev:pv!==undefined,hasNext:nx!==undefined,prevT:pv!==undefined?t(TN[pv][0],TN[pv][1]):'',nextT:nx!==undefined?t(TN[nx][0],TN[nx][1]):'',prevHref:'#m'+pv,nextHref:'#m'+nx,prev:e=>{e.preventDefault();this.go(pv)},next:e=>{e.preventDefault();this.go(nx)}};
    deco(base.hd,m===0);Object.assign(base.hd,{icon:ico(MICON[m],32,{color:P.green}),hasCrumb:m!==0,crumbGroup:t(grp[0],grp[1]),crumbT:t(TN[m][0],TN[m][1])});if(m===0)Object.assign(base.hd,{hasBtns:true,b1:e=>{e.preventDefault();this.go(1)},b2:e=>{e.preventDefault();this.go(2)}});
    return base}
}
