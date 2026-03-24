/**
 * ============================================================
 * AET HRM — Recruitment ATS Store (Singleton Pattern)
 * ============================================================
 * Implements a fully stateful, mutable mock store that survives
 * the entire app session (single-page lifecycle). All components
 * share the same reactive state instance.
 *
 * Workflow States:
 *   CHỜ_HR_DUYỆT  → CHỜ_TP_DUYỆT → TP_ĐÃ_DUYỆT → ĐANG_PHỎNG_VẤN → TRÚNG_TUYỂN / TỪ_CHỐI
 * ============================================================
 */

import { reactive, computed } from 'vue';
import applicationsJson from '@/mock-data/applications.json';
import { mockJobPostings, mockDepartments } from '@/mock-data/index.js';

// ─── STATUS MAP ──────────────────────────────────────────────
const STATUS_MAP = {
  'CHỜ_HR_DUYỆT':   { key: 'pending_hr',    label: 'Chờ HR duyệt',       color: 'warning'  },
  'CHỜ_TP_DUYỆT':   { key: 'pending_mgr',   label: 'Chờ TP thẩm định',   color: 'brand'    },
  'TP_ĐÃ_DUYỆT':    { key: 'mgr_approved',  label: 'TP đã Duyệt',        color: 'indigo'   },
  'ĐANG_PHỎNG_VẤN': { key: 'interviewing',  label: 'Đang phỏng vấn',     color: 'purple'   },
  'TRÚNG_TUYỂN':    { key: 'pass',          label: 'Trúng tuyển',        color: 'success'  },
  'TỪ_CHỐI':        { key: 'fail',          label: 'Từ chối',            color: 'danger'   },
};

// ─── SINGLETON STORE ─────────────────────────────────────────
// `reactive` makes the entire object deeply reactive.
// Because it's defined at module level, it's shared across ALL
// component instances — like a lightweight Pinia store.
const _store = reactive({
  applications: applicationsJson.map(a => ({ ...a })), // deep-clone from JSON
});

// ─── PRIVATE HELPER: ID Counter ──────────────────────────────
let _nextId = Math.max(...applicationsJson.map(a => a.applicationId), 0) + 1;
const _newId = () => _nextId++;

// ─── PRIVATE HELPER: Shape raw record for UI ─────────────────
function _shape(a) {
  const st = STATUS_MAP[a.status] || { key: 'pending_hr', label: a.status, color: 'warning' };
  return {
    // --- Core IDs
    id:           a.applicationId,
    applicationId:a.applicationId,
    jobId:        a.jobId,
    departmentId: a.departmentId,

    // --- Candidate info
    name:         a.fullName,
    email:        a.email,
    phone:        a.phone,
    initials:     a.avatarInitials || a.fullName?.split(' ').map(w => w[0]).slice(-2).join('').toUpperCase(),
    position:     a.jobTitle,
    positionName: a.positionName,
    department:   a.departmentName,
    address:      a.address || '',

    // --- CV Data (submitted from Landing Page)
    cvUrl:         a.cvUrl || '',
    skills:        a.skills || [],
    education:     a.education || {},
    workExperience:a.workExperience || [],
    coverLetter:   a.coverLetter || '',

    // --- AI Score
    aiScore:   a.aiMatchScore || 0,
    aiRemarks: a.aiMatchRemarks || '',

    // --- Dates
    date:          a.appliedDate ? new Date(a.appliedDate).toLocaleDateString('vi-VN') : '',
    appliedDate:   a.appliedDate,
    interviewDate: a.interviewDate,

    // --- Status (UI keys)
    status:      st.key,
    statusRaw:   a.status,
    statusLabel: st.label,
    statusColor: st.color,

    // --- Workflow audit trail
    reviewedByHR:  a.reviewedByHR  || null,
    managerReview: a.reviewedByManager || null,
    managerScore:  a.managerScore  || null,  // NEW field from TP evaluation
    notes:         a.notes || '',
  };
}

// ─── PRIVATE HELPER: Find raw record index ───────────────────
function _idx(applicationId) {
  return _store.applications.findIndex(a => a.applicationId == applicationId);
}

// ============================================================
// ACTIONS — mutate the shared _store directly
// ============================================================

/**
 * Task 1 / Action A: Candidate submits application from Landing Page.
 * Initial status: CHỜ_HR_DUYỆT
 */
export function submitApplication(formData) {
  const job = mockJobPostings.find(j => j.jobId == formData.jobId);
  const newApp = {
    applicationId:  _newId(),
    jobId:          formData.jobId || null,
    jobTitle:       formData.jobTitle || job?.title || '',
    departmentId:   formData.departmentId || job?.departmentId || null,
    departmentName: formData.departmentName || job?.departmentName || '',
    positionId:     job?.positionId || 5,
    positionName:   job?.positionName || 'Chuyên viên',
    fullName:       formData.fullName,
    email:          formData.email,
    phone:          formData.phone || '',
    address:        '',
    avatarInitials: formData.fullName.split(' ').map(w => w[0]).slice(-2).join('').toUpperCase(),
    cvUrl:          formData.cvUrl || '',          // LinkedIn or Drive URL
    skills:         formData.skills || [],
    education:      { school: '', major: '', degree: '', graduationYear: null },
    workExperience: [],
    coverLetter:    formData.coverLetter || '',
    aiMatchScore:   Math.floor(Math.random() * 20) + 65, // 65–84
    aiMatchRemarks: 'Hồ sơ mới từ Landing Page. Chờ HR xét duyệt.',
    status:         'CHỜ_HR_DUYỆT',
    appliedDate:    new Date().toISOString(),
    reviewedByHR:   null,
    reviewedByManager: null,
    managerScore:   null,
    interviewDate:  null,
    notes:          formData.notes || '',
  };
  _store.applications.unshift(newApp);
  return _shape(newApp);
}

