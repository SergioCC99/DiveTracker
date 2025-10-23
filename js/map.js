document.addEventListener("DOMContentLoaded", async () => {
  // Inicializa el mapa
  const map = L.map("map").setView([11.24, -74.21], 6);

  // Capa base (OpenStreetMap)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  // Cargar el JSON de reservas
  const response = await fetch("../data/reservas.json");
  const data = await response.json();

  //Cargar select 
  const reservas = data.reservas;
  const select = document.getElementById("location-select");

  // Agregar opciones al select
  reservas.forEach((reserva) => {
    const option = document.createElement("option");
    option.value = reserva.id;
    option.textContent = reserva.lugar;
    select.appendChild(option);
  });

  // Crear un grupo de marcadores
  const markers = L.layerGroup().addTo(map);

  // Mostrar todos los marcadores en el mapa
  reservas.forEach((reserva) => {
    const marker = L.marker([reserva.lat, reserva.lng]).addTo(markers);

    const popupContent = `
      <div;">
        <img src="${reserva.imagen}" alt="${reserva.lugar}" style="width:100%; height:160px; border-radius:8px; margin-bottom:8px;">
        <h2>${reserva.lugar}</h2>
        <p>${reserva.descripcion}</p>
        <button class="primary-button" onclick="window.location.href='detailLocation.html?id=${reserva.id}'">Reservar</button>
      </div>
    `;

    marker.bindPopup(popupContent);
  });

  // Escuchar el cambio del select
  select.addEventListener("change", (event) => {
    const selectedId = event.target.value;
    if (!selectedId) return;

    const reservaSeleccionada = reservas.find(r => r.id == selectedId);

    if (reservaSeleccionada) {
      map.setView([reservaSeleccionada.lat, reservaSeleccionada.lng], 12);

    // abrir popup correspondiente
      markers.eachLayer((marker) => {
        const { lat, lng } = marker.getLatLng();
        if (lat === reservaSeleccionada.lat && lng === reservaSeleccionada.lng) {
          marker.openPopup();
        }
      });
    }
  });
});


