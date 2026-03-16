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

        <Dropdown 
          v-model="filterStatus"
          :options="statusOptions"
          placeholder="Tất cả trạng thái"
        />

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
                  <div :class="`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider whitespace-nowrap border d-inline-flex align-items-center gap-2 ${getStatusColor(item.status)}`">
                    <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotColor(item.status)"></span>
                    {{ item.status.replaceAll('_', ' ') }}
                  </div>
                </td>
                <td class="px-6 py-4 border-b border-slate-50 text-right">
                  <div class="flex items-center justify-end gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <button @click="editContract(item)" class="btn-action-icon">
                      <span class="material-symbols-outlined">edit</span>
                    </button>
                    <button @click="extendContract(item)" class="btn-action-icon btn-success-action" title="Gia hạn HĐ">
                      <span class="material-symbols-outlined">restore</span>
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
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
      >
        <div v-if="showModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div class="fixed inset-0 w-screen h-screen bg-slate-900/50 z-[9999] overflow-hidden backdrop-blur-sm" @click="closeModal"></div>
          <div class="relative z-[10000] bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all text-left">
            <div class="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 text-left">
              <div class="text-left">
                <h3 class="text-lg font-black text-slate-900 text-left">{{ editMode ? 'Cập nhật hợp đồng' : 'Soạn thảo hợp đồng mới' }}</h3>
                <p class="text-xs text-slate-500 font-bold italic mt-0.5 text-left">Hệ thống sẽ tự động tính ngày hết hiệu lực</p>
              </div>
              <button @click="closeModal" class="w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-white hover:shadow-md transition-all text-slate-400">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <div class="p-8 space-y-5">
               <div>
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic text-left">Nhân viên thụ hưởng *</label>
                  <input v-model="form.employee_name" type="text" placeholder="Tìm kiếm tên nhân viên..." class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all text-left">
               </div>

               <div class="grid grid-cols-2 gap-4 text-left">
                 <div class="text-left">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic text-left">Loại hợp đồng *</label>
                    <Dropdown 
                      v-model="form.contract_type"
                      :options="contractTypeOptions"
                      class="w-full"
                    />
                 </div>
                 <div class="text-left">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic text-left">Số hợp đồng *</label>
                    <input v-model="form.contract_no" type="text" placeholder="HD2023..." class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all text-left text-sm">
                 </div>
               </div>

               <div class="grid grid-cols-2 gap-4 text-left">
                 <div class="text-left">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic text-left">Ngày ký *</label>
                    <input v-model="form.sign_date" type="date" class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all text-left">
                 </div>
                 <div class="text-left">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic text-left">Ngày hiệu lực *</label>
                    <input v-model="form.start_date" type="date" class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all text-left">
                 </div>
               </div>

               <div class="p-5 bg-blue-50/50 rounded-3xl border border-blue-100 border-dashed text-left">
                  <p class="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 italic text-left">Ngày hết hạn dự kiến</p>
                  <p class="text-xl font-black text-blue-900 tracking-wider text-left">
                      {{ calculateEndDate() || 'N/A' }}
                  </p>
               </div>

               <div>
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic text-left">Mức lương thỏa thuận (VNĐ)</label>
                  <input v-model="form.salary" type="number" placeholder="20.000.000" class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all text-left">
               </div>
            </div>

            <div class="px-8 py-6 border-t border-slate-100 bg-slate-50/30 flex gap-3 text-left">
              <button @click="closeModal" class="flex-1 py-3 text-sm font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest italic rounded-2xl transition-all">Hủy</button>
              <button @click="handleSave" class="flex-1 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-black hover:bg-indigo-700 shadow-xl shadow-indigo-100 uppercase tracking-widest transition-all">
                {{ editMode ? 'Cập nhật' : 'Ký Hợp đồng' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Dropdown from '@/components/Dropdown.vue';
import { useConfirm } from '@/composables/useConfirm';

const { showAlert, showConfirm } = useConfirm();

const showModal = ref(false);
const editMode = ref(false);
const searchQuery = ref('');
const filterStatus = ref('ALL');

const statusOptions = [
  { label: 'Tất cả trạng thái', value: 'ALL' },
  { label: 'Đang hiệu lực', value: 'ĐANG_HIỆU_LỰC' },
  { label: 'Sắp hết hạn', value: 'SẮP_HẾT_HẠN' },
  { label: 'Đã thanh lý', value: 'ĐÃ_THANH_LÝ' }
];

const contractTypeOptions = [
  { label: 'Thử việc (2 tháng)', value: 'THỬ_VIỆC' },
  { label: 'Lao động (1 năm)', value: 'XÁC_ĐỊNH_THỜI_HẠN_1_NƠM' },
  { label: 'Lao động (3 năm)', value: 'XÁC_ĐỊNH_THỜI_HẠN_3_NĂM' },
  { label: 'Không xác định thời hạn', value: 'KHÔNG_XÁC_ĐỊNH_THỜI_HẠN' }
];

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
    case 'ĐANG_HIỆU_LỰC': return 'bg-green-50 text-green-700 border-green-100';
    case 'SẮP_HẾT_HẠN': return 'bg-amber-50 text-amber-700 border-amber-100';
    case 'ĐÃ_THANH_LÝ': return 'bg-red-50 text-red-700 border-red-100';
    default: return 'bg-slate-50 text-slate-700 border-slate-100';
  }
};

const getStatusDotColor = (status) => {
  switch (status) {
    case 'ĐANG_HIỆU_LỰC': return 'bg-green-500';
    case 'SẮP_HẾT_HẠN': return 'bg-amber-500';
    case 'ĐÃ_THANH_LÝ': return 'bg-red-500';
    default: return 'bg-slate-500';
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

const handleSave = async () => {
    if (!form.value.employee_name || !form.value.contract_no) {
        await showAlert('Thiếu thông tin', 'Vui lòng nhập tên nhân viên và số hợp đồng!');
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

const extendContract = async (item) => {
    const ok = await showConfirm('Gia hạn hợp đồng', `Thực hiện quy trình gia hạn cho hợp đồng ${item.contract_no}? Hệ thống sẽ tạo phụ lục hợp đồng mới.`);
    if (ok) {
        openAddModal();
        form.value.employee_name = item.employee_name;
        form.value.contract_type = 'XÁC_ĐỊNH_THỜI_HẠN_1_NƠM'; // Default extension
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

</style>

