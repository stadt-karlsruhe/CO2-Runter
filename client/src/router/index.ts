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
                component: () => import('@/views/HomeView.vue'),
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
                component: () => import('@/views/CalculatorView.vue'),
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
                component: () => import('@/views/DashboardView.vue'),
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
                component: () => import('@/views/FAQView.vue'),
            },
        ],
    },
    {
        path: '/gruppensystem',
        component: () => import('@/layouts/default/Default.vue'),
        children: [
            {
                path: '',
                name: 'Gruppensystem',
                component: () => import('@/views/GroupSystemView.vue'),
            },
            {
                path: 'neue-gruppe',
                name: 'Neue Gruppe erstellen',
                component: () => import('@/views/GroupSystemNewGroupView.vue'),
            },
            {
                path: 'gruppen-informationen',
                name: 'Gruppen Informationen',
                component: () => import('@/views/GroupSystemGroupInformation.vue'),
            },
        ],
    },
    {
        path: '/login-registration',
        component: () => import('@/layouts/default/Default.vue'),
        children: [
            {
                path: '/login-registration',
                name: 'Login',
                component: () => import('@/views/LoginRegistrationView.vue'),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
