<template>
  <div class="nghi-phep-page space-y-6">
    <!-- Header -->
    <div class="mb-8 text-left bg-transparent">
      <h1 class="text-2xl font-black text-[var(--sys-text-primary)] tracking-tight text-left italic uppercase">Quản lý Nghỉ Phép</h1>
      <p class="text-[var(--sys-text-secondary)] text-sm font-medium italic text-left bg-transparent">Quản lý và phê duyệt các yêu cầu nghỉ phép của toàn hệ thống.</p>
    </div>

    <!-- Main Content -->
    <div class="flex flex-col xl:flex-row gap-6 bg-transparent">
      <!-- Left List -->
      <div :class="activeRequest ? 'xl:w-2/3' : 'w-full'" class="transition-all duration-500 bg-transparent text-left">
        <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] shadow-sm rounded-[2.5rem] overflow-hidden flex flex-col min-h-[600px]">
          <!-- Tabs -->
          <div class="bg-transparent border-b border-[var(--sys-border-subtle)] px-8 pt-6">
            <div class="flex gap-8 items-end">
              <button class="pb-3 text-xs font-black uppercase tracking-widest border-b-2 border-[var(--sys-brand-solid)] text-[var(--sys-brand-solid)] transition-all">
                Tất cả <span class="ml-1 opacity-40 font-bold">(42)</span>
              </button>
              <button class="pb-3 text-xs font-black uppercase tracking-widest border-b-2 border-transparent text-[var(--sys-text-secondary)]/50 hover:text-[var(--sys-text-secondary)] transition-all">
                Chờ duyệt <span class="ml-1 opacity-40 font-bold">(12)</span>
              </button>
              <button class="pb-3 text-xs font-black uppercase tracking-widest border-b-2 border-transparent text-[var(--sys-text-secondary)]/50 hover:text-[var(--sys-text-secondary)] transition-all">
                Đã duyệt <span class="ml-1 opacity-40 font-bold">(25)</span>
              </button>
              <button class="pb-3 text-xs font-black uppercase tracking-widest border-b-2 border-transparent text-[var(--sys-text-secondary)]/50 hover:text-[var(--sys-text-secondary)] transition-all">
                Từ chối <span class="ml-1 opacity-40 font-bold">(5)</span>
              </button>
            </div>
          </div>

          <!-- Filters (Standardized h-11) -->
          <div class="px-8 py-5 border-b border-[var(--sys-border-subtle)] bg-transparent">
            <div class="flex flex-col md:flex-row items-center gap-3 bg-transparent">
              <div class="flex-1 w-full relative bg-transparent group">
                <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[18px] text-[var(--sys-text-secondary)] opacity-50 group-focus-within:text-[var(--sys-brand-solid)] transition-all">search</span>
                <input type="text" placeholder="Tìm kiếm nhanh đơn từ..." class="w-full h-11 pl-11 pr-4 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold focus:outline-none focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)]">
              </div>

              <div class="flex items-center gap-2 w-full md:w-auto shrink-0 bg-transparent">
                <Dropdown 
                  v-model="filterDept"
                  :options="deptOptions"
                  placeholder="Phòng ban"
                />
                <Dropdown 
                  v-model="filterRange"
                  :options="rangeOptions"
                  placeholder="Thời gian"
                />
                <button class="h-11 px-6 bg-[var(--sys-brand-solid)] text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm shadow-[var(--sys-brand-solid)]/20 uppercase tracking-widest text-[11px] whitespace-nowrap active:scale-95">
                  <span class="material-symbols-outlined text-[18px]">filter_alt</span> 
                  Lọc
                </button>
              </div>
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto flex-grow bg-transparent custom-scrollbar">
            <table class="w-full text-left border-separate border-spacing-0 bg-transparent">
              <thead>
                <tr class="text-left">
                  <th class="px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]">Nhân viên</th>
                  <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]">Phòng ban</th>
                  <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]">Loại nghỉ</th>
                  <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]">Thời gian</th>
                  <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)] text-center">Tổng ngày</th>
                  <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]">Trạng thái</th>
                </tr>
              </thead>
              <tbody class="bg-transparent text-left">
                <tr v-for="req in requests" :key="req.id" @click="activeRequestId = req.id" 
                    class="group cursor-pointer transition-all duration-300 bg-transparent text-left" 
                    :class="activeRequestId === req.id ? 'bg-[var(--sys-brand-soft)]' : 'hover:bg-[var(--sys-bg-hover)]'">
                  <td class="px-8 py-5 bg-transparent text-left border-b border-[var(--sys-border-subtle)]" :class="activeRequestId === req.id ? 'border-l-4 border-[var(--sys-brand-solid)]' : 'border-l-4 border-transparent'">
                    <div class="flex flex-col bg-transparent text-left">
                      <span class="block text-sm font-black text-[var(--sys-text-primary)] mb-0.5">{{ req.name }}</span>
                      <span class="block text-[10px] font-bold text-[var(--sys-brand-solid)] uppercase tracking-tight">MSNV: {{ req.msnv }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-5 text-sm font-bold text-[var(--sys-text-primary)] bg-transparent text-left border-b border-[var(--sys-border-subtle)]">{{ req.department }}</td>
                  <td class="px-6 py-5 bg-transparent text-left border-b border-[var(--sys-border-subtle)]">
                    <span class="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all" :class="getLeaveTypeClass(req.type)">{{ req.type }}</span>
                  </td>
                  <td class="px-6 py-5 text-sm font-bold text-[var(--sys-text-secondary)] italic bg-transparent text-left border-b border-[var(--sys-border-subtle)]">{{ req.dateRange }}</td>
                  <td class="px-6 py-5 text-sm font-black text-[var(--sys-text-primary)] text-center bg-transparent border-b border-[var(--sys-border-subtle)]">{{ req.days }}</td>
                  <td class="px-6 py-5 bg-transparent text-left border-b border-[var(--sys-border-subtle)]">
                    <div :class="[
                      'px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 border transition-all',
                      getStatusBadgeClass(req.status)
                    ]">
                      <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(req.status)"></span>
                      {{ req.statusText }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="bg-[var(--sys-bg-hover)] border-t border-[var(--sys-border-subtle)] px-8 py-5 flex justify-between items-center mt-auto bg-transparent">
            <span class="text-[var(--sys-text-secondary)]/50 text-xs font-bold italic bg-transparent">Hiển thị 3 trên tổng số 42 đơn nghỉ phép</span>
            <div class="flex gap-2 bg-transparent">
              <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)] hover:text-[var(--sys-brand-solid)] transition-all">
                <span class="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button class="px-5 h-10 flex items-center justify-center rounded-xl bg-[var(--sys-brand-solid)] text-white text-xs font-black shadow-lg shadow-[var(--sys-brand-solid-lch-30)] transition-all border-0">1</button>
              <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)] hover:text-[var(--sys-brand-solid)] transition-all">
                <span class="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Detail Panel -->
      <div v-show="activeRequest" class="xl:w-1/3 transition-all duration-500 bg-transparent text-left">
        <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] shadow-sm rounded-[2.5rem] overflow-hidden flex flex-col h-full min-h-[600px]" v-if="activeRequest">
          <div class="bg-transparent border-b border-[var(--sys-border-subtle)] px-8 py-6 flex justify-between items-center text-left bg-transparent">
            <h6 class="text-sm font-black text-[var(--sys-text-primary)] uppercase tracking-widest italic bg-transparent">Chi tiết Phê duyệt</h6>
            <button @click="activeRequestId = null" class="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] hover:text-[var(--sys-brand-solid)] transition-all bg-transparent">
              <span class="material-symbols-outlined text-[20px] bg-transparent">close</span>
            </button>
          </div>
          
          <div class="p-8 flex-grow flex flex-col gap-8 bg-transparent text-left">
            <!-- User info -->
            <div class="bg-[var(--sys-bg-hover)] p-6 rounded-3xl flex items-center gap-4 border border-[var(--sys-border-subtle)] shadow-sm text-left">
              <div class="flex flex-col bg-transparent text-left">
                <h6 class="text-base font-black text-[var(--sys-text-primary)] mb-1 bg-transparent">{{ activeRequest.name }}</h6>
                <span class="text-xs font-bold text-[var(--sys-brand-solid)] uppercase tracking-tight bg-transparent">MSNV: {{ activeRequest.msnv }} — {{ activeRequest.role }}</span>
              </div>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-2 gap-6 px-1 bg-transparent text-left">
              <div class="bg-transparent text-left">
                <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2 italic bg-transparent text-left opacity-60">Loại nghỉ</p>
                <span class="text-sm font-black text-[var(--sys-text-primary)] bg-transparent text-left">{{ activeRequest.typeDetail }}</span>
              </div>
              <div class="bg-transparent text-left">
                <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2 italic bg-transparent text-left opacity-60">Tổng số ngày</p>
                <span class="text-sm font-black text-[var(--sys-text-primary)] bg-transparent text-left">{{ activeRequest.days }} ngày</span>
              </div>
            </div>

            <div class="px-1 bg-transparent text-left">
              <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2 italic bg-transparent text-left opacity-60">Thời gian</p>
              <div class="flex items-center gap-3 text-sm font-black text-[var(--sys-text-primary)] bg-transparent text-left">
                <span class="material-symbols-outlined text-[var(--sys-brand-solid)] bg-transparent">calendar_month</span>
                {{ activeRequest.fullDateRange }}
              </div>
            </div>

            <!-- Reason -->
            <div class="px-1 bg-transparent text-left">
              <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-3 italic bg-transparent text-left opacity-60">Lý do nghỉ</p>
              <div class="bg-[var(--sys-bg-hover)]/50 p-5 rounded-3xl border border-[var(--sys-border-subtle)] text-sm font-bold italic text-[var(--sys-text-secondary)] bg-transparent text-left" style="line-height: 1.6;">
                "{{ activeRequest.reason }}"
              </div>
            </div>

            <!-- Balance -->
            <div class="flex justify-between items-center p-5 rounded-3xl mt-1 mx-1 bg-[var(--sys-success-soft)] border border-[var(--sys-success-border)] text-left">
              <div class="flex items-center gap-3 text-[var(--sys-success-text)] font-black bg-transparent">
                <span class="material-symbols-outlined text-lg bg-transparent">account_balance_wallet</span>
                <span class="text-[10px] uppercase tracking-widest bg-transparent">Số dư phép năm</span>
              </div>
              <span class="text-[10px] font-black text-[var(--sys-success-text)] uppercase tracking-widest bg-transparent">Còn lại: {{ activeRequest.balance }} ngày</span>
            </div>

            <!-- Warnings -->
            <div v-if="activeRequest.warnings && activeRequest.warnings.length" class="p-5 rounded-3xl mt-1 mx-1 bg-[var(--sys-danger-soft)] border border-[var(--sys-danger-border)] text-left">
              <div class="flex items-center gap-3 mb-3 text-[var(--sys-danger-text)] font-black bg-transparent">
                <span class="material-symbols-outlined text-lg bg-transparent">warning</span>
                <span class="text-[10px] uppercase tracking-widest bg-transparent">Cảnh báo xung đột</span>
              </div>
              <ul class="space-y-2 bg-transparent">
                <li v-for="(warn, idx) in activeRequest.warnings" :key="idx" class="text-[11px] font-bold text-[var(--sys-danger-text)]/80 italic flex items-start gap-2 bg-transparent text-left">
                  <span class="w-1.5 h-1.5 rounded-full bg-[var(--sys-danger-text)] mt-1 shrink-0 bg-transparent"></span>
                  {{ warn }}
                </li>
              </ul>
            </div>

            <!-- Reject Reason -->
            <div v-if="activeRequest.status === 'pending'" class="mt-2 px-1 bg-transparent text-left">
              <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-3 italic bg-transparent text-left opacity-60">Lý do từ chối (nếu có)</p>
              <textarea class="w-full px-5 py-4 bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-black text-[var(--sys-text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all resize-none placeholder:text-[var(--sys-text-secondary)]/40 bg-transparent text-left" rows="4" placeholder="Nhập lý do nếu bạn từ chối đơn này..."></textarea>
            </div>
            
             <!-- Actions form disabled if already decided -->
            <div v-else class="mt-2 p-5 bg-[var(--sys-bg-hover)]/40 rounded-3xl text-center border border-[var(--sys-border-subtle)] mx-1 bg-transparent">
              <span class="text-[var(--sys-text-secondary)]/50 text-[10px] font-black uppercase tracking-widest italic bg-transparent">Đơn này đã được xử lý ({{ activeRequest.statusText }})</span>
            </div>

          </div>

          <!-- Actions -->
          <div v-if="activeRequest.status === 'pending'" class="p-8 border-t border-[var(--sys-border-subtle)] flex gap-4 mt-auto bg-transparent">
            <button class="flex-1 px-6 py-4 bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] rounded-2xl text-xs font-black hover:bg-[var(--sys-danger-soft)] hover:text-[var(--sys-danger-text)] transition-all border border-[var(--sys-border-subtle)] uppercase tracking-widest italic">Từ chối</button>
            <button class="flex-1 px-6 py-4 bg-[var(--sys-brand-solid)] text-white rounded-2xl text-xs font-black hover:bg-[var(--sys-brand-hover)] shadow-xl shadow-[var(--sys-brand-solid-lch-30)] transition-all uppercase tracking-widest flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-[20px]">check_circle</span> 
              Duyệt đơn
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Dropdown from '@/components/Dropdown.vue';

