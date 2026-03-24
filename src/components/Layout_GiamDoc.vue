<template>
  <div class="min-h-screen font-[Roboto,Inter,sans-serif] bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] transition-colors duration-300">
    <!-- Top App Bar -->
    <header
      class="fixed top-0 left-0 right-0 z-40 flex items-center h-16 px-2 gap-1 transition-colors duration-300 bg-[var(--sys-bg-surface)] border-b border-[var(--sys-border-subtle)] shadow-[0_1px_2px_oklch(0_0_0/0.07),0_2px_4px_oklch(0_0_0/0.05)]"
    >
      <!-- Menu Trigger -->
      <button
        @click="handleMenuToggle"
        aria-label="Toggle sidebar"
        class="flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-150 focus-visible:outline-none text-[var(--sys-text-secondary)] hover:bg-[var(--sys-bg-hover)]"
      >
        <span class="material-symbols-rounded" style="font-size: 24px;">menu</span>
      </button>

      <!-- Brand Section -->
      <div class="flex items-center gap-2.5 ml-1">
        <div
          class="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md"
          style="background: linear-gradient(135deg, oklch(0.52 0.22 265), oklch(0.45 0.19 295)); box-shadow: oklch(0.48 0.195 265 / 0.35) 0px 2px 8px;"
        >
          <span class="material-symbols-rounded text-white" style="font-size: 18px; font-variation-settings: 'FILL' 1, 'wght' 600;">corporate_fare</span>
        </div>
        <span class="hidden sm:block whitespace-nowrap font-medium text-[1.08rem] text-[var(--sys-text-primary)]">HRM Portal</span>
      </div>

      <!-- Breadcrumb -->
      <nav class="hidden md:flex items-center gap-1 ml-4 text-sm">
        <span class="cursor-pointer transition-colors text-[var(--sys-text-secondary)] hover:text-[var(--sys-accent)]">Director</span>
        <span class="material-symbols-rounded text-[var(--sys-text-secondary)] opacity-50" style="font-size: 16px;">chevron_right</span>
        <span class="font-medium text-[var(--sys-text-primary)]">{{ currentPageLabel }}</span>
      </nav>

      <div class="flex-1"></div>

      <!-- Right Actions -->
      <div class="flex items-center gap-0.5">
        <!-- Search -->
        <div class="relative group hidden sm:flex items-center mr-1">
          <span class="material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[18px] text-[var(--sys-text-secondary)]">search</span>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            class="pl-9 pr-4 py-1.5 w-48 rounded-full text-sm transition-all duration-200 focus:outline-none focus:w-64 bg-[var(--sys-bg-page)] border border-[var(--sys-border)] text-[var(--sys-text-primary)] focus:border-[var(--sys-accent)]"
          />
        </div>

        <!-- Notification Bell -->
        <div class="relative" @mouseenter="showPopup = true" @mouseleave="startHideTimer">
          <button
            class="flex items-center justify-center w-10 h-10 rounded-full transition-colors text-[var(--sys-text-secondary)] hover:bg-[var(--sys-bg-hover)]"
            @click="goToNotifications"
          >
            <span class="material-symbols-rounded" style="font-size: 24px;">notifications</span>
            <span v-if="approvalCount > 0" class="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-[oklch(0.55_0.22_25)] ring-2 ring-[var(--sys-bg-surface)]"></span>
          </button>
          
          <Transition name="m3-dropdown">
            <div v-if="showPopup" class="absolute right-0 mt-3 w-80 rounded-lg overflow-hidden z-50 shadow-lg border border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface-elevated)]" @mouseenter="cancelHideTimer" @mouseleave="startHideTimer">
              <div class="flex justify-between items-center px-4 py-3 border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface)]">
                <h6 class="text-sm font-semibold mb-0">Thông báo</h6>
                <span class="px-2 py-0.5 rounded-full bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] text-[10px] font-bold uppercase tracking-wider">{{ recentNotifications.length }} mới</span>
              </div>
              <div class="max-h-[300px] overflow-y-auto custom-scrollbar">
                <div v-for="item in recentNotifications" :key="item.id" class="p-3 flex gap-3 cursor-pointer border-b border-[var(--sys-border-subtle)] hover:bg-[var(--sys-bg-hover)]" @click="handleNotifClick(item)">
                  <div class="w-8 h-8 rounded-md flex items-center justify-center shrink-0 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)]">
                    <span class="material-symbols-rounded text-base">notifications</span>
                  </div>
                  <div class="flex-1">
                    <p class="text-xs font-medium mb-0.5 text-[var(--sys-text-primary)]">{{ item.title }}</p>
                    <p class="text-[10px] text-[var(--sys-text-secondary)]">{{ item.time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <div class="h-6 w-px hidden md:block mx-1 bg-[var(--sys-border)]"></div>

        <!-- User Profile -->
        <div class="relative" ref="profileDropdownRef">
          <button
            @click="isProfileOpen = !isProfileOpen"
            class="flex items-center gap-2.5 p-1 pr-3 rounded-full transition-all hover:bg-[var(--sys-bg-hover)]"
          >
            <div class="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--sys-accent)]/10 text-[var(--sys-accent)] border border-[var(--sys-accent)]/20 text-sm font-bold shrink-0 overflow-hidden">
              <img v-if="avatar" :src="avatar" class="w-full h-full object-cover" />
              <span v-else>{{ fullName.charAt(0) }}</span>
            </div>
            <div class="hidden lg:flex flex-col justify-center text-left">
              <span class="text-sm font-bold leading-tight text-[var(--sys-text-primary)]">{{ fullName }}</span>
              <span class="text-[10px] uppercase tracking-widest font-bold mt-0.5 leading-none text-[var(--sys-text-secondary)]">Director</span>
            </div>
          </button>

          <Transition name="m3-dropdown">
            <div v-if="isProfileOpen" class="absolute right-0 mt-3 w-60 rounded-lg overflow-hidden z-50 shadow-lg border border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface-elevated)] py-1">
              <router-link to="/giamdoc/hoso" class="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-[var(--sys-bg-hover)]" @click="isProfileOpen = false">
                <span class="material-symbols-rounded text-[18px]">person</span>
                Thông tin cá nhân
              </router-link>
              <button @click="logout" class="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-left hover:bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)]">
                <span class="material-symbols-rounded text-[18px]">logout</span>
                Đăng xuất
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </header>

    <!-- Navigation Sidebar -->
    <aside
      class="fixed top-16 left-0 bottom-0 z-30 flex flex-col overflow-hidden transition-[width,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)] bg-[var(--sys-bg-surface)] border-r border-[var(--sys-border-subtle)]"
      :class="sidebarExpanded ? 'w-[280px]' : 'w-20'"
    >
      <div class="shrink-0 h-12 flex items-center px-3 border-b border-[var(--sys-border-subtle)]">
        <span class="material-symbols-rounded shrink-0 text-[var(--sys-brand-solid)]" style="font-size:22px;">apps</span>
        <span class="overflow-hidden whitespace-nowrap text-xs font-bold uppercase tracking-wider transition-all duration-300 ml-2 text-[var(--sys-text-secondary)]" :class="sidebarExpanded ? 'opacity-100 max-w-[150px]' : 'opacity-0 max-w-0'">Menu Director</span>
        <button @click="sidebarExpanded = !sidebarExpanded" class="ml-auto w-8 h-8 rounded-full flex items-center justify-center transition-colors text-[var(--sys-text-secondary)] hover:bg-[var(--sys-bg-hover)]">
          <span class="material-symbols-rounded" :class="sidebarExpanded ? '' : 'rotate-180'">chevron_left</span>
        </button>
      </div>

      <nav class="flex-1 overflow-y-auto py-2 custom-scrollbar px-3 space-y-0.5">
        <SidebarItem :expanded="sidebarExpanded" :is-active="route.path === '/giamdoc'" icon="dashboard" label="Trang chủ" to="/giamdoc" />
        <SidebarItem :expanded="sidebarExpanded" :is-active="route.path.includes('nhansu')" icon="groups" label="Nhan sự" to="/giamdoc/nhansu" />
        <SidebarItem :expanded="sidebarExpanded" :is-active="route.path.includes('bangluong')" icon="payments" label="Bảng lương" to="/giamdoc/bangluong" />
        <SidebarItem :expanded="sidebarExpanded" :is-active="route.path.includes('chuyencan')" icon="event_note" label="Chuyên cần" to="/giamdoc/chuyencan" />
        <SidebarItem :expanded="sidebarExpanded" :is-active="route.path.includes('biendong')" icon="trending_up" label="Biến động" to="/giamdoc/biendong" />
      </nav>
    </aside>

    <!-- Main Content Area -->
    <main
      class="pt-16 min-h-screen transition-[margin] duration-300 ease-[cubic-bezier(0.2,0,0,1)] bg-transparent"
      :class="sidebarExpanded ? 'lg:ml-[280px]' : 'lg:ml-20'"
    >
      <div class="p-6 lg:p-8 max-w-[1600px] mx-auto overflow-hidden bg-transparent">
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
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCurrentUser } from '@/composables/useCurrentUser';
import {
  importantNotifications as staticNotifs
} from '@/mock-data/sampleData_GiamDoc.js';
import { mockLeaveRequests, mockEmployees, mockRequestTypes } from '@/mock-data/index.js';

const { fullName, email, avatar } = useCurrentUser();

const route  = useRoute();
const router = useRouter();
const isDark = ref(false);

const showPopup = ref(false);
let hideTimer = null;

const startHideTimer = () => {
  hideTimer = setTimeout(() => { showPopup.value = false; }, 150);
};

const cancelHideTimer = () => {
  clearTimeout(hideTimer);
};

const goToNotifications = () => {
  showPopup.value = false;
  router.push('/giamdoc/thongbao');
};

const handleNotifClick = (item) => {
  showPopup.value = false;
  if (item.actionRoute) { router.push(item.actionRoute); }
  else { router.push('/giamdoc/thongbao'); }
};

// ── Breadcrumb Logic ──
const currentPageLabel = computed(() => {
  const path = route.path;
  if (path === '/giamdoc' || path === '/giamdoc/') return 'Tổng quan';
  if (path.includes('nhansu')) return 'Nhan sự';
  if (path.includes('bangluong')) return 'Bảng lương';
  if (path.includes('chuyencan')) return 'Chuyên cần';
  if (path.includes('biendong')) return 'Biến động';
  if (path.includes('hoso')) return 'Hồ sơ cá nhân';
  return 'Tổng quan';
});

const isProfileOpen = ref(false);
const profileDropdownRef = ref(null);
const sidebarExpanded = ref(true);

const handleMenuToggle = () => {
  sidebarExpanded.value = !sidebarExpanded.value;
};

const logout = async () => {
  localStorage.clear();
  router.push('/login');
};

// Lấy yêu cầu phê duyệt REAL từ mockDB (CHỜ_GIÁM_ĐỐC_DUYỆT)
const realApprovals = computed(() => {
  const allReqs = mockLeaveRequests;
  return allReqs.filter(r => r.status === 'CHỜ_GIÁM_ĐỐC_DUYỆT').map(r => {
    const emp = mockEmployees.getById(r.requesterId);
    const type = mockRequestTypes.getById(r.requestTypeId);
    return {
      id: r.request_id,
      name: emp?.full_name || 'Nhân viên',
      title: type?.request_type_name || 'Khác',
      initials: emp?.full_name?.charAt(0) || 'N',
      urgent: !!r.is_urgent || r.days >= 3,
      avatarBg: 'bg-indigo-100',
      avatarColor: 'text-indigo-600'
    };
  });
});

const recentNotifications = computed(() => {
  const dynamicNotifs = realApprovals.value.filter(r => r.urgent).slice(0, 2).map(r => ({
    id: `urgent-${r.id}`,
    level: 'canh_bao',
    levelLabel: 'KHẨN CẤP',
    levelColor: 'text-orange-700',
    levelBg: 'bg-orange-50',
    dotColor: 'bg-orange-500',
    icon: 'warning',
    iconColor: 'text-orange-500',
    title: `Yêu cầu phê duyệt khẩn: ${r.name}`,
    desc: `${r.title} cần được xử lý ngay trong ngày.`,
    actionRoute: '/giamdoc/thongbao',
    time: 'Vừa xong'
  }));
  return [...dynamicNotifs, ...staticNotifs.slice(0, 2)];
});

const recentApprovals = computed(() => {
  return realApprovals.value.slice(0, 3);
});

const approvalCount = computed(() => realApprovals.value.length);

// ── Transition Logic ────────────────────────────────────────────────────────
const transitionName = ref('fade');
watch(() => route.meta.index, (toIndex, fromIndex) => {
  if (toIndex === undefined || fromIndex === undefined) {
    transitionName.value = 'fade';
    return;
  }
  transitionName.value = toIndex > fromIndex ? 'slide-up' : 'slide-down';
});

watch(isDark, (val) => {
  document.documentElement.classList.toggle('dark', val);
}, { immediate: true });

// ── Authentication Check ───────────────────────────────────────────────────
onMounted(() => {
  const userRole = localStorage.getItem('userRole');
  if (!userRole || userRole !== 'director') {
    router.push('/login');
  }
});
</script>

<!-- Sub-components (defineComponent inline) -->
<script>
import { defineComponent, h, resolveComponent } from 'vue';

export const SidebarItem = defineComponent({
  name: 'SidebarItem',
  props: { expanded: Boolean, isActive: Boolean, icon: String, label: String, to: String },
  setup(props) {
    return () => {
      const RouterLink = resolveComponent('RouterLink');
      return h(RouterLink, {
        to: props.to,
        class: [
          'group relative flex items-center gap-3 w-full h-[48px] px-4 rounded-xl transition-all no-underline',
          props.isActive ? 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] shadow-sm' : 'hover:bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)]'
        ].join(' ')
      }, () => [
        h('span', { class: 'material-symbols-rounded', style: `font-variation-settings:'FILL' ${props.isActive ? 1 : 0}` }, props.icon),
        props.expanded ? h('span', { class: 'text-sm font-semibold' }, props.label) : null
      ]);
    }
  }
});
</script>

