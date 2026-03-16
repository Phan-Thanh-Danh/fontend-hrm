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
    </div>

    <!-- 4 KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      <!-- Card 1 -->
      <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] transition-all">
        <div class="flex justify-between items-start">
          <h3 class="text-[12px] font-bold text-slate-500">Tổng quỹ lương</h3>
          <div class="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
            <span class="material-symbols-outlined text-indigo-600 text-[20px]">payments</span>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-[24px] font-[900] text-slate-800 leading-tight">5.280.000.000đ</p>
          <div class="flex items-center gap-1.5 mt-3">
            <span class="flex items-center text-[11px] font-bold text-emerald-600">
              <span class="material-symbols-outlined text-[14px]">trending_up</span>
              +2.5%
            </span>
            <span class="text-[11px] font-semibold text-slate-400">vs tháng trước</span>
          </div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] transition-all">
        <div class="flex justify-between items-start">
          <h3 class="text-[12px] font-bold text-slate-500">Lương cơ bản</h3>
          <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <span class="material-symbols-outlined text-blue-600 text-[20px]">account_balance_wallet</span>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-[24px] font-[900] text-slate-800 leading-tight">4.150.000.000đ</p>
          <div class="flex items-center gap-1.5 mt-3">
             <span class="flex items-center text-[11px] font-bold text-rose-600">
              <span class="material-symbols-outlined text-[14px]">trending_down</span>
              -1.2%
            </span>
            <span class="text-[11px] font-semibold text-slate-400">vs tháng trước</span>
          </div>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] transition-all">
        <div class="flex justify-between items-start">
          <h3 class="text-[12px] font-bold text-slate-500">Thưởng & Phụ cấp</h3>
          <div class="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
            <span class="material-symbols-outlined text-indigo-600 text-[20px]">redeem</span>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-[24px] font-[900] text-slate-800 leading-tight">850.000.000đ</p>
           <div class="flex items-center gap-1.5 mt-3">
            <span class="flex items-center text-[11px] font-bold text-emerald-600">
              <span class="material-symbols-outlined text-[14px]">trending_up</span>
              +5.8%
            </span>
            <span class="text-[11px] font-semibold text-slate-400">vs tháng trước</span>
          </div>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] transition-all">
        <div class="flex justify-between items-start">
          <h3 class="text-[12px] font-bold text-slate-500">Khấu trừ (Thuế/BH)</h3>
          <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <span class="material-symbols-outlined text-blue-600 text-[20px]">receipt_long</span>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-[24px] font-[900] text-slate-800 leading-tight">280.000.000đ</p>
           <div class="flex items-center gap-1.5 mt-3">
            <span class="flex items-center text-[11px] font-bold text-emerald-600">
              <span class="material-symbols-outlined text-[14px]">trending_up</span>
              +0.5%
            </span>
            <span class="text-[11px] font-semibold text-slate-400">vs tháng trước</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
      
      <!-- Left Chart Placeholder -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex flex-col pt-7 pb-5 px-7 relative h-[320px]">
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
      <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex flex-col pt-7 pb-5 px-7 relative h-[320px]">
        <div class="flex justify-between items-start z-10 relative">
          <div>
            <h2 class="text-[16px] font-[800] text-slate-800">Xu hướng 6 tháng</h2>
            <p class="text-[11px] font-semibold text-slate-400 mt-1">Tăng trưởng trung bình 3.2%</p>
          </div>
          <div class="flex items-center gap-4 text-[11px] font-bold text-slate-500">
            <div class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-[#3B5BDB]"></span>Quỹ lương</div>
          </div>
        </div>
        
        <!-- Pure SVG approximation of the smooth curve in the image -->
        <div class="flex-1 w-full relative mt-6">
           <!-- The Area Chart -->
           <svg class="w-full h-[160px]" viewBox="0 0 500 160" preserveAspectRatio="none">
              <defs>
                 <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#3B5BDB" stop-opacity="0.2" />
                    <stop offset="100%" stop-color="#3B5BDB" stop-opacity="0" />
                 </linearGradient>
              </defs>
              
              <!-- Filled Area -->
              <path class="transition-all duration-1000 ease-in-out" d="M 0 130 C 50 100 100 100 150 120 C 200 140 220 120 270 90 C 320 60 350 20 400 40 C 450 60 480 140 500 100 L 500 160 L 0 160 Z" fill="url(#curveGradient)" />
              
              <!-- Smooth Line -->
              <path class="transition-all duration-1000 ease-in-out" d="M 0 130 C 50 100 100 100 150 120 C 200 140 220 120 270 90 C 320 60 350 20 400 40 C 450 60 480 140 500 100" fill="none" stroke="#3B5BDB" stroke-width="3.5" stroke-linecap="round" />
           </svg>
        </div>

        <div class="flex justify-between items-end mt-2 pt-2 relative z-10 w-full px-2">
          <span class="text-[11px] font-bold text-slate-400">Th5</span>
          <span class="text-[11px] font-bold text-slate-400">Th6</span>
          <span class="text-[11px] font-bold text-slate-400">Th7</span>
          <span class="text-[11px] font-bold text-slate-400">Th8</span>
          <span class="text-[11px] font-bold text-slate-400">Th9</span>
          <span class="text-[11px] font-bold text-slate-400">Th10</span>
        </div>
      </div>
    </div>

    <!-- Bottom Lists Row -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] p-7 flex flex-col">
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
          <tbody class="divide-y divide-slate-100">
            <tr class="hover:bg-slate-50/50 transition-colors group">
              <td class="py-4 px-2 text-[13px] font-[800] text-slate-800">Phòng Kỹ thuật</td>
              <td class="py-4 px-2 text-[13px] font-medium text-slate-600 text-center">120</td>
              <td class="py-4 px-2 text-[13px] font-medium text-slate-600 text-right">2.100.000.000đ</td>
              <td class="py-4 px-2 text-[13px] font-medium text-slate-600 text-right">450.000.000đ</td>
              <td class="py-4 px-2 text-[13px] font-[800] text-[#3B5BDB] text-right">2.550.000.000đ</td>
            </tr>
            <tr class="hover:bg-slate-50/50 transition-colors group">
              <td class="py-4 px-2 text-[13px] font-[800] text-slate-800">Phòng Kinh doanh</td>
              <td class="py-4 px-2 text-[13px] font-medium text-slate-600 text-center">85</td>
              <td class="py-4 px-2 text-[13px] font-medium text-slate-600 text-right">1.200.000.000đ</td>
              <td class="py-4 px-2 text-[13px] font-medium text-slate-600 text-right">300.000.000đ</td>
              <td class="py-4 px-2 text-[13px] font-[800] text-[#3B5BDB] text-right">1.500.000.000đ</td>
            </tr>
            <tr class="hover:bg-slate-50/50 transition-colors group">
              <td class="py-4 px-2 text-[13px] font-[800] text-slate-800">Phòng Marketing</td>
              <td class="py-4 px-2 text-[13px] font-medium text-slate-600 text-center">45</td>
              <td class="py-4 px-2 text-[13px] font-medium text-slate-600 text-right">650.000.000đ</td>
              <td class="py-4 px-2 text-[13px] font-medium text-slate-600 text-right">60.000.000đ</td>
              <td class="py-4 px-2 text-[13px] font-[800] text-[#3B5BDB] text-right">710.000.000đ</td>
            </tr>
             <tr class="hover:bg-slate-50/50 transition-colors group">
              <td class="py-4 px-2 text-[13px] font-[800] text-slate-800">Phòng Vận hành</td>
              <td class="py-4 px-2 text-[13px] font-medium text-slate-600 text-center">30</td>
              <td class="py-4 px-2 text-[13px] font-medium text-slate-600 text-right">350.000.000đ</td>
              <td class="py-4 px-2 text-[13px] font-medium text-slate-600 text-right">25.000.000đ</td>
              <td class="py-4 px-2 text-[13px] font-[800] text-[#3B5BDB] text-right">375.000.000đ</td>
            </tr>
             <tr class="hover:bg-slate-50/50 transition-colors group border-b-2 border-slate-200">
              <td class="py-4 px-2 text-[13px] font-[800] text-slate-800">Phòng Nhân sự</td>
              <td class="py-4 px-2 text-[13px] font-medium text-slate-600 text-center">12</td>
              <td class="py-4 px-2 text-[13px] font-medium text-slate-600 text-right">150.000.000đ</td>
              <td class="py-4 px-2 text-[13px] font-medium text-slate-600 text-right">15.000.000đ</td>
              <td class="py-4 px-2 text-[13px] font-[800] text-[#3B5BDB] text-right">165.000.000đ</td>
            </tr>
             <tr class="bg-slate-50/50">
              <td class="py-5 px-2 text-[14px] font-[900] text-slate-900">Tổng cộng</td>
              <td class="py-5 px-2 text-[14px] font-[900] text-slate-900 text-center">292</td>
              <td class="py-5 px-2 text-[14px] font-[900] text-slate-900 text-right">4.450.000.000đ</td>
              <td class="py-5 px-2 text-[14px] font-[900] text-slate-900 text-right">850.000.000đ</td>
              <td class="py-5 px-2 text-[14px] font-[900] text-[#3B5BDB] text-right">5.300.000.000đ</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="mt-4 flex items-center justify-between text-[12px] text-slate-500">
        <span>Hiển thị 5 trên 5 bộ phận</span>
        <button class="w-8 h-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors font-semibold">1</button>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24;
}
</style>
