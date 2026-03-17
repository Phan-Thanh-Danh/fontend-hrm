<template>
 <div class="space-y-10 pb-10">
 <!-- Header -->
 <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 bg-transparent text-left">
 <div class="bg-transparent text-left">
 <h1 class="text-3xl font-semibold text-[var(--sys-text-primary)] mb-1">Kiến trúc Tài sản</h1>
 <p class="text-xs text-[var(--sys-text-secondary)] font-medium opacity-60">Cấp phát, theo dõi vòng đời và bảo trì thiết bị công ty toàn diện.</p>
 </div>
 <div class="text-left">
 <button 
 @click="openAddModal" 
 class="h-14 px-10 bg-[var(--sys-brand-solid)] rounded-2xl font-bold text-white hover:bg-[var(--sys-brand-hover)] active:scale-95 shadow-xl shadow-[var(--sys-brand-solid)]/20 transition-all flex items-center gap-3 text-xs whitespace-nowrap"
 >
 <span class="material-symbols-outlined text-xl">devices_other</span>
 Tiếp nhận thiết bị mới
 </button>
 </div>
 </div>

 <!-- Stats -->
 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
 <div v-for="stat in stats" :key="stat.label" 
 class="bg-[var(--sys-bg-surface)] p-8 rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden">
 <div class="absolute top-0 right-0 w-32 h-32 bg-[var(--sys-brand-soft)] rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
 <div class="flex flex-col gap-6 relative z-10 bg-transparent">
 <div :class="`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all shadow-sm ${
 stat.color === 'text-white' ? 'bg-[var(--sys-brand-solid)] border-[var(--sys-brand-border)] text-white' :
 stat.color === 'text-[var(--sys-brand-solid)]' ? 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)] group-hover:bg-[var(--sys-brand-solid)] group-hover:text-white' :
 stat.color === 'text-[var(--sys-success-text)]' ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)] group-hover:bg-[var(--sys-success-solid)] group-hover:text-white' :
 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)] group-hover:bg-[var(--sys-danger-solid)] group-hover:text-white'
 }`">
 <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">{{ stat.icon }}</span>
 </div>
 <div class="bg-transparent text-left">
 <p class="text-xs font-bold text-[var(--sys-text-secondary)] mb-2 opacity-50">{{ stat.label }}</p>
 <p class="text-3xl font-semibold text-[var(--sys-text-primary)] leading-none ">{{ stat.value }}</p>
 </div>
 </div>
 </div>
 </div>

 <!-- Table Container -->
 <div class="bg-[var(--sys-bg-surface)] rounded-[3rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-500">
 <!-- Filters -->
 <div class="px-10 py-8 border-b border-[var(--sys-border-subtle)] flex flex-col lg:flex-row items-center gap-6 bg-[var(--sys-bg-page)]/30 w-full">
 <div class="relative flex-1 w-full group">
 <span class="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-xl text-[var(--sys-text-secondary)] opacity-40 group-focus-within:text-[var(--sys-brand-solid)] group-focus-within:opacity-100 transition-all">search</span>
 <input 
 v-model="searchQuery"
 type="text" 
 placeholder="Truy vấn mã TS, tên hoặc người dùng..." 
 class="w-full h-14 pl-16 pr-6 rounded-2xl bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] text-[13px] font-semibold text-[var(--sys-text-primary)] focus:outline-none focus:border-[var(--sys-brand-solid)] transition-all shadow-sm"
 >
 </div>
 <div class="flex items-center gap-4 w-full lg:w-auto shrink-0">
 <Dropdown 
 v-model="filterCategory"
 :options="categoryOptions"
 class="min-w-[180px]"
 />
 <Dropdown 
 v-model="filterStatus"
 :options="statusOptions"
 class="min-w-[180px]"
 />
 </div>
 </div>

 <!-- Main Table -->
 <div class="overflow-x-auto custom-scrollbar">
 <table class="min-w-max w-full text-left border-separate border-spacing-0">
 <thead>
 <tr>
 <th class="whitespace-nowrap px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Định danh Tài sản</th>
 <th class="whitespace-nowrap px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Phân loại</th>
 <th class="whitespace-nowrap px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Người thụ hưởng</th>
 <th class="whitespace-nowrap px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-center">Tình trạng</th>
 <th class="whitespace-nowrap px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Thao tác</th>
 </tr>
 </thead>
 <tbody>
 <tr v-for="asset in filteredAssets" :key="asset.id" 
 class="group transition-all duration-300 bg-transparent hover:bg-[var(--sys-bg-hover)]">
 <td class="px-8 py-3 bg-transparent border-b border-[var(--sys-border-subtle)] whitespace-nowrap">
 <div class="flex flex-col bg-transparent truncate">
 <span class="text-sm font-semibold text-[var(--sys-text-primary)] mb-0.5">{{ asset.name }}</span>
 <span class="text-xs font-medium text-[var(--sys-brand-solid)] opacity-60">{{ asset.code }}</span>
 </div>
 </td>
 <td class="px-8 py-3 bg-transparent border-b border-[var(--sys-border-subtle)] whitespace-nowrap">
 <span class="px-3 py-1 bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)] rounded-lg text-xs font-semibold group-hover:border-[var(--sys-brand-solid)] transition-all shadow-sm">{{ asset.category }}</span>
 </td>
 <td class="px-8 py-3 bg-transparent border-b border-[var(--sys-border-subtle)] whitespace-nowrap">
 <div v-if="asset.user" class="flex flex-col items-start bg-transparent">
 <span class="text-sm font-semibold text-[var(--sys-text-primary)]">{{ asset.user }}</span>
 </div>
 <span v-else class="text-xs font-medium text-[var(--sys-text-secondary)] opacity-50">Sẵn sàng bàn giao</span>
 </td>
 <td class="px-6 py-3 text-center bg-transparent border-b border-[var(--sys-border-subtle)] whitespace-nowrap">
 <span :class="[
 'px-3 py-1 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 border transition-all shadow-sm',
 getStatusColor(asset.status)
 ]">
 <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotColor(asset.status)"></span>
 {{ asset.status.replace('_', ' ') }}
 </span>
 </td>
 <td class="px-8 py-3 text-right bg-transparent border-b border-[var(--sys-border-subtle)] whitespace-nowrap">
 <div class="flex items-center justify-end gap-2 bg-transparent">
 <button 
 @click="editAsset(asset)" 
 class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-icon-default)] hover:text-[var(--sys-brand-solid)] hover:border-[var(--sys-brand-solid)] hover:shadow-md active:scale-95 transition-all"
 title="Cấu hình"
 >
 <span class="material-symbols-outlined text-[18px]">settings_input_component</span>
 </button>
 <button 
 v-if="!asset.user" 
 @click="assignAsset(asset)" 
 class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-icon-default)] hover:text-[var(--sys-success-text)] hover:border-[var(--sys-success-border)] hover:shadow-md active:scale-95 transition-all" 
 title="Bàn giao"
 >
 <span class="material-symbols-outlined text-[18px]">person_add</span>
 </button>
 <button 
 v-else 
 @click="recoverAsset(asset)" 
 class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-icon-default)] hover:text-[var(--sys-warning-text)] hover:border-[var(--sys-warning-border)] hover:shadow-md active:scale-95 transition-all" 
 title="Thu hồi"
 >
 <span class="material-symbols-outlined text-[18px]">assignment_return</span>
 </button>
 <button 
 @click="confirmLiquidate(asset)" 
 class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-icon-default)] hover:text-[var(--sys-danger-solid)] hover:border-[var(--sys-danger-border)] hover:shadow-md active:scale-95 transition-all" 
 title="Thanh lý"
 >
 <span class="material-symbols-outlined text-[18px]">gavel</span>
 </button>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 <!-- Modal -->
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
 <div class="fixed inset-0 w-screen h-screen bg-black/60 z-[9999] backdrop-blur-md" @click="closeModal"></div>
 <div class="relative z-[10000] bg-[var(--sys-bg-surface-elevated)] border border-[var(--sys-border-subtle)] w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col transform transition-all text-left">
 <!-- Modal Header -->
 <div class="px-10 py-8 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-transparent">
 <div class="text-left bg-transparent">
 <h3 class="text-xl font-semibold text-[var(--sys-text-primary)] ">{{ editMode ? 'Điều chỉnh thông tin Tài sản' : 'Kiến tạo Tài sản mới' }}</h3>
 <p class="text-[10px] text-[var(--sys-text-secondary)] font-semibold mt-1 opacity-40 ">Hệ thống sẽ ghi nhận lịch sử bàn giao tự động</p>
 </div>
 <button @click="closeModal" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-[var(--sys-bg-hover)] hover:text-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)]">
 <span class="material-symbols-outlined text-2xl">close</span>
 </button>
 </div>

 <!-- Modal Body -->
 <div class="p-10 space-y-10 custom-scrollbar max-h-[75vh] overflow-y-auto bg-transparent">
 <div class="space-y-3">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60 text-left block">Tên gọi thiết bị / Tài sản chính thức *</label>
 <input v-model="form.name" type="text" placeholder="VD: MacBook Pro 14 inch M3 Pro - 512GB..." class="w-full px-6 py-4 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-sm">
 </div>

 <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
 <div class="space-y-3">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60 text-left block">Mã định danh hệ thống (Asset Tag) *</label>
 <input v-model="form.code" type="text" placeholder="TS-2023-XXXX" class="w-full px-6 py-4 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-sm">
 </div>
 <div class="space-y-3">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60 text-left block">Danh mục phân loại *</label>
 <Dropdown 
 v-model="form.category"
 :options="categoryOptionsForm"
 class="w-full"
 />
 </div>
 </div>

 <div class="space-y-3">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60 text-left block">Trạng thái vận hành thiết bị</label>
 <Dropdown 
 v-model="form.status"
 :options="statusOptionsForm"
 class="w-full"
 />
 </div>

 <div v-if="form.status === 'ĐANG_SỬ_DỤNG'" class="p-8 bg-[var(--sys-brand-soft)] rounded-[2.5rem] border border-[var(--sys-brand-solid)] border-dashed transition-all hover:scale-[1.01]">
 <label class="block text-[10px] font-semibold text-[var(--sys-brand-solid)] mb-4 opacity-60 text-left">Nhân viên thụ hưởng hiện tại</label>
 <div class="relative group bg-transparent">
 <span class="absolute left-0 top-1/2 -translate-y-1/2 material-symbols-outlined text-[var(--sys-brand-solid)] text-2xl">person_pin</span>
 <input v-model="form.user" type="text" placeholder="Tìm kiếm hoặc nhập tên nhân sự..." class="w-full bg-transparent border-0 border-b border-[var(--sys-brand-solid)] pl-10 pr-4 py-2 text-[var(--sys-text-primary)] font-semibold text-xl focus:outline-none focus:border-b-2 transition-all text-left">
 </div>
 </div>
 </div>

 <!-- Footer -->
 <div class="px-10 py-8 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface-elevated)] flex justify-end gap-5">
 <button @click="closeModal" class="px-10 py-4 text-[10px] font-semibold text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] transition-all active:scale-95">Quay lại</button>
 <button @click="handleSave" class="px-12 py-4 bg-[var(--sys-brand-solid)] text-white rounded-2xl text-[10px] font-semibold hover:bg-[var(--sys-brand-hover)] shadow-2xl shadow-[var(--sys-brand-solid)]/20 transition-all flex items-center gap-3 active:scale-95">
 <span class="material-symbols-outlined text-xl">verified</span>
 {{ editMode ? 'Xác nhận cập nhật' : 'Hoàn tất bàn giao' }}
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

const searchQuery = ref('');
const filterCategory = ref('ALL');
const filterStatus = ref('ALL');
const showModal = ref(false);
const editMode = ref(false);

const categories = ['Thiết bị IT', 'Nội thất khối VP', 'Phương tiện vận chuyển', 'Dụng cụ văn phòng'];
const categoryOptions = computed(() => [
 { label: 'Tất cả danh mục', value: 'ALL' },
 ...categories.map(cat => ({ label: cat, value: cat }))
]);

const statusOptions = [
 { label: 'Mọi trạng thái', value: 'ALL' },
 { label: 'Sẵn sàng cấp', value: 'SẴN_SÀNG' },
 { label: 'Đang sử dụng', value: 'ĐANG_SỬ_DỤNG' },
 { label: 'Đang bảo trì', value: 'ĐANG_SỬA_CHỮA' },
 { label: 'Đã thanh lý', value: 'ĐÃ_THANH_LÝ' }
];

const categoryOptionsForm = categories.map(cat => ({ label: cat, value: cat }));
const statusOptionsForm = [
 { label: 'Sẵn sàng cấp phát', value: 'SẴN_SÀNG' },
 { label: 'Đang bàn giao sử dụng', value: 'ĐANG_SỬ_DỤNG' },
 { label: 'Đang bảo trì / Sửa chữa', value: 'ĐANG_SỬA_CHỮA' },
 { label: 'Cần thanh lý định kỳ', value: 'CẦN_THANH_LÝ' }
];

const stats = ref([
 { label: 'Tổng số thiết bị', value: '1,240', icon: 'devices_other', color: 'text-white' },
 { label: 'Đang bàn giao', value: '864', icon: 'assignment_ind', color: 'text-[var(--sys-brand-solid)]' },
 { label: 'Trong kho dự phòng', value: '320', icon: 'warehouse', color: 'text-[var(--sys-success-text)]' },
 { label: 'Bảo trì hệ thống', value: '56', icon: 'settings_suggest', color: 'text-[var(--sys-danger-text)]' }
]);

const assets = ref([
 { id: 1, name: 'MacBook Pro M2 14" Silver', code: 'TS-2023-001', category: 'Thiết bị IT', user: 'Lưu Trọng Trí', status: 'ĐANG_SỬ_DỤNG' },
 { id: 2, name: 'Màn hình Dell UltraSharp 27" 4K', code: 'TS-2023-002', category: 'Thiết bị IT', user: 'Lưu Trọng Trí', status: 'ĐANG_SỬ_DỤNG' },
 { id: 3, name: 'Bàn ghế văn phòng Pro Series', code: 'TS-2022-045', category: 'Nội thất khối VP', user: 'Nguyễn Thị Hoa', status: 'ĐANG_SỬ_DỤNG' },
 { id: 4, name: 'iPhone 15 Pro Max 256GB', code: 'TS-2023-089', category: 'Thiết bị IT', user: null, status: 'SẴN_SÀNG' },
 { id: 5, name: 'Máy chiếu Sony 4K Cinematic', code: 'TS-2021-012', category: 'Thiết bị IT', user: null, status: 'ĐANG_SỬA_CHỮA' },
]);

const emptyForm = {
 id: null,
 name: '',
 code: '',
 category: 'Thiết bị IT',
 status: 'SẴN_SÀNG',
 user: null
};

const form = ref({ ...emptyForm });

const filteredAssets = computed(() => {
 let list = assets.value;
 if (filterCategory.value !== 'ALL') {
 list = list.filter(a => a.category === filterCategory.value);
 }
 if (filterStatus.value !== 'ALL') {
 list = list.filter(a => a.status === filterStatus.value);
 }
 if (searchQuery.value) {
 const q = searchQuery.value.toLowerCase();
 list = list.filter(a => 
 a.name.toLowerCase().includes(q) || 
 a.code.toLowerCase().includes(q) || 
 (a.user && a.user.toLowerCase().includes(q))
 );
 }
 return list;
});

const getStatusColor = (status) => {
 switch (status) {
 case 'ĐANG_SỬ_DỤNG': return 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)]';
 case 'SẴN_SÀNG': return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
 case 'ĐANG_SỬA_CHỮA': return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]';
 case 'ĐÃ_THANH_LÝ': return 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]';
 default: return 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border-[var(--sys-border-subtle)]';
 }
};

const getStatusDotColor = (status) => {
 switch (status) {
 case 'ĐANG_SỬ_DỤNG': return 'bg-[var(--sys-brand-solid)]';
 case 'SẴN_SÀNG': return 'bg-[var(--sys-success-solid)]';
 case 'ĐANG_SỬA_CHỮA': return 'bg-[var(--sys-warning-solid)]';
 case 'ĐÃ_THANH_LÝ': return 'bg-[var(--sys-danger-solid)]';
 default: return 'bg-[var(--sys-icon-default)] opacity-40';
 }
};

const openAddModal = () => {
 editMode.value = false;
 form.value = { ...emptyForm };
 form.value.code = `TS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
 showModal.value = true;
};

