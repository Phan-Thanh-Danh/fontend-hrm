<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
      <div class="text-left">
        <h1 class="text-2xl font-black text-slate-900 tracking-tight text-left">Phê duyệt Trung tâm</h1>
        <p class="text-slate-500 text-sm font-medium italic text-left">Xử lý các yêu cầu nghỉ phép, tăng ca và công tác từ nhân sự.</p>
      </div>
      <div class="flex flex-wrap items-center gap-3">
         <div class="relative group hidden sm:block">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Tìm tên, mã NV..." 
              class="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all w-64"
            >
         </div>
         <Dropdown 
            v-model="filterType"
            :options="typeOptions"
            placeholder="Tất cả loại đơn"
         />
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex items-center gap-1 bg-slate-100 p-1.5 rounded-[2.5rem] w-fit border border-slate-200 shadow-inner">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="`px-8 py-3 rounded-[2rem] text-xs font-black transition-all duration-300 transform ${activeTab === tab.id ? 'bg-white text-indigo-600 shadow-xl scale-100' : 'text-slate-500 hover:text-slate-700 scale-95 opacity-70'}`"
      >
        {{ tab.label }}
        <span v-if="getTabCount(tab.id)" class="ml-2 px-2 py-0.5 bg-red-500 text-white rounded-full text-[10px] shadow-sm animate-pulse">
          {{ getTabCount(tab.id) }}
        </span>
      </button>
    </div>

    <!-- Requests List -->
    <div class="grid grid-cols-1 gap-5">
      <transition-group name="list">
        <div v-for="request in filteredRequests" :key="request.id" class="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start relative overflow-hidden group">
          <div :class="`absolute left-0 top-0 bottom-0 w-2 ${getLeftBorder(request.icon)}`"></div>
          
          <div :class="`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-inner ${request.typeColor}`">
            <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">{{ request.icon }}</span>
          </div>

          <div class="flex-1 space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-3 mb-1">
                  <span class="text-lg font-black text-slate-900 leading-none">{{ request.employeeName }}</span>
                  <span class="text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-slate-50 border border-slate-100 px-3 py-1 rounded-lg">{{ request.employeeId }}</span>
                </div>
                <h4 class="text-sm font-black text-indigo-600 uppercase tracking-wide">{{ request.title }}</h4>
              </div>
              
              <div class="flex items-center gap-2 text-left">
                <template v-if="request.status === 'pending'">
                  <button @click="handleReject(request)" class="px-6 py-2.5 min-h-[44px] text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-lg transition-all border uppercase tracking-widest">Từ chối</button>
                  <button @click="handleApprove(request)" class="px-8 py-2.5 min-h-[44px] bg-blue-600 text-white rounded-lg text-sm font-black hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all uppercase tracking-widest">Duyệt nhanh</button>
                </template>
                <div v-else :class="`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border d-flex align-items-center gap-2 ${request.status === 'approved' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`">
                  <span :class="`w-1.5 h-1.5 rounded-full ${request.status === 'approved' ? 'bg-green-500' : 'bg-red-500'}`"></span>
                  {{ request.status === 'approved' ? 'Đã duyệt' : 'Đã từ chối' }}
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-4 border-b border-slate-50">
               <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-slate-400 text-lg">event</span>
                  <div>
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Thời gian</p>
                    <p class="text-xs font-bold text-slate-700">{{ request.dateRange }}</p>
                  </div>
               </div>
               <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-slate-400 text-lg">timer</span>
                  <div>
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Số lượng</p>
                    <p class="text-xs font-bold text-indigo-600">{{ request.duration }}</p>
                  </div>
               </div>
               <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-slate-400 text-lg">history</span>
                  <div>
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Ngày gửi</p>
                    <p class="text-xs font-bold text-slate-700">{{ request.createdAt }}</p>
                  </div>
               </div>
               <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-slate-400 text-lg">chat_bubble</span>
                  <div>
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Trạng thái gửi</p>
                    <p class="text-xs font-bold text-slate-700">Đã gửi hệ thống</p>
                  </div>
               </div>
            </div>

            <div v-if="request.reason" class="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 border-dashed relative">
               <span class="material-symbols-outlined absolute -top-3 left-4 text-slate-200 text-3xl rotate-12">format_quote</span>
               <p class="text-xs text-slate-600 font-bold italic leading-relaxed">{{ request.reason }}</p>
            </div>
          </div>
        </div>
      </transition-group>
      
      <div v-if="filteredRequests.length === 0" class="flex flex-col items-center justify-center py-20 bg-slate-50/30 rounded-[3rem] border border-slate-50 border-dashed">
         <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
            <span class="material-symbols-outlined text-slate-300 text-3xl">inbox</span>
         </div>
         <p class="text-xs font-black text-slate-400 uppercase tracking-widest italic">Không có yêu cầu nào trong danh sách này</p>
      </div>
    </div>

    <!-- Modal Từ chối -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
      >
        <div v-if="showRejectModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div class="fixed inset-0 w-screen h-screen bg-slate-900/50 z-[9999] overflow-hidden backdrop-blur-sm" @click="closeRejectModal"></div>
          <div class="relative z-[10000] bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all text-left">
            <div class="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30 text-left">
              <div class="text-left">
                <h3 class="text-xl font-black text-slate-900 text-left">Từ chối yêu cầu</h3>
                <p class="text-xs text-slate-500 font-bold italic mt-0.5 text-left italic">Phản hồi lý do cho nhân viên</p>
              </div>
              <button @click="closeRejectModal" class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-md transition-all text-slate-400">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <div class="p-8 space-y-4">
               <div>
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic text-left">Lý do từ chối *</label>
                  <textarea 
                    v-model="rejectReason" 
                    rows="4" 
                    placeholder="VD: Hiện tại dự án đang bận, bạn vui lòng dời sang tuần sau..." 
                    class="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-red-600/5 focus:border-red-600 transition-all text-left resize-none"
                  ></textarea>
               </div>
            </div>

            <div class="px-8 py-6 border-t border-slate-100 bg-slate-50/30 flex gap-3 text-left">
              <button @click="closeRejectModal" class="flex-1 py-3 text-sm font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest italic rounded-2xl transition-all">Hủy</button>
              <button @click="confirmReject" class="flex-1 py-3 bg-red-600 text-white rounded-2xl text-sm font-black hover:bg-red-700 shadow-xl shadow-red-100 uppercase tracking-widest transition-all">
                Xác nhận từ chối
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

