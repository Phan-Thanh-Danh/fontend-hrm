<template>
  <div class="lich-phong-van-page space-y-6">
    <!-- Header -->
    <div class="mb-8 text-left">
      <h1 class="text-2xl font-black text-[var(--sys-text-primary)] tracking-tight">Quản lý Lịch Phỏng Vấn</h1>
      <p class="text-[var(--sys-text-secondary)] text-sm font-medium italic">Sắp xếp nhân sự, theo dõi ứng viên và điều phối quy trình tuyển dụng thông minh.</p>
    </div>

    <!-- Toolbar (Standardized h-11) -->
    <div class="flex flex-col md:flex-row items-center mb-6 gap-3">
      <div class="flex-1 w-full bg-transparent">
        <h3 class="hidden lg:block text-xs font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] italic opacity-40">Hệ thống điều động nhân sự</h3>
      </div>
      
      <div class="flex items-center gap-2 w-full md:w-auto shrink-0 flex-wrap md:flex-nowrap">
        <!-- View Toggle (Match h-11) -->
        <div class="bg-[var(--sys-bg-hover)] rounded-xl p-0.5 flex border border-[var(--sys-border-subtle)] h-11 shrink-0">
          <button @click="currentView = 'calendar'" :class="['px-5 h-full text-[10px] font-black uppercase tracking-widest rounded-lg transition-all', currentView === 'calendar' ? 'bg-[var(--sys-bg-surface)] text-[var(--sys-brand-solid)] shadow-sm' : 'text-[var(--sys-text-secondary)]/60 hover:text-[var(--sys-text-primary)]']">
            Lịch
          </button>
          <button @click="currentView = 'list'" :class="['px-5 h-full text-[10px] font-black uppercase tracking-widest rounded-lg transition-all', currentView === 'list' ? 'bg-[var(--sys-bg-surface)] text-[var(--sys-brand-solid)] shadow-sm' : 'text-[var(--sys-text-secondary)]/60 hover:text-[var(--sys-text-primary)]']">
            Bảng
          </button>
        </div>

        <!-- Filters -->
        <Dropdown v-model="filterStatus" :options="statusOptions" placeholder="Trạng thái" />
        <Dropdown v-model="filterInterviewer" :options="interviewerOptions" placeholder="Nhân sự" />

        <button @click="openCreateModal" class="h-11 px-6 bg-[var(--sys-brand-solid)] rounded-xl font-bold text-white hover:brightness-110 active:scale-95 shadow-sm shadow-[var(--sys-brand-solid)]/20 transition-all flex items-center gap-2 uppercase tracking-widest text-[11px] whitespace-nowrap">
          <span class="material-symbols-outlined text-[18px]">add_circle</span>
          Tạo lịch
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="space-y-6">
      
      <!-- 1. Calendar View with Navigation & D&D -->
      <div v-show="currentView === 'calendar'" class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden relative group/calendar">
        
        <!-- Sensor Zones (Vùng Cảm Ứng) - Chỉ kích hoạt khi đang kéo thẻ -->
        <div 
          class="absolute left-0 top-0 bottom-0 w-20 z-[60] flex items-center justify-start pl-4 transition-all duration-300"
          :class="isDragging ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'"
          @dragenter.prevent="handleSensorEnter('prev')"
        >
          <div class="h-1/2 w-4 rounded-full bg-gradient-to-r from-[var(--sys-brand-solid)]/40 to-transparent"></div>
        </div>
        
        <div 
          class="absolute right-0 top-0 bottom-0 w-20 z-[60] flex items-center justify-end pr-4 transition-all duration-300"
          :class="isDragging ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'"
          @dragenter.prevent="handleSensorEnter('next')"
        >
          <div class="h-1/2 w-4 rounded-full bg-gradient-to-l from-[var(--sys-brand-solid)]/20 to-transparent"></div>
        </div>

        <div class="p-8">
          <div class="flex justify-between items-center mb-8">
            <h3 class="text-xl font-black text-[var(--sys-text-primary)] tracking-tight italic uppercase">Tháng {{ currentMonth + 1 }}, {{ currentYear }}</h3>
            <div class="flex gap-2 relative z-[70]">
                <button 
                    @click="prevMonth" 
                    class="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)] hover:bg-[var(--sys-brand-soft)] hover:text-[var(--sys-brand-solid)] transition-all active:scale-90"
                >
                    <span class="material-symbols-outlined">chevron_left</span>
                </button>
                <button 
                    @click="nextMonth" 
                    class="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)] hover:bg-[var(--sys-brand-soft)] hover:text-[var(--sys-brand-solid)] transition-all active:scale-90"
                >
                    <span class="material-symbols-outlined">chevron_right</span>
                </button>
            </div>
          </div>

          <Transition name="calendar-slide" mode="out-in">
            <div :key="currentMonth + '-' + currentYear" class="grid grid-cols-7 border-t border-l border-[var(--sys-border-subtle)] rounded-2xl overflow-hidden shadow-sm">
              <div v-for="dayName in ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']" :key="dayName" class="text-center py-4 text-[10px] font-black text-[var(--sys-text-secondary)]/60 uppercase tracking-widest bg-[var(--sys-bg-hover)] border-r border-b border-[var(--sys-border-subtle)] italic">
                {{ dayName }}
              </div>

              <!-- Empty cells -->
              <div v-for="blank in emptyDays" :key="'blank'+blank" class="min-h-[120px] bg-[var(--sys-bg-hover)]/10 border-r border-b border-[var(--sys-border-subtle)]"></div>

              <!-- Actual Date Cells -->
              <div 
                v-for="day in daysInMonth" :key="day" 
                class="min-h-[120px] p-2 border-r border-b border-[var(--sys-border-subtle)] hover:bg-[var(--sys-brand-soft)]/20 transition-colors"
                @dragover.prevent
                @dragenter.prevent
                @drop="onDrop($event, day)"
              >
                <div class="flex justify-between mb-2">
                  <span class="text-[11px] font-black text-[var(--sys-text-secondary)]/40">{{ day }}</span>
                </div>
                
                <div class="space-y-1.5">
                  <div 
                    v-for="interview in getInterviewsByDay(day)" :key="interview.id"
                    draggable="true"
                    @dragstart="onDragStart($event, interview)"
                    @dragend="onDragEnd"
                    @click.stop="openEditModal(interview)"
                    class="p-2 rounded-lg cursor-grab active:cursor-grabbing transition-all duration-200 hover:scale-105 shadow-sm"
                    :class="getCalendarEventClass(interview.computedStatus)"
                  >
                    <p class="text-[8px] font-black uppercase opacity-60 m-0">{{ interview.time }}</p>
                    <p class="text-[10px] font-black truncate m-0">{{ interview.candidate }}</p>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- 2. HR-Optimized List View -->
      <div v-show="currentView === 'list'" class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden">
        <div class="p-8 text-left">
          <h4 class="text-xs font-black text-[var(--sys-text-secondary)] uppercase tracking-widest flex items-center gap-2 mb-8 italic opacity-60">
            <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-xl font-normal">list_alt</span> 
            Dữ liệu phỏng vấn chi tiết
          </h4>

          <div class="overflow-x-auto rounded-3xl border border-[var(--sys-border-subtle)]">
            <table class="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr class="bg-[var(--sys-bg-hover)]">
                  <th class="px-8 py-5 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest border-b border-[var(--sys-border-subtle)] italic">Ứng viên</th>
                  <th class="px-6 py-5 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest border-b border-[var(--sys-border-subtle)] italic text-center">Thời gian</th>
                  <th class="px-6 py-5 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest border-b border-[var(--sys-border-subtle)] italic text-center">Người phỏng vấn</th>
                  <th class="px-6 py-5 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest border-b border-[var(--sys-border-subtle)] italic text-center">Trạng thái</th>
                  <th class="px-8 py-5 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest border-b border-[var(--sys-border-subtle)] italic text-right">Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="interview in filteredInterviews" :key="interview.id" class="group hover:bg-[var(--sys-bg-hover)] transition-all duration-300">
                  <td class="px-8 py-5 border-b border-[var(--sys-border-subtle)]">
                    <div class="flex flex-col">
                      <span class="text-sm font-black text-[var(--sys-text-primary)]" :class="{'opacity-40 line-through': interview.status === 'Đã hủy'}">{{ interview.candidate }}</span>
                      <span class="text-[9px] font-black text-[var(--sys-brand-solid)] mt-0.5 uppercase tracking-tighter">ID #{{ interview.id }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-5 border-b border-[var(--sys-border-subtle)] text-center">
                    <div class="flex items-center justify-center gap-2 text-[var(--sys-text-primary)] font-black text-xs italic">
                      {{ interview.date }} • {{ interview.time }}
                    </div>
                  </td>
                  <td class="px-6 py-5 border-b border-[var(--sys-border-subtle)] text-center">
                    <div class="flex items-center justify-center gap-3">
                      <div class="w-8 h-8 rounded-xl bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center text-[10px] font-black border border-[var(--sys-brand-border)] shadow-sm">
                        {{ getInterviewerInitials(interview.interviewerId) }}
                      </div>
                      <span class="text-xs font-bold text-[var(--sys-text-secondary)] hidden xl:block">{{ getInterviewerName(interview.interviewerId) }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-5 border-b border-[var(--sys-border-subtle)] text-center">
                    <span class="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border inline-flex items-center gap-1.5" :class="getStatusBadgeClass(interview.computedStatus)">
                      <span v-if="interview.computedStatus === 'Quá hạn'" class="w-1.5 h-1.5 rounded-full bg-[var(--sys-danger-solid)] animate-pulse"></span>
                      {{ interview.computedStatus }}
                    </span>
                  </td>
                  <td class="px-8 py-5 border-b border-[var(--sys-border-subtle)] text-right">
                    <div class="flex justify-end gap-2">
                       <button @click="openEditModal(interview)" class="w-9 h-9 flex items-center justify-center rounded-xl bg-transparent text-[var(--sys-icon-default)] hover:text-[var(--sys-brand-solid)] hover:bg-[var(--sys-brand-solid)]/10 transition-all active:scale-90">
                        <span class="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button @click="openEvaluateModal(interview.candidate)" class="w-9 h-9 flex items-center justify-center rounded-xl bg-transparent text-[var(--sys-icon-default)] hover:text-[var(--sys-success-text)] hover:bg-[var(--sys-success-solid)]/10 transition-all active:scale-90" title="Đánh giá">
                        <span class="material-symbols-outlined text-lg">rate_review</span>
                      </button>
                      <button v-if="interview.status !== 'Đã hủy'" @click="handleCancelInterview(interview)" class="w-9 h-9 flex items-center justify-center rounded-xl bg-transparent text-[var(--sys-icon-default)] hover:text-[var(--sys-danger-text)] hover:bg-[var(--sys-danger-solid)]/10 transition-all active:scale-90">
                        <span class="material-symbols-outlined text-lg">event_busy</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals & Toasts -->
    <Teleport to="body">
        <!-- Create/Edit Modal (overflow-visible fixed) -->
        <Transition name="scale-fade">
          <div v-if="showModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <div class="fixed inset-0 w-screen h-screen bg-black/40 backdrop-blur-sm z-[9999]" @click="closeModal"></div>
            <div class="relative z-[10000] bg-[var(--sys-bg-surface-elevated)] w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-visible border border-[var(--sys-border-subtle)] text-left transform transition-all">
              <div class="px-8 py-7 border-b border-[var(--sys-border-subtle)] flex items-center justify-between">
                <div>
                  <h3 class="text-xl font-black text-[var(--sys-text-primary)] uppercase italic">{{ isEditMode ? 'Chỉnh sửa lịch phỏng vấn' : 'Tạo lịch mới' }}</h3>
                  <p class="text-[10px] text-[var(--sys-text-secondary)] font-bold italic mt-1">Thiết lập thời gian và nhân sự phụ trách</p>
                </div>
                <button @click="closeModal" class="w-11 h-11 flex items-center justify-center rounded-2xl bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] hover:text-[var(--sys-brand-solid)] transition-all">
                  <span class="material-symbols-outlined">close</span>
                </button>
              </div>
              <div class="p-8 space-y-6 pb-20">
                <div>
                  <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2 ml-1 italic">Họ tên Ứng viên</label>
                  <input v-model="form.candidate" type="text" class="w-full px-5 py-4 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-black focus:border-[var(--sys-brand-solid)] outline-none transition-all text-[var(--sys-text-primary)]">
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2 ml-1 italic">Ngày phỏng vấn</label>
                    <input v-model="form.date" type="text" class="w-full px-5 py-4 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-black text-[var(--sys-text-primary)]" placeholder="DD/MM/YYYY">
                  </div>
                  <div>
                    <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2 ml-1 italic">Giờ</label>
                    <input v-model="form.time" type="text" class="w-full px-5 py-4 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-black text-[var(--sys-text-primary)]">
                  </div>
                </div>
                <div>
                  <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2 ml-1 italic">Người phỏng vấn</label>
                  <Dropdown v-model="form.interviewerId" :options="interviewerFormOptions" class="w-full" />
                </div>
                <button @click="saveSchedule" class="w-full h-11 mt-6 bg-[var(--sys-brand-solid)] text-white rounded-xl font-bold shadow-sm shadow-[var(--sys-brand-solid)]/20 hover:brightness-110 transition-all uppercase tracking-widest text-[11px]">
                  Hoàn tất thiết lập
                </button>
              </div>
            </div>
          </div>
        </Transition>

        <!-- Evaluation Modal -->
        <Transition name="scale-fade">
          <div v-if="showEvaluateModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <div class="fixed inset-0 w-screen h-screen bg-black/40 backdrop-blur-sm z-[9999]" @click="showEvaluateModal = false"></div>
            <div class="relative z-[10000] bg-[var(--sys-bg-surface-elevated)] w-full max-w-lg rounded-[3rem] shadow-2xl border border-[var(--sys-border-subtle)] text-left overflow-hidden">
               <div class="p-10 space-y-8">
                <div class="flex items-center gap-5">
                  <div class="w-16 h-16 rounded-[1.5rem] bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center shadow-inner border border-[var(--sys-brand-border)]">
                    <span class="material-symbols-outlined text-4xl">inventory_2</span>
                  </div>
                  <div>
                    <h3 class="text-2xl font-black text-[var(--sys-text-primary)] uppercase italic tracking-tighter">{{ selectedCandidateToEvaluate }}</h3>
                    <p class="text-[11px] text-[var(--sys-brand-solid)] font-black uppercase tracking-[0.2em]">Kế hoạch đánh giá chuyên môn</p>
                  </div>
                </div>
                <textarea class="w-full px-6 py-5 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-3xl text-sm font-bold min-h-[140px] outline-none focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)]" placeholder="Bình luận về kỹ năng, thái độ..."></textarea>
                <div class="flex gap-3 mt-4">
                  <button @click="finishEvaluation" class="flex-1 h-11 bg-[var(--sys-success-solid)] text-white rounded-xl font-bold uppercase text-[11px] tracking-widest hover:brightness-90 transition-all duration-200">Đồng ý tuyển</button>
                  <button @click="finishEvaluation" class="flex-1 h-11 bg-[var(--sys-danger-solid)] text-white rounded-xl font-bold uppercase text-[11px] tracking-widest hover:brightness-90 transition-all duration-200">Loại bỏ</button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
    </Teleport>

    <!-- Success Toast (SaaS Colors fixed) -->
    <transition name="toast-slide">
      <div v-if="showToast" class="fixed bottom-10 right-10 z-[11000] flex items-center gap-4 px-8 py-5 bg-[var(--sys-bg-surface-elevated)] border border-[var(--sys-border-subtle)] text-[var(--sys-text-primary)] rounded-[2rem] shadow-2xl">
        <div class="w-10 h-10 rounded-full bg-[var(--sys-brand-solid)] text-white flex items-center justify-center shadow-lg shadow-[var(--sys-brand-solid-lch-30)]">
          <span class="material-symbols-outlined text-xl font-black">check</span>
        </div>
        <div class="flex flex-col text-left">
            <span class="text-[10px] font-black text-[var(--sys-brand-solid)] uppercase tracking-widest">Hệ thống</span>
            <span class="text-[11px] font-bold italic">{{ toastMessage }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Dropdown from '@/components/Dropdown.vue';
import { useConfirm } from '@/composables/useConfirm';

const { showAlert, showConfirm } = useConfirm();

// Helpers for Dynamic Data
const formatDate = (date) => {
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
};

const formatTime = (date) => {
  const h = date.getHours().toString().padStart(2, '0');
  const min = date.getMinutes().toString().padStart(2, '0');
  return `${h}:${min}`;
};

const parseDateTime = (dateStr, timeStr) => {
  const [d, m, y] = dateStr.split('/').map(Number);
  const [h, min] = timeStr.split(':').map(Number);
  return new Date(y, m - 1, d, h, min);
};

// Real-Time Engine
const currentTime = ref(new Date());
let timeTicker = null;

onMounted(() => {
  timeTicker = setInterval(() => {
    currentTime.value = new Date();
  }, 30000); // 30s update
});

onUnmounted(() => {
  if (timeTicker) clearInterval(timeTicker);
});

// Calendar Navigation State
const currentDate = ref(new Date()); // Default to TODAY
const currentMonth = computed(() => currentDate.value.getMonth());
const currentYear = computed(() => currentDate.value.getFullYear());

const daysInMonth = computed(() => new Date(currentYear.value, currentMonth.value + 1, 0).getDate());
const emptyDays = computed(() => {
    let firstDayOfWeek = new Date(currentYear.value, currentMonth.value, 1).getDay();
    // Adjust for T2 column start (in JS: 0=Sun, 1=Mon...6=Sat)
    return firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
});

const prevMonth = () => { currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1); };
const nextMonth = () => { currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1); };

