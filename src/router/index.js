import { createRouter, createWebHistory } from 'vue-router'
import Layout_congnhavien from '../components/Layout_congnhavien.vue'
import Dashboard_portal from '../View/portal_nhanvien/Dashboard_portal.vue'

const routes = [
      {
            path: '/',
            component: Layout_congnhavien,
            children: [
                  {
                        path: '',
                        name: 'dashboard',
                        component: Dashboard_portal
                  }
            ]
      }
]

const router = createRouter({
      history: createWebHistory(),
      routes
})

export default router
