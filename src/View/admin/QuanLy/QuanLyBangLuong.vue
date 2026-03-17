<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-[var(--sys-text-primary)] tracking-tight">Bảng lương Nhân viên</h1>
        <p class="text-[var(--sys-text-secondary)] text-sm font-medium italic">Phê duyệt và quản lý chi tiết thu nhập từng nhân sự.</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="px-4 py-2.5 bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-text-primary)] rounded-xl font-black text-xs hover:bg-[var(--sys-bg-hover)] transition-all uppercase tracking-widest flex items-center gap-2">
          <span class="material-symbols-outlined text-[18px]">download</span>
          Xuất Excel
        </button>
        <button @click="openAddModal" class="px-5 py-2.5 bg-[var(--sys-brand-solid)] rounded-xl font-black text-white hover:bg-[var(--sys-brand-hover)] shadow-xl shadow-[var(--sys-brand-solid-lch-30)] transition-all flex items-center gap-2">
          <span class="material-symbols-outlined text-[20px]">add_task</span>
          Tạo bảng lương
        </button>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="(stat, idx) in stats" :key="idx" 
           class="bg-[var(--sys-bg-surface)] rounded-[2rem] p-6 border border-[var(--sys-border-subtle)] shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
        <div class="absolute top-0 right-0 w-24 h-24 bg-[var(--sys-brand-solid)]/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-[var(--sys-brand-solid)]/10 transition-all duration-700"></div>
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-2xl flex items-center justify-center bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] shadow-inner font-black">
            <span class="material-symbols-outlined">{{ stat.icon }}</span>
          </div>
          <span class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] shadow-sm">
            {{ stat.trend }}
          </span>
        </div>
        <div>
          <p class="text-[var(--sys-text-secondary)] text-[10px] font-black uppercase tracking-[0.15em] mb-1 italic">{{ stat.label }}</p>
          <p class="text-2xl font-black text-[var(--sys-text-primary)] tracking-tight">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <!-- Main Table Card -->
    <div class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col">
      <!-- Toolbar -->
      <div class="p-6 border-b border-[var(--sys-border-subtle)] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-[var(--sys-bg-surface)]/50 backdrop-blur-sm">
        <div class="flex flex-wrap items-center gap-2">
          <div class="bg-[var(--sys-bg-hover)] p-1 rounded-2xl border border-[var(--sys-border-subtle)] flex items-center shadow-sm">
            <button class="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-[var(--sys-bg-surface)] text-[var(--sys-brand-solid)] shadow-sm transition-all border border-[var(--sys-border-subtle)]">Tháng 10</button>
            <button class="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-[var(--sys-text-secondary)] hover:text-[var(--sys-brand-solid)] transition-all">Tháng 9</button>
          </div>
          <button class="px-4 py-2 bg-[var(--sys-bg-hover)] text-[var(--sys-text-primary)] rounded-xl border border-[var(--sys-border-subtle)] text-[10px] font-black uppercase tracking-widest hover:border-[var(--sys-brand-solid)] transition-all">Phòng ban <span class="material-symbols-outlined text-sm ml-1 align-middle">keyboard_arrow_down</span></button>
        </div>

        <div class="flex items-center gap-3 w-full lg:w-auto">
          <div class="relative flex-1 lg:w-64">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--sys-text-secondary)] text-[18px]">search</span>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Tìm tên hoặc mã NV..." 
              class="w-full pl-10 pr-4 py-2 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-xl text-xs font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)]"
            >
          </div>
          <button class="px-4 py-2 bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--sys-success-solid)] hover:text-white transition-all shadow-sm">Chốt bảng lương</button>
        </div>
      </div>

      <!-- Table Section -->
      <div class="overflow-x-auto text-sm custom-scrollbar">
        <table class="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr>
              <th class="px-6 py-4 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.15em] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Nhân viên</th>
              <th class="px-6 py-4 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.15em] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Lương CB</th>
              <th class="px-6 py-4 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.15em] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Thu nhập</th>
              <th class="px-6 py-4 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.15em] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Khấu trừ</th>
              <th class="px-6 py-4 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.15em] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Thực nhận</th>
              <th class="px-6 py-4 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.15em] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Trạng thái</th>
              <th class="px-6 py-4 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.15em] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody class="bg-transparent">
            <tr v-for="(item, index) in filteredEmployees" :key="index" 
                class="group transition-all duration-200 bg-transparent hover:bg-[var(--sys-bg-hover)]">
              <td class="px-6 py-5 border-b border-[var(--sys-border-subtle)] bg-transparent">
                <div class="flex flex-col bg-transparent">
                  <span class="font-black text-[var(--sys-text-primary)] mb-0.5 bg-transparent">{{ item.name }}</span>
                  <span class="text-[10px] text-[var(--sys-brand-solid)] font-bold uppercase tracking-widest bg-transparent">{{ item.id }} • {{ item.role }}</span>
                </div>
              </td>
              <td class="px-6 py-5 font-black text-[var(--sys-text-secondary)] bg-transparent border-b border-[var(--sys-border-subtle)]">{{ formatCurrency(item.baseSalary) }}</td>
              <td class="px-6 py-5 font-black text-[var(--sys-success-text)] bg-transparent border-b border-[var(--sys-border-subtle)]">+{{ formatCurrency(item.totalIncome) }}</td>
              <td class="px-6 py-5 font-black text-[var(--sys-danger-text)] bg-transparent border-b border-[var(--sys-border-subtle)]">-{{ formatCurrency(item.deduction) }}</td>
              <td class="px-6 py-5 bg-transparent border-b border-[var(--sys-border-subtle)]">
                <p class="font-black text-[var(--sys-brand-solid)] text-base tracking-tight bg-transparent">{{ formatCurrency(item.netSalary) }}</p>
              </td>
              <td class="px-6 py-5 bg-transparent border-b border-[var(--sys-border-subtle)]">
                <span 
                  class="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm transition-all"
                  :class="getStatusClasses(item.status)"
                >
                  {{ item.status }}
                </span>
              </td>
              <td class="px-6 py-5 border-b border-[var(--sys-border-subtle)] text-right bg-transparent">
                <div class="flex items-center justify-end gap-2 bg-transparent">
                  <button @click="openViewModal(item)" class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-transparent text-[var(--sys-icon-default)] hover:text-[var(--sys-brand-solid)] hover:bg-[var(--sys-brand-solid)]/10 active:scale-95" title="Xem phiếu lương">
                    <span class="material-symbols-outlined text-lg">visibility</span>
                  </button>
                  <button @click="openEditModal(item, index)" class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-transparent text-[var(--sys-icon-default)] hover:text-[var(--sys-brand-solid)] hover:bg-[var(--sys-brand-solid)]/10 active:scale-95" title="Điều chỉnh">
                    <span class="material-symbols-outlined text-lg">edit_note</span>
                  </button>
                  <button @click="openDeleteModal(item, index)" class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-transparent text-[var(--sys-icon-default)] hover:text-[var(--sys-danger-solid)] hover:bg-[var(--sys-danger-solid)]/10 active:scale-95" title="Xóa">
                    <span class="material-symbols-outlined text-lg">delete_sweep</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="p-6 border-t border-[var(--sys-border-subtle)] flex flex-col sm:flex-row justify-between items-center gap-4 bg-[var(--sys-bg-surface)]">
        <div class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] italic">
          Showing <span class="text-[var(--sys-brand-solid)] font-black">1 - {{ filteredEmployees.length }}</span> of 156 Records
        </div>
        <div class="flex items-center gap-2">
          <button class="w-8 h-8 flex items-center justify-center rounded-xl text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)] hover:bg-[var(--sys-bg-hover)] transition-all"><span class="material-symbols-outlined text-lg">chevron_left</span></button>
          <button class="w-8 h-8 flex items-center justify-center rounded-xl bg-[var(--sys-brand-solid)] text-white font-black text-xs shadow-lg shadow-[var(--sys-brand-solid-lch-30)]">1</button>
          <button class="w-8 h-8 flex items-center justify-center rounded-xl text-[var(--sys-text-secondary)] border border-transparent hover:border-[var(--sys-border-subtle)] font-bold text-xs">2</button>
          <button class="w-8 h-8 flex items-center justify-center rounded-xl text-[var(--sys-text-secondary)] border border-transparent hover:border-[var(--sys-border-subtle)] font-bold text-xs">3</button>
          <button class="w-8 h-8 flex items-center justify-center rounded-xl text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)] hover:bg-[var(--sys-bg-hover)] transition-all"><span class="material-symbols-outlined text-lg">chevron_right</span></button>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isAddEditModalOpen" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div class="fixed inset-0 w-screen h-screen bg-black/40 z-[9999] overflow-hidden backdrop-blur-sm" @click="closeModal"></div>
          <div class="relative z-[10000] bg-[var(--sys-bg-surface-elevated)] border border-[var(--sys-border-subtle)] w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-left transform transition-all">
            <div class="px-8 py-6 border-b border-[var(--sys-border-subtle)] flex justify-between items-center">
              <div>
                <h3 class="text-xl font-black text-[var(--sys-text-primary)] uppercase tracking-tight">{{ modalTitle }}</h3>
                <p class="text-xs font-bold text-[var(--sys-text-secondary)] italic mt-0.5">Vui lòng kiểm tra kỹ các thông tin tài chính</p>
              </div>
              <button @click="closeModal" class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[var(--sys-bg-hover)] transition-all text-[var(--sys-text-secondary)]">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <div class="p-8 space-y-6 overflow-y-auto custom-scrollbar">
              <div class="grid grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div>
                    <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic">Tên nhân viên</label>
                    <input v-model="formData.name" :disabled="modalMode === 'view'" class="w-full px-4 py-3 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold text-[var(--sys-text-primary)]">
                  </div>
                  <div>
                    <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic">Lương cơ bản</label>
                    <input v-model="formData.baseSalary" type="number" :disabled="modalMode === 'view'" class="w-full px-4 py-3 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold text-[var(--sys-text-primary)]">
                  </div>
                </div>
                <div class="space-y-4">
                  <div>
                    <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic">Kỳ lương</label>
                    <input v-model="formData.period" :disabled="modalMode === 'view'" class="w-full px-4 py-3 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold text-[var(--sys-text-primary)]">
                  </div>
                  <div>
                    <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic">Tổng thu nhập</label>
                    <input v-model="formData.totalIncome" type="number" :disabled="modalMode === 'view'" class="w-full px-4 py-3 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold text-[var(--sys-success-text)]">
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic">Tổng khấu trừ</label>
                <input v-model="formData.deduction" type="number" :disabled="modalMode === 'view'" class="w-full px-4 py-3 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold text-[var(--sys-danger-text)]">
              </div>

              <div class="mt-6 p-6 bg-[var(--sys-brand-soft)] rounded-[2rem] border border-[var(--sys-brand-border)]">
                <p class="text-[10px] font-black text-[var(--sys-brand-soft-text)]/70 uppercase tracking-widest mb-1 italic">Thực nhận cuối cùng</p>
                <p class="text-3xl font-black text-[var(--sys-brand-soft-text)] tracking-tighter">{{ formatCurrency(formData.netSalary || (formData.totalIncome - formData.deduction)) }}</p>
              </div>
            </div>

            <div class="px-8 py-6 border-t border-[var(--sys-border-subtle)] flex justify-end gap-3 bg-[var(--sys-bg-surface-elevated)]">
              <button @click="closeModal" class="px-6 py-2.5 text-xs font-black text-[var(--sys-text-secondary)] uppercase tracking-widest hover:bg-[var(--sys-bg-hover)] rounded-xl transition-all">Đóng</button>
              <button v-if="modalMode !== 'view'" @click="saveData" class="px-8 py-2.5 bg-[var(--sys-brand-solid)] text-white rounded-xl text-xs font-black hover:bg-[var(--sys-brand-hover)] shadow-lg shadow-[var(--sys-brand-solid-lch-30)] transition-all uppercase tracking-widest">Lưu thay đổi</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useConfirm } from '@/composables/useConfirm';

