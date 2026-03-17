<template>
 <div class="space-y-8 pb-10">
 <!-- Header -->
 <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 bg-transparent text-left">
 <div class="bg-transparent text-left">
 <h1 class="text-2xl font-semibold text-[var(--sys-text-primary)] mb-1 ">Quản trị Tuyển dụng</h1>
 <p class="text-[10px] text-[var(--sys-text-secondary)] font-semibold opacity-60">Sàng lọc hồ sơ thông minh, điều phối phỏng vấn và đánh giá năng lực ứng viên toàn diện.</p>
 </div>
 <div class="bg-transparent text-right hidden xl:block">
 <div class="inline-flex items-center gap-4 bg-[var(--sys-bg-surface)] px-6 py-3 rounded-2xl border border-[var(--sys-border-subtle)] shadow-sm font-semibold text-[10px] text-[var(--sys-brand-solid)]">
 <span class="w-2 h-2 rounded-full bg-[var(--sys-brand-solid)] animate-ping"></span>
 AI Matching Engine Online
 </div>
 </div>
 </div>

 <!-- Main Content Split -->
 <div class="grid grid-cols-1 xl:grid-cols-12 gap-8 bg-transparent">
 <!-- Left Column: Filter & Table -->
 <div class="xl:col-span-7 space-y-8 bg-transparent">
 <!-- Filters -->
 <div class="bg-[var(--sys-bg-surface)] p-2 rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm">
 <div class="flex flex-col md:flex-row items-center gap-3">
 <div class="flex-1 w-full relative group">
 <span class="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-xl text-[var(--sys-text-secondary)] opacity-40 group-focus-within:text-[var(--sys-brand-solid)] transition-all">search</span>
 <input 
 v-model="searchQuery"
 type="text" 
 placeholder="Tìm tin tuyển dụng, tên ứng viên..." 
 class="w-full h-12 pl-14 pr-6 bg-transparent border-none rounded-2xl text-sm font-semibold focus:outline-none transition-all text-[var(--sys-text-primary)] "
 >
 </div>
 <div class="flex items-center gap-3 w-full md:w-auto shrink-0 pr-2">
 <Dropdown 
 v-model="filterPosition"
 :options="positionOptions"
 class="min-w-[160px]"
 />
 <Dropdown 
 v-model="filterAiScore"
 :options="aiScoreOptions"
 class="min-w-[140px]"
 />
 </div>
 </div>
 </div>

 <!-- Candidate Table -->
 <div class="bg-[var(--sys-bg-surface)] rounded-[3rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden text-sm">
 <div class="overflow-x-auto custom-scrollbar">
 <table class="min-w-max w-full text-left border-separate border-spacing-0 bg-transparent">
 <thead>
 <tr>
 <th class="whitespace-nowrap px-10 py-5 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-white">Hồ sơ ứng tuyển</th>
 <th class="whitespace-nowrap px-8 py-5 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-white">Vị trí kỳ vọng</th>
 <th class="whitespace-nowrap px-8 py-5 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-white text-center">Xác thực AI</th>
 <th class="whitespace-nowrap px-10 py-5 text-[10px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-white text-right">Ngày nộp</th>
 </tr>
 </thead>
 <tbody class="bg-transparent text-left">
 <tr v-for="(candidate, index) in filteredCandidates" :key="candidate.id" 
 @click="activeCandidateId = candidate.id"
 class="group transition-all duration-300 cursor-pointer text-left"
 :class="activeCandidateId === candidate.id ? 'bg-white' : 'bg-transparent hover:bg-[var(--sys-bg-hover)]'">
 <td class="whitespace-nowrap px-10 py-4 relative bg-transparent border-b border-[var(--sys-border-subtle)]">
 <div class="flex flex-col bg-transparent text-left truncate max-w-[200px]">
 <p class="text-sm font-semibold text-[var(--sys-text-primary)] bg-transparent mb-0.5 truncate">{{ candidate.name }}</p>
 <p class="text-[9px] font-semibold text-[var(--sys-brand-solid)] bg-transparent opacity-60">ID: CAND-{{ candidate.id }}</p>
 </div>
 </td>
 <td class="whitespace-nowrap px-8 py-4 text-[var(--sys-text-secondary)] font-semibold bg-transparent border-b border-[var(--sys-border-subtle)] text-xs opacity-80">{{ candidate.position }}</td>
 <td class="whitespace-nowrap px-8 py-4 text-center bg-transparent border-b border-[var(--sys-border-subtle)]">
 <span :class="['px-4 py-1.5 rounded-xl text-[9px] font-semibold border transition-all shadow-sm ', getAiScoreClass(candidate.aiScore)]">
 Duyệt: {{ candidate.aiScore }}%
 </span>
 </td>
 <td class="whitespace-nowrap px-10 py-4 text-right bg-transparent border-b border-[var(--sys-border-subtle)]">
 <span class="text-[10px] font-semibold text-[var(--sys-text-secondary)] opacity-40 ">{{ candidate.date }}</span>
 </td>
 </tr>
 </tbody>
 </table>
 </div>
 
 <div v-if="filteredCandidates.length === 0" class="flex flex-col items-center justify-center py-20 bg-[var(--sys-bg-page)]/30 border-t border-[var(--sys-border-subtle)] border-dashed">
 <div class="w-16 h-16 bg-[var(--sys-bg-surface)] rounded-2xl flex items-center justify-center shadow-lg mb-6 opacity-20">
 <span class="material-symbols-outlined text-4xl">travel_explore</span>
 </div>
 <p class="text-[10px] font-semibold text-[var(--sys-text-secondary)] opacity-40">Không tìm thấy ứng viên đáp ứng bộ lọc</p>
 </div>
 </div>
 </div>

 <!-- Right Column: CV Preview & AI -->
 <div class="xl:col-span-5 h-full bg-transparent">
 <div class="bg-[var(--sys-bg-surface)] rounded-[3rem] border border-[var(--sys-border-subtle)] shadow-sm h-full overflow-hidden flex flex-col group/cv">
 <!-- CV Preview Header -->
 <div class="px-10 py-6 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-[var(--sys-bg-page)]/20">
 <div class="flex items-center gap-3">
 <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-xl opacity-60">picture_as_pdf</span>
 <span class="text-[9px] font-semibold text-[var(--sys-text-secondary)] opacity-50">CV_{{ activeCandidate.name.toUpperCase().replace(/\s/g, '_') }}.PDF</span>
 </div>
 <div class="flex gap-2">
 <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-[var(--sys-text-secondary)] hover:text-[var(--sys-brand-solid)] border border-[var(--sys-border-subtle)] transition-all shadow-sm active:scale-95">
 <span class="material-symbols-outlined text-xl">zoom_in</span>
 </button>
 <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-[var(--sys-text-secondary)] hover:text-[var(--sys-brand-solid)] border border-[var(--sys-border-subtle)] transition-all shadow-sm active:scale-95">
 <span class="material-symbols-outlined text-xl">file_download</span>
 </button>
 </div>
 </div>
 
 <!-- CV Preview Body (Mock) -->
 <div class="flex-grow p-12 flex flex-col items-center justify-center bg-[var(--sys-bg-hover)]/30 relative overflow-hidden">
 <div class="bg-white rounded-[2rem] p-10 shadow-2xl border border-[var(--sys-border-subtle)] w-full max-w-sm aspect-[1/1.4] flex flex-col gap-8 relative overflow-hidden transition-all duration-700 group-cv:scale-[1.02] group-cv:rotate-1">
 <div class="absolute -right-20 -top-20 w-48 h-48 bg-[var(--sys-brand-soft)] rounded-full opacity-40 blur-3xl"></div>
 
 <div class="flex items-center gap-6">
 <div class="w-20 h-20 bg-[var(--sys-bg-hover)] rounded-3xl border-2 border-[var(--sys-border-subtle)] border-dashed shrink-0 flex items-center justify-center overflow-hidden">
 <span class="material-symbols-outlined text-[var(--sys-text-secondary)] opacity-10 text-5xl">person_account</span>
 </div>
 <div class="space-y-4 flex-1">
 <div class="w-full h-4 bg-[var(--sys-bg-hover)] rounded-full"></div>
 <div class="w-2/3 h-3 bg-[var(--sys-bg-hover)] rounded-full opacity-60"></div>
 </div>
 </div>
 
 <div class="space-y-4 pt-10 border-t border-[var(--sys-border-subtle)] border-dashed">
 <div class="w-full h-2.5 bg-[var(--sys-bg-hover)] rounded-full opacity-40"></div>
 <div class="w-full h-2.5 bg-[var(--sys-bg-hover)] rounded-full opacity-40"></div>
 <div class="w-4/5 h-2.5 bg-[var(--sys-bg-hover)] rounded-full opacity-40"></div>
 <div class="w-full h-2.5 bg-[var(--sys-bg-hover)] rounded-full opacity-40"></div>
 </div>

 <div class="space-y-4 mt-auto">
 <div class="w-full h-2.5 bg-[var(--sys-brand-soft)] rounded-full"></div>
 <div class="w-2/3 h-2.5 bg-[var(--sys-brand-soft)] rounded-full"></div>
 <div class="w-1/2 h-2.5 bg-[var(--sys-brand-soft)] rounded-full"></div>
 </div>
 </div>
 </div>

 <!-- Assessment -->
 <div class="p-10 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface)] space-y-10 group/assess">
 <div v-if="needsScheduling(activeCandidate)" class="animate-in fade-in slide-in-from-bottom-2 duration-500">
 <h4 class="text-[10px] font-semibold text-[var(--sys-brand-solid)] flex items-center gap-4 mb-8 bg-transparent">
 <span class="material-symbols-outlined text-2xl font-normal text-[var(--sys-brand-solid)] opacity-60">event_repeat</span> Thiết lập lịch trình phỏng vấn
 </h4>
 <div class="grid grid-cols-2 gap-8 mb-8 bg-transparent text-left">
 <div class="space-y-2.5 bg-transparent text-left">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60 block">Ngày ấn định</label>
 <input type="date" class="w-full px-6 py-4 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-semibold focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-inner outline-none">
 </div>
 <div class="space-y-2.5 bg-transparent text-left">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60 block">Thời điểm</label>
 <input type="time" class="w-full px-6 py-4 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-semibold focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-inner outline-none">
 </div>
 </div>
 <button class="w-full py-5 bg-[var(--sys-brand-solid)] text-white rounded-[2rem] text-[10px] font-semibold hover:bg-[var(--sys-brand-hover)] shadow-2xl shadow-[var(--sys-brand-solid)]/20 transition-all flex items-center justify-center gap-4 active:scale-95 ">
 <span class="material-symbols-outlined text-xl">forward_to_inbox</span>
 Phê chuẩn & Triệu tập ứng viên
 </button>
 </div>

 <div v-else class="animate-in fade-in slide-in-from-bottom-2 duration-500">
 <h4 class="text-[10px] font-semibold text-[var(--sys-brand-solid)] flex items-center gap-4 mb-8 bg-transparent">
 <span class="material-symbols-outlined text-2xl font-normal text-[var(--sys-brand-solid)] opacity-60">rate_review</span> Thẩm định kết quả thực chiến
 </h4>
 <div class="mb-8 bg-transparent text-left">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60 block mb-2.5">Ghi chú chuyên môn *</label>
 <textarea class="w-full px-8 py-6 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-[2.5rem] text-sm font-semibold focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] resize-none shadow-inner outline-none" rows="4" placeholder="Cung cấp nhận xét chi tiết về trình độ chuyên môn, thái độ và khả năng thích nghi..."></textarea>
 </div>
 <div class="flex items-center gap-12 mb-10 px-4 bg-transparent">
 <label class="flex items-center gap-4 cursor-pointer group text-[var(--sys-success-text)] bg-transparent">
 <input type="radio" :name="'result_' + activeCandidate.id" class="w-8 h-8 accent-[var(--sys-success-solid)] cursor-pointer">
 <span class="text-xs font-semibold group-hover:translate-x-1 transition-transform">PHÊ DUYỆT (PASS)</span>
 </label>
 <label class="flex items-center gap-4 cursor-pointer group text-[var(--sys-danger-text)] bg-transparent">
 <input type="radio" :name="'result_' + activeCandidate.id" class="w-8 h-8 accent-[var(--sys-danger-solid)] cursor-pointer">
 <span class="text-xs font-semibold group-hover:translate-x-1 transition-transform">LOẠI BỎ (FAIL)</span>
 </label>
 </div>
 <button class="w-full py-5 bg-[var(--sys-text-primary)] text-white rounded-[2rem] text-[10px] font-semibold hover:opacity-90 shadow-2xl shadow-black/20 transition-all flex items-center justify-center gap-4 active:scale-95 ">
 <span class="material-symbols-outlined text-xl">fact_check</span>
 Xác nhận quyết định
 </button>
 </div>
 </div>
 </div>
 </div>
 </div>

 <!-- Bottom Lists Section -->
 <div class="bg-[var(--sys-bg-surface)] rounded-[3rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col">
 <!-- Standardized Tabs -->
 <div class="flex items-center gap-2 p-3 bg-[var(--sys-bg-page)]/20 border-b border-[var(--sys-border-subtle)]">
 <button class="px-10 py-3.5 rounded-[1.5rem] text-[10px] font-semibold bg-white text-[var(--sys-brand-solid)] shadow-sm border border-[var(--sys-border-subtle)] flex items-center gap-3">
 <span class="w-1.5 h-1.5 rounded-full bg-[var(--sys-brand-solid)]"></span>
 Đội ngũ trúng tuyển (12)
 </button>
 <button class="px-10 py-3.5 rounded-[1.5rem] text-[10px] font-semibold text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] transition-all opacity-40">
 Hồ sơ lưu trữ (45)
 </button>
 </div>

 <!-- Horizontal scroll list -->
 <div class="p-12 bg-transparent text-left overflow-hidden">
 <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 bg-transparent">
 <div v-for="i in 4" :key="i" 
 class="p-8 rounded-[2.5rem] border border-[var(--sys-border-subtle)] hover:bg-[var(--sys-brand-soft)] hover:border-[var(--sys-brand-border)] transition-all duration-500 flex items-center justify-between group bg-[var(--sys-bg-page)]/30 hover:scale-[1.03] hover:shadow-2xl">
 <div class="flex flex-col bg-transparent text-left truncate">
 <h6 class="text-sm font-semibold text-[var(--sys-text-primary)] mb-1.5 bg-transparent group-hover:text-[var(--sys-brand-solid)] transition-colors">{{ i === 1 ? 'Phan Thành' : (i === 2 ? 'Hoàng My' : (i === 3 ? 'Vũ Duy' : 'Khánh Linh')) }}</h6>
 <span class="text-[9px] font-semibold text-[var(--sys-brand-solid)] bg-transparent opacity-60">
 {{ i === 1 ? 'iOS Developer' : (i === 2 ? 'Product Owner' : (i === 3 ? 'Data Scientist' : 'QA Engineer')) }}
 </span>
 </div>
 <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-[var(--sys-text-secondary)] opacity-0 group-hover:opacity-100 transition-all border border-[var(--sys-border-subtle)] hover:text-[var(--sys-brand-solid)] hover:border-[var(--sys-brand-solid)] shadow-sm active:scale-90">
 <span class="material-symbols-outlined text-xl">contact_page</span>
 </button>
 </div>
 </div>

 <div class="text-center pt-10 border-t border-[var(--sys-border-subtle)] border-dashed bg-transparent">
 <button class="inline-flex items-center gap-4 text-[10px] font-semibold text-[var(--sys-brand-solid)] hover:opacity-60 transition-all group">
 Truy xuất toàn bộ 12 hồ sơ trúng tuyển
 <span class="material-symbols-outlined text-lg group-hover:translate-x-2 transition-transform">trending_flat</span>
 </button>
 </div>
 </div>
 </div>
 </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Dropdown from '@/components/Dropdown.vue';
