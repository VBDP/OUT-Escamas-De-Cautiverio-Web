document.addEventListener('DOMContentLoaded', function() {
    var botonMenu = document.getElementById('menu-toggle');
    var listaNav = document.querySelector('.nav-list');
    
    if (botonMenu && listaNav) {
        botonMenu.onclick = function() {
            listaNav.classList.toggle('open');
            listaNav.classList.toggle('show');
        };
    }

    var enlaces = document.querySelectorAll('.nav-list a');
    for (var i = 0; i < enlaces.length; i++) {
        enlaces[i].onclick = function() {
            if (listaNav) {
                listaNav.classList.remove('open');
                listaNav.classList.remove('show');
            }
        };
    }

    document.addEventListener('click', function(e) {
        if (listaNav && (listaNav.classList.contains('open') || listaNav.classList.contains('show'))) {
            if (botonMenu && !botonMenu.contains(e.target) && !listaNav.contains(e.target)) {
                listaNav.classList.remove('open');
                listaNav.classList.remove('show');
            }
        }
    });

    function checkReveal() {
        var elements = document.querySelectorAll('.reveal:not(.active)');
        for (var i = 0; i < elements.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = elements[i].getBoundingClientRect().top;
            var elementVisible = 50;
            if (elementTop < windowHeight - elementVisible) {
                elements[i].classList.add('active');
            }
        }
    }

    window.addEventListener('scroll', checkReveal);
    window.addEventListener('load', checkReveal);
    checkReveal();
    
    // Per si de cas l'IntersectionObserver va millor en moderns
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.reveal').forEach(function(el) {
            observer.observe(el);
        });
    }
});