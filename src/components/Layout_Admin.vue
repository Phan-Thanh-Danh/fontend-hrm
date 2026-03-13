<template>
  <div class="hrm-layout">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'show': isSidebarOpen }">
      <div class="sidebar-header p-4 d-flex align-items-center gap-2">
        <span class="material-symbols-outlined text-primary" style="font-size: 36px; font-variation-settings: 'FILL' 1;">corporate_fare</span>
        <div>
          <h2 class="h5 mb-0 fw-bold text-dark">HRM System</h2>
          <span class="text-muted small">Quản trị viên</span>
        </div>
      </div>

      <nav class="nav flex-column mt-3">
        <router-link to="/admin" class="nav-link" exact-active-class="active">
          <span class="material-symbols-outlined">grid_view</span>
          <span>Bảng điều khiển</span>
        </router-link>
        <router-link to="/admin/tuyen-dung" class="nav-link" active-class="active">
          <span class="material-symbols-outlined">person_add</span>
          <span>Tuyển dụng</span>
        </router-link>
        <router-link to="/admin/cham-cong" class="nav-link" active-class="active">
          <span class="material-symbols-outlined">schedule</span>
          <span>Chấm công</span>
        </router-link>
        <router-link to="/admin/nghi-phep" class="nav-link" active-class="active">
          <span class="material-symbols-outlined">event_busy</span>
          <span>Nghỉ phép</span>
        </router-link>
        <router-link to="/admin/ban-luong" class="nav-link" active-class="active">
          <span class="material-symbols-outlined">account_balance_wallet</span>
          <span>Bảng lương</span>
        </router-link>

        <!-- Mục Quản lý gộp lại thành dropdown -->
        <div
          class="nav-group"
          :class="{ 'open': isQuanLyOpen }"
          @mouseenter="isQuanLyOpen = true"
          @mouseleave="isQuanLyOpen = false"
        >
          <div
            class="nav-link nav-group-toggle"
            :class="{ 'active-group': isQuanLyActive }"
            @click="isQuanLyOpen = !isQuanLyOpen"
            role="button"
          >
            <span class="material-symbols-outlined">manage_accounts</span>
            <span>Quản lý</span>
            <span class="material-symbols-outlined ms-auto nav-chevron">expand_more</span>
          </div>
          <div class="nav-submenu">
            <router-link to="/admin/nhan-su" class="nav-link nav-sublink" active-class="active">
              <span class="material-symbols-outlined">how_to_reg</span>
              <span>Nhân sự</span>
            </router-link>
            <router-link to="/admin/chuc-danh" class="nav-link nav-sublink" active-class="active">
              <span class="material-symbols-outlined">badge</span>
              <span>Chức danh</span>
            </router-link>
            <router-link to="/admin/hop-dong" class="nav-link nav-sublink" active-class="active">
              <span class="material-symbols-outlined">contract</span>
              <span>Hợp đồng</span>
            </router-link>
            <router-link to="/admin/phong-ban" class="nav-link nav-sublink" active-class="active">
              <span class="material-symbols-outlined">domain_verification</span>
              <span>Phòng ban</span>
            </router-link>
          </div>
        </div>
      </nav>

      <div class="sidebar-footer">
        <router-link to="/admin/cai-dat" class="nav-link mb-3" active-class="active">
          <span class="material-symbols-outlined">settings</span>
          <span>Cài đặt</span>
        </router-link>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="main-wrapper">
      <!-- Navbar -->
      <header class="navbar-custom d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center gap-3">
          <button class="btn d-lg-none p-1 text-secondary" @click="toggleSidebar">
            <span class="material-symbols-outlined">menu</span>
          </button>
          <div class="position-relative d-none d-sm-block">
            <span class="material-symbols-outlined position-absolute start-0 top-50 translate-middle-y ms-3 text-muted fs-5">search</span>
            <input type="text" class="search-input" style="padding-left: 44px !important;" placeholder="Tìm kiếm nhanh...">
          </div>
        </div>

        <div class="d-flex align-items-center gap-3">
          <!-- Notification Dropdown -->
          <div class="position-relative" ref="notificationDropdownRef">
            <button class="btn p-2 text-secondary position-relative text-decoration-none d-flex align-items-center bell-btn" @click="isNotificationOpen = !isNotificationOpen" aria-label="Notifications" :class="{ 'bg-light': isNotificationOpen }">
              <span class="material-symbols-outlined fs-4 text-dark">notifications</span>
              <span class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-white rounded-circle" style="margin-top: 10px; margin-left: -10px;"></span>
            </button>
            
            <ul v-if="isNotificationOpen" class="dropdown-menu show shadow-lg position-absolute overflow-hidden" style="top: calc(100% + 10px); right: -10px; min-width: 360px; z-index: 1050; border-radius: 12px; border: 1px solid rgba(0,0,0,0.08); padding: 0; background-color: #ffffff;">
              <div class="px-4 py-3 d-flex justify-content-between align-items-center border-bottom bg-white">
                <h6 class="mb-0 fw-bolder text-dark" style="font-size: 1.1rem;">Thông báo hệ thống</h6>
                <span class="badge rounded-pill bg-primary bg-opacity-10 text-primary fw-bold px-2 py-1">2 mới</span>
              </div>
              <div class="overflow-auto custom-scrollbar" style="max-height: 350px;">
                <!-- UNREAD Item -->
                <a href="#" class="dropdown-item d-flex gap-3 p-3 border-bottom text-wrap bg-blue-50 hover:!bg-white transition-colors duration-200 position-relative">
                  <div class="bg-white text-blue-600 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm border border-slate-200" style="width: 42px; height: 42px;">
                    <span class="material-symbols-outlined fs-5 icon-filled">person_add</span>
                  </div>
                  <div class="flex-grow-1 pe-2">
                    <p class="mb-1 text-slate-900 font-medium lh-sm" style="font-size: 0.9rem;">Có 3 ứng viên mới nộp CV vào vị trí Frontend</p>
                    <span class="text-blue-600 font-medium" style="font-size: 0.75rem;">15 phút trước</span>
                  </div>
                  <div class="position-absolute top-50 start-0 translate-middle-y bg-blue-600 rounded-end" style="width: 4px; height: 60%;"></div>
                </a>
                <!-- READ Item -->
                <a href="#" class="dropdown-item d-flex gap-3 p-3 border-bottom text-wrap bg-white hover:!bg-slate-50 transition-colors duration-200">
                  <div class="bg-slate-100 text-slate-500 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 border border-slate-200" style="width: 42px; height: 42px;">
                    <span class="material-symbols-outlined fs-5">assignment_turned_in</span>
                  </div>
                  <div class="flex-grow-1 pe-2">
                    <p class="mb-1 text-slate-700 font-medium lh-sm" style="font-size: 0.9rem;">Bảng lương tháng 10 đã được chốt thành công</p>
                    <span class="text-slate-500 font-medium" style="font-size: 0.75rem;">2 giờ trước</span>
                  </div>
                </a>
              </div>
              <div class="p-0 text-center bg-white border-top">
                <router-link to="/admin/thong-bao" class="d-block w-100 py-3 text-decoration-none fw-bold text-primary hover-bg-light transition-all" @click="isNotificationOpen = false">
                  Xem tất cả thông báo
                </router-link>
              </div>
            </ul>
          </div>
          
          <div class="vr mx-2 d-none d-sm-block bg-secondary opacity-25"></div>
          
          <!-- Profile Dropdown -->
          <div class="position-relative" ref="profileDropdownRef">
            <div class="d-flex align-items-center gap-2 text-decoration-none text-dark p-1 rounded-3 hover-bg-light transition-all" @click="isProfileOpen = !isProfileOpen" style="cursor: pointer;">
              <span class="small fw-bold d-none d-sm-block text-dark">Lê Quản Trị</span>
              <div class="avatar-circle fw-bold bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center rounded-circle border border-primary border-opacity-25" style="width: 36px; height: 36px;">L</div>
            </div>
            
            <!-- Dropdown Menu -->
            <transition
              enter-active-class="transition ease-out duration-100 transform"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75 transform"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <ul v-show="isProfileOpen" class="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 origin-top-right overflow-hidden focus:outline-none" style="z-index: 1050; padding: 0.5rem 0;">
                <li class="px-3 py-2">
                  <h6 class="text-slate-900 font-bold mb-0" style="font-size: 0.95rem;">Xin chào, Lê Quản Trị!</h6>
                  <span class="text-slate-500" style="font-size: 0.8rem;">Toàn quyền hệ thống</span>
                </li>
                <li><hr class="border-slate-100 my-2"></li>
                <li>
                  <router-link to="/admin/ho-so" class="block flex items-center gap-3 py-2 px-4 font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors" @click="isProfileOpen = false">
                    <div class="bg-slate-100 text-slate-500 rounded-full flex items-center justify-center shrink-0" style="width: 32px; height: 32px;">
                      <span class="material-symbols-outlined fs-6">person</span>
                    </div>
                    Thông tin
                  </router-link>
                </li>
                <li><hr class="border-slate-100 my-2"></li>
                <li>
                  <button @click.prevent="logout" class="w-full text-left flex items-center gap-3 py-2 px-4 font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors">
                    <div class="bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0" style="width: 32px; height: 32px;">
                      <span class="material-symbols-outlined fs-6">logout</span>
                    </div>
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </transition>
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="p-4 flex-grow-1 overflow-auto main-bg">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const isSidebarOpen = ref(false);
const isQuanLyOpen = ref(false);

