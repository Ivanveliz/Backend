class Slider {
    constructor(sliderSelector, imagenSelector) {
        this.slider = document.querySelector(sliderSelector);

        if (!this.slider) {

            return;
        }
        //si el slider existe?
        this.images = Array.from(this.slider.querySelectorAll(imagenSelector));

        if (this.images.length === 0) {

            return;
        }
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.images.forEach(img => img.style.display = 'none');
        this.images[this.currentIndex].style.display = 'block';
        setInterval(() => this.showNextImage(), 5000);
    }

    showNextImage() {
        this.images[this.currentIndex].style.display = 'none';
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.images[this.currentIndex].style.display = 'block';
    }
}

// 🛠 Ejecutar SOLO después de que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {

    const sliderElement = document.querySelector('.slider');
    const images = sliderElement ? sliderElement.querySelectorAll('.imagen-slider') : [];


    if (images.length > 0) {
        new Slider('.slider', '.imagen-slider');
    } else {
        console.error("❌ No se encontraron imágenes al intentar inicializar el slider.");
    }
});

