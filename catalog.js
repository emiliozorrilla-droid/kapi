(function(root){
const groups={
'Hogar':[['🏠','Alquiler / vivienda'],['💡','Luz, agua y gas'],['📶','Internet'],['🛠️','Mantenimiento del hogar'],['🧹','Limpieza y hogar']],
'Día a día':[['🛒','Supermercado'],['🥗','Alimentación'],['🍽️','Restaurantes'],['🛵','Delivery'],['☕','Café y snacks'],['📱','Celular']],
'Movilidad':[['🚌','Transporte público'],['🚕','Taxis'],['⛽','Combustible'],['🚗','Auto y mantenimiento'],['🅿️','Estacionamiento']],
'Bienestar':[['🩺','Salud y consultas'],['💊','Medicamentos'],['🛡️','Seguros'],['🏋️','Gimnasio y deporte'],['💇','Cuidado personal']],
'Familia y aprendizaje':[['🎓','Educación'],['📚','Cursos y libros'],['🧸','Hijos y cuidado'],['🤝','Apoyo familiar'],['🐾','Mascotas']],
'Estilo de vida':[['🎬','Ocio y salidas'],['👕','Ropa y calzado'],['📺','Suscripciones'],['🎮','Gaming'],['✈️','Viajes'],['🎁','Regalos'],['❤️','Donaciones'],['💻','Tecnología']],
'Compromisos':[['💳','Tarjeta y cuotas'],['🏦','Préstamos y deudas'],['🧾','Impuestos'],['💼','Trabajo / negocio'],['🧰','Imprevistos'],['➕','Otros gastos']]
};
const items=Object.entries(groups).flatMap(([group,rows])=>rows.map(([icon,name])=>({group,icon,name})));
function health(limit,spent){if(!Number.isFinite(limit)||!Number.isFinite(spent)||spent<0||limit<0)throw Error('Cifras inválidas');const remaining=limit-spent,ratio=limit>0?Math.max(0,Math.min(1,remaining/limit)):0;return {remaining,ratio,percent:Math.round(ratio*100),status:limit===0?'empty':ratio>.5?'green':ratio>.2?'yellow':'red',label:limit===0?'Sin límite':remaining<0?'Límite superado':ratio>.5?'Vas bien':ratio>.2?'Cuidá el ritmo':'Queda poco'}}
function filter(query){const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();return items.filter(x=>norm(x.name+' '+x.group).includes(norm(query.trim())))}
root.KapiCatalog={items,health,filter};
})(typeof window==='undefined'?globalThis:window);
