const mainSlider = document.getElementById("mainSlider");
const mainImages = mainSlider.querySelectorAll("img");
const mainIndicatorsContainer = document.getElementById("mainSliderIndicators");
const mainPrevBtn = document.getElementById("mainSliderPrev");
const mainNextBtn = document.getElementById("mainSliderNext");

let mainIsDragging = false;
let mainStartX = 0;
let mainCurrentIndex = 0;
let mainImageWidth = mainSlider.parentElement.offsetWidth;
let mainAutoSlideInterval;
const MAIN_AUTO_SLIDE_DELAY = 6000; // 6 segundos

// Crear indicadores para slider principal
function createMainIndicators() {
  mainImages.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("main-slider-dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToMainSlide(index));
    mainIndicatorsContainer.appendChild(dot);
  });
}

// Ir a una diapositiva específica
function goToMainSlide(index) {
  mainCurrentIndex = index;
  updateMainSlider();
  resetMainAutoSlide();
}

// Siguiente diapositiva
function mainNextSlide() {
  mainCurrentIndex = (mainCurrentIndex + 1) % mainImages.length;
  updateMainSlider();
  resetMainAutoSlide();
}

// Diapositiva anterior
function mainPrevSlide() {
  mainCurrentIndex = (mainCurrentIndex - 1 + mainImages.length) % mainImages.length;
  updateMainSlider();
  resetMainAutoSlide();
}

// Actualizar slider
function updateMainSlider() {
  mainImageWidth = mainSlider.parentElement.offsetWidth;
  mainSlider.style.transition = "transform 0.5s ease";
  mainSlider.style.transform = `translateX(-${mainCurrentIndex * mainImageWidth}px)`;
  
  // Actualizar indicadores
  document.querySelectorAll(".main-slider-dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === mainCurrentIndex);
  });
}

// Iniciar auto slide
function startMainAutoSlide() {
  mainAutoSlideInterval = setInterval(mainNextSlide, MAIN_AUTO_SLIDE_DELAY);
}

// Resetear auto slide
function resetMainAutoSlide() {
  clearInterval(mainAutoSlideInterval);
  startMainAutoSlide();
}

// Event listeners para botones
mainPrevBtn.addEventListener("click", mainPrevSlide);
mainNextBtn.addEventListener("click", mainNextSlide);

// Pausar auto slide al pasar el mouse
const mainImgContainer = document.querySelector(".main-img-container");
mainImgContainer.addEventListener("mouseenter", () => {
  clearInterval(mainAutoSlideInterval);
});

// Reanudar auto slide al salir el mouse
mainImgContainer.addEventListener("mouseleave", () => {
  startMainAutoSlide();
});

// Drag functionality
function startMainDrag(e) {
  mainIsDragging = true;
  mainStartX = e.clientX;
  mainSlider.style.transition = "none";
  mainSlider.style.cursor = "grabbing";
  e.preventDefault();
}

function endMainDrag(e) {
  if (!mainIsDragging) return;
  
  const diff = e.clientX - mainStartX;
  
  if (diff < -50 && mainCurrentIndex < mainImages.length - 1) {
    mainNextSlide();
  } else if (diff > 50 && mainCurrentIndex > 0) {
    mainPrevSlide();
  } else {
    updateMainSlider();
  }
  
  mainIsDragging = false;
  mainSlider.style.cursor = "grab";
}

mainSlider.addEventListener("mousedown", startMainDrag);
mainImages.forEach((img) => {
  img.addEventListener("mousedown", startMainDrag);
});

window.addEventListener("mousemove", (e) => {
  if (!mainIsDragging) return;
  
  const diff = e.clientX - mainStartX;
  mainSlider.style.transform = `translateX(${-mainCurrentIndex * mainImageWidth + diff}px)`;
});

document.addEventListener("mouseup", endMainDrag);

// Recalcular ancho al redimensionar
window.addEventListener("resize", () => {
  mainImageWidth = mainSlider.parentElement.offsetWidth;
  updateMainSlider();
});

// Efecto de desaparición al hacer scroll (estilo Apple)
const mainImgSection = document.querySelector(".main-img");

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  const mainImgHeight = mainImgSection.offsetHeight;
  
  // Calcular opacidad basada en el scroll
  // Cuando scrollY es 0, opacidad es 1
  // Cuando scrollY llega a mainImgHeight, opacidad es 0
  const opacity = Math.max(0, 1 - (scrollPosition / (mainImgHeight * 0.6)));
  const scale = Math.max(0.85, 1 - (scrollPosition / (mainImgHeight * 1.2)));
  
  mainImgSection.style.opacity = opacity;
  mainImgSection.style.transform = `scale(${scale})`;
  mainImgSection.style.pointerEvents = opacity > 0.1 ? "auto" : "none";
});

// Inicialización
createMainIndicators();
startMainAutoSlide();
