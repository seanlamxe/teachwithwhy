import {readDocumentXml} from './docx-archive.js';
self.onmessage=({data})=>{try{self.postMessage({xml:readDocumentXml(new Uint8Array(data))});}catch{self.postMessage({error:'INVALID_DOCX'});}};
