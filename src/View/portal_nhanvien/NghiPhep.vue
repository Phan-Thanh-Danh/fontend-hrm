<template>
  <div class="leave-wrapper container-fluid py-4 min-vh-100">
    
    <!-- Header Section -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
      <div>
        <h1 class="h3 fw-bold text-dark mb-1">Nghỉ phép</h1>
        <p class="text-secondary mb-0 fw-medium">Theo dõi và tạo yêu cầu nghỉ phép của bạn</p>
      </div>
    </div>

    <!-- Metric Cards -->
    <div class="row g-4 mb-4">
      <div class="col-md-4">
        <div class="card bento-card p-4 h-100 border border-1 border-opacity-10 border-dark">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="small fw-semibold text-secondary">Số dư phép năm</span>
            <span class="material-symbols-outlined text-brand-blue">account_balance_wallet</span>
          </div>
          <div class="display-6 fw-bold text-dark mt-2">
            12 <span class="h4 fw-bold mb-0">ngày</span>
          </div>
        </div>
      </div>
      
      <div class="col-md-4">
        <div class="card bento-card p-4 h-100 border border-1 border-opacity-10 border-dark">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="small fw-semibold text-secondary">Đã sử dụng</span>
            <span class="material-symbols-outlined text-brand-orange">event_available</span>
          </div>
          <div class="display-6 fw-bold text-brand-orange mt-2">
            3 <span class="h4 fw-bold mb-0">ngày</span>
          </div>
        </div>
      </div>
      
      <div class="col-md-4">
        <div class="card bento-card p-4 h-100 border border-1 border-opacity-10 border-dark">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="small fw-semibold text-secondary">Đang chờ duyệt</span>
            <span class="material-symbols-outlined text-brand-blue-light">pending_actions</span>
          </div>
          <div class="display-6 fw-bold text-brand-blue-light mt-2">
            1 <span class="h4 fw-bold mb-0">ngày</span>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4 d-flex align-items-stretch">
      <!-- Left Column: Lịch sử đơn nghỉ phép -->
      <div class="col-lg-8">
        <div class="card bento-card h-100 border border-1 border-opacity-10 border-dark overflow-hidden">
          <div class="p-4 border-bottom-custom">
            <h2 class="h6 fw-bold text-dark mb-0">Lịch sử đơn nghỉ phép</h2>
          </div>
          
          <div class="table-responsive">
            <table class="table table-borderless align-middle mb-0 custom-table">
              <thead class="bg-transparent border-bottom-custom">
                <tr>
                  <th class="py-3 px-4 text-secondary small fw-bold tracking-wider">LOẠI PHÉP</th>
                  <th class="py-3 px-2 text-secondary small fw-bold tracking-wider">THỜI GIAN NGHỈ</th>
                  <th class="py-3 px-2 text-secondary small fw-bold tracking-wider">TỔNG <br>NGÀY</th>
                  <th class="py-3 px-4 text-end text-secondary small fw-bold tracking-wider">TRẠNG <br>THÁI</th>
                </tr>
              </thead>
              <tbody class="fw-medium text-dark">
                <tr class="border-bottom-custom text-nowrap">
                  <td class="py-4 px-4 fw-bold text-dark">Nghỉ phép<br>năm</td>
                  <td class="py-4 px-2 text-secondary">15/10/2023 -<br>16/10/2023</td>
                  <td class="py-4 px-2 text-dark">2 ngày</td>
                  <td class="py-4 px-4 text-end">
                    <span class="badge status-success text-success-emphasis rounded-pill px-3 py-1 fw-bold x-small user-select-none">Đã duyệt</span>
                  </td>
                </tr>
                <tr class="border-bottom-custom text-nowrap">
                  <td class="py-4 px-4 fw-bold text-dark">Nghỉ ốm</td>
                  <td class="py-4 px-2 text-secondary">05/11/2023</td>
                  <td class="py-4 px-2 text-dark">1 ngày</td>
                  <td class="py-4 px-4 text-end">
                    <span class="badge status-success text-success-emphasis rounded-pill px-3 py-1 fw-bold x-small user-select-none">Đã duyệt</span>
                  </td>
                </tr>
                <tr class="text-nowrap">
                  <td class="py-4 px-4 fw-bold text-dark">Nghỉ phép<br>năm</td>
                  <td class="py-4 px-2 text-secondary">20/11/2023 -<br>21/11/2023</td>
                  <td class="py-4 px-2 text-dark">2 ngày</td>
                  <td class="py-4 px-4 text-end">
                    <span class="badge status-primary text-brand-blue rounded-pill px-3 py-1 fw-bold x-small user-select-none text-wrap text-center d-inline-block" style="width: 80px; line-height: 1.2;">Chờ<br>duyệt</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Right Column: Form tạo đơn nghỉ phép -->
      <div class="col-lg-4">
        <div class="card bento-card p-4 h-100 border border-1 border-opacity-10 border-dark d-flex flex-column">
          <h2 class="h6 fw-bold text-dark mb-4 d-flex align-items-center gap-2">
            <span class="material-symbols-outlined text-brand-blue fs-5">edit_square</span>
            Tạo đơn nghỉ phép
          </h2>
          
          <form class="d-flex flex-column gap-3 flex-grow-1">
            <!-- Loại nghỉ -->
            <div>
              <label class="form-label small fw-bold text-dark mb-2">Loại nghỉ</label>
              <select class="form-select custom-input text-dark fw-medium">
                <option selected>Nghỉ phép năm</option>
                <option>Nghỉ ốm</option>
                <option>Nghỉ không lương</option>
              </select>
            </div>

            <!-- Từ ngày / Đến ngày -->
            <div class="row g-2">
              <div class="col-6">
                <label class="form-label small fw-bold text-dark mb-2">Từ ngày</label>
                <input type="date" class="form-control custom-input text-secondary" placeholder="mm/dd/yy">
              </div>
              <div class="col-6">
                <label class="form-label small fw-bold text-dark mb-2">Đến ngày</label>
                <input type="date" class="form-control custom-input text-secondary" placeholder="mm/dd/yy">
              </div>
            </div>

            <!-- Lý do -->
            <div>
              <label class="form-label small fw-bold text-dark mb-2">Lý do</label>
              <textarea class="form-control custom-input text-secondary" rows="3" placeholder="Nhập lý do chi tiết tại đây..."></textarea>
            </div>

            <!-- Tài liệu đính kèm -->
            <div>
              <label class="form-label small fw-bold text-dark mb-2 d-flex justify-content-between align-items-center">
                <span>Tài liệu đính kèm</span>
                <span class="x-small text-muted fw-normal fst-italic">Tùy chọn (pdf, jpg, png...)</span>
              </label>
              <input class="form-control custom-input text-secondary small" type="file" id="formFile" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" style="padding: 0.4rem 0.75rem; font-size: 0.8rem;">
            </div>

            <!-- Info box -->
            <div class="info-box d-flex gap-3 align-items-start p-3 rounded-3 mt-auto">
              <span class="material-symbols-outlined text-brand-blue icon-filled fs-5 flex-shrink-0 mt-1">info</span>
              <p class="x-small text-secondary mb-0 fw-medium lh-base">
                Đơn nghỉ của bạn sẽ được gửi đến quản lý trực tiếp để phê duyệt.
              </p>
            </div>

            <!-- Submit button -->
            <button type="submit" class="btn btn-brand-blue w-100 fw-bold py-2 mt-3 rounded-3 shadow-sm">
              Gửi đơn nghỉ phép
            </button>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
