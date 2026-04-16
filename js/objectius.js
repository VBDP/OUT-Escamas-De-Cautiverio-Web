// Quan es document estigui llist
$(document).ready(function() {
    var listaSlider = $('.slider ul');
    var diapositivas = $('.slider li');
    var contenedorPuntos = $('.slider-dots');
    var indiceActual = 0;

    // Crear es puntets de navegació
    for (var i = 0; i < diapositivas.length; i++) {
        var clasePunto = "dot";
        if (i === 0) {
            clasePunto = "dot active";
        }
        // Afegim es punt a n'es contenidor
        contenedorPuntos.append('<span class="' + clasePunto + '" data-index="' + i + '"></span>');
    }

    var puntos = $('.dot');

    // Funció per moure es slider
    function moverSlider(indice) {
        // En mòbils no es mou, així que sortim
        if (window.innerWidth <= 768) {
            return;
        }

        indiceActual = indice;
        
        // Calculam quant s'ha de moure sa llista
        var anchoDiapositiva = diapositivas.outerWidth(true);
        var anchoContenedor = $('.slider').width();
        var movimiento = (anchoContenedor / 2) - (anchoDiapositiva / 2) - (indice * anchoDiapositiva);

        // Aplicam es moviment amb CSS
        listaSlider.css('transform', 'translateX(' + movimiento + 'px)');
        
        // Canviam sa classe active a ses diapositives
        diapositivas.removeClass('active');
        diapositivas.eq(indice).addClass('active');

        // Canviam sa classe active a n'es punts
        puntos.removeClass('active');
        puntos.eq(indice).addClass('active');
    }

    // Botó Següent
    $('.next-btn').click(function() {
        indiceActual = (indiceActual + 1) % diapositivas.length;
        moverSlider(indiceActual);
    });

    // Botó Anterior
    $('.prev-btn').click(function() {
        indiceActual = (indiceActual - 1 + diapositivas.length) % diapositivas.length;
        moverSlider(indiceActual);
    });

    // Clic a n'es punts
    puntos.click(function() {
        var miIndice = $(this).data('index');
        moverSlider(miIndice);
    });

    // Si canviam sa mida de sa finestra
    $(window).resize(function() {
        moverSlider(indiceActual);
    });

    // Un petit retard per a que es col·loqui bé a n'es principi
    setTimeout(function() {
        moverSlider(0);
    }, 100);
});