const editAsset = (asset) => {
 editMode.value = true;
 form.value = { ...asset };
 showModal.value = true;
};

const closeModal = () => { showModal.value = false; };

const handleSave = async () => {
 if (!form.value.name || !form.value.code) {
 await showAlert('Dữ liệu bắt buộc', 'Vui lòng xác định tên gọi và mã định danh tài sản!');
 return;
 }
 if (editMode.value) {
 const idx = assets.value.findIndex(a => a.id === form.value.id);
 if (idx !== -1) assets.value[idx] = { ...form.value };
 } else {
 assets.value.unshift({ ...form.value, id: Date.now() });
 }
 closeModal();
};

const assignAsset = (asset) => {
 editAsset(asset);
};

const recoverAsset = async (asset) => {
 const ok = await showConfirm('Pháp lý tài sản', `Xác nhận thu hồi thiết bị ${asset.name} từ nhân sự ${asset.user}? Toàn bộ dữ liệu bàn giao sẽ được lưu vết.`);
 if (ok) {
 asset.user = null;
 asset.status = 'SẴN_SÀNG';
 }
};

const confirmLiquidate = async (asset) => {
 const ok = await showConfirm('Thanh lý khấu hao', `Bạn có chắc muốn thực hiện quy trình thanh lý cho thiết bị ${asset.name}? Hành động này sẽ loại bỏ tài sản khỏi danh mục khả dụng.`);
 if (ok) {
 asset.status = 'ĐÃ_THANH_LÝ';
 asset.user = null;
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
