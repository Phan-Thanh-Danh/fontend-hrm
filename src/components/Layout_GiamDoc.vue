<template>
  <div class="min-h-screen font-[Roboto,Inter,sans-serif] bg-slate-50 text-slate-800 transition-colors duration-300">
    <!-- Topbar -->
    <header class="h-16 bg-[#161c2d] flex items-center justify-between px-6 shadow-md fixed top-0 left-0 right-0 z-50">
      
      <!-- Logo Left -->
      <router-link to="/giam-doc" class="flex items-center gap-2.5 ml-1 cursor-pointer hover:opacity-90 transition-opacity">
        <div
          class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md"
          style="background:linear-gradient(135deg,oklch(0.52 0.22 265),oklch(0.45 0.19 295));box-shadow:0 2px 8px oklch(0.48 0.195 265 / 0.35)"
        >
          <span class="material-symbols-rounded text-white" style="font-size:24px;font-variation-settings:'FILL' 1,'wght' 600,'GRAD' 0,'opsz' 20">corporate_fare</span>
        </div>
        <div class="flex flex-col ml-1">
          <span class="text-white font-bold text-lg tracking-wide leading-tight">HRM Portal</span>
          <span class="text-white/70 text-[10px] uppercase tracking-[0.2em] font-semibold leading-none">Portal Cao Cấp</span>
        </div>
      </router-link>

      <!-- Right Actions -->
      <div class="flex items-center gap-5">
        <!-- Search input -->
        <div class="relative hidden mx-4 md:block">
          <span class="material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">search</span>
          <input
            type="text"
            placeholder="Tìm kiếm báo cáo, nhân sự..."
            class="pl-10 pr-4 py-2 w-72 rounded-full bg-[#1e2536] text-sm text-white placeholder-gray-400 border-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
          />
        </div>

        <!-- ── Dark Mode M3 Switch ── -->
        <div class="mx-2 flex items-center gap-1.5 hidden sm:flex">
          <span
            class="material-symbols-rounded transition-all duration-300"
            style="font-size:18px;font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 20"
            :class="isDark
              ? 'text-white/40 opacity-40 scale-90'
              : 'text-yellow-400 opacity-100 scale-100'"
          >light_mode</span>

          <button
            role="switch"
            :aria-checked="isDark"
            @click="isDark = !isDark"
            class="relative w-[48px] h-7 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 bg-[#1e2536] border border-white/20 shadow-inner"
            :class="isDark ? 'bg-[#0f172a] ring-2 ring-white/10' : ''"
          >
            <span
              class="absolute top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]"
              :class="isDark
                ? 'left-[calc(100%-24px)] w-5 h-5 bg-white border border-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]'
                : 'left-1 w-4 h-4 bg-white/70'"
            >
              <span
                class="material-symbols-rounded transition-all duration-200"
                style="font-size:11px;font-variation-settings:'FILL' 1"
                :class="isDark ? 'text-blue-500' : 'text-[#1e2536]'"
              >{{ isDark ? 'dark_mode' : 'light_mode' }}</span>
            </span>
          </button>

          <span
            class="material-symbols-rounded transition-all duration-300"
            style="font-size:18px;font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 20"
            :class="isDark
              ? 'text-blue-500 opacity-100 scale-100'
              : 'text-white/40 opacity-40 scale-90'"
          >dark_mode</span>
        </div>

        <!-- Icons -->
        <div class="flex items-center gap-3">
          <button class="w-9 h-9 flex items-center justify-center rounded-full bg-[#1e2536] text-white/80 relative hover:bg-[#283144] hover:text-white transition-colors">
            <span class="material-symbols-rounded text-[20px]">notifications</span>
            <span class="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-orange-500 ring-2 ring-[#161c2d]"></span>
          </button>
          <button class="w-9 h-9 flex items-center justify-center rounded-full bg-[#1e2536] text-white/80 hover:bg-[#283144] hover:text-white transition-colors">
            <span class="material-symbols-rounded text-[20px]">settings</span>
          </button>
        </div>

        <div class="w-px h-8 bg-white/10 hidden md:block"></div>

        <!-- User Profile -->
        <div class="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-1.5 -mr-1.5 rounded-xl transition-colors" @click="$router.push('/giam-doc/ho-so')">
          <div class="flex flex-col text-right hidden sm:flex">
            <span class="text-white font-semibold text-sm leading-tight">Nguyễn Minh Triết</span>
            <span class="text-white/60 text-xs font-medium mt-0.5">Tổng Giám Đốc</span>
          </div>
          <div class="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500/20 border border-blue-500/30 overflow-hidden shrink-0 relative">
            <span class="text-blue-400 font-bold text-sm">T</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="pt-16 min-h-screen overflow-hidden px-6 lg:px-8">
      <router-view v-slot="{ Component }">
        <transition :name="transitionName" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isDark = ref(false);

// ── Transition Logic ───────────────────────────────────────────────────────
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
</script>

<style scoped>
/* Page Transitions */
.slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
