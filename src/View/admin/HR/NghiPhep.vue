<template>
 <div class="space-y-8 pb-10">
 <!-- Header -->
 <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 bg-transparent text-left">
 <div class="bg-transparent text-left">
 <h1 class="text-2xl font-semibold text-[var(--sys-text-primary)] mb-1 ">Quản lý Phép & Nghỉ</h1>
 <p class="text-[10px] text-[var(--sys-text-secondary)] font-semibold opacity-60">Theo dõi định mức, phê duyệt yêu cầu nghỉ phép và điều phối nguồn lực nhân sự.</p>
 </div>
 <div class="bg-transparent text-right hidden xl:block">
 <div class="inline-flex items-center gap-4 bg-[var(--sys-bg-surface)] px-6 py-3 rounded-2xl border border-[var(--sys-border-subtle)] shadow-sm font-semibold text-[10px] text-[var(--sys-brand-solid)]">
 <span class="w-2 h-2 rounded-full bg-[var(--sys-brand-solid)] animate-pulse"></span>
 Resource Management Online
 </div>
 </div>
 </div>

 <!-- Main Content -->
 <div class="flex flex-col xl:flex-row gap-8 bg-transparent">
 <!-- Left List -->
 <div :class="activeRequest ? 'xl:w-2/3' : 'w-full'" class="transition-all duration-500 bg-transparent text-left">
 <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] shadow-sm rounded-[3rem] overflow-hidden flex flex-col min-h-[650px]">
 <!-- Tabs & Filters Row -->
 <div class="bg-[var(--sys-bg-page)]/20 border-b border-[var(--sys-border-subtle)] p-3 flex flex-col lg:flex-row items-center justify-between gap-4">
 <div class="flex items-center gap-2 bg-transparent overflow-x-auto no-scrollbar max-w-full">
 <button 
 v-for="tab in tabOptions" :key="tab.value"
 @click="activeTab = tab.value"
 :class="[
 'px-8 py-3 rounded-2xl text-[10px] font-semibold transition-all duration-300 whitespace-nowrap',
 activeTab === tab.value ? 'bg-white text-[var(--sys-brand-solid)] shadow-sm border border-[var(--sys-border-subtle)]' : 'text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] opacity-40 hover:opacity-100'
 ]"
 >
 {{ tab.label }} <span class="ml-2 opacity-40 font-semibold">({{ tab.count }})</span>
 </button>
 </div>
 
 <div class="flex items-center gap-3 w-full lg:w-auto pr-2">
 <div class="relative group flex-1 lg:w-64">
 <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-xl text-[var(--sys-text-secondary)] opacity-40 group-focus-within:text-[var(--sys-brand-solid)] transition-all">search_check</span>
 <input v-model="searchQuery" type="text" placeholder="Tìm kiếm nhanh đơn từ..." class="w-full h-11 pl-12 pr-6 bg-white border border-[var(--sys-border-subtle)] rounded-2xl text-[11px] font-semibold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-inner">
 </div>
 </div>
 </div>

 <!-- Quick Filters Bar -->
 <div class="px-8 py-4 bg-[var(--sys-bg-page)]/10 border-b border-[var(--sys-border-subtle)] flex flex-wrap items-center gap-4">
 <Dropdown v-model="filterDept" :options="deptOptions" class="min-w-[150px]" />
 <Dropdown v-model="filterRange" :options="rangeOptions" class="min-w-[150px]" />
 <button class="h-11 px-6 bg-[var(--sys-bg-surface)] text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)] rounded-xl font-semibold text-[9px] hover:border-[var(--sys-brand-solid)] hover:text-[var(--sys-brand-solid)] transition-all shadow-sm active:scale-95 ">
 Xử lý hàng loạt
 </button>
 </div>

 <!-- Table -->
 <div class="overflow-x-auto flex-grow bg-transparent custom-scrollbar ">
 <table class="min-w-max w-full text-left border-separate border-spacing-0 bg-transparent">
 <thead>
 <tr class="text-left bg-transparent">
 <th class="whitespace-nowrap px-10 py-5 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-white">Hồ sơ thụ hưởng</th>
 <th class="whitespace-nowrap px-8 py-5 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-white">Phân hệ</th>
 <th class="whitespace-nowrap px-8 py-5 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-white">Phân loại</th>
 <th class="whitespace-nowrap px-8 py-5 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-white">Chu kỳ nghỉ</th>
 <th class="whitespace-nowrap px-8 py-5 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-white text-center">Định lượng</th>
 <th class="whitespace-nowrap px-10 py-5 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-white">Xác thực</th>
 </tr>
 </thead>
 <tbody class="bg-transparent text-left">
 <tr v-for="req in filteredRequests" :key="req.id" @click="activeRequestId = req.id" 
 class="group cursor-pointer transition-all duration-300 bg-transparent text-left" 
 :class="activeRequestId === req.id ? 'bg-white' : 'hover:bg-[var(--sys-bg-hover)]'">
 <td class="whitespace-nowrap px-10 py-4 bg-transparent text-left border-b border-[var(--sys-border-subtle)]">
 <div class="flex flex-col bg-transparent text-left truncate max-w-[200px]">
 <span class="block text-sm font-semibold text-[var(--sys-text-primary)] mb-0.5 truncate">{{ req.name }}</span>
 <span class="block text-[9px] font-semibold text-[var(--sys-brand-solid)] opacity-60">MSNV: {{ req.msnv }}</span>
 </div>
 </td>
 <td class="whitespace-nowrap px-8 py-4 text-xs font-semibold text-[var(--sys-text-primary)] bg-transparent text-left border-b border-[var(--sys-border-subtle)] opacity-80">{{ req.department }}</td>
 <td class="whitespace-nowrap px-8 py-4 bg-transparent text-left border-b border-[var(--sys-border-subtle)]">
 <span :class="['px-3 py-1.5 rounded-xl text-[9px] font-semibold border transition-all shadow-sm', getLeaveTypeClass(req.type)]">{{ req.type }}</span>
 </td>
 <td class="whitespace-nowrap px-8 py-4 text-[11px] font-semibold text-[var(--sys-text-secondary)] bg-transparent text-left border-b border-[var(--sys-border-subtle)] opacity-40 ">{{ req.dateRange }}</td>
 <td class="whitespace-nowrap px-8 py-4 text-[11px] font-semibold text-[var(--sys-brand-solid)] text-center bg-transparent border-b border-[var(--sys-border-subtle)]">{{ req.days }} NGÀY</td>
 <td class="whitespace-nowrap px-10 py-4 bg-transparent text-left border-b border-[var(--sys-border-subtle)]">
 <div :class="[
 'px-4 py-1.5 rounded-xl text-[9px] font-semibold inline-flex items-center gap-2 border transition-all shadow-sm',
 getStatusBadgeClass(req.status)
 ]">
 <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(req.status)"></span>
 {{ req.statusText }}
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>

 <!-- Pagination -->
 <div class="bg-[var(--sys-bg-page)]/20 border-t border-[var(--sys-border-subtle)] px-10 py-6 flex justify-between items-center bg-transparent">
 <span class="text-[var(--sys-text-secondary)] text-[10px] font-semibold opacity-40">Phân trang thông tin thụ hưởng</span>
 <div class="flex gap-3 bg-transparent">
 <button class="w-10 h-10 flex items-center justify-center rounded-2xl bg-white text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)] hover:border-[var(--sys-brand-solid)] transition-all shadow-sm active:scale-95">
 <span class="material-symbols-outlined text-xl">keyboard_arrow_left</span>
 </button>
 <button class="px-6 h-10 flex items-center justify-center rounded-2xl bg-[var(--sys-brand-solid)] text-white text-[10px] font-semibold shadow-xl shadow-[var(--sys-brand-solid)]/20 transition-all border border-[var(--sys-brand-solid)] ">PAGE 01</button>
 <button class="w-10 h-10 flex items-center justify-center rounded-2xl bg-white text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)] hover:border-[var(--sys-brand-solid)] transition-all shadow-sm active:scale-95">
 <span class="material-symbols-outlined text-xl">keyboard_arrow_right</span>
 </button>
 </div>
 </div>
 </div>
 </div>

 <!-- Right Detail Panel -->
 <div v-show="activeRequest" class="xl:w-1/3 transition-all duration-500 bg-transparent text-left">
 <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] shadow-sm rounded-[3rem] overflow-hidden flex flex-col h-full min-h-[650px]" v-if="activeRequest">
 <div class="bg-[var(--sys-bg-page)]/20 border-b border-[var(--sys-border-subtle)] px-10 py-8 flex justify-between items-center text-left bg-transparent">
 <h6 class="text-[11px] font-semibold text-[var(--sys-text-primary)] bg-transparent">Thẩm định hồ sơ</h6>
 <button @click="activeRequestId = null" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-white text-[var(--sys-text-secondary)] hover:text-[var(--sys-brand-solid)] transition-all shadow-sm border border-[var(--sys-border-subtle)]">
 <span class="material-symbols-outlined text-2xl bg-transparent">close</span>
 </button>
 </div>
 
 <div class="p-10 flex-grow flex flex-col gap-10 bg-transparent text-left custom-scrollbar overflow-y-auto">
 <!-- User info -->
 <div class="p-8 rounded-[2rem] flex items-center gap-6 border border-[var(--sys-border-subtle)] shadow-inner group/user bg-[var(--sys-bg-page)]/30">
 <div class="w-16 h-16 rounded-[1.5rem] bg-white flex items-center justify-center shadow-lg border border-[var(--sys-border-subtle)] group-hover/user:scale-110 transition-transform">
 <span class="material-symbols-outlined text-3xl text-[var(--sys-brand-solid)] opacity-60">person_search</span>
 </div>
 <div class="flex flex-col bg-transparent text-left">
 <h6 class="text-lg font-semibold text-[var(--sys-text-primary)] mb-1 bg-transparent ">{{ activeRequest.name }}</h6>
 <span class="text-[10px] font-semibold text-[var(--sys-brand-solid)] bg-transparent opacity-60">{{ activeRequest.msnv }} — {{ activeRequest.role }}</span>
 </div>
 </div>

 <!-- Stats -->
 <div class="grid grid-cols-2 gap-8 px-2 bg-transparent text-left">
 <div class="bg-transparent text-left">
 <p class="text-[9px] font-semibold text-[var(--sys-text-secondary)] mb-2 opacity-40 text-left block">Phân loại vắng mặt</p>
 <span class="text-xs font-semibold text-[var(--sys-text-primary)] bg-transparent text-left block ">{{ activeRequest.typeDetail }}</span>
 </div>
 <div class="bg-transparent text-left">
 <p class="text-[9px] font-semibold text-[var(--sys-text-secondary)] mb-2 opacity-40 text-left block">Quyết toán định lượng</p>
 <span class="text-xs font-semibold text-[var(--sys-brand-solid)] bg-transparent text-left block ">{{ activeRequest.days }} NGÀY HỆ THỐNG</span>
 </div>
 </div>

 <div class="px-2 bg-transparent text-left">
 <p class="text-[9px] font-semibold text-[var(--sys-text-secondary)] mb-3 opacity-40 text-left block">Khung thời gian phê chuẩn</p>
 <div class="flex items-center gap-4 text-xs font-semibold text-[var(--sys-text-primary)] bg-transparent text-left ">
 <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-2xl opacity-40">calendar_clock</span>
 {{ activeRequest.fullDateRange }}
 </div>
 </div>

 <!-- Reason -->
 <div class="px-2 bg-transparent text-left">
 <p class="text-[9px] font-semibold text-[var(--sys-text-secondary)] mb-4 opacity-40 text-left block">Lý do trình đơn</p>
 <div class="bg-[var(--sys-bg-page)]/50 p-8 rounded-[2rem] border border-[var(--sys-border-subtle)] text-xs font-semibold text-[var(--sys-text-primary)] text-left shadow-inner leading-relaxed opacity-80">
 "{{ activeRequest.reason }}"
 </div>
 </div>

 <!-- Balance -->
 <div class="flex justify-between items-center p-6 rounded-[2rem] mt-2 mx-1 bg-[var(--sys-success-soft)] border border-[var(--sys-success-border)] text-left shadow-sm group/bal">
 <div class="flex items-center gap-4 text-[var(--sys-success-text)] font-semibold bg-transparent">
 <span class="material-symbols-outlined text-2xl opacity-60 group-hover/bal:rotate-12 transition-transform">account_balance_wallet</span>
 <span class="text-[9px] ">Hợp ngạch phép năm</span>
 </div>
 <span class="text-[10px] font-semibold text-[var(--sys-success-text)] opacity-60">Cơ số: {{ activeRequest.balance }} NGÀY</span>
 </div>

 <!-- Warnings -->
 <div v-if="activeRequest.warnings && activeRequest.warnings.length" class="p-8 rounded-[2.5rem] mt-2 mx-1 bg-[var(--sys-danger-soft)] border border-[var(--sys-danger-border)] text-left shadow-lg shadow-[var(--sys-danger-solid)]/5">
 <div class="flex items-center gap-4 mb-5 text-[var(--sys-danger-text)] font-semibold bg-transparent">
 <span class="material-symbols-outlined text-2xl">warning_amber</span>
 <span class="text-[10px] ">Cảnh báo xung đột vận hành</span>
 </div>
 <ul class="space-y-3 bg-transparent">
 <li v-for="(warn, idx) in activeRequest.warnings" :key="idx" class="text-[10px] font-semibold text-[var(--sys-danger-text)] flex items-start gap-4 bg-transparent text-left opacity-80 leading-relaxed">
 <span class="w-1.5 h-1.5 rounded-full bg-[var(--sys-danger-solid)] mt-1.5 shrink-0"></span>
 {{ warn }}
 </li>
 </ul>
 </div>

 <!-- Reject Reason Form -->
 <div v-if="activeRequest.status === 'pending'" class="mt-6 px-2 bg-transparent text-left">
 <p class="text-[9px] font-semibold text-[var(--sys-text-secondary)] mb-3 opacity-40 text-left block">Phản hồi bác bỏ (Tùy chọn)</p>
 <textarea class="w-full px-8 py-6 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-[2rem] text-xs font-semibold text-[var(--sys-text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all resize-none shadow-inner outline-none text-left" rows="4" placeholder="Cung cấp lý do cụ thể nếu bạn không phê chuẩn đơn này..."></textarea>
 </div>
 </div>

 <!-- Actions -->
 <div v-if="activeRequest.status === 'pending'" class="p-10 border-t border-[var(--sys-border-subtle)] flex gap-5 mt-auto bg-transparent">
 <button class="flex-1 px-8 py-4 bg-white text-[var(--sys-text-secondary)] hover:text-[var(--sys-danger-solid)] hover:bg-[var(--sys-danger-soft)] rounded-2xl text-[10px] font-semibold transition-all border border-[var(--sys-border-subtle)] active:scale-95">Từ chối</button>
 <button class="flex-1 px-10 py-4 bg-[var(--sys-brand-solid)] text-white rounded-2xl text-[10px] font-semibold hover:bg-[var(--sys-brand-hover)] shadow-2xl shadow-[var(--sys-brand-solid)]/20 transition-all flex items-center justify-center gap-4 active:scale-95 ">
 <span class="material-symbols-outlined text-xl">verified</span> 
 Phê chuẩn
 </button>
 </div>
 <div v-else class="p-10 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/20 text-center mt-auto">
 <span class="text-[10px] font-semibold text-[var(--sys-text-secondary)] opacity-40">Hồ sơ đã được lưu trữ ({{ activeRequest.statusText.toUpperCase() }})</span>
 </div>
 </div>
 </div>
 </div>
 </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Dropdown from '@/components/Dropdown.vue';

