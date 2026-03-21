<template>
  <div class="space-y-4 pb-6">
    <!-- Header Area: SaaS Enterprise Style -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left px-1">
      <div class="bg-transparent text-left">
        <h1 class="text-xl font-bold text-[var(--sys-text-primary)] mb-0.5 tracking-tight uppercase">Quản lý Tài sản Phòng ban</h1>
        <p class="text-[13px] text-[var(--sys-text-secondary)] font-medium flex items-center gap-3">
          Kiểm kê danh mục thiết bị và cơ sở vật chất thuộc quyền quản lý khối IT.
          <span class="px-2 py-0.5 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-md border border-[var(--sys-brand-border)] text-[10px] font-bold uppercase tracking-widest shadow-sm">ASSET TRACKING MODE</span>
        </p>
      </div>
    </div>

    <!-- Assets Inventory Grid: Premium Card Style -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="asset in assets" :key="asset.id" 
        class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col group hover:border-[var(--sys-brand-solid)] transition-all hover:shadow-lg">
        <div class="p-6 flex-grow space-y-5">
          <div class="flex items-center gap-5">
            <div class="w-16 h-16 rounded-md bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] flex items-center justify-center text-[var(--sys-brand-solid)] group-hover:scale-105 transition-transform shadow-inner">
              <span class="material-symbols-outlined text-[36px] font-bold">{{ asset.icon }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <h4 class="text-[14px] font-bold text-[var(--sys-text-primary)] m-0 uppercase tracking-tight group-hover:text-[var(--sys-brand-solid)] transition-colors leading-tight">{{ asset.name }}</h4>
              <p class="text-[11px] font-bold text-[var(--sys-brand-solid)] uppercase tracking-widest opacity-80 leading-none">{{ asset.code }} <span class="mx-1 opacity-30 text-slate-400">|</span> {{ asset.category }}</p>
            </div>
          </div>

          <div class="space-y-3 py-4 border-t border-b border-[var(--sys-border-subtle)] border-dashed border-t-2 border-b-2">
             <div class="flex justify-between items-center text-[12.5px] font-bold text-[var(--sys-text-primary)]">
              <span class="text-[10px] font-bold uppercase tracking-widest text-[var(--sys-text-secondary)] opacity-60">Người chịu trách nhiệm:</span>
              <span class="text-[var(--sys-brand-solid)]">{{ asset.user }}</span>
            </div>
            <div class="flex justify-between items-center text-[12.5px] font-bold text-[var(--sys-text-primary)]">
              <span class="text-[10px] font-bold uppercase tracking-widest text-[var(--sys-text-secondary)] opacity-60">Hiện trạng vận hành:</span>
              <span :class="['px-2.5 py-0.5 rounded-md font-bold text-[10px] uppercase border shadow-sm tracking-widest', asset.status === 'Tốt' ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]' : 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]']">{{ asset.status }}</span>
            </div>
          </div>
        </div>

        <div class="px-5 py-3.5 bg-[var(--sys-bg-page)]/30 border-t border-[var(--sys-border-subtle)] flex justify-between items-center transition-all duration-300">
          <span class="text-[10px] font-bold text-[var(--sys-text-disabled)] uppercase tracking-widest leading-none">Bàn giao: {{ asset.date }}</span>
          <button class="text-[10px] font-bold text-[var(--sys-brand-solid)] uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity">
            LỊCH SỬ BẢO TRÌ
            <span class="material-symbols-outlined text-[16px] font-bold">history_edu</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const assets = ref([
  { id: 1, name: 'MACBOOK PRO M3 MAX', code: 'ASSET-2401', category: 'Thiết bị IT', user: 'Vũ Minh Đăng', status: 'Tốt', date: '01/01/2026', icon: 'laptop_mac' },
  { id: 2, name: 'DELL ULTRASHARP 4K MONITOR', code: 'ASSET-2402', category: 'Thiết bị hiển thị', user: 'Nguyễn Văn Anh', status: 'Cần bảo trì', date: '15/01/2026', icon: 'monitor' },
  { id: 3, name: 'BÀN PHÍM REALFORCE R3', code: 'ASSET-2403', category: 'Phụ kiện', user: 'Lê Diệu Linh', status: 'Tốt', date: '20/01/2026', icon: 'keyboard' },
  { id: 4, name: 'TAI NGHE SONY WH-1000XM5', code: 'ASSET-2404', category: 'Thiết bị âm thanh', user: 'Trần Minh Hải', status: 'Tốt', date: '05/02/2026', icon: 'headphones' },
])
</script>

<style scoped>
* { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
</style>
