// home.js
class AppHome extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Cargar el HTML desde un archivo externo
    fetch("./components/home/home.html")
      .then((response) => response.text())
      .then((html) => {
        shadow.innerHTML = html;
      })
      .catch((error) => console.error("Error cargando el HTML:", error));
  }
}

// Registra el componente personalizado
customElements.define("app-home", AppHome);
