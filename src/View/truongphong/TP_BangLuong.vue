<template>
  <div class="space-y-4 pb-6">
    <!-- Header Area: Executive Financial Styling -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left px-1">
      <div class="bg-transparent text-left">
        <h1 class="text-xl font-bold text-[var(--sys-text-primary)] mb-0.5 tracking-tight uppercase italic">Quyết toán Tiền lương Phòng ban</h1>
        <p class="text-[13px] text-[var(--sys-text-secondary)] opacity-100 italic flex items-center gap-3">
          Thống kê chi phí nhân sự và quỹ lương tháng của đơn vị IT.
          <span class="px-2 py-0.5 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-md border border-[var(--sys-brand-border)] text-[9px] font-black uppercase tracking-widest italic shadow-sm">CONFIDENTIAL VIEW</span>
        </p>
      </div>
      <div class="flex items-center gap-3">
        <Dropdown v-model="selectedPeriod" :options="periodOptions" class="min-w-[170px] h-11 italic shadow-sm" />
      </div>
    </div>

    <!-- Summary Stats: Premium Financial Look -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div v-for="stat in quickStats" :key="stat.label" 
        class="bg-[var(--sys-bg-surface)] p-6 rounded-lg border border-[var(--sys-border-subtle)] shadow-sm flex items-center justify-between group hover:border-[var(--sys-brand-solid)] transition-all hover:shadow-[0_8px_20px_-10px_oklch(0_0_0/0.1)]">
        <div>
          <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] mb-1.5 opacity-60 italic">{{ stat.label }}</p>
          <h3 :class="['text-2xl font-black italic leading-none tracking-tight', stat.textClass]">{{ stat.value }}</h3>
        </div>
        <div :class="['w-12 h-12 rounded-md flex items-center justify-center border shadow-sm group-hover:scale-110 transition-transform duration-300', stat.bgClass, stat.colorClass, stat.borderClass]">
          <span class="material-symbols-outlined text-2xl font-bold">{{ stat.icon }}</span>
        </div>
      </div>
    </div>

    <!-- Detailed Payroll Table -->
    <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden">
      <div class="px-5 py-3.5 border-b border-[var(--sys-border-subtle)] flex justify-between items-center bg-[var(--sys-bg-page)]/30">
        <h3 class="text-[12px] font-bold text-[var(--sys-text-primary)] uppercase tracking-[0.12em] m-0 flex items-center gap-2.5 italic">
          <div class="w-8 h-8 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border border-[var(--sys-brand-border)] flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[20px]">assignment_turned_in</span>
          </div>
          BẢNG KÊ CHI TIẾT THU NHẬP
        </h3>
        <button class="text-[10px] font-black text-[var(--sys-brand-solid)] uppercase tracking-widest italic hover:underline">Xuất file báo cáo</button>
      </div>
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse min-w-[1000px]">
          <thead class="bg-[var(--sys-bg-page)]/40">
            <tr>
              <th class="px-6 py-4 text-[12px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-[0.12em] italic">Nhân sự thực hiện</th>
              <th class="px-6 py-4 text-[12px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-[0.12em] italic">Lương cơ bản</th>
              <th class="px-6 py-4 text-[12px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-[0.12em] italic">Phụ cấp & Thưởng</th>
              <th class="px-6 py-4 text-[12px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-[0.12em] italic">Các khoản trừ</th>
              <th class="px-6 py-4 text-[12px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-[0.12em] italic text-right">Tổng thực lĩnh</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--sys-border-subtle)]">
            <tr v-for="staff in payrollList" :key="staff.name" class="hover:bg-[var(--sys-bg-hover)] transition-all duration-200 group">
              <td class="px-6 py-4">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-md bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] flex items-center justify-center font-black text-xs text-[var(--sys-brand-solid)] italic shadow-sm group-hover:bg-[var(--sys-brand-solid)] group-hover:text-white transition-all">
                    {{ staff.name.charAt(0) }}
                  </div>
                  <div class="flex flex-col">
                    <h4 class="text-[13.5px] font-bold text-[var(--sys-text-primary)] m-0 uppercase italic tracking-tight group-hover:text-[var(--sys-brand-solid)] transition-colors">{{ staff.name }}</h4>
                    <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] m-0 uppercase italic tracking-wider opacity-60 leading-none">{{ staff.position }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-[13px] font-black text-[var(--sys-text-primary)] italic opacity-80">{{ staff.base }} VNĐ</td>
              <td class="px-6 py-4 text-[13px] font-black text-[var(--sys-success-text)] italic">+ {{ staff.bonus }} VNĐ</td>
              <td class="px-6 py-4 text-[13px] font-black text-[var(--sys-danger-text)] italic">- {{ staff.deduct }} VNĐ</td>
              <td class="px-6 py-4 text-right">
                <span class="text-[14.5px] font-black text-[var(--sys-brand-solid)] italic underline decoration-2 decoration-[var(--sys-brand-soft)] underline-offset-[6px] tracking-tight">{{ staff.total }} VNĐ</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Dropdown from '@/components/Dropdown.vue'

const selectedPeriod = ref('03/2026')
const periodOptions = [
  { label: 'Tháng 03/2026', value: '03/2026' },
  { label: 'Tháng 02/2026', value: '02/2026' },
  { label: 'Tháng 12/2025', value: '12/2025' },
]

const quickStats = [
  { label: 'QUỸ LƯƠNG TỔNG', value: '845.500.000 đ', icon: 'account_balance_wallet', bgClass: 'bg-[var(--sys-brand-soft)]', colorClass: 'text-[var(--sys-brand-solid)]', borderClass: 'border-[var(--sys-brand-border)]', textClass: 'text-[var(--sys-text-primary)]' },
  { label: 'THƯỞNG HIỆU NĂNG', value: '120.000.000 đ', icon: 'stars', bgClass: 'bg-[var(--sys-success-soft)]', colorClass: 'text-[var(--sys-success-text)]', borderClass: 'border-[var(--sys-success-border)]', textClass: 'text-[var(--sys-success-text)]' },
  { label: 'TỔNG KHẤU TRỪ', value: '- 42.150.000 đ', icon: 'money_off', bgClass: 'bg-[var(--sys-danger-soft)]', colorClass: 'text-[var(--sys-danger-text)]', borderClass: 'border-[var(--sys-danger-border)]', textClass: 'text-[var(--sys-danger-text)]' },
]

const payrollList = ref([
    { name: 'Nguyễn Văn Anh', position: 'SENIOR DEVELOPER', base: '35.000.000', bonus: '5.000.000', deduct: '2.500.000', total: '37.500.000' },
    { name: 'Lê Diệu Linh', position: 'FRONTEND DEVELOPER', base: '22.000.000', bonus: '3.000.000', deduct: '1.200.000', total: '23.800.000' },
    { name: 'Trần Minh Hải', position: 'UI/UX LEAD', base: '28.000.000', bonus: '4.500.000', deduct: '1.800.000', total: '30.700.000' },
    { name: 'Vũ Minh Đăng', position: 'BACKEND LEAD', base: '42.000.000', bonus: '8.000.000', deduct: '4.500.000', total: '45.500.000' },
  ])
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { height: 5px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--sys-border-subtle); border-radius: 5px; }
* { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
</style>
