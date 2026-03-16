<template>
  <div class="dashboard-wrapper container-fluid py-4 min-vh-100">
    <!-- Header -->
    <div class="mb-4">
      <h1 class="h2 fw-black text-dark mb-1">Chào buổi sáng, A!</h1>
      <p class="text-secondary fw-medium">{{ currentDateStr }} Chúc bạn một ngày làm việc hiệu quả.</p>
    </div>

    <!-- Main Content Grid -->
    <div class="row g-4 mb-4">
      <!-- Left Column (Layout for Check-in, Leave, Summary) -->
      <div class="col-lg-8 d-flex flex-column gap-4">
        
        <!-- Top Row: Time & Check-in/out -->
        <div class="card bento-card p-4">
          <div class="row align-items-center g-4">
            <!-- Time Section -->
            <div class="col-md-6 border-end-md">
              <p class="text-uppercase small fw-bold text-secondary tracking-wider mb-2">GIỜ HIỆN TẠI</p>
              <div class="d-flex align-items-baseline gap-1 mb-2">
                <span class="display-3 fw-bold text-brand-blue lh-1">{{ currentHours }}:{{ currentMinutes }}</span>
                <span class="h4 fw-bold text-secondary ms-1 mb-0">{{ currentSeconds }}s</span>
              </div>
              <p class="text-muted small d-flex align-items-center gap-1 mb-1">
                <span class="material-symbols-outlined fs-6">location_on</span>
                Văn phòng TP. Hồ Chí Minh
              </p>
              <p class="text-success small fw-semibold d-flex align-items-center gap-1 mb-0">
                <span class="rounded-circle bg-success d-inline-block" style="width: 6px; height: 6px;"></span>
                GPS/IP: HỢP LỆ
              </p>
            </div>
            
            <!-- Check-in/out Buttons -->
            <div class="col-md-6">
              <div class="d-flex gap-3 justify-content-md-end">
                <button class="btn btn-checkin text-white fw-bold d-flex align-items-center justify-content-center gap-2 px-4 shadow-sm">
                  <span class="material-symbols-outlined fs-5">login</span>
                  <span class="fs-5 text-nowrap">Check-in</span>
                </button>
                <button class="btn btn-checkout text-white fw-bold d-flex align-items-center justify-content-center gap-2 px-4 shadow-sm">
                  <span class="material-symbols-outlined fs-5">logout</span>
                  <span class="fs-5 text-nowrap">Check-out</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Row: Leave & Summary -->
        <div class="row g-4">
          <!-- Leave Balance Card -->
          <div class="col-sm-6">
            <div class="card bento-card bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] shadow-sm rounded-xl p-4 h-100 position-relative overflow-hidden">
              <div class="d-flex justify-content-between align-items-start mb-4">
                <div class="icon-box-white rounded-3 d-flex align-items-center justify-content-center bg-[var(--sys-brand-soft)]">
                  <span class="material-symbols-outlined text-[var(--sys-brand-solid)]">calendar_month</span>
                </div>
                <span class="badge bg-[var(--sys-brand-soft)] py-2 px-3 rounded-2 fw-black italic" style="color: var(--sys-brand-solid) !important;">Năm 2023</span>
              </div>
              
              <p class="small fw-semibold text-[var(--sys-text-secondary)] mb-1 text-uppercase">QUỸ PHÉP NĂM CÒN LẠI</p>
              <div class="d-flex align-items-baseline gap-2 mb-4">
                <span class="display-3 font-bold text-[var(--sys-text-primary)] lh-1">12</span>
                <span class="h5 fw-medium text-[var(--sys-text-secondary)]">ngày</span>
              </div>
              
              <div class="mt-auto">
                <div class="d-flex justify-content-between x-small text-[var(--sys-text-secondary)] fw-medium mb-2 text-uppercase">
                  <span>ĐÃ DÙNG: 6</span>
                  <span>TỔNG: 18</span>
                </div>
                <div class="progress rounded-pill bg-[var(--sys-bg-hover)]" style="height: 12px;">
                  <div class="progress-bar bg-[var(--sys-brand-solid)] rounded-pill" role="progressbar" style="width: 33%;"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Monthly Attendance Summary -->
          <div class="col-sm-6">
            <div class="card bento-card p-4 h-100">
              <h3 class="h6 fw-bold mb-4 text-uppercase">TÓM TẮT CHẤM CÔNG THÁNG</h3>
              <div class="row text-center g-3 mt-2">
                <!-- Actual -->
                <div class="col-4 px-1">
                  <div class="text-success mb-2 d-flex justify-content-center">
                    <span class="material-symbols-outlined">event_available</span>
                  </div>
                  <div class="x-small text-muted fw-bold mb-2 text-nowrap">CÔNG THỰC TẾ</div>
                  <div class="h3 fw-bold text-dark mb-0">18.5</div>
                </div>
                <!-- Absent -->
                <div class="col-4 px-1 border-start border-end">
                  <div class="text-danger mb-2 d-flex justify-content-center">
                    <span class="material-symbols-outlined">event_busy</span>
                  </div>
                  <div class="x-small text-muted fw-bold mb-2 text-nowrap">VẮNG</div>
                  <div class="h3 fw-bold text-dark mb-0">0</div>
                </div>
                <!-- Late -->
                <div class="col-4 px-1">
                  <div class="text-warning mb-2 d-flex justify-content-center">
                    <span class="material-symbols-outlined">schedule</span>
                  </div>
                  <div class="x-small text-muted fw-bold mb-2 text-nowrap">PHÚT ĐI MUỘN</div>
                  <div class="h3 fw-bold text-dark mb-0">15</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Right Column: Notifications -->
      <div class="col-lg-4">
        <div class="card bento-card h-100 d-flex flex-column">
          <div class="p-4 d-flex justify-content-between align-items-center">
            <h3 class="h6 mb-0 fw-bold d-flex align-items-center gap-2">
              <span class="material-symbols-outlined text-brand-blue fs-5">notifications</span>
              Thông báo mới
            </h3>
            <a href="#" class="text-brand-blue text-decoration-none fw-semibold small">Xem tất cả</a>
          </div>
          
          <div class="flex-grow-1 px-4">
            <!-- Interleaved notification items -->
            <div class="notification-item py-3 border-top">
              <div class="d-flex gap-3 align-items-start">
                <div class="notif-icon-circle bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="width: 40px; height: 40px;">
                  <span class="material-symbols-outlined fs-5">check_circle</span>
                </div>
                <div>
                  <h4 class="small fw-bold text-dark mb-1">Đơn nghỉ phép đã duyệt</h4>
                  <p class="x-small text-secondary mb-2 lh-base">Đơn nghỉ phép ngày 28/10 của bạn đã được quản lý phê duyệt.</p>
                  <span class="text-muted" style="font-size: 0.7rem;">10 phút trước</span>
                </div>
              </div>
            </div>

            <div class="notification-item py-3 border-top">
              <div class="d-flex gap-3 align-items-start">
                <div class="notif-icon-circle bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="width: 40px; height: 40px;">
                  <span class="material-symbols-outlined fs-5">payments</span>
                </div>
                <div>
                  <h4 class="small fw-bold text-dark mb-1">Đã có phiếu lương</h4>
                  <p class="x-small text-secondary mb-2 lh-base">Phiếu lương tháng 09/2023 đã sẵn sàng để xem.</p>
                  <span class="text-muted" style="font-size: 0.7rem;">2 giờ trước</span>
                </div>
              </div>
            </div>

            <div class="notification-item py-3 border-top">
              <div class="d-flex gap-3 align-items-start">
                <div class="notif-icon-circle bg-warning bg-opacity-10 text-warning rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="width: 40px; height: 40px;">
                  <span class="material-symbols-outlined fs-5">campaign</span>
                </div>
                <div>
                  <h4 class="small fw-bold text-dark mb-1">Thông báo Công ty</h4>
                  <p class="x-small text-secondary mb-2 lh-base">V/v Nghỉ lễ Quốc khánh sắp tới và lịch trực...</p>
                  <span class="text-muted" style="font-size: 0.7rem;">Hôm qua</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="p-3 bg-light rounded-bottom-4 position-relative border-top text-center">
            <p class="x-small text-muted fw-medium fst-italic mb-0 d-flex align-items-center justify-content-center gap-2">
              <span class="rounded-circle bg-brand-blue d-inline-block" style="width: 6px; height: 6px;"></span>
              Bạn có 3 thông báo chưa đọc
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activities Table -->
    <div class="card bento-card p-4">
      <div class="d-flex align-items-center justify-content-between mb-4">
        <h3 class="h6 mb-0 fw-bold">Hoạt động gần đây</h3>
        <button class="btn btn-sm text-secondary px-0 d-flex align-items-center gap-1 bg-transparent border-0 hover-opacity">
          Filter
          <span class="material-symbols-outlined fs-6">filter_list</span>
        </button>
      </div>
      
      <div class="table-responsive">
        <table class="table table-borderless align-middle mb-0 activity-table">
          <thead class="text-muted text-uppercase small border-bottom">
            <tr>
              <th class="py-3 ps-0 fw-bold w-25">NGÀY</th>
              <th class="py-3 px-2 fw-bold w-40">HOẠT ĐỘNG</th>
              <th class="py-3 px-2 fw-bold w-20">THỜI GIAN</th>
              <th class="py-3 pe-0 fw-bold w-15 text-end">TRẠNG THÁI</th>
            </tr>
          </thead>
          <tbody class="small text-dark fw-medium">
            <tr class="border-bottom-custom">
              <td class="py-3 ps-0">25/10/2023</td>
              <td class="py-3 px-2 text-secondary">Chấm công vào (Check-in)</td>
              <td class="py-3 px-2 text-secondary">08:02 AM</td>
              <td class="py-3 pe-0 text-end">
                <span class="badge status-success text-uppercase px-2 py-1 user-select-none">THÀNH CÔNG</span>
              </td>
            </tr>
            <tr class="border-bottom-custom">
              <td class="py-3 ps-0">24/10/2023</td>
              <td class="py-3 px-2 text-secondary">Chấm công ra (Check-out)</td>
              <td class="py-3 px-2 text-secondary">17:35 PM</td>
              <td class="py-3 pe-0 text-end">
                <span class="badge status-success text-uppercase px-2 py-1 user-select-none">THÀNH CÔNG</span>
              </td>
            </tr>
            <tr>
              <td class="py-3 ps-0">24/10/2023</td>
              <td class="py-3 px-2 text-secondary">Gửi đơn nghỉ phép</td>
              <td class="py-3 px-2 text-secondary">14:20 PM</td>
              <td class="py-3 pe-0 text-end">
                <span class="badge status-primary text-uppercase px-2 py-1 user-select-none">ĐÃ DUYỆT</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
  currentDateStr.value = `Hôm nay là ${days[now.getDay()]}, ngày ${now.getDate()} tháng ${now.getMonth() + 1} năm ${now.getFullYear()}.`;
};