const { showConfirm } = useConfirm();

const searchQuery = ref('');

const stats = ref([
  { label: 'Tổng quỹ lương', value: '2.45B', icon: 'payments', trend: '+5.2%' },
  { label: 'Nhân sự', value: '156', icon: 'group', trend: '+2' },
  { label: 'TB Thu nhập', value: '15.7M', icon: 'monitoring', trend: '+1.5%' },
  { label: 'Khấu trừ', value: '125M', icon: 'account_balance_wallet', trend: '-0.8%' },
]);

const employees = ref([
  { id: 'EMP-001', name: 'Nguyễn Văn An', role: 'UI/UX Designer', baseSalary: 18000000, totalIncome: 21500000, deduction: 1200000, netSalary: 20300000, status: 'Đã thanh toán', period: '10/2023' },
  { id: 'EMP-042', name: 'Lê Thị Mai', role: 'Marketing Lead', baseSalary: 25000000, totalIncome: 28000000, deduction: 2500000, netSalary: 25500000, status: 'Chờ thanh toán', period: '10/2023' },
  { id: 'EMP-105', name: 'Trần Hoàng Nam', role: 'Web Developer', baseSalary: 20000000, totalIncome: 20000000, deduction: 1500000, netSalary: 18500000, status: 'Đã khóa', period: '10/2023' },
  { id: 'EMP-018', name: 'Phạm Minh Đức', role: 'Product Manager', baseSalary: 35000000, totalIncome: 42000000, deduction: 4800000, netSalary: 37200000, status: 'Đã thanh toán', period: '10/2023' },
]);

