document.addEventListener('DOMContentLoaded', function () {
    const navlinks = document.querySelector('.nav-links');
    const buttonNavBarOpen = document.querySelector('.toggle-buton--open');
    const botonCerrar = document.querySelector('.toggle-buton--close');

    if (!navlinks || !buttonNavBarOpen || !botonCerrar) {
        console.error("No se encontró uno de los elementos. Verifica tu HTML.");
        return;
    }
    botonCerrar.style.display = 'none';
    // Abrir menú
    buttonNavBarOpen.addEventListener('click', function () {
        navlinks.classList.add('nav-active');
        botonCerrar.style.display = 'block';
    });


    // Cerrar menú
    botonCerrar.addEventListener('click', function () {
        navlinks.classList.remove('nav-active');
        botonCerrar.style.display = 'none';
    });
});