const filterDept = ref('ALL');
const filterRange = ref('month');
const activeTab = ref('all');
const searchQuery = ref('');

const tabOptions = [
 { label: 'Tất cả đơn từ', value: 'all', count: 42 },
 { label: 'Chờ thẩm định', value: 'pending', count: 12 },
 { label: 'Đã phê chuẩn', value: 'approved', count: 25 },
 { label: 'Bị từ chối', value: 'rejected', count: 5 },
];

const deptOptions = [
 { label: 'Phòng ban: Tất cả', value: 'ALL' },
 { label: 'Kỹ thuật Công nghệ', value: 'Kỹ thuật' },
 { label: 'Hành chính Nhân sự', value: 'Nhân sự' },
 { label: 'Marketing & Media', value: 'Marketing' }
];

const rangeOptions = [
 { label: 'Chu kỳ: Tháng này', value: 'month' },
 { label: 'Chu kỳ: Quý này', value: 'quarter' }
];

const requests = ref([
 {
 id: 1,
 name: 'Nguyễn Văn An',
 msnv: '202401',
 department: 'Kỹ thuật',
 role: 'Chuyên viên Phát triển Phần mềm',
 type: 'Nghỉ phép năm',
 typeDetail: 'Nghỉ phép thường niên',
 dateRange: '10/10 - 12/10/2024',
 fullDateRange: '10/10/2024 - 12/10/2024',
 days: 3,
 status: 'pending',
 statusText: 'Chờ duyệt',
 reason: 'Tôi có việc gia đình cấn giải quyết tại quê nhà, xin phép được quyết toán 3 ngày phép năm theo quy định. Tiến độ công việc hiện hành đã được bàn giao đầy đủ cho bộ phận kỹ thuật.',
 balance: 5,
 warnings: [
 'Trùng lịch trình vận hành hệ thống (11/10)',
 'Phòng ban hiện tại đã đạt ngưỡng 20% nhân sự vắng mặt'
 ]
 },
 {
 id: 2,
 name: 'Trần Thu Hà',
 msnv: '202405',
 department: 'Nhân sự',
 role: 'Chuyên viên Tuyển dụng',
 type: 'Nghỉ ốm',
 typeDetail: 'Nghỉ ốm / Khám bệnh',
 dateRange: '05/10 - 05/10/2024',
 fullDateRange: '05/10/2024 - 05/10/2024',
 days: 1,
 status: 'approved',
 statusText: 'Đã duyệt',
 reason: 'Tôi gặp sự cố về sức khỏe cấp tính, xin phép nghỉ 1 ngày có kèm theo hồ sơ chứng minh từ cơ sở y tế chuyên khoa.',
 balance: 10,
 warnings: []
 },
 {
 id: 3,
 name: 'Lê Minh',
 msnv: '202409',
 department: 'Marketing',
 role: 'Chuyên viên Content',
 type: 'Việc riêng',
 typeDetail: 'Nghỉ việc riêng không lương',
 dateRange: '12/10 - 13/10/2024',
 fullDateRange: '12/10/2024 - 13/10/2024',
 days: 2,
 status: 'rejected',
 statusText: 'Từ chối',
 reason: 'Giải quyết các kế hoạch du lịch cá nhân ngoài dự kiến cùng nhóm bạn.',
 balance: 7,
 warnings: [
 'Chiến dịch Marketing trọng điểm đang trong giai đoạn nước rút'
 ]
 }
]);

