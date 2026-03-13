<template>
  <div class="hrm-layout">
    <!-- Sidebar -->
    <aside class="sidebar admin-sidebar border-end" :class="{ 'show': isSidebarOpen }">
      <div class="sidebar-header p-4 d-flex align-items-center gap-3">
        <div class="bg-primary p-2 rounded-3 d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
          <span class="material-symbols-outlined text-white fs-4">domain</span>
        </div>
        <div>
          <h2 class="h5 mb-0 fw-bold text-dark">HRM System</h2>
          <span class="text-muted small">Quản trị viên</span>
        </div>
      </div>

      <nav class="nav flex-column mt-2 px-3 flex-grow-1">
        <router-link to="/admin" class="nav-link rounded-3 mb-1" exact-active-class="active">
          <span class="material-symbols-outlined">grid_view</span>
          <span class="fw-medium">Bảng điều khiển</span>
        </router-link>
        <router-link to="/admin/tuyen-dung" class="nav-link rounded-3 mb-1" active-class="active">
          <span class="material-symbols-outlined">person_add</span>
          <span class="fw-medium">Tuyển dụng</span>
        </router-link>
        <router-link to="/admin/nhan-su" class="nav-link rounded-3 mb-1" active-class="active">
          <span class="material-symbols-outlined">how_to_reg</span>
          <span class="fw-medium">Quản lý nhân sự</span>
        </router-link>
        <router-link to="/admin/chuc-danh" class="nav-link rounded-3 mb-1" active-class="active">
          <span class="material-symbols-outlined">badge</span>
          <span class="fw-medium">Quản lý chức danh</span>
        </router-link>
        <router-link to="/admin/cham-cong" class="nav-link rounded-3 mb-1" active-class="active">
          <span class="material-symbols-outlined">schedule</span>
          <span class="fw-medium">Chấm công</span>
        </router-link>
        <router-link to="/admin/nghi-phep" class="nav-link rounded-3 mb-1" active-class="active">
          <span class="material-symbols-outlined">event_busy</span>
          <span class="fw-medium">Nghỉ phép</span>
        </router-link>
        <router-link to="/admin/ban-luong" class="nav-link rounded-3 mb-3" active-class="active">
          <span class="material-symbols-outlined">account_balance_wallet</span>
          <span class="fw-medium">Bảng lương</span>
        </router-link>
        
        <hr class="text-black-50 my-2 mx-2">

        <router-link to="/admin/cai-dat" class="nav-link rounded-3 mt-2" active-class="active">
          <span class="material-symbols-outlined">settings</span>
          <span class="fw-medium">Cài đặt</span>
        </router-link>
      </nav>

      <div class="sidebar-footer mt-auto border-top p-3 d-flex align-items-center gap-3">
        <div class="avatar-circle-sm bg-warning-subtle text-dark-emphasis d-flex align-items-center justify-content-center">
          <span class="material-symbols-outlined fs-4 text-secondary">person</span>
        </div>
        <div class="d-flex flex-column">
          <span class="fw-bold text-dark small">Nguyễn Văn A</span>
          <span class="text-muted" style="font-size: 0.75rem;">admin@hrm.com</span>
        </div>
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
            <input type="text" class="search-input bg-light" placeholder="Tìm kiếm nhanh...">
          </div>
        </div>

        <div class="d-flex align-items-center gap-3">
          <router-link to="/admin/thong-bao" class="btn p-2 text-secondary position-relative text-decoration-none d-flex align-items-center bell-btn">
            <span class="material-symbols-outlined fs-4">notifications</span>
            <span class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle" style="margin-top: 10px; margin-left: -10px;"></span>
          </router-link>
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
import { ref } from 'vue';

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<style scoped>
/* Admin Sidebar Custom Overrides */
.admin-sidebar {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

/* Base override for nav links inside light sidebar */
.admin-sidebar .nav-link {
  color: #4b5563; /* Slate 600 */
}

.admin-sidebar .nav-link .material-symbols-outlined {
  color: #6b7280; /* Gray 500 */
}

.admin-sidebar .nav-link:hover {
  background-color: #f3f4f6; /* Gray 100 */
  color: #111827; /* Gray 900 */
  transform: scale(1.02);
}

.admin-sidebar .nav-link.active {
  background-color: var(--primary-color);
  color: #ffffff;
  transform: scale(1.02);
  box-shadow: 0 4px 6px -1px rgba(30, 64, 175, 0.4);
}

.admin-sidebar .nav-link.active .material-symbols-outlined {
  color: #ffffff;
  transform: scale(1.1);
}

.avatar-circle-sm {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e6c89c; /* Based on the amber tone from the image */
}

/* Layout Utilities (assuming inherited from global but some tweaks) */
.main-wrapper {
  margin-left: var(--sidebar-width);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

@media (max-width: 991.98px) {
  .main-wrapper {
    margin-left: 0;
  }
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
  display: inline-block;
}

.bell-btn:hover .material-symbols-outlined {
  animation: ring 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
  color: var(--primary-color);
}
</style>
