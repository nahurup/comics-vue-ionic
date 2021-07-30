import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  {
    path: '',
    component: () => import('../pages/ComicsList.vue')
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
