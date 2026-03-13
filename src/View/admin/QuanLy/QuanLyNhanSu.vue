<template>
  <div class="quan-ly-nhan-su-page p-4 bg-light min-vh-100">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="fw-bold mb-1">Quản lý Nhân sự Mới</h4>
        <p class="text-muted small mb-0">Theo dõi và thực hiện quy trình Onboarding cho nhân viên mới.</p>
      </div>
      <div class="d-flex gap-3">
        <div class="input-group" style="width: 300px;">
          <span class="input-group-text bg-white border-end-0"><span class="material-symbols-outlined fs-6 text-muted">search</span></span>
          <input type="text" class="form-control border-start-0 ps-0" placeholder="Tìm kiếm nhân sự...">
        </div>
        <button class="btn btn-primary d-flex align-items-center gap-2 px-4 shadow-sm fw-medium rounded-3">
          <span class="material-symbols-outlined fs-5">person_add</span> Thêm mới/Tiếp nhận
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row g-4 mb-4">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm rounded-4 h-100">
          <div class="card-body p-4 text-center d-flex flex-column align-items-center justify-content-center">
            <h6 class="text-muted fw-bold small text-uppercase mb-4 align-self-start">Tiến độ Onboarding Tháng này</h6>
            <!-- Circular Progress Placeholder -->
            <div class="position-relative d-inline-block" style="width: 120px; height: 120px;">
              <svg viewBox="0 0 36 36" class="circular-chart text-primary">
                <path class="circle-bg" stroke="#e2e8f0" stroke-width="3" fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path class="circle" stroke="#3b82f6" stroke-dasharray="75, 100" stroke-width="3" fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div class="position-absolute top-50 start-50 translate-middle fw-bold fs-3 text-dark">75%</div>
            </div>
            <p class="text-muted small mt-3 mb-0">15/20 nhân viên đã hoàn tất</p>
          </div>
        </div>
      </div>
      
      <div class="col-md-8">
         <div class="row g-4 h-100">
             <div class="col-md-4">
                 <div class="card border-0 shadow-sm rounded-4 h-100 p-4">
                     <div class="d-flex align-items-center gap-2 mb-3">
                         <div class="bg-warning bg-opacity-10 text-warning p-2 rounded"><span class="material-symbols-outlined fs-5 d-block" style="color: #f59e0b;">pending_actions</span></div>
                         <span class="fw-bold text-muted small">Đang chờ xử lý</span>
                     </div>
                     <h2 class="fw-bold mb-0 text-dark">03</h2>
                 </div>
             </div>
             <div class="col-md-4">
                 <div class="card border-0 shadow-sm rounded-4 h-100 p-4">
                     <div class="d-flex align-items-center gap-2 mb-3">
                         <div class="bg-danger bg-opacity-10 text-danger p-2 rounded"><span class="material-symbols-outlined fs-5 d-block" style="color: #ef4444;">error</span></div>
                         <span class="fw-bold text-muted small">Chưa hoàn tất</span>
                     </div>
                     <h2 class="fw-bold mb-0 text-dark">02</h2>
                 </div>
             </div>
             <div class="col-md-4">
                 <div class="card border-0 shadow-sm rounded-4 h-100 p-4">
                     <div class="d-flex align-items-center gap-2 mb-3">
                         <div class="bg-success bg-opacity-10 text-success p-2 rounded"><span class="material-symbols-outlined fs-5 d-block" style="color: #22c55e;">check_circle</span></div>
                         <span class="fw-bold text-muted small">Đã hoàn tất</span>
                     </div>
                     <h2 class="fw-bold mb-0 text-dark">15</h2>
                 </div>
             </div>
         </div>
      </div>
    </div>

    <!-- Candidate List -->
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-white border-bottom p-4 d-flex justify-content-between align-items-center rounded-top-4">
        <h6 class="fw-bold mb-0 text-dark">Danh sách nhân sự mới</h6>
        <a href="#" class="text-primary text-decoration-none small fw-medium d-flex align-items-center gap-1">Xem tất cả <span class="material-symbols-outlined fs-6">arrow_right_alt</span></a>
      </div>
      <div class="table-responsive">
        <table class="table align-middle text-nowrap mb-0 table-hover">
          <thead class="bg-white">
            <tr>
              <th class="border-bottom-0 py-3 px-4 text-muted fw-bold small">Họ tên</th>
              <th class="border-bottom-0 py-3 text-muted fw-bold small">Vị trí</th>
              <th class="border-bottom-0 py-3 text-muted fw-bold small">Ngày bắt đầu</th>
              <th class="border-bottom-0 py-3 px-4 text-muted fw-bold small text-center">Trạng thái Onboarding</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-top">
              <td class="py-3 px-4 fw-bold text-dark">Nguyễn Văn A</td>
              <td class="py-3 text-muted font-medium">Lập trình viên</td>
              <td class="py-3 text-muted font-medium">15/10/2023</td>
              <td class="py-3 px-4 text-center"><span class="badge bg-danger bg-opacity-10 text-danger rounded-pill px-3 py-2 border border-danger border-opacity-25" style="color: #ef4444 !important;">Chưa hoàn tất</span></td>
            </tr>
            <tr>
              <td class="py-3 px-4 fw-bold text-dark">Trần Thị B</td>
              <td class="py-3 text-muted font-medium">Kế toán trưởng</td>
              <td class="py-3 text-muted font-medium">10/10/2023</td>
              <td class="py-3 px-4 text-center"><span class="badge bg-warning bg-opacity-10 text-warning rounded-pill px-3 py-2 border border-warning border-opacity-25" style="color: #d97706 !important;">Đang chờ xử lý</span></td>
            </tr>
            <tr>
              <td class="py-3 px-4 fw-bold text-dark">Lê Văn C</td>
              <td class="py-3 text-muted font-medium">Chuyên viên Marketing</td>
              <td class="py-3 text-muted font-medium">01/10/2023</td>
              <td class="py-3 px-4 text-center"><span class="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 border border-success border-opacity-25" style="color: #16a34a !important;">Hoàn tất</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Bottom Sections -->
    <div class="row g-4">
        <!-- Thông tin công việc -->
        <div class="col-xl-5 h-100">
            <div class="card border-0 shadow-sm rounded-4 h-100 p-4">
                <h6 class="fw-bold mb-4 d-flex align-items-center gap-2 text-dark"><span class="material-symbols-outlined text-primary fs-5">work</span> Thông tin Công việc</h6>
                <div class="row g-3 mb-4">
                    <div class="col-md-6">
                        <label class="form-label text-muted small fw-bold text-uppercase mb-1" style="font-size: 0.7rem;">Họ và tên</label>
                        <input type="text" class="form-control bg-light border-0 py-2 text-muted" value="Trần Thị B" readonly>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label text-muted small fw-bold text-uppercase mb-1" style="font-size: 0.7rem;">Số điện thoại</label>
                        <input type="text" class="form-control bg-light border-0 py-2 text-muted" value="0901 234 567" readonly>
                    </div>
                    <div class="col-12 mt-3">
                        <label class="form-label text-muted small fw-bold text-uppercase mb-1" style="font-size: 0.7rem;">Email cá nhân</label>
                        <input type="text" class="form-control bg-light border-0 py-2 text-muted" value="tran.thi.b@gmail.com" readonly>
                    </div>
                    <div class="col-md-6 mt-3">
                        <label class="form-label text-muted small fw-bold text-uppercase mb-1" style="font-size: 0.7rem;">Phòng ban</label>
                        <select class="form-select border border-light py-2 text-dark font-medium cursor-pointer">
                            <option>Tài chính - Kế toán</option>
                        </select>
                    </div>
                     <div class="col-md-6 mt-3">
                        <label class="form-label text-muted small fw-bold text-uppercase mb-1" style="font-size: 0.7rem;">Chức danh</label>
                        <select class="form-select border border-light py-2 text-dark font-medium cursor-pointer">
                            <option>Kế toán trưởng</option>
                        </select>
                    </div>
                    <div class="col-12 mt-3">
                        <label class="form-label text-muted small fw-bold text-uppercase mb-1" style="font-size: 0.7rem;">Ngày bắt đầu</label>
                        <input type="date" class="form-control border border-light py-2 text-dark font-medium" value="2023-10-10">
                    </div>
                </div>
                <!-- Spacing to push button down -->
                <div class="flex-grow-1"></div>
                <button class="btn btn-primary w-100 fw-medium py-2 rounded-3 mt-3 d-flex align-items-center justify-content-center gap-2"><span class="material-symbols-outlined fs-5">person_add</span> Xác nhận tiếp nhận nhân sự</button>
            </div>
        </div>

        <!-- Khởi tạo tài khoản -->
        <div class="col-xl-7 h-100">
            <div class="card border-0 shadow-sm rounded-4 h-100 p-4">
                <h6 class="fw-bold mb-4 d-flex align-items-center gap-2 text-dark"><span class="material-symbols-outlined text-primary fs-5">mail</span> Khởi tạo Tài khoản & Welcome Email</h6>
                
                <p class="text-muted small fw-bold text-uppercase mb-2" style="font-size: 0.7rem; letter-spacing: 0.5px;">Portal Account Info</p>
                <div class="row g-3 mb-4">
                    <div class="col-md-4">
                        <div class="border rounded-3 p-2 px-3 bg-light bg-opacity-50">
                            <small class="text-muted d-block fw-bold mb-1" style="font-size: 0.65rem;">EMP ID</small>
                            <span class="fw-bolder text-dark fs-6 d-block" style="font-family: monospace;">EMP-2023-089</span>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="border rounded-3 p-2 px-3 bg-light bg-opacity-50">
                            <small class="text-muted d-block fw-bold mb-1" style="font-size: 0.65rem;">USERNAME</small>
                            <span class="fw-bolder text-dark fs-6 d-block" style="font-family: monospace;">b.tranthi</span>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="border rounded-3 p-2 px-3 bg-light bg-opacity-50 d-flex justify-content-between align-items-center">
                            <div>
                                <small class="text-muted d-block fw-bold mb-1" style="font-size: 0.65rem;">PASSWORD</small>
                                <span class="fw-bolder text-dark fs-6 d-block" style="font-family: monospace;">••••••••</span>
                            </div>
                            <span class="material-symbols-outlined text-muted fs-5 cursor-pointer">visibility</span>
                        </div>
                    </div>
                </div>

                <p class="text-muted small fw-bold text-uppercase mb-2" style="font-size: 0.7rem; letter-spacing: 0.5px;">Welcome Email Preview</p>
                <div class="bg-light bg-opacity-50 rounded-3 p-4 border mb-4">
                    <p class="fw-bold text-dark mb-3">Subject: Chào mừng gia nhập đội ngũ - Trần Thị B</p>
                    <p class="text-muted small mb-3">Chào bạn Trần Thị B,</p>
                    <p class="text-muted small mb-4">Chúng tôi rất vui mừng chào đón bạn gia nhập công ty. Dưới đây là thông tin tài khoản Portal để bạn bắt đầu quy trình nhận việc:</p>
                    <p class="text-muted small mb-0">- Link Portal: <a href="#" class="text-primary text-decoration-underline">portal.company.com</a></p>
                </div>

                <div class="flex-grow-1"></div>
                <button class="btn btn-light text-primary w-100 fw-bold py-2 rounded-3 border-0 mt-3 d-flex align-items-center justify-content-center gap-2" style="background-color: #eff6ff;"><span class="material-symbols-outlined fs-5">send</span> Gửi Email</button>

            </div>
        </div>

        <!-- Duyệt hồ sơ & Cấp phát tài sản -->
        <div class="col-12 mt-4">
            <div class="card border-0 shadow-sm rounded-4 p-4">
                <h6 class="fw-bold mb-4 d-flex align-items-center gap-2 text-dark"><span class="material-symbols-outlined text-primary fs-5">verified_user</span> Duyệt hồ sơ & Cấp phát tài sản</h6>
                
                <div class="row g-4 pt-2">
                    <!-- Xác minh hồ sơ -->
                    <div class="col-md-5 border-end pe-md-4">
                        <h6 class="fw-bold mb-4 d-flex align-items-center gap-2 text-dark small"><span class="material-symbols-outlined text-primary fs-5" style="color: #3b82f6 !important;">badge</span> Xác minh hồ sơ</h6>
                        
                        <div class="d-flex justify-content-between mb-3 border-bottom pb-3">
                            <span class="text-muted small">Số CCCD:</span>
                            <span class="fw-bold text-dark small">012345678912</span>
                        </div>
                        <div class="d-flex justify-content-between mb-3 border-bottom pb-3">
                            <span class="text-muted small">Số tài khoản Bank:</span>
                            <span class="fw-bold text-dark small">9999 8888 7777 <span class="text-muted fw-normal">(Vietcombank)</span></span>
                        </div>
                        <div class="d-flex flex-column mb-4 pb-2">
                            <span class="text-muted small mb-2">Địa chỉ thường trú:</span>
                            <span class="fw-bold text-dark small">123 Đường Láng, Đống Đa, Hà Nội</span>
                        </div>
                        
                        <div class="d-flex gap-3 mb-3">
                            <button class="btn btn-success fw-medium py-2 rounded-3 d-flex align-items-center justify-content-center gap-2 flex-grow-1"><span class="material-symbols-outlined fs-5">check_circle</span> Duyệt</button>
                            <button class="btn btn-outline-warning fw-medium py-2 px-3 rounded-3 d-flex align-items-center justify-content-center gap-2 text-warning border-warning" style="color: #d97706 !important; border-color: #d97706 !important;"><span class="material-symbols-outlined fs-5">edit_note</span> Yêu cầu sửa đổi</button>
                        </div>
                        <textarea class="form-control bg-light border-0 py-2 mt-2" rows="3" placeholder="Lý do yêu cầu sửa đổi (nếu có)..."></textarea>
                    </div>

                    <!-- Danh mục tài sản -->
                    <div class="col-md-7 ps-md-4">
                        <h6 class="fw-bold mb-4 d-flex align-items-center gap-2 text-dark small"><span class="material-symbols-outlined text-primary fs-5" style="color: #3b82f6 !important;">inventory_2</span> Danh mục tài sản cấp phát</h6>
                        
                        <div class="bg-light bg-opacity-50 p-4 rounded-3 border mb-4 flex-grow-1">
                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="asset1">
                                <label class="form-check-label text-muted small fw-medium" for="asset1">Thẻ nhân viên <span class="text-muted fw-normal">(Tên + QR)</span></label>
                            </div>
                            <div class="form-check mb-3">
                                <input class="form-check-input bg-primary border-primary" type="checkbox" id="asset2" checked>
                                <label class="form-check-label text-dark small fw-bold" for="asset2">Laptop <span class="fw-normal text-muted">(Dell Latitude 7420)</span></label>
                            </div>
                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="asset3">
                                <label class="form-check-label text-muted small fw-medium" for="asset3">Đồng phục công ty <span class="text-muted fw-normal">(02 bộ)</span></label>
                            </div>
                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="asset4">
                                <label class="form-check-label text-muted small fw-medium" for="asset4">Văn phòng phẩm cơ bản</label>
                            </div>
                            <div class="form-check mb-0">
                                <input class="form-check-input" type="checkbox" id="asset5">
                                <label class="form-check-label text-muted small fw-medium" for="asset5">Access Card <span class="text-muted fw-normal">(Tầng 12 & 15)</span></label>
                            </div>
                        </div>

                        <button class="btn btn-dark w-100 fw-medium py-2 rounded-3 mt-auto">Xác nhận bàn giao tài sản</button>
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
/* Circular chart SVG styles */
.circular-chart {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  max-height: 250px;
}
.circle-bg {
  fill: none;
  stroke: #e2e8f0;
  stroke-width: 2.5;
}
.circle {
  fill: none;
  stroke-width: 2.5;
  stroke-linecap: round;
}
.cursor-pointer {
    cursor: pointer;
}
</style>
