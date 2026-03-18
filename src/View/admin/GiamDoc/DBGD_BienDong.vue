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

    <!-- 4 KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      <!-- Card 1 -->
      <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] relative flex flex-col justify-between hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] transition-all">
        <div class="flex justify-between items-start mb-4">
          <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm">
            <span class="material-symbols-outlined text-[24px]">sync_alt</span>
          </div>
          <div class="flex items-center gap-1 text-[11px] font-bold text-rose-500 px-2 py-1 bg-rose-50 border border-rose-100 rounded-full">
            <span class="material-symbols-outlined text-[14px]">trending_up</span> 1.2%
          </div>
        </div>
        <div>
          <h3 class="text-[12px] font-bold text-slate-500 uppercase tracking-widest">Tỷ lệ biến động TB</h3>
          <p class="text-[32px] font-[900] text-slate-800 mt-1">4.5<span class="text-[20px] font-bold text-slate-500">%</span></p>
          <p class="text-[11px] font-medium text-slate-400 mt-2">So với 3.3% tháng trước</p>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] relative flex flex-col justify-between hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] transition-all">
        <div class="flex justify-between items-start mb-4">
          <div class="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shadow-sm">
            <span class="material-symbols-outlined text-[24px]">group_remove</span>
          </div>
        </div>
        <div>
          <h3 class="text-[12px] font-bold text-slate-500 uppercase tracking-widest">Tổng NV nghỉ việc</h3>
          <p class="text-[32px] font-[900] text-slate-800 mt-1">12 <span class="text-[14px] font-semibold text-slate-500 lowercase">người</span></p>
          <p class="text-[11px] font-medium text-slate-400 mt-2">Đã bao gồm nghỉ việc chủ động</p>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] relative flex flex-col justify-between hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] transition-all">
        <div class="flex justify-between items-start mb-4">
          <div class="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm">
            <span class="material-symbols-outlined text-[24px]">verified_user</span>
          </div>
          <div class="flex items-center gap-1 text-[11px] font-bold text-emerald-600 px-2 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
            <span class="material-symbols-outlined text-[14px]">trending_down</span> 0.5%
          </div>
        </div>
        <div>
          <h3 class="text-[12px] font-bold text-slate-500 uppercase tracking-widest">Chỉ số ổn định (Retention)</h3>
          <p class="text-[32px] font-[900] text-slate-800 mt-1">95.5<span class="text-[20px] font-bold text-slate-500">%</span></p>
          <p class="text-[11px] font-medium text-slate-400 mt-2">Mục tiêu quý: >98%</p>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] relative flex flex-col justify-between hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] transition-all">
        <div class="flex justify-between items-start mb-4">
          <div class="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shadow-sm">
            <span class="material-symbols-outlined text-[24px]">schedule</span>
          </div>
        </div>
        <div>
          <h3 class="text-[12px] font-bold text-slate-500 uppercase tracking-widest">Gắn bó trung bình</h3>
          <p class="text-[32px] font-[900] text-slate-800 mt-1">3.2 <span class="text-[14px] font-semibold text-slate-500 lowercase">năm</span></p>
          <p class="text-[11px] font-medium text-slate-400 mt-2">Duy trì ổn định so với kỳ trước</p>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
      <!-- Line Chart -->
      <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] p-6 lg:p-7 flex flex-col relative min-h-[400px]">
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
            <!-- 240 max height -> Y values matching image curve points -->
            <path class="transition-all duration-1000 ease-in-out cursor-pointer" d="M 0 74 C 36 74 36 90 72 90 C 109 90 109 53 145 53 C 181 53 181 16 218 16 C 254 16 254 80 290 80 C 327 80 327 106 363 106 C 400 106 400 37 436 37 C 472 37 472 10 509 10 C 545 10 545 89 581 89 C 618 89 618 73 654 73 C 690 73 690 84 727 84 C 763 84 763 10 800 10 L 800 240 L 0 240 Z" fill="url(#chartBlue)" />
            <path class="transition-all duration-1000 ease-in-out" d="M 0 74 C 36 74 36 90 72 90 C 109 90 109 53 145 53 C 181 53 181 16 218 16 C 254 16 254 80 290 80 C 327 80 327 106 363 106 C 400 106 400 37 436 37 C 472 37 472 10 509 10 C 545 10 545 89 581 89 C 618 89 618 73 654 73 C 690 73 690 84 727 84 C 763 84 763 10 800 10" fill="none" stroke="#3B82F6" stroke-width="3" stroke-linecap="round" vector-effect="non-scaling-stroke" />
            
            <!-- Nodes -->
            <g class="cursor-pointer">
              <circle cx="0" cy="74" r="5" fill="#fff" stroke="#3B82F6" stroke-width="2.5" vector-effect="non-scaling-stroke" class="hover:r-6 hover:stroke-[3px] transition-all"/>
              <circle cx="72" cy="90" r="5" fill="#fff" stroke="#3B82F6" stroke-width="2.5" vector-effect="non-scaling-stroke" class="hover:r-6 hover:stroke-[3px] transition-all"/>
              <circle cx="145" cy="53" r="5" fill="#fff" stroke="#3B82F6" stroke-width="2.5" vector-effect="non-scaling-stroke" class="hover:r-6 hover:stroke-[3px] transition-all"/>
              <circle cx="218" cy="16" r="5" fill="#fff" stroke="#3B82F6" stroke-width="2.5" vector-effect="non-scaling-stroke" class="hover:r-6 hover:stroke-[3px] transition-all"/>
              <circle cx="290" cy="80" r="5" fill="#fff" stroke="#3B82F6" stroke-width="2.5" vector-effect="non-scaling-stroke" class="hover:r-6 hover:stroke-[3px] transition-all"/>
              <circle cx="363" cy="106" r="5" fill="#fff" stroke="#3B82F6" stroke-width="2.5" vector-effect="non-scaling-stroke" class="hover:r-6 hover:stroke-[3px] transition-all"/>
              <circle cx="436" cy="37" r="5" fill="#fff" stroke="#3B82F6" stroke-width="2.5" vector-effect="non-scaling-stroke" class="hover:r-6 hover:stroke-[3px] transition-all"/>
              <circle cx="509" cy="10" r="5" fill="#fff" stroke="#3B82F6" stroke-width="2.5" vector-effect="non-scaling-stroke" class="hover:r-6 hover:stroke-[3px] transition-all"/>
              <circle cx="581" cy="89" r="5" fill="#fff" stroke="#3B82F6" stroke-width="2.5" vector-effect="non-scaling-stroke" class="hover:r-6 hover:stroke-[3px] transition-all"/>
              <circle cx="654" cy="73" r="5" fill="#fff" stroke="#3B82F6" stroke-width="2.5" vector-effect="non-scaling-stroke" class="hover:r-6 hover:stroke-[3px] transition-all"/>
              <circle cx="727" cy="84" r="5" fill="#fff" stroke="#3B82F6" stroke-width="2.5" vector-effect="non-scaling-stroke" class="hover:r-6 hover:stroke-[3px] transition-all"/>
              <circle cx="800" cy="10" r="5" fill="#fff" stroke="#3B82F6" stroke-width="2.5" vector-effect="non-scaling-stroke" class="hover:r-6 hover:stroke-[3px] transition-all"/>
            </g>
          </svg>
        </div>

        <div class="flex justify-between items-end pt-2 mt-2 z-10 w-full pl-12 pr-1 pointer-events-none">
           <span class="text-[10px] font-bold text-slate-400/80 hover:text-slate-600 cursor-pointer pointer-events-auto transition-colors">T6/23</span>
           <span class="text-[10px] font-bold text-slate-400/80 hover:text-slate-600 cursor-pointer pointer-events-auto transition-colors">T7/23</span>
           <span class="text-[10px] font-bold text-slate-400/80 hover:text-slate-600 cursor-pointer pointer-events-auto transition-colors">T8/23</span>
           <span class="text-[10px] font-bold text-slate-400/80 hover:text-slate-600 cursor-pointer pointer-events-auto transition-colors">T9/23</span>
           <span class="text-[10px] font-bold text-slate-400/80 hover:text-slate-600 cursor-pointer pointer-events-auto transition-colors">T10/23</span>
           <span class="text-[10px] font-bold text-slate-400/80 hover:text-slate-600 cursor-pointer pointer-events-auto transition-colors">T11/23</span>
           <span class="text-[10px] font-bold text-slate-400/80 hover:text-slate-600 cursor-pointer pointer-events-auto transition-colors">T12/23</span>
           <span class="text-[10px] font-bold text-slate-400/80 hover:text-slate-600 cursor-pointer pointer-events-auto transition-colors">T1/24</span>
           <span class="text-[10px] font-bold text-slate-400/80 hover:text-slate-600 cursor-pointer pointer-events-auto transition-colors">T2/24</span>
           <span class="text-[10px] font-bold text-slate-400/80 hover:text-slate-600 cursor-pointer pointer-events-auto transition-colors">T3/24</span>
           <span class="text-[10px] font-bold text-slate-400/80 hover:text-slate-600 cursor-pointer pointer-events-auto transition-colors">T4/24</span>
           <span class="text-[11px] font-[900] text-blue-600 cursor-pointer pointer-events-auto transition-colors bg-blue-50 px-2 py-0.5 rounded border border-blue-100 drop-shadow-sm">T5/24</span>
        </div>
      </div>

      <!-- Donut Chart -->
      <div class="lg:col-span-1 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] p-6 flex flex-col items-center">
        <h2 class="text-[16px] font-[800] text-slate-800 tracking-tight w-full mb-8">Biến động theo Thâm niên</h2>
        
        <div class="relative w-[200px] h-[200px] mt-2 mb-4 hover:scale-105 transition-transform duration-500 cursor-pointer">
          <!-- Pure SVG Donut mimicking the image -->
          <svg viewBox="0 0 100 100" class="w-full h-full transform -rotate-90">
             <!-- Dưới 1 năm (45%) -->
             <circle cx="50" cy="50" r="35" fill="none" stroke="#F87171" stroke-width="25" stroke-dasharray="219.9" stroke-dashoffset="120" stroke-linecap="butt"></circle>
             <!-- 1 - 3 năm (35%) -->
             <circle cx="50" cy="50" r="35" fill="none" stroke="#60A5FA" stroke-width="25" stroke-dasharray="219.9" stroke-dashoffset="142" stroke-linecap="butt" transform="rotate(162 50 50)"></circle>
             <!-- Trên 3 năm (20%) -->
             <circle cx="50" cy="50" r="35" fill="none" stroke="#94A3B8" stroke-width="25" stroke-dasharray="219.9" stroke-dashoffset="175" stroke-linecap="butt" transform="rotate(288 50 50)"></circle>
          </svg>
          <!-- Inner circle cutout for cleaner ring -->
          <div class="absolute inset-[25px] bg-white rounded-full shadow-inner border border-slate-50"></div>
        </div>

        <div class="w-full mt-auto space-y-4 pt-4">
          <div class="flex items-center justify-between text-[12px] font-bold group hover:bg-slate-50 px-2 py-1.5 -mx-2 rounded transition-colors cursor-pointer">
             <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-[#F87171]"></span><span class="text-slate-500 group-hover:text-slate-800 transition-colors">Dưới 1 năm</span></div>
             <span class="text-slate-800 text-[13px] font-[900]">45%</span>
          </div>
          <div class="flex items-center justify-between text-[12px] font-bold group hover:bg-slate-50 px-2 py-1.5 -mx-2 rounded transition-colors cursor-pointer">
             <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-[#60A5FA]"></span><span class="text-slate-500 group-hover:text-slate-800 transition-colors">1 - 3 năm</span></div>
             <span class="text-slate-800 text-[13px] font-[900]">35%</span>
          </div>
          <div class="flex items-center justify-between text-[12px] font-bold group hover:bg-slate-50 px-2 py-1.5 -mx-2 rounded transition-colors cursor-pointer">
             <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-[#94A3B8]"></span><span class="text-slate-500 group-hover:text-slate-800 transition-colors">Trên 3 năm</span></div>
             <span class="text-slate-800 text-[13px] font-[900]">20%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Table: Tỷ lệ theo Bộ phận -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col">
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
             <tr class="hover:bg-slate-50/70 transition-colors">
               <td class="py-4 px-7 text-[13px] font-[800] text-slate-700">Kinh doanh</td>
               <td class="py-4 px-7 text-[13px] font-semibold text-slate-500">120</td>
               <td class="py-4 px-7 text-[13px] font-semibold text-slate-500">8</td>
               <td class="py-4 px-7">
                 <span class="px-2.5 py-1 bg-red-50 text-red-600 font-[900] text-[13px] rounded tracking-wide border border-red-100 shadow-sm">6.6%</span>
               </td>
             </tr>
             <tr class="hover:bg-slate-50/70 transition-colors">
               <td class="py-4 px-7 text-[13px] font-[800] text-slate-700">Kỹ thuật (Tech)</td>
               <td class="py-4 px-7 text-[13px] font-semibold text-slate-500">85</td>
               <td class="py-4 px-7 text-[13px] font-semibold text-slate-500">2</td>
               <td class="py-4 px-7 text-[13px] font-[800] text-slate-800">2.3%</td>
             </tr>
             <tr class="hover:bg-slate-50/70 transition-colors">
               <td class="py-4 px-7 text-[13px] font-[800] text-slate-700">Marketing</td>
               <td class="py-4 px-7 text-[13px] font-semibold text-slate-500">45</td>
               <td class="py-4 px-7 text-[13px] font-semibold text-slate-500">1</td>
               <td class="py-4 px-7 text-[13px] font-[800] text-slate-800">2.2%</td>
             </tr>
             <tr class="hover:bg-slate-50/70 transition-colors">
               <td class="py-4 px-7 text-[13px] font-[800] text-slate-700">Tài chính</td>
               <td class="py-4 px-7 text-[13px] font-semibold text-slate-500">20</td>
               <td class="py-4 px-7 text-[13px] font-semibold text-slate-500">1</td>
               <td class="py-4 px-7">
                 <span class="px-2.5 py-1 bg-red-50 text-red-600 font-[900] text-[13px] rounded tracking-wide border border-red-100 shadow-sm">5.0%</span>
               </td>
             </tr>
             <tr class="hover:bg-slate-50/70 transition-colors">
               <td class="py-4 px-7 text-[13px] font-[800] text-slate-700">HR</td>
               <td class="py-4 px-7 text-[13px] font-semibold text-slate-500">15</td>
               <td class="py-4 px-7 text-[13px] font-semibold text-slate-500">0</td>
               <td class="py-4 px-7 text-[13px] font-[800] text-slate-800">0.0%</td>
             </tr>
           </tbody>
         </table>
      </div>
    </div>

    <!-- Table: Danh sách nghỉ việc -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col">
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
             <tr class="hover:bg-slate-50/70 transition-colors group cursor-pointer">
               <td class="py-4 px-7">
                 <div class="flex items-center justify-start gap-3">
                    <div class="w-9 h-9 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[12px] font-[800] border-2 border-slate-100 shadow-sm">NL</div>
                    <span class="text-[14px] font-[800] text-slate-800 group-hover:text-blue-600 transition-colors">Nguyễn Văn Lợi</span>
                 </div>
               </td>
               <td class="py-4 px-7">
                  <div class="flex flex-col">
                     <span class="text-[13px] font-[800] text-slate-700">Senior Sales</span>
                     <span class="text-[12px] font-medium text-slate-400">Kinh doanh</span>
                  </div>
               </td>
               <td class="py-4 px-7 text-[13px] font-bold text-slate-500 italic">20/05/2024</td>
               <td class="py-4 px-7 text-[13px] font-semibold text-slate-600">Cơ hội thăng tiến thấp</td>
               <td class="py-4 px-7 text-right">
                 <span class="px-3 py-1 bg-blue-50 text-blue-600 font-[800] text-[10px] rounded-full uppercase tracking-wider border border-blue-100 shadow-sm">Tự nguyện</span>
               </td>
             </tr>
             
             <tr class="hover:bg-slate-50/70 transition-colors group cursor-pointer">
               <td class="py-4 px-7">
                 <div class="flex items-center justify-start gap-3">
                    <div class="w-9 h-9 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[12px] font-[800] border-2 border-slate-100 shadow-sm">TH</div>
                    <span class="text-[14px] font-[800] text-slate-800 group-hover:text-blue-600 transition-colors">Trần Thị Hoa</span>
                 </div>
               </td>
               <td class="py-4 px-7">
                  <div class="flex flex-col">
                     <span class="text-[13px] font-[800] text-slate-700">UI Designer</span>
                     <span class="text-[12px] font-medium text-slate-400">Kỹ thuật</span>
                  </div>
               </td>
               <td class="py-4 px-7 text-[13px] font-bold text-slate-500 italic">15/05/2024</td>
               <td class="py-4 px-7 text-[13px] font-semibold text-slate-600">Lý do cá nhân (Gia đình)</td>
               <td class="py-4 px-7 text-right">
                 <span class="px-3 py-1 bg-blue-50 text-blue-600 font-[800] text-[10px] rounded-full uppercase tracking-wider border border-blue-100 shadow-sm">Tự nguyện</span>
               </td>
             </tr>

             <tr class="hover:bg-slate-50/70 transition-colors group cursor-pointer">
               <td class="py-4 px-7">
                 <div class="flex items-center justify-start gap-3">
                    <div class="w-9 h-9 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[12px] font-[800] border-2 border-slate-100 shadow-sm">PV</div>
                    <span class="text-[14px] font-[800] text-slate-800 group-hover:text-blue-600 transition-colors">Phạm Văn Vũ</span>
                 </div>
               </td>
               <td class="py-4 px-7">
                  <div class="flex flex-col">
                     <span class="text-[13px] font-[800] text-slate-700">Junior Backend</span>
                     <span class="text-[12px] font-medium text-slate-400">Kỹ thuật</span>
                  </div>
               </td>
               <td class="py-4 px-7 text-[13px] font-bold text-slate-500 italic">10/05/2024</td>
               <td class="py-4 px-7 text-[13px] font-semibold text-slate-600">Thu nhập chưa phù hợp</td>
               <td class="py-4 px-7 text-right">
                 <span class="px-3 py-1 bg-orange-50 text-orange-600 font-[800] text-[10px] rounded-full uppercase tracking-wider border border-orange-100 shadow-sm">Thỏa thuận</span>
               </td>
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
.material-symbols-outlined {
  font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24;
}
</style>