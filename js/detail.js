document.addEventListener("DOMContentLoaded", async () => {
  console.log("Cargado detalle de inmersión");

  //Tomar el parámetro 'id' desde la URL
  const parametro = new URLSearchParams(window.location.search);
  const id = parametro.get("id");
  console.log("id:", id);

  if (!id) {
    console.warn("No se hay inmersiones registradas");
    return;
  }

  try {

    //Cargar el JSON con las inmersiones
    const response = await fetch("../data/inmersiones.json");
    const data = await response.json();

    //Cargar inmersiones desde el local storage
    const nuevasInmersiones = JSON.parse(localStorage.getItem("nuevasInmersiones")) || [];
    
    //Unir las inmersiones del jason y el localstorage
    const todasInmersiones = [...data.inmersiones, ...nuevasInmersiones];
    //agrega el número de inmersi
    todasInmersiones.forEach((item, index) => item.numero = index + 1)
    
    //convertir a string
    const inmersion = todasInmersiones.find((item) => String(item.id) === String(id));

    console.log("Inmersión encontrada:", inmersion);

    // Actualizar número de inmersión
    document.querySelector(".title-number h2:last-child").textContent = `N°${inmersion.numero}`;

    // Actualizar Info base
    const infoBase = document.querySelector(".detail-section.base");
    infoBase.innerHTML = `
      <h2>Información Base</h2>
      <p><b>Fecha:</b> ${new Date(inmersion.fecha).toLocaleDateString("es-CO")}</p>
      <p><b>Lugar:</b> ${inmersion.lugar}</p>
      <p><b>Sitio:</b> ${inmersion.sitio}</p>
      <p><b>Profundidad:</b> ${inmersion.profundidad}</p>
    `;

    // Actualizar info actividad
    const actividad = document.querySelector(".detail-section.actividad");
    actividad.innerHTML = `
      <h2>Actividad</h2>
      <p><b>Tipo:</b> ${inmersion.tipo}</p>
      <p><b>Entrada (Bar o PSI):</b> ${inmersion.entradaPresion}</p>
      <p><b>Salida (Bar o PSI):</b> ${inmersion.salidaPresion}</p>
      <p><b>Tiempo (Minutos):</b> ${inmersion.tiempo}</p>
    `;

    // Actualizar info clima
    const clima = document.querySelector(".detail-section.clima");
    clima.innerHTML = `
      <h2>Clima</h2>
      <p><b>Corriente:</b> ${inmersion.corriente}</p>
      <p><b>Marea:</b> ${inmersion.marea}</p>
      <p><b>Visibilidad:</b> ${inmersion.visibilidad}</p>
      <p><b>Tiempo:</b> ${inmersion.tiempoClima}</p>
    `;
  } catch (error) {
    console.error("Error cargando la inmersión:", error);
  }
});