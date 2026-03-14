<template>
  <div class="flex min-h-screen bg-slate-50 font-sans text-slate-900">
    <!-- Sidebar -->
    <aside class="w-64 flex flex-col bg-slate-50 border-r border-slate-200 transition-transform duration-300" :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 relative fixed inset-y-0 left-0 z-40 lg:block'">
      <div class="p-5 flex items-center gap-3 border-b border-slate-100">
        <span class="material-symbols-outlined text-blue-600 text-4xl" style="font-variation-settings: 'FILL' 1, 'wght' 600;">corporate_fare</span>
        <h2 class="text-lg font-bold text-slate-900 leading-tight m-0">HRM Portal</h2>
      </div>

      <nav class="flex-1 overflow-y-auto mt-4 px-3 flex flex-col gap-1">
        <router-link to="/" class="group flex items-center gap-3 px-4 py-2.5 rounded-xl focus-visible:ring-2 focus-visible:ring-indigo-600 focus:outline-none transition-all no-underline" :class="isExactActive('/') ? 'bg-[oklch(93.2%_0.032_255.585)] text-[oklch(62.3%_0.214_259.815)] font-semibold' : 'text-slate-500 hover:bg-slate-100 bg-transparent font-medium'">
          <div class="relative w-6 h-6 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[20px] transition-all duration-300 ease-out absolute"
                  :class="isExactActive('/') ? 'opacity-0 scale-50' : 'opacity-100 scale-100 text-slate-500 group-hover:text-slate-500'">
              home
            </span>
            <span class="material-symbols-outlined text-[20px] transition-all duration-300 ease-out absolute" style="font-variation-settings: 'FILL' 1, 'wght' 600;"
                  :class="isExactActive('/') ? 'bg-gradient-to-br from-[oklch(62.3%_0.214_259.815)] to-[oklch(45.5%_0.2_260)] bg-clip-text text-transparent opacity-100 scale-100' : 'opacity-0 scale-50 text-slate-400'">
              home
            </span>
          </div>
          <span class="text-sm transition-colors duration-200">Trang chủ</span>
        </router-link>

        <router-link to="/cham-cong" class="group flex items-center gap-3 px-4 py-2.5 rounded-xl focus-visible:ring-2 focus-visible:ring-indigo-600 focus:outline-none transition-all no-underline" :class="isActive('/cham-cong') ? 'bg-[oklch(93.2%_0.032_255.585)] text-[oklch(62.3%_0.214_259.815)] font-semibold' : 'text-slate-500 hover:bg-slate-100 bg-transparent font-medium'">
          <div class="relative w-6 h-6 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[20px] transition-all duration-300 ease-out absolute"
                  :class="isActive('/cham-cong') ? 'opacity-0 scale-50' : 'opacity-100 scale-100 text-slate-500 group-hover:text-slate-500'">
              schedule
            </span>
            <span class="material-symbols-outlined text-[20px] transition-all duration-300 ease-out absolute" style="font-variation-settings: 'FILL' 1, 'wght' 600;"
                  :class="isActive('/cham-cong') ? 'bg-gradient-to-br from-[oklch(62.3%_0.214_259.815)] to-[oklch(45.5%_0.2_260)] bg-clip-text text-transparent opacity-100 scale-100' : 'opacity-0 scale-50 text-slate-400'">
              schedule
            </span>
          </div>
          <span class="text-sm transition-colors duration-200">Chấm Công</span>
        </router-link>

        <router-link to="/nghi-phep" class="group flex items-center gap-3 px-4 py-2.5 rounded-xl focus-visible:ring-2 focus-visible:ring-indigo-600 focus:outline-none transition-all no-underline" :class="isActive('/nghi-phep') ? 'bg-[oklch(93.2%_0.032_255.585)] text-[oklch(62.3%_0.214_259.815)] font-semibold' : 'text-slate-500 hover:bg-slate-100 bg-transparent font-medium'">
          <div class="relative w-6 h-6 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[20px] transition-all duration-300 ease-out absolute"
                  :class="isActive('/nghi-phep') ? 'opacity-0 scale-50' : 'opacity-100 scale-100 text-slate-500 group-hover:text-slate-500'">
              event_busy
            </span>
            <span class="material-symbols-outlined text-[20px] transition-all duration-300 ease-out absolute" style="font-variation-settings: 'FILL' 1, 'wght' 600;"
                  :class="isActive('/nghi-phep') ? 'bg-gradient-to-br from-[oklch(62.3%_0.214_259.815)] to-[oklch(45.5%_0.2_260)] bg-clip-text text-transparent opacity-100 scale-100' : 'opacity-0 scale-50 text-slate-400'">
              event_busy
            </span>
          </div>
          <span class="text-sm transition-colors duration-200">Nghỉ phép</span>
        </router-link>

        <router-link to="/luong" class="group flex items-center gap-3 px-4 py-2.5 rounded-xl focus-visible:ring-2 focus-visible:ring-indigo-600 focus:outline-none transition-all no-underline" :class="isActive('/luong') ? 'bg-[oklch(93.2%_0.032_255.585)] text-[oklch(62.3%_0.214_259.815)] font-semibold' : 'text-slate-500 hover:bg-slate-100 bg-transparent font-medium'">
          <div class="relative w-6 h-6 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[20px] transition-all duration-300 ease-out absolute"
                  :class="isActive('/luong') ? 'opacity-0 scale-50' : 'opacity-100 scale-100 text-slate-500 group-hover:text-slate-500'">
              payments
            </span>
            <span class="material-symbols-outlined text-[20px] transition-all duration-300 ease-out absolute" style="font-variation-settings: 'FILL' 1, 'wght' 600;"
                  :class="isActive('/luong') ? 'bg-gradient-to-br from-[oklch(62.3%_0.214_259.815)] to-[oklch(45.5%_0.2_260)] bg-clip-text text-transparent opacity-100 scale-100' : 'opacity-0 scale-50 text-slate-400'">
              payments
            </span>
          </div>
          <span class="text-sm transition-colors duration-200">Tiền lương</span>
        </router-link>

        <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-6 mb-2 px-4">OTHER</div>

        <router-link to="/dich-vu" class="group flex items-center gap-3 px-4 py-2.5 rounded-xl focus-visible:ring-2 focus-visible:ring-indigo-600 focus:outline-none transition-all no-underline" :class="isActive('/dich-vu') ? 'bg-[oklch(93.2%_0.032_255.585)] text-[oklch(62.3%_0.214_259.815)] font-semibold' : 'text-slate-500 hover:bg-slate-100 bg-transparent font-medium'">
          <div class="relative w-6 h-6 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[20px] transition-all duration-300 ease-out absolute"
                  :class="isActive('/dich-vu') ? 'opacity-0 scale-50' : 'opacity-100 scale-100 text-slate-500 group-hover:text-slate-500'">
              support_agent
            </span>
            <span class="material-symbols-outlined text-[20px] transition-all duration-300 ease-out absolute" style="font-variation-settings: 'FILL' 1, 'wght' 600;"
                  :class="isActive('/dich-vu') ? 'bg-gradient-to-br from-[oklch(62.3%_0.214_259.815)] to-[oklch(45.5%_0.2_260)] bg-clip-text text-transparent opacity-100 scale-100' : 'opacity-0 scale-50 text-slate-400'">
              support_agent
            </span>
          </div>
          <span class="text-sm transition-colors duration-200">Dịch vụ nội bộ</span>
        </router-link>
      </nav>
    </aside>

    <!-- Overlay for mobile sidebar -->
    <div v-if="isSidebarOpen" class="fixed inset-0 bg-slate-900/50 z-30 lg:hidden backdrop-blur-sm transition-opacity" @click="isSidebarOpen = false"></div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
      <!-- Navbar -->
      <header class="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 z-20">
        <div class="flex items-center gap-4">
          <button class="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-center cursor-pointer" @click="toggleSidebar">
            <span class="material-symbols-outlined">menu</span>
          </button>
          <div class="hidden sm:flex items-center relative">
            <span class="material-symbols-outlined absolute left-3 text-slate-400 text-[20px] pointer-events-none">search</span>
            <input type="text" class="pl-10 pr-4 py-2 w-64 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder:text-slate-400" placeholder="Tìm kiếm nhanh...">
          </div>
        </div>

        <div class="flex items-center gap-3 sm:gap-5">
          <!-- Notification Dropdown -->
          <div class="relative" ref="notificationDropdownRef">
            <button class="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative transition-colors group flex items-center justify-center cursor-pointer" @click="isNotificationOpen = !isNotificationOpen" :class="{ 'bg-slate-100': isNotificationOpen }">
              <span class="material-symbols-outlined group-hover:animate-wiggle group-hover:text-blue-600 transition-colors">notifications</span>
              <span class="absolute top-2 right-2.5 flex h-2.5 w-2.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span>
              </span>
            </button>
            
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-2 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 translate-y-2 scale-95"
            >
              <div v-if="isNotificationOpen" class="absolute right-0 mt-3 w-80 sm:w-96 bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden z-50 origin-top-right">
                <div class="px-5 py-4 flex justify-between items-center border-b border-slate-100 bg-white">
                  <h6 class="font-bold text-slate-900 text-base m-0">Thông báo</h6>
                  <span class="bg-blue-50 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-100">3 mới</span>
                </div>
                <div class="overflow-y-auto max-h-[350px]">
                  <!-- UNREAD Item -->
                  <a href="#" class="flex gap-4 p-4 border-b border-slate-50 bg-blue-50/50 hover:bg-blue-50 transition-colors relative group">
                    <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r"></div>
                    <div class="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center shrink-0 shadow-sm border border-slate-200 group-hover:scale-105 transition-transform">
                      <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1, 'wght' 600;">payments</span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-slate-900 leading-tight mb-1">Phiếu lương tháng 10/2023 của bạn đã được cập nhật</p>
                      <span class="text-xs font-medium text-blue-600">10 phút trước</span>
                    </div>
                  </a>
                  <!-- READ Item -->
                  <a href="#" class="flex gap-4 p-4 border-b border-slate-50 bg-white hover:bg-slate-50 transition-colors group">
                    <div class="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 border border-slate-200 group-hover:scale-105 transition-transform">
                      <span class="material-symbols-outlined text-[20px]">event_busy</span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-slate-700 leading-tight mb-1">Đơn xin nghỉ phép của bạn đã được duyệt</p>
                      <span class="text-xs font-medium text-slate-400">Hôm qua lúc 14:30</span>
                    </div>
                  </a>
                  <!-- READ Item -->
                  <a href="#" class="flex gap-4 p-4 border-b border-slate-50 bg-white hover:bg-slate-50 transition-colors group">
                    <div class="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 border border-slate-200 group-hover:scale-105 transition-transform">
                      <span class="material-symbols-outlined text-[20px]">campaign</span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-slate-700 leading-tight mb-1">Họp toàn công ty vào sáng thứ 6 tuần này</p>
                      <span class="text-xs font-medium text-slate-400">2 ngày trước</span>
                    </div>
                  </a>
                </div>
                <div class="p-3 text-center bg-slate-50 border-t border-slate-100">
                  <router-link to="/thong-bao" class="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors block" @click="isNotificationOpen = false">
                    Xem tất cả thông báo
                  </router-link>
                </div>
              </div>
            </transition>
          </div>
          
          <div class="hidden sm:block w-px h-6 bg-slate-200"></div>
          
          <!-- Profile Dropdown -->
          <div class="relative" ref="profileDropdownRef">
            <button class="flex items-center gap-3 p-1 rounded-full sm:rounded-lg hover:bg-slate-100 transition-colors cursor-pointer select-none" @click="isProfileOpen = !isProfileOpen">
              <span class="hidden sm:block text-sm font-bold text-slate-700">Nguyễn Văn A</span>
              <div class="w-9 h-9 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center border border-blue-200">A</div>
            </button>
            
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-2 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 translate-y-2 scale-95"
            >
              <div v-show="isProfileOpen" class="absolute right-0 mt-3 w-64 bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden z-50 py-2 origin-top-right">
                <div class="px-5 py-3">
                  <h6 class="font-bold text-slate-900 text-sm mb-0.5">Xin chào, Nguyễn Văn A!</h6>
                  <p class="text-xs text-slate-500 font-medium m-0">Nhân viên | Creative Studio</p>
                </div>
                <div class="h-px bg-slate-100 my-1"></div>
                <router-link to="/ho-so" class="flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors" @click="isProfileOpen = false">
                  <span class="material-symbols-outlined text-[20px] text-slate-400">person</span>
                  Thông tin cá nhân
                </router-link>
                <div class="h-px bg-slate-100 my-1"></div>
                <button @click.prevent="logout" class="w-full flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer">
                  <span class="material-symbols-outlined text-[20px] text-red-500">logout</span>
                  Đăng xuất
                </button>
              </div>
            </transition>
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="flex-1 overflow-auto bg-slate-50 p-4 md:p-6 lg:p-8">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const isSidebarOpen = ref(false);
const isNotificationOpen = ref(false);
const notificationDropdownRef = ref(null);
const isProfileOpen = ref(false);
const profileDropdownRef = ref(null);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const isActive = (path) => {
  return route.path.startsWith(path) && path !== '/';
};

const isExactActive = (path) => {
  return route.path === path;
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
  localStorage.clear();
  sessionStorage.clear();
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
@keyframes wiggle {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}
.animate-wiggle {
  animation: wiggle 0.3s ease-in-out infinite;
}
</style>
