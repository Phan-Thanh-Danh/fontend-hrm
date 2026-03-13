<template>
  <div class="hrm-layout">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'show': isSidebarOpen }">
      <div class="sidebar-header p-4 d-flex align-items-center gap-2">
        <span class="material-symbols-outlined text-primary" style="font-size: 36px; font-variation-settings: 'FILL' 1;">corporate_fare</span>
        <h2 class="h5 mb-0 fw-bold text-white">HRM Portal</h2>
      </div>

      <nav class="nav flex-column mt-3">
        <router-link to="/" class="nav-link" exact-active-class="active">
          <span class="material-symbols-outlined">home</span>
          <span>Trang chủ</span>
        </router-link>
        <router-link to="/cham-cong" class="nav-link" active-class="active">
          <span class="material-symbols-outlined">schedule</span>
          <span>Chấm Công</span>
        </router-link>
        <router-link to="/nghi-phep" class="nav-link" active-class="active">
          <span class="material-symbols-outlined">event_busy</span>
          <span>Nghỉ phép</span>
        </router-link>
        <router-link to="/luong" class="nav-link" active-class="active">
          <span class="material-symbols-outlined">payments</span>
          <span>Tiền lương</span>
        </router-link>
        <router-link to="/dich-vu" class="nav-link" active-class="active">
          <span class="material-symbols-outlined">support_agent</span>
          <span>Dịch vụ nội bộ</span>
        </router-link>
      </nav>
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
                <h6 class="mb-0 fw-bolder text-dark" style="font-size: 1.1rem;">Thông báo</h6>
                <span class="badge rounded-pill bg-primary bg-opacity-10 text-primary fw-bold px-2 py-1">3 mới</span>
              </div>
              <div class="overflow-auto custom-scrollbar" style="max-height: 350px;">
                <!-- UNREAD Item -->
                <a href="#" class="dropdown-item d-flex gap-3 p-3 border-bottom text-wrap bg-blue-50 hover:!bg-white transition-colors duration-200 position-relative">
                  <div class="bg-white text-blue-600 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm border border-slate-200" style="width: 42px; height: 42px;">
                    <span class="material-symbols-outlined fs-5 icon-filled">payments</span>
                  </div>
                  <div class="flex-grow-1 pe-2">
                    <p class="mb-1 text-slate-900 font-medium lh-sm" style="font-size: 0.9rem;">Phiếu lương tháng 10/2023 của bạn đã được cập nhật</p>
                    <span class="text-blue-600 font-medium" style="font-size: 0.75rem;">10 phút trước</span>
                  </div>
                  <div class="position-absolute top-50 start-0 translate-middle-y bg-blue-600 rounded-end" style="width: 4px; height: 60%;"></div>
                </a>
                <!-- READ Item -->
                <a href="#" class="dropdown-item d-flex gap-3 p-3 border-bottom text-wrap bg-white hover:!bg-slate-50 transition-colors duration-200">
                  <div class="bg-slate-100 text-slate-500 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 border border-slate-200" style="width: 42px; height: 42px;">
                    <span class="material-symbols-outlined fs-5">event_busy</span>
                  </div>
                  <div class="flex-grow-1 pe-2">
                    <p class="mb-1 text-slate-700 font-medium lh-sm" style="font-size: 0.9rem;">Đơn xin nghỉ phép của bạn đã được duyệt</p>
                    <span class="text-slate-500 font-medium" style="font-size: 0.75rem;">Hôm qua lúc 14:30</span>
                  </div>
                </a>
                <!-- READ Item -->
                <a href="#" class="dropdown-item d-flex gap-3 p-3 border-bottom text-wrap bg-white hover:!bg-slate-50 transition-colors duration-200">
                  <div class="bg-slate-100 text-slate-500 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 border border-slate-200" style="width: 42px; height: 42px;">
                    <span class="material-symbols-outlined fs-5">campaign</span>
                  </div>
                  <div class="flex-grow-1 pe-2">
                    <p class="mb-1 text-slate-700 font-medium lh-sm" style="font-size: 0.9rem;">Họp toàn công ty vào sáng thứ 6 tuần này</p>
                    <span class="text-slate-500 font-medium" style="font-size: 0.75rem;">2 ngày trước</span>
                  </div>
                </a>
              </div>
              <div class="p-0 text-center bg-white border-top">
                <router-link to="/thong-bao" class="d-block w-100 py-3 text-decoration-none fw-bold text-primary hover-bg-light transition-all" @click="isNotificationOpen = false">
                  Xem tất cả thông báo
                </router-link>
              </div>
            </ul>
          </div>
          
          <div class="vr mx-2 d-none d-sm-block bg-secondary opacity-25"></div>
          
          <!-- Profile Dropdown -->
          <div class="position-relative" ref="profileDropdownRef">
            <div class="d-flex align-items-center gap-2 text-decoration-none text-dark p-1 rounded-3 hover-bg-light transition-all" @click="isProfileOpen = !isProfileOpen" style="cursor: pointer;">
              <span class="small fw-bold d-none d-sm-block text-dark">Nguyễn Văn A</span>
              <div class="avatar-circle fw-bold bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center rounded-circle border border-primary border-opacity-25" style="width: 36px; height: 36px;">A</div>
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
                  <h6 class="text-slate-900 font-bold mb-0" style="font-size: 0.95rem;">Xin chào, Nguyễn Văn A!</h6>
                  <span class="text-slate-500" style="font-size: 0.8rem;">Nhân viên | Creative Studio</span>
                </li>
                <li><hr class="border-slate-100 my-2"></li>
                <li>
                  <router-link to="/ho-so" class="block flex items-center gap-3 py-2 px-4 font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors" @click="isProfileOpen = false">
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
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isSidebarOpen = ref(false);
const isNotificationOpen = ref(false);
const notificationDropdownRef = ref(null);
const isProfileOpen = ref(false);
const profileDropdownRef = ref(null);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const handleClickOutside = (event) => {
  if (notificationDropdownRef.value && !notificationDropdownRef.value.contains(event.target)) {
    isNotificationOpen.value = false;
  }
  if (profileDropdownRef.value && !profileDropdownRef.value.contains(event.target)) {
    isProfileOpen.value = false;
  }
};

const logout = () => {
  isProfileOpen.value = false;
  // Clear authentication data
  localStorage.clear();
  sessionStorage.clear();
  // Redirect to login
  router.push('/login');
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
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
  background-color: var(--primary-color) !important;
}

.text-primary {
  color: var(--primary-color) !important;
}

.nav-link span {
  font-size: 1.1rem;
}
.sidebar{
  background-color: #18181B;
  color: white;
}
.main-bg{
  background-color: #F8FAFC;
}

/* Sidebar Nav Links Base & Active Styles */
::v-deep(.sidebar .nav-link) {
  transition: all 0.2s ease-in-out;
}
::v-deep(.sidebar .nav-link .material-symbols-outlined) {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  transition: all 0.2s ease-in-out;
}
::v-deep(.sidebar .nav-link.active .material-symbols-outlined) {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24 !important;
}

/* Notification Bell Animation */
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
  display: inline-block; /* Required for transform to work */
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
  box-shadow: 0 0 0 4px rgba(30, 64, 175, 0.25); /* Khung mờ bao quanh */
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