onMounted(() => {
  updateTime();
  timerInterval = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});
</script>

<style scoped>
/* Google Font inter-like, adjust as necessary */
.dashboard-wrapper {
  background-color: var(--sys-bg-page);
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

/* Material Symbols Override if needed */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* Base Card Styling - Soft UI/Bento Grid feel */
.bento-card {
  border: none;
  border-radius: 1.25rem; /* ~20px */
  background-color: var(--sys-bg-surface);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.02);
  transition: box-shadow 0.2s ease;
  color: var(--sys-text-primary);
}

/* Brand Colors */
.text-brand-blue {
  color: var(--sys-accent) !important;
}
.bg-brand-blue {
  background-color: var(--sys-accent) !important;
}
.text-white-75 {
  color: rgba(255, 255, 255, 0.75) !important;
}

/* Big Buttons */
.btn-checkin {
  background-color: oklch(0.62 0.17 155);
  border-color: oklch(0.62 0.17 155);
  border-radius: 0.75rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  min-width: 140px;
}
.btn-checkin:hover {
  background-color: oklch(0.55 0.17 155);
}

.btn-checkout {
  background-color: oklch(0.75 0.15 75);
  border-color: oklch(0.75 0.15 75);
  border-radius: 0.75rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  min-width: 140px;
}
.btn-checkout:hover {
  background-color: oklch(0.68 0.15 75);
}

