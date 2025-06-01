<template>
  <div :class="['full-page', { 'dark-mode': isDarkMode }]">
    <div class="container">
      <h2 class="pixel-text">Charger Management</h2>
      <div class="content">
        <div class="left-panel">
          <ChargerFilters @filter="handleFilter" />
          <ChargerList :filters="filters" />
        </div>
        <div class="right-panel">
          <ChargerMap :filters="filters" />
          
          <!-- Precautions & Information under the map -->
          <div class="info-section">
            <h3 class="pixel-title">Precautions & Information</h3>
            <ul class="pixel-item">
              <li>Ensure a secure connection before charging.</li>
              <li>Do not leave the vehicle unattended while charging.</li>
              <li>Observe the maximum charging power limits.</li>
              <li>Keep the area clear of obstacles during operation.</li>
              <li>In case of emergency, disconnect and report to support.</li>
              <li>Follow the safety guidelines displayed at the station.</li>
            </ul>
          </div>
        </div>
      </div>

      <button @click="toggleDarkMode" class="dark-mode-button">
        Toggle Dark Mode
      </button>
    </div>
  </div>
</template>

<script>
import ChargerFilters from '../components/ChargerFilters.vue'
import ChargerList from '../components/ChargerList.vue'
import ChargerMap from '../components/ChargerMap.vue'

export default {
  name: 'ChargersPage',
  components: { ChargerFilters, ChargerList, ChargerMap },
  data() {
    return { filters: {}, isDarkMode: false }
  },
  methods: {
    handleFilter(newFilters) { this.filters = newFilters },
    toggleDarkMode() { this.isDarkMode = !this.isDarkMode }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

html, body, #app {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
  color: black;
}

.full-page {
  background-color: #f0f0f0;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.full-page.dark-mode {
  background-color: #121212;
  color: white;
}

.container {
  background-color: #ffffff;
  color: black;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  max-width: 900px;
  width: 90%;
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.full-page.dark-mode .container {
  background-color: #2c2c2c;
  color: white;
}

.pixel-text {
  font-family: 'Press Start 2P', cursive;
  font-size: 24px;
  color: #42b983;
  margin-bottom: 20px;
}

.content {
  display: flex;
  flex-direction: row;
  gap: 30px;
  justify-content: center;
}

.left-panel, .right-panel {
  flex: 1;
  min-width: 300px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dark-mode-button {
  margin-top: 30px;
  padding: 10px 20px;
  font-family: 'Press Start 2P', cursive;
  font-size: 12px;
  cursor: pointer;
  background-color: #000;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 5px;
  transition: transform 0.1s ease-in-out;
}

.full-page.dark-mode .dark-mode-button {
  background-color: #fff;
  color: #000;
  border: 2px solid #000;
}

.dark-mode-button:hover {
  transform: scale(1.05);
}

.info-section {
  background-color: #2c2c2c;
  color: white;
  padding: 20px;
  border-radius: 10px;
  font-family: 'Press Start 2P', cursive;
  box-shadow: 0 10px 20px rgba(0,0,0,0.4);
  width: 100%;
  text-align: left;
  margin-top: 5px;
  margin-bottom: 20px;
  box-sizing: border-box;
}


.info-section ul {
  list-style-type: disc;
  margin-left: 20px;
}
</style>
