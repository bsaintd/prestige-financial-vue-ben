import { createWebHistory, createRouter } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import NotFound from '@/pages/NotFound.vue'
import TopStocksPage from '@/pages/TopStocksPage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/top-stocks',
    name: 'TopStocks',
    component: TopStocksPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