<style scoped>
/* ════════════════════════════════════════
   Page Transitions
════════════════════════════════════════ */
.slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from  { opacity: 0; transform: translateY(20px); }
.slide-up-leave-to    { opacity: 0; transform: translateY(-20px); }
.slide-down-enter-from{ opacity: 0; transform: translateY(-20px); }
.slide-down-leave-to  { opacity: 0; transform: translateY(20px); }
.fade-enter-from,
.fade-leave-to        { opacity: 0; }

/* ════════════════════════════════════════
   Notification Bell
════════════════════════════════════════ */
.notif-trigger {
  position: relative;
  display: flex;
  align-items: center;
}

/* Pulse animation on unread dot */
.notif-pulse {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #f97316;
  animation: pulse-ring 1.8s ease-out infinite;
}

@keyframes pulse-ring {
  0%   { opacity: 0.7; transform: scale(1); }
  70%  { opacity: 0;   transform: scale(2.2); }
  100% { opacity: 0;   transform: scale(2.2); }
}

/* ════════════════════════════════════════
   Popup Dropdown
════════════════════════════════════════ */
.notif-popup {
  position: absolute;
  top: calc(100% + 14px);
  right: -8px;
  width: 360px;
  background: #1a2235;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 18px;
  box-shadow:
    0 20px 60px rgba(0,0,0,0.5),
    0 0 0 1px rgba(255,255,255,0.05),
    inset 0 1px 0 rgba(255,255,255,0.08);
  overflow: hidden;
  z-index: 200;
}