</script>

<style scoped>
.leave-wrapper {
  background-color: #F8FAFC;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

/* Material Symbols Override */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
.material-symbols-outlined.icon-filled {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* Base Card Styling - Soft UI/Bento Grid feel */
.bento-card {
  border-radius: 1rem;
  background: #ffffff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
}

/* Brand Colors */
.text-brand-blue { color: #3B58E9 !important; }
.bg-brand-blue { background-color: #3B58E9 !important; }
.btn-brand-blue {
  background-color: #3B58E9;
  border-color: #3B58E9;
  color: white;
}
.btn-brand-blue:hover {
  background-color: #2b45cf;
  border-color: #2b45cf;
  color: white;
}

.text-brand-orange { color: #DD7C37 !important; }
.text-brand-blue-light { color: #5B75ED !important; }

/* Status Badges */
.status-success {
  background-color: #E6F5EA !important;
}
.text-success-emphasis {
  color: #2D8A4E !important;
}
.status-primary {
  background-color: #EAF0FF !important;
}

/* Inputs */
.custom-input {
  border-radius: 0.5rem;
  border: 1px solid #E2E8F0;
  font-size: 0.875rem;
  background-color: #FAFCFF;
  padding: 0.6rem 0.75rem;
}
.custom-input:focus {
  border-color: #3B58E9;
  box-shadow: 0 0 0 0.2rem rgba(59, 88, 233, 0.1);
  outline: none;
  background-color: #ffffff;
}

/* Table overrides */
.border-bottom-custom {
  border-bottom: 1px solid #F1F5F9 !important;
}

/* Helpers */
.tracking-wider {
  letter-spacing: 0.05em;
}
.x-small {
  font-size: 0.75rem;
}

/* Info Box */
.info-box {
  background-color: #F1F4FF;
  border: 1px solid #E5ECFF;
}

/* Make inputs inside form take appropriate sizes */
textarea.custom-input {
  resize: vertical;
}

input[type="date"].custom-input::-webkit-calendar-picker-indicator {
  color: #64748B;
  opacity: 0.6;
}
</style>
