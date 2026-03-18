<template>
  <div class="space-y-6 pb-8">
    <!-- Header Area -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left">
      <div class="bg-transparent text-left">
        <h1 class="text-xl font-semibold text-[var(--sys-text-primary)] mb-1">Quản lý Quyết toán & Bảng lương</h1>
        <p class="text-sm text-[var(--sys-text-secondary)]">Quản lý chu kỳ thu nhập, phê chuẩn thanh quyết toán và đối soát ngân quỹ nhân sự.</p>
      </div>
      <div class="flex items-center gap-3 text-left bg-transparent shrink-0">
        <button class="h-10 px-4 bg-[var(--sys-bg-surface)] border border-[var(--sys-border-strong)] text-[var(--sys-text-secondary)] rounded-md font-semibold text-sm hover:text-[var(--sys-brand-solid)] transition-all flex items-center gap-2 shadow-sm">
          <span class="material-symbols-outlined text-[20px]">ios_share</span>
          Xuất báo cáo
        </button>
        <button @click="openAddModal" class="h-10 px-6 bg-[var(--sys-brand-solid)] rounded-md font-semibold text-white hover:brightness-90 transition-all flex items-center gap-2 text-sm shadow-sm">
          <span class="material-symbols-outlined text-[20px]">add_card</span>
          Tạo kỳ quyết toán
        </button>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="(stat, idx) in stats" :key="idx" 
        class="bg-[var(--sys-bg-surface)] p-4 rounded-lg border border-[var(--sys-border-subtle)] shadow-sm hover:border-[var(--sys-brand-solid)] transition-all group flex items-center gap-4">
        <div class="w-12 h-12 rounded-md flex items-center justify-center bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] transition-all">
          <span class="material-symbols-outlined text-[24px]">{{ stat.icon }}</span>
        </div>
        <div class="bg-transparent flex flex-col flex-1">
          <div class="flex items-center justify-between mb-0.5">
            <p class="text-[12px] font-medium text-[var(--sys-text-secondary)] uppercase tracking-wide">{{ stat.label }}</p>
            <span :class="[
              'text-[10px] font-bold',
              stat.trend.startsWith('+') ? 'text-[var(--sys-success-text)]' : 'text-[var(--sys-danger-text)]'
            ]">
              {{ stat.trend }}
            </span>
          </div>
          <p class="text-xl font-bold text-[var(--sys-text-primary)] m-0 leading-tight">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <!-- Main Data Table Container -->
    <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col min-h-[500px]">
      <!-- Toolbar -->
      <div class="px-4 py-3 border-b border-[var(--sys-border-subtle)] flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 bg-[var(--sys-bg-page)]/50">
        <div class="flex items-center gap-1 bg-white p-1 rounded-md border border-[var(--sys-border-subtle)] shadow-sm">
          <button class="px-4 py-1.5 rounded-md text-[13px] font-semibold bg-[var(--sys-brand-solid)] text-white shadow-sm">Tháng 10 / 2023</button>
          <button class="px-4 py-1.5 rounded-md text-[13px] font-semibold text-[var(--sys-text-secondary)] hover:bg-[var(--sys-bg-hover)]">Tháng 09 / 2023</button>
        </div>

        <div class="flex items-center gap-3 w-full xl:w-auto bg-transparent">
          <div class="relative flex-1 xl:w-80 group">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-[var(--sys-brand-solid)]">search</span>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Tìm kiếm nhân viên..." 
              class="w-full h-10 pl-10 pr-4 bg-white border border-[var(--sys-border-strong)] rounded-md text-sm text-[var(--sys-text-primary)] focus:outline-none focus:border-[var(--sys-brand-solid)] focus:ring-1 focus:ring-[var(--sys-brand-solid)] transition-all placeholder:text-[var(--sys-text-disabled)]"
            >
          </div>
          <button class="shrink-0 h-10 px-4 bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] rounded-md text-sm font-semibold hover:bg-[var(--sys-success-solid)] hover:text-white transition-all border border-[var(--sys-success-border)] flex items-center gap-2 shadow-sm">
            <span class="material-symbols-outlined text-[20px]">verified_user</span>
            Chốt kỳ lương
          </button>
        </div>
      </div>

      <!-- Table Section -->
      <div class="overflow-x-auto bg-transparent custom-scrollbar flex-grow">
        <table class="w-full text-left border-collapse">
          <thead class="bg-[var(--sys-bg-page)]">
            <tr>
              <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider whitespace-nowrap">Hồ sơ thụ hưởng</th>
              <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider text-right whitespace-nowrap">Mức lương cơ bản</th>
              <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider text-right whitespace-nowrap">Thu nhập gộp</th>
              <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider text-right whitespace-nowrap">Khấu trừ trích nộp</th>
              <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-brand-solid)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider text-right bg-[var(--sys-brand-soft)]/20 whitespace-nowrap">Thực lĩnh (NET)</th>
              <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider text-center whitespace-nowrap">Trạng thái</th>
              <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider text-right whitespace-nowrap">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--sys-border-subtle)]">
            <tr v-for="(item, index) in filteredEmployees" :key="index" 
              class="group hover:bg-[var(--sys-bg-hover)] transition-all">
              <td class="px-4 py-3 whitespace-nowrap bg-transparent">
                <div class="flex flex-col bg-transparent">
                  <span class="text-[13px] font-semibold text-[var(--sys-text-primary)] transition-colors line-clamp-1 max-w-[200px]">{{ item.name }}</span>
                  <span class="text-[12px] text-[var(--sys-text-secondary)]">{{ item.role }}</span>
                </div>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-right text-[13px] text-[var(--sys-text-secondary)] font-medium">{{ formatCurrency(item.baseSalary) }}</td>
              <td class="px-4 py-3 whitespace-nowrap text-right text-[13px] text-[var(--sys-brand-solid)] font-semibold">+{{ formatCurrency(item.totalIncome) }}</td>
              <td class="px-4 py-3 whitespace-nowrap text-right text-[13px] text-[var(--sys-danger-text)] font-semibold">-{{ formatCurrency(item.deduction) }}</td>
              <td class="px-4 py-3 whitespace-nowrap text-right bg-[var(--sys-brand-soft)]/5">
                <span class="text-[14px] font-bold text-[var(--sys-brand-solid)]">{{ formatCurrency(item.netSalary) }}</span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-center bg-transparent">
                <span 
                  class="px-2 py-0.5 rounded-md text-[11px] font-semibold border transition-all uppercase tracking-wide"
                  :class="getStatusClasses(item.status)"
                >
                  {{ item.status }}
                </span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-right bg-transparent">
                <div class="flex items-center justify-end gap-1">
                  <button @click="openViewModal(item)" class="w-8 h-8 flex items-center justify-center rounded-md text-[var(--sys-text-secondary)] hover:bg-[var(--sys-brand-soft)] hover:text-[var(--sys-brand-solid)] transition-all" title="Xem chi tiết">
                    <span class="material-symbols-outlined text-[18px]">visibility</span>
                  </button>
                  <button @click="openEditModal(item, index)" class="w-8 h-8 flex items-center justify-center rounded-md text-[var(--sys-text-secondary)] hover:bg-[var(--sys-brand-soft)] hover:text-[var(--sys-brand-solid)] transition-all" title="Hiệu chỉnh">
                    <span class="material-symbols-outlined text-[18px]">edit_square</span>
                  </button>
                  <button @click="openDeleteModal(item, index)" class="w-8 h-8 flex items-center justify-center rounded-md text-[var(--sys-text-secondary)] hover:bg-[var(--sys-danger-soft)] hover:text-[var(--sys-danger-solid)] transition-all" title="Xóa">
                    <span class="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-4 py-3 bg-[var(--sys-bg-page)] border-t border-[var(--sys-border-subtle)] flex flex-col sm:flex-row justify-between items-center gap-4 text-[12px] font-medium text-[var(--sys-text-secondary)]">
        <span>Hiển thị {{ filteredEmployees.length }} trên tổng số 156 hồ sơ</span>
        <div class="flex items-center gap-1.5">
          <button class="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-[var(--sys-border-subtle)] hover:text-[var(--sys-brand-solid)] transition-all"><span class="material-symbols-outlined text-[18px]">chevron_left</span></button>
          <button class="w-8 h-8 flex items-center justify-center rounded-md bg-[var(--sys-brand-solid)] text-white font-bold">1</button>
          <button class="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-[var(--sys-border-subtle)] hover:text-[var(--sys-brand-solid)] transition-all">2</button>
          <button class="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-[var(--sys-border-subtle)] hover:text-[var(--sys-brand-solid)] transition-all"><span class="material-symbols-outlined text-[18px]">chevron_right</span></button>
        </div>
      </div>
    </div>

    <!-- Modal System -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="isAddEditModalOpen" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div class="fixed inset-0 w-screen h-screen bg-black/50 z-[9999]" @click="closeModal"></div>
          <div class="relative z-[10000] bg-[var(--sys-bg-surface-elevated)] border border-[var(--sys-border-subtle)] w-full max-w-2xl max-h-[90vh] rounded-lg shadow-xl overflow-hidden flex flex-col text-left">
            <!-- Modal Header -->
            <div class="px-6 py-4 border-b border-[var(--sys-border-subtle)] flex justify-between items-center bg-[var(--sys-bg-surface)]">
              <div class="bg-transparent text-left flex flex-col">
                <h3 class="text-lg font-semibold text-[var(--sys-text-primary)] m-0 uppercase tracking-tight">{{ modalTitle }}</h3>
                <p class="text-sm text-[var(--sys-text-secondary)] mt-1">Cấu hình tham số thu nhấp và quyết toán chi trả.</p>
              </div>
              <button @click="closeModal" class="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[var(--sys-bg-hover)] transition-all text-[var(--sys-text-secondary)]">
                <span class="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <!-- Modal Body -->
            <div class="flex-1 overflow-y-auto p-6 custom-scrollbar bg-transparent">
              <div class="space-y-6 bg-transparent border-none">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-transparent border-none">
                  <div class="space-y-1.5 bg-transparent border-none">
                    <label class="text-[13px] font-medium text-[var(--sys-text-primary)] block">Hồ sơ thụ hưởng *</label>
                    <input v-model="formData.name" :disabled="modalMode === 'view'" class="w-full h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-sm text-[var(--sys-text-primary)] focus:border-[var(--sys-brand-solid)] outline-none transition-all">
                  </div>
                  <div class="space-y-1.5 bg-transparent border-none">
                    <label class="text-[13px] font-medium text-[var(--sys-text-primary)] block">Chu kỳ quyết toán</label>
                    <input v-model="formData.period" :disabled="modalMode === 'view'" class="w-full h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-sm text-[var(--sys-text-primary)] focus:border-[var(--sys-brand-solid)] outline-none transition-all">
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-transparent border-none">
                  <div class="space-y-1.5 bg-transparent border-none">
                    <label class="text-[13px] font-medium text-[var(--sys-text-primary)] block">Lương định biên (Gross)</label>
                    <input v-model="formData.baseSalary" type="number" :disabled="modalMode === 'view'" class="w-full h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-sm text-[var(--sys-text-primary)] focus:border-[var(--sys-brand-solid)] outline-none transition-all text-right">
                  </div>
                  <div class="space-y-1.5 bg-transparent border-none">
                    <label class="text-[13px] font-medium text-[var(--sys-text-primary)] block">Tổng thu nhập gộp</label>
                    <input v-model="formData.totalIncome" type="number" :disabled="modalMode === 'view'" class="w-full h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-sm text-[var(--sys-text-primary)] focus:border-[var(--sys-brand-solid)] outline-none transition-all text-right">
                  </div>
                </div>

                <div class="space-y-1.5 bg-transparent border-none">
                  <label class="text-[13px] font-medium text-[var(--sys-text-primary)] block">Các khoản trích trừ (Thuế, BH...)</label>
                  <input v-model="formData.deduction" type="number" :disabled="modalMode === 'view'" class="w-full h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-sm text-[var(--sys-danger-text)] focus:border-[var(--sys-danger-solid)] outline-none transition-all text-right">
                </div>

                <div class="p-6 bg-[var(--sys-brand-soft)] rounded-lg border border-[var(--sys-brand-border)] flex items-center justify-between">
                  <div class="bg-transparent text-left">
                    <p class="text-[12px] font-semibold text-[var(--sys-brand-solid)] mb-1 uppercase tracking-wide">Thực nhận (NET Salary)</p>
                    <p class="text-3xl font-bold text-[var(--sys-brand-solid)] m-0 leading-none">{{ formatCurrency(formData.netSalary || (formData.totalIncome - formData.deduction)) }}</p>
                  </div>
                  <div class="w-12 h-12 rounded-md bg-white flex items-center justify-center border border-[var(--sys-brand-border)] shadow-sm">
                    <span class="material-symbols-outlined text-[32px] text-[var(--sys-brand-solid)]">payments</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="px-6 py-4 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface)] flex justify-end gap-3">
              <button @click="closeModal" class="px-4 py-2 text-sm font-medium text-[var(--sys-text-secondary)] hover:bg-[var(--sys-bg-hover)] rounded-md transition-all uppercase tracking-wide">Hủy</button>
              <button v-if="modalMode !== 'view'" @click="saveData" class="px-6 py-2 bg-[var(--sys-brand-solid)] text-white rounded-md font-semibold text-sm hover:brightness-90 transition-all uppercase tracking-wide">
                Lưu hồ sơ tài chính
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
/**
 * TRANG QUẢN LÝ BẢNG LƯƠNG - PHIÊN BẢN ENTERPRISE SaaS
 * Tuân thủ 7 Golden Rules:
 * - Font Inter 14px (text-sm), Tỉ lệ Table cao (text-13px)
 * - Bo góc chuẩn B2B: 6px (MD) cho Input/Button, 8px (LG) cho Card/Modal/Table
 * - Hệ màu Blue/White đồng nhất cho Action Icons
 */
