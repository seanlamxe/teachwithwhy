export const validPreset=p=>Boolean(p&&typeof p.id==='string'&&p.id.length<=100&&typeof p.title==='string'&&p.title.trim()&&p.title.length<=60&&typeof p.text==='string'&&p.text.trim()&&p.text.length<=1500);
export function normalizeRecord(r){return {...r,favorite:r.favorite===true,draft:{curriculum:'hk',curriculumNote:'',customPrompt:'',documentContext:'',feedbackIds:[],...r.draft},feedbackHistory:Array.isArray(r.feedbackHistory)?r.feedbackHistory:r.reflection?[{id:'legacy-'+r.id,created:r.updated||r.created,snapshot:{...r.reflection}}]:[]};}
export function appendFeedback(record,reflection,now=new Date().toISOString()){
 const r=normalizeRecord(record),last=r.feedbackHistory.at(-1);
 if(last&&JSON.stringify(last.snapshot)===JSON.stringify(reflection))return {...r,reflection:{...reflection}};
 if(r.feedbackHistory.length>=200)throw Error('FEEDBACK_LIMIT');
 return {...r,reflection:{...reflection},reflectionAI:null,updated:now,feedbackHistory:[...r.feedbackHistory,{id:now,created:now,snapshot:{...reflection}}]};
}
export function feedbackContext(records,ids){return [...new Set(ids)].slice(0,3).map(id=>records.find(r=>r.id===id)).filter(r=>r?.reflection?.observation).map(r=>({topic:String(r.draft.topic||'').slice(0,100),goal:String(r.draft.goal||'').slice(0,800),observation:String(r.reflection.observation).slice(0,1200),difficulty:String(r.reflection.difficulty||'').slice(0,1000),next:String(r.reflection.next||'').slice(0,1000),decision:String(r.reflection.decision||'').slice(0,50)}));}

// Remember teaching context only; lesson content, consent and documents never become defaults.
export function teachingSetup(d={}){
 const out={};
 for(const [key,max] of Object.entries({curriculum:30,level:30,curriculumNote:400,subject:80,customSubject:80,textbook:300,classContext:1000,strategy:30}))if(typeof d[key]==='string')out[key]=d[key].slice(0,max);
 if(!['hk','mainland','international'].includes(out.curriculum))out.curriculum='hk';
 if(!['lower','upper','junior','senior'].includes(out.level))out.level='upper';
 if(!['auto','think','joint','reason'].includes(out.strategy))out.strategy='auto';
 out.students=Number.isInteger(d.students)&&d.students>=2&&d.students<=60?d.students:30;
 out.minutes=Number.isInteger(d.minutes)&&d.minutes>=5&&d.minutes<=30?d.minutes:12;
 out.constraints=Array.isArray(d.constraints)?d.constraints.filter(x=>['seats','no-tech','support'].includes(x)):['seats'];
 return out;
}
export function validProfile(p){return Boolean(p&&typeof p.id==='string'&&p.id.length<=100&&typeof p.name==='string'&&p.name.trim()&&p.name.length<=60&&p.setup&&typeof p.setup==='object'&&!Array.isArray(p.setup));}
export function normalizeSettings(s={}){return {profiles:Array.isArray(s?.profiles)?s.profiles.filter(validProfile).slice(0,30).map(p=>({id:p.id,name:p.name,setup:teachingSetup(p.setup)})):[],lastProfileId:typeof s?.lastProfileId==='string'?s.lastProfileId:'',lastSetup:s?.lastSetup?teachingSetup(s.lastSetup):null};}
export function mergeSettings(current,incoming){const a=normalizeSettings(current),b=normalizeSettings(incoming),ids=new Set(a.profiles.map(p=>p.id));const profiles=[...a.profiles,...b.profiles.filter(p=>!ids.has(p.id))];if(profiles.length>30)throw Error('PROFILE_LIMIT');return {...a,profiles,lastSetup:a.lastSetup||b.lastSetup};}
export function reuseActivity(record){const r=normalizeRecord(record);return {...structuredClone(r.draft),consent:false,feedbackIds:r.reflection?.observation?[r.id]:[],reuseContext:{parentId:r.id,title:String(r.title||'').slice(0,180),goal:String(r.draft.goal||'').slice(0,800),steps:r.plan.steps.slice(0,7).map(s=>({title:String(s.title).slice(0,150),text:String(s.text).slice(0,1000),minutes:s.minutes}))}};}