// UI State
const currentView = ref('calendar');
const filterStatus = ref('');
const filterInterviewer = ref('');
const showModal = ref(false);
const showEvaluateModal = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const isEditMode = ref(false);
const selectedCandidateToEvaluate = ref('');
const editingId = ref(null);

const form = ref({
  candidate: '',
  date: '',
  time: '',
  interviewerId: '',
  status: 'Sắp diễn ra'
});

const interviewList = ref([
  { id: 1, candidate: 'Nguyễn Văn An (Quá hạn)', date: formatDate(new Date(Date.now() - 3600000)), time: formatTime(new Date(Date.now() - 3600000)), interviewerId: '1', status: 'Sắp diễn ra' },
  { id: 2, candidate: 'Hoàng Thị Em (Xong)', date: formatDate(new Date(Date.now() - 86400000)), time: '10:00', interviewerId: '2', status: 'Đã xong' },
  { id: 3, candidate: 'Lê Văn Chính (Sắp tới)', date: formatDate(new Date(Date.now() + 7200000)), time: formatTime(new Date(Date.now() + 7200000)), interviewerId: '3', status: 'Sắp diễn ra' },
  { id: 4, candidate: 'Đinh Tuấn Vũ (Mai)', date: formatDate(new Date(Date.now() + 86400000)), time: '13:00', interviewerId: '1', status: 'Sắp diễn ra' },
  { id: 5, candidate: 'Bùi Anh Đào (Kia)', date: formatDate(new Date(Date.now() + 3 * 86400000)), time: '09:30', interviewerId: '5', status: 'Sắp diễn ra' }
]);

