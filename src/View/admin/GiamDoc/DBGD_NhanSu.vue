<template>
  <div class="p-6 md:p-8 space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-[24px] font-[800] text-slate-800 tracking-tight">Bảng Điều Khiển Quản Trị</h1>
        <p class="text-sm text-slate-500 mt-1 font-medium">Dữ liệu chiến lược cập nhật theo thời gian thực: Thứ Hai, 24 Tháng 5, 2024</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
          <span class="material-symbols-outlined text-[18px]">calendar_today</span>
          30 ngày qua
        </button>
        <button class="flex items-center gap-2 px-5 py-2.5 bg-[#3B5BDB] border border-transparent rounded-xl text-sm font-bold text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
          <span class="material-symbols-outlined text-[18px]">download</span>
          Xuất báo cáo CEO
        </button>
      </div>
    </div>

    <!-- 4 KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      <!-- Card 1 -->
      <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] transition-all">
        <div class="flex justify-between items-start">
          <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <span class="material-symbols-outlined text-blue-600 text-[24px]">group</span>
          </div>
          <span class="bg-emerald-50 text-emerald-600 text-[11px] font-bold px-2.5 py-1 rounded-full">+12%</span>
        </div>
        <div class="mt-5">
          <h3 class="text-[12px] font-bold text-slate-500 uppercase tracking-widest">Tổng nhân viên</h3>
          <p class="text-[32px] font-[900] text-slate-800 leading-tight mt-1">1,250</p>
          <p class="text-[11px] font-semibold text-slate-400 mt-2">Dự kiến đạt 1,300 vào cuối quý</p>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] transition-all">
        <div class="flex justify-between items-start">
          <div class="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
            <span class="material-symbols-outlined text-orange-600 text-[24px]">person_remove</span>
          </div>
          <span class="bg-emerald-50 text-emerald-600 text-[11px] font-bold px-2.5 py-1 rounded-full">-0.5%</span>
        </div>
        <div class="mt-5">
          <h3 class="text-[12px] font-bold text-slate-500 uppercase tracking-widest">Tỷ lệ nghỉ việc</h3>
          <p class="text-[32px] font-[900] text-slate-800 leading-tight mt-1">2.4%</p>
          <p class="text-[11px] font-semibold text-slate-400 mt-2">Dưới ngưỡng trung bình ngành (4%)</p>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] transition-all">
        <div class="flex justify-between items-start">
          <div class="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center">
            <span class="material-symbols-outlined text-pink-600 text-[24px]">sentiment_satisfied</span>
          </div>
          <span class="bg-rose-50 text-rose-600 text-[11px] font-bold px-2.5 py-1 rounded-full">-2%</span>
        </div>
        <div class="mt-5">
          <h3 class="text-[12px] font-bold text-slate-500 uppercase tracking-widest">Chỉ số hài lòng (eNPS)</h3>
          <p class="text-[32px] font-[900] text-slate-800 leading-tight mt-1">88%</p>
          <p class="text-[11px] font-semibold text-slate-400 mt-2">Mục tiêu quý tới: 92%</p>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] transition-all">
        <div class="flex justify-between items-start">
          <div class="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center">
            <span class="material-symbols-outlined text-violet-600 text-[24px]">bolt</span>
          </div>
          <span class="bg-emerald-50 text-emerald-600 text-[11px] font-bold px-2.5 py-1 rounded-full">+5%</span>
        </div>
        <div class="mt-5">
          <h3 class="text-[12px] font-bold text-slate-500 uppercase tracking-widest">Hiệu suất trung bình</h3>
          <p class="text-[32px] font-[900] text-slate-800 leading-tight mt-1">92.5%</p>
          <p class="text-[11px] font-semibold text-slate-400 mt-2">Dựa trên KPI hoàn thành</p>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
      
      <!-- Chart: Cơ cấu nhân sự theo cấp bậc -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex flex-col pt-6 pb-5 px-6 relative h-[360px]">
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
          
          <!-- Column Bars -->
          <div class="absolute inset-0 ml-8 flex items-end justify-around pb-[1px]" style="height: 100%;">
             <!-- Intern -->
             <div class="w-10 md:w-14 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-xl group transition-all duration-300 hover:opacity-85 flex justify-center relative shadow-[0_-4px_16px_rgba(59,130,246,0.3)] hover:-translate-y-1 cursor-pointer" style="height: 25%">
                <div class="absolute -top-9 opacity-0 group-hover:opacity-100 transition-all bg-slate-800 text-white text-[11px] font-bold px-2 py-1 rounded shadow-lg pointer-events-none z-20 whitespace-nowrap">10% Tổng số</div>
                <span class="absolute -top-5 text-[12px] font-[900] text-slate-700">125</span>
             </div>
             <!-- Junior -->
             <div class="w-10 md:w-14 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-xl group transition-all duration-300 hover:opacity-85 flex justify-center relative shadow-[0_-4px_16px_rgba(99,102,241,0.3)] hover:-translate-y-1 cursor-pointer" style="height: 90%">
                <div class="absolute -top-9 opacity-0 group-hover:opacity-100 transition-all bg-slate-800 text-white text-[11px] font-bold px-2 py-1 rounded shadow-lg pointer-events-none z-20 whitespace-nowrap">36% Tổng số</div>
                <span class="absolute -top-5 text-[12px] font-[900] text-slate-700">450</span>
             </div>
             <!-- Senior -->
             <div class="w-10 md:w-14 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-xl group transition-all duration-300 hover:opacity-85 flex justify-center relative shadow-[0_-4px_16px_rgba(59,130,246,0.3)] hover:-translate-y-1 cursor-pointer" style="height: 76%">
                <div class="absolute -top-9 opacity-0 group-hover:opacity-100 transition-all bg-slate-800 text-white text-[11px] font-bold px-2 py-1 rounded shadow-lg pointer-events-none z-20 whitespace-nowrap">30% Tổng số</div>
                <span class="absolute -top-5 text-[12px] font-[900] text-slate-700">380</span>
             </div>
             <!-- Manager -->
             <div class="w-10 md:w-14 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-xl group transition-all duration-300 hover:opacity-85 flex justify-center relative shadow-[0_-4px_16px_rgba(6,182,212,0.3)] hover:-translate-y-1 cursor-pointer" style="height: 44%">
                <div class="absolute -top-9 opacity-0 group-hover:opacity-100 transition-all bg-slate-800 text-white text-[11px] font-bold px-2 py-1 rounded shadow-lg pointer-events-none z-20 whitespace-nowrap">18% Tổng số</div>
                <span class="absolute -top-5 text-[12px] font-[900] text-slate-700">220</span>
             </div>
             <!-- Director -->
             <div class="w-10 md:w-14 bg-gradient-to-t from-slate-400 to-slate-300 rounded-t-xl group transition-all duration-300 hover:opacity-85 flex justify-center relative shadow-sm hover:-translate-y-1 cursor-pointer" style="height: 15%">
                <div class="absolute -top-9 opacity-0 group-hover:opacity-100 transition-all bg-slate-800 text-white text-[11px] font-bold px-2 py-1 rounded shadow-lg pointer-events-none z-20 whitespace-nowrap">6% Ban giám đốc</div>
                <span class="absolute -top-5 text-[12px] font-[900] text-slate-600">75</span>
             </div>
          </div>
        </div>

        <div class="flex justify-around items-end pt-5 ml-8 relative z-10 border-t border-slate-100 mt-2">
          <span class="text-[11px] font-[800] text-slate-500 w-12 md:w-14 text-center">Intern</span>
          <span class="text-[11px] font-[800] text-slate-500 w-12 md:w-14 text-center">Junior</span>
          <span class="text-[11px] font-[800] text-slate-500 w-12 md:w-14 text-center">Senior</span>
          <span class="text-[11px] font-[800] text-slate-500 w-12 md:w-14 text-center">Manager</span>
          <span class="text-[11px] font-[800] text-slate-500 w-12 md:w-14 text-center">Director</span>
        </div>
      </div>

      <!-- Chart: Biến động nhân sự SVG (Premium SaaS Design) -->
      <div class="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl border border-slate-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] flex flex-col pt-6 pb-6 px-7 relative h-[360px] overflow-hidden group/premium">
        <!-- Subtle decorative corners -->
        <div class="absolute -top-32 -right-32 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-32 -left-32 w-64 h-64 bg-rose-400/5 rounded-full blur-3xl pointer-events-none"></div>

        <div class="flex justify-between items-start z-10 relative mb-4">
          <div>
            <h2 class="text-[18px] font-[800] text-slate-800 tracking-tight font-sans">Biến động nhân lực</h2>
            <p class="text-[12px] font-medium text-slate-400 mt-1">So sánh giữa tuyển vào và nghỉ việc (6 tháng)</p>
          </div>
          <!-- Pill-style Modern Toggles -->
          <div class="flex items-center gap-2 p-1 bg-slate-50 rounded-full border border-slate-100 shadow-inner">
            <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-sm text-[11px] font-[800] text-slate-700 transition-all hover:text-blue-600 border border-slate-100/50">
              <span class="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 shadow-sm shadow-blue-500/30"></span>
              Tuyển vào
            </button>
            <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold text-slate-500 transition-all hover:bg-white hover:text-rose-500 hover:shadow-sm border border-transparent">
              <span class="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-rose-400 to-rose-300 opacity-80"></span>
              Nghỉ việc
            </button>
          </div>
        </div>
        
        <!-- Y-Axis Lines Backdrop (HTML for sharp text rendering) -->
        <div class="absolute inset-x-7 top-[91px] bottom-[50px] flex flex-col justify-between pointer-events-none z-0">
          <div class="border-t border-slate-100/60 w-full h-0 relative"><span class="absolute -top-[9px] bg-transparent pr-2 text-[10px] font-bold text-slate-300/80">120</span></div>
          <div class="border-t border-slate-100/60 w-full h-0 relative"><span class="absolute -top-[9px] bg-transparent pr-2 text-[10px] font-bold text-slate-300/80">60</span></div>
          <div class="border-t border-slate-200/80 w-full h-0 relative"><span class="absolute -top-[9px] bg-transparent pr-2 text-[10px] font-bold text-slate-300/80">0</span></div>
        </div>

        <!-- SVG Line Chart Area -->
        <div class="flex-1 w-full relative -ml-1 mt-6 overflow-visible min-h-0 pl-10 z-10">
           <svg class="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 500 180" preserveAspectRatio="none">


              <defs>
                 <linearGradient id="premiumBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.25" />
                    <stop offset="100%" stop-color="#6366F1" stop-opacity="0.0" />
                 </linearGradient>
                 <linearGradient id="premiumRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#FB7185" stop-opacity="0.15" />
                    <stop offset="100%" stop-color="#FB7185" stop-opacity="0.0" />
                 </linearGradient>
                 <linearGradient id="lineBlue" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#3B82F6" />
                    <stop offset="100%" stop-color="#6366F1" />
                 </linearGradient>
                 <filter id="glowBlue" x="-20%" y="-20%" width="140%" height="140%">
                   <feGaussianBlur stdDeviation="3" result="blur" />
                   <feComposite in="SourceGraphic" in2="blur" operator="over" />
                 </filter>
                 <filter id="glowRed" x="-20%" y="-20%" width="140%" height="140%">
                   <feGaussianBlur stdDeviation="2.5" result="blur" />
                   <feComposite in="SourceGraphic" in2="blur" operator="over" />
                 </filter>
              </defs>

              <!-- Filled Area (Nghỉ việc) -->
              <path class="fade-area" d="M 0 160 C 60 140 90 150 140 130 C 190 110 220 120 270 120 C 320 120 360 80 400 90 C 440 100 470 110 500 120 L 500 180 L 0 180 Z" fill="url(#premiumRed)" />
              <!-- Smooth Line (Nghỉ việc) - Dashed -->
              <path class="draw-red" d="M 0 160 C 60 140 90 150 140 130 C 190 110 220 120 270 120 C 320 120 360 80 400 90 C 440 100 470 110 500 120" fill="none" stroke="#FB7185" stroke-width="2.5" stroke-linecap="round" vector-effect="non-scaling-stroke" />

              <!-- Data Points (Nghỉ việc) -->
              <g class="fade-dots">
                <circle cx="140" cy="130" r="4" fill="#fff" stroke="#FB7185" stroke-width="2.5" vector-effect="non-scaling-stroke" />
                <circle cx="270" cy="120" r="4" fill="#fff" stroke="#FB7185" stroke-width="2.5" vector-effect="non-scaling-stroke" />
                <circle cx="400" cy="90" r="4" fill="#fff" stroke="#FB7185" stroke-width="3" filter="url(#glowRed)" vector-effect="non-scaling-stroke" />
              </g>
              
              <!-- Filled Area (Tuyển vào) -->
              <path class="fade-area" d="M 0 140 C 60 110 90 60 140 70 C 190 80 220 40 270 50 C 320 60 360 20 400 40 C 440 60 470 30 500 45 L 500 180 L 0 180 Z" fill="url(#premiumBlue)" />
              <!-- Smooth Line (Tuyển vào) -->
              <path class="draw-blue" d="M 0 140 C 60 110 90 60 140 70 C 190 80 220 40 270 50 C 320 60 360 20 400 40 C 440 60 470 30 500 45" fill="none" stroke="url(#lineBlue)" stroke-width="3" stroke-linecap="round" vector-effect="non-scaling-stroke" />
              
              <!-- Data Points (Tuyển vào) -->
              <g class="fade-dots">
                <circle cx="140" cy="70" r="4" fill="#fff" stroke="#2563EB" stroke-width="2.5" vector-effect="non-scaling-stroke" />
                <circle cx="270" cy="50" r="5" fill="#fff" stroke="#4F46E5" stroke-width="3.5" filter="url(#glowBlue)" vector-effect="non-scaling-stroke" />
                <circle cx="400" cy="40" r="4" fill="#fff" stroke="#6366F1" stroke-width="2.5" vector-effect="non-scaling-stroke" />
                <circle cx="498" cy="45" r="4" fill="#fff" stroke="#6366F1" stroke-width="2.5" vector-effect="non-scaling-stroke" />
              </g>
           </svg>

           <!-- Premium Hover Tooltips -->
           <!-- Tooltip 1 (Peak Tuyển Vào) -->
           <div class="absolute left-[54%] top-8 -translate-x-1/2 -translate-y-[120%] opacity-0 group-hover/premium:opacity-100 transition-all duration-500 delay-100 pointer-events-none z-50">
             <div class="bg-slate-900/95 backdrop-blur-md rounded-xl p-3 shadow-2xl shadow-blue-900/20 border border-slate-700/50 min-w-[130px] relative">
               <span class="text-[10px] font-[800] text-slate-400 uppercase tracking-widest block mb-1.5">Tháng 3</span>
               <div class="flex items-center justify-between gap-4 mb-0.5">
                  <span class="flex items-center gap-1.5 text-[11px] font-semibold text-slate-200"><span class="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_4px_#60A5FA]"></span> Tuyển vào</span>
                  <span class="text-[12px] font-[900] text-white">102</span>
               </div>
               <div class="flex items-center justify-between gap-4">
                  <span class="flex items-center gap-1.5 text-[11px] font-semibold text-slate-200"><span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span> Nghỉ việc</span>
                  <span class="text-[12px] font-[900] text-white">45</span>
               </div>
               <!-- Dropdown Arrow -->
               <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900/95 border-b border-r border-slate-700/50 rotate-45"></div>
             </div>
           </div>
        </div>

        <!-- X-Axis text -->
        <div class="flex justify-between items-end mt-0 pt-2 relative z-10 w-full pl-10 pr-2 pointer-events-none">
          <span class="text-[10px] font-[800] text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">Th.1</span>
          <span class="text-[10px] font-[800] text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">Th.2</span>
          <span class="text-[10px] font-[800] text-blue-500 hover:text-blue-600 transition-colors uppercase tracking-widest drop-shadow-sm">Th.3</span>
          <span class="text-[10px] font-[800] text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">Th.4</span>
          <span class="text-[10px] font-[800] text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">Th.5</span>
          <span class="text-[10px] font-[800] text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">Th.6</span>
        </div>
      </div>
    </div>

    <!-- Bottom Lists Row -->
    <div class="flex flex-col lg:flex-row gap-4 md:gap-5">
      
      <!-- Top Performers (Table) -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] lg:w-3/5 p-7 overflow-hidden">
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
            <tbody class="divide-y divide-slate-50">
              <!-- Row 1 -->
              <tr class="hover:bg-slate-50/50 transition-colors group">
                <td class="py-5 px-2">
                  <div class="flex items-center gap-3">
                    <img src="https://i.pravatar.cc/150?img=5" class="w-10 h-10 rounded-full object-cover border-2 border-slate-100" alt="Avatar"/>
                    <div>
                      <p class="text-[13px] font-[800] text-slate-800 group-hover:text-[#3B5BDB] cursor-pointer transition-colors leading-tight">Lê Minh Anh</p>
                      <p class="text-[11px] font-semibold text-slate-400 mt-0.5">minhanh.le@company.com</p>
                    </div>
                  </div>
                </td>
                <td class="py-5 px-2 text-[13px] font-bold text-slate-600">Head of Marketing</td>
                <td class="py-5 px-2 text-center w-36">
                  <span class="text-[12px] font-[800] text-[#3B5BDB] mb-1.5 inline-block">98%</span>
                  <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mx-auto">
                    <div class="h-full bg-[#3B5BDB] rounded-full" style="width: 98%"></div>
                  </div>
                </td>
                <td class="py-5 px-2 text-center">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 uppercase tracking-wider">
                    Excellent
                  </span>
                </td>
              </tr>
              <!-- Row 2 -->
              <tr class="hover:bg-slate-50/50 transition-colors group">
                <td class="py-5 px-2">
                  <div class="flex items-center gap-3">
                    <img src="https://i.pravatar.cc/150?img=11" class="w-10 h-10 rounded-full object-cover border-2 border-slate-100" alt="Avatar"/>
                    <div>
                      <p class="text-[13px] font-[800] text-slate-800 group-hover:text-[#3B5BDB] cursor-pointer transition-colors leading-tight">Nguyễn Hoàng Nam</p>
                      <p class="text-[11px] font-semibold text-slate-400 mt-0.5">nam.nguyen@company.com</p>
                    </div>
                  </div>
                </td>
                <td class="py-5 px-2 text-[13px] font-bold text-slate-600">CTO</td>
                <td class="py-5 px-2 text-center w-36">
                  <span class="text-[12px] font-[800] text-[#3B5BDB] mb-1.5 inline-block">95%</span>
                  <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mx-auto">
                    <div class="h-full bg-[#3B5BDB] rounded-full" style="width: 95%"></div>
                  </div>
                </td>
                <td class="py-5 px-2 text-center">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-green-50 text-green-600 uppercase tracking-wider">
                    High Potential
                  </span>
                </td>
              </tr>
              <!-- Row 3 -->
              <tr class="hover:bg-slate-50/50 transition-colors group">
                <td class="py-5 px-2">
                  <div class="flex items-center gap-3">
                    <img src="https://i.pravatar.cc/150?img=35" class="w-10 h-10 rounded-full object-cover border-2 border-slate-100" alt="Avatar"/>
                    <div>
                      <p class="text-[13px] font-[800] text-slate-800 group-hover:text-[#3B5BDB] cursor-pointer transition-colors leading-tight">Trần Thu Hà</p>
                      <p class="text-[11px] font-semibold text-slate-400 mt-0.5">ha.tran@company.com</p>
                    </div>
                  </div>
                </td>
                <td class="py-5 px-2 text-[13px] font-bold text-slate-600">HR Manager</td>
                <td class="py-5 px-2 text-center w-36">
                  <span class="text-[12px] font-[800] text-[#3B5BDB] mb-1.5 inline-block">92%</span>
                  <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mx-auto">
                    <div class="h-full bg-[#3B5BDB] rounded-full" style="width: 92%"></div>
                  </div>
                </td>
                <td class="py-5 px-2 text-center">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-500 uppercase tracking-wider">
                    Stable
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Department Rankings -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] lg:w-2/5 p-7 flex flex-col">
        <h2 class="text-[16px] font-[800] text-slate-800 mb-6">Xếp hạng phòng ban</h2>
        
        <div class="flex flex-col flex-1 justify-between gap-6">
          <!-- Item 1 -->
          <div>
            <div class="flex justify-between items-end mb-1.5">
              <span class="text-[13px] font-[800] text-slate-800">Công nghệ (IT)</span>
              <span class="text-[14px] font-[900] text-[#3B5BDB]">96.8%</span>
            </div>
            <div class="w-full h-[6px] bg-slate-100 rounded-full overflow-hidden mb-1.5">
              <div class="h-full bg-[#3B5BDB] rounded-full transition-all duration-1000" style="width: 96.8%"></div>
            </div>
            <div class="flex justify-between items-center text-[11px] font-semibold text-slate-400">
              <span class="italic">Dẫn đầu về hiệu suất KPI</span>
              <span class="material-symbols-outlined text-green-500 text-[16px]">trending_up</span>
            </div>
          </div>

          <!-- Item 2 -->
          <div>
            <div class="flex justify-between items-end mb-1.5">
              <span class="text-[13px] font-[800] text-slate-800">Kinh doanh (Sales)</span>
              <span class="text-[14px] font-[900] text-[#3B5BDB]">94.2%</span>
            </div>
            <div class="w-full h-[6px] bg-slate-100 rounded-full overflow-hidden mb-1.5">
              <div class="h-full bg-[#3B5BDB] rounded-full transition-all duration-1000" style="width: 94.2%"></div>
            </div>
            <div class="flex justify-between items-center text-[11px] font-semibold text-slate-400">
              <span class="italic">Vượt chỉ tiêu doanh thu 15%</span>
              <span class="material-symbols-outlined text-green-500 text-[16px]">trending_up</span>
            </div>
          </div>

          <!-- Item 3 -->
          <div>
            <div class="flex justify-between items-end mb-1.5">
              <span class="text-[13px] font-[800] text-slate-800">Nhân sự (HR)</span>
              <span class="text-[14px] font-[900] text-[#3B5BDB]">89.5%</span>
            </div>
            <div class="w-full h-[6px] bg-slate-100 rounded-full overflow-hidden mb-1.5">
              <div class="h-full bg-[#3B5BDB] rounded-full transition-all duration-1000" style="width: 89.5%"></div>
            </div>
            <div class="flex justify-between items-center text-[11px] font-semibold text-slate-400">
              <span class="italic">Tăng chỉ số gắn kết</span>
              <span class="material-symbols-outlined text-transparent text-[16px] select-none">remove</span>
            </div>
          </div>

          <!-- Item 4 -->
          <div>
            <div class="flex justify-between items-end mb-1.5">
              <span class="text-[13px] font-[800] text-slate-800">Tài chính (Finance)</span>
              <span class="text-[14px] font-[900] text-[#3B5BDB]">87.0%</span>
            </div>
            <div class="w-full h-[6px] bg-slate-100 rounded-full overflow-hidden mb-1.5">
              <div class="h-full bg-[#3B5BDB] rounded-full transition-all duration-1000" style="width: 87.0%"></div>
            </div>
            <div class="flex justify-between items-center text-[11px] font-semibold text-slate-400">
              <span class="italic">Tối ưu hóa quy trình thanh toán</span>
              <span class="material-symbols-outlined text-red-400 text-[16px]">trending_down</span>
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