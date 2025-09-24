//  ============================================================================================================
function limpiaRadiosVF() { /*Aqui se alteran titulos */
	jq360("input:radio").attr("checked", false);
	switch (idioma) {
		case "ENG":
			jq360("#btnRevisar").text(ic("kcehC"));
			jq360("#btnReiniciar").text(ic("tpmetta txeN"));
			jq360("th#tV").text("True");
			jq360("th#tF").text("False");
			break;
		default:
			jq360("#btnRevisar").text(ic("rasiveR"));
			jq360("#btnReiniciar").text(ic("otnetni etneiugiS"));
			jq360("th#tV").text(encabezados[0]);
			jq360("th#tF").text(encabezados[1]);
	}
}

//  ============================================================================================================
function revisarVF() { //se invoca con el boton "revisar"
	jq360(".vacio").removeClass("vacio");
	jq360(".reactivo").each(function (indice) {
		if (jq360(this).find("input:checked").length == 0) {
			jq360(this).addClass("vacio");
		}
	});
	if (jq360(":checked").length != reactivosMostrar) {
		mostrarMensaje(2, 3);
	}
	else {
		correctas = 0;
		jq360("button#btnReiniciar").show();
		jq360("button#btnRevisar").hide();
		jq360("input:radio").prop('disabled', true);
		jq360('.reactivo').removeClass('intento');

		jq360(".reactivo").each(function (indice) {
			var valor = jq360("input:radio[name=pregunta" + indice + "]:checked").attr("value");
			if (valor == reactivos[indice].A.toString()) {
				jq360(this).find(".OK").show();
				jq360(this).addClass("bien");
				correctas++;
			}
			else {
				jq360(this).find(".noOK").show();
				jq360(this).addClass("mal");
			}
		});
		intentos++;
		// var res = Math.ceil(10 * correctas / total);
		// var res = correctas;

		var res = 0;
		if (typeof (califXaciertos) === 'undefined') { califXaciertos = true; }
		res = (califXaciertos) ? correctas : Math.floor(10 * correctas / total);


		console.log("Correctas: " + correctas);
		console.log("Total: " + total);
		console.log("Calificación: " + res.toPrecision());
		switch (idioma) {
			case "ENG":
				var txtResp = (correctas == 1) ? ic("rewsna thgir") : ic("srewsna thgir");
				mostrarEval("", ic("tluseR"), ic(" nettog evah uoY") + correctas + " " + txtResp + ic(" fo ") + total + "<br/><br/>" + asignarEvaluacion(res));
				break;
			default:
				var txtResp = ic(".satcerroc satseupser ");
				var txt = ic(" etsivutbO") + correctas + "/" + total + txtResp;
				mostrarEval("", ic("odatluseR"), txt + "<br/><br/>" + asignarEvaluacion(res));
		}
		iniciaAmbienteScorm(ambSCORM, barraSCORM, idObjetivo);
		// guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, correctas, total);
		// JLBG Jun 03, 2020;  para guardar calificación por distintos criterios
		// -1 : guardar calificación más alta de todos los intentos
		// 0  : guardar calificación del último intento (default-actual)
		// n  : guardar calificación del intento n

		if (guardarCalificacion == 0) {   // guarda siempre -> último intento
			guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, correctas, total);
		}
		else if (guardarCalificacion == intentos) {   // guarda en el intento n
			guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, correctas, total);
		}
		else if (guardarCalificacion == -1) {    // CALIFICACION MAS ALTA DE TODOS LOS INTENTOS
			if (correctas > califMax) {
				califMax = correctas;
				guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, califMax, total);
				console.log("califMax es " + califMax);
			}
		}
	}
}
//  ============================================================================================================
function mostrarEval(tipo, titulo, cadena) {
	switch (idioma) {
		case "ENG":
			var btnOK = ic("KO");
			break;
		default:
			var btnOK = ic("ratpecA");
	}
	swal({ title: titulo, text: cadena, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
}

//  ============================================================================================================
function reiniciar() {
	jq360("#btnRevisar").show();
	jq360("#btnReiniciar").hide();

	if (intentos < maxIntentos) {
		if (mezclarPorIntentos) {
			preguntas = [];
			respuestas = [];
			retro = [];
			indices = [];
			preg = [];
			respOriginales = [];
			respDesordenadas1 = [];
			respDesordenadas2 = [];
			totalSegmentos = 1;
			recorreSegmentos = 1; // por lo menos existe el primer segmento o sea el unico
			segmentoActual = 1; // por lo menos existe el primer segmento o sea el unico
			jq360(".row.reactivos #contenedorVF .row").remove();
			creaIndice();
			if (mezclarPreguntas) { reordenaArreglo(reactivos) };
			XcreaTablaVF(reactivosMostrar);
			limpiaRadiosVF();
			iniciaTooltip()
		}
		jq360(".pulso").hide();

		jq360('.reactivos .reactivo').each(function (i, reactivo) {
			if (jq360(reactivo).hasClass('mal')) {
				jq360(reactivo).removeClass('mal');
				jq360(reactivo).find('input')
					.prop('checked', false)
					.prop('disabled', false);
			}
			if (siguienteIntentoBlanco) {
				jq360(reactivo).removeClass('bien');
				jq360(reactivo).find('input')
					.prop('checked', false)
					.prop('disabled', false);
			}
		});
		if (!siguienteIntentoBlanco) {
			jq360('.reactivo.bien').addClass('intento');
		}
	}
	else {
		switch (idioma) {
			case "ENG":
				mostrarEval("", "Attention", "You have reached maximum number of attempts: " + maxIntentos + ".");
				break;
			default:
				mostrarEval("", "Atención", "Has alcanzado el máximo número de intentos: " + maxIntentos + ".");
		}
	}
	recorreSegmentos = 1;
	jq360('.reactivo').hide();
	jq360(".segmento" + recorreSegmentos).show();

	if (totalSegmentos > recorreSegmentos) { // si solo hay una pagina no desplegamos paginador
		jq360("#btnPaginador").text(recorreSegmentos + " / " + totalSegmentos);
		jq360(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
		jq360(".cPaginador.cPrevio").addClass("invisible");
		jq360("#btnPaginador").text(recorreSegmentos + " / " + totalSegmentos);
		jq360("#btnPaginador").removeClass("ocultar").addClass("mostrar");
	}
}

//  ============================================================================================================
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
