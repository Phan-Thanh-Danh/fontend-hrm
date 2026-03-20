<template>
  <div class="space-y-4 pb-6">
    <!-- Header Area: Executive Styling -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left px-1">
      <div class="bg-transparent text-left">
        <h1 class="text-xl font-bold text-[var(--sys-text-primary)] mb-0.5 tracking-tight uppercase italic">Theo dõi Tuyển dụng Phòng ban</h1>
        <p class="text-[13px] text-[var(--sys-text-secondary)] opacity-100 italic flex items-center gap-3">
          Giám sát tiến độ các chiến dịch tuyển mộ nhân tài khối IT.
          <span class="px-2 py-0.5 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-md border border-[var(--sys-brand-border)] text-[9px] font-black uppercase tracking-widest italic shadow-sm">MONITORING MODE</span>
        </p>
      </div>
    </div>

    <!-- Active Job Postings: Premium Card Style -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div v-for="job in jobs" :key="job.id" 
        class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col group hover:border-[var(--sys-brand-solid)] transition-all hover:shadow-[0_8px_20px_-8px_oklch(0_0_0/0.12)]">
        <div class="p-6 space-y-5">
          <div class="flex justify-between items-start">
            <div class="space-y-1">
              <h4 class="text-[15px] font-bold text-[var(--sys-text-primary)] m-0 uppercase italic tracking-tight group-hover:text-[var(--sys-brand-solid)] transition-colors">{{ job.title }}</h4>
              <p class="text-[11px] font-black text-[var(--sys-brand-solid)] uppercase tracking-[0.12em] opacity-80 italic leading-none">{{ job.code }} <span class="mx-2 opacity-30 text-slate-400">|</span> Mức lương: {{ job.salary }}</p>
            </div>
            <div :class="['px-3 py-1.5 rounded-md bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] font-black text-[10px] uppercase border shadow-sm tracking-widest italic transition-all', job.status === 'Đang mở' ? 'border-[var(--sys-success-border)]' : 'bg-[var(--sys-bg-page)] text-[var(--sys-text-disabled)] border-[var(--sys-border-subtle)] opacity-60']">
              {{ job.status }}
            </div>
          </div>

          <!-- Progress Visualization: Executive Layout -->
          <div class="grid grid-cols-4 gap-4 py-5 border-t border-b border-[var(--sys-border-subtle)] border-dashed border-t-2 border-b-2">
            <div class="text-center space-y-1.5 border-r border-[var(--sys-border-subtle)] border-dashed last:border-0">
              <p class="text-[9px] font-black text-[var(--sys-text-secondary)] uppercase opacity-50 tracking-widest">ỨNG TUYỂN</p>
              <p class="text-[18px] font-black italic leading-none">{{ job.applied }}</p>
            </div>
            <div class="text-center space-y-1.5 border-r border-[var(--sys-border-subtle)] border-dashed last:border-0">
              <p class="text-[9px] font-black text-[var(--sys-text-secondary)] uppercase opacity-50 tracking-widest">SÀNG LỌC</p>
              <p class="text-[18px] font-black italic text-indigo-600 leading-none">{{ job.screening }}</p>
            </div>
            <div class="text-center space-y-1.5 border-r border-[var(--sys-border-subtle)] border-dashed last:border-0">
              <p class="text-[9px] font-black text-[var(--sys-text-secondary)] uppercase opacity-50 tracking-widest">PHỎNG VẤN</p>
              <p class="text-[18px] font-black italic text-violet-600 leading-none">{{ job.interviewing }}</p>
            </div>
            <div class="text-center space-y-1.5">
              <p class="text-[9px] font-black text-[var(--sys-text-secondary)] uppercase opacity-50 tracking-widest">TUYỂN THÀNH CÔNG</p>
              <p class="text-[18px] font-black italic text-[var(--sys-success-text)] leading-none">{{ job.hired }}</p>
            </div>
          </div>

          <div class="flex items-center gap-4 pt-1">
            <div class="flex -space-x-3 overflow-hidden">
               <div v-for="i in 3" :key="i" class="inline-block h-8 w-8 rounded-md border-2 border-white bg-gradient-to-br from-[var(--sys-bg-page)] to-[var(--sys-bg-hover)] flex items-center justify-center font-black text-[10px] uppercase italic text-[var(--sys-brand-solid)] shadow-sm border border-[var(--sys-brand-border)]">A{{ i }}</div>
            </div>
            <span class="text-[11px] font-bold text-[var(--sys-text-secondary)] italic opacity-60">Và 12 ứng viên tiềm năng đang chờ phản hồi...</span>
          </div>
        </div>
        
        <div class="px-5 py-3.5 bg-[var(--sys-bg-page)]/30 border-t border-[var(--sys-border-subtle)] flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span class="text-[10px] font-black text-[var(--sys-text-disabled)] uppercase tracking-widest italic leading-none">Job Created: {{ job.createdAt }}</span>
          <button class="text-[10px] font-black text-[var(--sys-brand-solid)] uppercase tracking-widest hover:underline italic flex items-center gap-2">
            CHI TIẾT ỨNG VIÊN
            <span class="material-symbols-outlined text-[16px]">trending_flat</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const jobs = ref([
  { id: 1, title: 'SENIOR VUE DEVELOPER', code: 'IT-2401', status: 'Đang mở', salary: '20M - 35M', applied: 85, screening: 12, interviewing: 4, hired: 0, createdAt: '10/03/2026' },
  { id: 2, title: 'BACKEND NODE.JS ENGINEER', code: 'IT-2402', status: 'Đang mở', salary: '25M - 40M', applied: 42, screening: 8, interviewing: 2, hired: 1, createdAt: '12/03/2026' },
])
</script>

<style scoped>
* { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
</style>
