import { computed } from 'vue'
import { candidatesAPI } from '@/data/mockDB.js'

export function useRecruitmentStore() {
  const candidates = computed(() => {
    return candidatesAPI.getAll().map(c => ({
      id: c.candidate_id,
      name: c.full_name,
      position: c.position_applied,
      departmentId: (c.candidate_id % 5) + 1, // Deterministic mock mapping to departments 1-5
      department: 'Phòng ban chung', 
      aiScore: c.ai_score,
      date: c.applied_date || new Date().toLocaleDateString('vi-VN'),
      status: (c.status === 'MỚI' ? 'new' : (c.status === 'ĐANG_PHỎNG_VẤN' ? 'interviewing' : (c.status === 'TRÚNG_TUYỂN' || c.status === 'ĐÃ_DUYỆT' ? 'pass' : (c.status === 'LOẠI' || c.status === 'TỪ_CHỐI' ? 'fail' : 'reviewed')))),
      managerReview: c.notes || null,
      interviewDate: c.interview_date || null
    }))
  })

  const scheduleInterview = (candidateId, date, time) => {
    candidatesAPI.update(candidateId, { status: 'ĐANG_PHỎNG_VẤN', interview_date: `${date} ${time}` })
  }

  const submitManagerReview = (candidateId, review) => {
    candidatesAPI.update(candidateId, { notes: review, status: 'ĐÃ_ĐÁNH_GIÁ' })
  }

  const finalizeDecision = (candidateId, finalStatus) => {
    // finalStatus: 'pass' or 'fail'
    const newStatus = finalStatus === 'pass' ? 'TRÚNG_TUYỂN' : 'LOẠI'
    candidatesAPI.update(candidateId, { status: newStatus })
  }

  return {
    candidates,
    scheduleInterview,
    submitManagerReview,
    finalizeDecision
  }
}
