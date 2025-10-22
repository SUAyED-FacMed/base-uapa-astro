var reactivos = [
	{
		Q: "¿Qué proceso sucede en el paso 1? @",
		A: ["Atrapamiento de yoduro"],
		FA: [
			{ correcta: "A correcta", incorrecta: "A incorrecta" },
			{ correcta: "B correcta", incorrecta: "B incorrecta" }
		],
		F: [
			"¡Bien! En este paso, se da el atrapamiento de yoduro, que consiste en la entrada activa del yoduro a la célula folicular.",
			"En este paso, se da el inicio de la síntesis hormonal: el yoduro es captado por el simportador Na⁺/I⁻ desde la sangre hacia el tirocito, estimulado por TSH."
		]
	}
	,
	{
		Q: "¿Qué proceso sucede en el paso 2? @",
		A: ["Síntesis y liberación de Tg"],
		FA: [
			{ correcta: "A correcta", incorrecta: "A incorrecta" },
			{ correcta: "B correcta", incorrecta: "B incorrecta" }
		],
		F: [
			"En este paso, se da la síntesis y liberación de Tg, que es cuando se forma y libera la proteína base para la síntesis.",
			"Recuerda que este proceso ocurre justo después de captar el yoduro. La Tg debe estar en el coloide para que el yodo pueda incorporarse a ella."
		]
	},
	{
		Q: "¿Qué proceso sucede en el paso 3? @",
		A: ["Oxidación del yoduro"],
		FA: [
			{ correcta: "A correcta", incorrecta: "A incorrecta" },
			{ correcta: "B correcta", incorrecta: "B incorrecta" }
		],
		F: [
			"En este paso, se da la oxidación del yoduro, que es cuando se hace la conversión del yoduro a su forma oxidada.",
			"Recuerda que, en este paso, se convierte el yoduro (I⁻) en yodo molecular (I⁰) mediante la peroxidasa tiroidea. No puede realizarse si antes no está presente la Tg en el coloide."
		]
	},
	{
		Q: "¿Qué proceso sucede en el paso 4? @",
		A: ["Yodación de tirosilos"],
		FA: [
			{ correcta: "A correcta", incorrecta: "A incorrecta" },
			{ correcta: "B correcta", incorrecta: "B incorrecta" }
		],
		F: [
			"En este paso, se da la yodación de tirosilos, que es la unión del yodo oxidado a la Tg.",
			"Recuerda que aquí se forma MIT y DIT. Este proceso sólo ocurre después de que el yoduro ha sido oxidado y la Tg está presente en el coloide."
		]
	},
	{
		Q: "¿Qué proceso sucede en el paso 5? @",
		A: ["Acoplamiento de MIT y DIT"],
		FA: [
			{ correcta: "A correcta", incorrecta: "A incorrecta" },
			{ correcta: "B correcta", incorrecta: "B incorrecta" }
		],
		F: [
			"En este paso, se da el acoplamiento de MIT y DIT, que es cuando éstas se combinan para formar T<SUB>3</SUB> y T<SUB>4</SUB>.",
			"Recuerda que, en este paso, se permite la formación de T<SUB>3</SUB> y T<SUB>4</SUB> almacenadas en la Tg. No puede realizarse antes de que MIT y DIT se hayan formado."
		]
	},
	{
		Q: "¿Qué proceso sucede en el paso 6? @",
		A: ["Endocitosis del coloide"],
		FA: [
			{ correcta: "A correcta", incorrecta: "A incorrecta" },
			{ correcta: "B correcta", incorrecta: "B incorrecta" }
		],
		F: [
			"En este paso, se da la endocitosis del coloide, que es cuando el coloide es captado nuevamente por la célula.",
			"Recuerda que este proceso sólo ocurre cuando la TSH estimula la célula para recuperar el coloide ya yodado. No puede suceder antes del acoplamiento."
		]
	},
	{
		Q: "¿Qué proceso sucede en el paso 7? @",
		A: ["Proteólisis de la Tg"],
		FA: [
			{ correcta: "A correcta", incorrecta: "A incorrecta" },
			{ correcta: "B correcta", incorrecta: "B incorrecta" }
		],
		F: [
			"En este paso, se da la proteólisis de la Tg, que es cuando se rompe la Tg para liberar hormonas.",
			"Recuerda que, en este proceso, hay una degradación en lisosomas que libera T<SUB>3</SUB> y T<SUB>4</SUB>. No puede realizarse si antes no se ha recuperado el coloide mediante endocitosis."
		]
	},
	{
		Q: "¿Qué proceso sucede en el paso 8? @",
		A: ["Reciclaje de MIT y DIT"],
		FA: [
			{ correcta: "A correcta", incorrecta: "A incorrecta" },
			{ correcta: "B correcta", incorrecta: "B incorrecta" }
		],
		F: [
			"En este paso, se da el reciclaje de MIT y DIT, que es cuando se recupera el yodo de residuos no hormonales.",
			"Recuerda que este proceso es posterior a la proteólisis. La enzima DEHAL1 recupera yodo y tirosina de MIT/DIT que no fueron utilizados para formar hormonas."
		]
	},
	{
		Q: "¿Qué proceso sucede en el paso 9? @",
		A: ["Secreción de T<SUB>3</SUB> y T<SUB>4</SUB>"],
		FA: [
			{ correcta: "A correcta", incorrecta: "A incorrecta" },
			{ correcta: "B correcta", incorrecta: "B incorrecta" }
		],
		F: [
			"En este paso, se da la secreción de T<SUB>3</SUB> y T<SUB>4</SUB>, que es cuando T<SUB>3</SUB> y T<SUB>4</SUB> salen al torrente sanguíneo.",
			"Recuerda que éste es el proceso final. Una vez que T<SUB>3</SUB> y T<SUB>4</SUB> son liberadas de la Tg, cruzan la membrana del tirocito mediante el transportador MCT8 hacia la sangre."
		]
	}
];