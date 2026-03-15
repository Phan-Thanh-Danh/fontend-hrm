<template>
  <div class="profile-wrapper container-fluid py-4 min-vh-100">
    
    <!-- Top Header Card -->
    <div class="card bento-card p-4 mb-4">
      <div class="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-4">
        <!-- Avatar Section -->
        <div class="position-relative flex-shrink-0 mt-1">
          <div class="avatar-circle rounded-circle overflow-hidden bg-dark position-relative shadow-sm d-flex align-items-center justify-content-center" style="width: 110px; height: 110px;">
             <!-- Placeholder for avatar -->
             <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Avatar" class="w-100 h-100 object-fit-cover" />
          </div>
          <button class="btn btn-white btn-sm rounded-circle shadow-sm position-absolute d-flex align-items-center justify-content-center p-1 border" style="width: 32px; height: 32px; right: 0; bottom: 0;">
            <span class="material-symbols-outlined fs-6 text-brand-blue">photo_camera</span>
          </button>
        </div>
        
        <!-- Info Section -->
        <div class="flex-grow-1 text-center text-md-start w-100">
          <div class="d-flex flex-column flex-md-row align-items-center gap-3 mb-3">
            <h1 class="h4 fw-bold mb-0 text-dark">Nguyễn Văn An</h1>
            <span class="badge bg-success-subtle text-success-emphasis rounded-pill px-3 py-1 fw-bold tracking-wider x-small user-select-none">ĐANG LÀM VIỆC</span>
          </div>
          
          <div class="row g-3">
            <div class="col-sm-6 col-md-3">
              <p class="x-small text-muted fw-bold text-uppercase mb-1 tracking-wider">MÃ NHÂN VIÊN</p>
              <p class="fw-medium text-dark small mb-0">NV00123</p>
            </div>
            <div class="col-sm-6 col-md-3">
              <p class="x-small text-muted fw-bold text-uppercase mb-1 tracking-wider">PHÒNG BAN</p>
              <a href="#" class="fw-semibold text-brand-blue small mb-0 text-decoration-none hover-opacity">Kỹ thuật</a>
            </div>
            <div class="col-sm-6 col-md-3">
              <p class="x-small text-muted fw-bold text-uppercase mb-1 tracking-wider">CHỨC VỤ</p>
              <p class="fw-medium text-dark small mb-0">Lập trình viên Senior</p>
            </div>
            <div class="col-sm-6 col-md-3">
              <p class="x-small text-muted fw-bold text-uppercase mb-1 tracking-wider">NGÀY VÀO LÀM</p>
              <p class="fw-medium text-dark small mb-0">01/01/2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4 d-flex align-items-stretch">
      <!-- Left Column: Personal Info & Certificates -->
      <div class="col-lg-8 d-flex flex-column gap-4">
        
        <!-- Thông tin cá nhân -->
        <div class="card bento-card p-4">
          <h2 class="h6 fw-bold text-dark mb-4">Thông tin cá nhân</h2>
          
          <form class="row g-4">
            <!-- Row 1 -->
            <div class="col-md-6">
              <label class="form-label small text-secondary fw-semibold mb-2">Họ và tên</label>
              <div class="input-icon-wrapper">
                <span class="material-symbols-outlined input-icon text-muted">person</span>
                <input type="text" class="form-control custom-input" value="Nguyễn Văn An" readonly>
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label small text-secondary fw-semibold mb-2">Ngày sinh</label>
              <div class="input-icon-wrapper">
                <span class="material-symbols-outlined input-icon text-muted">cake</span>
                <input type="text" class="form-control custom-input" value="15/05/1992" readonly>
              </div>
            </div>
            <!-- Row 2 -->
            <div class="col-md-6">
              <label class="form-label small text-secondary fw-semibold mb-2">Giới tính</label>
              <div class="input-icon-wrapper select-wrapper">
                <span class="material-symbols-outlined input-icon text-muted">wc</span>
                <select class="form-select custom-input" disabled>
                  <option selected>Nam</option>
                  <option>Nữ</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label small text-secondary fw-semibold mb-2">Số điện thoại</label>
              <div class="input-icon-wrapper">
                <span class="material-symbols-outlined input-icon text-muted">call</span>
                <input type="text" class="form-control custom-input" value="090 123 4567" readonly>
              </div>
            </div>
            <!-- Row 3 -->
            <div class="col-12">
              <label class="form-label small text-secondary fw-semibold mb-2">Email cá nhân</label>
              <div class="input-icon-wrapper">
                <span class="material-symbols-outlined input-icon text-muted">mail</span>
                <input type="email" class="form-control custom-input" value="an.nguyen92@gmail.com" readonly>
              </div>
            </div>
            <!-- Row 4 -->
            <div class="col-12">
              <label class="form-label small text-secondary fw-semibold mb-2">Địa chỉ thường trú</label>
              <div class="input-icon-wrapper">
                <span class="material-symbols-outlined input-icon text-muted">location_on</span>
                <input type="text" class="form-control custom-input" value="Số 123 Đường ABC, Phường 4, Quận Tân Bình, TP. Hồ Chí Minh" readonly>
              </div>
            </div>
            <!-- Row 5 -->
            <div class="col-12">
              <label class="form-label small text-secondary fw-semibold mb-2">Số CCCD / Hộ chiếu</label>
              <div class="input-icon-wrapper">
                <span class="material-symbols-outlined input-icon text-muted">badge</span>
                <input type="text" class="form-control custom-input" value="012345678901" readonly>
              </div>
            </div>

            <!-- Nút Lưu thay đổi -->
            <div class="col-12 mt-4 pt-3 border-top-custom d-flex justify-content-end">
              <button type="button" class="btn fw-bold px-4 py-2 rounded-3 shadow-sm d-flex align-items-center gap-2" style="background-color: #EAF0FF; color: #3B58E9;">
                <span class="material-symbols-outlined fs-5">save</span>
                Lưu thay đổi
              </button>
            </div>
          </form>
        </div>

        <!-- Bằng cấp & Chứng chỉ -->
        <div class="card bento-card p-0 overflow-hidden mt-auto">
          <div class="p-4 d-flex justify-content-between align-items-center">
            <h2 class="h6 fw-bold text-dark mb-0">Bằng cấp & Chứng chỉ</h2>
            <button class="btn btn-sm text-brand-blue p-0 text-decoration-none fw-bold small d-flex align-items-center gap-1 hover-opacity shadow-none bg-transparent border-0 tracking-tight">
              <span class="material-symbols-outlined fs-6">add_circle</span>
              Thêm bằng cấp
            </button>
          </div>
          
          <div class="table-responsive p-0">
            <table class="table table-borderless align-middle mb-0 custom-table">
              <thead class="text-secondary small fw-bold custom-thead">
                <tr>
                  <th class="py-3 px-4 w-35 border-0 text-secondary fw-bold">Tên bằng cấp / <br>Chứng chỉ</th>
                  <th class="py-3 px-2 w-30 border-0 text-secondary fw-bold">Nơi đào tạo</th>
                  <th class="py-3 px-2 w-10 border-0 text-secondary fw-bold">Năm</th>
                  <th class="py-3 px-4 w-25 border-0 text-secondary fw-bold text-start">File đính kèm</th>
                </tr>
              </thead>
              <tbody class="small fw-medium text-dark">
                <tr class="border-bottom-custom">
                  <td class="py-3 px-4 fw-semibold">Kỹ sư Công nghệ<br>thông tin</td>
                  <td class="py-3 px-2 text-secondary">Đại học Bách<br>Khoa TP.HCM</td>
                  <td class="py-3 px-2 text-secondary">2014</td>
                  <td class="py-3 px-4 text-start">
                    <a href="#" class="text-brand-blue text-decoration-none d-flex align-items-center gap-1 hover-opacity text-truncate w-100">
                      <span class="material-symbols-outlined fs-6 flex-shrink-0">link</span> <span class="text-truncate">bang_dai_hoc.pdf</span>
                    </a>
                  </td>
                </tr>
                <tr class="border-bottom-custom">
                  <td class="py-3 px-4 fw-semibold">AWS Certified<br>Solutions Architect</td>
                  <td class="py-3 px-2 text-secondary">Amazon Web<br>Services</td>
                  <td class="py-3 px-2 text-secondary">2022</td>
                  <td class="py-3 px-4 text-start">
                    <a href="#" class="text-brand-blue text-decoration-none d-flex align-items-center gap-1 hover-opacity text-truncate w-100">
                      <span class="material-symbols-outlined fs-6 flex-shrink-0">link</span> <span class="text-truncate">aws_cert.pdf</span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td class="py-3 px-4 fw-semibold">IELTS 7.5</td>
                  <td class="py-3 px-2 text-secondary">British Council</td>
                  <td class="py-3 px-2 text-secondary">2021</td>
                  <td class="py-3 px-4 text-start">
                    <a href="#" class="text-brand-blue text-decoration-none d-flex align-items-center gap-1 hover-opacity text-truncate w-100">
                      <span class="material-symbols-outlined fs-6 flex-shrink-0">link</span> <span class="text-truncate">ielts_an.pdf</span>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Right Column: Thông tin công việc -->
      <div class="col-lg-4">
        <div class="card bento-card p-4 h-100 d-flex flex-column">
          <h2 class="h6 fw-bold text-dark mb-4 pb-2">Thông tin công việc</h2>
          
          <div class="d-flex flex-column gap-4 flex-grow-1">
            <!-- Info List -->
            <div class="d-flex gap-3 align-items-start">
              <div class="text-secondary mt-1 flex-shrink-0">
                <span class="material-symbols-outlined icon-bg text-secondary">account_tree</span>
              </div>
              <div>
                <p class="x-small fw-bold text-muted text-uppercase tracking-wider mb-1">PHÒNG BAN</p>
                <p class="small fw-bold text-dark mb-0">Phòng Kỹ thuật & Công nghệ</p>
              </div>
            </div>

            <div class="d-flex gap-3 align-items-start">
              <div class="text-secondary mt-1 flex-shrink-0">
                <span class="material-symbols-outlined icon-bg text-secondary">badge</span>
              </div>
              <div>
                <p class="x-small fw-bold text-muted text-uppercase tracking-wider mb-1">CHỨC VỤ</p>
                <p class="small fw-bold text-dark mb-0">Lập trình viên Senior (Level 4)</p>
              </div>
            </div>

            <div class="d-flex gap-3 align-items-start">
              <div class="text-secondary mt-1 flex-shrink-0">
                <span class="material-symbols-outlined icon-bg text-secondary">group</span>
              </div>
              <div>
                <p class="x-small fw-bold text-muted text-uppercase tracking-wider mb-1">QUẢN LÝ TRỰC TIẾP</p>
                <div class="d-flex align-items-center gap-2 mt-1">
                  <div class="rounded-circle overflow-hidden bg-secondary shadow-sm" style="width: 24px; height: 24px;">
                    <img src="https://i.pravatar.cc/150?u=nam_le" alt="Manager" class="w-100 h-100 object-fit-cover" />
                  </div>
                  <p class="small fw-bold text-dark mb-0">Lê Hoàng Nam</p>
                </div>
              </div>
            </div>

            <div class="d-flex gap-3 align-items-start">
              <div class="text-secondary mt-1 flex-shrink-0">
                <span class="material-symbols-outlined icon-bg text-secondary">description</span>
              </div>
              <div>
                <p class="x-small fw-bold text-muted text-uppercase tracking-wider mb-1">LOẠI HỢP ĐỒNG</p>
                <p class="small fw-bold text-dark mb-0 lh-base">Hợp đồng không xác định thời hạn</p>
              </div>
            </div>

            <div class="d-flex gap-3 align-items-start">
              <div class="text-secondary mt-1 flex-shrink-0">
                <span class="material-symbols-outlined icon-bg text-secondary">event</span>
              </div>
              <div>
                <p class="x-small fw-bold text-muted text-uppercase tracking-wider mb-1">NGÀY BẮT ĐẦU</p>
                <p class="small fw-bold text-dark mb-0 lh-sm">01 tháng 01, 2023</p>
              </div>
            </div>
          </div>

          <!-- Progress and Button (Bottom) -->
          <div class="mt-5 pt-4">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <p class="small fw-bold text-dark mb-0">Thời gian gắn bó</p>
              <p class="x-small fw-medium text-brand-blue mb-0">1 năm 2 tháng</p>
            </div>
            <div class="progress rounded-pill bg-brand-blue bg-opacity-10 mb-4" style="height: 6px;">
              <div class="progress-bar bg-brand-blue rounded-pill" role="progressbar" style="width: 50%;"></div>
            </div>
            <button class="btn btn-outline-secondary w-100 rounded-3 text-secondary fw-semibold small py-2 d-flex align-items-center justify-content-center">
              Xem lịch sử thăng tiến
            </button>
          </div>

        </div>
      </div>
    </div>

    <!-- Nút Xin Nghỉ Việc -->
    <div class="mt-5 pt-4 border-top border-secondary border-opacity-10 d-flex justify-content-end">
      <router-link to="/don-nghi-viec" class="btn btn-danger text-white fw-bold px-4 py-2 rounded-3 shadow-sm d-flex align-items-center gap-2 hover-opacity">
        <span class="material-symbols-outlined fs-5">directions_run</span>
        Xin Nghỉ Việc
      </router-link>
    </div>

  </div>
