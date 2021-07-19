import { createRouter, createWebHistory } from '@ionic/vue-router';
import ComicsList from '../pages/ComicsList.vue'

const routes = [
  {
    path: '/',
    component: ComicsList
  },
  {
    path: '/comic/:name_url?',
    component: () => import('../pages/ComicPage.vue')
  },
  {
    path: '/issue/:name_url?/:issue_number?',
    component: () => import('../pages/IssuePage.vue')
  },
  {
    path: '/search',
    component: () => import('../pages/SearchPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
