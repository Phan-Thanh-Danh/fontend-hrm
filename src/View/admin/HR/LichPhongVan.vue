<template>
 <div class="space-y-8 pb-10">
 <!-- Header -->
 <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 bg-transparent text-left">
 <div class="bg-transparent text-left">
 <h1 class="text-2xl font-semibold text-[var(--sys-text-primary)] mb-1 ">Hệ thống Lịch Phỏng vấn</h1>
 <p class="text-[10px] text-[var(--sys-text-secondary)] font-semibold opacity-60">Điều phối nhân sự, theo dõi ứng viên và tối ưu hóa quy trình thẩm định năng lực.</p>
 </div>
 <div class="bg-transparent text-right hidden xl:block">
 <div class="inline-flex items-center gap-4 bg-[var(--sys-bg-surface)] px-6 py-3 rounded-2xl border border-[var(--sys-border-subtle)] shadow-sm font-semibold text-[10px] text-[var(--sys-brand-solid)]">
 <span class="w-2 h-2 rounded-full bg-[var(--sys-brand-solid)] animate-ping"></span>
 Active Recruitment Flow
 </div>
 </div>
 </div>

 <!-- Toolbar -->
 <div class="flex flex-col lg:flex-row items-center gap-4 bg-transparent">
 <div class="flex-1 w-full bg-transparent">
 <h3 class="hidden lg:block text-[10px] font-semibold text-[var(--sys-text-secondary)] opacity-30">Phân hệ điều động nhân sự dự phòng</h3>
 </div>
 
 <div class="flex items-center gap-4 w-full lg:w-auto shrink-0 flex-wrap lg:flex-nowrap bg-transparent justify-end">
 <!-- View Toggle -->
 <div class="bg-[var(--sys-bg-hover)] rounded-2xl p-1 flex border border-[var(--sys-border-subtle)] h-12 shadow-inner">
 <button @click="currentView = 'calendar'" :class="['px-6 h-full text-[10px] font-semibold rounded-xl transition-all flex items-center gap-2', currentView === 'calendar' ? 'bg-white text-[var(--sys-brand-solid)] shadow-md border border-[var(--sys-border-subtle)]' : 'text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] opacity-40 hover:opacity-100']">
 <span class="material-symbols-outlined text-lg">calendar_month</span>
 Lịch tóm lược
 </button>
 <button @click="currentView = 'list'" :class="['px-6 h-full text-[10px] font-semibold rounded-xl transition-all flex items-center gap-2', currentView === 'list' ? 'bg-white text-[var(--sys-brand-solid)] shadow-md border border-[var(--sys-border-subtle)]' : 'text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] opacity-40 hover:opacity-100']">
 <span class="material-symbols-outlined text-lg">view_list</span>
 Bảng chi tiết
 </button>
 </div>

 <!-- Filters -->
 <Dropdown v-model="filterStatus" :options="statusOptions" class="min-w-[150px]" />
 <Dropdown v-model="filterInterviewer" :options="interviewerOptions" class="min-w-[150px]" />

 <button @click="openCreateModal" class="h-12 px-8 bg-[var(--sys-brand-solid)] rounded-2xl font-semibold text-white hover:bg-[var(--sys-brand-hover)] shadow-2xl shadow-[var(--sys-brand-solid)]/20 transition-all flex items-center gap-3 text-[10px] active:scale-95 shrink-0">
 <span class="material-symbols-outlined text-xl">add_circle</span>
 Thiết lập lịch mới
 </button>
 </div>
 </div>

 <!-- Main Content -->
 <div class="space-y-8">
 <!-- Calendar View -->
 <div v-show="currentView === 'calendar'" class="bg-[var(--sys-bg-surface)] rounded-[3rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden relative group/calendar animate-in fade-in slide-in-from-bottom-4 duration-500">
 <!-- Drag Sensors -->
 <div 
 class="absolute left-0 top-0 bottom-0 w-24 z-[60] flex items-center justify-start pl-6 transition-all duration-300"
 :class="isDragging ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'"
 @dragenter.prevent="handleSensorEnter('prev')"
 >
 <div class="h-1/2 w-8 rounded-[2rem] bg-gradient-to-r from-[var(--sys-brand-solid)]/20 to-transparent blur-md"></div>
 </div>
 
 <div 
 class="absolute right-0 top-0 bottom-0 w-24 z-[60] flex items-center justify-end pr-6 transition-all duration-300"
 :class="isDragging ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'"
 @dragenter.prevent="handleSensorEnter('next')"
 >
 <div class="h-1/2 w-8 rounded-[2rem] bg-gradient-to-l from-[var(--sys-brand-solid)]/20 to-transparent blur-md"></div>
 </div>

 <div class="px-10 py-10">
 <div class="flex justify-between items-center mb-10">
 <div class="flex items-center gap-4 bg-transparent text-left">
 <span class="material-symbols-outlined text-4xl text-[var(--sys-brand-solid)] opacity-60">event_available</span>
 <h3 class="text-2xl font-semibold text-[var(--sys-text-primary)] ">Tháng {{ currentMonth + 1 }} • {{ currentYear }}</h3>
 </div>
 <div class="flex gap-3 relative z-[70]">
 <button @click="prevMonth" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-white text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)] hover:text-[var(--sys-brand-solid)] transition-all shadow-sm active:scale-90"><span class="material-symbols-outlined text-2xl">chevron_left</span></button>
 <button @click="nextMonth" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-white text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)] hover:text-[var(--sys-brand-solid)] transition-all shadow-sm active:scale-90"><span class="material-symbols-outlined text-2xl">chevron_right</span></button>
 </div>
 </div>

 <Transition name="calendar-slide" mode="out-in">
 <div :key="currentMonth + '-' + currentYear" class="grid grid-cols-7 border-t border-l border-[var(--sys-border-subtle)] rounded-[2.5rem] overflow-hidden shadow-2xl bg-white">
 <div v-for="dayName in ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật']" :key="dayName" class="text-center py-6 text-[9px] font-semibold text-[var(--sys-text-secondary)] bg-[var(--sys-bg-page)]/50 border-r border-b border-[var(--sys-border-subtle)] opacity-60">
 {{ dayName }}
 </div>

 <!-- Blank cells -->
 <div v-for="blank in emptyDays" :key="'blank'+blank" class="min-h-[160px] bg-[var(--sys-bg-page)]/20 border-r border-b border-[var(--sys-border-subtle)]/40"></div>

 <!-- Real cells -->
 <div 
 v-for="day in daysInMonth" :key="day" 
 class="min-h-[160px] p-4 border-r border-b border-[var(--sys-border-subtle)] hover:bg-[var(--sys-brand-soft)] transition-colors relative group/cell"
 @dragover.prevent @dragenter.prevent @drop="onDrop($event, day)"
 >
 <div class="flex justify-between mb-4">
 <span class="text-xs font-semibold text-[var(--sys-text-secondary)] opacity-30 group-hover/cell:opacity-100 transition-opacity">{{ day }}</span>
 </div>
 
 <div class="space-y-2">
 <div 
 v-for="interview in getInterviewsByDay(day)" :key="interview.id"
 draggable="true" @dragstart="onDragStart($event, interview)" @dragend="onDragEnd"
 @click.stop="openEditModal(interview)"
 class="p-3 rounded-xl cursor-grab active:cursor-grabbing transition-all duration-300 hover:scale-[1.05] shadow-lg flex flex-col gap-1 border border-white/20"
 :class="getCalendarEventClass(interview.computedStatus)"
 >
 <div class="flex items-center justify-between">
 <p class="text-[8px] font-semibold opacity-80">{{ interview.time }}</p>
 <span class="material-symbols-outlined text-[10px] opacity-40">drag_indicator</span>
 </div>
 <p class="text-[10px] font-semibold truncate leading-tight ">{{ interview.candidate }}</p>
 </div>
 </div>
 </div>
 </div>
 </Transition>
 </div>
 </div>

 <!-- List View -->
 <div v-show="currentView === 'list'" class="bg-[var(--sys-bg-surface)] rounded-[3rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
 <div class="p-10 text-left bg-transparent">
 <div class="flex items-center justify-between mb-10">
 <h4 class="text-[11px] font-semibold text-[var(--sys-text-secondary)] flex items-center gap-4 opacity-40">
 <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-2xl font-normal opacity-60">inventory_2</span> 
 Kho lưu trữ dữ liệu phỏng vấn tập trung
 </h4>
 <span class="text-[9px] font-semibold text-[var(--sys-text-secondary)] opacity-40">Tổng số {{ filteredInterviews.length }} bản ghi</span>
 </div>

 <div class="overflow-x-auto rounded-[2.5rem] border border-[var(--sys-border-subtle)] bg-white shadow-2xl">
 <table class="min-w-max w-full text-left border-separate border-spacing-0">
 <thead>
 <tr class="bg-[var(--sys-bg-page)]/50">
 <th class="whitespace-nowrap px-10 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] ">Ứng viên thụ hưởng</th>
 <th class="whitespace-nowrap px-8 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] text-center">Ấn định thời gian</th>
 <th class="whitespace-nowrap px-8 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] text-center">Nhân vụ phụ trách</th>
 <th class="whitespace-nowrap px-8 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] text-center">Trình trạng</th>
 <th class="whitespace-nowrap px-10 py-6 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] text-right">Công cụ xử lý</th>
 </tr>
 </thead>
 <tbody>
 <tr v-for="interview in filteredInterviews" :key="interview.id" class="group hover:bg-[var(--sys-bg-hover)] transition-all duration-300">
 <td class="whitespace-nowrap px-10 py-5 border-b border-[var(--sys-border-subtle)]">
 <div class="flex flex-col truncate max-w-[220px]">
 <span class="text-sm font-semibold text-[var(--sys-text-primary)] transition-colors group-hover:text-[var(--sys-brand-solid)]" :class="{'opacity-30 line-through': interview.status === 'Đã hủy'}">{{ interview.candidate }}</span>
 <span class="text-[9px] font-semibold text-[var(--sys-brand-solid)] mt-0.5 opacity-60 ">MSHS: #{{ interview.id }}</span>
 </div>
 </td>
 <td class="whitespace-nowrap px-8 py-5 border-b border-[var(--sys-border-subtle)] text-center">
 <div class="flex items-center justify-center gap-3 text-[var(--sys-text-primary)] font-semibold text-xs opacity-80 ">
 <span class="material-symbols-outlined text-lg opacity-40">calendar_today</span>
 {{ interview.date }} • {{ interview.time }}
 </div>
 </td>
 <td class="whitespace-nowrap px-8 py-5 border-b border-[var(--sys-border-subtle)] text-center">
 <div class="flex items-center justify-center gap-4 bg-transparent">
 <div class="w-10 h-10 rounded-[1.25rem] bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center text-xs font-semibold border border-[var(--sys-brand-border)] shadow-inner ">
 {{ getInterviewerInitials(interview.interviewerId) }}
 </div>
 <span class="text-xs font-semibold text-[var(--sys-text-secondary)] hidden xl:block opacity-60 ">{{ getInterviewerName(interview.interviewerId) }}</span>
 </div>
 </td>
 <td class="whitespace-nowrap px-8 py-5 border-b border-[var(--sys-border-subtle)] text-center">
 <span class="px-4 py-2 rounded-xl text-[9px] font-semibold shadow-sm border inline-flex items-center gap-2 " :class="getStatusBadgeClass(interview.computedStatus)">
 <span v-if="interview.computedStatus === 'Quá hạn'" class="w-1.5 h-1.5 rounded-full bg-[var(--sys-danger-solid)] animate-pulse shadow-lg"></span>
 {{ interview.computedStatus }}
 </span>
 </td>
 <td class="whitespace-nowrap px-10 py-5 border-b border-[var(--sys-border-subtle)] text-right">
 <div class="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
 <button @click="openEditModal(interview)" class="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-[var(--sys-icon-default)] hover:text-[var(--sys-brand-solid)] border border-[var(--sys-border-subtle)] hover:border-[var(--sys-brand-solid)] transition-all shadow-sm active:scale-90" title="Hiệu chính thông tin">
 <span class="material-symbols-outlined text-xl">edit_square</span>
 </button>
 <button @click="openEvaluateModal(interview.candidate)" class="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-[var(--sys-icon-default)] hover:text-[var(--sys-success-text)] border border-[var(--sys-border-subtle)] hover:border-[var(--sys-success-border)] transition-all shadow-sm active:scale-90" title="Thẩm định năng lực">
 <span class="material-symbols-outlined text-xl">verified_user</span>
 </button>
 <button v-if="interview.status !== 'Đã hủy'" @click="handleCancelInterview(interview)" class="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-[var(--sys-icon-default)] hover:text-[var(--sys-danger-text)] border border-[var(--sys-border-subtle)] hover:border-[var(--sys-danger-border)] transition-all shadow-sm active:scale-90" title="Loại bỏ lịch trình">
 <span class="material-symbols-outlined text-xl">event_busy</span>
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

 <!-- Modals -->
 <Teleport to="body">
 <Transition
 enter-active-class="transition ease-out duration-300"
 enter-from-class="opacity-0 scale-95 translate-y-8"
 enter-to-class="opacity-100 scale-100 translate-y-0"
 leave-active-class="transition ease-in duration-200"
 leave-from-class="opacity-100 scale-100 translate-y-0"
 leave-to-class="opacity-0 scale-95 translate-y-8"
 >
 <div v-if="showModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
 <div class="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-md z-[9999]" @click="closeModal"></div>
 <div class="relative z-[10000] bg-[var(--sys-bg-surface-elevated)] w-full max-w-xl rounded-[3rem] shadow-2xl border border-[var(--sys-border-subtle)] text-left transform transition-all group/modal">
 <div class="px-10 py-8 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-transparent">
 <div class="bg-transparent text-left">
 <h3 class="text-xl font-semibold text-[var(--sys-text-primary)] ">{{ isEditMode ? 'Hiệu chỉnh Lịch trình Thẩm định' : 'Kiến tạo Lịch trình Mới' }}</h3>
 <p class="text-[9px] text-[var(--sys-text-secondary)] font-semibold mt-1 opacity-40">Thiết lập tham số thời gian và nhân vụ chuyên môn</p>
 </div>
 <button @click="closeModal" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] hover:text-[var(--sys-brand-solid)] transition-all border border-[var(--sys-border-subtle)]">
 <span class="material-symbols-outlined text-2xl">close</span>
 </button>
 </div>
 <div class="p-10 space-y-8 pb-16 bg-transparent text-left">
 <div class="space-y-3 bg-transparent text-left">
 <label class="text-[9px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-40 block">Họ tên Ứng viên thụ hưởng *</label>
 <input v-model="form.candidate" type="text" class="w-full px-8 py-5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-semibold focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] outline-none transition-all text-[var(--sys-text-primary)] shadow-inner">
 </div>
 <div class="grid grid-cols-2 gap-8 bg-transparent text-left">
 <div class="space-y-3 bg-transparent text-left">
 <label class="text-[9px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-40 block">Ngày ấn định (DD/MM/YYYY)</label>
 <input v-model="form.date" type="text" class="w-full px-8 py-5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-semibold text-[var(--sys-text-primary)] shadow-inner focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 outline-none" placeholder="15/10/2023">
 </div>
 <div class="space-y-3 bg-transparent text-left">
 <label class="text-[9px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-40 block">Thời điểm thực hiện</label>
 <input v-model="form.time" type="text" class="w-full px-8 py-5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-semibold text-[var(--sys-text-primary)] shadow-inner focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 outline-none" placeholder="14:00">
 </div>
 </div>
 <div class="space-y-3 bg-transparent text-left">
 <label class="text-[9px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-40 block">Nhân vụ phụ trách Thẩm định</label>
 <Dropdown v-model="form.interviewerId" :options="interviewerFormOptions" class="w-full" />
 </div>
 <button @click="saveSchedule" class="w-full py-5 bg-[var(--sys-brand-solid)] text-white rounded-[2rem] font-semibold shadow-2xl shadow-[var(--sys-brand-solid)]/20 hover:bg-[var(--sys-brand-hover)] transition-all text-[10px] active:scale-95 flex items-center justify-center gap-4 mt-6">
 <span class="material-symbols-outlined text-xl">verified</span>
 Phê chuẩn Lịch trình
 </button>
 </div>
 </div>
 </div>
 </Transition>

 <!-- Evaluation Modal -->
 <Transition
 enter-active-class="transition ease-out duration-300"
 enter-from-class="opacity-0 scale-90"
 enter-to-class="opacity-100 scale-100"
 leave-active-class="transition ease-in duration-200"
 leave-from-class="opacity-100 scale-100"
 leave-to-class="opacity-0 scale-90"
 >
 <div v-if="showEvaluateModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
 <div class="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-md z-[9999]" @click="showEvaluateModal = false"></div>
 <div class="relative z-[10000] bg-[var(--sys-bg-surface-elevated)] w-full max-w-lg rounded-[3.5rem] shadow-2xl border border-[var(--sys-border-subtle)] text-left overflow-hidden">
 <div class="p-12 space-y-10 bg-transparent text-left">
 <div class="flex items-center gap-6 bg-transparent text-left">
 <div class="w-20 h-20 rounded-[2rem] bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center shadow-inner border border-[var(--sys-brand-border)]">
 <span class="material-symbols-outlined text-4xl">fact_check</span>
 </div>
 <div class="bg-transparent text-left">
 <h3 class="text-2xl font-semibold text-[var(--sys-text-primary)] leading-tight">{{ selectedCandidateToEvaluate }}</h3>
 <p class="text-[10px] text-[var(--sys-brand-solid)] font-semibold mt-1 ">Kết luận thẩm định cuối cùng</p>
 </div>
 </div>
 <div class="space-y-3 bg-transparent text-left">
 <label class="text-[9px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-40 block">Báo cáo đánh giá chi tiết *</label>
 <textarea class="w-full px-8 py-6 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-[2.5rem] text-xs font-semibold min-h-[160px] outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-inner leading-relaxed" placeholder="Ghi chú về năng lực kỹ thuật, khả năng hòa nhập và nhận định chuyên môn..."></textarea>
 </div>
 <div class="flex gap-5 mt-6 bg-transparent">
 <button @click="finishEvaluation" class="flex-1 py-5 bg-[var(--sys-success-solid)] text-white rounded-2xl font-semibold text-[10px] hover:bg-emerald-600 transition-all shadow-xl shadow-success/20 active:scale-95">CHẤP THUẬN (PASS)</button>
 <button @click="finishEvaluation" class="flex-1 py-5 bg-[var(--sys-danger-solid)] text-white rounded-2xl font-semibold text-[10px] hover:bg-rose-600 transition-all shadow-xl shadow-danger/20 active:scale-95">BÁC BỎ (FAIL)</button>
 </div>
 </div>
 </div>
 </div>
 </Transition>
 </Teleport>

 <!-- Success Toast -->
 <transition name="toast-slide">
 <div v-if="showToast" class="fixed bottom-12 right-12 z-[11000] flex items-center gap-6 px-10 py-6 bg-white border border-[var(--sys-border-subtle)] text-[var(--sys-text-primary)] rounded-[3rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] animate-in slide-in-from-right-10 duration-500">
 <div class="w-12 h-12 rounded-full bg-[var(--sys-brand-solid)] text-white flex items-center justify-center shadow-2xl shadow-[var(--sys-brand-solid)]/40">
 <span class="material-symbols-outlined text-2xl font-semibold">verified</span>
 </div>
 <div class="flex flex-col text-left">
 <span class="text-[9px] font-semibold text-[var(--sys-brand-solid)] opacity-60">System Notification</span>
 <span class="text-xs font-semibold opacity-80">{{ toastMessage }}</span>
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
 }, 30000); 
});

