<template>
  <div class="dashboard-admin space-y-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-black text-slate-900 tracking-tight">Dashboard Tổng quan</h1>
      <p class="text-slate-500 text-sm font-medium italic">Chào mừng trở lại! Dưới đây là tóm tắt hoạt động nhân sự và tình hình hệ thống hôm nay.</p>
    </div>

    <!-- Stats Cards -->
    <div class="row g-4 mb-4">
      <!-- Mảng thẻ -->
      <div class="col-xl-3 col-sm-6">
        <div class="card h-100 border-0 shadow-sm rounded-4">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between mb-3">
              <div class="bg-primary bg-opacity-10 p-2 rounded-3 text-primary d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
                <span class="material-symbols-outlined fs-4">groups</span>
              </div>
              <span class="badge bg-success bg-opacity-10 text-success rounded-pill fw-medium d-flex align-items-center px-3">+2%</span>
            </div>
            <h6 class="text-muted fw-semibold mb-2">Tổng nhân viên</h6>
            <h2 class="fw-bold mb-1">1,250</h2>
            <p class="text-muted small mb-0">So với tháng trước</p>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-sm-6">
        <div class="card h-100 border-0 shadow-sm rounded-4">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between mb-3">
              <div class="bg-success bg-opacity-10 p-2 rounded-3 text-success d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
                <span class="material-symbols-outlined fs-4">person_add</span>
              </div>
              <span class="badge bg-success bg-opacity-10 text-success rounded-pill fw-medium d-flex align-items-center px-3">Tháng này</span>
            </div>
            <h6 class="text-muted fw-semibold mb-2">Nhân sự mới</h6>
            <h2 class="fw-bold mb-1">45</h2>
            <p class="text-muted small mb-0">Đang hoàn tất thủ tục</p>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-sm-6">
        <div class="card h-100 border-0 shadow-sm rounded-4">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between mb-3">
              <div class="bg-danger bg-opacity-10 p-2 rounded-3 text-danger d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
                <span class="material-symbols-outlined fs-4">person_remove</span>
              </div>
              <span class="badge bg-danger bg-opacity-10 text-danger rounded-pill fw-medium d-flex align-items-center px-3">-12%</span>
            </div>
            <h6 class="text-muted fw-semibold mb-2">Nhân viên nghỉ việc</h6>
            <h2 class="fw-bold mb-1">12</h2>
            <p class="text-muted small mb-0">Trong 30 ngày qua</p>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-sm-6">
        <div class="card h-100 border-0 shadow-sm rounded-4">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between mb-3">
              <div class="p-2 rounded-3 text-white d-flex align-items-center justify-content-center" style="width: 48px; height: 48px; background-color: #3b82f6;">
                <span class="material-symbols-outlined fs-4">assignment</span>
              </div>
              <span class="badge bg-primary bg-opacity-10 text-primary rounded-pill fw-medium d-flex align-items-center px-3">Ưu tiên</span>
            </div>
            <h6 class="text-muted fw-semibold mb-2">Nghỉ phép chờ duyệt</h6>
            <h2 class="fw-bold mb-1 text-primary">28</h2>
            <p class="text-muted small mb-0">Cần xử lý ngay</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts & Bars -->
    <div class="row g-4 mb-4">
      <div class="col-lg-6">
        <div class="card border-0 shadow-sm rounded-4 h-100">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h5 class="fw-bold mb-0">Biến động nhân sự</h5>
              <select class="form-select border-0 bg-light rounded-pill w-auto px-4 py-2 fw-medium text-muted">
                <option>6 tháng gần nhất</option>
              </select>
            </div>
            <!-- Chart placeholder view -->
            <div class="d-flex align-items-end justify-content-between flex-grow-1 border-bottom" style="min-height: 250px; padding-bottom: 0.5rem;">
              <div class="text-center" v-for="i in 6" :key="i">
                <div class="d-flex gap-1 align-items-end mx-auto mb-2" style="height: 200px; width: 40px;">
                    <!-- Placeholder bars simulating chart -->
                    <div style="width: 14px; background-color: #3b82f6; border-radius: 4px;" :style="{ height: Math.floor(Math.random() * 100 + 40) + 'px' }"></div>
                    <div style="width: 14px; background-color: #93c5fd; border-radius: 4px;" :style="{ height: Math.floor(Math.random() * 60 + 20) + 'px' }"></div>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-between px-2 pt-2 text-muted" style="font-size: 0.75rem;">
              <span>Tháng 1</span>
              <span>Tháng 2</span>
              <span>Tháng 3</span>
              <span>Tháng 4</span>
              <span>Tháng 5</span>
              <span>Tháng 6</span>
            </div>
            <div class="d-flex justify-content-center gap-4 mt-4 pt-2">
                <div class="d-flex align-items-center gap-2">
                    <div class="rounded-circle" style="width: 10px; height: 10px; background-color: #3b82f6;"></div>
                    <span class="small fw-medium text-muted">Tuyển mới</span>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <div class="rounded-circle" style="width: 10px; height: 10px; background-color: #93c5fd;"></div>
                    <span class="small fw-medium text-muted">Nghỉ việc</span>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="card border-0 shadow-sm rounded-4 h-100">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h5 class="fw-bold mb-0">Cơ cấu phòng ban</h5>
              <a href="#" class="text-decoration-none small fw-medium" style="color: #4f46e5;">Xem chi tiết</a>
            </div>

            <div class="d-flex flex-column gap-4 mt-4">
              <!-- Item -->
              <div>
                <div class="d-flex justify-content-between mb-2">
                  <span class="fw-medium text-dark" style="font-size: 0.9rem;">Kỹ thuật (Product & Tech)</span>
                  <span class="fw-bold text-dark" style="font-size: 0.9rem;">420 nhân viên</span>
                </div>
                <div class="progress" style="height: 8px; border-radius: 4px; background-color: #f1f5f9;">
                  <div class="progress-bar rounded-end-0" role="progressbar" style="width: 60%; background-color: #1e40af; border-radius: 4px;"></div>
                </div>
              </div>

              <div>
                <div class="d-flex justify-content-between mb-2">
                  <span class="fw-medium text-dark" style="font-size: 0.9rem;">Kinh doanh (Sales)</span>
                  <span class="fw-bold text-dark" style="font-size: 0.9rem;">350 nhân viên</span>
                </div>
                <div class="progress" style="height: 8px; border-radius: 4px; background-color: #f1f5f9;">
                  <div class="progress-bar rounded-end-0" role="progressbar" style="width: 45%; background-color: #10b981; border-radius: 4px;"></div>
                </div>
              </div>

              <div>
                <div class="d-flex justify-content-between mb-2">
                  <span class="fw-medium text-dark" style="font-size: 0.9rem;">Marketing</span>
                  <span class="fw-bold text-dark" style="font-size: 0.9rem;">200 nhân viên</span>
                </div>
                <div class="progress" style="height: 8px; border-radius: 4px; background-color: #f1f5f9;">
                  <div class="progress-bar rounded-end-0" role="progressbar" style="width: 25%; background-color: #eab308; border-radius: 4px;"></div>
                </div>
              </div>

              <div>
                <div class="d-flex justify-content-between mb-2">
                  <span class="fw-medium text-dark" style="font-size: 0.9rem;">Nhân sự (HR)</span>
                  <span class="fw-bold text-dark" style="font-size: 0.9rem;">80 nhân viên</span>
                </div>
                <div class="progress" style="height: 8px; border-radius: 4px; background-color: #f1f5f9;">
                  <div class="progress-bar rounded-end-0" role="progressbar" style="width: 15%; background-color: #8b5cf6; border-radius: 4px;"></div>
                </div>
              </div>

              <div>
                <div class="d-flex justify-content-between mb-2">
                  <span class="fw-medium text-dark" style="font-size: 0.9rem;">Kế toán</span>
                  <span class="fw-bold text-dark" style="font-size: 0.9rem;">120 nhân viên</span>
                </div>
                <div class="progress" style="height: 8px; border-radius: 4px; background-color: #f1f5f9;">
                  <div class="progress-bar rounded-end-0" role="progressbar" style="width: 20%; background-color: #94a3b8; border-radius: 4px;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-body p-0">
        <div class="p-4 border-bottom d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
          <h5 class="fw-bold mb-0">Nhắc nhở công việc & Hoạt động</h5>
          <div class="btn-group bg-light rounded-pill p-1" role="group">
            <button type="button" class="btn btn-sm btn-white bg-white shadow-sm rounded-pill px-4 fw-medium text-dark border-0">Tất cả</button>
            <button type="button" class="btn btn-sm px-4 fw-medium text-muted border-0 bg-transparent hover-bg-light rounded-pill">Của tôi</button>
          </div>
        </div>
        
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light text-muted" style="font-size: 0.8rem; letter-spacing: 0.5px;">
              <tr>
                <th class="border-0 px-4 py-3 text-uppercase fw-semibold" style="width: 25%;">Nhân viên / Ứng viên</th>
                <th class="border-0 py-3 text-uppercase fw-semibold" style="width: 30%;">Loại công việc</th>
                <th class="border-0 py-3 text-uppercase fw-semibold" style="width: 20%;">Thời gian</th>
                <th class="border-0 py-3 text-uppercase fw-semibold" style="width: 15%;">Trạng thái</th>
                <th class="border-0 px-4 py-3 text-uppercase fw-semibold text-end" style="width: 10%;">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="px-4 py-3 border-bottom-0 border-bottom">
                  <div class="d-flex align-items-center gap-3">
                    <div class="rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width: 40px; height: 40px; background-color: #e0e7ff; color: #4f46e5;">
                      TL
                    </div>
                    <div>
                      <h6 class="mb-0 fw-bold text-dark text-nowrap" style="font-size: 0.95rem;">Trần Lan Anh</h6>
                      <span class="text-muted" style="font-size: 0.8rem;">UI/UX Designer</span>
                    </div>
                  </div>
                </td>
                <td class="text-dark fw-medium border-bottom-0 border-bottom py-3">Phỏng vấn vòng 2</td>
                <td class="text-muted border-bottom-0 border-bottom py-3">Hôm nay, 14:00</td>
                <td class="border-bottom-0 border-bottom py-3">
                  <span class="badge rounded-1" style="background-color: #fef08a; color: #854d0e; padding: 0.4rem 0.6rem; font-weight: 600;">Sắp diễn ra</span>
                </td>
                <td class="px-4 border-bottom-0 border-bottom py-3 text-end">
                  <a href="#" class="text-decoration-none fw-medium" style="color: #4f46e5;">Bắt đầu</a>
                </td>
              </tr>
              
              <tr>
                <td class="px-4 py-3 border-bottom-0">
                  <div class="d-flex align-items-center gap-3">
                    <div class="rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width: 40px; height: 40px; background-color: #dcfce7; color: #16a34a;">
                      QH
                    </div>
                    <div>
                      <h6 class="mb-0 fw-bold text-dark text-nowrap" style="font-size: 0.95rem;">Quang Huy</h6>
                      <span class="text-muted" style="font-size: 0.8rem;">Kỹ thuật viên</span>
                    </div>
                  </div>
                </td>
                <td class="text-dark fw-medium border-bottom-0 py-3">Yêu cầu nghỉ phép (3 ngày)</td>
                <td class="text-muted border-bottom-0 py-3">Đã gửi 2 giờ trước</td>
                <td class="border-bottom-0 py-3">
                  <span class="badge rounded-1" style="background-color: #dbeafe; color: #1e40af; padding: 0.4rem 0.6rem; font-weight: 600;">Chờ duyệt</span>
                </td>
                <td class="px-4 border-bottom-0 py-3 text-end">
                  <div class="d-flex gap-2 justify-content-end align-items-center">
                    <a href="#" class="text-decoration-none fw-medium" style="color: #4f46e5;">Xem</a>
                    <span class="text-muted" style="opacity: 0.3;">|</span>
                    <a href="#" class="text-decoration-none fw-medium text-danger">Từ chối</a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
</script>

<style scoped>
.text-gray-800 {
  color: #1f2937;
}

.hover-bg-light:hover {
  background-color: #f3f4f6 !important;
  transition: background-color 0.2s;
}

.table th, .table td {
  vertical-align: middle;
}

.table tbody tr:hover {
  background-color: #f8fafc;
}

.table > :not(caption) > * > * {
  border-bottom-color: #e2e8f0;
}
</style>
