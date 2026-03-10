<template>
  <div class="nghi-phep p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="h4 mb-0 fw-bold text-primary">Nghỉ phép (Leave)</h2>
      <button class="btn btn-primary rounded-pill d-flex align-items-center gap-2">
        <span class="material-symbols-outlined">add</span>
        Tạo đơn xin nghỉ
      </button>
    </div>

    <div class="card border-0 shadow-sm rounded-4">
      <div class="card-header bg-transparent border-bottom p-4">
        <h5 class="mb-0 fw-bold">Lịch sử xin phép</h5>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="bg-light">
              <tr>
                <th class="ps-4">Loại nghỉ</th>
                <th>Từ ngày</th>
                <th>Đến ngày</th>
                <th>Số ngày</th>
                <th>Lý do</th>
                <th class="pe-4">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="ps-4 fw-medium">Nghỉ phép năm</td>
                <td>10/03/2026</td>
                <td>11/03/2026</td>
                <td>2</td>
                <td>Việc gia đình</td>
                <td class="pe-4"><span class="badge bg-warning text-dark rounded-pill">Đang chờ duyệt</span></td>
              </tr>
              <tr>
                <td class="ps-4 fw-medium">Nghỉ ốm</td>
                <td>01/03/2026</td>
                <td>01/03/2026</td>
                <td>1</td>
                <td>Cảm cúm</td>
                <td class="pe-4"><span class="badge bg-success rounded-pill">Đã duyệt</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-primary {
  color: var(--primary-color) !important;
}

.table thead th {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: #6c757d;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.table tbody td {
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}
</style>