</template>

<script setup>
</script>

<style scoped>
.profile-wrapper {
  background-color: transparent;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

/* Material Symbols Override */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* Base Card Styling - Soft UI/Bento Grid feel */
.bento-card {
  border: 1px solid rgba(0,0,0,0.04);
  border-radius: 1.25rem; /* ~20px */
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.01);
  transition: box-shadow 0.2s ease;
}

/* Brand Colors */
.text-brand-blue {
  color: #3B58E9 !important;
}
.bg-brand-blue {
  background-color: #3B58E9 !important;
}

/* Status Badge */
.bg-success-subtle {
  background-color: #E6F5EA !important;
}
.text-success-emphasis {
  color: #2D8A4E !important;
}

/* Input Fields with icons */
.input-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.input-icon {
  position: absolute;
  left: 1rem;
  font-size: 1.25rem; /* 20px */
  z-index: 2;
}
.custom-input {
  padding-left: 2.75rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--sys-border, #E2E8F0);
  font-size: 0.875rem;
  color: var(--sys-text-primary, #1E293B);
  background-color: var(--sys-bg-page, #ffffff);
}
.custom-input[readonly], .custom-input[disabled] {
  background-color: var(--sys-bg-page, #ffffff);
  opacity: 0.9;
}
.custom-input:focus {
  border-color: #3B58E9;
  box-shadow: 0 0 0 0.25rem rgba(59, 88, 233, 0.1);
  outline: none;
}

/* Fix select dropdown arrow padding */
.select-wrapper::after {
  display: none !important;
}

.custom-thead {
  background-color: var(--sys-bg-surface, #F8FAFC);
  border-top: 1px solid var(--sys-border, #F1F5F9);
  border-bottom: 1px solid var(--sys-border, #F1F5F9);
}

/* Borders and lines */
.border-bottom-custom {
  border-bottom: 1px solid var(--sys-border, #F1F5F9) !important;
}

/* Helpers */
.tracking-wider {
  letter-spacing: 0.05em;
}
.tracking-tight {
  letter-spacing: -0.01em;
}
.hover-opacity:hover {
  opacity: 0.8;
}
.icon-bg {
  background-color: var(--sys-bg-page, #F8FAFC);
  padding: 6px;
  border-radius: 6px;
  font-size: 1.25rem;
}
.x-small {
  font-size: 0.75rem;
}

/* Button overrides */
.btn-white {
  background-color: var(--sys-bg-surface, #ffffff);
  border-color: var(--sys-border, #e2e8f0);
}
.btn-white:hover {
  background-color: var(--sys-bg-page, #f8fafc);
}
.btn-outline-secondary {
  border-color: var(--sys-border, #E2E8F0);
  color: var(--sys-text-secondary, #64748B);
}
.btn-outline-secondary:hover {
  background-color: var(--sys-bg-page, #F8FAFC);
  border-color: var(--sys-border, #CBD5E1);
  color: var(--sys-text-primary, #475569);
}
</style>
