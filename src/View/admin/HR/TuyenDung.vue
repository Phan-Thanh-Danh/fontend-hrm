<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="text-left bg-transparent">
        <h1 class="text-2xl font-black text-[var(--sys-text-primary)] tracking-tight italic uppercase">Quản lý Tuyển dụng</h1>
        <p class="text-[var(--sys-text-secondary)] text-sm font-medium italic bg-transparent">Quản lý tin tuyển dụng, theo dõi ứng viên và đánh giá hồ sơ bằng AI.</p>
      </div>
    </div>

    <!-- Main Content Split -->
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 bg-transparent">
      <!-- Left Column: Filter & Table -->
      <div class="xl:col-span-7 space-y-6 bg-transparent">
        <!-- Filters (Standardized h-11) -->
        <div class="bg-[var(--sys-bg-surface)] p-5 rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm mb-6">
          <div class="flex flex-col md:flex-row items-center gap-3">
            <div class="flex-1 w-full relative group">
              <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[18px] text-[var(--sys-text-secondary)] opacity-50 group-focus-within:text-[var(--sys-brand-solid)] transition-all">search</span>
              <input 
                type="text" 
                placeholder="Tìm tin tuyển dụng, tên ứng viên..." 
                class="w-full h-11 pl-11 pr-5 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold focus:outline-none focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)]"
              >
            </div>
            <div class="flex items-center gap-2 w-full md:w-auto shrink-0">
              <Dropdown 
                v-model="filterPosition"
                :options="positionOptions"
                placeholder="Vị trí"
              />
              <Dropdown 
                v-model="filterAiScore"
                :options="aiScoreOptions"
                placeholder="Điểm AI"
              />
            </div>
          </div>
        </div>

        <!-- Candidate Table -->
        <div class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden text-sm">
          <div class="overflow-x-auto custom-scrollbar">
            <table class="w-full text-left border-separate border-spacing-0 bg-transparent">
              <thead>
                <tr>
                  <th class="px-8 py-5 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]">Ứng viên</th>
                  <th class="px-6 py-5 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]">Vị trí</th>
                  <th class="px-6 py-5 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)] text-center">Điểm AI</th>
                  <th class="px-6 py-5 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]">Ngày nộp</th>
                </tr>
              </thead>
              <tbody class="bg-transparent text-left">
                <tr v-for="(candidate, index) in filteredCandidates" :key="candidate.id" 
                    @click="activeCandidateId = candidate.id"
                    class="group transition-all duration-300 cursor-pointer text-left"
                    :class="activeCandidateId === candidate.id ? 'bg-[var(--sys-brand-soft)]' : 'bg-[var(--sys-bg-surface)] hover:bg-[var(--sys-bg-hover)]'">
                  <td class="px-8 py-5 relative bg-transparent border-b border-[var(--sys-border-subtle)]" :class="activeCandidateId === candidate.id ? 'border-l-4 border-[var(--sys-brand-solid)]' : 'border-l-4 border-transparent'">
                    <div class="flex flex-col bg-transparent text-left">
                      <p class="text-sm font-black text-[var(--sys-text-primary)] bg-transparent">{{ candidate.name }}</p>
                      <p class="text-[10px] font-bold text-[var(--sys-brand-solid)] uppercase tracking-tight bg-transparent">ID: CAND-{{ candidate.id }}</p>
                    </div>
                  </td>
                  <td class="px-6 py-5 text-[var(--sys-text-secondary)] font-bold bg-transparent border-b border-[var(--sys-border-subtle)]">{{ candidate.position }}</td>
                  <td class="px-6 py-5 text-center bg-transparent border-b border(--sys-border-subtle)">
                    <span class="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border transition-all shadow-sm" :class="getAiScoreClass(candidate.aiScore)">
                      {{ candidate.aiScore }}/100
                    </span>
                  </td>
                  <td class="px-6 py-5 text-[var(--sys-text-secondary)] font-bold italic bg-transparent border-b border-[var(--sys-border-subtle)] opacity-40">{{ candidate.date }}</td>
                </tr>
                <tr v-if="filteredCandidates.length === 0">
                  <td colspan="4" class="px-8 py-16 text-center text-[var(--sys-text-secondary)] font-bold italic bg-[var(--sys-bg-surface)] bg-transparent">
                    <div class="flex flex-col items-center gap-4 opacity-30 bg-transparent">
                      <span class="material-symbols-outlined text-5xl bg-transparent">search_off</span>
                      <p class="text-xs uppercase tracking-[0.2em] bg-transparent">Không tìm thấy ứng viên phù hợp</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Right Column: CV Preview & AI -->
      <div class="xl:col-span-5 h-full bg-transparent">
        <div class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm h-full overflow-hidden flex flex-col">
          <!-- CV Preview Header -->
          <div class="px-8 py-6 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-[var(--sys-bg-surface)]">
            <span class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest italic opacity-50">CV: CV_{{ activeCandidate.name.toUpperCase().replace(/\s/g, '_') }}.PDF</span>
            <div class="flex gap-2">
              <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] hover:text-[var(--sys-brand-solid)] border border-[var(--sys-border-subtle)] transition-all">
                <span class="material-symbols-outlined text-[20px]">zoom_in</span>
              </button>
              <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] hover:text-[var(--sys-brand-solid)] border border-[var(--sys-border-subtle)] transition-all">
                <span class="material-symbols-outlined text-[20px]">download</span>
              </button>
            </div>
          </div>
          
          <!-- CV Preview Body -->
          <div class="flex-grow p-10 flex flex-col items-center justify-center bg-[var(--sys-bg-hover)]/30">
            <div class="bg-[var(--sys-bg-surface)] rounded-3xl p-10 shadow-xl border border-[var(--sys-border-subtle)] w-full max-w-sm aspect-[3/4] flex flex-col gap-6 relative overflow-hidden">
               <div class="absolute top-0 right-0 w-40 h-40 bg-[var(--sys-brand-soft)] rounded-full -mr-20 -mt-20 opacity-30"></div>
              
              <div class="w-16 h-16 bg-[var(--sys-bg-hover)] rounded-2xl border border-[var(--sys-border-subtle)] shrink-0 flex items-center justify-center">
                 <span class="material-symbols-outlined text-[var(--sys-text-secondary)] opacity-30 text-3xl">account_circle</span>
              </div>
              <div class="w-3/4 h-5 bg-[var(--sys-bg-hover)] rounded-lg"></div>
              <div class="space-y-3 pt-6">
                <div class="w-full h-3 bg-[var(--sys-bg-hover)] rounded-lg opacity-60"></div>
                <div class="w-full h-3 bg-[var(--sys-bg-hover)] rounded-lg opacity-60"></div>
                <div class="w-4/5 h-3 bg-[var(--sys-bg-hover)] rounded-lg opacity-60"></div>
                <div class="w-full h-3 bg-[var(--sys-bg-hover)] rounded-lg opacity-60"></div>
              </div>
              <div class="space-y-3 mt-auto">
                <div class="w-full h-3 bg-[var(--sys-brand-soft)] rounded-lg"></div>
                <div class="w-2/3 h-3 bg-[var(--sys-brand-soft)] rounded-lg"></div>
              </div>
            </div>
          </div>

          <!-- Assessment -->
          <div class="p-10 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface)] space-y-8">
            <div v-if="needsScheduling(activeCandidate)">
              <h4 class="text-[10px] font-black text-[var(--sys-brand-solid)] uppercase tracking-[0.2em] flex items-center gap-3 mb-6 italic bg-transparent">
                <span class="material-symbols-outlined text-2xl font-normal bg-transparent">calendar_month</span> Thiết lập lịch phỏng vấn
              </h4>
              <div class="grid grid-cols-2 gap-6 bg-transparent">
                <div class="bg-transparent text-left">
                  <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2.5 ml-1 italic opacity-60">Ngày</label>
                  <input type="date" class="w-full px-5 py-4 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-black focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)]">
                </div>
                <div class="bg-transparent text-left">
                  <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2.5 ml-1 italic opacity-60">Giờ</label>
                  <input type="time" class="w-full px-5 py-4 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-black focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)]">
                </div>
              </div>
              <button class="w-full py-5 bg-[var(--sys-brand-solid)] text-white rounded-[2rem] text-[11px] font-black hover:bg-[var(--sys-brand-hover)] shadow-2xl shadow-[var(--sys-brand-solid-lch-30)] transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-[0.98]">
                Lưu lịch & Gửi mail
              </button>
            </div>

            <div v-else>
              <h4 class="text-[10px] font-black text-[var(--sys-brand-solid)] uppercase tracking-[0.2em] flex items-center gap-3 mb-6 italic bg-transparent">
                <span class="material-symbols-outlined text-2xl font-normal bg-transparent">rate_review</span> Đánh giá sau phỏng vấn
              </h4>
              <div class="mb-6 bg-transparent">
                <textarea class="w-full px-6 py-5 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-[2rem] text-sm font-black focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] resize-none" rows="3" placeholder="Nhập nhận xét chi tiết và đánh giá kỹ năng..."></textarea>
              </div>
              <div class="flex gap-10 mb-8 px-6 bg-transparent">
                <label class="flex items-center gap-3 cursor-pointer group text-[var(--sys-success-text)] bg-transparent">
                  <input type="radio" :name="'result_' + activeCandidate.id" class="w-6 h-6 accent-[var(--sys-success-solid)] cursor-pointer">
                  <span class="text-xs font-black uppercase tracking-widest italic group-hover:translate-x-1 transition-transform">PASS</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer group text-[var(--sys-danger-text)] bg-transparent">
                  <input type="radio" :name="'result_' + activeCandidate.id" class="w-6 h-6 accent-[var(--sys-danger-solid)] cursor-pointer">
                  <span class="text-xs font-black uppercase tracking-widest italic group-hover:translate-x-1 transition-transform">FAIL</span>
                </label>
              </div>
              <button class="w-full py-5 bg-[var(--sys-text-primary)] text-[var(--sys-bg-surface)] rounded-[2rem] text-[11px] font-black hover:opacity-90 shadow-2xl shadow-[var(--sys-text-primary-lch-30)] transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-[0.98]">
                Lưu kết quả thao tác
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom List -->
    <div class="bg-[var(--sys-bg-surface)] rounded-[3rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden">
      <!-- Tabs -->
      <div class="flex p-2 bg-[var(--sys-bg-page)] border-b border-[var(--sys-border-subtle)] bg-transparent">
        <button class="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--sys-brand-solid)] bg-[var(--sys-bg-surface)] rounded-[2rem] shadow-sm transition-all border border-[var(--sys-brand-border)]">
          Danh sách Trúng tuyển (12)
        </button>
        <button class="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] transition-all opacity-40 hover:opacity-100">
          Danh sách Từ chối (45)
        </button>
      </div>

      <!-- Horizontal candidate list -->
      <div class="p-10 bg-transparent text-left">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 bg-transparent">
          <div v-for="i in 4" :key="i" class="p-6 rounded-[2.5rem] border border-[var(--sys-border-subtle)] hover:border-[var(--sys-brand-soft)] hover:bg-[var(--sys-brand-soft)] transition-all flex items-center justify-between group bg-transparent">
            <div class="flex flex-col bg-transparent text-left">
              <h6 class="text-sm font-black text-[var(--sys-text-primary)] mb-1 bg-transparent">{{ i === 1 ? 'Phan Thành' : (i === 2 ? 'Hoàng My' : (i === 3 ? 'Vũ Duy' : 'Khánh Linh')) }}</h6>
              <span class="text-[10px] font-bold text-[var(--sys-brand-solid)] uppercase tracking-tight bg-transparent italic">
                {{ i === 1 ? 'iOS Developer' : (i === 2 ? 'Product Owner' : (i === 3 ? 'Data Scientist' : 'QA Engineer')) }}
              </span>
            </div>
            <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] opacity-0 group-hover:opacity-100 transition-all border border-[var(--sys-border-subtle)] hover:text-[var(--sys-brand-solid)] hover:border-[var(--sys-brand-solid)]">
              <span class="material-symbols-outlined text-lg">more_vert</span>
            </button>
          </div>
        </div>

        <div class="text-center pt-10 border-t border-[var(--sys-border-subtle)] bg-transparent">
          <a href="#" class="text-[10px] font-black text-[var(--sys-brand-solid)] uppercase tracking-[0.25em] hover:opacity-60 transition-all border-b-2 border-[var(--sys-brand-solid)] pb-1.5 active:scale-95 inline-block italic">Xem toàn bộ 12 ứng viên trúng tuyển</a>
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
const filterPosition = ref('');
const filterAiScore = ref('');

