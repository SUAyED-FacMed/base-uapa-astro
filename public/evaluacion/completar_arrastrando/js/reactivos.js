// JavaScript Document
var min = 10;
var max = 18;
var preguntas = [];
var respuestas = [];
var retro = [];
var indices = [];
var preg = [];
var respOriginales = [];
var respDesordenadas1 = [];
var respDesordenadas2 = [];
var intentos = 0;
var correctas = 0;
var totalPreguntas = 0;
var totalSegmentos = 0;
var segmentoActual = 1; // por lo menos existe el primer segmento o sea el unico
var esMobil = false;

var carruselRespuestas = true;
var formatoColumnas = false;          // true: muestra preguntas y respuesta en columnas; false muestra preguntas y respuesta apiliados
var idPlayPauseClic = '';

var espacios = "&nbsp;&nbsp;&nbsp;&nbsp;";
var slideIndex = 0;

jq360(document).ready(function () {//RAAR Sep 13,18: Aqui arrancamos, me traigo esto de index.html
	if (!carruselRespuestas) { jq360(".carrusel-respuestas").hide() }
	if (window.name == "movil") {
		esMobil = true;
	}
	else {
		esMobil = esPortable();
	}
	console.log("ready(), es un aparato mobil? " + esMobil);
	console.log("ready(), modo debug? " + debug);
	if (window.parent.data_crm) { //para el portal CRM, 
		verLongitud = false;
		debug = false;
		mostrarRetroIndividual = true;
		mostrarRetroFinal = true;
		elementosPorSegmento = 3;
	}
	if (esMobil) {
		elementosPorSegmento = elementosPorSegmentoMovil;
		jq360(".info").show;
		jq360(".instrucciones").addClass("estilosinstruccion");
		jq360(".instrucciones").slideUp(1);
		invPregResp = true;
		jq360("hr.separador").show();
		if (jq360(".instrucciones").text().trim() == "") {
			jq360(".instrucciones").remove();
			jq360(".info").remove();
			jq360("hr.separador").remove();
		}
	}
	else {
		jq360(".info").hide();
		jq360("hr.separador").hide();
		jq360("#etiquetaRespuesta").hide();
	}
	for (var i = 0; i < reactivos.length; i++) { // para saber el orden como esta en listaReactivos.js
		reactivos[i].indiceOriginal = i + 1;
	}
	if (mezclarPreguntas) { reactivos.sort(function (a, b) { return 0.5 - Math.random() }); }
	creaIndice();
	divideReactivosQF_A(reactivosMostrar);
	if (mezclarRespuestas) { reordenaArreglo(respuestas) };
	iniciar();
	jq360(".info").click(function () {
		if (jq360(this).hasClass("hiden")) {
			jq360(".instrucciones").slideUp(300);
			jq360(this).removeClass("hiden");
		}
		else {
			jq360(".instrucciones").slideDown(300);
			jq360(this).addClass("hiden");
		}
	});
	if (flechaArriba) {
		jq360('.ir-arriba').click(function () {
			jq360('body, html').animate({
				scrollTop: '0px'
			}, 300);
		});
		jq360(window).scroll(function () {
			if (jq360(this).scrollTop() > 0) {
				jq360('.ir-arriba').slideDown(300);
			} else {
				jq360('.ir-arriba').slideUp(300);
			}
		});
	}
	else {
		jq360('.ir-arriba').hide();
	}
	clicPlayPause();
});

function clicPlayPause() {
	// console.log('----------------------');
	jq360('.casilla.ocupado .play, .casilla.ocupado .pause, .mySlides:not(.usado) .play, .mySlides:not(.usado) .pause').click(function () {
		idPlayPauseClic = jq360(this).parent().parent().parent().find('audio, video').attr('id');
		console.log('CLIC en ' + idPlayPauseClic + ', ' + jq360(this).parent().attr('id'));
	})
	// console.log('CASILLA PLAY: ' + jq360('.casilla.ocupado .play').length);
	// console.log('CASILLA PAUSE: ' + jq360('.casilla.ocupado .pause').length);
	// console.log('RESPUESTA PLAY: ' + jq360('.mySlides:not(.usado) .play').length);
	// console.log('RESPUESTA PAUSE: ' + jq360('.mySlides:not(.usado) .pause').length);
}

function iniciaTooltip() {
	jq360('[data-toggle="tooltip"]').each(function () { //JLBG para activar los tooltips, el title de retro...
		var options = {
			html: true
		};
		if (jq360(this)[0].hasAttribute('data-type')) {
			options['template'] =
				'<div class="tooltip ' + jq360(this).attr('data-type') + '" role="tooltip">' +
				'	<div class="tooltip-arrow"></div>' +
				'	<div class="tooltip-inner"></div>' +
				'</div>';
		}
		jq360(this).tooltip(options);
	});
}