const filteredEmployees = computed(() => {
  if (!searchQuery.value) return employees.value;
  const q = searchQuery.value.toLowerCase();
  return employees.value.filter(e => e.name.toLowerCase().includes(q) || e.id.toLowerCase().includes(q));
});

const isAddEditModalOpen = ref(false);
const modalMode = ref('add');
const formData = ref({});
const selectedIndex = ref(-1);

const modalTitle = computed(() => {
  if (modalMode.value === 'add') return 'Tạo bản ghi mới';
  if (modalMode.value === 'edit') return 'Chỉnh sửa tài chính';
  return 'Thông tin chi tiết';
});

const formatCurrency = (val) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
};

const getStatusClasses = (status) => {
  switch (status) {
    case 'Đã thanh toán': return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)]';
    case 'Chờ thanh toán': return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)]';
    case 'Đã khóa': return 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)]';
    default: return 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)]';
  }
};

const openAddModal = () => {
  modalMode.value = 'add';
  formData.value = { id: `EMP-${Math.floor(Math.random()*900)+100}`, name: '', role: 'Nhân viên', period: '10/2023', baseSalary: 0, totalIncome: 0, deduction: 0, status: 'Chờ thanh toán' };
  isAddEditModalOpen.value = true;
};

const openEditModal = (item, index) => {
  modalMode.value = 'edit';
  selectedIndex.value = index;
  formData.value = { ...item };
  isAddEditModalOpen.value = true;
};

const openViewModal = (item) => {
  modalMode.value = 'view';
  formData.value = { ...item };
  isAddEditModalOpen.value = true;
};

const closeModal = () => {
  isAddEditModalOpen.value = false;
};

const saveData = () => {
  if (modalMode.value === 'add') {
    employees.value.unshift({ ...formData.value, netSalary: formData.value.totalIncome - formData.value.deduction });
  } else {
    employees.value[selectedIndex.value] = { ...formData.value, netSalary: formData.value.totalIncome - formData.value.deduction };
  }
  closeModal();
};

const openDeleteModal = async (item, index) => {
  const ok = await showConfirm('Xác nhận xóa', `Bạn có chắc muốn xóa bản ghi của ${item.name}? Hành động này không thể hoàn tác.`);
  if (ok) {
    employees.value.splice(index, 1);
  }
};
</script>

<style scoped>
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>