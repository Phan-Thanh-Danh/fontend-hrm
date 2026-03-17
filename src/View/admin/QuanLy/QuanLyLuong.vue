<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-[var(--sys-text-primary)] tracking-tight">Chi trả Tiền lương</h1>
        <p class="text-[var(--sys-text-secondary)] text-sm font-medium italic">Bảng kê thu nhập, phụ cấp và các khoản khấu trừ nhân sự.</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="bg-[var(--sys-bg-surface)] p-1 rounded-2xl border border-[var(--sys-border-subtle)] flex items-center shadow-sm">
           <button 
             v-for="view in ['grid', 'list']" 
             :key="view"
             @click="viewMode = view"
             :class="`p-2 rounded-xl transition-all ${viewMode === view ? 'bg-[var(--sys-bg-hover)] text-[var(--sys-brand-solid)]' : 'text-[var(--sys-text-secondary)]'}`"
           >
             <span class="material-symbols-outlined text-[20px]">{{ view === 'grid' ? 'grid_view' : 'format_list_bulleted' }}</span>
           </button>
        </div>
        <button 
          @click="showCreatePeriodModal = true"
          class="px-5 py-2.5 bg-[var(--sys-brand-solid)] rounded-xl font-black text-white hover:bg-[var(--sys-brand-hover)] shadow-xl shadow-[var(--sys-brand-solid-lch-30)] transition-all flex items-center gap-2"
        >
          <span class="material-symbols-outlined text-[20px]">add_task</span>
          Chốt lương tháng {{ currentMonth }}
        </button>
      </div>
    </div>

    <!-- Active Periods -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="period in periods" :key="period.id" class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300">
        <div class="p-8">
          <div class="flex items-center justify-between mb-6">
            <span :class="`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(period.status)}` text-xs`">
              {{ period.status.replace('_', ' ') }}
            </span>
            <div class="w-8 h-8 rounded-full bg-[var(--sys-bg-hover)] flex items-center justify-center text-[var(--sys-text-secondary)] group-hover:bg-[var(--sys-brand-soft)] group-hover:text-[var(--sys-brand-solid)] transition-colors">
               <span class="material-symbols-outlined text-sm">more_vert</span>
            </div>
          </div>
          <h3 class="text-xl font-black text-[var(--sys-text-primary)] mb-1">Tháng {{ period.month }}/{{ period.year }}</h3>
          <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] tracking-widest uppercase mb-8 italic">Phạm vi: {{ period.range }}</p>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 bg-[var(--sys-bg-hover)] rounded-2xl">
              <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase mb-1">Tổng quỹ</p>
              <p class="text-sm font-black text-[var(--sys-text-primary)]">{{ formatCurrency(period.total_fund) }}</p>
            </div>
            <div class="p-4 bg-[var(--sys-bg-hover)] rounded-2xl">
              <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase mb-1">Nhân sự</p>
              <p class="text-sm font-black text-[var(--sys-text-primary)]">{{ period.employee_count }} NV</p>
            </div>
          </div>
        </div>
        <div class="mt-auto px-8 py-6 bg-[var(--sys-bg-hover)] border-t border-[var(--sys-border-subtle)] flex items-center justify-between">
            <button @click="viewDetails(period)" class="text-xs font-black text-[var(--sys-brand-solid)] uppercase tracking-widest hover:tracking-[0.15em] transition-all">Chi tiết bảng lương</button>
            <span class="text-[10px] font-bold text-[var(--sys-text-secondary)] italic">Cập nhật: {{ period.updated_at }}</span>
        </div>
      </div>
    </div>

    <!-- Details Table (Visible when a period is selected) -->
    <div v-if="selectedPeriod" class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col">
       <div class="px-8 py-6 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-[var(--sys-bg-surface)] sticky top-0 z-10">
          <div class="flex items-center gap-3">
             <div class="w-10 h-10 rounded-2xl bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center">
                <span class="material-symbols-outlined">payments</span>
             </div>
             <div class="text-left">
                <h3 class="font-black text-[var(--sys-text-primary)] text-left">Chi tiết lương tháng {{ selectedPeriod.month }}/{{ selectedPeriod.year }}</h3>
                <p class="text-xs font-bold text-[var(--sys-text-secondary)] italic text-left">Double-click vào dòng để chỉnh sửa nhanh</p>
             </div>
          </div>
          <div class="flex items-center gap-2">
             <button class="px-4 py-2 bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] border border-[var(--sys-border-subtle)] rounded-xl text-xs font-black hover:bg-[var(--sys-bg-hover)] transition-all uppercase tracking-widest">Xuất File Excel</button>
             <button v-if="selectedPeriod.status === 'ĐANG_XỬ_LÝ'" @click="approvePeriod" class="px-4 py-2 bg-[var(--sys-success-solid)] text-white rounded-xl text-xs font-black shadow-lg shadow-[var(--sys-success-solid-lch-30)] transition-all uppercase tracking-widest">Phê duyệt & Chốt</button>
          </div>
       </div>

       <div class="overflow-x-auto text-sm custom-scrollbar">
          <table class="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr>
                <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Nhân viên</th>
                <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Lương CB</th>
                <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Phụ cấp</th>
                <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Khấu trừ</th>
                <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Thực nhận</th>
                <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody class="bg-transparent">
              <tr v-for="item in salaryItems" :key="item.id" 
                  class="group transition-all duration-200 bg-transparent hover:bg-[var(--sys-bg-hover)]">
                <td class="px-6 py-5 border-b border-[var(--sys-border-subtle)] bg-transparent">
                    <div class="flex flex-col bg-transparent">
                        <span class="font-black text-[var(--sys-text-primary)] mb-0.5 bg-transparent">{{ item.name }}</span>
                        <span class="text-[10px] text-[var(--sys-brand-solid)] font-bold uppercase tracking-widest bg-transparent">{{ item.code }}</span>
                    </div>
                </td>
                <td class="px-6 py-5 font-black text-[var(--sys-text-secondary)] bg-transparent border-b border-[var(--sys-border-subtle)]">{{ formatCurrency(item.base) }}</td>
                <td class="px-6 py-5 font-black text-[var(--sys-success-text)] bg-transparent border-b border-[var(--sys-border-subtle)]">+{{ formatCurrency(item.bonus) }}</td>
                <td class="px-6 py-5 font-black text-[var(--sys-danger-text)] bg-transparent border-b border-[var(--sys-border-subtle)]">-{{ formatCurrency(item.deduction) }}</td>
                <td class="px-6 py-5 bg-transparent border-b border-[var(--sys-border-subtle)]">
                   <p class="font-black text-[var(--sys-brand-solid)] text-base tracking-tight bg-transparent">{{ formatCurrency(item.base + item.bonus - item.deduction) }}</p>
                </td>
                <td class="px-6 py-5 border-b border-[var(--sys-border-subtle)] text-right bg-transparent">
                    <div class="flex items-center justify-end gap-2 bg-transparent text-right">
                        <button 
                            @click="viewPayslip(item)"
                            class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-transparent text-[var(--sys-icon-default)] hover:text-[var(--sys-brand-solid)] hover:bg-[var(--sys-brand-solid)]/10 active:scale-95" 
                            title="Xem phiếu lương"
                        >
                            <span class="material-symbols-outlined text-lg">visibility</span>
                        </button>
                        <button 
                            @click="editSalary(item)" 
                            :disabled="selectedPeriod.status !== 'ĐANG_XỬ_LÝ'" 
                            class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-transparent text-[var(--sys-icon-default)] hover:text-[var(--sys-brand-solid)] hover:bg-[var(--sys-brand-solid)]/10 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95" 
                            title="Điều chỉnh thu nhập"
                        >
                            <span class="material-symbols-outlined text-lg">edit_note</span>
                        </button>
                    </div>
                </td>
              </tr>
            </tbody>
          </table>
       </div>
    </div>

    <!-- Edit Salary Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
      >
        <div v-if="showEditModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div class="fixed inset-0 w-screen h-screen bg-black/40 z-[9999] overflow-hidden backdrop-blur-sm" @click="showEditModal = false"></div>
          <div class="relative z-[10000] bg-[var(--sys-bg-surface-elevated)] border border-[var(--sys-border-subtle)] w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all text-left">
            <div class="px-8 py-6 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-[var(--sys-bg-surface-elevated)] text-left">
              <div class="text-left">
                <h3 class="text-xl font-black text-[var(--sys-text-primary)] text-left">Điều chỉnh thu nhập</h3>
                <p class="text-xs text-[var(--sys-text-secondary)] font-bold italic mt-0.5 text-left">Thay đổi sẽ áp dụng cho kỳ thanh toán hiện tại</p>
              </div>
              <button @click="showEditModal = false" class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[var(--sys-bg-hover)] transition-all text-[var(--sys-text-secondary)]">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <div class="p-8 space-y-5">
               <div class="mb-6 p-4 bg-[var(--sys-brand-soft)] rounded-2xl border border-[var(--sys-brand-border)] flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center font-black text-[var(--sys-brand-solid)]">{{ editForm.name.charAt(0) }}</div>
                  <div class="text-left">
                    <p class="font-black text-[var(--sys-brand-soft-text)] text-left">{{ editForm.name }}</p>
                    <p class="text-[10px] text-[var(--sys-brand-soft-text)]/70 font-bold uppercase tracking-widest text-left">{{ editForm.code }}</p>
                  </div>
               </div>

                <div>
                  <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic text-left">Lương cơ bản (Theo HĐ)</label>
                  <input v-model="editForm.base" type="number" disabled class="w-full px-4 py-3 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold text-[var(--sys-text-secondary)] cursor-not-allowed text-left">
                </div>

                <div class="grid grid-cols-2 gap-4 text-left">
                  <div class="text-left">
                     <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic text-left">Tổng phụ cấp (+)</label>
                     <input v-model="editForm.bonus" type="number" class="w-full px-4 py-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all font-black text-[var(--sys-success-text)] text-left">
                  </div>
                  <div class="text-left">
                     <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic text-left">Tổng khấu trừ (-)</label>
                     <input v-model="editForm.deduction" type="number" class="w-full px-4 py-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-danger-solid)]/5 focus:border-[var(--sys-danger-solid)] transition-all font-black text-[var(--sys-danger-text)] text-left">
                  </div>
               </div>

                <div class="mt-6 p-6 bg-[var(--sys-bg-surface-elevated)] rounded-[2rem] shadow-xl text-left border border-[var(--sys-border-subtle)]">
                   <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1 italic text-left">Thực nhận dự kiến</p>
                   <p class="text-2xl font-black text-[var(--sys-text-primary)] tracking-widest text-left">{{ formatCurrency(editForm.base + editForm.bonus - editForm.deduction) }}</p>
               </div>
            </div>

             <div class="px-8 py-6 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-hover)] flex justify-end gap-3 text-left">
              <button @click="showEditModal = false" class="px-6 py-2.5 min-h-[44px] text-sm font-bold text-[var(--sys-text-secondary)] hover:bg-[var(--sys-bg-hover)] rounded-lg transition-all uppercase tracking-widest">Hủy</button>
              <button @click="saveSalaryAdjustment" class="px-8 py-2.5 min-h-[44px] bg-[var(--sys-brand-solid)] text-white rounded-lg text-sm font-black hover:bg-[var(--sys-brand-hover)] shadow-lg shadow-[var(--sys-brand-solid-lch-30)] transition-all uppercase tracking-widest">Lưu điều chỉnh</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useConfirm } from '@/composables/useConfirm';

