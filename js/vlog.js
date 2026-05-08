document.addEventListener('DOMContentLoaded', function() {
    var contenedorRanking = document.getElementById('listaVlogs');
    if (contenedorRanking == null) {
        return;
    }

    // Cridam a sa funció que està a api.js
    if (typeof obtenerRanking === 'function') {
        obtenerRanking().then(function(Vlogs) {
            
            if (Vlogs == null || Vlogs.length === 0) {
                contenedorRanking.innerHTML = '<p class="text-center text-xl text-white">No hi ha vlogs encara.</p>';
                return;
            }

            //guardar blogs per a sa pàgina
            restoVlogs = [];
            for (var i = 1; i < Vlogs.length; i++) {
                restoVlogs.push(Vlogs[i]);
            }

            // Dibuixam sa primera pàgina de sa llista
            dibujarLista(1);

        }).catch(function(error) {
            console.log("Error en carregar el ranking");
            contenedorRanking.innerHTML = '<p class="text-center text-xl text-red-500">Error al carregar les dades.</p>';
        });
    }
});



// Funció per dibuixar una pàgina específica de sa llista
function dibujarLista(pagina) {
    var contenedor = document.getElementById('listaVlogs');
    if (contenedor == null) return;
    
    contenedor.innerHTML = '';
    paginaActual = pagina;

    if (restoVlogs.length === 0) {
        contenedor.innerHTML = '<p class="text-center text-white py-10">No hi ha més vlogs.</p>';
        return;
    }

    // Calculam es rang de vlogs a mostrar
    var inicio = (pagina - 1) * vlogsPorPagina;
    var fin = inicio + vlogsPorPagina;
    
    // Agafam només es d'aquesta pàgina
    var vlogsPagina = [];
    for (var i = inicio; i < fin; i++) {
        if (restoVlogs[i]) {
            vlogsPagina.push(restoVlogs[i]);
        }
    }

    for (var i = 0; i < vlogsPagina.length; i++) {
        var p = vlogsPagina[i];
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

    var totalPaginas = Math.ceil(restoVlogs.length / vlogsPorPagina);
    
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
