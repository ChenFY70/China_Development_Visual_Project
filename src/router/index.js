import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../components/Welcome.vue'
import Layout from '../components/Layout.vue'
import Economy from '../views/Economy.vue'
import Environment from '../views/Environment.vue'
import Technology from '../views/Technology.vue'
import Medicine from '../views/Medicine.vue'
import Education from '../views/Education.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/main',
    component: Layout,
    children: [
      {
        path: '',
        redirect: '/main/economy'
      },
      {
        path: 'economy',
        name: 'Economy',
        component: Economy
      },
      {
        path: 'environment',
        name: 'Environment',
        component: Environment
      },
      {
        path: 'technology',
        name: 'Technology',
        component: Technology
      },
      {
        path: 'medicine',
        name: 'Medicine',
        component: Medicine
      },
      {
        path: 'education',
        name: 'Education',
        component: Education
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
