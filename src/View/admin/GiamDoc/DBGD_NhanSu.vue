<template>
  <div class="p-6 md:p-8 space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-[24px] font-[800] text-slate-800 tracking-tight">Bảng Điều Khiển Quản Trị</h1>
        <p class="text-sm text-slate-500 mt-1 font-medium">Dữ liệu chiến lược cập nhật theo thời gian thực: Thứ Hai, 24 Tháng 5, 2024</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="flex items-center gap-2.5 px-4 md:px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-[13px] font-[800] text-[#1d3d70] hover:bg-slate-50 transition-all shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
          <span class="material-symbols-rounded text-[18px] text-slate-500" style="font-variation-settings: 'FILL' 1;">calendar_today</span>
          30 ngày qua
        </button>
        <button class="flex items-center gap-2 px-5 py-2.5 bg-[#3B5BDB] border border-transparent rounded-xl text-sm font-bold text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
          <span class="material-symbols-outlined text-[18px]">download</span>
          Xuất báo cáo CEO
        </button>
      </div>
    </div>

    <!-- ✅ 4 KPI Cards – từ nhanSuKpiCards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      <div
        v-for="(card, i) in nhanSuKpiCards" :key="card.id"
        class="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] transition-all animate-chart"
        :style="{ animationDelay: (i * 100) + 'ms' }"
      >
        <div class="flex justify-between items-start">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center" :class="card.iconBg">
            <span class="material-symbols-outlined text-[24px]" :class="card.iconColor">{{ card.icon }}</span>
          </div>
          <span class="text-[11px] font-bold px-2.5 py-1 rounded-full" :class="card.badgeClass">{{ card.badge }}</span>
        </div>
        <div class="mt-5">
          <h3 class="text-[12px] font-bold text-slate-500 uppercase tracking-widest">{{ card.label }}</h3>
          <p class="text-[32px] font-[900] text-slate-800 leading-tight mt-1">{{ card.value }}</p>
          <p class="text-[11px] font-semibold text-slate-400 mt-2">{{ card.note }}</p>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
      
      <!-- Chart: Cơ cấu nhân sự theo cấp bậc -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex flex-col pt-6 pb-5 px-6 relative h-[360px] animate-chart" style="animation-delay: 200ms">
        <div class="flex justify-between items-start mb-auto relative z-10">
          <div>
            <h2 class="text-[16px] font-[800] text-slate-800">Cơ cấu nhân sự theo cấp bậc</h2>
            <p class="text-[12px] font-semibold text-slate-400 mt-1">Phân bổ 1,250 nhân sự toàn công ty</p>
          </div>
          <span class="text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 hidden sm:block">Đơn vị: Người</span>
        </div>
        
        <div class="flex-1 relative w-full mt-10 mb-2 z-10">
          <!-- Background Grid Lines -->
          <div class="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-between">
            <div class="border-t border-slate-100 border-dashed w-full h-0 relative"><span class="absolute -top-2.5 bg-white pr-2 text-[10px] font-bold text-slate-400">500</span></div>
            <div class="border-t border-slate-100 border-dashed w-full h-0 relative"><span class="absolute -top-2.5 bg-white pr-2 text-[10px] font-bold text-slate-400">250</span></div>
            <div class="border-t border-slate-200 w-full h-0 relative"><span class="absolute -top-2.5 bg-white pr-2 text-[10px] font-bold text-slate-400">0</span></div>
          </div>
          
          <!-- Column Bars Container -->
          <div class="absolute inset-0 ml-8 flex items-end justify-around pb-[1px] z-20" style="height: 100%;">
             <div v-for="(item, index) in nhanSuCapBacChart" :key="index"
                  class="flex items-end h-full justify-center group relative cursor-pointer w-16 hover:z-[60]">
                
                <!-- Bar -->
                <div class="w-6 md:w-8 bg-gradient-to-t rounded-t-md relative shadow-sm group-hover:opacity-90 transition-opacity"
                     :class="[item.color, item.shadow]" :style="`height: ${item.heightPct}%`">
                     
                   <!-- Clean, Informative Tooltip -->
                   <div class="hidden group-hover:flex absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap pointer-events-none">
                      <div class="bg-slate-800 text-white rounded-xl shadow-xl shadow-slate-800/20 p-2.5 flex flex-col items-center min-w-[120px]">
                         <span class="text-[10px] font-[800] text-slate-400 uppercase tracking-widest mb-1.5">{{ item.level }}</span>
                         <div class="flex items-center justify-between w-full gap-3 text-[12px] font-bold">
                            <span class="text-slate-300 flex items-center gap-1.5">Số lượng:</span>
                            <span class="text-blue-400 flex items-center gap-1.5">{{ item.count }}</span>
                         </div>
                         <div class="flex items-center justify-between w-full gap-3 text-[11px] font-semibold mt-1">
                            <span class="text-slate-400">Tỷ lệ:</span>
                            <span class="text-slate-300">{{ item.totalPct }}%</span>
                         </div>
                         <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 rotate-45"></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div class="flex justify-around items-end pt-5 ml-8 relative z-10 border-t border-slate-100 mt-2">
          <span v-for="(item, index) in nhanSuCapBacChart" :key="index" class="text-[11px] font-[800] text-slate-500 w-16 text-center">{{ item.level }}</span>
        </div>
      </div>

      <!-- Chart: Biến động nhân sự (Dual Bar Chart) -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex flex-col pt-6 pb-5 px-6 relative h-[360px] animate-chart" style="animation-delay: 300ms">
        <div class="flex justify-between items-start mb-auto relative z-10">
          <div>
            <h2 class="text-[16px] font-[800] text-slate-800">Biến động nhân lực</h2>
            <p class="text-[12px] font-semibold text-slate-400 mt-1">Số lượng Tuyển vào & Nghỉ việc (6 tháng)</p>
          </div>
          <div class="flex items-center gap-3">
             <div class="flex items-center gap-1.5"><div class="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/30"></div><span class="text-[11px] font-bold text-slate-600">Tuyển vào</span></div>
             <div class="flex items-center gap-1.5"><div class="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-sm shadow-rose-400/30"></div><span class="text-[11px] font-bold text-slate-600">Nghỉ việc</span></div>
          </div>
        </div>
        
        <div class="flex-1 relative w-full mt-10 mb-2 z-10">
          <!-- Background Grid Lines -->
          <div class="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-between">
            <div class="border-t border-slate-100 border-dashed w-full h-0 relative"><span class="absolute -top-2.5 bg-white pr-2 text-[10px] font-bold text-slate-400">{{ maxBienDongInfo }}</span></div>
            <div class="border-t border-slate-100 border-dashed w-full h-0 relative"><span class="absolute -top-2.5 bg-white pr-2 text-[10px] font-bold text-slate-400">{{ maxBienDongInfo / 2 }}</span></div>
            <div class="border-t border-slate-200 w-full h-0 relative"><span class="absolute -top-2.5 bg-white pr-2 text-[10px] font-bold text-slate-400">0</span></div>
          </div>
          
          <!-- Column Bars Container -->
          <div class="absolute inset-0 ml-8 flex items-end justify-around pb-[1px] z-20" style="height: 100%;">
             <div v-for="(item, index) in bienDongChartComputed" :key="index"
                  class="flex items-end gap-1.5 md:gap-2.5 h-full justify-center group relative cursor-pointer w-16 hover:z-[60]">
                
                <!-- Tuyển Vào Bar -->
                <div class="w-4 md:w-5 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md relative shadow-sm shadow-blue-500/20 group-hover:opacity-90 transition-opacity"
                     :style="`height: ${item.tuyenVaoPct}%`"></div>

                <!-- Nghỉ Việc Bar -->
                <div class="w-4 md:w-5 bg-gradient-to-t from-rose-500 to-rose-400 rounded-t-md relative shadow-sm shadow-rose-500/20 group-hover:opacity-90 transition-opacity"
                     :style="`height: ${item.nghiViecPct}%`"></div>

                <!-- Phantom Div for precise Tooltip Positioning above the tallest bar -->
                <div class="absolute bottom-0 w-full pointer-events-none" :style="`height: ${Math.max(item.tuyenVaoPct, item.nghiViecPct)}%`">
                   <!-- Clean, Informative Tooltip -->
                   <div class="hidden group-hover:flex absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap pointer-events-none">
                      <div class="bg-slate-800 text-white rounded-xl shadow-xl shadow-slate-800/20 p-2.5 flex flex-col items-center min-w-[130px]">
                         <span class="text-[10px] font-[800] text-slate-400 uppercase tracking-widest mb-1.5">{{ item.month }}</span>
                         <div class="flex items-center justify-between w-full gap-4 text-[12px] font-bold">
                            <span class="text-blue-400 flex items-center gap-1.5">Tuyển: {{ item.tuyenVao }}</span>
                            <span class="text-rose-400 flex items-center gap-1.5">Nghỉ: {{ item.nghiViec }}</span>
                         </div>
                         <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 rotate-45"></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div class="flex justify-around items-end pt-5 ml-8 relative z-10 border-t border-slate-100 mt-2">
          <span v-for="(item, index) in bienDongChartComputed" :key="index" class="text-[11px] font-[800] text-slate-500 w-16 text-center">{{ item.month }}</span>
        </div>
      </div>
    </div>

    <!-- Bottom Lists Row -->
    <div class="flex flex-col lg:flex-row gap-4 md:gap-5">
      
      <!-- Top Performers (Table) -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] lg:w-3/5 p-7 overflow-hidden animate-chart" style="animation-delay: 400ms">
        <div class="flex items-center justify-between xl:mb-4 mb-6">
          <h2 class="text-[16px] font-[800] text-slate-800">Nhân sự chủ chốt & Hiệu suất cao</h2>
          <button class="text-[12px] font-[800] text-[#3B5BDB] hover:text-blue-800 transition-colors">Xem tất cả</button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-100">
                <th class="py-3 px-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] whitespace-nowrap">Họ & Tên</th>
                <th class="py-3 px-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] whitespace-nowrap">Chức vụ</th>
                <th class="py-3 px-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] text-center whitespace-nowrap">Hiệu suất</th>
                <th class="py-3 px-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] text-center whitespace-nowrap">Trạng thái</th>
              </tr>
            </thead>
            <!-- ✅ Top performers – từ topPerformers -->
            <tbody class="divide-y divide-slate-50">
              <tr v-for="emp in topPerformers" :key="emp.id" class="hover:bg-slate-50/50 transition-colors group">
                <td class="py-5 px-2">
                  <div class="flex items-center gap-3">
                    <img :src="emp.avatar" class="w-10 h-10 rounded-full object-cover border-2 border-slate-100" alt=""/>
                    <div>
                      <p class="text-[13px] font-[800] text-slate-800 group-hover:text-[#3B5BDB] cursor-pointer transition-colors leading-tight">{{ emp.name }}</p>
                      <p class="text-[11px] font-semibold text-slate-400 mt-0.5">{{ emp.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="py-5 px-2 text-[13px] font-bold text-slate-600">{{ emp.chucVu }}</td>
                <td class="py-5 px-2 text-center w-36">
                  <span class="text-[12px] font-[800] text-[#3B5BDB] mb-1.5 inline-block">{{ emp.hieuSuat }}%</span>
                  <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mx-auto">
                    <div class="h-full bg-[#3B5BDB] rounded-full" :style="`width:${emp.hieuSuat}%`"></div>
                  </div>
                </td>
                <td class="py-5 px-2 text-center">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" :class="emp.trangThaiClass">{{ emp.trangThai }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Department Rankings -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] lg:w-2/5 p-7 flex flex-col">
        <h2 class="text-[16px] font-[800] text-slate-800 mb-6">Xếp hạng phòng ban</h2>
        
        <!-- ✅ Dept rankings – từ deptRankings -->
        <div class="flex flex-col flex-1 justify-between gap-6">
          <div v-for="dept in deptRankings" :key="dept.name">
            <div class="flex justify-between items-end mb-1.5">
              <span class="text-[13px] font-[800] text-slate-800">{{ dept.name }}</span>
              <span class="text-[14px] font-[900] text-[#3B5BDB]">{{ dept.score }}%</span>
            </div>
            <div class="w-full h-[6px] bg-slate-100 rounded-full overflow-hidden mb-1.5">
              <div class="h-full bg-[#3B5BDB] rounded-full transition-all duration-1000" :style="`width:${dept.score}%`"></div>
            </div>
            <div class="flex justify-between items-center text-[11px] font-semibold text-slate-400">
              <span class="italic">{{ dept.note }}</span>
              <span v-if="dept.trend==='up'"   class="material-symbols-outlined text-green-500 text-[16px]">trending_up</span>
              <span v-else-if="dept.trend==='down'" class="material-symbols-outlined text-red-400 text-[16px]">trending_down</span>
              <span v-else class="material-symbols-outlined text-transparent text-[16px] select-none">remove</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { nhanSuKpiCards, topPerformers, deptRankings, nhanSuCapBac, bienDongNhanLucData } from '@/data/sampleData_GiamDoc.js';

const maxNhanSu = 500;
const totalNhanSu = computed(() => nhanSuCapBac.reduce((acc, curr) => acc + curr.count, 0));

const nhanSuCapBacChart = computed(() => {
  return nhanSuCapBac.map(item => ({
    ...item,
    heightPct: Math.min((item.count / maxNhanSu) * 100, 115),
    totalPct: ((item.count / totalNhanSu.value) * 100).toFixed(0)
  }));
});

const maxBienDongInfo = computed(() => {
  let max = 0;
  bienDongNhanLucData.forEach(item => {
    if (item.tuyenVao > max) max = item.tuyenVao;
    if (item.nghiViec > max) max = item.nghiViec;
  });
  const upperBound = Math.ceil(max / 50) * 50; 
  return upperBound === 0 ? 100 : upperBound;
});

const bienDongChartComputed = computed(() => {
  return bienDongNhanLucData.map(item => ({
    ...item,
    tuyenVaoPct: Math.min((item.tuyenVao / maxBienDongInfo.value) * 100, 115),
    nghiViecPct: Math.min((item.nghiViec / maxBienDongInfo.value) * 100, 115)
  }));
});
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24;
}

/* Animations for SVG Charts */
@keyframes dashDraw { to { stroke-dashoffset: 0; } }
@keyframes fadeIn { to { opacity: 1; } }
.draw-blue { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: dashDraw 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
.draw-red { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: dashDraw 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards 0.2s; }
.fade-area { opacity: 0; animation: fadeIn 1s ease-in forwards 0.6s; }
.fade-dots { opacity: 0; animation: fadeIn 0.5s ease forwards 1.2s; }
</style>