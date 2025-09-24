function lineaTiempoVertical(idLineaTiemporVertical) {
	var tl = document.querySelectorAll('section.linea-tiempo-vertical#' + idLineaTiemporVertical + ' .timeline');
	timeline(tl, {
		forceVerticalMode: 869,
		mode: 'vertical',
		verticalStartPosition: 'left',
		visibleItems: 4,
		moveItems: 4
	});
}
