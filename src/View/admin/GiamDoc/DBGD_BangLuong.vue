<template>
 <div class="space-y-10 pb-10">
 <!-- Header -->
 <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-transparent text-left">
 <div class="bg-transparent text-left">
 <h1 class="text-3xl font-semibold text-[var(--sys-text-primary)] mb-1">Kiểm soát Quỹ lương</h1>
 <p class="text-[10px] text-[var(--sys-text-secondary)] font-semibold opacity-60">Báo cáo hợp nhất chi phí nhân sự, trợ cấp và khấu trừ ngân sách toàn tập đoàn.</p>
 </div>
 <div class="flex items-center gap-4 bg-transparent">
 <button class="h-12 px-6 bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-2xl flex items-center gap-3 text-[10px] font-semibold text-[var(--sys-text-primary)] hover:border-[var(--sys-brand-solid)] transition-all shadow-sm">
 <span class="material-symbols-outlined text-xl">calendar_month</span>
 Tháng 10, 2023
 </button>
 <button class="h-12 px-8 bg-[var(--sys-brand-solid)] text-white rounded-2xl flex items-center gap-3 text-[10px] font-semibold hover:bg-[var(--sys-brand-hover)] shadow-xl shadow-[var(--sys-brand-solid)]/20 transition-all active:scale-95">
 <span class="material-symbols-outlined text-xl">ios_share</span>
 Xuất báo cáo tài chính
 </button>
 </div>
 </div>

 <!-- 4 KPI Cards -->
 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
 <div v-for="(stat, idx) in [
 { label: 'Tổng quỹ chi phí', value: '5.280B', sub: 'vs tháng trước', change: '+2.5%', icon: 'payments', color: 'brand' },
 { label: 'Quỹ lương cơ bản', value: '4.150B', sub: 'vs tháng trước', change: '-1.2%', icon: 'account_balance_wallet', color: 'info' },
 { label: 'Thưởng & Phụ cấp', value: '850M', sub: 'vs tháng trước', change: '+5.8%', icon: 'redeem', color: 'success' },
 { label: 'Khấu trừ thuế/BH', value: '280M', sub: 'vs tháng trước', change: '+0.5%', icon: 'receipt_long', color: 'warning' }
 ]" :key="idx" 
 class="bg-[var(--sys-bg-surface)] p-8 rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-500 group relative overflow-hidden">
 <div class="absolute top-0 right-0 w-32 h-32 bg-[var(--sys-brand-soft)] rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-40 transition-all duration-700 blur-2xl"></div>
 <div class="flex justify-between items-start mb-10 relative z-10 bg-transparent">
 <div :class="`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all shadow-lg ${
 stat.color === 'brand' ? 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)]' :
 stat.color === 'success' ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]' :
 stat.color === 'warning' ? 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]' :
 'bg-[var(--sys-info-soft)] text-[var(--sys-info-text)] border-[var(--sys-info-border)]'
 }`">
 <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">{{ stat.icon }}</span>
 </div>
 <span :class="`px-3 py-1.5 rounded-xl text-[9px] font-semibold border ${
 stat.change.startsWith('+') ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]' : 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]'
 }`">{{ stat.change }}</span>
 </div>
 <div class="relative z-10 bg-transparent text-left">
 <p class="text-[10px] font-semibold text-[var(--sys-text-secondary)] mb-2 opacity-40">{{ stat.label }}</p>
 <h2 class="text-3xl font-semibold text-[var(--sys-text-primary)] mb-2">{{ stat.value }}</h2>
 <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] opacity-30 ">{{ stat.sub }}</p>
 </div>
 </div>
 </div>

 <!-- Charts Row -->
 <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
 <div class="bg-[var(--sys-bg-surface)] p-10 rounded-[3rem] border border-[var(--sys-border-subtle)] shadow-sm flex flex-col hover:border-[var(--sys-brand-solid)] transition-all duration-500 relative group/chart1">
 <div class="absolute inset-0 bg-gradient-to-br from-[var(--sys-brand-soft)]/20 to-transparent opacity-0 group-hover/chart1:opacity-100 transition-opacity rounded-[3rem]"></div>
 <div class="flex justify-between items-center mb-12 relative z-10">
 <h5 class="text-base font-semibold text-[var(--sys-text-primary)] flex items-center gap-4 m-0">
 <div class="w-10 h-10 rounded-xl bg-[var(--sys-brand-soft)] flex items-center justify-center">
 <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-2xl font-normal">hub</span>
 </div>
 Quỹ lương theo Khối vận hành
 </h5>
 <span class="text-[10px] font-semibold text-[var(--sys-text-secondary)] bg-[var(--sys-bg-hover)] px-4 py-2 rounded-xl opacity-60">Đơn vị: Tỷ VNĐ</span>
 </div>
 
 <div class="flex items-end justify-between flex-1 border-b border-[var(--sys-border-subtle)] pb-6 relative min-h-[280px] z-10 px-4">
 <div class="relative group/bar" v-for="(val, idx) in [180, 140, 90, 60, 40]" :key="idx">
 <div class="w-12 bg-gradient-to-t from-[var(--sys-brand-solid)] to-[var(--sys-brand-hover)] rounded-t-2xl transition-all group-hover/bar:scale-x-110 shadow-xl shadow-[var(--sys-brand-solid)]/10" :style="{ height: val + 'px' }"></div>
 </div>
 </div>

 <div class="flex justify-between pt-8 text-[9px] font-semibold text-[var(--sys-text-secondary)] opacity-40 z-10 px-2">
 <span class="w-12 text-center">Kỹ thuật</span>
 <span class="w-12 text-center">Kinh doanh</span>
 <span class="w-12 text-center">Marketing</span>
 <span class="w-12 text-center">Vận hành</span>
 <span class="w-12 text-center">Nhân sự</span>
 </div>
 </div>

 <div class="bg-[var(--sys-bg-surface)] p-10 rounded-[3rem] border border-[var(--sys-border-subtle)] shadow-sm flex flex-col hover:border-[var(--sys-brand-solid)] transition-all duration-500 relative group/chart2">
 <div class="absolute inset-0 bg-gradient-to-tr from-[var(--sys-info-soft)]/10 to-transparent opacity-0 group-hover/chart2:opacity-100 transition-opacity rounded-[3rem]"></div>
 <div class="flex justify-between items-center mb-12 relative z-10 bg-transparent text-left">
 <div class="bg-transparent text-left">
 <h5 class="text-base font-semibold text-[var(--sys-text-primary)] flex items-center gap-4 m-0">
 <div class="w-10 h-10 rounded-xl bg-[var(--sys-info-soft)] flex items-center justify-center">
 <span class="material-symbols-outlined text-[var(--sys-info-text)] text-2xl font-normal">timeline</span>
 </div>
 Xu hướng tăng trưởng 06 tháng
 </h5>
 <p class="text-[10px] font-semibold text-[var(--sys-text-secondary)] mt-2 ml-14 opacity-40">Trung bình đạt mức tăng 3.2% / kỳ</p>
 </div>
 <div class="flex items-center gap-4 text-[9px] font-semibold text-[var(--sys-text-secondary)] opacity-60">
 <span class="flex items-center gap-2"><div class="w-2.5 h-2.5 rounded-full bg-[var(--sys-brand-solid)]"></div> Quỹ lương</span>
 </div>
 </div>
 
 <div class="flex-1 w-full relative mt-4 z-10 px-4">
 <svg class="w-full h-[180px]" viewBox="0 0 500 160" preserveAspectRatio="none">
 <defs>
 <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0%" stop-color="var(--sys-brand-solid)" stop-opacity="0.2" />
 <stop offset="100%" stop-color="var(--sys-brand-solid)" stop-opacity="0" />
 </linearGradient>
 </defs>
 <path class="transition-all duration-1000 ease-in-out" d="M 0 130 C 50 100 100 100 150 120 C 200 140 220 120 270 90 C 320 60 350 20 400 40 C 450 60 480 140 500 100 L 500 160 L 0 160 Z" fill="url(#curveGradient)" />
 <path class="transition-all duration-1000 ease-in-out" d="M 0 130 C 50 100 100 100 150 120 C 200 140 220 120 270 90 C 320 60 350 20 400 40 C 450 60 480 140 500 100" fill="none" stroke="var(--sys-brand-solid)" stroke-width="4" stroke-linecap="round" />
 </svg>
 </div>

 <div class="flex justify-between pt-6 text-[9px] font-semibold text-[var(--sys-text-secondary)] opacity-30 z-10 px-4">
 <span>Tháng 5</span>
 <span>Tháng 6</span>
 <span>Tháng 7</span>
 <span>Tháng 8</span>
 <span>Tháng 9</span>
 <span>Tháng 10</span>
 </div>
 </div>
 </div>

 <!-- Bottom Table -->
 <div class="bg-[var(--sys-bg-surface)] rounded-[3rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-500">
 <div class="px-10 py-10 border-b border-[var(--sys-border-subtle)] flex flex-col sm:flex-row justify-between items-center gap-6 bg-[var(--sys-bg-page)]/30">
 <h2 class="text-base font-semibold text-[var(--sys-text-primary)] flex items-center gap-4 m-0">
 <div class="w-12 h-12 rounded-[1.2rem] bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center border border-[var(--sys-brand-border)]">
 <span class="material-symbols-outlined text-2xl">table_rows</span>
 </div>
 Cơ cấu chi phí định tính theo bộ phận
 </h2>
 
 <div class="relative w-full max-w-sm group">
 <span class="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-[var(--sys-text-secondary)] opacity-40 group-focus-within:text-[var(--sys-brand-solid)] transition-all">search</span>
 <input type="text" placeholder="Truy xuất dữ liệu bộ phận..." class="w-full h-12 pl-14 pr-6 py-4 rounded-2xl bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[10px] font-semibold text-[var(--sys-text-primary)] focus:outline-none focus:border-[var(--sys-brand-solid)] transition-all ">
 </div>
 </div>

 <div class="overflow-x-auto custom-scrollbar">
 <table class="min-w-max w-full text-left border-separate border-spacing-0">
 <thead>
 <tr>
 <th class="whitespace-nowrap px-12 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Phòng ban quản trị</th>
 <th class="whitespace-nowrap px-8 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-center">Định biên</th>
 <th class="whitespace-nowrap px-8 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Lương căn bản</th>
 <th class="whitespace-nowrap px-8 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Phụ cấp (+)</th>
 <th class="whitespace-nowrap px-12 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Hợp nhất chi phí</th>
 </tr>
 </thead>
 <tbody class="divide-y divide-[var(--sys-border-subtle)]/30">
 <tr v-for="(item, idx) in [
 { name: 'Khối Kỹ thuật Cloud', count: 120, base: '2.100B', bonus: '450M', total: '2.550B' },
 { name: 'Phát triển Kinh doanh', count: 85, base: '1.200B', bonus: '300M', total: '1.500B' },
 { name: 'Marketing & Sáng tạo', count: 45, base: '650M', bonus: '60M', total: '710M' },
 { name: 'Quản trị Vận hành', count: 30, base: '350M', bonus: '25M', total: '375M' },
 { name: 'Nguồn nhân lực (HR)', count: 12, base: '150M', bonus: '15M', total: '165M' }
 ]" :key="idx" class="group transition-all duration-300 bg-transparent hover:bg-[var(--sys-bg-hover)]">
 <td class="whitespace-nowrap px-12 py-6 bg-transparent border-b border-[var(--sys-border-subtle)]">
 <span class="text-sm font-semibold text-[var(--sys-text-primary)] ">{{ item.name }}</span>
 </td>
 <td class="whitespace-nowrap px-8 py-6 text-center bg-transparent border-b border-[var(--sys-border-subtle)]">
 <span class="px-4 py-1.5 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-xl text-[10px] font-semibold group-hover:border-[var(--sys-brand-solid)] transition-all ">{{ item.count }} NV</span>
 </td>
 <td class="whitespace-nowrap px-8 py-6 text-right bg-transparent border-b border-[var(--sys-border-subtle)]">
 <span class="text-sm font-semibold text-[var(--sys-text-secondary)] opacity-60">{{ item.base }}</span>
 </td>
 <td class="whitespace-nowrap px-8 py-6 text-right bg-transparent border-b border-[var(--sys-border-subtle)]">
 <span class="text-sm font-semibold text-[var(--sys-success-text)] ">+{{ item.bonus }}</span>
 </td>
 <td class="whitespace-nowrap px-12 py-6 text-right bg-transparent border-b border-[var(--sys-border-subtle)]">
 <span class="text-lg font-semibold text-[var(--sys-brand-solid)] ">{{ item.total }}</span>
 </td>
 </tr>
 <tr class="bg-[var(--sys-bg-page)]/50">
 <td class="whitespace-nowrap px-12 py-8 text-base font-semibold text-[var(--sys-text-primary)] ">Hợp nhất toàn đoàn</td>
 <td class="whitespace-nowrap px-8 py-8 text-center text-base font-semibold text-[var(--sys-text-primary)] ">292 NV</td>
 <td class="whitespace-nowrap px-8 py-8 text-right text-base font-semibold text-[var(--sys-text-secondary)] opacity-40">4.450B</td>
 <td class="whitespace-nowrap px-8 py-8 text-right text-base font-semibold text-[var(--sys-text-secondary)] opacity-40">850M</td>
 <td class="whitespace-nowrap px-12 py-8 text-right text-2xl font-semibold text-[var(--sys-brand-solid)] shadow-inner">5.300B VNĐ</td>
 </tr>
 </tbody>
 </table>
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
</style>


<script setup>
</script>

<style scoped>
.material-symbols-outlined {
 font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24;
}
</style>
