import {deflateSync} from 'node:zlib';
import {mkdir,writeFile} from 'node:fs/promises';
// Native geometric book/arrow mark; no fonts, CDN or image service required.
const pages=[[[.22,.34],[.45,.39],[.45,.73],[.22,.68]],[[.49,.39],[.72,.34],[.72,.68],[.49,.73]]];
const arrow=[ [.60,.18],[.81,.18],[.81,.39],[.755,.39],[.755,.275],[.59,.44],[.55,.40],[.715,.235],[.60,.235] ];
function inside(x,y,p){let c=false;for(let i=0,j=p.length-1;i<p.length;j=i++){const a=p[i],b=p[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])c=!c;}return c;}
function crc(bytes){let c=0xffffffff;for(const n of bytes){c^=n;for(let i=0;i<8;i++)c=(c>>>1)^((c&1)?0xedb88320:0);}return (c^0xffffffff)>>>0;}
function chunk(type,data){const t=Buffer.from(type),n=Buffer.alloc(4),c=Buffer.alloc(4);n.writeUInt32BE(data.length);c.writeUInt32BE(crc(Buffer.concat([t,data])));return Buffer.concat([n,t,data,c]);}
function png(size){const stride=size*4+1,raw=Buffer.alloc(stride*size),bg=[37,77,66],paper=[246,247,237],accent=[199,218,173];for(let y=0;y<size;y++)for(let x=0;x<size;x++){let rgb=[0,0,0],alpha=0;for(const dx of [.25,.75])for(const dy of [.25,.75]){const u=(x+dx)/size,v=(y+dy)/size,rx=Math.max(.14-u,0,u-.86),ry=Math.max(.14-v,0,v-.86);if(rx*rx+ry*ry>.14*.14)continue;const color=inside(u,v,arrow)?accent:pages.some(p=>inside(u,v,p))?paper:bg;alpha++;for(let i=0;i<3;i++)rgb[i]+=color[i];}const offset=y*stride+x*4+1;for(let i=0;i<3;i++)raw[offset+i]=alpha?Math.round(rgb[i]/alpha):0;raw[offset+3]=Math.round(alpha*255/4);}const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(size);ihdr.writeUInt32BE(size,4);ihdr[8]=8;ihdr[9]=6;return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ihdr),chunk('IDAT',deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]);}
export async function buildAppIcons(){await mkdir('dist/icons',{recursive:true});for(const size of [180,192,512])await writeFile(`dist/icons/app-${size}.png`,png(size));}
