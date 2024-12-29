// router.js

// PRIMERA IMPLEMENTACIÓN CON VISTAS ESTÁTICAS
// Función para cargar contenido dinámico
// const loadContent = async (path) => {
//   const viewContainer = document.querySelector(".view-container");
//   try {
//     const response = await fetch(path);
//     if (!response.ok) throw new Error("Vista no encontrada");
//     const content = await response.text();
//     viewContainer.innerHTML = content;

//     // Ejecutar scripts después de cargar el contenido
//     executeScripts(viewContainer);
//   } catch (error) {
//     viewContainer.innerHTML = "<h2>Error: Página no encontrada</h2>";
//   }
// };

// // Función para ejecutar los scripts del contenido cargado
// const executeScripts = (viewContainer) => {
//   const scripts = viewContainer.querySelectorAll("script");
//   scripts.forEach((script) => {
//     const newScript = document.createElement("script");
//     newScript.text = script.textContent; // Copiar el contenido del script
//     document.body.appendChild(newScript); // Insertar el nuevo script
//     document.body.removeChild(newScript); // Eliminar el script después de ejecutarlo
//   });
// };

// // Manejo de rutas
// const routes = {
//   "/": "views/home.html",
//   "/fuerza": "views/fuerza.html",
//   "/peso": "views/peso.html",
//   "/contacto": "views/contacto.html",
// };

// // Cambia la ruta sin recargar la página
// const navigateTo = (url) => {
//   history.pushState(null, null, url);
//   router();
// };

// // Controlador de rutas
// const router = () => {
//   const path = window.location.pathname;
//   const route = routes[path] || "views/404.html";
//   loadContent(route);

//   document.querySelectorAll("app-header").forEach((header) => {
//     const shadowRoot = header.shadowRoot;
//     shadowRoot.querySelectorAll("a[data-link]").forEach((link) => {
//       const linkPath = link.getAttribute("href");
//       if (path !== "/" || linkPath !== "/") {
//         link.classList.toggle("active", linkPath === path);
//       } else {
//         link.classList.remove("active");
//       }
//     });
//   });
// };

// // Maneja la navegación del historial del navegador
// window.addEventListener("popstate", router);

// // Intercepta clics en enlaces con data-link
// document.addEventListener("click", (event) => {
//   if (event.target.matches("[data-link]")) {
//     event.preventDefault();
//     navigateTo(event.target.getAttribute("href"));
//   }
// });

// // Carga inicial
// document.addEventListener("DOMContentLoaded", router);

// SEGUNDA IMPLEMENTACIÓN CON COMPONENTES DINÁMICOS
// Función para cargar un componente dinámicamente
const loadComponent = async (path) => {
  const viewContainer = document.querySelector(".view-container");
  let component;

  // Manejamos las rutas con componentes personalizados
  switch (path) {
    case "/":
      component = document.createElement("app-home");
      break;
    case "/peso":
      component = document.createElement("app-peso");
      break;
    case "/fuerza":
      component = document.createElement("app-fuerza");
      break;
    case "/contacto":
      component = document.createElement("app-contacto");
      break;
    default:
      component = document.createElement("app-404");
  }

  viewContainer.innerHTML = ""; // Limpiar el contenedor
  viewContainer.appendChild(component);
};

// Cambia la ruta sin recargar la página
const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

// Controlador de rutas
const router = () => {
  const path = window.location.pathname;
  loadComponent(path);

  // Actualizar enlaces activos
  document.querySelectorAll("nav a").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === path);
  });
};

// Maneja la navegación del historial del navegador
window.addEventListener("popstate", router);

// Intercepta clics en enlaces con data-link
document.addEventListener("click", (event) => {
  if (event.target.matches("[data-link]")) {
    event.preventDefault();
    navigateTo(event.target.href);
  }
});

// Carga inicial
document.addEventListener("DOMContentLoaded", router);
