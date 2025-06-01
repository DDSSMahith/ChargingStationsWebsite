<template>
  <div id="map" style="height: 500px;"></div>
</template>

<script>
import L from 'leaflet';

export default {
  data() {
    return {
      map: null,
      markers: [],
      superchargers: [
        { name: 'Dubai Supercharger', lat: 25.276987, lng: 55.296249, status: 'A', power: 120 },
        { name: 'India Supercharger', lat: 28.613939, lng: 77.209023, status: 'A', power: 110 },
        { name: 'China Supercharger', lat: 39.904202, lng: 116.407394, status: 'B', power: 130 },
        { name: 'Russia Supercharger', lat: 55.755825, lng: 37.617298, status: 'A', power: 100 },
        { name: 'USA Supercharger', lat: 37.7749, lng: -122.4194, status: 'B', power: 150 },
        { name: 'Spain Supercharger', lat: 40.4168, lng: -3.7038, status: 'A', power: 95 },
        { name: 'France Supercharger', lat: 48.8566, lng: 2.3522, status: 'B', power: 125 },
        { name: 'South Africa Supercharger', lat: -26.2041, lng: 28.0473, status: 'A', power: 90 },
        { name: 'Morocco Supercharger', lat: 33.5731, lng: -7.5898, status: 'B', power: 105 },
        { name: 'Italy Supercharger', lat: 41.9028, lng: 12.4964, status: 'A', power: 115 },
        { name: 'Japan Supercharger', lat: 35.6895, lng: 139.6917, status: 'B', power: 140 },
        { name: 'Brazil Supercharger', lat: -23.5505, lng: -46.6333, status: 'A', power: 100 },
        { name: 'Argentina Supercharger', lat: -34.6037, lng: -58.3816, status: 'B', power: 120 },
        { name: 'Turkey Supercharger', lat: 41.0082, lng: 28.9784, status: 'A', power: 110 },
        { name: 'Finland Supercharger', lat: 60.1699, lng: 24.9384, status: 'B', power: 125 },
        { name: 'Mexico Supercharger', lat: 19.4326, lng: -99.1332, status: 'A', power: 130 },
        { name: 'Germany Supercharger', lat: 52.52, lng: 13.405, status: 'B', power: 145 },
        { name: 'UK Supercharger', lat: 51.5074, lng: -0.1278, status: 'A', power: 120 },
        { name: 'Canada Supercharger', lat: 43.6532, lng: -79.3832, status: 'B', power: 135 },
        { name: 'Colombia Supercharger', lat: 4.7110, lng: -74.0721, status: 'A', power: 110 }
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap();
      this.addSuperchargerMarkers();
    });
  },
  methods: {
    initMap() {
      if (this.map) {
        this.map.remove();
      }

      const mapContainer = document.getElementById('map');
      if (!mapContainer) {
        console.error('Map container not found!');
        return;
      }

      this.map = L.map('map', {
        center: [20, 0],       
        zoom: 1,               
        zoomControl: false,    
        dragging: false,       
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,        
        keyboard: false,       
        touchZoom: false       
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">Carto</a> contributors',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(this.map);
    },
    addSuperchargerMarkers() {
      if (!this.map) {
        console.warn('Map not initialized.');
        return;
      }

      // 📏 Smaller icon size
      const customIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: [18, 30],     
        iconAnchor: [9, 30],    
        popupAnchor: [0, -30]   
      });

      this.superchargers.forEach(sc => {
        if (sc.lat && sc.lng) {
          const marker = L.marker([sc.lat, sc.lng], { icon: customIcon }).addTo(this.map);
          marker.bindPopup(`
            <b>${sc.name}</b><br>
            Status: ${sc.status}<br>
            Power Output: ${sc.power} kW<br>
            Latitude: ${sc.lat}<br>
            Longitude: ${sc.lng}
          `);
          marker.bindTooltip(sc.name, { permanent: false, direction: 'top' });
          this.markers.push(marker);
        } else {
          console.warn(`Missing lat/lng for ${sc.name}`);
        }
      });

      console.log('All markers added.');
    }
  }
};
</script>
