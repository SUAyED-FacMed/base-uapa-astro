// JavaScript Document
var preguntas = [];
var respuestas = [];
var retro = [];
var indices = [];
var preg = [];
var respOriginales = [];
var respDesordenadas1 = [];
var respDesordenadas2 = [];
var totalSegmentos = 1;
var recorreSegmentos = 1; // por lo menos existe el primer segmento o sea el unico
var califMax = 0;      // JLBG Jun 03, 2020;  variable para guardar la calificacion máxima de todos los intentos

const espacios = "&nbsp;&nbsp;&nbsp;&nbsp;";
var palomita = "<i class='palomita fas fa-check-circle'></i>";
var tache = "<i class='tache fas fa-times-circle'></i>";

var puntaje = [1, 2];
var esMobil = false;
var anchoPantalla = window.screen.width;
var altoPantalla = window.screen.height;

jq360(document).ready(function () {
	/*if (window.parent.data_crm) {
		// verLongitud = true;
		// debug = true;
		numeralAlfabetico = false;
	}*/
	if (window.name == "movil") {
		esMobil = true;
	}
	else {
		esMobil = esPortable();
	}
	//  ============================================================================================================
	if (esMobil) {
		elementosPorSegmento = elementosPorSegmentoMovil;
		jq360(".info").show;
		jq360(".instrucciones").addClass("estilosinstruccion");
		jq360(".instrucciones").slideUp(1);
		invPregResp = true;
		if (jq360(".instrucciones").text().trim() == "") {
			jq360(".instrucciones").remove();
			jq360(".info").remove();
			jq360("hr.separador").remove();
		}
	}
	else {
		jq360(".info").hide();
	}

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
	// console.log("READY de VERDADERO-FALSO.JS");
	creaIndice();
	if (mezclarPreguntas) { reordenaArreglo(reactivos) };
	XcreaTablaVF(reactivosMostrar);
	limpiaRadiosVF();
	jq360("button#btnRevisar").show();
	jq360("button#btnReiniciar").hide();
	jq360("#btnPaginador").hide();
	if (elementosPorSegmento < reactivosMostrar) { // los botones de paginas...
		jq360(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
		if (carruselContinuo) {
			jq360(".cPaginador.cPrevio").removeClass("invisible").addClass("visible");
		} else {
			jq360(".cPaginador.cPrevio").removeClass("visible").addClass("invisible");
		}
		jq360("#btnPaginador").text(recorreSegmentos + " / " + totalSegmentos);
		jq360("#btnPaginador").show();
	}
	iniciaTooltip();
});

function iniciaTooltip() {
	jq360('[data-toggle="tooltip"]').each(function () {
		var options = {
			html: true,
			container: 'body'
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
	// jq360(function () {
	// 	jq360('[data-toggle="tooltip"]').tooltip('show');
	// })
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
	for (i = 0; i < numReactivos; i++) {
		preguntas.push({ txt1: "", txt2: "", ind: 0 });
		preguntas[i].txt1 = reactivos[i].Q;
		preguntas[i].txt2 = reactivos[i].F;
		preguntas[i].ind = indices[i];
		respuestas.push({ txt: "", ind: 0 });
		respuestas[i].txt = reactivos[i].A;
		respuestas[i].ind = indices[i];
	}
}

function reordenaArreglo(arreglo) {
	arreglo.sort(function (a, b) { return 0.5 - Math.random() });
}

//  ============================================================================================================

// function creaTablaVF(numReactivos) {
// 	console.log("numReactivos es " + numReactivos);
// 	if (elementosPorSegmento >= reactivosMostrar || elementosPorSegmento <= 0) {
// 		elementosPorSegmento = reactivosMostrar;
// 	}
// 	var conteo = 0;
// 	for (i = 0; i < numReactivos; i++) {
// 		if (conteo >= elementosPorSegmento) {
// 			conteo = 0;
// 			totalSegmentos++;
// 		}
// 		if (i == 0) {
// 			jq360('div#contenedor').append('<div class="row" id="encabezado">');
// 			jq360("#encabezado").append('<div class="col-12 col-sm-12 col-md-10">&nbsp;');
// 			for (j = 0; j < encabezados.length; j++) {
// 				jq360("#encabezado").append('<div class="col-12 col-sm-12 col-md-1">' + encabezados[j]);
// 			}
// 		}

// 		if (numeralAlfabetico) {
// 			numeralPregunta = (ponerNumeral ? String.fromCharCode(i + 65) : '') + ((ponerNumeral || ponerNumeroPreguntas) ? '.&nbsp;&nbsp;' : '');  // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true
// 		} else {
// 			numeralPregunta = (ponerNumeral ? (i + 1) : '') + (ponerNumeroPreguntas ? '/' + reactivosMostrar : '') + ((ponerNumeral || ponerNumeroPreguntas) ? '.&nbsp;&nbsp;' : '');  // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true		
// 		}

// 		var debugRespuesta = (debug ? '<sup>' + reactivos[i].A + '</sup>' : "");

// 		jq360("div#contenedor").append('<div id="reng' + i + '">');
// 		jq360("#reng" + i).addClass("segmento" + totalSegmentos).addClass("row").addClass("opcion").addClass("opcioncontenedor");
// 		var toolTipSi = '<span data-toggle="tooltip" data-placement="right" data-type="success" title="' + tam(reactivos[i].F[0], 1) + '">' + palomita + '</span>';
// 		var toolTipNo = '<span data-toggle="tooltip" data-placement="right" data-type="danger" title="' + tam(reactivos[i].F[1], 1) + '">' + tache + '</span>';
// 		jq360("#reng" + i).append('<div class="opcion">' + toolTipSi + toolTipNo + '</div>');

// 		jq360("#reng" + i).append('<div id="conteni' + i + '" class="conteni col-12 col-sm-12 col-md-12" >');
// 		jq360("#conteni" + i).append('<div class="row"><div class="col-12 col-sm-12 col-md-10" onclick="elegir()" id="p' + i + '">' + numeralPregunta + tam(reactivos[i].Q, 1) + debugRespuesta);
// 		for (j = 0; j < puntaje.length; j++) {
// 			if (puntaje[j] == 1) {
// 				jq360("#conteni" + i).append('<div class="col-6 col-sm-6 col-md-1 opcion"><label class="content-input"><input class="cRbutton" type="radio" name="pregunta' + i + '" value="true"><i></i><span class="txt">' + encabezados[j] + '</span><br></label></div></div>');
// 			} else {
// 				jq360("#conteni" + i).append('<div class="col-6 col-sm-6 col-md-1 opcion"><label class="content-input"><input class="cRbutton" type="radio" name="pregunta' + i + '" value="false"><i></i><span class="txt">' + encabezados[j] + '</span><br></label></div></div>');
// 			}
// 		}
// 		conteo++;
// 	}
// 	jq360('i.ip, i.it').css("display", "none");
// 	jq360("[class^=segmento]").addClass("ocultar");
// 	jq360(".segmento1").removeClass("ocultar");
// }

function tam(cad, n) {// 1T, 0ele.esc.ord
	var txt = "";
	if (verLongitud) {
		txt = "&nbsp;<sup>" + cad.length + "</sup>";
		if (n == 1) { txt = cad + txt }
	}
	else {
		txt = (n == 1) ? cad : ""
	}
	return txt;
}

function mostrarMensaje(clase, recurso) {
	if (!recurso) { recurso = -1 }
	var msgs = [,
		[ic(".setneidnopserroc soicapse sol a satseupser sal sadot artsarrA"), ic(".secaps etairporppa ot srewsna lla garD")],  // completar arrastrando
		[ic(".otxet ed sopmac sol sodot anelL"), ic(".sdleif txet lla tuo lliF")],                  // completar escribiendo
		[ic(".satnugerp sal sadot atsetnoC"), ic(".snoitseuq lla rewsnA")],                         // verdadero-falso
		[ic(".odatluser ut reconoc arap sovitcaer sol sodot anedrO"), ic(".snoitseuq lla troS")],                            // ordenar
		[ic(".ordaucer adac arap atseupser anu egilE"), ic(".tsil hcae rof rewsna na esoohC")],     // completar eligiendo
		[ic(".setneidnopserroc soicapse sol a satseupser sal sadot artsarrA"), ic(".secaps etairporppa ot srewsna lla garD")],  // arrastrar esquema
		[ic(".oñepmesed ut reconoc arap oiretirc adac ed nóicpo anu anoicceleS"), ""]   // rubrica
	];
	var tipo = "";
	var tit = "";
	var msg = "";
	var btnOK = "";
	switch (clase) {
		case 1: // intentos
			// tipo = ic("gninraw");
			switch (idioma) {
				case "ENG":
					tit = ic("gninraW");
					msg = ic("." + maxIntentos + " :stpmetta fo rebmun mumixam dehcaer evah uoY");
					btnOK = ic("KO");
					break;
				default:
					tit = ic("nóicnetA");
					msg = ic("." + maxIntentos + " :sotnetni ed oremún omixám le odaznacla saH");
					btnOK = ic("ratpecA");
			}
			break;
		case 2: // Contestar TODO
			// tipo = ic("gninraw");
			switch (idioma) {
				case "ENG":
					tit = ic("gninraW");
					msg = msgs[recurso][1]; //recurso,1
					btnOK = ic("KO");
					break;
				default:
					tit = ic("nóicnetA");
					msg = msgs[recurso][0];  //recurso,0
					btnOK = ic("ratpecA");
			}
			break;
		default:
			tipo = ic("rorre");
			tit = ic("ametsis ed rorrE");
			msg = ic("adiconocsed nóicidnoC");
			btnOK = ic("ratpecA");
	}
	swal({ title: tit, text: msg, type: tipo, confirmButtonText: btnOK, closeOnConfirm: true, html: true });
}

function asignarEvaluacion(calificacion) {
	var mensaje = "";
	if (mostrarRetroFinal) {
		jq360.each(retroCal, function (indice) {
			if ((calificacion >= retroCal[indice].LimInf) && (calificacion <= retroCal[indice].LimSup)) {
				mensaje = (idioma == ic("GNE")) ? tam(retroCal[indice].Mensaje[1], 1) : tam(retroCal[indice].Mensaje[0], 1);
			}
		});
	}
	return mensaje;
}

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

function elegir(e) {
	var ElementosClick = new Array();
	// Funcion para capturar el click del raton
	var HaHechoClick;
	if (e == null) {
		// Si hac click un elemento, lo leemos
		HaHechoClick = event.srcElement;
	} else {
		// Si ha hecho click sobre un destino, lo leemos
		HaHechoClick = e.target;
	}
	// Añadimos el elemento al array de elementos
	ElementosClick.push(HaHechoClick);
	// Una prueba con salida en consola
	// console.log("Contenido sobre lo que se hizo click:\n" + ElementosClick[0].innerHTML);

	var respuesta = jq360(HaHechoClick).parent().parent().hasClass("correcto");
	if (!respuesta) {
		var opciones = jq360(HaHechoClick).parent().find("input:radio");
		var listado = opciones.length;
		var marcado = -1;
		var porMarcar = 0;
		for (var i = 0; i < listado; i++) {
			var marca = jq360(opciones[i]).prop("checked");
			if (jq360(opciones[i]).prop("checked")) { marcado = i }
		}
		if (!(marcado == -1 || marcado == (listado - 1))) {
			porMarcar = marcado + 1;
		}
		var disponible = jq360(opciones[0]).attr("disabled");
		if (disponible != "disabled") {
			jq360("opciones").each(function () {
				jq360(this).prop("checked", false);
			});
			jq360(opciones[porMarcar]).prop("checked", true);
		}
	}
}




function XcreaTablaVF(numReactivos) {
	console.log("numReactivos es " + numReactivos);
	if (elementosPorSegmento >= reactivosMostrar || elementosPorSegmento <= 0) {
		elementosPorSegmento = reactivosMostrar;
	}
	var conteo = 0;
	jq360('#contenedorVF').append('<div class="row" id="encabezadoVF">');
	jq360("#encabezadoVF").append('<div class="col-12 col-sm-12 col-md-10 col-lg-10">&nbsp;');
	for (j = 0; j < encabezados.length; j++) {
		jq360("#encabezadoVF").append('<div class="col-12 col-sm-12 col-md-1 col-lg-1">' + encabezados[j]);
	}
	for (i = 0; i < numReactivos; i++) {
		if (conteo >= elementosPorSegmento) {
			conteo = 0;
			totalSegmentos++;
		}
		if (numeralAlfabetico) {
			numeralPregunta = (ponerNumeral ? String.fromCharCode(i + 65) : '') + ((ponerNumeral || ponerNumeroPreguntas) ? '.&nbsp;&nbsp;' : '');  // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true
		} else {
			numeralPregunta = (ponerNumeral ? (i + 1) : '') + (ponerNumeroPreguntas ? '/' + reactivosMostrar : '') + ((ponerNumeral || ponerNumeroPreguntas) ? '.&nbsp;&nbsp;' : '');  // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true		
		}

		var debugRespuesta = (debug ? '<sup>' + reactivos[i].A + '</sup>' : '');

		jq360("#contenedorVF").append('<div>');
		jq360("#contenedorVF > div").last().addClass("row")
			.addClass("reactivo")
			.addClass("segmento" + totalSegmentos);
		var toolTipSi = '<div class="pulso OK" data-toggle="tooltip" data-placement="right" data-type="success" title="' + tam(reactivos[i].F[0], 1) + '">' + palomita + '</div>';
		var toolTipNo = '<div class="pulso noOK" data-toggle="tooltip" data-placement="right" data-type="danger" title="' + tam(reactivos[i].F[1], 1) + '">' + tache + '</div>';

		jq360('.reactivo').last()
			.append(toolTipSi)
			.append(toolTipNo)
			.append('<div class="col-12 col-lg-10 texto" onclick="elegir()">' + numeralPregunta + tam(reactivos[i].Q, 1) + debugRespuesta)
			;
		for (j = 0; j < puntaje.length; j++) {
			if (puntaje[j] == 1) {
				jq360(".reactivo").last().append('<div class="col-12 col-sm-6 col-lg-1 opcion"><label class="content-input"><input class="cRbutton" type="radio" name="pregunta' + i + '" value="true"><i></i><span class="txt">' + encabezados[j] + '</span><br></label></div></div>');
			} else {
				jq360(".reactivo").last().append('<div class="col-12 col-sm-6 col-lg-1 opcion"><label class="content-input"><input class="cRbutton" type="radio" name="pregunta' + i + '" value="false"><i></i><span class="txt">' + encabezados[j] + '</span><br></label></div></div>');
			}
		}
		conteo++;
	}
	jq360('.pulso').hide();

	recorreSegmentos = 1; // el primer segmento a desplegar...

	jq360('.reactivo').hide();
	jq360(".segmento" + recorreSegmentos).show();

	if (totalSegmentos > recorreSegmentos) { // si solo hay una pagina no desplegamos paginador
		jq360("#btnPaginador").text("" + recorreSegmentos + " / " + totalSegmentos);
		jq360("#btnPaginador").removeClass("ocultar").addClass("mostrar");
	}
}
