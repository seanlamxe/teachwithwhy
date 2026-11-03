import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
for(const locale of ['zh','en']){await mkdir(`dist/${locale}`,{recursive:true});let html=await readFile('dist/index.html','utf8');html=html.replace('lang="zh-Hant-HK"',`lang="${locale==='en'?'en':'zh-Hant-HK'}"`);if(locale==='en')html=html.replace('<title>教得有據 · TeachWithWhy</title>','<title>TeachWithWhy · Teacher Workspace</title>');await writeFile(`dist/${locale}/index.html`,html);}
await mkdir('dist/docs',{recursive:true});for(const name of ['user-guide-zh.md','user-guide-en.md'])await copyFile(`docs/${name}`,`dist/docs/${name}`);
console.log('Built /zh/, /en/ and downloadable guides.');
