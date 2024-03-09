// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/default/Default.vue'),
        children: [
            {
                path: '',
                name: 'Home',
                // route level code-splitting
                // this generates a separate chunk (Home-[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import('@/views/Home.vue'),
            },
        ],
    },
    {
        path: '/co2rechner',
        component: () => import('@/layouts/default/Default.vue'),
        children: [
            {
                path: '/co2rechner',
                name: 'CO2Rechner',
                component: () => import('@/views/Calculator.vue'),
            },
        ],
    },
    {
        path: '/dashboard',
        component: () => import('@/layouts/default/Default.vue'),
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: () => import('@/views/Dashboard.vue'),
            },
        ],
    },
    {
        path: '/faq',
        component: () => import('@/layouts/default/Default.vue'),
        children: [
            {
                path: '/faq',
                name: 'FAQ',
                component: () => import('@/views/FAQ.vue'),
            },
        ],
    },
    {
        path: '/gruppensystem',
        component: () => import('@/layouts/default/Default.vue'),
        children: [
            {
                path: '/gruppensystem',
                name: 'Gruppensystem',
                component: () => import('@/views/GroupSystem.vue'),
            },
        ],
    },
    {
        path: '/login',
        component: () => import('@/layouts/default/Default.vue'),
        children: [
            {
                path: '/login',
                name: 'Login',
                component: () => import('@/views/Login.vue'),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
