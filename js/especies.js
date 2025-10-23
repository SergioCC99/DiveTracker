document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById("speciesGrid");
    const searchInput = document.getElementById("searchInput");

    try {
        const response = await fetch("../data/especies.json");
        const data = await response.json();

        // Cargar especies desde localStorage si existe
        let especiesGuardadas = JSON.parse(localStorage.getItem("especies")) || [];

        // Inicializar localStorage si está vacío
        if (especiesGuardadas.length === 0) {
            especiesGuardadas = data.especies.map(e => ({
                ...e,
                state: e.state !== undefined ? e.state : false
            }));
            localStorage.setItem("especies", JSON.stringify(especiesGuardadas));
        }

        // Función para actualizar resumen
        function actualizarResumen(especies) {
            const total = especies.length;
            const vistas = especies.filter(e => e.state).length;
            const noVistas = total - vistas;

            document.getElementById("countVistas").textContent = vistas;
            document.getElementById("countFaltantes").textContent = noVistas;

            const porcentaje = (vistas / total) * 100;
            const barra = document.getElementById("progressDone");
            barra.style.width = porcentaje + "%";
            barra.style.transition = "width 0.5s";
        }

        // Función para renderizar grilla según filtro
        function renderSpecies(filtro = "") {
            grid.innerHTML = ""; // limpiar grid
            const filtered = especiesGuardadas.filter(e =>
                e.nombre.toLowerCase().includes(filtro.toLowerCase())
            );

            filtered.forEach(especie => {
                const div = document.createElement("div");
                div.className = "specie-item";

                div.innerHTML = `
                    <img src="${especie.imagen}" alt="Imagen especie" class="img-especie">
                    <div class="title-especie">
                        <h3>${especie.nombre}</h3>
                        <p>${especie.profundidad}</p>
                        <label class="${especie.state ? "stateTrue" : "stateFalse"}">
                            ${especie.state ? "Vista" : "No Vista"}
                        </label>
                    </div>
                `;

                grid.appendChild(div);

                div.addEventListener("click", () => {

                    // Redirigir según estado
                    if (especie.state) {
                        window.location.href = `speciedetailview.html?id=${especie.id}`;
                    } else {
                        window.location.href = `speciedetailnoneview.html?id=${especie.id}`;
                    }
                });
            });

            // Actualizar resumen después de renderizar
            actualizarResumen(especiesGuardadas);
        }

        // Renderizar todo inicialmente
        renderSpecies();

        // Filtrar mientras se escribe en el input
        searchInput.addEventListener("input", (e) => {
            const filtro = e.target.value;
            renderSpecies(filtro);
        });

    } catch (error) {
        console.error("Error cargando especies:", error);
    }
});

