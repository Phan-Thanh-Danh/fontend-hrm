<template>
  <div class="space-y-6 pb-8">
    <!-- Header Area -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left">
      <div class="bg-transparent text-left">
        <h1 class="text-xl font-semibold text-[var(--sys-text-primary)] mb-1">Quản lý Hợp đồng Lao động</h1>
        <p class="text-sm text-[var(--sys-text-secondary)]">Quản lý hồ sơ pháp lý, điều khoản lao động và theo dõi thời hạn hợp đồng.</p>
      </div>
      <div class="flex flex-col md:flex-row items-center gap-3 flex-1 w-full max-w-3xl bg-transparent">
        <!-- Search Bar -->
        <div class="relative flex-1 w-full group">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-[var(--sys-brand-solid)]">search</span>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Tìm kiếm số hợp đồng, nhân viên..." 
            class="w-full h-10 pl-10 pr-4 rounded-md bg-[var(--sys-bg-surface)] border border-[var(--sys-border-strong)] text-sm text-[var(--sys-text-primary)] focus:outline-none focus:border-[var(--sys-brand-solid)] focus:ring-1 focus:ring-[var(--sys-brand-solid)] transition-all placeholder:text-[var(--sys-text-disabled)]"
          >
        </div>
        
        <div class="flex items-center gap-3 w-full md:w-auto bg-transparent shrink-0">
          <Dropdown v-model="filterStatus" :options="statusOptions" class="min-w-[160px] h-10" />
          <button @click="openAddModal" class="h-10 px-4 bg-[var(--sys-brand-solid)] rounded-md font-semibold text-white hover:brightness-90 active:opacity-90 transition-all flex items-center gap-2 text-sm whitespace-nowrap shadow-sm">
            <span class="material-symbols-outlined text-[20px]">contract_edit</span>
            Khởi tạo hợp đồng
          </button>
        </div>
      </div>
    </div>

    <!-- Alert Box -->
    <div v-if="expiringCount > 0" class="bg-[var(--sys-warning-soft)] border border-[var(--sys-warning-border)] rounded-lg p-4 flex items-center gap-4 shadow-sm">
      <div class="w-10 h-10 bg-[var(--sys-warning-solid)] text-white rounded-md flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-[24px]">priority_high</span>
      </div>
      <div class="flex-1 text-left bg-transparent">
        <p class="text-[14px] font-semibold text-[var(--sys-warning-text)] m-0">Thông báo đáo hạn hợp đồng</p>
        <p class="text-[13px] text-[var(--sys-warning-text)] m-0 opacity-80">Có {{ expiringCount }} hợp đồng chuẩn bị đáo hạn trong vòng 30 ngày tới. Vui lòng kiểm tra và thực hiện gia hạn.</p>
      </div>
      <button class="h-9 px-4 bg-[var(--sys-warning-solid)] text-white rounded-md text-[13px] font-semibold hover:brightness-90 transition-all">Xử lý ngay</button>
    </div>

    <!-- Content Layout -->
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
      <!-- Left Sidebar: Stats & Timeline -->
      <div class="xl:col-span-3 space-y-6">
        <!-- Stats Card -->
        <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden divide-y divide-[var(--sys-border-subtle)]">
          <div class="px-4 py-3 bg-[var(--sys-bg-page)]">
            <h3 class="text-[12px] font-semibold text-[var(--sys-text-secondary)] uppercase tracking-wider">Thống kê pháp lý</h3>
          </div>
          <div class="p-4 space-y-3">
            <div v-for="stat in contractStats" :key="stat.label"
              class="flex items-center justify-between p-3 bg-[var(--sys-bg-page)] rounded-md border border-[var(--sys-border-subtle)]">
              <span class="text-[12px] font-medium text-[var(--sys-text-secondary)]">{{ stat.label }}</span>
              <span class="text-base font-bold text-[var(--sys-text-primary)]">{{ stat.value }}</span>
            </div>
          </div>
        </div>

        <!-- History Timeline -->
        <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col">
          <div class="px-4 py-3 bg-[var(--sys-bg-page)]">
            <h3 class="text-[12px] font-semibold text-[var(--sys-text-secondary)] uppercase tracking-wider">Nhật ký vận hành</h3>
          </div>
          <div class="p-4 space-y-6 relative ml-2 border-l border-[var(--sys-border-subtle)] border-dashed">
            <div v-for="log in historyLogs" :key="log.id" class="relative group/log pl-6">
              <div :class="`absolute -left-[14px] top-0.5 w-7 h-7 rounded-md border-2 border-white shadow-sm flex items-center justify-center z-10 ${log.bg}`">
                <span class="material-symbols-outlined text-[14px] text-white">{{ log.icon }}</span>
              </div>
              <div class="bg-transparent text-left">
                <p class="text-[13px] font-semibold text-[var(--sys-text-primary)] mb-1">{{ log.content }}</p>
                <p class="text-[11px] text-[var(--sys-text-secondary)]">{{ log.time }} • {{ log.user }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Data Table -->
      <div class="xl:col-span-9 bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col">
        <div class="overflow-x-auto custom-scrollbar flex-1">
          <table class="w-full text-left border-collapse">
            <thead class="bg-[var(--sys-bg-page)]">
              <tr>
                <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider">Số hiệu</th>
                <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider">Nhân sự thụ hưởng</th>
                <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider">Thời hạn hiệu lực</th>
                <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider text-center">Trạng thái</th>
                <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider text-right">Quản trị</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[var(--sys-border-subtle)]">
              <tr v-for="item in filteredContracts" :key="item.id" 
                class="group hover:bg-[var(--sys-bg-hover)] transition-colors cursor-default">
                <td class="px-4 py-3 whitespace-nowrap bg-transparent">
                  <span class="text-[13px] font-semibold text-[var(--sys-brand-solid)] tracking-wide">#{{ item.contract_no }}</span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap bg-transparent">
                  <div class="flex flex-col bg-transparent">
                    <span class="text-[13px] font-semibold text-[var(--sys-text-primary)] transition-colors line-clamp-1 max-w-[200px]">{{ item.employee_name }}</span>
                    <span class="text-[12px] text-[var(--sys-text-secondary)]">{{ item.contract_type.split('_').join(' ') }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap bg-transparent">
                  <div class="flex items-center gap-2 text-[13px] font-medium text-[var(--sys-text-primary)]">
                    <span>{{ item.start_date }}</span>
                    <span class="material-symbols-outlined text-[16px] text-[var(--sys-text-disabled)] shadow-none">arrow_forward</span>
                    <span>{{ item.end_date || 'Vô thời hạn' }}</span>
                  </div>
                </td>
                <td class="px-4 py-3 text-center whitespace-nowrap bg-transparent">
                  <span :class="[
                    'px-2 py-0.5 rounded-md text-[11px] font-semibold inline-flex items-center gap-1.5 border transition-all uppercase tracking-wide',
                    getStatusBadgeClass(item.status)
                  ]">
                    <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="getStatusDotClass(item.status)"></span>
                    {{ item.status.split('_').join(' ') }}
                  </span>
                </td>
                <td class="px-4 py-3 text-right whitespace-nowrap bg-transparent">
                  <div class="flex items-center justify-end gap-1">
                    <button @click="editContract(item)" class="w-8 h-8 flex items-center justify-center rounded-md text-[var(--sys-text-secondary)] hover:bg-[var(--sys-brand-soft)] hover:text-[var(--sys-brand-solid)] transition-all" title="Chỉnh sửa">
                      <span class="material-symbols-outlined text-[18px]">edit_square</span>
                    </button>
                    <button @click="extendContract(item)" class="w-8 h-8 flex items-center justify-center rounded-md text-[var(--sys-text-secondary)] hover:bg-[var(--sys-brand-soft)] hover:text-[var(--sys-brand-solid)] transition-all" title="Gia hạn">
                      <span class="material-symbols-outlined text-[18px]">history_edu</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="px-4 py-3 bg-[var(--sys-bg-page)] border-t border-[var(--sys-border-subtle)] flex justify-end">
          <button class="text-[12px] font-semibold text-[var(--sys-brand-solid)] hover:underline flex items-center gap-1">
            Xem tất cả hợp đồng
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal System -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div class="fixed inset-0 w-screen h-screen bg-black/50 z-[9999]" @click="closeModal"></div>
          <div class="relative z-[10000] bg-[var(--sys-bg-surface-elevated)] border border-[var(--sys-border-subtle)] w-full max-w-2xl max-h-[90vh] rounded-lg shadow-xl overflow-hidden flex flex-col text-left">
            <!-- Modal Header -->
            <div class="px-6 py-4 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-[var(--sys-bg-surface)]">
              <div class="bg-transparent text-left flex flex-col">
                <h3 class="text-lg font-semibold text-[var(--sys-text-primary)] m-0 uppercase tracking-tight">{{ editMode ? 'Cập nhật hợp đồng lao động' : 'Tạo mới hợp đồng' }}</h3>
                <p class="text-sm text-[var(--sys-text-secondary)] mt-1">Đảm bảo các thông số tuân thủ Luật Lao động và Quy chế công ty.</p>
              </div>
              <button @click="closeModal" class="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[var(--sys-bg-hover)] transition-all text-[var(--sys-text-secondary)]">
                <span class="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <!-- Modal Body -->
            <div class="flex-1 overflow-y-auto p-6 custom-scrollbar bg-transparent">
              <div class="space-y-6 bg-transparent border-none">
                <div class="space-y-1.5 bg-transparent border-none">
                  <label class="text-[13px] font-medium text-[var(--sys-text-primary)] block">Nhân viên thụ hưởng *</label>
                  <input v-model="form.employee_name" type="text" placeholder="Tìm tên hoặc mã nhân viên..." class="w-full h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-sm text-[var(--sys-text-primary)] focus:border-[var(--sys-brand-solid)] outline-none transition-all">
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-transparent border-none">
                  <div class="space-y-1.5 bg-transparent border-none">
                    <label class="text-[13px] font-medium text-[var(--sys-text-primary)] block">Loại hợp đồng *</label>
                    <Dropdown v-model="form.contract_type" :options="contractTypeOptions" class="w-full h-10" />
                  </div>
                  <div class="space-y-1.5 bg-transparent border-none">
                    <label class="text-[13px] font-medium text-[var(--sys-text-primary)] block">Số hiệu hợp đồng *</label>
                    <input v-model="form.contract_no" type="text" placeholder="VD: HD-2024-001" class="w-full h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-sm text-[var(--sys-text-primary)] focus:border-[var(--sys-brand-solid)] outline-none transition-all">
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-transparent border-none">
                  <div class="space-y-1.5 bg-transparent border-none">
                    <label class="text-[13px] font-medium text-[var(--sys-text-primary)] block">Ngày ký *</label>
                    <input v-model="form.sign_date" type="date" class="w-full h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-sm text-[var(--sys-text-primary)] focus:border-[var(--sys-brand-solid)] outline-none transition-all">
                  </div>
                  <div class="space-y-1.5 bg-transparent border-none">
                    <label class="text-[13px] font-medium text-[var(--sys-text-primary)] block">Ngày hiệu lực *</label>
                    <input v-model="form.start_date" type="date" class="w-full h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-sm text-[var(--sys-text-primary)] focus:border-[var(--sys-brand-solid)] outline-none transition-all">
                  </div>
                </div>

                <div class="p-4 bg-[var(--sys-bg-page)] rounded-md border border-[var(--sys-border-subtle)] flex items-center justify-between">
                  <p class="text-[13px] font-medium text-[var(--sys-text-primary)] m-0">Ghi nhận ngày đáo hạn dự kiến:</p>
                  <p class="text-base font-bold text-[var(--sys-brand-solid)] m-0">{{ calculateEndDate() || 'Vô thời hạn' }}</p>
                </div>

                <div class="space-y-1.5 bg-transparent border-none">
                  <label class="text-[13px] font-medium text-[var(--sys-text-primary)] block">Thỏa thuận lương cơ bản (VNĐ)</label>
                  <input v-model="form.salary" type="number" placeholder="Nhập mức lương..." class="w-full h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-sm text-[var(--sys-text-primary)] focus:border-[var(--sys-brand-solid)] outline-none transition-all text-right">
                </div>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="px-6 py-4 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface)] flex justify-end gap-3">
              <button @click="closeModal" class="px-4 py-2 text-sm font-medium text-[var(--sys-text-secondary)] hover:bg-[var(--sys-bg-hover)] rounded-md transition-all uppercase tracking-wide">Hủy bỏ</button>
              <button @click="handleSave" class="px-6 py-2 bg-[var(--sys-brand-solid)] text-white rounded-md font-semibold text-sm hover:brightness-90 transition-all uppercase tracking-wide">
                {{ editMode ? 'Cập nhật hợp đồng' : 'Xác nhận khởi tạo' }}
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
 * TRANG QUẢN TRỊ HỢP ĐỒNG - PHIÊN BẢN ENTERPRISE SaaS
 * Tuân thủ 7 Golden Rules:
 * - Font Inter 14px (text-sm), Tỉ lệ Table cao (text-13px)
 * - Bo góc chuẩn B2B: 6px (MD) cho Input/Button, 8px (LG) cho Card/Modal/Table
 * - Hệ màu Blue/White đồng nhất cho Action Icons
 */
import { ref, computed } from 'vue';
import Dropdown from '@/components/Dropdown.vue';
import { useConfirm } from '@/composables/useConfirm';

const { showAlert, showConfirm } = useConfirm();

const showModal = ref(false);
const editMode = ref(false);
const searchQuery = ref('');
const filterStatus = ref('ALL');

const statusOptions = [
  { label: 'Mọi trạng thái', value: 'ALL' },
  { label: 'Đang hiệu lực', value: 'ĐANG_HIỆU_LỰC' },
  { label: 'Sắp hết hạn', value: 'SẮP_HẾT_HẠN' },
  { label: 'Đã thanh lý', value: 'ĐÃ_THANH_LÝ' }
];

const contractTypeOptions = [
  { label: 'Thử việc (02 tháng)', value: 'THỬ_VIỆC' },
  { label: 'Xác định thời hạn (01 năm)', value: 'XÁC_ĐỊNH_THỜI_HẠN_1_NĂM' },
  { label: 'Xác định thời hạn (03 năm)', value: 'XÁC_ĐỊNH_THỜI_HẠN_3_NĂM' },
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
  { label: 'Hợp đồng hiệu lực', value: '185' },
  { label: 'Đang thử việc', value: '24' },
  { label: 'Hợp đồng vô thời hạn', value: '120' },
  { label: 'Vừa thanh lý', value: '15' }
];

const historyLogs = [
  { id: 1, content: 'Ký mới HĐ Thử việc - NV An', user: 'Admin HR', time: '10:00 AM, 10/10/2023', icon: 'person_add', bg: 'bg-[var(--sys-brand-solid)]' },
  { id: 2, content: 'Phê chuẩn phụ lục lương - NV Thu', user: 'Lê Quản Trị', time: '02:30 PM, 15/09/2023', icon: 'payments', bg: 'bg-[var(--sys-warning-solid)]' },
  { id: 3, content: 'Tất toán thanh lý hợp đồng', user: 'Lê Quản Trị', time: '09:00 AM, 01/09/2023', icon: 'gavel', bg: 'bg-[var(--sys-danger-solid)]' }
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

const closeModal = () => { showModal.value = false; };

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'ĐANG_HIỆU_LỰC': return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
    case 'SẮP_HẾT_HẠN': return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]';
    case 'ĐÃ_THANH_LÝ': return 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]';
    default: return 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border-[var(--sys-border-subtle)]';
  }
};

const getStatusDotClass = (status) => {
  switch (status) {
    case 'ĐANG_HIỆU_LỰC': return 'bg-[var(--sys-success-solid)]';
    case 'SẮP_HẾT_HẠN': return 'bg-[var(--sys-warning-solid)]';
    case 'ĐÃ_THANH_LÝ': return 'bg-[var(--sys-danger-solid)]';
    default: return 'bg-[var(--sys-icon-default)] opacity-40';
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
    await showAlert('Thiếu thông tin', 'Vui lòng xác định nhân viên và số hiệu hợp đồng!');
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
  const ok = await showConfirm('Xác nhận gia hạn', `Khởi tạo quy trình gia hạn cho hợp đồng ${item.contract_no}?`);
  if (ok) {
    openAddModal();
    form.value.employee_name = item.employee_name;
    form.value.contract_type = 'XÁC_ĐỊNH_THỜI_HẠN_1_NĂM';
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
