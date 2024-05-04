import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView
        },
        {
            path: '/series-all',
            name: 'series page',
            component: () => import('../views/SeriesView.vue')
        },
        {
            path: '/series',
            name: 'series',
            component: () => import('../components/Series.vue')
        }
    ]
})

export default router;