<template>
  <div class="dashboard">
    <!-- Header -->
    <div class="mb-8 flex flex-wrap justify-between items-end gap-6 bg-transparent text-left">
        <div>
            <h1 class="text-2xl font-semibold text-[var(--sys-text-primary)]">Chi tiết Chỉ số Chuyên cần</h1>
            <p class="text-[var(--sys-text-secondary)] text-sm font-medium mt-1">Cập nhật lúc: 08:30, 24/05/2024</p>
        </div>
        <div class="flex items-center gap-4">
            <!-- Thoi gian filters -->
            <div class="flex p-1 bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-2xl shadow-sm">
                 <button class="px-5 py-2 rounded-xl text-xs font-semibold bg-[var(--sys-brand-solid)] text-white shadow-sm transition-all hover:bg-[var(--sys-brand-hover)]">Tháng này</button>
                 <button class="px-5 py-2 rounded-xl text-xs font-semibold text-[var(--sys-text-secondary)] hover:bg-[var(--sys-bg-hover)] transition-all">Quý này</button>
                 <button class="px-5 py-2 rounded-xl text-xs font-semibold text-[var(--sys-text-secondary)] hover:bg-[var(--sys-bg-hover)] transition-all">Năm 2024</button>
            </div>
            <!-- Phong ban dropdown -->
            <div class="flex items-center gap-2 px-5 py-2.5 bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-2xl text-[var(--sys-text-primary)] text-xs font-semibold shadow-sm cursor-pointer hover:border-[var(--sys-brand-solid)] transition-all">
                 <span class="material-symbols-rounded text-lg text-[var(--sys-icon-default)]">filter_list</span>
                 <span>Tất cả phòng ban</span>
                 <span class="material-symbols-rounded text-lg text-[var(--sys-icon-default)]">expand_more</span>
            </div>
            <!-- Xuat bao cao -->
            <button class="px-6 py-2.5 bg-[var(--sys-brand-solid)] text-white rounded-2xl text-xs font-semibold hover:bg-[var(--sys-brand-hover)] shadow-xl shadow-[var(--sys-brand-solid-lch-30)] transition-all flex items-center gap-2">
                 <span class="material-symbols-rounded text-lg">download</span>
                 Xuất báo cáo
            </button>
        </div>
    </div>

    <!-- ✅ 3 KPI Cards – dữ liệu từ chuyenCanCards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          v-for="(card, i) in chuyenCanCards"
          :key="card.id"
          class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all cursor-pointer group text-left animate-chart"
          :style="{ animationDelay: (i * 100) + 'ms' }"
        >
            <div class="flex justify-between items-center mb-6">
                <p class="text-[13px] font-semibold text-[var(--sys-text-secondary)]">{{ card.label }}</p>
                <div
                  class="w-10 h-10 rounded-2xl flex items-center justify-center shadow-inner"
                  :style="`background:${card.iconBg}; color:${card.iconColor}`"
                >
                    <span class="material-symbols-rounded text-xl">{{ card.icon }}</span>
                </div>
            </div>

            <!-- Card 1: chỉ hiện giá trị đơn + progress bar -->
            <template v-if="card.id === 'ty-le'">
                <div class="flex items-baseline gap-3 mb-6">
                    <h3 class="text-[40px] font-bold text-[var(--sys-text-primary)] leading-none">{{ card.value }}</h3>
                    <span
                      class="flex items-center text-sm font-semibold gap-1"
                      :class="card.badgeGood ? 'text-[var(--sys-success-text)]' : 'text-[var(--sys-danger-text)]'"
                    >
                        <span class="material-symbols-rounded text-[18px]">
                            {{ card.badgeTrend === 'up' ? 'trending_up' : 'trending_down' }}
                        </span>
                        {{ card.badge }}
                    </span>
                </div>
                <div class="h-1.5 w-full bg-[var(--sys-bg-hover)] rounded-full overflow-hidden">
                    <div class="h-full bg-[var(--sys-brand-solid)] rounded-full shadow-lg" :style="`width:${card.progress}%`"></div>
                </div>
            </template>

            <!-- Card 2 & 3: giá trị kèm đơn vị + ghi chú -->
            <template v-else>
                <div class="flex items-baseline gap-3 mb-3">
                    <h3 class="text-[32px] font-bold text-[var(--sys-text-primary)] leading-none">
                        {{ card.value }}
                        <span v-if="card.valueSub" class="text-[24px] text-[var(--sys-text-secondary)]/50 font-semibold"> {{ card.valueSub }}</span>
                    </h3>
                    <span
                      class="flex items-center text-sm font-semibold gap-1"
                      :class="card.badgeGood ? 'text-[var(--sys-success-text)]' : 'text-[var(--sys-danger-text)]'"
                    >
                        <span class="material-symbols-rounded text-[18px]">
                            {{ card.badgeTrend === 'up' ? 'trending_up' : 'trending_down' }}
                        </span>
                        {{ card.badge }}
                    </span>
                </div>
                <p class="text-[12px] font-semibold text-[var(--sys-text-secondary)]/60">{{ card.note }}</p>
            </template>
        </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Line Chart Xu Hướng -->
        <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between text-left">
            <div class="flex justify-between items-start mb-6">
                <div>
                   <h4 class="text-[18px] font-bold text-[var(--sys-text-primary)]">Xu hướng chuyên cần</h4>
                   <p class="text-[13px] font-semibold text-[var(--sys-text-secondary)] mt-4">
                       <span class="text-[24px] font-bold text-[var(--sys-text-primary)] mr-2">98.5%</span> 
                       Trung bình 6 tháng qua
                   </p>
                </div>
                <!-- Theo thang dropdown -->
                <div class="flex items-center gap-2 px-4 py-2 bg-transparent text-[var(--sys-text-secondary)] text-xs font-semibold cursor-pointer hover:text-[var(--sys-text-primary)] transition-all">
                     <span>Theo tháng</span>
                     <span class="material-symbols-rounded text-lg">expand_more</span>
                </div>
            </div>
            
            <!-- Mock Line Chart Path SVG -->
            <div class="relative w-full h-[180px] flex mx-auto mt-4 mb-2 overflow-hidden min-h-0">
                <svg viewBox="0 0 500 150" class="absolute inset-0 w-full h-full preserve-aspect-ratio-none">
                     <!-- Smooth curve SVG generated -->
                     <path d="M0,130 C100,110 150,80 250,110 C350,140 380,30 460,30 C480,30 490,60 500,80" fill="none" stroke="var(--sys-brand-solid)" stroke-width="4" stroke-linecap="round" vector-effect="non-scaling-stroke" class="drop-shadow-lg" />
                </svg>
                
                <!-- Dot for current month -->
                <div class="absolute right-[0] top-[74px] w-3 h-3 bg-[var(--sys-brand-solid)] rounded-full border-2 border-white shadow-md"></div>
            </div>

            <div class="flex justify-between mt-4">
                 <span class="text-[10px] font-bold text-[var(--sys-text-secondary)]/50 uppercase tracking-wider">Tháng 1</span>
                 <span class="text-[10px] font-bold text-[var(--sys-text-secondary)]/50 uppercase tracking-wider">Tháng 2</span>
                 <span class="text-[10px] font-bold text-[var(--sys-text-secondary)]/50 uppercase tracking-wider">Tháng 3</span>
                 <span class="text-[10px] font-bold text-[var(--sys-text-secondary)]/50 uppercase tracking-wider">Tháng 4</span>
                 <span class="text-[10px] font-bold text-[var(--sys-text-secondary)]/50 uppercase tracking-wider">Tháng 5</span>
                 <span class="text-[10px] font-bold text-[var(--sys-text-secondary)]/50 uppercase tracking-wider">Tháng 6</span>
            </div>
        </div>

        <!-- Phân Tích Phòng Ban -->
        <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-[2.5rem] p-8 shadow-sm text-left">
             <div class="flex justify-between items-center mb-8">
                 <h4 class="text-[18px] font-bold text-[var(--sys-text-primary)]">Phân tích theo Phòng ban</h4>
                 <span class="material-symbols-rounded text-[var(--sys-text-secondary)] cursor-pointer">more_horiz</span>
             </div>
             
             <div class="space-y-6">
                  <div class="group" v-for="dept in depts" :key="dept.name">
                       <div class="flex justify-between items-center mb-3">
                            <h5 class="text-xs font-semibold text-[var(--sys-text-primary)]">{{ dept.name }}</h5>
                            <span class="text-xs font-bold text-[var(--sys-brand-solid)]">{{ dept.val }}%</span>
                       </div>
                       <div class="h-2 w-full bg-[var(--sys-bg-hover)] rounded-full overflow-hidden">
                            <div class="h-full bg-[var(--sys-brand-solid)] rounded-full shadow-lg shadow-[var(--sys-brand-solid-lch-30)]" :style="`width: ${dept.val}%`"></div>
                       </div>
                  </div>
             </div>
        </div>
    </div>

    <!-- Bottom Lists -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
        <!-- Top Xuat Sac -->
        <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-[2.5rem] p-8 shadow-sm">
             <div class="flex justify-between items-center mb-6">
                 <h4 class="text-[16px] font-bold text-[var(--sys-text-primary)] flex items-center gap-2">
                     <span class="material-symbols-rounded text-[var(--sys-success-text)] text-xl" style="font-variation-settings: 'FILL' 1;">verified</span> 
                     Top chuyên cần xuất sắc
                 </h4>
                 <button class="text-xs font-semibold text-[var(--sys-brand-solid)] hover:underline">Xem tất cả</button>
             </div>
             <div class="space-y-6 mt-8">
                  <div class="flex items-center gap-4 border-b border-[var(--sys-border-subtle)] pb-4 last:border-0 last:pb-0" v-for="user in topUsers" :key="user.name">
                       <div class="w-12 h-12 rounded-full overflow-hidden border border-[var(--sys-border-subtle)] bg-[var(--sys-bg-hover)]">
                            <img :src="user.avatar" class="w-full h-full object-cover"/>
                       </div>
                       <div class="flex-grow">
                            <h5 class="text-sm font-bold text-[var(--sys-text-primary)]">{{ user.name }}</h5>
                            <p class="text-xs font-semibold text-[var(--sys-text-secondary)] mt-1">{{ user.dept }}</p>
                       </div>
                       <div class="text-right">
                            <h5 class="text-sm font-bold text-[var(--sys-success-text)]">{{ user.val }}</h5>
                            <p class="text-[10px] font-bold text-[var(--sys-text-secondary)]/40 uppercase tracking-wide mt-1">{{ user.subval }}</p>
                       </div>
                  </div>
             </div>
        </div>
        
        <!-- Can Luu Y -->
        <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-[2.5rem] p-8 shadow-sm">
             <div class="flex justify-between items-center mb-6">
                 <h4 class="text-[16px] font-bold text-[var(--sys-text-primary)] flex items-center gap-2">
                     <span class="material-symbols-rounded text-[var(--sys-danger-text)] text-xl" style="font-variation-settings: 'FILL' 1;">warning</span>
                     Cần lưu ý (Vi phạm nhiều)
                 </h4>
                 <button class="text-xs font-semibold text-[var(--sys-brand-solid)] hover:underline">Xem tất cả</button>
             </div>
             <div class="space-y-6 mt-8">
                  <div class="flex items-center gap-4 border-b border-[var(--sys-border-subtle)] pb-4 last:border-0 last:pb-0" v-for="user in badUsers" :key="user.name">
                       <div class="w-12 h-12 rounded-full overflow-hidden border border-[var(--sys-border-subtle)] bg-[var(--sys-bg-hover)]">
                            <img :src="user.avatar" class="w-full h-full object-cover"/>
                       </div>
                       <div class="flex-grow">
                            <h5 class="text-sm font-bold text-[var(--sys-text-primary)]">{{ user.name }}</h5>
                            <p class="text-xs font-semibold text-[var(--sys-text-secondary)] mt-1">{{ user.dept }}</p>
                       </div>
                       <div class="text-right">
                            <h5 class="text-sm font-bold text-[var(--sys-danger-text)]">{{ user.val }}</h5>
                            <p class="text-[10px] font-bold text-[var(--sys-text-secondary)]/40 uppercase tracking-wide mt-1">{{ user.subval }}</p>
                       </div>
                  </div>
             </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import {
  chuyenCanCards,
  depts,
  topUsers,
  badUsers,
} from '@/data/sampleData_GiamDoc.js';
</script>

<style scoped>
.dashboard {
  max-width: 1600px;
  margin: 0 auto;
  padding: 24px;
}
</style>
