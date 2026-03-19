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
                        component: Dashboard_portal,
                        meta: { index: 1 }
                  },
                  {
                        path: 'cham-cong',
                        name: 'cham-cong',
                        component: Cham_cong,
                        meta: { index: 2 }
                  },
                  {
                        path: 'luong',
                        name: 'luong',
                        component: () => import('../View/portal_nhanvien/PhieuLuong.vue'),
                        meta: { index: 3 }
                  },
                  {
                        path: 'ho-so',
                        name: 'ho-so',
                        component: () => import('../View/portal_nhanvien/HoSoCaNhan.vue'),
                        meta: { index: 4 }
                  },
                  {
                        path: 'nghi-phep',
                        name: 'nghi-phep',
                        component: () => import('../View/portal_nhanvien/NghiPhep.vue'),
                        meta: { index: 5 }
                  },
                  {
                        path: 'don-nghi-viec',
                        name: 'don-nghi-viec',
                        component: () => import('../View/portal_nhanvien/GiayPhep/DonNghiViec.vue'),
                        meta: { index: 6 }
                  },
                  {
                        path: 'dich-vu',
                        name: 'dich-vu',
                        component: () => import('../View/portal_nhanvien/DichVuNoiBo.vue'),
                        meta: { index: 7 }
                  },
                  {
                        path: 'giai-trinh-cham-cong',
                        name: 'giai-trinh-cham-cong',
                        component: () => import('../View/portal_nhanvien/GiayPhep/GiaiTrinhChamCong.vue'),
                        meta: { index: 8 }
                  },
                  {
                        path: 'thong-bao',
                        name: 'thong-bao',
                        component: () => import('../View/portal_nhanvien/ThongBao.vue'),
                        meta: { index: 9 }
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
                        component: () => import('../View/admin/Dashboard_admin.vue'),
                        meta: { index: 1 }
                  },
                  {
                        path: 'tuyen-dung',
                        name: 'admin-tuyen-dung',
                        component: () => import('../View/admin/HR/TuyenDung.vue'),
                        meta: { index: 2 }
                  },
                  {
                        path: 'nhan-su',
                        name: 'admin-nhan-su',
                        component: () => import('../View/admin/QuanLy/QuanLyNhanSu.vue'),
                        meta: { index: 3 }
                  },
                  {
                        path: 'chuc-danh',
                        name: 'admin-chuc-danh',
                        component: () => import('../View/admin/QuanLy/QuanLyChucDanh.vue'),
                        meta: { index: 4 }
                  },
                  {
                        path: 'phong-ban',
                        name: 'admin-phong-ban',
                        component: () => import('../View/admin/QuanLy/QuanLyPhongban.vue'),
                        meta: { index: 5 }
                  },
                  {
                        path: 'hop-dong',
                        name: 'admin-hop-dong',
                        component: () => import('../View/admin/QuanLy/QuanLyHopDong.vue'),
                        meta: { index: 6 }
                  },
                  {
                        path: 'cham-cong',
                        name: 'admin-cham-cong',
                        component: () => import('../View/admin/ChamCongAdmin.vue'),
                        meta: { index: 7 }
                  },
                  {
                        path: 'nghi-phep',
                        name: 'admin-nghi-phep',
                        component: () => import('../View/admin/HR/NghiPhep.vue'),
                        meta: { index: 8 }
                  },
                  {
                        path: 'lich-phong-van',
                        name: 'admin-lich-phong-van',
                        component: () => import('../View/admin/HR/LichPhongVan.vue'),
                        meta: { index: 9 }
                  },
                  {
                        path: 'bang-luong',
                        name: 'admin-bang-luong',
                        component: () => import('../View/admin/QuanLy/QuanLyBangLuong.vue'),
                        meta: { index: 10 }
                  },
                  {
                        path: 'tai-san',
                        name: 'admin-tai-san',
                        component: () => import('../View/admin/QuanLy/QuanLyTaiSan.vue'),
                        meta: { index: 11 }
                  },
                  {
                        path: 'phe-duyet',
                        name: 'admin-phe-duyet',
                        component: () => import('../View/admin/QuanLy/PheDuyetDon.vue'),
                        meta: { index: 12 }
                  },
                  {
                        path: 'ho-tro',
                        name: 'admin-ho-tro',
                        component: () => import('../View/admin/QuanLy/QuanLyHoTro.vue'),
                        meta: { index: 13 }
                  },
                  {
                        path: 'cai-dat',
                        name: 'admin-cai-dat',
                        component: () => import('../View/admin/Setting_admin.vue'),
                        meta: { index: 14 }
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
                        component: () => import('../View/admin/GiamDoc/Dashboard_GiamDoc.vue'),
                        meta: { index: 1 }
                  },
                  {
                        path: 'nhan-su',
                        name: 'giam-doc-nhan-su',
                        component: () => import('../View/admin/GiamDoc/DBGD_NhanSu.vue'),
                        meta: { index: 2 }
                  },
                  {
                        path: 'bang-luong',
                        name: 'giam-doc-bang-luong',
                        component: () => import('../View/admin/GiamDoc/DBGD_BangLuong.vue'),
                        meta: { index: 3 }
                  },
                  {
                        path: 'chuyen-can',
                        name: 'giam-doc-chuyen-can',
                        component: () => import('../View/admin/GiamDoc/DBGD_ChuyenCan.vue'),
                        meta: { index: 4 }
                  },
                  {
                        path: 'bien-dong',
                        name: 'giam-doc-bien-dong',
                        component: () => import('../View/admin/GiamDoc/DBGD_BienDong.vue'),
                        meta: { index: 5 }
                  }
            ]
      }
]

const router = createRouter({
      history: createWebHistory(),
      routes
})

export default router