import { ref, computed } from 'vue';
import { useConfirm } from '@/composables/useConfirm';

const { showConfirm } = useConfirm();

const searchQuery = ref('');

const stats = ref([
  { label: 'Tổng ngân quỹ lương', value: '2.45B', icon: 'account_balance', trend: '+5.2%' },
  { label: 'Nhân sự thụ hưởng', value: '156', icon: 'badge', trend: '+2' },
  { label: 'Thu nhập bình quân', value: '15.7M', icon: 'query_stats', trend: '+1.5%' },
  { label: 'Qũy dự phòng rủi ro', value: '125M', icon: 'savings', trend: '-0.8%' },
]);

const employees = ref([
  { id: 'EMP-001', name: 'Nguyễn Văn An', role: 'Staff UI Software Engineer', baseSalary: 18000000, totalIncome: 21500000, deduction: 1200000, netSalary: 20300000, status: 'Đã thanh toán', period: 'Tháng 10 / 2023' },
  { id: 'EMP-042', name: 'Lê Thị Mai', role: 'Head of Marketing Lead', baseSalary: 25000000, totalIncome: 28000000, deduction: 2500000, netSalary: 25500000, status: 'Chờ thanh toán', period: 'Tháng 10 / 2023' },
  { id: 'EMP-105', name: 'Trần Hoàng Nam', role: 'Fullstack Systems Engineer', baseSalary: 20000000, totalIncome: 20000000, deduction: 1500000, netSalary: 18500000, status: 'Đã khóa hồ sơ', period: 'Tháng 10 / 2023' },
  { id: 'EMP-018', name: 'Phạm Minh Đức', role: 'Principal Product Manager', baseSalary: 35000000, totalIncome: 42000000, deduction: 4800000, netSalary: 37200000, status: 'Đã thanh toán', period: 'Tháng 10 / 2023' },
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
  if (modalMode.value === 'add') return 'Tạo hồ sơ quyết toán mới';
  if (modalMode.value === 'edit') return 'Điều chỉnh thông tin tài chính';
  return 'Chi tiết bảng lương nhân sự';
});

