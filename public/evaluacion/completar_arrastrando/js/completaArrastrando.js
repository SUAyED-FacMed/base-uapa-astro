
function iniciar() {
	identificaPlataforma();
	creaArrastrar();
	switch (idioma) {
		case "ENG":
			jq360("#btnRevisar").text("Check"); //ic("Check"
			jq360("#btnReiniciar").text("Next attempt"); //ic("Next attempt")
			break;
		default:
			jq360("#btnRevisar").text("Revisar"); //ic("Revisar")
			jq360("#btnReiniciar").text("Siguiente intento"); //ic("Próximo intento"
	}
	jq360('#btnRevisar').show();
	jq360('#btnReiniciar').hide();
	if (elementosPorSegmento < reactivosMostrar) { // los botones de paginas...
		jq360("#btnPaginador").show();
		if (carruselContinuo) {
			jq360(".cProximo").removeClass("invisible").addClass("visible");
			jq360(".cPrevio").removeClass("invisible").addClass("visible");
		}
		else {
			jq360(".cProximo").removeClass("invisible").addClass("visible");
			jq360(".cPrevio").removeClass("visible").addClass("invisible");
		}
	}

	if (calificaPregunta) { // RAAR oct 14,18: para despues...al desarrollar para AGN el recurso scormu2_act1 se observa...
		totalPreguntas = reactivosMostrar;
	}
	else {
		totalPreguntas = jq360(".casilla").length;
	}
	DragDrop();
	iniciaTooltip();
}
function DragDrop() {
	jq360(".dropup-content .fa-search-plus").click(function () {
		var self = this;
		//	alert ("Zoom "+jq360(self).parents(".respuesta").find(".draggable").attr("data"));
		var imagen = jq360(self).parents(".respuesta").find(".draggable").attr("data");
		//https://www.w3schools.com/howto/howto_css_modal_images.asp
		var modal = document.getElementById("modalZoom");
		var modalImg = document.getElementById("imgZoom");
		// Get the <span> element that closes the modal
		///var span = document.getElementsByClassName("close")[0];
		var span = document.getElementById("closeZoom");
		// When the user clicks on <span> (x), close the modal
		span.onclick = function () {
			modal.style.display = "none";
		}
		modal.style.display = "block";
		//modalImg.src = this.src;

		modalImg.src = imagen;
	});

	if (esMobil) {
		jq360(".respuesta .carrusel").mouseover(function () {
			jq360(".mostrar .casilla:not(.ocupado):first").addClass("seleccionRapida");
		});
		jq360(".respuesta .carrusel").mouseleave(function () {
			jq360(".mostrar .casilla").removeClass("seleccionRapida");
		});
		jq360(".respuesta .carrusel").click(function () {
			if (seleccionRapida) {
				var cualLee = jq360('.mostrar .casilla:not(.ocupado):first');
				if (cualLee.length) {
					agregaResp(jq360('.mostrar .casilla:not(.ocupado):first'), jq360(this)); // orale...jala...
				}
			}
		});

	}
	else {
		jq360(".respuesta .carrusel").mouseover(function () {
			/*		//https://www.w3schools.com/howto/howto_css_modal_images.asp
					var modal = document.getElementById("modalZoom");
					var modalImg = document.getElementById("imgZoom");
					// Get the <span> element that closes the modal
					///var span = document.getElementsByClassName("close")[0];
					var span = document.getElementById("closeZoom");
					// When the user clicks on <span> (x), close the modal
					span.onclick = function() { 
					modal.style.display = "none";
					}
					modal.style.display = "block";
					//modalImg.src = this.src;
					//modalImg.src = 'ejemplo/autoconocimiento.png';*/

			if (seleccionRapida) { //.casilla:empty:first
				jq360(".mostrar .casilla:not(.ocupado):first").addClass("seleccionRapida");
			}
		});
		jq360(".respuesta .carrusel").mouseleave(function () {
			if (seleccionRapida) {
				jq360(".mostrar .casilla").removeClass("seleccionRapida");
			}
		});
		jq360(".respuesta .carrusel").dblclick(function () {
			if (seleccionRapida) {
				var cualLee = jq360('.mostrar .casilla:not(.ocupado):first');
				if (cualLee.length) {
					console.log("DOBLE-CLIC: se dio doble clic para casilla " + jq360('.mostrar .casilla:not(.ocupado):first').attr('id'));
					agregaResp(jq360('.mostrar .casilla:not(.ocupado):first'), jq360(this)); // orale...jala...
				}
			}
		});
	}

	jq360(".carrusel").draggable({
		cursorAt: { top: 0, left: 0 },
		cursor: 'move', // no percibo que haga algo..., sin definirlo pone el cursor de move
		revert: true, // para que se regrese el elemento a su lugar de origen si no se acepta
		stack: ".carrusel",//poner z-index automático, para poner al frente al elemento que se esta moviendo..

		start: function () {                    /* JLBG Agosto 25, 2021; agregué función START para usar efecto visual de reducir el arrastrable al iniciar */
			// console.log('Inicia DRAG')
			jq360(this).css('transition', 'transform .15s ease-in-out');
		},

		drag: function () {					// <<<<<<<<<<<============== JLBG Oct 16, 2019, función para ocultar la lupa al iniciar el arrastre
			// console.log("Durante DRAG");    /* JLBG Agosto 25, 2021; ajuste para poner compactación del elemento arrastrable*/
			jq360(this).css('-webkit-transform', 'scale(0.5, 0.5)')
				.css('-moz-transform', 'scale(0.5, 0.5)')
				.css('-ms-transform', 'scale(0.5, 0.5)')
				.css('-o-transform', 'scale(0.5, 0.5)')
				.css('transform', 'scale(0.5, 0.5)')
				.css('transform-origin', '-10% -10%')
				;
			jq360(this).parent().find(".iconoLupa").css("display", "none");
		},

		stop: function () {					// <<<<<<<<<<<============== JLBG Oct 16, 2019, función para mostrar la lupa al terminar el arrastre
			// console.log("Termina DRAG\n--------------------");    /* JLBG Agosto 25, 2021; ajuste para quitar compactación del elemento arrastrable*/
			jq360(this).css('-webkit-transform', 'none')
				.css('-moz-transform', 'none')
				.css('-ms-transform', 'none')
				.css('-o-transform', 'none')
				.css('transform', 'none')
				.css('top', '')
				.css('left', '')
				;
			jq360(this).parent().find(".iconoLupa").css("display", "initial");
		}
	});

	jq360(".casilla").droppable({
		tolerance: 'pointer',	/* JLBG Agosto 25, 2021; TOLERANCE: ajuste para resaltar caja al tocar con la respuesta, era 'pointer'- resalta caja al entrar el cursor a la caja */
		accept: '.carrusel',
		hoverClass: "dragOver",
		drop: function (event, ui) {	 // esto es solo un evento que se dispara..al soltar
			console.log("DROP: se soltó respuesta en casilla " + jq360(this).attr('id'));
			agregaResp(jq360(this), jq360(ui.draggable));
			DragDrop();
			clicPlayPause();
		},  // de la función drop
	});    // de la función droppable
}

