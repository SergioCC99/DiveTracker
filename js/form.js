document.addEventListener("DOMContentLoaded", () => {
  const btnGuardar = document.getElementById("guardarInmersion");
  const modal = document.getElementById("modal");
  const modalError = document.getElementById("modalError");

  btnGuardar.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("se esta haciendo clic");

    // Obtener valores de los inputs del formulario
    const fecha = document.getElementById("fecha").value;
    const lugar = document.getElementById("lugar").value || "";
    const sitio = document.getElementById("sitio").value || "";
    const profundidad = document.getElementById("profundidad").value || "";
    const actividad = document.getElementById("actividad").value;
    const entradaPresion = document.getElementById("entradaPresion").value;
    const salidaPresion = document.getElementById("salidaPresion").value;
    const tiempo = document.getElementById("Tiempo").value;
    const corriente = document.querySelector('input[name="corriente"]:checked')?.value || "";
    const marea = document.querySelector('input[name="marea"]:checked')?.value || "";
    const visibilidad = document.querySelector('input[name="view"]:checked')?.value || "";
    const tiempoClima = document.querySelector('input[name="time"]:checked')?.value || "";

    if (!fecha || !lugar || !sitio || !actividad || !entradaPresion || !salidaPresion || !tiempo) {
      modalError.showModal();
      console.log("Campos incompletos");
      return;
    }

    // Crear objeto de nueva inmersión
    const nuevaInmersion = {
      id: Date.now(), //Aquí se genera el id de la imersión
      numero: 0,
      fecha,
      lugar,
      sitio,
      profundidad,
      tipo: actividad,
      entradaPresion,
      salidaPresion,
      tiempo,
      corriente,
      marea,
      visibilidad,
      tiempoClima,
      especies: []
    };

    // Leer inmersiones previas del localStorage
    const inmersionesGuardadas = JSON.parse(localStorage.getItem("nuevasInmersiones")) || [];

    // Agregar nueva
    inmersionesGuardadas.push(nuevaInmersion);

    // Guardar nuevamente
    localStorage.setItem("nuevasInmersiones", JSON.stringify(inmersionesGuardadas));

    // Mostrar modal de éxito
    modal.showModal();
  });
});