const danhSachNhanSu = [
  { id: '1', name: 'Hà Duy Kiên', role: 'Tech Lead' },
  { id: '2', name: 'Phạm Minh Đức', role: 'HR Manager' },
  { id: '3', name: 'Lê Tuyết Mai', role: 'Senior PM' },
  { id: '5', name: 'Nguyễn Thị Hương', role: 'Engineer' }
];

const statusOptions = [
  { label: 'Tất cả trạng thái', value: '' },
  { label: 'Sắp diễn ra', value: 'Sắp diễn ra' },
  { label: 'Đã xong', value: 'Đã xong' },
  { label: 'Đã hủy', value: 'Đã hủy' }
];

const interviewerOptions = computed(() => [
  { label: 'Tất cả NS', value: '' },
  ...danhSachNhanSu.map(ns => ({ label: ns.name, value: ns.id }))
]);

const interviewerFormOptions = computed(() => [
  { label: 'Chọn nhân sự phụ trách...', value: '' },
  ...danhSachNhanSu.map(ns => ({ label: `${ns.name} (${ns.role})`, value: ns.id }))
]);

// Computed
const liveInterviews = computed(() => {
  return interviewList.value.map(interview => {
    let computedStatus = interview.status;
    if (interview.status === 'Sắp diễn ra') {
      const interviewTime = parseDateTime(interview.date, interview.time);
      if (interviewTime < currentTime.value) {
        computedStatus = 'Quá hạn';
      }
    }
    return { ...interview, computedStatus };
  });
});

