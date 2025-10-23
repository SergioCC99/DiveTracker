document.addEventListener("DOMContentLoaded", async () => {
  console.log("Documento cargado: Booking");

  // Obtener los parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  const idCentro = params.get("idCentro");
  const idSitio = params.get("idSitio");

  // Elementos del DOM
  const modal = document.getElementById("modal");
  const modalError = document.getElementById("modalError");
  const btnGuardar = document.getElementById("guardarReserva");

  try {
    // Cargar JSON escuela de buceo
    const responseEscuelas = await fetch("../data/diveCenter.json");
    const dataEscuelas = await responseEscuelas.json();
    escuela = dataEscuelas.diveCenter.find(e => String(e.id) === String(idCentro));

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
    console.error("Error cargando la escuela");
  }

  try {
    //Cargar JSON de reservaas para traer el sitio de buceo
    const responseSitios = await fetch("../data/reservas.json");
    const dataSitios = await responseSitios.json();
    sitio = dataSitios.reservas.find(s => String(s.id) === String(idSitio));

  } catch (error) {
    console.error("Error cargando datos del siti");
  }

  //Guardar la reserva
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
      console.warn("Faltan campos obligatorios");
      modalError.showModal();
    }

    // Crear objeto de reserva
    const nuevaReserva = {
      id: Date.now(),
      imagen: sitio?.imagen || escuela.imagen,
      lugar: sitio?.lugar,
      descripcion: sitio?.descripcion || "",
      img1: sitio?.img1 || "",
      img2: sitio?.img2 || "",
      img3: sitio?.img3 || "",
      lat: escuela.lat,
      lng: escuela.lng,
      state: true,
      nombre: "Sergio Combariza",
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

    console.log("Reserva guardada:");
    modal.showModal();
  });
});