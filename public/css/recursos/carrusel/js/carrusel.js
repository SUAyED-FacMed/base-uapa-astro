function carrusel(idCarrusel) {
    const tiempoGaleria = 5000;
    const sliderCarrusel = document.querySelector('section.carrusel.container-slider#' + idCarrusel + ' #sliderCarrusel');
    var sliderSection = document.querySelectorAll('section.carrusel.container-slider#' + idCarrusel + ' .slider__section');
    let puntos = document.querySelectorAll('section.carrusel.container-slider#' + idCarrusel + ' .punto');
    let listaPuntos = document.querySelector('section.carrusel.container-slider#' + idCarrusel + ' .puntos');

    const numberOfSlides = sliderSection.length;
    var anchoGaleria = numberOfSlides * 100;

    const raizGaleria = document.documentElement;
    raizGaleria.style.setProperty('--anchoGaleria' + idCarrusel, anchoGaleria + '%');

    let sliderSectionLast = sliderSection[sliderSection.length - 1];
    sliderCarrusel.insertAdjacentElement('afterbegin', sliderSectionLast);

    const btnRegresa = document.querySelector('section.carrusel.container-slider#' + idCarrusel + ' #btn-regresa');
    const btnAvanza = document.querySelector('section.carrusel.container-slider#' + idCarrusel + ' #btn-avanza');

    function avanza() {
        var sliderSection = document.querySelectorAll('section.carrusel.container-slider#' + idCarrusel + ' .slider__section');
        sliderSection.forEach((slide) => {
            slide.classList.remove('activo');
        });
        puntos.forEach((punto) => {
            punto.classList.remove('activo');
        });
        let sliderSectionFirst = document.querySelectorAll('section.carrusel.container-slider#' + idCarrusel + ' .slider__section')[0];
        sliderCarrusel.style.marginLeft = '-200%';
        sliderCarrusel.style.transition = 'all 0.5s';
        setTimeout(function () {
            sliderCarrusel.style.transition = 'none';
            sliderCarrusel.insertAdjacentElement('beforeend', sliderSectionFirst);
            sliderCarrusel.style.marginLeft = '-100%';
        }, 500);
        let actual = document.querySelectorAll('section.carrusel.container-slider#' + idCarrusel + ' .slider__section')[2];
        let idNum = actual.getAttribute('id').substr(5);
        actual.classList.add('activo');
        let punto = document.querySelector('section.carrusel.container-slider#' + idCarrusel + ' #punto' + idNum);
        punto.classList.add('activo');
        sliderSection = document.querySelectorAll('section.carrusel.container-slider#' + idCarrusel + ' .slider__section');
    };

    function regresa() {
        var sliderSection = document.querySelectorAll('section.carrusel.container-slider#' + idCarrusel + ' .slider__section');
        sliderSection.forEach((slide) => {
            slide.classList.remove('activo');
        });
        puntos.forEach((punto) => {
            punto.classList.remove('activo');
        });
        let sliderSectionLast = sliderSection[sliderSection.length - 1];
        sliderCarrusel.style.marginLeft = '0';
        sliderCarrusel.style.transition = 'all 0.5s';
        setTimeout(function () {
            sliderCarrusel.style.transition = 'none';
            sliderCarrusel.insertAdjacentElement('afterbegin', sliderSectionLast);
            sliderCarrusel.style.marginLeft = '-100%';
        }, 500);
        let actual = document.querySelectorAll('section.carrusel.container-slider#' + idCarrusel + ' .slider__section')[0];
        let idNum = actual.getAttribute('id').substr(5);
        actual.classList.add('activo');
        let punto = document.querySelector('section.carrusel.container-slider#' + idCarrusel + ' #punto' + idNum);
        punto.classList.add('activo');
    };

    var bucle;
    var ciclo = () => {
        bucle = setInterval(function () {
            avanza();
        }, tiempoGaleria);
    };
    ciclo();
    sliderCarrusel.addEventListener('mouseover', () => {
        clearInterval(bucle);
    });
    btnRegresa.addEventListener('mouseover', () => {
        clearInterval(bucle);
    });
    btnAvanza.addEventListener('mouseover', () => {
        clearInterval(bucle);
    });
    listaPuntos.addEventListener('mouseover', () => {
        clearInterval(bucle);
    });
    sliderCarrusel.addEventListener('mouseout', () => {
        ciclo();
    });
    btnRegresa.addEventListener('mouseout', () => {
        ciclo();
    });
    btnAvanza.addEventListener('mouseout', () => {
        ciclo();
    });
    listaPuntos.addEventListener('mouseout', () => {
        ciclo();
    });
    btnRegresa.addEventListener('click', function () {
        regresa();
    });
    btnAvanza.addEventListener('click', function () {
        avanza();
    });
    const punto = document.querySelectorAll('section.carrusel.container-slider#' + idCarrusel + ' .punto');

    punto.forEach((cadaPunto, indicador) => {
        cadaPunto.addEventListener('click', () => {
            console.log('El indicador fue el %s', indicador);
            var listaSlides = document.querySelectorAll('section.carrusel.container-slider#' + idCarrusel + ' .slider__section');
            listaSlides.forEach((cadaSlide) => {
                cadaSlide.classList.remove('activo');
            });
            puntos.forEach((cadaPunto) => {
                cadaPunto.classList.remove('activo');
            });

            var actual = document.querySelector('section.carrusel.container-slider#' + idCarrusel + ' #slide' + indicador);
            actual.classList.add('activo');
            console.log('Nuevo es %s', actual.getAttribute('id'));
            var punto = document.querySelector('section.carrusel.container-slider#' + idCarrusel + ' #punto' + indicador);
            punto.classList.add('activo');

            var sliderSection = document.querySelectorAll('section.carrusel.container-slider#' + idCarrusel + ' .slider__section');
            var previos = 0;
            while (!sliderSection[previos].classList.contains('activo')) {
                previos++;
            }

            sliderCarrusel.style.marginLeft = (previos * -100) + '%';
            sliderCarrusel.style.transition = 'all 0.5s';

            setTimeout(function () {
                sliderCarrusel.style.transition = 'none';
                if (previos == 0) {
                    sliderCarrusel.insertAdjacentElement('afterbegin', sliderSection[sliderSection.length - 1]);
                }
                else {
                    for (var ind = 0; ind < (previos - 1); ind++) {
                        sliderCarrusel.insertAdjacentElement('beforeend', sliderSection[ind]);
                    }
                }
                sliderCarrusel.style.marginLeft = '-100%';
            }, 500);

        })
    });
}