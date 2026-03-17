<template>
 <div class="space-y-10 pb-10">
 <!-- Header -->
 <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 bg-transparent text-left">
 <div class="bg-transparent text-left">
 <h1 class="text-3xl font-semibold text-[var(--sys-text-primary)] mb-1">Kiến trúc Phê duyệt Hồ sơ</h1>
 <p class="text-xs text-[var(--sys-text-secondary)] font-medium opacity-60">Xử lý các yêu cầu nghỉ phép, tăng ca và công tác từ nhân sự toàn hệ thống.</p>
 </div>
 <div class="flex flex-col md:flex-row items-center gap-4 flex-1 w-full max-w-2xl">
 <!-- Search Bar -->
 <div class="relative flex-1 w-full group">
 <span class="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-xl text-[var(--sys-text-secondary)] opacity-40 group-focus-within:text-[var(--sys-brand-solid)] group-focus-within:opacity-100 transition-all">search</span>
 <input 
 v-model="searchQuery"
 type="text" 
 placeholder="Truy vấn tên hoặc mã nhân viên..." 
 class="w-full h-14 pl-16 pr-6 rounded-2xl bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[13px] font-semibold text-[var(--sys-text-primary)] focus:outline-none focus:border-[var(--sys-brand-solid)] transition-all shadow-sm"
 >
 </div>
 <div class="shrink-0 w-full md:w-auto">
 <Dropdown 
 v-model="filterType"
 :options="typeOptions"
 class="min-w-[170px]"
 />
 </div>
 </div>
 </div>

 <!-- Tabs -->
 <div class="flex items-center gap-3 bg-[var(--sys-bg-surface)] p-3 rounded-[2.5rem] w-fit border border-[var(--sys-border-subtle)] shadow-sm overflow-x-auto whitespace-nowrap max-w-full custom-scrollbar">
 <button 
 v-for="tab in tabs" 
 :key="tab.id"
 @click="activeTab = tab.id"
 :class="[
 'px-8 py-3 rounded-[2rem] text-[13px] font-semibold transition-all duration-300 flex items-center gap-3',
 activeTab === tab.id ? 'bg-[var(--sys-brand-solid)] text-white shadow-xl shadow-[var(--sys-brand-solid)]/20' : 'text-[var(--sys-text-secondary)] hover:bg-[var(--sys-bg-hover)]'
 ]"
 >
 {{ tab.label }}
 <span v-if="getTabCount(tab.id)" :class="[
 'px-2 py-0.5 rounded-full text-[10px] shadow-sm',
 activeTab === tab.id ? 'bg-white text-[var(--sys-brand-solid)] font-semibold' : 'bg-[var(--sys-danger-solid)] text-white font-semibold animate-pulse'
 ]">
 {{ getTabCount(tab.id) }}
 </span>
 </button>
 </div>

 <!-- Requests List -->
 <div class="grid grid-cols-1 gap-6">
 <transition-group name="list">
 <div v-for="request in filteredRequests" :key="request.id" 
 class="bg-[var(--sys-bg-surface)] p-10 rounded-[3rem] border border-[var(--sys-border-subtle)] shadow-sm hover:shadow-2xl hover:scale-[1.01] transition-all duration-500 flex flex-col xl:flex-row gap-10 items-start relative overflow-hidden group">
 
 <!-- Type Indicator Card -->
 <div :class="[
 'w-20 h-20 rounded-[2rem] flex items-center justify-center shrink-0 shadow-lg transition-all group-hover:scale-110 group-hover:rotate-3',
 request.typeColor
 ]">
 <span class="material-symbols-outlined text-4xl" style="font-variation-settings: 'FILL' 1;">{{ request.icon }}</span>
 </div>

 <div class="flex-1 space-y-6 w-full">
 <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
 <div class="text-left bg-transparent">
 <div class="flex items-center gap-4 mb-2 text-left bg-transparent">
 <span class="text-lg font-semibold text-[var(--sys-text-primary)] leading-none">{{ request.employeeName }}</span>
 <span class="text-[10px] text-[var(--sys-brand-solid)] font-semibold bg-[var(--sys-brand-soft)] border border-[var(--sys-brand-border)] px-2.5 py-1 rounded-lg">{{ request.employeeId }}</span>
 </div>
 <h4 class="text-sm font-semibold text-[var(--sys-text-secondary)] opacity-80">{{ request.title }}</h4>
 </div>
 
 <div class="flex items-center gap-4 text-left w-full lg:w-auto">
 <template v-if="request.status === 'pending'">
 <button @click="handleReject(request)" class="flex-1 lg:flex-none px-6 py-3 text-xs font-semibold text-[var(--sys-text-secondary)] hover:text-[var(--sys-danger-solid)] hover:bg-[var(--sys-danger-soft)] rounded-xl transition-all border border-[var(--sys-border-subtle)] active:scale-95">Từ chối</button>
 <button @click="handleApprove(request)" class="flex-1 lg:flex-none px-8 py-3 bg-[var(--sys-brand-solid)] text-white rounded-xl text-xs font-semibold hover:bg-[var(--sys-brand-hover)] shadow-xl shadow-[var(--sys-brand-solid)]/10 transition-all active:scale-95 flex items-center justify-center gap-2">
 <span class="material-symbols-outlined text-lg">verified</span>
 Phê duyệt
 </button>
 </template>
 <div v-else :class="[
 'px-4 py-2 rounded-xl text-[11px] font-semibold border flex items-center gap-2 transition-all shadow-sm whitespace-nowrap',
 request.status === 'approved' ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]' : 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]'
 ]">
 <span :class="['w-1.5 h-1.5 rounded-full', request.status === 'approved' ? 'bg-[var(--sys-success-solid)]' : 'bg-[var(--sys-danger-solid)]']"></span>
 {{ request.status === 'approved' ? 'Đã chấp thuận' : 'Đã từ chối' }}
 </div>
 </div>
 </div>

 <div class="flex flex-col xl:flex-row gap-8 py-6 border-t border-[var(--sys-border-subtle)] border-dashed">
   <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 lg:w-3/5 xl:w-[55%] whitespace-nowrap">
     <div class="bg-transparent text-left">
       <p class="text-[10px] font-semibold text-[var(--sys-text-secondary)] opacity-60 mb-2 uppercase">Khung thời gian</p>
       <div class="flex items-center gap-2">
         <span class="material-symbols-outlined text-[var(--sys-text-secondary)] text-[16px] opacity-60">calendar_month</span>
         <span class="text-[13px] font-semibold text-[var(--sys-text-primary)]">{{ request.dateRange }}</span>
       </div>
     </div>
     <div class="bg-transparent text-left">
       <p class="text-[10px] font-semibold text-[var(--sys-text-secondary)] opacity-60 mb-2 uppercase">Định lượng</p>
       <div class="flex items-center gap-2">
         <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-[16px] opacity-60">av_timer</span>
         <span class="text-[13px] font-semibold text-[var(--sys-brand-solid)]">{{ request.duration }}</span>
       </div>
     </div>
     <div class="bg-transparent text-left">
       <p class="text-[10px] font-semibold text-[var(--sys-text-secondary)] opacity-60 mb-2 uppercase">Khởi tạo</p>
       <div class="flex items-center gap-2">
         <span class="material-symbols-outlined text-[var(--sys-text-secondary)] text-[16px] opacity-60">history</span>
         <span class="text-[13px] font-semibold text-[var(--sys-text-primary)]">{{ request.createdAt }}</span>
       </div>
     </div>
     <div class="bg-transparent text-left">
       <p class="text-[10px] font-semibold text-[var(--sys-text-secondary)] opacity-60 mb-2 uppercase">Xác thực</p>
       <div class="flex items-center gap-2">
         <span class="material-symbols-outlined text-[var(--sys-success-text)] text-[16px] opacity-60">verified_user</span>
         <span class="text-[13px] font-semibold text-[var(--sys-success-text)]">Hệ thống bảo mật</span>
       </div>
     </div>
   </div>

   <div v-if="request.reason" class="flex-1 p-5 bg-[var(--sys-bg-page)] rounded-2xl border border-[var(--sys-border-subtle)] relative transition-all group-hover:shadow-sm flex items-start gap-3">
     <span class="material-symbols-outlined text-[var(--sys-text-secondary)] text-3xl opacity-30 mt-[-2px] leading-none">format_quote</span>
     <p class="text-xs text-[var(--sys-text-primary)] font-medium leading-relaxed text-left opacity-80 italic">{{ request.reason }}</p>
   </div>
 </div>
 </div>
 </div>
 </transition-group>
 
 <!-- Empty State -->
 <div v-if="filteredRequests.length === 0" class="flex flex-col items-center justify-center py-24 bg-[var(--sys-bg-page)]/30 rounded-[4rem] border border-[var(--sys-border-subtle)] border-dashed transition-all hover:bg-[var(--sys-bg-hover)]/40 pointer-events-none">
 <div class="w-20 h-20 bg-[var(--sys-bg-surface)] rounded-[2rem] border border-[var(--sys-border-subtle)] flex items-center justify-center shadow-xl mb-6 scale-110">
 <span class="material-symbols-outlined text-[var(--sys-text-secondary)] text-4xl opacity-20">inbox_customize</span>
 </div>
 <p class="text-xs font-semibold text-[var(--sys-text-secondary)] opacity-40">Danh sách hiện tại trống - Vui lòng kiểm tra lại sau</p>
 </div>
 </div>

 <!-- Modal Từ chối -->
 <Teleport to="body">
 <Transition
 enter-active-class="transition ease-out duration-300"
 enter-from-class="opacity-0 scale-95 translate-y-8"
 enter-to-class="opacity-100 scale-100 translate-y-0"
 leave-active-class="transition ease-in duration-200"
 leave-from-class="opacity-100 scale-100 translate-y-0"
 leave-to-class="opacity-0 scale-95 translate-y-8"
 >
 <div v-if="showRejectModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
 <div class="fixed inset-0 w-screen h-screen bg-black/60 z-[9999] backdrop-blur-md" @click="closeRejectModal"></div>
 <div class="relative z-[10000] bg-[var(--sys-bg-surface-elevated)] w-full max-w-xl rounded-[3.5rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col transform transition-all text-left border border-[var(--sys-border-subtle)]">
 <div class="px-10 py-8 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-transparent">
 <div class="text-left bg-transparent">
 <h3 class="text-2xl font-semibold text-[var(--sys-text-primary)] m-0">Xác nhận bác bỏ yêu cầu</h3>
 <p class="text-[10px] text-[var(--sys-text-secondary)] font-semibold mt-1 opacity-40 ">Phản hồi lý do cụ thể cho nhân viên thụ hưởng</p>
 </div>
 <button @click="closeRejectModal" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-[var(--sys-bg-hover)] hover:text-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)]">
 <span class="material-symbols-outlined text-2xl">close</span>
 </button>
 </div>

 <div class="p-10 space-y-6 bg-transparent">
 <div class="space-y-4 bg-transparent">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60 text-left block">Nội dung giải trình bác bỏ *</label>
 <textarea 
 v-model="rejectReason" 
 rows="6" 
 placeholder="VD: Hiện tại khối lượng vận hành đang cao, bạn vui lòng sắp xếp dời lịch nghỉ sang giai đoạn thấp điểm hơn..." 
 class="w-full px-8 py-6 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-[2.5rem] text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-[var(--sys-danger-solid)]/10 focus:border-[var(--sys-danger-solid)] transition-all text-left resize-none text-[var(--sys-text-primary)] shadow-inner"
 ></textarea>
 </div>
 </div>

 <div class="px-10 py-8 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface-elevated)] flex justify-end gap-5">
 <button @click="closeRejectModal" class="px-12 py-5 text-[10px] font-semibold text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] transition-all active:scale-95 bg-transparent border-none">Hủy bỏ</button>
 <button @click="confirmReject" class="px-16 py-5 bg-[var(--sys-danger-solid)] text-white rounded-[1.8rem] text-[10px] font-semibold hover:bg-[var(--sys-danger-hover)] shadow-2xl shadow-[var(--sys-danger-solid)]/30 transition-all flex items-center gap-4 active:scale-95 border-none">
 <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'wght' 600;">cancel</span>
 Bác bỏ hồ sơ chính thức
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

