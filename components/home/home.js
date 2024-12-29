// home.js
class AppHome extends HTMLElement {
  constructor() {
    super();
    // Crear el Shadow DOM
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    try {
      const response = await fetch("./components/home/home.html");

      if (!response.ok) {
        throw new Error(`Error al cargar el HTML: ${response.statusText}`);
      }

      const html = await response.text();
      this.shadowRoot.innerHTML = html;

      initNavigation(this.shadowRoot); // Inicializar navegación después de cargar el HTML
    } catch (error) {
      this.shadowRoot.innerHTML = /* html */ `
          <app-error message="${error.message}"></app-error>
        `;
      console.error(error);
    }
  }
}

// Registra el componente personalizado
customElements.define("app-home", AppHome);
