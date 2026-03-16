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

          <!-- Filters -->
          <div class="px-8 py-6 border-b border-[var(--sys-border-subtle)] bg-transparent">
            <div class="flex flex-wrap items-end gap-6 bg-transparent">
              <div class="flex-1 min-w-[200px] bg-transparent text-left">
                <label class="block text-[10px] font-black text-[var(--sys-text-secondary)]/60 uppercase tracking-widest mb-2 ml-1 italic bg-transparent text-left">Phòng ban</label>
                <Dropdown 
                  v-model="filterDept"
                  :options="deptOptions"
                  placeholder="Tất cả phòng ban"
                />
              </div>
              <div class="flex-1 min-w-[200px] bg-transparent text-left">
                <label class="block text-[10px] font-black text-[var(--sys-text-secondary)]/60 uppercase tracking-widest mb-2 ml-1 italic bg-transparent text-left">Khoảng thời gian</label>
                <Dropdown 
                  v-model="filterRange"
                  :options="rangeOptions"
                  placeholder="Tháng này"
                />
              </div>
              <div class="bg-transparent text-left">
                <button class="px-8 h-[48px] bg-[var(--sys-bg-hover)] hover:bg-[var(--sys-brand-soft)] text-[var(--sys-text-secondary)] hover:text-[var(--sys-brand-solid)] rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 border border-[var(--sys-border-subtle)] uppercase tracking-widest">
                  <span class="material-symbols-outlined text-[20px]">filter_alt</span> 
                  Lọc dữ liệu
                </button>
              </div>
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto flex-grow bg-transparent">
            <table class="w-full text-left border-collapse bg-transparent">
              <thead>
                <tr class="bg-[var(--sys-bg-hover)]/30 bg-transparent text-left">
                  <th class="px-8 py-4 text-[10px] font-black text-[var(--sys-text-secondary)]/60 uppercase tracking-widest border-b border-[var(--sys-border-subtle)] italic">Nhân viên</th>
                  <th class="px-6 py-4 text-[10px] font-black text-[var(--sys-text-secondary)]/60 uppercase tracking-widest border-b border-[var(--sys-border-subtle)] italic">Phòng ban</th>
                  <th class="px-6 py-4 text-[10px] font-black text-[var(--sys-text-secondary)]/60 uppercase tracking-widest border-b border-[var(--sys-border-subtle)] italic">Loại nghỉ</th>
                  <th class="px-6 py-4 text-[10px] font-black text-[var(--sys-text-secondary)]/60 uppercase tracking-widest border-b border-[var(--sys-border-subtle)] italic">Thời gian</th>
                  <th class="px-6 py-4 text-[10px] font-black text-[var(--sys-text-secondary)]/60 uppercase tracking-widest border-b border-[var(--sys-border-subtle)] italic text-center">Tổng ngày</th>
                  <th class="px-6 py-4 text-[10px] font-black text-[var(--sys-text-secondary)]/60 uppercase tracking-widest border-b border-[var(--sys-border-subtle)] italic">Trạng thái</th>
                </tr>
              </thead>
              <tbody class="bg-transparent text-left">
                <tr v-for="req in requests" :key="req.id" @click="activeRequestId = req.id" 
                    class="group cursor-pointer transition-all duration-300 border-b border-[var(--sys-border-subtle)] bg-transparent text-left" 
                    :class="activeRequestId === req.id ? 'bg-[var(--sys-brand-soft)] hover:bg-[var(--sys-brand-soft)]/80' : 'hover:bg-[var(--sys-bg-hover)]/40'">
                  <td class="px-8 py-4 bg-transparent text-left" :class="activeRequestId === req.id ? 'border-l-4 border-[var(--sys-brand-solid)]' : 'border-l-4 border-transparent'">
                    <div class="flex items-center gap-4 bg-transparent">
                      <div class="w-10 h-10 rounded-full bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] flex items-center justify-center text-xs font-black text-[var(--sys-text-primary)] shadow-sm">{{ req.initial }}</div>
                      <div class="bg-transparent text-left">
                        <span class="block text-sm font-black text-[var(--sys-text-primary)] mb-0.5">{{ req.name }}</span>
                        <span class="block text-[10px] font-bold text-[var(--sys-text-secondary)]/50 uppercase tracking-widest italic">MSNV: {{ req.msnv }}</span>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm font-bold text-[var(--sys-text-primary)] bg-transparent text-left">{{ req.department }}</td>
                  <td class="px-6 py-4 bg-transparent text-left">
                    <span class="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border shadow-sm transition-all" :class="getLeaveTypeClass(req.type)">{{ req.type }}</span>
                  </td>
                  <td class="px-6 py-4 text-sm font-bold text-[var(--sys-text-secondary)] italic bg-transparent text-left">{{ req.dateRange }}</td>
                  <td class="px-6 py-4 text-sm font-black text-[var(--sys-text-primary)] text-center bg-transparent">{{ req.days }}</td>
                  <td class="px-6 py-4 bg-transparent text-left">
                    <div class="flex items-center gap-2 bg-transparent text-left">
                      <span class="w-2 h-2 rounded-full shadow-sm" :class="getStatusDotClass(req.status)"></span>
                      <span class="text-[10px] font-black uppercase tracking-widest italic" :style="getStatusTextColor(req.status)">{{ req.statusText }}</span>
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
              <div class="w-14 h-14 rounded-full bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center text-lg font-black bg-transparent">{{ activeRequest.initial }}</div>
              <div class="bg-transparent text-left">
                <h6 class="text-base font-black text-[var(--sys-text-primary)] mb-1 bg-transparent">{{ activeRequest.name }}</h6>
                <span class="text-xs font-bold text-[var(--sys-text-secondary)]/60 bg-transparent">{{ activeRequest.role }}</span>
              </div>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-2 gap-6 px-1 bg-transparent text-left">
              <div class="bg-transparent text-left">
                <p class="text-[10px] font-black text-[var(--sys-text-secondary)]/40 uppercase tracking-widest mb-2 italic bg-transparent text-left">Loại nghỉ</p>
                <span class="text-sm font-black text-[var(--sys-text-primary)] bg-transparent text-left">{{ activeRequest.typeDetail }}</span>
              </div>
              <div class="bg-transparent text-left">
                <p class="text-[10px] font-black text-[var(--sys-text-secondary)]/40 uppercase tracking-widest mb-2 italic bg-transparent text-left">Tổng số ngày</p>
                <span class="text-sm font-black text-[var(--sys-text-primary)] bg-transparent text-left">{{ activeRequest.days }} ngày</span>
              </div>
            </div>

            <div class="px-1 bg-transparent text-left">
              <p class="text-[10px] font-black text-[var(--sys-text-secondary)]/40 uppercase tracking-widest mb-2 italic bg-transparent text-left">Thời gian</p>
              <div class="flex items-center gap-3 text-sm font-black text-[var(--sys-text-primary)] bg-transparent text-left">
                <span class="material-symbols-outlined text-[var(--sys-brand-solid)] bg-transparent">calendar_month</span>
                {{ activeRequest.fullDateRange }}
              </div>
            </div>

            <!-- Reason -->
            <div class="px-1 bg-transparent text-left">
              <p class="text-[10px] font-black text-[var(--sys-text-secondary)]/40 uppercase tracking-widest mb-3 italic bg-transparent text-left">Lý do nghỉ</p>
              <div class="bg-[var(--sys-bg-hover)]/50 p-5 rounded-3xl border border-[var(--sys-border-subtle)] text-sm font-bold italic text-[var(--sys-text-secondary)] bg-transparent text-left" style="line-height: 1.6;">
                "{{ activeRequest.reason }}"
              </div>
            </div>

            <!-- Balance -->
            <div class="flex justify-between items-center p-5 rounded-3xl mt-1 mx-1 bg-[var(--sys-success-soft)] border border-[var(--sys-success-border)] text-left">
              <div class="flex items-center gap-3 text-[var(--sys-success-text)] font-black bg-transparent">
                <span class="material-symbols-outlined text-lg bg-transparent">account_balance_wallet</span>
                <span class="text-xs uppercase tracking-widest bg-transparent">Số dư phép năm</span>
              </div>
              <span class="text-xs font-black text-[var(--sys-success-text)] uppercase tracking-widest bg-transparent">Còn lại: {{ activeRequest.balance }} ngày</span>
            </div>

            <!-- Warnings -->
            <div v-if="activeRequest.warnings && activeRequest.warnings.length" class="p-5 rounded-3xl mt-1 mx-1 bg-[var(--sys-danger-soft)] border border-[var(--sys-danger-border)] text-left">
              <div class="flex items-center gap-3 mb-3 text-[var(--sys-danger-text)] font-black bg-transparent">
                <span class="material-symbols-outlined text-lg bg-transparent">warning</span>
                <span class="text-xs uppercase tracking-widest bg-transparent">Cảnh báo xung đột</span>
              </div>
              <ul class="space-y-2 bg-transparent">
                <li v-for="(warn, idx) in activeRequest.warnings" :key="idx" class="text-xs font-bold text-[var(--sys-danger-text)]/80 italic flex items-start gap-2 bg-transparent text-left">
                  <span class="w-1.5 h-1.5 rounded-full bg-[var(--sys-danger-text)] mt-1 shrink-0 bg-transparent"></span>
                  {{ warn }}
                </li>
              </ul>
            </div>

            <!-- Reject Reason -->
            <div v-if="activeRequest.status === 'pending'" class="mt-2 px-1 bg-transparent text-left">
              <p class="text-[10px] font-black text-[var(--sys-text-secondary)]/40 uppercase tracking-widest mb-3 italic bg-transparent text-left">Lý do từ chối (nếu có)</p>
              <textarea class="w-full px-5 py-4 bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-black text-[var(--sys-text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all resize-none placeholder:text-[var(--sys-text-secondary)]/40 bg-transparent text-left" rows="4" placeholder="Nhập lý do nếu bạn từ chối đơn này..."></textarea>
            </div>
            
             <!-- Actions form disabled if already decided -->
            <div v-else class="mt-2 p-5 bg-[var(--sys-bg-hover)]/40 rounded-3xl text-center border border-[var(--sys-border-subtle)] mx-1 bg-transparent">
              <span class="text-[var(--sys-text-secondary)]/50 text-xs font-black uppercase tracking-widest italic bg-transparent">Đơn này đã được xử lý ({{ activeRequest.statusText }})</span>
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

const getStatusDotClass = (status) => {
  if (status === 'pending') return 'bg-[var(--sys-warning-solid)]';
  if (status === 'approved') return 'bg-[var(--sys-success-solid)]';
  return 'bg-[var(--sys-text-secondary)]/30';
};

const getStatusTextColor = (status) => {
  if (status === 'pending') return 'color: var(--sys-warning-text);';
  if (status === 'approved') return 'color: var(--sys-success-text);';
  return 'color: color-mix(in srgb, var(--sys-text-secondary) 50%, transparent);';
};

</script>

<style scoped>
/* Global active-row styles are handled safely in style.css */
.active-row td:first-child {
    box-shadow: none; /* Moved to Tailwind border-l-4 for better sync */
}

.cursor-pointer {
    cursor: pointer;
}

.transition-all {
    transition: all 0.3s ease;
}

.bg-purple-100 {
    background-color: #f3e8ff;
}
.text-purple {
    color: #9333ea;
}
.border-purple-200 {
    border-color: #e9d5ff !important;
}
</style>
