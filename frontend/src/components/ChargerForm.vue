<template>
  <div>
    <h3>Add New Charger</h3>
    <form @submit.prevent="addCharger">
      <input v-model="name" placeholder="Name" required>
      <input v-model.number="lat" placeholder="Latitude" required>
      <input v-model.number="lng" placeholder="Longitude" required>
      <input v-model="status" placeholder="Status" required>
      <input v-model.number="powerOutput" placeholder="Power Output" required>
      <input v-model="connectorType" placeholder="Connector Type" required>
      <button type="submit">Add Charger</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '', lat: 0, lng: 0, status: 'Active', powerOutput: 0, connectorType: 'Type2'
    };
  },
  methods: {
    async addCharger() {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/chargers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: this.name,
          location: { lat: this.lat, lng: this.lng },
          status: this.status,
          powerOutput: this.powerOutput,
          connectorType: this.connectorType
        })
      });
      if (response.ok) {
        alert('Charger added successfully!');
        this.$emit('chargerAdded');
      } else {
        alert('Failed to add charger');
      }
    }
  }
};
</script>
