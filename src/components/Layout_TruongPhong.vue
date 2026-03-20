<template>
  <div
    class="min-h-screen font-[Roboto,Inter,sans-serif] transition-colors duration-300 bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)]"
  >

    <!-- ── M3 TOP APP BAR ── -->
    <header
      class="fixed top-0 left-0 right-0 z-40 flex items-center h-16 px-2 gap-1 transition-colors duration-300 bg-[var(--sys-bg-surface)] border-b border-[var(--sys-border-subtle)]"
      :class="isDark
        ? 'shadow-[0_1px_3px_oklch(0_0_0/0.4)]'
        : 'shadow-[0_1px_2px_oklch(0_0_0/0.07),0_2px_4px_oklch(0_0_0/0.05)]'"
    >
      <!-- Menu / Hamburger -->
      <button
        @click="handleMenuToggle"
        aria-label="Toggle sidebar"
        class="flex items-center justify-center w-10 h-10 rounded-md transition-colors duration-150 focus-visible:outline-none text-[var(--sys-text-secondary)] hover:bg-[var(--sys-bg-hover)]"
      >
        <span class="material-symbols-rounded" style="font-size:24px;font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24">menu</span>
      </button>

      <!-- Brand -->
      <div class="flex items-center gap-2.5 ml-1">
        <div
          class="w-8 h-8 rounded-md flex items-center justify-center shrink-0 border border-[var(--sys-border-subtle)] bg-[var(--sys-brand-solid)] shadow-sm"
        >
          <span class="material-symbols-rounded text-white" style="font-size:18px;font-variation-settings:'FILL' 1,'wght' 600,'GRAD' 0,'opsz' 20">dashboard_customize</span>
        </div>
        <span
          class="hidden sm:block whitespace-nowrap font-semibold text-base transition-colors duration-300 text-[var(--sys-text-primary)]"
        >Manager Portal</span>
      </div>

      <!-- Breadcrumb -->
      <nav class="hidden md:flex items-center gap-1 ml-4 text-sm bg-transparent">
        <span class="cursor-pointer transition-colors text-[var(--sys-text-secondary)] hover:text-[var(--sys-accent)]">Home</span>
        <span class="material-symbols-rounded text-[var(--sys-text-secondary)] opacity-50" style="font-size:16px;">chevron_right</span>
        <span class="font-medium text-[var(--sys-text-primary)]">{{ currentPageLabel }}</span>
      </nav>

      <div class="flex-1" />

      <!-- Right actions -->
      <div class="flex items-center gap-0.5">
        <!-- Notification -->
        <div class="relative" ref="notificationDropdownRef">
          <button @click="isNotificationOpen = !isNotificationOpen" class="w-10 h-10 rounded-md flex items-center justify-center hover:bg-[var(--sys-bg-hover)] transition-colors relative">
            <span class="material-symbols-rounded" style="font-size:24px;font-variation-settings:'FILL' 0,'wght' 400">notifications</span>
            <span class="absolute top-1.5 right-1.5 flex h-2.5 w-2.5 rounded-full bg-[var(--sys-danger-solid)] ring-2 ring-white"></span>
          </button>
          
          <transition name="m3-dropdown">
            <div v-if="isNotificationOpen" class="absolute right-0 mt-3 w-80 rounded-md overflow-hidden z-50 shadow-sm border border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface-elevated)]">
               <div class="px-4 py-3 border-b border-[var(--sys-border-subtle)] flex justify-between items-center bg-[var(--sys-bg-surface)]">
                 <h6 class="text-sm font-semibold mb-0 text-[var(--sys-text-primary)]">Thông báo</h6>
                 <span class="text-[10px] font-semibold text-[var(--sys-brand-solid)] uppercase tracking-wider">2 Mới</span>
               </div>
               <div class="max-h-[300px] overflow-y-auto">
                  <div class="p-3 border-b border-[var(--sys-border-subtle)] hover:bg-[var(--sys-bg-hover)] transition-colors cursor-default flex gap-3">
                    <div class="w-8 h-8 rounded bg-[var(--sys-brand-soft)] flex items-center justify-center text-[var(--sys-brand-solid)]"><span class="material-symbols-rounded text-base">person_add</span></div>
                    <div>
                      <p class="text-xs font-medium mb-0.5 text-[var(--sys-text-primary)]">Có 5 ứng viên mới đang chờ đánh giá</p>
                      <p class="text-[10px] text-[var(--sys-text-secondary)] font-medium">Recruitment · 15 phút trước</p>
                    </div>
                  </div>
               </div>
            </div>
          </transition>
        </div>

        <!-- Dark Mode Switch (Sync from Admin) -->
        <div class="mx-2 flex items-center gap-1.5">
          <button
            role="switch"
            :aria-checked="isDark"
            @click="isDark = !isDark"
            class="relative w-[52px] h-8 rounded-md transition-all duration-300 border border-[var(--sys-border-subtle)]"
            :class="isDark ? 'bg-[#0f172a]' : 'bg-[var(--sys-bg-hover)]'"
          >
            <span
              class="absolute top-1/2 -translate-y-1/2 rounded-md flex items-center justify-center transition-all duration-300"
              :class="isDark ? 'left-[calc(100%-28px)] w-6 h-6 bg-white shadow-lg' : 'left-1 w-5 h-5 bg-[var(--sys-text-secondary)]'"
            >
              <span class="material-symbols-rounded text-[12px] fill-1">{{ isDark ? 'dark_mode' : 'light_mode' }}</span>
            </span>
          </button>
        </div>

        <div class="h-6 w-px mx-1 bg-[var(--sys-border)]"></div>

        <!-- Profile -->
        <div class="relative" ref="profileDropdownRef">
          <button @click="isProfileOpen = !isProfileOpen" class="flex items-center gap-2.5 p-1 pr-3 rounded-md hover:bg-[var(--sys-border)] transition-all">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style="background:linear-gradient(135deg,oklch(0.62 0.22 340),oklch(0.55 0.25 300))">TP</div>
            <div class="hidden lg:flex flex-col text-left">
              <span class="text-sm font-bold leading-tight text-[var(--sys-text-primary)]">Trần Thanh Tâm</span>
              <span class="text-[10px] uppercase font-bold tracking-widest text-[var(--sys-text-secondary)] mt-0.5">Manager</span>
            </div>
            <span class="material-symbols-rounded text-sm" :class="isProfileOpen ? 'rotate-180' : ''">expand_more</span>
          </button>
          
          <transition name="m3-dropdown">
            <div v-if="isProfileOpen" class="absolute right-0 mt-3 w-60 rounded-md overflow-hidden z-50 shadow-sm border border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface-elevated)] py-1">
              <div class="px-4 py-3 border-b border-[var(--sys-border-subtle)] mb-1">
                <p class="text-[10px] font-semibold uppercase tracking-wider mb-1 text-[var(--sys-text-secondary)]">Tài khoản Trưởng phòng</p>
                <p class="text-xs font-medium truncate mb-0 text-[var(--sys-text-primary)]">manager@hrm.com</p>
              </div>
              <router-link to="/truong-phong/ho-so" class="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-[var(--sys-bg-hover)] text-[var(--sys-text-primary)]" @click="isProfileOpen = false">
                <span class="material-symbols-rounded text-[18px]">person</span> Thông tin cá nhân
              </router-link>
              <button @click="logout" class="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-[var(--sys-danger-text)] hover:bg-[var(--sys-danger-soft)] text-left">
                <span class="material-symbols-rounded text-[18px]">logout</span> Đăng xuất
              </button>
            </div>
          </transition>
        </div>
      </div>
    </header>

    <!-- ── SCRIM ── -->
    <div
      v-if="isMobileSidebarOpen"
      @click="isMobileSidebarOpen = false"
      class="fixed inset-0 z-20 lg:hidden bg-black/40 backdrop-blur-sm transition-opacity"
    ></div>

    <!-- ── SIDEBAR ── -->
    <aside
      class="fixed top-16 left-0 bottom-0 z-30 flex flex-col transition-[width,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)] border-r border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface)]"
      :class="[sidebarExpanded ? 'w-[280px]' : 'w-20', isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0']"
    >
      <div class="shrink-0 h-12 flex items-center px-3 border-b border-[var(--sys-border-subtle)]">
        <span class="material-symbols-rounded text-[var(--sys-brand-solid)]" style="font-size:22px;">apps</span>
        <span v-if="sidebarExpanded" class="overflow-hidden whitespace-nowrap text-xs font-bold uppercase tracking-[0.12em] ml-2 text-[var(--sys-text-secondary)]">Menu</span>
        <button @click="sidebarExpanded = !sidebarExpanded" class="hidden lg:flex ml-auto w-8 h-8 rounded-md items-center justify-center hover:bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)]">
          <span class="material-symbols-rounded transition-transform" :class="sidebarExpanded ? '' : 'rotate-180'">chevron_left</span>
        </button>
      </div>

      <nav class="flex-1 overflow-y-auto py-2 custom-scrollbar">
        <!-- Dashboard Section -->
        <div :class="sidebarExpanded ? 'w-full' : 'px-2 flex flex-col items-center'">
          <SidebarItem :expanded="sidebarExpanded" :is-active="isActive('/truong-phong/dashboard')" icon="dashboard" label="Dashboard" to="/truong-phong/dashboard" @click="handleNavClick" />
        </div>

        <NavSection label="Điều hành phòng ban" :expanded="sidebarExpanded" />
        <div :class="sidebarExpanded ? 'w-full flex flex-col gap-1' : 'px-2 flex flex-col items-center gap-1'">
          <SidebarItem :expanded="sidebarExpanded" :is-active="isActive('/truong-phong/nhan-su')" icon="groups" label="Nhân viên phòng" to="/truong-phong/nhan-su" @click="handleNavClick" />
          <SidebarItem :expanded="sidebarExpanded" :is-active="isActive('/truong-phong/hop-dong')" icon="description" label="Hợp đồng" to="/truong-phong/hop-dong" @click="handleNavClick" />
        </div>

        <NavSection label="Nghiệp vụ hằng ngày" :expanded="sidebarExpanded" />
        <div :class="sidebarExpanded ? 'w-full flex flex-col gap-1' : 'px-2 flex flex-col items-center gap-1'">
          <SidebarItem :expanded="sidebarExpanded" :is-active="isActive('/truong-phong/cham-cong')" icon="schedule" label="Chấm công" to="/truong-phong/cham-cong" @click="handleNavClick" />
          <SidebarItem :expanded="sidebarExpanded" :is-active="isActive('/truong-phong/nghi-phep')" icon="event_busy" label="Nghỉ phép" to="/truong-phong/nghi-phep" @click="handleNavClick" :badge="5" />
          <SidebarItem :expanded="sidebarExpanded" :is-active="isActive('/truong-phong/tuyen-dung')" icon="person_search" label="Tuyển dụng" to="/truong-phong/tuyen-dung" @click="handleNavClick" />
          <SidebarItem :expanded="sidebarExpanded" :is-active="isActive('/truong-phong/danh-gia-ung-vien')" icon="rate_review" label="Đánh giá ứng viên" to="/truong-phong/danh-gia-ung-vien" @click="handleNavClick" />
        </div>

        <NavSection label="Tài chính & Tài sản" :expanded="sidebarExpanded" />
        <div :class="sidebarExpanded ? 'w-full flex flex-col gap-1' : 'px-2 flex flex-col items-center gap-1'">
          <SidebarItem :expanded="sidebarExpanded" :is-active="isActive('/truong-phong/bang-luong')" icon="payments" label="Bảng lương" to="/truong-phong/bang-luong" @click="handleNavClick" />
          <SidebarItem :expanded="sidebarExpanded" :is-active="isActive('/truong-phong/tai-san')" icon="category" label="Quản lý Tài sản" to="/truong-phong/tai-san" @click="handleNavClick" />
        </div>
      </nav>

      <div class="shrink-0 border-t border-[var(--sys-border-subtle)] py-2" :class="sidebarExpanded ? 'w-full flex flex-col gap-1' : 'px-2 flex flex-col items-center gap-1'">
        <SidebarItem :expanded="sidebarExpanded" :is-active="isActive('/truong-phong/ho-so')" icon="settings" label="Cài đặt" to="/truong-phong/ho-so" @click="handleNavClick" />
      </div>
    </aside>

    <!-- ── CONTENT ── -->
    <main
      class="pt-16 min-h-screen transition-[margin] duration-300 ease-[cubic-bezier(0.2,0,0,1)] bg-[var(--sys-bg-page)]/10"
      :class="sidebarExpanded ? 'lg:ml-[280px]' : 'lg:ml-20'"
    >
      <div class="p-4 lg:p-6 max-w-[1600px] mx-auto overflow-hidden">
        <router-view v-slot="{ Component }">
          <transition :name="transitionName" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useConfirm } from '@/composables/useConfirm';
