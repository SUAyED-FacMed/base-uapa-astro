// código para iniciar las animaciones
AOS.init();

// código para desactivar las animaciones en una resolución específica
AOS.init({
  disable: function () {
    var maxWidth = 768;
    return window.innerWidth < maxWidth;
  }
});