import { useConfirm } from '@/composables/useConfirm';

const { showAlert, showConfirm } = useConfirm();
const route = useRoute();
const activeCandidateId = ref(1);
const searchQuery = ref('');
const filterPosition = ref('');
const filterAiScore = ref('');

const positionOptions = [
 { label: 'Tương hợp vị trí: Tất cả', value: '' },
 { label: 'Senior Frontend Engineer', value: 'Senior Frontend' },
 { label: 'UI/UX Visual Architect', value: 'UI/UX Designer' },
 { label: 'Backend Development', value: 'Backend Dev' }
];

const aiScoreOptions = [
 { label: 'Ngưỡng AI: Mặc định', value: '' },
 { label: 'Vượt ngưỡng > 80%', value: '80' },
 { label: 'Vượt ngưỡng > 90%', value: '90' }
];

const candidates = ref([
 { id: 1, name: 'Nguyễn Văn Anh', position: 'Senior Frontend', aiScore: 95, date: '12/10/2023', status: 'pass', initial: 'NA', interviewDate: '2023-10-15' },
 { id: 2, name: 'Trần Thị Bích', position: 'UI/UX Designer', aiScore: 88, date: '11/10/2023', status: 'pending', initial: 'TB', interviewDate: '2026-12-01' },
 { id: 3, name: 'Lê Văn Chính', position: 'Backend Dev', aiScore: 72, date: '10/10/2023', status: 'fail', initial: 'LC', interviewDate: '2023-10-10' },
 { id: 4, name: 'Phạm Thành Đạt', position: 'Business Analyst', aiScore: 92, date: '09/10/2023', status: 'pass', initial: 'PĐ', interviewDate: '2023-10-11' },
 { id: 5, name: 'Vũ Đức Minh', position: 'DevOps Engineer', aiScore: 68, date: '08/10/2023', status: 'fail', initial: 'VM', interviewDate: null },
 { id: 6, name: 'Hoàng Phương My', position: 'Product Owner', aiScore: 85, date: '05/10/2023', status: 'pass', initial: 'HM', interviewDate: '2023-10-06' }
]);

