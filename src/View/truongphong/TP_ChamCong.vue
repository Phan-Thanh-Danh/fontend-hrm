<template>
  <div class="space-y-4 pb-6">
    <!-- Header Area: Refined for Full Width Experience -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left">
      <div class="bg-transparent text-left">
        <h1 class="text-xl font-bold text-[var(--sys-text-primary)] mb-0.5 tracking-tight uppercase italic">Quản lý Chấm công & Chuyên cần</h1>
        <p class="text-[13px] text-[var(--sys-text-secondary)] opacity-100 italic">Kiểm soát và phê duyệt dữ liệu chuyên cần nhân sự phòng IT.</p>
      </div>
      <div class="flex items-center gap-3 shrink-0">
        <button class="h-11 px-6 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-md font-semibold text-sm border border-[var(--sys-brand-border)] hover:bg-[var(--sys-brand-solid)] hover:text-white transition-all flex items-center gap-2.5 shadow-sm active:scale-95">
          <span class="material-symbols-outlined text-[20px]">cloud_download</span> 
          Xuất dữ liệu công
        </button>
      </div>
    </div>

    <!-- Main Content Container: Refined Harmony -->
    <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-[0_2px_8px_-2px_oklch(0_0_0/0.06)] overflow-hidden flex flex-col">
      <!-- Toolbar: Consistent and Compact -->
      <div class="px-3.5 py-3 border-b border-[var(--sys-border-subtle)] flex flex-col xl:flex-row justify-between items-start xl:items-center gap-3.5 bg-[var(--sys-bg-page)]/20">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center border border-[var(--sys-brand-border)] shadow-sm">
            <span class="material-symbols-outlined text-[24px]">date_range</span>
          </div>
          <div class="bg-transparent text-left">
            <h5 class="text-sm font-bold text-[var(--sys-text-primary)] m-0 leading-none mb-1">BẢNG CÔNG CHI TIẾT</h5>
            <p class="text-[11px] font-medium text-[var(--sys-text-secondary)] m-0 uppercase tracking-widest opacity-60">Tháng {{ selectedMonth }}/{{ selectedYear }}</p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-4 w-full xl:w-auto">
          <div class="flex items-center gap-2">
            <Dropdown v-model="selectedMonth" :options="monthOptions" class="min-w-[160px] h-11 shadow-sm border-[var(--sys-border-subtle)]" />
            <Dropdown v-model="selectedYear" :options="yearOptions" class="min-w-[110px] h-11 shadow-sm border-[var(--sys-border-subtle)]" />
          </div>
          
          <!-- Legend: Balanced and Clear -->
          <div class="h-11 px-5 bg-[var(--sys-bg-surface)] rounded-md border border-[var(--sys-border-subtle)] flex items-center gap-6 shadow-sm overflow-hidden">
            <div class="flex items-center gap-2.5">
              <span class="w-2.5 h-2.5 rounded-full bg-[var(--sys-success-solid)] shadow-[0_0_0_3px_var(--sys-success-soft)]"></span>
              <span class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider">Đúng giờ</span>
            </div>
            <div class="flex items-center gap-2.5">
              <span class="w-2.5 h-2.5 rounded-full bg-[var(--sys-warning-solid)] shadow-[0_0_0_3px_var(--sys-warning-soft)]"></span>
              <span class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider">Đi muộn</span>
            </div>
            <div class="flex items-center gap-2.5">
              <span class="w-2.5 h-2.5 rounded-full bg-[var(--sys-danger-solid)] shadow-[0_0_0_3px_var(--sys-danger-soft)]"></span>
              <span class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider">Vắng mặt</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Attendance Grid: Optimized Cells for Visibility -->
      <div class="overflow-x-auto custom-scrollbar flex-grow bg-white">
        <table class="w-full text-left border-collapse min-w-[1200px]">
          <thead class="bg-[var(--sys-bg-page)]/40">
            <tr>
              <th class="px-6 py-4 text-[12px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-[0.1em] sticky left-0 z-20 bg-[var(--sys-bg-page)] shadow-[2px_0_5px_-2px_var(--sys-bg-active)]">NHÂN SỰ PHÒNG</th>
              <th v-for="d in daysInMonth" :key="d" 
                class="px-1 py-4 text-[11px] font-black text-center border-b border-[var(--sys-border-subtle)] transition-colors"
                :class="isWeekend(d) ? 'bg-[var(--sys-bg-page)] text-[var(--sys-text-disabled)] opacity-60' : 'text-[var(--sys-text-secondary)]'">
                {{ d < 10 ? '0' + d : d }}
              </th>
              <th class="px-6 py-4 text-[12px] font-bold text-right border-b border-[var(--sys-border-subtle)] uppercase tracking-[0.1em] sticky right-0 z-20 bg-[var(--sys-bg-page)] shadow-[-2px_0_5px_-2px_var(--sys-bg-active)]">TỔNG CÔNG</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--sys-border-subtle)]">
            <tr v-for="staff in attendanceList" :key="staff.id" class="group hover:bg-[var(--sys-bg-hover)] transition-all duration-200">
              <!-- Sticky Name Cell -->
              <td class="px-6 py-4 sticky left-0 z-10 bg-[var(--sys-bg-surface)] border-r border-[var(--sys-border-subtle)] group-hover:bg-[var(--sys-bg-hover)] shadow-[2px_0_5px_-2px_var(--sys-bg-active)]">
                <div class="flex items-center gap-4">
                  <div class="w-9 h-9 rounded-md bg-gradient-to-br from-[var(--sys-brand-soft)] to-[var(--sys-brand-soft)]/50 text-[var(--sys-brand-solid)] flex items-center justify-center font-black text-xs uppercase italic border border-[var(--sys-brand-border)]">
                    {{ staff.name.charAt(0) }}
                  </div>
                  <div class="flex flex-col">
                    <span class="text-[13.5px] font-bold text-[var(--sys-text-primary)] leading-none mb-1 group-hover:text-[var(--sys-brand-solid)] transition-colors">{{ staff.name }}</span>
                    <span class="text-[10px] font-bold text-[var(--sys-text-secondary)] opacity-100 items-center flex gap-1.5 uppercase tracking-wider">
                      {{ staff.id }} <span class="w-1 h-1 rounded-full bg-[var(--sys-border)]"></span> {{ staff.dept }}
                    </span>
                  </div>
                </div>
              </td>

              <!-- Status Cells -->
              <td v-for="d in daysInMonth" :key="d" 
                class="px-1 py-3 border-r border-[var(--sys-border-subtle)]/50 text-center transition-colors"
                :class="isWeekend(d) ? 'bg-[var(--sys-bg-page)] opacity-40' : ''">
                <div v-if="!isWeekend(d)" class="flex justify-center h-7 items-center">
                   <div v-if="staff.data[d] === 'on'" class="w-7 h-7 rounded-md flex items-center justify-center font-black text-[10px] bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border border-[var(--sys-success-border)] shadow-sm scale-95 hover:scale-110 transition-transform cursor-help" title="Đúng giờ">✔</div>
                   <div v-if="staff.data[d] === 'late'" class="w-7 h-7 rounded-md flex items-center justify-center font-black text-[10px] bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border border-[var(--sys-warning-border)] shadow-sm scale-95 hover:scale-110 transition-transform cursor-help" title="Đi muộn">M</div>
                   <div v-if="staff.data[d] === 'off'" class="w-7 h-7 rounded-md flex items-center justify-center font-black text-[10px] bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border border-[var(--sys-danger-border)] shadow-sm scale-95 hover:scale-110 transition-transform cursor-help" title="Vắng mặt">V</div>
                   <div v-if="!staff.data[d]" class="w-1.5 h-1.5 rounded-full bg-[var(--sys-border)] opacity-20"></div>
                </div>
                <div v-else class="text-[8px] font-black text-[var(--sys-text-secondary)] uppercase tracking-tighter opacity-70">OFF</div>
              </td>

              <!-- Sticky Total Cell -->
              <td class="px-6 py-4 text-right whitespace-nowrap sticky right-0 z-10 bg-[var(--sys-bg-surface)] border-l border-[var(--sys-border-subtle)] group-hover:bg-[var(--sys-bg-hover)] shadow-[-2px_0_5px_-2px_var(--sys-bg-active)]">
                <div class="flex items-center justify-end gap-2">
                  <span class="text-sm font-black text-[var(--sys-text-primary)] italic">{{ staff.total }}</span>
                  <span class="text-[10px] font-bold text-[var(--sys-text-disabled)] uppercase tracking-widest">/ 22</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer: Refined Compact Spacing -->
      <div class="px-4 py-2.5 bg-[var(--sys-bg-page)]/30 border-t border-[var(--sys-border-subtle)] flex flex-col sm:flex-row justify-between items-center gap-3">
        <div class="flex items-center gap-5">
          <p class="text-[10px] text-[var(--sys-text-secondary)] font-bold italic flex items-center gap-4">
            <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded bg-[var(--sys-success-solid)]"></span> ✔ ĐỦ CÔNG</span>
            <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded bg-[var(--sys-warning-solid)]"></span> M ĐI MUỘN</span>
            <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded bg-[var(--sys-danger-solid)]"></span> V VẮNG MẶT</span>
          </p>
        </div>
        <button class="text-xs font-black uppercase italic tracking-widest text-[var(--sys-brand-solid)] hover:text-indigo-700 transition-colors flex items-center gap-2 group">
          Toàn bộ lịch sử chấm công
          <span class="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">trending_flat</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Dropdown from '@/components/Dropdown.vue'

