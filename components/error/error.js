// error.js
class AppError extends HTMLElement {
  constructor() {
    super();
    // Crear el Shadow DOM
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const message = this.getAttribute("message") || "Ha ocurrido un error.";
    this.shadowRoot.innerHTML = /* html */ `
        <div style="color: red; font-family: Arial, sans-serif; text-align: center; padding: 1em;">
          <h2>Error</h2>
          <p>${message}</p>
        </div>
      `;
  }
}

// Registra el componente personalizado
customElements.define("app-error", AppError);
