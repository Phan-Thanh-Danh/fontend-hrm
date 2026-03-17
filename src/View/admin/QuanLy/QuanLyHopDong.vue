<template>
 <div class="space-y-10 pb-10">
 <!-- Header Area -->
 <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-transparent text-left">
 <div class="bg-transparent text-left">
 <h1 class="text-3xl font-semibold text-[var(--sys-text-primary)] mb-1">Kiến trúc Pháp lý Hợp đồng</h1>
 <p class="text-[10px] text-[var(--sys-text-secondary)] font-semibold opacity-60">Trung tâm quản trị thời hạn, điều khoản chiến lược và phụ lục lao động pháp quy.</p>
 </div>
 <div class="flex flex-col md:flex-row items-center gap-6 flex-1 w-full max-w-4xl bg-transparent">
 <!-- Search Bar -->
 <div class="relative flex-1 w-full group">
 <span class="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-xl text-[var(--sys-text-secondary)] opacity-40 group-focus-within:text-[var(--sys-brand-solid)] transition-all">search</span>
 <input 
 v-model="searchQuery"
 type="text" 
 placeholder="Truy vấn số HĐ, tên nhân sự..." 
 class="w-full h-14 pl-16 pr-6 rounded-2xl bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[13px] font-semibold text-[var(--sys-text-primary)] focus:outline-none focus:border-[var(--sys-brand-solid)] transition-all shadow-sm"
 >
 </div>

 <div class="flex items-center gap-4 w-full md:w-auto">
 <Dropdown 
 v-model="filterStatus"
 :options="statusOptions"
 class="min-w-[200px]"
 />

 <button 
 @click="openAddModal" 
 class="h-14 px-10 bg-[var(--sys-brand-solid)] rounded-2xl font-semibold text-white hover:bg-[var(--sys-brand-hover)] active:scale-95 shadow-xl shadow-[var(--sys-brand-solid)]/20 transition-all flex items-center gap-3 text-[10px] whitespace-nowrap "
 >
 <span class="material-symbols-outlined text-xl">contract_edit</span>
 Ký hợp đồng
 </button>
 </div>
 </div>
 </div>

 <!-- Enhanced Alert Box -->
 <Transition
 enter-active-class="transition ease-out duration-500"
 enter-from-class="opacity-0 -translate-y-10 scale-95"
 enter-to-class="opacity-100 translate-y-0 scale-100"
 >
 <div v-if="expiringCount > 0" class="bg-[var(--sys-warning-soft)] border border-[var(--sys-warning-border)] rounded-[3rem] p-10 flex flex-col md:flex-row items-center gap-10 shadow-2xl shadow-[var(--sys-warning-solid)]/5 transition-all hover:scale-[1.005] group">
 <div class="w-20 h-20 bg-[var(--sys-warning-solid)] text-white rounded-[1.8rem] flex items-center justify-center shrink-0 shadow-2xl shadow-[var(--sys-warning-solid)]/20 group-hover:rotate-12 transition-transform duration-500">
 <span class="material-symbols-outlined text-4xl animate-pulse">priority_high</span>
 </div>
 <div class="flex-1 text-left bg-transparent">
 <h4 class="text-[var(--sys-warning-text)] font-semibold text-lg m-0">Cảnh báo vận hành: {{ expiringCount }} hợp đồng chuẩn bị đáo hạn pháp lý</h4>
 <p class="text-[var(--sys-warning-text)] opacity-60 text-[10px] font-semibold mt-3 leading-relaxed">Yêu cầu kiểm tra và khởi tạo tiến trình gia hạn trước 30 ngày để đảm bảo tính liên tục của nguồn lực lao động.</p>
 </div>
 <button class="px-12 py-4 bg-[var(--sys-warning-solid)] text-white rounded-2xl text-[10px] font-semibold shadow-xl shadow-[var(--sys-warning-solid)]/20 transition-all hover:brightness-110 active:scale-95 ">Xử lý ưu tiên</button>
 </div>
 </Transition>

 <!-- Content Architecture -->
 <div class="grid grid-cols-1 xl:grid-cols-12 gap-10 items-stretch">
 <!-- Left: Analytics & History -->
 <div class="xl:col-span-3 space-y-6 flex flex-col">
 <!-- Stats Card -->
 <div class="bg-[var(--sys-bg-surface)] p-5 rounded-[2rem] border border-[var(--sys-border-subtle)] shadow-sm hover:shadow-xl hover:border-[var(--sys-brand-solid)] transition-all duration-500 group relative overflow-hidden">
 <div class="absolute -right-10 -top-10 w-40 h-40 bg-[var(--sys-brand-soft)] rounded-full opacity-0 group-hover:opacity-40 transition-all duration-1000 blur-3xl"></div>
 <h3 class="text-[8px] font-semibold text-[var(--sys-text-secondary)] mb-4 flex items-center gap-2.5 opacity-40 relative z-10">
 <span class="w-1.5 h-4 bg-[var(--sys-brand-solid)] rounded-full"></span> Trạng thái Pháp lý
 </h3>
 <div class="grid grid-cols-2 gap-2 relative z-10">
 <div v-for="stat in contractStats" :key="stat.label"
 class="flex flex-col p-3 bg-[var(--sys-bg-page)]/50 rounded-xl border border-[var(--sys-border-subtle)] hover:bg-white hover:border-[var(--sys-brand-border)] transition-all shadow-sm">
 <span class="text-[7px] font-semibold text-[var(--sys-text-secondary)] opacity-40 leading-tight mb-1">{{ stat.label }}</span>
 <span class="text-lg font-semibold text-[var(--sys-text-primary)] leading-none">{{ stat.value }}</span>
 </div>
 </div>
 </div>

 <!-- History Timeline -->
 <div class="bg-[var(--sys-bg-surface)] p-6 rounded-[2rem] border border-[var(--sys-border-subtle)] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col flex-1">
 <h3 class="text-[9px] font-semibold text-[var(--sys-text-secondary)] mb-6 flex items-center gap-3 opacity-40">
 <span class="w-2 h-5 bg-[var(--sys-icon-default)] rounded-full opacity-30 shadow-sm"></span> Biến động pháp lý
 </h3>
 <div class="space-y-6 relative pl-5 bg-transparent border-l-2 border-[var(--sys-border-subtle)]/30 ml-1">
 <div v-for="log in historyLogs" :key="log.id" class="relative bg-transparent group/log">
 <div :class="`absolute -left-[2.1rem] top-0.5 w-7 h-7 rounded-xl border-2 border-[var(--sys-bg-surface)] shadow-lg flex items-center justify-center shrink-0 z-10 transition-all group-hover/log:scale-110 ${log.bg}`">
 <span class="material-symbols-outlined text-sm text-white" style="font-variation-settings: 'FILL' 1;">{{ log.icon }}</span>
 </div>
 <div class="bg-transparent text-left pl-1">
 <p class="text-[10px] font-semibold text-[var(--sys-text-primary)] mb-1 group-hover/log:text-[var(--sys-brand-solid)] transition-colors leading-snug">{{ log.content }}</p>
 <div class="flex flex-wrap items-center gap-1.5 opacity-40">
 <span class="text-[8px] font-semibold text-[var(--sys-text-secondary)] ">{{ log.time }}</span>
 <span class="w-0.5 h-0.5 rounded-full bg-[var(--sys-text-secondary)"></span>
 <span class="text-[8px] font-semibold text-[var(--sys-text-secondary)] ">{{ log.user }}</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>

 <!-- Right: Main Data Table -->
 <div class="xl:col-span-9 bg-[var(--sys-bg-surface)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow duration-500">
 <div class="overflow-x-auto flex-1 custom-scrollbar">
 <table class="min-w-max w-full text-left border-separate border-spacing-0">
 <thead>
 <tr class="bg-[var(--sys-bg-page)]/50">
 <th class="px-6 py-3 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] whitespace-nowrap">Số HĐ</th>
 <th class="px-6 py-3 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] whitespace-nowrap">Nhân sự</th>
 <th class="px-6 py-3 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] whitespace-nowrap">Thời hạn</th>
 <th class="px-6 py-3 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] text-center whitespace-nowrap">Trạng thái</th>
 <th class="px-6 py-3 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] text-right whitespace-nowrap">Thao tác</th>
 </tr>
 </thead>
 <tbody class="bg-transparent">
 <tr v-for="item in filteredContracts" :key="item.id" 
 class="group transition-all duration-300 bg-transparent hover:bg-[var(--sys-bg-hover)]">
 <td class="px-6 py-3 border-b border-[var(--sys-border-subtle)] bg-transparent whitespace-nowrap">
 <span class="text-sm font-semibold text-[var(--sys-brand-solid)]">{{ item.contract_no }}</span>
 </td>
 <td class="whitespace-nowrap px-6 py-3 border-b border-[var(--sys-border-subtle)] bg-transparent">
 <div class="flex flex-col bg-transparent">
 <span class="text-sm font-semibold text-[var(--sys-text-primary)] whitespace-nowrap">{{ item.employee_name }}</span>
 <span class="text-xs text-[var(--sys-text-secondary)] whitespace-nowrap">{{ item.contract_type.replaceAll('_', ' ') }}</span>
 </div>
 </td>
 <td class="px-6 py-3 border-b border-[var(--sys-border-subtle)] bg-transparent whitespace-nowrap">
 <div class="flex items-center gap-2 bg-transparent">
 <span class="text-sm text-[var(--sys-text-primary)]">{{ item.start_date }}</span>
 <div class="w-5 h-[1.5px] bg-[var(--sys-border-subtle)] rounded-full shrink-0"></div>
 <span class="text-sm text-[var(--sys-text-primary)]">{{ item.end_date || 'Không xác định' }}</span>
 </div>
 </td>
 <td class="px-6 py-3 border-b border-[var(--sys-border-subtle)] bg-transparent text-center whitespace-nowrap">
 <span :class="[
 'px-3 py-1 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 border whitespace-nowrap',
 getStatusColor(item.status)
 ]">
 <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="getStatusDotColor(item.status)"></span>
 {{ item.status.replaceAll('_', ' ') }}
 </span>
 </td>
 <td class="px-6 py-3 border-b border-[var(--sys-border-subtle)] text-right bg-transparent whitespace-nowrap">
 <div class="flex items-center justify-end gap-2 bg-transparent">
 <button 
 @click="editContract(item)" 
 class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-icon-default)] hover:text-[var(--sys-brand-solid)] hover:border-[var(--sys-brand-solid)] hover:shadow-md active:scale-95"
 title="Chỉnh sửa"
 >
 <span class="material-symbols-outlined text-[18px]">edit_note</span>
 </button>
 <button 
 @click="extendContract(item)" 
 class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-icon-default)] hover:text-[var(--sys-success-text)] hover:border-[var(--sys-success-border)] hover:shadow-md active:scale-95" 
 title="Gia hạn"
 >
 <span class="material-symbols-outlined text-[18px]">history_edu</span>
 </button>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>
 <div class="px-12 py-8 bg-[var(--sys-bg-page)]/30 border-t border-[var(--sys-border-subtle)] flex justify-end">
 <button class="group/more text-[var(--sys-brand-solid)] text-[10px] font-semibold hover:opacity-80 transition-all flex items-center gap-4 active:scale-95 bg-transparent border-0 outline-none">
 Truy xuất kho lưu trữ hợp đồng bảo mật 
 <div class="w-10 h-10 rounded-full bg-[var(--sys-brand-soft)] flex items-center justify-center border border-[var(--sys-brand-border)] group-hover/more:translate-x-2 transition-transform">
 <span class="material-symbols-outlined text-xl">arrow_right_alt</span>
 </div>
 </button>
 </div>
 </div>
 </div>

 <!-- Modal System -->
 <Teleport to="body">
 <Transition
 enter-active-class="transition ease-out duration-300"
 enter-from-class="opacity-0 scale-95 translate-y-8 blur-lg"
 enter-to-class="opacity-100 scale-100 translate-y-0 blur-0"
 leave-active-class="transition ease-in duration-200"
 leave-from-class="opacity-100 scale-100 translate-y-0 blur-0"
 leave-to-class="opacity-0 scale-95 translate-y-8 blur-lg"
 >
 <div v-if="showModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
 <div class="fixed inset-0 w-screen h-screen bg-black/60 z-[9999] backdrop-blur-xl" @click="closeModal"></div>
 <div class="relative z-[10000] bg-[var(--sys-bg-surface-elevated)] border border-[var(--sys-border-subtle)] w-full max-w-4xl rounded-[3.5rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col transform transition-all text-left">
 <!-- Modal Header -->
 <div class="px-12 py-10 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-transparent">
 <div class="text-left bg-transparent">
 <h3 class="text-2xl font-semibold text-[var(--sys-text-primary)] m-0">{{ editMode ? 'Hiệu chỉnh Điều khoản Pháp lý' : 'Khởi tạo Dự thảo Hợp đồng' }}</h3>
 <p class="text-[10px] text-[var(--sys-text-secondary)] font-semibold mt-3 opacity-40 ">Đảm bảo tuân thủ các quy định về Luật Lao động và bảo mật thông tin</p>
 </div>
 <button @click="closeModal" class="w-14 h-14 flex items-center justify-center rounded-[1.5rem] bg-[var(--sys-bg-hover)] hover:text-[var(--sys-brand-solid)] border border-[var(--sys-border-subtle)] transition-all shadow-sm active:scale-95">
 <span class="material-symbols-outlined text-2xl">close</span>
 </button>
 </div>

 <!-- Modal Body -->
 <div class="p-12 md:p-14 space-y-12 custom-scrollbar max-h-[75vh] overflow-y-auto bg-transparent">
 <div class="space-y-4 text-left">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-4 opacity-100 block">Chủ thể Nhân sự Thụ hưởng *</label>
 <div class="relative group bg-transparent text-left outline-none">
 <span class="absolute left-8 top-1/2 -translate-y-1/2 material-symbols-outlined text-[var(--sys-brand-solid)] text-2xl opacity-40">person_search</span>
 <input v-model="form.employee_name" type="text" placeholder="Tìm kiếm mã NV hoặc họ tên..." class="w-full pl-22 pr-8 py-5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-[1.5rem] text-[15px] font-semibold focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-inner outline-none placeholder:opacity-30">
 </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-2 gap-12 text-left bg-transparent">
 <div class="space-y-4 text-left">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-4 opacity-100 block">Danh mục Hợp đồng Lao động *</label>
 <Dropdown 
 v-model="form.contract_type"
 :options="contractTypeOptions"
 class="w-full"
 />
 </div>
 <div class="space-y-4 text-left">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-4 opacity-100 block">Số hiệu Hợp đồng Định danh *</label>
 <input v-model="form.contract_no" type="text" placeholder="HD2023-XXXX" class="w-full px-8 py-5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-[1.5rem] text-sm font-semibold focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-inner outline-none">
 </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-2 gap-12 text-left bg-transparent">
 <div class="space-y-4 text-left">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-4 opacity-100 block">Ngày xác lập văn bản *</label>
 <input v-model="form.sign_date" type="date" class="w-full px-8 py-5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-[1.5rem] text-sm font-semibold focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-inner outline-none">
 </div>
 <div class="space-y-4 text-left">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-4 opacity-100 block">Ngày bắt đầu hiệu lực thực thi *</label>
 <input v-model="form.start_date" type="date" class="w-full px-8 py-5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-[1.5rem] text-sm font-semibold focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-inner outline-none">
 </div>
 </div>

 <div class="p-12 bg-gradient-to-br from-[var(--sys-brand-soft)] to-white rounded-[3rem] border border-[var(--sys-brand-solid)] border-dashed transition-all hover:scale-[1.01] shadow-2xl shadow-[var(--sys-brand-solid)]/5">
 <p class="text-[11px] font-semibold text-[var(--sys-brand-solid)] mb-4 opacity-60">Ước tính thời gian kết thúc hiệu lực</p>
 <div class="flex items-center gap-6">
 <div class="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-lg border border-[var(--sys-brand-border)]">
 <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-3xl">event_upcoming</span>
 </div>
 <p class="text-4xl font-semibold text-[var(--sys-brand-solid)] m-0">
 {{ calculateEndDate() || 'VÔ THỜI HẠN' }}
 </p>
 </div>
 </div>

 <div class="space-y-4 text-left">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-4 opacity-100 block">Định mức đãi ngộ thỏa thuận (VNĐ)</label>
 <div class="relative group bg-transparent">
 <span class="absolute left-8 top-1/2 -translate-y-1/2 text-lg font-semibold text-[var(--sys-brand-solid)] opacity-60">₫</span>
 <input v-model="form.salary" type="number" placeholder="20.000.000" class="w-full pl-16 pr-8 py-5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-[1.5rem] text-[15px] font-semibold focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-inner outline-none">
 </div>
 </div>
 </div>

 <!-- Modal Fixed Footer -->
 <div class="px-12 py-10 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface-elevated)] flex justify-end gap-6">
 <button @click="closeModal" class="px-12 py-5 text-[10px] font-semibold text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] transition-all active:scale-95 bg-transparent border-none">Hủy bỏ tiến trình</button>
 <button @click="handleSave" class="px-16 py-5 bg-[var(--sys-brand-solid)] text-white rounded-[1.8rem] text-[10px] font-semibold hover:bg-[var(--sys-brand-hover)] shadow-2xl shadow-[var(--sys-brand-solid)]/30 transition-all flex items-center gap-4 active:scale-95 border-none">
 <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'wght' 700;">verified</span>
 {{ editMode ? 'Xác nhận Gia hạn Pháp lý Connect' : 'Phê chuẩn Soạn thảo Hợp đồng' }}
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
const editMode = ref(false);
const searchQuery = ref('');
const filterStatus = ref('ALL');