const filteredInterviews = computed(() => {
  return liveInterviews.value
    .filter(item => {
      const matchStatus = filterStatus.value ? item.status === filterStatus.value : true;
      const matchInterviewer = filterInterviewer.value ? item.interviewerId === filterInterviewer.value : true;
      return matchStatus && matchInterviewer;
    })
    .sort((a, b) => {
      const priority = { 'Quá hạn': 0, 'Sắp diễn ra': 1, 'Đã xong': 2, 'Đã hủy': 3 };
      if (priority[a.computedStatus] !== priority[b.computedStatus]) {
        return priority[a.computedStatus] - priority[b.computedStatus];
      }
      return parseDateTime(a.date, a.time) - parseDateTime(b.date, b.time);
    });
});

// Methods
const getInterviewsByDay = (day) => {
  const dateStr = `${day.toString().padStart(2, '0')}/${(currentMonth.value + 1).toString().padStart(2, '0')}/${currentYear.value}`;
  return liveInterviews.value.filter(i => i.date === dateStr);
}

const getInterviewerName = (id) => danhSachNhanSu.find(p => p.id === id)?.name || 'N/A';
const getInterviewerInitials = (id) => getInterviewerName(id).split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

const getStatusBadgeClass = (status) => {
  switch(status) {
    case 'Quá hạn': return 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]';
    case 'Sắp diễn ra': return 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)]';
    case 'Đã xong': return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
    case 'Đã hủy': return 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]';
    default: return 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border-[var(--sys-border-subtle)]';
  }
};

