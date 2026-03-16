<template>
  <div class="dashboard">

    <!-- ══════════════════════════════════════════
         PAGE HEADER
    ══════════════════════════════════════════════ -->
    <!-- Page Header -->
    <div class="mb-8 flex flex-wrap justify-between items-end gap-6 bg-transparent text-left">
      <div class="bg-transparent text-left">
        <h1 class="text-2xl font-black text-[var(--sys-text-primary)] tracking-tight italic uppercase bg-transparent">Bảng Điều Khiển Chiến Lược</h1>
        <p class="text-[var(--sys-text-secondary)] text-sm font-medium italic mt-1 flex items-center gap-2 bg-transparent">
          <span class="material-symbols-rounded text-base">wb_sunny</span>
          Chào buổi sáng, Dữ liệu được cập nhật mới nhất. 
        </p>
      </div>
      <div class="flex items-center gap-4 bg-transparent">
        <div class="flex items-center gap-2 px-5 py-2.5 bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-2xl text-[var(--sys-text-primary)] text-xs font-black shadow-sm cursor-pointer hover:border-[var(--sys-brand-solid)] transition-all">
          <span class="material-symbols-rounded text-lg text-[var(--sys-icon-default)]">calendar_month</span>
          <span>01/01/2024 – 31/01/2024</span>
          <span class="material-symbols-rounded text-lg text-[var(--sys-icon-default)]">expand_more</span>
        </div>
        <button class="px-6 py-2.5 bg-[var(--sys-brand-solid)] text-white rounded-2xl text-xs font-black hover:bg-[var(--sys-brand-hover)] shadow-xl shadow-[var(--sys-brand-solid-lch-30)] transition-all flex items-center gap-2 uppercase tracking-widest">
          <span class="material-symbols-rounded text-lg">download</span>
          Xuất báo cáo
        </button>
      </div>
    </div>

    <!-- ══════════════════════════════════════════
         KPI CARDS
    ══════════════════════════════════════════════ -->
    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 bg-transparent text-left">
      <!-- Card: Tổng nhân sự -->
      <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all cursor-pointer group text-left" @click="$router.push('/giam-doc/nhan-su')">
        <div class="flex justify-between items-start mb-4 bg-transparent">
          <div class="w-12 h-12 rounded-2xl bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center shadow-inner">
            <span class="material-symbols-rounded text-2xl font-normal">group</span>
          </div>
          <span class="px-3 py-1 rounded-full bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm border border-[var(--sys-success-border)]">
            <span class="material-symbols-rounded text-xs">trending_up</span>+5.2%
          </span>
        </div>
        <p class="text-[10px] font-black text-[var(--sys-text-secondary)]/40 uppercase tracking-[0.2em] mb-1 italic bg-transparent">Tổng nhân sự</p>
        <h3 class="text-3xl font-black text-[var(--sys-text-primary)] tracking-tight mb-4 bg-transparent">1,250</h3>
        <div class="flex items-center justify-between gap-4 bg-transparent">
          <div class="flex items-end gap-1 h-8 flex-1 bg-transparent">
            <div class="flex-1 bg-[var(--sys-border-subtle)] rounded-t-sm" style="height:40%"></div>
            <div class="flex-1 bg-[var(--sys-border-subtle)] rounded-t-sm" style="height:55%"></div>
            <div class="flex-1 bg-[var(--sys-border-subtle)] rounded-t-sm" style="height:70%"></div>
            <div class="flex-1 bg-[var(--sys-border-subtle)] rounded-t-sm" style="height:65%"></div>
            <div class="flex-1 bg-[var(--sys-border-subtle)] rounded-t-sm" style="height:85%"></div>
            <div class="flex-1 bg-[var(--sys-brand-solid)] rounded-t-sm shadow-lg shadow-[var(--sys-brand-solid-lch-30)]" style="height:100%"></div>
          </div>
          <span class="text-[9px] font-bold text-[var(--sys-text-secondary)]/50 italic whitespace-nowrap bg-transparent">so với tháng trước</span>
        </div>
      </div>

      <!-- Card: Tỷ lệ biến động -->
      <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all cursor-pointer group text-left">
        <div class="flex justify-between items-start mb-4 bg-transparent">
          <div class="w-12 h-12 rounded-2xl bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] flex items-center justify-center shadow-inner">
            <span class="material-symbols-rounded text-2xl font-normal">sync</span>
          </div>
          <span class="px-3 py-1 rounded-full bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm border border-[var(--sys-danger-border)]">
            <span class="material-symbols-rounded text-xs">trending_down</span>-0.5%
          </span>
        </div>
        <p class="text-[10px] font-black text-[var(--sys-text-secondary)]/40 uppercase tracking-[0.2em] mb-1 italic bg-transparent text-left">Tỷ lệ biến động</p>
        <h3 class="text-3xl font-black text-[var(--sys-text-primary)] tracking-tight mb-4 bg-transparent text-left">2.4%</h3>
        <div class="flex items-center justify-between gap-4 bg-transparent text-left">
          <div class="flex items-end gap-1 h-8 flex-1 bg-transparent text-left">
            <div class="flex-1 bg-[var(--sys-danger-soft)] rounded-t-sm" style="height:70%"></div>
            <div class="flex-1 bg-[var(--sys-danger-soft)] rounded-t-sm" style="height:60%"></div>
            <div class="flex-1 bg-[var(--sys-danger-soft)] rounded-t-sm" style="height:50%"></div>
            <div class="flex-1 bg-[var(--sys-danger-soft)] rounded-t-sm" style="height:45%"></div>
            <div class="flex-1 bg-[var(--sys-danger-soft)] rounded-t-sm" style="height:40%"></div>
            <div class="flex-1 bg-[var(--sys-danger-solid)] rounded-t-sm shadow-lg shadow-[var(--sys-danger-solid-lch-30)]" style="height:30%"></div>
          </div>
          <span class="text-[9px] font-bold text-[var(--sys-text-secondary)]/50 italic whitespace-nowrap bg-transparent text-left">cải thiện 0.5%</span>
        </div>
      </div>

      <!-- Card: Quỹ lương -->
      <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all cursor-pointer group text-left" @click="$router.push('/giam-doc/bang-luong')">
        <div class="flex justify-between items-start mb-4 bg-transparent">
          <div class="w-12 h-12 rounded-2xl bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] flex items-center justify-center shadow-inner">
            <span class="material-symbols-rounded text-2xl font-normal">payments</span>
          </div>
          <span class="px-3 py-1 rounded-full bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm border border-[var(--sys-success-border)]">
            <span class="material-symbols-rounded text-xs">trending_up</span>+1.2%
          </span>
        </div>
        <p class="text-[10px] font-black text-[var(--sys-text-secondary)]/40 uppercase tracking-[0.2em] mb-1 italic bg-transparent text-left">Tổng quỹ lương tháng</p>
        <h3 class="text-3xl font-black text-[var(--sys-text-primary)] tracking-tight mb-4 bg-transparent text-left">8.5 tỷ</h3>
        <div class="flex items-center justify-between gap-4 bg-transparent text-left">
          <div class="flex-1 h-2 bg-[var(--sys-bg-hover)] rounded-full overflow-hidden bg-transparent">
            <div class="h-full bg-[var(--sys-brand-solid)] rounded-full shadow-lg shadow-[var(--sys-brand-solid-lch-30)]" style="width:85%"></div>
          </div>
          <span class="text-[9px] font-bold text-[var(--sys-text-secondary)]/50 italic whitespace-nowrap bg-transparent text-left">85% ngân sách</span>
        </div>
      </div>

      <!-- Card: Chuyên cần -->
      <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all cursor-pointer group text-left">
        <div class="flex justify-between items-start mb-4 bg-transparent text-left">
          <div class="w-12 h-12 rounded-2xl bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] flex items-center justify-center shadow-inner">
            <span class="material-symbols-rounded text-2xl font-normal">verified</span>
          </div>
          <span class="px-3 py-1 rounded-full bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm border border-[var(--sys-success-border)]">
            <span class="material-symbols-rounded text-xs">trending_up</span>+0.8%
          </span>
        </div>
        <p class="text-[10px] font-black text-[var(--sys-text-secondary)]/40 uppercase tracking-[0.2em] mb-1 italic bg-transparent text-left">Chỉ số chuyên cần</p>
        <h3 class="text-3xl font-black text-[var(--sys-text-primary)] tracking-tight mb-4 bg-transparent text-left">98.2%</h3>
        <div class="flex items-center justify-between gap-4 bg-transparent text-left">
          <div class="flex-1 h-2 bg-[var(--sys-bg-hover)] rounded-full overflow-hidden bg-transparent">
            <div class="h-full bg-[var(--sys-warning-solid)] rounded-full shadow-lg shadow-[var(--sys-warning-solid-lch-30)]" style="width:98%"></div>
          </div>
          <span class="text-[9px] font-bold text-[var(--sys-text-secondary)]/50 italic whitespace-nowrap bg-transparent text-left">Xuất sắc</span>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════
         CHARTS ROW
    ══════════════════════════════════════════════ -->
    <!-- Charts Grid -->
    <div class="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8 mb-8 bg-transparent text-left">

      <!-- Bar Chart -->
      <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-[2.5rem] p-8 shadow-sm flex flex-col bg-transparent text-left text-left">
        <div class="flex justify-between items-start mb-8 bg-transparent text-left">
          <div class="bg-transparent text-left">
            <h4 class="text-sm font-black text-[var(--sys-text-primary)] uppercase tracking-widest italic bg-transparent">Xu hướng tăng trưởng nhân sự</h4>
            <p class="text-xs font-bold text-[var(--sys-text-secondary)]/40 italic bg-transparent">6 tháng gần nhất</p>
          </div>
          <div class="flex gap-6 bg-transparent">
            <span class="flex items-center gap-2 text-[10px] font-black text-[var(--sys-text-secondary)]/60 uppercase tracking-widest bg-transparent">
              <span class="w-2 h-2 rounded-full bg-[var(--sys-brand-solid)] shadow-sm"></span>Hiện tại
            </span>
            <span class="flex items-center gap-2 text-[10px] font-black text-[var(--sys-text-secondary)]/40 uppercase tracking-widest bg-transparent">
              <span class="w-2 h-2 rounded-full bg-[var(--sys-warning-solid)]/40 shadow-sm"></span>Mục tiêu
            </span>
          </div>
        </div>

        <div class="relative h-[280px] flex items-end gap-4 px-2 bg-transparent text-left">
          <!-- Bars -->
          <div class="flex-1 flex items-end gap-6 bg-transparent text-left">
            <div class="flex-1 flex flex-col items-center gap-4 group bg-transparent text-left text-left" v-for="(col, i) in barChartData" :key="i">
              <div class="w-full relative flex items-end justify-center bg-transparent text-left" style="height: 220px;">
                <!-- Target Bar -->
                <div class="absolute bottom-0 w-full bg-[var(--sys-bg-hover)]/30 border border-[var(--sys-border-subtle)]/50 rounded-xl transition-all" :style="`height:${col.target}%`"></div>
                <!-- Current Bar -->
                <div class="relative w-full rounded-xl transition-all duration-500 cursor-pointer overflow-hidden" 
                     :class="col.active ? 'bg-[var(--sys-brand-solid)] shadow-xl shadow-[var(--sys-brand-solid-lch-30)]' : 'bg-[var(--sys-brand-soft)]/60 hover:bg-[var(--sys-brand-soft)]'"
                     :style="`height:${col.current}%` ">
                  <div class="absolute top-2 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black text-white italic bg-transparent">{{ col.value }}</div>
                </div>
              </div>
              <span class="text-[10px] font-black uppercase tracking-widest italic transition-all" :class="col.active ? 'text-[var(--sys-brand-solid)]' : 'text-[var(--sys-text-secondary)]/30'">{{ col.label }}</span>
            </div>
          </div>
          
          <!-- Y-axis Guidelines -->
          <div class="absolute inset-0 flex flex-col justify-between pointer-events-none pb-12 bg-transparent text-left">
            <div class="border-t border-[var(--sys-border-subtle)]/30 w-full flex justify-end"><span class="text-[8px] font-bold text-[var(--sys-text-secondary)]/20 mt-1 mr-[-40px]">1,300</span></div>
            <div class="border-t border-[var(--sys-border-subtle)]/20 w-full flex justify-end"><span class="text-[8px] font-bold text-[var(--sys-text-secondary)]/20 mt-1 mr-[-40px]">1,200</span></div>
            <div class="border-t border-[var(--sys-border-subtle)]/30 w-full flex justify-end"><span class="text-[8px] font-bold text-[var(--sys-text-secondary)]/20 mt-1 mr-[-40px]">1,100</span></div>
            <div class="border-t border-[var(--sys-border-subtle)]/20 w-full flex justify-end"><span class="text-[8px] font-bold text-[var(--sys-text-secondary)]/20 mt-1 mr-[-40px]">1,000</span></div>
          </div>
        </div>
      </div>

      <!-- Donut Chart -->
      <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-[2.5rem] p-8 shadow-sm flex flex-col bg-transparent text-left text-left">
        <div class="mb-8 bg-transparent text-left">
          <h4 class="text-sm font-black text-[var(--sys-text-primary)] uppercase tracking-widest italic bg-transparent">Cơ cấu phòng ban</h4>
        </div>

        <div class="flex justify-center mb-10 bg-transparent text-left">
          <div class="w-44 h-44 rounded-full flex items-center justify-center shadow-xl shadow-[var(--sys-brand-solid-lch-30)]/10"
               style="background: conic-gradient(var(--sys-brand-solid) 0% 65%, var(--sys-warning-solid) 65% 85%, var(--sys-text-secondary) 85% 100%)">
            <div class="w-32 h-32 rounded-full bg-[var(--sys-bg-surface)] border-2 border-[var(--sys-border-subtle)] shadow-inner flex flex-col items-center justify-center bg-transparent">
              <span class="text-2xl font-black text-[var(--sys-text-primary)] tracking-tighter bg-transparent">1,250</span>
              <span class="text-[10px] font-black text-[var(--sys-text-secondary)]/40 uppercase tracking-widest italic bg-transparent">Nhân sự</span>
            </div>
          </div>
        </div>

        <div class="space-y-6 bg-transparent text-left">
          <div class="bg-transparent text-left" v-for="item in donutData" :key="item.label">
            <div class="flex justify-between items-center mb-2 bg-transparent text-left">
              <div class="flex items-center gap-3 bg-transparent text-left">
                <span class="w-2.5 h-2.5 rounded-full shadow-sm" :style="`background: var(--sys-${item.label.includes('Sản xuất') ? 'brand-solid' : item.label.includes('Kinh doanh') ? 'warning-solid' : 'text-secondary'})`"></span>
                <span class="text-[11px] font-black text-[var(--sys-text-primary)] uppercase tracking-wider bg-transparent text-left">{{ item.label }}</span>
              </div>
              <span class="text-xs font-black text-[var(--sys-text-primary)] bg-transparent text-left">{{ item.pct }}%</span>
            </div>
            <div class="h-1.5 w-full bg-[var(--sys-bg-hover)] rounded-full overflow-hidden shadow-inner bg-transparent text-left">
              <div class="h-full rounded-full transition-all duration-700 bg-transparent text-left" 
                   :style="`width:${item.pct}%; background: var(--sys-${item.label.includes('Sản xuất') ? 'brand-solid' : item.label.includes('Kinh doanh') ? 'warning-solid' : 'text-secondary'})`"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════
         BOTTOM ROW
    ══════════════════════════════════════════════ -->
    <!-- Bottom Grid -->
    <div class="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8 bg-transparent text-left">

      <!-- Approval List -->
      <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-[2.5rem] shadow-sm flex flex-col overflow-hidden bg-transparent text-left">
        <div class="px-8 py-6 border-b border-[var(--sys-border-subtle)] flex justify-between items-center bg-transparent text-left">
          <h4 class="text-sm font-black text-[var(--sys-text-primary)] uppercase tracking-widest italic bg-transparent">Yêu cầu chờ phê duyệt</h4>
          <span class="px-3 py-1 rounded-full bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm border border-[var(--sys-danger-border)]">
            <span class="material-symbols-rounded text-xs">warning</span>
            03 khẩn cấp
          </span>
        </div>

        <div class="flex-grow bg-transparent text-left">
          <!-- Item 1 -->
          <div class="px-8 py-6 flex items-center gap-6 group hover:bg-[var(--sys-bg-hover)] transition-all border-b border-[var(--sys-border-subtle)] bg-transparent">
            <div class="w-12 h-12 rounded-2xl bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
              <span class="material-symbols-rounded text-2xl">person_add</span>
            </div>
            <div class="flex-grow bg-transparent text-left">
              <h5 class="text-sm font-black text-[var(--sys-text-primary)] mb-1 bg-transparent">Tuyển dụng: Trưởng phòng Marketing</h5>
              <p class="text-[10px] font-bold text-[var(--sys-text-secondary)]/40 italic uppercase tracking-widest bg-transparent">Phòng Nhân sự &bull; Gửi 2 giờ trước</p>
            </div>
            <div class="flex gap-3 bg-transparent text-left">
              <button class="px-4 py-2 bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] rounded-xl text-[10px] font-black hover:bg-[var(--sys-danger-soft)] hover:text-[var(--sys-danger-text)] transition-all border border-[var(--sys-border-subtle)] uppercase tracking-widest">Từ chối</button>
              <button class="px-4 py-2 bg-[var(--sys-brand-solid)] text-white rounded-xl text-[10px] font-black hover:bg-[var(--sys-brand-hover)] shadow-lg shadow-[var(--sys-brand-solid-lch-30)] transition-all uppercase tracking-widest">Duyệt ngay</button>
            </div>
          </div>

          <!-- Item 2 -->
          <div class="px-8 py-6 flex items-center gap-6 group hover:bg-[var(--sys-bg-hover)] transition-all border-b border-[var(--sys-border-subtle)] bg-transparent text-left">
            <div class="w-12 h-12 rounded-2xl bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform bg-transparent">
              <span class="material-symbols-rounded text-2xl bg-transparent">trending_up</span>
            </div>
            <div class="flex-grow bg-transparent text-left">
              <h5 class="text-sm font-black text-[var(--sys-text-primary)] mb-1 bg-transparent text-left">Đề xuất tăng lương (Bùi Anh Tuấn)</h5>
              <p class="text-[10px] font-bold text-[var(--sys-text-secondary)]/40 italic uppercase tracking-widest bg-transparent">Khối Công nghệ &bull; Gửi 5 giờ trước</p>
            </div>
            <div class="flex gap-3 bg-transparent text-left">
              <button class="px-4 py-2 bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] rounded-xl text-[10px] font-black hover:bg-[var(--sys-brand-soft)] hover:text-[var(--sys-brand-solid)] transition-all border border-[var(--sys-border-subtle)] uppercase tracking-widest">Chi tiết</button>
              <button class="px-4 py-2 bg-[var(--sys-brand-solid)] text-white rounded-xl text-[10px] font-black hover:bg-[var(--sys-brand-hover)] shadow-lg shadow-[var(--sys-brand-solid-lch-30)] transition-all uppercase tracking-widest">Duyệt ngay</button>
            </div>
          </div>

          <!-- Item 3 -->
          <div class="px-8 py-6 flex items-center gap-6 group hover:bg-[var(--sys-bg-hover)] transition-all bg-transparent text-left">
            <div class="w-12 h-12 rounded-2xl bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform bg-transparent">
              <span class="material-symbols-rounded text-2xl">warning</span>
            </div>
            <div class="flex-grow bg-transparent text-left">
              <h5 class="text-sm font-black text-[var(--sys-text-primary)] mb-1 bg-transparent text-left">Đơn thôi việc: Giám đốc sáng tạo</h5>
              <p class="text-[10px] font-black text-[var(--sys-danger-text)] italic uppercase tracking-widest bg-transparent text-left">Nhân sự chủ chốt &bull; Cần làm việc trực tiếp</p>
            </div>
            <div class="bg-transparent text-left">
              <button class="px-6 py-2 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-xl text-[10px] font-black hover:bg-[var(--sys-brand-solid)] hover:text-white border border-[var(--sys-brand-border)] transition-all uppercase tracking-widest italic">Đặt lịch hẹn</button>
            </div>
          </div>
        </div>

        <button class="w-full py-5 bg-[var(--sys-bg-hover)]/30 border-t border-[var(--sys-border-subtle)] text-[10px] font-black text-[var(--sys-text-secondary)]/50 uppercase tracking-[0.2em] hover:text-[var(--sys-brand-solid)] transition-all flex items-center justify-center gap-2 italic">
          <span class="material-symbols-rounded text-lg">expand_more</span>
          Xem toàn bộ 12 yêu cầu
        </button>
      </div>

      <!-- Events Timeline -->
      <div class="relative bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-[2.5rem] p-8 shadow-sm flex flex-col overflow-hidden group/events bg-transparent text-left">
        <div class="absolute inset-0 bg-gradient-to-br from-[var(--sys-brand-solid)]/5 to-transparent opacity-50 pointer-events-none"></div>
        <div class="relative flex items-center gap-4 mb-8 bg-transparent text-left">
          <div class="w-10 h-10 rounded-xl bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center shadow-inner">
            <span class="material-symbols-rounded text-xl">calendar_month</span>
          </div>
          <h4 class="text-sm font-black text-[var(--sys-text-primary)] uppercase tracking-widest italic bg-transparent text-left">Sự kiện quan trọng</h4>
        </div>

        <div class="relative pl-8 space-y-10 bg-transparent text-left">
          <div class="absolute left-[15px] top-2 bottom-2 w-0.5 bg-[var(--sys-border-subtle)]"></div>

          <!-- Event 1 -->
          <div class="relative bg-transparent text-left">
            <div class="absolute left-[-23px] top-1.5 w-4 h-4 rounded-full bg-[var(--sys-brand-solid)] border-4 border-[var(--sys-bg-surface)] shadow-lg shadow-[var(--sys-brand-solid-lch-30)] z-10"></div>
            <div class="bg-transparent text-left">
              <p class="text-[10px] font-black text-[var(--sys-brand-solid)] uppercase tracking-widest italic bg-transparent text-left">09:00 — Hôm nay</p>
              <h5 class="text-sm font-black text-[var(--sys-text-primary)] mt-1 bg-transparent text-left">Họp Ban Giám đốc quý I</h5>
              <p class="flex items-center gap-2 text-xs font-bold text-[var(--sys-text-secondary)]/60 mt-2 italic bg-transparent text-left">
                <span class="material-symbols-rounded text-sm">location_on</span>
                Phòng họp Star VIP
              </p>
            </div>
          </div>

          <!-- Event 2 -->
          <div class="relative bg-transparent text-left">
            <div class="absolute left-[-23px] top-1.5 w-4 h-4 rounded-full bg-[var(--sys-border-subtle)] border-4 border-[var(--sys-bg-surface)] z-10 transition-all group-hover/events:bg-[var(--sys-brand-soft)] bg-transparent text-left"></div>
            <div class="bg-transparent text-left">
              <p class="text-[10px] font-black text-[var(--sys-text-secondary)]/30 uppercase tracking-widest italic bg-transparent text-left">25/01/2024</p>
              <h5 class="text-sm font-black text-[var(--sys-text-primary)]/80 mt-1 bg-transparent text-left">Kỷ niệm 10 năm thành lập</h5>
              <p class="flex items-center gap-2 text-xs font-bold text-[var(--sys-text-secondary)]/40 mt-2 italic bg-transparent text-left">
                <span class="material-symbols-rounded text-sm">location_on</span>
                Trung tâm Hội nghị Quốc gia
              </p>
            </div>
          </div>

          <!-- Event 3 -->
          <div class="relative bg-transparent text-left">
            <div class="absolute left-[-23px] top-1.5 w-4 h-4 rounded-full bg-[var(--sys-border-subtle)] border-4 border-[var(--sys-bg-surface)] z-10 transition-all group-hover/events:bg-[var(--sys-brand-soft)] bg-transparent text-left text-left"></div>
            <div class="bg-transparent text-left text-left">
              <p class="text-[10px] font-black text-[var(--sys-text-secondary)]/30 uppercase tracking-widest italic bg-transparent text-left text-left">30/01/2024</p>
              <h5 class="text-sm font-black text-[var(--sys-text-primary)]/80 mt-1 bg-transparent text-left">Hạn cuối đánh giá OKR năm</h5>
              <p class="flex items-center gap-2 text-xs font-bold text-[var(--sys-text-secondary)]/40 mt-2 italic bg-transparent text-left">
                <span class="material-symbols-rounded text-sm">groups</span>
                Toàn bộ các khối phòng ban
              </p>
            </div>
          </div>
        </div>

        <!-- Reminder -->
        <div class="mt-auto pt-8 bg-transparent text-left">
          <div class="bg-[var(--sys-brand-soft)] p-6 rounded-3xl border border-[var(--sys-brand-border)] shadow-sm relative overflow-hidden bg-transparent text-left">
            <div class="absolute top-0 right-0 p-2 opacity-10">
              <span class="material-symbols-rounded text-4xl">sticky_note_2</span>
            </div>
            <p class="text-[10px] font-black text-[var(--sys-brand-solid)] uppercase tracking-widest flex items-center gap-2 mb-3 bg-transparent text-left">
              <span class="material-symbols-rounded text-xs" style="font-variation-settings:'FILL' 1">sticky_note_2</span>
              Lời nhắc của bạn
            </p>
            <p class="text-xs font-black text-[var(--sys-text-primary)] italic leading-relaxed mb-4 bg-transparent text-left">"Tổ chức buổi tiệc tri ân nhân viên xuất sắc vào thứ Sáu này."</p>
            <button class="px-5 py-2 bg-white/50 hover:bg-white text-[var(--sys-brand-solid)] rounded-xl text-[10px] font-black transition-all flex items-center gap-2 uppercase tracking-widest shadow-sm">
              <span class="material-symbols-rounded text-sm">edit</span>
              Chỉnh sửa
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
const barChartData = [
  { label: 'Tháng 8',  current: 44, target: 50,  value: '1,080' },
  { label: 'Tháng 9',  current: 55, target: 62,  value: '1,120' },
  { label: 'Tháng 10', current: 67, target: 74,  value: '1,165' },
  { label: 'Tháng 11', current: 78, target: 80,  value: '1,190' },
  { label: 'Tháng 12', current: 88, target: 90,  value: '1,220' },
  { label: 'Tháng 1',  current: 95, target: 96,  value: '1,250', active: true },
];

const donutData = [
  { label: 'Khối Sản xuất',  pct: 65, color: '#3B82F6' },
  { label: 'Khối Kinh doanh', pct: 20, color: '#F59E0B' },
  { label: 'Khối Văn phòng', pct: 15, color: '#94A3B8' },
];
</script>

<style scoped>
.dashboard {
  max-width: 1600px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
