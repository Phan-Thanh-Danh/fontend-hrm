<template>
  <div class="space-y-6 pb-8">
    <!-- Header Area -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left">
      <div class="bg-transparent text-left">
        <h1 class="text-xl font-semibold text-[var(--sys-text-primary)] mb-1">Quản lý Tuyển dụng & Thu hút Nhân tài</h1>
        <p class="text-sm text-[var(--sys-text-secondary)]">Sàng lọc hồ sơ, điều phối phỏng vấn và đánh giá năng lực ứng viên toàn diện.</p>
      </div>
      <div class="bg-transparent hidden xl:block shrink-0">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--sys-brand-soft)] rounded-md border border-[var(--sys-brand-border)] font-bold text-[11px] text-[var(--sys-brand-solid)] uppercase tracking-wide">
          <span class="w-1.5 h-1.5 rounded-full bg-[var(--sys-brand-solid)] animate-pulse"></span>
          AI Tuyển dụng Trực tuyến
        </div>
      </div>
    </div>

    <!-- Main Content Split -->
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
      <!-- Left Column: Pipeline & List -->
      <div class="xl:col-span-7 space-y-4 flex flex-col">
        <!-- Toolbar Filters -->
        <div class="bg-[var(--sys-bg-surface)] px-4 py-3 rounded-lg border border-[var(--sys-border-subtle)] shadow-sm">
          <div class="flex flex-row items-center gap-3 bg-transparent">
            <!-- Search Bar - Optimized for visibility -->
            <div class="flex-1 relative group bg-transparent">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[var(--sys-brand-solid)]">search</span>
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Tìm tên ứng viên, vị trí..." 
                class="w-full h-10 pl-10 pr-4 bg-white border border-[var(--sys-border-strong)] rounded-md text-[13px] font-medium text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm transition-all placeholder:text-[var(--sys-text-disabled)]"
              >
            </div>
            
            <!-- Compact Dropdowns (Ultra Compact) -->
            <div class="flex items-center gap-2 shrink-0 bg-transparent">
              <Dropdown v-model="filterPosition" :options="positionOptions" class="min-w-[125px] max-w-[180px] h-10" />
              <Dropdown v-model="filterAiScore" :options="aiScoreOptions" class="min-w-[110px] max-w-[160px] h-10" />
            </div>
          </div>
        </div>

        <!-- Candidate Data Table -->
        <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex-grow flex flex-col">
          <div class="overflow-x-auto custom-scrollbar flex-grow">
            <table class="w-full text-left border-collapse">
              <thead class="bg-[var(--sys-bg-page)]">
                <tr>
                  <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider">Hồ sơ ứng viên</th>
                  <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider">Vị trí</th>
                  <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider text-center">Chỉ số AI</th>
                  <th class="px-4 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-wider text-right">Ngày nộp</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[var(--sys-border-subtle)]">
                <tr v-for="candidate in paginatedCandidates" :key="candidate.id" 
                  @click="activeCandidateId = candidate.id"
                  class="group cursor-pointer transition-colors"
                  :class="activeCandidateId === candidate.id ? 'bg-[var(--sys-brand-soft)]/50' : 'hover:bg-[var(--sys-bg-hover)]'">
                  <td class="px-4 py-3 whitespace-nowrap bg-transparent">
                    <div class="flex flex-col bg-transparent">
                      <span class="text-[13px] font-semibold text-[var(--sys-text-primary)] mb-0.5 truncate max-w-[180px]">{{ candidate.name }}</span>
                      <span class="text-[11px] font-bold text-[var(--sys-brand-solid)] opacity-60 uppercase tracking-tight">CAND-{{ candidate.id }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap bg-transparent">
                    <span class="text-[12px] font-semibold text-[var(--sys-text-secondary)] uppercase tracking-wide opacity-80">{{ candidate.position }}</span>
                  </td>
                  <td class="px-4 py-3 text-center whitespace-nowrap bg-transparent">
                    <span :class="['px-2 py-0.5 rounded-md text-[11px] font-bold border shadow-sm uppercase tracking-wide', getAiScoreClass(candidate.aiScore)]">
                      Hợp lệ: {{ candidate.aiScore }}%
                    </span>
                  </td>
                  <td class="px-4 py-3 text-right whitespace-nowrap bg-transparent">
                    <span class="text-[12px] font-medium text-[var(--sys-text-disabled)] opacity-60">{{ candidate.date }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination Footer -->
          <div class="px-4 py-3 bg-[var(--sys-bg-page)]/50 border-t border-[var(--sys-border-subtle)] flex justify-between items-center text-[11px] font-bold text-[var(--sys-text-secondary)]">
            <span class="uppercase tracking-widest opacity-60">Hiển thị {{ paginatedCandidates.length }} / {{ filteredCandidates.length }} hồ sơ</span>
            <div class="flex items-center gap-1.5">
              <button 
                @click="currentPage > 1 ? currentPage-- : null"
                :disabled="currentPage === 1"
                :class="['w-7 h-7 flex items-center justify-center rounded-md border border-[var(--sys-border-subtle)] transition-all', currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'bg-white hover:text-[var(--sys-brand-solid)]']"
              >
                <span class="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
              
              <div class="flex items-center gap-1 px-1">
                <span class="text-[var(--sys-text-primary)]">{{ currentPage }}</span>
                <span class="opacity-30">/</span>
                <span class="opacity-60">{{ totalPages }}</span>
              </div>

              <button 
                @click="currentPage < totalPages ? currentPage++ : null"
                :disabled="currentPage === totalPages"
                :class="['w-7 h-7 flex items-center justify-center rounded-md border border-[var(--sys-border-subtle)] transition-all', currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'bg-white hover:text-[var(--sys-brand-solid)]']"
              >
                <span class="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
          
          <div v-if="filteredCandidates.length === 0" class="flex flex-col items-center justify-center py-12 bg-[var(--sys-bg-page)]/20 border-t border-[var(--sys-border-subtle)] flex-grow">
            <span class="material-symbols-outlined text-4xl text-[var(--sys-text-disabled)] opacity-20 mb-2">find_in_page</span>
            <p class="text-[12px] font-semibold text-[var(--sys-text-disabled)] opacity-40 uppercase">Không tìm thấy kết quả</p>
          </div>
        </div>
      </div>

      <!-- Right Column: CV Insight & Decision -->
      <div class="xl:col-span-5 flex flex-col bg-transparent">
        <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm flex-grow overflow-hidden flex flex-col">
          <!-- CV Tab Header -->
          <div class="px-5 py-4 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-[var(--sys-bg-page)]/50">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-[20px]">description</span>
              <span class="text-[12px] font-bold text-[var(--sys-text-primary)] uppercase tracking-widest truncate max-w-[200px]">{{ activeCandidate?.name || 'Chọn hồ sơ' }}</span>
            </div>
            <div class="flex gap-1 items-center">
              <span v-if="activeCandidate" :class="['px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-wide', getStatusClass(activeCandidate.status)]">{{ activeCandidate.statusLabel }}</span>
            </div>
          </div>
          
          <!-- CV Link Info / Action -->
          <div class="p-4 bg-[var(--sys-bg-page)] border-b border-[var(--sys-border-subtle)] flex items-center justify-between" v-if="activeCandidate">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-[var(--sys-text-secondary)] text-[18px]">link</span>
              <a :href="activeCandidate.cvUrl" target="_blank" class="text-[13px] font-medium text-[var(--sys-brand-solid)] hover:underline flex items-center gap-1">
                Xem chi tiết CV / Portfolio (LinkedIn)
                <span class="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
            </div>
            <!-- If cover letter, we'll display below -->
          </div>

          <!-- Real PDF Viewer (Fallback context) -->
          <div class="flex-grow p-4 bg-[var(--sys-bg-hover)]/20 relative overflow-hidden hidden md:block">
            <iframe 
              src="/cv-template.pdf#toolbar=0" 
              class="w-full h-full border-none rounded-md shadow-lg bg-white opacity-40 hover:opacity-100 transition-opacity"
              title="CV Viewer"
            ></iframe>
          </div>

          <!-- Decision Panel -->
          <div class="p-5 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface)]" v-if="activeCandidate">
            <!-- Candidate Quick Info -->
            <div class="mb-4 p-4 rounded-md bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] space-y-2">
              <div class="flex justify-between items-start">
                <div>
                  <p class="text-[13px] font-bold text-[var(--sys-text-primary)]">{{ activeCandidate.name }}</p>
                  <p class="text-[11px] text-[var(--sys-text-secondary)]">{{ activeCandidate.email }} · {{ activeCandidate.phone }}</p>
                  <p class="text-[11px] text-[var(--sys-brand-solid)] font-bold mt-1">{{ activeCandidate.position }} — {{ activeCandidate.department }}</p>
                </div>
                <div class="text-right">
                  <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider mb-0.5">Mức lương kỳ vọng</p>
                  <p class="text-[13px] font-bold text-[var(--sys-text-primary)]">{{ activeCandidate.notes ? activeCandidate.notes.replace('Mức lương kỳ vọng:', '').trim() || 'Thỏa thuận' : 'Thỏa thuận' }}</p>
                </div>
              </div>

              <!-- Cover Letter Snippet -->
              <div v-if="activeCandidate.coverLetter" class="mt-3 p-2.5 bg-white border border-[var(--sys-border-subtle)] rounded shadow-sm">
                <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1 flex items-center gap-1">
                  <span class="material-symbols-outlined text-[14px]">format_quote</span> Thư tự giới thiệu
                </p>
                <p class="text-[12px] text-[var(--sys-text-primary)] italic line-clamp-3">"{{ activeCandidate.coverLetter }}"</p>
              </div>

              <div class="flex items-center gap-2 pt-2 border-t border-[var(--sys-border-subtle)] mt-2">
                <span class="text-[10px] font-bold uppercase text-[var(--sys-text-disabled)] tracking-wider">AI MATCH SCORE:</span>
                <span :class="['px-1.5 py-0.5 rounded text-[10px] font-bold border', getAiScoreClass(activeCandidate.aiScore)]">{{ activeCandidate.aiScore }}%</span>
                <span class="text-[10px] text-[var(--sys-text-secondary)] italic truncate ml-1">{{ activeCandidate.aiRemarks?.substring(0, 50) }}...</span>
              </div>
            </div>

            <!-- STATE: CHỜ_HR_DUYỆT → nút Forward to Manager -->
            <div v-if="activeCandidate.status === 'pending_hr'" class="animate-fadeIn">
              <h4 class="text-[12px] font-bold text-[var(--sys-warning-text)] flex items-center gap-2 mb-4 uppercase tracking-wide">
                <span class="material-symbols-outlined text-[18px]">pending_actions</span> Chờ HR xét duyệt
              </h4>
              <div class="flex gap-3">
                <button @click="handleApproveToManager"
                  class="flex-1 h-10 bg-[var(--sys-brand-solid)] text-white rounded-md text-[13px] font-bold hover:brightness-90 shadow-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wide">
                  <span class="material-symbols-outlined text-[18px]">forward_to_inbox</span>
                  Chuyển Trưởng phòng
                </button>
                <button @click="handleFinalDecision('fail')"
                  class="flex-1 h-10 border border-[var(--sys-danger-border)] text-[var(--sys-danger-text)] rounded-md text-[13px] font-bold hover:bg-[var(--sys-danger-soft)] transition-all uppercase tracking-wide">
                  Từ chối
                </button>
              </div>
            </div>

            <!-- STATE: CHỜ_TP_DUYỆT → lên lịch phỏng vấn -->
            <div v-else-if="activeCandidate.status === 'pending_mgr'" class="animate-fadeIn">
              <h4 class="text-[12px] font-bold text-[var(--sys-brand-solid)] flex items-center gap-2 mb-4 uppercase tracking-wide">
                <span class="material-symbols-outlined text-[18px]">event</span> Chờ Trưởng phòng thẩm định → Lên lịch
              </h4>

              <!-- Display Manager's Review if available -->
              <div v-if="activeCandidate.managerReview" class="mb-5 p-3.5 rounded-md bg-[var(--sys-success-soft)] border border-[var(--sys-success-border)] shadow-sm">
                <p class="text-[11px] font-bold text-[var(--sys-success-text)] uppercase mb-1.5 flex items-center gap-1.5 tracking-wider">
                  <span class="material-symbols-outlined text-[16px]">rate_review</span> Yêu cầu Phỏng vấn từ Trưởng Phòng:
                </p>
                <p class="text-[13px] text-[var(--sys-text-primary)] italic font-semibold">"{{ activeCandidate.managerReview }}"</p>
              </div>
              <div v-else class="mb-5 p-3 rounded-md bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] border-dashed text-center">
                <p class="text-[11px] font-medium text-[var(--sys-text-disabled)] tracking-wide">Trạng thái: Đang chờ Trưởng phòng phản hồi thẩm định CV.</p>
              </div>

              <div class="grid grid-cols-2 gap-3 mb-4">
                <div class="space-y-1.5">
                  <label class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider ml-1">Ngày chọn</label>
                  <input type="date" v-model="interviewDate" class="w-full h-9 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-[13px] font-medium text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm">
                </div>
                <div class="space-y-1.5">
                  <label class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider ml-1">Giờ hẹn</label>
                  <input type="time" v-model="interviewTime" class="w-full h-9 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-[13px] font-medium text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm">
                </div>
              </div>
              <button @click="handleScheduleInterview"
                class="w-full h-10 bg-[var(--sys-brand-solid)] text-white rounded-md text-[13px] font-bold hover:brightness-90 shadow-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wide">
                <span class="material-symbols-outlined text-[20px]">send</span>
                Gửi triệu tập phỏng vấn
              </button>
            </div>

            <!-- STATE: ĐANG_PHỎNG_VẤN → Quyết định cuối -->
            <div v-else-if="activeCandidate.status === 'interviewing'" class="animate-fadeIn">
              <h4 class="text-[12px] font-bold text-purple-600 flex items-center gap-2 mb-4 uppercase tracking-wide">
                <span class="material-symbols-outlined text-[18px]">fact_check</span> Quyết định tuyển dụng
              </h4>
              <div v-if="activeCandidate.managerReview" class="mb-4 p-3 rounded-md bg-[var(--sys-brand-soft)] border border-[var(--sys-brand-border)]">
                <p class="text-[11px] font-bold text-[var(--sys-brand-solid)] uppercase mb-1">Đánh giá từ Trưởng phòng:</p>
                <p class="text-[13px] text-[var(--sys-text-primary)] italic">"{{ activeCandidate.managerReview }}"</p>
              </div>
              <div v-if="activeCandidate.interviewDate" class="mb-4 text-[12px] text-[var(--sys-text-secondary)]">
                <span class="font-bold">Lịch phỏng vấn:</span> {{ activeCandidate.interviewDate }}
              </div>
              <div class="flex items-center gap-4">
                <button @click="handleFinalDecision('pass')"
                  class="flex-1 h-10 bg-[var(--sys-success-solid)] text-white rounded-md text-[13px] font-bold hover:brightness-90 shadow-sm transition-all uppercase tracking-wide">Trúng tuyển</button>
                <button @click="handleFinalDecision('fail')"
                  class="flex-1 h-10 bg-[var(--sys-danger-solid)] text-white rounded-md text-[13px] font-bold hover:brightness-90 shadow-sm transition-all uppercase tracking-wide">Từ chối</button>
              </div>
            </div>

            <!-- STATE: TRÚNG_TUYỂN / TỪ_CHỐI → readonly -->
            <div v-else class="animate-fadeIn text-center py-4">
              <span :class="['px-4 py-2 rounded-lg text-[13px] font-bold border inline-block', getStatusClass(activeCandidate.status)]">{{ activeCandidate.statusLabel }}</span>
              <p class="text-[11px] text-[var(--sys-text-disabled)] mt-2">Hồ sơ đã được xử lý.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Lists Section -->
    <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden">
      <!-- Tabs Area -->
      <div class="flex items-center gap-2 p-2 bg-[var(--sys-bg-page)]/50 border-b border-[var(--sys-border-subtle)]">
        <button class="h-8 px-5 rounded-md text-[11px] font-bold bg-[var(--sys-brand-solid)] text-white shadow-sm flex items-center gap-2 uppercase tracking-wide">
          <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
          Đã trúng tuyển (12)
        </button>
        <button class="h-8 px-5 rounded-md text-[11px] font-bold text-[var(--sys-text-secondary)] hover:bg-[var(--sys-bg-hover)] transition-all uppercase tracking-wide">
          Kho lưu trữ (45)
        </button>
      </div>

      <!-- Result Cards Grid -->
      <div class="p-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="i in 4" :key="i" 
            class="p-3.5 rounded-lg border border-[var(--sys-border-subtle)] hover:border-[var(--sys-brand-solid)] transition-all flex items-center justify-between group bg-[var(--sys-bg-page)]/20 shadow-sm">
            <div class="flex flex-col bg-transparent">
              <h6 class="text-[13px] font-semibold text-[var(--sys-text-primary)] mb-0.5 group-hover:text-[var(--sys-brand-solid)]">{{ i === 1 ? 'Phan Thành' : (i === 2 ? 'Hoàng My' : (i === 3 ? 'Vũ Duy' : 'Khánh Linh')) }}</h6>
              <span class="text-[10px] font-bold text-[var(--sys-brand-solid)]/60 uppercase tracking-tight">
                {{ i === 1 ? 'iOS Developer' : (i === 2 ? 'Product Owner' : (i === 3 ? 'Data Scientist' : 'QA Engineer')) }}
              </span>
            </div>
            <button class="w-8 h-8 flex items-center justify-center rounded-md text-[var(--sys-text-secondary)] hover:bg-[var(--sys-brand-soft)] hover:text-[var(--sys-brand-solid)] transition-all" title="Xem chi tiết">
              <span class="material-symbols-outlined text-[20px]">visibility</span>
            </button>
          </div>
        </div>

        <div class="text-center pt-6 mt-6 border-t border-[var(--sys-border-subtle)] border-dashed">
          <button class="text-[12px] font-bold text-[var(--sys-brand-solid)] hover:opacity-80 transition-opacity flex items-center justify-center gap-1 mx-auto uppercase tracking-wide">
            Truy xuất toàn bộ danh mục hồ sơ
            <span class="material-symbols-outlined text-[18px]">keyboard_double_arrow_right</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import Dropdown from '@/components/Dropdown.vue';
import {
  useHRApplications,
  forwardToManager,
  scheduleInterview,
  finalizeCandidate,
  rejectApplication,
} from '@/composables/useRecruitmentStore';
import { useConfirm } from '@/composables/useConfirm';

const route = useRoute();
const { all: candidates, hrPipeline } = useHRApplications();
const { showAlert } = useConfirm();

const activeCandidateId = ref(null);
const searchQuery = ref('');
const filterPosition = ref('');
const filterAiScore = ref('');
const currentPage = ref(1);
const pageSize = 10;

const interviewDate = ref('');
const interviewTime = ref('');

// Auto-select first on load
watch(candidates, (list) => {
  if (!activeCandidateId.value && list.length > 0) {
    activeCandidateId.value = list[0].id;
  }
}, { immediate: true });

const positionOptions = computed(() => {
  const positions = [...new Set(candidates.value.map(c => c.position))];
  return [
    { label: 'Vị trí: Tất cả', value: '' },
    ...positions.map(p => ({ label: p, value: p }))
  ];
});

const aiScoreOptions = [
  { label: 'AI: Mặc định', value: '' },
  { label: 'AI: > 80%', value: '80' },
  { label: 'AI: > 90%', value: '90' }
];

const activeCandidate = computed(() => {
  return candidates.value.find(c => c.id === activeCandidateId.value) || candidates.value[0] || null;
});

const filteredCandidates = computed(() => {
  let list = candidates.value;
  const currentStatus = route.query.status;
  if (currentStatus === 'pass') list = list.filter(c => c.status === 'pass');
  else if (currentStatus === 'fail') list = list.filter(c => c.status === 'fail');
  if (filterAiScore.value) list = list.filter(c => c.aiScore >= parseInt(filterAiScore.value));
  if (filterPosition.value) list = list.filter(c => c.position === filterPosition.value);
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
  }
  return list;
});

const totalPages = computed(() => Math.ceil(filteredCandidates.value.length / pageSize) || 1);

const paginatedCandidates = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredCandidates.value.slice(start, start + pageSize);
});

