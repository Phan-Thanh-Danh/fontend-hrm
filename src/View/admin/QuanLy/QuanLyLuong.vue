<template>
 <div class="space-y-10 pb-10">
 <!-- Header -->
 <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 bg-transparent text-left">
 <div class="bg-transparent text-left">
 <h1 class="text-3xl font-semibold text-[var(--sys-text-primary)] mb-1">Kiến trúc Chi trả Lương</h1>
 <p class="text-xs text-[var(--sys-text-secondary)] font-medium opacity-60">Bảng kê thu nhập, phụ cấp và các khoản khấu trừ nhân sự toàn hệ thống.</p>
 </div>
 <div class="flex items-center gap-4">
 <div class="hidden md:flex items-center gap-1.5 bg-[var(--sys-bg-surface)] p-1.5 rounded-2xl border border-[var(--sys-border-subtle)] shadow-sm">
 <button 
 v-for="view in ['grid', 'list']" 
 :key="view"
 @click="viewMode = view"
 :class="`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${viewMode === view ? 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border border-[var(--sys-brand-border)]' : 'text-[var(--sys-text-secondary)] hover:bg-[var(--sys-bg-hover)]'}`"
 >
 <span class="material-symbols-outlined text-xl">{{ view === 'grid' ? 'grid_view' : 'format_list_bulleted' }}</span>
 </button>
 </div>
 <button 
 @click="showCreatePeriodModal = true"
 class="h-14 px-10 bg-[var(--sys-brand-solid)] rounded-2xl font-bold text-white hover:bg-[var(--sys-brand-hover)] active:scale-95 shadow-xl shadow-[var(--sys-brand-solid)]/20 transition-all flex items-center gap-3 text-xs whitespace-nowrap"
 >
 <span class="material-symbols-outlined text-xl">payments</span>
 Chốt lương tháng {{ currentMonth }}
 </button>
 </div>
 </div>

 <!-- Active Periods -->
 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 <div v-for="period in periods" :key="period.id" 
 class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative">
 <div class="absolute top-0 right-0 w-32 h-32 bg-[var(--sys-brand-soft)] rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
 <div class="p-10 relative z-10">
 <div class="flex items-center justify-between mb-8">
 <span :class="[
 'px-3 py-1 rounded-lg text-xs font-semibold border transition-all shadow-sm',
 getStatusBadgeClass(period.status)
 ]">
 <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(period.status)"></span>
 {{ period.status.replace('_', ' ') }}
 </span>
 <div class="w-10 h-10 rounded-xl bg-[var(--sys-bg-hover)] flex items-center justify-center text-[var(--sys-text-secondary)] group-hover:bg-[var(--sys-brand-solid)] group-hover:text-white transition-all border border-[var(--sys-border-subtle)]">
 <span class="material-symbols-outlined text-xl">more_horiz</span>
 </div>
 </div>
 <h3 class="text-3xl font-semibold text-[var(--sys-text-primary)] mb-1 ">Tháng {{ period.month }}/{{ period.year }}</h3>
 <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] mb-10 opacity-40">Phạm vi: {{ period.range }}</p>
 
 <div class="grid grid-cols-2 gap-4">
 <div class="p-6 bg-[var(--sys-bg-hover)] rounded-[2rem] border border-[var(--sys-border-subtle)] group-hover:bg-white transition-all">
 <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] opacity-40 mb-1.5">Tổng quỹ chi</p>
 <p class="text-xs font-bold text-[var(--sys-text-primary)] ">{{ formatCurrency(period.total_fund) }}</p>
 </div>
 <div class="p-6 bg-[var(--sys-bg-hover)] rounded-[2rem] border border-[var(--sys-border-subtle)] group-hover:bg-white transition-all">
 <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] opacity-40 mb-1.5">Quy mô nhân sự</p>
 <p class="text-xs font-bold text-[var(--sys-text-primary)] ">{{ period.employee_count }} nhân sự</p>
 </div>
 </div>
 </div>
 <div class="mt-auto px-10 py-6 bg-[var(--sys-bg-page)]/30 border-t border-[var(--sys-border-subtle)] flex items-center justify-between group-hover:bg-[var(--sys-brand-soft)]/20 transition-all">
 <button @click="viewDetails(period)" class="text-[10px] font-bold text-[var(--sys-brand-solid)] hover:opacity-70 transition-all">Chi tiết bảng lương</button>
 <span class="text-[9px] font-medium text-[var(--sys-text-secondary)] opacity-40 ">Cập nhật: {{ period.updated_at }}</span>
 </div>
 </div>
 </div>

 <!-- Details Table -->
 <div v-if="selectedPeriod" class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col">
 <div class="px-10 py-8 border-b border-[var(--sys-border-subtle)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 bg-[var(--sys-bg-page)]/30">
 <div class="flex items-center gap-4 text-left">
 <div class="w-14 h-14 rounded-2xl bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center border border-[var(--sys-brand-border)] shadow-sm">
 <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">payments</span>
 </div>
 <div class="text-left bg-transparent">
 <h3 class="text-lg font-bold text-[var(--sys-text-primary)] ">Chi tiết bảng lương tháng {{ selectedPeriod.month }}/{{ selectedPeriod.year }}</h3>
 <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] opacity-50 mt-1">Tổng hợp dữ liệu từ chấm công và hợp đồng lao động</p>
 </div>
 </div>
 <div class="flex items-center gap-4 w-full lg:w-auto">
 <button class="flex-1 lg:flex-none px-6 py-3 bg-[var(--sys-bg-surface)] text-[var(--sys-text-primary)] border border-[var(--sys-border-subtle)] rounded-2xl text-[10px] font-bold hover:border-[var(--sys-brand-solid)] hover:text-[var(--sys-brand-solid)] transition-all shadow-sm flex items-center justify-center gap-2">
 <span class="material-symbols-outlined text-lg">download</span>
 Xuất File Excel
 </button>
 <button v-if="selectedPeriod.status === 'ĐANG_XỬ_LÝ'" @click="approvePeriod" class="flex-1 lg:flex-none px-8 py-3 bg-[var(--sys-success-solid)] text-white rounded-2xl text-[10px] font-bold shadow-xl shadow-[var(--sys-success-solid)]/20 transition-all flex items-center justify-center gap-2">
 <span class="material-symbols-outlined text-lg">verified</span>
 Phê duyệt & Chốt
 </button>
 </div>
 </div>

 <div class="overflow-x-auto custom-scrollbar">
 <table class="min-w-max w-full text-left border-separate border-spacing-0">
 <thead>
 <tr>
 <th class="whitespace-nowrap px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Nhân viên thụ hưởng</th>
 <th class="whitespace-nowrap px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Lương căn bản</th>
 <th class="whitespace-nowrap px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Phụ cấp (+)</th>
 <th class="whitespace-nowrap px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Khấu trừ (-)</th>
 <th class="whitespace-nowrap px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Thực nhận</th>
 <th class="whitespace-nowrap px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Thao tác</th>
 </tr>
 </thead>
 <tbody>
 <tr v-for="item in salaryItems" :key="item.id" 
 class="group transition-all duration-300 bg-transparent hover:bg-[var(--sys-bg-hover)]">
 <td class="whitespace-nowrap px-10 py-4 border-b border-[var(--sys-border-subtle)] bg-transparent">
 <div class="flex flex-col bg-transparent truncate">
 <span class="text-sm font-semibold text-[var(--sys-text-primary)] mb-0.5 truncate">{{ item.name }}</span>
 <span class="text-xs font-medium text-[var(--sys-brand-solid)] opacity-60">{{ item.code }}</span>
 </div>
 </td>
 <td class="px-6 py-3 text-right bg-transparent border-b border-[var(--sys-border-subtle)] whitespace-nowrap">
 <span class="text-xs font-semibold text-[var(--sys-text-secondary)]">{{ formatCurrency(item.base) }}</span>
 </td>
 <td class="px-6 py-3 text-right bg-transparent border-b border-[var(--sys-border-subtle)] whitespace-nowrap">
 <span class="text-xs font-bold text-[var(--sys-success-text)]">+{{ formatCurrency(item.bonus) }}</span>
 </td>
 <td class="px-6 py-3 text-right bg-transparent border-b border-[var(--sys-border-subtle)] whitespace-nowrap">
 <span class="text-xs font-bold text-[var(--sys-danger-text)]">-{{ formatCurrency(item.deduction) }}</span>
 </td>
 <td class="px-6 py-3 text-right bg-transparent border-b border-[var(--sys-border-subtle)] whitespace-nowrap">
 <span class="text-sm font-bold text-[var(--sys-brand-solid)] ">{{ formatCurrency(item.base + item.bonus - item.deduction) }}</span>
 </td>
 <td class="whitespace-nowrap px-10 py-4 border-b border-[var(--sys-border-subtle)] text-right bg-transparent">
 <div class="flex items-center justify-end gap-2 bg-transparent">
 <button 
 @click="viewPayslip(item)"
 class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-icon-default)] hover:text-[var(--sys-brand-solid)] hover:border-[var(--sys-brand-solid)] hover:shadow-md active:scale-95 transition-all" 
 title="Xem phiếu"
 >
 <span class="material-symbols-outlined text-[18px]">visibility</span>
 </button>
 <button 
 @click="editSalary(item)" 
 :disabled="selectedPeriod.status !== 'ĐANG_XỬ_LÝ'" 
 class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-icon-default)] hover:text-[var(--sys-brand-solid)] hover:border-[var(--sys-brand-solid)] hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all" 
 title="Điều chỉnh"
 >
 <span class="material-symbols-outlined text-[18px]">edit_square</span>
 </button>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 <!-- Edit Salary Modal -->
 <Teleport to="body">
 <Transition
 enter-active-class="transition ease-out duration-300"
 enter-from-class="opacity-0 scale-95 translate-y-8"
 enter-to-class="opacity-100 scale-100 translate-y-0"
 leave-active-class="transition ease-in duration-200"
 leave-from-class="opacity-100 scale-100 translate-y-0"
 leave-to-class="opacity-0 scale-95 translate-y-8"
 >
 <div v-if="showEditModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
 <div class="fixed inset-0 w-screen h-screen bg-black/60 z-[9999] backdrop-blur-md" @click="showEditModal = false"></div>
 <div class="relative z-[10000] bg-[var(--sys-bg-surface-elevated)] border border-[var(--sys-border-subtle)] w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col transform transition-all text-left">
 <!-- Modal Header -->
 <div class="px-10 py-8 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-transparent">
 <div class="text-left bg-transparent">
 <h3 class="text-xl font-semibold text-[var(--sys-text-primary)] ">Điều chỉnh thu nhập nhân sự</h3>
 <p class="text-[10px] text-[var(--sys-text-secondary)] font-semibold mt-1 opacity-40 ">Thay đổi sẽ áp dụng duy nhất cho kỳ thanh toán hiện tại</p>
 </div>
 <button @click="showEditModal = false" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-[var(--sys-bg-hover)] hover:text-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)]">
 <span class="material-symbols-outlined text-2xl">close</span>
 </button>
 </div>

 <!-- Modal Body -->
 <div class="p-10 space-y-10 custom-scrollbar max-h-[75vh] overflow-y-auto bg-transparent">
 <div class="flex items-center gap-6 p-8 bg-[var(--sys-brand-soft)] rounded-[2.5rem] border border-[var(--sys-brand-border)] transition-all hover:scale-[1.01]">
 <div class="w-16 h-16 rounded-2xl bg-white flex items-center justify-center font-semibold text-[var(--sys-brand-solid)] text-3xl shadow-lg ">{{ editForm.name.charAt(0) }}</div>
 <div class="text-left flex-1 bg-transparent">
 <p class="text-xl font-semibold text-[var(--sys-brand-solid)] mb-1">{{ editForm.name }}</p>
 <div class="flex items-center gap-4 bg-transparent">
 <span class="text-[10px] text-[var(--sys-brand-solid)] font-semibold opacity-60 ">{{ editForm.code }}</span>
 <span class="w-1 h-1 rounded-full bg-[var(--sys-brand-solid)] opacity-30"></span>
 <span class="text-[10px] text-[var(--sys-brand-solid)] font-semibold opacity-60 ">Nhân viên biên chế</span>
 </div>
 </div>
 </div>

 <div class="space-y-6">
 <div class="group">
 <label class="block text-[10px] font-semibold text-[var(--sys-text-secondary)] mb-2.5 ml-2 opacity-60">Lương cơ bản (Hợp đồng) - Cố định</label>
 <div class="relative">
 <span class="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-semibold text-[var(--sys-text-secondary)] opacity-40 ">₫</span>
 <input v-model="editForm.base" type="number" disabled class="w-full pl-12 pr-6 py-4 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-semibold text-[var(--sys-text-secondary)] cursor-not-allowed shadow-inner">
 </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
 <div class="space-y-3">
 <label class="block text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60">Tổng phụ cấp & Thưởng (+)</label>
 <div class="relative">
 <span class="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-semibold text-[var(--sys-success-text)] ">₫</span>
 <input v-model="editForm.bonus" type="number" class="w-full pl-12 pr-6 py-4 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-[var(--sys-success-solid)]/10 focus:border-[var(--sys-success-solid)] transition-all text-[var(--sys-success-text)] shadow-sm">
 </div>
 </div>
 <div class="space-y-3">
 <label class="block text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60">Các khoản khấu trừ (-)</label>
 <div class="relative">
 <span class="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-semibold text-[var(--sys-danger-text)] ">₫</span>
 <input v-model="editForm.deduction" type="number" class="w-full pl-12 pr-6 py-4 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-[var(--sys-danger-solid)]/10 focus:border-[var(--sys-danger-solid)] transition-all text-[var(--sys-danger-text)] shadow-sm">
 </div>
 </div>
 </div>
 </div>

 <div class="p-8 bg-[var(--sys-bg-page)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] transition-all hover:scale-[1.01]">
 <p class="text-[10px] font-semibold text-[var(--sys-text-secondary)] mb-3 opacity-60">Dự toán thực lĩnh (Tạm tính)</p>
 <div class="flex items-center gap-4">
 <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-3xl">account_balance_wallet</span>
 <p class="text-3xl font-semibold text-[var(--sys-brand-solid)] ">
 {{ formatCurrency(editForm.base + editForm.bonus - editForm.deduction) }}
 </p>
 </div>
 </div>
 </div>

 <!-- Footer -->
 <div class="px-10 py-8 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface-elevated)] flex justify-end gap-5">
 <button @click="showEditModal = false" class="px-10 py-4 text-[10px] font-semibold text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] transition-all active:scale-95">Hủy bỏ</button>
 <button @click="saveSalaryAdjustment" class="px-12 py-4 bg-[var(--sys-brand-solid)] text-white rounded-2xl text-[10px] font-semibold hover:bg-[var(--sys-brand-hover)] shadow-2xl shadow-[var(--sys-brand-solid)]/20 transition-all flex items-center gap-3 active:scale-95">
 <span class="material-symbols-outlined text-xl">verified</span>
 Xác nhận điều chỉnh
 </button>
 </div>
 </div>
 </div>
 </Transition>
 </Teleport>
 </div>
