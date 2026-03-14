<template>
  <div class="lich-phong-van-page space-y-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-black text-slate-900 tracking-tight">Lịch Phỏng Vấn</h1>
      <p class="text-slate-500 text-sm font-medium italic">Sắp xếp, theo dõi và quản lý các buổi phỏng vấn ứng viên.</p>
    </div>

    <!-- Toolbar -->
    <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
      <div class="d-flex gap-3 align-items-center flex-wrap">
        <!-- View Toggle -->
        <div class="bg-white rounded-3 shadow-sm p-1 d-flex">
          <button @click="currentView = 'calendar'" :class="['btn btn-sm fw-medium px-3 d-flex align-items-center gap-1 border-0 rounded-2', currentView === 'calendar' ? 'btn-light text-primary shadow-sm' : 'text-muted hover-bg-light']">
            <span class="material-symbols-outlined fs-6">calendar_month</span> Lịch
          </button>
          <button @click="currentView = 'list'" :class="['btn btn-sm fw-medium px-3 d-flex align-items-center gap-1 border-0 rounded-2', currentView === 'list' ? 'btn-light text-primary shadow-sm' : 'text-muted hover-bg-light']">
            <span class="material-symbols-outlined fs-6">format_list_bulleted</span> Danh sách
          </button>
        </div>

        <!-- Filters -->
        <select v-model="filterStatus" class="form-select border-0 shadow-sm rounded-3 py-2 text-muted fw-medium" style="width: 140px;">
          <option value="">Trạng thái (Tất cả)</option>
          <option value="Sắp diễn ra">Sắp diễn ra</option>
          <option value="Đã xong">Đã xong</option>
          <option value="Đã hủy">Đã hủy</option>
        </select>
        <select v-model="filterInterviewer" class="form-select border-0 shadow-sm rounded-3 py-2 text-muted fw-medium" style="width: 180px;">
          <option value="">Người phỏng vấn (Tất cả)</option>
          <option v-for="nhanSu in danhSachNhanSu" :key="'filter-' + nhanSu.id" :value="nhanSu.id">
            {{ nhanSu.name }}
          </option>
        </select>
        <div class="bg-white border-0 shadow-sm rounded-3 py-2 px-3 text-muted fw-medium d-flex align-items-center gap-2 cursor-pointer">
          <span class="material-symbols-outlined fs-5">date_range</span>
          10/10/2023 - 17/10/2023
        </div>
      </div>

      <button @click="showCreateModal = true" class="px-5 py-2.5 bg-indigo-600 rounded-xl font-black text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2">
        <span class="material-symbols-outlined text-[20px]">add</span>
        Tạo lịch mới
      </button>
    </div>

    <!-- Main Content -->
    <div class="row g-4 position-relative">
      
      <!-- Center Content: Calendar & List -->
      <div class="col-12 d-flex flex-column gap-4">
        
        <!-- Calendar Widget -->
        <div v-show="currentView === 'calendar'" class="card border-0 shadow-sm rounded-4 mb-4">
          <div class="card-body p-4">
            <!-- Calendar Header -->
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div class="d-flex align-items-center gap-3">
                <button class="btn btn-sm btn-light p-1 border-0 text-dark"><span class="material-symbols-outlined">chevron_left</span></button>
                <h5 class="fw-bold mb-0 text-dark">Tháng 10, 2023</h5>
                <button class="btn btn-sm btn-light p-1 border-0 text-dark"><span class="material-symbols-outlined">chevron_right</span></button>
              </div>
              <div class="btn-group border rounded-2 p-1" role="group">
                <button type="button" class="btn btn-sm btn-white text-muted fw-medium border-0 px-3">Ngày</button>
                <button type="button" class="btn btn-sm btn-white text-muted fw-medium border-0 px-3">Tuần</button>
                <button type="button" class="btn btn-sm btn-white text-dark shadow-sm rounded-1 fw-bold border-0 px-3">Tháng</button>
              </div>
            </div>

            <!-- Calendar Grid Placeholder -->
            <div class="calendar-grid">
              <!-- Header -->
              <div class="text-center text-muted fw-semibold small py-2 border-bottom">T2</div>
              <div class="text-center text-muted fw-semibold small py-2 border-bottom">T3</div>
              <div class="text-center text-muted fw-semibold small py-2 border-bottom">T4</div>
              <div class="text-center text-muted fw-semibold small py-2 border-bottom">T5</div>
              <div class="text-center text-muted fw-semibold small py-2 border-bottom">T6</div>
              <div class="text-center text-muted fw-semibold small py-2 border-bottom">T7</div>
              <div class="text-center text-muted fw-semibold small py-2 border-bottom">CN</div>

              <!-- Row 1 -->
              <div class="calendar-cell text-muted p-2">9</div>
              <div class="calendar-cell text-muted p-2 border-start">10</div>
              
              <!-- Active Day with Events -->
              <div class="calendar-cell active-day p-2 border-start">
                <div class="fw-bold mb-2" style="color: #4f46e5;">11</div>
                <div class="bg-primary bg-opacity-10 text-primary border-start border-3 border-primary rounded pe-1 ps-2 py-1 mb-2 small fw-medium" style="font-size: 0.75rem;">
                  09:00 - <br>Nguyễn Văn A
                </div>
                <!-- Highlight when matched filter logic goes here if data is fully integrated to calendar via v-for -->
                <div class="text-dark border-start border-3 rounded pe-1 ps-2 py-1 small" style="font-size: 0.75rem; border-color: #9ca3af !important; background-color: #f3f4f6;">
                  14:30 - Lê Văn C
                </div>
              </div>

              <!-- Day with Event -->
              <div class="calendar-cell p-2 border-start">
                <div class="text-muted mb-2">12</div>
                <div class="bg-info bg-opacity-10 text-primary border-start border-3 border-info rounded pe-1 ps-2 py-1 mb-2 small fw-medium" style="font-size: 0.75rem;">
                  10:00 - Hoàng Thị E
                </div>
              </div>

              <div class="calendar-cell text-muted p-2 border-start">13</div>
              <div class="calendar-cell text-muted p-2 border-start">14</div>
              <div class="calendar-cell text-muted p-2 border-start">15</div>
            </div>
            <!-- Padding hack to maintain height -->
            <div style="min-height: 15px;"></div>
          </div>
        </div>

        <!-- Recent Interviews List -->
        <div class="card border-0 shadow-sm rounded-4 h-100 flex-grow-1">
          <div class="card-body p-4">
            <h6 class="fw-bold d-flex align-items-center gap-2 mb-4">
              <span class="material-symbols-outlined fs-5 text-primary">view_list</span> Danh sách phỏng vấn gần đây
            </h6>

            <div class="table-responsive">
              <table class="table align-middle text-dark mb-0 table-borderless table-hover">
                <thead class="border-bottom" style="font-size: 0.75rem; color: #6b7280; font-weight: 600;">
                  <tr>
                    <th class="py-3 text-uppercase">Ứng viên</th>
                    <th class="py-3 text-uppercase">Thời gian</th>
                    <th class="py-3 text-uppercase">Người phỏng vấn</th>
                    <th class="py-3 text-uppercase text-center">Trạng thái</th>
                    <th class="py-3 text-uppercase text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody style="font-size: 0.9rem;">
                  <!-- Render List with dynamic filtering -->
                  <tr v-for="interview in filteredInterviews" :key="interview.id" class="border-bottom">
                    <td class="py-3 fw-bold" :class="{'text-muted': interview.status === 'Đã hủy'}">{{ interview.candidate }}</td>
                    <td class="text-muted">{{ interview.date }} - {{ interview.time }}</td>
                    <td class="text-muted">{{ getInterviewerName(interview.interviewerId) }}</td>
                    <td class="text-center">
                      <span class="badge fw-medium px-2 py-1 rounded" :class="getStatusBadgeClass(interview.status)">
                        {{ interview.status }}
                      </span>
                    </td>
                    <td class="text-center text-muted">
                      <span @click="interview.status !== 'Đã hủy' ? openEvaluateModal(interview.candidate) : null" :class="['material-symbols-outlined fs-6 hover-text-dark me-2', interview.status !== 'Đã hủy' ? 'cursor-pointer' : '']" :style="{ opacity: interview.status === 'Đã hủy' ? 0.5 : 1 }" title="Đánh giá phỏng vấn">edit</span>
                      <span v-if="interview.status !== 'Đã hủy'" class="material-symbols-outlined fs-6 cursor-pointer hover-text-dark" title="Hủy phỏng vấn">cancel</span>
                    </td>
                  </tr>

                  <!-- Empty State if filter yields no result -->
                  <tr v-if="filteredInterviews.length === 0">
                    <td colspan="5" class="text-center py-5 text-muted fw-medium">
                      <span class="material-symbols-outlined fs-2 mb-2" style="opacity: 0.5;">search_off</span>
                      <p class="mb-0">Không tìm thấy ca phỏng vấn phù hợp với bộ lọc.</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

    <!-- Toast Notification -->
      <div v-if="showToast" class="position-absolute d-flex align-items-center p-3 rounded-3 shadow-lg fade show" role="alert" style="background-color: #4ade80; color: white; bottom: -20px; right: 20px; width: max-content; z-index: 1050; border-bottom: 2px solid #22c55e;">
        <span class="material-symbols-outlined fs-5 me-2" style="background-color: rgba(255,255,255,0.2); border-radius: 50%; padding: 2px;">check</span>
        <span class="fw-medium font-size-sm">Dữ liệu đã được chuyển sang module Onboarding</span>
      </div>

    </div>

    <!-- Modal Overlay for Setup New Schedule -->
    <div v-if="showCreateModal" class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style="background-color: rgba(0, 0, 0, 0.4); z-index: 1060; backdrop-filter: blur(4px);">
      <!-- Setup new schedule card -->
      <div class="card border-0 shadow-lg rounded-4" style="width: 450px; max-width: 95vw;">
        <div class="card-body p-4 position-relative">
          <button @click="showCreateModal = false" class="btn btn-sm btn-light position-absolute top-0 end-0 m-3 rounded-circle p-2 d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;">
            <span class="material-symbols-outlined fs-6 text-muted">close</span>
          </button>
          <h6 class="fw-bold d-flex align-items-center gap-2 mb-4">
            <span class="material-symbols-outlined text-primary fs-5" style="color: #3b82f6 !important">add_box</span> Thiết lập lịch mới
          </h6>

          <div class="mb-3">
            <label class="form-label text-muted small fw-bold text-uppercase mb-1" style="font-size: 0.75rem;">Tên Ứng Viên</label>
            <input type="text" class="form-control bg-light border-0 rounded-3 py-2" placeholder="Nhập tên ứng viên">
          </div>

          <div class="row g-3 mb-3">
            <div class="col-7">
              <label class="form-label text-muted small fw-bold text-uppercase mb-1" style="font-size: 0.75rem;">Ngày</label>
              <div class="position-relative">
                <input type="date" class="form-control bg-light border-0 rounded-3 py-2">
              </div>
            </div>
            <div class="col-5">
              <label class="form-label text-muted small fw-bold text-uppercase mb-1" style="font-size: 0.75rem;">Giờ</label>
              <input type="time" class="form-control bg-light border-0 rounded-3 py-2">
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label text-muted small fw-bold text-uppercase mb-1" style="font-size: 0.75rem;">Người Phỏng Vấn</label>
            <select class="form-select bg-light border-0 rounded-3 py-2 text-muted pb-text">
              <option value="">Chọn nhân sự...</option>
              <option v-for="nhanSu in danhSachNhanSu" :key="nhanSu.id" :value="nhanSu.id">
                {{ nhanSu.name }} - {{ nhanSu.role }}
              </option>
            </select>
          </div>

          <div class="mb-4">
            <label class="form-label text-muted small fw-bold text-uppercase mb-1" style="font-size: 0.75rem;">Google Meet Link</label>
            <div class="position-relative">
              <span class="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-2 text-muted fs-6" style="opacity: 0.5;">link</span>
              <input type="text" class="form-control bg-light border-0 rounded-3 py-2 ps-5" placeholder="meet.google.com/...">
            </div>
          </div>

          <button @click="saveSchedule" class="w-full py-3 bg-indigo-600 text-white rounded-xl font-black hover:bg-indigo-700 shadow-xl shadow-indigo-100 uppercase tracking-widest text-xs transition-all">Lưu lịch</button>
        </div>
      </div>
    </div>

    <!-- Modal Overlay for Evaluate Interview -->
    <div v-if="showEvaluateModal" class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style="background-color: rgba(0, 0, 0, 0.4); z-index: 1060; backdrop-filter: blur(4px);">
      <div class="card border-0 shadow-lg rounded-4 position-relative overflow-hidden" style="width: 400px; max-width: 95vw;">
        <!-- Light decorative shape in background -->
        <div class="position-absolute rounded-circle" style="background-color: #3b82f6; width: 150px; height: 150px; top: -75px; right: -75px; opacity: 0.05;"></div>
        
        <div class="card-body p-4 position-relative z-index-1">
          <button @click="showEvaluateModal = false" class="btn btn-sm btn-light position-absolute top-0 end-0 m-3 rounded-circle p-2 d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;">
            <span class="material-symbols-outlined fs-6 text-muted">close</span>
          </button>
          <h6 class="fw-bold d-flex align-items-center gap-2 mb-4">
            <span class="material-symbols-outlined text-primary fs-5" style="color: #312e81 !important;">rate_review</span> Đánh giá phỏng vấn
          </h6>

          <div class="mb-3 d-flex flex-column">
            <span class="text-muted small fw-semibold text-uppercase" style="font-size: 0.7rem;">Ứng viên:</span>
            <span class="fw-bold text-dark small mt-1" style="font-size: 0.85rem; text-transform: uppercase;">{{ selectedCandidateToEvaluate }}</span>
          </div>

          <div class="mb-4">
            <textarea class="form-control bg-light border-0 rounded-3 p-3 text-dark" rows="3" placeholder="Nhập nhận xét chi tiết..."></textarea>
          </div>

          <div class="d-flex gap-4 mb-4">
            <div class="form-check d-flex align-items-center gap-2 ps-0">
              <input class="form-check-input ms-0 mt-0" style="border-color: #cbd5e1;" type="radio" name="passStatus" id="statPass">
              <label class="form-check-label fw-bold text-success" for="statPass" style="font-size: 0.85rem;">PASS</label>
            </div>
            <div class="form-check d-flex align-items-center gap-2 ps-0">
              <input class="form-check-input ms-0 mt-0" style="border-color: #cbd5e1;" type="radio" name="passStatus" id="statFail">
              <label class="form-check-label fw-bold" style="color: #475569; font-size: 0.85rem;" for="statFail">FAIL</label>
            </div>
          </div>

          <button @click="saveEvaluation" class="btn w-100 fw-medium py-2 rounded-3 text-white" style="background-color: #111827;">Lưu kết quả</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const showCreateModal = ref(false);
