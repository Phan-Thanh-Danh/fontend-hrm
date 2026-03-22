<template>
  <div class="leave-wrapper min-h-screen bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] p-4 md:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto space-y-6 bg-transparent">
      
      <!-- Header Area -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left px-1">
        <div class="bg-transparent text-left">
          <h1 class="text-xl font-bold text-[var(--sys-text-primary)] mb-0.5 tracking-tight uppercase">Quản lý Nghỉ phép & Vắng mặt</h1>
          <p class="text-[13px] text-[var(--sys-text-secondary)] font-medium">Theo dõi quỹ phép năm và lịch sử các yêu cầu vắng mặt cá nhân.</p>
        </div>
        <button @click="showModal = true" class="h-11 px-6 bg-[var(--sys-brand-solid)] text-white rounded-md font-bold text-[13px] uppercase tracking-wide hover:brightness-95 transition-all flex items-center justify-center gap-2 shadow-sm shrink-0">
          <span class="material-symbols-rounded text-[20px]">add</span>
          Tạo đơn nghỉ phép
        </button>
      </div>

      <!-- Metric Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <!-- Balance Card -->
        <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] p-6 shadow-sm hover:border-[var(--sys-brand-solid)] transition-all flex flex-col group">
          <div class="flex justify-between items-start mb-6">
            <span class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest opacity-60">Số dư phép năm</span>
            <div class="w-12 h-12 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center border border-[var(--sys-brand-border)] group-hover:scale-105 transition-transform">
              <span class="material-symbols-rounded text-2xl">account_balance_wallet</span>
            </div>
          </div>
          <div class="flex items-baseline gap-2 mt-auto">
            <span class="text-4xl font-bold text-[var(--sys-text-primary)] tracking-tight">12</span>
            <span class="text-[11px] font-bold text-[var(--sys-text-disabled)] uppercase tracking-widest opacity-40">ngày</span>
          </div>
        </div>
        
        <!-- Used Card -->
        <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] p-6 shadow-sm hover:border-[var(--sys-warning-border)] transition-all flex flex-col group">
          <div class="flex justify-between items-start mb-6">
            <span class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest opacity-60">Đã sử dụng</span>
            <div class="w-12 h-12 rounded-md bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] flex items-center justify-center border border-[var(--sys-warning-border)] group-hover:scale-105 transition-transform">
              <span class="material-symbols-rounded text-2xl">event_available</span>
            </div>
          </div>
          <div class="flex items-baseline gap-2 mt-auto">
            <span class="text-4xl font-bold text-[var(--sys-warning-text)] tracking-tight">3</span>
            <span class="text-[11px] font-bold text-[var(--sys-text-disabled)] uppercase tracking-widest opacity-40">ngày</span>
          </div>
        </div>
        
        <!-- Pending Card -->
        <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] p-6 shadow-sm hover:border-[var(--sys-brand-solid)] transition-all flex flex-col group">
          <div class="flex justify-between items-start mb-6">
            <span class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest opacity-60">Đang chờ duyệt</span>
            <div class="w-12 h-12 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center border border-[var(--sys-brand-border)] group-hover:scale-105 transition-transform">
              <span class="material-symbols-rounded text-2xl">pending_actions</span>
            </div>
          </div>
          <div class="flex items-baseline gap-2 mt-auto">
            <span class="text-4xl font-bold text-[var(--sys-brand-solid)] tracking-tight">{{ pendingCount }}</span>
            <span class="text-[11px] font-bold text-[var(--sys-text-disabled)] uppercase tracking-widest opacity-40">ngày</span>
          </div>
        </div>
      </div>

      <!-- History Table -->
      <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col">
        <div class="px-5 py-4 border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 flex justify-between items-center">
          <h2 class="text-[11px] font-bold text-[var(--sys-text-primary)] uppercase tracking-widest m-0 flex items-center gap-2">
             <span class="material-symbols-rounded text-[18px] text-[var(--sys-brand-solid)]">history</span>
             Lịch sử yêu cầu nghỉ phép
          </h2>
          <span class="text-[10px] font-bold text-[var(--sys-text-secondary)] opacity-50 italic">Double-click đơn CHỜ DUYỆT để hủy</span>
        </div>
        
        <div class="overflow-x-auto custom-scrollbar">
          <table class="w-full text-left border-collapse">
            <thead class="bg-[var(--sys-bg-page)]">
              <tr>
                <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest">Loại phép</th>
                <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest">Thời gian nghỉ</th>
                <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest text-center">Tổng ngày</th>
                <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest text-right">Trạng thái</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[var(--sys-border-subtle)]">
              <tr v-for="item in leaveHistory" :key="item.id" 
                @dblclick="handleDeleteRequest(item)"
                class="hover:bg-[var(--sys-bg-hover)] transition-all cursor-pointer group"
              >
                <td class="px-6 py-4 whitespace-nowrap bg-transparent">
                  <span class="text-[13px] font-bold text-[var(--sys-text-primary)] uppercase tracking-tight group-hover:text-[var(--sys-brand-solid)]">{{ item.type }}</span>
                </td>
                <td class="px-6 py-4 text-[13px] font-medium text-[var(--sys-text-secondary)] bg-transparent">
                  {{ item.duration }}
                </td>
                <td class="px-6 py-4 text-center bg-transparent">
                  <span class="text-[13px] font-bold text-[var(--sys-text-primary)]">{{ item.total }}</span>
                </td>
                <td class="px-6 py-4 text-right bg-transparent">
                  <span :class="getStatusBadgeClass(item.statusRaw)" class="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest inline-flex items-center gap-2 border shadow-sm">
                    <span class="w-1.5 h-1.5 rounded-full animate-pulse" :class="getStatusDotClass(item.statusRaw)"></span>
                    {{ item.status }}
                  </span>
                </td>
              </tr>
              <tr v-if="leaveHistory.length === 0">
                 <td colspan="4" class="px-6 py-12 text-center">
                    <p class="text-[13px] font-medium text-[var(--sys-text-disabled)] italic">Chưa có dữ liệu yêu cầu nghỉ phép.</p>
                 </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal: Create Request -->
      <Teleport to="body">
        <Transition name="modal">
          <div v-if="showModal" class="fixed inset-0 z-[1050] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
            <div class="bg-white w-full max-w-xl rounded-lg shadow-2xl border border-[var(--sys-border-subtle)] flex flex-col max-h-[90vh] overflow-hidden transform transition-all">
              <!-- Modal Header -->
              <div class="px-6 py-5 border-b border-[var(--sys-border-subtle)] flex justify-between items-center bg-[var(--sys-bg-page)]/50">
                <h3 class="text-[12px] font-bold text-[var(--sys-text-primary)] uppercase tracking-widest m-0 flex items-center gap-2">
                   <div class="w-8 h-8 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center border border-[var(--sys-brand-border)]">
                      <span class="material-symbols-rounded text-[20px]">post_add</span>
                   </div>
                   Tạo đơn nghỉ phép mới
                </h3>
                <button @click="showModal = false" class="w-9 h-9 flex items-center justify-center rounded-md hover:bg-[var(--sys-danger-soft)] text-[var(--sys-text-secondary)] hover:text-[var(--sys-danger-text)] transition-all border border-transparent hover:border-[var(--sys-danger-border)]">
                  <span class="material-symbols-rounded text-[22px]">close</span>
                </button>
              </div>
              
              <!-- Modal Body -->
              <div class="p-8 space-y-6 overflow-y-auto custom-scrollbar bg-white">
                <div class="space-y-2">
                  <label class="block text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5">Loại hình nghỉ phép <span class="text-[var(--sys-danger-solid)]">*</span></label>
                  <Dropdown v-model="leaveType" :options="leaveTypeOptions" placeholder="-- Chọn loại hình nghỉ --" class="h-11 shadow-sm" />
                </div>

                <div class="grid grid-cols-2 gap-5">
                  <div class="space-y-2">
                    <label class="block text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5">Từ ngày <span class="text-[var(--sys-danger-solid)]">*</span></label>
                    <CalendarCustom v-model="startDate" placeholder="Chọn ngày bắt đầu" />
                  </div>
                  <div class="space-y-2">
                    <label class="block text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5">Đến ngày <span class="text-[var(--sys-danger-solid)]">*</span></label>
                    <CalendarCustom v-model="endDate" placeholder="Chọn ngày kết thúc" />
                  </div>
                </div>

                <div class="bg-[var(--sys-brand-soft)] p-5 rounded-md border border-[var(--sys-brand-border)] flex justify-between items-center shadow-inner">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--sys-brand-solid)] border border-[var(--sys-brand-border)]">
                       <span class="material-symbols-rounded text-[20px]">calendar_month</span>
                    </div>
                    <span class="text-[12px] font-bold text-[var(--sys-brand-solid)] uppercase tracking-tight">Tổng số ngày nghỉ dự kiến:</span>
                  </div>
                  <span class="text-xl font-black text-[var(--sys-brand-solid)]">
                    {{ calculateDays }} ngày
                  </span>
                </div>

                <div class="space-y-2">
                  <label class="block text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5">Lý do nghỉ phép chi tiết <span class="text-[var(--sys-danger-solid)]">*</span></label>
                  <textarea v-model="reason" class="w-full h-28 p-4 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-[13px] font-medium text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm resize-none transition-all placeholder:opacity-50" placeholder="Vui lòng nhập lý do cụ thể để cấp trên dễ dàng phê duyệt..."></textarea>
                </div>

                <div class="space-y-2">
                  <label class="block text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5">Tài liệu đính kèm (Minh chứng)</label>
                  <div class="border-2 border-dashed border-[var(--sys-border-subtle)] rounded-md p-8 flex flex-col items-center justify-center text-center bg-[var(--sys-bg-page)] hover:border-[var(--sys-brand-solid)] hover:bg-[var(--sys-brand-soft)]/20 cursor-pointer transition-all group">
                    <span class="material-symbols-rounded text-5xl text-[var(--sys-text-disabled)] group-hover:text-[var(--sys-brand-solid)] opacity-30 mb-3 transition-colors">cloud_upload</span>
                    <p class="text-[12px] font-extrabold text-[var(--sys-text-primary)] mb-1 uppercase tracking-tight">Nhấp để tải lên hoặc kéo thả tệp tin</p>
                    <p class="text-[10px] font-bold text-[var(--sys-text-disabled)] opacity-60">PDF, JPG, PNG (Tối đa 5MB)</p>
                  </div>
                </div>

                <div class="flex gap-4 pt-6 border-t border-[var(--sys-border-subtle)]">
                  <button @click="submitRequest" class="flex-grow h-12 bg-[var(--sys-brand-solid)] text-white rounded-md font-black text-[13px] uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg">
                    <span class="material-symbols-rounded text-[20px] font-bold">send</span>
                    GỬI YÊU CẦU NGAY
                  </button>
                  <button @click="showModal = false" class="h-12 px-8 bg-white border border-[var(--sys-border-strong)] text-[var(--sys-text-secondary)] rounded-md font-bold text-[12px] uppercase tracking-widest hover:bg-[var(--sys-bg-hover)] shadow-sm transition-all">
                    HỦY BỎ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import CalendarCustom from '@/components/CalendarCustom.vue';
