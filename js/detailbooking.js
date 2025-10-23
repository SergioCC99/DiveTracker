document.addEventListener("DOMContentLoaded", async () => {
  console.log("Se cargo la ");

  // Tomar el parámetro 'id' desde la URL
  const parametro = new URLSearchParams(window.location.search);
  const id = parametro.get("id");
  console.log("id:", id);


  try {
    // Carga la información del json reservas
    const responseReservas = await fetch("../data/reservas.json");
    const dataReservas = await responseReservas.json();

    // Carga las reservas desde el localStorage
    const nuevasReservas = JSON.parse(localStorage.getItem("nuevasReservas")) || [];

    // Unir reservas del JSON + localStorage
    const todasReservas = [...dataReservas.reservas, ...nuevasReservas];

    // Buscar la reserva por id --> se convierte a string para evitar problemas de tipo de dato (número o string)
    const reserva = todasReservas.find((item) => String(item.id) === String(id));

    //Traer información del JSON o LocalStorage
    document.getElementById("imagen").src = reserva.imagen;
    document.getElementById("titulo").innerHTML = textContent = `${reserva.lugar}`;
    document.getElementById("descripcion").innerHTML = `<b>Descripción:</b> ${reserva.descripcion}`;

    //Cargar imagenes adicionales
    const carruselContainer = document.querySelector(".carrusel-items");

    const fotos = [reserva.img1, reserva.img2, reserva.img3, reserva.img4, reserva.img5];
        fotos.forEach(foto => {
        if (foto) {
            const img = document.createElement("img");
            img.src = foto;
            img.alt = location.nombre;
            carruselContainer.appendChild(img);
        }
    });

    // Actualizar Datos Personales
    const datosPersonales = document.getElementById("datosPersonales");

    datosPersonales.innerHTML = `
      <h2>Datos Personales</h2>
      <p><b>Nombre:</b> ${reserva.nombre}</p>
      <p><b>Correo:</b> ${reserva.correo}</p>
      <p><b>Teléfono:</b> ${reserva.telefono}</p>
    `;

    // Actualizar Datos Reserva
    const datosReserva = document.getElementById("datosReserva");

    datosReserva.innerHTML = `
        <h2>Datos reserva</h2>
        <p><b>Fecha:</b> ${new Date(reserva.fecha).toLocaleDateString("es-CO")}</p>
        <p><b>Lugar: </b>${reserva.lugar}</p>
        <p><b>N° personas: </b>${reserva.nPersonas}</p>
        <p><b>Nivel de certificación: </b>${reserva.nivelCertificacion}</p>
        <p><b>Requiere equipo: </b>${reserva.requiereEquipo}</p>
    `;
    // Actualizar Interes y Necesidades
    const interesesNecesidades = document.getElementById("interesNecesidades");

    interesesNecesidades.innerHTML = `
        <h2>Intereses y Necesidades</h2>
        <p><b>Intereses:</b> ${reserva.interes}</p>
        <p><b>Necesidades:</b> ${reserva.necesidad}</p>
    `;

        // Actualizar Interes y Necesidades
    const escuelaBuceo = document.getElementById("escuelaBuceo");

    escuelaBuceo.innerHTML = `
        <h2>Escuela de Buceo</h2>
        <p><b>Escuela:</b> ${reserva.escuela}</p>
        <p><b>correo:</b> ${reserva.correoEscuela}</p>
        <p><b>Contacto:</b> ${reserva.contacto}</p>
        <p><b>Dirección:</b> ${reserva.direccion}</p>
    `;


  } catch (error) {
    console.error("Error cargando la reserva:", error);
  }
});