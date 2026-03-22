<template>
  <div class="space-y-6 pb-8">
    <!-- Header Area -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left">
      <div class="bg-transparent text-left">
        <h1 class="text-xl font-semibold text-[var(--sys-text-primary)] mb-1">Quản lý Chấm công & Chuyên cần</h1>
        <p class="text-sm text-[var(--sys-text-secondary)]">Kiểm soát dữ liệu chấm công, phê duyệt định mức và theo dõi nguồn lực thời gian thực.</p>
      </div>
      <div class="flex items-center gap-3 bg-transparent shrink-0">
        <div class="hidden md:flex items-center gap-2.5 bg-[var(--sys-bg-page)] px-4 h-11 rounded-md border border-[var(--sys-border-subtle)] shadow-sm">
          <span class="text-[var(--sys-text-secondary)] text-[13px] font-medium">Kỳ lương 10/2023</span>
          <span class="flex items-center gap-1.5 text-[var(--sys-success-text)] font-semibold text-[13px]">
            <span class="w-1.5 h-1.5 rounded-full bg-[var(--sys-success-solid)]"></span>
            Đang mở
          </span>
        </div>
        <button class="h-11 px-6 bg-[var(--sys-warning-solid)] rounded-md font-semibold text-sm text-white hover:brightness-90 transition-all flex items-center gap-2 shadow-sm">
          <span class="material-symbols-outlined text-[20px]">lock_open</span> 
          Khóa bảng công
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="(stat, idx) in [
        { label: 'Tổng giờ OT tháng', value: '1,240', sub: '+12.5%', unit: 'giờ', icon: 'timer', color: 'brand' },
        { label: 'Tỷ lệ chuyên cần', value: '98.5', sub: '+0.2%', unit: '%', icon: 'verified_user', color: 'success' },
        { label: 'Vắng mặt hôm nay', value: '12', sub: '-5%', unit: 'nhân sự', icon: 'person_off', color: 'danger' }
      ]" :key="idx" 
      class="bg-[var(--sys-bg-surface)] p-4 rounded-lg border border-[var(--sys-border-subtle)] shadow-sm hover:border-[var(--sys-brand-solid)] transition-all flex items-center gap-4">
        <div :class="`w-12 h-12 rounded-md flex items-center justify-center border transition-all ${
          stat.color === 'brand' ? 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)]' :
          stat.color === 'success' ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]' :
          'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]'
        }`">
          <span class="material-symbols-outlined text-[24px]">{{ stat.icon }}</span>
        </div>
        <div class="bg-transparent flex flex-col flex-1">
          <div class="flex items-center justify-between mb-0.5">
            <p class="text-[12px] font-medium text-[var(--sys-text-secondary)] uppercase tracking-wide">{{ stat.label }}</p>
            <span :class="[
              'text-[10px] font-bold',
              stat.sub.startsWith('+') ? 'text-[var(--sys-success-text)]' : 'text-[var(--sys-danger-text)]'
            ]">
              {{ stat.sub }}
            </span>
          </div>
          <div class="flex items-baseline gap-1">
            <h2 class="text-xl font-bold text-[var(--sys-text-primary)] leading-tight">{{ stat.value }}</h2>
            <span class="text-[11px] font-semibold text-[var(--sys-text-disabled)] uppercase">{{ stat.unit }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      <div class="lg:col-span-7">
        <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] shadow-sm rounded-lg p-5 h-full flex flex-col hover:border-[var(--sys-brand-solid)] transition-all">
          <h5 class="text-sm font-semibold text-[var(--sys-text-primary)] flex items-center gap-2 mb-6 uppercase tracking-wide">
            <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-[20px]">analytics</span>
            Phân bổ OT theo bộ phận
          </h5>
          <div class="flex items-end justify-around flex-grow pt-4 pb-4 px-4 bg-transparent border-b border-[var(--sys-border-subtle)]" style="min-height: 200px;">
            <div v-for="dept in ['IT', 'HR', 'Sales', 'MKT', 'Ops']" :key="dept" class="flex flex-col items-center gap-3 w-full bg-transparent group/bar">
              <div class="bg-[var(--sys-bg-page)] rounded-t-md w-8 relative overflow-hidden flex items-end shadow-inner border border-[var(--sys-border-subtle)] h-40">
                <div class="bg-[var(--sys-brand-solid)] w-full transition-all duration-500 hover:brightness-110" 
                  :style="{ height: (Math.random() * 60 + 20) + '%' }"></div>
              </div>
              <span class="text-[11px] font-semibold text-[var(--sys-text-secondary)] uppercase">{{ dept }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="lg:col-span-5">
        <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] shadow-sm rounded-lg p-5 h-full flex flex-col hover:border-[var(--sys-brand-solid)] transition-all">
          <h5 class="text-sm font-semibold text-[var(--sys-text-primary)] flex items-center gap-2 mb-6 uppercase tracking-wide">
            <span class="material-symbols-outlined text-[var(--sys-success-text)] text-[20px]">military_tech</span>
            Nhân sự gương mẫu (Sớm nhất)
          </h5>
          <div class="flex flex-col gap-4 bg-transparent">
            <div v-for="user in topEarlyUsers" :key="user.name" class="bg-transparent space-y-2">
              <div class="flex justify-between items-center text-[13px] font-semibold">
                <span class="text-[var(--sys-text-primary)]">{{ user.name }}</span>
                <span class="text-[var(--sys-success-text)]">{{ user.earlyMinutes }}p sớm</span>
              </div>
              <div class="h-1.5 bg-[var(--sys-bg-page)] rounded-full overflow-hidden border border-[var(--sys-border-subtle)] shadow-inner">
                <div class="bg-[var(--sys-success-solid)] h-full transition-all duration-700" :style="{ width: user.percent + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Table Container -->
    <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col">
      <!-- Toolbar -->
      <div class="px-4 py-3 border-b border-[var(--sys-border-subtle)] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-[var(--sys-bg-page)]/50">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center border border-[var(--sys-brand-border)]">
            <span class="material-symbols-outlined text-[24px]">event_available</span>
          </div>
          <div class="bg-transparent text-left">
            <h5 class="text-sm font-semibold text-[var(--sys-text-primary)] m-0 uppercase tracking-wide">Nhật trình chấm công</h5>
            <p class="text-[12px] text-[var(--sys-text-secondary)]">Dữ liệu sinh trắc học thời gian thực.</p>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <CalendarCustom v-model="filterDate" placeholder="Chọn ngày" class="flex-1" />
          <Dropdown v-model="filterDept" :options="deptOptions" class="min-w-[180px] h-11" />
          <Dropdown v-model="filterStatus" :options="statusOptions" class="min-w-[180px] h-11" />
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto custom-scrollbar flex-grow">
        <table class="w-full text-left border-collapse">
          <thead class="bg-[var(--sys-bg-page)]">
            <tr>
              <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider">Nhân sự</th>
              <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider text-center">Giờ vào</th>
              <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider text-center">Giờ ra</th>
              <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider text-right">Muộn</th>
              <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider text-right">Sớm</th>
              <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider text-right">OT</th>
              <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider text-center">Trạng thái</th>
              <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--sys-border-subtle)]">
            <tr v-for="record in timeRecords" :key="record.id" class="group hover:bg-[var(--sys-bg-hover)] transition-colors">
              <td class="px-4 py-3 whitespace-nowrap bg-transparent">
                <div class="flex flex-col bg-transparent">
                  <span class="text-[13px] font-semibold text-[var(--sys-text-primary)]">{{ record.name }}</span>
                  <span class="text-[11px] text-[var(--sys-text-secondary)]">{{ record.shift }}</span>
                </div>
              </td>
              <td class="px-4 py-3 text-center whitespace-nowrap bg-transparent">
                <span class="text-[13px] font-medium text-[var(--sys-text-primary)]">{{ record.checkIn }}</span>
              </td>
              <td class="px-4 py-3 text-center whitespace-nowrap bg-transparent">
                <span class="text-[13px] font-medium text-[var(--sys-text-primary)]">{{ record.checkOut }}</span>
              </td>
              <td class="px-4 py-3 text-right whitespace-nowrap bg-transparent">
                <span :class="['text-[13px] font-semibold', record.late > 0 ? 'text-[var(--sys-danger-text)]' : 'text-[var(--sys-text-disabled)] opacity-50']">
                  {{ record.late > 0 ? record.late + ' ph' : '-' }}
                </span>
              </td>
              <td class="px-4 py-3 text-right whitespace-nowrap bg-transparent">
                <span :class="['text-[13px] font-semibold', record.early > 0 ? 'text-[var(--sys-warning-text)]' : 'text-[var(--sys-text-disabled)] opacity-50']">
                  {{ record.early > 0 ? record.early + ' ph' : '-' }}
                </span>
              </td>
              <td class="px-4 py-3 text-right whitespace-nowrap bg-transparent">
                <span :class="['text-[13px] font-bold', record.ot > 0 ? 'text-[var(--sys-brand-solid)]' : 'text-[var(--sys-text-disabled)] opacity-50']">
                  {{ record.ot > 0 ? record.ot + ' h' : '-' }}
                </span>
              </td>
              <td class="px-4 py-3 text-center whitespace-nowrap bg-transparent">
                <span :class="[
                  'px-2 py-0.5 rounded-md text-[11px] font-semibold border transition-all inline-flex items-center gap-1.5 uppercase tracking-wide',
                  getStatusBadgeClass(record.statusText)
                ]">
                  <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(record.statusText)"></span>
                  {{ record.statusText }}
                </span>
              </td>
              <td class="px-4 py-3 text-right whitespace-nowrap bg-transparent">
                <div class="flex items-center justify-end">
                  <button class="w-8 h-8 flex items-center justify-center rounded-md text-[var(--sys-text-secondary)] hover:text-[var(--sys-brand-solid)] hover:bg-[var(--sys-brand-soft)] transition-all" title="Chỉnh sửa">
                    <span class="material-symbols-outlined text-[18px]">edit_square</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div class="px-4 py-3 bg-[var(--sys-bg-page)] border-t border-[var(--sys-border-subtle)] flex justify-end">
        <button class="text-[13px] font-semibold text-[var(--sys-brand-solid)] hover:opacity-80 transition-opacity flex items-center gap-1">
          Xem toàn bộ nhật trình
          <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * TRANG QUẢN LÝ CHẤM CÔNG - PHIÊN BẢN ENTERPRISE SaaS
 * Tuân thủ 7 Golden Rules:
 * - Font Inter 14px (text-sm), Tỉ lệ Table cao (text-13px)
 * - Bo góc chuẩn B2B: 6px (MD) cho Input/Button, 8px (LG) cho Card/Table
 * - Hệ màu Blue/White đồng nhất cho Action Icons
 */
import { ref } from 'vue';
import Dropdown from '@/components/Dropdown.vue';
import CalendarCustom from '@/components/CalendarCustom.vue';

const filterDate = ref('2023-10-05');
const filterDept = ref('ALL');
const filterStatus = ref('ALL');

const deptOptions = [
  { label: 'Tất cả phòng ban', value: 'ALL' },
  { label: 'Phòng Kỹ thuật', value: 'IT' },
  { label: 'Phòng Nhân sự', value: 'HR' },
  { label: 'Phòng Kinh doanh', value: 'Sales' }
];

const statusOptions = [
  { label: 'Mọi trạng thái', value: 'ALL' },
  { label: 'Đúng giờ', value: 'NORMAL' },
  { label: 'Đi muộn', value: 'LATE' },
  { label: 'Vắng mặt', value: 'ABSENT' }
];

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'ĐỦ CÔNG': return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
    case 'ĐI MUỘN': return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]';
    case 'VẮNG MẶT': return 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]';
    default: return 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-disabled)] border-[var(--sys-border-subtle)] opacity-50';
  }
};

const getStatusDotClass = (status) => {
  switch (status) {
    case 'ĐỦ CÔNG': return 'bg-[var(--sys-success-solid)]';
    case 'ĐI MUỘN': return 'bg-[var(--sys-warning-solid)]';
    case 'VẮNG MẶT': return 'bg-[var(--sys-danger-solid)]';
    default: return 'bg-[var(--sys-icon-default)] opacity-40';
  }
};

const topEarlyUsers = ref([
  { name: 'Nguyễn Văn An', earlyMinutes: 45, percent: 85 },
  { name: 'Trần Thị Bích', earlyMinutes: 30, percent: 65 },
  { name: 'Lê Văn Cường', earlyMinutes: 20, percent: 45 },
  { name: 'Phạm Thành Đạt', earlyMinutes: 15, percent: 25 },
]);

const timeRecords = ref([
  { 
    id: 1, 
    name: 'Nguyễn Văn An', 
    shift: 'Ca Sáng (08:00-17:00)', 
    checkIn: '08:15', 
    checkOut: '17:05', 
    late: 15, 
    early: 0, 
    ot: 0, 
    statusText: 'ĐI MUỘN'
  },
  { 
    id: 2, 
    name: 'Trần Thị Bích', 
    shift: 'Ca Sáng (08:00-17:00)', 
    checkIn: '07:55', 
    checkOut: '18:30', 
    late: 0, 
    early: 0, 
    ot: 1.5, 
    statusText: 'ĐỦ CÔNG'
  },
  { 
    id: 3, 
    name: 'Lê Văn Cường', 
    shift: 'Ca Sáng (08:00-17:00)', 
    checkIn: '--:--', 
    checkOut: '--:--', 
    late: 0, 
    early: 0, 
    ot: 0, 
    statusText: 'VẮNG MẶT'
  }
]);
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
</style>
