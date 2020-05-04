import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'
import Catering from '../views/Catering.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/catering',
      name: 'catering',
      component: Catering
    }
  ],
})

