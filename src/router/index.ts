import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/demo',
            name: 'demo',
            component: () => import('../views/DemoView.vue'),
            children: [
                {
                    path: ':pathfinding',
                    name: 'pathfinding',
                    component: () => import('../views/demos/PathfindingView.vue')
                },
                {
                    path: ':fluid-simulation',
                    name: 'fluid-simulation',
                    component: () => import('../components/HelloWorld.vue')
                }
            ]
        }
    ]
})

export default router
