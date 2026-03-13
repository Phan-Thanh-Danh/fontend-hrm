<template>
  <div class="quản-lý-chức-danh-page p-4 bg-light min-vh-100">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="fw-bold mb-1">Quản lý Chức danh</h4>
        <p class="text-muted small mb-0">Thiết lập và phân loại các vị trí công việc chính thức trong tổ chức</p>
      </div>
      <button class="btn btn-primary d-flex align-items-center gap-2 px-4 shadow-sm fw-medium rounded-3">
        <span class="material-symbols-outlined fs-5">add</span> Thêm mới chức danh
      </button>
    </div>

    <!-- Filters Card -->
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-body p-3">
        <div class="row g-3">
          <div class="col-md-7">
            <div class="input-group">
              <span class="input-group-text bg-light border-0 ps-3">
                <span class="material-symbols-outlined fs-5 text-muted">search</span>
              </span>
              <input type="text" class="form-control bg-light border-0 py-2 ps-1" placeholder="Tìm kiếm theo mã hoặc tên chức danh...">
            </div>
          </div>
          <div class="col-md-2">
            <select class="form-select border-0 bg-light py-2 text-muted fw-medium">
              <option>Tất cả nhóm</option>
            </select>
          </div>
          <div class="col-md-2">
            <select class="form-select border-0 bg-light py-2 text-muted fw-medium">
              <option>Tất cả trạng thái</option>
            </select>
          </div>
          <div class="col-md-1">
            <button class="btn btn-light w-100 h-100 border-0 d-flex align-items-center justify-content-center text-muted">
              <span class="material-symbols-outlined fs-5">filter_list</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Table Card -->
    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div class="table-responsive">
        <table class="table align-middle mb-0">
          <thead class="table-light text-muted" style="font-size: 0.75rem; letter-spacing: 0.5px;">
            <tr>
              <th class="border-0 px-4 py-3 text-uppercase fw-bold">Mã chức danh</th>
              <th class="border-0 py-3 text-uppercase fw-bold">Tên chức danh</th>
              <th class="border-0 py-3 text-uppercase fw-bold">Nhóm</th>
              <th class="border-0 py-3 text-uppercase fw-bold">Cấp bậc</th>
              <th class="border-0 py-3 text-uppercase fw-bold">Trạng thái</th>
              <th class="border-0 px-4 py-3 text-uppercase fw-bold text-end">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="job in jobTitles" :key="job.code" class="border-top">
              <td class="px-4 py-3 fw-bold text-primary" style="font-size: 0.85rem;">{{ job.code }}</td>
              <td class="py-3 fw-bold text-dark" style="font-size: 0.9rem;">{{ job.title }}</td>
              <td class="py-3">
                <span class="badge bg-light text-muted border px-2 py-1 fw-medium" style="font-size: 0.7rem;">{{ job.group }}</span>
              </td>
              <td class="py-3 text-muted fw-medium" style="font-size: 0.85rem;">{{ job.level }}</td>
              <td class="py-3">
                <span class="badge rounded-pill px-3 py-2 border d-inline-flex align-items-center gap-1" 
                  :class="job.status === 'active' ? 'bg-success bg-opacity-10 text-success border-success border-opacity-25' : 'bg-secondary bg-opacity-10 text-secondary border-secondary border-opacity-25'"
                  style="font-size: 0.7rem;">
                  <span class="rounded-circle" :style="{ width: '6px', height: '6px', backgroundColor: job.status === 'active' ? '#16a34a' : '#64748b' }"></span>
                  {{ job.statusText }}
                </span>
              </td>
              <td class="px-4 py-3 text-end">
                <div class="d-flex justify-content-end gap-2">
                  <button class="btn btn-sm btn-link text-muted p-1 d-flex"><span class="material-symbols-outlined fs-5">edit</span></button>
                  <button class="btn btn-sm btn-link text-muted p-1 d-flex"><span class="material-symbols-outlined fs-5">history</span></button>
                  <button class="btn btn-sm btn-link text-muted p-1 d-flex"><span class="material-symbols-outlined fs-5">delete</span></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Footer/Pagination -->
      <div class="card-footer bg-white border-top p-4 d-flex justify-content-between align-items-center">
        <span class="text-muted small">Hiển thị {{ jobTitles.length }} trong tổng số 42 bản ghi</span>
        <div class="d-flex gap-1">
          <button class="btn btn-sm btn-light border p-1 rounded"><span class="material-symbols-outlined fs-6">chevron_left</span></button>
          <button class="btn btn-sm btn-primary px-3 rounded fw-medium">1</button>
          <button class="btn btn-sm btn-light border px-3 rounded fw-medium text-dark">2</button>
          <button class="btn btn-sm btn-light border px-3 rounded fw-medium text-dark">3</button>
          <button class="btn btn-sm btn-light border p-1 rounded"><span class="material-symbols-outlined fs-6">chevron_right</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const jobTitles = ref([
  { code: 'DEV-01', title: 'Lập trình viên Senior Backend', group: 'Kỹ thuật', level: 'Senior', status: 'active', statusText: 'Đang sử dụng' },
  { code: 'MKT-05', title: 'Chuyên viên Content Marketing', group: 'Marketing', level: 'Junior', status: 'active', statusText: 'Đang sử dụng' },
  { code: 'HR-02', title: 'Thực tập sinh Tuyển dụng', group: 'Nhân sự', level: 'Intern', status: 'inactive', statusText: 'Ngưng sử dụng' }
]);
</script>

<style scoped>
.form-select:focus, .form-control:focus {
  box-shadow: none;
  background-color: #f1f5f9 !important;
}
.btn-link:hover {
  background-color: #f1f5f9;
  border-radius: 4px;
}
</style>