onUnmounted(() => {
 if (timeTicker) clearInterval(timeTicker);
});

// Calendar Navigation State
const currentDate = ref(new Date()); 
const currentMonth = computed(() => currentDate.value.getMonth());
const currentYear = computed(() => currentDate.value.getFullYear());

const daysInMonth = computed(() => new Date(currentYear.value, currentMonth.value + 1, 0).getDate());
const emptyDays = computed(() => {
 let firstDayOfWeek = new Date(currentYear.value, currentMonth.value, 1).getDay();
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
 { label: 'Lọc trạng thái: Tất cả', value: '' },
 { label: 'Trạng thái: Sắp diễn ra', value: 'Sắp diễn ra' },
 { label: 'Trạng thái: Đã hoàn tất', value: 'Đã xong' },
 { label: 'Trạng thái: Bị hủy bỏ', value: 'Đã hủy' }
];

const interviewerOptions = computed(() => [
 { label: 'Người phụ trách: Tất cả', value: '' },
 ...danhSachNhanSu.map(ns => ({ label: ns.name, value: ns.id }))
]);

const interviewerFormOptions = computed(() => [
 { label: 'Chọn nhân sự chuyên môn phụ trách...', value: '' },
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
 case 'Đã hủy': return 'bg-[var(--sys-bg-page)] text-[var(--sys-text-secondary)] border-[var(--sys-border-subtle)]';
 default: return 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border-[var(--sys-border-subtle)]';
 }
};

const getCalendarEventClass = (status) => {
 switch(status) {
 case 'Quá hạn': return 'bg-[var(--sys-danger-solid)] text-white';
 case 'Sắp diễn ra': return 'bg-[var(--sys-brand-solid)] text-white';
 case 'Đã xong': return 'bg-[var(--sys-success-solid)] text-white';
 case 'Đã hủy': return 'bg-[var(--sys-bg-page)] text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)]';
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
 if (direction === 'next') nextMonth();
 else prevMonth();
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
 const targetDateTime = parseDateTime(newDayStr, interview.time);
 
 if (targetDateTime < currentTime.value) {
 triggerToast('KHÔNG THỂ DỜI LỊCH VỀ QUÁ KHỨ');
 return;
 }

 if (interview.date !== newDayStr) {
 interview.date = newDayStr;
 triggerToast(`ĐÃ DỜI LỊCH PHỎNG VẤN SANG NGÀY ${day}`);
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
 if (!form.value.candidate) return showAlert('Thiếu dữ liệu', 'Vui lòng cung cấp danh tính ứng viên thụ hưởng');
 if (isEditMode.value) {
 const idx = interviewList.value.findIndex(i => i.id === editingId.value);
 interviewList.value[idx] = { ...form.value, id: editingId.value };
 triggerToast('ĐÃ CẬP NHẬT LỊCH TRÌNH THÀNH CÔNG');
 } else {
 interviewList.value.push({ ...form.value, id: Date.now() });
 triggerToast('ĐÃ KHỞI TẠO LỊCH TRÌNH MỚI');
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
 triggerToast('ĐÃ LƯU KẾT LUẬN THẨM ĐỊNH AI');
}

const handleCancelInterview = async (interview) => {
 const ok = await showConfirm('XÁC THỰC HỦY BỎ', `Bạn có chắc chắn muốn đình chỉ lịch trình của ${interview.candidate}?`);
 if (ok) {
 interview.status = 'Đã hủy';
 triggerToast('ĐÃ HỦY BỎ LỊCH TRÌNH PHỎNG VẤN');
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
 transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.calendar-slide-enter-from {
 opacity: 0;
 transform: translateX(50px) scale(0.98);
}
.calendar-slide-leave-to {
 opacity: 0;
 transform: translateX(-50px) scale(0.98);
}

.custom-scrollbar::-webkit-scrollbar {
 width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
 background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
 background: var(--sys-border-subtle);
 border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
 background: var(--sys-brand-solid);
}

@keyframes in {
 from { opacity: 0; transform: translateY(20px); }
 to { opacity: 1; transform: translateY(0); }
}
.animate-in {
 animation: in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.toast-slide-enter-active, .toast-slide-leave-active {
 transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-slide-enter-from {
 opacity: 0;
 transform: translateX(100%);
}
.toast-slide-leave-to {
 opacity: 0;
 transform: translateX(100%);
}
</style>
