<template>
  <div class="space-y-6 pb-8">
    <!-- Header Area: SaaS Enterprise Style -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left px-1">
      <div class="bg-transparent text-left">
        <h1 class="text-xl font-bold text-[var(--sys-text-primary)] mb-0.5 tracking-tight uppercase">Phê duyệt Nghỉ phép Phòng ban</h1>
        <p class="text-[13px] text-[var(--sys-text-secondary)] font-medium flex items-center gap-3">
          Xử lý các yêu cầu vắng mặt và điều phối nguồn lực nhân sự khối IT.
          <span class="px-2 py-0.5 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-md border border-[var(--sys-brand-border)] text-[10px] font-bold uppercase tracking-widest shadow-sm animate-pulse">PENDING: {{ pendingLeaves.length }}</span>
        </p>
      </div>
    </div>

    <!-- Tabs/Filters: Refined and Spacious -->
    <div class="flex border-b border-[var(--sys-border-subtle)] bg-transparent gap-8 px-1">
      <button 
        v-for="tab in ['Chờ duyệt', 'Đã duyệt', 'Đã từ chối']" :key="tab"
        :class="['pb-3 text-[11px] font-bold uppercase tracking-widest transition-all relative h-10 flex items-center', activeTab === tab ? 'text-[var(--sys-brand-solid)]' : 'text-[var(--sys-text-secondary)] opacity-40 hover:opacity-100']"
        @click="activeTab = tab"
      >
        {{ tab }} ({{ tab === 'Chờ duyệt' ? pendingLeaves.length : (tab === 'Đã duyệt' ? approvedLeaves.length : rejectedLeaves.length) }})
        <div v-if="activeTab === tab" class="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--sys-brand-solid)] rounded-full shadow-sm"></div>
      </button>
    </div>

    <!-- Leave Request Grid: Premium Card Style -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch">
      <div v-for="leave in currentList" :key="leave.id" 
        class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col group hover:border-[var(--sys-brand-solid)] transition-all hover:shadow-lg">
        <div class="p-5 flex-grow space-y-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-md bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] flex items-center justify-center font-bold text-lg text-[var(--sys-brand-solid)] uppercase shadow-inner">
              {{ leave.name.charAt(0) }}
            </div>
            <div class="flex flex-col">
              <h4 class="text-[14px] font-bold text-[var(--sys-text-primary)] m-0 uppercase tracking-tight group-hover:text-[var(--sys-brand-solid)] transition-colors">{{ leave.name }}</h4>
              <p class="text-[11px] font-bold text-[var(--sys-brand-solid)] uppercase tracking-widest opacity-80 leading-none">{{ leave.position }}</p>
            </div>
          </div>

          <div class="space-y-3 py-4 border-t border-b border-[var(--sys-border-subtle)] border-dashed border-t-2 border-b-2">
            <div class="flex justify-between items-center text-[12.5px] font-bold text-[var(--sys-text-primary)]">
              <span class="text-[10px] font-bold uppercase tracking-widest text-[var(--sys-text-secondary)] opacity-60">Thời gian thực tế:</span>
              <span class="text-[var(--sys-text-primary)]">{{ leave.range }}</span>
            </div>
            <div class="flex justify-between items-center text-[12.5px] font-bold text-[var(--sys-text-primary)]">
              <span class="text-[10px] font-bold uppercase tracking-widest text-[var(--sys-text-secondary)] opacity-60">Lý do xin nghỉ:</span>
              <span class="text-[var(--sys-text-primary)]">{{ leave.reason }}</span>
            </div>
            <div class="flex justify-between items-center text-[12.5px] font-bold text-[var(--sys-text-primary)]">
              <span class="text-[10px] font-bold uppercase tracking-widest text-[var(--sys-text-secondary)] opacity-60">Định mức trừ:</span>
              <span class="px-2 py-0.5 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-md font-bold text-[11px]">{{ leave.days }} ngày công</span>
            </div>
          </div>
        </div>

        <div class="p-3 bg-[var(--sys-bg-page)]/30 px-4 pb-4 flex gap-2">
          <button @click="approve(leave.id)" class="flex-1 h-10 bg-[var(--sys-brand-solid)] text-white rounded-md font-bold text-[10px] uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-sm">
            <template v-if="leave.days > 3">
              <span class="material-symbols-rounded text-[18px] font-bold">forward</span> GỬI GIÁM ĐỐC
            </template>
            <template v-else>
              <span class="material-symbols-rounded text-[18px] font-bold">check_circle</span> DUYỆT ĐƠN
            </template>
          </button>
          <button @click="reject(leave.id)" class="flex-1 h-10 bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border border-[var(--sys-danger-border)] rounded-md font-bold text-[10px] uppercase tracking-widest hover:bg-[var(--sys-danger-solid)] hover:text-white transition-all flex items-center justify-center gap-2">
            <span class="material-symbols-rounded text-[18px] font-bold">cancel</span> TỪ CHỐI
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { requestsAPI, employeesAPI, positionsAPI } from '@/data/mockDB.js'

