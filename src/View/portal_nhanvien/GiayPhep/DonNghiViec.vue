<template>
  <div class="resignation-wrapper container-fluid py-4 min-vh-100">
    
    <!-- Header -->
    <div class="mb-4">
      <h1 class="h3 fw-bold text-dark mb-1 d-flex align-items-center gap-2">
        <span class="material-symbols-outlined fs-4 cursor-pointer hover-brand-blue" @click="$router.push('/ho-so')">arrow_back</span>
        Đơn Xin Thôi Việc
      </h1>
      <p class="text-secondary fw-medium ms-5">
        Chúng tôi rất tiếc khi thấy bạn rời đi. Vui lòng hoàn thành các thông tin bên dưới để bắt đầu quy trình bàn giao và thôi việc.
      </p>
    </div>

    <!-- Current Role Info -->
    <div class="row g-4 mb-4">
      <!-- Title -->
      <div class="col-12">
        <div class="d-flex flex-column flex-md-row gap-4">
          
          <div class="card bento-card p-3 flex-grow-1 border-brand-blue-opacity-10 bg-brand-blue-opacity-5">
            <div class="d-flex align-items-center gap-3">
              <div class="icon-square bg-white text-brand-blue shadow-sm d-flex align-items-center justify-content-center">
                <span class="material-symbols-outlined fs-5">badge</span>
              </div>
              <div>
                <p class="x-small fw-bold text-muted text-uppercase tracking-wider mb-1">CHỨC DANH HIỆN TẠI</p>
                <p class="fw-bold text-dark mb-0">Chuyên viên Marketing Cao cấp</p>
              </div>
            </div>
          </div>

          <div class="card bento-card p-3 flex-grow-1 border-brand-blue-opacity-10 bg-brand-blue-opacity-5">
            <div class="d-flex align-items-center gap-3">
              <div class="icon-square bg-white text-brand-blue shadow-sm d-flex align-items-center justify-content-center">
                <span class="material-symbols-outlined fs-5">domain</span>
              </div>
              <div>
                <p class="x-small fw-bold text-muted text-uppercase tracking-wider mb-1">PHÒNG BAN</p>
                <p class="fw-bold text-dark mb-0">Phòng Marketing & Truyền thông</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Status Notice -->
    <div class="card bento-card border-warning-subtle bg-warning-subtle mb-4">
      <div class="p-3 d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-3">
          <span class="material-symbols-outlined text-warning-emphasis fs-4">history_edu</span>
          <div>
            <p class="small fw-bold text-warning-emphasis mb-0">Trạng thái đơn hiện tại</p>
            <p class="x-small text-warning-emphasis fw-medium mb-0 opacity-75">Chưa có đơn nào đang được xử lý</p>
          </div>
        </div>
        <span class="badge bg-warning text-dark bg-opacity-25 rounded-pill px-3 py-1 fw-bold x-small tracking-wider shadow-sm">
          ĐANG CHỜ DUYỆT
        </span>
      </div>
    </div>

    <!-- Main Content -->
    <div class="card bento-card p-4 p-md-5 border border-1 border-opacity-10 border-dark form-card mx-auto w-100">
      <h2 class="h5 fw-bold text-dark mb-4">Thông tin yêu cầu</h2>

      <div class="row g-5 d-flex align-items-stretch">
        
        <!-- Left Column: Form -->
        <div class="col-lg-7 d-flex flex-column">
          <form @submit.prevent class="d-flex flex-column h-100">
            
            <div class="mb-4">
              <label class="form-label small fw-bold text-dark mb-2">
                Ngày làm việc cuối cùng <span class="text-danger">*</span>
              </label>
              <div class="position-relative">
                <input type="date" class="form-control custom-input text-secondary" placeholder="dd/mm/yyyy" value="2024-11-04">
              </div>
              <div class="mt-2 d-flex gap-1 align-items-start">
                <span class="text-secondary fw-bold small">!</span>
                <span class="x-small text-secondary fst-italic">Theo hợp đồng, thời hạn báo trước tối thiểu là 30 ngày làm việc.</span>
              </div>
            </div>

            <div class="mb-4">
              <label class="form-label small fw-bold text-dark mb-2">
                Lý do nghỉ việc chính <span class="text-danger">*</span>
              </label>
              <select class="form-select custom-input text-secondary">
                <option selected disabled>-- Chọn lý do --</option>
                <option>Thay đổi định hướng nghề nghiệp</option>
                <option>Việc gia đình/Cá nhân</option>
                <option>Chuyển nơi cư trú</option>
                <option>Lý do khác</option>
              </select>
            </div>

            <div class="mb-4">
              <label class="form-label small fw-bold text-dark mb-2">
                Chia sẻ thêm (không bắt buộc)
              </label>
              <textarea class="form-control custom-input text-secondary" rows="4" placeholder="Cảm nhận của bạn về môi trường làm việc hoặc lý do chi tiết hơn..."></textarea>
            </div>

            <div class="mb-4 mt-auto">
              <div class="form-check custom-checkbox bg-light p-3 rounded-3 border">
                <input class="form-check-input ms-1 mt-1 border-secondary" type="checkbox" id="commitCheck">
                <label class="form-check-label ms-2 small text-dark fw-medium lh-base" for="commitCheck">
                  Tôi cam kết sẽ hoàn thành đầy đủ các nhiệm vụ được giao và thực hiện bàn giao công việc/tài sản trước ngày làm việc cuối cùng.
                </label>
              </div>
            </div>
            
          </form>
        </div>

        <!-- Right Column: Rules Info -->
        <div class="col-lg-5">
          <div class="rules-box h-100 bg-brand-blue-opacity-5 border border-brand-blue-opacity-10 rounded-4 p-4 d-flex flex-column">
            
            <h3 class="h6 fw-bold text-dark mb-4 d-flex align-items-center gap-2">
              <span class="material-symbols-outlined text-brand-blue fs-5 icon-filled">policy</span>
              Quy định & Chính sách
            </h3>

            <div class="timeline-wrapper flex-grow-1">
              
              <div class="timeline-item position-relative pb-4 ps-4">
                <div class="timeline-icon position-absolute top-0 start-0 translate-middle-x bg-brand-blue text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width: 20px; height: 20px;">
                  <span class="material-symbols-outlined fs-6 icon-filled" style="font-size: 14px;">check</span>
                </div>
                <div class="timeline-line position-absolute start-0 translate-middle-x bg-secondary bg-opacity-25" style="width: 2px; height: 100%; top: 20px; bottom: 0;"></div>
                
                <h4 class="small fw-bold text-dark mb-1">Thời hạn báo trước</h4>
                <p class="x-small text-secondary mb-0 lh-base fw-medium">
                  Ít nhất 30 ngày (HĐ xác định thời hạn) hoặc 45 ngày (HĐ không xác định thời hạn).
                </p>
              </div>

              <div class="timeline-item position-relative pb-4 ps-4">
                <div class="timeline-icon position-absolute top-0 start-0 translate-middle-x bg-brand-blue text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width: 20px; height: 20px;">
                  <span class="material-symbols-outlined fs-6 icon-filled" style="font-size: 14px;">check</span>
                </div>
                <div class="timeline-line position-absolute start-0 translate-middle-x bg-secondary bg-opacity-25" style="width: 2px; height: 100%; top: 20px; bottom: 0;"></div>
                
                <h4 class="small fw-bold text-dark mb-1">Bàn giao tài sản</h4>
                <p class="x-small text-secondary mb-0 lh-base fw-medium">
                  Bao gồm laptop, thẻ nhân viên và các thiết bị/tài liệu liên quan đến công việc.
                </p>
              </div>

              <div class="timeline-item position-relative ps-4 mb-4">
                <div class="timeline-icon position-absolute top-0 start-0 translate-middle-x bg-brand-blue text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width: 20px; height: 20px;">
                  <span class="material-symbols-outlined fs-6 icon-filled" style="font-size: 14px;">check</span>
                </div>
                
                <h4 class="small fw-bold text-dark mb-1">Quyết toán lương</h4>
                <p class="x-small text-secondary mb-0 lh-base fw-medium">
                  Được thực hiện trong vòng 7-14 ngày kể từ ngày làm việc cuối cùng.
                </p>
              </div>

            </div>

            <hr class="border-secondary border-opacity-25 my-3">
            
            <p class="x-small text-secondary mb-0 text-center fw-medium mt-auto">
              <span class="material-symbols-outlined fs-6 align-middle me-1">help</span>
              Mọi thắc mắc liên hệ: <a href="#" class="text-brand-blue text-decoration-none fw-bold hover-underline">Bộ phận Nhân sự</a>
            </p>

          </div>
        </div>

      </div>

      <hr class="border-secondary border-opacity-10 my-4">

      <!-- Action Buttons Footer -->
      <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-4">
        <a href="#" class="text-brand-blue text-decoration-none fw-bold small d-flex align-items-center gap-2 hover-opacity">
          <span class="material-symbols-outlined">attach_file</span>
          Đính kèm biên bản
        </a>
        
        <div class="d-flex gap-3 w-100 flex-sm-row justify-content-sm-end" style="max-width: 400px;">
          <button type="button" class="btn btn-white fw-bold px-4 py-2 rounded-3 border text-dark flex-grow-1 flex-sm-grow-0" @click="$router.push('/ho-so')">
            Hủy bỏ
          </button>
          <button type="submit" class="btn btn-brand-blue fw-bold px-4 py-2 rounded-3 d-flex align-items-center justify-content-center gap-2 shadow-sm flex-grow-1 flex-sm-grow-0">
            Gửi yêu cầu <span class="material-symbols-outlined fs-6">send</span>
          </button>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
