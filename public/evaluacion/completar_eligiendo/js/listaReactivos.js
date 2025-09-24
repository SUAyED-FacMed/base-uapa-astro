var reactivos = [
	{
		Q: 'public class Practica3 {<div style="margin-left:20px">	public static void main(String[] args) {</div><div style="margin-left:40px; float:left">		int array[]= new @;</div><div style="margin-left:40px">		boolean found=false;</div><div style="margin-left:40px; float:left">		Integer numberToFind=new Integer(@);</div><div style="margin-left:40px">		System.out.println("Se revisará el numero: "+ numberToFind);</div><div style="margin-left:40px">		System.out.print("[");</div><div style="margin-left:40px">		for (int i =0; i&lt;array.length;i++) {</div><div style="margin-left:60px; float:left">			array[i]=(int) (Math.random()*@);</div><div style="margin-left:60px">			System.out.print(array[i]+ (i!=(array.length-1)? ",":""));</div><div style="margin-left:40px">		}</div><div style="margin-left:40px">		System.out.println("]");</div><br><div style="margin-left:40px">		System.out.println("Realizando algoritmo de busqueda de pares que sumen: "+numberToFind);</div><div style="margin-left:40px; float:left">		for (int i=0; i<@;i++) {</div><div style="margin-left:60px">			if (i+1!=array.length) { //This is used to avoid overflow</div><div style="margin-left:80px">					for (int j=i+1;j&lt;array.length;j++) {</div><div style="margin-left:100px; float:left">					if (@==numberToFind) {</div><div style="margin-left:120px">							System.out.println("Par encontrado: "+array[i]+"+"+array[j]+"="+numberToFind);</div><div style="margin-left:120px">						found=true;</div><div style="margin-left:100px">						}</div><div style="margin-left:80px">				}</div><div style="margin-left:60px">			}</div><div style="margin-left:40px">		}</div><div style="margin-left:40px">		if(!found) {</div><div style="margin-left:60px">			System.out.println("No se encontraron pares que sumen: " +numberToFind);</div><div style="margin-left:40px">		}</div><div style="margin-left:20px">	}</div>}',
		A: [
			[
				{ opcion: "int[10]", correcta: true },
				{ opcion: "array.length", correcta: false },
				{ opcion: "20", correcta: false },
				{ opcion: "args[0]", correcta: false },
				{ opcion: "array[i] - array[j]", correcta: false },
				{ opcion: "array[i] + array[j]", correcta: false },
				{ opcion: "array.length();", correcta: false }
			],

			[
				{ opcion: "int[10]", correcta: false },
				{ opcion: "array.length", correcta: false },
				{ opcion: "20", correcta: false },
				{ opcion: "args[0]", correcta: true },
				{ opcion: "array[i] - array[j]", correcta: false },
				{ opcion: "array[i] + array[j]", correcta: false },
				{ opcion: "array.length();", correcta: false }
			],

			[
				{ opcion: "int[10]", correcta: false },
				{ opcion: "array.length", correcta: false },
				{ opcion: "20", correcta: true },
				{ opcion: "args[0]", correcta: false },
				{ opcion: "array[i] - array[j]", correcta: false },
				{ opcion: "array[i] + array[j]", correcta: false },
				{ opcion: "array.length();", correcta: false }
			],

			[
				{ opcion: "int[10]", correcta: false },
				{ opcion: "array.length", correcta: true },
				{ opcion: "20", correcta: false },
				{ opcion: "args[0]", correcta: false },
				{ opcion: "array[i] - array[j]", correcta: false },
				{ opcion: "array[i] + array[j]", correcta: false },
				{ opcion: "array.length();", correcta: false }
			],

			[
				{ opcion: "int[10]", correcta: false },
				{ opcion: "array.length", correcta: false },
				{ opcion: "20", correcta: false },
				{ opcion: "args[0]", correcta: false },
				{ opcion: "array[i] - array[j]", correcta: false },
				{ opcion: "array[i] + array[j]", correcta: true },
				{ opcion: "array.length();", correcta: false }
			]
		],

		FA: [
			{
				correcta: "Correcto: “int [10]”. La especificación del programa nos indica que se genera un arreglo de diez números enteros; ésta es una manera válida para crear un arreglo que cumpla con el requerimiento.",
				incorrecta: "Incorrecta"
			},
			{
				correcta: "Correcto: “args[0]” Este fragmento de código permite acceder al primer argumento enviado mediante línea de comandos; el cual, en este caso, es el número enviado por el usuario. Este número se debe transformar en un objeto usando la clase Wrapper Integer; en caso de recibir un argumento que no sea un número (por ejemplo, una cadena) el programa fallará. En futuras practicas se aprenderá el manejo de errores.",
				incorrecta: "Incorrecta"
			},
			{
				correcta: "Correcto: “20”. Esta opción permite llegar al objetivo deseado: generar un arreglo de números en el rango de valores de 0 a 20, ya que Math.random() genera un valor aleatorio entre 0 y 1.",
				incorrecta: "Incorrecta"
			},
			{
				correcta: "Correcto: “array.length”. Esta instrucción permite recorrer el arreglo para ir comparando elemento por elemento y usar una estrategia de fuerza bruta para resolver el problema.",
				incorrecta: "Incorrecta"
			},
			{
				correcta: "Correcto: “array[i] + array[j]”. Este bloque de código permite que se compare la suma del elemento actual y el elemento siguiente con el numero a buscar, en caso de coincidir se accede al bloque if y se imprimen dichos valores.",
				incorrecta: "Incorrecta"
			}

		],
		F: [
			"Ese fue un buen trabajo, tu aprendizaje va bien.",
			"Piensa bien tu respuesta."
		]
	}]
	;
