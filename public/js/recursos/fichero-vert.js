function ficheroVertical(idFichero) {
	const labelsVert = document.querySelectorAll("section.fichero-vert#" + idFichero + " .fichero-vert-item__label");
	const tabsVert = document.querySelectorAll("section.fichero-vert#" + idFichero + " .fichero-vert-tab");

	function toggleShow() {
		const target = this;
		const item = target.classList.contains("fichero-vert-tab")
			? target
			: target.parentElement;
		const group = item.dataset.actabGroup;
		const id = item.dataset.actabId;

		tabsVert.forEach(function (tab) {
			if (tab.dataset.actabGroup === group) {
				if (tab.dataset.actabId === id) {
					tab.classList.add("fichero-vert-active");
				} else {
					tab.classList.remove("fichero-vert-active");
				}
			}
		});

		labelsVert.forEach(function (label) {
			const tabItem = label.parentElement;

			if (tabItem.dataset.actabGroup === group) {
				if (tabItem.dataset.actabId === id) {
					tabItem.classList.add("fichero-vert-active");
				} else {
					tabItem.classList.remove("fichero-vert-active");
				}
			}
		});
	}

	labelsVert.forEach(function (label) {
		label.addEventListener("click", toggleShow);
	});

	tabsVert.forEach(function (tab) {
		tab.addEventListener("click", toggleShow);
	});
}