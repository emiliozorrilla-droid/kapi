# KAPI 4.4.2 — entrega local y móvil

App: https://emiliozorrilla-droid.github.io/kapi/

Esta publicación habilita el asistente local por reglas y mejoras móviles. La IA generativa por internet está desactivada (aiReady:false). No se cambió la protección JWT de Supabase ni se activaron gastos de API.

## Cambios
- Chat local para consultar cifras y preparar gastos/ingresos. Confirmación editable obligatoria. No es un modelo generativo.
- Parser de números en español, Bs/USD y fechas relativas. Rechaza montos ambiguos; no interpreta todas las frases posibles.
- Dictado mediante Web Speech API cuando el navegador lo ofrece; texto editable antes de enviar. El navegador puede enviar audio a su proveedor y se pide consentimiento. KAPI no guarda ni sube grabaciones. Sin transcripción de audio en servidor.
- Presupuestos: tocar la tarjeta o Ver gastos abre los movimientos del mes elegido, importes, total y disponible. Desde allí se puede editar o añadir un gasto asignado a ese presupuesto.
- Una versión de lanzamiento en public/release.js; bundle inicial diferido y herramientas bajo demanda.
- Fecha actualizada al volver a la app, tema inicial, controles nativos, contraste, SVG, safe areas, navegación inferior, tarjetas de movimientos y protección de almacenamiento bajo solicitud.
- Conserva cuentas, metas, cobros, CSV/Excel/PDF y respaldos de 4.3. No cambia la clave de datos kapi.v3 ni el formato de respaldo version:3.

## Publicar y probar
Requiere Node22+. Ejecutar node scripts/build-static.mjs; publicar solamente beta-gratis/ en GitHub Pages. Ejecutar node --test tests/*.test.mjs. 68 pruebas aprobadas antes de publicar; incluye 30 pruebas nuevas de lenguaje, validación y contexto remoto mínimo. Ver PRUEBAS.md.

La aplicación carga un bundle, aunque el código fuente conserva funciones heredadas para evitar una reescritura riesgosa. Se unificaron los estilos globales duplicados principales; las reglas móviles están en mobile.css.

## Estado de IA cloud
Función kapi-ai desplegada en Supabase. Código y migración de cuotas incluidos en supabase/. No funciona aún como IA pública: falta guardar una clave privada utilizable, completar configuración y probar autenticación/proveedor. El ajuste de verificación JWT antigua fue rechazado por revisión automática y no se cambió. La migración de cuotas se envió a ejecutar, pero no se verificó su resultado final antes de la pausa del usuario.

Groq Free fue autorizado como alternativa de US$0. No se añadió tarjeta ni plan pago. Los cupos del proveedor pueden cambiar y el rendimiento real no se ha probado. Anthropic queda como adaptador opcional desactivado; no hay autorización de gasto para activarlo.

## Límites
La comprobación en navegador de escritorio con ancho móvil no sustituye teléfonos físicos. Pendientes: instalación y dictado en iPhone/Safari y Chrome Android, modo standalone iOS, micrófono denegado, lector de pantalla y cambio de versión en teléfonos existentes. El dictado no está disponible en todos los navegadores; se ofrece usar el micrófono del teclado.

No hay pagos ni conexión bancaria automática. Los cobros programados solo registran ingresos al abrir la app. No borrar datos del sitio sin respaldo o sincronización confirmada.

## Acceso rápido desde Atajos
Usar https://emiliozorrilla-droid.github.io/kapi/?action=expense en la acción Abrir URL. Abre directamente Registrar gasto, sin guardar automáticamente. Espera a restaurar la sesión cuando existe; ante fallo de carga de cuenta no abre un formulario anónimo. Si no hay sesión, avisa que el guardado es local. La prueba en Centro de control de un iPhone real sigue pendiente. Se agregaron 4 pruebas de rutas/restauración de sesión, todas aprobadas.
