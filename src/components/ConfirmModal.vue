<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
    >
      <div v-if="state.show" class="fixed inset-0 z-[100000] flex items-center justify-center p-4">
        <!-- Backdrop: Lighter in light mode, deeper in dark mode -->
        <div 
          class="fixed inset-0 transition-colors duration-300 bg-black/20 dark:bg-black/60 backdrop-blur-[2px]" 
          @click="confirmAction(false)"
        ></div>
        
        <!-- Modal Content: Using semantic tokens from style.css -->
        <div class="relative w-full max-w-sm rounded-[2.5rem] shadow-[0_20px_50px_oklch(0_0_0/0.1)] dark:shadow-[0_20px_50px_oklch(0_0_0/0.4)] overflow-hidden border p-8 text-center flex flex-col items-center bg-[var(--sys-bg-surface)] border-[var(--sys-border)] transition-colors duration-300">
          
          <!-- Icon based on type -->
          <div :class="[
            'w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-sm transition-all duration-300',
            state.type === 'confirm' 
              ? 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)]' 
              : 'bg-[var(--sys-info-soft)] text-[var(--sys-info-text)]'
          ]">
            <span class="material-symbols-rounded text-[40px] transition-all" style="font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 48">
              {{ state.type === 'confirm' ? 'help' : 'info' }}
            </span>
          </div>

          <h3 class="text-xl font-black mb-2 tracking-tight text-[var(--sys-text-primary)] transition-colors duration-300">
            {{ state.title }}
          </h3>
          <p class="text-sm font-medium leading-relaxed mb-8 text-[var(--sys-text-secondary)] transition-colors duration-300">
            {{ state.message }}
          </p>

          <div class="flex gap-3 w-full mt-auto">
            <!-- Secondary Button (Cancel) -->
            <button 
              v-if="state.type === 'confirm'"
              @click="confirmAction(false)" 
              class="flex-1 py-3.5 rounded-2xl text-xs font-bold transition-all uppercase tracking-widest border border-[var(--sys-border-strong)] text-[var(--sys-text-secondary)] hover:bg-[var(--sys-bg-hover)] active:scale-95"
            >
              Hủy bỏ
            </button>
            
            <!-- Primary Button (Confirm/OK) -->
            <button 
              @click="confirmAction(true)" 
              class="flex-1 py-3.5 rounded-2xl text-xs font-bold transition-all focus:outline-none uppercase tracking-widest active:scale-95"
              :class="[
                state.type === 'confirm' 
                  ? 'bg-[var(--sys-warning-solid)] text-white hover:bg-[var(--sys-warning-solid)]/90 shadow-lg shadow-[var(--sys-warning-solid)]/20' 
                  : 'bg-[var(--sys-brand-solid)] text-white hover:bg-[var(--sys-brand-hover)] shadow-lg shadow-[var(--sys-brand-solid)]/20'
              ]"
            >
              {{ state.type === 'confirm' ? 'Xác nhận' : 'Đóng' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useConfirm } from '@/composables/useConfirm';

const { state, confirmAction } = useConfirm();
</script>

<style scoped>
/* Modal animations are handled by Vue Transition and Tailwind classes */
</style>