const statusOptions = [
 { label: 'Mọi trạng thái', value: 'ALL' },
 { label: 'Đang hiệu lực', value: 'ĐANG_HIỆU_LỰC' },
 { label: 'Sắp hết hạn', value: 'SẮP_HẾT_HẠN' },
 { label: 'Đã thanh lý', value: 'ĐÃ_THANH_LÝ' }
];

const contractTypeOptions = [
 { label: 'Hợp đồng Thử việc (02 tháng)', value: 'THỬ_VIỆC' },
 { label: 'Xác định thời hạn (01 năm)', value: 'XÁC_ĐỊNH_THỜI_HẠN_1_NĂM' },
 { label: 'Xác định thời hạn (03 năm)', value: 'XÁC_ĐỊNH_THỜI_HẠN_3_NĂM' },
 { label: 'Hợp đồng Không xác định thời hạn', value: 'KHÔNG_XÁC_ĐỊNH_THỜI_HẠN' }
];

const contracts = ref([
 { id: 1, contract_no: 'HD-2023-1001', employee_name: 'Nguyễn Văn An', contract_type: 'THỬ_VIỆC', start_date: '10/10/2023', end_date: '10/12/2023', status: 'ĐANG_HIỆU_LỰC', salary: 15000000 },
 { id: 2, contract_no: 'HD-2022-0945', employee_name: 'Trần Thị Thu', contract_type: 'XÁC_ĐỊNH_THỜI_HẠN_1_NĂM', start_date: '01/01/2023', end_date: '01/01/2024', status: 'SẮP_HẾT_HẠN', salary: 25000000 },
 { id: 3, contract_no: 'HD-2021-0021', employee_name: 'Lê Quản Trị', contract_type: 'KHÔNG_XÁC_ĐỊNH_THỜI_HẠN', start_date: '01/01/2021', end_date: null, status: 'ĐANG_HIỆU_LỰC', salary: 45000000 }
]);

