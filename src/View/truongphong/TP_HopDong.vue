<template>
  <div class="space-y-6 pb-8">
    <!-- Header Area: SaaS Enterprise Style -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left px-1">
      <div class="bg-transparent text-left">
        <h1 class="text-xl font-bold text-[var(--sys-text-primary)] mb-0.5 tracking-tight uppercase">Quản lý Hợp đồng Phòng ban</h1>
        <p class="text-[13px] text-[var(--sys-text-secondary)] font-medium flex items-center gap-3">
          Tra cứu thông tin và thời hạn các loại hợp đồng lao động khối IT.
          <span class="px-2 py-0.5 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-md border border-[var(--sys-brand-border)] text-[10px] font-bold uppercase tracking-widest shadow-sm">READ-ONLY ACCESS</span>
        </p>
      </div>
    </div>

    <!-- Contract Table: Compact and Synchronized -->
    <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden">
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse min-w-[1000px]">
          <thead class="bg-[var(--sys-bg-page)]/40">
            <tr>
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest">Mã Hợp đồng</th>
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest">Nhân sự thực thi</th>
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest">Loại văn bản</th>
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest">Thời gian hiệu lực</th>
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest text-right">Trạng thái pháp lý</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--sys-border-subtle)]">
            <tr v-for="contract in contracts" :key="contract.id" class="hover:bg-[var(--sys-bg-hover)] transition-all duration-200 group">
              <td class="px-6 py-4 text-[13px] font-bold text-[var(--sys-text-primary)] tracking-tight">
                {{ contract.code }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center font-bold text-[10px] uppercase border border-[var(--sys-brand-border)]">
                    {{ contract.name.charAt(0) }}
                  </div>
                  <div class="flex flex-col">
                    <h4 class="text-[13px] font-bold text-[var(--sys-text-primary)] m-0 uppercase tracking-tight group-hover:text-[var(--sys-brand-solid)] transition-colors">{{ contract.name }}</h4>
                    <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] m-0 uppercase tracking-widest opacity-60">{{ contract.position }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-[12px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-tight">
                {{ contract.type }}
              </td>
              <td class="px-6 py-4 text-[12px] font-bold text-[var(--sys-text-primary)] opacity-80">
                {{ contract.range }}
              </td>
              <td class="px-6 py-4 text-right">
                <span :class="['px-3 py-1 rounded-md font-bold text-[10px] uppercase border shadow-sm tracking-widest', contract.status === 'Đang hiệu lực' ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]' : 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]']">
                  {{ contract.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { contractsAPI, employeesAPI, positionsAPI } from '@/data/mockDB.js'

const DEPT_ID = 2
const contracts = ref([])

const CONTRACT_TYPE_LABELS = {
  'THỬ_VIỆC': 'HĐ Thử việc',
  'CHÍNH_THỨC_1_NĂM': 'HĐ Chính thức 1 năm',
  'CHÍNH_THỨC_3_NĂM': 'HĐ Chính thức 3 năm',
  'VÔ_THỜI_HẠN': 'HĐ Vô thời hạn',
  'THỰC_TẬP': 'HĐ Thực tập',
}

const loadData = () => {
  const allContracts = contractsAPI.getAll()
  const allEmps = employeesAPI.getAll().filter(e => e.department_id === DEPT_ID)
  const allPositions = positionsAPI.getAll()
  const empIds = allEmps.map(e => e.employee_id)

  contracts.value = allContracts
    .filter(c => empIds.includes(c.employee_id) && c.status !== 'ĐÃ_CHẤM_DỨT')
    .slice(0, 10)
    .map(c => {
      const emp = allEmps.find(e => e.employee_id === c.employee_id)
      const pos = allPositions.find(p => p.position_id === emp?.position_id)
      const startDate = c.start_date ? new Date(c.start_date).toLocaleDateString('vi-VN') : 'N/A'
      const endDate = c.end_date ? new Date(c.end_date).toLocaleDateString('vi-VN') : null
      const range = endDate ? `${startDate} - ${endDate}` : `Từ ${startDate}`

      return {
        id: c.contract_id,
        code: c.contract_code,
        name: emp?.full_name || 'N/A',
        position: pos?.position_name || 'Chuyên viên',
        type: CONTRACT_TYPE_LABELS[c.contract_type] || c.contract_type,
        range,
        status: c.status === 'HIỆU_LỰC' ? 'Đang hiệu lực' : 'Sắp hết hạn'
      }
    })
}

onMounted(loadData)
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { height: 5px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--sys-border-subtle); border-radius: 5px; }
* { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
</style>
