<template>
  <div class="notifications-wrapper container-fluid px-md-5 py-4 min-vh-100">
    
    <!-- Top Header -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
      <h1 class="h4 fw-bold text-dark mb-0 d-flex align-items-center gap-2">
        <span class="material-symbols-outlined fs-4 text-brand-blue icon-filled">notifications_active</span>
        Trung tâm Thông báo
      </h1>
      
      <div class="d-flex align-items-center gap-3">
        <div class="position-relative search-input-wrapper">
          <span class="material-symbols-outlined position-absolute start-0 top-50 translate-middle-y ms-3 text-muted fs-5">search</span>
          <input type="text" class="form-control custom-input search-input ps-5" placeholder="Tìm kiếm thông báo...">
        </div>
        <button class="btn btn-light bg-white border border-opacity-10 border-dark d-flex align-items-center justify-content-center p-2 rounded-3 hover-bg-light shadow-sm">
          <span class="material-symbols-outlined text-secondary fs-5">filter_list</span>
        </button>
      </div>
    </div>

    <!-- Filters & Sort -->
    <div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-5">
      <div class="d-flex flex-wrap gap-2">
        <button class="btn btn-brand-blue rounded-pill px-4 py-1 small fw-bold">Tất cả</button>
        <button class="btn btn-white rounded-pill px-4 py-1 small fw-semibold text-secondary">Chưa đọc</button>
        <button class="btn btn-white rounded-pill px-4 py-1 small fw-semibold text-secondary">Hành chính</button>
        <button class="btn btn-white rounded-pill px-4 py-1 small fw-semibold text-secondary">Hệ thống</button>
      </div>
      
      <div class="d-flex align-items-center gap-2">
        <span class="x-small text-secondary fw-semibold">Sắp xếp theo:</span>
        <button class="btn btn-link text-brand-blue fw-bold text-decoration-none p-0 d-flex align-items-center small gap-1 hover-opacity">
          Mới nhất <span class="material-symbols-outlined fs-6">expand_more</span>
        </button>
      </div>
    </div>

    <!-- Group: Gần đây -->
    <div class="mb-5">
      <h2 class="x-small fw-bold text-secondary text-uppercase tracking-wider mb-3 ms-1">GẦN ĐÂY</h2>
      
      <div class="d-flex flex-column gap-3">
        
        <!-- Unread Item 1 -->
        <div class="card bento-card border-brand-blue border-opacity-100 shadow-sm position-relative overflow-hidden cursor-pointer hover-bg-light transition-all" style="border-width: 2px !important;">
          <div class="position-absolute border-start border-brand-blue border-4 w-1 h-100 top-0 start-0"></div>
          <div class="p-4 d-flex gap-3">
            <div class="rounded-3 bg-brand-blue bg-opacity-10 text-brand-blue d-flex align-items-center justify-content-center flex-shrink-0 mt-1" style="width: 48px; height: 48px;">
              <span class="material-symbols-outlined fs-4 icon-filled">event_available</span>
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-start mb-1">
                <h3 class="small fw-bold text-dark mb-0">Đơn nghỉ phép đã được duyệt</h3>
                <div class="d-flex align-items-center gap-2 ms-3">
                  <span class="x-small text-secondary">10 phút trước</span>
                  <div class="rounded-circle bg-brand-blue" style="width: 8px; height: 8px;"></div>
                </div>
              </div>
              <p class="small text-secondary mb-2 lh-base pe-md-5">
                Đơn nghỉ phép của bạn từ ngày 20/10 đến 22/10 đã được phê duyệt bởi Trưởng phòng Hành chính Nhân sự.
              </p>
              <span class="badge bg-primary bg-opacity-10 text-brand-blue rounded-pill px-2 py-1 fw-bold x-small tracking-wider border border-primary border-opacity-10 text-uppercase" style="font-size: 0.65rem;">HÀNH CHÍNH</span>
            </div>
          </div>
        </div>

        <!-- Unread Item 2 -->
        <div class="card bento-card border-brand-blue border-opacity-100 shadow-sm position-relative overflow-hidden cursor-pointer hover-bg-light transition-all" style="border-width: 2px !important;">
          <div class="position-absolute border-start border-brand-blue border-4 w-1 h-100 top-0 start-0"></div>
          <div class="p-4 d-flex gap-3">
            <div class="rounded-3 bg-brand-blue bg-opacity-10 text-brand-blue d-flex align-items-center justify-content-center flex-shrink-0 mt-1" style="width: 48px; height: 48px;">
              <span class="material-symbols-outlined fs-4 icon-filled">payments</span>
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-start mb-1">
                <h3 class="small fw-bold text-dark mb-0">Phiếu lương tháng 10 đã sẵn sàng</h3>
                <div class="d-flex align-items-center gap-2 ms-3">
                  <span class="x-small text-secondary">2 giờ trước</span>
                  <div class="rounded-circle bg-brand-blue" style="width: 8px; height: 8px;"></div>
                </div>
              </div>
              <p class="small text-secondary mb-2 lh-base pe-md-5">
                Hệ thống đã cập nhật phiếu lương tháng 10 của bạn. Vui lòng kiểm tra và xác nhận nếu không có sai sót.
              </p>
              <span class="badge bg-success bg-opacity-10 text-success rounded-pill px-2 py-1 fw-bold x-small tracking-wider border border-success border-opacity-10 text-uppercase" style="font-size: 0.65rem;">TÀI CHÍNH</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Group: Trước đó -->
    <div class="mb-5">
      <h2 class="x-small fw-bold text-secondary text-uppercase tracking-wider mb-3 ms-1">TRƯỚC ĐÓ</h2>
      
      <div class="d-flex flex-column gap-3">
        
        <!-- Read Item 1 -->
        <div class="card bento-card border border-opacity-10 border-dark shadow-sm cursor-pointer hover-bg-light transition-all">
          <div class="p-4 d-flex gap-3">
            <div class="rounded-3 bg-secondary bg-opacity-10 text-secondary d-flex align-items-center justify-content-center flex-shrink-0 mt-1" style="width: 48px; height: 48px;">
              <span class="material-symbols-outlined fs-4 icon-filled">campaign</span>
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-start mb-1">
                <h3 class="small fw-semibold text-secondary mb-0">Thông báo họp nội bộ quý 4</h3>
                <div class="d-flex align-items-center ms-3">
                  <span class="x-small text-muted">Hôm qua, 14:30</span>
                </div>
              </div>
              <p class="small text-muted mb-2 lh-base pe-md-5">
                Tất cả nhân viên tham gia buổi họp tổng kết quý 3 và định hướng quý 4 tại phòng họp lớn vào lúc 09:00 sáng Thứ 2 tuần sau.
              </p>
              <span class="badge bg-secondary bg-opacity-10 text-secondary rounded-pill px-2 py-1 fw-bold x-small tracking-wider border border-secondary border-opacity-10 text-uppercase" style="font-size: 0.65rem;">SỰ KIỆN</span>
            </div>
          </div>
        </div>

        <!-- Read Item 2 -->
        <div class="card bento-card border border-opacity-10 border-dark shadow-sm cursor-pointer hover-bg-light transition-all">
          <div class="p-4 d-flex gap-3">
            <div class="rounded-3 bg-secondary bg-opacity-10 text-secondary d-flex align-items-center justify-content-center flex-shrink-0 mt-1" style="width: 48px; height: 48px;">
              <span class="material-symbols-outlined fs-4 icon-filled">security</span>
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-start mb-1">
                <h3 class="small fw-semibold text-secondary mb-0">Yêu cầu thay đổi mật khẩu định kỳ</h3>
                <div class="d-flex align-items-center ms-3">
                  <span class="x-small text-muted">2 ngày trước</span>
                </div>
              </div>
              <p class="small text-muted mb-2 lh-base pe-md-5">
                Mật khẩu của bạn đã quá hạn 90 ngày. Vui lòng cập nhật mật khẩu mới để đảm bảo an toàn cho tài khoản Portal.
              </p>
              <span class="badge bg-warning bg-opacity-10 text-warning rounded-pill px-2 py-1 fw-bold x-small tracking-wider border border-warning border-opacity-10 text-uppercase" style="color: #DD7C37 !important; font-size: 0.65rem;">HỆ THỐNG</span>
            </div>
          </div>
        </div>

        <!-- Read Item 3 -->
        <div class="card bento-card border border-opacity-10 border-dark shadow-sm cursor-pointer hover-bg-light transition-all">
          <div class="p-4 d-flex gap-3">
            <div class="rounded-3 bg-secondary bg-opacity-10 text-secondary d-flex align-items-center justify-content-center flex-shrink-0 mt-1" style="width: 48px; height: 48px;">
              <span class="material-symbols-outlined fs-4 icon-filled">cake</span>
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-start mb-1">
                <h3 class="small fw-semibold text-secondary mb-0">Chúc mừng sinh nhật tháng 11</h3>
                <div class="d-flex align-items-center ms-3">
                  <span class="x-small text-muted">1 tuần trước</span>
                </div>
              </div>
              <p class="small text-muted mb-2 lh-base pe-md-5">
                Công ty thân gửi lời chúc mừng sinh nhật đến các thành viên có sinh nhật trong tháng 11. Bữa tiệc trà sẽ diễn ra vào lúc 16:00 chiều nay.
              </p>
              <span class="badge bg-danger bg-opacity-10 text-danger rounded-pill px-2 py-1 fw-bold x-small tracking-wider border border-danger border-opacity-10 text-uppercase" style="font-size: 0.65rem;">VĂN HÓA</span>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
