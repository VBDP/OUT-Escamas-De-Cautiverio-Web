let revealed = false;

// Funció de parpelleig aleatori
function randomBlink() {
    if (revealed) return; // Si ja s'ha tancat, no parpellegis més
    
    const eyes = document.querySelectorAll('.eye-wrap');
    eyes.forEach(e => e.classList.add('blinking'));
    
    setTimeout(() => {
        // Només traiem la classe si no estem en el ritual final
        if (!revealed) {
            eyes.forEach(e => e.classList.remove('blinking'));
        }
        setTimeout(randomBlink, Math.random() * 4000 + 2000);
    }, 250);
}

// Iniciar el parpelleig al cap de 1 segons
setTimeout(randomBlink, 1000);

function sealRitual() {
    if (revealed) return;
    revealed = true; // Bloqueja altres accions

    const loader = document.getElementById('loader');
    const hint = document.getElementById('text-hint');
    const eyes = document.querySelectorAll('.eye-wrap');

    loader.classList.add('shake');
    loader.classList.add('revealed');

    // Tanquem definitivament
    eyes.forEach(eye => {
        eye.classList.remove('blinking'); 
        eye.classList.add('closed');      
        eye.style.filter = "brightness(0.2)";
        eye.style.boxShadow = "none";
    });

    hint.textContent = "BENVINGUT";
    hint.style.color = "#ff0000";

    // Redirecció
    setTimeout(() => {
        window.location.assign('inici.html');
    }, 2200);
}

// Interaccions
window.addEventListener('wheel', (e) => { 
    if (Math.abs(e.deltaY) > 5) sealRitual(); 
}, { passive: true });

window.addEventListener('mousedown', sealRitual, { once: true });

let touchStartY = 0;
window.addEventListener('touchstart', (e) => { 
    touchStartY = e.touches[0].clientY; 
}, { passive: true });

window.addEventListener('touchmove', (e) => {
    if (Math.abs(touchStartY - e.touches[0].clientY) > 20) sealRitual();
}, { passive: true });