<template>
  <div class="space-y-6 pb-10">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-black text-[var(--sys-text-primary)] tracking-tight">Dashboard Tổng quan</h1>
      <p class="text-[var(--sys-text-secondary)] text-sm font-medium italic opacity-70">Chào mừng trở lại! Dưới đây là tóm tắt hoạt động nhân sự và tình hình hệ thống hôm nay.</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <!-- Card 1 -->
      <div class="bg-[var(--sys-bg-surface)] p-6 rounded-[2rem] border border-[var(--sys-border-subtle)] shadow-sm hover:shadow-xl transition-all duration-300 group">
        <div class="flex justify-between mb-4">
          <div class="w-14 h-14 rounded-2xl bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
            <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">groups</span>
          </div>
          <span class="h-fit px-3 py-1 bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] rounded-full text-[10px] font-black uppercase tracking-widest">+2%</span>
        </div>
        <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] mb-1 italic opacity-60">Tổng nhân viên</p>
        <h2 class="text-3xl font-black text-[var(--sys-text-primary)] tracking-tight mb-1">1,250</h2>
        <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] italic">So với tháng trước</p>
      </div>

      <!-- Card 2 -->
      <div class="bg-[var(--sys-bg-surface)] p-6 rounded-[2rem] border border-[var(--sys-border-subtle)] shadow-sm hover:shadow-xl transition-all duration-300 group">
        <div class="flex justify-between mb-4">
          <div class="w-14 h-14 rounded-2xl bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
            <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">person_add</span>
          </div>
          <span class="h-fit px-3 py-1 bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] rounded-full text-[10px] font-black uppercase tracking-widest">Tháng này</span>
        </div>
        <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] mb-1 italic opacity-60">Nhân sự mới</p>
        <h2 class="text-3xl font-black text-[var(--sys-text-primary)] tracking-tight mb-1">45</h2>
        <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] italic">Đang hoàn tất thủ tục</p>
      </div>

      <!-- Card 3 -->
      <div class="bg-[var(--sys-bg-surface)] p-6 rounded-[2rem] border border-[var(--sys-border-subtle)] shadow-sm hover:shadow-xl transition-all duration-300 group">
        <div class="flex justify-between mb-4">
          <div class="w-14 h-14 rounded-2xl bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
            <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">person_remove</span>
          </div>
          <span class="h-fit px-3 py-1 bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] rounded-full text-[10px] font-black uppercase tracking-widest">-12%</span>
        </div>
        <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] mb-1 italic opacity-60">Nhân viên nghỉ việc</p>
        <h2 class="text-3xl font-black text-[var(--sys-text-primary)] tracking-tight mb-1">12</h2>
        <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] italic">Trong 30 ngày qua</p>
      </div>

      <!-- Card 4 -->
      <div class="bg-[var(--sys-bg-surface)] p-6 rounded-[2rem] border border-[var(--sys-border-subtle)] shadow-sm hover:shadow-xl transition-all duration-300 group">
        <div class="flex justify-between mb-4">
          <div class="w-14 h-14 rounded-2xl bg-[var(--sys-brand-solid)] text-white flex items-center justify-center shadow-lg shadow-[var(--sys-brand-solid-lch-30)] group-hover:scale-110 transition-transform">
            <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">assignment</span>
          </div>
          <span class="h-fit px-3 py-1 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-full text-[10px] font-black uppercase tracking-widest">Ưu tiên</span>
        </div>
        <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] mb-1 italic opacity-60">Nghỉ phép chờ duyệt</p>
        <h2 class="text-3xl font-black text-[var(--sys-brand-solid)] tracking-tight mb-1">28</h2>
        <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] italic">Cần xử lý ngay</p>
      </div>
    </div>

    <!-- Charts & Bars -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div class="bg-[var(--sys-bg-surface)] p-8 rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm flex flex-col">
        <div class="flex justify-between items-center mb-10">
          <h5 class="text-lg font-black text-[var(--sys-text-primary)] tracking-tight">Biến động nhân sự</h5>
          <Dropdown 
            v-model="timeRange" 
            :options="timeRangeOptions" 
            class="min-w-[180px]"
          />
        </div>
        
        <!-- Chart placeholder view -->
        <div class="flex items-end justify-between flex-1 border-b border-[var(--sys-border-subtle)] pb-2 relative" style="min-height: 250px;">
          <div class="text-center" v-for="i in 6" :key="i">
            <div class="flex gap-1.5 items-end mx-auto mb-2" style="height: 200px; width: 40px;">
                <div class="w-3.5 bg-[var(--sys-brand-solid)] rounded-t-lg transition-all hover:opacity-80" :style="{ height: Math.floor(Math.random() * 100 + 40) + 'px' }"></div>
                <div class="w-3.5 bg-[var(--sys-brand-soft)] rounded-t-lg transition-all hover:opacity-80" :style="{ height: Math.floor(Math.random() * 60 + 20) + 'px' }"></div>
            </div>
          </div>
        </div>
        <div class="flex justify-between pt-4 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest opacity-60">
          <span>Tháng 1</span>
          <span>Tháng 2</span>
          <span>Tháng 3</span>
          <span>Tháng 4</span>
          <span>Tháng 5</span>
          <span>Tháng 6</span>
        </div>
        
        <div class="flex justify-center gap-6 mt-8">
            <div class="flex items-center gap-2">
                <div class="w-2.5 h-2.5 rounded-full bg-[var(--sys-brand-solid)]"></div>
                <span class="text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-wide">Tuyển mới</span>
            </div>
            <div class="flex items-center gap-2">
                <div class="w-2.5 h-2.5 rounded-full bg-[var(--sys-brand-soft)]"></div>
                <span class="text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-wide">Nghỉ việc</span>
            </div>
        </div>
      </div>

      <div class="bg-[var(--sys-bg-surface)] p-8 rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm flex flex-col">
        <div class="flex justify-between items-center mb-10">
          <h5 class="text-lg font-black text-[var(--sys-text-primary)] tracking-tight">Cơ cấu phòng ban</h5>
          <button class="text-[11px] font-black text-[var(--sys-brand-solid)] uppercase tracking-[0.2em] hover:tracking-[0.3em] transition-all">Xem chi tiết</button>
        </div>

        <div class="flex-1 flex flex-col gap-6">
          <div v-for="(dept, idx) in ['Kỹ thuật', 'Kinh doanh', 'Marketing', 'Nhân sự', 'Kế toán']" :key="idx">
            <div class="flex justify-between mb-2">
              <span class="text-xs font-black text-[var(--sys-text-primary)] uppercase tracking-wide">{{ dept }}</span>
              <span class="text-xs font-bold text-[var(--sys-text-secondary)] italic">{{ [420, 350, 200, 80, 120][idx] }} nhân sự</span>
            </div>
            <div class="h-2 bg-[var(--sys-bg-hover)] rounded-full overflow-hidden border border-[var(--sys-border-subtle)]">
              <div class="h-full rounded-full transition-all duration-1000" 
                   :class="['bg-[var(--sys-brand-solid)]', 'bg-[var(--sys-success-solid)]', 'bg-[var(--sys-warning-solid)]', 'bg-purple-500', 'bg-slate-400'][idx]"
                   :style="{ width: [60, 45, 25, 15, 20][idx] + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col">
      <div class="p-8 border-b border-[var(--sys-border-subtle)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[var(--sys-bg-surface)]">
        <div class="text-left">
          <h5 class="text-lg font-black text-[var(--sys-text-primary)] tracking-tight">Nhắc nhở công việc & Hoạt động</h5>
          <p class="text-xs font-bold text-[var(--sys-text-secondary)] italic opacity-60">Các sự kiện và yêu cầu cần ưu tiên xử lý trong ngày</p>
        </div>
        <div class="flex bg-[var(--sys-bg-hover)] p-1 rounded-2xl border border-[var(--sys-border-subtle)] shadow-inner">
          <button class="px-6 py-2 bg-[var(--sys-bg-surface)] shadow-md rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-[var(--sys-brand-solid)] transition-all">Tất cả</button>
          <button class="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] transition-all">Của tôi</button>
        </div>
      </div>
      
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr>
              <th class="px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Nhân viên / Ứng viên</th>
              <th class="px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Loại công việc</th>
              <th class="px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Thời gian</th>
              <th class="px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Trạng thái</th>
              <th class="px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody class="bg-transparent">
            <tr v-for="(item, idx) in [
              { name: 'Trần Lan Anh', role: 'UI/UX Designer', action: 'Phỏng vấn vòng 2', time: 'Hôm nay, 14:00', status: 'Sắp diễn ra', statusClass: 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]', dotClass: 'bg-[var(--sys-warning-solid)]' },
              { name: 'Quang Huy', role: 'Kỹ thuật viên', action: 'Yêu cầu nghỉ phép (3 ngày)', time: 'Đã gửi 2 giờ trước', status: 'Chờ duyệt', statusClass: 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)]', dotClass: 'bg-[var(--sys-brand-solid)]' }
            ]" :key="idx" class="group transition-all duration-200 bg-transparent hover:bg-[var(--sys-bg-hover)]">
              <td class="px-8 py-6 bg-transparent border-b border-[var(--sys-border-subtle)]">
                <div class="flex flex-col bg-transparent">
                  <span class="text-sm font-black text-[var(--sys-text-primary)] mb-0.5 bg-transparent">{{ item.name }}</span>
                  <span class="text-[10px] font-bold text-[var(--sys-brand-solid)] uppercase tracking-tight bg-transparent">{{ item.role }}</span>
                </div>
              </td>
              <td class="px-8 py-6 text-sm font-black text-[var(--sys-text-primary)] bg-transparent border-b border-[var(--sys-border-subtle)] text-left">{{ item.action }}</td>
              <td class="px-8 py-6 text-xs font-bold text-[var(--sys-text-secondary)] italic bg-transparent border-b border-[var(--sys-border-subtle)] text-left">{{ item.time }}</td>
              <td class="px-8 py-6 bg-transparent border-b border-[var(--sys-border-subtle)] text-left">
                <span :class="`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${item.statusClass}`">
                  <span :class="`w-1.5 h-1.5 rounded-full ${item.dotClass}`"></span>
                  {{ item.status }}
                </span>
              </td>
              <td class="px-8 py-6 text-right bg-transparent border-b border-[var(--sys-border-subtle)]">
                <button class="text-[11px] font-black text-[var(--sys-brand-solid)] uppercase tracking-[0.2em] hover:tracking-[0.3em] transition-all bg-transparent active:scale-95">Bắt đầu</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Dropdown from '@/components/Dropdown.vue';

const timeRange = ref('6months');
const timeRangeOptions = [
  { label: '6 tháng gần nhất', value: '6months' },
  { label: '1 năm gần nhất', value: '1year' },
  { label: 'Toàn bộ thời gian', value: 'all' }
];
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--sys-border-subtle);
  border-radius: 10px;
}
</style>
