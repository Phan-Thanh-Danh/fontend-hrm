<template>
  <div class="flex h-screen bg-[#f8f9fa] font-sans text-slate-900 overflow-hidden">
    <!-- Sidebar -->
    <aside 
      class="w-72 flex flex-col bg-white border-r border-slate-200 transition-all duration-300 z-40 h-full shrink-0"
      :class="isSidebarOpen ? 'translate-x-0 fixed inset-y-0 left-0 shadow-2xl' : '-translate-x-full lg:translate-x-0 relative lg:static'"
    >
      <!-- Logo Section -->
      <div class="h-20 flex items-center px-8 border-b border-slate-100 gap-3">
        <span class="material-symbols-outlined text-indigo-600 text-3xl" style="font-variation-settings: 'FILL' 1, 'wght' 600;">corporate_fare</span>
        <h2 class="text-xl font-bold text-slate-900 leading-tight m-0 tracking-tight">HRM Portal</h2>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto py-4 px-4 custom-scrollbar">
        <!-- Dashboard Block -->
        <router-link to="/admin" class="nav-item mb-4" :class="{ 'active': isExactActive('/admin') }">
          <span class="material-symbols-outlined nav-icon">dashboard</span>
          <span class="nav-text font-black">Dashboard</span>
        </router-link>

        <!-- Personnel Section -->
        <div class="px-3 mb-2 font-black text-[10px] text-slate-400 uppercase tracking-widest">Quản lý Nhân sự</div>
        <div class="space-y-0.5 mb-6">
          <router-link to="/admin/nhan-su" class="nav-item" :class="{ 'active': isActive('/admin/nhan-su') }">
            <span class="material-symbols-outlined nav-icon">groups</span>
            <span class="nav-text">Nhân viên</span>
          </router-link>
          <router-link to="/admin/phong-ban" class="nav-item" :class="{ 'active': isActive('/admin/phong-ban') }">
            <span class="material-symbols-outlined nav-icon">corporate_fare</span>
            <span class="nav-text">Phòng ban</span>
          </router-link>
          <router-link to="/admin/hop-dong" class="nav-item" :class="{ 'active': isActive('/admin/hop-dong') }">
            <span class="material-symbols-outlined nav-icon">description</span>
            <span class="nav-text">Hợp đồng</span>
          </router-link>
          <router-link to="/admin/chuc-danh" class="nav-item" :class="{ 'active': isActive('/admin/chuc-danh') }">
            <span class="material-symbols-outlined nav-icon">badge</span>
            <span class="nav-text">Chức danh</span>
          </router-link>
        </div>

        <!-- Operations Section -->
        <div class="px-3 mb-2 font-black text-[10px] text-slate-400 uppercase tracking-widest">Nghiệp vụ hằng ngày</div>
        <div class="space-y-0.5 mb-6">
          <router-link to="/admin/cham-cong" class="nav-item" :class="{ 'active': isActive('/admin/cham-cong') }">
            <span class="material-symbols-outlined nav-icon">schedule</span>
            <span class="nav-text">Chấm công</span>
          </router-link>
          <router-link to="/admin/nghi-phep" class="nav-item" :class="{ 'active': isActive('/admin/nghi-phep') }">
            <span class="material-symbols-outlined nav-icon">event_busy</span>
            <span class="nav-text">Nghỉ phép</span>
          </router-link>
          <router-link to="/admin/tuyen-dung" class="nav-item" :class="{ 'active': isActive('/admin/tuyen-dung') }">
            <span class="material-symbols-outlined nav-icon">person_search</span>
            <span class="nav-text">Tuyển dụng</span>
          </router-link>
          <router-link to="/admin/lich-phong-van" class="nav-item" :class="{ 'active': isActive('/admin/lich-phong-van') }">
            <span class="material-symbols-outlined nav-icon">calendar_today</span>
            <span class="nav-text">Lịch phỏng vấn</span>
          </router-link>
          <router-link to="/admin/phe-duyet" class="nav-item" :class="{ 'active': isActive('/admin/phe-duyet') }">
            <span class="material-symbols-outlined nav-icon">task_alt</span>
            <span class="nav-text font-bold">Phê duyệt đơn</span>
          </router-link>
        </div>

        <!-- Finance & Assets Section -->
        <div class="px-3 mb-2 font-black text-[10px] text-slate-400 uppercase tracking-widest">Tài chính & Tài sản</div>
        <div class="space-y-0.5 mb-6">
          <router-link to="/admin/bang-luong" class="nav-item" :class="{ 'active': isActive('/admin/bang-luong') }">
            <span class="material-symbols-outlined nav-icon">payments</span>
            <span class="nav-text">Bảng lương</span>
          </router-link>
          <router-link to="/admin/tai-san" class="nav-item" :class="{ 'active': isActive('/admin/tai-san') }">
            <span class="material-symbols-outlined nav-icon">category</span>
            <span class="nav-text">Quản lý Tài sản</span>
          </router-link>
        </div>
      </nav>

      <div class="mt-auto border-t border-slate-100 p-4">
        <router-link to="/admin/cai-dat" class="nav-item" :class="{ 'active': isActive('/admin/cai-dat') }">
          <span class="material-symbols-outlined nav-icon text-slate-400">settings</span>
          <span class="nav-text font-bold">Cài đặt</span>
        </router-link>
      </div>
    </aside>

    <!-- Overlay for mobile -->
    <div 
      v-if="isSidebarOpen" 
      class="fixed inset-0 bg-slate-900/40 z-30 lg:hidden backdrop-blur-sm transition-opacity"
      @click="isSidebarOpen = false"
    ></div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
      <!-- Navbar -->
      <header class="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-20">
        <!-- Left: Breadcrumbs -->
        <div class="flex items-center gap-4">
          <button 
            class="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            @click="toggleSidebar"
          >
            <span class="material-symbols-outlined">menu</span>
          </button>
          
          <nav class="flex items-center gap-2 text-sm font-medium">
            <span class="text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer">Home</span>
            <span class="text-slate-300">/</span>
            <span class="text-slate-900 font-bold tracking-tight">{{ currentPageLabel }}</span>
          </nav>
        </div>

        <!-- Right: Actions & Account -->
        <div class="flex items-center gap-3 md:gap-6">
          <!-- Search -->
          <div class="relative group hidden sm:block">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none group-focus-within:text-indigo-500 transition-colors">search</span>
            <input 
              type="text" 
              class="pl-10 pr-4 py-2 w-48 md:w-64 bg-slate-50 border border-slate-200 rounded-full text-xs focus:outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all placeholder:text-slate-400" 
              placeholder="Tìm kiếm..."
            >
          </div>

          <!-- Icons Circle Group -->
          <div class="flex items-center gap-1 bg-slate-50 p-1 rounded-full border border-slate-100">
            <button class="p-2 text-slate-500 hover:bg-white hover:text-indigo-600 rounded-full transition-all cursor-pointer">
              <span class="material-symbols-outlined text-lg">light_mode</span>
            </button>
            <div class="relative" ref="notificationDropdownRef">
              <button 
                class="p-2 text-slate-500 hover:bg-white hover:text-blue-600 rounded-full relative transition-all group cursor-pointer" 
                @click="isNotificationOpen = !isNotificationOpen"
                :class="{ 'bg-white text-indigo-600 shadow-sm': isNotificationOpen }"
              >
                <span class="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">notifications</span>
                <span class="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500 border border-white"></span>
                </span>
              </button>
              <transition name="dropdown">
                <div v-if="isNotificationOpen" class="absolute right-0 mt-4 w-80 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden z-50">
                  <div class="px-6 py-4 border-b border-slate-100 bg-white flex justify-between items-center">
                      <h6 class="font-bold text-slate-900 m-0 text-sm">Thông báo</h6>
                      <span class="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">2 Mới</span>
                  </div>
                  <div class="max-h-[300px] overflow-y-auto">
                      <div class="p-4 hover:bg-slate-50 transition-colors flex gap-3 border-b border-slate-50">
                          <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                              <span class="material-symbols-outlined text-base">person_add</span>
                          </div>
                          <div>
                              <p class="text-xs font-bold text-slate-800 mb-0.5">3 Ứng viên mới nộp CV</p>
                              <p class="text-[10px] text-slate-500 mb-0">Frontend Developer • 15 phút trước</p>
                          </div>
                      </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>

          <div class="h-8 w-px bg-slate-200 hidden md:block"></div>

          <!-- Account Dropdown -->
          <div class="relative" ref="profileDropdownRef">
            <button 
              class="flex items-center gap-3 p-1 rounded-full hover:bg-slate-50 transition-all cursor-pointer select-none border border-transparent hover:border-slate-100 shadow-sm hover:shadow-md"
              @click="isProfileOpen = !isProfileOpen"
            >
              <div class="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-inner">L</div>
              <div class="hidden lg:block text-left mr-1">
                <p class="text-xs font-bold text-slate-900 leading-none mb-0.5">Lê Quản Trị</p>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Admin</p>
              </div>
              <span class="material-symbols-outlined text-slate-400 text-sm mr-1 transition-transform" :class="{'rotate-180': isProfileOpen}">expand_more</span>
            </button>
            <transition name="dropdown">
              <div v-if="isProfileOpen" class="absolute right-0 mt-4 w-60 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 py-2 z-50 overflow-hidden">
                <div class="px-5 py-3 border-b border-slate-50 mb-1">
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tài khoản quản trị</p>
                    <p class="text-xs font-bold text-slate-900 truncate mb-0">admin@codedenngu.com</p>
                </div>
                <router-link to="/admin/ho-so" class="flex items-center gap-3 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors">
                  <span class="material-symbols-outlined text-[18px]">person</span>
                  Thông tin cá nhân
                </router-link>
                <button @click="logout" class="w-full flex items-center gap-3 px-5 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors text-left border-t border-slate-50 mt-1">
                  <span class="material-symbols-outlined text-[18px]">logout</span>
                  Đăng xuất hệ thống
                </button>
              </div>
            </transition>
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="flex-1 overflow-y-auto p-6 lg:p-10 bg-[#f8f9fa]">
        <div class="max-w-[1600px] mx-auto">
          <router-view></router-view>
        </div>
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
const isNotificationOpen = ref(false);
const isProfileOpen = ref(false);