function limpiaRespuestas() {
	var numCasillas = jq360(".pregunta .carrusel").length;
	var numCasillas = jq360(".casilla").length;
	var ocupados = jq360(".ocupado").length;
	if (ocupados == numCasillas) { //en lugar de reactivosMostrar pongo la cantidad de casillas, una respuesta para varias casillas...
		jq360(".respuestas").css("display", "none");
		jq360(".carrusel-respuestas").hide();
		if (formatoColumnas) { //Para reacomodar la pantalla al eliminar la columna de respuestas
			jq360("#reactivo").removeClass("col-md-9 col-lg-9 col-sm-9 col-xs-9").addClass("col-md-12 col-lg-12 col-sm-12 col-xs-12");
			jq360("#respuesta").removeClass("col-md-3 col-lg-3 col-sm-3 col-xs-3");
		}
	}

	if (carruselRespuestas) {
		var t1 = jq360(".mySlides.usado");
		var t2 = jq360(".mySlides");
		if (jq360(".mySlides.usado").length == jq360(".mySlides").length) {
			jq360(".carrusel-respuestas").hide();
		}
	}
}

function agregaResp(casilla, arrastrable) { // casillaRespuesta es un apuntador, un receptor de this...del droppable
	let casillas = jq360('.casilla');
	var numQuedan = arrastrable.attr('data-quedan'); // de origen asigno cuantas veces se usa hasta agotar...

	var swap = false;
	if (casilla.hasClass('intento')) {
		return
	}
	if (!casilla.hasClass('ocupado')) {
		if (debug) {
			var tmpPulse = jq360(casilla).find('.pulso');
			casilla.text('');
			casilla.append(tmpPulse);
		}
	}

	var padre = jq360(arrastrable).parent();
	var clon = arrastrable.clone();
	if (padre.attr('id') === casilla.attr('id')) {
		return
	}
	if (padre.hasClass('casilla')) {
		console.log('DESDE CASILLA');
		var respPrevia = jq360(casilla).find('.carrusel').detach();
		clon.draggable()
			.appendTo(casilla)
			.css({
				'top': '',
				'left': '',
				'transform': ''
			})
			.removeClass('ui-draggable-dragging');
		jq360(arrastrable).detach();
		jq360(padre).append(respPrevia);
		swap = true;
	}
	else {
		console.log('DESDE CARRUSEL')
		if (!casilla.hasClass('ocupado')) {
			clon.draggable()
				.appendTo(casilla)
				.css({
					'top': '',
					'left': '',
					'transform': '',
				})
				.removeClass('ui-draggable-dragging');
			swap = true;
		}
	}
	if (swap) {
		casillas.each(function (casilla) {
			jq360(this).removeClass('ocupado');
			if (jq360(this).find('.carrusel').length > 0) {
				jq360(this).addClass('ocupado').removeClass('sinRespuesta');
			}
			jq360(this).removeClass('video');
			if (jq360(this).find('video').length > 0) {
				jq360(this).addClass('video');
			}
		});

		if (carruselRespuestas) { // aqui, antes de que numQuedan sea 0
			if (jq360('.carrusel-respuestas').css('display') == 'none') {
				return
			}
			var spanActivo = jq360("span.active");
			var idAttrActivo = jq360("span.active").attr("id");
			var idActivo = idAttrActivo.substring(3);
			var slideActivo = jq360("#slide" + idActivo);
			if (numQuedan == 1) {  //si es uno ya es para quitar...por las respuestas que se usan mas de una vez
				if (!padre.hasClass('casilla')) {
					jq360(spanActivo).addClass("usado");
					jq360(slideActivo).addClass("usado");
					showSlides(slideIndex);
				}
			}
		}
		numQuedan--;
		arrastrable.attr('data-quedan', numQuedan);
		clon.attr('data-quedan', numQuedan);
		iniciaTooltip();
		limpiaRespuestas();
	}
	return
}

