<template>
  <div class="internal-services-page min-h-screen bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] p-4 md:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto space-y-6 bg-transparent">
      
      <!-- Header Area -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left">
        <div class="bg-transparent text-left">
          <h1 class="text-xl font-semibold text-[var(--sys-text-primary)] tracking-tight m-0">Dịch vụ nội bộ & Hỗ trợ kỹ thuật</h1>
          <p class="text-[13px] text-[var(--sys-text-secondary)] mt-0.5">Gửi yêu cầu hỗ trợ thiết bị, văn phòng và các dịch vụ hành chính trực tuyến.</p>
        </div>
        <button class="h-11 px-6 bg-[var(--sys-brand-solid)] text-white rounded-md font-bold text-[13px] uppercase tracking-wide hover:brightness-95 transition-all flex items-center gap-2 shadow-sm shrink-0">
          <span class="material-symbols-outlined text-[20px]">add_circle</span>
          Tạo Ticket hỗ trợ
        </button>
      </div>

      <!-- Metrics Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-transparent">
        <!-- Ticket Statistics -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-[var(--sys-border-subtle)] flex items-center gap-5 group hover:border-[var(--sys-brand-solid)] transition-all">
          <div class="w-12 h-12 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center shrink-0 border border-[var(--sys-brand-border)] group-hover:bg-[var(--sys-brand-solid)] group-hover:text-white transition-all">
            <span class="material-symbols-outlined text-[24px]">confirmation_number</span>
          </div>
          <div>
            <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide opacity-60">Tổng Ticket đã tạo</p>
            <h3 class="text-3xl font-bold text-[var(--sys-text-primary)] leading-tight">12</h3>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-[var(--sys-border-subtle)] flex items-center gap-5 group hover:border-[var(--sys-warning-border)] transition-all">
          <div class="w-12 h-12 rounded-md bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] flex items-center justify-center shrink-0 border border-[var(--sys-warning-border)] group-hover:bg-[var(--sys-warning-solid)] group-hover:text-white transition-all">
            <span class="material-symbols-outlined text-[24px]">pending</span>
          </div>
          <div>
            <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide opacity-60">Yêu cầu đang xử lý</p>
            <h3 class="text-3xl font-bold text-[var(--sys-text-primary)] leading-tight">2</h3>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-[var(--sys-border-subtle)] flex items-center gap-5 group hover:border-[var(--sys-success-border)] transition-all">
          <div class="w-12 h-12 rounded-md bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] flex items-center justify-center shrink-0 border border-[var(--sys-success-border)] group-hover:bg-[var(--sys-success-solid)] group-hover:text-white transition-all">
            <span class="material-symbols-outlined text-[24px]">check_circle</span>
          </div>
          <div>
            <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide opacity-60">Đã hoàn thành bàn giao</p>
            <h3 class="text-3xl font-bold text-[var(--sys-text-primary)] leading-tight">10</h3>
          </div>
        </div>
      </div>

      <!-- Ticket List Section -->
      <div class="bg-white rounded-lg shadow-sm border border-[var(--sys-border-subtle)] overflow-hidden flex flex-col">
        <div class="px-5 py-4 border-b border-[var(--sys-border-subtle)] flex justify-between items-center bg-[var(--sys-bg-page)]/50">
          <h2 class="text-sm font-semibold text-[var(--sys-text-primary)] uppercase tracking-wide m-0 flex items-center gap-2">
            <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-[22px]">list_alt</span>
            Tiến độ xử lý & Lịch sử hỗ trợ
          </h2>
          <div class="relative group hidden sm:block">
            <span class="absolute inset-y-0 left-3 flex items-center text-[var(--sys-text-secondary)] opacity-50 group-focus-within:text-[var(--sys-brand-solid)] transition-colors">
              <span class="material-symbols-outlined text-[18px]">search</span>
            </span>
            <input type="text" placeholder="Tìm kiếm mã Ticket..." class="w-64 h-9 pl-10 pr-4 rounded-md border border-[var(--sys-border-strong)] text-[12px] font-medium outline-none focus:border-[var(--sys-brand-solid)] shadow-sm transition-all placeholder:text-[var(--sys-text-secondary)]/40 bg-white">
          </div>
        </div>
        
        <div class="py-20 flex flex-col items-center justify-center text-center bg-transparent">
          <!-- Empty State -->
          <div class="w-20 h-20 rounded-lg bg-[var(--sys-bg-page)] flex items-center justify-center mb-6 border border-[var(--sys-border-subtle)] shadow-inner">
            <span class="material-symbols-outlined text-[40px] text-[var(--sys-text-disabled)] opacity-30">confirmation_number</span>
          </div>
          <h3 class="text-lg font-bold text-[var(--sys-text-primary)] mb-2 uppercase tracking-tight">Chưa có yêu cầu nào được khởi tạo</h3>
          <p class="text-[13px] font-medium text-[var(--sys-text-secondary)] max-w-sm mx-auto mb-8 opacity-70 leading-relaxed">Mọi yêu cầu hỗ trợ hoặc dịch vụ nội bộ của bạn sẽ được hiển thị và cập nhật tiến độ tự động tại đây.</p>
          <button class="h-10 px-6 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-md font-bold text-[12px] uppercase tracking-wide hover:bg-[var(--sys-brand-solid)] hover:text-white transition-all border border-[var(--sys-brand-border)] flex items-center gap-2 active:scale-95">
            Khởi tạo Ticket đầu tiên
            <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
/**
 * TRANG DỊCH VỤ NỘI BỘ (PORTAL) - PHIÊN BẢN ENTERPRISE SaaS
 * Tuân thủ 7 Golden Rules:
 * - Font Inter 14px (text-sm)
 * - Bo góc chuẩn B2B: 6px (MD), 8px (LG)
 * - Hệ màu Semantic đồng bộ, xóa bỏ font-black/italic
 */
</script>

<style scoped>
.internal-services-page {
  background-color: var(--sys-bg-page);
}
</style>
