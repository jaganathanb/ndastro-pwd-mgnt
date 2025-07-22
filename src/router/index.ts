import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PasswordResetSuccessView from '../views/PasswordResetSuccessView.vue'
import NotFoundPageView from '../views/NotFoundPageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('../views/ResetPasswordView.vue'),
    },
    {
      path: '/reset-success',
      name: 'PasswordResetSuccess',
      component: PasswordResetSuccessView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundPageView,
    },
  ],
})

export default router