function revisar() {
	var ocupados = jq360(".ocupado");
	var casillas = jq360(".casilla");
	if (ocupados.length != casillas.length) {//en lugar de reactivosMostrar pongo respuestas.length, es mas de una respuesta por pregunta...
		mostrarMensaje(2, 1);
		jq360(".casilla").removeClass("sinRespuesta");
		jq360(".casilla:not(.ocupado)").addClass("sinRespuesta");
	}
	else {
		jq360(".casilla").removeClass("sinRespuesta");
		calificar();
		revisaBuenas();
	}
}

function quitarTagsAudioVideo(cadena) {
	if (cadena.startsWith('<audio') || cadena.startsWith('<video')) {
		var antes = cadena.substring(0, 6);
		var pos = cadena.indexOf('>', 12);
		var despues = cadena.substring(pos);
		return (antes + despues)
	}
	return cadena
}

function comparaRespuesta(respuestaCorrecta, respuestaColocada) {  // Esta funcion es por que hay puede haber multiples respuestas validas...
	var txtCorrecto = quitarTagsAudioVideo(respuestaCorrecta);
	var txtColocado = quitarTagsAudioVideo(respuestaColocada);
	var respStringDrop = "|" + quitarAcentos(txtCorrecto) + "|";
	var respStringColocada = "|" + quitarAcentos(txtColocado) + "|";

	if (respStringDrop.indexOf(respStringColocada) != -1) {
		return true;
	}
	else {
		return false;
	}
}

