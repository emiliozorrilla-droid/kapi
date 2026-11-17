'use strict';
const query=new URLSearchParams(location.search);
const result={code:query.get('code'),state:query.get('state'),error:query.get('error')};
history.replaceState(null,'',location.pathname);
try{sessionStorage.setItem('kapi.gmail.callback',JSON.stringify(result));location.replace('./?gmail_callback=1')}catch{document.body.textContent='No se pudo guardar el retorno de Google. Habilitá el almacenamiento de sesión y volvé a empezar desde KAPI.'}
