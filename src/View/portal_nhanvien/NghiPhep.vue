<template>
  <div class="leave-wrapper container-fluid py-4 min-vh-100">
    
    <!-- Header Section -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
      <div>
        <h1 class="h3 fw-bold text-dark mb-1">Nghỉ phép</h1>
        <p class="text-secondary mb-0 fw-medium">Theo dõi và tạo yêu cầu nghỉ phép của bạn</p>
      </div>
      <div class="text-md-end">
        <button @click="showModal = true" class="btn btn-brand-blue fw-bold px-4 py-2 rounded-3 shadow-sm d-inline-flex align-items-center gap-2">
          <span class="material-symbols-outlined fs-5">add</span>
          Tạo đơn nghỉ phép
        </button>
      </div>
    </div>

    <!-- Metric Cards -->
    <div class="row g-4 mb-4">
      <div class="col-md-4">
        <div class="card bento-card p-4 h-100 border border-1 border-opacity-10 border-dark">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="small fw-semibold text-secondary">Số dư phép năm</span>
            <span class="material-symbols-outlined text-brand-blue">account_balance_wallet</span>
          </div>
          <div class="display-6 fw-bold text-dark mt-2">
            12 <span class="h4 fw-bold mb-0">ngày</span>
          </div>
        </div>
      </div>
      
      <div class="col-md-4">
        <div class="card bento-card p-4 h-100 border border-1 border-opacity-10 border-dark">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="small fw-semibold text-secondary">Đã sử dụng</span>
            <span class="material-symbols-outlined text-brand-orange">event_available</span>
          </div>
          <div class="display-6 fw-bold text-brand-orange mt-2">
            3 <span class="h4 fw-bold mb-0">ngày</span>
          </div>
        </div>
      </div>
      
      <div class="col-md-4">
        <div class="card bento-card p-4 h-100 border border-1 border-opacity-10 border-dark">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="small fw-semibold text-secondary">Đang chờ duyệt</span>
            <span class="material-symbols-outlined text-brand-blue-light">pending_actions</span>
          </div>
          <div class="display-6 fw-bold text-brand-blue-light mt-2">
            1 <span class="h4 fw-bold mb-0">ngày</span>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4 d-flex align-items-stretch">
      <!-- Bảng Lịch sử đơn nghỉ phép -->
      <div class="col-12">
        <div class="card bento-card h-100 border border-1 border-opacity-10 border-dark overflow-hidden">
          <div class="p-4 border-bottom-custom">
            <h2 class="h6 fw-bold text-dark mb-0">Lịch sử đơn nghỉ phép</h2>
          </div>
          
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="bg-transparent border-bottom-custom">
                <tr>
                  <th class="py-3 px-4 text-secondary small fw-bold tracking-wider">LOẠI PHÉP</th>
                  <th class="py-3 px-2 text-secondary small fw-bold tracking-wider">THỜI GIAN NGHỈ</th>
                  <th class="py-3 px-2 text-secondary small fw-bold tracking-wider">TỔNG <br>NGÀY</th>
                  <th class="py-3 px-4 text-end text-secondary small fw-bold tracking-wider">TRẠNG <br>THÁI</th>
                </tr>
              </thead>
              <tbody class="fw-medium text-dark">
                <tr class="border-bottom-custom text-nowrap transition-all duration-200">
                  <td class="py-4 px-4 fw-bold text-dark bg-transparent">Nghỉ phép<br>năm</td>
                  <td class="py-4 px-2 text-secondary bg-transparent">15/10/2023 -<br>16/10/2023</td>
                  <td class="py-4 px-2 text-dark bg-transparent">2 ngày</td>
                  <td class="py-4 px-4 text-end bg-transparent">
                    <span class="badge status-success text-uppercase rounded-1 px-2 py-1 user-select-none">ĐÃ DUYỆT</span>
                  </td>
                </tr>
                <tr class="border-bottom-custom text-nowrap transition-all duration-200">
                  <td class="py-4 px-4 fw-bold text-dark bg-transparent">Nghỉ ốm</td>
                  <td class="py-4 px-2 text-secondary bg-transparent">05/11/2023</td>
                  <td class="py-4 px-2 text-dark bg-transparent">1 ngày</td>
                  <td class="py-4 px-4 text-end bg-transparent">
                    <span class="badge status-success text-uppercase rounded-1 px-2 py-1 user-select-none">ĐÃ DUYỆT</span>
                  </td>
                </tr>
                <tr class="text-nowrap transition-all duration-200">
                  <td class="py-4 px-4 fw-bold text-dark bg-transparent">Nghỉ phép<br>năm</td>
                  <td class="py-4 px-2 text-secondary bg-transparent">20/11/2023 -<br>21/11/2023</td>
                  <td class="py-4 px-2 text-dark bg-transparent">2 ngày</td>
                  <td class="py-4 px-4 text-end bg-transparent">
                    <span class="badge status-primary text-uppercase rounded-1 px-2 py-1 user-select-none">CHỜ DUYỆT</span>
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
        enter-from-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
      >
        <div v-if="showModal" class="modal-backdrop-custom d-flex justify-content-center align-items-center">
      <div class="modal-content-custom bg-white rounded-4 shadow-lg p-4">
        
        <form @submit.prevent="showModal = false" class="d-flex flex-column gap-4">
          <!-- Loại nghỉ phép -->
          <div>
            <label class="form-label small fw-bold text-dark mb-2">Loại nghỉ phép <span class="text-danger">*</span></label>
            <select class="form-select custom-input text-dark fw-medium">
              <option selected disabled>Chọn loại nghỉ phép...</option>
              <option>Nghỉ phép năm</option>
              <option>Nghỉ ốm</option>
              <option>Nghỉ không lương</option>
            </select>
          </div>

          <!-- Từ ngày / Đến ngày -->
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label small fw-bold text-dark mb-2">Từ ngày <span class="text-danger">*</span></label>
              <input type="date" class="form-control custom-input text-secondary">
            </div>
            <div class="col-md-6">
              <label class="form-label small fw-bold text-dark mb-2">Đến ngày <span class="text-danger">*</span></label>
              <input type="date" class="form-control custom-input text-secondary">
            </div>
          </div>

          <!-- Tổng số ngày nghỉ dự kiến -->
          <div class="bg-primary bg-opacity-10 p-3 rounded-3 d-flex justify-content-between align-items-center border border-primary border-opacity-25">
            <div class="d-flex align-items-center gap-2 text-secondary fw-semibold small">
              <span class="material-symbols-outlined text-brand-blue fs-5">calculate</span>
              Tổng số ngày nghỉ dự kiến:
            </div>
            <div class="fw-bold text-brand-blue">
              <span class="fs-5">0</span> ngày
            </div>
          </div>

          <!-- Lý do nghỉ phép -->
          <div>
            <label class="form-label small fw-bold text-dark mb-2">Lý do nghỉ phép <span class="text-danger">*</span></label>
            <textarea class="form-control custom-input text-secondary" rows="4" placeholder="Nhập chi tiết lý do nghỉ phép của bạn..."></textarea>
          </div>

          <!-- Tài liệu đính kèm -->
          <div>
            <label class="form-label small fw-bold text-dark mb-2">Tài liệu đính kèm (nếu có)</label>
            <div class="upload-zone border-dashed rounded-3 p-4 d-flex flex-column align-items-center justify-content-center text-center bg-light cursor-pointer">
              <span class="material-symbols-outlined fs-1 text-secondary opacity-75 mb-2">cloud_upload</span>
              <p class="fw-bold text-dark small mb-1">Nhấp để tải lên hoặc kéo thả file</p>
              <p class="x-small text-muted mb-0">Hỗ trợ định dạng PDF, JPG, PNG (Tối đa 5MB)</p>
            </div>
          </div>

          <!-- Các nút thao tác -->
          <div class="d-flex gap-3 justify-content-between mt-2">
            <button type="submit" class="btn btn-brand-blue fw-bold py-2 rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2 flex-grow-1">
              <span class="material-symbols-outlined fs-5">send</span>
              Gửi đơn nghỉ phép
            </button>
            <button type="button" @click="showModal = false" class="btn btn-light fw-bold py-2 rounded-3 px-4 flex-shrink-0" style="min-width: 120px; background-color: #F1F5F9; color: #475569;">
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
</script>

