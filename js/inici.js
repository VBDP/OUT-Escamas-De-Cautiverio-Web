// Lògica per as menú mòbil (s'hamburguesa)
document.addEventListener('DOMContentLoaded', function() {
    
    // Cercam es botó i sa llista d'enllaços
    var botonMenu = document.getElementById('menu-toggle');
    var listaNav = document.querySelector('.nav-list');
    
    // Si es botó existeix, li afegim s'event de clic
    if (botonMenu && listaNav) {
        botonMenu.onclick = function() {
            // Si té sa classe 'open', la hi treim. Si no, la hi posam.
            if (listaNav.classList.contains('open')) {
                listaNav.classList.remove('open');
                listaNav.classList.remove('show');
            } else {
                listaNav.classList.add('open');
                listaNav.classList.add('show');
            }
        };
    }

    // Per a que es menú es tanqui en punxar en un enllaç
    var enlaces = document.querySelectorAll('.nav-list a');
    for (var i = 0; i < enlaces.length; i++) {
        enlaces[i].onclick = function() {
            if (listaNav) {
                listaNav.classList.remove('open');
                listaNav.classList.remove('show');
            }
        };
    }

    // Si punxam defora des menú, que es tanqui també
    document.onclick = function(evento) {
        if (listaNav && (listaNav.classList.contains('open') || listaNav.classList.contains('show'))) {
            // Miram si es clic NO ha estat en es botó ni en es menú
            if (!botonMenu.contains(evento.target) && !listaNav.contains(evento.target)) {
                listaNav.classList.remove('open');
                listaNav.classList.remove('show');
            }
        }
    };
});