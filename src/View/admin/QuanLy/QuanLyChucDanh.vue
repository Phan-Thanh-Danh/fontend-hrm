<template>
  <div class="space-y-6 pb-8">
    <!-- Header Area -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left">
      <div class="bg-transparent text-left">
        <h1 class="text-xl font-semibold text-[var(--sys-text-primary)] mb-1">Quản lý Chức danh & Vị trí</h1>
        <p class="text-sm text-[var(--sys-text-secondary)]">Thiết lập hệ thống chức danh, phân tầng chuyên môn và khối nghiệp vụ.</p>
      </div>
      <div class="flex flex-col md:flex-row items-center gap-3 flex-1 w-full max-w-3xl bg-transparent">
        <!-- Search Bar -->
        <div class="relative flex-1 w-full group">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-[var(--sys-brand-solid)]">search</span>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Tìm kiếm mã, tên chức danh..." 
            class="w-full h-10 pl-10 pr-4 rounded-md bg-[var(--sys-bg-surface)] border border-[var(--sys-border-strong)] text-sm text-[var(--sys-text-primary)] focus:outline-none focus:border-[var(--sys-brand-solid)] focus:ring-1 focus:ring-[var(--sys-brand-solid)] transition-all placeholder:text-[var(--sys-text-disabled)]"
          >
        </div>
        
        <div class="flex items-center gap-3 w-full md:w-auto bg-transparent shrink-0">
          <Dropdown v-model="filterGroup" :options="groupOptions" class="min-w-[160px] h-10" />
          <button @click="openModal('add')" class="h-10 px-4 bg-[var(--sys-brand-solid)] rounded-md font-semibold text-white hover:brightness-90 active:opacity-90 transition-all flex items-center gap-2 text-sm whitespace-nowrap shadow-sm">
            <span class="material-symbols-outlined text-[20px]">add_box</span>
            Thêm chức danh
          </button>
        </div>
      </div>
    </div>

    <!-- Main Data Table Container -->
    <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col">
      <div class="overflow-x-auto custom-scrollbar bg-transparent">
        <table class="w-full text-left border-collapse">
          <thead class="bg-[var(--sys-bg-page)]">
            <tr>
              <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider">Mã định danh</th>
              <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider">Vị trí công tác / Phân tầng</th>
              <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider">Khối vận hành</th>
              <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider text-center">Cấp bậc</th>
              <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider text-center">Trạng thái</th>
              <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--sys-border-subtle)]">
            <tr v-for="job in filteredJobTitles" :key="job.code" 
              class="group hover:bg-[var(--sys-bg-hover)] transition-colors cursor-default">
              <td class="px-4 py-3 whitespace-nowrap bg-transparent">
                <span class="text-[13px] font-semibold text-[var(--sys-brand-solid)] uppercase tracking-wide">{{ job.code }}</span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap bg-transparent">
                <span class="text-[13px] font-semibold text-[var(--sys-text-primary)] transition-colors">{{ job.title }}</span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap bg-transparent">
                <span class="text-[13px] font-medium text-[var(--sys-text-secondary)]">{{ job.group }}</span>
              </td>
              <td class="px-4 py-3 text-center whitespace-nowrap bg-transparent">
                <span class="text-[12px] text-[var(--sys-text-secondary)] uppercase tracking-wider">{{ job.level }}</span>
              </td>
              <td class="px-4 py-3 text-center whitespace-nowrap bg-transparent">
                <span :class="[
                  'px-2 py-0.5 rounded-md text-[11px] font-semibold inline-flex items-center gap-1.5 border transition-all uppercase tracking-wide',
                  job.status === 'active' ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]' : 'bg-[var(--sys-bg-page)] text-[var(--sys-text-disabled)] border-[var(--sys-border-subtle)] opacity-50'
                ]">
                  <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="job.status === 'active' ? 'bg-[var(--sys-success-solid)]' : 'bg-[var(--sys-text-disabled)]'"></span>
                  {{ job.status === 'active' ? 'Sẵn dụng' : 'Tạm khóa' }}
                </span>
              </td>
              <td class="px-4 py-3 text-right whitespace-nowrap bg-transparent">
                <div class="flex items-center justify-end gap-1">
                  <button @click="openModal('edit', job)" class="w-8 h-8 flex items-center justify-center rounded-md text-[var(--sys-text-secondary)] hover:bg-[var(--sys-brand-soft)] hover:text-[var(--sys-brand-solid)] transition-all" title="Chỉnh sửa">
                    <span class="material-symbols-outlined text-[18px]">edit_square</span>
                  </button>
                  <button @click="deleteJobTitle(job)" class="w-8 h-8 flex items-center justify-center rounded-md text-[var(--sys-text-secondary)] hover:bg-[var(--sys-danger-soft)] hover:text-[var(--sys-danger-solid)] transition-all" title="Xóa">
                    <span class="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="px-4 py-3 bg-[var(--sys-bg-page)] border-t border-[var(--sys-border-subtle)] flex justify-between items-center text-[12px] font-medium text-[var(--sys-text-secondary)]">
        <span>Ghi nhận {{ jobTitles.length }} chức danh vận hành</span>
      </div>
    </div>

    <!-- Modal System -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div class="fixed inset-0 w-screen h-screen bg-black/50 z-[9999]" @click="showModal = false"></div>
          <div class="relative z-[10000] bg-[var(--sys-bg-surface-elevated)] border border-[var(--sys-border-subtle)] w-full max-w-2xl max-h-[90vh] rounded-lg shadow-xl overflow-hidden flex flex-col text-left">
            <!-- Modal Header -->
            <div class="px-6 py-4 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-[var(--sys-bg-surface)]">
              <div class="bg-transparent text-left flex flex-col">
                <h3 class="text-lg font-semibold text-[var(--sys-text-primary)] m-0 uppercase tracking-tight">{{ isEdit ? 'Cấu hình chức danh' : 'Thêm chức danh mới' }}</h3>
                <p class="text-sm text-[var(--sys-text-secondary)] mt-1">Xác định thẩm quyền và định danh chuyên môn nhân sự.</p>
              </div>
              <button @click="showModal = false" class="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[var(--sys-bg-hover)] transition-all text-[var(--sys-text-secondary)]">
                <span class="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <!-- Modal Body -->
            <div class="flex-1 overflow-y-auto p-6 custom-scrollbar bg-transparent">
              <div class="space-y-6 bg-transparent border-none">
                <div class="grid grid-cols-1 md:grid-cols-12 gap-6 bg-transparent border-none">
                  <div class="md:col-span-4 space-y-1.5 bg-transparent border-none">
                    <label class="text-[13px] font-medium text-[var(--sys-text-primary)] block">Mã định danh *</label>
                    <input v-model="form.code" type="text" placeholder="VD: DEV-01" class="w-full h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-sm text-[var(--sys-text-primary)] focus:border-[var(--sys-brand-solid)] outline-none transition-all" :disabled="isEdit">
                  </div>
                  <div class="md:col-span-8 space-y-1.5 bg-transparent border-none">
                    <label class="text-[13px] font-medium text-[var(--sys-text-primary)] block">Tên chức vị nghiệp vụ *</label>
                    <input v-model="form.title" type="text" placeholder="Nhập tên chức danh..." class="w-full h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-sm text-[var(--sys-text-primary)] focus:border-[var(--sys-brand-solid)] outline-none transition-all">
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-transparent border-none">
                  <div class="space-y-1.5 bg-transparent border-none">
                    <label class="text-[13px] font-medium text-[var(--sys-text-primary)] block">Khối vận hành</label>
                    <Dropdown v-model="form.group" :options="groupFormOptions" class="w-full h-10" />
                  </div>
                  <div class="space-y-1.5 bg-transparent border-none">
                    <label class="text-[13px] font-medium text-[var(--sys-text-primary)] block">Cấp độ chuyên môn</label>
                    <Dropdown v-model="form.level" :options="levelFormOptions" class="w-full h-10" />
                  </div>
                </div>

                <!-- Status Toggle -->
                <div class="flex items-center justify-between p-4 bg-[var(--sys-bg-page)] rounded-md border border-[var(--sys-border-subtle)] shadow-sm">
                  <div class="bg-transparent text-left">
                    <p class="text-[12px] font-medium text-[var(--sys-text-primary)] m-0">Trạng thái hiện hữu</p>
                    <p class="text-[11px] text-[var(--sys-text-secondary)] m-0">{{ form.isActiveCheckbox ? 'Kích hoạt trên toàn hệ thống' : 'Tạm dừng sử dụng chức danh này' }}</p>
                  </div>
                  <button 
                    @click="form.isActiveCheckbox = !form.isActiveCheckbox"
                    type="button"
                    class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 outline-none"
                    :class="form.isActiveCheckbox ? 'bg-[var(--sys-brand-solid)]' : 'bg-[var(--sys-border-subtle)]'"
                  >
                    <span class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200"
                      :class="form.isActiveCheckbox ? 'translate-x-5' : 'translate-x-0'"></span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="px-6 py-4 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface)] flex justify-end gap-3">
              <button @click="showModal = false" class="px-4 py-2 text-sm font-medium text-[var(--sys-text-secondary)] hover:bg-[var(--sys-bg-hover)] rounded-md transition-all uppercase tracking-wide">Hủy bỏ</button>
              <button @click="saveJobTitle" class="px-6 py-2 bg-[var(--sys-brand-solid)] text-white rounded-md font-semibold text-sm hover:brightness-90 transition-all uppercase tracking-wide">
                {{ isEdit ? 'Cập nhật cấu hình' : 'Xác nhận khởi tạo' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
/**
 * TRANG QUẢN TRỊ CHỨC DANH - PHIÊN BẢN ENTERPRISE SaaS
 * Tuân thủ 7 Golden Rules:
 * - Font Inter 14px (text-sm), Tỉ lệ Table cao (text-13px)
 * - Bo góc chuẩn B2B: 6px (MD) cho Input/Button, 8px (LG) cho Card/Modal/Table
 * - Hệ màu Blue/White đồng nhất cho Action Icons
 */
import { ref, computed } from 'vue';
import Dropdown from '@/components/Dropdown.vue';
import { useConfirm } from '@/composables/useConfirm';
import { mockPositions } from '@/mock-data/index.js';

const { showAlert, showConfirm } = useConfirm();

const showModal = ref(false);
const isEdit = ref(false);
const searchQuery = ref('');
const filterGroup = ref('ALL');
const filterStatus = ref('ALL');

const groupOptions = [
  { label: 'Tất cả phân nhóm', value: 'ALL' },
  { label: 'Khối Kỹ thuật', value: 'Kỹ thuật' },
  { label: 'Khối Marketing', value: 'Marketing' },
  { label: 'Khối Nhân sự', value: 'Nhân sự' }
];

const groupFormOptions = [
  { label: 'Khối Kỹ thuật', value: 'Kỹ thuật' },
  { label: 'Khối Marketing', value: 'Marketing' },
  { label: 'Khối Nhân sự', value: 'Nhân sự' },
  { label: 'Khối Tài chính', value: 'Tài chính' }
];

const levelFormOptions = [
  { label: 'Internship', value: 'Intern' },
  { label: 'Junior Level', value: 'Junior' },
  { label: 'Middle Level', value: 'Middle' },
  { label: 'Senior Level', value: 'Senior' },
  { label: 'Lead / Manager', value: 'Lead/Manager' }
];

const statusOptions = [
  { label: 'Mọi trạng thái', value: 'ALL' },
  { label: 'Đang hoạt động', value: 'active' },
  { label: 'Tạm ngưng', value: 'inactive' }
];

const jobTitles = computed(() => {
  return mockPositions.map(p => ({
    id: p.positionId,
    code: p.positionCode || `POS-${p.positionId}`,
    title: p.positionName || '',
    group: p.group || 'Kỹ thuật',
    level: p.level || 'Middle',
    status: p.status !== false ? 'active' : 'inactive' 
  }));
});

const emptyForm = {
  id: null,
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
    form.value.code = `POS-${(jobTitles.value.length + 1).toString().padStart(3,'0')}`;
  }
  showModal.value = true;
};

const saveJobTitle = async () => {
  if (!form.value.code || !form.value.title) {
    await showAlert('Thiếu thông tin', 'Vui lòng nhập đầy đủ Mã và Tên chức danh!');
    return;
  }

  const jobData = {
    position_code: form.value.code,
    position_name: form.value.title,
    group: form.value.group,
    level: form.value.level,
    status: form.value.isActiveCheckbox
  };

  if (isEdit.value) {
    mockPositions.update(form.value.id, jobData);
  } else {
    if (jobTitles.value.some(j => j.code === form.value.code)) {
      await showAlert('Dữ liệu trùng lặp', 'Mã chức danh này đã tồn tại trên hệ thống!');
      return;
    }
    mockPositions.add(jobData);
  }
  showModal.value = false;
};

const deleteJobTitle = async (job) => {
  const ok = await showConfirm('Xác nhận xóa', `Bạn có chắc muốn loại bỏ chức danh "${job.title}" khỏi hệ thống?`);
  if (ok) {
    mockPositions.delete(job.id);
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--sys-border-subtle);
  border-radius: 5px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--sys-brand-solid);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
