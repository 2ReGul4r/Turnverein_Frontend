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
  if (!localStorage.getItem('token') && to.name !== 'Login') {
    console.log('redirected to login')
    next({ name: 'Login' });
  } else {
    next()
  }
});

export default router;
