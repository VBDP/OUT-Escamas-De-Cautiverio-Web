// Variable per saber si ja hem entrat
var yaEntrado = false;

// Miram si ja s'ha vist l'animació abans
if (localStorage.getItem("animacionVista") == "si") {
    // Si ja s'ha vist, anam directes a la pàgina d'inici
    window.location.href = "inici.html";
}

// Funció per a que els ulls parpellegin de tant en tant
function hacerParpadeo() {
    if (yaEntrado == true) {
        return; // Si ja hem entrat, no feim res
    }
    
    var ojos = document.querySelectorAll(".eye-wrap");
    
    // Afegim la classe de parpelleig a tots els ulls
    for (var i = 0; i < ojos.length; i++) {
        ojos[i].classList.add("blinking");
    }
    
    // Treim la classe després d'un moment
    setTimeout(function() {
        if (yaEntrado == false) {
            for (var i = 0; i < ojos.length; i++) {
                ojos[i].classList.remove("blinking");
            }
        }
        // Esperam un temps aleatori per al següent parpelleig
        var tiempo = Math.random() * 4000 + 2000;
        setTimeout(hacerParpadeo, tiempo);
    }, 250);
}

// Començam a parpellejar després d'un segon
setTimeout(hacerParpadeo, 1000);

// Funció que s'executa en entrar (es "ritual")
function entrarAlJuego() {
    if (yaEntrado == true) {
        return;
    }
    yaEntrado = true;

    // Guardam que ja hem vist l'animació
    localStorage.setItem("animacionVista", "si");

    var pantallaCarga = document.getElementById("loader");
    var texto = document.getElementById("text-hint");
    var ojos = document.querySelectorAll(".eye-wrap");

    // Efecte de sacsejada
    pantallaCarga.classList.add("shake");
    pantallaCarga.classList.add("revealed");

    // Tancam els ulls
    for (var i = 0; i < ojos.length; i++) {
        ojos[i].classList.remove("blinking");
        ojos[i].classList.add("closed");
        ojos[i].style.filter = "brightness(0.2)";
        ojos[i].style.boxShadow = "none";
    }

    // Canviam es text
    texto.textContent = "BENVINGUT";
    texto.style.color = "#ff0000";

    // Anam a la pàgina principal després d'una estona
    setTimeout(function() {
        window.location.href = "inici.html";
    }, 2200);
}

// Detectar clics o scroll per entrar
window.addEventListener("mousedown", entrarAlJuego);
window.addEventListener("wheel", function(evento) {
    if (Math.abs(evento.deltaY) > 5) {
        entrarAlJuego();
    }
});

// Per a mòbils també
var inicioToque = 0;
window.addEventListener("touchstart", function(evento) {
    inicioToque = evento.touches[0].clientY;
});
window.addEventListener("touchmove", function(evento) {
    var finToque = evento.touches[0].clientY;
    if (Math.abs(inicioToque - finToque) > 20) {
        entrarAlJuego();
    }
});