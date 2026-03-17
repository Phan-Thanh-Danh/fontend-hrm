<template>
 <div class="space-y-8 pb-10">
 <!-- Header -->
 <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 bg-transparent text-left">
 <div class="bg-transparent text-left">
 <h1 class="text-2xl font-semibold text-[var(--sys-text-primary)] mb-1 ">Bảng lương Tổng hợp</h1>
 <p class="text-[10px] text-[var(--sys-text-secondary)] font-semibold opacity-60">Thanh quyết toán, phê duyệt và quản lý chi tiết thu nhập nhân sự toàn hệ thống.</p>
 </div>
 <div class="flex items-center gap-4 text-left bg-transparent">
 <button class="px-8 py-3.5 bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-text-primary)] rounded-2xl font-semibold text-[10px] hover:bg-[var(--sys-bg-hover)] transition-all flex items-center gap-3 shadow-sm active:scale-95">
 <span class="material-symbols-outlined text-xl">ios_share</span>
 Kết xuất báo cáo
 </button>
 <button @click="openAddModal" class="px-10 py-3.5 bg-[var(--sys-brand-solid)] rounded-2xl font-semibold text-white hover:bg-[var(--sys-brand-hover)] shadow-2xl shadow-[var(--sys-brand-solid)]/20 transition-all flex items-center gap-3 text-[10px] active:scale-95">
 <span class="material-symbols-outlined text-xl">add_card</span>
 Khởi tạo quyết toán
 </button>
 </div>
 </div>

 <!-- Stats Overview -->
 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
 <div v-for="(stat, idx) in stats" :key="idx" 
 class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] p-8 border border-[var(--sys-border-subtle)] shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group overflow-hidden relative">
 <div class="absolute top-0 right-0 w-32 h-32 bg-[var(--sys-brand-solid)]/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-[var(--sys-brand-solid)]/10 transition-all duration-700"></div>
 <div class="flex items-center justify-between mb-8 relative z-10 bg-transparent">
 <div class="w-14 h-14 rounded-2xl flex items-center justify-center bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] shadow-inner font-semibold group-hover:rotate-12 transition-transform">
 <span class="material-symbols-outlined text-3xl">{{ stat.icon }}</span>
 </div>
 <span :class="[
 'px-3 py-1 rounded-full text-[9px] font-semibold shadow-sm ',
 stat.trend.startsWith('+') ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)]' : 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)]'
 ]">
 {{ stat.trend }}
 </span>
 </div>
 <div class="relative z-10 bg-transparent text-left">
 <p class="text-[var(--sys-text-secondary)] text-[10px] font-semibold mb-1.5 opacity-60 text-left">{{ stat.label }}</p>
 <p class="text-3xl font-semibold text-[var(--sys-text-primary)] text-left">{{ stat.value }}</p>
 </div>
 </div>
 </div>

 <!-- Main Table Card -->
 <div class="bg-[var(--sys-bg-surface)] rounded-[3rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col">
 <!-- Toolbar -->
 <div class="p-8 border-b border-[var(--sys-border-subtle)] flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 bg-[var(--sys-bg-page)]/20 backdrop-blur-sm">
 <div class="flex flex-wrap items-center gap-4">
 <div class="bg-[var(--sys-bg-hover)] p-1.5 rounded-[2rem] border border-[var(--sys-border-subtle)] flex items-center shadow-inner">
 <button class="px-6 py-2.5 rounded-[1.5rem] text-[10px] font-semibold bg-[var(--sys-bg-surface)] text-[var(--sys-brand-solid)] shadow-xl transition-all border border-[var(--sys-border-subtle)] ">Tháng 10 / 2023</button>
 <button class="px-6 py-2.5 rounded-[1.5rem] text-[10px] font-semibold text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] transition-all opacity-60">Tháng 09 / 2023</button>
 </div>
 </div>

 <div class="flex items-center gap-4 w-full xl:w-auto">
 <div class="relative flex-1 xl:w-80 group">
 <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--sys-text-secondary)] text-xl opacity-40 group-focus-within:text-[var(--sys-brand-solid)] group-focus-within:opacity-100 transition-all">search</span>
 <input 
 v-model="searchQuery"
 type="text" 
 placeholder="Tìm tên hoặc mã nhân viên..." 
 class="w-full pl-12 pr-6 py-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-xs font-semibold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-inner"
 >
 </div>
 <button class="shrink-0 px-8 py-3 bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] rounded-2xl text-[10px] font-semibold hover:bg-[var(--sys-success-solid)] hover:text-white transition-all shadow-sm flex items-center gap-2">
 <span class="material-symbols-outlined text-lg">verified_user</span>
 Chốt quyết toán
 </button>
 </div>
 </div>

 <!-- Table Section -->
 <div class="overflow-x-auto text-sm custom-scrollbar">
 <table class="min-w-max w-full text-left border-separate border-spacing-0">
 <thead>
 <tr>
 <th class="whitespace-nowrap px-10 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Hồ sơ thụ hưởng</th>
 <th class="whitespace-nowrap px-8 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Lương định mức</th>
 <th class="whitespace-nowrap px-8 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Tổng thu nhập</th>
 <th class="whitespace-nowrap px-8 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Khoản trích trừ</th>
 <th class="whitespace-nowrap px-8 py-6 text-[10px] font-semibold text-[var(--sys-success-text)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Hợp ngạch thực nhận</th>
 <th class="whitespace-nowrap px-8 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border(--sys-border-subtle) bg-[var(--sys-bg-page)]/50 text-center">Tình trạng</th>
 <th class="whitespace-nowrap px-10 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Công cụ</th>
 </tr>
 </thead>
 <tbody class="bg-transparent">
 <tr v-for="(item, index) in filteredEmployees" :key="index" 
 class="group transition-all duration-300 bg-transparent hover:bg-[var(--sys-bg-hover)]">
 <td class="whitespace-nowrap px-10 py-5 border-b border-[var(--sys-border-subtle)] bg-transparent">
 <div class="flex flex-col bg-transparent truncate max-w-[200px]">
 <span class="font-semibold text-[var(--sys-text-primary)] mb-0.5 bg-transparent text-sm">{{ item.name }}</span>
 <span class="text-[9px] text-[var(--sys-brand-solid)] font-semibold bg-transparent opacity-60 ">{{ item.id }} • {{ item.role }}</span>
 </div>
 </td>
 <td class="whitespace-nowrap px-8 py-5 font-semibold text-[var(--sys-text-secondary)] bg-transparent border-b border-[var(--sys-border-subtle)] text-right text-xs opacity-60">{{ formatCurrency(item.baseSalary) }}</td>
 <td class="whitespace-nowrap px-8 py-5 font-semibold text-[var(--sys-brand-solid)] bg-transparent border-b border-[var(--sys-border-subtle)] text-right text-xs ">+{{ formatCurrency(item.totalIncome) }}</td>
 <td class="whitespace-nowrap px-8 py-5 font-semibold text-[var(--sys-danger-text)] bg-transparent border-b border-[var(--sys-border-subtle)] text-right text-xs ">-{{ formatCurrency(item.deduction) }}</td>
 <td class="whitespace-nowrap px-8 py-5 bg-transparent border-b border-[var(--sys-border-subtle)] text-right">
 <p class="font-semibold text-[var(--sys-success-text)] text-lg bg-transparent ">{{ formatCurrency(item.netSalary) }}</p>
 </td>
 <td class="whitespace-nowrap px-8 py-5 bg-transparent border-b border-[var(--sys-border-subtle)] text-center">
 <span 
 class="px-4 py-1.5 rounded-xl text-[9px] font-semibold shadow-sm transition-all border"
 :class="getStatusClasses(item.status)"
 >
 {{ item.status }}
 </span>
 </td>
 <td class="whitespace-nowrap px-10 py-5 border-b border-[var(--sys-border-subtle)] text-right bg-transparent">
 <div class="flex items-center justify-end gap-2 bg-transparent">
 <button @click="openViewModal(item)" class="w-9 h-9 rounded-xl flex items-center justify-center transition-all bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-icon-default)] hover:text-[var(--sys-brand-solid)] hover:border-[var(--sys-brand-solid)] hover:shadow-lg active:scale-95" title="Sổ chi tiết lương">
 <span class="material-symbols-outlined text-xl">account_balance</span>
 </button>
 <button @click="openEditModal(item, index)" class="w-9 h-9 rounded-xl flex items-center justify-center transition-all bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-icon-default)] hover:text-[var(--sys-brand-solid)] hover:border-[var(--sys-brand-solid)] hover:shadow-lg active:scale-95" title="Điều trình tài chính">
 <span class="material-symbols-outlined text-xl">edit_square</span>
 </button>
 <button @click="openDeleteModal(item, index)" class="w-9 h-9 rounded-xl flex items-center justify-center transition-all bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-icon-default)] hover:text-[var(--sys-danger-solid)] hover:border-[var(--sys-danger-border)] hover:shadow-lg active:scale-95" title="Loại bỏ bản ghi">
 <span class="material-symbols-outlined text-xl">delete_sweep</span>
 </button>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>

 <!-- Pagination -->
 <div class="p-8 border-t border-[var(--sys-border-subtle)] flex flex-col md:flex-row justify-between items-center gap-6 bg-[var(--sys-bg-page)]/10">
 <div class="text-[10px] font-semibold text-[var(--sys-text-secondary)] opacity-40">
 Đang hiển thị <span class="text-[var(--sys-brand-solid)] font-semibold">1 - {{ filteredEmployees.length }}</span> Trên tổng số 156 hồ sơ thụ hưởng
 </div>
 <div class="flex items-center gap-3">
 <button class="w-10 h-10 flex items-center justify-center rounded-2xl text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)] hover:border-[var(--sys-brand-solid)] hover:text-[var(--sys-brand-solid)] transition-all bg-white shadow-sm active:scale-95"><span class="material-symbols-outlined text-xl">keyboard_double_arrow_left</span></button>
 <button class="w-10 h-10 flex items-center justify-center rounded-2xl bg-[var(--sys-brand-solid)] text-white font-semibold text-xs shadow-xl shadow-[var(--sys-brand-solid)]/20 active:scale-95 border border-[var(--sys-brand-solid)]">1</button>
 <button class="w-10 h-10 flex items-center justify-center rounded-2xl text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)] hover:bg-[var(--sys-bg-hover)] font-semibold text-xs transition-all active:scale-95 ">2</button>
 <button class="w-10 h-10 flex items-center justify-center rounded-2xl text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)] hover:bg-[var(--sys-bg-hover)] font-semibold text-xs transition-all active:scale-95 ">3</button>
 <button class="w-10 h-10 flex items-center justify-center rounded-2xl text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)] hover:border-[var(--sys-brand-solid)] hover:text-[var(--sys-brand-solid)] transition-all bg-white shadow-sm active:scale-95"><span class="material-symbols-outlined text-xl">keyboard_double_arrow_right</span></button>
 </div>
 </div>
 </div>

 <!-- Modals -->
 <Teleport to="body">
 <Transition
 enter-active-class="transition ease-out duration-300"
 enter-from-class="opacity-0 scale-95 translate-y-8"
 enter-to-class="opacity-100 scale-100 translate-y-0"
 leave-active-class="transition ease-in duration-200"
 leave-from-class="opacity-100 scale-100 translate-y-0"
 leave-to-class="opacity-0 scale-95 translate-y-8"
 >
 <div v-if="isAddEditModalOpen" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
 <div class="fixed inset-0 w-screen h-screen bg-black/60 z-[9999] backdrop-blur-md" @click="closeModal"></div>
 <div class="relative z-[10000] bg-[var(--sys-bg-surface-elevated)] border border-[var(--sys-border-subtle)] w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-left transform transition-all group/modal">
 <div class="px-10 py-8 border-b border-[var(--sys-border-subtle)] flex justify-between items-center bg-transparent">
 <div class="bg-transparent text-left">
 <h3 class="text-xl font-semibold text-[var(--sys-text-primary)] ">{{ modalTitle }}</h3>
 <p class="text-[10px] text-[var(--sys-text-secondary)] font-semibold mt-1 opacity-40">Pháp lý hóa các số liệu thu nhập nhân sự</p>
 </div>
 <button @click="closeModal" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-[var(--sys-bg-hover)] hover:text-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)]">
 <span class="material-symbols-outlined text-2xl">close</span>
 </button>
 </div>

 <div class="p-10 md:p-14 space-y-10 overflow-y-auto custom-scrollbar bg-transparent">
 <div class="grid grid-cols-1 md:grid-cols-2 gap-10 bg-transparent text-left">
 <div class="space-y-6 bg-transparent text-left">
 <div class="space-y-2.5 bg-transparent text-left">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60 block">Hồ sơ thụ hưởng *</label>
 <input v-model="formData.name" :disabled="modalMode === 'view'" class="w-full px-6 py-4 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-semibold text-[var(--sys-text-primary)] focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all shadow-sm outline-none">
 </div>
 <div class="space-y-2.5 bg-transparent text-left">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60 block">Lương định mức hợp đồng</label>
 <div class="relative">
 <input v-model="formData.baseSalary" type="number" :disabled="modalMode === 'view'" class="w-full px-6 py-4 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-semibold text-[var(--sys-text-primary)] focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all shadow-sm outline-none">
 <span class="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-[var(--sys-text-secondary)] opacity-40 ">VND</span>
 </div>
 </div>
 </div>
 <div class="space-y-6 bg-transparent text-left">
 <div class="space-y-2.5 bg-transparent text-left">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60 block">Chu kỳ quyết toán</label>
 <input v-model="formData.period" :disabled="modalMode === 'view'" class="w-full px-6 py-4 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-semibold text-[var(--sys-text-primary)] focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all shadow-sm outline-none">
 </div>
 <div class="space-y-2.5 bg-transparent text-left">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60 block">Tổng thu nhập gộp (Gross)</label>
 <div class="relative">
 <input v-model="formData.totalIncome" type="number" :disabled="modalMode === 'view'" class="w-full px-6 py-4 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-semibold text-[var(--sys-brand-solid)] focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all shadow-sm outline-none">
 <span class="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-[var(--sys-brand-solid)] opacity-40 ">VND</span>
 </div>
 </div>
 </div>
 </div>

 <div class="space-y-2.5 bg-transparent text-left">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60 block">Tổng các khoản khấu trừ / Thuế TNCN</label>
 <div class="relative">
 <input v-model="formData.deduction" type="number" :disabled="modalMode === 'view'" class="w-full px-6 py-4 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-semibold text-[var(--sys-danger-text)] focus:ring-4 focus:ring-[var(--sys-danger-solid)]/10 focus:border-[var(--sys-danger-solid)] transition-all shadow-sm outline-none">
 <span class="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-[var(--sys-danger-text)] opacity-40 ">VND</span>
 </div>
 </div>

 <div class="mt-10 p-10 bg-[var(--sys-success-soft)] rounded-[3rem] border border-[var(--sys-success-border)] relative overflow-hidden group/total shadow-xl shadow-[var(--sys-success-solid)]/5">
 <div class="absolute inset-0 bg-white opacity-0 group-modal:group-total:opacity-20 transition-all duration-700"></div>
 <div class="flex items-center justify-between relative z-10 bg-transparent">
 <div class="bg-transparent text-left">
 <p class="text-[11px] font-semibold text-[var(--sys-success-text)] mb-2 opacity-60">Thanh khoản thực nhận (NET)</p>
 <p class="text-5xl font-semibold text-[var(--sys-success-text)] ">{{ formatCurrency(formData.netSalary || (formData.totalIncome - formData.deduction)) }}</p>
 </div>
 <div class="w-20 h-20 rounded-3xl bg-white flex items-center justify-center shadow-lg border border-[var(--sys-success-border)] rotate-6 group-modal:rotate-0 transition-transform duration-500">
 <span class="material-symbols-outlined text-4xl text-[var(--sys-success-solid)]">payments</span>
 </div>
 </div>
 </div>
 </div>

 <div class="px-10 py-8 border-t border-[var(--sys-border-subtle)] flex justify-end gap-5 bg-transparent">
 <button @click="closeModal" class="px-10 py-4 text-[10px] font-semibold text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] transition-all active:scale-95">Quay lại</button>
 <button v-if="modalMode !== 'view'" @click="saveData" class="px-12 py-4 bg-[var(--sys-brand-solid)] text-white rounded-2xl text-[10px] font-semibold hover:bg-[var(--sys-brand-hover)] shadow-2xl shadow-[var(--sys-brand-solid)]/20 transition-all flex items-center gap-3 active:scale-95">
 <span class="material-symbols-outlined text-xl">verified</span>
 Phê chuẩn số liệu
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
import { useConfirm } from '@/composables/useConfirm';