const getCalendarEventClass = (status) => {
  switch(status) {
    case 'Quá hạn': return 'bg-[var(--sys-danger-solid)] text-white';
    case 'Sắp diễn ra': return 'bg-[var(--sys-brand-solid)] text-white';
    case 'Đã xong': return 'bg-[var(--sys-success-solid)] text-white';
    case 'Đã hủy': return 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)]';
    default: return 'bg-[var(--sys-brand-solid)] text-white';
  }
};

// Drag & Drop Logic
const isDragging = ref(false);
let pagingTimeout = null;
let isPagingBlocked = false;

const onDragStart = (e, interview) => {
  isDragging.value = true;
  e.dataTransfer.setData('interviewId', interview.id);
  e.dataTransfer.effectAllowed = 'move';
};

const handleSensorEnter = (direction) => {
  if (isPagingBlocked) return;
  
  // Trigger paging
  if (direction === 'next') nextMonth();
  else prevMonth();

  // Throttling to prevent runaway paging (600ms is comfortable)
  isPagingBlocked = true;
  pagingTimeout = setTimeout(() => {
    isPagingBlocked = false;
  }, 600);
};

const onDrop = (e, day) => {
  isDragging.value = false;
  const id = parseInt(e.dataTransfer.getData('interviewId'));
  const interview = interviewList.value.find(i => i.id === id);
  
  if (interview) {
    const newDayStr = `${day.toString().padStart(2, '0')}/${(currentMonth.value + 1).toString().padStart(2, '0')}/${currentYear.value}`;
    
    // Validation: Chặn dời lịch về quá khứ
    const targetDateTime = parseDateTime(newDayStr, interview.time);
    
    if (targetDateTime < currentTime.value) {
      // Thông báo lỗi nếu dời về quá khứ
      triggerToast('Không thể dời lịch phỏng vấn về thời điểm trong quá khứ!');
      // Không cập nhật dữ liệu -> Thẻ sẽ tự động "snap-back" về vị trí cũ
      return;
    }

    if (interview.date !== newDayStr) {
      interview.date = newDayStr;
      triggerToast(`Đã dời lịch phỏng vấn ${interview.candidate} sang ngày ${day}`);
    }
  }
};

