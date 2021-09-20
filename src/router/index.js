import { createRouter, createWebHistory } from 'vue-router';
// components
import Galery from '../components/pictures/Galery.vue';
import Picture from '../components/pictures/Picture.vue';
import Register from '../components/users/Register.vue';
import Login from '../components/users/Login.vue';
import Dashboard from '../components/users/Dashboard.vue';
import Favorite from '../components/users/Favorite.vue';

// error
import WorkInProgress from '../components/error/WorkInProgress.vue';
import Error404 from '../components/error/404.vue';

// store
import store from '../store/index.js';

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
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (store.state.userIsConnected) next();
      else next({path: "/login"})
    }
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: Favorite,
    beforeEnter: (to, from, next) => {
      if (store.state.userIsConnected) next();
      else next({path: "/login"})
    }
  },
  {
    path: '/wip',
    name: 'wip',
    component: WorkInProgress
  },
  {
    path: '/:catchAll(.*)',
    name: 'Error404',
    component: Error404
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
