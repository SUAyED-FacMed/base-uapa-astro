function triptico(idTriptico) {
	const botonAbrir = document.querySelectorAll('section.contenedor-triptico#' + idTriptico + '  .triptico .mostrar');
	const hojasTriptico = document.querySelector('section.contenedor-triptico#' + idTriptico);
	const hojaIzquierda = document.querySelector('section.contenedor-triptico#' + idTriptico + ' .triptico .izquierda');
	const hojaDerecha = document.querySelector('section.contenedor-triptico#' + idTriptico + ' .triptico .derecha');
	const hojaAtras = document.querySelector('section.contenedor-triptico#' + idTriptico + ' .triptico .atras');
	const botonCerrar = document.querySelectorAll('section.contenedor-triptico#' + idTriptico + ' .triptico .cerrar');

	botonAbrir.forEach(function (boton) {
		boton.addEventListener("click", abrir);
	});

	botonCerrar.forEach(function (boton) {
		boton.addEventListener("click", cerrar);
	});

	function abrir() {
		hojasTriptico.classList.toggle("abierto");
		hojaIzquierda.classList.toggle("ver");
		setTimeout(function () {
			hojaDerecha.classList.toggle("ver");
		}, 250);
		setTimeout(function () {
			hojaAtras.classList.toggle("ver");
		}, 350);
	};

	function cerrar() {
		hojasTriptico.classList.toggle("abierto");
		setTimeout(function () {
			hojaIzquierda.classList.toggle("ver");
		}, 250);
		hojaDerecha.classList.toggle("ver");
		setTimeout(function () {
			hojaAtras.classList.toggle("ver");
		}, 600);
	};
};

