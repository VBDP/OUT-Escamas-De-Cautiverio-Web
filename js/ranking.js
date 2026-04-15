// Variables globals per a sa paginació (estil simple de 1r DAM)
var restoJugadores = [];
var paginaActual = 1;
var jugadoresPorPagina = 5;

// Quan sa pàgina carregui, cercam es ranking
document.addEventListener('DOMContentLoaded', function() {
    var contenedorRanking = document.getElementById('listaJugadores');
    if (contenedorRanking == null) {
        return;
    }

    // Cridam a sa funció que està a api.js
    if (typeof obtenerRanking === 'function') {
        obtenerRanking().then(function(jugadores) {
            
            if (jugadores == null || jugadores.length === 0) {
                contenedorRanking.innerHTML = '<p class="text-center text-xl text-white">No hi ha jugadors encara.</p>';
                return;
            }

            // Es Top 3 per as podi
            var podio = [];
            for (var i = 0; i < 3; i++) {
                if (jugadores[i]) {
                    podio.push(jugadores[i]);
                }
            }

            // Guardam sa resta de jugadors per paginar-los
            restoJugadores = [];
            for (var i = 3; i < jugadores.length; i++) {
                restoJugadores.push(jugadores[i]);
            }

            // Actualitzam es dibuixets de dalt (es podi) sempre
            actualizarPodio(podio);

            // Dibuixam sa primera pàgina de sa llista
            dibujarLista(1);

        }).catch(function(error) {
            console.log("Error en carregar es ranking");
            contenedorRanking.innerHTML = '<p class="text-center text-xl text-red-500">Error al carregar les dades.</p>';
        });
    }
});

// Funció per dibuixar es podi (es 3 primers)
function actualizarPodio(podio) {
    var contenedorPodio = document.querySelector('.mt-20 .flex.items-end');
    if (contenedorPodio == null) return;

    contenedorPodio.innerHTML = '';

    var clasesPosiciones = [
        { bg: 'bg-gradient-to-t from-yellow-700 to-yellow-400 shadow-[0_0_30px_rgba(253,224,71,0.5)]', h: 'h-48 md:h-64', w: 'w-24 md:w-32', num: 1 },
        { bg: 'bg-gradient-to-t from-gray-600 to-gray-300 shadow-[0_0_20px_rgba(156,163,175,0.4)]', h: 'h-36 md:h-48', w: 'w-20 md:w-28', num: 2 },
        { bg: 'bg-gradient-to-t from-orange-800 to-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.4)]', h: 'h-28 md:h-36', w: 'w-20 md:w-28', num: 3 }
    ];

    var ordenAMostrar = [1, 0, 2]; 

    for (var i = 0; i < ordenAMostrar.length; i++) {
        var pos = ordenAMostrar[i];
        if (podio[pos]) {
            var player = podio[pos];
            var est = clasesPosiciones[pos];

            var podEl = document.createElement('div');
            podEl.className = 'flex flex-col items-center';
            
            podEl.innerHTML = 
                '<div class="' + est.bg + ' ' + est.w + ' ' + est.h + ' rounded-t-[20px] flex flex-col items-center justify-center text-white p-2 md:p-3 text-center border-t border-white/40 transform hover:-translate-y-2 transition-transform duration-300">' +
                  '<span class="text-6xl md:text-7xl font-black opacity-90 drop-shadow-lg">' + est.num + '</span>' +
                '</div>' +
                '<div class="mt-5 text-center flex flex-col items-center">' +
                  '<span class="text-xl md:text-3xl font-extrabold truncate w-24 md:w-36 text-white drop-shadow-md mb-2">' + (player.name || 'Anònim') + '</span>' +
                  '<span class="text-sm md:text-lg font-bold bg-[#9F543E]/20 text-[#9F543E] px-4 py-1.5 rounded-full border border-[#9F543E]/40 whitespace-nowrap mb-2">' + (player.puntuacion || 0) + ' pts</span>' +
                '</div>';
            
            contenedorPodio.appendChild(podEl);
        }
    }
}

