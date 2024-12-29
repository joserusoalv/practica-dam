/**
 * @deprecated No lo estoy usando, fue la primera POC para cargar componentes
 */
document.addEventListener("DOMContentLoaded", () => {
  const loadComponent = async (selector, file) => {
    try {
      const response = await fetch(file);
      if (!response.ok)
        throw new Error(`Error al cargar ${file}: ${response.statusText}`);
      const html = await response.text();
      document.querySelector(selector).innerHTML = html;
    } catch (error) {
      console.error(error);
    }
  };

  // Cargar el header y footer
  loadComponent("header", "./components/header.html");
  loadComponent("footer", "./components/footer.html");
});