</script>

<style scoped>
.notifications-wrapper {
  background-color: #F8FAFC;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  margin: 0 auto;
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
}

/* Brand Colors */
.text-brand-blue { color: #3B58E9 !important; }
.bg-brand-blue { background-color: #e9eaf3 !important; }

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
  border: 1px solid #E2E8F0;
}
.btn-white:hover {
  background-color: #F1F5F9;
}

/* Base custom input */
.custom-input {
  border-radius: 0.75rem;
  border: 1px solid transparent;
  background-color: #F1F4F9;
  font-size: 0.875rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  color: #1E293B;
  transition: all 0.2s ease;
}
.custom-input:focus {
  border-color: rgba(59, 88, 233, 0.4);
  background-color: #ffffff;
  box-shadow: 0 0 0 0.25rem rgba(59, 88, 233, 0.1);
  outline: none;
}

.search-input-wrapper {
  width: 280px;
}

/* Utilities */
.tracking-wider { letter-spacing: 0.05em; }
.x-small { font-size: 0.75rem; }
.cursor-pointer { cursor: pointer; }

.hover-bg-light:hover {
  background-color: #FAFCFF !important;
}
.hover-opacity:hover {
  opacity: 0.8;
}

.transition-all {
  transition: all 0.2s ease-in-out;
}
</style>
