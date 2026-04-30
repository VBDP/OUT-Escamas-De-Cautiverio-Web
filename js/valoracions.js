var CLAVE_STORAGE = "escamas_comments_v1";

// Funció per obtenir es comentaris guardats en es navegador
function cargarComentariosLocal() {
    var guardados = localStorage.getItem(CLAVE_STORAGE);
    if (guardados == null) {
        return [];
    }
    return JSON.parse(guardados);
}

// Funció per guardar sa llista de comentaris en es navegador
function guardarComentariosLocal(lista) {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(lista));
}

// Funció per esborrar un comentari
function borrarComentario(indice) {
    var lista = cargarComentariosLocal();
    // Treim es comentari de sa llista
    lista.splice(indice, 1);
    // Guardam i tornam a dibuixar
    guardarComentariosLocal(lista);
    dibujarComentarios();
}

// Funció per mostrar es comentaris a sa pàgina amb un disseny premium
function dibujarComentarios() {
    var listaHtml = document.getElementById("commentsList");
    var comentarios = cargarComentariosLocal();
    
    // Netejam sa llista
    listaHtml.innerHTML = "";

    if (comentarios.length === 0) {
        listaHtml.innerHTML = '<p class="no-comments text-center italic opacity-60">Encara no hi ha comentaris.</p>';
        return;
    }

    // Recorrem es comentaris i es afegim a s'HTML amb disseny premium
    for (var i = 0; i < comentarios.length; i++) {
        var c = comentarios[i];
        
        var div = document.createElement("div");
        // Classes de Tailwind per a que sembli una targeta premium
        div.className = "group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#996666]/50 rounded-2xl p-6 transition-all duration-300 shadow-lg";
        
        div.innerHTML = 
            '<div class="flex justify-between items-start mb-4">' +
                '<div>' +
                    '<strong class="text-2xl text-[#996666] block mb-1">' + c.name + '</strong>' +
                    '<span class="text-xs text-[#9F543E]/60 bg-black/40 px-3 py-1 rounded-full border border-white/5">' + c.date + '</span>' +
                '</div>' +
                '<button onclick="borrarComentario(' + i + ')" class="text-[#996666]/40 hover:text-red-400 transition-colors text-xl p-2">✕</button>' +
            '</div>' +
            '<p class="text-lg text-[#9F543E] leading-relaxed">' + c.message + '</p>';
        
        listaHtml.appendChild(div);
    }
}

// Funció per afegir un comentari nou
function nuevoComentario(nombre, mensaje) {
    var lista = cargarComentariosLocal();
    
    // Cream s'objecte des comentari
    var fechaActual = new Date();
    var fechaTexto = fechaActual.toLocaleDateString() + " " + fechaActual.toLocaleTimeString();

    var comentarioObj = {
        name: nombre,
        message: mensaje,
        date: fechaTexto
    };

    // Es posam a n'es principi de sa llista
    lista.unshift(comentarioObj);
    
    // Guardam i tornam a dibuixar
    guardarComentariosLocal(lista);
    dibujarComentarios();
}

// Deixam borrarComentario disponible a n'es objecte window per a que s'onclick de s'HTML funcioni
window.borrarComentario = borrarComentario;

// Quan sa pàgina estigui llista
document.addEventListener("DOMContentLoaded", function() {
    var botonEnviar = document.getElementById("sendComment");
    var inputNombre = document.getElementById("name");
    var inputMensaje = document.getElementById("comment");
    
    // Missatge d'estat
    var estado = document.createElement("p");
    estado.className = "text-center font-bold mt-4";
    var caja = document.querySelector(".comment-box");
    if (caja) {
        caja.appendChild(estado);
    }

    // Dibuixam es comentaris en començar
    dibujarComentarios();

    // En fer clic a enviar
    botonEnviar.addEventListener("click", function() {
        var nombre = inputNombre.value;
        var mensaje = inputMensaje.value;

        // Comprovam camps buits
        if (nombre == "" || mensaje == "") {
            estado.textContent = "Omple tots es camps abans d'enviar.";
            estado.style.color = "#f8d7da";
            return;
        }

        // Si tot està bé, l'afegim
        nuevoComentario(nombre + ")", mensaje);
        
        // Netejam es inputs
        inputNombre.value = "";
        inputMensaje.value = "";
        
        estado.textContent = "Comentari enviat!";
        estado.style.color = "#b5f8c3";
    });
});