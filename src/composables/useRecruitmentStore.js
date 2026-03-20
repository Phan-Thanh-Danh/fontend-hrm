import { reactive, computed } from 'vue'

const STORAGE_KEY = 'hrm_recruitment_data'

const loadData = () => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch (e) {
      console.error('Lỗi đọc dữ liệu tuyển dụng:', e)
    }
  }
  return [
    { id: 1, name: 'Nguyễn Văn Anh', position: 'Senior Frontend', department: 'IT', aiScore: 95, date: '12/10/2023', status: 'new', interviewDate: null, managerReview: null },
    { id: 2, name: 'Trần Thị Bích', position: 'UI/UX Designer', department: 'Marketing', aiScore: 88, date: '11/10/2023', status: 'new', interviewDate: null, managerReview: null },
    { id: 3, name: 'Lê Văn Chính', position: 'Backend Dev', department: 'IT', aiScore: 72, date: '10/10/2023', status: 'new', interviewDate: null, managerReview: null },
    { id: 4, name: 'Phạm Thành Đạt', position: 'Business Analyst', department: 'Vận hành', aiScore: 92, date: '09/10/2023', status: 'new', interviewDate: null, managerReview: null }
  ]
}

const state = reactive({
  candidates: loadData()
})

const save = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.candidates))
}

export function useRecruitmentStore() {
  const candidates = computed(() => state.candidates)

  const scheduleInterview = (candidateId, date, time) => {
    const candidate = state.candidates.find(c => c.id === candidateId)
    if (candidate) {
      candidate.status = 'interviewing'
      candidate.interviewDate = `${date} ${time}`
      save()
    }
  }

  const submitManagerReview = (candidateId, review) => {
    const candidate = state.candidates.find(c => c.id === candidateId)
    if (candidate) {
      candidate.managerReview = review
      candidate.status = 'reviewed'
      save()
    }
  }

  const finalizeDecision = (candidateId, finalStatus) => {
    const candidate = state.candidates.find(c => c.id === candidateId)
    if (candidate) {
      candidate.status = finalStatus
      save()
    }
  }

  return {
    candidates,
    scheduleInterview,
    submitManagerReview,
    finalizeDecision
  }
}
