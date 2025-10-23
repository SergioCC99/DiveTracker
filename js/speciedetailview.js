document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const especieId = parseInt(params.get("id"));
    console.log("Detalle especie vista");

    try {
        const response = await fetch("../data/especies.json");
        const data = await response.json();
        const especie = data.especies.find((especie) => especie.id === especieId);

        document.querySelector(".img-especie-detail").src = especie.imagen;
        document.querySelector(".detail-item h2").textContent = especie.nombre;
        document.querySelector(".detail-item p").innerHTML = `<b>Descripción:</b> ${especie.descripción}`;
         document.getElementById("profundidad").innerHTML = `<b>Profundidad:</b> ${especie.profundidad}`;
        
        
        //Cargar imagenes adicionales
        const carruselContainer = document.querySelector(".carrusel-items");

        const fotos = [especie.img1, especie.img2, especie.img3];
            fotos.forEach(foto => {
            if (foto) {
                const img = document.createElement("img");
                img.src = foto;
                img.alt = especie.nombre;
                carruselContainer.appendChild(img);
            }
        });

    } catch (error) {
        console.error("Error cargando especie:", error);
    }
});