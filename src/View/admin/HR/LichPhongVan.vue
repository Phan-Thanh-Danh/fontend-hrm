<template>
  <div class="lich-phong-van-page space-y-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-black text-slate-900 tracking-tight">Lịch Phỏng Vấn</h1>
      <p class="text-slate-500 text-sm font-medium italic">Sắp xếp, theo dõi và quản lý các buổi phỏng vấn ứng viên.</p>
    </div>

    <!-- Toolbar -->
    <div class="flex flex-wrap justify-between items-center mb-6 gap-4">
      <div class="flex gap-4 items-center flex-wrap">
        <!-- View Toggle -->
        <div class="bg-slate-100 rounded-2xl p-1 flex border border-slate-200 shadow-inner">
          <button @click="currentView = 'calendar'" :class="['px-5 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all', currentView === 'calendar' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600']">
            Lịch
          </button>
          <button @click="currentView = 'list'" :class="['px-5 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all', currentView === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600']">
            Danh sách
          </button>
        </div>

        <!-- Filters -->
        <Dropdown 
          v-model="filterStatus"
          :options="statusOptions"
          placeholder="Trạng thái (Tất cả)"
        />
        <Dropdown 
          v-model="filterInterviewer"
          :options="interviewerOptions"
          placeholder="Người phỏng vấn (Tất cả)"
        />
        <div class="bg-white border border-slate-100 shadow-sm rounded-2xl py-2.5 px-4 text-slate-500 text-xs font-bold flex items-center gap-2 cursor-pointer hover:border-blue-200 transition-all">
          <span class="material-symbols-outlined text-lg">date_range</span>
          10/10/2023 - 17/10/2023
        </div>
      </div>

      <button @click="showCreateModal = true" class="px-6 py-3 bg-indigo-600 rounded-2xl font-black text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2 uppercase tracking-widest text-xs">
        <span class="material-symbols-outlined text-[20px]">add</span>
        Tạo lịch mới
      </button>
    </div>

    <!-- Main Content -->
    <div class="space-y-6">
      
      <!-- Calendar Widget -->
      <div v-show="currentView === 'calendar'" class="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div class="p-8">
          <!-- Calendar Header -->
          <div class="flex justify-between items-center mb-8 px-2">
            <div class="flex items-center gap-4">
              <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-all border border-slate-100">
                <span class="material-symbols-outlined">chevron_left</span>
              </button>
              <h3 class="text-xl font-black text-slate-900 tracking-tight">Tháng 10, 2023</h3>
              <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-all border border-slate-100">
                <span class="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
            <div class="bg-slate-50 p-1 rounded-2xl flex border border-slate-100">
              <button class="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Ngày</button>
              <button class="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Tuần</button>
              <button class="px-5 py-2 text-[10px] font-black uppercase tracking-widest bg-white text-slate-900 rounded-xl shadow-sm shadow-slate-200">Tháng</button>
            </div>
          </div>

          <!-- Calendar Grid -->
          <div class="grid grid-cols-7 border-t border-l border-slate-50 overflow-hidden rounded-2xl">
            <!-- Header -->
            <div v-for="day in ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']" :key="day" class="text-center py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50/50 border-r border-b border-slate-50">
              {{ day }}
            </div>

            <!-- Empty cells for start of month -->
            <div v-for="i in 1" :key="'empty'+i" class="min-h-[140px] p-4 bg-slate-50/20 border-r border-b border-slate-50">
              <span class="text-xs font-bold text-slate-300">{{ 30 }}</span>
            </div>

            <!-- Days -->
            <div v-for="day in 31" :key="day" class="min-h-[140px] p-4 border-r border-b border-slate-50 group hover:bg-blue-50/20 transition-all" :class="day === 11 ? 'bg-blue-50/50' : 'bg-white'">
              <div class="flex justify-between items-start mb-3">
                <span :class="['text-xs font-black', day === 11 ? 'text-blue-600' : 'text-slate-400']">{{ day }}</span>
              </div>
              
              <!-- Events -->
              <div v-if="day === 11" class="space-y-2">
                <div class="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-200 text-white">
                  <p class="text-[9px] font-black uppercase tracking-widest mb-0.5">09:00</p>
                  <p class="text-[10px] font-bold leading-tight">Nguyễn Văn A</p>
                </div>
                <div class="p-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-600">
                  <p class="text-[9px] font-black uppercase tracking-widest mb-0.5 opacity-60">14:30</p>
                  <p class="text-[10px] font-bold leading-tight">Lê Văn C</p>
                </div>
              </div>
              <div v-if="day === 12" class="p-2 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-600">
                <p class="text-[9px] font-black uppercase tracking-widest mb-0.5">10:00</p>
                <p class="text-[10px] font-bold leading-tight">Hoàng Thị E</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Interviews List -->
      <div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div class="p-8">
          <h4 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-8 italic">
            <span class="material-symbols-outlined text-blue-600 text-xl font-normal">view_list</span> Danh sách phỏng vấn gần đây
          </h4>

          <div class="overflow-x-auto rounded-2xl border border-slate-50">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50/50">
                  <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 italic">Ứng viên</th>
                  <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 italic">Thời gian</th>
                  <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 italic">Người phỏng vấn</th>
                  <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 italic text-center">Trạng thái</th>
                  <th class="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 italic text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="interview in filteredInterviews" :key="interview.id" class="group hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0 text-sm">
                  <td class="px-6 py-5">
                    <span class="font-black text-slate-900" :class="{'opacity-50 line-through': interview.status === 'Đã hủy'}">{{ interview.candidate }}</span>
                  </td>
                  <td class="px-6 py-5">
                    <div class="flex items-center gap-2 text-slate-500 font-bold">
                      <span class="material-symbols-outlined text-sm">calendar_month</span>
                      {{ interview.date }} - {{ interview.time }}
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <div class="flex items-center gap-2 text-slate-500 font-bold">
                      <div class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px]">
                        {{ getInterviewerName(interview.interviewerId).charAt(0) }}
                      </div>
                      {{ getInterviewerName(interview.interviewerId) }}
                    </div>
                  </td>
                  <td class="px-6 py-5 text-center">
                    <span class="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm transition-all" :class="getStatusBadgeClass(interview.status)">
                      {{ interview.status }}
                    </span>
                  </td>
                  <td class="px-6 py-5">
                    <div class="flex justify-center gap-2">
                      <button 
                        v-if="interview.status !== 'Đã hủy'"
                        @click="openEvaluateModal(interview.candidate)" 
                        class="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        title="Đánh giá phỏng vấn"
                      >
                        <span class="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button 
                        v-if="interview.status !== 'Đã hủy'" 
                        @click="handleCancelInterview(interview)"
                        class="w-9 h-9 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        title="Hủy phỏng vấn"
                      >
                        <span class="material-symbols-outlined text-lg">cancel</span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredInterviews.length === 0">
                  <td colspan="5" class="px-6 py-20 text-center">
                    <div class="flex flex-col items-center gap-2 grayscale opacity-50">
                      <span class="material-symbols-outlined text-5xl">search_off</span>
                      <p class="text-xs font-black text-slate-400 uppercase tracking-widest italic">Không tìm thấy ca phỏng vấn phù hợp</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <transition
      enter-active-class="transition ease-out duration-300 transform"
      enter-from-class="translate-y-10 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showToast" class="fixed bottom-10 right-10 z-[11000] flex items-center gap-3 px-6 py-4 bg-green-500 text-white rounded-[1.5rem] shadow-2xl shadow-green-200">
        <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <span class="material-symbols-outlined text-lg font-black">check</span>
        </div>
        <div>
          <p class="text-xs font-black uppercase tracking-widest leading-none mb-1">Thành công</p>
          <p class="text-[10px] font-bold opacity-90">{{ toastMessage }}</p>
        </div>
      </div>
    </transition>

    <!-- Create Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
      >
        <div v-if="showCreateModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div class="fixed inset-0 w-screen h-screen bg-slate-900/50 z-[9999] overflow-hidden backdrop-blur-sm" @click="showCreateModal = false"></div>
          <div class="relative z-[10000] bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all text-left border border-slate-100">
            <div class="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white">
              <div>
                <h3 class="text-xl font-black text-slate-900 flex items-center gap-2">
                  <span class="material-symbols-outlined text-blue-600">add_box</span>
                  Thiết lập lịch mới
                </h3>
                <p class="text-xs text-slate-400 font-bold italic mt-0.5">Vui lòng điền thông tin buổi phỏng vấn</p>
              </div>
              <button @click="showCreateModal = false" class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-50 transition-all text-slate-400">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <div class="p-8 space-y-6">
              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1 italic">Tên Ứng Viên</label>
                <input type="text" v-model="form.candidate" class="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all" placeholder="Nhập tên ứng viên">
              </div>

              <div class="grid grid-cols-2 gap-6">
                <div>
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1 italic">Ngày</label>
                  <input type="date" v-model="form.date" class="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all">
                </div>
                <div>
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1 italic">Giờ</label>
                  <input type="time" v-model="form.time" class="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all">
                </div>
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1 italic">Người Phỏng Vấn</label>
                <Dropdown 
                  v-model="form.interviewerId"
                  :options="interviewerFormOptions"
                  class="w-full"
                />
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1 italic">Địa điểm / Google Meet Link</label>
                <div class="relative group">
                  <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-600">link</span>
                  <input type="text" v-model="form.link" class="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all" placeholder="meet.google.com/...">
                </div>
              </div>

              <div class="pt-4">
                <button @click="saveSchedule" class="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 shadow-xl shadow-indigo-100 uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined">save</span>
                  Lưu lịch phỏng vấn
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Evaluate Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
      >
        <div v-if="showEvaluateModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div class="fixed inset-0 w-screen h-screen bg-slate-900/50 z-[9999] overflow-hidden backdrop-blur-sm" @click="showEvaluateModal = false"></div>
          <div class="relative z-[10000] bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all text-left">
            <div class="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white">
              <h3 class="text-xl font-black text-slate-900 flex items-center gap-2">
                <span class="material-symbols-outlined text-indigo-900">rate_review</span>
                Đánh giá phỏng vấn
              </h3>
              <button @click="showEvaluateModal = false" class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-50 transition-all text-slate-400">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <div class="p-8 space-y-6">
              <div class="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <span class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Ứng viên</span>
                  <span class="text-sm font-black text-slate-900 uppercase tracking-tight">{{ selectedCandidateToEvaluate }}</span>
                </div>
                <div class="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                  <span class="material-symbols-outlined text-slate-400">person</span>
                </div>
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1 italic">Nhận xét chi tiết</label>
                <textarea class="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all resize-none" rows="4" placeholder="Nhập nhận xét chi tiết..."></textarea>
              </div>

              <div class="flex items-center gap-8 px-2">
                <label class="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" name="passStatus" class="w-5 h-5 text-green-600 focus:ring-green-500 border-slate-300">
                  <span class="text-sm font-black text-green-600 uppercase tracking-widest italic group-hover:translate-x-1 transition-transform">PASS</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" name="passStatus" class="w-5 h-5 text-red-600 focus:ring-red-500 border-slate-300">
                  <span class="text-sm font-black text-red-600 uppercase tracking-widest italic group-hover:translate-x-1 transition-transform">FAIL</span>
                </label>
              </div>

              <div class="pt-4">
                <button @click="saveEvaluation" class="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 shadow-xl shadow-slate-200 uppercase tracking-[0.2em] text-xs transition-all">
                  Lưu kết quả & Chốt hồ sơ
                </button>
              </div>
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