const isNotificationOpen = ref(false);
const notificationDropdownRef = ref(null);

const isProfileOpen = ref(false);
const profileDropdownRef = ref(null);

const quanLyRoutes = ['/admin/nhan-su', '/admin/chuc-danh', '/admin/hop-dong', '/admin/phong-ban'];

const isQuanLyActive = computed(() => {
  return quanLyRoutes.some(r => route.path.startsWith(r));
});

// Tự động mở submenu nếu user đang ở một trong các trang quản lý
if (quanLyRoutes.some(r => route.path.startsWith(r))) {
  isQuanLyOpen.value = true;
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const handleClickOutside = (event) => {
  if (profileDropdownRef.value && !profileDropdownRef.value.contains(event.target)) {
    isProfileOpen.value = false;
  }
  if (notificationDropdownRef.value && !notificationDropdownRef.value.contains(event.target)) {
    isNotificationOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const logout = () => {
  isProfileOpen.value = false;
  // Clear authentication data
  localStorage.clear();
  sessionStorage.clear();
  // Redirect to login
  router.push('/login');
};
</script>

<style scoped>
.x-small {
  font-size: 0.75rem;
}

.sidebar-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.bg-primary {
  background-color: #3b3abb !important;
}

.text-primary {
  color: #3b3abb !important;
}

.nav-link span {
  font-size: 1.05rem;
}

/* ===== Sidebar Base ===== */
.sidebar {
  background-color: #ffffff !important;
  color: #1e293b !important;
  border-right: 1px solid #e2e8f0;
}

::v-deep(.sidebar .nav-link) {
  color: #4b5563 !important;
  transition: all 0.2s ease-in-out;
}

::v-deep(.sidebar .nav-link .material-symbols-outlined) {
  color: #6b7280 !important;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  transition: all 0.2s ease-in-out;
}

::v-deep(.sidebar .nav-link:hover) {
  background-color: #f3f4f6 !important;
  color: #111827 !important;
}

::v-deep(.sidebar .nav-link:hover .material-symbols-outlined) {
  color: #111827 !important;
}

::v-deep(.sidebar .nav-link.active) {
  background-color: #3f41ac !important;
  color: #ffffff !important;
  box-shadow: 0 4px 6px -1px rgba(63, 65, 172, 0.4) !important;
}

::v-deep(.sidebar .nav-link.active .material-symbols-outlined) {
  color: #ffffff !important;
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24 !important;
}

/* ===== NAV GROUP (Quản lý Dropdown) ===== */
.nav-group {
  position: relative;
}

/* Toggle button dùng class nav-link từ global, chỉ thêm cursor + justify */
.nav-group-toggle {
  cursor: pointer;
  user-select: none;
  justify-content: flex-start !important;
}

/* Trạng thái active khi đang ở một trong các route Quản lý */
::v-deep(.nav-group-toggle.active-group) {
  background-color: rgba(63, 65, 172, 0.08) !important;
  color: #3f41ac !important;
}

::v-deep(.nav-group-toggle.active-group .material-symbols-outlined) {
  color: #3f41ac !important;
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24 !important;
}

/* Xoay mũi tên chevron khi mở */
.nav-chevron {
  transition: transform 0.25s ease;
  margin-left: auto;
}

.nav-group.open .nav-chevron {
  transform: rotate(180deg);
}

/* Submenu slide down */
.nav-submenu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: rgba(241, 245, 249, 0.5);
  border-radius: 0.5rem;
  margin: 0 0.75rem 4px;
}

.nav-group.open .nav-submenu {
  max-height: 300px;
}

/* Submenu item - thụt lề vào */
::v-deep(.nav-sublink) {
  padding-left: 2.75rem !important;
  font-size: 0.88rem !important;
  margin-top: 1px !important;
  margin-bottom: 1px !important;
}

/* ===== Main content ===== */
.main-bg {
  background-color: #F8FAFC;
}

/* ===== Bell Animation ===== */
@keyframes ring {
  0% { transform: rotate(0); }
  25% { transform: rotate(15deg); }
  50% { transform: rotate(-10deg); }
  75% { transform: rotate(5deg); }
  100% { transform: rotate(0); }
}

.bell-btn {
  transition: transform 0.2s ease, color 0.2s ease;
}

.bell-btn .material-symbols-outlined {
  transition: transform 0.2s ease;
  display: inline-block;
}

.bell-btn:hover .material-symbols-outlined {
  animation: ring 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
  color: var(--primary-color);
}

.bell-btn:active,
.bell-btn.router-link-active {
  transform: scale(0.95);
  background-color: var(--primary-color) !important;
  color: white !important;
  border-radius: 0.5rem;
  box-shadow: 0 0 0 4px rgba(30, 64, 175, 0.25);
}

.bell-btn:active .material-symbols-outlined,
.bell-btn.router-link-active .material-symbols-outlined {
  color: white !important;
}

/* Custom Overrides for Dropdowns to avoid text contrast issues */
.hover-bg-light:hover {
  background-color: #f8fafc !important;
}
.hover-bg-danger:hover {
  background-color: #fef2f2 !important;
}
.dropdown-item:active {
  background-color: transparent !important;
  color: inherit !important;
}
.icon-filled {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
