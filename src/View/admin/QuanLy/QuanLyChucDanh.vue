<template>
  <div class="quản-lý-chức-danh-page space-y-6">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
    <div class="mb-8">
      <h1 class="text-2xl font-black text-slate-900 tracking-tight">Quản lý Chức danh</h1>
      <p class="text-slate-500 text-sm font-medium italic">Thiết lập và phân loại các vị trí công việc chính thức trong tổ chức.</p>
    </div>
      <button @click="openModal('add')" class="px-5 py-2.5 bg-indigo-600 rounded-xl font-black text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2">
        <span class="material-symbols-outlined text-[20px]">add</span> Thêm mới chức danh
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
            <tr v-for="job in filteredJobTitles" :key="job.code" class="border-top hover:bg-slate-50 transition-colors">
              <td class="px-4 py-3 fw-bold text-primary" style="font-size: 0.85rem;">{{ job.code }}</td>
              <td class="py-3 fw-bold text-dark" style="font-size: 0.9rem;">{{ job.title }}</td>
              <td class="py-3">
                <span class="badge bg-light text-muted border px-2 py-1 fw-medium" style="font-size: 0.7rem;">{{ job.group }}</span>
              </td>
              <td class="py-3 text-muted fw-medium" style="font-size: 0.85rem;">{{ job.level }}</td>
              <td class="py-3">
                <span class="badge rounded-pill px-3 py-2 border d-inline-flex align-items-center gap-1" 
                  :class="job.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-secondary bg-opacity-10 text-secondary border-secondary border-opacity-25'"
                  style="font-size: 0.7rem;">
                  <span class="rounded-circle" :style="{ width: '6px', height: '6px', backgroundColor: job.status === 'active' ? '#16a34a' : '#64748b' }"></span>
                  {{ job.status === 'active' ? 'Đang sử dụng' : 'Ngưng sử dụng' }}
                </span>
              </td>
              <td class="px-4 py-3 text-end">
                <div class="d-flex justify-content-end gap-2">
                  <button @click="openModal('edit', job)" class="btn btn-sm btn-link text-muted p-1 d-flex rounded-circle hover:text-primary"><span class="material-symbols-outlined fs-5">edit</span></button>
                  <button @click="deleteJobTitle(job)" class="btn btn-sm btn-link text-muted p-1 d-flex rounded-circle hover:text-danger"><span class="material-symbols-outlined fs-5">delete</span></button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredJobTitles.length === 0">
              <td colspan="6" class="text-center py-5 text-muted italic">Không tìm thấy chức danh phù hợp</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer/Pagination -->
      <div class="card-footer bg-white border-top p-4 d-flex justify-content-between align-items-center">
        <span class="text-muted small">Hiển thị {{ filteredJobTitles.length }} trong tổng số 42 bản ghi</span>
        <div class="d-flex gap-1">
          <button class="btn btn-sm btn-light border p-1 rounded d-flex align-items-center"><span class="material-symbols-outlined fs-6">chevron_left</span></button>
          <button class="btn btn-sm btn-primary px-3 rounded fw-medium">1</button>
          <button class="btn btn-sm btn-light border p-1 rounded d-flex align-items-center"><span class="material-symbols-outlined fs-6">chevron_right</span></button>
        </div>
      </div>
    </div>

    <!-- Modal Thêm/Sửa -->
    <div v-if="showModal" class="modal-backdrop d-flex align-items-center justify-content-center" style="background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); position: fixed; inset: 0; z-index: 1050;">
      <div class="bg-white rounded-[2rem] shadow-2xl w-100 m-3" style="max-width: 500px; overflow: hidden;">
        <div class="px-4 py-3 border-bottom d-flex justify-content-between align-items-center bg-light">
          <h6 class="mb-0 fw-black text-dark uppercase tracking-widest text-[12px]">{{ isEdit ? 'Cập nhật Chức danh' : 'Thêm Chức danh mới' }}</h6>
          <button @click="showModal = false" class="btn btn-sm btn-link text-muted p-0 d-flex"><span class="material-symbols-outlined">close</span></button>
        </div>
        <div class="p-4 space-y-4">
          <div class="row g-3">
            <div class="col-md-5">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 d-block ms-1">Mã chức danh</label>
              <input v-model="form.code" type="text" placeholder="VD: DEV-01" class="form-control bg-light border-0 py-2.5 rounded-3 font-bold text-sm" :disabled="isEdit">
            </div>
            <div class="col-md-7">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 d-block ms-1">Tên chức danh</label>
              <input v-model="form.title" type="text" placeholder="Nhập tên..." class="form-control bg-light border-0 py-2.5 rounded-3 font-bold text-sm">
            </div>
            <div class="col-md-6">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 d-block ms-1">Nhóm ngành</label>
              <select v-model="form.group" class="form-select bg-light border-0 py-2.5 rounded-3 font-bold text-sm">
                <option value="Kỹ thuật">Kỹ thuật</option>
                <option value="Marketing">Marketing</option>
                <option value="Nhân sự">Nhân sự</option>
                <option value="Tài chính">Tài chính</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 d-block ms-1">Cấp bậc</label>
              <select v-model="form.level" class="form-select bg-light border-0 py-2.5 rounded-3 font-bold text-sm">
                <option value="Intern">Intern</option>
                <option value="Junior">Junior</option>
                <option value="Middle">Middle</option>
                <option value="Senior">Senior</option>
                <option value="Lead/Manager">Lead/Manager</option>
              </select>
            </div>
            <div class="col-12 mt-3">
              <div class="form-check form-switch p-0 d-flex align-items-center gap-3">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ms-1">Trạng thái sử dụng</label>
                <div class="form-check form-switch mb-0">
                  <input class="form-check-input cursor-pointer" type="checkbox" role="switch" v-model="form.isActiveCheckbox" style="width: 40px; height: 20px;">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 py-3 bg-light border-top flex gap-2">
          <button @click="showModal = false" class="btn btn-light flex-grow-1 fw-bold text-muted border rounded-2xl py-2 text-xs uppercase tracking-widest">Hủy</button>
          <button @click="saveJobTitle" class="btn bg-indigo-600 flex-grow-1 fw-bold text-white shadow-xl shadow-indigo-100 rounded-3 py-2 text-xs uppercase tracking-widest">Lưu thông tin</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const showModal = ref(false);
