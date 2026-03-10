<template>
  <div class="ho-so-ca-nhan p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="h4 mb-0 fw-bold text-primary">Hồ sơ Cá nhân</h2>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item"><router-link to="/">Trang chủ</router-link></li>
          <li class="breadcrumb-item active" aria-current="page">Hồ sơ</li>
        </ol>
      </nav>
    </div>

    <div class="row g-4">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div class="card-body text-center p-4">
            <div class="avatar-large mx-auto mb-3">A</div>
            <h3 class="h5 mb-1 fw-bold">Nguyễn Văn A</h3>
            <p class="text-muted small mb-3">Nhân viên chính thức - IT Department</p>
            <div class="d-grid">
              <button class="btn btn-outline-primary btn-sm rounded-pill">Chỉnh sửa ảnh</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card border-0 shadow-sm rounded-4">
          <div class="card-header bg-transparent border-bottom p-4">
            <h5 class="mb-0 fw-bold">Thông tin chi tiết</h5>
          </div>
          <div class="card-body p-4">
            <div class="row g-3">
              <div class="col-sm-6">
                <label class="text-muted small d-block">CCCD</label>
                <div class="fw-medium">123456789012</div>
              </div>
              <div class="col-sm-6">
                <label class="text-muted small d-block">SĐT</label>
                <div class="fw-medium">090 123 4567</div>
              </div>
              <div class="col-sm-6">
                <label class="text-muted small d-block">Địa chỉ</label>
                <div class="fw-medium">123 Đường ABC, Quận 1, TP.HCM</div>
              </div>
              <div class="col-sm-6">
                <label class="text-muted small d-block">Bằng cấp & Giấy tờ</label>
                <div class="fw-medium text-primary cursor-pointer">Xem chi tiết <span class="material-symbols-outlined fs-6 align-middle">open_in_new</span></div>
              </div>
              <div class="col-sm-6">
                <label class="text-muted small d-block">Tài sản & Bảo hiểm</label>
                <div class="fw-medium">Laptop Dell, BHYT...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.avatar-large {
  width: 100px;
  height: 100px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
}

.text-primary {
  color: var(--primary-color) !important;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
