<template>
 <div class="space-y-10 pb-10">
 <!-- Header Area -->
 <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-transparent text-left">
 <div class="bg-transparent text-left">
 <h1 class="text-3xl font-semibold text-[var(--sys-text-primary)] mb-1">Kiến trúc Quản trị</h1>
 <p class="text-[10px] text-[var(--sys-text-secondary)] font-semibold opacity-60">Dữ liệu chiến lược cập nhật theo thời gian thực: Thứ Hai, 24 Tháng 5, 2024</p>
 </div>
 <div class="flex items-center gap-4 bg-transparent">
 <button class="h-12 px-6 bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-2xl flex items-center gap-3 text-[10px] font-semibold text-[var(--sys-text-primary)] hover:border-[var(--sys-brand-solid)] transition-all shadow-sm">
 <span class="material-symbols-outlined text-xl">calendar_month</span>
 30 Ngày Quy Mô
 </button>
 <button class="h-12 px-8 bg-[var(--sys-brand-solid)] text-white rounded-2xl flex items-center gap-3 text-[10px] font-semibold hover:bg-[var(--sys-brand-hover)] shadow-xl shadow-[var(--sys-brand-solid)]/20 transition-all active:scale-95">
 <span class="material-symbols-outlined text-xl">file_download</span>
 Xuất Báo Cáo CEO
 </button>
 </div>
 </div>

 <!-- 4 KPI Cards -->
 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
 <div v-for="(stat, idx) in [
 { label: 'Tổng lực lượng', value: '1,250', sub: 'Mục tiêu quý: 1,300', change: '+12%', icon: 'groups', color: 'brand' },
 { label: 'Tỷ lệ biến động', value: '2.4%', sub: 'Dưới ngưỡng trung bình', change: '-0.5%', icon: 'person_remove', color: 'warning' },
 { label: 'Chỉ số hài lòng', value: '88%', sub: 'Tăng mức gắn kết', change: '-2%', icon: 'sentiment_satisfied', color: 'danger' },
 { label: 'Hiệu suất chung', value: '92.5%', sub: 'Theo định chuẩn KPI', change: '+5%', icon: 'bolt', color: 'success' }
 ]" :key="idx" 
 class="bg-[var(--sys-bg-surface)] p-8 rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-500 group relative overflow-hidden">
 <div class="absolute top-0 right-0 w-40 h-40 bg-[var(--sys-brand-soft)] rounded-full -mr-20 -mt-20 opacity-0 group-hover:opacity-40 transition-all duration-700 blur-3xl"></div>
 <div class="flex justify-between items-start mb-10 relative z-10 bg-transparent">
 <div :class="`w-16 h-16 rounded-[1.5rem] flex items-center justify-center border transition-all shadow-lg ${
 stat.color === 'brand' ? 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)]' :
 stat.color === 'success' ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]' :
 stat.color === 'danger' ? 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]' :
 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]'
 }`">
 <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">{{ stat.icon }}</span>
 </div>
 <span :class="`px-4 py-2 rounded-xl text-[9px] font-semibold border shadow-sm transition-all group-hover:scale-110 ${
 stat.change.startsWith('+') ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]' : 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]'
 }`">{{ stat.change }}</span>
 </div>
 <div class="relative z-10 bg-transparent text-left">
 <p class="text-[10px] font-semibold text-[var(--sys-text-secondary)] mb-2.5 opacity-40">{{ stat.label }}</p>
 <h2 class="text-4xl font-semibold text-[var(--sys-text-primary)] mb-2">{{ stat.value }}</h2>
 <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] opacity-30 ">{{ stat.sub }}</p>
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
 <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-2xl font-normal">leaderboard</span>
 </div>
 Cơ cấu nhân sự theo cấp bậc
 </h5>
 <button class="w-10 h-10 rounded-xl bg-[var(--sys-bg-hover)] flex items-center justify-center text-[var(--sys-text-secondary)] hover:text-[var(--sys-brand-solid)] transition-all border border-[var(--sys-border-subtle)]">
 <span class="material-symbols-outlined text-xl">more_horiz</span>
 </button>
 </div>
 
 <div class="flex items-end justify-between flex-1 border-b border-[var(--sys-border-subtle)] pb-6 relative min-h-[300px] z-10 px-4">
 <div class="relative group/bar" v-for="(val, idx) in [60, 120, 180, 240, 90]" :key="idx">
 <div class="w-12 bg-gradient-to-t from-[var(--sys-brand-solid)] to-[var(--sys-brand-hover)] rounded-t-2xl transition-all group-hover/bar:scale-x-110 shadow-xl shadow-[var(--sys-brand-solid)]/10" :style="{ height: val + 'px' }"></div>
 </div>
 </div>

 <div class="flex justify-between pt-8 text-[9px] font-semibold text-[var(--sys-text-secondary)] opacity-40 z-10 px-2">
 <span class="w-12 text-center">Intern</span>
 <span class="w-12 text-center">Junior</span>
 <span class="w-12 text-center">Senior</span>
 <span class="w-12 text-center">Manager</span>
 <span class="w-12 text-center">Director</span>
 </div>
 </div>

 <div class="bg-[var(--sys-bg-surface)] p-10 rounded-[3rem] border border-[var(--sys-border-subtle)] shadow-sm flex flex-col hover:border-[var(--sys-brand-solid)] transition-all duration-500 relative group/donut">
 <div class="absolute inset-0 bg-gradient-to-tr from-[var(--sys-success-soft)]/10 to-transparent opacity-0 group-hover/donut:opacity-100 transition-opacity rounded-[3rem]"></div>
 <div class="flex justify-between items-center mb-12 relative z-10">
 <h5 class="text-base font-semibold text-[var(--sys-text-primary)] flex items-center gap-4 m-0">
 <div class="w-10 h-10 rounded-xl bg-[var(--sys-success-soft)] flex items-center justify-center">
 <span class="material-symbols-outlined text-[var(--sys-success-text)] text-2xl font-normal">query_stats</span>
 </div>
 Biến động nguồn lực (06 tháng)
 </h5>
 <div class="flex items-center gap-6 text-[9px] font-semibold text-[var(--sys-text-secondary)] opacity-60">
 <span class="flex items-center gap-2"><div class="w-2.5 h-2.5 rounded-full bg-[var(--sys-brand-solid)] shadow-lg shadow-[var(--sys-brand-solid)]/20"></div> Tuyển mới</span>
 <span class="flex items-center gap-2"><div class="w-2.5 h-2.5 rounded-full bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)]"></div> Nghỉ việc</span>
 </div>
 </div>
 
 <div class="flex-1 w-full relative mt-4 z-10 px-4">
 <svg class="w-full h-[200px]" viewBox="0 0 500 180" preserveAspectRatio="none">
 <defs>
 <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0%" stop-color="var(--sys-brand-solid)" stop-opacity="0.2" />
 <stop offset="100%" stop-color="var(--sys-brand-solid)" stop-opacity="0" />
 </linearGradient>
 </defs>
 <path class="transition-all duration-1000 ease-in-out" d="M 0 150 C 60 140 90 100 140 90 C 190 80 220 70 270 75 C 320 80 360 50 400 30 C 440 10 470 30 500 45 L 500 180 L 0 180 Z" fill="url(#curveGradient)" />
 <path class="transition-all duration-1000 ease-in-out" d="M 0 150 C 60 140 90 100 140 90 C 190 80 220 70 270 75 C 320 80 360 50 400 30 C 440 10 470 30 500 45" fill="none" stroke="var(--sys-brand-solid)" stroke-width="4" stroke-linecap="round" />
 <circle cx="140" cy="90" r="7" fill="white" stroke="var(--sys-brand-solid)" stroke-width="3" />
 <circle cx="270" cy="75" r="7" fill="white" stroke="var(--sys-brand-solid)" stroke-width="3" />
 <circle cx="400" cy="30" r="7" fill="white" stroke="var(--sys-brand-solid)" stroke-width="3" />
 </svg>
 </div>

 <div class="flex justify-between pt-6 text-[9px] font-semibold text-[var(--sys-text-secondary)] opacity-30 z-10 px-4">
 <span>Tháng 1</span>
 <span>Tháng 2</span>
 <span>Tháng 3</span>
 <span>Tháng 4</span>
 <span>Tháng 5</span>
 <span>Tháng 6</span>
 </div>
 </div>
 </div>

 <!-- Bottom Lists Row -->
 <div class="flex flex-col lg:flex-row gap-8">
 <!-- Top Performers -->
 <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] shadow-sm lg:w-3/5 rounded-[3rem] overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500">
 <div class="px-10 py-10 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-[var(--sys-bg-page)]/30">
 <h2 class="text-base font-semibold text-[var(--sys-text-primary)] flex items-center gap-4 m-0">
 <div class="w-12 h-12 rounded-[1.2rem] bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center border border-[var(--sys-brand-border)]">
 <span class="material-symbols-outlined text-2xl">workspace_premium</span>
 </div>
 Nhân sự ưu tú & Hiệu suất cao
 </h2>
 <button class="text-[10px] font-semibold text-[var(--sys-brand-solid)] hover:opacity-60 transition-all active:scale-95">Xem toàn bộ danh mục</button>
 </div>

 <div class="overflow-x-auto custom-scrollbar">
 <table class="min-w-max w-full text-left border-separate border-spacing-0">
 <thead>
 <tr class="bg-[var(--sys-bg-page)]/50">
 <th class="whitespace-nowrap px-10 py-5 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)]">Định danh nhân sự</th>
 <th class="whitespace-nowrap px-8 py-5 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)]">Chức danh chiến lược</th>
 <th class="whitespace-nowrap px-8 py-5 text-[10px] font-semibold text-[var(--sys-text-secondary)] text-center border-b border-[var(--sys-border-subtle)]">Hiệu suất</th>
 <th class="whitespace-nowrap px-10 py-5 text-[10px] font-semibold text-[var(--sys-text-secondary)] text-center border-b border-[var(--sys-border-subtle)]">Đánh giá định tính</th>
 </tr>
 </thead>
 <tbody class="divide-y divide-[var(--sys-border-subtle)]/10">
 <tr v-for="(emp, idx) in [
 { name: 'Lê Minh Anh', mail: 'minhanh.le@company.com', role: 'Head of Marketing', perf: 98, status: 'Excellent', color: 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)]', img: '5' },
 { name: 'Nguyễn Hoàng Nam', mail: 'nam.nguyen@company.com', role: 'CTO Cloud Service', perf: 95, status: 'High Potential', color: 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)]', img: '11' },
 { name: 'Trần Thu Hà', mail: 'ha.tran@company.com', role: 'HR Manager Lead', perf: 92, status: 'Top Talent', color: 'bg-[var(--sys-info-soft)] text-[var(--sys-info-text)]', img: '35' }
 ]" :key="idx" class="group hover:bg-[var(--sys-bg-hover)] transition-all">
 <td class="whitespace-nowrap px-10 py-6 border-b border-[var(--sys-border-subtle)]">
 <div class="flex items-center gap-4">
 <img :src="`https://i.pravatar.cc/150?img=${emp.img}`" class="w-12 h-12 rounded-2xl object-cover border-2 border-[var(--sys-border-subtle)] shadow-sm group-hover:scale-110 transition-transform" />
 <div>
 <p class="text-sm font-semibold text-[var(--sys-text-primary)] leading-tight ">{{ emp.name }}</p>
 <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] mt-1 opacity-40">{{ emp.mail }}</p>
 </div>
 </div>
 </td>
 <td class="whitespace-nowrap px-8 py-6 text-xs font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] opacity-60 ">{{ emp.role }}</td>
 <td class="whitespace-nowrap px-8 py-6 text-center border-b border-[var(--sys-border-subtle)] w-48">
 <span class="text-[11px] font-semibold text-[var(--sys-brand-solid)] mb-2 inline-block ">{{ emp.perf }}%</span>
 <div class="w-full h-1.5 bg-[var(--sys-bg-hover)] rounded-full overflow-hidden border border-[var(--sys-border-subtle)]">
 <div class="h-full bg-[var(--sys-brand-solid)] rounded-full shadow-[0_0_10px_var(--sys-brand-solid)]" :style="{ width: emp.perf + '%' }"></div>
 </div>
 </td>
 <td class="whitespace-nowrap px-10 py-6 text-center border-b border-[var(--sys-border-subtle)]">
 <span :class="`inline-flex items-center px-4 py-1.5 rounded-xl text-[9px] font-semibold shadow-sm border border-transparent group-hover:border-current transition-all ${emp.color}`">
 {{ emp.status }}
 </span>
 </td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 <!-- Department Rankings -->
 <div class="bg-[var(--sys-bg-surface)] rounded-[3rem] border border-[var(--sys-border-subtle)] shadow-sm lg:w-2/5 p-10 flex flex-col hover:shadow-2xl transition-all duration-500">
 <h2 class="text-base font-semibold text-[var(--sys-text-primary)] flex items-center gap-4 m-0 mb-10">
 <div class="w-10 h-10 rounded-xl bg-[var(--sys-info-soft)] text-[var(--sys-info-text)] flex items-center justify-center">
 <span class="material-symbols-outlined text-2xl">analytics</span>
 </div>
 Xếp hạng năng lực tổ chức
 </h2>
 
 <div class="flex flex-col flex-1 justify-between gap-10">
 <div v-for="(dept, idx) in [
 { name: 'Công nghệ (IT & Cloud)', val: 96.8, note: 'Dẫn đầu hiệu suất KPI', trend: 'up' },
 { name: 'Phát triển Kinh doanh', val: 94.2, note: 'Vượt chỉ tiêu doanh thu 15%', trend: 'up' },
 { name: 'Quản trị Nhân sự (HR)', val: 89.5, note: 'Số hóa quy trình vận hành', trend: 'neutral' },
 { name: 'Tài chính - Kế toán', val: 82.0, note: 'Tối ưu hóa dòng tiền', trend: 'down' }
 ]" :key="idx" class="group/rank">
 <div class="flex justify-between items-end mb-3">
 <span class="text-xs font-semibold text-[var(--sys-text-primary)] group-hover/rank:text-[var(--sys-brand-solid)] transition-all">{{ dept.name }}</span>
 <span class="text-base font-semibold text-[var(--sys-brand-solid)] ">{{ dept.val }}%</span>
 </div>
 <div class="w-full h-2 bg-[var(--sys-bg-hover)] rounded-full overflow-hidden mb-3 border border-[var(--sys-border-subtle)] group-hover/rank:scale-y-125 transition-all">
 <div class="h-full bg-[var(--sys-brand-solid)] rounded-full transition-all duration-1000 shadow-lg" :style="{ width: dept.val + '%' }"></div>
 </div>
 <div class="flex justify-between items-center text-[10px] font-semibold text-[var(--sys-text-secondary)] opacity-40">
 <span>{{ dept.note }}</span>
 <span class="material-symbols-outlined text-base" :class="dept.trend === 'up' ? 'text-[var(--sys-success-text)]' : dept.trend === 'down' ? 'text-[var(--sys-danger-text)]' : 'opacity-0'">
 {{ dept.trend === 'up' ? 'trending_up' : 'trending_down' }}
 </span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
</template>

<script setup>
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
