document.addEventListener("DOMContentLoaded",async () => {

    console.log("Documento cargado: datos bitacora");
    const lista = document.querySelector(".historial ul");

    try {
        //Obtener info del json
        const response = await fetch("../data/inmersiones.json");
        const data = await response.json();
        const totalInmersionesEl = document.getElementById("totalInmersiones");
        const nuevasInmersiones = JSON.parse(localStorage.getItem("nuevasInmersiones")) || [];
        const todasInmersiones = [...data.inmersiones, ...nuevasInmersiones];

        // limpiamos la lista
        lista.innerHTML = "";

        todasInmersiones.forEach((inmersion, index) => {
            
        const li = document.createElement("li");
        li.classList.add("inmersion");

        li.innerHTML = `
            <div class="number-inmersion">
            <h2>Inmersión</h2>
            <h2>N° ${index + 1}</h2>
            </div>
            <div class="date-inmersion">
            <span class="material-symbols-outlined calendar">calendar_today</span>
            <p>${new Date(inmersion.fecha).toLocaleDateString("es-CO")}</p>
            </div>
            <div class="location-inmersion">
            <span class="material-symbols-outlined location">location_on</span>
            <p>${inmersion.lugar}</p>
            </div>
            <div class="time-inmersion">
            <span class="material-symbols-outlined time">timer</span>
            <p>${inmersion.tiempo}<span> minutos</span></p>
            </div>
            <div class="depth-inmersion">
            <span class="material-symbols-outlined depth">scuba_diving</span>
            <p>${inmersion.profundidad}<span> metros</span></p>
            </div>
        `;

        // permite ir al detalle
        li.addEventListener("click", () => {
            window.location.href = `detail.html?id=${inmersion.id}`;
        });

        lista.prepend(li);
        });
  
        //Actualizamos cantidad total de inmersiones
        totalInmersionesEl.textContent = todasInmersiones.length;
        console.log("Inmersiones:", todasInmersiones.length);

        //sumar tiempos
        let totalMinutos = 0;
        todasInmersiones.forEach(inmersion => {
          totalMinutos += Number(inmersion.tiempo);
        });

        // Mostrar el total
        document.getElementById("tiempoTotal").textContent = `${totalMinutos} minutos`;

console.log("Inmersiones:", todasInmersiones.length, "Tiempo total:", totalMinutos);

    } catch (error) {
        console.error("Error cargando inmersiones");
    }
});




