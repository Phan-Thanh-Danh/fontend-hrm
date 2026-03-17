<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-[var(--sys-text-primary)] tracking-tight">Quản lý Hợp đồng</h1>
        <p class="text-[var(--sys-text-secondary)] text-sm font-medium italic">Quản lý thời hạn, điều khoản và phụ lục hợp đồng lao động.</p>
      </div>
      <div class="flex flex-col md:flex-row items-center gap-3 flex-1 w-full mt-4 md:mt-0">
        <!-- Search Bar (flex-1 - Co giãn tối đa) -->
        <div class="relative flex-1 w-full group">
          <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[18px] text-[var(--sys-text-secondary)] opacity-50 group-focus-within:text-[var(--sys-brand-solid)] transition-all">search</span>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Tìm số hợp đồng, tên nhân sự..." 
            class="w-full h-11 pl-11 pr-4 bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold focus:outline-none focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)]"
          >
        </div>

        <!-- Action Group (Cụm Dropdown & Button) -->
        <div class="flex items-center gap-2 w-full md:w-auto shrink-0">
          <Dropdown 
            v-model="filterStatus"
            :options="statusOptions"
            placeholder="Trạng thái"
          />

          <button 
            @click="openAddModal"
            class="h-11 px-6 bg-[var(--sys-brand-solid)] rounded-xl font-bold text-white hover:brightness-110 active:scale-95 shadow-sm shadow-[var(--sys-brand-solid)]/20 transition-all flex items-center gap-2 uppercase tracking-widest text-[11px] whitespace-nowrap"
          >
            <span class="material-symbols-outlined text-[18px]">add</span>
            Ký hợp đồng
          </button>
        </div>
      </div>
    </div>

    <!-- Alert Box -->
    <div v-if="expiringCount > 0" class="bg-[var(--sys-warning-soft)] border border-[var(--sys-warning-border)] rounded-[2rem] p-6 flex flex-wrap items-center gap-4 shadow-sm">
      <div class="w-12 h-12 bg-[var(--sys-warning-solid)]/10 text-[var(--sys-warning-text)] rounded-2xl flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-2xl animate-bounce">warning</span>
      </div>
      <div class="flex-1 min-w-[300px]">
        <h4 class="text-[var(--sys-warning-text)] font-black text-sm uppercase tracking-wide">Cảnh báo: {{ expiringCount }} hợp đồng sắp hết hạn</h4>
        <p class="text-[var(--sys-warning-text)] opacity-80 text-xs font-bold italic mt-0.5">Vui lòng kiểm tra và xử lý gia hạn trước 30 ngày để đảm bảo quyền lợi nhân viên.</p>
      </div>
      <button class="px-4 py-2 bg-[var(--sys-warning-solid)] text-white rounded-xl text-xs font-black shadow-lg shadow-[var(--sys-warning-solid)]/20 transition-all hover:brightness-110">Xem ngay</button>
    </div>

    <!-- Main List -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- Left: History & Stats -->
      <div class="space-y-6 xl:col-span-1">
        <div class="bg-[var(--sys-bg-surface)] p-8 rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm relative overflow-hidden">
          <div class="absolute -right-4 -top-4 w-24 h-24 bg-[var(--sys-brand-soft)] rounded-full opacity-50"></div>
          <h3 class="text-xs font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-6 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[var(--sys-brand-solid)]"></span> Thống kê hiệu lực
          </h3>
          <div class="space-y-4">
            <div v-for="stat in contractStats" :key="stat.label" class="flex items-center justify-between p-4 bg-[var(--sys-bg-hover)] rounded-2xl">
              <span class="text-sm font-bold text-[var(--sys-text-secondary)]">{{ stat.label }}</span>
              <span class="text-lg font-black text-[var(--sys-text-primary)]">{{ stat.value }}</span>
            </div>
          </div>
        </div>

        <div class="bg-[var(--sys-bg-surface)] p-8 rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm">
          <h3 class="text-xs font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-6 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[var(--sys-border)]"></span> Lịch sử thay đổi gần đây
          </h3>
          <div class="space-y-6 relative">
             <div class="absolute left-4 top-2 bottom-2 w-0.5 bg-[var(--sys-border-subtle)]"></div>
             <div v-for="log in historyLogs" :key="log.id" class="flex gap-4 relative">
                <div :class="`w-8 h-8 rounded-full border-2 border-[var(--sys-bg-surface)] shadow-sm flex items-center justify-center shrink-0 z-10 ${log.bg}`">
                    <span class="material-symbols-outlined text-[14px] text-white">{{ log.icon }}</span>
                </div>
                <div>
                   <p class="text-[13px] font-black text-[var(--sys-text-primary)] mb-0.5">{{ log.content }}</p>
                   <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] italic">{{ log.time }} • {{ log.user }}</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <!-- Right: Main Table -->
      <div class="xl:col-span-2 bg-[var(--sys-bg-surface)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col h-full uppercase tracking-tight font-bold">
        <div class="overflow-x-auto flex-1 h-full custom-scrollbar">
          <table class="w-full text-left border-separate border-spacing-0 h-full">
            <thead>
              <tr>
                <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Số HĐ</th>
                <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Nhân viên</th>
                <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Thời hạn</th>
                <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Trạng thái</th>
                <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody class="bg-transparent">
              <tr v-for="item in filteredContracts" :key="item.id" 
                  class="group transition-all duration-200 bg-transparent hover:bg-[var(--sys-bg-hover)]">
                <td class="px-6 py-5 border-b border-[var(--sys-border-subtle)] font-black text-[var(--sys-brand-solid)] bg-transparent">{{ item.contract_no }}</td>
                <td class="px-6 py-5 border-b border-[var(--sys-border-subtle)] bg-transparent">
                   <p class="font-black text-[var(--sys-text-primary)] mb-0.5 bg-transparent">{{ item.employee_name }}</p>
                   <p class="text-[10px] text-[var(--sys-text-secondary)] uppercase font-black tracking-widest bg-transparent">{{ item.contract_type }}</p>
                </td>
                <td class="px-6 py-5 border-b border-[var(--sys-border-subtle)] bg-transparent">
                    <div class="flex flex-col gap-0.5 bg-transparent">
                        <span class="text-xs text-[var(--sys-text-secondary)] font-bold italic bg-transparent">{{ item.start_date }} → {{ item.end_date || 'N/A' }}</span>
                    </div>
                </td>
                <td class="px-6 py-5 border-b border-[var(--sys-border-subtle)] bg-transparent">
                  <div :class="[
                    'px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 border transition-all whitespace-nowrap',
                    getStatusColor(item.status)
                  ]">
                    <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotColor(item.status)"></span>
                    {{ item.status.replaceAll('_', ' ') }}
                  </div>
                </td>
                <td class="px-6 py-5 border-b border-[var(--sys-border-subtle)] text-right bg-transparent">
                  <div class="flex items-center justify-end gap-2 bg-transparent">
                    <button 
                      @click="editContract(item)" 
                      class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-transparent text-[var(--sys-icon-default)] hover:text-[var(--sys-brand-solid)] hover:bg-[var(--sys-brand-solid)]/10 active:scale-95"
                      title="Chỉnh sửa"
                    >
                      <span class="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button 
                      @click="extendContract(item)" 
                      class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-transparent text-[var(--sys-icon-default)] hover:text-[var(--sys-success-text)] hover:bg-[var(--sys-success-soft)] active:scale-95" 
                      title="Gia hạn HĐ"
                    >
                      <span class="material-symbols-outlined text-lg">restore</span>
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
          <div class="fixed inset-0 w-screen h-screen bg-black/40 z-[9999] overflow-hidden backdrop-blur-sm" @click="closeModal"></div>
          <div class="relative z-[10000] bg-[var(--sys-bg-surface-elevated)] border border-[var(--sys-border-subtle)] w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all text-left">
            <div class="px-8 py-6 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-[var(--sys-bg-surface-elevated)] text-left">
              <div class="text-left">
                <h3 class="text-lg font-black text-[var(--sys-text-primary)] text-left">{{ editMode ? 'Cập nhật hợp đồng' : 'Soạn thảo hợp đồng mới' }}</h3>
                <p class="text-xs text-[var(--sys-text-secondary)] font-bold italic mt-0.5 text-left">Hệ thống sẽ tự động tính ngày hết hiệu lực</p>
              </div>
              <button @click="closeModal" class="w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-[var(--sys-bg-hover)] transition-all text-[var(--sys-text-secondary)]">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <div class="p-8 space-y-5">
               <div>
                  <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic text-left">Nhân viên thụ hưởng *</label>
                  <input v-model="form.employee_name" type="text" placeholder="Tìm kiếm tên nhân viên..." class="w-full px-4 py-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all text-left text-[var(--sys-text-primary)]">
               </div>

               <div class="grid grid-cols-2 gap-4 text-left">
                 <div class="text-left">
                    <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic text-left">Loại hợp đồng *</label>
                    <Dropdown 
                      v-model="form.contract_type"
                      :options="contractTypeOptions"
                      class="w-full"
                    />
                 </div>
                 <div class="text-left">
                    <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic text-left">Số hợp đồng *</label>
                    <input v-model="form.contract_no" type="text" placeholder="HD2023..." class="w-full px-4 py-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all text-left text-sm text-[var(--sys-text-primary)]">
                 </div>
               </div>

               <div class="grid grid-cols-2 gap-4 text-left">
                 <div class="text-left">
                    <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic text-left">Ngày ký *</label>
                    <input v-model="form.sign_date" type="date" class="w-full px-4 py-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all text-left text-[var(--sys-text-primary)]">
                 </div>
                 <div class="text-left">
                    <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic text-left">Ngày hiệu lực *</label>
                    <input v-model="form.start_date" type="date" class="w-full px-4 py-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all text-left text-[var(--sys-text-primary)]">
                 </div>
               </div>

               <div class="p-5 bg-[var(--sys-brand-soft)] rounded-3xl border border-[var(--sys-brand-solid)] border-dashed text-left">
                  <p class="text-[10px] font-black text-[var(--sys-brand-soft-text)] uppercase tracking-widest mb-2 italic text-left">Ngày hết hạn dự kiến</p>
                  <p class="text-xl font-black text-[var(--sys-brand-soft-text)] tracking-wider text-left">
                      {{ calculateEndDate() || 'N/A' }}
                  </p>
               </div>

               <div>
                  <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic text-left">Mức lương thỏa thuận (VNĐ)</label>
                  <input v-model="form.salary" type="number" placeholder="20.000.000" class="w-full px-4 py-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all text-left text-[var(--sys-text-primary)]">
               </div>
            </div>

            <div class="px-8 py-6 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface-elevated)] flex gap-3 text-left">
              <button @click="closeModal" class="flex-1 py-3 text-sm font-black text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] uppercase tracking-widest italic rounded-2xl transition-all">Hủy</button>
              <button @click="handleSave" class="flex-1 py-3 bg-[var(--sys-brand-solid)] text-white rounded-2xl text-sm font-black hover:bg-[var(--sys-brand-hover)] shadow-xl shadow-[var(--sys-brand-solid)]/10 uppercase tracking-widest transition-all">
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
    case 'ĐANG_HIỆU_LỰC': return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
    case 'SẮP_HẾT_HẠN': return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]';
    case 'ĐÃ_THANH_LÝ': return 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]';
    default: return 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border-[var(--sys-border-subtle)]';
  }
};

const getStatusDotColor = (status) => {
  switch (status) {
    case 'ĐANG_HIỆU_LỰC': return 'bg-[var(--sys-success-solid)]';
    case 'SẮP_HẾT_HẠN': return 'bg-[var(--sys-warning-solid)]';
    case 'ĐÃ_THANH_LÝ': return 'bg-[var(--sys-danger-solid)]';
    default: return 'bg-[var(--sys-icon-default)]';
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

