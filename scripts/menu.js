// Control del menú hamburguesa
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('close');
    const overlay = document.getElementById('overlay');

    // Abrir menú
    hamburger.addEventListener('click', function () {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('menu-active'); 
        document.body.style.overflow = 'hidden'; 
    });

    // Cerrar menú
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // Cerrar con Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
    });

    function closeMenu() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-active'); 
        document.body.style.overflow = ''; 
    }

    // Cerrar menú al hacer clic en un enlace
    const sidebarLinks = document.querySelectorAll('#sidebar a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});