function calificar() {
	jq360('#btnRevisar').hide();
	jq360('#btnReiniciar').show();

	var preguntas = jq360(".reactivo");
	var reactivoCorrecto = 0;
	var casillaTotal = 0;
	jq360('[id^=audio], [id^=video]').each(function () {
		jq360(this)[0].pause();
	});
	jq360('[id^=pause]').css("display", "none");
	jq360('[id^=play]').css("display", "block");
	jq360('.casilla').removeClass('intento');

	jq360('.casilla audio, .casilla video, .rangos').attr('disabled', true);
	jq360.each(preguntas, function (ind, estaPregunta) {
		jq360(estaPregunta).find(".carrusel").draggable(); //RAAR Feb 18:si no uso esto, a partir del tercer intento,  marcar error, que falta inicializar...
		jq360(estaPregunta).find(".carrusel").draggable("disable");

		var respuestas = jq360(estaPregunta).find('.casilla');
		var casillaCorrecta = 0;
		jq360.each(respuestas, function () {
			var respuestaCorrecta = jq360(this).attr("data-resp");

			var respuestaColocada = jq360(this).find('div:last-child').attr("data-resp")

			if (comparaRespuesta(respuestaCorrecta, respuestaColocada)) {
				jq360(this).addClass("correcto");
				casillaCorrecta++;
				if (!calificaPregunta) {
					jq360(this).find(".OK").show();
				}
			}
			else {
				jq360(this).addClass("incorrecto");
				if (!calificaPregunta) {
					jq360(this).find(".noOK").show();
				}
			}
		});
		casillaTotal += casillaCorrecta;
		if (casillaCorrecta == respuestas.length) {
			reactivoCorrecto++;
			if (mostrarRetroIndividual) {
				jq360(estaPregunta).find(".OK:first").show();
				jq360(estaPregunta).addClass("correcto");
			};
		}
		else {
			if (mostrarRetroIndividual) {
				jq360(estaPregunta).find(".noOK:first").show()
				jq360(estaPregunta).addClass("incorrecto");
			};
		}
	});
	correctas = (calificaPregunta ? reactivoCorrecto : casillaTotal);
	intentos++;
}

function revisaBuenas() {
	var res = 0;
	if (typeof (califXaciertos) === 'undefined') { califXaciertos = true; }
	res = (califXaciertos) ? correctas : Math.floor(10 * correctas / totalPreguntas);

	switch (idioma) {
		case "ENG":
			var txtResp = (correctas == 1) ? " right answers." : " right answers.";
			mostrarEval("", "Result", "You have gotten " + correctas + "/" + totalPreguntas + txtResp + "<br/><br/>" + asignarEvaluacion(res));
			break;
		default:
			var txtResp = (correctas == 1) ? " respuestas correctas." : " respuestas correctas.";
			mostrarEval("", "Resultado", "Obtuviste " + correctas + "/" + totalPreguntas + txtResp + "<br/><br/>" + asignarEvaluacion(res));
	}
	iniciaAmbienteScorm(ambSCORM, barraSCORM, idObjetivo);
	switch (guardarCalificacion) {
		case 0:
			guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, correctas, totalPreguntas);
			break;
		case -1:
			calificacionMasAlta = (correctas > calificacionMasAlta ? correctas : calificacionMasAlta);
			if ((intentos + 1) == maxIntentos) {
				guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, calificacionMasAlta, totalPreguntas);
			}
			break;
		default:
			if ((intentos + 1) == guardarCalificacion) {
				guardaCalificacionScorm(ambSCORM, barraSCORM, idObjetivo, correctas, totalPreguntas);
			}
			break;
	}
}

