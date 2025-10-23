document.addEventListener("DOMContentLoaded",async () => {

    console.log("Documento cargado: datos reservas");
    const lista = document.querySelector(".historial ul");

    try {
        //Cargar datos de reservas
        const response = await fetch("../data/reservas.json");
        const data = await response.json();

        //Combinar reservas del json y del localStorage
        const nuevasReservas = JSON.parse(localStorage.getItem("nuevasReservas")) || [];
        const todasReservas = [...data.reservas, ...nuevasReservas];

        // limpiamos la lista
        lista.innerHTML = "";
        

        todasReservas.forEach((reservas) => {

        const li = document.createElement("li");
        li.classList.add("inmersion");

        li.innerHTML = `
            <label class="${reservas.state ? "stateTrue" : "stateFalse"}">
                ${reservas.state ? "Reservado" : "Realizado"}
            </label>
            <div class="date-inmersion">
                <span class="material-symbols-outlined calendar">calendar_today</span>
                <p>${new Date(reservas.fecha).toLocaleDateString("es-CO")}</p>    
            </div>
            <div class="location-inmersion">
                <span class="material-symbols-outlined location">location_on</span>
                <p>${reservas.lugar}</p>    
            </div>

        `;

        // permite ir al detalle
        li.addEventListener("click", () => {
            window.location.href = `detailbooking.html?id=${reservas.id}`;
        });

        //Funcion para cambiar estado según la fecha
        const hoy = new Date();
        const fechaReserva = new Date(reservas.fecha);

        if (fechaReserva < hoy) {
            reservas.state = false;
        } else {
            reservas.state = true;
        }

        //agrega el objeto
        lista.prepend(li);
        });

    } catch (error) {
        console.error("Error cargando inmersiones");
    }
});
