import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/versoes',
      children: [
        {
          path: 'classico-6-personagens',
          name: 'versions.classic-6',
          component: () => import('../views/BoardVersions/ClassicSixView.vue'),
        },
        {
          path: 'horror-edition',
          name: 'versions.horror-edition',
          component: () => import('../views/BoardVersions/HorrorEditionView.vue'),
        },
      ],
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
});

export default router;