const notificationDropdownRef = ref(null);
const profileDropdownRef = ref(null);

const isActive = (path) => route.path.startsWith(path);
const isExactActive = (path) => route.path === path;

const currentPageLabel = computed(() => {
  const path = route.path;
  if (path === '/admin') return 'Dashboard';
  if (path.startsWith('/admin/nhan-su')) return 'Nhân viên';
  if (path.startsWith('/admin/phong-ban')) return 'Phòng ban';
  if (path.startsWith('/admin/cham-cong')) return 'Chấm công';
  if (path.startsWith('/admin/nghi-phep')) return 'Nghỉ phép';
  if (path.startsWith('/admin/tuyen-dung')) return 'Tuyển dụng';
  if (path.startsWith('/admin/hop-dong')) return 'Hợp đồng';
  if (path.startsWith('/admin/chuc-danh')) return 'Chức danh';
  if (path.startsWith('/admin/cai-dat')) return 'Cài đặt';
  if (path.startsWith('/admin/ho-so')) return 'Hồ sơ cá nhân';
  if (path.startsWith('/admin/bang-luong')) return 'Bảng lương';
  if (path.startsWith('/admin/tai-san')) return 'Quản lý Tài sản';
  if (path.startsWith('/admin/phe-duyet')) return 'Phê duyệt đơn';
  return 'Dashboard';
});

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
  localStorage.clear();
  sessionStorage.clear();
  router.push('/login');
};
</script>

