import useAuth from '@/composables/useAuth';

export const routes = [
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
        path: '/rechner',
        component: () => import('@/layouts/default/Default.vue'),
        children: [
            {
                path: '',
                name: 'CO2Rechner',
                component: () => import('@/views/CalculatorView.vue'),
            },
            {
                path: 'summary',
                name: 'Summary',
                component: () => import('@/views/CalculatorSummaryView.vue'),
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
                // Login Protection Guard
                beforeEnter: async (to: any, from: any, next: any) => {
                    window.sessionStorage.setItem(
                        'previousRoutePath',
                        from.path
                    );

                    const { isLoggedIn, checkTokenValidity } = useAuth();
                    await checkTokenValidity.execute();

                    if (!isLoggedIn.value) {
                        next('/login-registration');
                    } else {
                        next();
                    }
                },
            },
            {
                path: 'gruppen-informationen',
                name: 'Gruppen Informationen',
                component: () =>
                    import('@/views/GroupSystemGroupInformation.vue'),
                // Login Protection Guard
                beforeEnter: async (to: any, from: any, next: any) => {
                    const { isLoggedIn, checkTokenValidity } = useAuth();
                    await checkTokenValidity.execute();

                    if (!isLoggedIn.value) {
                        next('/login-registration');
                    } else {
                        next();
                    }
                },
            },
        ],
    },
    {
        path: '/login-registration',
        component: () => import('@/layouts/default/Default.vue'),
        beforeEnter: async (to: any, from: any, next: any) => {
            const { isLoggedIn, checkTokenValidity } = useAuth();
            await checkTokenValidity.execute();

            if (isLoggedIn.value) {
                next('/');
            } else {
                next();
            }
        },
        children: [
            {
                path: '',
                name: 'Login',
                component: () => import('@/views/LoginRegistrationView.vue'),
            },
        ],
    },
];
