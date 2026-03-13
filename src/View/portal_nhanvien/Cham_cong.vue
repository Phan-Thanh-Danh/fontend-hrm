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
    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div class="card-header bg-white border-bottom p-4 d-flex flex-wrap gap-3 align-items-center justify-content-between">
        <h3 class="h6 mb-0 fw-bold text-uppercase tracking-tight">Lịch sử cá nhân</h3>
        <div class="d-flex gap-2">
          <button class="btn btn-primary btn-sm rounded-3 px-3 py-2 d-flex align-items-center gap-2">
            <span class="material-symbols-outlined fs-5">add_circle</span>
            Xin bổ sung công
          </button>
          <div class="dropdown">
            <button class="btn btn-light btn-sm border px-3 py-2 rounded-3 dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown">
              Tháng 10
            </button>
            <ul class="dropdown-menu shadow-sm border-0 rounded-3">
              <li><a class="dropdown-item active" href="#">Tháng 10</a></li>
              <li><a class="dropdown-item" href="#">Tháng 09</a></li>
              <li><a class="dropdown-item" href="#">Tháng 08</a></li>
            </ul>
          </div>
          <div class="dropdown">
            <button class="btn btn-light btn-sm border px-3 py-2 rounded-3 dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown">
              2023
            </button>
            <ul class="dropdown-menu shadow-sm border-0 rounded-3">
              <li><a class="dropdown-item active" href="#">2023</a></li>
              <li><a class="dropdown-item" href="#">2022</a></li>
            </ul>
          </div>
          <button class="btn btn-light btn-sm border p-2 rounded-3">
            <span class="material-symbols-outlined fs-5 align-middle">filter_list</span>
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
                <span :class="getStatusClass(item.status)" class="badge x-small fw-bold text-uppercase px-2.5 py-1.5 rounded-pill">
                  {{ item.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer bg-light border-top p-4 d-flex justify-content-between align-items-center">
        <p class="x-small text-muted mb-0">Hiển thị 5 trên tổng số 22 ngày công</p>
        <nav>
          <ul class="pagination pagination-sm mb-0 gap-1">
            <li class="page-item"><a class="page-link border-0 rounded-2 px-3 bg-transparent text-dark fw-bold" href="#">Trước</a></li>
            <li class="page-item active"><a class="page-link border-0 rounded-2 px-3 fw-bold shadow-primary" href="#">1</a></li>
            <li class="page-item"><a class="page-link border-0 rounded-2 px-3 bg-transparent text-dark" href="#">2</a></li>
            <li class="page-item"><a class="page-link border-0 rounded-2 px-3 bg-transparent text-dark fw-bold" href="#">Tiếp</a></li>
          </ul>
        </nav>
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

const currentHours = ref('00');
const currentMinutes = ref('00');
const currentSeconds = ref('00');
const currentDateStr = ref('');
let timerInterval = null;

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
      return 'bg-success-light text-success';
    case 'Đi muộn':
      return 'bg-warning-light text-warning';
    case 'Về sớm':
      return 'bg-danger-light text-danger';
    default:
      return 'bg-light text-muted';
  }
};
</script>

<style scoped>
.clock-unit {
  width: 80px;
  height: 96px;
}

.shadow-inner {
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
}

.bg-warning-light {
  background-color: rgba(221, 142, 9, 0.1) !important;
}

.bg-danger-light {
  background-color: rgba(212, 47, 47, 0.1) !important;
}

.text-warning {
  color: var(--warning-color) !important;
}

.text-danger {
  color: var(--danger-color) !important;
}

.page-link.active {
  background-color: var(--primary-color);
  color: white;
}
</style>
