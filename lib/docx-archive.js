import {unzipSync,strFromU8} from 'fflate';
export const MAX_FILE=5*1024*1024,MAX_XML=2*1024*1024,MAX_TEXT=20000;
export function readDocumentXml(bytes){
 if(!(bytes instanceof Uint8Array)||bytes.length<22||bytes.length>MAX_FILE)throw Error('FILE_SIZE');
 let found=0;
 const files=unzipSync(bytes,{filter(file){
  if(file.name!=='word/document.xml')return false;
  if(++found>1||!Number.isSafeInteger(file.originalSize)||file.originalSize<1||file.originalSize>MAX_XML||file.size>MAX_FILE||![0,8].includes(file.compression))throw Error('DOCX_LIMIT');
  return true;
 }});
 const content=files['word/document.xml'];
 if(!content||content.length>MAX_XML)throw Error('INVALID_DOCX');
 const xml=strFromU8(content);
 if(/<!DOCTYPE|<!ENTITY/i.test(xml))throw Error('INVALID_DOCX');
 return xml;
}
