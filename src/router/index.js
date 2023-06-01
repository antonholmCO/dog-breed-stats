import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StatsView from '../views/StatsView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/stats/:breedName',
        name: 'stats',
        component: StatsView,
        props: true
    },
    {
        path: '/:pathMatch(.*)*', 
        name: 'not-found', 
        component: HomeView
    }
  ]
})

export default router
