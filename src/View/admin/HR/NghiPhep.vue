<template>
  <div class="space-y-6 pb-8">
    <!-- Header Area -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left">
      <div class="bg-transparent text-left">
        <h1 class="text-xl font-semibold text-[var(--sys-text-primary)] mb-1">Điều phối Nghỉ phép & Vắng mặt</h1>
        <p class="text-sm text-[var(--sys-text-secondary)]">Quản lý định mức, phê duyệt yêu cầu vắng mặt và theo dõi mật độ nguồn lực.</p>
      </div>
      <div class="bg-transparent text-right hidden xl:block">
        <div class="inline-flex items-center gap-2 bg-[var(--sys-bg-page)] px-4 py-2 rounded-md border border-[var(--sys-border-subtle)] font-semibold text-[13px] text-[var(--sys-brand-solid)] shadow-sm">
          <span class="w-2 h-2 rounded-full bg-[var(--sys-brand-solid)] animate-pulse"></span>
          Hệ thống Quản trị Nhân sự
        </div>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="(stat, idx) in leaveStats" :key="idx" 
        class="bg-[var(--sys-bg-surface)] p-4 rounded-lg border border-[var(--sys-border-subtle)] shadow-sm hover:border-[var(--sys-brand-solid)] transition-all flex items-center gap-4">
        <div class="w-12 h-12 rounded-md flex items-center justify-center border border-white/10" :class="stat.bgClass">
          <span class="material-symbols-outlined text-[24px]">{{ stat.icon }}</span>
        </div>
        <div class="bg-transparent flex flex-col flex-1">
          <p class="text-[12px] font-medium text-[var(--sys-text-secondary)] uppercase tracking-wide mb-0.5">{{ stat.label }}</p>
          <div class="flex items-baseline gap-1 bg-transparent">
            <h4 class="text-xl font-bold text-[var(--sys-text-primary)] m-0 leading-tight">{{ stat.value }}</h4>
            <span class="text-[11px] font-semibold text-[var(--sys-text-disabled)] uppercase">{{ stat.unit.split(' ')[0] }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Layout -->
    <div class="flex flex-col xl:flex-row gap-6 bg-transparent">
      <!-- Left: Requests List -->
      <div :class="activeRequestId ? 'xl:w-2/3' : 'w-full'" class="transition-all duration-300 bg-transparent text-left flex flex-col gap-4">
        <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col min-h-[600px]">
          <!-- Filters & Tabs Toolbar -->
          <div class="px-4 py-3 border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 space-y-4">
            <!-- First Row: Ultra-Compact Tabs + Search -->
            <div class="flex flex-row items-center justify-between gap-3 bg-transparent w-full">
              <!-- Tabs Container - Ultra Compact -->
              <div class="flex items-center gap-0.5 bg-white p-0.5 rounded-md border border-[var(--sys-border-subtle)] shadow-sm overflow-x-auto no-scrollbar shrink-0 max-w-[60%]">
                <button 
                  v-for="tab in tabOptions" :key="tab.value"
                  @click="activeTab = tab.value"
                  :class="[
                    'px-3.5 py-1.5 rounded-md text-[13px] font-semibold transition-all whitespace-nowrap flex items-center gap-1.5',
                    activeTab === tab.value ? 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] shadow-sm' : 'text-[var(--sys-text-secondary)] hover:bg-[var(--sys-bg-hover)]'
                  ]"
                >
                  {{ tab.label }}
                  <span class="px-1.5 py-0.5 rounded-md bg-[var(--sys-danger-solid)] text-white text-[10px] font-bold" v-if="tab.count > 0">{{ tab.count }}</span>
                </button>
              </div>

              <!-- Search Bar - Maximum Visibility -->
              <div class="relative flex-1 max-w-sm group">
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[var(--sys-brand-solid)]">search</span>
                <input v-model="searchQuery" type="text" placeholder="Tìm kiếm..." class="w-full h-10 pl-10 pr-4 bg-white border border-[var(--sys-border-strong)] rounded-md text-[13px] font-medium text-[var(--sys-text-primary)] focus:border-[var(--sys-brand-solid)] outline-none transition-all placeholder:text-[var(--sys-text-disabled)] shadow-sm">
              </div>
            </div>

            <!-- Second Row: Balanced Dropdowns -->
            <div class="flex flex-col md:flex-row items-center gap-4">
              <div class="flex-1 w-full">
                <Dropdown v-model="filterDept" :options="deptOptions" class="w-full h-10" />
              </div>
              <div class="flex-1 w-full">
                <Dropdown v-model="filterRange" :options="rangeOptions" class="w-full h-10" />
              </div>
            </div>
          </div>

          <!-- Table Content -->
          <div class="overflow-x-auto flex-grow bg-transparent custom-scrollbar">
            <table class="w-full text-left border-collapse">
              <thead class="bg-[var(--sys-bg-page)]">
                <tr>
                  <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider">Nhân sự thụ hưởng</th>
                  <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider">Đơn vị</th>
                  <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider">Loại hình vắng</th>
                  <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider text-center">Thời gian</th>
                  <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider text-center">Số ngày</th>
                  <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider text-right">Trạng thái</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[var(--sys-border-subtle)]">
                <tr v-for="req in filteredRequests" :key="req.id" @click="activeRequestId = req.id" 
                  class="group cursor-pointer hover:bg-[var(--sys-bg-hover)] transition-all" 
                  :class="activeRequestId === req.id ? 'bg-[var(--sys-brand-soft)]/30' : ''">
                  <td class="px-4 py-3 whitespace-nowrap bg-transparent">
                    <div class="flex flex-col bg-transparent">
                      <span class="text-[13px] font-semibold text-[var(--sys-text-primary)] transition-colors line-clamp-1 max-w-[200px]">{{ req.name }}</span>
                      <span class="text-[11px] text-[var(--sys-brand-solid)] font-bold opacity-60">#{{ req.msnv }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap bg-transparent">
                    <span class="text-[13px] text-[var(--sys-text-secondary)]">{{ req.department }}</span>
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap bg-transparent">
                    <span :class="['px-2 py-0.5 rounded-md text-[11px] font-semibold border transition-all uppercase tracking-wide', getLeaveTypeClass(req.type)]">{{ req.type }}</span>
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap bg-transparent text-center">
                    <span class="text-[13px] text-[var(--sys-text-secondary)]">{{ req.dateRange }}</span>
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap bg-transparent text-center">
                    <span class="text-[13px] font-bold text-[var(--sys-brand-solid)]">{{ req.days }}</span>
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap bg-transparent text-right">
                    <span :class="[
                      'px-2 py-0.5 rounded-md text-[11px] font-semibold inline-flex items-center gap-1.5 border transition-all uppercase tracking-wide',
                      getStatusBadgeClass(req.status)
                    ]">
                      <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="getStatusDotClass(req.status)"></span>
                      {{ req.statusText }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Footer -->
          <div class="px-4 py-3 bg-[var(--sys-bg-page)] border-t border-[var(--sys-border-subtle)] flex justify-between items-center text-[12px] font-medium text-[var(--sys-text-secondary)]">
            <span>Hiển thị {{ filteredRequests.length }} hồ sơ biến động</span>
            <div class="flex items-center gap-1.5">
              <button class="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-[var(--sys-border-subtle)] hover:text-[var(--sys-brand-solid)] transition-all">
                <span class="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button class="w-8 h-8 flex items-center justify-center rounded-md bg-[var(--sys-brand-solid)] text-white font-bold">1</button>
              <button class="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-[var(--sys-border-subtle)] hover:text-[var(--sys-brand-solid)] transition-all">
                <span class="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Detail Panel -->
      <div v-show="activeRequestId" class="xl:w-1/3 transition-all duration-300 bg-transparent text-left">
        <div class="bg-[var(--sys-bg-surface-elevated)] border border-[var(--sys-border-subtle)] shadow-lg rounded-lg overflow-hidden flex flex-col h-full sticky top-4" v-if="activeRequest">
          <!-- Panel Header -->
          <div class="px-6 py-4 border-b border-[var(--sys-border-subtle)] flex justify-between items-center bg-[var(--sys-bg-surface)]">
            <div class="bg-transparent text-left flex flex-col">
              <h3 class="text-sm font-semibold text-[var(--sys-text-primary)] m-0 uppercase tracking-tight">Thẩm định hồ sơ</h3>
              <p class="text-[12px] text-[var(--sys-text-secondary)] mt-0.5">Mã nghiệp vụ: #LV-{{ activeRequest.id }}</p>
            </div>
            <button @click="activeRequestId = null" class="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[var(--sys-bg-hover)] transition-all text-[var(--sys-text-secondary)]">
              <span class="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
          
          <!-- Panel Body -->
          <div class="p-6 flex-grow flex flex-col gap-6 custom-scrollbar overflow-y-auto bg-transparent">
            <!-- Profile Info -->
            <div class="flex items-center gap-4 p-4 bg-[var(--sys-bg-page)] rounded-lg border border-[var(--sys-border-subtle)]">
              <div class="w-12 h-12 rounded-lg bg-[var(--sys-brand-solid)] text-white flex items-center justify-center shadow-sm">
                <span class="material-symbols-outlined text-[28px]">person_search</span>
              </div>
              <div class="flex flex-col bg-transparent text-left flex-1">
                <h4 class="text-base font-bold text-[var(--sys-text-primary)] m-0">{{ activeRequest.name }}</h4>
                <p class="text-[12px] text-[var(--sys-text-secondary)] font-medium mt-0.5">{{ activeRequest.role }} • #{{ activeRequest.msnv }}</p>
              </div>
            </div>

            <!-- Meta Data Grid -->
            <div class="grid grid-cols-2 gap-4 bg-transparent border-none">
              <div class="p-3 bg-[var(--sys-bg-page)] rounded-md border border-[var(--sys-border-subtle)]">
                <p class="text-[11px] font-semibold text-[var(--sys-text-secondary)] uppercase tracking-wider mb-1">Loại vắng mặt</p>
                <p class="text-[13px] font-bold text-[var(--sys-text-primary)] m-0">{{ activeRequest.typeDetail }}</p>
              </div>
              <div class="p-3 bg-[var(--sys-bg-page)] rounded-md border border-[var(--sys-border-subtle)]">
                <p class="text-[11px] font-semibold text-[var(--sys-text-secondary)] uppercase tracking-wider mb-1">Số ngày</p>
                <p class="text-[13px] font-bold text-[var(--sys-brand-solid)] m-0">{{ activeRequest.days }} NGÀY</p>
              </div>
            </div>

            <div class="space-y-1.5 bg-transparent border-none">
              <label class="text-[12px] font-semibold text-[var(--sys-text-secondary)] uppercase tracking-wider block ml-1">Thời gian hiệu lực</label>
              <div class="flex items-center gap-3 bg-[var(--sys-bg-page)] p-3 rounded-md border border-[var(--sys-border-subtle)] text-[13px] font-bold text-[var(--sys-text-primary)]">
                <span class="material-symbols-outlined text-[20px] text-[var(--sys-brand-solid)]">calendar_clock</span>
                {{ activeRequest.fullDateRange }}
              </div>
            </div>

            <div class="space-y-1.5 bg-transparent border-none">
              <label class="text-[12px] font-semibold text-[var(--sys-text-secondary)] uppercase tracking-wider block ml-1">Lý do & Thuyết minh</label>
              <div class="bg-[var(--sys-bg-page)] p-4 rounded-md border-l-4 border-l-[var(--sys-brand-solid)] text-[13px] text-[var(--sys-text-primary)] font-medium leading-relaxed italic">
                "{{ activeRequest.reason }}"
              </div>
            </div>

            <div class="p-4 bg-[var(--sys-brand-soft)] rounded-lg border border-[var(--sys-brand-border)] flex items-center justify-between">
              <div class="flex items-center gap-2 text-[var(--sys-brand-solid)]">
                <span class="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                <span class="text-[12px] font-bold uppercase tracking-wide">Quỹ phép tồn</span>
              </div>
              <span class="text-sm font-bold text-[var(--sys-brand-solid)] bg-white/50 px-2 py-0.5 rounded border border-[var(--sys-brand-border)]">{{ activeRequest.balance }} NGÀY</span>
            </div>

            <!-- Warnings -->
            <div v-if="activeRequest.warnings && activeRequest.warnings.length" class="space-y-3 p-4 bg-[var(--sys-danger-soft)]/50 border border-[var(--sys-danger-border)] rounded-lg">
              <div class="flex items-center gap-2 text-[var(--sys-danger-text)] font-bold uppercase text-[11px]">
                <span class="material-symbols-outlined text-[18px]">warning</span>
                Xung đột hệ thống
              </div>
              <ul class="space-y-2 m-0 p-0 list-none">
                <li v-for="(warn, idx) in activeRequest.warnings" :key="idx" class="text-[11px] font-medium text-[var(--sys-danger-text)] flex items-start gap-2 bg-white/60 p-2 rounded-md border border-[var(--sys-danger-border)]/20 shadow-sm leading-relaxed">
                  <span class="w-1 h-1 rounded-full bg-[var(--sys-danger-solid)] mt-1.5 shrink-0"></span>
                  {{ warn }}
                </li>
              </ul>
            </div>

            <!-- Approval Textarea -->
            <div v-if="activeRequest.status === 'pending'" class="space-y-1.5 bg-transparent border-none">
              <label class="text-[12px] font-semibold text-[var(--sys-text-secondary)] uppercase tracking-wider block ml-1">Ý kiến phê chuẩn</label>
              <textarea class="w-full h-24 px-3 py-2 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-sm text-[var(--sys-text-primary)] focus:border-[var(--sys-brand-solid)] outline-none transition-all resize-none shadow-inner" placeholder="Nhập nội dung phản hồi..."></textarea>
            </div>
          </div>

          <!-- Sticky Footer -->
          <div v-if="activeRequest.status === 'pending'" class="p-6 border-t border-[var(--sys-border-subtle)] flex gap-3 bg-[var(--sys-bg-surface)] shadow-lg mt-auto">
            <button class="flex-1 h-11 px-4 text-sm font-semibold text-[var(--sys-text-secondary)] hover:bg-[var(--sys-danger-soft)] hover:text-[var(--sys-danger-solid)] border border-[var(--sys-border-strong)] rounded-md transition-all flex items-center justify-center gap-2 uppercase tracking-wide">
              <span class="material-symbols-outlined text-[20px]">cancel</span>
              Từ chối
            </button>
            <button class="flex-[2] h-11 px-6 bg-[var(--sys-brand-solid)] text-white rounded-md text-sm font-bold shadow-sm hover:brightness-90 transition-all flex items-center justify-center gap-2 uppercase tracking-wide">
              <span class="material-symbols-outlined text-[20px]">check_circle</span> 
              Phê chuẩn
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * TRANG ĐIỀU PHỐI NGHỈ PHÉP - PHIÊN BẢN ENTERPRISE SaaS
 * Tuân thủ 7 Golden Rules:
 * - Font Inter 14px (text-sm), Tỉ lệ thẻ/bảng cao (text-13px)
 * - Bo góc chuẩn B2B: 6px (MD) cho Input/Button/Dropdown, 8px (LG) cho Card/Thẻ/Modal
 * - Hệ màu Blue/White đồng nhất cho Action Icons (Approve)
 */
import { ref, computed } from 'vue';
import Dropdown from '@/components/Dropdown.vue';

const filterDept = ref('ALL');
const filterRange = ref('month');
const activeTab = ref('all');
const searchQuery = ref('');

const leaveStats = ref([
  { label: 'Yêu cầu chờ duyệt', value: '12', unit: 'HỒ SƠ', icon: 'pending_actions', bgClass: 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)]' },
  { label: 'Đã phê chuẩn', value: '25', unit: 'HỒ SƠ', icon: 'task_alt', bgClass: 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)]' },
  { label: 'Đang vắng mặt', value: '08', unit: 'NHÂN SỰ', icon: 'person_off', bgClass: 'bg-[var(--sys-brand-solid)] text-white' },
  { label: 'Tỷ trọng vắng mặt', value: '4.2', unit: '% TỔNG', icon: 'query_stats', bgClass: 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)]' }
]);