const { showConfirm } = useConfirm();

const currentMonth = new Date().getMonth() + 1;
const viewMode = ref('grid');
const selectedPeriod = ref(null);
const showEditModal = ref(false);

const periods = ref([
  { id: 1, month: '10', year: '2023', status: 'ĐÃ_THANH_TOÁN', range: '01/10 - 31/10', total_fund: 1250000000, employee_count: 124, updated_at: '05/11/2023' },
  { id: 2, month: '11', year: '2023', status: 'ĐANG_XỬ_LÝ', range: '01/11 - 30/11', total_fund: 1285000000, employee_count: 126, updated_at: 'Hôm nay' },
]);

const salaryItems = ref([
  { id: 1, name: 'Nguyễn Văn An', code: 'EMP-001', base: 15000000, bonus: 2500000, deduction: 500000 },
  { id: 2, name: 'Trần Thị Thu', code: 'EMP-005', base: 22000000, bonus: 3000000, deduction: 1200000 },
  { id: 3, name: 'Lê Quản Trị', code: 'EMP-012', base: 40000000, bonus: 10000000, deduction: 5000000 },
  { id: 4, name: 'Phạm Designer', code: 'EMP-088', base: 18000000, bonus: 1500000, deduction: 0 },
]);

const editForm = ref({ id: null, name: '', code: '', base: 0, bonus: 0, deduction: 0 });