import Dropdown from '@/components/Dropdown.vue';
import { requestsAPI, requestTypesAPI, employeesAPI, departmentsAPI } from '@/data/mockDB.js';

const showModal = ref(false);
const leaveType = ref(null);
const startDate = ref('');
const endDate = ref('');
const reason = ref('');

const requestTypes = ref([]);
const leaveHistory = ref([]);

const leaveTypeOptions = computed(() => {
  return requestTypes.value.map(t => ({
    label: t.request_type_name,
    value: t.request_type_id,
    icon: t.request_type_id === 1 ? 'event_busy' : 'sick'
  }));
});

// Mock Current User (Nhân viên IT)
const CURRENT_EMP_ID = 2; // Quang Huy

// Form states (Defined above)
// const leaveType = ref(null);
// const startDate = ref('');
// const endDate = ref('');
// const reason = ref('');

const calculateDays = computed(() => {
  if (!startDate.value || !endDate.value) return 0;
  const start = new Date(startDate.value);
  const end = new Date(endDate.value);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
});

const pendingCount = computed(() => {
  return leaveHistory.value.filter(h => h.statusRaw === 'CHỜ_DUYỆT').length;
});

const fetchData = () => {
  // Load Request Types
  requestTypes.value = requestTypesAPI.getAll().filter(t => t.category === 'NGHỈ_PHÉP' || t.request_type_id === 1);

  // Load History
  const allReqs = requestsAPI.getAll();
  const myReqs = allReqs.filter(r => r.requester_id === CURRENT_EMP_ID);

  leaveHistory.value = myReqs.map(item => {
    const typeObj = requestTypesAPI.getById(item.request_type_id);
    return {
      id: item.request_id,
      type: typeObj?.request_type_name || 'Nghỉ phép',
      duration: `${item.start_date || 'N/A'} - ${item.end_date || 'N/A'}`,
      total: `${item.days || 0} ngày`,
      statusRaw: item.status,
      status: item.status === 'CHỜ_DUYỆT' ? 'Chờ duyệt' : (item.status === 'ĐÃ_DUYỆT' ? 'Đã duyệt' : 'Từ chối')
    };
  });
};

