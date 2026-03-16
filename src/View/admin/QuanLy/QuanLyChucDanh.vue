<template>
  <div class="quản-lý-chức-danh-page space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8 text-left">
      <div class="text-left">
        <h1 class="text-2xl font-black text-slate-900 tracking-tight text-left">Quản lý Chức danh</h1>
        <p class="text-slate-500 text-sm font-medium italic text-left">Thiết lập và phân loại các vị trí công việc chính thức trong tổ chức.</p>
      </div>
      <div class="text-left">
        <button @click="openModal('add')" class="px-6 py-2.5 min-h-[44px] bg-blue-600 rounded-lg font-black text-white hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all flex items-center gap-2">
          <span class="material-symbols-outlined text-[20px]">add</span> 
          Thêm mới chức danh
        </button>
      </div>
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
            <Dropdown 
              v-model="filterGroup"
              :options="groupOptions"
              placeholder="Tất cả nhóm"
            />
          </div>
          <div class="col-md-2">
            <Dropdown 
              v-model="filterStatus"
              :options="statusOptions"
              placeholder="Tất cả trạng thái"
            />
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
            <tr v-for="job in filteredJobTitles" :key="job.code" class="border-top transition-colors">
              <td class="px-4 py-3 fw-bold text-primary" style="font-size: 0.85rem;">{{ job.code }}</td>
              <td class="py-3 fw-bold text-dark" style="font-size: 0.9rem;">{{ job.title }}</td>
              <td class="py-3">
                <span class="badge bg-light text-muted border px-2 py-1 fw-medium" style="font-size: 0.7rem;">{{ job.group }}</span>
              </td>
              <td class="py-3 text-muted fw-medium" style="font-size: 0.85rem;">{{ job.level }}</td>
              <td class="py-3">
                <span class="rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2 border shadow-sm transition-all" 
                  :class="job.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-50 text-slate-500 border-slate-200'"
                  style="font-size: 0.725rem; font-weight: 800; letter-spacing: 0.025em;">
                  <span class="rounded-circle" :style="{ width: '7px', height: '7px', backgroundColor: job.status === 'active' ? '#16a34a' : '#64748b' }"></span>
                  {{ job.status === 'active' ? 'Đang sử dụng' : 'Ngưng sử dụng' }}
                </span>
              </td>
              <td class="px-4 py-3 text-end">
                <div class="d-flex justify-content-end gap-1">
                  <button @click="openModal('edit', job)" class="btn-action-icon">
                    <span class="material-symbols-outlined">edit</span>
                  </button>
                  <button @click="deleteJobTitle(job)" class="btn-action-icon btn-danger-action">
                    <span class="material-symbols-outlined">delete</span>
                  </button>
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
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
      >
        <div v-if="showModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div class="fixed inset-0 w-screen h-screen bg-slate-900/50 z-[9999] overflow-hidden backdrop-blur-sm" @click="showModal = false"></div>
          <div class="relative z-[10000] bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all text-left">
            <div class="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white text-left">
              <div class="text-left">
                <h3 class="text-xl font-black text-slate-900 text-left">{{ isEdit ? 'Cập nhật Chức danh' : 'Thêm Chức danh mới' }}</h3>
                <p class="text-xs text-slate-500 font-bold italic mt-0.5 text-left">Hệ thống sẽ đồng bộ thông tin chức danh trên toàn hệ thống</p>
              </div>
              <button @click="showModal = false" class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-all text-slate-400">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <div class="p-8 space-y-6">
              <div class="grid grid-cols-12 gap-5">
                <div class="col-span-12 md:col-span-5">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1 italic text-left">Mã chức danh *</label>
                  <input v-model="form.code" type="text" placeholder="VD: DEV-01" class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all text-left" :disabled="isEdit">
                </div>
                <div class="col-span-12 md:col-span-7">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1 italic text-left">Tên chức danh *</label>
                  <input v-model="form.title" type="text" placeholder="Nhập tên..." class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all text-left">
                </div>
              </div>

              <div class="grid grid-cols-2 gap-5 text-left">
                <div class="text-left">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1 italic text-left">Nhóm ngành</label>
                  <Dropdown 
                    v-model="form.group"
                    :options="groupFormOptions"
                    class="w-full"
                  />
                </div>
                <div class="text-left">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1 italic text-left">Cấp bậc</label>
                  <Dropdown 
                    v-model="form.level"
                    :options="levelFormOptions"
                    class="w-full"
                  />
                </div>
              </div>

              <div class="pt-2 text-left">
                <div class="flex items-center gap-4 text-left">
                  <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic text-left">Trạng thái sử dụng</label>
                  <div class="flex items-center gap-3 text-left">
                      <button 
                          @click="form.isActiveCheckbox = !form.isActiveCheckbox"
                          type="button"
                          class="relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 outline-none"
                          :class="form.isActiveCheckbox ? 'bg-blue-600' : 'bg-slate-200'"
                      >
                          <span class="pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200"
                                :class="form.isActiveCheckbox ? 'translate-x-5' : 'translate-x-0'"></span>
                      </button>
                      <span class="text-xs font-black tracking-widest text-left" :class="form.isActiveCheckbox ? 'text-blue-600' : 'text-slate-400'">{{ form.isActiveCheckbox ? 'ĐANG SỬ DỤNG' : 'NGƯNG SỬ DỤNG' }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="px-8 py-6 border-t border-slate-100 bg-slate-50/30 flex justify-end gap-3 text-left">
              <button @click="showModal = false" class="px-6 py-2.5 min-h-[44px] text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-lg transition-all uppercase tracking-widest">Hủy</button>
              <button @click="saveJobTitle" class="px-8 py-2.5 min-h-[44px] bg-blue-600 text-white rounded-lg text-sm font-black hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all uppercase tracking-widest">
                Lưu thông tin
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Dropdown from '@/components/Dropdown.vue';
import { useConfirm } from '@/composables/useConfirm';

const { showAlert, showConfirm } = useConfirm();

const showModal = ref(false);
const isEdit = ref(false);
const searchQuery = ref('');
const filterGroup = ref('ALL');
const filterStatus = ref('ALL');

const groupOptions = [
  { label: 'Tất cả nhóm', value: 'ALL' },
  { label: 'Kỹ thuật', value: 'Kỹ thuật' },
  { label: 'Marketing', value: 'Marketing' },
  { label: 'Nhân sự', value: 'Nhân sự' }
];

const groupFormOptions = [
  { label: 'Kỹ thuật', value: 'Kỹ thuật' },
  { label: 'Marketing', value: 'Marketing' },
  { label: 'Nhân sự', value: 'Nhân sự' },
  { label: 'Tài chính', value: 'Tài chính' }
];

const levelFormOptions = [
  { label: 'Intern', value: 'Intern' },
  { label: 'Junior', value: 'Junior' },
  { label: 'Middle', value: 'Middle' },
  { label: 'Senior', value: 'Senior' },
  { label: 'Lead/Manager', value: 'Lead/Manager' }
];

const statusOptions = [
  { label: 'Tất cả trạng thái', value: 'ALL' },
  { label: 'Đang hoạt động', value: 'active' },
  { label: 'Ngưng hoạt động', value: 'inactive' }
];

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

const saveJobTitle = async () => {
  if (!form.value.code || !form.value.title) {
    await showAlert('Thiếu thông tin', 'Vui lòng nhập đầy đủ Mã và Tên chức danh!');
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
      await showAlert('Mã đã tồn tại', 'Mã chức danh này đã tồn tại!');
      return;
    }
    jobTitles.value.push(jobData);
  }
  showModal.value = false;
};

const deleteJobTitle = async (job) => {
  const ok = await showConfirm('Xác nhận xóa', `Bạn có chắc muốn xóa chức danh "${job.title}"?`);
  if (ok) {
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
