document.addEventListener("DOMContentLoaded", async () => {
  console.log("Se cargó el detalle de ubicación");

  const parametro = new URLSearchParams(window.location.search);
  const id = parametro.get("id");
  console.log("id sitio:", id);

  const speciesGrid = document.querySelector(".species-grid");

  // Declaramos variables accesibles en todo el archivo
  let reserva = null;

  // ==============================
  // 1️⃣ Cargar detalle del sitio
  // ==============================
  try {
    const responseReservas = await fetch("../data/reservas.json");
    const dataReservas = await responseReservas.json();

    reserva = dataReservas.reservas.find(u => String(u.id) === String(id));

    if (!reserva) {
      console.warn("No se encontró la reserva con id:", id);
    } else {
      console.log("Reserva encontrada:", reserva);

      // Actualizar la información principal
      document.querySelector(".img-especie-detail").src = reserva.imagen;
      document.querySelector(".detail-item h2").textContent = reserva.lugar;
      document.querySelector(".detail-item p").innerHTML = `<b>Descripción:</b> ${reserva.descripcion}`;

      // Cargar imágenes adicionales
      const carruselContainer = document.querySelector(".carrusel-items");
      const fotos = [reserva.img1, reserva.img2, reserva.img3];

      fotos.forEach(foto => {
        if (foto) {
          const img = document.createElement("img");
          img.src = foto;
          img.alt = reserva.lugar;
          carruselContainer.appendChild(img);
        }
      });
    }

  } catch (error) {
    console.error("❌ No se cargó el detalle del sitio", error);
  }

  // ==============================
  // 2️⃣ Cargar especies aleatorias
  // ==============================
  try {
    const responseEspecies = await fetch("../data/especies.json");
    const dataEspecies = await responseEspecies.json();

    // Cargar especies desde localStorage si existe
    let especiesGuardadas = JSON.parse(localStorage.getItem("especies")) || [];

    // Combinar datos locales con el JSON base
    const especiesActualizadas = dataEspecies.especies.map(especie => {
      const actualizada = especiesGuardadas.find(e => e.id === especie.id);
      return actualizada ? { ...especie, ...actualizada } : especie;
    });

    // Seleccionar 3 especies aleatorias
    const especiesAleatorias = especiesActualizadas
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    // Limpiar contenedor antes de insertar
    speciesGrid.innerHTML = "";

    // Crear las especies en el DOM
    especiesAleatorias.forEach(especie => {
      const div = document.createElement("div");
      div.className = "specie-item";

      div.innerHTML = `
        <img src="${especie.imagen}" alt="${especie.nombre}" class="img-especie">
        <div class="title-especie">
          <h3>${especie.nombre}</h3>
          <p>${especie.profundidad}</p>
          <label class="${especie.state ? "stateTrue" : "stateFalse"}">
            ${especie.state ? "Vista" : "No vista"}
          </label>
        </div>
      `;

      speciesGrid.appendChild(div);
    });

  } catch (error) {
    console.error("❌ No se pudieron cargar las especies", error);
  }

  // ==============================
  // 3️⃣ Cargar centros de buceo
  // ==============================
  try {
    const responseCenter = await fetch("../data/diveCenter.json");
    const dataCenter = await responseCenter.json();

    const container = document.getElementById("diveCentersContainer");
    container.innerHTML = ""; // limpiar por si acaso

    dataCenter.diveCenter.forEach(centro => {
      const article = document.createElement("article");
      article.className = "Center";

      // Verificamos que exista reserva antes de usarla
      if (reserva && reserva.id) {
        article.addEventListener("click", () => {
          const url = `booking.html?idCentro=${encodeURIComponent(centro.id)}&idSitio=${encodeURIComponent(reserva.id)}`;
          console.log("➡️ Redirigiendo a:", url);
          window.location.href = url;
        });
      } else {
        // Si no hay reserva, enviamos solo el centro
        article.addEventListener("click", () => {
          const url = `booking.html?idCentro=${encodeURIComponent(centro.id)}`;
          console.log("➡️ Redirigiendo solo con centro:", url);
          window.location.href = url;
        });
      }

      article.innerHTML = `
        <img src="${centro.imagen}" alt="Imagen ${centro.escuela}" class="img-especie">
        <div>
          <p><b>${centro.escuela}</b></p>
          <span class="material-symbols-outlined">chevron_right</span>
        </div>
      `;

      container.appendChild(article);
    });

  } catch (error) {
    console.error("❌ No se pudieron cargar los centros de buceo", error);
  }
});