.icon-box-white {
  width: 40px;
  height: 40px;
}

/* Borders and lines */
@media (min-width: 768px) {
  .border-end-md {
    border-right: 1px solid var(--sys-border) !important;
  }
}

.border-bottom-custom {
  border-bottom: 1px solid var(--sys-border) !important;
}

/* Badge specific colors reproducing figma design closely */
.status-success {
  background-color: #E6F4EA !important; /* Green light */
  color: #137333 !important; /* Green dark */
  border-radius: 4px;
}

.status-primary {
  background-color: #111827 !important; /* Dark navy */
  color: #3B82F6 !important; /* Bright blue */
  border-radius: 4px;
}

.hover-opacity:hover {
  opacity: 0.8;
}

/* Table styling fixes */
th {
  font-weight: 700 !important;
  color: var(--sys-text-secondary) !important;
}

/* Text clamp for notifications if they get long */
.text-line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

/* Dark mode overrides for specific helper classes */
:global(html.dark) .text-dark {
  color: var(--sys-text-primary) !important;
}
:global(html.dark) .text-secondary {
  color: var(--sys-text-secondary) !important;
}
:global(html.dark) .bg-light {
  background-color: var(--sys-bg-page) !important;
}
:global(html.dark) .border-top {
  border-color: var(--sys-border) !important;
}
</style>