const formatCurrency = (val) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
};

const getStatusColor = (status) => {
  switch (status) {
    case 'ĐÃ_THANH_TOÁN': return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)]';
    case 'ĐANG_XỬ_LÝ': return 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)]';
    case 'CHỜ_DUYỆT': return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)]';
    default: return 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)]';
  }
};

const viewDetails = (period) => {
    selectedPeriod.value = period;
};

const editSalary = (item) => {
    editForm.value = { ...item };
    showEditModal.value = true;
};

const saveSalaryAdjustment = () => {
    const idx = salaryItems.value.findIndex(i => i.id === editForm.value.id);
    if (idx !== -1) {
        salaryItems.value[idx] = { ...editForm.value };
    }
    showEditModal.value = false;
};

const viewPayslip = (item) => {
    // Navigate to employee payslip view or show modal
    // For now, let's assume we navigate or just log it
    console.log('Viewing payslip for:', item.name);
    // In a real app, this might navigate to /admin/phieu-luong/:id
};

const approvePeriod = async () => {
    const ok = await showConfirm('Phê duyệt bảng lương', `Bạn có chắc muốn phê duyệt bảng lương tháng ${selectedPeriod.value.month}/${selectedPeriod.value.year}? Sau khi duyệt, dữ liệu sẽ được khóa.`);
    if (ok) {
        selectedPeriod.value.status = 'ĐÃ_THANH_TOÁN';
        selectedPeriod.value.updated_at = new Date().toLocaleDateString('vi-VN');
    }
};

// Auto-select first period on load
selectedPeriod.value = periods.value[1];
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--sys-border-subtle);
  border-radius: 10px;
}
</style>
