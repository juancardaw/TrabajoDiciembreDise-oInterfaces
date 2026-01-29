// Elementos del menú
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");
const navMenuButtons = navMenu.querySelectorAll(".btnNavMenu");

// Toggle del menú
function toggleMenu() {
  hamburgerBtn.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Cerrar menú
function closeMenu() {
  hamburgerBtn.classList.remove("active");
  navMenu.classList.remove("active");
}

// Abrir/Cerrar al hacer clic en hamburguesa
hamburgerBtn.addEventListener("click", toggleMenu);

// Cerrar menú al hacer clic en un botón
navMenuButtons.forEach((button) => {
  button.addEventListener("click", closeMenu);
});

// Cerrar menú al hacer resize a tamaño mayor
window.addEventListener("resize", () => {
  if (window.innerWidth > 600) {
    closeMenu();
  }
});

// Cerrar menú al hacer scroll
let lastScrollY = 0;
window.addEventListener("scroll", () => {
  if (window.innerWidth <= 600 && Math.abs(window.scrollY - lastScrollY) > 50) {
    closeMenu();
    lastScrollY = window.scrollY;
  }
});

// Cerrar menú al hacer click fuera
document.addEventListener("click", (e) => {
  if (window.innerWidth <= 600) {
    if (!e.target.closest(".nav-container")) {
      closeMenu();
    }
  }
});