const filteredContracts = computed(() => {
 let list = contracts.value;
 if (filterStatus.value !== 'ALL') {
 list = list.filter(c => c.status === filterStatus.value);
 }
 if (searchQuery.value) {
 const q = searchQuery.value.toLowerCase();
 list = list.filter(c => 
 c.employee_name.toLowerCase().includes(q) || 
 c.contract_no.toLowerCase().includes(q)
 );
 }
 return list;
});

const contractStats = [
 { label: 'Đang hiệu lực pháp lý', value: '185' },
 { label: 'Tiến trình thử việc', value: '24' },
 { label: 'Hợp đồng vô thời hạn', value: '120' },
 { label: 'Giao dịch vừa thanh lý', value: '15' }
];

const historyLogs = [
 { id: 1, content: 'Ký mới hợp đồng thử việc - NV An', user: 'Admin HR', time: '10:00 AM, 10/10/2023', icon: 'person_add', bg: 'bg-[var(--sys-brand-solid)] shadow-[var(--sys-brand-solid)]/40' },
 { id: 2, content: 'Phê chuẩn phụ lục lương - NV Thu', user: 'Lê Quản Trị', time: '02:30 PM, 15/09/2023', icon: 'payments', bg: 'bg-[var(--sys-warning-solid)] shadow-[var(--sys-warning-solid)]/40' },
 { id: 3, content: 'Tất toán thanh lý hợp đồng định danh', user: 'Lê Quản Trị', time: '09:00 AM, 01/09/2023', icon: 'gavel', bg: 'bg-[var(--sys-danger-solid)] shadow-[var(--sys-danger-solid)]/40' }
];

