// fuerza.js
class AppFuerza extends HTMLElement {
  constructor() {
    super();
    // Crear el Shadow DOM
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    try {
      const response = await fetch("./components/fuerza/fuerza.html");

      if (!response.ok) {
        throw new Error(`Error al cargar el HTML: ${response.statusText}`);
      }

      const html = await response.text();
      this.shadowRoot.innerHTML = html;

      this.playMusic(); // Inicializar funcionalidad de música
    } catch (error) {
      this.shadowRoot.innerHTML = /* html */ `
          <app-error message="${error.message}"></app-error>
        `;
      console.error(error);
    }
  }

  playMusic() {
    const audio = this.shadowRoot.getElementById("audio");
    const playlist = this.shadowRoot.getElementById("playlist");

    if (!audio || !playlist) {
      console.error("Elementos de audio o playlist no encontrados en el HTML.");
      return;
    }

    const links = playlist.getElementsByTagName("a");

    for (const link of links) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        audio.src = this.href;
        audio.play();

        // Eliminar la clase "active" de todos los enlaces
        for (const otherLink of links) {
          otherLink.parentElement.classList.remove("active");
        }

        // Añadir la clase "active" al enlace clicado
        this.parentElement.classList.add("active");
      });
    }
  }
}

// Registra el componente personalizado
customElements.define("app-fuerza", AppFuerza);