const activeRequestId = ref(1);

const activeRequest = computed(() => {
 return requests.value.find(r => r.id === activeRequestId.value) || null;
});

const filteredRequests = computed(() => {
 let list = requests.value;
 if (activeTab.value !== 'all') {
 list = list.filter(r => r.status === activeTab.value);
 }
 if (filterDept.value !== 'ALL') {
 list = list.filter(r => r.department === filterDept.value);
 }
 if (searchQuery.value) {
 const q = searchQuery.value.toLowerCase();
 list = list.filter(r => r.name.toLowerCase().includes(q) || r.msnv.toLowerCase().includes(q));
 }
 return list;
});

const getLeaveTypeClass = (type) => {
 if (type.includes('Nghỉ phép')) return 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)]';
 if (type.includes('ốm')) return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
 return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]';
};

const getStatusBadgeClass = (status) => {
 switch (status) {
 case 'approved': return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
 case 'pending': return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]';
 case 'rejected': return 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]';
 default: return 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border-[var(--sys-border-subtle)]';
 }
};

const getStatusDotClass = (status) => {
 switch (status) {
 case 'approved': return 'bg-[var(--sys-success-solid)]';
 case 'pending': return 'bg-[var(--sys-warning-solid)]';
 case 'rejected': return 'bg-[var(--sys-danger-solid)]';
 default: return 'bg-[var(--sys-icon-default)]';
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
.no-scrollbar::-webkit-scrollbar {
 display: none;
}
</style>
