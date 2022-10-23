//Función para desplegar u ocultar el contenido de los ítems de la lista de recetas
function desplegarContenido(item) {
	let cont_receta = document.getElementById('cont_receta_'+item);
	let mas_receta = document.getElementById('mas_receta_'+item);
	if (cont_receta.style.display != 'flex') {
		cont_receta.style.display = 'flex';
		cont_receta.classList.add('animar');
		mas_receta.innerHTML = '-';
	} else {
		cont_receta.style.display = 'none';
		cont_receta.classList.remove('animar');
		mas_receta.innerHTML = '+';
	}
}

//Eventos para desplegar u ocultar el contenido de los ítems de la lista de recetas
for (let i = 1; i <= 9; i++) {
	document.getElementById('desplegable_receta_'+i).addEventListener('click', function() { desplegarContenido(i); });
}