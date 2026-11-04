const Core=(()=>{
 const pad=n=>String(n).padStart(2,'0');
 const date=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
 const parse=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d,12)};
 const add=(s,n)=>{const d=parse(s);d.setDate(d.getDate()+n);return date(d)};
 const days=(a,b)=>Math.round((parse(b)-parse(a))/86400000);
 const month=s=>s.slice(0,7);
 const monthDay=(y,m,day)=>date(new Date(y,m,Math.min(day,new Date(y,m+1,0).getDate()),12));
 function schedule(c,from,to){let out=[];if(c.frequency==='weekly'||c.frequency==='fortnightly'){let step=c.frequency==='weekly'?7:14;let start=add(c.anchor,Math.ceil(days(c.anchor,from)/step)*step);for(let s=start;s<=to;s=add(s,step))out.push(s)}else{let d=parse(from);d.setDate(1);for(;date(d)<=to;d.setMonth(d.getMonth()+1)){let ds=c.frequency==='twice'?[c.day1,c.day2]:[Number(c.anchor.slice(8))];for(let day of ds){let s=monthDay(d.getFullYear(),d.getMonth(),day);if(s>=from&&s<=to)out.push(s)}}}return [...new Set(out)].sort()}
 function cycle(c,today){const a=schedule(c,add(today,-70),add(today,70));return {start:a.filter(s=>s<=today).at(-1),end:a.find(s=>s>today)}}
 const bs=(amount,currency,rate)=>currency==='USD'?amount*rate:amount;
 const sum=(xs,fn)=>xs.reduce((s,x)=>s+fn(x),0);
 const spend=(s,from,to,id)=>sum(s.expenses.filter(e=>e.date>=from&&e.date<to&&(!id||e.budget===id)),e=>bs(e.amount,e.currency,e.rate));
 function bounds(m){let d=parse(m+'-01');d.setMonth(d.getMonth()+1);return {from:m+'-01',to:date(d)}}
 function monthly(s,m){const b=bounds(m);let count=schedule(s.income,b.from,add(b.to,-1)).length;return bs(s.income.amount*count+s.income.extra,s.income.currency,s.rate)}
 function prorate(value,from,to){let total=0;for(let d=from;d<to;d=add(d,1)){let dt=parse(d);total+=value/new Date(dt.getFullYear(),dt.getMonth()+1,0).getDate()}return total}
 function available(s,today){const c=cycle(s.income,today);const rate=s.rate;const extra=prorate(bs(s.income.extra,s.income.currency,rate),c.start,c.end);const reserve=prorate(bs(s.income.saving,s.income.currency,rate),c.start,c.end);const spent=spend(s,c.start,add(today,1));const available=bs(s.income.amount,s.income.currency,rate)+extra-reserve-spent;return {...c,extra,reserve,spent,available,remaining:days(today,c.end)}}
 const validDate=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&s>='1900-01-01'&&s<='2200-12-31'&&date(parse(s))===s;
 const positive=(n,zero=false)=>typeof n==='number'&&Number.isFinite(n)&&(zero?n>=0:n>0)&&n<=1e12;
 const currency=c=>['BOB','USD'].includes(c);
 function validate(s){if(!s||s.version!==3||!positive(s.rate)||!currency(s.display)||!['light','dark'].includes(s.theme)||!Array.isArray(s.budgets)||!Array.isArray(s.expenses)||s.budgets.length>1000||s.expenses.length>100000)throw Error('Formato de respaldo KAPI 3.0 inválido.');const c=s.income;if(!c||!['monthly','weekly','fortnightly','twice'].includes(c.frequency)||!positive(c.amount,true)||!positive(c.extra,true)||!positive(c.saving,true)||!currency(c.currency)||!validDate(c.anchor)||!Number.isInteger(c.day1)||!Number.isInteger(c.day2)||c.day1<1||c.day1>28||c.day2<1||c.day2>31||c.day1>=c.day2)throw Error('Configuración de ingresos inválida.');const ids=new Set();for(let b of s.budgets){if(!b||typeof b.id!=='string'||ids.has(b.id)||typeof b.name!=='string'||!b.name.trim()||b.name.length>70||typeof b.category!=='string'||!b.category.trim()||b.category.length>70||!positive(b.amount)||!currency(b.currency))throw Error('Presupuesto inválido.');ids.add(b.id)}const es=new Set();for(let e of s.expenses){if(!e||typeof e.id!=='string'||es.has(e.id)||typeof e.name!=='string'||!e.name.trim()||e.name.length>100||!positive(e.amount)||!positive(e.rate)||!currency(e.currency)||!validDate(e.date)||typeof e.category!=='string'||e.category.length>70||(e.budget!==null&&!ids.has(e.budget)))throw Error('Movimiento inválido.');es.add(e.id)}return s}
 return {date,parse,add,days,month,schedule,cycle,bs,sum,spend,bounds,monthly,prorate,available,validate,validDate};
})();

if(typeof module!=="undefined")module.exports=Core;