const submitRequest = () => {
  if (!leaveType.value || !startDate.value || !endDate.value || !reason.value) {
    alert('Vui lòng điền đầy đủ thông tin bắt buộc.');
    return;
  }

  const days = calculateDays.value;
  if (days <= 0) {
    alert('Ngày nghỉ không hợp lệ. Vui lòng kiểm tra lại Từ ngày và Đến ngày.');
    return;
  }

  // WORKFLOW: Tất cả đơn đi qua Manager và Admin trước.
  // Việc chuyển tiếp lên Giám đốc sẽ do hệ thống tự động xử lý khi Manager duyệt đơn > 3 ngày.
  let visibility = ['Admin', 'Manager'];

  const typeObj = requestTypesAPI.getById(leaveType.value);
  const employee = employeesAPI.getById(CURRENT_EMP_ID);

  const newRequest = {
    requester_id: CURRENT_EMP_ID,
    request_type_id: leaveType.value,
    title: `${typeObj?.request_type_name} (${String(days).padStart(2, '0')} ngày)`,
    notes: reason.value,
    start_date: startDate.value,
    end_date: endDate.value,
    days: days,
    status: 'CHỜ_DUYỆT',
    is_urgent: days >= 3,
    request_date: new Date().toISOString().split('T')[0],
    visible_to: visibility,
    department_id: employee?.department_id || 2
  };

  try {
    requestsAPI.add(newRequest);
    showModal.value = false;
    
    // Reset form
    startDate.value = '';
    endDate.value = '';
    reason.value = '';
    
    // Re-load
    fetchData();
    alert('Gửi yêu cầu nghỉ phép thành công! Phép của bạn đang được chuyển đến cấp có thẩm quyền.');
  } catch (error) {
    console.error('Lỗi khi gửi đơn nghỉ phép:', error);
  }
};

