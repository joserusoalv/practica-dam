function initNavigation(shadowRoot) {
  const links = shadowRoot.querySelectorAll("a[data-link]");
  if (links.length > 0) {
    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const href = event.target.getAttribute("href");
        if (href) {
          navigateTo(href); // Usamos la función de enrutamiento desde router.js
        }
      });
    });
  } else {
    console.warn("No se encontraron enlaces con data-link.");
  }
}
