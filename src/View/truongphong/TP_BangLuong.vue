<template>
  <div class="space-y-6 pb-8">
    <!-- Header Area -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left px-1">
      <div class="bg-transparent text-left">
        <h1 class="text-xl font-bold text-[var(--sys-text-primary)] mb-0.5 tracking-tight uppercase">Quyết toán Tiền lương Phòng ban</h1>
        <p class="text-[13px] text-[var(--sys-text-secondary)] font-medium flex items-center gap-3">
          Thống kê chi phí nhân sự và quỹ lương tháng của đơn vị IT.
          <span class="px-2 py-0.5 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-md border border-[var(--sys-brand-border)] text-[10px] font-bold uppercase tracking-widest shadow-sm">CONFIDENTIAL VIEW</span>
        </p>
      </div>
      <div class="flex items-center gap-3">
        <Dropdown v-model="selectedPeriod" :options="periodOptions" class="min-w-[170px] h-11 shadow-sm" />
        <button
          @click="exportPDF"
          class="h-11 px-5 bg-[var(--sys-brand-solid)] text-white rounded-md text-[11px] font-bold uppercase tracking-wide hover:brightness-95 transition-all flex items-center gap-2 shadow-sm"
        >
          <span class="material-symbols-rounded text-[18px]">download</span>
          Tải PDF
        </button>
      </div>
    </div>

    <!-- Summary Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div v-for="stat in quickStats" :key="stat.label"
        class="bg-[var(--sys-bg-surface)] p-6 rounded-lg border border-[var(--sys-border-subtle)] shadow-sm flex items-center justify-between group hover:border-[var(--sys-brand-solid)] transition-all hover:shadow-lg">
        <div>
          <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1 opacity-60">{{ stat.label }}</p>
          <h3 :class="['text-2xl font-bold leading-none tracking-tight', stat.textClass]">{{ stat.value }}</h3>
        </div>
        <div :class="['w-12 h-12 rounded-md flex items-center justify-center border shadow-sm group-hover:scale-105 transition-transform duration-300', stat.bgClass, stat.colorClass, stat.borderClass]">
          <span class="material-symbols-rounded text-2xl font-bold">{{ stat.icon }}</span>
        </div>
      </div>
    </div>

    <!-- Payroll Table -->
    <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden">
      <div class="px-5 py-3.5 border-b border-[var(--sys-border-subtle)] flex justify-between items-center bg-[var(--sys-bg-page)]/30">
        <h3 class="text-[11px] font-bold text-[var(--sys-text-primary)] uppercase tracking-widest m-0 flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border border-[var(--sys-brand-border)] flex items-center justify-center shrink-0">
            <span class="material-symbols-rounded text-[20px] font-bold">assignment_turned_in</span>
          </div>
          BẢNG KÊ CHI TIẾT THU NHẬP — KỲ {{ selectedPeriod }}
        </h3>
        <span class="text-[11px] font-bold text-[var(--sys-text-secondary)] opacity-60">{{ payrollList.length }} nhân sự</span>
      </div>
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse min-w-[1000px]">
          <thead class="bg-[var(--sys-bg-page)]/40">
            <tr>
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest">STT</th>
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest">Nhân sự thực hiện</th>
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest">Lương cơ bản</th>
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest">Phụ cấp & Thưởng</th>
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest">Các khoản trừ</th>
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest text-right">Tổng thực lĩnh</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--sys-border-subtle)]">
            <tr v-for="(staff, idx) in payrollList" :key="staff.id" class="hover:bg-[var(--sys-bg-hover)] transition-all duration-200 group">
              <td class="px-6 py-4 text-[13px] font-bold text-[var(--sys-text-secondary)] opacity-60">{{ idx + 1 }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-md bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] flex items-center justify-center font-bold text-xs text-[var(--sys-brand-solid)] shadow-sm group-hover:bg-[var(--sys-brand-solid)] group-hover:text-white transition-all">
                    {{ staff.name.charAt(0) }}
                  </div>
                  <div class="flex flex-col">
                    <h4 class="text-[13px] font-bold text-[var(--sys-text-primary)] m-0 uppercase tracking-tight group-hover:text-[var(--sys-brand-solid)] transition-colors">{{ staff.name }}</h4>
                    <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] m-0 uppercase tracking-widest opacity-60 leading-none">{{ staff.position }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-[13px] font-bold text-[var(--sys-text-primary)] opacity-80">{{ staff.base }} đ</td>
              <td class="px-6 py-4 text-[13px] font-bold text-[var(--sys-success-text)]">+ {{ staff.bonus }} đ</td>
              <td class="px-6 py-4 text-[13px] font-bold text-[var(--sys-danger-text)]">- {{ staff.deduct }} đ</td>
              <td class="px-6 py-4 text-right">
                <span class="text-[14px] font-bold text-[var(--sys-brand-solid)] tracking-tight">{{ staff.total }} đ</span>
              </td>
            </tr>
          </tbody>
          <tfoot class="bg-[var(--sys-bg-page)]/60 border-t-2 border-[var(--sys-border-subtle)]">
            <tr>
              <td colspan="2" class="px-6 py-4 text-[12px] font-bold text-[var(--sys-text-primary)] uppercase tracking-widest">TỔNG CỘNG</td>
              <td class="px-6 py-4 text-[13px] font-bold text-[var(--sys-text-primary)]">{{ totalBase }} đ</td>
              <td class="px-6 py-4 text-[13px] font-bold text-[var(--sys-success-text)]">+ {{ totalBonus }} đ</td>
              <td class="px-6 py-4 text-[13px] font-bold text-[var(--sys-danger-text)]">- {{ totalDeduct }} đ</td>
              <td class="px-6 py-4 text-right text-[15px] font-bold text-[var(--sys-brand-solid)]">{{ totalNet }} đ</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Dropdown from '@/components/Dropdown.vue'
