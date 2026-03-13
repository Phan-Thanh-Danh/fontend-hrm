<template>
  <div class="tuyen-dung-page">

    <!-- Main Content Split -->
    <div class="row g-4 mb-4">
      <!-- Left Column: Filter & Table -->
      <div class="col-xl-7">
        <!-- Filters -->
        <div class="card border-0 shadow-sm rounded-4 mb-3">
          <div class="card-body p-3">
            <div class="row g-3">
              <div class="col-md-5">
                <div class="input-group">
                  <span class="input-group-text bg-light border-0"><span class="material-symbols-outlined fs-5 text-muted">search</span></span>
                  <input type="text" class="form-control bg-light border-0 text-muted" placeholder="Tìm tên, vị trí...">
                </div>
              </div>
              <div class="col-md-4">
                <select class="form-select border-0 bg-light text-muted fw-medium py-2">
                  <option>Vị trí: Tất cả</option>
                </select>
              </div>
              <div class="col-md-3">
                <select class="form-select border-0 bg-light text-muted fw-medium py-2">
                  <option>Điểm AI: > 80</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Candidate Table -->
        <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light text-muted" style="font-size: 0.75rem; letter-spacing: 0.5px;">
                <tr>
                  <th class="border-0 px-4 py-3 text-uppercase fw-bold">Ứng viên</th>
                  <th class="border-0 py-3 text-uppercase fw-bold">Vị trí</th>
                  <th class="border-0 py-3 text-uppercase fw-bold text-center">Điểm AI</th>
                  <th class="border-0 py-3 text-uppercase fw-bold">Ngày nộp</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(candidate, index) in filteredCandidates" :key="candidate.id" :class="{'active-row': activeCandidateId === candidate.id, 'border-top': index > 0}">
                  <td class="px-4 py-3 border-bottom-0 cursor-pointer" @click="activeCandidateId = candidate.id">
                    <div class="d-flex align-items-center gap-3">
                      <div class="avatar-circle-sm bg-light text-dark fw-bold border" style="font-size: 0.75rem;">{{ candidate.initial }}</div>
                      <span class="fw-bold text-dark" style="font-size: 0.95rem;">{{ candidate.name }}</span>
                    </div>
                  </td>
                  <td class="text-muted fw-medium border-bottom-0 cursor-pointer" @click="activeCandidateId = candidate.id">{{ candidate.position }}</td>
                  <td class="text-center border-bottom-0 cursor-pointer" @click="activeCandidateId = candidate.id">
                    <span class="badge" :style="getAiScoreStyle(candidate.aiScore)">{{ candidate.aiScore }}/100</span>
                  </td>
                  <td class="text-muted small border-bottom-0 cursor-pointer" @click="activeCandidateId = candidate.id">{{ candidate.date }}</td>
                </tr>
                <tr v-if="filteredCandidates.length === 0">
                  <td colspan="4" class="text-center text-muted py-5">
                    Không có ứng viên nào thuộc danh sách này.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Right Column: CV Preview & AI -->
      <div class="col-xl-5">
        <div class="card border-0 shadow-sm rounded-4 h-100 placeholder-glow overflow-hidden d-flex flex-column bg-light pb-0">
            <div class="d-flex justify-content-between align-items-center p-3 border-bottom bg-white">
                <span class="text-muted fw-bold small text-uppercase" style="letter-spacing: 0.5px;">Xem trước CV: CV_NGUYENVANANH.PDF</span>
                <div class="d-flex gap-2">
                    <button class="btn btn-sm btn-light text-muted p-1 d-flex"><span class="material-symbols-outlined fs-5">zoom_in</span></button>
                    <button class="btn btn-sm btn-light text-muted p-1 d-flex"><span class="material-symbols-outlined fs-5">download</span></button>
                </div>
            </div>
            
            <div class="flex-grow-1 p-3 d-flex justify-content-center align-items-center" style="background-color: #eff6ff;">
                <div class="bg-white rounded p-4 shadow-sm w-75 h-100 d-flex flex-column gap-3">
                    <!-- Fake CV lines -->
                    <div class="bg-light rounded" style="width: 25%; height: 80px;"></div>
                    <div class="bg-light rounded mt-3" style="width: 50%; height: 16px;"></div>
                    
                    <div class="space-y-2 mt-4">
                        <div class="bg-light rounded" style="width: 100%; height: 12px;"></div>
                        <div class="bg-light rounded" style="width: 100%; height: 12px; margin-top: 6px;"></div>
                        <div class="bg-light rounded" style="width: 70%; height: 12px; margin-top: 6px;"></div>
                    </div>
                    
                    <div class="space-y-2 mt-4 mt-auto">
                        <div class="bg-light rounded" style="width: 100%; height: 12px;"></div>
                        <div class="bg-light rounded" style="width: 100%; height: 12px; margin-top: 6px;"></div>
                    </div>
                </div>
            </div>

            <!-- Dynamic Assessment/Schedule Panel Inside CV View -->
            <div class="bg-white p-4 border-top" style="z-index: 10; box-shadow: 0 -4px 6px -1px rgba(0,0,0,0.05);">
                <!-- Case 1: Needs Scheduling (Future or None) -->
                <div v-if="needsScheduling(activeCandidate)">
                    <h6 class="fw-bold text-dark mb-3">
                        <span class="material-symbols-outlined fs-5 align-middle text-primary me-1">calendar_month</span> 
                        Thiết lập lịch phỏng vấn
                    </h6>
                    <div class="row g-2 mb-3">
                        <div class="col-6">
                            <label class="form-label text-muted small fw-bold text-uppercase mb-1" style="font-size: 0.7rem;">Ngày</label>
                            <input type="date" class="form-control bg-light border-0 py-2 text-dark font-medium">
                        </div>
                        <div class="col-6">
                            <label class="form-label text-muted small fw-bold text-uppercase mb-1" style="font-size: 0.7rem;">Giờ</label>
                            <input type="time" class="form-control bg-light border-0 py-2 text-dark font-medium">
                        </div>
                    </div>
                    <button class="btn btn-primary w-100 fw-medium py-2 rounded-3 mt-1">Lưu lịch & Gửi mail</button>
                </div>

                <!-- Case 2: Past Interview (Ready for Pass/Fail) -->
                <div v-else>
                    <h6 class="fw-bold text-dark mb-3">
                        <span class="material-symbols-outlined fs-5 align-middle text-primary me-1">rate_review</span> 
                        Phỏng vấn xong - Đánh giá kết quả
                    </h6>
                    <div class="mb-3">
                        <textarea class="form-control bg-light border-0 py-2 text-dark" rows="2" placeholder="Nhập nhận xét chi tiết..."></textarea>
                    </div>
                    <div class="d-flex gap-4 mb-4 px-2">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" :name="'result_' + activeCandidate.id" id="resultPass" style="border-color: #cbd5e1;">
                            <label class="form-check-label fw-bold text-success" for="resultPass" style="font-size: 0.85rem;">PASS</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" :name="'result_' + activeCandidate.id" id="resultFail" style="border-color: #cbd5e1;">
                            <label class="form-check-label fw-bold" style="color: #475569; font-size: 0.85rem;" for="resultFail">FAIL</label>
                        </div>
                    </div>
                    <button class="btn btn-dark w-100 fw-medium py-2 rounded-3">Lưu kết quả thao tác</button>
                </div>
            </div>
        </div>
      </div>
    </div>



    <!-- Bottom List -->
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-body p-0">
        <!-- Inner tabs -->
        <div class="d-flex border-bottom bg-light rounded-top-4" style="padding: 2px;">
            <div class="flex-grow-1 text-center bg-white rounded-3 shadow-sm py-2 text-primary fw-medium small m-1 cursor-pointer">
                Danh sách Trúng tuyển (12)
            </div>
            <div class="flex-grow-1 text-center py-2 text-muted fw-medium small m-1 cursor-pointer">
                Danh sách Từ chối (45)
            </div>
        </div>

        <!-- Horizontal candidate list -->
        <div class="p-4">
            <div class="row g-3 d-flex align-items-center mb-3">
                <div class="col-md-3">
                    <div class="border rounded-4 p-3 d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center gap-3">
                            <div class="avatar-circle-sm bg-success bg-opacity-10 text-success fw-bold p-2 rounded-circle" style="font-size: 0.75rem; width: 36px; height: 36px;">PT</div>
                            <div>
                                <h6 class="mb-0 fw-bold text-dark text-nowrap" style="font-size: 0.85rem;">Phan Thành</h6>
                                <span class="text-muted" style="font-size: 0.7rem;">iOS Developer</span>
                            </div>
                        </div>
                        <button class="btn btn-link text-muted p-0"><span class="material-symbols-outlined fs-5">more_vert</span></button>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="border rounded-4 p-3 d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center gap-3">
                            <div class="avatar-circle-sm bg-success bg-opacity-10 text-success fw-bold p-2 rounded-circle" style="font-size: 0.75rem; width: 36px; height: 36px;">HM</div>
                            <div>
                                <h6 class="mb-0 fw-bold text-dark text-nowrap" style="font-size: 0.85rem;">Hoàng My</h6>
                                <span class="text-muted" style="font-size: 0.7rem;">Product Owner</span>
                            </div>
                        </div>
                        <button class="btn btn-link text-muted p-0"><span class="material-symbols-outlined fs-5">more_vert</span></button>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="border rounded-4 p-3 d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center gap-3">
                            <div class="avatar-circle-sm bg-success bg-opacity-10 text-success fw-bold p-2 rounded-circle" style="font-size: 0.75rem; width: 36px; height: 36px;">VD</div>
                            <div>
                                <h6 class="mb-0 fw-bold text-dark text-nowrap" style="font-size: 0.85rem;">Vũ Duy</h6>
                                <span class="text-muted" style="font-size: 0.7rem;">Data Scientist</span>
                            </div>
                        </div>
                        <button class="btn btn-link text-muted p-0"><span class="material-symbols-outlined fs-5">more_vert</span></button>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="border rounded-4 p-3 d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center gap-3">
                            <div class="avatar-circle-sm bg-success bg-opacity-10 text-success fw-bold p-2 rounded-circle" style="font-size: 0.75rem; width: 36px; height: 36px;">KL</div>
                            <div>
                                <h6 class="mb-0 fw-bold text-dark text-nowrap" style="font-size: 0.85rem;">Khánh Linh</h6>
                                <span class="text-muted" style="font-size: 0.7rem;">QA Engineer</span>
                            </div>
                        </div>
                        <button class="btn btn-link text-muted p-0"><span class="material-symbols-outlined fs-5">more_vert</span></button>
                    </div>
                </div>
            </div>

            <!-- Expand btn -->
            <div class="text-center mt-3 pt-3 border-top border-light">
                <a href="#" class="text-decoration-none fw-bold small text-primary">Xem toàn bộ 12 ứng viên trúng tuyển</a>
            </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const activeCandidateId = ref(1);

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
  if (currentStatus === 'pass') {
    return candidates.value.filter(c => c.status === 'pass');
  } else if (currentStatus === 'fail') {
    return candidates.value.filter(c => c.status === 'fail');
  }
  return candidates.value; // 'all'
});

const getAiScoreStyle = (score) => {
  if (score >= 80) return 'background-color: #dcfce7; color: #16a34a;'; // Xanh lá
  if (score >= 70) return 'background-color: #fef08a; color: #ca8a04;'; // Vàng
  return 'background-color: #fee2e2; color: #ef4444;'; // Đỏ
};
</script>

<style scoped>
.avatar-circle-sm {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 38px;
    height: 38px;
}

.active-row {
    background-color: rgba(59, 130, 246, 0.05);
}

.active-row td:first-child {
    box-shadow: inset 4px 0 0 0 #0d6efd;
}

.cursor-pointer {
    cursor: pointer;
}
</style>
