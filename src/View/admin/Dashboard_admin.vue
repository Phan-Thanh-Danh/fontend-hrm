<template>
 <div class="space-y-10 pb-10">
 <!-- Header Area -->
 <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-transparent text-left">
 <div class="bg-transparent text-left">
 <h1 class="text-3xl font-semibold text-[var(--sys-text-primary)] mb-1">Kiến trúc Tổng quan</h1>
 <p class="text-[10px] text-[var(--sys-text-secondary)] font-semibold opacity-60">Trung tâm điều hành dữ liệu nhân sự, hiệu suất và biến động tổ chức thời gian thực.</p>
 </div>
 <div class="flex items-center gap-4 bg-transparent">
 <div class="hidden md:flex items-center gap-2 px-5 py-2.5 bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-2xl text-[var(--sys-text-primary)] text-[10px] font-semibold shadow-sm cursor-default ">
 <span class="w-1.5 h-1.5 rounded-full bg-[var(--sys-success-solid)] animate-pulse"></span>
 Hệ thống trực tuyến
 </div>
 <span class="hidden md:block bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] px-6 py-2.5 rounded-2xl font-semibold text-[10px] border border-[var(--sys-brand-border)] shadow-sm ">Admin Panel v2.5</span>
 </div>
 </div>

 <!-- Stats Cards -->
 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
 <div v-for="(stat, idx) in [
 { label: 'Tổng nhân viên', value: '1,250', sub: 'So với tháng trước', change: '+2.4%', icon: 'groups', color: 'brand' },
 { label: 'Nhân sự mới', value: '45', sub: 'Đang hoàn tất thủ tục', change: 'Tháng này', icon: 'person_add', color: 'success' },
 { label: 'Nhân viên nghỉ việc', value: '12', sub: 'Trong 30 ngày qua', change: '-12%', icon: 'person_remove', color: 'danger' },
 { label: 'Nghỉ phép chờ duyệt', value: '28', sub: 'Phê chuẩn ngay', change: 'Ưu tiên', icon: 'assignment_late', color: 'warning' }
 ]" :key="idx" 
 class="bg-[var(--sys-bg-surface)] p-8 rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-500 group relative overflow-hidden">
 <div class="absolute top-0 right-0 w-40 h-40 bg-[var(--sys-brand-soft)] rounded-full -mr-20 -mt-20 opacity-0 group-hover:opacity-40 transition-all duration-700 blur-3xl"></div>
 <div class="flex justify-between items-start mb-10 relative z-10 bg-transparent">
 <div :class="`w-16 h-16 rounded-[1.5rem] flex items-center justify-center border transition-all shadow-lg ${
 stat.color === 'brand' ? 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)] group-hover:bg-[var(--sys-brand-solid)] group-hover:text-white' :
 stat.color === 'success' ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)] group-hover:bg-[var(--sys-success-solid)] group-hover:text-white' :
 stat.color === 'danger' ? 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)] group-hover:bg-[var(--sys-danger-solid)] group-hover:text-white' :
 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)] group-hover:bg-[var(--sys-warning-solid)] group-hover:text-white'
 }`">
 <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">{{ stat.icon }}</span>
 </div>
 <span :class="`px-4 py-2 rounded-xl text-[9px] font-semibold border shadow-sm transition-all group-hover:scale-110 ${
 stat.color === 'brand' ? 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)]' :
 stat.color === 'success' ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]' :
 stat.color === 'danger' ? 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]' :
 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]'
 }`">{{ stat.change }}</span>
 </div>
 <div class="relative z-10 bg-transparent text-left">
 <p class="text-[10px] font-semibold text-[var(--sys-text-secondary)] mb-2.5 opacity-40">{{ stat.label }}</p>
 <h2 class="text-4xl font-semibold text-[var(--sys-text-primary)] mb-2">{{ stat.value }}</h2>
 <div class="flex items-center gap-2 bg-transparent">
 <span class="material-symbols-outlined text-sm text-[var(--sys-text-secondary)] opacity-30">update</span>
 <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] opacity-40">{{ stat.sub }}</p>
 </div>
 </div>
 </div>
 </div>

 <!-- Charts Section -->
 <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
 <div class="bg-[var(--sys-bg-surface)] p-10 rounded-[3rem] border border-[var(--sys-border-subtle)] shadow-sm flex flex-col hover:border-[var(--sys-brand-solid)] transition-all duration-500 relative group/chart-bg">
 <div class="absolute inset-0 bg-gradient-to-br from-[var(--sys-brand-soft)]/20 to-transparent opacity-0 group-hover/chart-bg:opacity-100 transition-opacity rounded-[3rem]"></div>
 <div class="flex justify-between items-center mb-12 relative z-10">
 <h5 class="text-base font-semibold text-[var(--sys-text-primary)] flex items-center gap-4 m-0">
 <div class="w-10 h-10 rounded-xl bg-[var(--sys-brand-soft)] flex items-center justify-center">
 <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-2xl font-normal">analytics</span>
 </div>
 Biến động nhân sự chiến lược
 </h5>
 <Dropdown 
 v-model="timeRange" 
 :options="timeRangeOptions" 
 class="min-w-[200px]"
 />
 </div>
 
 <div class="flex items-end justify-between flex-1 border-b border-[var(--sys-border-subtle)] pb-6 relative min-h-[300px] z-10">
 <div class="relative group/bar" v-for="i in 6" :key="i">
 <div class="flex gap-2.5 items-end mx-auto mb-4" style="height: 240px; width: 60px;">
 <div class="w-6 bg-[var(--sys-brand-solid)] rounded-t-2xl transition-all group-hover/bar:scale-x-110 shadow-xl shadow-[var(--sys-brand-solid)]/10" :style="{ height: Math.floor(Math.random() * 120 + 100) + 'px' }"></div>
 <div class="w-6 bg-[var(--sys-brand-soft)] rounded-t-2xl transition-all group-hover/bar:scale-x-110 border border-[var(--sys-brand-border)]" :style="{ height: Math.floor(Math.random() * 80 + 40) + 'px' }"></div>
 </div>
 </div>
 </div>
 <div class="flex justify-between pt-8 text-[10px] font-semibold text-[var(--sys-text-secondary)] opacity-30 z-10">
 <span>Quý I - T1</span>
 <span>T2</span>
 <span>T3</span>
 <span>Quý II - T4</span>
 <span>T5</span>
 <span>T6</span>
 </div>
 
 <div class="flex justify-center gap-10 mt-12 z-10">
 <div class="flex items-center gap-3">
 <div class="w-3 h-3 rounded-full bg-[var(--sys-brand-solid)] shadow-lg shadow-[var(--sys-brand-solid)]/20"></div>
 <span class="text-[10px] font-semibold text-[var(--sys-text-secondary)] opacity-60">Tuyển mới chiến lược</span>
 </div>
 <div class="flex items-center gap-3">
 <div class="w-3 h-3 rounded-full bg-[var(--sys-brand-soft)] border border-[var(--sys-brand-border)]"></div>
 <span class="text-[10px] font-semibold text-[var(--sys-text-secondary)] opacity-60">Thỏa thuận nghỉ việc</span>
 </div>
 </div>
 </div>

 <div class="bg-[var(--sys-bg-surface)] p-10 rounded-[3rem] border border-[var(--sys-border-subtle)] shadow-sm flex flex-col hover:border-[var(--sys-brand-solid)] transition-all duration-500 relative group/donut">
 <div class="absolute inset-0 bg-gradient-to-tr from-[var(--sys-success-soft)]/10 to-transparent opacity-0 group-hover/donut:opacity-100 transition-opacity rounded-[3rem]"></div>
 <div class="flex justify-between items-center mb-12 relative z-10">
 <h5 class="text-base font-semibold text-[var(--sys-text-primary)] flex items-center gap-4 m-0">
 <div class="w-10 h-10 rounded-xl bg-[var(--sys-success-soft)] flex items-center justify-center">
 <span class="material-symbols-outlined text-[var(--sys-success-text)] text-2xl font-normal">pie_chart</span>
 </div>
 Phân bổ nguồn lực hệ thống
 </h5>
 <button class="text-[10px] font-semibold text-[var(--sys-brand-solid)] hover:opacity-60 transition-all flex items-center gap-3 bg-[var(--sys-brand-soft)] px-5 py-2 rounded-full border border-[var(--sys-brand-border)]">
 Thống kê chi tiết <span class="material-symbols-outlined text-lg">arrow_forward_ios</span>
 </button>
 </div>

 <div class="flex-1 flex flex-col gap-8 relative z-10">
 <div v-for="(dept, idx) in ['Khối Kỹ thuật Cloud', 'Phát triển Kinh doanh', 'Marketing & Sáng tạo', 'Quản trị Nhân sự', 'Tài chính - Kế toán']" :key="idx" class="group/bar-item">
 <div class="flex justify-between mb-3 items-end">
 <span class="text-xs font-semibold text-[var(--sys-text-primary)] group-hover/bar-item:text-[var(--sys-brand-solid)] transition-colors ">{{ dept }}</span>
 <div class="flex items-center gap-3">
 <span class="text-[9px] font-semibold text-[var(--sys-brand-solid)] opacity-40 ">{{ Math.round([60, 45, 25, 15, 20][idx] * 1250 / 100) }} NV</span>
 <span class="text-xs font-semibold text-[var(--sys-text-primary)] ">{{ [60, 45, 25, 15, 20][idx] }}%</span>
 </div>
 </div>
 <div class="h-4 bg-[var(--sys-bg-hover)] rounded-full overflow-hidden border border-[var(--sys-border-subtle)] p-0.5">
 <div class="h-full rounded-full transition-all duration-1000 group-hover/bar-item:brightness-110 shadow-sm" 
 :class="['bg-[var(--sys-brand-solid)]', 'bg-[var(--sys-success-solid)]', 'bg-[var(--sys-warning-solid)]', 'bg-indigo-400', 'bg-slate-400'][idx]"
 :style="{ width: [60, 45, 25, 15, 20][idx] + '%' }"></div>
 </div>
 </div>
 </div>
 </div>
 </div>

 <!-- Table Section -->
 <div class="bg-[var(--sys-bg-surface)] rounded-[3rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-500">
 <div class="px-10 py-10 border-b border-[var(--sys-border-subtle)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-[var(--sys-bg-page)]/30">
 <div class="text-left">
 <h5 class="text-base font-semibold text-[var(--sys-text-primary)] flex items-center gap-4 m-0">
 <div class="w-12 h-12 rounded-[1.2rem] bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] flex items-center justify-center border border-[var(--sys-danger-border)]">
 <span class="material-symbols-outlined text-2xl font-normal">assignment_late</span>
 </div>
 Nhiệm vụ & Sự kiện ưu tiên
 </h5>
 <p class="text-[10px] font-semibold text-[var(--sys-text-secondary)] opacity-40 mt-2 ml-16">Các tiến trình cần phê chuẩn và can thiệp kịp thời</p>
 </div>
 <div class="flex bg-[var(--sys-bg-hover)] p-1.5 rounded-2xl border border-[var(--sys-border-subtle)] shadow-inner ml-16 sm:ml-0">
 <button class="px-8 py-2.5 bg-white shadow-xl rounded-xl text-[10px] font-semibold text-[var(--sys-brand-solid)] transition-all ">Tất cả luồng việc</button>
 <button class="px-8 py-2.5 rounded-xl text-[10px] font-semibold text-[var(--sys-text-secondary)] hover:text-[var(--sys-brand-solid)] transition-all opacity-60">Việc của tôi</button>
 </div>
 </div>
 
 <div class="overflow-x-auto custom-scrollbar">
 <table class="min-w-max w-full text-left border-separate border-spacing-0">
 <thead>
 <tr>
 <th class="whitespace-nowrap px-12 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Phạm vi tác động</th>
 <th class="whitespace-nowrap px-8 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Nội dung đề xuất</th>
 <th class="whitespace-nowrap px-8 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Thời hiệu</th>
 <th class="whitespace-nowrap px-8 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-center">Định tính</th>
 <th class="whitespace-nowrap px-12 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Thao tác</th>
 </tr>
 </thead>
 <tbody class="bg-transparent">
 <tr v-for="(item, idx) in [
 { name: 'Trần Lan Anh', role: 'UI/UX Designer', action: 'Phỏng vấn cấp Leader (Vòng 2)', time: 'Hôm nay, 14:00', status: 'Sắp diễn ra', statusClass: 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]', dotClass: 'bg-[var(--sys-warning-solid)]' },
 { name: 'Quang Huy', role: 'Kỹ thuật viên Cloud', action: 'Yêu cầu Nghỉ phép (03 ngày liên tục)', time: 'Gửi 2 giờ trước', status: 'Chờ phê chuẩn', statusClass: 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)]', dotClass: 'bg-[var(--sys-brand-solid)]' },
 { name: 'Nguyễn Bích Diệp', role: 'Kế toán trưởng', action: 'Phê duyệt Quyết toán Thuế Q1', time: 'Ngày mai, 09:00', status: 'Chờ giải quyết', statusClass: 'bg-[var(--sys-info-soft)] text-[var(--sys-info-text)] border-[var(--sys-info-border)]', dotClass: 'bg-[var(--sys-info-solid)]' }
 ]" :key="idx" class="group transition-all duration-300 bg-transparent hover:bg-[var(--sys-bg-hover)]">
 <td class="whitespace-nowrap px-12 py-6 bg-transparent border-b border-[var(--sys-border-subtle)]">
 <div class="flex flex-col bg-transparent max-w-[250px]">
 <span class="text-sm font-semibold text-[var(--sys-text-primary)] mb-1 bg-transparent truncate ">{{ item.name }}</span>
 <span class="text-[10px] font-semibold text-[var(--sys-brand-solid)] bg-transparent opacity-60">{{ item.role }}</span>
 </div>
 </td>
 <td class="whitespace-nowrap px-8 py-6 bg-transparent border-b border-[var(--sys-border-subtle)]">
 <div class="flex items-center gap-3 bg-transparent">
 <span class="w-1.5 h-1.5 rounded-full bg-[var(--sys-brand-solid)] opacity-40"></span>
 <span class="text-sm font-bold text-[var(--sys-text-primary)] bg-transparent whitespace-nowrap overflow-hidden text-ellipsis block max-w-[250px] ">{{ item.action }}</span>
 </div>
 </td>
 <td class="whitespace-nowrap px-8 py-6 text-xs font-semibold text-[var(--sys-text-secondary)] bg-transparent border-b border-[var(--sys-border-subtle)] opacity-40 ">{{ item.time }}</td>
 <td class="whitespace-nowrap px-8 py-6 bg-transparent border-b border-[var(--sys-border-subtle)] text-center">
 <span :class="`inline-flex items-center gap-2 px-5 py-2 rounded-2xl text-[9px] font-semibold border transition-all shadow-sm hover:scale-105 ${item.statusClass}`">
 <span :class="`w-2 h-2 rounded-full ${item.dotClass}`"></span>
 {{ item.status }}
 </span>
 </td>
 <td class="whitespace-nowrap px-12 py-6 text-right bg-transparent border-b border-[var(--sys-border-subtle)]">
 <button class="bg-[var(--sys-brand-solid)] hover:bg-[var(--sys-brand-hover)] hover:shadow-2xl hover:shadow-[var(--sys-brand-solid)]/20 text-white text-[9px] font-semibold px-8 py-3 rounded-2xl shadow-lg shadow-[var(--sys-brand-solid)]/10 transition-all active:scale-95 border border-[var(--sys-brand-border)]">Xử lý ngay</button>
 </td>
 </tr>
 </tbody>
 </table>
 </div>
 <div class="px-12 py-8 bg-[var(--sys-bg-page)]/30 border-t border-[var(--sys-border-subtle)] flex justify-end">
 <button class="group/more text-[var(--sys-brand-solid)] text-[10px] font-semibold hover:opacity-80 transition-all flex items-center gap-4 no-underline active:scale-95 bg-transparent border-0 outline-none">
 Truy xuất toàn bộ danh mục công vụ 
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

const timeRange = ref('6months');
const timeRangeOptions = [
 { label: '06 tháng gần nhất', icon: 'history', value: '6months' },
 { label: '01 năm quy mô tài chính', icon: 'calendar_today', value: '1year' },
 { label: 'Lịch sử toàn thời gian', icon: 'all_inclusive', value: 'all' }
];
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

/* Base fade animation */
.space-y-10 {
 animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
 from { opacity: 0; transform: translateY(20px); }
 to { opacity: 1; transform: translateY(0); }
}
</style>


