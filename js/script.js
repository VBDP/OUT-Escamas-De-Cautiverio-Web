// Variable per saber si ja hem entrat
var yaEntrado = false;

// Funció per a que els ulls parpellegin de tant en tant
function hacerParpadeo() {
    var ojos = document.querySelectorAll(".eye-wrap");
    
    // Afegim la classe de parpelleig a tots els ulls
    for (var i = 0; i < ojos.length; i++) {
        ojos[i].classList.add("blinking");
    }
    
    // Treim la classe després d'un moment
    setTimeout(function() {
        for (var i = 0; i < ojos.length; i++) {
            ojos[i].classList.remove("blinking");
        }
        
        // Esperam un temps aleatori per al següent parpelleig. Parpelleig ràpid si està carregant.
        var tiempo = yaEntrado ? (Math.random() * 500 + 300) : (Math.random() * 4000 + 2000);
        setTimeout(hacerParpadeo, tiempo);
    }, 250);
}

// Començam a parpellejar després d'un segon
setTimeout(hacerParpadeo, 1000);

// Funció que s'executa en entrar (es "ritual")
function entrarAlJuego(lang) {
    if (yaEntrado == true) {
        return;
    }
    yaEntrado = true;

    var pantallaCarga = document.getElementById("loader");
    var texto = document.getElementById("text-hint");
    var ojos = document.querySelectorAll(".eye-wrap");
    
    // Amagam la selección de idioma
    document.getElementById("lang-selection").style.display = "none";

    // Efecte de sacsejada
    pantallaCarga.classList.add("shake");
    pantallaCarga.classList.add("revealed");

    // Traducimos el texto de bienvenida según la bandera elegida
    if(lang === 'es') {
        texto.textContent = "BIENVENIDO";
    } else if(lang === 'en') {
        texto.textContent = "WELCOME";
    } else {
        texto.textContent = "BENVINGUT";
    }
    
    texto.style.color = "#ff0000";
    texto.style.opacity = "1";

    sessionStorage.setItem("animacionVista", "si");

    // Anam a la pàgina principal després d'una estona
    setTimeout(function() {
        window.location.href = "inici.html";
    }, 2200);
}

function selectLang(lang) {
    localStorage.setItem('idioma', lang);
    entrarAlJuego(lang);
}