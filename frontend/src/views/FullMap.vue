<template>
  <div id="full-map" style="width: 100vw; height: 100vh;">
    <h3 class="pixel-title">Charger Map</h3>
    <div id="map" style="width: 100%; height: 90%;"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'FullMap',
  data() {
    return {
      map: null,
      markers: []
    };
  },
  mounted() {
    this.initMap();
    this.fetchChargers();
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView([25.276987, 55.296249], 10); // Centered on Dubai
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);
    },
    async fetchChargers() {
      try {
        const response = await fetch('http://localhost:5000/api/chargers'); // Replace with your API
        const data = await response.json();
        data.forEach(charger => {
          const marker = L.marker([charger.location.lat, charger.location.lng]).addTo(this.map);
          marker.bindPopup(`<b>${charger.name}</b><br>Status: ${charger.status}<br>Power: ${charger.powerOutput} kW<br>Connector: ${charger.connectorType}`);
          this.markers.push(marker);
        });
      } catch (error) {
        console.error('Error fetching chargers for map:', error);
      }
    }
  }
};
</script>

<style scoped>
#map {
  border-radius: 10px;
}
.pixel-title {
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  margin: 10px;
}
</style>
