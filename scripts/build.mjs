import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import OpenCC from 'opencc-js';
const cn=OpenCC.Converter({from:'hk',to:'cn'});
for(const locale of ['zh','zh-CN','en']){await mkdir(`dist/${locale}`,{recursive:true});let html=await readFile('dist/index.html','utf8');html=html.replace('lang="zh-Hant-HK"',`lang="${locale==='en'?'en':locale==='zh-CN'?'zh-Hans':'zh-Hant-HK'}"`);if(locale==='en')html=html.replace('<title>教得有據 · TeachWithWhy</title>','<title>TeachWithWhy · Teacher Workspace</title>');if(locale==='zh-CN')html=cn(html);await writeFile(`dist/${locale}/index.html`,html);}
await mkdir('dist/docs',{recursive:true});for(const name of ['user-guide-zh.md','user-guide-zh-CN.md','user-guide-en.md'])await copyFile(`docs/${name}`,`dist/docs/${name}`);
await mkdir('dist/vendor',{recursive:true});
await copyFile('node_modules/opencc-js/dist/esm/full.js','dist/vendor/opencc.js');
await copyFile('node_modules/fflate/esm/browser.js','dist/vendor/fflate.js');
await copyFile('node_modules/fflate/LICENSE','dist/vendor/fflate-LICENSE.txt');
await copyFile('node_modules/opencc-js/LICENSE','dist/vendor/opencc-LICENSE.txt');
await copyFile('node_modules/opencc-js/THIRD_PARTY_LICENSES.md','dist/vendor/opencc-THIRD-PARTY.md');
await copyFile('node_modules/opencc-js/LICENSES/Apache-2.0.txt','dist/vendor/Apache-2.0.txt');
await writeFile('dist/docx-archive.js',(await readFile('lib/docx-archive.js','utf8')).replace("from 'fflate'","from './vendor/fflate.js'"));
console.log('Built three language entry points, guides and local document/locale dependencies.');