function escribeArreglo(arreglo) {
	for (i = 0; i < arreglo.length; i++) {
		for (var prop in arreglo[i]) {
			if (arreglo[i].hasOwnProperty(prop)) {
				document.writeln('<p style="text-align: left">' + prop + ' || ' + arreglo[i][prop] + '</p>');
			}
		}
	}
	document.writeln('<hr>');
}

// solo voltea los strings, los voy eliminado a partir de abril 3, 2018, RAAR
function ic(c) {
	var x = c.length;
	var ci = "";
	while (x >= 0) {
		ci += c.charAt(x);
		x--;
	}
	return ci;
}

function creaIndice() {
	var i = 0;
	for (i = 0; i < reactivos.length; i++) {
		indices.push(i)
	}
	reordenaArreglo(indices);
}

function divideReactivosQF_A(numReactivos) {  //  RA-01, RA-03,   QF-A
	var listaRespuestas = []; // Para generar un listado de respuestas sin repetidos
	var listaTodas = [];
	var tantos = 0;
	for (i = 0; i < numReactivos; i++) { //aqui el ciclo es hasta numreactivos(=reactivosMostrar) por que las respuestas están en un mismo arreglo, pero desde aqui la lista de respuestas puede ser mayor...
		preguntas.push({ txt1: "", txt2: "", ind: 0, listaResp: "", listaFA: "" });
		preguntas[i].txt1 = reactivos[i].Q;
		preguntas[i].txt2 = reactivos[i].F;
		preguntas[i].ind = indices[i];
		preguntas[i].listaResp = reactivos[i].A;
		preguntas[i].listaFA = reactivos[i].FA;
	}

	var enlaza = "";
	for (var i = 0; i < numReactivos; i++) {  // leo todos las respuestas de reactivos y concateno, ojo q va a haber pipes "|".
		enlaza += reactivos[i].A.join("|");
		if (i < numReactivos - 1) { enlaza += "|"; }
	}
	listaTodas = enlaza.split("|");
	for (var i = 0; i < listaTodas.length; i++) {
		if (listaRespuestas.indexOf(listaTodas[i]) == -1) {  //si no esta incluyelo...	
			listaRespuestas.push(listaTodas[i]);
		}
	}
	listaRespuestas.sort();
	listaTodas.sort();
	for (i = 0; i < listaRespuestas.length; i++) { // traslado a la variable global respuestas...
		tantos = cuentaElemento(listaTodas, listaRespuestas[i]); // en listaTodas leo cuantas incidencias tiene una respuesta...
		respuestas.push({ txt: listaRespuestas[i], ind: 0, incidencia: tantos });
	}
}

function cuentaElemento(arregloBusqueda, palabraBuscada) { // contar cuantas veces aparece una palabra en un arreglo
	var j = 0;
	var cuentaIncidencia = 0;
	for (j = 0; j < arregloBusqueda.length; j++) {
		if (arregloBusqueda[j] == palabraBuscada) {
			cuentaIncidencia++
		}
	}
	return cuentaIncidencia;
}

function reordenaArreglo(arreglo) {
	arreglo.sort(function (a, b) { return 0.5 - Math.random() }); // es un funcion de comparacion, math. produce valores -1 a 1, y provoca azar...
}

