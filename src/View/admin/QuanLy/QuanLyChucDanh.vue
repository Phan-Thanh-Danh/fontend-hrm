<template>
  <div class="quản-lý-chức-danh-page space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
      <div class="text-left">
        <h1 class="text-2xl font-black text-[var(--sys-text-primary)] tracking-tight text-left">Quản lý Chức danh</h1>
        <p class="text-[var(--sys-text-secondary)] text-sm font-medium italic text-left">Thiết lập và phân loại các vị trí công việc chính thức trong tổ chức.</p>
      </div>
      <div class="text-left">
        <button @click="openModal('add')" class="px-6 py-2.5 min-h-[44px] bg-[var(--sys-brand-solid)] rounded-lg font-black text-white hover:bg-[var(--sys-brand-hover)] shadow-xl shadow-[var(--sys-brand-solid-lch-30)] transition-all flex items-center gap-2">
          <span class="material-symbols-outlined text-[20px]">add</span> 
          Thêm mới chức danh
        </button>
      </div>
    </div>

    <!-- Filters Card -->
    <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] shadow-sm rounded-3xl overflow-hidden">
      <div class="p-4 flex flex-col md:flex-row items-center gap-3 w-full">
        <div class="relative flex-1 w-full group">
          <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--sys-text-secondary)] transition-colors group-focus-within:text-[var(--sys-brand-solid)]">search</span>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Tìm kiếm theo mã hoặc tên chức danh..." 
            class="pl-12 pr-5 h-11 w-full bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-black focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] placeholder:text-[var(--sys-text-secondary)]/40"
          >
        </div>
        <div class="flex items-center gap-2 w-full md:w-auto shrink-0">
          <Dropdown 
            v-model="filterGroup"
            :options="groupOptions"
            placeholder="Tất cả nhóm"
          />
          <Dropdown 
            v-model="filterStatus"
            :options="statusOptions"
            placeholder="Tất cả trạng thái"
          />
        </div>
      </div>
    </div>

    <!-- Table Card -->
    <div class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden">
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr>
              <th class="px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Mã chức danh</th>
              <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Tên chức danh</th>
              <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Nhóm</th>
              <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Cấp bậc</th>
              <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-center">Trạng thái</th>
              <th class="px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody class="bg-transparent">
            <tr v-for="job in filteredJobTitles" :key="job.code" 
                class="group transition-all duration-200 border-b border-[var(--sys-border-subtle)] bg-transparent hover:bg-[var(--sys-bg-hover)]">
              <td class="px-8 py-5 bg-transparent border-b border-[var(--sys-border-subtle)]">
                <span class="text-sm font-black text-[var(--sys-brand-solid)] uppercase tracking-tight">{{ job.code }}</span>
              </td>
              <td class="px-6 py-5 bg-transparent border-b border-[var(--sys-border-subtle)]">
                <span class="text-sm font-black text-[var(--sys-text-primary)] transition-colors">{{ job.title }}</span>
              </td>
              <td class="px-6 py-5 bg-transparent border-b border-[var(--sys-border-subtle)]">
                <span class="px-3 py-1.5 bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)] rounded-xl text-[10px] font-black uppercase tracking-widest">{{ job.group }}</span>
              </td>
              <td class="px-6 py-5 bg-transparent border-b border-[var(--sys-border-subtle)]">
                <span class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-tight opacity-60 italic">{{ job.level }}</span>
              </td>
              <td class="px-6 py-5 text-center bg-transparent border-b border-[var(--sys-border-subtle)]">
                <div :class="[
                  'px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 border transition-all shadow-sm',
                  job.status === 'active' ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]' : 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border-[var(--sys-border-subtle)]'
                ]">
                  <span class="w-1.5 h-1.5 rounded-full" :class="job.status === 'active' ? 'bg-[var(--sys-success-solid)]' : 'bg-[var(--sys-text-secondary)]'"></span>
                  {{ job.status === 'active' ? 'Đang sử dụng' : 'Ngưng sử dụng' }}
                </div>
              </td>
              <td class="px-8 py-5 text-right bg-transparent border-b border-[var(--sys-border-subtle)]">
                <div class="flex items-center justify-end gap-3 bg-transparent">
                  <button 
                    @click="openModal('edit', job)" 
                    class="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--sys-bg-surface)] text-[var(--sys-text-secondary)] hover:text-[var(--sys-brand-solid)] hover:border-[var(--sys-brand-solid)] transition-all border border-[var(--sys-border-subtle)] shadow-sm active:scale-95"
                    title="Chỉnh sửa"
                  >
                    <span class="material-symbols-outlined text-lg">edit_note</span>
                  </button>
                  <button 
                    @click="deleteJobTitle(job)" 
                    class="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--sys-bg-surface)] text-[var(--sys-text-secondary)] hover:text-[var(--sys-danger-text)] hover:border-[var(--sys-danger-border)] transition-all border border-[var(--sys-border-subtle)] shadow-sm active:scale-95" 
                    title="Xóa"
                  >
                    <span class="material-symbols-outlined text-lg">delete_sweep</span>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredJobTitles.length === 0">
              <td colspan="6" class="px-8 py-20 text-center text-[var(--sys-text-secondary)] font-bold italic bg-transparent">
                <div class="flex flex-col items-center gap-4 opacity-30">
                  <span class="material-symbols-outlined text-6xl">search_off</span>
                  <p class="text-xs uppercase tracking-[0.2em]">Không tìm thấy chức danh phù hợp</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer/Pagination -->
      <div class="px-8 py-5 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/30 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span class="text-[var(--sys-text-secondary)] text-[10px] font-black uppercase tracking-[0.2em] italic opacity-60">Hiển thị {{ filteredJobTitles.length }} bản ghi hệ thống</span>
        <div class="flex items-center gap-3">
          <button class="w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface)] text-[var(--sys-text-secondary)] hover:text-[var(--sys-brand-solid)] hover:border-[var(--sys-brand-solid)] transition-all shadow-sm">
            <span class="material-symbols-outlined text-lg">chevron_left</span>
          </button>
          <button class="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--sys-brand-solid)] text-white text-xs font-black shadow-xl shadow-[var(--sys-brand-solid-lch-30)]">1</button>
          <button class="w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface)] text-[var(--sys-text-secondary)] hover:text-[var(--sys-brand-solid)] hover:border-[var(--sys-brand-solid)] transition-all shadow-sm">
            <span class="material-symbols-outlined text-lg">chevron_right</span>
          </button>
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
          <div class="fixed inset-0 w-screen h-screen bg-[var(--sys-bg-canvas)]/60 z-[9999] overflow-hidden backdrop-blur-md" @click="showModal = false"></div>
          <div class="relative z-[10000] bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all text-left">
            <!-- Modal Header -->
            <div class="px-10 py-8 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-transparent text-left">
              <div class="text-left bg-transparent">
                <h3 class="text-xl font-black text-[var(--sys-text-primary)] text-left italic uppercase tracking-tight">{{ isEdit ? 'Cập nhật Chức danh' : 'Thêm Chức danh mới' }}</h3>
                <p class="text-[10px] text-[var(--sys-text-secondary)] font-black uppercase tracking-widest mt-1 opacity-60 text-left">Hệ thống sẽ đồng bộ thông tin trên toàn nền tảng</p>
              </div>
              <button @click="showModal = false" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-[var(--sys-bg-hover)] hover:text-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)]">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <!-- Modal Body -->
            <div class="p-10 space-y-8 bg-transparent text-left">
              <div class="grid grid-cols-12 gap-8 bg-transparent">
                <div class="col-span-12 md:col-span-4 bg-transparent text-left">
                  <label class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] mb-2.5 block ml-1 italic opacity-60">Mã (VD: DEV-01)</label>
                  <input v-model="form.code" type="text" placeholder="DEV-..." class="w-full px-5 py-4 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-black focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] placeholder:text-[var(--sys-text-secondary)]/30" :disabled="isEdit">
                </div>
                <div class="col-span-12 md:col-span-8 bg-transparent text-left">
                  <label class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] mb-2.5 block ml-1 italic opacity-60 text-left">Tên chức danh chính thức</label>
                  <input v-model="form.title" type="text" placeholder="Nhập tên chức danh..." class="w-full px-5 py-4 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-black focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)]">
                </div>
              </div>

              <div class="grid grid-cols-2 gap-8 bg-transparent text-left">
                <div class="bg-transparent text-left">
                  <label class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] mb-2.5 block ml-1 italic opacity-60 text-left">Nhóm ngành nghề</label>
                  <Dropdown 
                    v-model="form.group"
                    :options="groupFormOptions"
                    class="w-full"
                  />
                </div>
                <div class="bg-transparent text-left">
                  <label class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] mb-2.5 block ml-1 italic opacity-60 text-left">Phân cấp bậc</label>
                  <Dropdown 
                    v-model="form.level"
                    :options="levelFormOptions"
                    class="w-full"
                  />
                </div>
              </div>

              <div class="pt-4 bg-transparent text-left border-t border-[var(--sys-border-subtle)]">
                <div class="flex items-center justify-between bg-transparent text-left">
                  <div class="bg-transparent text-left">
                    <label class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] mb-1 block italic opacity-60 text-left">Trạng thái sử dụng</label>
                    <p class="text-[11px] font-bold text-[var(--sys-text-secondary)]">Cho phép áp dụng chức danh này cho nhân sự</p>
                  </div>
                  <div class="flex items-center gap-4 bg-transparent text-left">
                      <button 
                          @click="form.isActiveCheckbox = !form.isActiveCheckbox"
                          type="button"
                          class="relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 outline-none"
                          :class="form.isActiveCheckbox ? 'bg-[var(--sys-brand-solid)]' : 'bg-[var(--sys-bg-hover)] border-[var(--sys-border-subtle)]'"
                      >
                          <span class="pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-xl ring-0 transition duration-300"
                                :class="form.isActiveCheckbox ? 'translate-x-6' : 'translate-x-0'"></span>
                      </button>
                      <span class="text-[10px] font-black tracking-widest min-w-[100px] bg-transparent text-left" :class="form.isActiveCheckbox ? 'text-[var(--sys-success-text)]' : 'text-[var(--sys-text-secondary)]'">{{ form.isActiveCheckbox ? 'KÍCH HOẠT' : 'TẠM NGƯNG' }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="px-10 py-8 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/20 flex justify-end gap-4 text-left">
              <button @click="showModal = false" class="px-8 py-3.5 text-[10px] font-black text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] transition-all uppercase tracking-[0.2em]">Hủy bỏ</button>
              <button @click="saveJobTitle" class="px-10 py-3.5 bg-[var(--sys-brand-solid)] text-white rounded-2xl text-[10px] font-black hover:bg-[var(--sys-brand-hover)] shadow-2xl shadow-[var(--sys-brand-solid-lch-30)] transition-all uppercase tracking-[0.2em] active:scale-[0.98]">
                Lưu và Cập nhật
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
  let result = jobTitles.value;
  
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(j => 
      j.code.toLowerCase().includes(q) || 
      j.title.toLowerCase().includes(q)
    );
  }

  if (filterGroup.value !== 'ALL') {
    result = result.filter(j => j.group === filterGroup.value);
  }

  if (filterStatus.value !== 'ALL') {
    result = result.filter(j => j.status === filterStatus.value);
  }

  return result;
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
/* No local styles needed as we use the system-wide Tailwind and OKLCH variables */
</style>