const { showAlert } = useConfirm();

const activeTab = ref('pending');
const searchQuery = ref('');
const filterType = ref('ALL');
const showRejectModal = ref(false);
const rejectReason = ref('');
const selectedRequest = ref(null);

const typeOptions = [
  { label: 'Tất cả loại đơn', value: 'ALL' },
  { label: 'Nghỉ phép', value: 'event_busy' },
  { label: 'Tăng ca (OT)', value: 'schedule' },
  { label: 'Công tác', value: 'flight' }
];

const tabs = ref([
  { id: 'pending', label: 'Chờ phê duyệt' },
  { id: 'approved', label: 'Lịch sử đã duyệt' },
  { id: 'rejected', label: 'Đã từ chối' },
]);

const requests = ref([
  { 
    id: 1, 
    employeeName: 'Nguyễn Văn An', 
    employeeId: 'EMP-1001', 
    title: 'Đơn xin nghỉ phép năm', 
    icon: 'event_busy', 
    typeColor: 'bg-orange-50 text-orange-600',
    dateRange: '20/11 - 22/11/2023',
    duration: '3 ngày',
    createdAt: 'Hôm nay, 08:30',
    reason: 'Giải quyết công việc gia đình ở quê. Tôi đã bàn giao công việc cho anh Cường.',
    status: 'pending'
  },
  { 
    id: 2, 
    employeeName: 'Trần Thị Thu', 
    employeeId: 'EMP-1042', 
    title: 'Đăng ký làm thêm giờ (OT)', 
    icon: 'schedule', 
    typeColor: 'bg-blue-50 text-blue-600',
    dateRange: '18/11/2023',
    duration: '4 giờ (18:00 - 22:00)',
    createdAt: 'Hôm qua, 17:15',
    reason: 'Hoàn thiện deadline dự án ERP cho khách hàng theo yêu cầu của PM.',
    status: 'pending'
  },
  { 
    id: 3, 
    employeeName: 'Lê Quản Trị', 
    employeeId: 'EMP-1005', 
    title: 'Yêu cầu đi công tác', 
    icon: 'flight', 
    typeColor: 'bg-indigo-50 text-indigo-600',
    dateRange: '25/11 - 28/11/2023',
    duration: '4 ngày (Hà Nội)',
    createdAt: '15/11/2023',
    reason: 'Tham dự hội thảo công nghệ và gặp gỡ đối tác chiến lược tại văn phòng Hà Nội.',
    status: 'pending'
  }
]);

const filteredRequests = computed(() => {
  let list = requests.value.filter(r => r.status === activeTab.value);
  
  if (filterType.value !== 'ALL') {
    list = list.filter(r => r.icon === filterType.value);
  }
  
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(r => 
      r.employeeName.toLowerCase().includes(q) || 
      r.employeeId.toLowerCase().includes(q)
    );
  }
  
  return list;
});

const getTabCount = (id) => {
    return requests.value.filter(r => r.status === id).length;
};

const getLeftBorder = (icon) => {
    if (icon === 'event_busy') return 'bg-orange-500';
    if (icon === 'schedule') return 'bg-blue-500';
    return 'bg-indigo-500';
};

const handleApprove = (request) => {
    request.status = 'approved';
};

const handleReject = (request) => {
    selectedRequest.value = request;
    showRejectModal.value = true;
};

const confirmReject = async () => {
    if (!rejectReason.value) {
        await showAlert('Thiếu lý do', 'Vui lòng nhập lý do từ chối!');
        return;
    }
    if (selectedRequest.value) {
        selectedRequest.value.status = 'rejected';
        selectedRequest.value.reason = `[LÝ DO TỪ CHỐI]: ${rejectReason.value} | [NỘI DUNG GỐC]: ${selectedRequest.value.reason}`;
        closeRejectModal();
    }
};

const closeRejectModal = () => {
    showRejectModal.value = false;
    rejectReason.value = '';
    selectedRequest.value = null;
};
</script>

<style scoped>
/* List Transitions */
.list-enter-active, .list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.9);
}

.material-symbols-outlined {
    font-variation-settings: 'opsz' 48, 'wght' 600, 'FILL' 1, 'GRAD' 0;
}
</style>
