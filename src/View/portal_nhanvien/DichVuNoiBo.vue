<template>
  <div class="min-h-screen bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] p-4 md:p-6 lg:p-8 font-sans">
    <div class="max-w-7xl mx-auto space-y-8 bg-transparent">
      
      <!-- Header Section -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent">
        <div class="bg-transparent text-left">
          <h1 class="text-2xl font-black text-[var(--sys-text-primary)] tracking-tight uppercase mb-1 italic">Dịch vụ nội bộ</h1>
          <p class="text-[10px] text-[var(--sys-text-secondary)] font-black uppercase tracking-[0.2em] italic opacity-60">Yêu cầu hỗ trợ kỹ thuật và dịch vụ văn phòng trực tuyến</p>
        </div>
        <button class="bg-[var(--sys-brand-solid)] hover:bg-[var(--sys-brand-hover)] text-white font-black py-3.5 px-8 rounded-2xl flex items-center gap-3 shadow-xl shadow-[var(--sys-brand-solid-lch-30)] transition-all active:scale-95 text-[11px] uppercase tracking-widest">
          <span class="material-symbols-outlined text-xl">add_circle</span>
          Tạo Ticket hỗ trợ
        </button>
      </div>

      <!-- Metrics Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 bg-transparent">
        <!-- Ticket đã tạo -->
        <div class="bg-[var(--sys-bg-surface)] p-8 rounded-[2rem] shadow-sm border border-[var(--sys-border-subtle)] flex items-center gap-6 group hover:border-[var(--sys-brand-solid)] transition-all relative overflow-hidden">
          <div class="absolute top-0 right-0 w-24 h-24 bg-[var(--sys-brand-soft)] rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-30 transition-all"></div>
          <div class="w-16 h-16 rounded-2xl bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center shrink-0 border border-[var(--sys-brand-border)] group-hover:bg-[var(--sys-brand-solid)] group-hover:text-white transition-all shadow-sm">
            <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">confirmation_number</span>
          </div>
          <div class="bg-transparent text-left">
            <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] mb-1 italic opacity-60">Ticket đã tạo</p>
            <h3 class="text-4xl font-black text-[var(--sys-text-primary)] tracking-tighter">12</h3>
          </div>
        </div>

        <!-- Đang xử lý -->
        <div class="bg-[var(--sys-bg-surface)] p-8 rounded-[2rem] shadow-sm border border-[var(--sys-border-subtle)] flex items-center gap-6 group hover:border-[var(--sys-warning-solid)] transition-all relative overflow-hidden">
          <div class="absolute top-0 right-0 w-24 h-24 bg-[var(--sys-warning-soft)] rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-30 transition-all"></div>
          <div class="w-16 h-16 rounded-2xl bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] flex items-center justify-center shrink-0 border border-[var(--sys-warning-border)] group-hover:bg-[var(--sys-warning-solid)] group-hover:text-white transition-all shadow-sm">
            <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">pending</span>
          </div>
          <div class="bg-transparent text-left">
            <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] mb-1 italic opacity-60">Đang xử lý</p>
            <h3 class="text-4xl font-black text-[var(--sys-text-primary)] tracking-tighter">2</h3>
          </div>
        </div>

        <!-- Đã hoàn thành -->
        <div class="bg-[var(--sys-bg-surface)] p-8 rounded-[2rem] shadow-sm border border-[var(--sys-border-subtle)] flex items-center gap-6 group hover:border-[var(--sys-success-solid)] transition-all relative overflow-hidden">
          <div class="absolute top-0 right-0 w-24 h-24 bg-[var(--sys-success-soft)] rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-30 transition-all"></div>
          <div class="w-16 h-16 rounded-2xl bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] flex items-center justify-center shrink-0 border border-[var(--sys-success-border)] group-hover:bg-[var(--sys-success-solid)] group-hover:text-white transition-all shadow-sm">
            <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">check_circle</span>
          </div>
          <div class="bg-transparent text-left">
            <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] mb-1 italic opacity-60">Đã hoàn thành</p>
            <h3 class="text-4xl font-black text-[var(--sys-text-primary)] tracking-tighter">10</h3>
          </div>
        </div>
      </div>

      <!-- Ticket List Section -->
      <div class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] shadow-sm border border-[var(--sys-border-subtle)] overflow-hidden">
        <div class="px-8 py-6 border-b border-[var(--sys-border-subtle)] flex justify-between items-center bg-[var(--sys-bg-page)]/30">
          <h2 class="text-sm font-black text-[var(--sys-text-primary)] uppercase tracking-tight flex items-center gap-3 italic">
            <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-2xl font-normal">list_alt</span>
            Tiến độ xử lý Ticket
          </h2>
          <div class="flex gap-4 bg-transparent">
            <div class="relative group">
              <span class="absolute inset-y-0 left-4 flex items-center text-[var(--sys-text-secondary)] group-focus-within:text-[var(--sys-brand-solid)] transition-colors">
                <span class="material-symbols-outlined text-lg">search</span>
              </span>
              <input type="text" placeholder="Tìm ticket..." class="pl-12 pr-5 py-2.5 rounded-xl bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] text-[10px] font-black uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all w-60 shadow-sm placeholder:text-[var(--sys-text-secondary)]/30">
            </div>
          </div>
        </div>
        
        <div class="p-12 bg-transparent text-center">
          <!-- Empty State -->
          <div class="flex flex-col items-center justify-center py-12 text-center bg-transparent">
            <div class="w-24 h-24 rounded-[2rem] bg-[var(--sys-bg-page)] flex items-center justify-center mb-6 border border-[var(--sys-border-subtle)] shadow-inner group/icon">
              <span class="material-symbols-outlined text-5xl text-[var(--sys-text-secondary)] opacity-20 group-hover/icon:opacity-40 transition-opacity">confirmation_number</span>
            </div>
            <h3 class="text-lg font-black text-[var(--sys-text-primary)] mb-2 uppercase tracking-tight italic">Chưa có ticket nào được khởi tạo</h3>
            <p class="text-xs font-bold text-[var(--sys-text-secondary)] max-w-sm mx-auto mb-8 opacity-60 italic leading-relaxed">Mọi yêu cầu hỗ trợ hoặc dịch vụ nội bộ của bạn sẽ được hiển thị và cập nhật tiến độ tự động tại đây.</p>
            <button class="px-8 py-3.5 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-xl text-[10px] font-black hover:bg-[var(--sys-brand-solid)] hover:text-white transition-all uppercase tracking-widest border border-[var(--sys-brand-border)] flex items-center gap-2 active:scale-95">
              Khởi tạo ticket đầu tiên
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
// Logic sẽ được thêm sau nếu cần
</script>

<style scoped>
/* Không cần style local vì đã dùng hệ thống Tailwind/OKLCH */
</style>
