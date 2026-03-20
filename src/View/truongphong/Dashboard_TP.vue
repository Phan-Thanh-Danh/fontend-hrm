<template>
  <div class="space-y-4 pb-6">
    <!-- Header Area: Synced Font Style -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left px-1">
      <div class="bg-transparent text-left">
        <h1 class="text-xl font-bold text-[var(--sys-text-primary)] mb-0.5 tracking-tight uppercase italic">Điều hành Tổng quan Phòng ban</h1>
        <p class="text-[13px] text-[var(--sys-text-secondary)] opacity-100 italic">Số liệu thống kê nhân sự và hiệu suất vận hành thời gian thực.</p>
      </div>
      <div class="flex items-center gap-2">
        <div class="px-3 py-1.5 bg-[var(--sys-brand-soft)] rounded-md border border-[var(--sys-brand-border)] text-[var(--sys-brand-solid)] font-black text-[10px] uppercase tracking-widest italic animate-pulse">
          IT DEPARTMENT LIVE
        </div>
      </div>
    </div>

    <!-- Quick Stats Grid: Premium Executive Font -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="stat in stats" :key="stat.label" 
        class="bg-[var(--sys-bg-surface)] p-5 rounded-lg border border-[var(--sys-border-subtle)] shadow-sm hover:shadow-[0_4px_12px_-4px_oklch(0_0_0/0.1)] transition-all flex items-center gap-5 group cursor-default">
        <div :class="['w-12 h-12 rounded-md', stat.bg, stat.color, 'flex items-center justify-center shrink-0 border', stat.border, 'group-hover:scale-110 transition-all duration-300 shadow-sm']">
          <span class="material-symbols-outlined text-[24px] font-bold">{{ stat.icon }}</span>
        </div>
        <div class="flex flex-col min-w-0">
          <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-[0.12em] mb-1.5 opacity-60 whitespace-nowrap">{{ stat.label }}</p>
          <h3 class="text-2xl font-black text-[var(--sys-text-primary)] leading-none italic tracking-tight whitespace-nowrap">{{ stat.value }}</h3>
        </div>
      </div>
    </div>

    <!-- Main Content Split -->
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
      
      <!-- Center Column: Approvals & Activity -->
      <div class="xl:col-span-8 space-y-5">
        <!-- Attendance Performance -->
        <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col min-h-[380px]">
          <div class="px-5 py-3.5 border-b border-[var(--sys-border-subtle)] flex justify-between items-center bg-[var(--sys-bg-page)]/30">
            <h3 class="text-[12px] font-bold text-[var(--sys-text-primary)] uppercase tracking-[0.12em] m-0 flex items-center gap-2.5 italic">
              <div class="w-8 h-8 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border border-[var(--sys-brand-border)] flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[20px]">analytics</span>
              </div>
              CHỈ SỐ CHUYÊN CẦN TUẦN
            </h3>
            <button class="text-[10px] font-black text-[var(--sys-brand-solid)] uppercase tracking-widest italic hover:underline">Xem báo cáo bộ phận</button>
          </div>
          <div class="p-8 flex-grow flex items-end gap-3 justify-between bg-transparent">
            <div v-for="h in [65, 80, 45, 90, 85, 40, 75]" :key="h" class="flex-1 flex flex-col items-center gap-3">
              <div :style="`height: ${h}%`" :class="`w-full max-w-[45px] rounded-md transition-all duration-1000 ${h < 50 ? 'bg-[var(--sys-danger-solid)]' : 'bg-[var(--sys-brand-solid)]'} opacity-80 hover:opacity-100 shadow-sm border border-white/10 hover:scale-105 transition-transform cursor-pointer`"></div>
              <span class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase opacity-60 tracking-wider">T{{ [2,3,4,5,6,7,'CN'][h%7] }}</span>
            </div>
          </div>
        </div>

        <!-- Approvals List -->
        <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden">
          <div class="px-5 py-3.5 border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/30">
            <h3 class="text-[12px] font-bold text-[var(--sys-text-primary)] uppercase tracking-[0.12em] m-0 flex items-center gap-2.5 italic">
              <div class="w-8 h-8 rounded-md bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border border-[var(--sys-warning-border)] flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[20px]">pending_actions</span>
              </div>
              YÊU CẦU CHỜ PHÊ DUYỆT ({{ pendingItems.length }})
            </h3>
          </div>
          <div class="divide-y divide-[var(--sys-border-subtle)]">
            <div v-for="item in pendingItems" :key="item.id" class="p-4 hover:bg-[var(--sys-bg-hover)] transition-all flex items-center justify-between group">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-md bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] flex items-center justify-center font-black text-xs text-[var(--sys-brand-solid)] italic shadow-sm">
                  {{ item.name.charAt(0) }}
                </div>
                <div>
                  <h4 class="text-[13.5px] font-bold text-[var(--sys-text-primary)] m-0 uppercase italic tracking-tight group-hover:text-[var(--sys-brand-solid)] transition-colors">{{ item.name }}</h4>
                  <p class="text-[11px] font-medium text-[var(--sys-text-secondary)] m-0 italic flex items-center gap-2 opacity-70">
                    {{ item.type }} <span class="w-1 h-1 rounded-full bg-[var(--sys-border)]"></span> {{ item.date }}
                  </p>
                </div>
              </div>
              <div class="flex gap-2">
                <button class="h-8 px-4 rounded-md bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] font-black text-[10px] uppercase tracking-widest hover:bg-[var(--sys-success-solid)] hover:text-white transition-all shadow-sm">DUYỆT</button>
                <button class="h-8 px-4 rounded-md bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] font-black text-[10px] uppercase tracking-widest hover:bg-[var(--sys-danger-solid)] hover:text-white transition-all shadow-sm">HỦY</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Dept Information -->
      <div class="xl:col-span-4 space-y-5">
        <!-- Dept Identity -->
        <div class="bg-gradient-to-br from-[var(--sys-brand-solid)] via-indigo-700 to-violet-800 text-white p-6 rounded-lg shadow-xl relative overflow-hidden group">
          <span class="material-symbols-outlined absolute -right-4 -bottom-4 text-[140px] opacity-10 rotate-12 transition-transform duration-700 group-hover:rotate-0 group-hover:scale-110">schema</span>
          <div class="relative z-10 space-y-4 text-left">
            <h4 class="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 m-0">TRƯỞNG ĐƠN VỊ</h4>
            <h2 class="text-2xl font-black uppercase italic m-0 tracking-tighter leading-none">KỸ THUẬT VÀ <br/>CÔNG NGHỆ</h2>
            
            <div class="pt-6 border-t border-white/20 grid grid-cols-2 gap-4">
              <div class="bg-white/5 p-3 rounded-md border border-white/10">
                <p class="text-[9px] font-black uppercase mb-1 opacity-60 tracking-widest leading-none">Nhân sự (TP)</p>
                <p class="text-xl font-black italic m-0">24 <span class="text-xs opacity-50">/ 25</span></p>
              </div>
              <div class="bg-white/5 p-3 rounded-md border border-white/10">
                <p class="text-[9px] font-black uppercase mb-1 opacity-60 tracking-widest leading-none">Quỹ lương</p>
                <p class="text-xl font-black italic m-0">850 <span class="text-xs opacity-50">TR</span></p>
              </div>
            </div>
          </div>
        </div>

        <!-- Department Goals -->
        <div class="bg-[var(--sys-bg-surface)] p-6 rounded-lg border border-[var(--sys-border-subtle)] shadow-sm space-y-5">
          <h3 class="text-[12px] font-bold text-[var(--sys-text-primary)] uppercase tracking-[0.12em] m-0 flex items-center gap-2.5 italic">
            <div class="w-8 h-8 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border border-[var(--sys-brand-border)] flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[20px]">equalizer</span>
            </div>
            KPI VẬN HÀNH THÁNG 3
          </h3>
          <div v-for="p in projects" :key="p.name" class="space-y-2">
            <div class="flex justify-between items-center bg-transparent">
              <span class="text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-wider">{{ p.name }}</span>
              <span class="text-[11px] font-black text-[var(--sys-brand-solid)] italic">{{ p.progress }}%</span>
            </div>
            <div class="w-full h-1.5 bg-[oklch(0.96_0.01_260)] rounded-full overflow-hidden border border-[var(--sys-border-subtle)] p-[1px]">
              <div :style="`width: ${p.progress}%`" class="h-full bg-gradient-to-r from-[var(--sys-brand-solid)] to-indigo-500 rounded-full transition-all duration-1000 shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref([
  { label: 'TỔNG NHÂN SỰ', value: '24', icon: 'groups', bg: 'bg-[var(--sys-brand-soft)]', color: 'text-[var(--sys-brand-solid)]', border: 'border-[var(--sys-brand-border)]' },
  { label: 'ĐI MUỘN HÔM NAY', value: '02', icon: 'history_toggle_off', bg: 'bg-[var(--sys-warning-soft)]', color: 'text-[var(--sys-warning-text)]', border: 'border-[var(--sys-warning-border)]' },
  { label: 'YÊU CẦU CHỜ DUYỆT', value: '05', icon: 'approval', bg: 'bg-[var(--sys-success-soft)]', color: 'text-[var(--sys-success-text)]', border: 'border-[var(--sys-success-border)]' },
  { label: 'TUYỂN DỤNG MỚI', value: '03', icon: 'hail', bg: 'bg-[var(--sys-bg-page)]', color: 'text-[var(--sys-text-primary)]', border: 'border-[var(--sys-border-strong)]' },
])

const pendingItems = ref([
  { id: 1, name: 'Nguyễn Văn Đạt', type: 'Đơn xin nghỉ phép', date: '19/03/2026' },
  { id: 2, name: 'Lê Thị Thu', type: 'Đơn giải trình chấm công', date: '18/03/2026' },
  { id: 3, name: 'Trần Minh Quân', type: 'Yêu cầu thiết bị mới', date: '20/03/2026' },
])

const projects = ref([
  { name: 'Migration Vue 3 System', progress: 85 },
  { name: 'Hoàn thiện HR Portal', progress: 92 },
  { name: 'Tối ưu hiệu năng Dashboard', progress: 60 },
])
</script>

<style scoped>
/* Sub-pixel text rendering for premium feel */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
