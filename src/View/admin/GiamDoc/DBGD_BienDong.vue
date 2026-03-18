<template>
  <div class="p-6 md:p-8 space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-[24px] font-[800] text-slate-800 tracking-tight">Thống Kê Biến Động</h1>
        <p class="text-sm text-slate-500 mt-1 font-medium">Báo cáo phân tích nghỉ việc và mức độ gắn kết nhân sự: <span class="text-blue-600 font-semibold cursor-pointer">Tháng 5, 2024</span></p>
      </div>
      <div class="flex items-center gap-3">
        <button class="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
          <span class="material-symbols-outlined text-[18px]">calendar_today</span>
          12 tháng qua
        </button>
        <button class="flex items-center gap-2 px-5 py-2.5 bg-[#3B5BDB] border border-transparent rounded-xl text-sm font-bold text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
          <span class="material-symbols-outlined text-[18px]">download</span>
          Xuất dữ liệu
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      <div
        v-for="(card, i) in bienDongKpiCards" :key="card.id"
        class="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] relative flex flex-col justify-between hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] transition-all animate-chart"
        :style="`animation-delay: ${i*100}ms`"
      >
        <div class="flex justify-between items-start mb-4">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm" :class="[card.iconBg, card.iconColor]">
            <span class="material-symbols-outlined text-[24px]">{{ card.icon }}</span>
          </div>
          <div v-if="card.badge" class="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full border" :class="card.badge.cls">
            <span class="material-symbols-outlined text-[14px]">{{ card.badge.icon }}</span> {{ card.badge.text }}
          </div>
        </div>
        <div>
          <h3 class="text-[12px] font-bold text-slate-500 uppercase tracking-widest">{{ card.label }}</h3>
          <p class="text-[32px] font-[900] text-slate-800 mt-1">{{ card.value }} <span :class="card.suffixCls">{{ card.suffix }}</span></p>
          <p class="text-[11px] font-medium text-slate-400 mt-2">{{ card.note }}</p>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
      <!-- Line Chart -->
      <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] p-6 lg:p-7 flex flex-col relative min-h-[400px] animate-chart" style="animation-delay: 200ms">
        <div class="flex justify-between items-center mb-6 relative z-10 w-full pr-1">
          <div>
             <h2 class="text-[16px] font-[800] text-slate-800 tracking-tight">Xu hướng Biến động (12 tháng)</h2>
             <p class="text-[12px] font-semibold text-slate-400 mt-1">Sự thay đổi tỷ lệ nghỉ việc theo thời gian</p>
          </div>
          <button class="px-3 md:px-4 py-1.5 md:py-2 border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm bg-white whitespace-nowrap">Tất cả bộ phận</button>
        </div>

        <!-- HTML Generated Grid & Y Axis for Sharp text -->
        <div class="absolute inset-x-7 lg:inset-x-8 top-[102px] bottom-[50px] flex flex-col justify-between pointer-events-none z-0">
          <div class="border-t border-slate-100 w-full h-0 relative"><span class="absolute -top-[9px] bg-white pr-2 text-[10px] font-bold text-slate-400">4.5%</span></div>
          <div class="border-t border-slate-100 w-full h-0 relative"><span class="absolute -top-[9px] bg-white pr-2 text-[10px] font-bold text-slate-400">3.5%</span></div>
          <div class="border-t border-slate-100 w-full h-0 relative"><span class="absolute -top-[9px] bg-white pr-2 text-[10px] font-bold text-slate-400">2.5%</span></div>
          <div class="border-t border-slate-100 w-full h-0 relative"><span class="absolute -top-[9px] bg-white pr-2 text-[10px] font-bold text-slate-400">1.5%</span></div>
          <div class="border-t border-slate-100 w-full h-0 relative"><span class="absolute -top-[9px] bg-white pr-2 text-[10px] font-bold text-slate-400">0.5%</span></div>
          <div class="border-t border-slate-200 w-full h-0 relative"><span class="absolute -top-[9px] bg-white pr-2 text-[10px] font-bold text-slate-400">0%</span></div>
        </div>

        <!-- SVG Line Chart Wrapper -->
        <div class="flex-1 relative w-full overflow-hidden min-h-0 pl-[52px] z-10 -ml-2">
          <svg class="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 800 240" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.15" />
                <stop offset="100%" stop-color="#3B82F6" stop-opacity="0.0" />
              </linearGradient>
            </defs>
            <path class="transition-all duration-1000 ease-in-out cursor-pointer" :d="bienDongAreaPath" fill="url(#chartBlue)" />
            <path class="transition-all duration-1000 ease-in-out" :d="bienDongLinePath" fill="none" stroke="#3B82F6" stroke-width="3" stroke-linecap="round" vector-effect="non-scaling-stroke" />
            
            <g class="cursor-pointer">
              <circle
                v-for="(pt, idx) in bienDongLinePoints" :key="idx"
                :cx="pt.x" :cy="pt.y" r="5" fill="#fff" stroke="#3B82F6" stroke-width="2.5"
                vector-effect="non-scaling-stroke" class="hover:r-6 hover:stroke-[3px] transition-all"
              />
            </g>
          </svg>
        </div>

        <div class="flex justify-between items-end pt-2 mt-2 z-10 w-full pl-12 pr-1 pointer-events-none">
           <span
              v-for="(pt, index) in bienDongLinePoints" :key="index"
              class="text-[10px] font-bold text-slate-400/80 hover:text-slate-600 cursor-pointer pointer-events-auto transition-colors"
           >{{ pt.month }}</span>
        </div>
      </div>

      <!-- Donut Chart -->
      <div class="lg:col-span-1 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] p-6 flex flex-col items-center animate-chart" style="animation-delay: 300ms">
        <h2 class="text-[16px] font-[800] text-slate-800 tracking-tight w-full mb-8">Biến động theo Thâm niên</h2>
        
        <div class="relative w-[200px] h-[200px] mt-2 mb-4 hover:scale-105 transition-transform duration-500 cursor-pointer">
          <!-- Pure SVG Donut mimicking the image -->
          <svg viewBox="0 0 100 100" class="w-full h-full transform -rotate-90">
             <circle
               v-for="(seg, idx) in bienDongDonutSegments" :key="idx"
               cx="50" cy="50" r="35" fill="none" :stroke="seg.color" stroke-width="25"
               stroke-dasharray="219.9" :stroke-dashoffset="seg.dashoffset" stroke-linecap="butt" :transform="seg.transform"
             ></circle>
          </svg>
          <!-- Inner circle cutout for cleaner ring -->
          <div class="absolute inset-[25px] bg-white rounded-full shadow-inner border border-slate-50"></div>
        </div>

        <div class="w-full mt-auto space-y-4 pt-4">
          <div
             v-for="(seg, idx) in bienDongDonutSegments" :key="idx"
             class="flex items-center justify-between text-[12px] font-bold group hover:bg-slate-50 px-2 py-1.5 -mx-2 rounded transition-colors cursor-pointer"
          >
             <div class="flex items-center gap-2">
               <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: seg.color }"></span>
               <span class="text-slate-500 group-hover:text-slate-800 transition-colors">{{ seg.label }}</span>
             </div>
             <span class="text-slate-800 text-[13px] font-[900]">{{ seg.pct }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Table: Tỷ lệ theo Bộ phận -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col animate-chart" style="animation-delay: 400ms">
      <div class="px-7 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
         <h2 class="text-[16px] font-[800] text-slate-800 tracking-tight">Tỷ lệ nghỉ việc theo Bộ phận</h2>
         <span class="text-[11px] italic text-slate-400 font-semibold">* Highlight các bộ phận > 5%</span>
      </div>
      <div class="overflow-x-auto w-full">
         <table class="w-full text-left border-collapse">
           <thead>
             <tr class="border-b border-slate-100 text-[11px] uppercase font-bold text-slate-400 tracking-widest bg-white">
               <th class="py-4 px-7 whitespace-nowrap">Phòng ban</th>
               <th class="py-4 px-7 whitespace-nowrap">Nhân sự</th>
               <th class="py-4 px-7 whitespace-nowrap">Nghỉ việc</th>
               <th class="py-4 px-7 whitespace-nowrap">Tỷ lệ (%)</th>
             </tr>
           </thead>
           <tbody class="divide-y divide-slate-100">
             <tr v-for="(row, idx) in nghiViecBoPhan" :key="idx" class="hover:bg-slate-50/70 transition-colors">
               <td class="py-4 px-7 text-[13px] font-[800] text-slate-700">{{ row.tenPhong }}</td>
               <td class="py-4 px-7 text-[13px] font-semibold text-slate-500">{{ row.soNhanSu }}</td>
               <td class="py-4 px-7 text-[13px] font-semibold text-slate-500">{{ row.soNghiViec }}</td>
               <td class="py-4 px-7">
                 <span v-if="row.alert" class="px-2.5 py-1 bg-red-50 text-red-600 font-[900] text-[13px] rounded tracking-wide border border-red-100 shadow-sm">{{ row.tyLe }}%</span>
                 <span v-else class="text-[13px] font-[800] text-slate-800">{{ row.tyLe }}%</span>
               </td>
             </tr>
           </tbody>
         </table>
      </div>
    </div>

    <!-- Table: Danh sách nghỉ việc -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col animate-chart" style="animation-delay: 500ms">
      <div class="px-7 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
         <h2 class="text-[16px] font-[800] text-slate-800 tracking-tight">Danh sách Nhân sự nghỉ việc gần đây</h2>
         <a href="#" class="text-[12px] font-[800] text-[#3B5BDB] hover:text-blue-800 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">Xem tất cả</a>
      </div>
      <div class="overflow-x-auto w-full">
         <table class="w-full text-left border-collapse">
           <thead>
             <tr class="border-b border-slate-100 text-[11px] uppercase font-bold text-slate-400 tracking-widest bg-white">
               <th class="py-4 px-7 whitespace-nowrap">Nhân viên</th>
               <th class="py-4 px-7 whitespace-nowrap">Chức vụ / Phòng ban</th>
               <th class="py-4 px-7 whitespace-nowrap">Ngày nghỉ</th>
               <th class="py-4 px-7 whitespace-nowrap">Lý do chính</th>
               <th class="py-4 px-7 whitespace-nowrap text-right">Hình thức</th>
             </tr>
           </thead>
           <tbody class="divide-y divide-slate-100">
             <tr v-for="nv in danhSachNghiViec" :key="nv.id" class="hover:bg-slate-50/70 transition-colors group cursor-pointer">
               <td class="py-4 px-7">
                 <div class="flex items-center justify-start gap-3">
                    <div class="w-9 h-9 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[12px] font-[800] border-2 border-slate-100 shadow-sm">{{ nv.initials }}</div>
                    <span class="text-[14px] font-[800] text-slate-800 group-hover:text-blue-600 transition-colors">{{ nv.name }}</span>
                 </div>
               </td>
               <td class="py-4 px-7">
                  <div class="flex flex-col">
                     <span class="text-[13px] font-[800] text-slate-700">{{ nv.chucVu }}</span>
                     <span class="text-[12px] font-medium text-slate-400">{{ nv.phongBan }}</span>
                  </div>
               </td>
               <td class="py-4 px-7 text-[13px] font-bold text-slate-500 italic">{{ nv.ngayNghi }}</td>
               <td class="py-4 px-7 text-[13px] font-semibold text-slate-600">{{ nv.lyDo }}</td>
               <td class="py-4 px-7 text-right">
                 <span class="px-3 py-1 font-[800] text-[10px] rounded-full uppercase tracking-wider border shadow-sm" :class="nv.hinhThucCls">{{ nv.hinhThuc }}</span>
               </td>
             </tr>
           </tbody>
         </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import {
  bienDongKpiCards,
  nghiViecBoPhan,
  danhSachNghiViec,
  bienDongLineChart,
  bienDongLineChartMax,
  bienDongDonut,
} from '@/data/sampleData_GiamDoc.js';

// --- BIỂU ĐỒ ĐƯỜNG ĐỘNG (Line Chart) ---
const bienDongLinePoints = computed(() => {
  const width = 800;
  const height = 240;
  const maxY = bienDongLineChartMax;
  const xStep = width / (bienDongLineChart.length - 1);
  return bienDongLineChart.map((item, idx) => ({ ...item, x: Math.round(idx * xStep), y: Math.round(height - (item.val/maxY)*height) }));
});

const bienDongLinePath = computed(() => {
  if (!bienDongLinePoints.value.length) return '';
  let path = `M ${bienDongLinePoints.value[0].x} ${bienDongLinePoints.value[0].y}`;
  for(let i=1; i<bienDongLinePoints.value.length; i++){
    const prev = bienDongLinePoints.value[i-1];
    const curr = bienDongLinePoints.value[i];
    const cpX = (prev.x + curr.x) / 2;
    path += ` C ${cpX} ${prev.y} ${cpX} ${curr.y} ${curr.x} ${curr.y}`;
  }
  return path;
});

const bienDongAreaPath = computed(() => {
  if(!bienDongLinePath.value) return '';
  return `${bienDongLinePath.value} L 800 240 L 0 240 Z`;
});

// --- BIỂU ĐỒ TRÒN ĐỘNG (Donut Chart) ---
const bienDongDonutSegments = computed(() => {
  let segments = [];
  let currentAngle = 0;
  const circumference = 219.9;
  
  bienDongDonut.forEach((item) => {
    const dashoffset = circumference - (item.pct / 100) * circumference;
    segments.push({
      ...item,
      dashoffset,
      transform: currentAngle > 0 ? `rotate(${currentAngle} 50 50)` : ''
    });
    currentAngle += (item.pct / 100) * 360;
  });
  return segments;
});

</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24;
}
</style>