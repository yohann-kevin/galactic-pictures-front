import { createRouter, createWebHistory } from 'vue-router';
import Galery from '../components/pictures/Galery.vue';
import Picture from '../components/pictures/Picture.vue';
import Register from '../components/users/Register.vue';
import Login from '../components/users/Login.vue';
import Dashboard from '../components/users/Dashboard.vue';

const routes = [
  {
    path: '/',
    name: 'Galery',
    component: Galery
  },
  {
    path: '/picture',
    name: 'picture',
    component: Picture
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
  }, 
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
