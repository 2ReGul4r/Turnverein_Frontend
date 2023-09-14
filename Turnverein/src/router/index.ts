// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '../store/app';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      }, {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useAppStore();
  console.log(!store.isAuthenticated);
  if (!store.isAuthenticated && to.name !== 'Login') {
    console.log('redirected to login')
    next({ name: 'Login' });
  } else {
    next()
  }
});

export default router;
