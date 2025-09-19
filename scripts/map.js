// Inicializar el mapa
function initializeMap() {
    const ubicacion = [19.683913, -98.876015];

    const map = L.map('map').setView(ubicacion, 15);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    const icono = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
        iconSize: [35, 35],
        iconAnchor: [17, 34],
        popupAnchor: [0, -30]
    });

    L.marker(ubicacion, { icon: icono }).addTo(map)
        .bindPopup(`
        <div style="text-align:center; font-size:14px; line-height:1.4;">
          <strong style="color:#004080;">TUBCON S.A. de C.V.</strong><br>
          Avenida México No. Puxtla 25<br>
          Teotihuacán Centro, 55805<br>
          Teotihuacán de Arista, Méx.
        </div>
        `)
        .openPopup();
}

document.addEventListener('DOMContentLoaded', initializeMap);