watch([searchQuery, filterPosition, filterAiScore], () => { currentPage.value = 1; });

const getAiScoreClass = (score) => {
  if (score >= 90) return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
  if (score >= 75) return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]';
  return 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]';
};

const getStatusClass = (status) => {
  const map = {
    pending_hr:   'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]',
    pending_mgr:  'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)]',
    mgr_approved: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    interviewing: 'bg-purple-50 text-purple-700 border-purple-200',
    pass:         'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]',
    fail:         'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]',
  };
  return map[status] || map['pending_hr'];
};

// ACTION: HR phê duyệt → chuyển sang CHỜ_TP_DUYỆT
async function handleApproveToManager() {
  if (!activeCandidate.value) return;
  forwardToManager(activeCandidate.value.id, 'HR Admin');
  await showAlert('ĐÃ CHUYỂN', `Hồ sơ của ${activeCandidate.value.name} đã được chuyển tới Trưởng phòng ${activeCandidate.value.department}.`);
}

// ACTION: Lên lịch phỏng vấn
async function handleScheduleInterview() {
  if (!interviewDate.value || !interviewTime.value) {
    await showAlert('THIẾU THÔNG TIN', 'Vui lòng chọn ngày và giờ phỏng vấn!');
    return;
  }
  scheduleInterview(activeCandidate.value.id, interviewDate.value, interviewTime.value);
  await showAlert('THÀNH CÔNG', `Đã gửi lời mời phỏng vấn cho ${activeCandidate.value.name}.`);
  interviewDate.value = '';
  interviewTime.value = '';
}

// ACTION: Quyết định cuối (pass/fail)
async function handleFinalDecision(finalStatus) {
  finalizeCandidate(activeCandidate.value.id, finalStatus);
  const msg = finalStatus === 'pass' ? `Đã xác nhận TRÚNG TUYỂN cho ${activeCandidate.value.name}.` : `Đã từ chối hồ sơ của ${activeCandidate.value.name}.`;
  await showAlert('CẬP NHẬT', msg);
}
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

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
