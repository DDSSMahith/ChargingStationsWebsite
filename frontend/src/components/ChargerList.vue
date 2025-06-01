<template>
  <div class="list">
    <h3 class="pixel-title">Charger List</h3>
    <ul v-if="chargers.length">
      <li v-for="charger in chargers" :key="charger._id" class="pixel-item">
        <div>{{ charger.name }}</div>
        <div>Status: {{ charger.status === 'Active' ? 'A' : 'B' }}</div>
        <div>Power: {{ charger.powerOutput }} kW</div>
      </li>
    </ul>
    <p v-else class="pixel-item">No chargers found.</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['filters'],
  data() { return { chargers: [] } },
  watch: {
    filters: {
      handler() { this.fetchChargers() },
      deep: true,
      immediate: true
    }
  },
  methods: {
    async fetchChargers() {
      const response = await axios.get('http://localhost:5000/api/stations', { params: this.filters })
      this.chargers = response.data
    }
  }
}
</script>

<style scoped>
.list {
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 10px;
  font-family: 'Press Start 2P', cursive;
  color: white;
  box-shadow: 0 10px 20px rgba(0,0,0,0.4);
}

.pixel-title {
  font-size: 16px;
  margin-bottom: 10px;
}

.pixel-item {
  margin: 5px 0;
  border-bottom: 1px dashed #42b983;
  padding-bottom: 5px;
}
</style>
