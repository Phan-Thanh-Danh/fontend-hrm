<template>
  <div class="p-6 md:p-8 space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-[24px] font-[800] text-[var(--sys-text-primary)] tracking-tight">Tổng Quan Quỹ Lương</h1>
        <p class="text-sm text-[var(--sys-text-secondary)] mt-1 font-medium">Báo cáo chi tiết chi phí nhân sự tháng hiện tại dành cho Ban Giám Đốc</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="flex items-center gap-2 px-4 py-2.5 bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold text-[var(--sys-text-primary)] hover:bg-[var(--sys-bg-hover)] transition-colors shadow-sm">
          <span class="material-symbols-outlined text-[18px]">calendar_today</span>
          Tháng 10, 2023
        </button>
        <button class="flex items-center gap-2 px-5 py-2.5 bg-[var(--sys-brand-solid)] border border-transparent rounded-xl text-sm font-bold text-white hover:bg-[var(--sys-brand-hover)] transition-colors shadow-lg shadow-[var(--sys-brand-solid-lch-30)]">
          <span class="material-symbols-outlined text-[18px]">download</span>
          Xuất báo cáo
        </button>
      </div>
    </div>

    <!-- 4 KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      <!-- Card 1 -->
      <div class="bg-[var(--sys-bg-surface)] rounded-2xl p-6 border border-[var(--sys-border-subtle)] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] transition-all">
        <div class="flex justify-between items-start">
          <h3 class="text-[12px] font-bold text-[var(--sys-text-secondary)]">Tổng quỹ lương</h3>
          <div class="w-10 h-10 rounded-xl bg-[var(--sys-brand-soft)] flex items-center justify-center">
            <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-[20px]">payments</span>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-[24px] font-[900] text-[var(--sys-text-primary)] leading-tight">5.280.000.000đ</p>
          <div class="flex items-center gap-1.5 mt-3">
            <span class="flex items-center text-[11px] font-bold text-[var(--sys-success-text)]">
              <span class="material-symbols-outlined text-[14px]">trending_up</span>
              +2.5%
            </span>
            <span class="text-[11px] font-semibold text-[var(--sys-text-secondary)]/50">vs tháng trước</span>
          </div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="bg-[var(--sys-bg-surface)] rounded-2xl p-6 border border-[var(--sys-border-subtle)] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] transition-all">
        <div class="flex justify-between items-start">
          <h3 class="text-[12px] font-bold text-[var(--sys-text-secondary)]">Lương cơ bản</h3>
          <div class="w-10 h-10 rounded-xl bg-[var(--sys-brand-soft)]/50 flex items-center justify-center">
            <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-[20px]">account_balance_wallet</span>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-[24px] font-[900] text-[var(--sys-text-primary)] leading-tight">4.150.000.000đ</p>
          <div class="flex items-center gap-1.5 mt-3">
             <span class="flex items-center text-[11px] font-bold text-[var(--sys-danger-text)]">
              <span class="material-symbols-outlined text-[14px]">trending_down</span>
              -1.2%
            </span>
            <span class="text-[11px] font-semibold text-[var(--sys-text-secondary)]/50">vs tháng trước</span>
          </div>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="bg-[var(--sys-bg-surface)] rounded-2xl p-6 border border-[var(--sys-border-subtle)] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] transition-all">
        <div class="flex justify-between items-start">
          <h3 class="text-[12px] font-bold text-[var(--sys-text-secondary)]">Thưởng & Phụ cấp</h3>
          <div class="w-10 h-10 rounded-xl bg-[var(--sys-brand-soft)] flex items-center justify-center">
            <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-[20px]">redeem</span>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-[24px] font-[900] text-[var(--sys-text-primary)] leading-tight">850.000.000đ</p>
           <div class="flex items-center gap-1.5 mt-3">
            <span class="flex items-center text-[11px] font-bold text-[var(--sys-success-text)]">
              <span class="material-symbols-outlined text-[14px]">trending_up</span>
              +5.8%
            </span>
            <span class="text-[11px] font-semibold text-[var(--sys-text-secondary)]/50">vs tháng trước</span>
          </div>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="bg-[var(--sys-bg-surface)] rounded-2xl p-6 border border-[var(--sys-border-subtle)] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] transition-all">
        <div class="flex justify-between items-start">
          <h3 class="text-[12px] font-bold text-[var(--sys-text-secondary)]">Khấu trừ (Thuế/BH)</h3>
          <div class="w-10 h-10 rounded-xl bg-[var(--sys-brand-soft)]/50 flex items-center justify-center">
            <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-[20px]">receipt_long</span>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-[24px] font-[900] text-[var(--sys-text-primary)] leading-tight">280.000.000đ</p>
           <div class="flex items-center gap-1.5 mt-3">
            <span class="flex items-center text-[11px] font-bold text-[var(--sys-success-text)]">
              <span class="material-symbols-outlined text-[14px]">trending_up</span>
              +0.5%
            </span>
            <span class="text-[11px] font-semibold text-[var(--sys-text-secondary)]/50">vs tháng trước</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
      
      <!-- Left Chart Placeholder -->
      <div class="bg-[var(--sys-bg-surface)] rounded-2xl border border-[var(--sys-border-subtle)] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex flex-col pt-7 pb-5 px-7 relative h-[320px]">
        <div class="flex justify-between items-start mb-auto relative z-10">
          <h2 class="text-[16px] font-[800] text-[var(--sys-text-primary)]">Quỹ lương theo Phòng ban</h2>
          <span class="text-[11px] font-bold text-[var(--sys-text-secondary)]/60 bg-[var(--sys-bg-hover)] px-3 py-1 rounded-md">Đơn vị: Tỷ VNĐ</span>
        </div>
        
        <!-- Mock bars -->
        <div class="absolute inset-x-7 bottom-[60px] top-[70px] flex items-end justify-around pb-0 opacity-[0.05]">
           <div class="w-12 bg-[var(--sys-brand-solid)] rounded-t-lg h-[80%]"></div>
           <div class="w-12 bg-[var(--sys-brand-solid)] rounded-t-lg h-[50%]"></div>
           <div class="w-12 bg-[var(--sys-brand-solid)] rounded-t-lg h-[30%]"></div>
           <div class="w-12 bg-[var(--sys-brand-solid)] rounded-t-lg h-[20%]"></div>
           <div class="w-12 bg-[var(--sys-brand-solid)] rounded-t-lg h-[10%]"></div>
        </div>

        <div class="flex justify-around items-end pt-5 mt-auto relative z-10">
          <span class="text-[11px] font-bold text-[var(--sys-text-secondary)]/50 w-16 text-center italic">Kỹ thuật</span>
          <span class="text-[11px] font-bold text-[var(--sys-text-secondary)]/50 w-16 text-center italic">Kinh doanh</span>
          <span class="text-[11px] font-bold text-[var(--sys-text-secondary)]/50 w-16 text-center italic">Marketing</span>
          <span class="text-[11px] font-bold text-[var(--sys-text-secondary)]/50 w-16 text-center italic">Vận hành</span>
          <span class="text-[11px] font-bold text-[var(--sys-text-secondary)]/50 w-16 text-center italic">Nhân sự</span>
        </div>
      </div>

      <!-- Right Chart SVG -->
      <!-- Right Chart SVG -->
      <div class="bg-[var(--sys-bg-surface)] rounded-2xl border border-[var(--sys-border-subtle)] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] flex flex-col pt-7 pb-5 px-7 relative h-[320px]">
        <div class="flex justify-between items-start z-10 relative">
          <div>
            <h2 class="text-[16px] font-[800] text-[var(--sys-text-primary)]">Xu hướng 6 tháng</h2>
            <p class="text-[11px] font-semibold text-[var(--sys-text-secondary)]/50 mt-1 italic">Tăng trưởng trung bình 3.2%</p>
          </div>
          <div class="flex items-center gap-4 text-[11px] font-bold text-[var(--sys-text-secondary)]/60">
            <div class="flex items-center gap-1.5 uppercase tracking-widest"><span class="w-2 h-2 rounded-full bg-[var(--sys-brand-solid)] shadow-sm"></span>Quỹ lương</div>
          </div>
        </div>
        
        <!-- Pure SVG approximation of the smooth curve in the image -->
        <div class="flex-1 w-full relative mt-6">
           <!-- The Area Chart -->
           <svg class="w-full h-[160px]" viewBox="0 0 500 160" preserveAspectRatio="none">
              <defs>
                 <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--sys-brand-solid-lch-30)" stop-opacity="0.15" />
                    <stop offset="100%" stop-color="var(--sys-brand-solid-lch-30)" stop-opacity="0" />
                 </linearGradient>
              </defs>
              
              <!-- Filled Area -->
              <path class="transition-all duration-1000 ease-in-out" d="M 0 130 C 50 100 100 100 150 120 C 200 140 220 120 270 90 C 320 60 350 20 400 40 C 450 60 480 140 500 100 L 500 160 L 0 160 Z" fill="url(#curveGradient)" />
              
              <!-- Smooth Line -->
              <path class="transition-all duration-1000 ease-in-out" d="M 0 130 C 50 100 100 100 150 120 C 200 140 220 120 270 90 C 320 60 350 20 400 40 C 450 60 480 140 500 100" fill="none" stroke="var(--sys-brand-solid)" stroke-width="3.5" stroke-linecap="round" />
           </svg>
        </div>

        <div class="flex justify-between items-end mt-2 pt-2 relative z-10 w-full px-2">
          <span class="text-[11px] font-bold text-[var(--sys-text-secondary)]/30 italic">Th5</span>
          <span class="text-[11px] font-bold text-[var(--sys-text-secondary)]/30 italic">Th6</span>
          <span class="text-[11px] font-bold text-[var(--sys-text-secondary)]/30 italic">Th7</span>
          <span class="text-[11px] font-bold text-[var(--sys-text-secondary)]/30 italic">Th8</span>
          <span class="text-[11px] font-bold text-[var(--sys-text-secondary)]/30 italic">Th9</span>
          <span class="text-[11px] font-bold text-[var(--sys-text-secondary)]/30 italic">Th10</span>
        </div>
      </div>
    </div>

    <!-- Bottom Lists Row -->
    <div class="bg-[var(--sys-bg-surface)] rounded-2xl border border-[var(--sys-border-subtle)] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] p-7 flex flex-col">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-[16px] font-[800] text-[var(--sys-text-primary)]">Chi tiết chi phí theo bộ phận</h2>
        
        <div class="relative w-64 hidden sm:block">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--sys-text-secondary)]/40 text-[18px]">search</span>
          <input type="text" placeholder="Tìm bộ phận..." class="w-full pl-9 pr-4 py-2 bg-[var(--sys-bg-hover)]/30 border border-[var(--sys-border-subtle)] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[var(--sys-brand-solid)]/20 focus:border-[var(--sys-brand-solid)] transition-all font-medium text-[var(--sys-text-primary)]">
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-[var(--sys-border-subtle)]">
              <th class="py-4 px-2 text-[12px] font-[800] text-[var(--sys-text-secondary)] whitespace-nowrap uppercase tracking-widest italic">Phòng ban</th>
              <th class="py-4 px-2 text-[12px] font-[800] text-[var(--sys-text-secondary)] whitespace-nowrap text-center uppercase tracking-widest italic">Số nhân viên</th>
              <th class="py-4 px-2 text-[12px] font-[800] text-[var(--sys-text-secondary)] whitespace-nowrap text-right uppercase tracking-widest italic">Tổng lương cơ bản</th>
              <th class="py-4 px-2 text-[12px] font-[800] text-[var(--sys-text-secondary)] whitespace-nowrap text-right uppercase tracking-widest italic">Thưởng & Phụ cấp</th>
              <th class="py-4 px-2 text-[12px] font-[800] text-[var(--sys-text-secondary)] whitespace-nowrap text-right uppercase tracking-widest italic">Tổng chi phí</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--sys-border-subtle)]/30">
            <tr class="hover:bg-[var(--sys-bg-hover)] transition-colors group">
              <td class="py-4 px-2 text-[13px] font-[800] text-[var(--sys-text-primary)]">Phòng Kỹ thuật</td>
              <td class="py-4 px-2 text-[13px] font-medium text-[var(--sys-text-secondary)]/80 text-center uppercase tracking-tighter">120</td>
              <td class="py-4 px-2 text-[13px] font-medium text-[var(--sys-text-secondary)]/80 text-right uppercase tracking-tighter">2.100.000.000đ</td>
              <td class="py-4 px-2 text-[13px] font-medium text-[var(--sys-text-secondary)]/80 text-right uppercase tracking-tighter">450.000.000đ</td>
              <td class="py-4 px-2 text-[13px] font-[800] text-[var(--sys-brand-solid)] text-right uppercase tracking-tighter">2.550.000.000đ</td>
            </tr>
            <tr class="hover:bg-[var(--sys-bg-hover)] transition-colors group">
              <td class="py-4 px-2 text-[13px] font-[800] text-[var(--sys-text-primary)]">Phòng Kinh doanh</td>
              <td class="py-4 px-2 text-[13px] font-medium text-[var(--sys-text-secondary)]/80 text-center uppercase tracking-tighter">85</td>
              <td class="py-4 px-2 text-[13px] font-medium text-[var(--sys-text-secondary)]/80 text-right uppercase tracking-tighter">1.200.000.000đ</td>
              <td class="py-4 px-2 text-[13px] font-medium text-[var(--sys-text-secondary)]/80 text-right uppercase tracking-tighter">300.000.000đ</td>
              <td class="py-4 px-2 text-[13px] font-[800] text-[var(--sys-brand-solid)] text-right uppercase tracking-tighter">1.500.000.000đ</td>
            </tr>
            <tr class="hover:bg-[var(--sys-bg-hover)] transition-colors group">
              <td class="py-4 px-2 text-[13px] font-[800] text-[var(--sys-text-primary)]">Phòng Marketing</td>
              <td class="py-4 px-2 text-[13px] font-medium text-[var(--sys-text-secondary)]/80 text-center uppercase tracking-tighter">45</td>
              <td class="py-4 px-2 text-[13px] font-medium text-[var(--sys-text-secondary)]/80 text-right uppercase tracking-tighter">650.000.000đ</td>
              <td class="py-4 px-2 text-[13px] font-medium text-[var(--sys-text-secondary)]/80 text-right uppercase tracking-tighter">60.000.000đ</td>
              <td class="py-4 px-2 text-[13px] font-[800] text-[var(--sys-brand-solid)] text-right uppercase tracking-tighter">710.000.000đ</td>
            </tr>
             <tr class="hover:bg-[var(--sys-bg-hover)] transition-colors group">
              <td class="py-4 px-2 text-[13px] font-[800] text-[var(--sys-text-primary)]">Phòng Vận hành</td>
              <td class="py-4 px-2 text-[13px] font-medium text-[var(--sys-text-secondary)]/80 text-center uppercase tracking-tighter">30</td>
              <td class="py-4 px-2 text-[13px] font-medium text-[var(--sys-text-secondary)]/80 text-right uppercase tracking-tighter">350.000.000đ</td>
              <td class="py-4 px-2 text-[13px] font-medium text-[var(--sys-text-secondary)]/80 text-right uppercase tracking-tighter">25.000.000đ</td>
              <td class="py-4 px-2 text-[13px] font-[800] text-[var(--sys-brand-solid)] text-right uppercase tracking-tighter">375.000.000đ</td>
            </tr>
             <tr class="hover:bg-[var(--sys-bg-hover)] transition-colors group border-b-2 border-[var(--sys-border-subtle)]">
              <td class="py-4 px-2 text-[13px] font-[800] text-[var(--sys-text-primary)]">Phòng Nhân sự</td>
              <td class="py-4 px-2 text-[13px] font-medium text-[var(--sys-text-secondary)]/80 text-center uppercase tracking-tighter">12</td>
              <td class="py-4 px-2 text-[13px] font-medium text-[var(--sys-text-secondary)]/80 text-right uppercase tracking-tighter">150.000.000đ</td>
              <td class="py-4 px-2 text-[13px] font-medium text-[var(--sys-text-secondary)]/80 text-right uppercase tracking-tighter">15.000.000đ</td>
              <td class="py-4 px-2 text-[13px] font-[800] text-[var(--sys-brand-solid)] text-right uppercase tracking-tighter">165.000.000đ</td>
            </tr>
             <tr class="bg-[var(--sys-bg-hover)]/30">
              <td class="py-5 px-2 text-[14px] font-[900] text-[var(--sys-text-primary)] uppercase italic">Tổng cộng</td>
              <td class="py-5 px-2 text-[14px] font-[900] text-[var(--sys-text-primary)] text-center uppercase tracking-tighter">292</td>
              <td class="py-5 px-2 text-[14px] font-[900] text-[var(--sys-text-primary)] text-right uppercase tracking-tighter">4.450.000.000đ</td>
              <td class="py-5 px-2 text-[14px] font-[900] text-[var(--sys-text-primary)] text-right uppercase tracking-tighter">850.000.000đ</td>
              <td class="py-5 px-2 text-[14px] font-[900] text-[var(--sys-brand-solid)] text-right uppercase tracking-tighter">5.300.000.000đ</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="mt-4 flex items-center justify-between text-[12px] text-[var(--sys-text-secondary)]/40 italic font-bold">
        <span>Hiển thị 5 trên 5 bộ phận</span>
        <button class="w-8 h-8 rounded border border-[var(--sys-border-subtle)] flex items-center justify-center hover:bg-[var(--sys-bg-hover)] transition-colors font-black">1</button>
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
