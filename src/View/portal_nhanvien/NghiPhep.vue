<template>
  <div class="leave-wrapper container-fluid py-4 min-vh-100">
    
    <!-- Header Section -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 gap-3">
      <div>
        <h1 class="h2 fw-black tracking-tight text-[var(--sys-text-primary)] mb-1">Nghỉ phép</h1>
        <p class="text-[var(--sys-text-secondary)] mb-0">Quản lý và theo dõi các yêu cầu nghỉ phép của bạn.</p>
      </div>
      <div class="text-md-end">
        <button @click="showModal = true" class="btn btn-primary btn-lg rounded-4 fw-bold px-4 py-2.5 shadow-primary d-inline-flex align-items-center gap-2">
          <span class="material-symbols-outlined">add</span>
          Tạo đơn nghỉ phép
        </button>
      </div>
    </div>

    <!-- Metric Cards -->
    <div class="row g-4 mb-5">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 h-100 bg-[var(--sys-bg-surface)] border-subtle">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="small fw-bold text-uppercase tracking-wider text-[var(--sys-text-secondary)]">Số dư phép năm</span>
            <span class="material-symbols-outlined text-[var(--sys-brand-solid)]">account_balance_wallet</span>
          </div>
          <div class="display-6 fw-black text-[var(--sys-text-primary)] mt-2">
            12 <span class="h4 fw-bold mb-0">ngày</span>
          </div>
        </div>
      </div>
      
      <div class="col-md-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 h-100 bg-[var(--sys-bg-surface)] border-subtle">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="small fw-bold text-uppercase tracking-wider text-[var(--sys-text-secondary)]">Đã sử dụng</span>
            <span class="material-symbols-outlined text-[var(--sys-warning-text)]">event_available</span>
          </div>
          <div class="display-6 fw-black text-[var(--sys-warning-text)] mt-2">
            3 <span class="h4 fw-bold mb-0">ngày</span>
          </div>
        </div>
      </div>
      
      <div class="col-md-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 h-100 bg-[var(--sys-bg-surface)] border-subtle">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="small fw-bold text-uppercase tracking-wider text-[var(--sys-text-secondary)]">Đang chờ duyệt</span>
            <span class="material-symbols-outlined text-[var(--sys-brand-solid)]">pending_actions</span>
          </div>
          <div class="display-6 fw-black text-[var(--sys-brand-solid)] mt-2">
            1 <span class="h4 fw-bold mb-0">ngày</span>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <!-- Bảng Lịch sử đơn nghỉ phép -->
      <div class="col-12">
        <div class="card border-0 shadow-sm rounded-4 overflow-hidden bg-[var(--sys-bg-surface)]">
          <div class="card-header bg-transparent border-bottom p-4">
            <h2 class="h6 fw-bold text-[var(--sys-text-primary)] text-uppercase tracking-tight mb-0">Lịch sử đơn nghỉ phép</h2>
          </div>
          
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0 bg-transparent">
              <thead class="bg-[var(--sys-bg-page)] border-bottom">
                <tr class="x-small text-[var(--sys-text-secondary)] text-uppercase fw-bold">
                  <th class="py-3 px-4 border-0">LOẠI PHÉP</th>
                  <th class="py-3 px-2 border-0">THỜI GIAN NGHỈ</th>
                  <th class="py-3 px-2 border-0 text-center">TỔNG NGÀY</th>
                  <th class="py-3 px-4 border-0 text-end">TRẠNG THÁI</th>
                </tr>
              </thead>
              <tbody class="small text-[var(--sys-text-primary)]">
                <tr v-for="(item, index) in leaveHistory" :key="index" class="border-bottom border-[var(--sys-border-subtle)]">
                  <td class="py-4 px-4 fw-bold">{{ item.type }}</td>
                  <td class="py-4 px-2 text-[var(--sys-text-secondary)]">{{ item.duration }}</td>
                  <td class="py-4 px-2 text-center fw-medium">{{ item.total }}</td>
                  <td class="py-4 px-4 text-end">
                    <span :class="getStatusClass(item.status)" class="badge x-small fw-bold text-uppercase px-2.5 py-1.5 rounded-4">
                      {{ item.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Tạo Đơn Nghỉ Phép -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div v-if="showModal" class="modal-backdrop-custom d-flex justify-content-center align-items-center">
          <div class="modal-content-custom bg-[var(--sys-bg-surface)] rounded-4 shadow-lg p-5 border border-[var(--sys-border-subtle)]">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h3 class="h4 fw-bold text-[var(--sys-text-primary)] mb-0">Tạo đơn nghỉ phép</h3>
              <button @click="showModal = false" class="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center">
                <span class="material-symbols-outlined fs-5">close</span>
              </button>
            </div>
            
            <form @submit.prevent="showModal = false" class="d-flex flex-column gap-4">
              <!-- Loại nghỉ phép -->
              <div>
                <label class="form-label small fw-bold text-[var(--sys-text-primary)] mb-2">Loại nghỉ phép <span class="text-danger">*</span></label>
                <select class="form-select custom-input bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] border-[var(--sys-border-strong)] rounded-3">
                  <option selected disabled>Chọn loại nghỉ phép...</option>
                  <option>Nghỉ phép năm</option>
                  <option>Nghỉ ốm</option>
                  <option>Nghỉ không lương</option>
                </select>
              </div>

              <!-- Từ ngày / Đến ngày -->
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label small fw-bold text-[var(--sys-text-primary)] mb-2">Từ ngày <span class="text-danger">*</span></label>
                  <input type="date" class="form-control custom-input bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] border-[var(--sys-border-strong)] rounded-3">
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-bold text-[var(--sys-text-primary)] mb-2">Đến ngày <span class="text-danger">*</span></label>
                  <input type="date" class="form-control custom-input bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] border-[var(--sys-border-strong)] rounded-3">
                </div>
              </div>

              <!-- Tổng số ngày nghỉ dự kiến -->
              <div class="bg-[var(--sys-brand-soft)] p-3 rounded-4 d-flex justify-content-between align-items-center border border-[var(--sys-brand-subtle)]">
                <div class="d-flex align-items-center gap-2 text-[var(--sys-brand-text)] fw-semibold small">
                  <span class="material-symbols-outlined fs-5">calculate</span>
                  Tổng số ngày nghỉ dự kiến:
                </div>
                <div class="fw-bold text-[var(--sys-brand-text)]">
                  <span class="fs-5">0</span> ngày
                </div>
              </div>

              <!-- Lý do nghỉ phép -->
              <div>
                <label class="form-label small fw-bold text-[var(--sys-text-primary)] mb-2">Lý do nghỉ phép <span class="text-danger">*</span></label>
                <textarea class="form-control custom-input bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] border-[var(--sys-border-strong)] rounded-3" rows="4" placeholder="Nhập chi tiết lý do nghỉ phép của bạn..."></textarea>
              </div>

              <!-- Tài liệu đính kèm -->
              <div>
                <label class="form-label small fw-bold text-[var(--sys-text-primary)] mb-2">Tài liệu đính kèm (nếu có)</label>
                <div class="upload-zone border-dashed border-[var(--sys-border-subtle)] rounded-4 p-4 d-flex flex-column align-items-center justify-content-center text-center bg-[var(--sys-bg-page)] cursor-pointer">
                  <span class="material-symbols-outlined fs-1 text-[var(--sys-text-secondary)] opacity-50 mb-2">cloud_upload</span>
                  <p class="fw-bold text-[var(--sys-text-primary)] small mb-1">Nhấp để tải lên hoặc kéo thả file</p>
                  <p class="x-small text-[var(--sys-text-secondary)] mb-0">Hỗ trợ định dạng PDF, JPG, PNG (Tối đa 5MB)</p>
                </div>
              </div>

              <!-- Các nút thao tác -->
              <div class="d-flex gap-3 justify-content-between mt-2">
                <button type="submit" class="btn btn-primary fw-bold py-2.5 rounded-4 shadow-primary d-flex align-items-center justify-content-center gap-2 flex-grow-1">
                  <span class="material-symbols-outlined fs-5">send</span>
                  Gửi đơn nghỉ phép
                </button>
                <button type="button" @click="showModal = false" class="btn btn-light fw-bold py-2.5 rounded-4 px-4 flex-shrink-0 text-[var(--sys-text-secondary)] border">
                  Hủy bỏ
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref } from 'vue';

const showModal = ref(false);

const leaveHistory = ref([
  { type: 'Nghỉ phép năm', duration: '15/10/2023 - 16/10/2023', total: '2 ngày', status: 'Đã duyệt' },
  { type: 'Nghỉ ốm', duration: '05/11/2023', total: '1 ngày', status: 'Đã duyệt' },
  { type: 'Nghỉ phép năm', duration: '20/11/2023 - 21/11/2023', total: '2 ngày', status: 'Chờ duyệt' }
]);

const getStatusClass = (status) => {
  switch (status) {
    case 'Đã duyệt':
      return 'status-approved';
    case 'Chờ duyệt':
      return 'status-pending';
    case 'Từ chối':
      return 'status-rejected';
    default:
      return 'status-default';
  }
};
</script>

<style scoped>
.leave-wrapper {
  background-color: var(--sys-bg-page);
}

.fw-black {
  font-weight: 900;
}

.tracking-tight {
  letter-spacing: -0.025em;
}

.tracking-wider {
  letter-spacing: 0.05em;
}

.x-small {
  font-size: 0.75rem;
}

.border-subtle {
  border: 1px solid var(--sys-border-subtle) !important;
}

.shadow-primary {
  box-shadow: 0 4px 12px rgba(var(--sys-brand-solid-rgb, 59, 130, 246), 0.25);
}

.btn-primary {
  background-color: var(--sys-brand-solid);
  border-color: var(--sys-brand-solid);
  color: #ffffff;
}

.btn-primary:hover {
  background-color: var(--sys-brand-solid);
  filter: brightness(0.9);
  border-color: var(--sys-brand-solid);
}

.custom-input {
  padding: 0.75rem 1rem;
  transition: all 0.2s ease;
}

.custom-input:focus {
  border-color: var(--sys-brand-solid);
  box-shadow: 0 0 0 4px var(--sys-brand-subtle);
  outline: none;
}

.modal-backdrop-custom {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  z-index: 1050;
}

.modal-content-custom {
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  animation: modal-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modal-pop {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.border-dashed {
  border-style: dashed !important;
  border-width: 2px !important;
}

.upload-zone {
  transition: all 0.2s ease;
}

.upload-zone:hover {
  border-color: var(--sys-brand-solid) !important;
  background-color: var(--sys-brand-soft) !important;
}

/* Status Badge Overrides */
.status-approved {
  background-color: var(--sys-success-soft) !important;
  color: var(--sys-success-text) !important;
}

.status-pending {
  background-color: var(--sys-brand-soft) !important;
  color: var(--sys-brand-soft-text) !important;
}

.status-rejected {
  background-color: var(--sys-danger-soft) !important;
  color: var(--sys-danger-text) !important;
}

.status-default {
  background-color: var(--sys-bg-page) !important;
  color: var(--sys-text-secondary) !important;
}

/* Scrollbar for modal content */
.modal-content-custom::-webkit-scrollbar {
  width: 6px;
}
.modal-content-custom::-webkit-scrollbar-thumb {
  background: var(--sys-border-strong);
  border-radius: 10px;
}
</style>
