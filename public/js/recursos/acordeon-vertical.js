function acordeonVertical(idAcordeon) {
	const accordionItemHeaders = document.querySelectorAll('section.accordion#' + idAcordeon + ' .accordion-item-header');
	accordionItemHeaders.forEach(accordionItemHeader => {
		accordionItemHeader.addEventListener('click', event => {
			const currentlyActiveAccordionItemHeader = document.querySelector('section.accordion#' + idAcordeon + ' .accordion-item-header.active');
			if (currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader !== accordionItemHeader) {
				currentlyActiveAccordionItemHeader.classList.toggle('active');
				currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
			}
			accordionItemHeader.classList.toggle('active');
			const accordionItemBody = accordionItemHeader.nextElementSibling;
			if (accordionItemHeader.classList.contains('active')) {
				// Usar setTimeout para permitir que el contenido se renderice completamente
				setTimeout(() => {
					accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + 'px';
				}, 10);
			}
			else {
				accordionItemBody.style.maxHeight = 0;
			}
		});
	});
};