const showEvaluateModal = ref(false);
const showToast = ref(false);
const selectedCandidateToEvaluate = ref('');

// Filter States
const currentView = ref('calendar'); // 'calendar' or 'list'
const filterStatus = ref('');
const filterInterviewer = ref('');

// Dynamic HR Data
const danhSachNhanSu = ref([
  { id: '1', name: 'Hà Duy Kiên', role: 'Tech Lead' },
  { id: '2', name: 'Phạm Minh Đức', role: 'HR Manager' },
  { id: '3', name: 'Lê Tuyết Mai', role: 'Senior PM' },
  { id: '4', name: 'Trần Văn Hoàng', role: 'HR Specialist' },
  { id: '5', name: 'Nguyễn Thị Hương', role: 'Engineering Manager' }
]);

// Helper to look up name by ID
const getInterviewerName = (id) => {
  const hr = danhSachNhanSu.value.find(p => p.id === id);
  return hr ? hr.name : 'Chưa phân công';
};

// Mock Interview Data (could be fetched via API)
const interviewList = ref([
  { id: 1, candidate: 'Nguyễn Văn A', date: '15/10/2023', time: '09:00', interviewerId: '1', status: 'Sắp diễn ra', link: 'meet.google.co/abc' },
  { id: 2, candidate: 'Lê Văn C', date: '14/10/2023', time: '14:30', interviewerId: '3', status: 'Đã xong', link: 'Phòng họp 1' },
  { id: 3, candidate: 'Hoàng Thị E', date: '13/10/2023', time: '10:00', interviewerId: '2', status: 'Đã hủy', link: 'meet.google.co/xyz' },
  { id: 4, candidate: 'Đinh Tuấn Vũ', date: '16/10/2023', time: '13:00', interviewerId: '1', status: 'Sắp diễn ra', link: 'meet.google.co/iop' },
  { id: 5, candidate: 'Bùi Anh Đào', date: '12/10/2023', time: '09:30', interviewerId: '5', status: 'Đã xong', link: 'Phòng họp 2' }
]);

