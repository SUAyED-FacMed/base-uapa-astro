function lineaTiempoHorizontal(idLineaTiemporHorizontal) {
	var tl = document.querySelectorAll('section.linea-tiempo-horizontal#' + idLineaTiemporHorizontal + ' .timeline');
	timeline(tl, {
		forceVerticalMode: 969,
		mode: 'horizontal',
		verticalStartPosition: 'left',
		visibleItems: 4,
		moveItems: 4
	});
};
