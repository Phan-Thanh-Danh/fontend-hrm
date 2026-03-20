<template>
  <div class="space-y-4 pb-6">
    <!-- Header Area: Synced Brand Feel -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left px-1">
      <div class="bg-transparent text-left">
        <h1 class="text-xl font-bold text-[var(--sys-text-primary)] mb-0.5 tracking-tight uppercase italic">Quản lý Nhân sự Phòng ban</h1>
        <p class="text-[13px] text-[var(--sys-text-secondary)] opacity-100 italic flex items-center gap-3">
          Danh sách thành viên chính thức thuộc khối Kỹ thuật & Công nghệ IT. 
          <span class="px-2 py-0.5 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-md border border-[var(--sys-brand-border)] text-[9px] font-black uppercase tracking-widest italic shadow-sm">VIEW ONLY MODE</span>
        </p>
      </div>
    </div>

    <!-- Filters: Compact and Professional -->
    <div class="bg-[var(--sys-bg-surface)] p-3.5 rounded-lg border border-[var(--sys-border-subtle)] shadow-sm flex flex-col md:flex-row gap-4 items-center">
      <div class="flex-1 relative w-full group">
        <div class="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center shrink-0 border border-[var(--sys-brand-border)] transition-all duration-300">
          <span class="material-symbols-outlined text-[18px] font-bold">search</span>
        </div>
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Tìm kiếm danh tính, chức danh nghiệp vụ..." 
          class="w-full h-11 pl-12 pr-4 bg-[var(--sys-bg-page)]/50 border border-[var(--sys-border-strong)] rounded-md text-[13px] font-bold text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm transition-all italic placeholder:text-slate-400"
        >
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <Dropdown v-model="filterStatus" :options="statusOptions" class="min-w-[160px] h-11 italic shadow-sm" />
      </div>
    </div>

    <!-- Employee Grid: Premium Card Style -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      <div v-for="staff in filteredStaff" :key="staff.id" 
        class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col group hover:border-[var(--sys-brand-solid)] transition-all hover:shadow-[0_8px_20px_-8px_oklch(0_0_0/0.12)]">
        <!-- Card Indicator -->
        <div class="h-1.5 bg-gradient-to-r from-[var(--sys-brand-solid)] to-indigo-500"></div>
        
        <div class="p-5 flex flex-col items-center text-center space-y-4">
          <div class="relative">
            <div class="w-16 h-16 rounded-md bg-[var(--sys-bg-page)] border-2 border-[var(--sys-border-subtle)] flex items-center justify-center font-black text-xl text-[var(--sys-brand-solid)] uppercase italic group-hover:scale-105 transition-transform shadow-inner">
              {{ staff.name.charAt(0) }}
            </div>
            <span :class="['absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full shadow-sm', staff.status === 'Active' ? 'bg-[var(--sys-success-solid)]' : 'bg-[var(--sys-warning-solid)]']"></span>
          </div>
          
          <div class="space-y-1">
            <h4 class="text-[13.5px] font-bold text-[var(--sys-text-primary)] m-0 uppercase italic tracking-tight transition-colors group-hover:text-[var(--sys-brand-solid)]">{{ staff.name }}</h4>
            <p class="text-[10px] font-black text-[var(--sys-brand-solid)] uppercase tracking-[0.15em] opacity-80 leading-none">{{ staff.position }}</p>
          </div>
          
          <div class="w-full grid grid-cols-2 gap-3 pt-4 border-t border-[var(--sys-border-subtle)] border-dashed border-t-2">
            <div class="text-left space-y-0.5">
              <p class="text-[9px] font-black text-[var(--sys-text-secondary)] uppercase opacity-50 tracking-widest">ID CODE</p>
              <p class="text-[12.5px] font-black text-[var(--sys-text-primary)] italic">#{{ staff.id }}</p>
            </div>
            <div class="text-left space-y-0.5">
              <p class="text-[9px] font-black text-[var(--sys-text-secondary)] uppercase opacity-50 tracking-widest">JOIN DATE</p>
              <p class="text-[12.5px] font-black text-[var(--sys-text-primary)] italic">{{ staff.joinDate }}</p>
            </div>
          </div>
        </div>

        <!-- Action Footer -->
        <div class="px-4 py-2.5 bg-[var(--sys-bg-page)]/30 border-t border-[var(--sys-border-subtle)] flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-wide italic">Status: {{ staff.status }}</span>
          <button class="text-[10px] font-black text-[var(--sys-brand-solid)] uppercase hover:underline tracking-widest italic flex items-center gap-1.5 transition-all active:scale-95">
            Chi tiết hồ sơ
            <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Dropdown from '@/components/Dropdown.vue'

const searchQuery = ref('')
const filterStatus = ref('')

const statusOptions = [
  { label: 'Tất cả trạng thái', value: '' },
  { label: 'Đang làm việc', value: 'Active' },
  { label: 'Nghi nghỉ phép', value: 'On Leave' },
]

const staffList = ref([
  { id: '1023', name: 'Nguyễn Văn Anh', position: 'SENIOR DEVELOPER', status: 'Active', joinDate: '01/01/2021' },
  { id: '1025', name: 'Lê Diệu Linh', position: 'FRONTEND DEVELOPER', status: 'Active', joinDate: '15/03/2022' },
  { id: '1030', name: 'Trần Minh Hải', position: 'UI/UX DESIGNER', status: 'On Leave', joinDate: '10/06/2022' },
  { id: '1042', name: 'Vũ Minh Đăng', position: 'BACKEND LEAD', status: 'Active', joinDate: '01/09/2021' },
  { id: '1055', name: 'Phạm Hồng Nhung', position: 'BUSINESS ANALYST', status: 'Active', joinDate: '20/12/2022' },
])

const filteredStaff = computed(() => {
  return staffList.value.filter(s => {
    const q = searchQuery.value.toLowerCase()
    const matchesQuery = s.name.toLowerCase().includes(q) || s.position.toLowerCase().includes(q)
    const matchesStatus = !filterStatus.value || s.status === filterStatus.value
    return matchesQuery && matchesStatus
  })
})
</script>

<style scoped>
/* Sub-pixel text rendering for premium feel */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