</template>

<script setup>
import { ref } from 'vue';
import { useConfirm } from '@/composables/useConfirm';

const { showConfirm } = useConfirm();

const currentMonth = new Date().getMonth() + 1;
const viewMode = ref('grid');
const selectedPeriod = ref(null);
const showEditModal = ref(false);

const periods = ref([
 { id: 1, month: '10', year: '2023', status: 'ĐÃ_THANH_TOÁN', range: '01/10 - 31/10', total_fund: 1250000000, employee_count: 124, updated_at: '05/11/2023' },
 { id: 2, month: '11', year: '2023', status: 'ĐANG_XỬ_LÝ', range: '01/11 - 30/11', total_fund: 1285000000, employee_count: 126, updated_at: 'Hôm nay' },
]);

const salaryItems = ref([
 { id: 1, name: 'Nguyễn Văn An', code: 'EMP-001', base: 15000000, bonus: 2500000, deduction: 500000 },
 { id: 2, name: 'Trần Thị Thu', code: 'EMP-005', base: 22000000, bonus: 3000000, deduction: 1200000 },
 { id: 3, name: 'Lê Quản Trị', code: 'EMP-012', base: 40000000, bonus: 10000000, deduction: 5000000 },
 { id: 4, name: 'Phạm Designer', code: 'EMP-088', base: 18000000, bonus: 1500000, deduction: 0 },
]);