const handleDeleteRequest = (item) => {
  if (item.statusRaw !== 'CHỜ_DUYỆT') {
    alert('Không thể xóa đơn đã được duyệt hoặc từ chối!');
    return;
  }
  
  if (confirm(`Bạn có chắc chắn muốn xóa đơn nghỉ phép này?`)) {
    try {
      requestsAPI.delete(item.id);
      fetchData();
    } catch (err) {
      console.error('Lỗi khi xóa đơn:', err);
    }
  }
};

onMounted(() => {
  fetchData();
});

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'ĐÃ_DUYỆT':
      return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
    case 'CHỜ_DUYỆT':
      return 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)]';
    case 'TỪ_CHỐI':
      return 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]';
    default:
      return 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border-[var(--sys-border-subtle)]';
  }
};

const getStatusDotClass = (status) => {
  switch (status) {
    case 'ĐÃ_DUYỆT': return 'bg-[var(--sys-success-solid)]';
    case 'CHỜ_DUYỆT': return 'bg-[var(--sys-brand-solid)]';
    case 'TỪ_CHỐI': return 'bg-[var(--sys-danger-solid)]';
    default: return 'bg-[var(--sys-text-disabled)]';
  }
};
</script>

<style scoped>
.leave-wrapper {
  background-color: var(--sys-bg-page);
}
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

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.25rem;
}
</style>
