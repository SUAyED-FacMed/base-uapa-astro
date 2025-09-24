/*
Created, Modified and Updated by @juan_becerril on 2017-11-15.
	- Multiple sentences
	- number of attempts
	- display feedback
	- windows messages standard
*/
var reactivosCorrectos = 0;
var tempCalif = 0;
tempCalif = guardarCalificacion
var calificaciones = [];
var maxCalif = 0;
var intCalif = 0;

function hayVacios() {
	var salir = false;
	jq360("select").removeClass("vacio"); // JLBG mzo 18, 2019; quitar clase a preguntas sin marcar
	jq360("select").each(function (ind, elemento) {
		if (elemento.value == "-------") {
			jq360(elemento).addClass("vacio"); // JLBG mzo 18, 2019; marcar las preguntas sin contestar
			salir = true;
		}
	});
	return salir;
}

function paginar(boton) {
	self = jq360("." + boton);
	jq360(".segmento" + recorreSegmentos).hide();
	if (jq360(self).hasClass('cProximo')) {
		if (carruselContinuo) {
			recorreSegmentos = (recorreSegmentos < totalSegmentos ? ++recorreSegmentos : 1);
		}
		else {
			recorreSegmentos = (recorreSegmentos < totalSegmentos ? ++recorreSegmentos : recorreSegmentos);
			if (recorreSegmentos < totalSegmentos) {
				jq360(".cPaginador.cPrevio").removeClass("invisible").addClass("visible");
			}
			else {
				jq360(self).removeClass("visible").addClass("invisible");
				jq360(".cPrevio").removeClass("invisible").addClass("visible");
			}
		}
	}
	else {
		if (carruselContinuo) {
			recorreSegmentos = (recorreSegmentos > 1 ? --recorreSegmentos : totalSegmentos);
		}
		else {
			recorreSegmentos = (recorreSegmentos > 1 ? --recorreSegmentos : 1);
			if (recorreSegmentos > 1) {
				jq360(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
			}
			else {
				jq360(self).removeClass("visible").addClass("invisible");
				jq360(".cProximo").removeClass("invisible").addClass("visible");
			}
		}
	}
	jq360(".segmento" + recorreSegmentos).show();
	jq360("#btnPaginador").text(recorreSegmentos + " / " + totalSegmentos);
};

function continuar() {
	jq360('#btnRevisar').show();
	jq360('#btnReiniciar').hide();
	if (intentos < maxIntentos) {
			recorreSegmentos = 1; // por lo menos existe el primer segmento o sea el unico
			segmentoActual = 1; // por lo menos existe el primer segmento o sea el unico
		if (mezclarPorIntentos) {
			preguntas = [];
			respuestas = [];
			opciones = [];
			retro = [];
			indices = [];
			preg = [];
			respOriginales = [];
			respDesordenadas1 = [];
			respDesordenadas2 = [];
			correctas = 0;
			totalPreguntas = 0;
			totalSegmentos = 1;
			jq360(".row.reactivos").empty();
			if (mezclarPreguntas) {
				reordenaArreglo(reactivos);
			}
			creaElegir(reactivosMostrar);
			// paginar("cPrevio");
			iniciaToolTip();
		}
		if (elementosPorSegmento < reactivosMostrar) { // los botones de paginas...
			jq360(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
			if (carruselContinuo) {
				jq360(".cPaginador.cPrevio").removeClass("invisible").addClass("visible");
			}
			else {
				jq360(".cPaginador.cPrevio").removeClass("visible").addClass("invisible");
			}
			jq360("#btnPaginador").text(recorreSegmentos + " / " + totalSegmentos);
			jq360("#btnPaginador").removeClass("ocultar").addClass("mostrar");
		}

		jq360(".pulso").hide();
		jq360('.reactivo.correcto, .reactivo.incorrecto').removeClass('correcto incorrecto')
		if (mostrarRetroIndividual && !(mostrarRetroFinal)) {
			jq360("select").each(function () {
				jq360(this).prop("disabled", false).val("-------").removeClass("mal").removeClass("bien");
			});
		}
		else {
			jq360("select.mal").each(function () {
				jq360(this).prop("disabled", false).val("-------").removeClass("mal").removeClass('intento');
			});
		}
		if (!siguienteIntentoBlanco) {
			jq360('select.bien').addClass('intento');
		}
	}
	else {
		mostrarMensaje(1);
	}
}

function revisar() {
	if (hayVacios()) {
		jq360('select.vacio:first').focus();
		mostrarMensaje(2, 5);
	}
	else {
		jq360("button#btnRevisar").hide();
		jq360("button#btnReiniciar").show();
		if (calificacionGlobal) {
			var totalPreguntas = jq360('.reactivo').length;
		}
		else {
			var totalPreguntas = jq360('select').length;
		}
		if (intentos < maxIntentos) {
			jq360('select').prop("disabled", true);
			jq360('select.bien').removeClass('intento');
			reactivosCorrectos = 0;
			correctas = 0;
			var respCorrecta = "";
			var respElegida = "";

			jq360('select').each(function (ind, estaCasilla) {
				respCorrecta = jq360(estaCasilla).attr('data-respuesta');
				respElegida = jq360(estaCasilla).val();
				if (respCorrecta == respElegida) {
					jq360(estaCasilla).addClass('bien');
				}
				else {
					jq360(estaCasilla).addClass('mal');
				}
			});

			if (calificacionGlobal) {
				jq360('.reactivo').each(function (i, esteReactivo) {
					var total = jq360(esteReactivo).find('select').length;
					var bien = jq360(esteReactivo).find('select.bien').length;
					if (total == bien) {
						jq360(esteReactivo).addClass('correcto').find('> .OK').show();
					}
					else {
						jq360(esteReactivo).addClass('incorrecto').find('> .noOK').show();
					}
				});
				reactivosCorrectos = jq360('.reactivo.correcto').length;
			}
			else {
				if (mostrarRetroArroba) {
					jq360('select').each(function (i, estaCasilla) {
						jq360(estaCasilla).find('~ [data-valor="' + jq360(estaCasilla).val() + '"]').show();
					});
				}
				else {
					jq360('select.bien ~ .OK').show();
					jq360('select.mal ~ .noOK').show();
				}
				correctas = jq360('select.bien').length;
			}
			intentos++;

			if (siguienteIntentoBlanco) {
				jq360("#btnReiniciar").click(function () {
					jq360("select").each(function () {
						if (intentos < maxIntentos) {
							jq360(this).prop("disabled", false).val("-------").removeClass("mal").removeClass("bien");
						}
					});
				});
			}
		}
		switch (idioma) {
			case "ENG":
				var txtResp1 = (correctas == 1) ? ic("rewsna thgir") : ic("srewsna thgir");
				var txtResp2 = (reactivosCorrectos == 1) ? ic("ecnetnes thgir") : ic("secnetnes thgir");
				var msg1 = (porEspacios || porEnunciados) ? ic(">/rb<>naps/<nettog evah uoY> 'odatluser'=di naps<") : "";
				var msg2 = (porEspacios) ? (ic(">gnorts<") + correctas + ic(" >gnorts/<") + txtResp1 + ic(">gnorts< fo ") + totalPreguntas + ic(">/rb<>/rb<selbissop >gnorts/<")) : "";
				var msg3 = (porEnunciados) ? (ic(">gnorts<") + reactivosCorrectos + ic(" >gnorts/<") + txtResp2 + ic(">gnorts< fo ") + total + ic(">/rb<>/rb<>gnorts/<")) : "";
				var tit = ic("tluseR");
				break;
			default:
				var txtResp1 = (correctas == 1) ? " respuestas correctas. " : " respuestas correctas.";
				var txtResp2 = (reactivosCorrectos == 1) ? " respuestas correctas." : " respuestas correctas.";
				var msg1 = (porEspacios || porEnunciados) ? "<span id='resultado'> <strong> Resultado <br> </strong> </span>" : "";
				var msg2 = (porEspacios) ? ("Obtuviste " + correctas + "/" + totalPreguntas + txtResp1 + "<br><br>") : "";
				var msg3 = (porEnunciados) ? ("Obtuviste " + reactivosCorrectos + "/" + total + txtResp1 + "<br><br>") : "";
				var tit = "Resultado";
		}
		var res = (porEspacios) ? (correctas / totalPreguntas) : (reactivosCorrectos / total);
		console.log("evaluacion con " + Math.floor(res));
		mostrarEval("", tit, msg2 + msg3 + asignarEvaluacion(Math.floor(10 * res)));

		calificaciones.push(correctas);
		intCalif = calificaciones[tempCalif];
		iniciaAmbienteScorm(ambSCORM, barraSCORM, idObjetivo);
		for (var i = 0, len = calificaciones.length; i < len; i++) {
			if (maxCalif < calificaciones[i]) {
				maxCalif = calificaciones[i];
			}
		}
		if (guardarCalificacion == 0) { //ultimo intento
			guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, correctas, total);
		}

		if (guardarCalificacion == -1) { //intento mas alto
			guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, maxCalif, total);
		}

		if (guardarCalificacion > 0) {
			guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, intCalif, total);
		}
		console.log("Int Calif: " + intCalif)
		console.log("Max Calif: " + maxCalif)
	}
}