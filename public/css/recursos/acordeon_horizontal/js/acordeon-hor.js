function acordeonHorizontal(idAcordeon) {
	const numSecciones = document.querySelectorAll('section.acordeon-horizontal#' + idAcordeon + ' div.seccion');
	const raiz = document.documentElement;
	raiz.style.setProperty('--numSec', numSecciones.length);

	const etiquetas = document.querySelectorAll('section.acordeon-horizontal#' + idAcordeon + ' .etiquetas > label');

	const inputs = document.querySelectorAll('section.acordeon-horizontal#' + idAcordeon + ' input');
	let nInput = inputs.length;

	function seleccionado() {
		for (var i = 0; i < nInput; i++) {
			etiquetas[i].classList.remove('seleccionado');
		}
		for (var i = 0; i < nInput; i++) {
			if (inputs[i].checked) {
				break
			}
		}
		etiquetas[i].classList.add('seleccionado');
	}

	inputs.forEach((esteInput) => {
		esteInput.addEventListener('click', () => {
			seleccionado();
		});
	});
	const accordionItemHeaders = document.querySelectorAll('section.acordeon-horizontal#' + idAcordeon + ' div.seccion .titulo');
	accordionItemHeaders.forEach(accordionItemHeader => {
		accordionItemHeader.addEventListener('click', event => {
			const currentlyActiveAccordionItemHeader = document.querySelector('section.acordeon-horizontal#' + idAcordeon + ' div.seccion .titulo.active');
			if (currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader !== accordionItemHeader) {
				currentlyActiveAccordionItemHeader.classList.toggle('active');
			}

			accordionItemHeader.classList.toggle('active');
			const accordionItemBody = accordionItemHeader.nextElementSibling;
		});
	});
};
