<template>
  <div class="filters">
    <h3 class="pixel-title">Charger Filters</h3>
    <label>
      <span>Status:</span>
      <select v-model="selectedStatus">
        <option value="">All</option>
        <option value="Active">Available</option>
        <option value="Inactive">Busy</option>
      </select>
    </label>
    <button @click="applyFilters" class="pixel-button">Apply</button>
  </div>
</template>

<script>
export default {
  data() {
    return { selectedStatus: '' }
  },
  methods: {
    applyFilters() {
      this.$emit('filter', { status: this.selectedStatus })
    }
  }
}
</script>

<style scoped>
.filters {
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

select, button {
  font-family: 'Press Start 2P', cursive;
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
}

.pixel-button {
  background-color: #42b983;
  color: white;
  border: 2px solid black;
  padding: 5px 10px;
  cursor: pointer;
}

.pixel-button:hover {
  background-color: #369f7c;
}
</style>
