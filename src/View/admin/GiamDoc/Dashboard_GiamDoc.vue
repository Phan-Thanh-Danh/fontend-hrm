<template>
  <div class="px-6 lg:px-10 py-8 max-w-[1600px] mx-auto w-full">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-slate-900 text-2xl font-bold">Bảng Điều Khiển Chiến Lược</h1>
        <p class="text-gray-500 text-sm mt-1">Chào buổi sáng, Thưa Giám đốc. Dưới đây là tóm tắt vận hành nhân sự toàn hệ thống.</p>
      </div>
      <div class="flex items-center gap-4">
        <!-- Date Filter -->
        <div class="flex items-center bg-white rounded-lg shadow-sm border border-slate-200 px-4 py-2.5 gap-2 text-sm text-slate-900 font-semibold cursor-pointer hover:bg-gray-50 transition-colors">
          <span class="material-symbols-rounded text-gray-400 text-[20px]">calendar_month</span>
          01/01/2024 - 31/01/2024
        </div>
        <!-- Export Button -->
        <button class="flex items-center bg-slate-900 dark:bg-slate-600 hover:bg-[#283144] focus:ring-4 focus:ring-gray-300 text-yellow-400 rounded-lg px-4 py-2.5 gap-2 text-sm font-bold transition-all shadow-md">
          <span class="material-symbols-rounded text-[18px]">download</span>
          Xuất báo cáo
        </button>
      </div>
    </div>

    <!-- Metrics Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      <!-- Card 1 -->
      <div class="bg-white rounded-[20px] p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-700">
            <span class="material-symbols-rounded">group</span>
          </div>
          <span class="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 font-bold px-2 py-0.5 rounded-full text-[11px]">+5.2%</span>
        </div>
        <p class="mt-5 text-[11px] uppercase font-bold text-gray-500 tracking-wider">Tổng nhân sự</p>
        <h3 class="text-[32px] font-bold text-slate-900 leading-none mt-2">1,250</h3>
      </div>
      <!-- Card 2 -->
      <div class="bg-white rounded-[20px] p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-700">
            <span class="material-symbols-rounded">sync</span>
          </div>
          <span class="bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 font-bold px-2 py-0.5 rounded-full text-[11px]">-0.5%</span>
        </div>
        <p class="mt-5 text-[11px] uppercase font-bold text-gray-500 tracking-wider">Tỷ lệ biến động</p>
        <h3 class="text-[32px] font-bold text-slate-900 leading-none mt-2">2.4%</h3>
      </div>
      <!-- Card 3 -->
      <div class="bg-white rounded-[20px] p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-700">
            <span class="material-symbols-rounded">payments</span>
          </div>
          <span class="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 font-bold px-2 py-0.5 rounded-full text-[11px]">+1.2%</span>
        </div>
        <p class="mt-5 text-[11px] uppercase font-bold text-gray-500 tracking-wider">Tổng quỹ lương tháng</p>
        <h3 class="text-[32px] font-bold text-slate-900 leading-none mt-2">8.5 tỷ</h3>
      </div>
      <!-- Card 4 -->
      <div class="bg-white rounded-[20px] p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-700">
            <span class="material-symbols-rounded">verified</span>
          </div>
          <span class="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 font-bold px-2 py-0.5 rounded-full text-[11px]">+0.8%</span>
        </div>
        <p class="mt-5 text-[11px] uppercase font-bold text-gray-500 tracking-wider">Chỉ số chuyên cần</p>
        <h3 class="text-[32px] font-bold text-slate-900 leading-none mt-2">98.2%</h3>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      
      <!-- Bar Chart Card -->
      <div class="lg:col-span-2 bg-white rounded-[20px] p-6 shadow-sm border border-slate-100">
        <div class="flex justify-between items-center mb-6">
          <h4 class="text-lg font-bold text-slate-900">Xu hướng tăng trưởng nhân sự</h4>
          <div class="flex gap-4 text-xs font-semibold text-gray-400">
            <span class="flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-slate-900 dark:bg-slate-600"></div>Hiện tại</span>
            <span class="flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-yellow-400"></div>Mục tiêu</span>
          </div>
        </div>
        
        <!-- Custom CSS Bar Chart Visual -->
        <div class="flex items-end justify-between h-[240px] px-2 md:px-6 w-full gap-4 mt-8 pb-4">
          <!-- Col 1 -->
          <div class="w-full flex justify-center h-[50%] relative group">
            <div class="absolute bottom-0 w-[50%] sm:w-[80%] max-w-[50px] bg-slate-50 rounded-t-[10px] h-full transition-colors group-hover:bg-[#e4e9e8]"></div>
            <div class="absolute bottom-0 w-[50%] sm:w-[80%] max-w-[50px] bg-slate-900 dark:bg-slate-600 rounded-t-[10px] h-[45%] shadow-md"></div>
            <!-- Marker -->
            <div class="absolute top-0 w-2 h-2 -mt-1 rounded-full bg-yellow-400 ring-2 ring-white"></div>
            <span class="absolute -bottom-7 text-[10px] font-bold text-gray-400">Tháng 8</span>
          </div>
          <!-- Col 2 -->
          <div class="w-full flex justify-center h-[60%] relative group">
            <div class="absolute bottom-0 w-[50%] sm:w-[80%] max-w-[50px] bg-slate-50 rounded-t-[10px] h-full transition-colors group-hover:bg-[#e4e9e8]"></div>
            <div class="absolute bottom-0 w-[50%] sm:w-[80%] max-w-[50px] bg-slate-900 dark:bg-slate-600 rounded-t-[10px] h-[50%] shadow-md"></div>
            <div class="absolute top-0 w-2 h-2 -mt-1 rounded-full bg-yellow-400 ring-2 ring-white"></div>
            <span class="absolute -bottom-7 text-[10px] font-bold text-gray-400">Tháng 9</span>
          </div>
          <!-- Col 3 -->
          <div class="w-full flex justify-center h-[72%] relative group">
            <div class="absolute bottom-0 w-[50%] sm:w-[80%] max-w-[50px] bg-slate-50 rounded-t-[10px] h-full transition-colors group-hover:bg-[#e4e9e8]"></div>
            <div class="absolute bottom-0 w-[50%] sm:w-[80%] max-w-[50px] bg-slate-900 dark:bg-slate-600 rounded-t-[10px] h-[65%] shadow-md"></div>
            <div class="absolute top-0 w-2 h-2 -mt-1 rounded-full bg-yellow-400 ring-2 ring-white"></div>
            <span class="absolute -bottom-7 text-[10px] font-bold text-gray-400">Tháng 10</span>
          </div>
          <!-- Col 4 -->
          <div class="w-full flex justify-center h-[82%] relative group">
            <div class="absolute bottom-0 w-[50%] sm:w-[80%] max-w-[50px] bg-slate-50 rounded-t-[10px] h-full transition-colors group-hover:bg-[#e4e9e8]"></div>
            <div class="absolute bottom-0 w-[50%] sm:w-[80%] max-w-[50px] bg-slate-900 dark:bg-slate-600 rounded-t-[10px] h-[90%] shadow-md"></div>
            <div class="absolute top-[8%] w-2 h-2 rounded-full bg-yellow-400 ring-2 ring-white"></div> <!-- Below top of dark bar -->
            <span class="absolute -bottom-7 text-[10px] font-bold text-gray-400">Tháng 11</span>
          </div>
          <!-- Col 5 -->
          <div class="w-full flex justify-center h-[90%] relative group">
            <div class="absolute bottom-0 w-[50%] sm:w-[80%] max-w-[50px] bg-slate-50 rounded-t-[10px] h-full transition-colors group-hover:bg-[#e4e9e8]"></div>
            <div class="absolute bottom-0 w-[50%] sm:w-[80%] max-w-[50px] bg-slate-900 dark:bg-slate-600 rounded-t-[10px] h-[95%] shadow-md"></div>
            <div class="absolute top-[3%] w-2 h-2 rounded-full bg-yellow-400 ring-2 ring-white"></div>
            <span class="absolute -bottom-7 text-[10px] font-bold text-gray-400">Tháng 12</span>
          </div>
          <!-- Col 6 -->
          <div class="w-full flex justify-center h-[100%] relative group">
            <div class="absolute bottom-0 w-[50%] sm:w-[80%] max-w-[50px] bg-slate-50 rounded-t-[10px] h-[95%] transition-colors group-hover:bg-[#e4e9e8]"></div>
            <div class="absolute bottom-0 w-[50%] sm:w-[80%] max-w-[50px] bg-slate-900 dark:bg-slate-600 rounded-t-[10px] h-[85%] shadow-md"></div>
            <div class="absolute top-[5%] w-2 h-2 rounded-full bg-yellow-400 ring-2 ring-white"></div>
            <span class="absolute -bottom-7 text-[10px] font-bold text-yellow-500">Tháng 1</span>
          </div>
        </div>
      </div>

      <!-- Donut Chart Card -->
      <div class="lg:col-span-1 bg-white rounded-[20px] p-6 shadow-sm border border-slate-100 flex flex-col">
        <h4 class="text-lg font-bold text-slate-900 mb-6">Cơ cấu Phòng ban</h4>
        
        <div class="flex-1 flex flex-col items-center justify-center pt-2">
          <!-- Donut visual -->
          <div class="donut-chart relative w-48 h-48 rounded-full shadow-inner ring-[16px] ring-white">
            <!-- Inner cutout -->
            <div class="absolute inset-4 rounded-full bg-white flex flex-col items-center justify-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)]">
              <span class="text-2xl font-black text-slate-900 leading-none">1,250</span>
              <span class="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">Nhân sự</span>
            </div>
          </div>
          
          <!-- Legend -->
          <div class="w-full mt-10 space-y-3 px-2">
            <div class="flex justify-between items-center text-sm font-bold text-gray-700">
              <div class="flex items-center gap-3">
                <div class="w-2.5 h-2.5 rounded-full bg-slate-900 dark:bg-slate-600"></div>Khối Sản xuất
              </div>
              <span class="text-slate-900">65%</span>
            </div>
            <div class="flex justify-between items-center text-sm font-bold text-gray-700">
              <div class="flex items-center gap-3">
                <div class="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>Khối Kinh doanh
              </div>
              <span class="text-slate-900">20%</span>
            </div>
            <div class="flex justify-between items-center text-sm font-bold text-gray-700">
              <div class="flex items-center gap-3">
                <div class="w-2.5 h-2.5 rounded-full bg-gray-400"></div>Khối Văn phòng
              </div>
              <span class="text-slate-900">15%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Lists Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 pb-12">
      
      <!-- Approvals List -->
      <div class="lg:col-span-2 bg-white rounded-[20px] shadow-sm border border-slate-100 flex flex-col">
        <div class="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
          <h4 class="text-lg font-bold text-slate-900">Yêu cầu chờ phê duyệt</h4>
          <span class="bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 px-3 py-1 rounded-full text-xs font-bold shadow-sm">03 khẩn cấp</span>
        </div>
        
        <div class="flex flex-col">
          <!-- Item 1 -->
          <div class="p-5 px-6 border-b border-slate-50 flex flex-col sm:flex-row gap-4 sm:items-center hover:bg-gray-50/50 transition-colors">
            <div class="w-12 h-12 rounded-full bg-yellow-50 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400 flex items-center justify-center shrink-0">
              <span class="material-symbols-rounded text-[24px]">person_add</span>
            </div>
            <div class="flex-1">
              <h5 class="text-sm font-bold text-slate-900">Tuyển dụng: Trưởng phòng Marketing</h5>
              <p class="text-xs text-gray-500 font-medium mt-1">Phòng Nhân sự &bull; Gửi 2 giờ trước</p>
            </div>
            <div class="flex items-center gap-2 mt-3 sm:mt-0">
              <button class="px-4 py-2 rounded-lg text-xs font-bold border border-slate-200 text-gray-600 bg-white hover:bg-gray-50 transition-colors">Từ chối</button>
              <button class="px-4 py-2 rounded-lg text-xs font-bold bg-slate-900 dark:bg-slate-600 hover:bg-[#283144] text-white shadow-md transition-colors">Duyệt ngay</button>
            </div>
          </div>
          
          <!-- Item 2 -->
          <div class="p-5 px-6 border-b border-slate-50 flex flex-col sm:flex-row gap-4 sm:items-center hover:bg-gray-50/50 transition-colors">
            <div class="w-12 h-12 rounded-full bg-yellow-50 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400 flex items-center justify-center shrink-0">
              <span class="material-symbols-rounded text-[24px]">trending_up</span>
            </div>
            <div class="flex-1">
              <h5 class="text-sm font-bold text-slate-900">Đề xuất tăng lương (Bùi Anh Tuấn)</h5>
              <p class="text-xs text-gray-500 font-medium mt-1">Khối Công nghệ &bull; Gửi 5 giờ trước</p>
            </div>
            <div class="flex items-center gap-2 mt-3 sm:mt-0">
              <button class="px-4 py-2 rounded-lg text-xs font-bold border border-slate-200 text-gray-600 bg-white hover:bg-gray-50 transition-colors">Chi tiết</button>
              <button class="px-4 py-2 rounded-lg text-xs font-bold bg-slate-900 dark:bg-slate-600 hover:bg-[#283144] text-white shadow-md transition-colors">Duyệt ngay</button>
            </div>
          </div>
          
          <!-- Item 3 -->
          <div class="p-5 px-6 flex flex-col sm:flex-row gap-4 sm:items-center hover:bg-gray-50/50 transition-colors">
            <div class="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/40 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
              <span class="material-symbols-rounded text-[24px]">warning</span>
            </div>
            <div class="flex-1">
              <h5 class="text-sm font-bold text-slate-900">Đơn thôi việc: Giám đốc sáng tạo</h5>
              <p class="text-xs text-pink-600 font-medium mt-1">Nhân sự chủ chốt &bull; Cần làm việc trực tiếp</p>
            </div>
            <div class="flex items-center gap-2 mt-3 sm:mt-0">
              <button class="px-5 py-2 rounded-lg text-xs font-bold bg-slate-900 dark:bg-slate-600 hover:bg-[#283144] text-white shadow-md transition-colors">Đặt lịch hẹn</button>
            </div>
          </div>
        </div>
        
        <button class="w-full block py-4 bg-gray-50 dark:bg-slate-800/80 text-gray-700 dark:text-slate-300 font-bold text-[11px] tracking-widest rounded-b-[20px] hover:bg-gray-100 hover:text-slate-900 transition-colors border-t border-slate-100 uppercase text-center mt-auto">
          Xem toàn bộ 12 yêu cầu
        </button>
      </div>

      <!-- Events Card -->
      <div class="lg:col-span-1 bg-slate-900 dark:bg-slate-600 rounded-[20px] p-7 shadow-xl relative overflow-hidden flex flex-col">
        <!-- Decoration light/glow -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

        <div class="flex items-center gap-3 mb-8">
          <span class="material-symbols-rounded text-yellow-400">calendar_month</span>
          <h4 class="text-lg font-bold text-yellow-400">Sự kiện quan trọng</h4>
        </div>

        <!-- Timeline -->
        <div class="relative flex-1">
          <!-- Timeline line -->
          <div class="absolute left-1.5 top-2.5 bottom-8 w-px bg-gradient-to-b from-white/20 to-transparent"></div>
          
          <div class="space-y-7">
            <!-- Timeline Item 1 -->
            <div class="relative pl-7">
              <div class="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-yellow-400 ring-4 ring-slate-900 z-10 shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
              <p class="text-[10px] text-yellow-400 font-bold mb-1 tracking-widest uppercase">09:00 - Hôm nay</p>
              <h5 class="text-white text-sm font-bold leading-tight">Họp Ban Giám đốc quý I</h5>
              <p class="text-white/50 text-[11px] font-medium mt-1">Phòng họp Star VIP</p>
            </div>
            
            <!-- Timeline Item 2 -->
            <div class="relative pl-7 opacity-80">
              <div class="absolute left-[2px] top-1.5 w-2 h-2 rounded-full bg-gray-500 ring-4 ring-slate-900 z-10"></div>
              <p class="text-[10px] text-white/40 font-bold mb-1 tracking-widest uppercase">25/01/2024</p>
              <h5 class="text-gray-300 text-sm font-bold leading-tight">Kỷ niệm 10 năm thành lập</h5>
              <p class="text-white/40 text-[11px] font-medium mt-1">Trung tâm Hội nghị Quốc gia</p>
            </div>
            
            <!-- Timeline Item 3 -->
            <div class="relative pl-7 opacity-80">
              <div class="absolute left-[2px] top-1.5 w-2 h-2 rounded-full bg-gray-500 ring-4 ring-slate-900 z-10"></div>
              <p class="text-[10px] text-white/40 font-bold mb-1 tracking-widest uppercase">30/01/2024</p>
              <h5 class="text-gray-300 text-sm font-bold leading-tight">Hạn cuối đánh giá OKR năm</h5>
              <p class="text-white/40 text-[11px] font-medium mt-1">Toàn bộ các khối phòng ban</p>
            </div>
          </div>
        </div>

        <!-- Reminder Card -->
        <div class="mt-8 bg-[#1e2536]/80 backdrop-blur-sm border border-white/5 rounded-[12px] p-5 relative z-10 shadow-inner">
          <h6 class="text-[10px] text-yellow-400 uppercase tracking-widest font-bold mb-2.5">Lời nhắc của bạn</h6>
          <p class="text-white/80 text-[13px] leading-relaxed italic mb-4">
            "Tổ chức buổi tiệc tri ân nhân viên xuất sắc vào thứ Sáu này."
          </p>
          <a href="#" class="inline-flex items-center gap-1.5 text-white/90 text-[11px] font-bold hover:text-yellow-400 transition-colors uppercase tracking-wider">
            Chỉnh sửa <span class="material-symbols-rounded text-[14px]">edit</span>
          </a>
        </div>
        
      </div>

    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.donut-chart {
  background: conic-gradient(#0f172a 0% 65%, #fbbf24 65% 85%, #9ca3af 85% 100%);
}
:root[class~="dark"] .donut-chart,
html.dark .donut-chart {
  background: conic-gradient(#475569 0% 65%, #fbbf24 65% 85%, #9ca3af 85% 100%);
}
</style>