function reiniciar() {  //se invoca en el boton Next Atempt, quito taches y activo casillas de respuesta...
	jq360('#btnRevisar').show();
	jq360('#btnReiniciar').hide();
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
			correctas = 0;
			totalPreguntas = 0;
			totalSegmentos = 0;
			segmentoActual = 1; // por lo menos existe el primer segmento o sea el unico
			jq360(".row.reactivos .reactivo").remove();
			jq360(".row.carrusel-respuestas .mySlides").remove();
			jq360(".row.carrusel-respuestas .dot-container span.dot").remove();
			if (mezclarPreguntas) { reactivos.sort(function (a, b) { return 0.5 - Math.random() }); }
			creaIndice();
			divideReactivosQF_A(reactivosMostrar);
			if (mezclarRespuestas) { reordenaArreglo(respuestas) };
			iniciar();
		}
		var cuentaCorrectas = 0;
		if (calificaPregunta) {
			cuentaCorrectas = reactivosMostrar;
		}
		else {
			cuentaCorrectas = jq360(".casilla").length;
		}
		if ((correctas != cuentaCorrectas) || siguienteIntentoBlanco) {
			jq360(".respuestas").css("display", "block"); //RAAR Feb 20,19: Revisar, doble ocultamiento contra renglon 452 jq360.each(respInc, function(indice) {
			if (formatoColumnas) {
				jq360("#reactivo").removeClass("col-md-12 col-lg-12 col-sm-12 col-xs-12").addClass("col-md-9 col-lg-9");
				jq360("#respuesta").addClass("col-md-3 col-lg-3");
			}
		}
		jq360('.casilla audio, .casilla video, .rangos').attr('disabled', false);

		jq360(".pulso").hide();
		jq360('.reactivo.correcto, .reactivo.incorrecto').removeClass('correcto incorrecto')
		var listadoPreguntas = jq360('.reactivo');
		jq360.each(listadoPreguntas, function () { //Recorro cada reactivo...
			selfSubItem = this;
			var incorrecto = jq360(selfSubItem).find(".incorrecto");
			jq360.each(incorrecto, function () {
				let pulsos = jq360(this).find('.pulso');
				let resp = jq360(this).attr('data-resp');
				jq360(this).text('');
				jq360(this).prepend(pulsos[1]).prepend(pulsos[0]);
				jq360(this).removeClass('incorrecto ocupado');
				if (debug) {
					jq360(this).append('<sup>' + resp);
				}
			});
			if (siguienteIntentoBlanco) {
				var correcto = jq360(selfSubItem).find(".correcto");
				jq360.each(correcto, function () {  //se recorre por cada casilla correcta en el reactivo
					let pulsos = jq360(this).find('.pulso');
					let resp = jq360(this).attr('data-resp');
					jq360(this).text('');
					jq360(this).prepend(pulsos[1]).prepend(pulsos[0]);
					jq360(this).removeClass('correcto ocupado');
					if (debug) {
						jq360(this).append('<sup>' + resp);
					}
				});
			}
		});
		if (!siguienteIntentoBlanco) {
			jq360('.casilla.correcto').addClass('intento');
		}
		jq360("div[class*='segmento']").hide();
		segmentoActual = 1;
		jq360(".segmento" + segmentoActual).removeClass("ocultar").addClass("mostrar");
		jq360(".segmento" + segmentoActual).show();
		jq360("#btnPaginador").text("" + segmentoActual + " / " + totalSegmentos);
		if (elementosPorSegmento < reactivosMostrar) { // los botones de paginas...
			jq360("#btnPaginador").show();
			if (carruselContinuo) {
				jq360(".cProximo").removeClass("invisible").addClass("visible");
				jq360(".cPrevio").removeClass("invisible").addClass("visible");
			}
			else {
				jq360(".cProximo").removeClass("invisible").addClass("visible");
				jq360(".cPrevio").removeClass("visible").addClass("invisible");
			}
		}
		var respInc = jq360('.carrusel');
		jq360.each(respInc, function () {
			var numQuedan = jq360(this).attr('data-quedanInicial'); // Al debuggear Inicial aparece con minuscula inicial, ojo con esto...
			jq360(this).attr('data-quedan', numQuedan); //RAAR Ago 3,18: reinicio el contador de uso de las casillas respuesta...											
			jq360(this).attr("style", "position: relative;").css("display", "");
			jq360(this).parent().css("display", "");
		});

		if (siguienteIntentoBlanco || (correctas != cuentaCorrectas)) {
			jq360("div.mySlides > div.respuesta").css("display", "");
			jq360("div.mySlides > div.respuesta > object").css("display", "");
			jq360(".carrusel-respuestas").show();
			jq360(".usado").show();
			jq360(".usado").removeClass("usado");
			slideIndex = 0;
			showSlides(slideIndex);
		}
	}
	else {
		mostrarMensaje(1);
	}
	iniciaTooltip();
}

