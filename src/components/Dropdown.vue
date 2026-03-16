<template>
  <div class="relative inline-block text-left" ref="dropdownRef">
    <button 
      @click="isOpen = !isOpen"
      type="button"
      class="flex items-center justify-between gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-500 hover:border-blue-300 transition-all focus:outline-none min-w-[160px]"
    >
      <span class="truncate">{{ selectedLabel }}</span>
      <span class="material-symbols-outlined text-[18px] transition-transform duration-200" :class="isOpen ? 'rotate-180' : ''">expand_more</span>
    </button>

    <transition name="dropdown">
      <div 
        v-if="isOpen"
        class="absolute z-50 mt-1.5 min-w-full bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden"
      >
        <div class="max-h-[250px] overflow-y-auto custom-scrollbar">
          <div 
            v-for="option in options" 
            :key="option.value"
            @click="selectOption(option)"
            class="px-4 py-2.5 text-sm transition-colors cursor-pointer whitespace-nowrap"
            :class="modelValue === option.value 
              ? 'bg-indigo-50 text-indigo-700 font-semibold' 
              : 'text-slate-700 bg-white hover:bg-slate-50'"
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
  background: #e2e8f0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>