<style scoped>
/* Navigation Item Styles */
.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1.25rem;
  border-radius: 0.75rem;
  color: #4b5563;
  font-weight: 500;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  position: relative;
  overflow: hidden;
  margin-bottom: 2px;
}

.nav-item:hover {
  background-color: #f8fafc;
  color: #0f172a;
}

.nav-item.active {
  background-color: rgba(238, 242, 255, 0.8);
  color: #6366f1;
  font-weight: 700;
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 2rem;
  background-color: #6366f1;
  border-radius: 0 4px 4px 0;
  box-shadow: 2px 0 10px rgba(0, 97, 242, 0.3);
}

.nav-icon {
  font-size: 22px;
  color: #94a3b8;
  transition: color 0.2s;
  font-variation-settings: 'wght' 300, 'opsz' 24;
}

.nav-item:hover .nav-icon {
  color: #64748b;
}

.nav-item.active .nav-icon {
  color: #6366f1;
  font-variation-settings: 'FILL' 0, 'wght' 500, 'opsz' 24;
}

.nav-text {
  font-size: 0.9375rem;
  letter-spacing: -0.01em;
}

/* Transitions */
.dropdown-enter-active, .dropdown-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}

/* Material Symbols sizing */
.material-symbols-outlined {
  font-variation-settings: 'opsz' 24, 'wght' 300, 'FILL' 0, 'GRAD' 0;
}
</style>