const selectedMonth = ref('03')
const selectedYear = ref('2026')

const monthOptions = [
  { label: 'Tháng 01', value: '01' },
  { label: 'Tháng 02', value: '02' },
  { label: 'Tháng 03', value: '03' },
  { label: 'Tháng 12', value: '12' },
]

const yearOptions = [
  { label: '2026', value: '2026' },
  { label: '2025', value: '2025' },
]

const daysInMonth = 31

const isWeekend = (day) => {
  const date = new Date(2026, 2, day)
  const d = date.getDay()
  return d === 0 || d === 6
}

const attendanceList = ref([
  { id: '1023', name: 'Nguyễn Văn Anh', dept: 'IT DEVELOPER', total: '21.0', data: { 1: 'on', 2: 'late', 3: 'on', 5: 'off', 6: 'on', 10: 'on', 15: 'on', 20: 'on' } },
  { id: '1025', name: 'Lê Diệu Linh', dept: 'UI/UX LEAD', total: '22.0', data: { 1: 'on', 2: 'on', 3: 'on', 4: 'on', 5: 'on', 6: 'on', 10: 'on', 15: 'late', 20: 'on' } },
  { id: '1030', name: 'Trần Minh Hải', dept: 'DEVOPS ENG', total: '19.5', data: { 1: 'off', 2: 'off', 3: 'on', 4: 'on', 5: 'on', 6: 'on', 10: 'on', 15: 'on', 20: 'on' } },
  { id: '1042', name: 'Phạm Thành Nam', dept: 'BACKEND DEV', total: '21.5', data: { 1: 'on', 2: 'on', 3: 'on', 5: 'on', 6: 'on', 10: 'on', 15: 'on', 20: 'on' } },
  { id: '1105', name: 'Hoàng Kim Yến', dept: 'QA TESTER', total: '22.0', data: { 1: 'on', 2: 'on', 3: 'on', 6: 'on', 7: 'on', 10: 'on' } },
])
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--sys-border-subtle);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--sys-brand-solid);
}

/* Enhancing sticky shadows for harmony */
.sticky {
  transition: background-color 0.2s ease;
}

/* Sub-pixel text rendering for premium feel */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
