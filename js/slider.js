const slider = document.getElementById("slider");
const images = slider.querySelectorAll("img");
const sliderContainer = slider.parentElement;
const indicatorsContainer = document.getElementById("sliderIndicators");
const prevBtn = document.getElementById("sliderPrev");
const nextBtn = document.getElementById("sliderNext");

let isDragging = false;
let startX = 0;
let currentIndex = 0;
let imageWidth = sliderContainer.offsetWidth;
let autoSlideInterval;
const AUTO_SLIDE_DELAY = 5000; // 5 segundos

// Crear indicadores
function createIndicators() {
  images.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("slider-dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    indicatorsContainer.appendChild(dot);
  });
}

// Ir a una diapositiva específica
function goToSlide(index) {
  currentIndex = index;
  updateSlider();
  resetAutoSlide();
}

// Siguiente diapositiva
function nextSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  updateSlider();
  resetAutoSlide();
}

// Diapositiva anterior
function prevSlide() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateSlider();
  resetAutoSlide();
}

// Actualizar slider
function updateSlider() {
  imageWidth = sliderContainer.offsetWidth;
  slider.style.transition = "transform 0.4s ease";
  slider.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
  
  // Actualizar indicadores
  document.querySelectorAll(".slider-dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

// Iniciar auto slide
function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, AUTO_SLIDE_DELAY);
}

// Resetear auto slide
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Event listeners para botones
prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

// Pausar auto slide al pasar el mouse
sliderContainer.addEventListener("mouseenter", () => {
  clearInterval(autoSlideInterval);
});

// Reanudar auto slide al salir el mouse
sliderContainer.addEventListener("mouseleave", () => {
  startAutoSlide();
});

// Drag functionality
function startDrag(e) {
  isDragging = true;
  startX = e.clientX;
  slider.style.transition = "none";
  slider.style.cursor = "grabbing";
  e.preventDefault();
}

function endDrag(e) {
  if (!isDragging) return;
  
  const diff = e.clientX - startX;
  
  if (diff < -50 && currentIndex < images.length - 1) {
    nextSlide();
  } else if (diff > 50 && currentIndex > 0) {
    prevSlide();
  } else {
    updateSlider();
  }
  
  isDragging = false;
  slider.style.cursor = "grab";
}

slider.addEventListener("mousedown", startDrag);
images.forEach((img) => {
  img.addEventListener("mousedown", startDrag);
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  
  const diff = e.clientX - startX;
  slider.style.transform = `translateX(${-currentIndex * imageWidth + diff}px)`;
});

document.addEventListener("mouseup", endDrag);

// Recalcular ancho al redimensionar
window.addEventListener("resize", () => {
  imageWidth = sliderContainer.offsetWidth;
  updateSlider();
});

// Inicialización
createIndicators();
startAutoSlide();
