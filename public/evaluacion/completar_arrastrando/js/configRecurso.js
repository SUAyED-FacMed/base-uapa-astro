var maxIntentos = 99;
var siguienteIntentoBlanco = true;

var invPregResp = false;
var calificaPregunta = true;
// var admitirErronea = true;

var carruselContinuo = false;
var elementosPorSegmento = 20;
var elementosPorSegmentoMovil = 1;
var reactivosMostrar = 10;
if (reactivos.length < reactivosMostrar) {
	reactivosMostrar = reactivos.length;
}
var total = reactivosMostrar;

var mezclarPreguntas = true;
var mezclarRespuestas = true;
var mezclarPorIntentos = true;

// var mostrarRetroArroba = !calificaPregunta;
var mostrarRetroIndividual = calificaPregunta;
var mostrarRetroFinal = true;

var ponerNumeral = true;
var ponerNumeroPreguntas = false;

// var calificarEnTiempoReal = false;
var seleccionRapida = true;
var forzarRespuestaA = 0;
// var permutaRespuestas = true;

var nombreMultimedia = false;
var retroCal = [
	{ LimInf: 0, LimSup: 5, Mensaje: ["¡Vaya! Parece que no es suficiente.", "Insufficient"] }
	, { LimInf: 6, LimSup: 8, Mensaje: ["¡Esfuérzate más!", "Work harder"] }
	, { LimInf: 9, LimSup: 9, Mensaje: ["¡Felicidades!", "Excellent"] }
];
var textoRetroGeneral = "";

/* ------------------------------- */

var flechaArriba = false;

var ambSCORM = false;
var barraSCORM = false;
var idObjetivo = 0;

var guardarCalificacion = 0;

var idioma = "ESP";
var debug = false;
var verLongitud = false;

var califXaciertos = false;   // true: se evalua por número de aciertos;  false: se evalua sobre 10

// var intentos = 0;
// var correctas = 0;
// var contestadas = 0;
// var totalPreguntas = 0;

