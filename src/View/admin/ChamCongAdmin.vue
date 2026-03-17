<template>
 <div class="space-y-10 pb-10">
 <!-- Header -->
 <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-transparent text-left">
 <div class="bg-transparent text-left">
 <h1 class="text-3xl font-semibold text-[var(--sys-text-primary)] mb-1">Kiến trúc Chuyên cần</h1>
 <p class="text-[10px] text-[var(--sys-text-secondary)] font-semibold opacity-60">Trung tâm kiểm soát dữ liệu chấm công, phê duyệt định mức và tối ưu hóa nguồn lực.</p>
 </div>
 <div class="flex items-center gap-4 bg-transparent">
 <div class="hidden md:flex items-center gap-3 bg-[var(--sys-bg-surface)] px-6 py-3 rounded-2xl border border-[var(--sys-border-subtle)] shadow-sm">
 <span class="text-[var(--sys-text-secondary)] text-[10px] font-semibold opacity-40">Kỳ lương T10/2023</span>
 <span class="flex items-center gap-2 text-[var(--sys-success-text)] font-semibold text-[10px] ">
 <span class="w-2 h-2 rounded-full bg-[var(--sys-success-solid)] animate-pulse"></span>
 Đang mở
 </span>
 </div>
 <button class="px-8 py-3 bg-[var(--sys-warning-solid)] rounded-2xl font-semibold text-[10px] text-white hover:bg-[var(--sys-warning-hover)] active:scale-95 shadow-xl shadow-[var(--sys-warning-solid)]/20 transition-all flex items-center gap-3 ">
 <span class="material-symbols-outlined text-xl">lock_open</span> 
 Khóa bảng công
 </button>
 </div>
 </div>

 <!-- Stats Cards -->
 <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
 <div v-for="(stat, idx) in [
 { label: 'Tổng giờ OT tháng', value: '1,240', sub: '+12.5% so với tháng trước', unit: 'giờ', icon: 'timer', color: 'brand' },
 { label: 'Tỷ lệ chuyên cần', value: '98.5', sub: '+0.2% so với tháng trước', unit: '%', icon: 'verified_user', color: 'success' },
 { label: 'Vắng mặt hôm nay', value: '12', sub: '-5% so với trung bình tuần', unit: 'nhân sự', icon: 'person_off', color: 'danger' }
 ]" :key="idx" 
 class="bg-[var(--sys-bg-surface)] p-8 rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-500 group relative overflow-hidden">
 <div class="absolute top-0 right-0 w-40 h-40 bg-[var(--sys-brand-soft)] rounded-full -mr-20 -mt-20 opacity-0 group-hover:opacity-40 transition-all duration-700 blur-3xl"></div>
 <div class="flex justify-between items-start mb-10 relative z-10 bg-transparent">
 <div :class="`w-16 h-16 rounded-[1.5rem] flex items-center justify-center border transition-all shadow-lg ${
 stat.color === 'brand' ? 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)] group-hover:bg-[var(--sys-brand-solid)] group-hover:text-white' :
 stat.color === 'success' ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)] group-hover:bg-[var(--sys-success-solid)] group-hover:text-white' :
 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)] group-hover:bg-[var(--sys-danger-solid)] group-hover:text-white'
 }`">
 <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">{{ stat.icon }}</span>
 </div>
 <span :class="`px-4 py-2 rounded-xl text-[9px] font-semibold border shadow-sm transition-all group-hover:scale-110 ${
 stat.color === 'brand' ? 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)]' :
 stat.color === 'success' ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]' :
 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]'
 }`">{{ stat.sub.split(' ')[0] }}</span>
 </div>
 <div class="relative z-10 bg-transparent text-left">
 <p class="text-[10px] font-semibold text-[var(--sys-text-secondary)] mb-2.5 opacity-40">{{ stat.label }}</p>
 <div class="flex items-baseline gap-3 mb-2">
 <h2 class="text-4xl font-semibold text-[var(--sys-text-primary)] ">{{ stat.value }}</h2>
 <span class="text-xs font-semibold text-[var(--sys-text-secondary)] opacity-30 ">{{ stat.unit }}</span>
 </div>
 <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] opacity-30 ">{{ stat.sub }}</p>
 </div>
 </div>
 </div>

 <!-- Charts Row -->
 <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
 <div class="lg:col-span-7">
 <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] shadow-sm rounded-[3rem] p-10 h-full flex flex-col hover:border-[var(--sys-brand-solid)] hover:shadow-2xl transition-all duration-500 relative group/chart1">
 <div class="absolute inset-0 bg-gradient-to-br from-[var(--sys-brand-soft)]/20 to-transparent opacity-0 group-hover/chart1:opacity-100 transition-opacity rounded-[3rem]"></div>
 <h5 class="text-base font-semibold text-[var(--sys-text-primary)] flex items-center gap-4 mb-12 relative z-10">
 <div class="w-10 h-10 rounded-xl bg-[var(--sys-brand-soft)] flex items-center justify-center">
 <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-2xl font-normal">analytics</span>
 </div>
 Phân bổ giờ OT theo Khối vận hành
 </h5>
 <div class="flex items-end justify-around flex-grow-1 pt-4 pb-10 px-4 bg-transparent relative border-b border-[var(--sys-border-subtle)] z-10" style="min-height: 280px;">
 <div v-for="dept in ['IT', 'HR', 'Sales', 'MKT', 'Ops']" :key="dept" class="flex flex-col items-center gap-6 w-full bg-transparent group/bar">
 <div class="bg-[var(--sys-bg-hover)] rounded-t-2xl w-14 relative overflow-hidden flex items-end shadow-inner border border-[var(--sys-border-subtle)]" style="height: 220px;">
 <div class="bg-gradient-to-t from-[var(--sys-brand-solid)] to-[var(--sys-brand-hover)] rounded-t-2xl w-full transition-all duration-1000 group-hover/bar:scale-x-110 shadow-xl shadow-[var(--sys-brand-solid)]/10" 
 :style="{ height: (Math.random() * 60 + 20) + '%' }"></div>
 </div>
 <span class="text-[10px] font-semibold text-[var(--sys-text-secondary)] opacity-40 ">{{ dept }}</span>
 </div>
 </div>
 </div>
 </div>
 <div class="lg:col-span-5">
 <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] shadow-sm rounded-[3rem] p-10 h-full flex flex-col hover:border-[var(--sys-brand-solid)] hover:shadow-2xl transition-all duration-500 relative group/early">
 <div class="absolute inset-0 bg-gradient-to-tr from-[var(--sys-success-soft)]/10 to-transparent opacity-0 group-hover/early:opacity-100 transition-opacity rounded-[3rem]"></div>
 <h5 class="text-base font-semibold text-[var(--sys-text-primary)] flex items-center gap-4 mb-12 relative z-10">
 <div class="w-10 h-10 rounded-xl bg-[var(--sys-success-soft)] flex items-center justify-center">
 <span class="material-symbols-outlined text-[var(--sys-success-text)] text-2xl font-normal">military_tech</span>
 </div>
 Cá nhân gương mẫu (Check-in sớm)
 </h5>
 <div class="flex flex-col gap-10 bg-transparent z-10 relative">
 <div v-for="user in topEarlyUsers" :key="user.name" class="flex flex-col gap-4 bg-transparent group/rank">
 <div class="flex justify-between items-center bg-transparent">
 <span class="text-xs font-semibold text-[var(--sys-text-primary)] group-hover/rank:text-[var(--sys-brand-solid)] transition-colors ">{{ user.name }}</span>
 <span class="text-[10px] font-semibold text-[var(--sys-success-text)] bg-[var(--sys-success-soft)] px-3 py-1 rounded-lg border border-[var(--sys-success-border)]">{{ user.earlyMinutes }} PHÚT</span>
 </div>
 <div class="h-2.5 bg-[var(--sys-bg-hover)] rounded-full overflow-hidden border border-[var(--sys-border-subtle)]">
 <div class="bg-gradient-to-r from-[var(--sys-success-solid)] to-emerald-400 h-full transition-all duration-1000 group-hover/rank:brightness-110 rounded-full shadow-lg shadow-[var(--sys-success-solid)]/10" 
 :style="{ width: user.percent + '%' }"></div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>

 <!-- Table -->
 <div class="bg-[var(--sys-bg-surface)] rounded-[3rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-500">
 <div class="px-10 py-10 border-b border-[var(--sys-border-subtle)] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 bg-[var(--sys-bg-page)]/30">
 <div class="text-left">
 <h5 class="text-base font-semibold text-[var(--sys-text-primary)] flex items-center gap-4 m-0">
 <div class="w-12 h-12 rounded-[1.2rem] bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center border border-[var(--sys-brand-border)]">
 <span class="material-symbols-outlined text-2xl">event_available</span>
 </div>
 Dữ liệu Chấm công Nhật trình
 </h5>
 <p class="text-[10px] font-semibold text-[var(--sys-text-secondary)] opacity-40 mt-2 ml-16">Truy xuất định danh thời gian thực từ hệ thống sinh trắc học</p>
 </div>
 <div class="flex flex-wrap items-center gap-6 w-full lg:w-auto">
 <div class="flex items-center gap-4 bg-[var(--sys-bg-surface)] px-6 h-14 rounded-2xl border border-[var(--sys-border-subtle)] shadow-sm focus-within:border-[var(--sys-brand-solid)] transition-all flex-1 min-w-[200px] group">
 <span class="material-symbols-outlined text-xl text-[var(--sys-text-secondary)] opacity-40 group-focus-within:text-[var(--sys-brand-solid)]">calendar_month</span>
 <input type="date" class="bg-transparent border-none text-[11px] font-semibold text-[var(--sys-text-primary)] focus:ring-0 outline-none w-full " value="2023-10-05">
 </div>
 <Dropdown 
 v-model="filterDept"
 :options="deptOptions"
 class="min-w-[190px]"
 />
 <Dropdown 
 v-model="filterStatus"
 :options="statusOptions"
 class="min-w-[190px]"
 />
 </div>
 </div>

 <div class="overflow-x-auto custom-scrollbar">
 <table class="min-w-max w-full text-left border-separate border-spacing-0">
 <thead>
 <tr>
 <th class="whitespace-nowrap px-12 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Phạm vi định danh</th>
 <th class="whitespace-nowrap px-6 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-center">Ghi nhận vào</th>
 <th class="whitespace-nowrap px-6 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-center">Ghi nhận ra</th>
 <th class="whitespace-nowrap px-6 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Vi phạm (-)</th>
 <th class="whitespace-nowrap px-6 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Về sớm (-)</th>
 <th class="whitespace-nowrap px-6 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Giờ OT (+)</th>
 <th class="whitespace-nowrap px-8 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-center">Định tính công</th>
 <th class="whitespace-nowrap px-12 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Thao tác</th>
 </tr>
 </thead>
 <tbody class="bg-transparent">
 <tr v-for="record in timeRecords" :key="record.id" 
 class="group transition-all duration-300 bg-transparent hover:bg-[var(--sys-bg-hover)]">
 <td class="whitespace-nowrap px-12 py-6 bg-transparent border-b border-[var(--sys-border-subtle)]">
 <div class="flex flex-col bg-transparent max-w-[220px]">
 <span class="text-sm font-semibold text-[var(--sys-text-primary)] mb-1 bg-transparent truncate ">{{ record.name }}</span>
 <span class="text-[10px] font-semibold text-[var(--sys-brand-solid)] bg-transparent opacity-60 truncate">{{ record.shift }}</span>
 </div>
 </td>
 <td class="whitespace-nowrap px-6 py-6 bg-transparent border-b border-[var(--sys-border-subtle)] text-center">
 <span class="text-sm font-semibold text-[var(--sys-text-primary)] ">{{ record.checkIn }}</span>
 </td>
 <td class="whitespace-nowrap px-6 py-6 bg-transparent border-b border-[var(--sys-border-subtle)] text-center">
 <span class="text-sm font-semibold text-[var(--sys-text-primary)] ">{{ record.checkOut }}</span>
 </td>
 <td class="whitespace-nowrap px-6 py-6 bg-transparent border-b border-[var(--sys-border-subtle)] text-right">
 <span :class="['text-sm font-semibold ', record.late > 0 ? 'text-[var(--sys-danger-text)]' : 'text-[var(--sys-text-secondary)] opacity-20']">
 {{ record.late > 0 ? record.late + ' PH' : '-' }}
 </span>
 </td>
 <td class="whitespace-nowrap px-6 py-6 bg-transparent border-b border-[var(--sys-border-subtle)] text-right">
 <span :class="['text-sm font-semibold ', record.early > 0 ? 'text-[var(--sys-warning-text)]' : 'text-[var(--sys-text-secondary)] opacity-20']">
 {{ record.early > 0 ? record.early + ' PH' : '-' }}
 </span>
 </td>
 <td class="whitespace-nowrap px-6 py-6 bg-transparent border-b border-[var(--sys-border-subtle)] text-right">
 <span :class="['text-sm font-semibold ', record.ot > 0 ? 'text-[var(--sys-brand-solid)]' : 'text-[var(--sys-text-secondary)] opacity-20']">
 {{ record.ot > 0 ? record.ot + ' H' : '-' }}
 </span>
 </td>
 <td class="whitespace-nowrap px-8 py-6 bg-transparent border-b border-[var(--sys-border-subtle)] text-center">
 <span :class="[
 'px-5 py-2 rounded-2xl text-[9px] font-semibold inline-flex items-center gap-2 border transition-all shadow-sm group-hover:scale-105',
 getStatusBadgeClass(record.statusText)
 ]">
 <span class="w-2 h-2 rounded-full" :class="getStatusDotClass(record.statusText)"></span>
 {{ record.statusText }}
 </span>
 </td>
 <td class="whitespace-nowrap px-12 py-6 text-right bg-transparent border-b border-[var(--sys-border-subtle)]">
 <button 
 class="w-12 h-12 rounded-2xl flex items-center justify-center transition-all bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-icon-default)] hover:text-[var(--sys-brand-solid)] hover:border-[var(--sys-brand-solid)] hover:shadow-2xl hover:shadow-[var(--sys-brand-solid)]/20 active:scale-95 ml-auto" 
 title="Hiệu chỉnh thủ công"
 >
 <span class="material-symbols-outlined text-2xl">history_edu</span>
 </button>
 </td>
 </tr>
 </tbody>
 </table>
 </div>
 <div class="px-12 py-8 bg-[var(--sys-bg-page)]/30 border-t border-[var(--sys-border-subtle)] flex justify-end">
 <button class="group/more text-[var(--sys-brand-solid)] text-[10px] font-semibold hover:opacity-80 transition-all flex items-center gap-4 active:scale-95 bg-transparent border-0 outline-none">
 Truy xuất toàn bộ nhật trình chuyên cần 
 <div class="w-10 h-10 rounded-full bg-[var(--sys-brand-soft)] flex items-center justify-center border border-[var(--sys-brand-border)] group-hover/more:translate-x-2 transition-transform">
 <span class="material-symbols-outlined text-xl">arrow_right_alt</span>
 </div>
 </button>
 </div>
 </div>
 </div>
</template>

<script setup>
import { ref } from 'vue';
import Dropdown from '@/components/Dropdown.vue';

const filterDept = ref('ALL');
const filterStatus = ref('ALL');

const deptOptions = [
 { label: 'Tất cả phòng ban', value: 'ALL' },
 { label: 'Phòng Kỹ thuật', value: 'IT' },
 { label: 'Phòng Nhân sự', value: 'HR' },
 { label: 'Phòng Kinh doanh', value: 'Sales' }
];

const statusOptions = [
 { label: 'Mọi trạng thái', value: 'ALL' },
 { label: 'Đúng giờ', value: 'NORMAL' },
 { label: 'Đi muộn', value: 'LATE' },
 { label: 'Vắng mặt', value: 'ABSENT' }
];

const getStatusBadgeClass = (status) => {
 switch (status) {
 case 'ĐỦ CÔNG': return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
 case 'ĐI MUỘN': return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]';
 case 'VẮNG MẶT': return 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]';
 default: return 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border-[var(--sys-border-subtle)]';
 }
};

const getStatusDotClass = (status) => {
 switch (status) {
 case 'ĐỦ CÔNG': return 'bg-[var(--sys-success-solid)]';
 case 'ĐI MUỘN': return 'bg-[var(--sys-warning-solid)]';
 case 'VẮNG MẶT': return 'bg-[var(--sys-danger-solid)]';
 default: return 'bg-[var(--sys-icon-default)]';
 }
};

const topEarlyUsers = ref([
 { name: 'Nguyễn Văn An', earlyMinutes: 45, percent: 85 },
 { name: 'Trần Thị Bích', earlyMinutes: 30, percent: 65 },
 { name: 'Lê Văn Cường', earlyMinutes: 20, percent: 45 },
 { name: 'Phạm Thành Đạt', earlyMinutes: 15, percent: 25 },
]);

const timeRecords = ref([
 { 
 id: 1, 
 name: 'Nguyễn Văn An', 
 shift: 'Ca Sáng (08:00-17:00)', 
 checkIn: '08:15', 
 checkOut: '17:05', 
 late: 15, 
 early: 0, 
 ot: 0, 
 statusText: 'ĐI MUỘN'
 },
 { 
 id: 2, 
 name: 'Trần Thị Bích', 
 shift: 'Ca Sáng (08:00-17:00)', 
 checkIn: '07:55', 
 checkOut: '18:30', 
 late: 0, 
 early: 0, 
 ot: 1.5, 
 statusText: 'ĐỦ CÔNG'
 },
 { 
 id: 3, 
 name: 'Lê Văn Cường', 
 shift: 'Ca Sáng (08:00-17:00)', 
 checkIn: '--:--', 
 checkOut: '--:--', 
 late: 0, 
 early: 0, 
 ot: 0, 
 statusText: 'VẮNG MẶT'
 }
]);
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
 height: 6px;
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