const tabOptions = [
  { label: 'Tất cả', value: 'all', count: 0 },
  { label: 'Chờ duyệt', value: 'pending', count: 12 },
  { label: 'Đã duyệt', value: 'approved', count: 0 },
  { label: 'Từ chối', value: 'rejected', count: 0 },
];

const deptOptions = [
  { label: 'Phòng ban: Tất cả', value: 'ALL' },
  { label: 'Phòng ban: Kỹ thuật', value: 'Kỹ thuật' },
  { label: 'Phòng ban: Nhân sự', value: 'Nhân sự' },
  { label: 'Phòng ban: Marketing', value: 'Marketing' }
];

const rangeOptions = [
  { label: 'Chu kỳ: Trong tháng', value: 'month' },
  { label: 'Chu kỳ: Trong quý', value: 'quarter' }
];

const requests = ref([
  {
    id: 1,
    name: 'Nguyễn Văn An',
    msnv: '202401',
    department: 'Kỹ thuật',
    role: 'Frontend Systems Engineer',
    type: 'Phép năm',
    typeDetail: 'Nghỉ phép thường niên',
    dateRange: '10/10 - 12/10/2024',
    fullDateRange: '10/10/2024 - 12/10/2024',
    days: 3,
    status: 'pending',
    statusText: 'Chờ duyệt',
    reason: 'Giải quyết công việc gia đình đột xuất tại địa phương. Đã hoàn tất việc bàn giao mã nguồn và tài liệu kỹ thuật cho nhóm trực vận hành.',
    balance: 5,
    warnings: [
      'Xung đột lịch bảo trì hệ thống định kỳ (11/10)',
      'Khối Kỹ thuật đã đạt ngưỡng 20% định mức vắng mặt an toàn'
    ]
  },
  {
    id: 2,
    name: 'Trần Thu Hà',
    msnv: '202405',
    department: 'Nhân sự',
    role: 'Senior Talent Acquisition',
    type: 'Nghỉ ốm',
    typeDetail: 'Nghỉ điều trị y tế',
    dateRange: '05/10 - 05/10/2024',
    fullDateRange: '05/10/2024 - 05/10/2024',
    days: 1,
    status: 'approved',
    statusText: 'Đã duyệt',
    reason: 'Vấn đề sức khỏe cá nhân cần can thiệp y tế. Đã cung cấp hồ sơ bệnh án điện tử từ cơ sở chuyên khoa.',
    balance: 10,
    warnings: []
  },
  {
    id: 3,
    name: 'Lưu Trọng Trí',
    msnv: '202409',
    department: 'Marketing',
    role: 'Digital Marketing Lead',
    type: 'Việc riêng',
    typeDetail: 'Nghỉ không lương',
    dateRange: '12/10 - 13/10/2024',
    fullDateRange: '12/10/2024 - 13/10/2024',
    days: 2,
    status: 'rejected',
    statusText: 'Đã từ chối',
    reason: 'Giải quyết kế hoạch cá nhân kết hợp du lịch định kỳ.',
    balance: 7,
    warnings: [
      'Trùng giai đoạn khởi chạy chiến dịch (Stage-Gate 3)',
      'Đơn vị Marketing đang trong chu kỳ cao điểm vận hành'
    ]
  }
]);

