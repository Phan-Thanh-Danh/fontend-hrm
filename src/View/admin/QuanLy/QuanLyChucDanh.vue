<template>
 <div class="space-y-10 pb-10">
 <!-- Header -->
 <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 bg-transparent text-left">
 <div class="bg-transparent text-left">
 <h1 class="text-3xl font-semibold text-[var(--sys-text-primary)] mb-1">Kiến trúc Chức danh</h1>
 <p class="text-xs text-[var(--sys-text-secondary)] font-medium opacity-60">Thiết lập và phân loại các vị trí công việc chính thức trong tổ chức.</p>
 </div>
 <div class="text-left">
 <button @click="openModal('add')" class="h-14 px-10 bg-[var(--sys-brand-solid)] rounded-2xl font-bold text-white hover:bg-[var(--sys-brand-hover)] active:scale-95 shadow-xl shadow-[var(--sys-brand-solid)]/20 transition-all flex items-center gap-3 text-xs whitespace-nowrap">
 <span class="material-symbols-outlined text-xl">add_box</span> 
 Thêm chức danh mới
 </button>
 </div>
 </div>

 <!-- Filters Section -->
 <div class="bg-[var(--sys-bg-surface)] p-8 rounded-[3rem] border border-[var(--sys-border-subtle)] shadow-sm">
 <div class="flex flex-col lg:flex-row items-center gap-4 w-full">
 <div class="relative flex-1 w-full group">
 <span class="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-xl text-[var(--sys-text-secondary)] opacity-40 group-focus-within:text-[var(--sys-brand-solid)] transition-all">search</span>
 <input 
 v-model="searchQuery"
 type="text" 
 placeholder="Truy vấn mã hoặc tên chức danh..." 
 class="w-full h-14 pl-16 pr-6 rounded-2xl bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] text-[13px] font-semibold text-[var(--sys-text-primary)] focus:outline-none focus:border-[var(--sys-brand-solid)] transition-all shadow-sm"
 >
 </div>
 <div class="flex items-center gap-3 w-full lg:w-auto shrink-0">
 <Dropdown 
 v-model="filterGroup"
 :options="groupOptions"
 class="min-w-[170px]"
 />
 <Dropdown 
 v-model="filterStatus"
 :options="statusOptions"
 class="min-w-[170px]"
 />
 </div>
 </div>
 </div>

 <!-- Table Section -->
 <div class="bg-[var(--sys-bg-surface)] rounded-[3rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-500">
 <div class="overflow-x-auto custom-scrollbar">
 <table class="min-w-max w-full text-left border-separate border-spacing-0">
 <thead>
 <tr>
 <th class="whitespace-nowrap px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Mã định danh</th>
 <th class="whitespace-nowrap px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Tên chức danh</th>
 <th class="whitespace-nowrap px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Phân nhóm</th>
 <th class="whitespace-nowrap px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Cấp bậc</th>
 <th class="whitespace-nowrap px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-center">Trạng thái</th>
 <th class="whitespace-nowrap px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Thao tác</th>
 </tr>
 </thead>
 <tbody>
 <tr v-for="job in filteredJobTitles" :key="job.code" 
 class="group transition-all duration-300 bg-transparent hover:bg-[var(--sys-bg-hover)]">
 <td class="px-8 py-3 bg-transparent border-b border-[var(--sys-border-subtle)] whitespace-nowrap">
 <span class="text-sm font-semibold text-[var(--sys-brand-solid)]">{{ job.code }}</span>
 </td>
 <td class="px-8 py-3 bg-transparent border-b border-[var(--sys-border-subtle)] whitespace-nowrap">
 <span class="text-sm font-semibold text-[var(--sys-text-primary)]">{{ job.title }}</span>
 </td>
 <td class="px-6 py-3 bg-transparent border-b border-[var(--sys-border-subtle)] whitespace-nowrap">
 <span class="px-3 py-1 bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)] rounded-lg text-xs font-semibold shadow-sm">{{ job.group }}</span>
 </td>
 <td class="px-6 py-3 bg-transparent border-b border-[var(--sys-border-subtle)] whitespace-nowrap">
 <span class="text-sm font-medium text-[var(--sys-text-secondary)] opacity-60">{{ job.level }}</span>
 </td>
 <td class="px-6 py-3 text-center bg-transparent border-b border-[var(--sys-border-subtle)] whitespace-nowrap">
 <span :class="[
 'px-3 py-1 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 border transition-all shadow-sm',
 job.status === 'active' ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]' : 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border-[var(--sys-border-subtle)]'
 ]">
 <span class="w-1.5 h-1.5 rounded-full" :class="job.status === 'active' ? 'bg-[var(--sys-success-solid)]' : 'bg-[var(--sys-text-secondary)] opacity-40'"></span>
 {{ job.status === 'active' ? 'Đang sử dụng' : 'Tạm ngưng' }}
 </span>
 </td>
 <td class="px-8 py-3 text-right bg-transparent border-b border-[var(--sys-border-subtle)] whitespace-nowrap">
 <div class="flex items-center justify-end gap-2 bg-transparent">
 <button 
 @click="openModal('edit', job)" 
 class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-icon-default)] hover:text-[var(--sys-brand-solid)] hover:border-[var(--sys-brand-solid)] hover:shadow-md active:scale-95"
 title="Chỉnh sửa"
 >
 <span class="material-symbols-outlined text-[18px]">edit_note</span>
 </button>
 <button 
 @click="deleteJobTitle(job)" 
 class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-icon-default)] hover:text-[var(--sys-danger-text)] hover:border-[var(--sys-danger-border)] hover:shadow-md active:scale-95" 
 title="Xóa chức danh"
 >
 <span class="material-symbols-outlined text-[18px]">delete_sweep</span>
 </button>
 </div>
 </td>
 </tr>
 <tr v-if="filteredJobTitles.length === 0">
 <td colspan="6" class="whitespace-nowrap px-10 py-24 text-center bg-transparent">
 <div class="flex flex-col items-center gap-6 opacity-20">
 <span class="material-symbols-outlined text-6xl">search_off</span>
 <p class="text-[10px] font-semibold ">Không tìm thấy chức danh phù hợp</p>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>

 <!-- Pagination -->
 <div class="px-12 py-8 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/30 flex flex-col sm:flex-row justify-between items-center gap-6">
 <span class="text-[10px] font-semibold text-[var(--sys-text-secondary)] opacity-40">Hiển thị {{ filteredJobTitles.length }} chức danh hệ thống</span>
 <div class="flex items-center gap-3">
 <button class="w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface)] text-[var(--sys-text-secondary)] hover:text-[var(--sys-brand-solid)] hover:border-[var(--sys-brand-solid)] transition-all shadow-sm active:scale-90">
 <span class="material-symbols-outlined text-lg">chevron_left</span>
 </button>
 <div class="flex items-center gap-2">
 <button class="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--sys-brand-solid)] text-white text-[10px] font-semibold shadow-lg shadow-[var(--sys-brand-solid)]/20 ">1</button>
 </div>
 <button class="w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface)] text-[var(--sys-text-secondary)] hover:text-[var(--sys-brand-solid)] hover:border-[var(--sys-brand-solid)] transition-all shadow-sm active:scale-90">
 <span class="material-symbols-outlined text-lg">chevron_right</span>
 </button>
 </div>
 </div>
 </div>

 <!-- Modal Thêm/Sửa -->
 <Teleport to="body">
 <Transition
 enter-active-class="transition ease-out duration-300"
 enter-from-class="opacity-0 scale-95 translate-y-8"
 enter-to-class="opacity-100 scale-100 translate-y-0"
 leave-active-class="transition ease-in duration-200"
 leave-from-class="opacity-100 scale-100 translate-y-0"
 leave-to-class="opacity-0 scale-95 translate-y-8"
 >
 <div v-if="showModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
 <div class="fixed inset-0 w-screen h-screen bg-black/60 z-[9999] backdrop-blur-md" @click="showModal = false"></div>
 <div class="relative z-[10000] bg-[var(--sys-bg-surface-elevated)] border border-[var(--sys-border-subtle)] w-full max-w-3xl rounded-[3.5rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col transform transition-all text-left">
 <!-- Modal Header -->
 <div class="px-12 py-10 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-transparent">
 <div class="text-left">
 <h3 class="text-2xl font-bold text-[var(--sys-text-primary)] m-0">{{ isEdit ? 'Cập nhật Chức danh' : 'Thêm Chức danh mới' }}</h3>
 <p class="text-[10px] text-[var(--sys-text-secondary)] font-bold mt-2 opacity-40">Quản lý hệ thống phân vị và định danh công việc</p>
 </div>
 <button @click="showModal = false" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-[var(--sys-bg-hover)] hover:text-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)]">
 <span class="material-symbols-outlined text-2xl">close</span>
 </button>
 </div>

 <!-- Modal Body -->
 <div class="p-12 space-y-10 custom-scrollbar max-h-[75vh] overflow-y-auto bg-transparent">
 <div class="grid grid-cols-1 md:grid-cols-12 gap-10">
 <div class="md:col-span-4 space-y-3">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60">Mã (VD: DEV-01) *</label>
 <input v-model="form.code" type="text" placeholder="DEV-..." class="w-full px-6 py-4 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-sm" :disabled="isEdit">
 </div>
 <div class="md:col-span-8 space-y-3">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60">Tên chức danh chính thức *</label>
 <input v-model="form.title" type="text" placeholder="Nhập tên chức danh..." class="w-full px-6 py-4 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-sm">
 </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
 <div class="space-y-3">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60">Nhóm ngành nghề</label>
 <Dropdown 
 v-model="form.group"
 :options="groupFormOptions"
 class="w-full"
 />
 </div>
 <div class="space-y-3">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60">Phân cấp bậc (Level)</label>
 <Dropdown 
 v-model="form.level"
 :options="levelFormOptions"
 class="w-full"
 />
 </div>
 </div>

 <div class="pt-10 border-t border-[var(--sys-border-subtle)]">
 <div class="flex flex-col md:flex-row items-center justify-between p-8 bg-[var(--sys-bg-page)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] gap-6">
 <div class="bg-transparent text-left w-full">
 <p class="text-[10px] font-semibold text-[var(--sys-text-secondary)] mb-1 opacity-60">Trạng thái vận hành</p>
 <p class="text-xs font-semibold text-[var(--sys-text-secondary)] ">Cho phép áp dụng chức danh này cho nhân sự toàn hệ thống</p>
 </div>
 <div class="flex items-center gap-6 shrink-0">
 <span class="text-[10px] font-semibold min-w-[100px] text-right" :class="form.isActiveCheckbox ? 'text-[var(--sys-success-text)]' : 'text-[var(--sys-text-secondary)] opacity-40'">{{ form.isActiveCheckbox ? 'KÍCH HOẠT' : 'TẠM NGƯNG' }}</span>
 <button 
 @click="form.isActiveCheckbox = !form.isActiveCheckbox"
 type="button"
 class="relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 outline-none"
 :class="form.isActiveCheckbox ? 'bg-[var(--sys-brand-solid)]' : 'bg-[var(--sys-border-subtle)]'"
 >
 <span class="pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-xl ring-0 transition duration-500"
 :class="form.isActiveCheckbox ? 'translate-x-6' : 'translate-x-0'"></span>
 </button>
 </div>
 </div>
 </div>
 </div>

 <!-- Footer -->
 <div class="px-12 py-10 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface-elevated)] flex justify-end gap-6">
 <button @click="showModal = false" class="px-12 py-5 text-[10px] font-semibold text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] transition-all active:scale-95 bg-transparent border-none">Hủy bỏ</button>
 <button @click="saveJobTitle" class="px-16 py-5 bg-[var(--sys-brand-solid)] text-white rounded-[1.8rem] text-[10px] font-semibold hover:bg-[var(--sys-brand-hover)] shadow-2xl shadow-[var(--sys-brand-solid)]/30 transition-all flex items-center gap-4 active:scale-95 border-none">
 <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'wght' 700;">verified</span>
 {{ isEdit ? 'Xác nhận thay đổi' : 'Hoàn tất khởi tạo' }}
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
 await showAlert('Thông tin bắt buộc', 'Vui lòng nhập đầy đủ Mã và Tên chức danh để tiếp tục!');
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
 await showAlert('Dữ liệu trùng lặp', 'Mã chức danh này đã tồn tại trên hệ thống!');
 return;
 }
 jobTitles.value.push(jobData);
 }
 showModal.value = false;
};

const deleteJobTitle = async (job) => {
 const ok = await showConfirm('Loại bỏ dữ liệu', `Bạn có chắc muốn loại bỏ chức danh "${job.title}" khỏi hệ thống?`);
 if (ok) {
 jobTitles.value = jobTitles.value.filter(j => j.code !== job.code);
 }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
 width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
 background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
 background: var(--sys-border-subtle);
 border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
 background: var(--sys-brand-solid);
}
</style>
