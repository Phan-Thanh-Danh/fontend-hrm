<template>
  <div class="container-fluid py-4">
    <!-- Header Section -->
    <div class="d-flex align-items-end justify-content-between mb-5">
      <div>
        <h1 class="h2 fw-black tracking-tight text-dark mb-1">Chấm công & Lịch sử</h1>
        <p class="text-muted mb-0">Quản lý thời gian làm việc và xem lại lịch sử chấm công của bạn.</p>
      </div>
      <div class="text-end d-none d-sm-block">
        <p class="h5 fw-bold text-primary mb-0">{{ currentDateStr }}</p>
      </div>
    </div>

    <!-- Clock-in/out Section -->
    <div class="row g-4 mb-5">
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm rounded-4 p-5 d-flex flex-column align-items-center justify-content-center text-center">
          <!-- Real-time Clock Style -->
          <div class="d-flex gap-3 mb-5">
            <div class="d-flex flex-column align-items-center gap-2">
              <div class="clock-unit bg-light rounded-4 d-flex align-items-center justify-content-center shadow-inner">
                <span class="display-5 fw-black text-primary">{{ currentHours }}</span>
              </div>
              <span class="x-small fw-bold text-uppercase tracking-wider text-muted">Giờ</span>
            </div>
            <div class="display-5 fw-black text-muted pt-2">:</div>
            <div class="d-flex flex-column align-items-center gap-2">
              <div class="clock-unit bg-light rounded-4 d-flex align-items-center justify-content-center shadow-inner">
                <span class="display-5 fw-black text-primary">{{ currentMinutes }}</span>
              </div>
              <span class="x-small fw-bold text-uppercase tracking-wider text-muted">Phút</span>
            </div>
            <div class="display-5 fw-black text-muted pt-2 text-opacity-25">:</div>
            <div class="d-flex flex-column align-items-center gap-2">
              <div class="clock-unit bg-light rounded-4 d-flex align-items-center justify-content-center shadow-inner">
                <span class="display-5 fw-black text-primary opacity-50">{{ currentSeconds }}</span>
              </div>
              <span class="x-small fw-bold text-uppercase tracking-wider text-muted">Giây</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="d-flex gap-3 w-100" style="max-width: 480px;">
            <button class="btn btn-primary btn-lg flex-grow-1 rounded-4 fw-bold py-3 shadow-primary d-flex align-items-center justify-content-center gap-2">
              <span class="material-symbols-outlined">login</span>
              Chấm công Vào
            </button>
            <button class="btn btn-light btn-lg flex-grow-1 border rounded-4 fw-bold py-3 d-flex align-items-center justify-content-center gap-2">
              <span class="material-symbols-outlined">logout</span>
              Chấm công Ra
            </button>
          </div>
          <p class="small text-muted italic mt-4">
            <span class="material-symbols-outlined fs-6 align-middle me-1">history</span>
            Lần chấm công gần nhất: 08:25:12 (Vào)
          </p>
        </div>
      </div>

      <!-- Today's Summary -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 h-100">
          <h3 class="h6 mb-4 fw-bold d-flex align-items-center gap-2">
            <span class="material-symbols-outlined text-primary">analytics</span>
            Tóm tắt hôm nay
          </h3>
          <div class="d-flex flex-column gap-3">
            <div class="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light">
              <span class="small text-muted">Giờ vào</span>
              <span class="fw-bold">08:25</span>
            </div>
            <div class="d-flex justify-content-between align-items-center p-3 rounded-3 bg-light">
              <span class="small text-muted">Giờ ra dự kiến</span>
              <span class="fw-bold">17:30</span>
            </div>
            <div class="d-flex justify-content-between align-items-center p-3 rounded-3 bg-primary-light">
              <span class="small text-muted">Tổng giờ tích lũy</span>
              <span class="fw-bold text-primary">4.5 giờ</span>
            </div>
          </div>
          <div class="mt-auto pt-4 text-center">
            <div class="progress bg-light mb-2" style="height: 6px;">
              <div class="progress-bar bg-primary" role="progressbar" style="width: 56.25%;"></div>
            </div>
            <span class="x-small text-muted">Bạn đã hoàn thành 56% mục tiêu ngày</span>
          </div>
        </div>
      </div>
    </div>

    <!-- History Table Section -->
    <div class="bg-[var(--sys-bg-surface)] rounded-4 shadow-sm border border-[var(--sys-border-subtle)] overflow-hidden">
      <div class="px-6 py-5 border-b border-[var(--sys-border-subtle)] flex flex-wrap gap-4 align-items-center justify-between bg-[var(--sys-bg-page)]/30 text-left">
        <h3 class="text-base font-black text-[var(--sys-text-primary)] mb-0 uppercase tracking-tight italic">Lịch sử cá nhân</h3>
        <div class="flex flex-wrap gap-3 items-center">
          <button class="bg-[var(--sys-brand-solid)] hover:bg-[var(--sys-brand-hover)] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-all active:scale-95">
            <span class="material-symbols-outlined text-[18px]">add_circle</span>
            Xin bổ sung công
          </button>
          
          <Dropdown 
            v-model="selectedMonth"
            :options="monthOptions"
            placeholder="Chọn tháng"
          />
          
          <Dropdown 
            v-model="selectedYear"
            :options="yearOptions"
            placeholder="Chọn năm"
          />

          <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-text-secondary)] hover:border-[var(--sys-brand-solid)] hover:text-[var(--sys-brand-solid)] transition-all" title="Bộ lọc nâng cao">
            <span class="material-symbols-outlined text-[20px]">filter_list</span>
          </button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="bg-light border-bottom">
            <tr class="x-small text-muted text-uppercase fw-bold">
              <th class="px-4 py-3 border-0">Ngày</th>
              <th class="px-4 py-3 border-0">Giờ Vào</th>
              <th class="px-4 py-3 border-0">Giờ Ra</th>
              <th class="px-4 py-3 border-0 text-center">Tổng giờ</th>
              <th class="px-4 py-3 border-0 text-end">Trạng thái</th>
            </tr>
          </thead>
          <tbody class="small">
            <tr v-for="(item, index) in historyItems" :key="index">
              <td class="px-4 py-3 fw-semibold">{{ item.day }}</td>
              <td class="px-4 py-3">{{ item.checkIn }}</td>
              <td class="px-4 py-3">{{ item.checkOut }}</td>
              <td class="px-4 py-3 text-center fw-medium">{{ item.total }}</td>
              <td class="px-4 py-3 text-end">
                <span :class="getStatusClass(item.status)" class="badge x-small fw-bold text-uppercase px-2.5 py-1.5 custom-rounded-badge">
                  {{ item.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="px-6 py-4 border-top border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/20 flex justify-between items-center">
        <p class="text-xs font-medium text-[var(--sys-text-secondary)] mb-0">Hiển thị 5 trên tổng số 22 ngày công</p>
        <div class="flex items-center gap-1">
          <button class="px-3 py-1.5 rounded-lg text-xs font-black text-[var(--sys-text-primary)] hover:bg-[var(--sys-bg-hover)] transition-colors">Trước</button>
          <button class="w-8 h-8 rounded-lg text-xs font-black bg-[var(--sys-brand-solid)] text-white shadow-sm shadow-[var(--sys-brand-solid-lch-30)]">1</button>
          <button class="w-8 h-8 rounded-lg text-xs font-black text-[var(--sys-text-primary)] hover:bg-[var(--sys-bg-hover)] transition-colors">2</button>
          <button class="px-3 py-1.5 rounded-lg text-xs font-black text-[var(--sys-text-primary)] hover:bg-[var(--sys-bg-hover)] transition-colors">Tiếp</button>
        </div>
      </div>
    </div>

    <!-- Nút Giải trình chấm công -->
    <div class="mt-4 d-flex justify-content-end">
      <router-link to="/giai-trinh-cham-cong" class="btn btn-warning fw-bold px-4 py-2 rounded-3 shadow-sm d-inline-flex align-items-center gap-2 text-dark border border-warning">
        <span class="material-symbols-outlined">report_problem</span>
        Giải Trình Chấm Công
      </router-link>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Dropdown from '@/components/Dropdown.vue';

const currentHours = ref('00');
const currentMinutes = ref('00');
const currentSeconds = ref('00');
const currentDateStr = ref('');
let timerInterval = null;

// Filter States
const selectedMonth = ref(10);
const selectedYear = ref(2023);

const monthOptions = [
  { label: 'Tháng 10', value: 10 },
  { label: 'Tháng 09', value: 9 },
  { label: 'Tháng 08', value: 8 },
  { label: 'Tháng 07', value: 7 },
  { label: 'Tháng 06', value: 6 },
];

const yearOptions = [
  { label: 'Năm 2023', value: 2023 },
  { label: 'Năm 2022', value: 2022 },
  { label: 'Năm 2021', value: 2021 },
];

const updateTime = () => {
  const now = new Date();
  currentHours.value = String(now.getHours()).padStart(2, '0');
  currentMinutes.value = String(now.getMinutes()).padStart(2, '0');
  currentSeconds.value = String(now.getSeconds()).padStart(2, '0');
  
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  currentDateStr.value = `${days[now.getDay()]}, ngày ${now.getDate()} tháng ${now.getMonth() + 1} năm ${now.getFullYear()}.`;
};

onMounted(() => {
  updateTime();
  timerInterval = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});

const historyItems = ref([
  { day: 'Thứ Sáu, 20/10', checkIn: '08:10:45', checkOut: '17:35:12', total: '8.5h', status: 'Hợp lệ' },
  { day: 'Thứ Năm, 19/10', checkIn: '08:45:10', checkOut: '17:30:00', total: '7.75h', status: 'Đi muộn' },
  { day: 'Thứ Tư, 18/10', checkIn: '08:05:30', checkOut: '16:15:00', total: '7.0h', status: 'Về sớm' },
  { day: 'Thứ Ba, 17/10', checkIn: '08:00:15', checkOut: '17:45:30', total: '8.75h', status: 'Hợp lệ' },
  { day: 'Thứ Hai, 16/10', checkIn: '07:55:12', checkOut: '17:32:05', total: '8.5h', status: 'Hợp lệ' }
]);

const getStatusClass = (status) => {
  switch (status) {
    case 'Hợp lệ':
      return 'status-approved';
    case 'Đi muộn':
      return 'status-late';
    case 'Về sớm':
      return 'status-early';
    default:
      return 'status-default';
  }
};
</script>

<style scoped>
.clock-unit {
  width: 80px;
  height: 96px;
  background-color: var(--sys-bg-page) !important;
}

.shadow-inner {
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
}

.status-approved {
  background-color: var(--sys-success-soft) !important;
  color: var(--sys-success-text) !important;
}

.status-late {
  background-color: var(--sys-warning-soft) !important;
  color: var(--sys-warning-text) !important;
}

.status-early {
  background-color: var(--sys-danger-soft) !important;
  color: var(--sys-danger-text) !important;
}

.status-default {
  background-color: var(--sys-bg-page) !important;
  color: var(--sys-text-secondary) !important;
}

.custom-rounded-badge {
  border-radius: 6px !important;
}

.page-link.active {
  background-color: var(--sys-accent);
  color: var(--sys-accent-text);
}

.card {
  background-color: var(--sys-bg-surface) !important;
  color: var(--sys-text-primary) !important;
}

.bg-white {
  background-color: var(--sys-bg-surface) !important;
}

.text-dark {
  color: var(--sys-text-primary) !important;
}

.text-muted, .text-secondary {
  color: var(--sys-text-secondary) !important;
}

.bg-light {
  background-color: var(--sys-bg-page) !important;
}

.border {
  border-color: var(--sys-border) !important;
}

.table thead {
  background-color: var(--sys-bg-page) !important;
}
</style>
