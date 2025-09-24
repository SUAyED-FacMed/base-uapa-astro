// JavaScript Document
var preguntas = [];
var respuestas = [];
var retro = [];
var indices = [];
var preg = [];
var respOriginales = [];
var respDesordenadas1 = [];
var respDesordenadas2 = [];
var espacios = "&nbsp;&nbsp;&nbsp;&nbsp;";
var palomita = "<i class='palomita fas fa-check-circle'></i>";
var tache = "<i class='tache fas fa-times-circle'></i>";

var totalSegmentos = 1;
var recorreSegmentos = 1; // por lo menos existe el primer segmento o sea el unico
var idioma = "ESP";
var esMobil = false;

var intentos = 0;
var correctas = 0;
var contestadas = 0;
var totalPreguntas = 0;

jq360(document).ready(function () {
	/*if (window.parent.data_crm) {
		debug = false;
		verLongitud = false;
		flechaArriba = false;
		ponerNumeral = true;
		mostrarRetroArroba = true;
		mezclarRespuestas = true;
		siguienteIntentoBlanco = true;
	}*/

	if (window.name == "movil") {
		esMobil = true;
	}
	else {
		esMobil = esPortable();
	}
	switch (idioma) {
		case "ENG":
			jq360("#btnRevisar").text("Check"); //ic("Check"
			jq360("#btnReiniciar").text("Next attempt"); //ic("Next attempt")
			break;
		default:
			jq360("#btnRevisar").text("Revisar"); //ic("Revisar")
			jq360("#btnReiniciar").text("Siguiente intento"); //ic("Próximo intento"
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

	jq360('.ir-arriba').click(function () {
		jq360('body, html').animate({
			scrollTop: '0px'
		}, 300);
	});
	if (flechaArriba) {
		jq360('.ir-arriba').show();
	}
	else {
		jq360('.ir-arriba').hide();
	}

	jq360(window).scroll(function () {
		if (jq360(this).scrollTop() > 0) {
			jq360('.ir-arriba').slideDown(300);
		}
		else {
			jq360('.ir-arriba').slideUp(300);
		}
	});
	if (mezclarPreguntas) {
		reordenaArreglo(reactivos);
	}
	creaElegir(reactivosMostrar);
	iniciaToolTip();
});

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

function divideReactivosQF_A(numReactivos) { //  RA-01, RA-03,   QF-A
	for (i = 0; i < numReactivos; i++) {
		preguntas.push({
			txt1: "",
			txt2: "",
			ind: 0
		});
		preguntas[i].txt1 = reactivos[i].Q;
		preguntas[i].txt2 = reactivos[i].F;
		preguntas[i].ind = indices[i];
		respuestas.push({
			txt: "",
			ind: 0
		});
		respuestas[i].txt = reactivos[i].A;
		respuestas[i].ind = indices[i];
	}
}

function reordenaArreglo(arreglo) {
	arreglo.sort(function (a, b) {
		return 0.5 - Math.random()
	});
}

function creaElegir(mostrar) {
	var ind = 1;

	if (elementosPorSegmento >= reactivosMostrar || elementosPorSegmento <= 0) {
		elementosPorSegmento = reactivosMostrar;
	}
	var conteo = 0;
	for (i = 0; i < mostrar; i++) {
		var componentes = reactivos[i].Q.split("@");
		var respuestas = reactivos[i].A;

		if (conteo >= elementosPorSegmento) {
			conteo = 0;
			totalSegmentos++;
		}
		if (numeralAlfabetico) {
			numeralPregunta = (ponerNumeral ? String.fromCharCode(i + 65) : '') + ((ponerNumeral || ponerNumeroPreguntas) ? '.-&nbsp;&nbsp;' : ''); // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true
		}
		else {
			numeralPregunta = (ponerNumeral ? (i + 1) : '') + (ponerNumeroPreguntas ? '/' + reactivosMostrar : '') + ((ponerNumeral || ponerNumeroPreguntas) ? '.&nbsp;&nbsp;' : ''); // JLBG, 2019, feb 21: ajusté espacios separadores cuando ponerNumeral es true
		}

		jq360(".reactivos").append('<div class="reactivo segmento' + totalSegmentos + '">');
		jq360(".reactivo").last().append('<div class="contenido">' + numeralPregunta);

		for (var j = 0; j < respuestas.length; j++) {
			var opciones = respuestas[j];

			const opcionInicial = obj => obj.opcion === "-------";
			// console.log(opciones.findIndex(opcionInicial));

			if (opciones.some(opcionInicial)) {
				opciones.shift();
			}

			if (mezclarRespuestas) {
				reordenaArreglo(opciones)
			}
			opciones.unshift({
				opcion: "-------",
				correcta: false,
				retro: ""
			});

			var texto = '<div class="casilla"><select id="selId' + ind + '"></select>'; // JLBG May 23, 2019,   agrego retro por caja
			if (mostrarRetroArroba) {   // RETROS ESPECIFICAS POR RESPUESTA SELECCIONADA
				for (var k = 0; k < opciones.length; k++) {
					var retro = '';
					if (opciones[k].opcion != '-------') {
						if (opciones[k].correcta) {
							retro = '<div class="pulso OK" data-toggle="tooltip" data-placement="auto left" data-valor="' + opciones[k].opcion + '" data-type="success" title="' + tam(opciones[k].retro, 1) + '">' + palomita + '</div>';
						}
						else {
							retro = '<div class="pulso noOK" data-toggle="tooltip" data-placement="auto left" data-valor="' + opciones[k].opcion + '"  data-type="danger" title="' + tam(opciones[k].retro, 1) + '">' + tache + '</div>';
						}
						texto += retro;
					}
				}
			}
			else {   // RETROS GENERALES POR RESPUESTA CORRECTA O INCORRECTA
				var textoRetroReactivoCorrecta = tam(reactivos[i].FA[j].correcta, 1);
				var textoRetroReactivoIncorrecta = tam(reactivos[i].FA[j].incorrecta, 1);
				var rCorrecta = '<div class="pulso OK" data-toggle="tooltip" data-placement="auto left" data-type="success" title="' + textoRetroReactivoCorrecta + '">' + palomita + '</div>';
				var rIncorrecta = '<div class="pulso noOK" data-toggle="tooltip" data-placement="auto left" data-type="danger" title="' + textoRetroReactivoIncorrecta + '">' + tache + '</div>';
				texto += rCorrecta + rIncorrecta;
			}
			jq360(".contenido").last().append(componentes[j]).append(texto); // de origen no tenia el </select>, RAAR agrego abril 11,18
			for (k = 0; k < opciones.length; k++) {
				jq360("select:last").append("<option>" + opciones[k].opcion);
				if (opciones[k].correcta) {
					jq360("select:last").attr("data-respuesta", opciones[k].opcion);
					if (debug) {
						jq360("select:last").after("<sup>" + opciones[k].opcion + "</sup>")
					}
				}
			}
			ind++;
		}
		jq360(".contenido").last().append(componentes[j] + tam(reactivos[i].Q, 0));
		// RETROS POR REACTIVO CORRECTO O INCORRECTO
		jq360(".reactivo").last().prepend(
			'<div class="pulso OK" data-toggle="tooltip" data-placement="auto left" data-type="success" title="' + tam(reactivos[i].F[0], 1) + '">' + palomita + '</div>\
			<div class="pulso noOK" data-toggle="tooltip" data-placement="auto left" data-type="danger" title="' + tam(reactivos[i].F[1], 1) + '">' + tache + '</div>');
		conteo++;
	}
	jq360('#btnRevisar').show();
	jq360('#btnReiniciar').hide();
	jq360('.pulso').hide();
	if (elementosPorSegmento < reactivosMostrar) { // los botones de paginas...
		if (carruselContinuo) {
			jq360(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
			jq360(".cPaginador.cPrevio").removeClass("invisible").addClass("visible");
		}
		else {
			jq360(".cPaginador.cProximo").removeClass("invisible").addClass("visible");
		}
		jq360("#btnPaginador").text(recorreSegmentos + " / " + totalSegmentos);
		jq360("#btnPaginador").removeClass("invisible").addClass("visible");
	}
	jq360('.reactivo').hide();
	jq360(".segmento" + recorreSegmentos).show();
}

function tam(cad, n) { // 1T, 0ele.esc.ord
	var txt = "";
	if (verLongitud) {
		txt = "&nbsp;<sup>" + cad.length + "</sup>";
		if (n == 1) {
			txt = cad + txt
		}
	}
	else {
		txt = (n == 1) ? cad : ""
	}
	return txt;
}

function mostrarMensaje(clase, recurso) {
	if (!recurso) {
		recurso = -1
	}
	var msgs = [,
		["Arrastrar todas las respuestas a los espacios correspondientes.", ic("secaps etairporppa ot srewsna lla gard ,esaelP")], // completar arrastrando
		["Llena todos los campos de texto.", ic("sdleif txet lla tuo llif ,esaelP")], // completar escribiendo
		["Contesta todas las preguntas", ic("snoitseuq lla rewsna ,esaelP")], // verdadero-falso
		["Ordena todos los enunciados", ic("secnetnes lla tros ,esaelP")], // ordenar enunciados
		["Elige una respuesta para cada recuadro.", ic("tsil hcae rof rewsna na esoohc ,esaelP")], // completar eligiendo
		["Arrastra todas las respuestas a los espacios correspondientes.", ic("secaps etairporppa ot srewsna lla gard ,esaelP")], // arrastrar esquema
		["", ""]
	];
	var tit = "";
	var msg = "";
	var btnOK = "";
	switch (clase) {
		case 1: // intentos
			tipo = ic("gninraw");
			switch (idioma) {
				case "ENG":
					tit = ic("gninraW");
					msg = ic(maxIntentos + " :stpmetta fo rebmun mumixam dehcaer evah uoY");
					btnOK = ic("KO");
					break;
				default:
					tit = ("Atención");
					msg = ("Has alcanzado el máximo número de intentos: " + maxIntentos + ".")
					btnOK = ("Aceptar");
			}
			break;
		case 2: // Contestar TODO
			tipo = ic("gninraw");
			switch (idioma) {
				case "ENG":
					tit = ic("gninraW");
					msg = msgs[recurso][1]; //recurso,1
					btnOK = ic("KO");
					break;
				default:
					tit = ("Atención");
					msg = msgs[recurso][0]; //recurso,0
					btnOK = ("Aceptar");
			}
			break;
		default:
			tipo = ("Error");
			tit = ("Error de sistema");
			msg = ("Condición desconocida");
			btnOK = ("Aceptar");
	}
	swal({
		title: tit,
		text: msg,
		confirmButtonText: btnOK,
		closeOnConfirm: true,
		html: true
	});
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
			var btnOK = ("OK");
			break;
		default:
			var btnOK = ("Aceptar");
	}
	swal({
		title: titulo,
		text: cadena,
		confirmButtonText: btnOK,
		closeOnConfirm: true,
		html: true
	});
}

function esPortable() {
	if (navigator.userAgent.match(/Android/i) ||
		navigator.userAgent.match(/iPhone/i) ||
		// navigator.userAgent.match(/iPad/i) ||
		navigator.userAgent.match(/iPod/i) ||
		navigator.userAgent.match(/BlackBerry/i) ||
		navigator.userAgent.match(/Windows Phone/i) ||
		navigator.userAgent.match(/Opera Mini/i) ||
		navigator.userAgent.match(/IEMobile/i)
	) {
		return true;
	}
	else {
		return false;
	}
}

function iniciaToolTip() {
	jq360('[data-toggle="tooltip"]').each(function () {
		var options = {
			html: true,
		};

		if (jq360(this)[0].hasAttribute("data-type")) {
			options["template"] =
				'<div class="tooltip ' +
				jq360(this).attr("data-type") +
				'" role="tooltip">' +
				'	<div class="tooltip-arrow"></div>' +
				'	<div class="tooltip-inner"></div>' +
				"</div>";
		}
		jq360(this).tooltip(options);
	});
}
