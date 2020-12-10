import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Projects from '../views/Projects.vue'
import Activity from '../views/Activity.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/activity',
    name: 'Activity',
    component: Activity
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
