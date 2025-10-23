document.addEventListener("DOMContentLoaded", () => {
  console.log("Componente header cargado");
  
  const { createApp } = Vue;

  // Componente Header mobile y ipad
  const HeaderComponent = {
    template: `
      <header class="header">
        <div class="user-info">
          <span><img src="../img/image.webp" alt="Imagen usuario" class="user-image"></span>
          <div class="user-text">
            <h1>¡Hola, Sergio!</h1>
            <p>Buzo Avanzado</p>
          </div>
        </div>
      </header>
    `,
  };

  // Componente Header desktop
  const SideHeaderComponent = {
    data() {
      return {
        currentPage: window.location.pathname.split("/").pop()
      };
    },
    
    template: `
      <aside class="side-menu">
        <div class="user-info">
          <span><img src="../img/image.webp" alt="Imagen usuario" class="user-image"></span>
          <div class="user-text">
            <h1>¡Hola, Sergio!</h1>
            <p>Buzo Avanzado</p>
          </div>
        </div>

        <nav class="side-nav">
          <a href="biblioteca.html" :class="{ active: currentPage === 'biblioteca.html' }"><span class="material-symbols-outlined">book</span>Biblioteca</a>
          <a href="bitacora.html" :class="{ active: currentPage === 'bitacora.html' }"><span class="material-symbols-outlined">scuba_diving</span>Bitácora</a>
          <a href="mapa.html" :class="{ active: currentPage === 'mapa.html' }"><span class="material-symbols-outlined">map_search</span>Explorar</a>
        </nav>
      </aside>
    `,
  };

  // Montamos el componente
  createApp({
    components: {
      'app-header': HeaderComponent,
      'desktop-header': SideHeaderComponent
    }
  }).mount('#headerApp');

});
