import { createRouter, createWebHistory, RouterView } from 'vue-router';
import Translation from '@/i18n/translation';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:locale?',
      component: RouterView,
      beforeEnter: Translation.routeMiddleware,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/view/Home/Home.vue'),
        },
        {
          path: 'guide',
          name: 'guide',
          component: () => import('@/view/Guide/Guide.vue'),
        },
        {
          path: 'components',
          name: 'components',
          component: () => import('@/view/Components/Components.vue'),
        },
        {
          path: ':pathMatch(.*)*',
          name: '404',
          component: () => import('@/view/404/404.vue'),
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

router.onError(() => {
  if (import.meta.env.PROD) {
    window.location.href = '/';
  }
});

export default router;
