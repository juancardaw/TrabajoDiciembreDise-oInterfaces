// Elementos del modal
const supportBtn = document.getElementById("supportBtn");
const navSupportBtn = document.getElementById("navSupportBtn");
const supportModal = document.getElementById("supportModal");
const closeModal = document.getElementById("closeModal");
const supportForm = document.getElementById("supportForm");

// Función para abrir modal
function openSupportModal() {
  supportModal.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevenir scroll
}

// Función para cerrar modal
function closeSupportModal() {
  supportModal.classList.remove("active");
  document.body.style.overflow = "auto"; // Permitir scroll
}

// Abrir modal desde footer
supportBtn.addEventListener("click", openSupportModal);

// Abrir modal desde nav
navSupportBtn.addEventListener("click", openSupportModal);

// Cerrar modal con botón X
closeModal.addEventListener("click", closeSupportModal);

// Cerrar modal al hacer click fuera
supportModal.addEventListener("click", (e) => {
  if (e.target === supportModal) {
    closeSupportModal();
  }
});

// Cerrar modal con tecla ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && supportModal.classList.contains("active")) {
    closeSupportModal();
  }
});

// Manejar envío del formulario
supportForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Obtener valores
  const name = document.getElementById("supportName").value;
  const email = document.getElementById("supportEmail").value;
  const message = document.getElementById("supportMessage").value;
  
  // Log (en una aplicación real, aquí se enviaría al servidor)
  console.log("Formulario de soporte enviado:", {
    nombre: name,
    email: email,
    mensaje: message
  });
  
  // Mostrar confirmación
  alert(`¡Gracias ${name}! Tu solicitud de soporte ha sido enviada. Te contactaremos en ${email} pronto.`);
  
  // Limpiar formulario
  supportForm.reset();
  
  // Cerrar modal
  closeSupportModal();
});
