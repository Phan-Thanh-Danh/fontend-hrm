<template>
  <div class="hrm-layout">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'show': isSidebarOpen }">
      <div class="sidebar-header p-4 d-flex align-items-center gap-3">
        <div class="bg-primary p-2 rounded-lg d-flex align-items-center justify-content-center">
          <span class="material-symbols-outlined text-white">corporate_fare</span>
        </div>
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
          <router-link to="/thong-bao" class="btn p-2 text-secondary position-relative text-decoration-none d-flex align-items-center bell-btn">
            <span class="material-symbols-outlined fs-4">notifications</span>
            <span class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle" style="margin-top: 10px; margin-left: -10px;"></span>
          </router-link>
          <div class="vr mx-2 d-none d-sm-block"></div>
          <router-link to="/ho-so" class="d-flex align-items-center gap-2 text-decoration-none text-dark" style="cursor: pointer;">
            <span class="small fw-medium d-none d-sm-block">Nguyễn Văn A</span>
            <div class="avatar-circle">A</div>
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
  background-color: 18181B;
  color: white;
}
.main-bg{
  background-color: #F8FAFC;
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
</style>