const onDragEnd = () => {
  isDragging.value = false;
};

// Modal handlers
const openCreateModal = () => {
  isEditMode.value = false;
  const now = new Date();
  form.value = { 
    candidate: '', 
    date: `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth()+1).toString().padStart(2, '0')}/${now.getFullYear()}`, 
    time: '09:00', 
    interviewerId: '', 
    status: 'Sắp diễn ra' 
  };
  showModal.value = true;
};

const openEditModal = (interview) => {
  isEditMode.value = true;
  editingId.value = interview.id;
  form.value = { ...interview };
  showModal.value = true;
};

const saveSchedule = () => {
  if (!form.value.candidate) return showAlert('Thiếu dữ liệu', 'Vui lòng cung cấp tên ứng viên');
  if (isEditMode.value) {
    const idx = interviewList.value.findIndex(i => i.id === editingId.value);
    interviewList.value[idx] = { ...form.value, id: editingId.value };
    triggerToast('Cập nhật lịch thành công');
  } else {
    interviewList.value.push({ ...form.value, id: Date.now() });
    triggerToast('Đã thêm lịch phỏng vấn mới');
  }
  closeModal();
};

const closeModal = () => showModal.value = false;

const openEvaluateModal = (name) => {
  selectedCandidateToEvaluate.value = name;
  showEvaluateModal.value = true;
};

const finishEvaluation = () => {
  showEvaluateModal.value = false;
  triggerToast('Đã lưu kết quả đánh giá');
}

const handleCancelInterview = async (interview) => {
  const ok = await showConfirm('Hủy lịch', `Xác nhận hủy lịch của ${interview.candidate}?`);
  if (ok) {
    interview.status = 'Đã hủy';
    triggerToast('Đã hủy lịch phỏng vấn');
  }
}

const triggerToast = (msg) => {
  toastMessage.value = msg;
  showToast.value = true;
  setTimeout(() => showToast.value = false, 3000);
};
</script>

<style scoped>
.calendar-slide-enter-active, .calendar-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.calendar-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.calendar-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