const editForm = ref({ id: null, name: '', code: '', base: 0, bonus: 0, deduction: 0 });

const formatCurrency = (val) => {
 return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
};

const getStatusBadgeClass = (status) => {
 switch (status) {
 case 'ĐÃ_THANH_TOÁN': return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
 case 'ĐANG_XỬ_LÝ': return 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)]';
 case 'CHỜ_DUYỆT': return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]';
 default: return 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border-[var(--sys-border-subtle)]';
 }
};

const getStatusDotClass = (status) => {
 switch (status) {
 case 'ĐÃ_THANH_TOÁN': return 'bg-[var(--sys-success-solid)]';
 case 'ĐANG_XỬ_LÝ': return 'bg-[var(--sys-brand-solid)]';
 case 'CHỜ_DUYỆT': return 'bg-[var(--sys-warning-solid)]';
 default: return 'bg-[var(--sys-icon-default)] opacity-40';
 }
};

const viewDetails = (period) => {
 selectedPeriod.value = period;
};

const editSalary = (item) => {
 editForm.value = { ...item };
 showEditModal.value = true;
};

const saveSalaryAdjustment = () => {
 const idx = salaryItems.value.findIndex(i => i.id === editForm.value.id);
 if (idx !== -1) {
 salaryItems.value[idx] = { ...editForm.value };
 }
 showEditModal.value = false;
};

const viewPayslip = (item) => {
 console.log('Viewing payslip for:', item.name);
};

const approvePeriod = async () => {
 const ok = await showConfirm('Kỳ thanh toán', `Phê chuẩn bảng thanh toán lương tháng ${selectedPeriod.value.month}/${selectedPeriod.value.year}? Dữ liệu sau khi chốt sẽ được lưu trữ vĩnh viễn.`);
 if (ok) {
 selectedPeriod.value.status = 'ĐÃ_THANH_TOÁN';
 selectedPeriod.value.updated_at = new Date().toLocaleDateString('vi-VN');
 }
};

// Auto-select first period on load
selectedPeriod.value = periods.value[1];
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
