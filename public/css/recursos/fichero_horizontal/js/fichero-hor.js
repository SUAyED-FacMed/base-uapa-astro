function ficheroHorizontal(idFichero) {
const labels = document.querySelectorAll("section.fichero-hor#" + idFichero + " .fichero-hor-content .fichero-hor-item__label");
const tabs = document.querySelectorAll("section.fichero-hor#" + idFichero + " .fichero-hor-tab");
const slider = document.querySelector("section.fichero-hor#" + idFichero + " .slider");
// let numTabs = tabs.length;
slider.style.setProperty('width', (100 / tabs.length) + '%');

function toggleShow() {
    const target = this;
    const item = target.classList.contains("fichero-hor-tab")
        ? target
        : target.parentElement;
    const group = item.dataset.actabGroup;
    const id = item.dataset.actabId;
    tabs.forEach(function (tab, ind) {
        if (tab.dataset.actabGroup === group) {
            if (tab.dataset.actabId === id) {
                tab.classList.add("fichero-hor-active");
                slider.style.transform = 'translateX(' + (100 * ind) + '%)';
            } else {
                tab.classList.remove("fichero-hor-active");
            }
        }
    });
    labels.forEach(function (label) {
        const tabItem = label.parentElement;
        if (tabItem.dataset.actabGroup === group) {
            if (tabItem.dataset.actabId === id) {
                tabItem.classList.add("fichero-hor-active");
            } else {
                tabItem.classList.remove("fichero-hor-active");
            }
        }
    });
}
labels.forEach(function (label) {
    label.addEventListener("click", toggleShow);
});
tabs.forEach(function (tab) {
    tab.addEventListener("click", toggleShow);
});
}