// Funció per dibuixar una pàgina específica de sa llista
function dibujarLista(pagina) {
    var contenedor = document.getElementById('listaJugadores');
    if (contenedor == null) return;
    
    contenedor.innerHTML = '';
    paginaActual = pagina;

    if (restoJugadores.length === 0) {
        contenedor.innerHTML = '<p class="text-center text-white py-10">No hi ha més jugadors.</p>';
        return;
    }

    // Calculam es rang de jugadors a mostrar
    var inicio = (pagina - 1) * jugadoresPorPagina;
    var fin = inicio + jugadoresPorPagina;
    
    // Agafam només es d'aquesta pàgina
    var jugadoresPagina = [];
    for (var i = inicio; i < fin; i++) {
        if (restoJugadores[i]) {
            jugadoresPagina.push(restoJugadores[i]);
        }
    }

    for (var i = 0; i < jugadoresPagina.length; i++) {
        var p = jugadoresPagina[i];
        var posicion = inicio + i + 4; // Començam en es 4t, etc.

        var card = document.createElement('div');
        card.className = 'flex items-center w-full lg:w-4/5 mx-auto bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#996666]/50 rounded-2xl p-4 md:p-6 mb-4 transition-all duration-300 transform hover:scale-[1.02] shadow-lg';
        
        card.innerHTML = 
            '<div class="w-16 h-16 md:w-20 md:h-20 mr-4 md:mr-8 inline-flex items-center justify-center rounded-full flex-shrink-0 bg-gradient-to-br from-[#440150] to-[#1c1414] border border-[#996666]/30 shadow-[0_0_15px_rgba(68,1,80,0.5)]">' +
              '<span class="text-3xl md:text-4xl font-black text-[#996666]">' + posicion + '</span>' +
            '</div>' +
            '<div class="flex-grow flex justify-between items-center text-left">' +
              '<h2 class="text-2xl md:text-3xl font-bold text-white pr-4 truncate w-1/2">' + (p.name || 'Anònim') + '</h2>' +
              '<div class="inline-flex items-center space-x-2 bg-[#9F543E]/20 px-4 py-2 rounded-full border border-[#9F543E]/30 whitespace-nowrap">' +
                  '<span class="text-xl md:text-2xl font-bold text-[#9F543E]">' + (p.puntuacion || 0) + '</span>' +
                  '<span class="text-xs md:text-sm text-[#9F543E]/80 uppercase tracking-widest hidden sm:inline">pts</span>' +
              '</div>' +
            '</div>';
        
        contenedor.appendChild(card);
    }

    // Dibuixam es botons davall
    dibujarBotonesPaginacion();
}

// Funció per crear es botons d'Anterior i Següent
function dibujarBotonesPaginacion() {
    var contenedorBotones = document.getElementById('paginacion');
    if (contenedorBotones == null) return;

    contenedorBotones.innerHTML = '';

    var totalPaginas = Math.ceil(restoJugadores.length / jugadoresPorPagina);
    
    // Si només hi ha una pàgina, no fan falta botons
    if (totalPaginas <= 1) return;

    // Botó Anterior
    if (paginaActual > 1) {
        var btnPrev = document.createElement('button');
        btnPrev.className = 'px-6 py-2 bg-[#440150] text-white rounded-full border border-[#996666]/30 hover:bg-[#996666] transition-all';
        btnPrev.textContent = '« Anterior';
        btnPrev.onclick = function() {
            dibujarLista(paginaActual - 1);
        };
        contenedorBotones.appendChild(btnPrev);
    }

    // Text de pàgina
    var info = document.createElement('span');
    info.className = 'text-[#9F543E] font-bold text-lg';
    info.textContent = 'Pàgina ' + paginaActual + ' de ' + totalPaginas;
    contenedorBotones.appendChild(info);

    // Botó Següent
    if (paginaActual < totalPaginas) {
        var btnNext = document.createElement('button');
        btnNext.className = 'px-6 py-2 bg-[#440150] text-white rounded-full border border-[#996666]/30 hover:bg-[#996666] transition-all';
        btnNext.textContent = 'Següent »';
        btnNext.onclick = function() {
            dibujarLista(paginaActual + 1);
        };
        contenedorBotones.appendChild(btnNext);
    }
}
