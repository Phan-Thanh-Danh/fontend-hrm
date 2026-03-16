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
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
      
      <!-- Left Chart Placeholder -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex flex-col pt-7 pb-5 px-7 relative h-[320px]">
        <div class="flex justify-between items-center mb-auto relative z-10">
          <h2 class="text-[16px] font-[800] text-slate-800">Cơ cấu nhân sự theo cấp bậc</h2>
          <button class="text-slate-400 hover:text-slate-600 bg-slate-50 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
            <span class="material-symbols-outlined text-[20px]">more_horiz</span>
          </button>
        </div>
        
        <!-- Mock bars -->
        <div class="absolute inset-x-7 bottom-[60px] top-[70px] flex items-end justify-around pb-0 opacity-[0.03]">
           <div class="w-12 bg-blue-600 rounded-t-lg h-[20%]"></div>
           <div class="w-12 bg-blue-600 rounded-t-lg h-[40%]"></div>
           <div class="w-12 bg-blue-600 rounded-t-lg h-[65%]"></div>
           <div class="w-12 bg-blue-600 rounded-t-lg h-[90%]"></div>
           <div class="w-12 bg-blue-600 rounded-t-lg h-[30%]"></div>
        </div>

        <div class="flex justify-around items-end pt-5 border-t border-slate-100 mt-auto relative z-10">
          <span class="text-[11px] font-bold text-slate-500 w-16 text-center">Intern</span>
          <span class="text-[11px] font-bold text-slate-500 w-16 text-center">Junior</span>
          <span class="text-[11px] font-bold text-slate-500 w-16 text-center">Senior</span>
          <span class="text-[11px] font-bold text-slate-500 w-16 text-center">Manager</span>
          <span class="text-[11px] font-bold text-slate-500 w-16 text-center">Director</span>
        </div>
      </div>

      <!-- Right Chart SVG -->
      <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex flex-col pt-7 pb-5 px-7 relative h-[320px]">
        <div class="flex justify-between items-center z-10 relative">
          <h2 class="text-[16px] font-[800] text-slate-800">Biến động nhân sự (6 tháng)</h2>
          <div class="flex items-center gap-4 text-[11px] font-bold text-slate-500">
            <div class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-[#3B5BDB]"></span>Tuyển mới</div>
            <div class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-slate-200"></span>Nghỉ việc</div>
          </div>
        </div>
        
        <!-- Pure SVG approximation of the smooth curve in the image -->
        <div class="flex-1 w-full relative mt-6">
           <!-- The Area Chart -->
           <svg class="w-full h-full" viewBox="0 0 500 180" preserveAspectRatio="none">
              <defs>
                 <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#3B5BDB" stop-opacity="0.2" />
                    <stop offset="100%" stop-color="#3B5BDB" stop-opacity="0" />
                 </linearGradient>
              </defs>
              
              <!-- Light grid lines -->
              <line x1="0" y1="45" x2="500" y2="45" stroke="#f1f5f9" stroke-width="1" />
              <line x1="0" y1="90" x2="500" y2="90" stroke="#f1f5f9" stroke-width="1" />
              <line x1="0" y1="135" x2="500" y2="135" stroke="#f1f5f9" stroke-width="1" />

              <!-- Filled Area -->
              <path class="transition-all duration-1000 ease-in-out" d="M 0 150 C 60 140 90 100 140 90 C 190 80 220 70 270 75 C 320 80 360 50 400 30 C 440 10 470 30 500 45 L 500 180 L 0 180 Z" fill="url(#curveGradient)" />
              
              <!-- Smooth Line -->
              <path class="transition-all duration-1000 ease-in-out" d="M 0 150 C 60 140 90 100 140 90 C 190 80 220 70 270 75 C 320 80 360 50 400 30 C 440 10 470 30 500 45" fill="none" stroke="#3B5BDB" stroke-width="3" stroke-linecap="round" />
              
              <!-- Data Points (White dot with blue border) -->
              <circle cx="140" cy="90" r="5" fill="#fff" stroke="#3B5BDB" stroke-width="2.5" class="hover:r-6 hover:stroke-[3px] transition-all cursor-pointer" />
              <circle cx="270" cy="75" r="5" fill="#fff" stroke="#3B5BDB" stroke-width="2.5" class="hover:r-6 hover:stroke-[3px] transition-all cursor-pointer" />
              <circle cx="400" cy="30" r="5" fill="#fff" stroke="#3B5BDB" stroke-width="2.5" class="hover:r-6 hover:stroke-[3px] transition-all cursor-pointer" />
              <circle cx="500" cy="45" r="5" fill="#fff" stroke="#3B5BDB" stroke-width="2.5" class="hover:r-6 hover:stroke-[3px] transition-all cursor-pointer" />
           </svg>
        </div>

        <div class="flex justify-between items-end mt-2 pt-2 relative z-10 w-full">
          <span class="text-[11px] font-bold text-slate-400">T1</span>
          <span class="text-[11px] font-bold text-slate-400">T2</span>
          <span class="text-[11px] font-bold text-slate-400">T3</span>
          <span class="text-[11px] font-bold text-slate-400">T4</span>
          <span class="text-[11px] font-bold text-slate-400">T5</span>
          <span class="text-[11px] font-bold text-slate-400">T6</span>
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
</style>