function quitarAcentos(str) {
	str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();
	// remove accents, swap ñ for n, etc
	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"; //Le tengo que quitar que elimine la coma, para que la comparacion funcione	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"; 
	var to = "aaaaeeeeiiiioooouuuunc------"; // RAAR, Ago13,18, le agrego de nuevo la coma, funcionara?, por las clases para las casillas de respuesta...
	for (var i = 0, l = from.length; i < l; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}
	str = str.replace(/[^a-z0-9 -|]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-'); // collapse dashes
	return str;
}//

function versionBrowser() {
	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browserName = navigator.appName;
	var fullVersion = '' + parseFloat(navigator.appVersion);
	var majorVersion = parseInt(navigator.appVersion, 10);
	var platform = navigator.platform;
	var minorVersion, nameOffset, verOffset, ix, cad1, cad2;

	//	nAgt = "Mozilla/5.0 (iPad; CPU OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) OPiOS/14.0.0.104835 Mobile/13G36 Safari/9537.53";  //OPERA
	//	nAgt = "Mozilla/5.0 (iPad; CPU OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) FxiOS/8.1.1b4948 Mobile/13G36 Safari/601.1.46";  //Firefox
	//	nAgt = "Mozilla/5.0 (iPad; CPU OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) CriOS/60.0.3112.89 Mobile/13G36 Safari/601.1.46";  //Chrome
	//	
	//	platform = "iPad";
	if (platform == "iPad") {
		// firefox - FxiOS substring de userAgent FxiOS/8.1.1b4948
		// chrome  - CriOS substring de userAgent CriOS/60.0.3112.89
		// opera   - OPiOS substring de userAgent OPiOS/14.0.0.104835
		cad1 = nAgt.substring(nAgt.lastIndexOf("iOS") - 2);
		cad2 = cad1.split(" ");
		browserName = cad2[0].substring(0, cad2[0].lastIndexOf("/"));
		if (browserName == "CriOS") { browserName = "Chrome" };
		if (browserName == "FxiOS") { browserName = "Firefox" };
		if (browserName == "OPiOS") { browserName = "Opera" };
		fullVersion = cad2[0].substring(cad2[0].lastIndexOf("/") + 1);
	}
	else {
		cad1 = nAgt.substring(nAgt.lastIndexOf(" ") + 1);
		// Edge, Firefox, Opera
		if (((cad1.indexOf("Edge")) != -1) || ((cad1.indexOf("Firefox")) != -1) || ((cad1.indexOf("OPR")) != -1)) {
			browserName = cad1.substring(0, cad1.indexOf("/"));
			if (browserName == "OPR") browserName = "Opera";
			fullVersion = cad1.substring(cad1.indexOf("/") + 1);
		}
		else {
			// Safari
			cad2 = nAgt.substring(nAgt.indexOf("Version"));
			if (((cad2.indexOf("Version")) != -1)) {
				browserName = cad2.substring(cad2.lastIndexOf(" ") + 1, cad2.lastIndexOf("/"));
				fullVersion = cad2.substring(cad2.indexOf("/") + 1, cad2.lastIndexOf(" "));
			}
			else {
				// Chrome
				cad2 = nAgt.substring(nAgt.indexOf("Chrome"));
				if (((cad2.indexOf("Chrome")) != -1)) {
					browserName = cad2.substring(cad2.indexOf("Chrome"), cad2.indexOf("/"));
					fullVersion = cad2.substring(cad2.indexOf("/") + 1, cad2.lastIndexOf(" "));
				}
				else {
					// Internet Explorer
					browserName = "Internet Explorer";
					fullVersion = cad2.substring(cad2.indexOf("rv") + 3, cad2.lastIndexOf(")"));
				}
			}
		}

		majorVersion = parseInt('' + fullVersion, 10);
		minorVersion = fullVersion.substring(fullVersion.indexOf(".") + 1);
		if (isNaN(majorVersion)) {
			fullVersion = '' + parseFloat(navigator.appVersion);
			majorVersion = parseInt(navigator.appVersion, 10);
			minorVersion = "";
		}
	}

	var objSalida = { name: browserName, version: fullVersion };
	return objSalida;
}

function identificaPlataforma() {
	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browserName = navigator.appName;
	var fullVersion = '' + parseFloat(navigator.appVersion);
	var majorVersion = parseInt(navigator.appVersion, 10);
	var platform = navigator.platform;
	vBrowser = versionBrowser(); // la declaro global
	if ("ontouchstart" in document.documentElement) {
		jq360("#watermark").append(vBrowser.name + " " + vBrowser.version + "<br>Dispositivo es Touch Screen<br>");
	}
	else {
		jq360("#watermark").append(vBrowser.name + " " + vBrowser.version + "<br>Dispositivo NO es Touch Screen<br>");
	}
}