const activeTab = ref('Chờ duyệt')

const DEPT_ID = 2 // Phòng Công nghệ IT

const leaveRequestTypeIds = [1] // request_type_id 1 = Nghỉ phép năm

const pendingLeaves = ref([])
const approvedLeaves = ref([])
const rejectedLeaves = ref([])

const loadData = () => {
  const allReqs = requestsAPI.getAll()
  const allEmps = employeesAPI.getAll()
  const allPositions = positionsAPI.getAll()

  const deptEmpIds = allEmps
    .filter(e => e.department_id === DEPT_ID)
    .map(e => e.employee_id)

  const deptLeaveReqs = allReqs.filter(r => {
    const isDeptEmp = deptEmpIds.includes(r.requester_id)
    const isLeaveType = leaveRequestTypeIds.includes(r.request_type_id)
    // WORKFLOW: Only show to Manager if visible_to includes 'Manager'
    // If visible_to is missing (old data), assume it's visible by default to its department manager
    const isVisible = r.visible_to ? r.visible_to.includes('Manager') : true
    return isDeptEmp && isLeaveType && isVisible
  })

  const mapReq = (r) => {
    const emp = allEmps.find(e => e.employee_id === r.requester_id)
    const pos = allPositions.find(p => p.position_id === emp?.position_id)
    return {
      id: r.request_id,
      name: emp?.full_name || 'N/A',
      position: pos?.position_name?.toUpperCase() || 'NHÂN VIÊN IT',
      range: r.title || 'N/A',
      days: r.days || (Math.floor(Math.random() * 3) + 1), // Ưu tiên data thật
      reason: r.notes || r.title || 'Nghỉ phép theo kế hoạch'
    }
  }

  pendingLeaves.value = deptLeaveReqs.filter(r => r.status === 'CHỜ_DUYỆT').map(r => ({ ...mapReq(r), statusRaw: r.status, days: r.days }))
  approvedLeaves.value = deptLeaveReqs.filter(r => ['ĐÃ_DUYỆT', 'CHỜ_GIÁM_ĐỐC_DUYỆT'].includes(r.status)).map(r => ({ ...mapReq(r), statusRaw: r.status, days: r.days }))
  rejectedLeaves.value = deptLeaveReqs.filter(r => r.status === 'TỪ_CHỐI').map(mapReq)
}

const approve = (id) => {
  requestsAPI.approve(id)
  loadData()
}

const reject = (id) => {
  requestsAPI.reject(id, 'Không phù hợp thời điểm')
  loadData()
}

const currentList = computed(() => {
  if (activeTab.value === 'Đã duyệt') return approvedLeaves.value
  if (activeTab.value === 'Đã từ chối') return rejectedLeaves.value
  return pendingLeaves.value
})

onMounted(loadData)
</script>

<style scoped>
* { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
</style>