import { salariesAPI, employeesAPI, positionsAPI, departmentsAPI } from '@/data/mockDB.js'
import { exportManagerPayrollPDF } from '@/utils/pdfExport.js'

const selectedPeriod = ref('03/2026')
const DEPT_ID = 2

const periodOptions = [
  { label: 'Tháng 03/2026', value: '03/2026' },
  { label: 'Tháng 02/2026', value: '02/2026' },
  { label: 'Tháng 01/2026', value: '01/2026' },
  { label: 'Tháng 12/2025', value: '12/2025' },
  { label: 'Tháng 11/2025', value: '11/2025' },
]

const payrollList = ref([])
const quickStats = ref([])
const totalBase = ref('0')
const totalBonus = ref('0')
const totalDeduct = ref('0')
const totalNet = ref('0')

const fmt = (num) => new Intl.NumberFormat('vi-VN').format(Math.round(num))

const loadData = () => {
  const allEmps = employeesAPI.getAll().filter(e => e.department_id === DEPT_ID && e.status !== 'ĐÃ_NGHỈ_VIỆC')
  const allSals = salariesAPI.getAll()
  const allPositions = positionsAPI.getAll()

  let sumBase = 0, sumBonus = 0, sumDeduct = 0

  payrollList.value = allEmps.map(emp => {
    const sal = allSals.find(s => s.employee_id === emp.employee_id)
    const pos = allPositions.find(p => p.position_id === emp.position_id)
    const base = sal?.basic_salary || (15 + (emp.employee_id % 10)) * 1_000_000
    const bonus = sal?.allowance || 1_500_000
    const deduct = sal?.tax || Math.round(base * 0.105)
    const total = base + bonus - deduct

    sumBase += base
    sumBonus += bonus
    sumDeduct += deduct

    return {
      id: emp.employee_id,
      name: emp.full_name,
      position: pos?.position_name?.toUpperCase() || 'CHUYÊN VIÊN IT',
      base: fmt(base),
      bonus: fmt(bonus),
      deduct: fmt(deduct),
      total: fmt(total),
    }
  })

  totalBase.value = fmt(sumBase)
  totalBonus.value = fmt(sumBonus)
  totalDeduct.value = fmt(sumDeduct)
  totalNet.value = fmt(sumBase + sumBonus - sumDeduct)

  const netTotal = sumBase + sumBonus - sumDeduct
  quickStats.value = [
    { label: 'QUỸ LƯƠNG TỔNG', value: fmt(netTotal) + ' đ', icon: 'account_balance_wallet', bgClass: 'bg-[var(--sys-brand-soft)]', colorClass: 'text-[var(--sys-brand-solid)]', borderClass: 'border-[var(--sys-brand-border)]', textClass: 'text-[var(--sys-text-primary)]' },
    { label: 'THƯỞNG & PHỤ CẤP', value: fmt(sumBonus) + ' đ', icon: 'stars', bgClass: 'bg-[var(--sys-success-soft)]', colorClass: 'text-[var(--sys-success-text)]', borderClass: 'border-[var(--sys-success-border)]', textClass: 'text-[var(--sys-success-text)]' },
    { label: 'TỔNG KHẤU TRỪ', value: '- ' + fmt(sumDeduct) + ' đ', icon: 'money_off', bgClass: 'bg-[var(--sys-danger-soft)]', colorClass: 'text-[var(--sys-danger-text)]', borderClass: 'border-[var(--sys-danger-border)]', textClass: 'text-[var(--sys-danger-text)]' },
  ]
}

onMounted(loadData)
watch(selectedPeriod, loadData)

// ─── PDF Export ──────────────────────────────────────────────────────────────
const exportPDF = () => {
  const dept = departmentsAPI.getById(DEPT_ID)
  const deptName = dept?.department_name || 'Phòng Công Nghệ Thông Tin'
  const periodLabel = periodOptions.find(p => p.value === selectedPeriod.value)?.label || selectedPeriod.value

  exportManagerPayrollPDF({
    periodLabel,
    deptName,
    payrollList: payrollList.value,
    totalBase: totalBase.value,
    totalBonus: totalBonus.value,
    totalDeduct: totalDeduct.value,
    totalNet: totalNet.value,
  })
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { height: 5px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--sys-border-subtle); border-radius: 5px; }
* { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
</style>
