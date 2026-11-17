'use strict';
let gmailStatus=null,gmailBusy=false;
const gmailMessages={sender_verification_required:'Hay correos cuya autenticidad no pudimos verificar.',receipt_review_required:'Hay comprobantes que necesitan revisión.',manual_duplicate_review_required:'Hay un posible gasto duplicado con un registro manual.',sync_retry_required:'La sincronización se reintentará.',reauthorize_or_configuration_required:'Revisá la autorización de Google o la configuración del servicio.'};
async function gmailSession(){
 if(typeof ensureAccount==='function')await ensureAccount();
 if(!accountClient)throw Error('Iniciá sesión en KAPI.');
 const {data,error}=await accountClient.auth.getSession();if(error||!data.session)throw Error('Iniciá sesión en KAPI.');return data.session;
}
async function gmailRequest(action,method='GET',params={}){
 const current=await gmailSession();
 const r=await fetch(accountSettings.url+'/functions/v1/kapi-gmail',{method:'POST',headers:{Authorization:'Bearer '+current.access_token,apikey:accountSettings.publicKey,'Content-Type':'application/json'},body:JSON.stringify({action,...params}),cache:'no-store'});
 const body=await r.json();if(!r.ok)throw Error(body.error||'Gmail no está disponible.');return body;
}
const beforeGmailPage=accountPage;
accountPage=function(){const base=beforeGmailPage();if(!session||recoveringPassword)return base;const c=gmailStatus?.connection;
 return base+`<section class="card settings"><h2>Comprobantes QR de BCP</h2><p>Con Google podés autorizar la lectura de Gmail. KAPI busca comprobantes de BCP y registra pagos salientes verificados. Google concede lectura del buzón completo; KAPI aplica el filtro por BCP. No permite enviar ni modificar correos.</p><p>Se revisan los últimos 30 días cada cinco minutos en el servidor. Los casos ambiguos no se registran. Los gastos sin una regla de comercio quedan «Por categorizar».</p><p>${c?esc(c.mailbox)+' · '+(c.enabled?'Autorización guardada':'Importación detenida'):'Conexión sin comprobar'}</p>${c?.last_sync?'<p>Última revisión: '+esc(new Date(c.last_sync).toLocaleString())+'</p>':''}${c?.last_error?'<p role="status">'+esc(gmailMessages[c.last_error]||'Revisá la sincronización.')+'</p>':''}<div class="toolbar"><button data-gmail="status" ${gmailBusy?'disabled':''}>Comprobar estado</button><button data-gmail="connect" ${gmailBusy?'disabled':''}>${c?'Volver a autorizar Google':'Autorizar Gmail'}</button>${c?'<button data-gmail="disconnect">Desconectar Gmail</button>':''}</div><p>Desconectar detiene futuras importaciones y elimina las credenciales del servidor. Los gastos ya registrados se conservan.</p><p id="gmail-result" role="status"></p></section>`;
};
window.addEventListener('kapi-account-changed',()=>{gmailStatus=null;gmailBusy=false});
document.addEventListener('click',async event=>{const action=event.target.closest('[data-gmail]')?.dataset.gmail;if(!action||gmailBusy)return;
 const owner=session?.user?.id;gmailBusy=true;
 try{
 
 if(action==='connect'){
  if(dirty)await push();if(accountDoc?.conflict||dirty)throw Error('Guardá o resolvé los cambios pendientes primero.');
  const result=await gmailRequest('connect','POST');if(session?.user?.id!==owner)return;sessionStorage.setItem('kapi.gmail.pending',JSON.stringify({state:new URL(result.url).searchParams.get('state'),owner,created:Date.now()}));location.assign(result.url);return;
 }
 if(action==='disconnect'){
  const result=await gmailRequest('disconnect','POST');if(session?.user?.id!==owner)return;gmailStatus=null;
  notify(result.revoked?'Gmail desconectado.':'Importación detenida. Retirá también el acceso de KAPI desde tu cuenta de Google.');
 }
 const status=await gmailRequest('status');if(session?.user?.id===owner)gmailStatus=status;
 }catch(e){if(session?.user?.id===owner)notify(e.message)}finally{gmailBusy=false;render()}
});

async function completeGmailReturn(){
 const raw=sessionStorage.getItem('kapi.gmail.callback');if(!raw)return;
 try{
  const returned=JSON.parse(raw),pending=JSON.parse(sessionStorage.getItem('kapi.gmail.pending')||'null');
  if(!pending||Date.now()-pending.created>600000||returned.state!==pending.state||returned.error||!returned.code)throw Error('La autorización de Gmail no se completó. Volvé a empezar desde tu cuenta KAPI.');
  // Wait only for the normal KAPI session restoration; do not create a guest session.
  for(let attempt=0;attempt<60&&!session;attempt++)await new Promise(resolve=>setTimeout(resolve,250));
  const current=await gmailSession();if(current.user.id!==pending.owner)throw Error('Volvé a la cuenta KAPI que inició la autorización.');
  await gmailRequest('callback','POST',{code:returned.code,state:returned.state});
  gmailStatus=await gmailRequest('status');page='account';notify('Autorización de Gmail guardada. Comprobá aquí el resultado de la primera sincronización.');
 }catch(e){notify(e.message)}finally{
  sessionStorage.removeItem('kapi.gmail.callback');sessionStorage.removeItem('kapi.gmail.pending');
  history.replaceState(null,'',location.pathname);render();
 }
}
queueMicrotask(()=>completeGmailReturn());
render();
