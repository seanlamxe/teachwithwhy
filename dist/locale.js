import OpenCC from './vendor/opencc.js';
const convert=OpenCC.Converter({from:'hk',to:'cn'});
export function simplified(value){
 if(Array.isArray(value))return value.map(simplified);
 if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,simplified(v)]));
 if(typeof value!=='string')return value;
 return convert(value).replaceAll('甚么','什么').replaceAll('介面','界面').replaceAll('自订','自定义').replaceAll('内地','大陆').replaceAll('先谂一谂，再分享','先独立思考，再分享').replaceAll('讲谂法，也讲理由','表达想法，说明理由').replaceAll('有咩例子支持你嘅谂法','有什么例子支持你的想法').replaceAll('你点谂','你怎么想').replaceAll('谂法','想法').replaceAll('有咩','有什么').replaceAll('原有簿册','现有练习本').replaceAll('私隐','隐私').replaceAll('储存','保存').replaceAll('纪录','记录').replaceAll('汇入','导入').replaceAll('设定','设置').replaceAll('列印','打印').replaceAll('串连','串联').replaceAll('套用','应用').replaceAll('开启','打开').replaceAll('档案','文件').replaceAll('原档','原文件').replaceAll('页首页尾','页眉页脚').replaceAll('功课','作业').replaceAll('支援','支持').replaceAll('小学及中学','中小学').replaceAll('毋须','无需');
}