<style scoped>
.leave-wrapper {
  background-color: var(--sys-bg-page);
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

/* Material Symbols Override */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
.material-symbols-outlined.icon-filled {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* Base Card Styling - Soft UI/Bento Grid feel */
.bento-card {
  border-radius: 1rem;
  background-color: var(--sys-bg-surface);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  color: var(--sys-text-primary);
}

/* Brand Colors */
.text-brand-blue { color: var(--sys-accent) !important; }
.bg-brand-blue { background-color: var(--sys-accent) !important; }
.btn-brand-blue {
  background-color: var(--sys-accent);
  border-color: var(--sys-accent);
  color: var(--sys-accent-text);
}
.btn-brand-blue:hover {
  background-color: var(--sys-accent);
  filter: brightness(0.9);
}

.text-brand-orange { color: oklch(0.68 0.15 75) !important; }
.text-brand-blue-light { color: oklch(0.6 0.12 265) !important; }

/* Status Badges */
.status-success {
  background-color: #E6F4EA !important; /* Green light */
  color: #137333 !important; /* Green dark */
}

.status-primary {
  background-color: #111827 !important; /* Dark navy */
  color: #3B82F6 !important; /* Bright blue */
}

/* Inputs */
.custom-input {
  border-radius: 0.5rem;
  border: 1px solid var(--sys-border);
  font-size: 0.875rem;
  background-color: var(--sys-bg-page);
  color: var(--sys-text-primary);
  padding: 0.6rem 0.75rem;
}
.custom-input:focus {
  border-color: var(--sys-accent);
  box-shadow: 0 0 0 0.2rem rgba(59, 88, 233, 0.1);
  outline: none;
}

/* Table overrides */
.border-bottom-custom {
  border-bottom: 1px solid var(--sys-border) !important;
}

/* Helpers */
.tracking-wider {
  letter-spacing: 0.05em;
}
.x-small {
  font-size: 0.75rem;
}

/* Info Box */
.info-box {
  background-color: var(--sys-bg-page);
  border: 1px solid var(--sys-border);
}

/* Modal Custom Styles */
.modal-backdrop-custom {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1050;
}

.modal-content-custom {
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  background-color: var(--sys-bg-surface);
  color: var(--sys-text-primary);
  animation: modal-pop 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.border-dashed {
  border: 2px dashed var(--sys-border);
}

.upload-zone:hover {
  background-color: var(--sys-bg-page) !important;
  border-color: var(--sys-text-secondary);
}

.text-dark {
  color: var(--sys-text-primary) !important;
}
.text-secondary {
  color: var(--sys-text-secondary) !important;
}
.bg-white {
  background-color: var(--sys-bg-surface) !important;
}
.bg-light {
  background-color: var(--sys-bg-page) !important;
}
</style>
