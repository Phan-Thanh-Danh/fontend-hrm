import { createRouter, createWebHistory } from 'vue-router'
import Layout_congnhavien from '../components/Layout_congnhavien.vue'
import Dashboard_portal from '../View/portal_nhanvien/Dashboard_portal.vue'
import Cham_cong from '../View/portal_nhanvien/Cham_cong.vue'
import { startLoading, stopLoading } from '../utils/loaderState'

const routes = [
      {
            path: '/login',
            name: 'login',
            component: () => import('../components/Login.vue')
      },
      {
            path: '/',
            component: Layout_congnhavien,
            children: [
                  {
                        path: '',
                        name: 'dashboard',
                        component: Dashboard_portal
                  },
                  {
                        path: 'cham-cong',
                        name: 'cham-cong',
                        component: Cham_cong
                  },
                  {
                        path: 'luong',
                        name: 'luong',
                        component: () => import('../View/portal_nhanvien/BangLuong.vue')
                  }
            ]
      }
]

const router = createRouter({
      history: createWebHistory(),
      routes
})

router.beforeEach((to, from, next) => {
      startLoading();
      next();
});

router.afterEach(() => {
      stopLoading();
});

export default router
