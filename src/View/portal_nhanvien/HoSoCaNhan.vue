<template>
  <div class="profile-wrapper min-h-screen bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] p-4 md:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto space-y-6 bg-transparent">
      
      <!-- Top Header Card -->
      <div class="bg-[var(--sys-bg-surface)] rounded-lg shadow-sm border border-[var(--sys-border-subtle)] p-6 md:p-8 relative overflow-hidden group">
        <div class="absolute top-0 right-0 w-64 h-64 bg-[var(--sys-brand-soft)] rounded-full -mr-32 -mt-32 opacity-20 blur-2xl"></div>
        
        <div class="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10 bg-transparent">
          <!-- Avatar Section -->
          <div class="relative shrink-0">
            <div class="avatar-box rounded-lg overflow-hidden border-4 border-[var(--sys-brand-soft)] shadow-md bg-[var(--sys-bg-page)]">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Avatar" class="w-32 h-32 md:w-40 md:h-40 object-cover" />
            </div>
            <button class="absolute -right-2 -bottom-2 w-10 h-10 bg-white hover:bg-[var(--sys-brand-solid)] hover:text-white text-[var(--sys-brand-solid)] rounded-md shadow-lg border border-[var(--sys-border-strong)] flex items-center justify-center transition-all active:scale-95 group/cam">
              <span class="material-symbols-outlined text-[20px]">photo_camera</span>
            </button>
          </div>
          
          <!-- Info Section -->
          <div class="grow text-center md:text-left w-full h-full flex flex-col justify-center">
            <div class="flex flex-col md:flex-row items-center gap-4 mb-4">
              <h1 class="text-3xl font-bold text-[var(--sys-text-primary)] tracking-tight">Nguyễn Văn An</h1>
              <span class="bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-md border border-[var(--sys-success-border)] shadow-sm">Đang làm việc</span>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div class="bg-transparent text-left">
                <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider mb-1 opacity-60">Mã nhân viên</p>
                <p class="text-lg font-bold text-[var(--sys-text-primary)]">#NV-00123</p>
              </div>
              <div class="bg-transparent text-left">
                <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider mb-1 opacity-60">Phòng ban</p>
                <p class="text-lg font-bold text-[var(--sys-brand-solid)]">Kỹ thuật & CN</p>
              </div>
              <div class="bg-transparent text-left">
                <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider mb-1 opacity-60">Chức vụ</p>
                <p class="text-lg font-bold text-[var(--sys-text-primary)] opacity-80">Senior Dev</p>
              </div>
              <div class="bg-transparent text-left">
                <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider mb-1 opacity-60">Ngày gia nhập</p>
                <p class="text-lg font-bold text-[var(--sys-text-primary)]">01/01/2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-transparent">
        <!-- Left Column: Personal Info & Education -->
        <div class="lg:col-span-8 flex flex-col gap-6 bg-transparent">
          
          <!-- Main Form -->
          <div class="bg-[var(--sys-bg-surface)] rounded-lg shadow-sm border border-[var(--sys-border-subtle)] p-6 md:p-8">
            <h2 class="text-sm font-semibold text-[var(--sys-text-primary)] uppercase tracking-wide mb-8 flex items-center gap-2">
              <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-[22px]">person_edit</span>
              Hồ sơ chi tiết & Thông tin cá nhân
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 bg-transparent">
              <div class="space-y-1.5 text-left">
                <label class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide ml-1 opacity-60">Họ và tên</label>
                <div class="relative group">
                  <span class="absolute inset-y-0 left-3 flex items-center text-[var(--sys-text-secondary)] opacity-50 group-focus-within:text-[var(--sys-brand-solid)]">
                    <span class="material-symbols-outlined text-[20px]">person</span>
                  </span>
                  <input type="text" class="w-full h-10 pl-10 pr-4 bg-white border border-[var(--sys-border-strong)] rounded-md text-[13px] font-semibold text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm transition-all" value="Nguyễn Văn An" readonly>
                </div>
              </div>

              <div class="space-y-1.5 text-left">
                <label class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide ml-1 opacity-60">Ngày sinh</label>
                <div class="relative group">
                  <span class="absolute inset-y-0 left-3 flex items-center text-[var(--sys-text-secondary)] opacity-50 group-focus-within:text-[var(--sys-brand-solid)]">
                    <span class="material-symbols-outlined text-[20px]">cake</span>
                  </span>
                  <input type="text" class="w-full h-10 pl-10 pr-4 bg-white border border-[var(--sys-border-strong)] rounded-md text-[13px] font-semibold text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm transition-all" value="15/05/1992" readonly>
                </div>
              </div>

              <div class="space-y-1.5 text-left">
                <label class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide ml-1 opacity-60">Giới tính</label>
                <select class="w-full h-10 px-3 bg-white border border-[var(--sys-border-strong)] rounded-md text-[13px] font-semibold text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm appearance-none" disabled>
                  <option selected>Nam</option>
                  <option>Nữ</option>
                </select>
              </div>

              <div class="space-y-1.5 text-left">
                <label class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide ml-1 opacity-60">Số điện thoại</label>
                <input type="text" class="w-full h-10 px-4 bg-white border border-[var(--sys-border-strong)] rounded-md text-[13px] font-semibold text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm" value="090 123 4567" readonly>
              </div>

              <div class="col-span-1 md:col-span-2 space-y-1.5 text-left">
                <label class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide ml-1 opacity-60">Email giao dịch</label>
                <input type="email" class="w-full h-10 px-4 bg-white border border-[var(--sys-border-strong)] rounded-md text-[13px] font-semibold text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm" value="an.nguyen92@gmail.com" readonly>
              </div>

              <div class="col-span-1 md:col-span-2 space-y-1.5 text-left">
                <label class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide ml-1 opacity-60">Địa chỉ thường trú</label>
                <input type="text" class="w-full h-10 px-4 bg-white border border-[var(--sys-border-strong)] rounded-md text-[13px] font-semibold text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm" value="Số 123 Đường ABC, Phường 4, Quận Tân Bình, TP. Hồ Chí Minh" readonly>
              </div>
            </div>

            <div class="mt-8 pt-6 border-t border-[var(--sys-border-subtle)] flex justify-end">
              <button class="h-10 px-8 bg-[var(--sys-brand-solid)] hover:brightness-90 text-white rounded-md font-bold text-[12px] uppercase tracking-wide shadow-sm transition-all flex items-center gap-2 active:scale-95">
                <span class="material-symbols-outlined text-[18px]">save</span>
                Lưu thông tin
              </button>
            </div>
          </div>

          <!-- Education Table -->
          <div class="bg-[var(--sys-bg-surface)] rounded-lg shadow-sm border border-[var(--sys-border-subtle)] overflow-hidden">
            <div class="px-6 py-4 border-b border-[var(--sys-border-subtle)] flex justify-between items-center bg-[var(--sys-bg-page)]/50">
              <h2 class="text-sm font-semibold text-[var(--sys-text-primary)] uppercase tracking-wide m-0 flex items-center gap-2">
                <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-[22px]">school</span>
                Học vấn & Chứng chỉ
              </h2>
              <button class="h-8 px-4 bg-white border border-[var(--sys-border-strong)] text-[var(--sys-brand-solid)] rounded-md font-bold text-[11px] uppercase tracking-wide hover:shadow-sm transition-all flex items-center gap-1 shadow-sm">
                <span class="material-symbols-outlined text-[18px]">add</span>
                Thêm mới
              </button>
            </div>
            
            <div class="overflow-x-auto custom-scrollbar">
              <table class="w-full text-left border-collapse">
                <thead class="bg-[var(--sys-bg-page)]">
                  <tr>
                    <th class="px-6 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] uppercase border-b border-[var(--sys-border-subtle)]">Nội dung văn bằng</th>
                    <th class="px-6 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] uppercase border-b border-[var(--sys-border-subtle)]">Cơ sở đào tạo</th>
                    <th class="px-6 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] uppercase border-b border-[var(--sys-border-subtle)] text-center">Năm</th>
                    <th class="px-6 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] uppercase border-b border-[var(--sys-border-subtle)] text-right">Tài liệu</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[var(--sys-border-subtle)]">
                  <tr class="hover:bg-[var(--sys-bg-hover)] transition-colors">
                    <td class="px-6 py-3 text-[13px] font-semibold text-[var(--sys-text-primary)] bg-transparent">Kỹ sư Công nghệ thông tin</td>
                    <td class="px-6 py-3 text-[12px] font-medium text-[var(--sys-text-secondary)] bg-transparent">Đại học Bách Khoa TP.HCM</td>
                    <td class="px-6 py-3 text-[13px] font-bold text-center bg-transparent">2014</td>
                    <td class="px-6 py-3 text-right bg-transparent">
                      <a href="#" class="text-[var(--sys-brand-solid)] hover:underline inline-flex items-center gap-1 font-bold text-[11px] uppercase tracking-tight">
                        <span class="material-symbols-outlined text-[16px]">attachment</span>
                        Xem PDF
                      </a>
                    </td>
                  </tr>
                  <tr class="hover:bg-[var(--sys-bg-hover)] transition-colors">
                    <td class="px-6 py-3 text-[13px] font-semibold text-[var(--sys-text-primary)] bg-transparent">AWS Solutions Architect</td>
                    <td class="px-6 py-3 text-[12px] font-medium text-[var(--sys-text-secondary)] bg-transparent">AWS Training Center</td>
                    <td class="px-6 py-3 text-[13px] font-bold text-center bg-transparent">2022</td>
                    <td class="px-6 py-3 text-right bg-transparent">
                      <a href="#" class="text-[var(--sys-brand-solid)] hover:underline inline-flex items-center gap-1 font-bold text-[11px] uppercase tracking-tight">
                        <span class="material-symbols-outlined text-[16px]">verified</span>
                        Verify
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Right Column: Work Information -->
        <div class="lg:col-span-4 flex flex-col gap-6">
          <div class="bg-[var(--sys-bg-surface)] rounded-lg shadow-sm border border-[var(--sys-border-subtle)] p-6 md:p-8 flex-grow flex flex-col">
            <h2 class="text-sm font-semibold text-[var(--sys-text-primary)] uppercase tracking-wide mb-8 flex items-center gap-2">
              <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-[22px]">work_history</span>
              Phân bổ nhân lực hiện tại
            </h2>
            
            <div class="space-y-8 flex-grow">
              <div class="flex gap-4 items-start group">
                <div class="w-10 h-10 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center shrink-0 border border-[var(--sys-brand-border)] group-hover:bg-[var(--sys-brand-solid)] group-hover:text-white transition-all shadow-sm">
                  <span class="material-symbols-outlined text-[20px]">account_tree</span>
                </div>
                <div class="bg-transparent text-left">
                  <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide mb-1 opacity-60">Phòng ban</p>
                  <p class="text-sm font-bold text-[var(--sys-text-primary)]">Kỹ thuật & Công nghệ</p>
                </div>
              </div>

              <div class="flex gap-4 items-start group">
                <div class="w-10 h-10 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <span class="material-symbols-outlined text-[20px]">badge</span>
                </div>
                <div class="bg-transparent text-left">
                  <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide mb-1 opacity-60">Chức danh / Cấp bậc</p>
                  <p class="text-sm font-bold text-[var(--sys-text-primary)]">Senior Developer (Lv.4)</p>
                </div>
              </div>

              <div class="flex gap-4 items-start group">
                <div class="w-10 h-10 rounded-md bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] flex items-center justify-center shrink-0 border border-[var(--sys-border-subtle)] hover:border-[var(--sys-brand-solid)] transition-all shadow-sm overflow-hidden">
                  <img src="https://i.pravatar.cc/150?u=nam_le" alt="Manager" class="w-full h-full object-cover" />
                </div>
                <div class="bg-transparent text-left">
                  <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide mb-1 opacity-60">Quản lý trực tiếp</p>
                  <p class="text-sm font-bold text-[var(--sys-text-primary)]">Lê Hoàng Nam</p>
                </div>
              </div>

              <div class="flex gap-4 items-start group">
                <div class="w-10 h-10 rounded-md bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] flex items-center justify-center shrink-0 border border-[var(--sys-success-border)] group-hover:bg-[var(--sys-success-solid)] group-hover:text-white transition-all shadow-sm">
                  <span class="material-symbols-outlined text-[20px]">description</span>
                </div>
                <div class="bg-transparent text-left">
                  <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide mb-1 opacity-60">Loại hợp đồng</p>
                  <p class="text-sm font-bold text-[var(--sys-text-primary)] leading-snug">Hợp đồng vô thời hạn</p>
                </div>
              </div>
            </div>

            <!-- Retention Metric -->
            <div class="mt-10 pt-8 border-t border-[var(--sys-border-subtle)] bg-transparent">
              <div class="flex justify-between items-end mb-3">
                <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide opacity-60">Gắn bó</p>
                <p class="text-[12px] font-bold text-[var(--sys-brand-solid)] uppercase tracking-widest">1 năm 2 tháng</p>
              </div>
              <div class="h-2 w-full bg-[var(--sys-bg-page)] rounded-full overflow-hidden border border-[var(--sys-border-subtle)]">
                <div class="h-full bg-[var(--sys-brand-solid)] transition-all" style="width: 50%"></div>
              </div>
              <button class="w-full mt-8 bg-[var(--sys-bg-page)] hover:bg-white text-[var(--sys-text-secondary)] font-bold text-[11px] uppercase tracking-wide py-3 rounded-md border border-[var(--sys-border-strong)] transition-all active:scale-95 shadow-sm">
                Lịch sử thăng tiến
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Danger Zone -->
      <div class="flex justify-end pt-8 opacity-60 hover:opacity-100 transition-opacity">
        <router-link to="/don-nghi-viec" class="h-10 px-6 bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] rounded-md border border-[var(--sys-danger-border)] font-bold text-[11px] uppercase tracking-wide flex items-center gap-2 hover:bg-[var(--sys-danger-solid)] hover:text-white transition-all">
          <span class="material-symbols-outlined text-[20px]">logout</span>
          Nộp đơn nghỉ việc
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * TRANG HỒ SƠ CÁ NHÂN (PORTAL) - PHIÊN BẢN ENTERPRISE SaaS
 * Tuân thủ 7 Golden Rules:
 * - Font Inter 14px (text-sm), Tỉ lệ table cao (text-13px)
 * - Bo góc chuẩn B2B: 6px (MD) cho Input/Button, 8px (LG) cho Card/Thẻ
 * - Hệ màu Semantic đồng bộ, loại bỏ font-black/italic
 */
</script>

<style scoped>
.avatar-box {
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.avatar-box:hover {
  transform: scale(1.02);
}
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
</style>
