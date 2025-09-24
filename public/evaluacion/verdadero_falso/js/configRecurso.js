var maxIntentos = Infinity;
var siguienteIntentoBlanco = true;

var carruselContinuo = false;
var elementosPorSegmento = 5;
var elementosPorSegmentoMovil = 1;
var reactivosMostrar = 10;
if (reactivos.length < reactivosMostrar) {
	reactivosMostrar = reactivos.length;
}
var total = reactivosMostrar;

var intentos = 0;
var mezclarPreguntas = true;
var mezclarPorIntentos = true;

// var mostrarRetroIndividual = true;
var mostrarRetroFinal = true;

var ponerNumeral = true;
var numeralAlfabetico = false;
var ponerNumeroPreguntas = false;

// var ponerNumeralRespuesta = false;
// var numeralAlfabeticoRespuesta = false;

var flechaArriba = false;

var retroCal = [
	{ LimInf: 0, LimSup: 5, Mensaje: ["¡Vaya! Parece que no es suficiente.", "Insufficient"] }
	, { LimInf: 6, LimSup: 7, Mensaje: ["¡Esfuérzate más!", "Work harder"] }
	, { LimInf: 8, LimSup: 9, Mensaje: ["¡Sigue esforzándote!", "Sufficient"] }
	, { LimInf: 10, LimSup: 10, Mensaje: ["¡Felicidades!", "Excellent"] }
];

var ambSCORM = false;
var barraSCORM = false;
var idObjetivo = 0;

var guardarCalificacion = 0;

var idioma = "ESP";
var debug = false;
var verLongitud = false;

var encabezados = ["Verdadero", "Falso"];

/* ----------------------- */
var retroGeneral = "";

var califXaciertos = true;   // true: se evalua por número de aciertos;  false: se evalua sobre 10
