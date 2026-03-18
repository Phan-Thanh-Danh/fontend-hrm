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
                <tr v-for="candidate in filteredCandidates" :key="candidate.id" 
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
          
          <div v-if="filteredCandidates.length === 0" class="flex flex-col items-center justify-center py-12 bg-[var(--sys-bg-page)]/20 border-t border-[var(--sys-border-subtle)]">
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
              <span class="text-[12px] font-bold text-[var(--sys-text-primary)] uppercase tracking-widest truncate max-w-[200px]">CV_{{ activeCandidate.name.toUpperCase().replace(/\s/g, '_') }}.PDF</span>
            </div>
            <div class="flex gap-1">
              <button class="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all text-[var(--sys-text-secondary)]">
                <span class="material-symbols-outlined text-[18px]">zoom_in</span>
              </button>
              <button class="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all text-[var(--sys-text-secondary)]">
                <span class="material-symbols-outlined text-[18px]">download</span>
              </button>
            </div>
          </div>
          
          <!-- Mock PDF Viewer -->
          <div class="flex-grow p-6 flex flex-col items-center justify-center bg-[var(--sys-bg-hover)]/20 relative">
            <div class="bg-white rounded-md p-6 shadow-xl border border-[var(--sys-border-subtle)] w-full max-w-[260px] aspect-[1/1.4] flex flex-col gap-5 relative group/pdf">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-[var(--sys-bg-page)] rounded-md border border-[var(--sys-border-subtle)] flex items-center justify-center">
                  <span class="material-symbols-outlined text-[var(--sys-text-disabled)] text-[24px]">person</span>
                </div>
                <div class="space-y-2 flex-1">
                  <div class="w-full h-2.5 bg-[var(--sys-bg-hover)] rounded-full"></div>
                  <div class="w-2/3 h-2 bg-[var(--sys-bg-hover)] rounded-full opacity-60"></div>
                </div>
              </div>
              <div class="space-y-3 pt-4 border-t border-[var(--sys-border-subtle)] border-dashed">
                <div v-for="w in [100, 100, 80, 90, 70]" :key="w" :class="`h-1.5 bg-[var(--sys-bg-hover)] rounded-full opacity-40 w-[${w}%]`"></div>
              </div>
            </div>
          </div>

          <!-- Decision Panel -->
          <div class="p-5 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface)]">
            <div v-if="needsScheduling(activeCandidate)" class="animate-fadeIn">
              <h4 class="text-[12px] font-bold text-[var(--sys-brand-solid)] flex items-center gap-2 mb-5 uppercase tracking-wide">
                <span class="material-symbols-outlined text-[18px]">event</span> Lên lịch phỏng vấn
              </h4>
              <div class="grid grid-cols-2 gap-3 mb-5">
                <div class="space-y-1.5">
                  <label class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider ml-1">Ngày chọn</label>
                  <input type="date" class="w-full h-9 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-[13px] font-medium text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm">
                </div>
                <div class="space-y-1.5">
                  <label class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider ml-1">Giờ hẹn</label>
                  <input type="time" class="w-full h-9 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-[13px] font-medium text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm">
                </div>
              </div>
              <button class="w-full h-10 bg-[var(--sys-brand-solid)] text-white rounded-md text-[13px] font-bold hover:brightness-90 shadow-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wide">
                <span class="material-symbols-outlined text-[20px]">send</span>
                Gửi triệu tập phỏng vấn
              </button>
            </div>

            <div v-else class="animate-fadeIn">
              <h4 class="text-[12px] font-bold text-[var(--sys-brand-solid)] flex items-center gap-2 mb-5 uppercase tracking-wide">
                <span class="material-symbols-outlined text-[18px]">fact_check</span> Quyết định tuyển dụng
              </h4>
              <div class="mb-5">
                <label class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider ml-1 block mb-2">Nhận định chuyên môn *</label>
                <textarea class="w-full h-24 p-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-[13px] font-medium text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm resize-none" placeholder="Nhập nhận xét đánh giá..."></textarea>
              </div>
              <div class="flex items-center gap-8 mb-6 px-1">
                <label class="flex items-center gap-2 cursor-pointer text-[var(--sys-success-text)]">
                  <input type="radio" :name="'res_' + activeCandidate.id" class="w-4 h-4 accent-[var(--sys-success-solid)]">
                  <span class="text-[12px] font-bold uppercase tracking-wide">Phê duyệt</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer text-[var(--sys-danger-text)]">
                  <input type="radio" :name="'res_' + activeCandidate.id" class="w-4 h-4 accent-[var(--sys-danger-solid)]">
                  <span class="text-[12px] font-bold uppercase tracking-wide">Từ chối</span>
                </label>
              </div>
              <button class="w-full h-10 bg-[var(--sys-text-primary)] text-white rounded-md text-[13px] font-bold hover:brightness-90 shadow-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wide">
                Hồ sơ quyết nghị
              </button>
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
          <button class="text-[12px] font-bold text-[var(--sys-brand-solid)] hover:underline flex items-center justify-center gap-1 mx-auto uppercase tracking-wide">
            Truy xuất toàn bộ danh mục hồ sơ
            <span class="material-symbols-outlined text-[18px]">keyboard_double_arrow_right</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * TRANG QUẢN TRỊ TUYỂN DỤNG - PHIÊN BẢN ENTERPRISE SaaS
 * Tuân thủ 7 Golden Rules:
 * - Font Inter 14px (text-sm), Tỉ lệ Table cao (text-13px)
 * - Bo góc chuẩn B2B: 6px (MD) cho Input/Button, 8px (LG) cho Card/Thẻ/Table
 * - Hệ màu Blue/White đồng bộ cho Action Icons
 */
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Dropdown from '@/components/Dropdown.vue';

const route = useRoute();
const activeCandidateId = ref(1);
const searchQuery = ref('');
const filterPosition = ref('');
const filterAiScore = ref('');

const positionOptions = [
  { label: 'Vị trí: Tất cả', value: '' },
  { label: 'Senior Frontend', value: 'Senior Frontend' },
  { label: 'UI/UX Visual', value: 'UI/UX Designer' },
  { label: 'Backend Dev', value: 'Backend Dev' }
];

const aiScoreOptions = [
  { label: 'AI: Mặc định', value: '' },
  { label: 'AI: > 80%', value: '80' },
  { label: 'AI: > 90%', value: '90' }
];

const candidates = ref([
  { id: 1, name: 'Nguyễn Văn Anh', position: 'Senior Frontend', aiScore: 95, date: '12/10/2023', status: 'pass', interviewDate: '2023-10-15' },
  { id: 2, name: 'Trần Thị Bích', position: 'UI/UX Designer', aiScore: 88, date: '11/10/2023', status: 'pending', interviewDate: '2026-12-01' },
  { id: 3, name: 'Lê Văn Chính', position: 'Backend Dev', aiScore: 72, date: '10/10/2023', status: 'fail', interviewDate: '2023-10-10' },
  { id: 4, name: 'Phạm Thành Đạt', position: 'Business Analyst', aiScore: 92, date: '09/10/2023', status: 'pass', interviewDate: '2023-10-11' },
  { id: 5, name: 'Vũ Đức Minh', position: 'DevOps Engineer', aiScore: 68, date: '08/10/2023', status: 'fail', interviewDate: null },
  { id: 6, name: 'Hoàng Phương My', position: 'Product Owner', aiScore: 85, date: '05/10/2023', status: 'pass', interviewDate: '2023-10-06' }
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