const activeCandidate = computed(() => {
 return candidates.value.find(c => c.id === activeCandidateId.value) || candidates.value[0];
});

const needsScheduling = (candidate) => {
 if (!candidate || !candidate.interviewDate) return true;
 return new Date(candidate.interviewDate) > new Date(); 
};

const filteredCandidates = computed(() => {
 const currentStatus = route.query.status;
 let list = candidates.value;

 if (currentStatus === 'pass') {
 list = list.filter(c => c.status === 'pass');
 } else if (currentStatus === 'fail') {
 list = list.filter(c => c.status === 'fail');
 }

 if (filterAiScore.value) {
 list = list.filter(c => c.aiScore >= parseInt(filterAiScore.value));
 }

 if (filterPosition.value) {
 list = list.filter(c => c.position === filterPosition.value);
 }

 if (searchQuery.value) {
 const q = searchQuery.value.toLowerCase();
 list = list.filter(c => c.name.toLowerCase().includes(q));
 }

 return list;
});

const getAiScoreClass = (score) => {
 if (score >= 80) return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
 if (score >= 70) return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]';
 return 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]';
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
 background: var(--sys-border-subtle);
 border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
 background: var(--sys-brand-solid);
}

@keyframes in {
 from { opacity: 0; transform: translateY(8px); }
 to { opacity: 1; transform: translateY(0); }
}
.animate-in {
 animation: in 0.4s ease-out forwards;
}
</style>
