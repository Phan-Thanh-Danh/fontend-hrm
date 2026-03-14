<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-slate-900 tracking-tight">Quản lý Hợp đồng</h1>
        <p class="text-slate-500 text-sm font-medium italic">Quản lý thời hạn, điều khoản và phụ lục hợp đồng lao động.</p>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <div class="relative group hidden sm:block">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Tìm số HĐ, tên NV..." 
            class="pl-10 pr-4 py-2.5 w-64 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold"
          >
        </div>

        <select v-model="filterStatus" class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-500 outline-none hover:border-blue-300 transition-all">
          <option value="ALL">Tất cả trạng thái</option>
          <option value="ĐANG_HIỆU_LỰC">Đang hiệu lực</option>
          <option value="SẮP_HẾT_HẠN">Sắp hết hạn</option>
          <option value="ĐÃ_THANH_LÝ">Đã thanh lý</option>
        </select>

        <button 
          @click="openAddModal"
          class="px-5 py-2.5 bg-indigo-600 rounded-xl font-black text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2"
        >
          <span class="material-symbols-outlined text-[20px]">add</span>
          Ký hợp đồng mới
        </button>
      </div>
    </div>

    <!-- Alert Box -->
    <div v-if="expiringCount > 0" class="bg-amber-50 border border-amber-100 rounded-[2rem] p-6 flex flex-wrap items-center gap-4 shadow-sm">
      <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-2xl animate-bounce">warning</span>
      </div>
      <div class="flex-1 min-w-[300px]">
        <h4 class="text-amber-800 font-black text-sm uppercase tracking-wide">Cảnh báo: {{ expiringCount }} hợp đồng sắp hết hạn</h4>
        <p class="text-amber-700 text-xs font-bold italic mt-0.5">Vui lòng kiểm tra và xử lý gia hạn trước 30 ngày để đảm bảo quyền lợi nhân viên.</p>
      </div>
      <button class="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-black shadow-lg shadow-amber-200 transition-all">Xem ngay</button>
    </div>

    <!-- Main List -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- Left: History & Stats -->
      <div class="space-y-6 xl:col-span-1">
        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
          <div class="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full opacity-50"></div>
          <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-blue-500"></span> Thống kê hiệu lực
          </h3>
          <div class="space-y-4">
            <div v-for="stat in contractStats" :key="stat.label" class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <span class="text-sm font-bold text-slate-600">{{ stat.label }}</span>
              <span class="text-lg font-black text-slate-900">{{ stat.value }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-slate-300"></span> Lịch sử thay đổi gần đây
          </h3>
          <div class="space-y-6 relative">
             <div class="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-100"></div>
             <div v-for="log in historyLogs" :key="log.id" class="flex gap-4 relative">
                <div :class="`w-8 h-8 rounded-full border-2 border-white shadow-sm flex items-center justify-center shrink-0 z-10 ${log.bg}`">
                    <span class="material-symbols-outlined text-[14px] text-white">{{ log.icon }}</span>
                </div>
                <div>
                   <p class="text-[13px] font-black text-slate-900 mb-0.5">{{ log.content }}</p>
                   <p class="text-[10px] font-bold text-slate-400 italic">{{ log.time }} • {{ log.user }}</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <!-- Right: Main Table -->
      <div class="xl:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden text-sm flex flex-col h-full">
        <div class="overflow-x-auto flex-1">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50/30">
                <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Số HĐ</th>
                <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Nhân viên</th>
                <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Thời hạn</th>
                <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Trạng thái</th>
                <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredContracts" :key="item.id" class="hover:bg-slate-50/50 transition-all group">
                <td class="px-6 py-4 border-b border-slate-50 font-black text-slate-900">{{ item.contract_no }}</td>
                <td class="px-6 py-4 border-b border-slate-50">
                   <p class="font-bold text-slate-800 mb-0.5">{{ item.employee_name }}</p>
                   <p class="text-[10px] text-slate-400 uppercase font-black">{{ item.contract_type }}</p>
                </td>
                <td class="px-6 py-4 border-b border-slate-50">
                    <div class="flex flex-col gap-0.5">
                        <span class="text-[10px] text-slate-400 font-bold italic">{{ item.start_date }} → {{ item.end_date || 'N/A' }}</span>
                    </div>
                </td>
                <td class="px-6 py-4 border-b border-slate-50">
                  <span :class="`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider whitespace-nowrap ${getStatusColor(item.status)}`">
                    {{ item.status.replaceAll('_', ' ') }}
                  </span>
                </td>
                <td class="px-6 py-4 border-b border-slate-50 text-right">
                  <div class="flex items-center justify-end gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <button @click="editContract(item)" class="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                      <span class="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button @click="extendContract(item)" class="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all" title="Gia hạn HĐ">
                      <span class="material-symbols-outlined text-[20px]">restore</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <transition name="modal">
      <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeModal"></div>
        <div class="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all">
          <div class="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h3 class="text-lg font-black text-slate-900">{{ editMode ? 'Cập nhật hợp đồng' : 'Soạn thảo hợp đồng mới' }}</h3>
              <p class="text-xs text-slate-500 font-bold italic mt-0.5 italic">Hệ thống sẽ tự động tính ngày hết hiệu lực</p>
            </div>
            <button @click="closeModal" class="w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-white hover:shadow-md transition-all text-slate-400">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <div class="p-8 space-y-4 custom-scrollbar max-h-[70vh] overflow-y-auto">
             <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Nhân viên thụ hưởng *</label>
                <input v-model="form.employee_name" type="text" placeholder="Tìm kiếm tên nhân viên..." class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all">
             </div>

             <div class="grid grid-cols-2 gap-4">
               <div>
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Loại hợp đồng *</label>
                  <select v-model="form.contract_type" class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all">
                     <option value="THỬ_VIỆC">Thử việc (2 tháng)</option>
                     <option value="XÁC_ĐỊNH_THỜI_HẠN_1_NĂM">Lao động (1 năm)</option>
                     <option value="XÁC_ĐỊNH_THỜI_HẠN_3_NĂM">Lao động (3 năm)</option>
                     <option value="KHÔNG_XÁC_ĐỊNH_THỜI_HẠN">Không xác định thời hạn</option>
                  </select>
               </div>
               <div>
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Số hợp đồng *</label>
                  <input v-model="form.contract_no" type="text" placeholder="HD2023..." class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all">
               </div>
             </div>

             <div class="grid grid-cols-2 gap-4">
               <div>
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Ngày ký *</label>
                  <input v-model="form.sign_date" type="date" class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all">
               </div>
               <div>
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Ngày hiệu lực *</label>
                  <input v-model="form.start_date" type="date" class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all">
               </div>
             </div>

             <div class="p-5 bg-blue-50/50 rounded-3xl border border-blue-100 border-dashed">
                <p class="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 italic">Ngày hết hạn dự kiến</p>
                <p class="text-xl font-black text-blue-900 tracking-wider">
                    {{ calculateEndDate() || 'N/A' }}
                </p>
             </div>

             <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Mức lương thỏa thuận (VNĐ)</label>
                <input v-model="form.salary" type="number" placeholder="20.000.000" class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all">
             </div>
          </div>

          <div class="px-8 py-6 border-t border-slate-50 bg-slate-50/30 flex gap-3">
            <button @click="closeModal" class="flex-1 py-3 text-sm font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest italic transition-all">Hủy</button>
            <button @click="handleSave" class="flex-1 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-black hover:bg-indigo-700 shadow-xl shadow-indigo-100 uppercase tracking-widest transition-all">
              {{ editMode ? 'Cập nhật' : 'Ký Hợp đồng' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const showModal = ref(false);
const editMode = ref(false);
const searchQuery = ref('');
const filterStatus = ref('ALL');

const contracts = ref([
  { id: 1, contract_no: 'HD-2023-1001', employee_name: 'Nguyễn Văn An', contract_type: 'THỬ_VIỆC', start_date: '10/10/2023', end_date: '10/12/2023', status: 'ĐANG_HIỆU_LỰC', salary: 15000000 },
  { id: 2, contract_no: 'HD-2022-0945', employee_name: 'Trần Thị Thu', contract_type: 'XÁC_ĐỊNH_THỜI_HẠN_1_NĂM', start_date: '01/01/2023', end_date: '01/01/2024', status: 'SẮP_HẾT_HẠN', salary: 25000000 },
  { id: 3, contract_no: 'HD-2021-0021', employee_name: 'Lê Quản Trị', contract_type: 'KHÔNG_XÁC_ĐỊNH_THỜI_HẠN', start_date: '01/01/2021', end_date: null, status: 'ĐANG_HIỆU_LỰC', salary: 45000000 }
]);

const filteredContracts = computed(() => {
    let list = contracts.value;
    if (filterStatus.value !== 'ALL') {
        list = list.filter(c => c.status === filterStatus.value);
    }
    if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        list = list.filter(c => 
            c.employee_name.toLowerCase().includes(q) || 
            c.contract_no.toLowerCase().includes(q)
        );
    }
    return list;
});

const contractStats = [
  { label: 'Đang hiệu lực', value: '185' },
  { label: 'Thử việc', value: '24' },
  { label: 'Vô thời hạn', value: '120' },
  { label: 'Đã thanh lý', value: '15' }
];

const historyLogs = [
  { id: 1, content: 'Ký mới hợp đồng thử việc - NV An', user: 'Admin HR', time: '10:00 AM, 10/10/2023', icon: 'add', bg: 'bg-blue-500' },
  { id: 2, content: 'Cập nhật mức lương phụ lục - NV Thu', user: 'Lê Quản Trị', time: '02:30 PM, 15/09/2023', icon: 'edit', bg: 'bg-amber-500' },
  { id: 3, content: 'Thanh lý hợp đồng - NV Cường', user: 'Lê Quản Trị', time: '09:00 AM, 01/09/2023', icon: 'delete', bg: 'bg-red-500' }
];

const expiringCount = computed(() => contracts.value.filter(c => c.status === 'SẮP_HẾT_HẠN').length);

const emptyForm = {
  id: null,
  employee_name: '',
  contract_no: '',
  contract_type: 'THỬ_VIỆC',
  sign_date: new Date().toISOString().substr(0, 10),
  start_date: new Date().toISOString().substr(0, 10),
  salary: 0,
  status: 'ĐANG_HIỆU_LỰC'
};

const form = ref({ ...emptyForm });

const openAddModal = () => {
    editMode.value = false;
    form.value = { ...emptyForm };
    form.value.contract_no = `HD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    showModal.value = true;
};

const editContract = (item) => {
    editMode.value = true;
    form.value = { ...item };
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};

const getStatusColor = (status) => {
  switch (status) {
    case 'ĐANG_HIỆU_LỰC': return 'bg-green-100 text-green-700';
    case 'SẮP_HẾT_HẠN': return 'bg-amber-100 text-amber-700';
    case 'ĐÃ_THANH_LÝ': return 'bg-red-100 text-red-700';
    default: return 'bg-slate-100 text-slate-700';
  }
};

const calculateEndDate = () => {
    if (!form.value.start_date || form.value.contract_type === 'KHÔNG_XÁC_ĐỊNH_THỜI_HẠN') return null;
    const start = new Date(form.value.start_date);
    let monthsToAdd = 0;
    if (form.value.contract_type === 'THỬ_VIỆC') monthsToAdd = 2;
    if (form.value.contract_type === 'XÁC_ĐỊNH_THỜI_HẠN_1_NĂM') monthsToAdd = 12;
    if (form.value.contract_type === 'XÁC_ĐỊNH_THỜI_HẠN_3_NĂM') monthsToAdd = 36;
    
    start.setMonth(start.getMonth() + monthsToAdd);
    return start.toLocaleDateString('vi-VN');
};

const handleSave = () => {
    if (!form.value.employee_name || !form.value.contract_no) {
        alert('Vui lòng nhập tên nhân viên và số hợp đồng!');
        return;
    }
    
    if (editMode.value) {
        const idx = contracts.value.findIndex(c => c.id === form.value.id);
        if (idx !== -1) {
            contracts.value[idx] = { ...form.value, end_date: calculateEndDate() };
        }
    } else {
        contracts.value.unshift({
            ...form.value,
            id: Date.now(),
            end_date: calculateEndDate()
        });
    }
    closeModal();
};

const extendContract = (item) => {
    if (confirm(`Thực hiện quy trình gia hạn cho hợp đồng ${item.contract_no}? Hệ thống sẽ tạo phụ lục hợp đồng mới.`)) {
        openAddModal();
        form.value.employee_name = item.employee_name;
        form.value.contract_type = 'XÁC_ĐỊNH_THỜI_HẠN_1_NĂM'; // Default extension
    }
};
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
