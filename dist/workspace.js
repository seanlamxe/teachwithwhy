export const validPreset=p=>Boolean(p&&typeof p.id==='string'&&p.id.length<=100&&typeof p.title==='string'&&p.title.trim()&&p.title.length<=60&&typeof p.text==='string'&&p.text.trim()&&p.text.length<=1500);
export function normalizeRecord(r){return {...r,favorite:r.favorite===true,draft:{curriculum:'hk',curriculumNote:'',customPrompt:'',documentContext:'',feedbackIds:[],...r.draft},feedbackHistory:Array.isArray(r.feedbackHistory)?r.feedbackHistory:r.reflection?[{id:'legacy-'+r.id,created:r.updated||r.created,snapshot:{...r.reflection}}]:[]};}
export function appendFeedback(record,reflection,now=new Date().toISOString()){
 const r=normalizeRecord(record),last=r.feedbackHistory.at(-1);
 if(last&&JSON.stringify(last.snapshot)===JSON.stringify(reflection))return {...r,reflection:{...reflection}};
 if(r.feedbackHistory.length>=200)throw Error('FEEDBACK_LIMIT');
 return {...r,reflection:{...reflection},reflectionAI:null,updated:now,feedbackHistory:[...r.feedbackHistory,{id:now,created:now,snapshot:{...reflection}}]};
}
export function feedbackContext(records,ids){return [...new Set(ids)].slice(0,3).map(id=>records.find(r=>r.id===id)).filter(r=>r?.reflection?.observation).map(r=>({topic:String(r.draft.topic||'').slice(0,100),goal:String(r.draft.goal||'').slice(0,800),observation:String(r.reflection.observation).slice(0,1200),difficulty:String(r.reflection.difficulty||'').slice(0,1000),next:String(r.reflection.next||'').slice(0,1000),decision:String(r.reflection.decision||'').slice(0,50)}));}