const filterDept = ref('ALL');
const filterRange = ref('month');

const deptOptions = [
  { label: 'Tất cả phòng ban', value: 'ALL' },
  { label: 'Kỹ thuật', value: 'Kỹ thuật' },
  { label: 'Nhân sự', value: 'Nhân sự' },
  { label: 'Marketing', value: 'Marketing' }
];

const rangeOptions = [
  { label: 'Tháng này', value: 'month' }
];

const requests = ref([
  {
    id: 1,
    name: 'Nguyễn Văn An',
    msnv: '202401',
    initial: 'NA',
    department: 'Kỹ thuật',
    role: 'Chuyên viên Phát triển Phần mềm',
    type: 'Nghỉ phép năm',
    typeDetail: 'Nghỉ phép năm',
    dateRange: '10/10 - 12/10/2024',
    fullDateRange: '10/10/2024 - 12/10/2024',
    days: 3,
    status: 'pending',
    statusText: 'Chờ duyệt',
    reason: 'Tôi có việc gia đình cấn giải quyết ở quê, xin phép được nghỉ 3 ngày phép năm theo quy định. Công việc hiện tại đã được bàn giao cho bạn Minh.',
    balance: 5,
    warnings: [
      'Trùng lịch làm việc/phóng vấn (11/10)',
      'Phòng ban đã có 2 người nghỉ cùng lúc'
    ]
  },
  {
    id: 2,
    name: 'Trần Thu Hà',
    msnv: '202405',
    initial: 'TH',
    department: 'Nhân sự',
    role: 'Chuyên viên Tuyển dụng',
    type: 'Nghỉ ốm',
    typeDetail: 'Nghỉ ốm',
    dateRange: '05/10 - 05/10/2024',
    fullDateRange: '05/10/2024 - 05/10/2024',
    days: 1,
    status: 'approved',
    statusText: 'Đã duyệt',
    reason: 'Tôi bị ốm không thể đi làm, xin phép nghỉ 1 ngày có giấy chứng nhận của bệnh viện.',
    balance: 10,
    warnings: []
  },
  {
    id: 3,
    name: 'Lê Minh',
    msnv: '202409',
    initial: 'LM',
    department: 'Marketing',
    role: 'Chuyên viên Content',
    type: 'Việc riêng',
    typeDetail: 'Việc riêng',
    dateRange: '12/10 - 13/10/2024',
    fullDateRange: '12/10/2024 - 13/10/2024',
    days: 2,
    status: 'rejected',
    statusText: 'Từ chối',
    reason: 'Xin nghỉ đi du lịch với nhóm.',
    balance: 7,
    warnings: [
       'Chiến dịch đang vào giai đoạn nước rút'
    ]
  }
]);

const activeRequestId = ref(1);

const activeRequest = computed(() => {
  return requests.value.find(r => r.id === activeRequestId.value) || null;
});

const getLeaveTypeClass = (type) => {
  if (type.includes('Nghỉ phép')) return 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)]';
  if (type.includes('ốm')) return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
  return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]'; // For Việc riêng
};

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'approved': return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
    case 'pending': return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]';
    case 'rejected': return 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]';
    default: return 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border-[var(--sys-border-subtle)]';
  }
};

const getStatusDotClass = (status) => {
  switch (status) {
    case 'approved': return 'bg-[var(--sys-success-solid)]';
    case 'pending': return 'bg-[var(--sys-warning-solid)]';
    case 'rejected': return 'bg-[var(--sys-danger-solid)]';
    default: return 'bg-[var(--sys-icon-default)]';
  }
};
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
