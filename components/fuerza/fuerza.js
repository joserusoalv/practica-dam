// fuerza.js
class AppFuerza extends HTMLElement {
  constructor() {
    super();
    // Crear el Shadow DOM
    this.attachShadow({ mode: "open" });

    this.links = []; // Guardar referencias a los links para eliminarlos después
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
      console.error("Audio or playlist elements not found in the HTML.");
      return;
    }

    const links = playlist.getElementsByTagName("a");

    // Guardar las referencias a los links para eliminarlos después
    this.links = Array.from(links);

    this.links.forEach((link) => {
      const onClick = (event) => {
        event.preventDefault();
        audio.src = link.href;
        audio.play();

        // Eliminar la clase "active" de todos los enlaces
        this.links.forEach((otherLink) => {
          otherLink.parentElement.classList.remove("active");
        });

        // Añadir la clase "active" al enlace clicado
        link.parentElement.classList.add("active");
      };

      // Añadir el event listener y guardar la referencia
      link.addEventListener("click", onClick);

      // Guardar la referencia del evento en el elemento link
      link._onClick = onClick;
    });
  }

  disconnectedCallback() {
    // Eliminar los event listeners al desconectar el componente
    this.links.forEach((link) => {
      if (link._onClick) {
        link.removeEventListener("click", link._onClick);
        // Eliminar la referencia al listener para evitar fugas
        delete link._onClick;
      }
    });
  }
}

// Registra el componente personalizado
customElements.define("app-fuerza", AppFuerza);
