<template>
  <div class="nghi-phep-page space-y-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-black text-slate-900 tracking-tight">Quản lý Nghỉ Phép</h1>
      <p class="text-slate-500 text-sm font-medium italic">Quản lý và phê duyệt các yêu cầu nghỉ phép của toàn hệ thống.</p>
    </div>

    <!-- Main Content -->
    <div class="row g-4">
      <!-- Left List -->
      <div :class="activeRequest ? 'col-xl-8' : 'col-12'" class="transition-all">
        <div class="card border-0 shadow-sm rounded-4 h-100">
          <!-- Tabs -->
          <div class="card-header bg-white border-bottom p-0 pt-3 px-4 rounded-top-4">
            <ul class="nav nav-tabs border-bottom-0 pb-0 gap-4" style="margin-bottom: -1px;">
              <li class="nav-item">
                <a class="nav-link active px-0 pb-3 fw-bold border-0 border-bottom border-primary border-2 text-primary" href="#">Tất cả (42)</a>
              </li>
              <li class="nav-item">
                <a class="nav-link px-0 pb-3 fw-medium border-0 text-muted" href="#">Chờ duyệt (12)</a>
              </li>
              <li class="nav-item">
                <a class="nav-link px-0 pb-3 fw-medium border-0 text-muted" href="#">Đã duyệt (25)</a>
              </li>
              <li class="nav-item">
                <a class="nav-link px-0 pb-3 fw-medium border-0 text-muted" href="#">Từ chối (5)</a>
              </li>
            </ul>
          </div>

          <!-- Filters -->
          <div class="p-4 border-bottom">
            <div class="row g-3 align-items-end">
              <div class="col-md-4">
                <label class="form-label text-muted small fw-bold text-uppercase mb-1" style="font-size: 0.7rem;">Phòng ban</label>
                <Dropdown 
                  v-model="filterDept"
                  :options="deptOptions"
                  placeholder="Tất cả phòng ban"
                />
              </div>
              <div class="col-md-5">
                <label class="form-label text-muted small fw-bold text-uppercase mb-1" style="font-size: 0.7rem;">Khoảng thời gian</label>
                <Dropdown 
                  v-model="filterRange"
                  :options="rangeOptions"
                  placeholder="Tháng này"
                />
              </div>
              <div class="col-md-3">
                <button class="w-full h-[46px] bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-black transition-all d-flex align-items-center justify-content-center gap-2 border-0">
                  <span class="material-symbols-outlined" style="font-size: 20px;">filter_alt</span> 
                  Lọc dữ liệu
                </button>
              </div>
            </div>
          </div>

          <!-- Table -->
          <div class="table-responsive flex-grow-1">
            <table class="table align-middle text-nowrap mb-0 table-hover">
              <thead class="bg-white">
                <tr>
                  <th class="border-bottom py-3 px-4 text-muted fw-bold small text-uppercase" style="font-size: 0.7rem;">Nhân viên</th>
                  <th class="border-bottom py-3 text-muted fw-bold small text-uppercase" style="font-size: 0.7rem;">Phòng ban</th>
                  <th class="border-bottom py-3 text-muted fw-bold small text-uppercase" style="font-size: 0.7rem;">Loại nghỉ</th>
                  <th class="border-bottom py-3 text-muted fw-bold small text-uppercase" style="font-size: 0.7rem;">Thời gian</th>
                  <th class="border-bottom py-3 text-muted fw-bold small text-uppercase text-center" style="font-size: 0.7rem;">Tổng ngày</th>
                  <th class="border-bottom py-3 text-muted fw-bold small text-uppercase" style="font-size: 0.7rem;">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="req in requests" :key="req.id" @click="activeRequestId = req.id" 
                    class="group cursor-pointer transition-all duration-200 border-b border-slate-50" 
                    :class="activeRequestId === req.id ? 'bg-[#EFF6FF] hover:bg-[#DBEAFE]' : 'bg-white hover:bg-slate-50'">
                  <td class="px-4 py-3 bg-transparent" :class="activeRequestId === req.id ? 'ps-[12px] border-l-4 border-blue-600' : 'border-l-4 border-transparent'">
                    <div class="d-flex align-items-center gap-3 bg-transparent">
                      <div class="avatar-circle-sm bg-transparent text-dark fw-bold border" style="font-size: 0.75rem; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">{{ req.initial }}</div>
                      <div>
                        <span class="fw-bold text-dark d-block" style="font-size: 0.95rem;">{{ req.name }}</span>
                        <span class="text-muted small">MSNV: {{ req.msnv }}</span>
                      </div>
                    </div>
                  </td>
                  <td class="text-dark font-medium bg-transparent">{{ req.department }}</td>
                  <td class="bg-transparent">
                    <span class="badge rounded-1 px-2 py-1 fw-bold text-uppercase border-transparent border" :class="getLeaveTypeClass(req.type)" style="font-size: 0.65rem;">{{ req.type }}</span>
                  </td>
                  <td class="text-dark font-medium bg-transparent">{{ req.dateRange }}</td>
                  <td class="text-dark font-bold text-center fw-bold bg-transparent">{{ req.days }}</td>
                  <td class="bg-transparent">
                    <div class="d-flex align-items-center gap-2 bg-transparent">
                      <span class="rounded-circle" style="width: 8px; height: 8px;" :class="getStatusDotClass(req.status)"></span>
                      <span class="fw-medium text-dark small" :style="getStatusTextColor(req.status)">{{ req.statusText }}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="card-footer bg-white border-top p-4 d-flex justify-content-between align-items-center rounded-bottom-4 mt-auto">
            <span class="text-muted small font-medium">Hiển thị 3 trên tổng số 42 đơn nghỉ phép</span>
            <div class="d-flex gap-2">
              <button class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-all text-slate-400 border bg-transparent">
                <span class="material-symbols-outlined" style="font-size: 18px;">chevron_left</span>
              </button>
              <button class="h-8 px-3 flex items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-black shadow-lg shadow-blue-100 transition-all border-0">1</button>
              <button class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-all text-slate-400 border bg-transparent">
                <span class="material-symbols-outlined" style="font-size: 18px;">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Detail Panel -->
      <div v-show="activeRequest" class="col-xl-4 transition-all">
        <div class="card border-0 shadow-sm rounded-4 h-100 d-flex flex-column" v-if="activeRequest">
          <div class="card-header bg-white border-bottom p-4 d-flex justify-content-between align-items-center rounded-top-4">
            <h6 class="fw-bold mb-0 text-dark">Chi tiết Phê duyệt</h6>
            <button @click="activeRequestId = null" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-all text-slate-400 border-0 bg-transparent">
              <span class="material-symbols-outlined" style="font-size: 20px;">close</span>
            </button>
          </div>
          
          <div class="card-body p-4 flex-grow-1 overflow-auto d-flex flex-column gap-4">
            <!-- User info -->
            <div class="bg-light p-3 rounded-4 d-flex align-items-center gap-3 border shadow-sm" style="border-color: #f1f5f9;">
              <div class="avatar-circle-sm bg-primary bg-opacity-10 text-primary fw-bold" style="font-size: 0.9rem; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">{{ activeRequest.initial }}</div>
              <div>
                <h6 class="fw-bold mb-0 text-dark" style="font-size: 0.95rem;">{{ activeRequest.name }}</h6>
                <span class="text-muted" style="font-size: 0.8rem;">{{ activeRequest.role }}</span>
              </div>
            </div>

            <!-- Stats -->
            <div class="row g-3 px-1">
              <div class="col-6">
                <p class="text-muted small fw-bold text-uppercase mb-1" style="font-size: 0.65rem; letter-spacing: 0.5px;">Loại nghỉ</p>
                <span class="fw-bold text-dark font-medium text-wrap" style="font-size: 0.9rem;">{{ activeRequest.typeDetail }}</span>
              </div>
              <div class="col-6">
                <p class="text-muted small fw-bold text-uppercase mb-1" style="font-size: 0.65rem; letter-spacing: 0.5px;">Tổng số ngày</p>
                <span class="fw-bold text-dark font-medium" style="font-size: 0.9rem;">{{ activeRequest.days }} ngày</span>
              </div>
              <div class="col-12 mt-3">
                <p class="text-muted small fw-bold text-uppercase mb-1" style="font-size: 0.65rem; letter-spacing: 0.5px;">Thời gian</p>
                <div class="d-flex align-items-center gap-2 text-dark font-bold font-medium" style="font-size: 0.9rem;">
                  <span class="material-symbols-outlined text-primary fs-5">calendar_month</span>
                  {{ activeRequest.fullDateRange }}
                </div>
              </div>
            </div>

            <!-- Reason -->
            <div class="px-1">
              <p class="text-muted small fw-bold text-uppercase mb-2" style="font-size: 0.65rem; letter-spacing: 0.5px;">Lý do nghỉ</p>
              <div class="bg-light bg-opacity-50 p-3 rounded-3 border fst-italic text-secondary" style="font-size: 0.9rem; line-height: 1.5; border-color: #f1f5f9;">
                "{{ activeRequest.reason }}"
              </div>
            </div>

            <!-- Balance -->
            <div class="d-flex justify-content-between align-items-center p-3 rounded-3 mt-1 mx-1" style="background-color: #ecfdf5; border: 1px solid #a7f3d0;">
              <div class="d-flex align-items-center gap-2 text-success" style="color: #059669 !important;">
                <span class="material-symbols-outlined fs-5">account_balance_wallet</span>
                <span class="fw-bold small">Số dư phép năm</span>
              </div>
              <span class="fw-bold small" style="color: #059669;">Còn lại: {{ activeRequest.balance }} ngày</span>
            </div>

            <!-- Warnings -->
            <div v-if="activeRequest.warnings && activeRequest.warnings.length" class="p-3 rounded-3 mt-1 mx-1" style="background-color: #fef2f2; border: 1px solid #fecaca;">
              <div class="d-flex align-items-center gap-2 mb-2" style="color: #dc2626;">
                <span class="material-symbols-outlined fs-5">warning</span>
                <span class="fw-bold small">Cảnh báo xung đột</span>
              </div>
              <ul class="mb-0 ps-3 small" style="color: #dc2626; opacity: 0.9;">
                <li v-for="(warn, idx) in activeRequest.warnings" :key="idx" class="mb-1">{{ warn }}</li>
              </ul>
            </div>

            <!-- Reject Reason -->
            <div v-if="activeRequest.status === 'pending'" class="mt-2 px-1">
              <p class="text-muted small fw-bold text-uppercase mb-2" style="font-size: 0.65rem; letter-spacing: 0.5px;">Lý do từ chối (nếu có)</p>
              <textarea class="form-control bg-white shadow-sm" style="border: 1px solid #e2e8f0; font-size: 0.9rem;" rows="3" placeholder="Nhập lý do nếu bạn từ chối đơn này..."></textarea>
            </div>
            
             <!-- Actions form disabled if already decided -->
            <div v-else class="mt-2 p-3 bg-light rounded-3 text-center border mx-1">
              <span class="text-muted small fw-medium">Đơn này đã được xử lý ({{ activeRequest.statusText }}).</span>
            </div>

          </div>

          <!-- Actions -->
          <div v-if="activeRequest.status === 'pending'" class="card-footer bg-white border-t p-4 flex gap-3 mt-auto text-left">
            <button class="flex-1 px-6 py-2.5 min-h-[44px] text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-lg transition-all border uppercase tracking-widest">Từ chối</button>
            <button class="flex-1 px-8 py-2.5 min-h-[44px] bg-blue-600 text-white rounded-lg text-sm font-black hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all uppercase tracking-widest flex items-center justify-center gap-2">
              <span class="material-symbols-outlined">check_circle</span> 
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
  if (type.includes('Nghỉ phép')) return 'bg-primary bg-opacity-10 text-primary border-primary border-opacity-25';
  if (type.includes('ốm')) return 'bg-success bg-opacity-10 text-success border-success border-opacity-25';
  return 'bg-purple-100 text-purple border-purple-200'; // For Việc riêng
};

const getStatusDotClass = (status) => {
  if (status === 'pending') return 'bg-warning border border-white';
  if (status === 'approved') return 'bg-success border border-white';
  return 'bg-secondary border border-white';
};

const getStatusTextColor = (status) => {
  if (status === 'pending') return 'color: #d97706;'; // warning (darker orange)
  if (status === 'approved') return 'color: #16a34a;'; // success
  return 'color: #6b7280;'; // secondary
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
