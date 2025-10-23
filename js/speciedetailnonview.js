document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const especieId = parseInt(params.get("id"));
    const modal = document.getElementById("modal");
    const botonMarcarVista = document.getElementById("marcarVista");

    try {
        const response = await fetch("../data/especies.json");
        const data = await response.json();

        // Cargar desde localStorage si existe
        let especiesGuardadas = JSON.parse(localStorage.getItem("especies")) || [];

        // Inicializar solo si localStorage está vacío
        if (especiesGuardadas.length === 0) {
            especiesGuardadas = data.especies.map(e => ({
                ...e,
                state: e.state !== undefined ? e.state : false // respetar state si viene en JSON
            }));
            localStorage.setItem("especies", JSON.stringify(especiesGuardadas));
        }

        // Buscar la especie a mostrar
        const especieIndex = especiesGuardadas.findIndex(e => e.id == especieId);

        const especie = especiesGuardadas[especieIndex];

        // Mostrar detalle
        document.querySelector(".img-especie-detail").src = especie.imagen;
        document.querySelector(".detail-item h2").textContent = especie.nombre;
        document.querySelector(".detail-item p").innerHTML = `<b>Descripción:</b> ${especie.descripción}`;
        document.getElementById("profundidad").innerHTML = `<b>Profundidad:</b> ${especie.profundidad}`;

        // Cargar fotos adicionales
        const carruselContainer = document.querySelector(".carrusel-items");
        [especie.img1, especie.img2, especie.img3].forEach(foto => {
            if (foto) {
                const img = document.createElement("img");
                img.src = foto;
                img.alt = especie.nombre;
                carruselContainer.appendChild(img);
            }
        });

        // Botón marcar como vista
        botonMarcarVista.addEventListener("click", () => {
            // Actualizar estado solo de esta especie
            especiesGuardadas[especieIndex].state = true;

            // Guardar array completo en localStorage
            localStorage.setItem("especies", JSON.stringify(especiesGuardadas));

            // Actualizar label en UI
            const labelEstado = document.getElementById("estado");
            labelEstado.textContent = "Vista";
            labelEstado.classList.remove("stateFalse");
            labelEstado.classList.add("stateTrue");

            // Mostrar modal
            modal.showModal();
        });

    } catch (error) {
        console.error("Error cargando especie:", error);
    }
});