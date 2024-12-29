// header.js
class AppHeader extends HTMLElement {
  constructor() {
    super();
    // Crear el Shadow DOM
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    try {
      const response = await fetch("./components/header/header.html");

      if (!response.ok) {
        throw new Error(`Error al cargar el HTML: ${response.statusText}`);
      }

      const html = await response.text();
      this.shadowRoot.innerHTML = html;

      // Inicializar funcionalidades después de cargar el HTML
      initNavigation(this.shadowRoot);
      this.initToggleNavbar();
    } catch (error) {
      this.shadowRoot.innerHTML = /* html */ `
          <app-error message="${error.message}"></app-error>
        `;
      console.error(error);
    }
  }

  initToggleNavbar() {
    const toggleButton = this.shadowRoot.querySelector(".navbar-toggler");
    const navbar = this.shadowRoot.querySelector(".navbar-nav");

    if (toggleButton && navbar) {
      // Toggle para abrir/cerrar el navbar
      toggleButton.addEventListener("click", (event) => {
        // Evitar que el clic en el botón de toggle se propague
        event.stopPropagation();
        navbar.classList.toggle("active");
      });

      // Cerrar el navbar si se hace clic fuera de él
      document.addEventListener("click", (event) => {
        if (
          !navbar.contains(event.target) &&
          !toggleButton.contains(event.target)
        ) {
          navbar.classList.remove("active");
        }
      });
    } else {
      console.warn("Elementos del navbar no encontrados.");
    }
  }
}

// Registra el componente personalizado
customElements.define("app-header", AppHeader);