const showCreateModal = ref(false);
const showEvaluateModal = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const selectedCandidateToEvaluate = ref('');

const form = ref({
  candidate: '',
  date: '',
  time: '',
  interviewerId: '',
  link: ''
});

// Filter States
const currentView = ref('calendar'); // 'calendar' or 'list'
const filterStatus = ref('');
const filterInterviewer = ref('');

const statusOptions = [
  { label: 'Trạng thái (Tất cả)', value: '' },
  { label: 'Sắp diễn ra', value: 'Sắp diễn ra' },
  { label: 'Đã xong', value: 'Đã xong' },
  { label: 'Đã hủy', value: 'Đã hủy' }
];

const interviewerOptions = computed(() => [
  { label: 'Người phỏng vấn (Tất cả)', value: '' },
  ...danhSachNhanSu.value.map(ns => ({ label: ns.name, value: ns.id }))
]);

const interviewerFormOptions = computed(() => [
  { label: 'Chọn nhân sự...', value: '' },
  ...danhSachNhanSu.value.map(ns => ({ label: `${ns.name} - ${ns.role}`, value: ns.id }))
]);

// Dynamic HR Data
const danhSachNhanSu = ref([
  { id: '1', name: 'Hà Duy Kiên', role: 'Tech Lead' },
  { id: '2', name: 'Phạm Minh Đức', role: 'HR Manager' },
  { id: '3', name: 'Lê Tuyết Mai', role: 'Senior PM' },
  { id: '4', name: 'Trần Văn Hoàng', role: 'HR Specialist' },
  { id: '5', name: 'Nguyễn Thị Hương', role: 'Engineering Manager' }
]);

