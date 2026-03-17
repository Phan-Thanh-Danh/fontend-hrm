<template>
  <div class="relative inline-block text-left" ref="dropdownRef">
    <button 
      @click="isOpen = !isOpen"
      type="button"
      class="flex items-center justify-between gap-2 px-4 h-11 bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold text-[var(--sys-text-secondary)] hover:border-[var(--sys-brand-solid)] transition-all focus:outline-none min-w-[160px] text-[var(--sys-text-primary)]"
    >
      <span class="truncate">{{ selectedLabel }}</span>
      <span class="material-symbols-outlined text-[18px] transition-transform duration-200 text-[var(--sys-icon-default)]" :class="isOpen ? 'rotate-180' : ''">expand_more</span>
    </button>

    <transition name="dropdown">
      <div 
        v-if="isOpen"
        class="absolute z-50 mt-1.5 min-w-full bg-[var(--sys-bg-surface-elevated)] border border-[var(--sys-border-subtle)] rounded-xl shadow-lg shadow-black/5 overflow-hidden"
      >
        <div class="max-h-[250px] overflow-y-auto custom-scrollbar">
          <div 
            v-for="option in options" 
            :key="option.value"
            @click="selectOption(option)"
            class="px-4 py-2.5 text-sm transition-colors cursor-pointer whitespace-nowrap"
            :class="modelValue === option.value 
              ? 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-soft-text)] font-semibold' 
              : 'text-[var(--sys-text-primary)] bg-[var(--sys-bg-surface-elevated)] hover:bg-[var(--sys-bg-hover)]'"
          >
            {{ option.label }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true,
    // Expects: [{ label: 'Text', value: 'val' }]
  },
  modelValue: {
    required: true
  },
  placeholder: {
    type: String,
    default: 'Chọn'
  }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const dropdownRef = ref(null);

const selectedLabel = computed(() => {
  const option = props.options.find(o => o.value === props.modelValue);
  return option ? option.label : props.placeholder;
});

const selectOption = (option) => {
  emit('update:modelValue', option.value);
  isOpen.value = false;
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => document.addEventListener('click', handleClickOutside));
onUnmounted(() => document.removeEventListener('click', handleClickOutside));
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--sys-border-subtle);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--sys-border-strong);
}
</style>
