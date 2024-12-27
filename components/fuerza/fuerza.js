// fuerza.js
class AppFuerza extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Cargar el HTML desde un archivo externo
    fetch("./components/fuerza/fuerza.html")
      .then((response) => response.text())
      .then((html) => {
        shadow.innerHTML = html;

        this.playMusic();
      })
      .catch((error) => console.error("Error cargando el HTML:", error));
  }

  playMusic() {
    const audio = this.shadowRoot.getElementById("audio");
    const playlist = this.shadowRoot.getElementById("playlist");
    const links = playlist.getElementsByTagName("a");

    for (const link of links) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        audio.src = this.href;
        audio.play();

        // Remove active class from all links
        for (const otherLink of links) {
          otherLink.parentElement.classList.remove("active");
        }

        // Add active class to clicked link
        this.parentElement.classList.add("active");
      });
    }
  }
}

// Registra el componente personalizado
customElements.define("app-fuerza", AppFuerza);