import { NavSection, SidebarItem } from './Layout_Admin.vue';

const { showConfirm } = useConfirm();
const route = useRoute();
const router = useRouter();

const sidebarExpanded = ref(true);
const isMobileSidebarOpen = ref(false);
const isDark = ref(false);
const isNotificationOpen = ref(false);
const isProfileOpen = ref(false);
const profileDropdownRef = ref(null);
const notificationDropdownRef = ref(null);

const transitionName = ref('fade');
watch(() => route.meta.index, (to, from) => {
  if (to === undefined || from === undefined) transitionName.value = 'fade';
  else transitionName.value = to > from ? 'slide-up' : 'slide-down';
});

watch(isDark, (val) => document.documentElement.classList.toggle('dark', val), { immediate: true });

const isActive = (path) => route.path.startsWith(path);

const currentPageLabel = computed(() => {
  const path = route.path;
  if (path.includes('/dashboard')) return 'Dashboard';
  if (path.includes('/nhan-su')) return 'Nhân viên';
  if (path.includes('/hop-dong')) return 'Hợp đồng';
  if (path.includes('/cham-cong')) return 'Chấm công';
  if (path.includes('/nghi-phep')) return 'Nghỉ phép';
  if (path.includes('/tuyen-dung')) return 'Tuyển dụng';
  if (path.includes('/bang-luong')) return 'Bảng lương';
  if (path.includes('/tai-san')) return 'Quản lý Tài sản';
  if (path.includes('/ho-so')) return 'Hồ sơ cá nhân';
  if (path.includes('/danh-gia')) return 'Đánh giá ứng viên';
  return 'Dashboard';
});

