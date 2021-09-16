import { createRouter, createWebHistory } from 'vue-router';
import Galery from '../components/Galery.vue';
import Register from '../components/Register.vue';
import Login from '../components/Login.vue';

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
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;