const formatCurrency = (val) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
};

const getStatusClasses = (status) => {
  if (status === 'Đã thanh toán') return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
  if (status === 'Chờ thanh toán') return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]';
  return 'bg-[var(--sys-bg-page)] text-[var(--sys-text-disabled)] border-[var(--sys-border-subtle)] opacity-50';
};

const openAddModal = () => {
  modalMode.value = 'add';
  formData.value = { id: `EMP-${Math.floor(Math.random()*900)+100}`, name: '', role: 'Nhân sự', period: 'Tháng 10 / 2023', baseSalary: 0, totalIncome: 0, deduction: 0, status: 'Chờ thanh toán' };
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
  const net = formData.value.totalIncome - formData.value.deduction;
  if (modalMode.value === 'add') {
    employees.value.unshift({ ...formData.value, netSalary: net });
  } else {
    employees.value[selectedIndex.value] = { ...formData.value, netSalary: net };
  }
  closeModal();
};

const openDeleteModal = async (item, index) => {
  const ok = await showConfirm('Xác nhận xóa', `Bạn có chắc muốn loại bỏ hồ sơ quyết toán của ${item.name}?`);
  if (ok) {
    employees.value.splice(index, 1);
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--sys-border-subtle);
  border-radius: 5px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--sys-brand-solid);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>