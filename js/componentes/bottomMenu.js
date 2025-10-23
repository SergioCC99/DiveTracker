document.addEventListener("DOMContentLoaded", () => {
  const { createApp } = Vue;

  const menuComponent = {
    data() {
      return {
        currentPage: window.location.pathname.split("/").pop()
      };
    },
    template: `
      <nav class="bottom-menu">
        <a href="biblioteca.html" :class="{ active: currentPage === 'biblioteca.html' }"><span class="material-symbols-outlined">book</span>Biblioteca</a>
        <a href="bitacora.html" :class="{ active: currentPage === 'bitacora.html' }"><span class="material-symbols-outlined">scuba_diving</span>Bitácora</a>
        <a href="mapa.html" :class="{ active: currentPage === 'mapa.html' }"><span class="material-symbols-outlined">map_search</span>Explorar</a>
      </nav>
    `,
  };

  createApp({
    components: { 'bottom-menu': menuComponent }
  }).mount('#menuApp');
});