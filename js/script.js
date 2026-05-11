// Variable per saber si ja hem entrat
var yaEntrado = false;

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

    sessionStorage.setItem("animacionVista", "si");

    // Anam a la pàgina principal després d'una estona
    setTimeout(function() {
        window.location.href = "inici.html";
    }, 2200);
}

// Detectar clics o scroll per entrar
window.addEventListener("mousedown", entrarAlJuego);
window.addEventListener("click", entrarAlJuego);
window.addEventListener("keydown", entrarAlJuego);
window.addEventListener("wheel", function(evento) {
    if (Math.abs(evento.deltaY) > 5) {
        entrarAlJuego();
    }
});

// Per a mòbils també
window.addEventListener("touchstart", entrarAlJuego);