document.addEventListener("DOMContentLoaded", async () => {
  console.log("✅ booking.js cargado");

  // Obtener los parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  const idCentro = params.get("idCentro");
  const idSitio = params.get("idSitio");
  console.log("Parámetros recibidos:", { idCentro, idSitio });

  // Elementos del DOM
  const modal = document.getElementById("modal");
  const modalError = document.getElementById("modalError");
  const btnGuardar = document.getElementById("guardarReserva");

  try {
    // 1️⃣ Cargar JSON de centros (escuelas)
    const responseEscuelas = await fetch("../data/diveCenter.json");
    const dataEscuelas = await responseEscuelas.json();
    escuela = dataEscuelas.diveCenter.find(e => String(e.id) === String(idCentro));

    if (!escuela) {
      console.warn("No se encontró la escuela con ese ID");
      return;
    }

    // Mostrar datos en el HTML
    document.querySelector(".img-especie-detail").src = escuela.imagen;
    document.getElementById("nombre").textContent = escuela.escuela;
    document.getElementById("descripcion").innerHTML = `<b>Descripción:</b> ${escuela.descripcion}`;
    document.getElementById("correo").innerHTML = `<b>Correo:</b> ${escuela.correo}`;
    document.getElementById("telefono").innerHTML = `<b>Teléfono:</b> ${escuela.telefono}`;
    document.getElementById("direccion").innerHTML = `<b>Dirección:</b> ${escuela.direccion}`;

    // Cargar imágenes adicionales
    const carruselContainer = document.querySelector(".carrusel-items");
    [escuela.img1, escuela.img2, escuela.img3].forEach(foto => {
      if (foto) {
        const img = document.createElement("img");
        img.src = foto;
        img.alt = escuela.escuela;
        carruselContainer.appendChild(img);
      }
    });

  } catch (error) {
    console.error("❌ Error cargando datos de la escuela:", error);
  }

  try {
    // 2️⃣ Cargar JSON de sitios
    const responseSitios = await fetch("../data/reservas.json");
    const dataSitios = await responseSitios.json();
    sitio = dataSitios.reservas.find(s => String(s.id) === String(idSitio));

    if (!sitio) {
      console.warn("No se encontró el sitio con ese ID");
    } else {
      console.log("Sitio encontrado:", sitio);
    }

  } catch (error) {
    console.error("❌ Error cargando datos del sitio:", error);
  }

  // 3️⃣ Guardar la reserva
  btnGuardar.addEventListener("click", (event) => {
    event.preventDefault();

    const fecha = document.getElementById("fecha").value;
    const nPersonas = document.getElementById("nPersonas").value;
    const nivelCertificacion = document.getElementById("nivelCertificacion").value;
    const requiereEquipo = document.querySelector('input[name="equipo"]:checked')?.value;
    const interes = document.getElementById("interes").value;
    const necesidad = document.getElementById("necesidad").value;

    // Validación de campos
    if (!fecha || !nPersonas || !nivelCertificacion || !requiereEquipo) {
      console.warn("⚠️ Faltan campos obligatorios");
      modalError.showModal();
      return;
    }

    // Crear objeto de reserva
    const nuevaReserva = {
      id: Date.now(),
      imagen: sitio?.imagen || escuela.imagen,
      lugar: sitio?.lugar || "Sin especificar",
      descripcion: sitio?.descripcion || "",
      img1: sitio?.img1 || "",
      img2: sitio?.img2 || "",
      img3: sitio?.img3 || "",
      lat: escuela.lat,
      lng: escuela.lng,
      state: true,
      nombre: "Sergio Combariza", // luego se puede reemplazar por usuario logueado
      correo: "sergio@example.com",
      telefono: "+57 3015840336",
      fecha,
      nPersonas,
      nivelCertificacion,
      requiereEquipo,
      interes,
      necesidad,
      escuela: escuela.escuela,
      correoEscuela: escuela.correo,
      contacto: escuela.telefono,
      direccion: escuela.direccion
    };

    // Guardar en localStorage
    const reservasGuardadas = JSON.parse(localStorage.getItem("nuevasReservas")) || [];
    reservasGuardadas.push(nuevaReserva);
    localStorage.setItem("nuevasReservas", JSON.stringify(reservasGuardadas));

    console.log("✅ Reserva guardada:", nuevaReserva);
    modal.showModal();
  });
});