// Helper to look up name by ID
const getInterviewerName = (id) => {
  const hr = danhSachNhanSu.value.find(p => p.id === id);
  return hr ? hr.name : 'Chưa phân công';
};

// Mock Interview Data
const interviewList = ref([
  { id: 1, candidate: 'Nguyễn Văn A', date: '15/10/2023', time: '09:00', interviewerId: '1', status: 'Sắp diễn ra', link: 'meet.google.co/abc' },
  { id: 2, candidate: 'Lê Văn C', date: '14/10/2023', time: '14:30', interviewerId: '3', status: 'Đã xong', link: 'Phòng họp 1' },
  { id: 3, candidate: 'Hoàng Thị E', date: '13/10/2023', time: '10:00', interviewerId: '2', status: 'Đã hủy', link: 'meet.google.co/xyz' },
  { id: 4, candidate: 'Đinh Tuấn Vũ', date: '16/10/2023', time: '13:00', interviewerId: '1', status: 'Sắp diễn ra', link: 'meet.google.co/iop' },
  { id: 5, candidate: 'Bùi Anh Đào', date: '12/10/2023', time: '09:30', interviewerId: '5', status: 'Đã xong', link: 'Phòng họp 2' }
]);

const filteredInterviews = computed(() => {
  return interviewList.value.filter(item => {
    const matchStatus = filterStatus.value ? item.status === filterStatus.value : true;
    const matchInterviewer = filterInterviewer.value ? item.interviewerId === filterInterviewer.value : true;
    return matchStatus && matchInterviewer;
  });
});