const expiringCount = computed(() => contracts.value.filter(c => c.status === 'SẮP_HẾT_HẠN').length);

const emptyForm = {
 id: null,
 employee_name: '',
 contract_no: '',
 contract_type: 'THỬ_VIỆC',
 sign_date: new Date().toISOString().substr(0, 10),
 start_date: new Date().toISOString().substr(0, 10),
 salary: 0,
 status: 'ĐANG_HIỆU_LỰC'
};

const form = ref({ ...emptyForm });

const openAddModal = () => {
 editMode.value = false;
 form.value = { ...emptyForm };
 form.value.contract_no = `HD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
 showModal.value = true;
};

const editContract = (item) => {
 editMode.value = true;
 form.value = { ...item };
 showModal.value = true;
};

const closeModal = () => {
 showModal.value = false;
};

const getStatusColor = (status) => {
 switch (status) {
 case 'ĐANG_HIỆU_LỰC': return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
 case 'SẮP_HẾT_HẠN': return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]';
 case 'ĐÃ_THANH_LÝ': return 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]';
 default: return 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border-[var(--sys-border-subtle)]';
 }
};

const getStatusDotColor = (status) => {
 switch (status) {
 case 'ĐANG_HIỆU_LỰC': return 'bg-[var(--sys-success-solid)]';
 case 'SẮP_HẾT_HẠN': return 'bg-[var(--sys-warning-solid)]';
 case 'ĐÃ_THANH_LÝ': return 'bg-[var(--sys-danger-solid)]';
 default: return 'bg-[var(--sys-icon-default)] opacity-40';
 }
};

const calculateEndDate = () => {
 if (!form.value.start_date || form.value.contract_type === 'KHÔNG_XÁC_ĐỊNH_THỜI_HẠN') return null;
 const start = new Date(form.value.start_date);
 let monthsToAdd = 0;
 if (form.value.contract_type === 'THỬ_VIỆC') monthsToAdd = 2;
 if (form.value.contract_type === 'XÁC_ĐỊNH_THỜI_HẠN_1_NĂM') monthsToAdd = 12;
 if (form.value.contract_type === 'XÁC_ĐỊNH_THỜI_HẠN_3_NĂM') monthsToAdd = 36;
 
 start.setMonth(start.getMonth() + monthsToAdd);
 return start.toLocaleDateString('vi-VN');
};

const handleSave = async () => {
 if (!form.value.employee_name || !form.value.contract_no) {
 await showAlert('Ràng buộc dữ liệu', 'Vui lòng xác định nhân viên và số hiệu hợp đồng để phê chuẩn!');
 return;
 }
 
 if (editMode.value) {
 const idx = contracts.value.findIndex(c => c.id === form.value.id);
 if (idx !== -1) {
 contracts.value[idx] = { ...form.value, end_date: calculateEndDate() };
 }
 } else {
 contracts.value.unshift({
 ...form.value,
 id: Date.now(),
 end_date: calculateEndDate()
 });
 }
 closeModal();
};

const extendContract = async (item) => {
 const ok = await showConfirm('Pháp lý nhân sự', `Khởi tạo quy trình gia hạn cho hợp đồng ${item.contract_no}? Phụ lục mới sẽ được kế thừa từ thông tin hiện tại.`);
 if (ok) {
 openAddModal();
 form.value.employee_name = item.employee_name;
 form.value.contract_type = 'XÁC_ĐỊNH_THỜI_HẠN_1_NĂM';
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