function creaArrastrar() { // Se arman las textos con sus correspondientes cajas...
	var cImg1 = 0, cAud1 = 0, cVid1 = 0, cImg2 = 0, cAud2 = 0, cVid2 = 0;
	var idCas = 0; //para cololar un ID unica a cada casilla droppable...

	var palomita = "<i class='palomita fas fa-check-circle'></i>";
	var tache = "<i class='tache fas fa-times-circle'></i>";

	jq360(".reactivos .lista-preguntas").each(function () { jq360(this).html(''); });
	jq360(".respuestas .lista-respuestas").each(function () { jq360(this).html(''); });

	if (invPregResp) {
		jq360(".respuestas").prependTo(".ejercicio-arrastrar");
		jq360(".carrusel-respuestas").prependTo(".reactivos");
	}
	var cuentaPreguntasSegmento = 0;
	var cuentaSegmentos = 1; // iniciamos en 1, el cero se presta a confusion...
	for (var i = 0; i < preguntas.length; i++) { // Armo las preguntas....
		var longPreg = calculaLong(preguntas[i]);   // JLBG 16 mzo, 2019  Funcion para calcular la longitud de la pregunta mas sus respuestas, para que muestre al final de la pregunta
		var preg = preguntas[i].txt1.split("@");
		var cuantasArrobas = preg.length - 1; // Para formar las casillas droppable de respuesta, puede haber respuestas dummy o sea de mas asi evito casillas de mas.
		var numeralPregunta = (ponerNumeral ? (i + 1) : '') + (ponerNumeroPreguntas ? '/' + reactivosMostrar : '') + ((ponerNumeral || ponerNumeroPreguntas) ? '.&nbsp;&nbsp;' : '');  // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true		
		if (cuentaPreguntasSegmento == elementosPorSegmento) {
			cuentaPreguntasSegmento = 1;
			cuentaSegmentos++;
		}
		else {
			cuentaPreguntasSegmento++;
		}
		var enlaza = '';
		for (var k = 0; k < preguntas[i].listaResp.length; k++) { //Para que una pregunta sepa todas las respuestas de sus casillas
			enlaza += "|";
			textoTemp = preguntas[i].listaResp[k];
			enlaza += textoTemp;
		}
		enlaza += "|";

		textoRetroReactivoCorrecta = preguntas[i].txt2[0]; //RAAR Ago 16,18: uso clase retroBien para desplegar retro por arroba, puede colisionar
		textoRetroReactivoIncorrecta = preguntas[i].txt2[1];
		var rCorrecta = '<div class="pulso OK" data-toggle="tooltip" data-placement="auto" data-type="success" title="' + tam(textoRetroReactivoCorrecta, 1) + '">' + palomita + '</div>'; // Esto así por que si no es tooltip, el funcionamiento cambia y solo se inserta la imagen...
		var rIncorrecta = '<div class="pulso noOK" data-toggle="tooltip" data-placement="auto" data-type="danger" title="' + tam(textoRetroReactivoIncorrecta, 1) + '">' + tache + '</div>';

		jq360('.reactivos')
			.append('<div>');
		jq360('.reactivos div:last')
			.addClass('reactivo')
			.addClass('segmento' + cuentaSegmentos)
			.attr('id', 'preg' + preguntas[i].ind)
			.attr('data-drop', preguntas[i].ind)
			.attr('data-listaResp', enlaza)
			.append(rCorrecta)
			.append(rIncorrecta)
			.append(numeralPregunta + preg[0])
			;
		for (var j = 0; j < cuantasArrobas; j++) { //Creo una casilla por arroba,
			var objeto = objetoMultimedia(preguntas[i].listaResp[j], cImg1, cAud1, cVid1);
			cImg1 = objeto.contImagen;
			cAud1 = objeto.contAudio;
			cVid1 = objeto.contVideo;
			var debugRespuesta = '';
			if (debug) {
				debugRespuesta = '<sup>' + objeto.elemento + '</sup>';
			}
			var textValidaCorr = (preguntas[i].listaFA[j] == undefined ? '' : preguntas[i].listaFA[j].correcta);
			var textValidaInc = (preguntas[i].listaFA[j] == undefined ? '' : preguntas[i].listaFA[j].incorrecta);

			var rArrCorrecta = '<div class="pulso OK" data-toggle="tooltip" data-placement="auto" data-type="success" title="' + tam(textValidaCorr, 1) + '">' + palomita + '</div>';
			var rArrIncorrecta = '<div class="pulso noOK" data-toggle="tooltip" data-placement="auto" data-type="danger" title="' + tam(textValidaInc, 1) + '">' + tache + '</div>';

			jq360('.reactivos .reactivo:last')
				.append('<div>')
				.append(preg[j + 1]);
			jq360('.reactivos .reactivo div:last')
				.addClass('casilla')
				.attr('id', 'cas' + idCas)
				.attr('data-resp', objeto.elemento)
				.append(rArrCorrecta)
				.append(rArrIncorrecta)
				.append(debugRespuesta)
				;
			idCas++;
		}
	}

	for (var i = 0; i < respuestas.length; i++) {										 // JLBG Sep 2, 2021; armar respuestas con objetoMultimedia()
		let objeto = objetoMultimedia(respuestas[i].txt, cImg2, cAud2, cVid2);
		cImg2 = objeto.contImagen;
		cAud2 = objeto.contAudio;
		cVid2 = objeto.contVideo;
		if (respuestas[i].txt.length > 0) {
			var incidenciaRespuestas = (forzarRespuestaA ? forzarRespuestaA : respuestas[i].incidencia);
			jq360('.carrusel-respuestas').append('<div>');
			jq360('.carrusel-respuestas div:last')
				.addClass('mySlides')
				.attr('id', 'slide' + (i + 0))
				.append('<div>');
			jq360('.carrusel-respuestas .mySlides div:last')
				.addClass('respuesta')
				.append('<div>' + objeto.elemento);
			if (objeto.elemento.indexOf('<audio') >= 0) {
				jq360('.carrusel-respuestas .mySlides div:last')
					.append(objeto.nombre)
					.append(objeto.control)
					.append(objeto.barra);
			}
			if (objeto.elemento.indexOf('<video') >= 0) {
				jq360('.carrusel-respuestas .mySlides div:last')
					.prepend(objeto.nombre + '<br/>')
					.append(objeto.controlVideo)
					.append(objeto.barra);
			}
			jq360('.carrusel-respuestas .mySlides .respuesta div:last')
				.addClass('carrusel')
				.attr('data-resp', objeto.elemento)
				.attr('data-quedanInicial', incidenciaRespuestas)
				.attr('data-quedan', incidenciaRespuestas);

			jq360('.dot-container').append('<span>');
			jq360('.dot-container span').last()
				.addClass('dot')
				.attr('id', 'dot' + (i + 0))
				.attr('onclick', 'currentSlide(' + (i + 0) + ')');
		}
	}

	totalSegmentos = cuentaSegmentos;
	jq360("div[class*='segmento']").hide();
	segmentoActual = 1; // el primer segmento a desplegar...
	jq360(".segmento" + segmentoActual).removeClass("ocultar").addClass("mostrar");
	jq360(".segmento" + segmentoActual).show();
	if (totalSegmentos > segmentoActual) { // si solo hay una pagina no desplegamos paginador
		jq360("#btnPaginador").text(segmentoActual + " / " + totalSegmentos);
		jq360("#btnPaginador").show();
	}
	else {
		jq360('.paginador-segm').hide();
	}

	jq360(".pulso").hide();
	jq360("#btnPaginador").hide();

	if (carruselRespuestas) {
		jq360(".mySlides").hide();
		jq360('.mySlides:first').show();
		jq360('.dot:first').addClass('active');
		jq360(".respuestas .lista-respuestas").hide();
	}

	jq360('.dot-container').insertAfter('.mySlides:last');
	estandarizar();
}

