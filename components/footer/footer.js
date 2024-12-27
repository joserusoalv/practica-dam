// footer.js
class AppFooter extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Cargar el HTML desde un archivo externo
    fetch("./components/footer/footer.html")
      .then((response) => response.text())
      .then((html) => {
        shadow.innerHTML = html;
      })
      .catch((error) => console.error("Error cargando el HTML:", error));
  }
}

// Registra el componente personalizado
customElements.define("app-footer", AppFooter);
