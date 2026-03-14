<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-slate-900 tracking-tight">Phê duyệt Trung tâm</h1>
        <p class="text-slate-500 text-sm font-medium italic">Xử lý các yêu cầu nghỉ phép, tăng ca và công tác từ nhân sự.</p>
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
         <select v-model="filterType" class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-500 outline-none hover:border-blue-300 transition-all">
            <option value="ALL">Tất cả loại đơn</option>
            <option value="event_busy">Nghỉ phép</option>
            <option value="schedule">Tăng ca (OT)</option>
            <option value="flight">Công tác</option>
         </select>
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
              
              <div class="flex items-center gap-2">
                <template v-if="request.status === 'pending'">
                  <button @click="handleReject(request)" class="px-6 py-3 bg-red-50 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm">Từ chối</button>
                  <button @click="handleApprove(request)" class="px-6 py-3 bg-green-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-700 transition-all shadow-xl shadow-green-100">Duyệt nhanh</button>
                </template>
                <div v-else :class="`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${request.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`">
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const activeTab = ref('pending');
const searchQuery = ref('');
const filterType = ref('ALL');

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
    if (confirm(`Phê duyệt đơn của ${request.employeeName}? Nhân viên sẽ nhận được thông báo ngay.`)) {
        request.status = 'approved';
    }
};

const handleReject = (request) => {
    const reason = prompt(`Nhập lý do từ chối cho ${request.employeeName}:`);
    if (reason !== null) {
        request.status = 'rejected';
        request.reason = `[TỪ CHỐI]: ${reason} | [LÝ DO GỐC]: ${request.reason}`;
    }
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