const handleMenuToggle = () => {
  if (window.innerWidth < 1024) isMobileSidebarOpen.value = !isMobileSidebarOpen.value;
  else sidebarExpanded.value = !sidebarExpanded.value;
};

const handleNavClick = () => { isMobileSidebarOpen.value = false; };

const handleClickOutside = (e) => {
  if (profileDropdownRef.value && !profileDropdownRef.value.contains(e.target)) isProfileOpen.value = false;
  if (notificationDropdownRef.value && !notificationDropdownRef.value.contains(e.target)) isNotificationOpen.value = false;
};
onMounted(() => document.addEventListener('click', handleClickOutside));
onUnmounted(() => document.removeEventListener('click', handleClickOutside));

const logout = async () => {
  const ok = await showConfirm('Xác nhận đăng xuất', 'Bạn có chắc chắn muốn thoát khỏi hệ thống không?');
  if (ok) {
    localStorage.clear();
    router.push('/login');
  }
};
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active, 
.slide-down-enter-active, .slide-down-leave-active,
.fade-enter-active, .fade-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-up-enter-from { opacity: 0; transform: translateY(20px); }
.slide-up-leave-to { opacity: 0; transform: translateY(-20px); }
.slide-down-enter-from { opacity: 0; transform: translateY(-20px); }
.slide-down-leave-to { opacity: 0; transform: translateY(20px); }
.fade-enter-from, .fade-leave-to { opacity: 0; }

nav::-webkit-scrollbar { width: 4px; }
nav::-webkit-scrollbar-thumb { border-radius: 8px; background: transparent; }

.m3-dropdown-enter-active, .m3-dropdown-leave-active { transition: all 0.22s cubic-bezier(0.2, 0, 0, 1); }
.m3-dropdown-enter-from, .m3-dropdown-leave-to { opacity: 0; transform: translateY(8px) scale(0.96); }
</style>