const { showConfirm } = useConfirm();

const searchQuery = ref('');

const stats = ref([
 { label: 'Ngân quỹ lương dự bảng', value: '2.45B', icon: 'account_balance', trend: '+5.2%' },
 { label: 'Nhân sự thụ hưởng', value: '156', icon: 'badge', trend: '+2' },
 { label: 'Bình quân thu nhập', value: '15.7M', icon: 'query_stats', trend: '+1.5%' },
 { label: 'Qũy dự phòng nội bộ', value: '125M', icon: 'savings', trend: '-0.8%' },
]);

const employees = ref([
 { id: 'EMP-001', name: 'Nguyễn Văn An', role: 'UI/UX Designer', baseSalary: 18000000, totalIncome: 21500000, deduction: 1200000, netSalary: 20300000, status: 'Đã thanh toán', period: 'Tháng 10 / 2023' },
 { id: 'EMP-042', name: 'Lê Thị Mai', role: 'Marketing Lead', baseSalary: 25000000, totalIncome: 28000000, deduction: 2500000, netSalary: 25500000, status: 'Chờ thanh toán', period: 'Tháng 10 / 2023' },
 { id: 'EMP-105', name: 'Trần Hoàng Nam', role: 'Web Developer', baseSalary: 20000000, totalIncome: 20000000, deduction: 1500000, netSalary: 18500000, status: 'Đã khóa hồ sơ', period: 'Tháng 10 / 2023' },
 { id: 'EMP-018', name: 'Phạm Minh Đức', role: 'Product Manager', baseSalary: 35000000, totalIncome: 42000000, deduction: 4800000, netSalary: 37200000, status: 'Đã thanh toán', period: 'Tháng 10 / 2023' },
]);