/* Arrow caret pointing up */
.notif-arrow {
  position: absolute;
  top: -7px;
  right: 20px;
  width: 14px;
  height: 14px;
  background: #1a2235;
  border-top: 1px solid rgba(255,255,255,0.1);
  border-left: 1px solid rgba(255,255,255,0.1);
  transform: rotate(45deg);
  border-radius: 3px 0 0 0;
}

/* ── Popup Header ── */
.notif-popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 12px;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}

.notif-popup-title-row {
  display: flex;
  align-items: center;
  gap: 7px;
}

.notif-popup-icon {
  font-size: 18px;
  color: #60a5fa;
  background: rgba(96,165,250,0.15);
  width: 32px;
  height: 32px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.notif-popup-title {
  font-size: 14px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.02em;
}

.notif-popup-badge {
  font-size: 10.5px;
  font-weight: 800;
  padding: 3px 10px;
  border-radius: 99px;
  background: rgba(239,68,68,0.2);
  color: #fca5a5;
  border: 1px solid rgba(239,68,68,0.3);
  letter-spacing: 0.02em;
}

/* ── Notification List ── */
.notif-popup-list {
  padding: 8px 8px 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.notif-popup-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 10px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.15s;
  animation: popItemIn 0.2s ease both;
}

.notif-popup-item:hover {
  background: rgba(255,255,255,0.06);
}

@keyframes popItemIn {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}

.notif-popup-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 5px;
  box-shadow: 0 0 6px currentColor;
}

