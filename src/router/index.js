import { createRouter, createWebHistory } from 'vue-router'
import Layout_NhanVien from '../components/Layout_NhanVien.vue'
import Dashboard_portal from '../View/portal_nhanvien/Dashboard_portal.vue'
import Cham_cong from '../View/portal_nhanvien/Cham_cong.vue'
import Layout_Admin from '../components/Layout_Admin.vue'
import Layout_GiamDoc from '../components/Layout_GiamDoc.vue'

const routes = [
      {
            path: '/login',
            name: 'login',
            component: () => import('../components/Login.vue')
      },
      {
            path: '/',
            component: Layout_NhanVien,
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
                        component: () => import('../View/portal_nhanvien/PhieuLuong.vue')
                  },
                  {
                        path: 'ho-so',
                        name: 'ho-so',
                        component: () => import('../View/portal_nhanvien/HoSoCaNhan.vue')
                  },
                  {
                        path: 'nghi-phep',
                        name: 'nghi-phep',
                        component: () => import('../View/portal_nhanvien/NghiPhep.vue')
                  },
                  {
                        path: 'don-nghi-viec',
                        name: 'don-nghi-viec',
                        component: () => import('../View/portal_nhanvien/GiayPhep/DonNghiViec.vue')
                  },
                  {
                        path: 'dich-vu',
                        name: 'dich-vu',
                        component: () => import('../View/portal_nhanvien/DichVuNoiBo.vue')
                  },
                  {
                        path: 'giai-trinh-cham-cong',
                        name: 'giai-trinh-cham-cong',
                        component: () => import('../View/portal_nhanvien/GiayPhep/GiaiTrinhChamCong.vue')
                  },
                  {
                        path: 'thong-bao',
                        name: 'thong-bao',
                        component: () => import('../View/portal_nhanvien/ThongBao.vue')
                  }
            ]
      },
      {
            path: '/admin',
            component: Layout_Admin,
            children: [
                  {
                        path: '',
                        name: 'dashboard-admin',
                        component: () => import('../View/admin/Dashboard_admin.vue')
                  },
                  {
                        path: 'tuyen-dung',
                        name: 'admin-tuyen-dung',
                        component: () => import('../View/admin/HR/TuyenDung.vue')
                  },
                  {
                        path: 'nhan-su',
                        name: 'admin-nhan-su',
                        component: () => import('../View/admin/QuanLy/QuanLyNhanSu.vue')
                  },
                  {
                        path: 'chuc-danh',
                        name: 'admin-chuc-danh',
                        component: () => import('../View/admin/QuanLy/QuanLyChucDanh.vue')
                  },
                  {
                        path: 'phong-ban',
                        name: 'admin-phong-ban',
                        component: () => import('../View/admin/QuanLy/QuanLyPhongban.vue')
                  },
                  {
                        path: 'hop-dong',
                        name: 'admin-hop-dong',
                        component: () => import('../View/admin/QuanLy/QuanLyHopDong.vue')
                  },
                  {
                        path: 'cham-cong',
                        name: 'admin-cham-cong',
                        component: () => import('../View/admin/ChamCongAdmin.vue')
                  },
                  {
                        path: 'nghi-phep',
                        name: 'admin-nghi-phep',
                        component: () => import('../View/admin/HR/NghiPhep.vue')
                  },
                  {
                        path: 'lich-phong-van',
                        name: 'admin-lich-phong-van',
                        component: () => import('../View/admin/HR/LichPhongVan.vue')
                  },
                  {
                        path: 'bang-luong',
                        name: 'admin-bang-luong',
                        component: () => import('../View/admin/QuanLy/QuanLyLuong.vue')
                  },
                  {
                        path: 'tai-san',
                        name: 'admin-tai-san',
                        component: () => import('../View/admin/QuanLy/QuanLyTaiSan.vue')
                  },
                  {
                        path: 'phe-duyet',
                        name: 'admin-phe-duyet',
                        component: () => import('../View/admin/QuanLy/PheDuyetDon.vue')
                  },
                  {
                        path: 'cai-dat',
                        name: 'admin-cai-dat',
                        component: () => import('../View/admin/Setting_admin.vue')
                  }
            ]
      },
      {
            path: '/giam-doc',
            component: Layout_GiamDoc,
            children: [
                  {
                        path: '',
                        name: 'dashboard-giam-doc',
                        component: () => import('../View/admin/GiamDoc/Dashboard_GiamDoc.vue')
                  }
            ]
      }
]

const router = createRouter({
      history: createWebHistory(),
      routes
})

export default router
