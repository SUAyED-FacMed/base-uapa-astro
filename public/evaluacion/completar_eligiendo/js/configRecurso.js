var maxIntentos = 2;
var calificacionGlobal = true;
var siguienteIntentoBlanco = true;

var carruselContinuo = false;
var elementosPorSegmento = 10;
var elementosPorSegmentoMovil = 2;
var reactivosMostrar = 5;
if (reactivos.length < reactivosMostrar) {
	reactivosMostrar = reactivos.length;
}
var total = reactivosMostrar;

var mezclarPreguntas = true;
var mezclarRespuestas = true;
var mezclarPorIntentos = true;

var mostrarRetroArroba = true;
var mostrarRetroIndividual = !mostrarRetroArroba;
var mostrarRetroFinal = true;

var porEspacios = !calificacionGlobal;
var porEnunciados = !porEspacios;

var ponerNumeral = true;
var numeralAlfabetico = false;
var ponerNumeroPreguntas = false;

var retroCal = [
	{ LimInf: 0, LimSup: 5, Mensaje: ["¡Vaya! Parece que no es suficiente.", "Insufficient"] }
	, { LimInf: 6, LimSup: 7, Mensaje: ["¡Esfuérzate más!", "Work harder"] }
	, { LimInf: 8, LimSup: 9, Mensaje: ["¡Sigue esforzándote!", "Sufficient"] }
	, { LimInf: 10, LimSup: 10, Mensaje: ["¡Felicidades!", "Excellent"] }
];

/* ------------------------------- */

var flechaArriba = false;

var ambSCORM = false;
var barraSCORM = false;
var idObjetivo = 0;

var guardarCalificacion = 0;

var idioma = "ESP";
var debug = false;
var verLongitud = false;

var califXaciertos = true;   // true: se evalua por número de aciertos;  false: se evalua sobre 10
