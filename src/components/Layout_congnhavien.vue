<template>
  <div class="hrm-layout">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'show': isSidebarOpen }">
      <div class="sidebar-header p-4 d-flex align-items-center gap-3">
        <div class="bg-primary p-2 rounded-lg d-flex align-items-center justify-content-center">
          <span class="material-symbols-outlined text-white">corporate_fare</span>
        </div>
        <h2 class="h5 mb-0 fw-bold text-primary">HRM Portal</h2>
      </div>

      <nav class="nav flex-column mt-3">
        <a href="#" class="nav-link active">
          <span class="material-symbols-outlined">dashboard</span>
          <span>Bảng điều khiển</span>
        </a>
        <a href="#" class="nav-link">
          <span class="material-symbols-outlined">schedule</span>
          <span>Chấm công</span>
        </a>
        <a href="#" class="nav-link">
          <span class="material-symbols-outlined">payments</span>
          <span>Phiếu lương</span>
        </a>
        <a href="#" class="nav-link">
          <span class="material-symbols-outlined">person</span>
          <span>Hồ sơ</span>
        </a>
        <a href="#" class="nav-link">
          <span class="material-symbols-outlined">event_busy</span>
          <span>Nghỉ phép</span>
        </a>
      </nav>

      <div class="sidebar-footer mt-auto p-4 border-top">
        <div class="d-flex align-items-center gap-3 p-2 bg-light rounded-3">
          <div class="avatar-circle">A</div>
          <div class="flex-grow-1 overflow-hidden">
            <div class="fw-semibold text-truncate small">Nguyễn Văn A</div>
            <div class="text-muted text-truncate x-small">Nhân viên chính thức</div>
          </div>
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
            <input type="text" class="search-input" placeholder="Tìm kiếm nhanh...">
          </div>
        </div>

        <div class="d-flex align-items-center gap-3">
          <button class="btn btn-link p-2 text-secondary position-relative text-decoration-none">
            <span class="material-symbols-outlined">notifications</span>
            <span class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle" style="margin-top: 10px; margin-left: -10px;"></span>
          </button>
          <div class="vr mx-2 d-none d-sm-block"></div>
          <div class="d-flex align-items-center gap-2">
            <span class="small fw-medium d-none d-sm-block">Nguyễn Văn A</span>
            <div class="avatar-circle">A</div>
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="p-4 flex-grow-1 overflow-auto bg-light">
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
</style>
