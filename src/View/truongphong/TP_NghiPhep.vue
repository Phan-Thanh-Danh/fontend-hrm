<template>
  <div class="space-y-4 pb-6">
    <!-- Header Area: Executive Styling -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left px-1">
      <div class="bg-transparent text-left">
        <h1 class="text-xl font-bold text-[var(--sys-text-primary)] mb-0.5 tracking-tight uppercase italic">Phê duyệt Nghỉ phép Phòng ban</h1>
        <p class="text-[13px] text-[var(--sys-text-secondary)] opacity-100 italic flex items-center gap-3">
          Xử lý các yêu cầu vắng mặt và điều phối nguồn lực nhân sự khối IT.
          <span class="px-2 py-0.5 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded border border-[var(--sys-brand-border)] text-[9px] font-black uppercase tracking-widest italic shadow-sm animate-pulse">PENDING: {{ pendingLeaves.length }}</span>
        </p>
      </div>
    </div>

    <!-- Tabs/Filters: Refined and Spacious -->
    <div class="flex border-b border-[var(--sys-border-subtle)] bg-transparent gap-8 px-1">
      <button 
        v-for="tab in ['Chờ duyệt', 'Đã duyệt', 'Đã từ chối']" :key="tab"
        :class="['pb-3 text-[11px] font-black uppercase tracking-[0.15em] transition-all relative italic h-10 flex items-center', activeTab === tab ? 'text-[var(--sys-brand-solid)]' : 'text-[var(--sys-text-secondary)] opacity-40 hover:opacity-100']"
        @click="activeTab = tab"
      >
        {{ tab }} ({{ tab === 'Chờ duyệt' ? pendingLeaves.length : 0 }})
        <div v-if="activeTab === tab" class="absolute bottom-0 left-0 w-full h-1 bg-[var(--sys-brand-solid)] rounded-full shadow-[0_-2px_6px_var(--sys-brand-soft)]"></div>
      </button>
    </div>

    <!-- Leave Request Grid: Premium Card Style -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch">
      <div v-for="leave in pendingLeaves" :key="leave.id" 
        class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col group hover:border-[var(--sys-brand-solid)] transition-all hover:shadow-[0_8px_20px_-8px_oklch(0_0_0/0.12)]">
        <div class="p-5 flex-grow space-y-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-md bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] flex items-center justify-center font-black text-lg text-[var(--sys-brand-solid)] uppercase italic shadow-inner">
              {{ leave.name.charAt(0) }}
            </div>
            <div class="flex flex-col">
              <h4 class="text-[14px] font-bold text-[var(--sys-text-primary)] m-0 uppercase italic tracking-tight group-hover:text-[var(--sys-brand-solid)] transition-colors">{{ leave.name }}</h4>
              <p class="text-[10px] font-black text-[var(--sys-brand-solid)] uppercase tracking-[0.15em] opacity-80 leading-none">{{ leave.position }}</p>
            </div>
          </div>

          <div class="space-y-3 py-4 border-t border-b border-[var(--sys-border-subtle)] border-dashed border-t-2 border-b-2">
            <div class="flex justify-between items-center text-[12.5px] font-black text-[var(--sys-text-primary)]">
              <span class="opacity-50 uppercase text-[9px] font-black italic tracking-widest text-[var(--sys-text-secondary)]">Thời gian thực tế:</span>
              <span class="italic underline decoration-[var(--sys-brand-soft)] decoration-2 underline-offset-4">{{ leave.range }}</span>
            </div>
            <div class="flex justify-between items-center text-[12.5px] font-black text-[var(--sys-text-primary)]">
              <span class="opacity-50 uppercase text-[9px] font-black italic tracking-widest text-[var(--sys-text-secondary)]">Lý do xin nghỉ:</span>
              <span class="italic text-[var(--sys-text-primary)]">{{ leave.reason }}</span>
            </div>
            <div class="flex justify-between items-center text-[12.5px] font-black text-[var(--sys-text-primary)]">
              <span class="opacity-50 uppercase text-[9px] font-black italic tracking-widest text-[var(--sys-text-secondary)]">Định mức trừ:</span>
              <span class="px-2 py-0.5 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-md font-black text-[11px] italic">{{ leave.days }} ngày công</span>
            </div>
          </div>
        </div>

        <div class="p-3 bg-[var(--sys-bg-page)]/30 px-4 pb-4 flex gap-2">
          <button @click="approve(leave.id)" class="flex-1 h-10 bg-[var(--sys-brand-solid)] text-white rounded-md font-black text-[10px] uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2 italic shadow-md">
            <span class="material-symbols-outlined text-[18px] font-black">check_circle</span> DUYỆT ĐƠN
          </button>
          <button @click="reject(leave.id)" class="flex-1 h-10 border border-[var(--sys-danger-border)] text-[var(--sys-danger-text)] rounded-md font-black text-[10px] uppercase tracking-widest hover:bg-[var(--sys-danger-soft)] transition-all flex items-center justify-center gap-2 italic">
            <span class="material-symbols-outlined text-[18px] font-black">cancel</span> TỪ CHỐI
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('Chờ duyệt')

const pendingLeaves = ref([
  { id: 1, name: 'Nguyễn Văn Đạt', position: 'MOBILE WEB DEV', range: '22/03 - 23/03', days: 2, reason: 'Giải quyết việc gia đình' },
  { id: 2, name: 'Lê Thị Thu', position: 'QA ENGINEER', range: '25/03 - 25/03', days: 1, reason: 'Khám sức khỏe' },
  { id: 3, name: 'Trần Minh Quân', position: 'DEVOPS ENGINEER', range: '28/03 - 30/03', days: 3, reason: 'Nghỉ phép năm' },
])

const approve = (id) => { pendingLeaves.value = pendingLeaves.value.filter(l => l.id !== id) }
const reject = (id) => { pendingLeaves.value = pendingLeaves.value.filter(l => l.id !== id) }
</script>

<style scoped>
* { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
</style>
