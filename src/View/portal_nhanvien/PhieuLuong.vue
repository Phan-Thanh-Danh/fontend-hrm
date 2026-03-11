<template>
  <div class="payslip-wrapper container-fluid py-4 min-vh-100">
    <div class="row g-4 d-flex align-items-stretch">
      
      <!-- Left Column: Lịch sử kỳ lương -->
      <div class="col-lg-4 d-flex flex-column gap-3">
        <div class="d-flex justify-content-between align-items-center mb-2 px-1">
          <h2 class="h6 fw-bold text-dark mb-0">Lịch sử kỳ lương</h2>
          <span class="x-small text-secondary fw-semibold">Năm 2023</span>
        </div>
        
        <div class="d-flex flex-column gap-3 overflow-auto custom-scrollbar pe-2" style="max-height: calc(100vh - 120px);">
          
          <!-- Thẻ Active (Current) -->
          <div class="card bento-card border-brand-blue border-opacity-100 shadow-sm position-relative overflow-hidden cursor-pointer" style="border-width: 2px !important;">
            <div class="position-absolute border-start border-brand-blue border-4 w-1 h-100 top-0 start-0"></div>
            <div class="p-4 d-flex flex-column gap-3 ps-4">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <h3 class="small fw-bold text-dark text-uppercase tracking-tight mb-1">Tháng 10/2023</h3>
                  <p class="x-small text-secondary mb-0">Thanh toán ngày 05/11</p>
                </div>
                <span class="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-1 fw-bold border border-success border-opacity-25" style="font-size: 0.65rem;">ĐÃ THANH TOÁN</span>
              </div>
              <div class="d-flex justify-content-between align-items-end">
                <div>
                  <p class="x-small text-secondary mb-0">Thực nhận (Net)</p>
                  <p class="h5 fw-bold text-brand-blue tracking-tight mb-0">25.000.000đ</p>
                </div>
                <button class="btn btn-sm btn-light bg-brand-blue bg-opacity-10 text-brand-blue border-0 rounded-3 d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;">
                  <span class="material-symbols-outlined fs-6">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Thẻ Inactive -->
          <div class="card bento-card border-1 border-opacity-10 border-dark shadow-sm hover-border-blue transition-all cursor-pointer">
            <div class="p-4 d-flex flex-column gap-3">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <h3 class="small fw-bold text-secondary text-uppercase tracking-tight mb-1">Tháng 09/2023</h3>
                  <p class="x-small text-secondary mb-0">Thanh toán ngày 05/10</p>
                </div>
                <span class="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-1 fw-bold border border-success border-opacity-25" style="font-size: 0.65rem;">ĐÃ THANH TOÁN</span>
              </div>
              <div class="d-flex justify-content-between align-items-end">
                <div>
                  <p class="x-small text-secondary mb-0">Thực nhận (Net)</p>
                  <p class="h5 fw-bold text-dark tracking-tight mb-0">24.500.000đ</p>
                </div>
                <button class="btn btn-sm btn-light bg-secondary bg-opacity-10 text-secondary border-0 rounded-3 d-flex align-items-center justify-content-center transition-all" style="width: 32px; height: 32px;">
                  <span class="material-symbols-outlined fs-6">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Thẻ Inactive -->
          <div class="card bento-card border-1 border-opacity-10 border-dark shadow-sm hover-border-blue transition-all cursor-pointer">
            <div class="p-4 d-flex flex-column gap-3">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <h3 class="small fw-bold text-secondary text-uppercase tracking-tight mb-1">Tháng 08/2023</h3>
                  <p class="x-small text-secondary mb-0">Thanh toán ngày 05/09</p>
                </div>
                <span class="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-1 fw-bold border border-success border-opacity-25" style="font-size: 0.65rem;">ĐÃ THANH TOÁN</span>
              </div>
              <div class="d-flex justify-content-between align-items-end">
                <div>
                  <p class="x-small text-secondary mb-0">Thực nhận (Net)</p>
                  <p class="h5 fw-bold text-dark tracking-tight mb-0">26.200.000đ</p>
                </div>
                <button class="btn btn-sm btn-light bg-secondary bg-opacity-10 text-secondary border-0 rounded-3 d-flex align-items-center justify-content-center transition-all" style="width: 32px; height: 32px;">
                  <span class="material-symbols-outlined fs-6">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Right Column: Chi tiết Phiếu lương -->
      <div class="col-lg-8">
        <div class="card bento-card border-1 border-opacity-10 border-dark overflow-hidden h-100 d-flex flex-column">
          
          <!-- Header -->
          <div class="p-4 px-md-5 border-bottom-custom bg-light bg-opacity-50 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
            <div class="d-flex align-items-center gap-3">
              <div class="rounded-4 bg-brand-blue bg-opacity-10 text-brand-blue d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
                <span class="material-symbols-outlined fs-3 icon-filled">picture_as_pdf</span>
              </div>
              <div>
                <h4 class="h5 fw-bold text-dark mb-1">Chi tiết Phiếu lương</h4>
                <p class="x-small text-secondary mb-0">Kỳ lương tháng 10 năm 2023</p>
              </div>
            </div>
            <button class="btn btn-brand-blue fw-bold px-4 py-2 rounded-3 d-flex align-items-center justify-content-center gap-2 shadow-sm">
              <span class="material-symbols-outlined fs-6">download</span>
              Tải PDF Phiếu lương
            </button>
          </div>

          <!-- Body -->
          <div class="p-4 px-md-5 pb-5 overflow-auto custom-scrollbar flex-grow-1 bg-white">
            <div class="mx-auto" style="max-width: 800px;">
              
              <!-- Info Row -->
              <div class="row g-4 pb-4 border-bottom-custom mb-4">
                <div class="col-sm-6">
                  <p class="x-small fw-bold text-secondary text-uppercase tracking-wider mb-2">NHÂN VIÊN</p>
                  <p class="fw-bold text-dark mb-1">Nguyễn Văn A</p>
                  <p class="small text-secondary mb-1">Mã NV: HR2023-0124</p>
                  <p class="small text-secondary mb-0">Phòng ban: Creative Studio</p>
                </div>
                <div class="col-sm-6 text-sm-end">
                  <p class="x-small fw-bold text-secondary text-uppercase tracking-wider mb-2">KỲ THANH TOÁN</p>
                  <p class="fw-bold text-dark mb-1">01/10/2023 - 31/10/2023</p>
                  <p class="small text-secondary mb-1">Ngày chi trả: 05/11/2023</p>
                  <p class="small text-secondary mb-0">Số tài khoản: **** **** 1234 (Techcombank)</p>
                </div>
              </div>

              <!-- Net Value -->
              <div class="bg-brand-blue bg-opacity-5 border border-brand-blue border-opacity-10 rounded-4 p-4 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-5 gap-3">
                <div>
                  <h5 class="small fw-bold text-brand-blue text-uppercase tracking-wider mb-2">THỰC NHẬN CUỐI CÙNG (NET)</h5>
                  <p class="display-5 fw-bold text-brand-blue tracking-tight mb-0">25.000.000đ</p>
                </div>
                <div class="text-sm-end mt-2 mt-sm-0">
                  <p class="small text-secondary fst-italic mb-0">"Hai mươi lăm triệu đồng chẵn"</p>
                </div>
              </div>

              <!-- Details Table Grid -->
              <div class="row g-5 mb-5">
                
                <!-- Incomes -->
                <div class="col-md-6 d-flex flex-column gap-3">
                  <h6 class="fw-bold text-dark pb-2 border-bottom-custom d-flex align-items-center gap-2 mb-2">
                    <span class="material-symbols-outlined text-success fs-5 icon-filled">add_circle</span>
                    Các khoản thu nhập
                  </h6>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="small text-secondary fw-medium">Lương cơ bản (Gross)</span>
                    <span class="small fw-bold text-dark">28.000.000đ</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="small text-secondary fw-medium">Lương làm thêm giờ (OT)</span>
                    <span class="small fw-bold text-success">1.500.000đ</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="small text-secondary fw-medium">Phụ cấp ăn trưa</span>
                    <span class="small fw-bold text-dark">730.000đ</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="small text-secondary fw-medium">Thưởng hiệu suất</span>
                    <span class="small fw-bold text-dark">1.000.000đ</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center pt-3 mt-2 border-top border-secondary border-opacity-10">
                    <span class="fw-bold text-dark">Tổng thu nhập</span>
                    <span class="fw-bold text-dark">31.230.000đ</span>
                  </div>
                </div>

                <!-- Deductions -->
                <div class="col-md-6 d-flex flex-column gap-3">
                  <h6 class="fw-bold text-dark pb-2 border-bottom-custom d-flex align-items-center gap-2 mb-2">
                    <span class="material-symbols-outlined text-danger fs-5 icon-filled">remove_circle</span>
                    Các khoản khấu trừ
                  </h6>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="small text-secondary fw-medium">BHXH (8%)</span>
                    <span class="small fw-bold text-danger">-2.240.000đ</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="small text-secondary fw-medium">BHYT (1.5%)</span>
                    <span class="small fw-bold text-danger">-420.000đ</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="small text-secondary fw-medium">BHTN (1%)</span>
                    <span class="small fw-bold text-danger">-280.000đ</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="small text-secondary fw-medium">Thuế TNCN tạm tính</span>
                    <span class="small fw-bold text-danger">-3.290.000đ</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center pt-3 mt-2 border-top border-secondary border-opacity-10 flex-grow-1 align-items-end">
                    <span class="fw-bold text-dark">Tổng khấu trừ</span>
                    <span class="fw-bold text-dark">-6.230.000đ</span>
                  </div>
                </div>

              </div>

              <!-- Note Box -->
              <div class="p-4 rounded-3 border-1 border-opacity-10 border-dark bg-secondary bg-opacity-10 mt-2">
                <p class="x-small text-muted mb-0 lh-base fw-medium text-justify">
                  <strong class="text-dark">Ghi chú:</strong> Đây là phiếu lương được tạo tự động bởi hệ thống HRM. Mọi thắc mắc về các khoản tính toán xin vui lòng liên hệ Bộ phận Nhân sự (HR) trong vòng 03 ngày làm việc kể từ ngày nhận được phiếu lương.
                </p>
              </div>

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
.payslip-wrapper {
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
}

/* Brand Colors & Utilities */
.text-brand-blue { color: #3B58E9 !important; }
.bg-brand-blue { background-color: #ffffff !important; }
.border-brand-blue { border-color: #3B58E9 !important; }

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

.border-bottom-custom {
  border-bottom: 1px solid #F1F5F9 !important;
}

.tracking-wider { letter-spacing: 0.05em; }
.tracking-tight { letter-spacing: -0.02em; }
.x-small { font-size: 0.75rem; }
.cursor-pointer { cursor: pointer; }

/* Interactive Hover effect for list */
.hover-border-blue:hover {
  border-color: rgba(59, 88, 233, 0.3) !important;
}
.hover-border-blue:hover h3 {
  color: #1E293B !important;
}
.hover-border-blue:hover button {
  background-color: rgba(59, 88, 233, 0.1) !important;
  color: #3B58E9 !important;
}
.transition-all {
  transition: all 0.2s ease-in-out;
}

/* Custom cho thanh cuộn đẹp hơn xíu */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 20px;
}

/* Fix justify text */
.text-justify {
  text-align: justify;
}
</style>
