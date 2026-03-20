<template>
  <div class="space-y-4 pb-6">
    <!-- Header Area: Executive Styling -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left px-1">
      <div class="bg-transparent text-left">
        <h1 class="text-xl font-bold text-[var(--sys-text-primary)] mb-0.5 tracking-tight uppercase italic">Hồ sơ Quản trị viên Phòng ban</h1>
        <p class="text-[13px] text-[var(--sys-text-secondary)] opacity-100 italic flex items-center gap-3">
          Thông tin định danh và thiết lập bảo mật tài khoản Trưởng đơn vị.
          <span class="px-2 py-0.5 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-md border border-[var(--sys-brand-border)] text-[9px] font-black uppercase tracking-widest italic shadow-sm">EXECUTIVE PROFILE</span>
        </p>
      </div>
    </div>

    <!-- Profile Detail Grid: Premium Layout -->
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
      
      <!-- User ID Card: Synchronized Design -->
      <div class="xl:col-span-4 bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden sticky top-20">
        <div class="h-28 bg-gradient-to-r from-[var(--sys-brand-solid)] via-indigo-700 to-slate-900 relative">
          <div class="absolute -bottom-12 left-1/2 -translate-x-1/2 w-28 h-28 rounded-md border-4 border-white bg-white shadow-xl overflow-hidden flex items-center justify-center font-black text-4xl text-[var(--sys-brand-solid)] uppercase italic shadow-[0_8px_30px_oklch(0_0_0/0.1)]">
            TP
          </div>
        </div>
        <div class="pt-16 pb-8 text-center px-6 space-y-2">
          <h3 class="text-[20px] font-black text-[var(--sys-text-primary)] m-0 uppercase italic tracking-tighter">Trần Thanh Tâm</h3>
          <p class="text-[11px] font-black text-[var(--sys-brand-solid)] uppercase tracking-[0.2em] opacity-80 leading-none">TRƯỞNG PHÒNG KỸ THUẬT & CÔNG NGHỆ</p>
          
          <div class="pt-8 grid grid-cols-2 gap-4 border-t border-[var(--sys-border-strong)] border-dashed border-t-2 mt-8">
            <div class="text-left space-y-1">
              <p class="text-[9px] font-black text-[var(--sys-text-secondary)] uppercase opacity-50 tracking-[0.15em]">MÃ QUẢN LÝ</p>
              <p class="text-[13.5px] font-black text-[var(--sys-text-primary)] italic">TP-IT-007</p>
            </div>
            <div class="text-left space-y-1">
              <p class="text-[9px] font-black text-[var(--sys-text-secondary)] uppercase opacity-50 tracking-[0.15em]">QUYỀN HẠN</p>
              <p class="text-[13.5px] font-black text-[var(--sys-success-text)] italic tracking-tight">EXECUTIVE ADMIN</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Settings & Form: Executive Inputs -->
      <div class="xl:col-span-8 space-y-6">
        <div class="bg-[var(--sys-bg-surface)] p-8 rounded-lg border border-[var(--sys-border-subtle)] shadow-sm space-y-8">
          <h3 class="text-[12px] font-bold text-[var(--sys-text-primary)] uppercase tracking-[0.12em] m-0 flex items-center gap-2.5 italic">
            <div class="w-8 h-8 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border border-[var(--sys-brand-border)] flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-[22px]">verified_user</span>
            </div>
            THÔNG TIN ĐỊNH DANH CHI TIẾT
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-for="field in formFields" :key="field.label" class="space-y-2.5">
              <label class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.15em] block italic opacity-60 leading-none">{{ field.label }}</label>
              <div class="relative group">
                <input 
                  type="text" 
                  :value="field.value" 
                  readonly
                  class="w-full h-12 px-4 bg-[var(--sys-bg-page)]/50 border-2 border-[var(--sys-border-strong)] rounded-md text-[14px] font-bold text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-inner italic placeholder:text-slate-400 cursor-not-allowed group-hover:bg-white transition-all"
                >
                <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                  <span class="material-symbols-outlined text-[18px] font-bold">lock</span>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-6 border-t border-[var(--sys-border-subtle)] border-t-2 border-dashed flex justify-end gap-3">
             <button class="h-11 px-8 bg-[var(--sys-text-primary)] text-white rounded-md font-black text-[11px] uppercase tracking-[0.18em] hover:brightness-125 transition-all flex items-center gap-3 italic shadow-lg active:scale-95">
               <span class="material-symbols-outlined text-[20px] font-black">lock_reset</span> ĐIỀU CHỈNH MẬT KHẨU
             </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formFields = ref([
  { label: 'Họ và tên định danh', value: 'Trần Thanh Tâm' },
  { label: 'Địa chỉ Email công vụ', value: 'manager@hrm.com' },
  { label: 'Số điện thoại liên lạc', value: '0901 234 567' },
  { label: 'Đơn vị công tác', value: 'Kỹ thuật và Công nghệ (IT)' },
  { label: 'Ngày bổ nhiệm chức vụ', value: '01/01/2023' },
  { label: 'Cơ sở hạ tầng quản lý', value: 'Chi nhánh Hồ Chí Minh' },
])
</script>

<style scoped>
* { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
</style>
