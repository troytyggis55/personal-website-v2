import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/demo',
            name: 'demo',
            component: () => import('../views/DemoView.vue'),
            redirect: '/demo/pathfinding',
            children: [
                {
                    path: ':pathfinding',
                    name: 'pathfinding',
                    component: () => import('../views/demos/PathfindingView.vue')
                },
                {
                    path: ':fluid-simulation',
                    name: 'fluid-simulation',
                    component: () => import('../views/demos/FluidView.vue')
                }
            ]
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: () => import('../views/NotFoundView.vue')
        }
    ]
})

export default router