const positionOptions = [
  { label: 'Vị trí: Tất cả', value: '' },
  { label: 'Senior Frontend', value: 'Senior Frontend' },
  { label: 'UI/UX Designer', value: 'UI/UX Designer' },
  { label: 'Backend Dev', value: 'Backend Dev' }
];

const aiScoreOptions = [
  { label: 'Tất cả điểm', value: '' },
  { label: 'Điểm AI: > 80', value: '80' },
  { label: 'Điểm AI: > 90', value: '90' }
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
  return new Date(candidate.interviewDate) > new Date(); // If date is in the future
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

  return list;
});

const getAiScoreClass = (score) => {
  if (score >= 80) return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
  if (score >= 70) return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]';
  return 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]';
};

const getAiScoreStyle = (score) => {
  if (score >= 80) return 'background-color: var(--sys-success-soft); color: var(--sys-success-text); border: 1px solid var(--sys-success-border); shadow: var(--sys-shadow-sm);';
  if (score >= 70) return 'background-color: var(--sys-warning-soft); color: var(--sys-warning-text); border: 1px solid var(--sys-warning-border); shadow: var(--sys-shadow-sm);';
  return 'background-color: var(--sys-danger-soft); color: var(--sys-danger-text); border: 1px solid var(--sys-danger-border); shadow: var(--sys-shadow-sm);';
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
</style>