.notif-popup-content { flex: 1; min-width: 0; }

.notif-popup-level-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  margin-bottom: 4px;
}

.notif-popup-level {
  font-size: 9px;
  font-weight: 800;
  padding: 1px 7px;
  border-radius: 99px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

/* Override bg/color classes for dark popup context */
.notif-popup-level.bg-blue-50   { background: rgba(59,130,246,0.2) !important; }
.notif-popup-level.text-blue-700{ color: #93c5fd !important; }
.notif-popup-level.bg-orange-50 { background: rgba(249,115,22,0.2) !important; }
.notif-popup-level.text-orange-700 { color: #fdba74 !important; }
.notif-popup-level.bg-green-50  { background: rgba(34,197,94,0.2) !important; }
.notif-popup-level.text-green-700 { color: #86efac !important; }
.notif-popup-level.bg-purple-50 { background: rgba(168,85,247,0.2) !important; }
.notif-popup-level.text-purple-700 { color: #d8b4fe !important; }

.notif-popup-time {
  font-size: 10px;
  color: rgba(255,255,255,0.35);
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
}

.notif-popup-text {
  font-size: 12.5px;
  font-weight: 600;
  color: rgba(255,255,255,0.88);
  margin: 0 0 2px;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.notif-popup-desc {
  font-size: 11.5px;
  color: rgba(255,255,255,0.45);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Approval Mini Section ── */
.notif-popup-approval-header {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 18px 6px;
  font-size: 10.5px;
  font-weight: 800;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border-top: 1px solid rgba(255,255,255,0.07);
}

.notif-popup-approval-count {
  margin-left: auto;
  background: rgba(245,158,11,0.2);
  color: #fcd34d;
  font-size: 10px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 99px;
  border: 1px solid rgba(245,158,11,0.3);
}

.notif-popup-approval-mini {
  padding: 4px 8px 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.notif-popup-approval-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s;
}
.notif-popup-approval-item:hover { background: rgba(255,255,255,0.05); }

.notif-popup-avatar {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  flex-shrink: 0;
}

/* Avatar bg/color override for dark popup */
.notif-popup-avatar.bg-pink-100  { background: rgba(236,72,153,0.2) !important; }
.notif-popup-avatar.text-pink-600 { color: #f9a8d4 !important; }
.notif-popup-avatar.bg-indigo-100 { background: rgba(99,102,241,0.2) !important; }
.notif-popup-avatar.text-indigo-600 { color: #a5b4fc !important; }
.notif-popup-avatar.bg-green-100  { background: rgba(34,197,94,0.2) !important; }
.notif-popup-avatar.text-green-600 { color: #86efac !important; }
.notif-popup-avatar.bg-amber-100  { background: rgba(245,158,11,0.2) !important; }
.notif-popup-avatar.text-amber-600 { color: #fcd34d !important; }
.notif-popup-avatar.bg-teal-100   { background: rgba(20,184,166,0.2) !important; }
.notif-popup-avatar.text-teal-600  { color: #5eead4 !important; }
.notif-popup-avatar.bg-purple-100 { background: rgba(168,85,247,0.2) !important; }
.notif-popup-avatar.text-purple-600{ color: #d8b4fe !important; }

.notif-popup-approval-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.notif-popup-approval-name {
  font-size: 12px;
  font-weight: 700;
  color: rgba(255,255,255,0.85);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.notif-popup-approval-title {
  font-size: 11px;
  color: rgba(255,255,255,0.4);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.notif-popup-urgent {
  font-size: 9px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 99px;
  background: rgba(239,68,68,0.2);
  color: #fca5a5;
  border: 1px solid rgba(239,68,68,0.3);
  flex-shrink: 0;
  letter-spacing: 0.04em;
}

/* ── Footer ── */
.notif-popup-footer {
  padding: 10px 12px 12px;
  border-top: 1px solid rgba(255,255,255,0.07);
}

.notif-popup-view-all {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 10px 16px;
  border-radius: 11px;
  border: none;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: #fff;
  font-size: 12.5px;
  font-weight: 800;
  cursor: pointer;
  font-family: inherit;
  letter-spacing: 0.01em;
  transition: all 0.18s;
  box-shadow: 0 4px 14px rgba(37,99,235,0.4);
}
.notif-popup-view-all:hover {
  background: linear-gradient(135deg, #1d4ed8, #1e40af);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(37,99,235,0.5);
}

/* ── Dropdown Transition ── */
.notif-drop-enter-active {
  transition: all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.notif-drop-leave-active {
  transition: all 0.15s ease-in;
}
.notif-drop-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.96);
  transform-origin: top right;
}
.notif-drop-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
  transform-origin: top right;
}
</style>