const isEdit = ref(false);
const searchQuery = ref('');

const jobTitles = ref([
  { code: 'DEV-01', title: 'Lập trình viên Senior Backend', group: 'Kỹ thuật', level: 'Senior', status: 'active' },
  { code: 'MKT-05', title: 'Chuyên viên Content Marketing', group: 'Marketing', level: 'Junior', status: 'active' },
  { code: 'HR-02', title: 'Thực tập sinh Tuyển dụng', group: 'Nhân sự', level: 'Intern', status: 'inactive' }
]);

const emptyForm = {
  code: '',
  title: '',
  group: 'Kỹ thuật',
  level: 'Junior',
  isActiveCheckbox: true
};

const form = ref({ ...emptyForm });

const filteredJobTitles = computed(() => {
  if (!searchQuery.value) return jobTitles.value;
  const q = searchQuery.value.toLowerCase();
  return jobTitles.value.filter(j => 
    j.code.toLowerCase().includes(q) || 
    j.title.toLowerCase().includes(q)
  );
});

const openModal = (type, job = null) => {
  isEdit.value = type === 'edit';
  if (isEdit.value && job) {
    form.value = { 
      ...job, 
      isActiveCheckbox: job.status === 'active' 
    };
  } else {
    form.value = { ...emptyForm };
  }
  showModal.value = true;
};

const saveJobTitle = () => {
  if (!form.value.code || !form.value.title) {
    alert('Vui lòng nhập đầy đủ Mã và Tên chức danh!');
    return;
  }

  const jobData = {
    ...form.value,
    status: form.value.isActiveCheckbox ? 'active' : 'inactive'
  };

  if (isEdit.value) {
    const idx = jobTitles.value.findIndex(j => j.code === form.value.code);
    if (idx !== -1) jobTitles.value[idx] = jobData;
  } else {
    if (jobTitles.value.some(j => j.code === form.value.code)) {
      alert('Mã chức danh này đã tồn tại!');
      return;
    }
    jobTitles.value.push(jobData);
  }
  showModal.value = false;
};

const deleteJobTitle = (job) => {
  if (confirm(`Bạn có chắc muốn xóa chức danh "${job.title}"?`)) {
    jobTitles.value = jobTitles.value.filter(j => j.code !== job.code);
  }
};
</script>

<style scoped>
.form-select:focus, .form-control:focus {
  box-shadow: none;
  background-color: #f1f5f9 !important;
}
.btn-link:hover {
  background-color: #f1f5f9;
}
.space-y-4 > * + * { margin-top: 1rem; }
.form-check-input:checked {
  background-color: #0d6efd;
  border-color: #0d6efd;
}
.cursor-pointer { cursor: pointer; }
</style>

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
