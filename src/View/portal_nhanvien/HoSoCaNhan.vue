<template>
  <div class="profile-wrapper container-fluid py-4 min-vh-100 bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] font-sans">
    
    <!-- Top Header Card -->
    <div class="bg-[var(--sys-bg-surface)] rounded-4 shadow-sm border border-[var(--sys-border-subtle)] p-6 md:p-8 mb-6 overflow-hidden relative group">
      <div class="absolute top-0 right-0 w-64 h-64 bg-[var(--sys-brand-solid)]/5 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110"></div>
      
      <div class="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-6 relative z-10">
        <!-- Avatar Section -->
        <div class="position-relative flex-shrink-0">
          <div class="avatar-circle rounded-4 overflow-hidden bg-[var(--sys-bg-page)] border-2 border-[var(--sys-brand-soft)] shadow-sm d-flex align-items-center justify-content-center" style="width: 120px; height: 120px;">
             <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Avatar" class="w-100 h-100 object-fit-cover" />
          </div>
          <button class="btn bg-[var(--sys-bg-surface)] hover:bg-[var(--sys-bg-hover)] text-[var(--sys-brand-solid)] btn-sm rounded-circle shadow-sm position-absolute d-flex align-items-center justify-content-center p-2 border border-[var(--sys-border-subtle)] transition-all" style="width: 36px; height: 36px; right: -6px; bottom: 6px;">
            <span class="material-symbols-outlined fs-6" style="font-variation-settings: 'FILL' 1;">photo_camera</span>
          </button>
        </div>
        
        <!-- Info Section -->
        <div class="flex-grow-1 text-center text-md-start w-100">
          <div class="d-flex flex-column flex-md-row align-items-center gap-3 mb-4">
            <h1 class="text-3xl font-black text-[var(--sys-text-primary)] tracking-tight mb-0">Nguyễn Văn An</h1>
            <span class="status-approved badge text-[10px] font-black text-uppercase tracking-widest px-3 py-2 rounded-4">Đang làm việc</span>
          </div>
          
          <div class="row g-4 pt-2">
            <div class="col-sm-6 col-md-3 border-end-md">
              <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1 italic">Mã nhân viên</p>
              <p class="font-black text-[var(--sys-text-primary)] mb-0">NV00123</p>
            </div>
            <div class="col-sm-6 col-md-3 border-end-md">
              <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1 italic">Phòng ban</p>
              <a href="#" class="font-black text-[var(--sys-brand-solid)] hover:underline no-underline decoration-2">Kỹ thuật</a>
            </div>
            <div class="col-sm-6 col-md-3 border-end-md">
              <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1 italic">Chức vụ</p>
              <p class="font-bold text-[var(--sys-text-primary)] mb-0 italicOpacity">Lập trình viên Senior</p>
            </div>
            <div class="col-sm-6 col-md-3">
              <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1 italic">Ngày vào làm</p>
              <p class="font-bold text-[var(--sys-text-primary)] mb-0">01/01/2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4 d-flex align-items-stretch">
      <!-- Left Column: Personal Info & Certificates -->
      <div class="col-lg-8 d-flex flex-column gap-6">
        
        <!-- Thông tin cá nhân -->
        <div class="bg-[var(--sys-bg-surface)] rounded-4 shadow-sm border border-[var(--sys-border-subtle)] p-6 md:p-8">
          <h2 class="text-base font-black text-[var(--sys-text-primary)] uppercase tracking-tight italic mb-6">Thông tin cá nhân</h2>
          
          <form class="row g-4">
            <!-- Row 1 -->
            <div class="col-md-6">
              <label class="text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2 italic d-block">Họ và tên</label>
              <div class="input-icon-wrapper">
                <span class="material-symbols-outlined input-icon text-[var(--sys-text-secondary)] opacity-50">person</span>
                <input type="text" class="form-control custom-input bg-[var(--sys-bg-page)] border-[var(--sys-border-strong)] text-[var(--sys-text-primary)] font-bold rounded-xl" value="Nguyễn Văn An" readonly>
              </div>
            </div>
            <div class="col-md-6">
              <label class="text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2 italic d-block">Ngày sinh</label>
              <div class="input-icon-wrapper">
                <span class="material-symbols-outlined input-icon text-[var(--sys-text-secondary)] opacity-50">cake</span>
                <input type="text" class="form-control custom-input bg-[var(--sys-bg-page)] border-[var(--sys-border-strong)] text-[var(--sys-text-primary)] font-bold rounded-xl" value="15/05/1992" readonly>
              </div>
            </div>
            <!-- Row 2 -->
            <div class="col-md-6">
              <label class="text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2 italic d-block">Giới tính</label>
              <div class="input-icon-wrapper select-wrapper">
                <span class="material-symbols-outlined input-icon text-[var(--sys-text-secondary)] opacity-50">wc</span>
                <select class="form-select custom-input bg-[var(--sys-bg-page)] border-[var(--sys-border-strong)] text-[var(--sys-text-primary)] font-bold rounded-xl" disabled>
                  <option selected>Nam</option>
                  <option>Nữ</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <label class="text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2 italic d-block">Số điện thoại</label>
              <div class="input-icon-wrapper">
                <span class="material-symbols-outlined input-icon text-[var(--sys-text-secondary)] opacity-50">call</span>
                <input type="text" class="form-control custom-input bg-[var(--sys-bg-page)] border-[var(--sys-border-strong)] text-[var(--sys-text-primary)] font-bold rounded-xl" value="090 123 4567" readonly>
              </div>
            </div>
            <!-- Row 3 -->
            <div class="col-12">
              <label class="text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2 italic d-block">Email cá nhân</label>
              <div class="input-icon-wrapper">
                <span class="material-symbols-outlined input-icon text-[var(--sys-text-secondary)] opacity-50">mail</span>
                <input type="email" class="form-control custom-input bg-[var(--sys-bg-page)] border-[var(--sys-border-strong)] text-[var(--sys-text-primary)] font-bold rounded-xl" value="an.nguyen92@gmail.com" readonly>
              </div>
            </div>
            <!-- Row 4 -->
            <div class="col-12">
              <label class="text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2 italic d-block">Địa chỉ thường trú</label>
              <div class="input-icon-wrapper">
                <span class="material-symbols-outlined input-icon text-[var(--sys-text-secondary)] opacity-50">location_on</span>
                <input type="text" class="form-control custom-input bg-[var(--sys-bg-page)] border-[var(--sys-border-strong)] text-[var(--sys-text-primary)] font-bold rounded-xl" value="Số 123 Đường ABC, Phường 4, Quận Tân Bình, TP. Hồ Chí Minh" readonly>
              </div>
            </div>
            <!-- Row 5 -->
            <div class="col-12">
              <label class="text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2 italic d-block">Số CCCD / Hộ chiếu</label>
              <div class="input-icon-wrapper">
                <span class="material-symbols-outlined input-icon text-[var(--sys-text-secondary)] opacity-50">badge</span>
                <input type="text" class="form-control custom-input bg-[var(--sys-bg-page)] border-[var(--sys-border-strong)] text-[var(--sys-text-primary)] font-bold rounded-xl" value="012345678901" readonly>
              </div>
            </div>

            <!-- Nút Lưu thay đổi -->
            <div class="col-12 mt-4 pt-6 border-t border-[var(--sys-border-subtle)] d-flex justify-content-end">
              <button type="button" class="bg-[var(--sys-brand-solid)] hover:bg-[var(--sys-brand-hover)] text-white font-black px-6 py-3 rounded-xl shadow-lg shadow-[var(--sys-brand-solid-lch-30)] transition-all active:scale-95 flex items-center gap-2">
                <span class="material-symbols-outlined text-xl">save</span>
                Cập nhật thông tin
              </button>
            </div>
          </form>
        </div>

        <!-- Bằng cấp & Chứng chỉ -->
        <div class="bg-[var(--sys-bg-surface)] rounded-4 shadow-sm border border-[var(--sys-border-subtle)] overflow-hidden">
          <div class="px-8 py-5 border-b border-[var(--sys-border-subtle)] flex justify-between items-center bg-[var(--sys-bg-page)]/30">
            <h2 class="text-base font-black text-[var(--sys-text-primary)] uppercase tracking-tight italic mb-0">Bằng cấp & Chứng chỉ</h2>
            <button class="text-[var(--sys-brand-solid)] font-black text-[11px] uppercase tracking-widest hover:underline flex items-center gap-1 bg-transparent border-0">
              <span class="material-symbols-outlined text-lg">add_circle</span>
              Thêm mới
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-[var(--sys-bg-hover)]/50">
                  <th class="px-8 py-5 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest italic border-b border-[var(--sys-border-subtle)]">Tên bằng cấp / Chứng chỉ</th>
                  <th class="px-4 py-5 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest italic border-b border-[var(--sys-border-subtle)]">Nơi đào tạo</th>
                  <th class="px-4 py-5 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest italic border-b border-[var(--sys-border-subtle)] text-center">Năm</th>
                  <th class="px-8 py-5 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest italic border-b border-[var(--sys-border-subtle)] text-end text-nowrap">File đính kèm</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[var(--sys-border-subtle)] text-sm font-medium">
                <tr class="group hover:bg-[var(--sys-bg-hover)] transition-all">
                  <td class="px-8 py-4 font-black text-[var(--sys-text-primary)]">Kỹ sư Công nghệ thông tin</td>
                  <td class="px-4 py-4 text-[var(--sys-text-secondary)] italic">Đại học Bách Khoa TP.HCM</td>
                  <td class="px-4 py-4 text-center font-bold">2014</td>
                  <td class="px-8 py-4 text-end">
                    <a href="#" class="text-[var(--sys-brand-solid)] hover:text-[var(--sys-brand-hover)] no-underline flex items-center justify-content-end gap-1 font-black text-xs uppercase tracking-tighter">
                      <span class="material-symbols-outlined text-base">attach_file</span>
                      Tai_lieu.pdf
                    </a>
                  </td>
                </tr>
                <tr class="group hover:bg-[var(--sys-bg-hover)] transition-all">
                  <td class="px-8 py-4 font-black text-[var(--sys-text-primary)]">AWS Certified Solutions Architect</td>
                  <td class="px-4 py-4 text-[var(--sys-text-secondary)] italic">Amazon Web Services</td>
                  <td class="px-4 py-4 text-center font-bold">2022</td>
                  <td class="px-8 py-4 text-end">
                    <a href="#" class="text-[var(--sys-brand-solid)] hover:text-[var(--sys-brand-hover)] no-underline flex items-center justify-content-end gap-1 font-black text-xs uppercase tracking-tighter">
                      <span class="material-symbols-outlined text-base">attach_file</span>
                      aws_cert.pdf
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Right Column: Thông tin công việc -->
      <div class="col-lg-4">
        <div class="bg-[var(--sys-bg-surface)] rounded-4 shadow-sm border border-[var(--sys-border-subtle)] p-6 md:p-8 h-full flex flex-col">
          <h2 class="text-base font-black text-[var(--sys-text-primary)] uppercase tracking-tight italic mb-8">Thông tin công việc</h2>
          
          <div class="flex flex-col gap-8 flex-grow">
            <!-- Info Item -->
            <div class="flex gap-4 items-start group">
              <div class="w-10 h-10 rounded-xl bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center shrink-0 border border-[var(--sys-brand-subtle)] group-hover:bg-[var(--sys-brand-solid)] group-hover:text-white transition-all">
                <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">account_tree</span>
              </div>
              <div>
                <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1 italic">Phòng ban</p>
                <p class="text-sm font-black text-[var(--sys-text-primary)] mb-0">Kỹ thuật & Công nghệ</p>
              </div>
            </div>

            <!-- Info Item -->
            <div class="flex gap-4 items-start group">
              <div class="w-10 h-10 rounded-xl bg-[var(--sys-info-soft)] text-[var(--sys-info-text)] flex items-center justify-center shrink-0 border border-[var(--sys-info-border)] group-hover:bg-[var(--sys-info-solid)] group-hover:text-white transition-all">
                <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">badge</span>
              </div>
              <div>
                <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1 italic">Chức vụ</p>
                <p class="text-sm font-black text-[var(--sys-text-primary)] mb-0">Lập trình viên Senior (Lv.4)</p>
              </div>
            </div>

            <!-- Info Item -->
            <div class="flex gap-4 items-start group">
              <div class="w-10 h-10 rounded-xl bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] flex items-center justify-center shrink-0 border border-[var(--sys-border-subtle)] group-hover:border-[var(--sys-brand-solid)] transition-all">
                <div class="w-7 h-7 rounded-lg overflow-hidden border border-[var(--sys-border-subtle)]">
                   <img src="https://i.pravatar.cc/150?u=nam_le" alt="Manager" class="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1 italic">Quản lý trực tiếp</p>
                <p class="text-sm font-black text-[var(--sys-text-primary)] mb-0">Lê Hoàng Nam</p>
              </div>
            </div>

            <!-- Info Item -->
            <div class="flex gap-4 items-start group">
              <div class="w-10 h-10 rounded-xl bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] flex items-center justify-center shrink-0 border border-[var(--sys-success-border)] group-hover:bg-[var(--sys-success-solid)] group-hover:text-white transition-all">
                <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">description</span>
              </div>
              <div>
                <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1 italic">Loại hợp đồng</p>
                <p class="text-sm font-black text-[var(--sys-text-primary)] mb-0 leading-tight">Hợp đồng vô thời hạn</p>
              </div>
            </div>

            <!-- Info Item -->
            <div class="flex gap-4 items-start group">
              <div class="w-10 h-10 rounded-xl bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] flex items-center justify-center shrink-0 border border-[var(--sys-warning-border)] group-hover:bg-[var(--sys-warning-solid)] group-hover:text-white transition-all">
                <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">event</span>
              </div>
              <div>
                <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1 italic">Ngày bắt đầu</p>
                <p class="text-sm font-black text-[var(--sys-text-primary)] mb-0">01 tháng 01, 2023</p>
              </div>
            </div>
          </div>

          <!-- Retention Metric -->
          <div class="mt-8 pt-6 border-t border-[var(--sys-border-subtle)]">
            <div class="flex justify-between items-end mb-3">
              <p class="text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest italic mb-0">Thời gian gắn bó</p>
              <p class="text-xs font-black text-[var(--sys-brand-solid)] mb-0 uppercase tracking-tighter">1 năm 2 tháng</p>
            </div>
            <div class="h-2 w-full bg-[var(--sys-bg-page)] rounded-full overflow-hidden border border-[var(--sys-border-subtle)]">
              <div class="h-full bg-[var(--sys-brand-solid)] transition-all shadow-sm" style="width: 50%"></div>
            </div>
            <button class="w-full mt-6 bg-[var(--sys-bg-page)] hover:bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] font-black text-[10px] uppercase tracking-widest py-3 rounded-xl border border-[var(--sys-border-strong)] transition-all">
              Xem lịch sử thăng tiến
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Danger Zone Footer -->
    <div class="mt-12 pt-6 border-t border-[var(--sys-danger-border)]/30 flex justify-end">
      <router-link to="/don-nghi-viec" class="bg-[var(--sys-danger-soft)] hover:bg-[var(--sys-danger-solid)] text-[var(--sys-danger-text)] hover:text-white font-black px-6 py-3 rounded-xl border border-[var(--sys-danger-border)] transition-all active:scale-95 flex items-center gap-2 no-underline">
        <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 0;">directions_run</span>
        <span class="text-xs uppercase tracking-widest">Nộp đơn nghỉ việc</span>
      </router-link>
    </div>

  </div>
</template>

<script setup>
</script>

<style scoped>
.profile-wrapper {
  background-color: transparent;
}

.avatar-circle {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.avatar-circle:hover {
  transform: scale(1.05);
}

.status-approved {
  background-color: var(--sys-success-soft) !important;
  color: var(--sys-success-text) !important;
  border: 1px solid var(--sys-success-border) !important;
}

.input-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.input-icon {
  position: absolute;
  left: 1.25rem;
  font-size: 1.25rem;
  z-index: 2;
}
.custom-input {
  padding-left: 3rem !important;
  padding-top: 0.875rem !important;
  padding-bottom: 0.875rem !important;
  font-size: 0.875rem;
}
.custom-input[readonly], .custom-input[disabled] {
  opacity: 0.8 !important;
  cursor: default;
}
.custom-input:focus {
  border-color: var(--sys-brand-solid) !important;
  box-shadow: 0 0 0 4px var(--sys-brand-subtle) !important;
  outline: none;
}

.italicOpacity {
  opacity: 0.9;
}

@media (min-width: 768px) {
  .border-end-md {
    border-right: 1px solid var(--sys-border-subtle) !important;
  }
}

/* Material Symbols settings */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
