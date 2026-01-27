const slider = document.getElementById("slider");
const images = slider.querySelectorAll("img");

let isDragging = false;
let startX = 0;
let currentIndex = 0;
let imageWidth = slider.parentElement.offsetWidth;

// Función para iniciar el arrastre
function startDrag(e) {
  isDragging = true;
  startX = e.clientX;
  slider.style.transition = "none"; // Quitamos animación mientras arrastra
  slider.style.cursor = "grabbing";
  e.preventDefault(); // Prevenir selección de texto
}

// Función para terminar el arrastre
function endDrag(e) {
  if (!isDragging) return;

  const diff = e.clientX - startX;
  
  console.log("Diferencia:", diff, "Índice actual:", currentIndex);

  // Umbral para cambiar de imagen
  if (diff < -100 && currentIndex < images.length - 1) {
    currentIndex++;
    console.log("Siguiente imagen:", currentIndex);
  } else if (diff > 100 && currentIndex > 0) {
    currentIndex--;
    console.log("Imagen anterior:", currentIndex);
  }

  slider.style.transition = "transform 0.4s ease";
  
  // Recalcular ancho antes de mover
  imageWidth = slider.parentElement.offsetWidth;
  moveSlider();

  isDragging = false;
  slider.style.cursor = "grab";
}

// Al presionar el ratón en el slider
slider.addEventListener("mousedown", startDrag);

// Al presionar el ratón en cualquier imagen
images.forEach((img) => {
  img.addEventListener("mousedown", startDrag);
});

// Mientras se mueve el ratón
window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const diff = e.clientX - startX;

  slider.style.transform = `translateX(${
    -currentIndex * imageWidth + diff
  }px)`;
});

// Al soltar el ratón
document.addEventListener("mouseup", endDrag);

// Función que coloca la imagen correcta
function moveSlider() {
  slider.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
}

// Recalcular ancho al redimensionar
window.addEventListener("resize", () => {
  imageWidth = slider.parentElement.offsetWidth;
  moveSlider();
});