function currentSlide(n) {
	var listaSpan = jq360("span.dot:not(.usado)");
	for (var pos = 0; pos < listaSpan.length; pos++) {
		var atributo = jq360(listaSpan[pos]).attr("id");
		if (atributo == "dot" + n) { break }
	}
	showSlides(slideIndex = pos);
}

function showSlides(n) {
	jq360(".usado").hide();
	jq360(".dot").removeClass("active");
	jq360(".mySlides:not(.usado)").hide();
	var slides = jq360(".mySlides:not(.usado)").length;
	if (n > (slides - 1)) { slideIndex = 0 }
	if (n < 0) { slideIndex = (slides - 1) }
	jq360(jq360(".mySlides:not(.usado)")[slideIndex]).fadeToggle();
	jq360(jq360(".dot:not(.usado)")[slideIndex]).addClass("active");
}

function avanzar() {
	var listaSpan = jq360("span.dot:not(.usado)");
	for (var pos = 0; pos < listaSpan.length; pos++) {
		if (jq360(listaSpan[pos]).hasClass("active")) {
			break;
		}
	}
	slideIndex = pos + 1;
	showSlides(slideIndex);
}

function regresar() {
	var listaSpan = jq360("span.dot:not(.usado)");
	for (var pos = 0; pos < listaSpan.length; pos++) {
		if (jq360(listaSpan[pos]).hasClass("active")) {
			break;
		}
	}
	slideIndex = pos - 1;
	showSlides(slideIndex);
}

function calculaLong(pregunta) {     // JLBG 2019, 16 mzo: funcion para construir la pregunta con todas sus respuestas, y poner su valor al final de la misma
	var x = pregunta.txt1.split("@");
	var nuevo = "";
	for (var i = 0; i < x.length - 1; i++) {
		nuevo += x[i];
		nuevo += pregunta.listaResp[i];
	}
	nuevo += x[x.length - 1];
	return nuevo.length;
}

function tam(cad, n) {// 1T, 0ele.esc.ord Es para imprimir la longitud del texto indicado, crm=var global de impresion, n para apagar en caso particular...
	var txt = "";
	if (verLongitud == false) { txt = (n == 1) ? cad : "" } // i n diferente de 1 pone nada
	else {
		txt = "&nbsp;<sup>" + cad.length + "</sup>";
		if (n == 1) { txt = cad + txt }
	}
	return txt;
}