const { showAlert } = useConfirm();

const activeTab = ref('pending');
const searchQuery = ref('');
const filterType = ref('ALL');
const showRejectModal = ref(false);
const rejectReason = ref('');
const selectedRequest = ref(null);

const typeOptions = [
 { label: 'Tất cả loại đơn', value: 'ALL' },
 { label: 'Nghỉ phép', value: 'event_busy' },
 { label: 'Tăng ca (OT)', value: 'schedule' },
 { label: 'Công tác', value: 'flight' }
];

const tabs = ref([
 { id: 'pending', label: 'Chờ phê duyệt' },
 { id: 'approved', label: 'Lịch sử đã duyệt' },
 { id: 'rejected', label: 'Đã từ chối' },
]);

const requests = ref([
 { 
 id: 1, 
 employeeName: 'Nguyễn Văn An', 
 employeeId: 'EMP-1001', 
 title: 'Đơn xin nghỉ phép năm', 
 icon: 'event_busy', 
 typeColor: 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border border-[var(--sys-warning-border)]',
 dateRange: '20/11 - 22/11/2023',
 duration: '03 NGÀY',
 createdAt: 'Hôm nay, 08:30',
 reason: 'Giải quyết công việc cá nhân tại địa phương. Tôi đã bàn giao công việc vận hành cho bộ phận liên quan.',
 status: 'pending'
 },
 { 
 id: 2, 
 employeeName: 'Trần Thị Thu', 
 employeeId: 'EMP-1042', 
 title: 'Đăng ký làm thêm giờ (OT)', 
 icon: 'schedule', 
 typeColor: 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border border-[var(--sys-brand-border)]',
 dateRange: '18/11/2023',
 duration: '04 GIỜ (18:00 - 22:00)',
 createdAt: 'Hôm qua, 17:15',
 reason: 'Xử lý hoàn thiện báo cáo quyết toán dự án ERP giai đoạn 1 theo tiến độ cam kết với chủ đầu tư.',
 status: 'pending'
 },
 { 
 id: 3, 
 employeeName: 'Lê Quản Trị', 
 employeeId: 'EMP-1005', 
 title: 'Yêu cầu đi công tác', 
 icon: 'flight', 
 typeColor: 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border border-[var(--sys-success-border)]',
 dateRange: '25/11 - 28/11/2023',
 duration: '04 NGÀY (HA NOI OFFICE)',
 createdAt: '15/11/2023',
 reason: 'Tham dự sự kiện kết nối đối tác chiến lược và kiểm tra tiến độ triển khai hạ tầng tại chi nhánh miền Bắc.',
 status: 'pending'
 }
]);

