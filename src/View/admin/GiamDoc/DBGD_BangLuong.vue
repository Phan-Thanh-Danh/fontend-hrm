<template>
  <div class="p-6 md:p-8 space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-[24px] font-[800] text-slate-800 tracking-tight">Tổng Quan Quỹ Lương</h1>
        <p class="text-sm text-slate-500 mt-1 font-medium">Báo cáo chi tiết chi phí nhân sự tháng hiện tại dành cho Ban Giám Đốc</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
          <span class="material-symbols-outlined text-[18px]">calendar_today</span>
          Tháng 10, 2023
        </button>
        <button class="flex items-center gap-2 px-5 py-2.5 bg-[#3B5BDB] border border-transparent rounded-xl text-sm font-bold text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
          <span class="material-symbols-outlined text-[18px]">download</span>
          Xuất báo cáo
        </button>
      </div>
    </div>    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      <div
        v-for="(card, index) in bangLuongKpiCards" :key="card.id"
        class="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] transition-all animate-chart"
        :style="{ animationDelay: (index * 100) + 'ms' }"
      >
        <div class="flex justify-between items-start">
          <h3 class="text-[12px] font-bold text-slate-500">{{ card.label }}</h3>
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="card.iconBg">
            <span class="material-symbols-outlined text-[20px]" :class="card.iconColor">{{ card.icon }}</span>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-[24px] font-[900] text-slate-800 leading-tight">{{ card.value }}</p>
          <div class="flex items-center gap-1.5 mt-3">
            <span
              class="flex items-center text-[11px] font-bold"
              :class="card.badgeTrend === 'up' ? 'text-emerald-600' : 'text-rose-600'"
            >
              <span class="material-symbols-outlined text-[14px]">{{ card.badgeTrend === 'up' ? 'trending_up' : 'trending_down' }}</span>
              {{ card.badgeText }}
            </span>
            <span class="text-[11px] font-semibold text-slate-400">vs tháng trước</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
      
      <!-- Left Chart Placeholder -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex flex-col pt-7 pb-5 px-7 relative h-[320px] animate-chart" style="animation-delay: 200ms">
        <div class="flex justify-between items-start mb-auto relative z-10">
          <h2 class="text-[16px] font-[800] text-slate-800">Quỹ lương theo Phòng ban</h2>
          <span class="text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-md">Đơn vị: Tỷ VNĐ</span>
        </div>
        
        <!-- Mock bars -->
        <div class="absolute inset-x-7 bottom-[60px] top-[70px] flex items-end justify-around pb-0 opacity-[0.03]">
           <div class="w-12 bg-indigo-600 rounded-t-lg h-[80%]"></div>
           <div class="w-12 bg-indigo-600 rounded-t-lg h-[50%]"></div>
           <div class="w-12 bg-indigo-600 rounded-t-lg h-[30%]"></div>
           <div class="w-12 bg-indigo-600 rounded-t-lg h-[20%]"></div>
           <div class="w-12 bg-indigo-600 rounded-t-lg h-[10%]"></div>
        </div>

        <div class="flex justify-around items-end pt-5 mt-auto relative z-10">
          <span class="text-[11px] font-bold text-slate-500 w-16 text-center">Kỹ thuật</span>
          <span class="text-[11px] font-bold text-slate-500 w-16 text-center">Kinh doanh</span>
          <span class="text-[11px] font-bold text-slate-500 w-16 text-center">Marketing</span>
          <span class="text-[11px] font-bold text-slate-500 w-16 text-center">Vận hành</span>
          <span class="text-[11px] font-bold text-slate-500 w-16 text-center">Nhân sự</span>
        </div>
      </div>

      <!-- Right Chart SVG -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex flex-col pt-7 pb-5 px-7 relative h-[320px] animate-chart" style="animation-delay: 300ms">
        <div class="flex justify-between items-start z-10 relative">
          <div>
            <h2 class="text-[16px] font-[800] text-slate-800">Xu hướng 6 tháng</h2>
            <p class="text-[11px] font-semibold text-slate-400 mt-1">Tăng trưởng biến động</p>
          </div>
          <div class="flex items-center gap-4 text-[11px] font-bold text-slate-500">
            <div class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-[#3B5BDB]"></span>Quỹ lương</div>
          </div>
        </div>
        
        <!-- Pure SVG approximation of the smooth curve in the image -->
        <div class="flex-1 w-full relative mt-6 overflow-hidden min-h-0">
           <!-- The Area Chart -->
           <svg class="absolute inset-0 w-full h-full" viewBox="0 0 500 160" preserveAspectRatio="none">
              <defs>
                 <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#3B5BDB" stop-opacity="0.2" />
                    <stop offset="100%" stop-color="#3B5BDB" stop-opacity="0" />
                 </linearGradient>
              </defs>
              
              <!-- Filled Area -->
              <path class="transition-all duration-1000 ease-in-out" :d="bangLuongAreaPath" fill="url(#curveGradient)" />
              
              <!-- Smooth Line -->
              <path class="transition-all duration-1000 ease-in-out" :d="bangLuongLinePath" fill="none" stroke="#3B5BDB" stroke-width="3.5" stroke-linecap="round" vector-effect="non-scaling-stroke" />
              <!-- Points -->
              <g>
                <circle v-for="(p, i) in bangLuongLinePoints" :key="i" :cx="p.x" :cy="p.y" r="4.5" fill="#fff" stroke="#3B5BDB" stroke-width="2.5" vector-effect="non-scaling-stroke"></circle>
              </g>
           </svg>
        </div>

        <div class="flex justify-between items-end mt-2 pt-2 relative z-10 w-full px-2">
          <span v-for="(p, idx) in bangLuongLinePoints" :key="idx" class="text-[11px] font-bold text-slate-400">{{ p.month }}</span>
        </div>
      </div>
    </div>

    <!-- Bottom Lists Row -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] p-7 flex flex-col animate-chart" style="animation-delay: 500ms">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-[16px] font-[800] text-slate-800">Chi tiết chi phí theo bộ phận</h2>
        
        <div class="relative w-64 hidden sm:block">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
          <input type="text" placeholder="Tìm bộ phận..." class="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700">
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-200">
              <th class="py-4 px-2 text-[12px] font-[800] text-slate-700 whitespace-nowrap">Phòng ban</th>
              <th class="py-4 px-2 text-[12px] font-[800] text-slate-700 whitespace-nowrap text-center">Số nhân viên</th>
              <th class="py-4 px-2 text-[12px] font-[800] text-slate-700 whitespace-nowrap text-right">Tổng lương cơ bản</th>
              <th class="py-4 px-2 text-[12px] font-[800] text-slate-700 whitespace-nowrap text-right">Thưởng & Phụ cấp</th>
              <th class="py-4 px-2 text-[12px] font-[800] text-slate-700 whitespace-nowrap text-right">Tổng chi phí</th>
            </tr>
          </thead>
          <!-- ✅ Bảng chi phí phòng ban – từ bangLuongBoPhans -->
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="bp in bangLuongBoPhans" :key="bp.tenPhong"
              class="hover:bg-slate-50/50 transition-colors group"
            >
              <td class="py-4 px-2 text-[13px] font-[800] text-slate-800">{{ bp.tenPhong }}</td>
              <td class="py-4 px-2 text-[13px] font-medium text-slate-600 text-center">{{ bp.soNhanVien }}</td>
              <td class="py-4 px-2 text-[13px] font-medium text-slate-600 text-right">{{ bp.luongCoBan }}</td>
              <td class="py-4 px-2 text-[13px] font-medium text-slate-600 text-right">{{ bp.thuongPhuCap }}</td>
              <td class="py-4 px-2 text-[13px] font-[800] text-[#3B5BDB] text-right">{{ bp.tongChiPhi }}</td>
            </tr>
            <!-- Dòng tổng cộng – từ bangLuongTongCong -->
            <tr class="bg-slate-50/50">
              <td class="py-5 px-2 text-[14px] font-[900] text-slate-900">Tổng cộng</td>
              <td class="py-5 px-2 text-[14px] font-[900] text-slate-900 text-center">{{ bangLuongTongCong.soNhanVien }}</td>
              <td class="py-5 px-2 text-[14px] font-[900] text-slate-900 text-right">{{ bangLuongTongCong.luongCoBan }}</td>
              <td class="py-5 px-2 text-[14px] font-[900] text-slate-900 text-right">{{ bangLuongTongCong.thuongPhuCap }}</td>
              <td class="py-5 px-2 text-[14px] font-[900] text-[#3B5BDB] text-right">{{ bangLuongTongCong.tongChiPhi }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4 flex items-center justify-between text-[12px] text-slate-500">
        <span>Hiển thị {{ bangLuongBoPhans.length }} trên {{ bangLuongBoPhans.length }} bộ phận</span>
        <button class="w-8 h-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors font-semibold">1</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { bangLuongKpiCards, bangLuongBoPhans, bangLuongTongCong, bangLuongLineChart, bangLuongLineChartMax } from '@/data/sampleData_GiamDoc.js';

const bangLuongLinePoints = computed(() => {
  const width = 500;
  const height = 150;
  const max = bangLuongLineChartMax;
  const stepX = width / (bangLuongLineChart.length - 1);
  return bangLuongLineChart.map((p, i) => {
    return {
      month: p.month,
      x: i * stepX,
      y: height - (p.val / max) * height
    }
  });
});

const bangLuongLinePath = computed(() => {
  if (!bangLuongLinePoints.value.length) return '';
  let d = `M ${bangLuongLinePoints.value[0].x} ${bangLuongLinePoints.value[0].y}`;
  for(let i=1; i<bangLuongLinePoints.value.length; i++) {
    const prev = bangLuongLinePoints.value[i-1];
    const curr = bangLuongLinePoints.value[i];
    const cpX = (prev.x + curr.x) / 2;
    d += ` C ${cpX} ${prev.y} ${cpX} ${curr.y} ${curr.x} ${curr.y}`;
  }
  return d;
});

const bangLuongAreaPath = computed(() => {
  if (!bangLuongLinePath.value) return '';
  return `${bangLuongLinePath.value} L 500 160 L 0 160 Z`;
});
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24;
}
</style>