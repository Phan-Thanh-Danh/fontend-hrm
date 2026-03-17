<template>
 <div class="space-y-10 pb-10">
 <!-- Header Area -->
 <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-transparent text-left">
 <div class="bg-transparent text-left">
 <h1 class="text-3xl font-semibold text-[var(--sys-text-primary)] mb-1">Kiến trúc Tổ chức</h1>
 <p class="text-xs text-[var(--sys-text-secondary)] font-medium opacity-60">Quản trị cấu trúc sơ đồ, phân cấp đơn vị và năng lực nhân sự theo khối vận hành.</p>
 </div>
 <div class="flex flex-col md:flex-row items-center gap-6 flex-1 w-full max-w-3xl bg-transparent">
 <!-- Search Bar -->
 <div class="relative flex-1 w-full group">
 <span class="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-xl text-[var(--sys-text-secondary)] opacity-40 group-focus-within:text-[var(--sys-brand-solid)] transition-all">search</span>
 <input 
 v-model="searchQuery"
 type="text" 
 placeholder="Truy vấn mã phòng hoặc tên đơn vị..." 
 class="w-full h-14 pl-16 pr-6 rounded-2xl bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[13px] font-semibold text-[var(--sys-text-primary)] focus:outline-none focus:border-[var(--sys-brand-solid)] transition-all shadow-sm"
 >
 </div>
 <div class="flex items-center gap-4 w-full md:w-auto">
 <Dropdown 
 v-model="filterActive"
 :options="activeOptions"
 class="min-w-[180px]"
 />
 <button 
 @click="openModal('add')" 
 class="h-14 px-10 bg-[var(--sys-brand-solid)] rounded-2xl font-bold text-white hover:bg-[var(--sys-brand-hover)] active:scale-95 shadow-xl shadow-[var(--sys-brand-solid)]/20 transition-all flex items-center gap-3 text-xs whitespace-nowrap"
 >
 <span class="material-symbols-outlined text-xl">add_business</span>
 Thêm đơn vị mới
 </button>
 </div>
 </div>
 </div>

 <!-- Stats Cards -->
 <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
 <div v-for="stat in stats" :key="stat.label" 
 class="bg-[var(--sys-bg-surface)] p-8 rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-500 group relative overflow-hidden">
 <div class="absolute top-0 right-0 w-40 h-40 bg-[var(--sys-brand-soft)] rounded-full -mr-20 -mt-20 opacity-0 group-hover:opacity-40 transition-all duration-700 blur-3xl"></div>
 <div class="flex items-center gap-8 relative z-10 bg-transparent">
 <div :class="`w-16 h-16 rounded-[1.5rem] flex items-center justify-center border transition-all shadow-lg ${
 stat.semantic === 'brand' ? 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)] group-hover:bg-[var(--sys-brand-solid)] group-hover:text-white' :
 stat.semantic === 'success' ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)] group-hover:bg-[var(--sys-success-solid)] group-hover:text-white' :
 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)] group-hover:bg-[var(--sys-warning-solid)] group-hover:text-white'
 }`">
 <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">{{ stat.icon }}</span>
 </div>
 <div class="bg-transparent text-left">
 <p class="text-xs font-bold text-[var(--sys-text-secondary)] mb-2 opacity-50">{{ stat.label }}</p>
 <p class="text-4xl font-semibold text-[var(--sys-text-primary)] ">{{ stat.value }}</p>
 </div>
 </div>
 </div>
 </div>

 <!-- Org Table -->
 <div class="bg-[var(--sys-bg-surface)] rounded-[3rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-500">
 <div class="overflow-x-auto custom-scrollbar">
 <table class="min-w-max w-full text-left border-separate border-spacing-0">
 <thead>
 <tr class="bg-[var(--sys-bg-page)]/50">
 <th class="whitespace-nowrap px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)]">Định danh đơn vị</th>
 <th class="whitespace-nowrap px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border(--sys-border-subtle)">Quản lý</th>
 <th class="whitespace-nowrap px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] text-center">Quy mô</th>
 <th class="whitespace-nowrap px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] text-center">Tình trạng</th>
 <th class="whitespace-nowrap px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] text-right">Thao tác</th>
 </tr>
 </thead>
 <tbody class="bg-transparent">
 <tr v-for="dept in filteredDepartments" :key="dept.id" 
 class="group transition-all duration-300 bg-transparent hover:bg-[var(--sys-bg-hover)]">
 <td class="whitespace-nowrap px-12 py-6 bg-transparent border-b border-[var(--sys-border-subtle)]">
 <div class="flex items-center gap-5 bg-transparent max-w-[380px]">
 <div class="w-14 h-14 rounded-2xl bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center shrink-0 border border-[var(--sys-brand-border)] group-hover:bg-[var(--sys-brand-solid)] group-hover:text-white transition-all shadow-sm">
 <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">{{ dept.icon || 'hub' }}</span>
 </div>
 <div class="flex flex-col bg-transparent truncate">
 <span class="text-sm font-semibold text-[var(--sys-text-primary)] mb-0.5 bg-transparent truncate">{{ dept.name }}</span>
 <span class="text-xs font-medium text-[var(--sys-brand-solid)] opacity-60">{{ dept.code }}</span>
 </div>
 </div>
 </td>
 <td class="px-8 py-3 bg-transparent border-b border-[var(--sys-border-subtle)] whitespace-nowrap">
 <span class="text-sm font-semibold text-[var(--sys-text-primary)] opacity-80">{{ dept.manager || 'Chưa phân bổ' }}</span>
 </td>
 <td class="px-6 py-3 text-center bg-transparent border-b border-[var(--sys-border-subtle)] whitespace-nowrap">
 <span class="bg-[var(--sys-bg-hover)] px-3 py-1.5 rounded-lg font-bold text-[var(--sys-text-primary)] text-xs border border-[var(--sys-border-subtle)] transition-all group-hover:border-[var(--sys-brand-solid)] shadow-sm">
 {{ dept.employee_count }} nhân sự
 </span>
 </td>
 <td class="px-6 py-3 bg-transparent border-b border-[var(--sys-border-subtle)] text-center whitespace-nowrap">
 <span :class="[
 'px-3 py-1 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 border transition-all shadow-sm',
 dept.active ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]' : 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]'
 ]">
 <span class="w-1.5 h-1.5 rounded-full" :class="dept.active ? 'bg-[var(--sys-success-solid)]' : 'bg-[var(--sys-danger-solid)]'"></span>
 {{ dept.active ? 'Hoạt động' : 'Tạm dừng' }}
 </span>
 </td>
 <td class="px-8 py-3 text-right bg-transparent border-b border-[var(--sys-border-subtle)] whitespace-nowrap">
 <div class="flex items-center justify-end gap-2 bg-transparent">
 <button 
 @click="openModal('edit', dept)" 
 class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-icon-default)] hover:text-[var(--sys-brand-solid)] hover:border-[var(--sys-brand-solid)] hover:shadow-md active:scale-95"
 title="Chỉnh sửa đơn vị"
 >
 <span class="material-symbols-outlined text-[18px]">edit_square</span>
 </button>
 <button 
 @click="confirmDissolve(dept)" 
 class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-icon-default)] hover:text-[var(--sys-danger-solid)] hover:border-[var(--sys-danger-border)] hover:shadow-md active:scale-95" 
 title="Đóng đơn vị"
 >
 <span class="material-symbols-outlined text-[18px]">domain_disabled</span>
 </button>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>
 <div class="px-12 py-8 bg-[var(--sys-bg-page)]/30 border-t border-[var(--sys-border-subtle)] flex justify-end">
 <span class="text-[10px] font-semibold text-[var(--sys-text-secondary)] opacity-40">{{ filteredDepartments.length }} ĐƠN VỊ TRONG HỆ THỐNG</span>
 </div>
 </div>

 <!-- Modal System -->
 <Teleport to="body">
 <Transition
 enter-active-class="transition ease-out duration-300"
 enter-from-class="opacity-0 scale-95 translate-y-8 blur-lg"
 enter-to-class="opacity-100 scale-100 translate-y-0 blur-0"
 leave-active-class="transition ease-in duration-200"
 leave-from-class="opacity-100 scale-100 translate-y-0"
 leave-to-class="opacity-0 scale-95 translate-y-8 blur-lg"
 >
 <div v-if="showModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
 <div class="fixed inset-0 w-screen h-screen bg-black/60 z-[9999] backdrop-blur-xl" @click="closeModal"></div>
 <div class="relative z-[10000] bg-[var(--sys-bg-surface-elevated)] border border-[var(--sys-border-subtle)] w-full max-w-4xl rounded-[3.5rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col transform transition-all text-left">
 <!-- Modal Header -->
 <div class="px-12 py-10 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-transparent">
 <div class="text-left bg-transparent">
 <h3 class="text-2xl font-bold text-[var(--sys-text-primary)] m-0">{{ isEdit ? 'Cập nhật Cấu trúc Đơn vị' : 'Thêm Phòng ban Mới' }}</h3>
 <p class="text-[10px] text-[var(--sys-text-secondary)] font-bold mt-2 opacity-40">Quản lý sơ đồ tổ chức và phân cấp đơn vị</p>
 </div>
 <button @click="closeModal" class="w-14 h-14 flex items-center justify-center rounded-[1.5rem] bg-[var(--sys-bg-hover)] hover:text-[var(--sys-brand-solid)] border border-[var(--sys-border-subtle)] transition-all active:scale-90 shadow-sm">
 <span class="material-symbols-outlined text-2xl">close</span>
 </button>
 </div>

 <!-- Body -->
 <div class="p-12 md:p-14 custom-scrollbar max-h-[70vh] overflow-y-auto bg-transparent">
 <div class="grid grid-cols-1 md:grid-cols-2 gap-16 bg-transparent">
 <!-- Left: Identity -->
 <div class="space-y-10 bg-transparent">
 <h4 class="text-[11px] font-semibold text-[var(--sys-brand-solid)] flex items-center gap-5 opacity-80">
 <span class="w-3 h-8 bg-[var(--sys-brand-solid)] rounded-full shadow-lg shadow-[var(--sys-brand-solid)]/30"></span> 01. Định danh Đơn vị
 </h4>
 
 <div class="grid grid-cols-2 gap-8 bg-transparent">
 <div class="space-y-4 bg-transparent">
 <label class="block text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-4 opacity-100">Mã nhận diện *</label>
 <input v-model="form.code" type="text" placeholder="VD: ACC-DEPT" class="w-full px-8 py-5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-[1.5rem] text-sm font-semibold focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-inner outline-none placeholder:opacity-30">
 </div>
 <div class="space-y-4 bg-transparent">
 <label class="block text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-4 opacity-100">Icon đại diện</label>
 <Dropdown 
 v-model="form.icon"
 :options="iconOptionsList"
 class="w-full"
 />
 </div>
 </div>

 <div class="space-y-4 bg-transparent">
 <label class="block text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-4 opacity-100">Tên phòng ban chính thức *</label>
 <input v-model="form.name" type="text" placeholder="Nhập tên đơn vị chiến lược..." class="w-full px-8 py-5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-[1.5rem] text-[15px] font-semibold focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-inner outline-none placeholder:opacity-30">
 </div>

 <!-- Preview Card -->
 <div class="p-10 bg-gradient-to-br from-[var(--sys-brand-soft)] to-white rounded-[3rem] border border-dashed border-[var(--sys-brand-solid)] flex items-center gap-8 shadow-xl shadow-[var(--sys-brand-solid)]/5">
 <div class="w-20 h-20 rounded-[2rem] bg-white flex items-center justify-center text-[var(--sys-brand-solid)] shadow-2xl border border-[var(--sys-brand-border)] shrink-0">
 <span class="material-symbols-outlined text-4xl" style="font-variation-settings: 'FILL' 1;">{{ form.icon || 'corporate_fare' }}</span>
 </div>
 <div class="bg-transparent text-left">
 <p class="text-2xl font-semibold text-[var(--sys-brand-solid)] m-0">{{ form.name || 'Tên đơn vị' }}</p>
 <p class="text-[11px] font-semibold text-[var(--sys-brand-solid)] opacity-50 mt-2 ">{{ form.code || 'DEPT-CODE' }}</p>
 </div>
 </div>
 </div>

 <!-- Right: Hierarchy & Management -->
 <div class="space-y-10 bg-transparent">
 <h4 class="text-[11px] font-semibold text-[var(--sys-success-text)] flex items-center gap-5 opacity-80">
 <span class="w-3 h-8 bg-[var(--sys-success-solid)] rounded-full shadow-lg shadow-[var(--sys-success-solid)]/30"></span> 02. Phân cấp & Nhân sự
 </h4>

 <div class="space-y-4 bg-transparent">
 <label class="block text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-4 opacity-100">Đơn vị quản lý cấp trên</label>
 <Dropdown 
 v-model="form.parent_id"
 :options="parentDeptOptions"
 class="w-full"
 />
 </div>

 <div class="space-y-4 bg-transparent">
 <label class="block text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-4 opacity-100">Giám đốc / Trưởng đơn vị</label>
 <input v-model="form.manager" type="text" placeholder="Họ tên người phụ trách..." class="w-full px-8 py-5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-[1.5rem] text-sm font-semibold focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-inner outline-none placeholder:opacity-30">
 </div>

 <!-- Status Toggle -->
 <div class="flex items-center justify-between p-10 bg-[var(--sys-bg-page)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm group/toggle">
 <div class="bg-transparent text-left">
 <p class="text-[10px] font-semibold text-[var(--sys-text-secondary)] mb-2 opacity-40">Trạng thái vận hành</p>
 <p class="text-lg font-semibold " :class="form.active ? 'text-[var(--sys-success-text)]' : 'text-[var(--sys-danger-text)]'">{{ form.active ? 'ĐANG HOẠT ĐỘNG' : 'TẠM DỪNG' }}</p>
 </div>
 <button 
 @click="form.active = !form.active"
 type="button"
 class="relative inline-flex h-9 w-16 shrink-0 cursor-pointer rounded-full border-4 border-transparent transition-all duration-300 outline-none shadow-inner focus:ring-4 focus:ring-[var(--sys-brand-solid)]/20"
 :class="form.active ? 'bg-[var(--sys-brand-solid)] shadow-[var(--sys-brand-solid)]/20' : 'bg-[var(--sys-border-subtle)]'"
 >
 <span class="pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-xl ring-0 transition-all duration-300"
 :class="form.active ? 'translate-x-7' : 'translate-x-0'"></span>
 </button>
 </div>
 </div>
 </div>
 </div>

 <!-- Modal Footer -->
 <div class="px-12 py-10 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface-elevated)] flex justify-end gap-6">
 <button @click="closeModal" class="px-12 py-5 text-[10px] font-semibold text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] transition-all active:scale-95 bg-transparent border-none">Hủy bỏ</button>
 <button @click="handleSave" class="px-16 py-5 bg-[var(--sys-brand-solid)] text-white rounded-[1.8rem] text-[10px] font-semibold hover:bg-[var(--sys-brand-hover)] shadow-2xl shadow-[var(--sys-brand-solid)]/30 transition-all flex items-center gap-4 active:scale-95 border-none">
 <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'wght' 700;">verified</span>
 {{ isEdit ? 'Xác nhận cập nhật' : 'Hoàn tất kiến tạo' }}
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
const filterActive = ref('ALL');

const activeOptions = [
 { label: 'Mọi trạng thái', value: 'ALL' },
 { label: 'Đang hoạt động', value: true },
 { label: 'Đã tạm dừng', value: false }
];

const departments = ref([
 { id: 1, name: 'Khối Điều Hành (HO)', code: 'HO-ADMIN', manager: 'Nguyễn Văn An', active: true, employee_count: 5, icon: 'corporate_fare', parent_id: null },
 { id: 2, name: 'Phòng Công Nghệ', code: 'IT-DEPT', manager: 'Trần Kỹ Thuật', active: true, employee_count: 12, icon: 'engineering', parent_id: 1 },
 { id: 3, name: 'Phòng Nhân Sự', code: 'HR-DEPT', manager: 'Lê Tuyển Dụng', active: true, employee_count: 8, icon: 'groups', parent_id: 1 },
 { id: 4, name: 'Tổ Frontend', code: 'IT-FE', manager: 'Lưu Trọng Trí', active: true, employee_count: 5, icon: 'web', parent_id: 2 }
]);

const filteredDepartments = computed(() => {
 let list = departments.value;
 if (filterActive.value !== 'ALL') {
 list = list.filter(d => d.active === filterActive.value);
 }
 if (searchQuery.value) {
 const q = searchQuery.value.toLowerCase();
 list = list.filter(d => 
 d.name.toLowerCase().includes(q) || 
 d.code.toLowerCase().includes(q)
 );
 }
 return list;
});

const stats = ref([
 { label: 'Tổng số đơn vị', value: '12', icon: 'account_tree', semantic: 'brand' },
 { label: 'Đang vận hành', value: '10', icon: 'check_circle', semantic: 'success' },
 { label: 'Cấu trúc phân cấp', value: '3 Cấp', icon: 'schema', semantic: 'warning' }
]);

const iconOptions = ['corporate_fare', 'engineering', 'groups', 'web', 'payments', 'hub', 'apartment', 'meeting_room', 'account_balance', 'rocket_launch'];
const iconOptionsList = iconOptions.map(icon => ({ label: icon.toUpperCase().replaceAll('_', ' '), value: icon }));

const parentDeptOptions = computed(() => [
 { label: '-- Đơn vị cấp cao nhất --', value: null },
 ...departments.value.map(d => ({ label: d.name, value: d.id }))
]);

const emptyForm = {
 id: null, name: '', code: '', manager: '',
 active: true, icon: 'corporate_fare', parent_id: null
};

const form = ref({ ...emptyForm });

const openModal = (type, dept = null) => {
 isEdit.value = type === 'edit';
 form.value = isEdit.value && dept ? { ...dept } : { ...emptyForm };
 showModal.value = true;
};

const closeModal = () => { showModal.value = false; };

const handleSave = async () => {
 if (!form.value.name || !form.value.code) {
 await showAlert('Thiếu dữ liệu', 'Vui lòng điền tên và mã định danh phòng ban!');
 return;
 }
 if (isEdit.value) {
 const idx = departments.value.findIndex(d => d.id === form.value.id);
 if (idx !== -1) departments.value[idx] = { ...form.value };
 } else {
 departments.value.push({ ...form.value, id: Date.now(), employee_count: 0 });
 }
 closeModal();
};

const confirmDissolve = async (dept) => {
 if (dept.employee_count > 0) {
 await showAlert('Ràng buộc dữ liệu', `Phòng ${dept.name} đang quản lý ${dept.employee_count} nhân viên. Hãy điều chuyển trước khi tạm dừng!`);
 return;
 }
 const ok = await showConfirm('Cấu trúc tổ chức', `Xác nhận thay đổi trạng thái hoạt động của đơn vị ${dept.name}?`);
 if (ok) { dept.active = !dept.active; }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--sys-border-subtle); border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--sys-brand-solid); }

.space-y-10 {
 animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes fadeIn {
 from { opacity: 0; transform: translateY(20px); }
 to { opacity: 1; transform: translateY(0); }
}
.material-symbols-outlined {
 font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24;
}
</style>