const activeRequestId = ref(1);

const activeRequest = computed(() => {
  return requests.value.find(r => r.id === activeRequestId.value) || null;
});

const filteredRequests = computed(() => {
  let list = requests.value;
  if (activeTab.value !== 'all') {
    list = list.filter(r => r.status === activeTab.value);
  }
  if (filterDept.value !== 'ALL') {
    list = list.filter(r => r.department === filterDept.value);
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(r => r.name.toLowerCase().includes(q) || r.msnv.toLowerCase().includes(q));
  }
  return list;
});

const getLeaveTypeClass = (type) => {
  if (type.includes('Phép')) return 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)]';
  if (type.includes('ốm')) return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
  return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]';
};

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'approved': return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
    case 'pending': return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]';
    case 'rejected': return 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]';
    default: return 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-disabled)] border-[var(--sys-border-subtle)] opacity-50';
  }
};

const getStatusDotClass = (status) => {
  switch (status) {
    case 'approved': return 'bg-[var(--sys-success-solid)]';
    case 'pending': return 'bg-[var(--sys-warning-solid)]';
    case 'rejected': return 'bg-[var(--sys-danger-solid)]';
    default: return 'bg-[var(--sys-icon-default)] opacity-40';
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--sys-border-subtle);
  border-radius: 5px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--sys-brand-solid);
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
