const MAX_TEXT=20000;
export function xmlToText(xml){
 const doc=new DOMParser().parseFromString(xml,'application/xml');
 if(doc.getElementsByTagName('parsererror').length||/<!DOCTYPE|<!ENTITY/i.test(xml))throw Error('INVALID_DOCX');
 const body=doc.getElementsByTagNameNS('*','body')[0];
 if(!body)throw Error('INVALID_DOCX');
 function plain(node){if(node.nodeType!==1)return '';if(['del','instrText','drawing','pict'].includes(node.localName))return '';if(node.localName==='t')return node.textContent||'';if(node.localName==='tab')return '\t';if(node.localName==='br')return '\n';return [...node.children].map(plain).join('');}
 function excluded(node){for(let parent=node.parentElement;parent&&parent!==body;parent=parent.parentElement)if(['del','drawing','pict'].includes(parent.localName))return true;return false;}
 const result=[...body.getElementsByTagNameNS('*','p')].filter(p=>!excluded(p)).map(plain).join('\n').trim();
 if(!result)throw Error('EMPTY_DOCUMENT');if(result.length>MAX_TEXT)throw Error('DOCUMENT_TOO_LONG');return result;
}
export async function readWord(file){
 if(!file.name.toLowerCase().endsWith('.docx'))throw Error('DOCX_ONLY');
 if(!file.size||file.size>5*1024*1024)throw Error('FILE_SIZE');
 const buffer=await file.arrayBuffer();
 return new Promise((resolve,reject)=>{const worker=new Worker(new URL('./docx-worker.js',import.meta.url),{type:'module'});const stop=()=>{clearTimeout(timer);worker.terminate();};const timer=setTimeout(()=>{stop();reject(Error('DOCUMENT_TIMEOUT'));},5000);worker.onerror=()=>{stop();reject(Error('INVALID_DOCX'));};worker.onmessage=({data})=>{stop();if(data.error){reject(Error(data.error));return;}try{resolve(xmlToText(data.xml));}catch(e){reject(e);}};worker.postMessage(buffer,[buffer]);});
}
