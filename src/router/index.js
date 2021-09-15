import { createRouter, createWebHistory } from 'vue-router';
import Galery from '../components/Galery.vue';
import Register from '../components/Register.vue';

const routes = [
  {
    path: '/',
    name: 'Galery',
    component: Galery
  },
  {
    path: '/sign-up',
    name: 'Register',
    component: Register
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