const filteredEmployees = computed(() => {
 if (!searchQuery.value) return employees.value;
 const q = searchQuery.value.toLowerCase();
 return employees.value.filter(e => e.name.toLowerCase().includes(q) || e.id.toLowerCase().includes(q));
});

const isAddEditModalOpen = ref(false);
const modalMode = ref('add');
const formData = ref({});
const selectedIndex = ref(-1);

const modalTitle = computed(() => {
 if (modalMode.value === 'add') return 'Kiến tạo Bản ghi Quyết toán';
 if (modalMode.value === 'edit') return 'Hiệu chỉnh Tham số Tài chính';
 return 'Xác thực Phiếu lương Chi tiết';
});

const formatCurrency = (val) => {
 return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
};

const getStatusClasses = (status) => {
 if (status === 'Đã thanh toán') return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
 if (status === 'Chờ thanh toán') return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]';
 return 'bg-[var(--sys-bg-page)] text-[var(--sys-text-secondary)] border-[var(--sys-border-subtle)]';
};

const openAddModal = () => {
 modalMode.value = 'add';
 formData.value = { id: `EMP-${Math.floor(Math.random()*900)+100}`, name: '', role: 'Nhân sự cấp cao', period: 'Tháng 10 / 2023', baseSalary: 0, totalIncome: 0, deduction: 0, status: 'Chờ thanh toán' };
 isAddEditModalOpen.value = true;
};

const openEditModal = (item, index) => {
 modalMode.value = 'edit';
 selectedIndex.value = index;
 formData.value = { ...item };
 isAddEditModalOpen.value = true;
};

const openViewModal = (item) => {
 modalMode.value = 'view';
 formData.value = { ...item };
 isAddEditModalOpen.value = true;
};

const closeModal = () => {
 isAddEditModalOpen.value = false;
};

const saveData = () => {
 const net = formData.value.totalIncome - formData.value.deduction;
 if (modalMode.value === 'add') {
 employees.value.unshift({ ...formData.value, netSalary: net });
 } else {
 employees.value[selectedIndex.value] = { ...formData.value, netSalary: net };
 }
 closeModal();
};

const openDeleteModal = async (item, index) => {
 const ok = await showConfirm('Loại bỏ dữ liệu', `Bạn có chắc muốn hủy bỏ bản ghi của ${item.name}? Hồ sơ tài chính này sẽ bị xóa vĩnh viễn khỏi kỳ lương.`);
 if (ok) {
 employees.value.splice(index, 1);
 }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
 width: 6px;
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