</script>

<style scoped>
.resignation-wrapper {
  background-color: #F8FAFC;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

/* Material Symbols Override */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
.icon-filled {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* Bento Card Styling */
.bento-card {
  border-radius: 1rem;
  background: #ffffff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  border: none;
}

/* Colors */
.text-brand-blue { color: #3B58E9 !important; }
.bg-brand-blue { background-color: #3B58E9 !important; }

.bg-brand-blue-opacity-5 { background-color: rgba(59, 88, 233, 0.03) !important; }
.border-brand-blue-opacity-10 { border: 1px solid rgba(59, 88, 233, 0.1) !important; }

.bg-warning-subtle { background-color: #FFFDF5 !important; }
.border-warning-subtle { border: 1px solid #FDF0D5 !important; }
.text-warning-emphasis { color: #B45309 !important; }

.icon-square {
  width: 40px;
  height: 40px;
  border-radius: 10px;
}

.hover-brand-blue:hover { color: #3B58E9 !important; }
.hover-opacity:hover { opacity: 0.8; }
.hover-underline:hover { text-decoration: underline !important; }

.btn-brand-blue {
  background-color: #3B58E9;
  border-color: #3B58E9;
  color: white;
}
.btn-brand-blue:hover {
  background-color: #2b45cf;
  border-color: #2b45cf;
  color: white;
}

.btn-white {
  background-color: #ffffff;
  border-color: #E2E8F0;
}
.btn-white:hover {
  background-color: #F8FAFC;
}

/* Inputs */
.custom-input {
  border-radius: 0.5rem;
  border: 1px solid #E2E8F0;
  font-size: 0.875rem;
  background-color: #ffffff;
  padding: 0.75rem 1rem;
}
.custom-input:focus {
  border-color: #3B58E9;
  box-shadow: 0 0 0 0.2rem rgba(59, 88, 233, 0.1);
  outline: none;
}
textarea.custom-input {
  resize: vertical;
}

input[type="date"].custom-input::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.5;
}

.custom-checkbox input:checked {
  background-color: #3B58E9;
  border-color: #3B58E9;
}

/* Utilities */
.cursor-pointer { cursor: pointer; }
.tracking-wider { letter-spacing: 0.05em; }
.x-small { font-size: 0.75rem; }

/* Timeline adjustments */
.timeline-item {
  z-index: 1;
}
</style>
