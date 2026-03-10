<template>
  <div class="dich-vu-noi-bo p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="h4 mb-0 fw-bold text-primary">Dịch vụ nội bộ</h2>
      <button class="btn btn-primary rounded-pill d-flex align-items-center gap-2">
        <span class="material-symbols-outlined">confirmation_number</span>
        Tạo Ticket hỗ trợ
      </button>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 text-center">
          <div class="h1 fw-bold text-primary mb-1">12</div>
          <div class="text-muted small">Ticket đã tạo</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 text-center">
          <div class="h1 fw-bold text-warning mb-1">2</div>
          <div class="text-muted small">Đang xử lý</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 text-center">
          <div class="h1 fw-bold text-success mb-1">10</div>
          <div class="text-muted small">Đã hoàn thành</div>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm rounded-4">
      <div class="card-header bg-transparent border-bottom p-4">
        <h5 class="mb-0 fw-bold">Tiến độ xử lý Ticket</h5>
      </div>
      <div class="card-body p-4">
        <p class="text-muted text-center py-5">Chưa có ticket nào được tạo gần đây.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-primary {
  color: var(--primary-color) !important;
}

.text-warning {
  color: #ffc107 !important;
}

.text-success {
  color: #198754 !important;
}
</style>