function mostrarMensaje(clase, recurso) { //RAAR ago 18,18: Pongo funcion reversa
	if (!recurso) { recurso = -1 }
	var msgs = [,
		["Arrastra todas las respuestas a los espacios correspondientes.", "Please, drag all answers to appropriate spaces"],  // completar arrastrando
		["Llena todos los campos de texto.", "Please, fill out all text fields"],                  // completar escribiendo
		["Contesta todas las preguntas.", "Please, answer all questions"],                         // verdadero-falso, opcion-multiple
		["Ordena todos los reactivos para conocer tu resultado.", "Please, sort all sentences"],   // ordenar enunciados
		["Elige una respuesta para cada recuadro.", "Please, choose an answer for each list"],     // completar eligiendo
		["Contesta todas las preguntas.", "Please, drag all answers to appropriate spaces"]  // lista de verificación, antes CAEsquema
	];
	var tipo = "";
	var tit = "";
	var msg = "";
	var btnOK = "";
	switch (clase) {
		case 1: // intentos;
			switch (idioma) {
				case "ENG":
					tit = "Warning";
					msg = "You have reached maximum number of attempts: " + maxIntentos + "."; // empiezo a quitar los espejos...abril 26 2018

					btnOK = "OK";
					break;
				default:
					tit = "Atención";
					msg = "Has alcanzado el máximo número de intentos: " + maxIntentos + ".";
					btnOK = "Aceptar";
			}
			break;
		case 2: // Contestar TODO
			//tipo = "warning";
			switch (idioma) {
				case "ENG":
					tit = "Warning";
					msg = msgs[recurso][1]; //recurso,1
					btnOK = "OK";
					break;
				default:
					tit = "Atención";
					msg = msgs[recurso][0];  //recurso,0
					btnOK = "Aceptar";
			}
			break;
		default:
			//tipo = "error";
			tit = "Error de sistema";
			msg = "Condición desconocida";
			btnOK = "Aceptar";
	}

	swal({ title: tit, text: msg, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
}

function asignarEvaluacion(calificacion) {
	var mensaje = "";
	if (mostrarRetroFinal) {
		jq360.each(retroCal, function (indice) {
			if ((calificacion >= retroCal[indice].LimInf) && (calificacion <= retroCal[indice].LimSup)) {
				mensaje = (idioma == "ENG") ? retroCal[indice].Mensaje[1] : retroCal[indice].Mensaje[0];
			}
		});
	}
	mensaje = mensaje + '<br>' + textoRetroGeneral;
	return mensaje;
}

function mostrarEval(tipo, titulo, cadena) {
	switch (idioma) {
		case "ENG":
			//var btnOK = ic("KO");
			var btnOK = "OK";
			break;
		default:
			//var btnOK = ic("ratpecA");
			var btnOK = "Aceptar";
	}
	swal({ title: titulo, text: cadena, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
}

// JavaScript Document
function increaseFontSize() {
	var p = document.getElementsByTagName('p');
	for (i = 0; i < p.length; i++) {
		if (p[i].style.fontSize) {
			var s = parseInt(p[i].style.fontSize.replace("px", ""));
		} else {
			var s = 12;
		}
		if (s != max) {
			s += 1;
		}
		p[i].style.fontSize = s + "px"

		localStorage.tamano = s;
	}
}

function decreaseFontSize() {
	var p = document.getElementsByTagName('p');
	for (i = 0; i < p.length; i++) {
		if (p[i].style.fontSize) {
			var s = parseInt(p[i].style.fontSize.replace("px", ""));
		} else {
			var s = 12;
		}
		if (s != min) {
			s -= 1;
		}
		p[i].style.fontSize = s + "px"
	}

	localStorage.tamano = s;
}

function soloAbecedario(str) { // solo permito letras minusculas y guion medio sin caracteres especiales...
	//str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();
	// remove accents, swap ñ for n, etc
	/*	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"; 
		var to   = "aaaaeeeeiiiioooouuuunc------"; 
		for (var i = 0, l = from.length ; i < l ; i++) {
			str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
		}*/
	str = str.replace(/[^a-z0-9 -]/g, '') // quito todo lo que no sea minusculas, espacio y guion
		.replace(/\s+/g, '-') // los espacios los cambio a guion
		.replace(/-+/g, '-'); // las series de guion por un solo guion
	return str;
}

function esPortable() {
	if (navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/iPhone/i)
		// || navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
		|| navigator.userAgent.match(/Opera Mini/i)
		|| navigator.userAgent.match(/IEMobile/i)
	) {
		return true;
	} else {
		return false;
	}
}

function siguiente() {   // JLBG Abr.30 2020, arreglé recurso
	jq360(".segmento" + segmentoActual).removeClass("mostrar").addClass("ocultar");
	jq360(".segmento" + segmentoActual).hide();
	if (carruselContinuo) {
		segmentoActual = (segmentoActual < totalSegmentos ? ++segmentoActual : 1);
	} else {
		segmentoActual = (segmentoActual < totalSegmentos ? ++segmentoActual : segmentoActual);
		if (segmentoActual < totalSegmentos) {
			jq360(".cPrevio").removeClass("invisible").addClass("visible");
		} else {
			jq360(".cProximo").removeClass("visible").addClass("invisible");
			jq360(".cPrevio").removeClass("invisible").addClass("visible");
		}
	}
	jq360(".segmento" + segmentoActual).removeClass("ocultar").addClass("mostrar");
	jq360(".segmento" + segmentoActual).show();
	jq360("#btnPaginador").text("" + segmentoActual + " / " + totalSegmentos);
}

function anterior() {   // JLBG Abr.30 2020, arreglé recurso
	jq360(".segmento" + segmentoActual).removeClass("mostrar").addClass("ocultar");
	jq360(".segmento" + segmentoActual).hide();
	if (carruselContinuo) {
		segmentoActual = (segmentoActual > 1 ? --segmentoActual : totalSegmentos);
	} else {
		segmentoActual = (segmentoActual > 1 ? --segmentoActual : 1);
		if (segmentoActual > 1) {
			jq360(".cProximo").removeClass("invisible").addClass("visible");
		} else {
			jq360(".cPrevio").removeClass("visible").addClass("invisible");
			jq360(".cProximo").removeClass("invisible").addClass("visible");
		}
	}
	jq360(".segmento" + segmentoActual).removeClass("ocultar").addClass("mostrar");
	jq360(".segmento" + segmentoActual).show();
	jq360("#btnPaginador").text("" + segmentoActual + " / " + totalSegmentos);
}

function objetoMultimedia(opcion, cImagen, cAudio, cVideo) {
	var iconoPlay = '<i class="play fas fa-play-circle fa-3x"></i>';
	var iconoPause = '<i class="pause fas fa-pause-circle fa-3x"></i>';
	var iconoExpandirVideo = '<i class="fas fa-expand fa-2x botonexp"></i>';
	var iconoContraerVideo = '<i class="fas fa-expand fa-2x botonexp"></i>';
	var titulo = "";
	var elemento = "";
	var play = "";
	var pause = "";
	var control = "";
	var barraDeslizante = "";
	var contVideo = "";
	var nombre = "";
	var ext = "";
	var IDtmp = '';
	var obj = {};

	var posUltimaDiagonal = opcion.lastIndexOf('/') + 1;
	if (posUltimaDiagonal != 0) {
		ext = opcion.toLowerCase().substring(opcion.lastIndexOf('.') + 1);
	}

	switch (ext) {
		case "jpeg":             // IMAGENES
		case "jpg":
		case "gif":
		case "png":
		case "svg":
		case "bmp":
		case "ico":
			cImagen++;
			contador = cImagen;
			nombre = "Imagen " + contador;
			IDtmp = "imagen" + contador;
			// elemento = '<img id="imagen' + contador + '" class="zoom imagen" src=' + opcion + ' alt="" title="Imagen ' + contador + '" onclick="zoom(' + IDtmp + ')"><br/>';
			elemento = '<img class="imagen" src="' + opcion + '" alt="Imagen">';
			if (nombreMultimedia) { elemento = '<span class="encMM">Imagen ' + contador + '</span>' + elemento }
			break;
		case "mp3":               // AUDIO
			cAudio++;
			contador = cAudio;
			nombre = "Audio " + contador;
			if (nombreMultimedia) { titulo = '<span class="encMM" id="controles' + contador + '">Audio ' + contador + '</span>' };
			elemento = '<audio id="audio' + contador + '"><source src=' + opcion + ' type="audio/mpeg">El navegador no soporta elementos AUDIO</audio>';
			play = '<span id="play' + contador + '" onclick="reproducir()" style="display: block;" title="' + nombre + '">' + iconoPlay + '</span>';
			pause = '<span id="pause' + contador + '" onclick="pausar()" style="display: none;" title="' + nombre + '">' + iconoPause + '</span>';
			control = play + pause;
			barraDeslizante = '<input class="rangos" id="ctrlDeslizante' + contador + '" type="range" min="0" max="100" step="1">';
			break;
		case "wav":               // AUDIO
			cAudio++;
			contador = cAudio;
			nombre = "Audio " + contador;
			if (nombreMultimedia) { titulo = '<span class="encMM" id="controles' + contador + '">Audio ' + contador + '</span>' };
			elemento = '<audio id="audio' + contador + '"><source src=' + opcion + ' type="audio/wav">El navegador no soporta elementos AUDIO</audio>';
			play = '<span id="play' + contador + '" onclick="reproducir()" style="display: block;" title="' + nombre + '">' + iconoPlay + '</span>';
			pause = '<span id="pause' + contador + '" onclick="pausar()" style="display: none;" title="' + nombre + '">' + iconoPause + '</span>';
			control = play + pause;
			barraDeslizante = '<input class="rangos" id="ctrlDeslizante' + contador + '" type="range" min="0" max="100" step="1">';
			break;
		case "ogg":               // AUDIO
			cAudio++;
			contador = cAudio;
			nombre = "Audio " + contador;
			if (nombreMultimedia) { titulo = '<span class="encMM" id="controles' + contador + '">Audio ' + contador + '</span>' };
			elemento = '<audio id="audio' + contador + '"><source src=' + opcion + ' type="audio/ogg">El navegador no soporta elementos AUDIO</audio>';
			play = '<span id="play' + contador + '" onclick="reproducir()" style="display: block;" title="' + nombre + '">' + iconoPlay + '</span>';
			pause = '<span id="pause' + contador + '" onclick="pausar()" style="display: none;" title="' + nombre + '">' + iconoPause + '</span>';
			control = play + pause;
			barraDeslizante = '<input class="rangos" id="ctrlDeslizante' + contador + '" type="range" min="0" max="100" step="1">';
			break;
		case "mp4":               // VIDEO
			cVideo++;
			contador = cVideo;
			nombre = "Video " + contador;
			if (nombreMultimedia) { titulo = '<span class="encMM" id="controles' + contador + '">Video ' + contador + '</span>' };
			elemento = '<video id="video' + contador + '" title="' + nombre + '"><source src=' + opcion + ' type="video/mp4">El navegador no soporta elementos VIDEO</video>';
			play = '<span id="play' + contador + '" onclick="reproducir()" style="display: table-cell">' + iconoPlay + '</span>';
			pause = '<span id="pause' + contador + '" onclick="pausar()" style="display:none">' + iconoPause + '</span>';
			contVideo = '<span class="controlesVid" id="controles' + contador + '" style="display: inline-flex; align-items:center">' + play + pause + '\
			<input class="rangos" id="ctrlDeslizante' + contador + '" type="range" min="0" max="100" step="1"> \
			<span class="compr-exp" id="exp' + contador + '" onclick=" expande(' + contador + ')" style="display: table-cell">' + iconoExpandirVideo + '</span> \
			<span class="compr-exp" id="comp' + contador + '" onclick=" contrae(' + contador + ')" style="display:none">' + iconoContraerVideo + '</span></span>';
			break;
		case "webm":              // VIDEO
			cVideo++;
			contador = cVideo;
			nombre = "Video " + contador;
			if (nombreMultimedia) { titulo = '<span class="encMM" id="controles' + contador + '">Video ' + contador + '</span>' };
			elemento = '<video id="audio' + contador + '" title="' + nombre + '"><source src=' + opcion + ' type="video/webm">El navegador no soporta elementos VIDEO</video>';
			play = '<span id="play' + contador + '" onclick="reproducir()" style="display: table-cell">' + iconoPlay + '</span>';
			pause = '<span id="pause' + contador + '" onclick="pausar()" style="display:none">' + iconoPause + '</span>';
			contVideo = '<span class="controlesVid" id="controles' + contador + '" style="display: inline-flex; align-items:center">' + play + pause + '\
			<input class="rangos" id="ctrlDeslizante' + contador + '" type="range" min="0" max="100" step="1"> \
			<span class="compr-exp" id="exp' + contador + '" onclick=" expande(' + contador + ')" style="display: table-cell">' + iconoExpandirVideo + '</span> \
			<span class="compr-exp" id="comp' + contador + '" onclick=" contrae(' + contador + ')" style="display:none">' + iconoContraerVideo + '</span></span>';
			break;
		case "ogg":               // VIDEO
			cVideo++;
			contador = cVideo;
			nombre = "Video " + contador;
			if (nombreMultimedia) { titulo = '<span class="encMM" id="controles' + contador + '">Video ' + contador + '</span>' };
			elemento = '<video id="audio' + contador + '" title="' + nombre + '"><source src=' + opcion + ' type="video/ogg">El navegador no soporta elementos VIDEO</video>';
			play = '<span id="play' + contador + '" onclick="reproducir()" style="display: table-cell">' + iconoPlay + '</span>';
			pause = '<span id="pause' + contador + '" onclick="pausar()" style="display:none">' + iconoPause + '</span>';
			contVideo = '<span class="controlesVid" id="controles' + contador + '" style="display: inline-flex; align-items:center">' + play + pause + '\
			<input class="rangos" id="ctrlDeslizante' + contador + '" type="range" min="0" max="100" step="1"> \
			<span class="compr-exp" id="exp' + contador + '" onclick=" expande(' + contador + ')" style="display: table-cell">' + iconoExpandirVideo + '</span> \
			<span class="compr-exp" id="comp' + contador + '" onclick=" contrae(' + contador + ')" style="display:none">' + iconoContraerVideo + '</span></span>';
			break;
		default:
			elemento = opcion;
	}

	var obj = {
		titulo: titulo,
		elemento: elemento,
		controlPlay: play,
		controlPause: pause,
		control: control,
		barra: barraDeslizante,
		controlVideo: contVideo,
		nombre: nombre,
		contImagen: cImagen,
		contAudio: cAudio,
		contVideo: cVideo
	};
	return obj;
}

function reproducir() {
	/* TODAS LAS PLAY SE MUESTRAN Y SE DETIENEN */
	/* TODAS LAS PAUSE SE OCULTAN */
	iniciaPlayer(idPlayPauseClic);
	var ind = idPlayPauseClic.substring(5);
	var selector = jq360('#' + idPlayPauseClic);
	if (jq360(selector).attr("disabled") != "disabled") {
		jq360('[id^=audio], [id^=video]').each(function () {
			jq360(this)[0].pause();
		});
		if (esPortable()) {
			jq360('[id^=pause]').css("display", "none");
			jq360('[id^=play]').css("display", "block");
		}
		else {
			jq360('[id^=pause]').css("display", "none");
			jq360('[id^=play]').css("display", "block");
		}
		jq360(selector)[0].play();
		jq360('#' + idPlayPauseClic).parent().find('#play' + ind).css("display", "none");
		if (esPortable()) {
			jq360('#' + idPlayPauseClic).parent().find('#pause' + ind).css("display", "block");
		}
		else {
			jq360('#' + idPlayPauseClic).parent().find("#pause" + ind).css("display", "block");
		}
	}
}

function pausar(ind) {
	elemento = idPlayPauseClic;
	var ind = elemento.substring(5);
	audio = (elemento.substring(0, 5) == 'audio' ? document.getElementById(elemento) : null);
	video = (elemento.substring(0, 5) == 'video' ? document.getElementById(elemento) : null);

	var elemento = (audio !== null ? audio : video);
	elemento.pause();

	const padre = document.querySelector('#' + idPlayPauseClic).parentElement;
	padre.querySelector("#play" + ind).style.display = "block";
	padre.querySelector("#pause" + ind).style.display = "none";

	if (esPortable()) {
		padre.querySelector("#play" + ind).style.display = "block";
	}
}
//ESTA FUNCION CONTROLA EL SEEKER DEL REPRODUCTOR EN RESPUESTAS 
function iniciaPlayer(elemento) {
	var ind = elemento.substring(5);
	audio = (elemento.substring(0, 5) == 'audio' ? document.getElementById(elemento) : null);
	video = (elemento.substring(0, 5) == 'video' ? document.getElementById(elemento) : null);

	const padre = document.querySelector('#' + idPlayPauseClic).parentElement;
	ctrlDeslizante = padre.querySelector('#ctrlDeslizante' + ind);
	ctrlDeslizante.addEventListener("change", vidSeek, false);
	var elemento = (audio !== null ? audio : video);
	elemento.addEventListener("timeupdate", seektimeupdate, false);
}

function vidSeek() {
	var elemento = (audio !== null ? audio : video);
	var seekto = elemento.duration * (ctrlDeslizante.value / 100);
	elemento.currentTime = seekto;
}

function seektimeupdate() {
	var elemento = (audio !== null ? audio : video);

	var nt = elemento.currentTime * (100 / elemento.duration);
	ctrlDeslizante.value = nt;
}
//ESTA FUNCION FUNCIONA PARA AGRANDAR EL VIDEO
function expande(ind) {
	var elemento = document.getElementById("video" + ind);
	if (elemento.requestFullscreen) {
		elemento.requestFullscreen();
	} else if (elemento.mozRequestFullScreen) {
		elemento.mozRequestFullScreen();
	} else if (elemento.webkitRequestFullscreen) {
		elemento.webkitRequestFullscreen();
	} else if (elemento.msRequestFullscreen) {
		elemento.msRequestFullscreen();
	}
	document.getElementById("exp" + ind).style.display = "none";
	document.getElementById("comp" + ind).style.display = "";
}

///FUNCION PARA QUITAR EL AMPLIADO DE PANTALLA LO IMPORTANTE ESTA EN EL DISPLAY DE ELEMENTOS
function contrae(ind) {
	// var elemente = document.getElementById("contenedor" + ind);
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.mozCancelFullScreen) { /* Firefox */
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) { /* IE/Edge */
		document.msExitFullscreen();
	}
	document.getElementById("comp" + ind).style.display = "none";
	document.getElementById("exp" + ind).style.display = "";
}
//inicia la linea seek en su punto inicial
function estandarizar() {
	var todostotal = document.getElementsByClassName("rangos");
	for (var i = 0; i < todostotal.length; i++) {
		todostotal[i].value = 0;
	}
}
