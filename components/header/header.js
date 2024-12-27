// header.js
class AppHeader extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Cargar el HTML desde un archivo externo
    fetch("./components/header/header.html")
      .then((response) => response.text())
      .then((html) => {
        shadow.innerHTML = html;

        this.initNavbar();
        this.initToggleNavbar();
      })
      .catch((error) => console.error("Error cargando el HTML:", error));
  }

  initToggleNavbar() {
    const toggleButton = this.shadowRoot.querySelector(".navbar-toggler");
    const navbar = this.shadowRoot.querySelector(".navbar-nav");

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
  }

  initNavbar() {
    // Asegúrate de que los enlaces dentro del navbar tengan el atributo data-link
    this.shadowRoot.querySelectorAll("a[data-link]").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const href = event.target.getAttribute("href");
        navigateTo(href); // Usamos la función de enrutamiento desde router.js
      });
    });
  }
}

// Registra el componente personalizado
customElements.define("app-header", AppHeader);
