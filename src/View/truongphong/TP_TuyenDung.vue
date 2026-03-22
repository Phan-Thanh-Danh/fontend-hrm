<template>
  <div class="space-y-6 pb-8">
    <!-- Header Area: SaaS Enterprise Style -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left px-1">
      <div class="bg-transparent text-left">
        <h1 class="text-xl font-bold text-[var(--sys-text-primary)] mb-0.5 tracking-tight uppercase">Theo dõi Tuyển dụng Phòng ban</h1>
        <p class="text-[13px] text-[var(--sys-text-secondary)] font-medium flex items-center gap-3">
          Giám sát tiến độ các chiến dịch tuyển mộ nhân tài khối IT.
          <span class="px-2 py-0.5 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-md border border-[var(--sys-brand-border)] text-[10px] font-bold uppercase tracking-widest shadow-sm">MONITORING MODE</span>
        </p>
      </div>
    </div>

    <!-- Active Job Postings: Premium Card Style -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div v-for="job in jobs" :key="job.id" 
        class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col group hover:border-[var(--sys-brand-solid)] transition-all hover:shadow-lg">
        <div class="p-6 space-y-5">
          <div class="flex justify-between items-start">
            <div class="space-y-1">
              <h4 class="text-[14px] font-bold text-[var(--sys-text-primary)] m-0 uppercase tracking-tight group-hover:text-[var(--sys-brand-solid)] transition-colors">{{ job.title }}</h4>
              <p class="text-[11px] font-bold text-[var(--sys-brand-solid)] uppercase tracking-widest opacity-80 leading-none">{{ job.code }} <span class="mx-2 opacity-30 text-slate-400">|</span> Mức lương: {{ job.salary }}</p>
            </div>
            <div :class="['px-3 py-1.5 rounded-md text-[10px] font-bold uppercase border shadow-sm tracking-widest transition-all', job.status === 'Đang mở' ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]' : 'bg-[var(--sys-bg-page)] text-[var(--sys-text-disabled)] border-[var(--sys-border-subtle)] opacity-60']">
              {{ job.status }}
            </div>
          </div>

          <!-- Progress Visualization: Executive Layout -->
          <div class="grid grid-cols-4 gap-4 py-5 border-t border-b border-[var(--sys-border-subtle)] border-dashed border-t-2 border-b-2">
            <div class="text-center space-y-1.5 border-r border-[var(--sys-border-subtle)] border-dashed last:border-0">
              <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase opacity-60 tracking-widest">ỨNG TUYỂN</p>
              <p class="text-[18px] font-bold leading-none">{{ job.applied }}</p>
            </div>
            <div class="text-center space-y-1.5 border-r border-[var(--sys-border-subtle)] border-dashed last:border-0">
              <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase opacity-60 tracking-widest">SÀNG LỌC</p>
              <p class="text-[18px] font-bold text-indigo-600 leading-none">{{ job.screening }}</p>
            </div>
            <div class="text-center space-y-1.5 border-r border-[var(--sys-border-subtle)] border-dashed last:border-0">
              <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase opacity-60 tracking-widest">PHỎNG VẤN</p>
              <p class="text-[18px] font-bold text-violet-600 leading-none">{{ job.interviewing }}</p>
            </div>
            <div class="text-center space-y-1.5">
              <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase opacity-60 tracking-widest">THÀNH CÔNG</p>
              <p class="text-[18px] font-bold text-[var(--sys-success-text)] leading-none">{{ job.hired }}</p>
            </div>
          </div>

          <div class="flex items-center gap-4 pt-1">
            <div class="flex gap-2">
               <div v-for="i in 3" :key="i" class="inline-block h-8 w-8 rounded-md bg-gradient-to-br from-[var(--sys-bg-page)] to-[var(--sys-bg-hover)] flex items-center justify-center font-bold text-[10px] uppercase text-[var(--sys-brand-solid)] shadow-sm border border-[var(--sys-brand-border)]">A{{ i }}</div>
            </div>
            <span class="text-[11px] font-bold text-[var(--sys-text-secondary)] opacity-60">Và 12 ứng viên tiềm năng đang chờ...</span>
          </div>
        </div>
        
        <div class="px-5 py-3.5 bg-[var(--sys-bg-page)]/30 border-t border-[var(--sys-border-subtle)] flex justify-between items-center transition-all duration-300">
          <span class="text-[10px] font-bold text-[var(--sys-text-disabled)] uppercase tracking-widest leading-none">Job Created: {{ job.createdAt }}</span>
          <button @click="filterCandidatesByJob(job.title)" class="text-[10px] font-bold text-[var(--sys-brand-solid)] uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity">
            CHI TIẾT ỨNG VIÊN
            <span class="material-symbols-rounded text-[16px] font-bold">trending_flat</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom Lists Section -->
    <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden mt-6" id="candidates-list-section">
      <!-- Tabs Area -->
      <div class="flex items-center justify-between gap-2 px-5 py-3.5 bg-[var(--sys-bg-page)]/50 border-b border-[var(--sys-border-subtle)]">
        <h3 class="text-[12px] font-bold text-[var(--sys-text-primary)] uppercase tracking-widest flex items-center gap-2 m-0 transition-all">
          <span class="material-symbols-rounded text-[18px] text-[var(--sys-brand-solid)]">folder_shared</span>
          {{ selectedJobFilter ? `HỒ SƠ ỨNG TUYỂN: ${selectedJobFilter}` : 'Hồ sơ ứng tuyển mới nhất' }}
        </h3>
        <button v-if="selectedJobFilter" @click="clearJobFilter" class="h-8 px-3 rounded-md text-[10px] font-bold text-[var(--sys-danger-text)] bg-[var(--sys-danger-soft)] hover:bg-[var(--sys-danger-solid)] hover:text-white transition-all uppercase tracking-wide flex items-center gap-1 border border-[var(--sys-danger-border)]">
          <span class="material-symbols-rounded text-[14px]">close</span> Bỏ lọc
        </button>
      </div>

      <!-- View Content -->
      <div class="p-5">
        <!-- Grid View (Mới nhất) -->
        <div v-if="!showFullList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
          <div v-for="c in recentCandidates" :key="c.id" 
            class="p-3.5 rounded-lg border border-[var(--sys-border-subtle)] hover:border-[var(--sys-brand-solid)] transition-all flex items-center justify-between group bg-[var(--sys-bg-page)]/20 shadow-sm cursor-pointer"
            @click="viewCandidateDetails(c)">
            <div class="flex flex-col bg-transparent">
              <h6 class="text-[13px] font-semibold text-[var(--sys-text-primary)] mb-0.5 group-hover:text-[var(--sys-brand-solid)] transition-colors">{{ c.name }}</h6>
              <span class="text-[10px] font-bold text-[var(--sys-brand-solid)] uppercase tracking-tight opacity-70">
                {{ c.position }}
              </span>
            </div>
            <button class="w-8 h-8 flex items-center justify-center rounded-md text-[var(--sys-text-secondary)] hover:bg-[var(--sys-brand-soft)] hover:text-[var(--sys-brand-solid)] transition-all" title="Xem chi tiết">
              <span class="material-symbols-rounded text-[20px]">visibility</span>
            </button>
          </div>
        </div>

        <!-- List View (Sớm nhất đến muộn nhất) -->
        <div v-else class="flex flex-col gap-3 animate-fade-in">
          <div v-for="(c, idx) in sortedCandidates" :key="c.id" 
            class="flex items-center justify-between p-4 rounded-lg border border-[var(--sys-border-subtle)] hover:border-[var(--sys-brand-solid)] transition-all bg-[var(--sys-bg-page)]/20 shadow-sm cursor-pointer group"
            @click="viewCandidateDetails(c)">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center font-bold text-sm uppercase shadow-inner border border-[var(--sys-brand-border)]">
                {{ c.name.charAt(0) }}
              </div>
              <div class="space-y-0.5">
                <h6 class="text-[14px] font-bold text-[var(--sys-text-primary)] m-0 group-hover:text-[var(--sys-brand-solid)] transition-colors">{{ c.name }}</h6>
                <div class="flex items-center gap-3">
                  <span class="text-[11px] font-bold text-[var(--sys-brand-solid)] uppercase tracking-widest opacity-80">{{ c.position }}</span>
                  <span class="w-1 h-1 rounded-full bg-[var(--sys-border-strong)] hidden md:block"></span>
                  <span class="text-[11px] font-medium text-[var(--sys-text-secondary)] hidden md:block">Nộp HS: {{ c.dateFilled }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-[11px] font-bold px-2.5 py-1 bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] rounded border border-[var(--sys-success-border)] flex items-center gap-1">
                <span class="material-symbols-rounded text-[14px]">psychology</span> {{ c.aiScore }}%
              </span>
              <button class="w-8 h-8 flex items-center justify-center rounded-md text-[var(--sys-text-secondary)] hover:bg-[var(--sys-bg-hover)] transition-all">
                <span class="material-symbols-rounded text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        <div class="text-center pt-6 mt-6 border-t border-[var(--sys-border-subtle)] border-dashed">
          <button @click="showFullList = !showFullList" class="text-[12px] font-bold text-[var(--sys-brand-solid)] hover:opacity-80 transition-opacity flex items-center justify-center gap-1 mx-auto uppercase tracking-wide">
            {{ showFullList ? 'Thu gọn danh mục' : 'Truy xuất toàn bộ danh mục hồ sơ' }}
            <span class="material-symbols-rounded text-[18px]">{{ showFullList ? 'expand_less' : 'keyboard_double_arrow_right' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Chi tiết Hồ sơ --->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div class="fixed inset-0 w-screen h-screen bg-black/50 z-[9999]" @click="closeModal"></div>
          <div class="relative z-[10000] bg-[var(--sys-bg-surface-elevated)] border border-[var(--sys-border-subtle)] w-full max-w-2xl max-h-[90vh] rounded-lg shadow-2xl overflow-hidden flex flex-col text-left">
            <!-- Modal Header -->
            <div class="px-6 py-4 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-[var(--sys-bg-page)]/50">
              <div class="bg-transparent text-left flex items-center gap-3">
                <span class="material-symbols-rounded text-[var(--sys-brand-solid)] text-[24px]">assignment_ind</span>
                <div>
                  <h3 class="text-sm font-bold text-[var(--sys-text-primary)] m-0 uppercase tracking-wide">Chi tiết ứng viên</h3>
                  <p class="text-[11px] text-[var(--sys-text-secondary)] mt-0.5 font-medium uppercase tracking-widest opacity-80">CHỈ ĐỌC (VIEW ONLY)</p>
                </div>
              </div>
              <button @click="closeModal" class="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[var(--sys-bg-hover)] transition-all text-[var(--sys-text-secondary)] shadow-sm border border-transparent hover:border-[var(--sys-border-strong)]">
                <span class="material-symbols-rounded text-xl">close</span>
              </button>
            </div>

            <!-- Modal Body -->
            <div v-if="selectedCandidate" class="flex-1 overflow-y-auto p-6 custom-scrollbar bg-[var(--sys-bg-surface)] space-y-6">
              
              <!-- Profile Header -->
              <div class="flex items-center gap-5">
                <div class="w-20 h-20 rounded-lg bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] flex items-center justify-center font-bold text-2xl text-[var(--sys-brand-solid)] uppercase shadow-inner shrink-0 relative">
                  {{ selectedCandidate.name.charAt(0) }}
                </div>
                <div>
                  <h2 class="text-xl font-bold text-[var(--sys-text-primary)] mb-1 uppercase tracking-tight">{{ selectedCandidate.name }}</h2>
                  <p class="text-[12px] font-bold text-[var(--sys-brand-solid)] uppercase tracking-widest">{{ selectedCandidate.position }}</p>
                  <p class="text-[11px] font-medium text-[var(--sys-text-secondary)] mt-1.5 flex items-center gap-1.5 opacity-80">
                    <span class="material-symbols-rounded text-[14px]">event</span>
                    Ngày nộp hồ sơ: {{ selectedCandidate.dateFilled }}
                  </p>
                </div>
              </div>

              <!-- General Info Grid -->
              <div class="grid grid-cols-2 gap-x-6 gap-y-4 pt-6 border-t border-[var(--sys-border-subtle)] border-dashed border-t-2">
                <div class="flex flex-col border border-[var(--sys-border-subtle)] p-3 rounded-md bg-[var(--sys-bg-page)]/50 shadow-sm">
                  <span class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest opacity-70 mb-1 flex items-center gap-1"><span class="material-symbols-rounded text-[14px]">work</span> Kinh nghiệm làm việc</span>
                  <span class="text-[13px] font-bold text-[var(--sys-text-primary)]">{{ selectedCandidate.experience }}</span>
                </div>
                <div class="flex flex-col border border-[var(--sys-border-subtle)] p-3 rounded-md bg-[var(--sys-bg-page)]/50 shadow-sm">
                  <span class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest opacity-70 mb-1 flex items-center gap-1"><span class="material-symbols-rounded text-[14px]">psychology</span> Điểm AI (Match Score)</span>
                  <span class="text-[13px] font-bold text-[var(--sys-success-text)]">{{ selectedCandidate.aiScore }}% Phù hợp</span>
                </div>
                <div class="flex flex-col border border-[var(--sys-border-subtle)] p-3 rounded-md bg-[var(--sys-bg-page)]/50 shadow-sm">
                  <span class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest opacity-70 mb-1 flex items-center gap-1"><span class="material-symbols-rounded text-[14px]">school</span> Học vấn</span>
                  <span class="text-[13px] font-bold text-[var(--sys-text-primary)]">{{ selectedCandidate.education }}</span>
                </div>
                <div class="flex flex-col border border-[var(--sys-border-subtle)] p-3 rounded-md bg-[var(--sys-bg-page)]/50 shadow-sm">
                  <span class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest opacity-70 mb-1 flex items-center gap-1"><span class="material-symbols-rounded text-[14px]">checklist</span> Kỹ năng chính</span>
                  <span class="text-[13px] font-bold text-[var(--sys-text-primary)]">{{ selectedCandidate.skills.join(', ') }}</span>
                </div>
              </div>

            </div>

            <!-- Modal Footer -->
            <div class="px-6 py-4 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)] flex justify-end gap-3">
              <button @click="closeModal" class="px-6 py-2 bg-white text-[var(--sys-text-secondary)] border border-[var(--sys-border-strong)] rounded-md font-bold text-[12px] hover:bg-[var(--sys-bg-hover)] shadow-sm uppercase tracking-wide transition-all active:scale-95">Đóng</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { candidatesAPI, positionsAPI } from '@/data/mockDB.js'

const showModal = ref(false)
const showFullList = ref(false)
const selectedCandidate = ref(null)
const selectedJobFilter = ref('')

const candidatesList = ref([])
const jobs = ref([
  { id: 1, title: 'SENIOR VUE DEVELOPER', code: 'IT-2401', status: 'Đang mở', salary: '20M - 35M', applied: 0, screening: 0, interviewing: 0, hired: 0, createdAt: '10/03/2026' },
  { id: 2, title: 'BACKEND NODE.JS ENGINEER', code: 'IT-2402', status: 'Đang mở', salary: '25M - 40M', applied: 0, screening: 0, interviewing: 0, hired: 0, createdAt: '12/03/2026' },
])

const POSITION_LABELS = {
  1: 'Giám đốc', 2: 'Trưởng phòng', 3: 'Trưởng nhóm',
  4: 'Chuyên viên cao cấp', 5: 'Chuyên viên', 6: 'Thực tập sinh'
}

const STATUS_PIPELINE = {
  'HẸN_PHỎNG_VẤN': 'interviewing',
  'ĐÃ_TUYỂN': 'hired',
  'LOẠI': 'rejected'
}

const loadData = () => {
  const allCands = candidatesAPI.getAll()
  const allPositions = positionsAPI.getAll()

  candidatesList.value = allCands
    .filter(c => c.status !== 'LOẠI')
    .slice(0, 20)
    .map((c, idx) => {
      const pos = allPositions.find(p => p.position_id === c.applied_position_id)
      const expYears = Math.floor(Math.random() * 5) + 1
      const aiScore = 70 + Math.floor((c.candidate_id * 7) % 25)
      const skills = [['Vue 3', 'Node.js', 'Python'], ['React', 'TypeScript', 'SQL'], ['Figma', 'Sketch', 'CSS'], ['Swift', 'Kotlin', 'Java']][c.candidate_id % 4]
      const edus = ['ĐH Bách Khoa HCM', 'ĐH CNTT ĐHQG', 'ĐH Khoa Học Tự Nhiên', 'ĐH Kinh tế Quốc Dân']

      return {
        id: c.candidate_id,
        name: c.full_name || `Ứng viên ${c.candidate_id}`,
        position: pos?.position_name || 'Chuyên viên IT',
        experience: `${expYears} Năm`,
        aiScore,
        education: edus[c.candidate_id % edus.length],
        skills,
        dateFilled: c.apply_date ? new Date(c.apply_date).toLocaleDateString('vi-VN') : 'N/A',
        status: c.status
      }
    })

  // Tính pipeline động từ data thật
  jobs.value = jobs.value.map(job => {
    const applied = allCands.filter(c => c.candidate_id % 2 === job.id % 2).length
    const screening = Math.floor(applied * 0.3)
    const interviewing = allCands.filter(c => c.status === 'HẸN_PHỎNG_VẤN' && c.candidate_id % 2 === job.id % 2).length
    const hired = allCands.filter(c => c.status === 'ĐÃ_TUYỂN' && c.candidate_id % 2 === job.id % 2).length
    return { ...job, applied, screening, interviewing, hired }
  })
}

const baseFilteredCandidates = computed(() => {
  if (!selectedJobFilter.value) return candidatesList.value;
  return candidatesList.value.filter(c => c.position.toLowerCase() === selectedJobFilter.value.toLowerCase());
})

const recentCandidates = computed(() => {
  return [...baseFilteredCandidates.value].slice(0, 4)
})

const sortedCandidates = computed(() => {
  return [...baseFilteredCandidates.value]
})

const filterCandidatesByJob = (jobTitle) => {
  selectedJobFilter.value = jobTitle;
  showFullList.value = true;
  document.getElementById('candidates-list-section')?.scrollIntoView({ behavior: 'smooth' });
}

const clearJobFilter = () => {
  selectedJobFilter.value = '';
}

const viewCandidateDetails = (candidate) => {
  selectedCandidate.value = candidate
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  setTimeout(() => { selectedCandidate.value = null }, 200)
}

onMounted(loadData)
</script>

<style scoped>
* { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

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

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@keyframes fadeInOpacity {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeInOpacity 0.3s ease-out forwards;
}
</style>