const filteredRequests = computed(() => {
 let list = requests.value.filter(r => r.status === activeTab.value);
 
 if (filterType.value !== 'ALL') {
 list = list.filter(r => r.icon === filterType.value);
 }
 
 if (searchQuery.value) {
 const q = searchQuery.value.toLowerCase();
 list = list.filter(r => 
 r.employeeName.toLowerCase().includes(q) || 
 r.employeeId.toLowerCase().includes(q)
 );
 }
 
 return list;
});

const getTabCount = (id) => {
 return requests.value.filter(r => r.status === id).length;
};

const handleApprove = (request) => {
 request.status = 'approved';
};

const handleReject = (request) => {
 selectedRequest.value = request;
 showRejectModal.value = true;
};

const confirmReject = async () => {
 if (!rejectReason.value) {
 await showAlert('Ràng buộc dữ liệu', 'Vui lòng cung cấp lý do bác bỏ hồ sơ để thông báo cho nhân sự!');
 return;
 }
 if (selectedRequest.value) {
 selectedRequest.value.status = 'rejected';
 selectedRequest.value.reason = `[BÁC BỎ]: ${rejectReason.value} | [GỐC]: ${selectedRequest.value.reason}`;
 closeRejectModal();
 }
};

const closeRejectModal = () => {
 showRejectModal.value = false;
 rejectReason.value = '';
 selectedRequest.value = null;
};
</script>

<style scoped>
/* List Transitions */
.list-enter-active, .list-leave-active {
 transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.list-enter-from, .list-leave-to {
 opacity: 0;
 transform: translateY(30px) scale(0.95);
}

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
