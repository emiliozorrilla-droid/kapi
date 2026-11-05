# KAPI 4.5.1 — cierre mensual y Excel conciliado

Ajustes → Cierre mensual. Elegir mes, revisar análisis, Guardar cierre y Descargar cierre Excel. El mes actual se marca como parcial; los meses anteriores se pueden cerrar. Se muestra un aviso en Inicio si el mes anterior tiene movimientos y todavía no tiene cierre. La app no envía correos ni ejecuta procesos estando cerrada.

El análisis incluye ingresos efectivamente registrados, gastos, saldo registrado, categoría de mayor gasto, límites por presupuesto, disponible y exceso. No representa saldo bancario ni ahorro real: faltan saldo inicial y movimientos no registrados. El presupuesto general es una referencia independiente; no se vuelve a sumar a las categorías.

Los totales se concilian en Bs. Se convierte y redondea cada movimiento a centavos con su cambio histórico. Los presupuestos en USD usan el cambio configurado al generar el cierre. Sin un cierre anterior guardado no se puede reconstruir el límite que existía en un mes pasado: se advierte que se usan los presupuestos actuales.

Guardar cierre crea una copia de límites y movimientos en monthlyClosures[mes], dentro del documento privado existente. Cambios posteriores no alteran esa copia; Actualizar cierre requiere confirmación y ofrece deshacer. Hasta120 cierres y documento total≤19MB para dejar margen al backend. No elimina ni modifica gastos, ingresos o presupuestos. Un cierre solo local requiere respaldo; con sesión se sincroniza mediante el mismo guardado por usuario.

El Excel tiene seis hojas: Resumen, Presupuestos, Categorias, Gastos, Ingresos y Control. Incluye importes originales, cambios históricos y equivalentes Bs, fórmulas internas con valores guardados, filtros y paneles fijos. Las diferencias en Control deben ser0. El texto del usuario nunca se interpreta como fórmula. Es una copia para compartir/revisar; no se agregó reimportación Excel. Los controles permiten detectar inconsistencias si se cambia el archivo.

Validación:85 pruebas automatizadas aprobadas, ZIP/XML verificados, descarga real desde la interfaz y apertura en Microsoft Excel sin reparación. Con datos ficticios: gastos194Bs, ingresos680Bs, saldo486Bs, disponible del plan306Bs; controles recalculados sin diferencia. Se verificó el cierre guardado en el navegador. No se alteraron registros de producción para las pruebas.

Código nuevo: public/monthly-core.js (cálculos, snapshots y estructura Excel), public/monthly.js (pantalla y acciones); extendidos finance.js (validación/migración) y xlsx.js (libros multihola con fórmulas seguras). release.js mantiene la única versión fuente. Build genera bundle y SW versionados. La IA pública permanece desactivada y el acceso rápido ?action=expense sigue disponible.

Pruebas físicas en Safari/iPhone y Chrome/Android siguen pendientes. La descarga usa el mecanismo estándar del navegador; la función y los datos no dependen de esta Mac.


---
Documentación de funciones previas conservadas:

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
