<template>
  <div class="container-fluid py-4">
    <div class="mb-5">
      <h1 class="h2 fw-black tracking-tight text-dark mb-1">Chào buổi sáng, A!</h1>
      <p class="text-muted">Hôm nay là Thứ Tư, ngày 25 tháng 10 năm 2023. Chúc bạn một ngày làm việc hiệu quả.</p>
    </div>

    <div class="row g-4">
      <!-- Left Column: Check-in & Time -->
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm rounded-4 p-4 mb-4">
          <div class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-4">
            <div class="text-center text-md-start">
              <p class="text-uppercase small fw-bold text-muted tracking-wider mb-2">Giờ hiện tại</p>
              <div class="d-flex align-items-baseline gap-2">
                <span class="display-3 fw-black text-primary tracking-tighter">08:45</span>
                <span class="h4 fw-bold text-muted opacity-50">32s</span>
              </div>
              <p class="text-muted mt-2 d-flex align-items-center gap-2 justify-content-center justify-content-md-start">
                <span class="material-symbols-outlined fs-6">location_on</span>
                Văn phòng TP. Hồ Chí Minh
              </p>
            </div>
            <div class="d-flex flex-column flex-sm-row gap-3 w-100 w-md-auto">
              <button class="btn btn-primary btn-lg rounded-3 fw-bold px-4 py-3 shadow-primary">
                <span class="material-symbols-outlined align-middle me-2">login</span>
                Check-in nhanh
              </button>
              <button class="btn btn-light btn-lg rounded-3 fw-bold px-4 py-3 border">
                <span class="material-symbols-outlined align-middle me-2">logout</span>
                Check-out
              </button>
            </div>
          </div>
        </div>

        <div class="row g-4">
          <!-- Leave Balance -->
          <div class="col-sm-6">
            <div class="card border-0 shadow-sm rounded-4 text-white bg-gradient-primary p-4 h-100">
              <div class="d-flex justify-content-between align-items-start mb-4">
                <div class="p-2 bg-white-20 rounded-3 backdrop-blur">
                  <span class="material-symbols-outlined">calendar_today</span>
                </div>
                <span class="badge bg-white-20 py-2 px-3 rounded-pill small">Năm 2023</span>
              </div>
              <p class="small text-white-50 fw-medium">Số ngày phép còn lại</p>
              <div class="d-flex align-items-baseline gap-2 mt-1">
                <span class="display-5 fw-black">12</span>
                <span class="h5 opacity-75">ngày</span>
              </div>
              <div class="mt-4 progress bg-white-20" style="height: 8px;">
                <div class="progress-bar bg-white" role="progressbar" style="width: 66%;"></div>
              </div>
              <p class="mt-3 x-small text-white-50">Bạn đã sử dụng 6/18 ngày phép</p>
            </div>
          </div>

          <!-- Working Hours -->
          <div class="col-sm-6">
            <div class="card border-0 shadow-sm rounded-4 p-4 h-100">
              <div class="d-flex justify-content-between align-items-start mb-4">
                <div class="p-2 bg-light rounded-3 text-primary">
                  <span class="material-symbols-outlined">timer</span>
                </div>
                <span class="badge bg-success-light text-success py-2 px-3 rounded-pill small">+2.5h</span>
              </div>
              <p class="small text-muted fw-medium">Tổng giờ làm tháng này</p>
              <div class="d-flex align-items-baseline gap-2 mt-1">
                <span class="display-5 fw-black text-dark">152.5</span>
                <span class="h5 text-muted">giờ</span>
              </div>
              <div class="mt-4 d-flex align-items-center gap-2">
                <div class="flex-grow-1 progress bg-light" style="height: 6px;">
                  <div class="progress-bar bg-primary" role="progressbar" style="width: 80%;"></div>
                </div>
                <span class="x-small fw-bold text-muted fw-bold">80%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Notifications -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
          <div class="card-header bg-white border-bottom p-4 d-flex justify-content-between align-items-center">
            <h3 class="h6 mb-0 fw-bold d-flex align-items-center gap-2">
              <span class="material-symbols-outlined text-primary">notifications_active</span>
              Thông báo mới
            </h3>
            <button class="btn btn-link btn-sm p-0 text-primary text-decoration-none fw-bold small">Xem tất cả</button>
          </div>
          <div class="card-body p-0">
            <div class="list-group list-group-flush">
              <!-- Notification Item -->
              <div class="list-group-item list-group-item-action border-0 p-4">
                <div class="d-flex gap-3">
                  <div class="avatar-circle bg-success-light text-success flex-shrink-0">
                    <span class="material-symbols-outlined">check_circle</span>
                  </div>
                  <div>
                    <p class="small fw-bold mb-1">Đơn nghỉ phép đã duyệt</p>
                    <p class="x-small text-muted mb-2 text-line-clamp-2">Đơn nghỉ phép ngày 28/10 của bạn đã được quản lý phê duyệt.</p>
                    <span class="x-small text-muted opacity-50">10 phút trước</span>
                  </div>
                </div>
              </div>
              <!-- Notification Item -->
              <div class="list-group-item list-group-item-action border-0 p-4">
                <div class="d-flex gap-3">
                  <div class="avatar-circle bg-primary-light text-primary flex-shrink-0">
                    <span class="material-symbols-outlined">payments</span>
                  </div>
                  <div>
                    <p class="small fw-bold mb-1">Đã có phiếu lương</p>
                    <p class="x-small text-muted mb-2">Phiếu lương tháng 09/2023 đã sẵn sàng để xem.</p>
                    <span class="x-small text-muted opacity-50">2 giờ trước</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer bg-light text-center p-3">
            <p class="x-small text-muted italic mb-0">Bạn có 3 thông báo chưa đọc</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activities -->
    <div class="mt-5">
      <div class="card border-0 shadow-sm rounded-4 p-4">
        <div class="d-flex align-items-center justify-content-between mb-4">
          <h3 class="h6 mb-0 fw-bold">Hoạt động gần đây</h3>
          <button class="btn btn-link btn-sm p-0 text-muted text-decoration-none d-flex align-items-center gap-1">
            Filter
            <span class="material-symbols-outlined fs-6">filter_list</span>
          </button>
        </div>
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="x-small text-muted text-uppercase fw-bold border-bottom">
              <tr>
                <th class="py-3 px-0 border-0">Ngày</th>
                <th class="py-3 border-0">Hoạt động</th>
                <th class="py-3 border-0">Thời gian</th>
                <th class="py-3 border-0 text-end">Trạng thái</th>
              </tr>
            </thead>
            <tbody class="small">
              <tr>
                <td class="py-3 px-0 fw-semibold">25/10/2023</td>
                <td class="py-3">Chấm công vào (Check-in)</td>
                <td class="py-3 text-muted">08:02 AM</td>
                <td class="py-3 text-end">
                  <span class="badge bg-success-light text-success fw-bold x-small text-uppercase px-2 py-1">Thành công</span>
                </td>
              </tr>
              <tr>
                <td class="py-3 px-0 fw-semibold">24/10/2023</td>
                <td class="py-3">Chấm công ra (Check-out)</td>
                <td class="py-3 text-muted">17:35 PM</td>
                <td class="py-3 text-end">
                  <span class="badge bg-success-light text-success fw-bold x-small text-uppercase px-2 py-1">Thành công</span>
                </td>
              </tr>
              <tr>
                <td class="py-3 px-0 fw-semibold">24/10/2023</td>
                <td class="py-3">Gửi đơn nghỉ phép</td>
                <td class="py-3 text-muted">14:20 PM</td>
                <td class="py-3 text-end">
                  <span class="badge bg-primary-light text-primary fw-bold x-small text-uppercase px-2 py-1">Đã duyệt</span>
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
</style>