// Computed field to apply filters dynamically
const filteredInterviews = computed(() => {
  return interviewList.value.filter(item => {
    // Check status condition
    const matchStatus = filterStatus.value ? item.status === filterStatus.value : true;
    // Check interviewer condition
    const matchInterviewer = filterInterviewer.value ? item.interviewerId === filterInterviewer.value : true;
    
    return matchStatus && matchInterviewer;
  });
});

// Utility to apply correct visual badge
const getStatusBadgeClass = (status) => {
  switch(status) {
    case 'Sắp diễn ra': return 'bg-primary bg-opacity-10 text-primary';
    case 'Đã xong': return 'bg-success bg-opacity-10 text-success';
    case 'Đã hủy': return 'bg-secondary bg-opacity-10 text-secondary';
    default: return 'bg-light text-dark';
  }
};

const saveSchedule = () => {
  showCreateModal.value = false;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000); // Ẩn toast sau 3 giây
};

const openEvaluateModal = (candidateName) => {
  selectedCandidateToEvaluate.value = candidateName;
  showEvaluateModal.value = true;
};

const saveEvaluation = () => {
  showEvaluateModal.value = false;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000); // Ẩn toast sau 3 giây
};
</script>

<style scoped>
.hover-text-dark:hover {
  color: #111827 !important;
}

.hover-bg-light:hover {
  background-color: #f3f4f6 !important;
}

.cursor-pointer {
  cursor: pointer;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
}

.calendar-cell {
  min-height: 120px;
}

.active-day {
  background-color: #f8fafc;
}

.font-size-sm {
  font-size: 0.9rem;
}

.z-index-1 {
  z-index: 1;
}

/* Custom Checkbox/Radio colors */
.form-check-input:checked[type=radio] {
  background-color: #22c55e;
  border-color: #22c55e;
}
</style>