const getStatusBadgeClass = (status) => {
  switch(status) {
    case 'Sắp diễn ra': return 'bg-blue-50 text-blue-600 border-blue-100';
    case 'Đã xong': return 'bg-green-50 text-green-600 border-green-100';
    case 'Đã hủy': return 'bg-slate-50 text-slate-400 border-slate-100';
    default: return 'bg-slate-50 text-slate-600 border-slate-100';
  }
};

const saveSchedule = async () => {
  if (!form.value.candidate || !form.value.date || !form.value.time) {
    await showAlert('Thiếu thông tin', 'Vui lòng nhập đầy đủ thông tin ứng viên và thời gian phỏng vấn!');
    return;
  }
  showCreateModal.value = false;
  triggerToast('Lịch phỏng vấn đã được tạo thành công!');
  clearForm();
};

const clearForm = () => {
  form.value = { candidate: '', date: '', time: '', interviewerId: '', link: '' };
};

const triggerToast = (msg) => {
  toastMessage.value = msg;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const openEvaluateModal = (candidateName) => {
  selectedCandidateToEvaluate.value = candidateName;
  showEvaluateModal.value = true;
};

const saveEvaluation = () => {
  showEvaluateModal.value = false;
  triggerToast('Dữ liệu đánh giá đã được lưu vào hệ thống!');
};

const handleCancelInterview = async (interview) => {
  const confirmed = await showConfirm(
    'Hủy lịch phỏng vấn',
    `Bạn có chắc chắn muốn hủy buổi phỏng vấn với ứng viên ${interview.candidate} không?`
  );
  if (confirmed) {
    interview.status = 'Đã hủy';
    triggerToast('Lịch phỏng vấn đã được hủy thành công.');
  }
};
</script>

<style scoped>
/* Any specific local styles */
</style>