/**
 * Task 2 / Action B: HR forwards application to the Department Manager.
 * Status: CHỜ_HR_DUYỆT → CHỜ_TP_DUYỆT
 */
export function forwardToManager(applicationId, hrReviewerName = 'HR Admin') {
  const i = _idx(applicationId);
  if (i === -1) return false;
  _store.applications[i].status = 'CHỜ_TP_DUYỆT';
  _store.applications[i].reviewedByHR = hrReviewerName;
  return true;
}

/**
 * Task 3 / Action C: HR rejects an application (from any HR-visible stage).
 * Status: → TỪ_CHỐI
 */
export function rejectApplication(applicationId, reason = 'Không phù hợp yêu cầu') {
  const i = _idx(applicationId);
  if (i === -1) return false;
  _store.applications[i].status = 'TỪ_CHỐI';
  _store.applications[i].notes  = reason;
  return true;
}

/**
 * Task 4 / Action D: Manager submits evaluation & decision.
 * decision = 'approve' | 'reject'
 * Status: CHỜ_TP_DUYỆT → TP_ĐÃ_DUYỆT  OR  TỪ_CHỐI
 */
export function submitManagerEvaluation(applicationId, evaluationData, decision) {
  const i = _idx(applicationId);
  if (i === -1) return false;

  _store.applications[i].reviewedByManager = evaluationData.notes;
  _store.applications[i].managerScore      = evaluationData.score || null;

  if (decision === 'approve') {
    _store.applications[i].status = 'TP_ĐÃ_DUYỆT';
  } else {
    _store.applications[i].status = 'TỪ_CHỐI';
    _store.applications[i].notes  = evaluationData.notes;
  }
  return true;
}

/**
 * Task 5 / Action E: HR schedules interview after seeing TP's approval.
 * Status: TP_ĐÃ_DUYỆT → ĐANG_PHỎNG_VẤN
 */
export function scheduleInterview(applicationId, date, time) {
  const i = _idx(applicationId);
  if (i === -1) return false;
  _store.applications[i].status        = 'ĐANG_PHỎNG_VẤN';
  _store.applications[i].interviewDate = `${date}T${time}:00`;
  return true;
}

/**
 * Task 6 / Action F: HR finalizes candidate (hire or reject after interview).
 * finalStatus = 'pass' | 'fail'
 */
export function finalizeCandidate(applicationId, finalStatus) {
  const i = _idx(applicationId);
  if (i === -1) return false;
  _store.applications[i].status = finalStatus === 'pass' ? 'TRÚNG_TUYỂN' : 'TỪ_CHỐI';
  return true;
}

// ============================================================
// SELECTORS (Composable Hooks)
// ============================================================

/**
 * Hook for HR screen (admin/tuyendung).
 * Returns reactive computed list of all applications shaped for UI.
 * Optional status filter.
 */
export function useHRApplications() {
  const all = computed(() =>
    _store.applications.map(_shape)
      .sort((a, b) => new Date(b.appliedDate || 0) - new Date(a.appliedDate || 0))
  );

  // HR sees: candidates waiting for HR decision + those returned from TP
  const hrQueue = computed(() =>
    all.value.filter(c => ['pending_hr', 'mgr_approved'].includes(c.status))
  );

  // HR sees: all non-terminal states for full pipeline view
  const hrPipeline = computed(() =>
    all.value.filter(c => !['pass', 'fail'].includes(c.status))
  );

  return { all, hrQueue, hrPipeline };
}

/**
 * Hook for Manager screen (truongphong/danhgiaungvien).
 * Only shows applications for the manager's department
 * that are waiting for manager evaluation.
 */
export function useManagerApplications(departmentId) {
  const deptId = Number(departmentId);

  const pendingEval = computed(() =>
    _store.applications
      .filter(a =>
        a.status === 'CHỜ_TP_DUYỆT' &&
        Number(a.departmentId) === deptId &&
        !a.reviewedByManager   // hasn't been evaluated yet
      )
      .map(_shape)
      .sort((a, b) => new Date(b.appliedDate || 0) - new Date(a.appliedDate || 0))
  );

  const deptInfo = mockDepartments.find(d => Number(d.departmentId) === deptId);

  return { pendingEval, deptName: deptInfo?.departmentName || 'Phòng ban' };
}

/**
 * Legacy composable — kept for backward compatibility with existing views.
 * New views should prefer useHRApplications() or useManagerApplications().
 */
export function useRecruitmentStore(filterDeptId = null) {
  const candidates = computed(() => {
    let list = _store.applications;
    if (filterDeptId) {
      list = list.filter(a => Number(a.departmentId) === Number(filterDeptId));
    }
    return list.map(_shape)
      .sort((a, b) => new Date(b.appliedDate || 0) - new Date(a.appliedDate || 0));
  });

  return {
    candidates,
    // expose action aliases so existing call sites still work
    scheduleInterview,
    approveToManager: forwardToManager,
    submitManagerReview: (id, notes) => submitManagerEvaluation(id, { notes }, 'approve'),
    finalizeDecision: finalizeCandidate,
    rejectApplication,
    addApplication: submitApplication,
  };
}
