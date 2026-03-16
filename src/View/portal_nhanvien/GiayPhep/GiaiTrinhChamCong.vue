<template>
  <div class="explanation-wrapper container-fluid py-4 min-vh-100">
    
    <!-- Top Header -->
    <div class="mb-4">
      <h1 class="h3 fw-bold text-dark mb-1 d-flex align-items-center gap-2">
        <span class="material-symbols-outlined fs-4 cursor-pointer hover-brand-blue" @click="$router.push('/cham-cong')">arrow_back</span>
        Gửi đơn giải trình chấm công
      </h1>
      <p class="text-secondary fw-medium ms-5">Vui lòng điền đầy đủ thông tin bên dưới để gửi yêu cầu điều chỉnh dữ liệu chấm công của bạn.</p>
    </div>

    <div class="row g-4 d-flex align-items-stretch">
      <!-- Left Column: Form -->
      <div class="col-lg-8">
        <div class="card bento-card p-4 p-md-5 border-1 border-opacity-10 border-dark">
          <form @submit.prevent>
            
            <!-- Row 1: Date and Times -->
            <div class="row g-4 mb-4">
              <!-- Ngày giải trình -->
              <div class="col-md-4">
                <label class="form-label small fw-bold text-dark mb-2 d-flex align-items-center gap-2">
                  <span class="material-symbols-outlined fs-6 text-secondary">calendar_today</span>
                  Ngày giải trình
                </label>
                <input type="date" class="form-control custom-input text-secondary" placeholder="mm/dd/yyyy">
              </div>

              <!-- Giờ vào thực tế -->
              <div class="col-md-4">
                <label class="form-label small fw-bold text-dark mb-2 d-flex align-items-center gap-2">
                  <span class="material-symbols-outlined fs-6 text-secondary">login</span>
                  Giờ vào thực tế
                </label>
                <div class="input-icon-right-wrapper">
                  <input type="time" class="form-control custom-input text-secondary" placeholder="--:-- --">
                </div>
              </div>

              <!-- Giờ ra thực tế -->
              <div class="col-md-4">
                <label class="form-label small fw-bold text-dark mb-2 d-flex align-items-center gap-2">
                  <span class="material-symbols-outlined fs-6 text-secondary">logout</span>
                  Giờ ra thực tế
                </label>
                <div class="input-icon-right-wrapper">
                  <input type="time" class="form-control custom-input text-secondary" placeholder="--:-- --">
                </div>
              </div>
            </div>

            <!-- Row 2: Loại giải trình -->
            <div class="mb-4">
              <label class="form-label small fw-bold text-dark mb-2 d-flex align-items-center gap-2">
                <span class="material-symbols-outlined fs-6 text-secondary">category</span>
                Loại giải trình
              </label>
              <select class="form-select custom-input text-secondary">
                <option selected disabled>Chọn loại giải trình</option>
                <option>Quên chấm công</option>
                <option>Hệ thống lỗi</option>
                <option>Đi công tác</option>
                <option>Lý do khác</option>
              </select>
            </div>

            <!-- Row 3: Lý do chi tiết -->
            <div class="mb-4">
              <label class="form-label small fw-bold text-dark mb-2 d-flex align-items-center gap-2">
                <span class="material-symbols-outlined fs-6 text-secondary">description</span>
                Lý do chi tiết
              </label>
              <textarea class="form-control custom-input text-secondary" rows="4" placeholder="Nhập chi tiết lý do cần điều chỉnh chấm công..."></textarea>
            </div>

            <!-- Row 4: Đính kèm minh chứng -->
            <div class="mb-5">
              <label class="form-label small fw-bold text-dark mb-2 d-flex align-items-center gap-2">
                <span class="material-symbols-outlined fs-6 text-secondary">attach_file</span>
                Đính kèm minh chứng
              </label>
              <div class="upload-area d-flex flex-column align-items-center justify-content-center p-4 rounded-4 text-center cursor-pointer hover-bg-light">
                <div class="upload-icon-container bg-brand-blue bg-opacity-10 text-brand-blue rounded-circle d-flex align-items-center justify-content-center mb-3">
                  <span class="material-symbols-outlined fs-3">cloud_upload</span>
                </div>
                <p class="mb-1 text-dark fw-medium small">
                  Kéo thả tệp hoặc <span class="text-brand-blue fw-bold text-decoration-underline">chọn từ máy tính</span>
                </p>
                <p class="x-small text-muted mb-0">Định dạng hỗ trợ: JPG, PNG, PDF (Max 5MB)</p>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="d-flex justify-content-end gap-3 mt-4">
              <button type="button" class="btn btn-light fw-bold px-4 rounded-3 border-0 bg-secondary bg-opacity-10 text-secondary hover-bg-secondary-20" @click="$router.push('/cham-cong')">
                Hủy
              </button>
              <button type="submit" class="btn btn-brand-blue fw-bold px-5 rounded-3 d-flex align-items-center gap-2 shadow-sm">
                <span class="material-symbols-outlined fs-6">send</span>
                Gửi đơn
              </button>
            </div>

          </form>
        </div>
      </div>

      <!-- Right Column: Sidebar -->
      <div class="col-lg-4 d-flex flex-column gap-4">
        
        <!-- Lịch sử chấm công Box -->
        <div class="card bento-card border-1 border-opacity-10 border-dark overflow-hidden flex-shrink-0">
          <div class="p-4 border-bottom-custom d-flex justify-content-between align-items-center">
            <div>
              <h2 class="h6 fw-bold text-dark mb-1 d-flex align-items-center gap-2">
                <span class="material-symbols-outlined text-brand-blue fs-5">history</span>
                Lịch sử chấm công
              </h2>
              <p class="x-small text-secondary mb-0">Nhấn vào dòng đỏ để giải trình</p>
            </div>
            <a href="#" class="text-brand-blue text-decoration-none small fw-bold tracking-tight hover-opacity">Tất cả</a>
          </div>
          
          <div class="list-group list-group-flush">
            <!-- Item 1 (Error/Active) -->
            <div class="list-group-item border-0 border-bottom-custom p-4 bg-transparent position-relative cursor-pointer highlight-item">
              <div class="position-absolute border-start border-danger border-3 h-100 top-0 start-0"></div>
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <p class="small text-secondary fw-semibold mb-1">Hôm nay, 24/10</p>
                  <p class="fw-bold text-dark mb-0">08:00 - --:--</p>
                </div>
                <div class="text-end">
                  <span class="badge bg-danger bg-opacity-10 text-danger rounded-1 px-3 py-1 fw-bold x-small text-uppercase mb-1 border border-danger border-opacity-25">THIẾU CÔNG</span>
                  <p class="x-small text-danger fw-semibold fst-italic mb-0 mt-1">Cần giải trình</p>
                </div>
              </div>
            </div>

            <!-- Item 2 (Warning) -->
            <div class="list-group-item border-0 border-bottom-custom p-4 bg-transparent cursor-pointer hover-bg-light">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <p class="small text-secondary fw-semibold mb-1">23/10/2023</p>
                  <p class="fw-bold text-dark mb-0">09:15 - 18:30</p>
                </div>
                <div class="text-end">
                  <span class="badge bg-danger bg-opacity-10 text-danger rounded-1 px-3 py-1 fw-bold x-small text-uppercase mb-1 border border-danger border-opacity-25 shadow-sm">SAI LỆCH</span>
                  <p class="x-small text-danger fw-semibold fst-italic mb-0 mt-1">Đi muộn</p>
                </div>
              </div>
            </div>

            <!-- Item 3 (Success) -->
            <div class="list-group-item border-0 p-4 bg-transparent cursor-pointer hover-bg-light">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <p class="small text-secondary fw-semibold mb-1">20/10/2023</p>
                  <p class="fw-bold text-dark mb-0">08:00 - 17:30</p>
                </div>
                <div class="text-end">
                  <span class="badge bg-success bg-opacity-10 text-success rounded-1 px-3 py-1 fw-bold x-small text-uppercase mb-0 border border-success border-opacity-25 shadow-sm">ĐẦY ĐỦ</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Lưu ý Box (Info box container) -->
        <div class="card bento-card border-1 border-brand-blue border-opacity-25 p-4 flex-shrink-0" style="background-color: var(--sys-bg-page, #f1f4ff);">
          <h2 class="h6 fw-bold text-brand-blue mb-3 d-flex align-items-center gap-2">
            <span class="material-symbols-outlined icon-filled fs-5">info</span>
            Lưu ý
          </h2>
          <ul class="list-unstyled mb-0 d-flex flex-column gap-2">
            <li class="d-flex gap-2 align-items-start">
              <span class="text-secondary mt-1 fs-6">•</span>
              <span class="x-small text-dark fw-medium lh-base">Đơn giải trình cần gửi trước ngày 25 hàng tháng.</span>
            </li>
            <li class="d-flex gap-2 align-items-start">
              <span class="text-secondary mt-1 fs-6">•</span>
              <span class="x-small text-dark fw-medium lh-base">Các đơn đi công tác cần đính kèm lịch trình hoặc thư mời.</span>
            </li>
            <li class="d-flex gap-2 align-items-start">
              <span class="text-secondary mt-1 fs-6">•</span>
              <span class="x-small text-dark fw-medium lh-base">Trạng thái đơn sẽ được cập nhật bởi HR/Quản lý trong vòng 24-48h.</span>
            </li>
            <li class="d-flex gap-2 align-items-start">
              <span class="text-danger mt-1 fs-6">•</span>
              <span class="x-small text-danger fw-bold lh-base">Các dòng hiển thị màu đỏ là dữ liệu chấm công chưa hợp lệ, cần được giải trình.</span>
            </li>
          </ul>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.explanation-wrapper {
  background-color: transparent;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

/* Material Symbols Override */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
.icon-filled {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* Base Card Styling - Soft UI/Bento Grid feel */
.bento-card {
  border-radius: 1.25rem;
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

/* Brand Colors */
.text-brand-blue { color: #6174d1 !important; }
.bg-brand-blue { background-color: #0027e9 !important; }
.hover-brand-blue:hover { color: #3B58E9 !important; }

.btn-brand-blue {
  background-color: #3B58E9;
  border-color: #3B58E9;
  color: white;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
}
.btn-brand-blue:hover {
  background-color: #2b45cf;
  border-color: #2b45cf;
  color: white;
}

/* Inputs */
.custom-input {
  border-radius: 0.5rem;
  border: 1px solid var(--sys-border, #E2E8F0);
  font-size: 0.875rem;
  background-color: var(--sys-bg-page, #FAFCFF);
  padding: 0.75rem 1rem;
}
.custom-input:focus {
  border-color: #3B58E9;
  box-shadow: 0 0 0 0.2rem rgba(59, 88, 233, 0.1);
  outline: none;
  background-color: #ffffff;
}
textarea.custom-input {
  resize: vertical;
}

/* Upload Area */
.upload-area {
  border: 2px dashed var(--sys-border, #CBD5E1);
  background-color: var(--sys-bg-page, #FAFCFF);
  transition: all 0.2s ease;
}
.upload-area:hover {
  border-color: #3B58E9;
  background-color: #F1F4FF;
}
.upload-icon-container {
  width: 56px;
  height: 56px;
}

/* List group and borders */
.border-bottom-custom {
  border-bottom: 1px solid #F1F5F9 !important;
}
.hover-bg-light:hover {
  background-color: #F8FAFC !important;
}
.hover-bg-secondary-20:hover {
  background-color: rgba(100, 116, 139, 0.2) !important;
}

/* Highlight item in history */
.highlight-item {
  background-color: rgba(239, 68, 68, 0.02) !important;
}

/* Utilities */
.cursor-pointer { cursor: pointer; }
.tracking-tight { letter-spacing: -0.01em; }
.x-small { font-size: 0.75rem; }
.hover-opacity:hover { opacity: 0.8; }

/* Customizing date/time input to hide default icons fully or adjust padding */
input[type="time"].custom-input::-webkit-calendar-picker-indicator,
input[type="date"].custom-input::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.5;
  filter: invert(0.5);
}
</style>
