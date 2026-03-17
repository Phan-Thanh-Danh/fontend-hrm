<template>
  <div class="min-h-screen bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] p-4 md:p-6 lg:p-8 font-sans">
    <div class="max-w-7xl mx-auto space-y-8">
      
      <!-- Header Section -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 class="text-2xl font-black text-[var(--sys-text-primary)] tracking-tight uppercase mb-1">Dịch vụ nội bộ</h1>
          <p class="text-sm text-[var(--sys-text-secondary)] font-medium">Yêu cầu hỗ trợ kỹ thuật và dịch vụ văn phòng</p>
        </div>
        <button class="bg-[var(--sys-brand-solid)] hover:bg-[var(--sys-brand-hover)] text-white font-bold py-2.5 px-6 rounded-4 flex items-center gap-2 shadow-sm transition-all active:scale-95">
          <span class="material-symbols-outlined text-xl">add_circle</span>
          Tạo Ticket hỗ trợ
        </button>
      </div>

      <!-- Metrics Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Ticket đã tạo -->
        <div class="bg-[var(--sys-bg-surface)] p-6 rounded-4 shadow-sm border border-[var(--sys-border-subtle)] flex items-center gap-5 group hover:border-[var(--sys-brand-solid)] transition-all">
          <div class="w-14 h-14 rounded-2xl bg-[var(--sys-brand-soft)] text-[var(--sys-brand-text)] flex items-center justify-center shrink-0 border border-[var(--sys-brand-subtle)] group-hover:bg-[var(--sys-brand-solid)] group-hover:text-white transition-colors">
            <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">confirmation_number</span>
          </div>
          <div>
            <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1">Ticket đã tạo</p>
            <h3 class="text-3xl font-black text-[var(--sys-text-primary)] m-0">12</h3>
          </div>
        </div>

        <!-- Đang xử lý -->
        <div class="bg-[var(--sys-bg-surface)] p-6 rounded-4 shadow-sm border border-[var(--sys-border-subtle)] flex items-center gap-5 group hover:border-[var(--sys-warning-solid)] transition-all">
          <div class="w-14 h-14 rounded-2xl bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] flex items-center justify-center shrink-0 border border-[var(--sys-warning-border)] group-hover:bg-[var(--sys-warning-solid)] group-hover:text-white transition-colors">
            <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">pending</span>
          </div>
          <div>
            <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1">Đang xử lý</p>
            <h3 class="text-3xl font-black text-[var(--sys-text-primary)] m-0">2</h3>
          </div>
        </div>

        <!-- Đã hoàn thành -->
        <div class="bg-[var(--sys-bg-surface)] p-6 rounded-4 shadow-sm border border-[var(--sys-border-subtle)] flex items-center gap-5 group hover:border-[var(--sys-success-solid)] transition-all">
          <div class="w-14 h-14 rounded-2xl bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] flex items-center justify-center shrink-0 border border-[var(--sys-success-border)] group-hover:bg-[var(--sys-success-solid)] group-hover:text-white transition-colors">
            <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">check_circle</span>
          </div>
          <div>
            <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1">Đã hoàn thành</p>
            <h3 class="text-3xl font-black text-[var(--sys-text-primary)] m-0">10</h3>
          </div>
        </div>
      </div>

      <!-- Ticket List Section -->
      <div class="bg-[var(--sys-bg-surface)] rounded-4 shadow-sm border border-[var(--sys-border-subtle)] overflow-hidden">
        <div class="px-6 py-5 border-b border-[var(--sys-border-subtle)] flex justify-between items-center bg-[var(--sys-bg-page)]/30">
          <h2 class="text-lg font-bold text-[var(--sys-text-primary)] m-0 uppercase tracking-tight flex items-center gap-2">
            <span class="material-symbols-outlined text-[var(--sys-brand-solid)]">list_alt</span>
            Tiến độ xử lý Ticket
          </h2>
          <div class="flex gap-2">
            <div class="relative">
              <span class="absolute inset-y-0 left-3 flex items-center text-[var(--sys-text-secondary)]">
                <span class="material-symbols-outlined text-sm">search</span>
              </span>
              <input type="text" placeholder="Tìm ticket..." class="pl-9 pr-4 py-1.5 rounded-lg bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] text-xs focus:outline-none focus:ring-1 focus:ring-[var(--sys-brand-solid)] transition-all w-48 shadow-sm">
            </div>
          </div>
        </div>
        
        <div class="p-8 pb-12">
          <!-- Empty State -->
          <div class="flex flex-col items-center justify-center py-12 text-center">
            <div class="w-24 h-24 rounded-full bg-[var(--sys-bg-page)] flex items-center justify-center mb-4 border border-[var(--sys-border-subtle)] shadow-inner">
              <span class="material-symbols-outlined text-5xl text-[var(--sys-text-secondary)] opacity-30">confirmation_number</span>
            </div>
            <h3 class="text-lg font-bold text-[var(--sys-text-primary)] mb-2">Chưa có ticket nào</h3>
            <p class="text-sm text-[var(--sys-text-secondary)] max-w-xs mx-auto mb-6">Mọi yêu cầu hỗ trợ hoặc dịch vụ nội bộ của bạn sẽ được hiển thị và cập nhật tiến độ tại đây.</p>
            <button class="text-[var(--sys-brand-solid)] font-bold text-sm hover:underline flex items-center gap-1">
              Tạo ticket đầu tiên của bạn
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