var reactivos = [
	{
		Q: "Carmen is from Mexico City and she’s @ FES Aragon’s student",
		A: [[
			{ opcion: "a", correcta: true, retro: "Retro por respuesta 1" },
			{ opcion: "an", correcta: false, retro: "Retro por respuesta 2" },
			{ opcion: "the", correcta: false, retro: "Retro por respuesta 3" }]
		],
		FA: [{
			correcta: "Retroalimentación por casilla correcta 1A",
			incorrecta: "Retroalimentación por casilla 1A incorrecta",
		}],
		F: [
			"Retroalimentación por reactivo 1 correcto",
			"Retroalimentación por reactivo 1 incorrecto"
		]
	},
	{
		Q: "Every day, early in @ morning, she leaves home and drives to the clinic in @ town center. She usually has lunch with her colleagues and sometimes teaches in @ afternoon. At @ weekend, she often visits her brother’s family. They live in the countryside, about two hours away by @ car.",
		A: [
			[
				{ opcion: "a", correcta: false, retro: "Retro por respuesta 4" },
				{ opcion: "an", correcta: false, retro: "Retro por respuesta 5" },
				{ opcion: "the", correcta: true, retro: "Retro por respuesta 6" }],
			[
				{ opcion: "a", correcta: false, retro: "Retro por respuesta 7" },
				{ opcion: "an", correcta: false, retro: "Retro por respuesta 8" },
				{ opcion: "the", correcta: true, retro: "Retro por respuesta 9" }],
			[
				{ opcion: "a", correcta: false, retro: "Retro por respuesta 10" },
				{ opcion: "an", correcta: false, retro: "Retro por respuesta 11" },
				{ opcion: "the", correcta: true, retro: "Retro por respuesta 12" }],
			[
				{ opcion: "a", correcta: false, retro: "Retro por respuesta 13" },
				{ opcion: "an", correcta: false, retro: "Retro por respuesta 14" },
				{ opcion: "the", correcta: true, retro: "Retro por respuesta 15" }],
			[
				{ opcion: "a", correcta: false, retro: "Retro por respuesta 16" },
				{ opcion: "an", correcta: false, retro: "Retro por respuesta 17" },
				{ opcion: "the", correcta: true, retro: "Retro por respuesta 18" }]
		],
		FA: [
			{
				correcta: "Retroalimentación por casilla correcta 2A",
				incorrecta: "Retroalimentación por casilla incorrecta 2A",
			},
			{
				correcta: "Retroalimentación por casilla correcta 2B",
				incorrecta: "Retroalimentación por casilla incorrecta 2B",
			},
			{
				correcta: "Retroalimentación por casilla correcta 2C",
				incorrecta: "Retroalimentación por casilla incorrecta 2C",
			},
			{
				correcta: "Retroalimentación por casilla correcta 2D",
				incorrecta: "Retroalimentación por casilla incorrecta 2D",
			},
			{
				correcta: "Retroalimentación por casilla correcta 2E",
				incorrecta: "Retroalimentación por casilla incorrecta 2E",
			}
		],
		F: [
			"Retroalimentación por reactivo 2 correcto",
			"Retroalimentación por reactivo 2 incorrecto"
		]
	},
	{
		Q: "She likes cats and dogs because they are her favorite animals. She has @ exam tomorrow, her is exam is @ most difficult. Estadística Inferencial is that subject difficult one? She thinks it’s @ mess. She always studies on weekends to be ready for @ first round of that subject.",
		A: [
			[
				{ opcion: "a", correcta: false, retro: "Retro por respuesta 19" },
				{ opcion: "an", correcta: true, retro: "Retro por respuesta 20" },
				{ opcion: "the", correcta: false, retro: "Retro por respuesta 21" }],
			[
				{ opcion: "a", correcta: false, retro: "Retro por respuesta 22" },
				{ opcion: "an", correcta: false, retro: "Retro por respuesta 23" },
				{ opcion: "the", correcta: true, retro: "Retro por respuesta 24" }],
			[
				{ opcion: "a", correcta: true, retro: "Retro por respuesta 25" },
				{ opcion: "an", correcta: false, retro: "Retro por respuesta 26" },
				{ opcion: "the", correcta: false, retro: "Retro por respuesta 27" }],
			[
				{ opcion: "a", correcta: false, retro: "Retro por respuesta 28" },
				{ opcion: "an", correcta: false, retro: "Retro por respuesta 29" },
				{ opcion: "the", correcta: true, retro: "Retro por respuesta 30" }]
		],
		FA: [
			{
				correcta: "Retroalimentación por casilla correcta 3A",
				incorrecta: "Retroalimentación por casilla incorrecta 3A",
			},
			{
				correcta: "Retroalimentación por casilla correcta 3B",
				incorrecta: "Retroalimentación por casilla incorrecta 3B",
			},
			{
				correcta: "Retroalimentación por casilla correcta 3C",
				incorrecta: "Retroalimentación por casilla incorrecta 3C",
			},
			{
				correcta: "Retroalimentación por casilla correcta 3D",
				incorrecta: "Retroalimentación por casilla incorrecta 3D",
			},
			{
				correcta: "Retroalimentación por casilla correcta 3E",
				incorrecta: "Retroalimentación por casilla incorrecta 3E",
			}
		],
		F: [
			"Retroalimentación por reactivo 3 correcto",
			"Retroalimentación por reactivo 3 incorrecto"
		]
	}

]