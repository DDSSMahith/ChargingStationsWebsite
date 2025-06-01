<template>
  <div :class="['full-page', { 'dark-mode': isDarkMode }]">
    <div class="login-container">
      <h2 class="pixel-text">Login</h2>
      <form @submit.prevent="login" class="login-form">
        <input v-model="username" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit" class="pixel-button">Login</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
      <button @click="toggleDarkMode" class="dark-mode-button">
        Toggle Dark Mode
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      error: '',
      isDarkMode: false
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          username: this.username,
          password: this.password
        });

        const token = response.data.token;

        if (token) {
          localStorage.setItem('token', token);

          this.$router.push('/chargers');
        } else {
          this.error = 'Invalid response from server.';
        }
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          this.error = err.response.data.message; // Use backend error message
        } else {
          this.error = 'Login failed! Check credentials or server.';
        }
      }
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

/* Cover full page */
.full-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.full-page.dark-mode {
  background-color: #121212;
}

.login-container {
  width: 500px;
  height: 250px;
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  background-color: #f9f9f9;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.full-page.dark-mode .login-container {
  background-color: #2c2c2c;
  color: #fff;
}

.pixel-text {
  font-family: 'Press Start 2P', cursive;
  font-size: 20px;
  color: #42b983;
  text-transform: uppercase;
  transition: transform 0.2s ease-in-out;
  display: inline-block;
}

.pixel-text:hover {
  transform: translateY(-3px) scale(1.1) rotate(-3deg);
  text-shadow: 2px 2px 0 #000, -2px -2px 0 #000;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.login-form input {
  padding: 10px;
  font-size: 16px;
  font-family: monospace;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

.pixel-button {
  padding: 10px;
  font-size: 16px;
  font-family: 'Press Start 2P', cursive;
  background-color: #42b983;
  color: white;
  border: 2px solid #000;
  cursor: pointer;
  border-radius: 5px;
  transition: transform 0.1s ease-in-out;
  width: 100%;
}

.pixel-button:hover {
  background-color: #369f7c;
  transform: scale(1.1) rotate(1deg);
}

.full-page.dark-mode .pixel-button {
  background-color: #555;
  color: #fff;
}

.full-page.dark-mode .pixel-button:hover {
  background-color: #777;
}

.error {
  color: red;
  margin-top: 10px;
}

.dark-mode-button {
  margin-top: 20px;
  padding: 8px 12px;
  font-family: 'Press Start 2P', cursive;
  font-size: 12px;
  cursor: pointer;
  background-color: #000;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 5px;
  width: 100%;
}

.full-page.dark-mode .dark-mode-button {
  background-color: #fff;
  color: #000;
  border: 2px solid #000;
}
</style>
