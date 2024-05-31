import { createWebHistory, createRouter } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import NotFound from '@/pages/NotFound.vue'
import TopStocksPage from '@/pages/TopStocksPage.vue'
import StockInfoPage from '@/pages/StockInfoPage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/stock-info-page',
    name: 'StockInfoPage',
    component: StockInfoPage,
    children: [
      {
        path: ':symbol',
        name: 'StockInfoPage',
        component: StockInfoPage,
        props: true,
      },
    ],
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
