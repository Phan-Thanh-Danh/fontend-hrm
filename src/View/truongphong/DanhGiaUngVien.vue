<template>
  <div class="space-y-4 pb-6">
    <!-- Header Area: Executive Styling -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left px-1">
      <div class="bg-transparent text-left">
        <h1 class="text-xl font-bold text-[var(--sys-text-primary)] mb-0.5 tracking-tight uppercase italic">Đánh giá Ứng viên Phỏng vấn</h1>
        <p class="text-[13px] text-[var(--sys-text-secondary)] opacity-100 italic flex items-center gap-3">
          Trưởng phòng thẩm định năng lực và phản hồi kết quả phỏng vấn cho HR.
          <span class="px-2 py-0.5 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-md border border-[var(--sys-brand-border)] text-[9px] font-black uppercase tracking-widest italic shadow-sm">RECRUITMENT EVALUATION</span>
        </p>
      </div>
      <div class="bg-transparent hidden lg:block">
        <div class="px-4 py-3 bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm flex items-center gap-3.5">
          <div class="w-10 h-10 rounded-md bg-[var(--sys-brand-solid)] text-white flex items-center justify-center font-black text-sm shadow-md">IT</div>
          <div>
            <p class="text-[9px] font-black text-[var(--sys-text-secondary)] uppercase m-0 tracking-[0.2em] opacity-60">PHÒNG QUẢN LÝ</p>
            <p class="text-[13px] font-black text-[var(--sys-text-primary)] m-0 uppercase italic tracking-tight">KỸ THUẬT VÀ CÔNG NGHỆ</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Candidate List: Premium Form Style -->
    <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col">
      <div class="px-5 py-3.5 border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/30">
        <h3 class="text-[12px] font-bold text-[var(--sys-text-primary)] uppercase tracking-[0.12em] m-0 flex items-center gap-2.5 italic">
          <div class="w-8 h-8 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border border-[var(--sys-brand-border)] flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-[20px]">how_to_reg</span>
          </div>
          DANH SÁCH CHỜ THẨM ĐỊNH NĂNG LỰC
        </h3>
      </div>

      <div v-if="interviewingCandidates.length === 0" class="p-20 text-center bg-[var(--sys-bg-page)]/10">
        <span class="material-symbols-outlined text-6xl text-[var(--sys-text-disabled)] opacity-10 mb-4">person_search</span>
        <p class="text-[13px] font-black text-[var(--sys-text-disabled)] uppercase italic opacity-40">Hiện không có ứng viên nào đang chờ đánh giá chuyên môn</p>
      </div>

      <div v-else class="divide-y divide-[var(--sys-border-subtle)]">
        <div v-for="candidate in interviewingCandidates" :key="candidate.id" class="p-6 hover:bg-[var(--sys-bg-hover)] transition-all duration-300 group">
          <div class="flex flex-col lg:flex-row gap-8">
            <!-- Information Column -->
            <div class="lg:w-1/3 space-y-4">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-md border-2 border-[var(--sys-brand-solid)] flex items-center justify-center font-black text-xl text-[var(--sys-brand-solid)] italic shadow-inner bg-[var(--sys-bg-page)]">
                  {{ candidate.name.charAt(0) }}
                </div>
                <div class="flex flex-col">
                  <h4 class="text-[15px] font-bold text-[var(--sys-text-primary)] m-0 uppercase italic tracking-tight group-hover:text-[var(--sys-brand-solid)] transition-colors">{{ candidate.name }}</h4>
                  <p class="text-[10px] font-black text-[var(--sys-brand-solid)] uppercase tracking-[0.15em] opacity-80 leading-none">{{ candidate.position }}</p>
                </div>
              </div>
              
              <div class="space-y-2 py-4 border-t border-b border-[var(--sys-border-subtle)] border-dashed border-t-2 border-b-2">
                <div class="flex items-center justify-between text-[12.5px] font-black text-[var(--sys-text-primary)]">
                  <span class="opacity-50 uppercase text-[9px] font-black italic tracking-widest text-[var(--sys-text-secondary)]">LỊCH HẸN PHỎNG VẤN:</span>
                  <span class="italic text-[var(--sys-brand-solid)]">{{ candidate.interviewDate }}</span>
                </div>
                <div class="flex items-center justify-between text-[12.5px] font-black text-[var(--sys-text-primary)]">
                  <span class="opacity-50 uppercase text-[9px] font-black italic tracking-widest text-[var(--sys-text-secondary)]">RANKING AI SCORE:</span>
                  <span class="text-[var(--sys-success-text)] italic underline decoration-2 decoration-[var(--sys-success-soft)] underline-offset-4">{{ candidate.aiScore }}% MATCH</span>
                </div>
              </div>

              <button class="w-full h-10 px-4 border-2 border-dashed border-[var(--sys-brand-border)] text-[var(--sys-brand-solid)] rounded-md text-[10px] font-black uppercase tracking-widest hover:bg-[var(--sys-brand-soft)] transition-all flex items-center justify-center gap-2.5 italic">
                <span class="material-symbols-outlined text-[18px]">attachment</span>
                TRUY XUẤT HỒ SƠ CV
              </button>
            </div>

            <!-- Review Column -->
            <div class="flex-1 space-y-4 lg:pl-8 lg:border-l-2 lg:border-dashed lg:border-[var(--sys-border-subtle)] flex flex-col">
              <div class="flex-grow space-y-2">
                <label class="text-[10px] font-black text-[var(--sys-brand-solid)] uppercase tracking-[0.2em] block italic mb-2">QUYẾT ĐỊNH & ĐÁNH GIÁ CHUYÊN MÔN TỔNG QUAN *</label>
                <textarea 
                  v-model="reviews[candidate.id]"
                  class="w-full h-32 p-4 bg-[var(--sys-bg-page)]/50 border-2 border-[var(--sys-border-strong)] rounded-md text-[13.5px] font-bold text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] focus:bg-white shadow-inner transition-all italic placeholder:opacity-30 placeholder:italic"
                  placeholder="Nhập nhận định kỹ thuật, thái độ chuyên nghiệp và mức độ hài lòng thực tế..."
                ></textarea>
              </div>
              <div class="flex justify-end gap-3 pt-2">
                <button 
                  @click="submitReview(candidate.id)"
                  :disabled="!reviews[candidate.id]"
                  class="h-11 px-10 bg-[var(--sys-brand-solid)] text-white rounded-md text-[11px] font-black uppercase tracking-[0.18em] shadow-lg hover:brightness-110 transition-all flex items-center gap-3 active:scale-95 disabled:opacity-30 disabled:pointer-events-none italic"
                >
                  <span class="material-symbols-outlined text-[20px] font-black">send</span>
                  XÁC NHẬN & GỬI CHO HR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRecruitmentStore } from '@/composables/useRecruitmentStore'
import { useConfirm } from '@/composables/useConfirm'

const store = useRecruitmentStore()
const { showAlert } = useConfirm()

const myDepartment = 'IT'
const interviewingCandidates = computed(() => {
  return store.candidates.value.filter(c => c.status === 'interviewing' && c.department === myDepartment)
})

const reviews = ref({})

async function submitReview(candidateId) {
  const reviewContent = reviews.value[candidateId]
  if (!reviewContent) return
  store.submitManagerReview(candidateId, reviewContent)
  await showAlert('TIẾP NHẬN ĐÁNH GIÁ', 'Thông tin đã được chuyển tiếp sang bộ phận HR để thực hiện các bước tiếp theo.')
  delete reviews.value[candidateId]
}
</script>

<style scoped>
* { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
textarea::placeholder { font-weight: 700; opacity: 0.3 !important; }
</style>
