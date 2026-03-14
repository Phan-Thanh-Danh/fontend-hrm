<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-slate-900 tracking-tight">Chi trả Tiền lương</h1>
        <p class="text-slate-500 text-sm font-medium italic">Bảng kê thu nhập, phụ cấp và các khoản khấu trừ nhân sự.</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="bg-white p-1 rounded-2xl border border-slate-100 flex items-center shadow-sm">
           <button 
             v-for="view in ['grid', 'list']" 
             :key="view"
             @click="viewMode = view"
             :class="`p-2 rounded-xl transition-all ${viewMode === view ? 'bg-slate-100 text-indigo-600' : 'text-slate-400'}`"
           >
             <span class="material-symbols-outlined text-[20px]">{{ view === 'grid' ? 'grid_view' : 'format_list_bulleted' }}</span>
           </button>
        </div>
        <button 
          @click="showCreatePeriodModal = true"
          class="px-5 py-2.5 bg-indigo-600 rounded-xl font-black text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2"
        >
          <span class="material-symbols-outlined text-[20px]">add_task</span>
          Chốt lương tháng {{ currentMonth }}
        </button>
      </div>
    </div>

    <!-- Active Periods -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="period in periods" :key="period.id" class="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300">
        <div class="p-8">
          <div class="flex items-center justify-between mb-6">
            <span :class="`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(period.status)} text-xs`">
              {{ period.status.replace('_', ' ') }}
            </span>
            <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
               <span class="material-symbols-outlined text-sm">more_vert</span>
            </div>
          </div>
          <h3 class="text-xl font-black text-slate-900 mb-1">Tháng {{ period.month }}/{{ period.year }}</h3>
          <p class="text-[11px] font-bold text-slate-400 tracking-widest uppercase mb-8 italic">Phạm vi: {{ period.range }}</p>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 bg-slate-50/50 rounded-2xl">
              <p class="text-[10px] font-black text-slate-400 uppercase mb-1">Tổng quỹ</p>
              <p class="text-sm font-black text-slate-900">{{ formatCurrency(period.total_fund) }}</p>
            </div>
            <div class="p-4 bg-slate-50/50 rounded-2xl">
              <p class="text-[10px] font-black text-slate-400 uppercase mb-1">Nhân sự</p>
              <p class="text-sm font-black text-slate-900">{{ period.employee_count }} NV</p>
            </div>
          </div>
        </div>
        <div class="mt-auto px-8 py-6 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
            <button @click="viewDetails(period)" class="text-xs font-black text-indigo-600 uppercase tracking-widest hover:tracking-[0.15em] transition-all">Chi tiết bảng lương</button>
            <span class="text-[10px] font-bold text-slate-400 italic">Cập nhật: {{ period.updated_at }}</span>
        </div>
      </div>
    </div>

    <!-- Details Table (Visible when a period is selected) -->
    <div v-if="selectedPeriod" class="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
       <div class="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
          <div class="flex items-center gap-3">
             <div class="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <span class="material-symbols-outlined">payments</span>
             </div>
             <div>
                <h3 class="font-black text-slate-900">Chi tiết lương tháng {{ selectedPeriod.month }}/{{ selectedPeriod.year }}</h3>
                <p class="text-xs font-bold text-slate-400 italic">Double-click vào dòng để chỉnh sửa nhanh</p>
             </div>
          </div>
          <div class="flex items-center gap-2">
             <button class="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-black hover:bg-slate-200 transition-all">Xuất File Excel</button>
             <button v-if="selectedPeriod.status === 'ĐANG_XỬ_LÝ'" @click="approvePeriod" class="px-4 py-2 bg-green-600 text-white rounded-xl text-xs font-black shadow-lg shadow-green-100 transition-all">Phê duyệt & Chốt</button>
          </div>
       </div>

       <div class="overflow-x-auto text-sm">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50/30">
                <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Nhân viên</th>
                <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Lương CB</th>
                <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Phụ cấp</th>
                <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Khấu trừ</th>
                <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Thực nhận</th>
                <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              <tr v-for="item in salaryItems" :key="item.id" class="hover:bg-slate-50/50 transition-all group">
                <td class="px-8 py-5">
                   <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400 text-xs">
                         {{ item.name.charAt(0) }}
                      </div>
                      <div>
                         <p class="font-black text-slate-900 mb-0.5">{{ item.name }}</p>
                         <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{{ item.code }}</p>
                      </div>
                   </div>
                </td>
                <td class="px-8 py-5 font-bold text-slate-600">{{ formatCurrency(item.base) }}</td>
                <td class="px-8 py-5 font-bold text-green-600">+{{ formatCurrency(item.bonus) }}</td>
                <td class="px-8 py-5 font-bold text-red-500">-{{ formatCurrency(item.deduction) }}</td>
                <td class="px-8 py-5">
                   <p class="font-black text-indigo-600 text-[15px]">{{ formatCurrency(item.base + item.bonus - item.deduction) }}</p>
                </td>
                <td class="px-8 py-5 text-right">
                   <button @click="editSalary(item)" :disabled="selectedPeriod.status !== 'ĐANG_XỬ_LÝ'" class="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl shadow-sm transition-all disabled:opacity-30">
                      <span class="material-symbols-outlined text-[18px]">edit_note</span>
                   </button>
                </td>
              </tr>
            </tbody>
          </table>
       </div>
    </div>

    <!-- Edit Salary Modal -->
    <transition name="modal">
      <div v-if="showEditModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="showEditModal = false"></div>
        <div class="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all">
          <div class="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 class="text-lg font-black text-slate-900">Điều chỉnh thu nhập</h3>
            <button @click="showEditModal = false" class="w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-white hover:shadow-md transition-all text-slate-400">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <div class="p-8 space-y-4">
             <div class="mb-6 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center font-black text-blue-600">{{ editForm.name.charAt(0) }}</div>
                <div>
                  <p class="font-black text-blue-900">{{ editForm.name }}</p>
                  <p class="text-[10px] text-blue-500 font-bold uppercase tracking-widest">{{ editForm.code }}</p>
                </div>
             </div>

             <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Lương cơ bản (Theo HĐ)</label>
                <input v-model="editForm.base" type="number" disabled class="w-full px-4 py-3 bg-slate-100 border border-slate-100 rounded-xl text-sm font-bold text-slate-500 cursor-not-allowed">
             </div>

             <div class="grid grid-cols-2 gap-4">
                <div>
                   <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Tổng phụ cấp (+)</label>
                   <input v-model="editForm.bonus" type="number" class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:border-green-600 transition-all font-black text-green-600">
                </div>
                <div>
                   <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Tổng khấu trừ (-)</label>
                   <input v-model="editForm.deduction" type="number" class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-red-600/5 focus:border-red-600 transition-all font-black text-red-500">
                </div>
             </div>

             <div class="mt-6 p-6 bg-slate-900 rounded-[2rem] shadow-xl">
                 <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">Thực nhận dự kiến</p>
                 <p class="text-2xl font-black text-white tracking-widest">{{ formatCurrency(editForm.base + editForm.bonus - editForm.deduction) }}</p>
             </div>
          </div>

          <div class="px-8 py-6 border-t border-slate-50 bg-slate-50/30">
            <button @click="saveSalaryAdjustment" class="w-full py-4 bg-indigo-600 text-white rounded-2xl text-sm font-black hover:bg-indigo-700 shadow-xl shadow-indigo-100 uppercase tracking-widest transition-all">Lưu điều chỉnh</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';

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
    case 'ĐÃ_THANH_TOÁN': return 'bg-green-100 text-green-700';
    case 'ĐANG_XỬ_LÝ': return 'bg-indigo-100 text-indigo-700';
    case 'CHỜ_DUYỆT': return 'bg-amber-100 text-amber-700';
    default: return 'bg-slate-100 text-slate-700';
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

const approvePeriod = () => {
    if (confirm(`Bạn có chắc muốn phê duyệt bảng lương tháng ${selectedPeriod.value.month}/${selectedPeriod.value.year}? Sau khi duyệt, dữ liệu sẽ được khóa.`)) {
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
  background: #e2e8f0;
  border-radius: 10px;
}

/* Modal Transitions */
.modal-enter-active, .modal-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}
</style>
