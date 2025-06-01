import { createRouter, createWebHistory } from 'vue-router';
import ChargersPage from '../views/ChargersPage.vue';
import Login from '../views/Login.vue';
import FullMap from '../views/FullMap.vue';

const routes = [
  { path: '/', component: Login }, 
  { path: '/chargers', component: ChargersPage },
  { path: '/fullmap', component: FullMap }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
