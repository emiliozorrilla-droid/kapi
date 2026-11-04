# KAPI 4.3
Aplicación: https://emiliozorrilla-droid.github.io/kapi/

## Disponible
- Cuatro secciones principales; herramientas secundarias en Ajustes.
- Presupuesto general, 40 categorías sugeridas y categorías propias. Editar, aumentar y eliminar visibles. Eliminar conserva movimientos y permite deshacer.
- Ruedas: verde >50 %, amarillo >20 %, rojo ≤20 %, neutral sin límite.
- Presupuestos → Metas de ahorro: Bs/USD, plazo, fecha objetivo, aportes y avance. Bs 2.000 en tres meses propone Bs 666,67/mes. Los aportes registran avance; no transfieren dinero.
- Ajustes → Ingresos previstos y monedas: cobros semanales, cada 14 días, mensuales y dos veces al mes. Registro automático opcional al abrir o volver a KAPI, sin duplicados. No comprueba depósitos ni ejecuta pagos. Sustituye la previsión principal antigua para no duplicar el sueldo.
- Cambio manual Bs/USD e histórico por movimiento; no cotizaciones verificadas.
- CSV con revisión de duplicados, exportación CSV/Excel, PDF mediante Imprimir y respaldo JSON. No importa extractos Excel/PDF.
- Claro/oscuro y PWA instalable. iPhone: Compartir → Añadir a pantalla de inicio. Android: Instalar app. No es una publicación de App Store/Play Store.
- Cuentas Supabase: confirmación de correo, sesión persistente, recuperación, guardado automático, copia local por usuario, reintentos y detección de conflictos.

## Estado de las cuentas
Proyecto y esquema creados. Prueba real de aislamiento entre identidades aprobada. SMTP Brevo conectado, remitente verificado y confirmación de correo habilitada. Pendiente la prueba completa de recepción de correo, confirmación e inicio de sesión en teléfonos reales. No confundir configuración con verificación completa.

Solo la URL y clave pública de Supabase están en el navegador. No publicar SMTP, contraseña de base de datos, service_role ni claves de IA. Los datos sin sesión requieren importación explícita desde Cuenta. Descargar respaldo antes de reemplazar datos o resolver conflictos. La copia local y la sesión permanecen en el dispositivo; cerrar sesión si se comparte. Sin fusión automática de conflictos ni cifrado adicional de almacenamiento local.

## IA y banca
La versión pública tiene análisis calculado local, identificado como tal. No tiene todavía un modelo generativo público conectado. La IA local de la Mac funciona con Ollama/qwen3:1.7b; requiere Mac y servidor encendidos. No se expuso la Mac a internet. Las propuestas requieren confirmación y validación. Para IA pública hace falta backend autenticado/proveedor, con secretos solo en servidor.

Abrir con Iniciar KAPI con IA.command. En otra computadora instalar Node.js22+ y Ollama oficiales. Binarios/modelo no incluidos en ZIP.

Sin banca automática. Usar CSV exportado por el titular. El portal BCP Bolivia https://www.bcp.com.bo/Desarrollo no demuestra acceso universal a cuentas personales. Un conector requiere documentación, contrato y autorización; no se confirmó cobertura boliviana de Belvo. Nunca solicitar credenciales bancarias.

## Configuración/publicación
Ejecutar node scripts/build-static.mjs y publicar solo beta-gratis/. Para otro proyecto, configurar public/account-config.js con URL/clave pública, ejecutar schema.sql, configurar SMTP, mantener confirmación de correo y establecer Site URL/redirect con la URL exacta de la app. Supabase-js oficial incluido con licencia en public/vendor/.

Servidor personal: npm start. Pruebas: npm test. Backend público: HTTPS, autenticación, secretos del proveedor en servidor; el modo IA local rechaza exposición pública. No activar proveedores pagos sin autorización.

Los cambios del mismo enlace llegan a todos al actualizar con conexión. Desde4.3 version.json anuncia actualizaciones. La transición desde4.2 puede requerir cerrar y abrir/recargar. No garantiza actualización instantánea estando cerrada. No borrar almacenamiento sin respaldo.

GitHub Pages, Supabase y Brevo se configuraron en planes gratuitos, sin tarjeta ni suscripción paga. No son capacidad ilimitada ni garantía de gratuidad futura.

## Validación y límites
39 pruebas aprobadas. Prueba SQL real: acceso propio, bloqueo entre usuarios/anónimos y rechazo de revisiones antiguas; datos sintéticos revertidos. tests/rls-live.sql reproduce el ensayo controlado. Navegador: meta2000/3, aporte500→25%, cobroUSD200/14d sin duplicado al recargar, botón eliminar visible.

Pendiente: entrega real de correo, recuperación y sincronización en dos teléfonos físicos; IA pública y banca.

Los límites de presupuesto son mensuales recurrentes: editarlos cambia también la referencia en informes históricos. Respaldo version:3 con migración de metas/cobros. No se recuperó código3.2; se continuó el proyecto real disponible derivado de3.0.

Categorías habituales, no ranking boliviano:
https://www.centralbank.net/learning-center/budget-and-save/finance-101/what-to-include-in-a-budget--top-25-most-common-expenses/
https://www.ynab.com/blog/how-many-ynab-categories
El video aportado sirvió de referencia visual; no se incorporó al producto.
