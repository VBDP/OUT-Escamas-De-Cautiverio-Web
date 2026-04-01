const menuToggle = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-list');

menuToggle.addEventListener('click', () => {
    // Intercambia la clase 'show' para mostrar/ocultar el menú en móvil
    navList.classList.toggle('show');
});

// Cerrar el menú si se hace click en un enlace (opcional)
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('show');
    });
});
