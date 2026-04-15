// Universal Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    // Handle the menu toggle button click
    const menuToggle = document.getElementById('menu-toggle') || document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list') || document.getElementById('nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            navList.classList.toggle('open');
            navList.classList.toggle('show'); // Handle both class conventions
        });
    }

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList) {
                navList.classList.remove('open');
                navList.classList.remove('show');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navList && navList.classList.contains('open') || navList.classList.contains('show')) {
            if (menuToggle && !menuToggle.contains(e.target) && !navList.contains(e.target)) {
                navList.classList.remove('open');
                navList.classList.remove('show');
            }
        }
    });
});