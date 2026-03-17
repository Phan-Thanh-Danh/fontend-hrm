<template>
  <div class="profile-wrapper min-h-screen bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] p-4 md:p-6 lg:p-10 font-sans">
    <div class="max-w-7xl mx-auto space-y-10 bg-transparent">
      
      <!-- Top Header Card -->
      <div class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] shadow-sm border border-[var(--sys-border-subtle)] p-8 md:p-10 relative overflow-hidden group">
        <div class="absolute top-0 right-0 w-80 h-80 bg-[var(--sys-brand-soft)] rounded-full -mr-40 -mt-40 transition-transform group-hover:scale-110 opacity-30"></div>
        
        <div class="flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10 bg-transparent">
          <!-- Avatar Section -->
          <div class="relative shrink-0 bg-transparent">
            <div class="avatar-circle rounded-[2rem] overflow-hidden bg-[var(--sys-bg-page)] border-4 border-[var(--sys-brand-soft)] shadow-xl flex items-center justify-center group/avatar" style="width: 160px; height: 160px;">
               <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Avatar" class="w-full h-full object-cover group-hover/avatar:scale-110 transition-transform duration-500" />
            </div>
            <button class="absolute -right-2 -bottom-2 w-12 h-12 bg-[var(--sys-bg-surface)] hover:bg-[var(--sys-brand-solid)] hover:text-white text-[var(--sys-brand-solid)] rounded-2xl shadow-xl flex items-center justify-center border border-[var(--sys-border-subtle)] transition-all active:scale-90 group/cam">
              <span class="material-symbols-outlined text-xl group-hover/cam:scale-110 transition-transform">photo_camera</span>
            </button>
          </div>
          
          <!-- Info Section -->
          <div class="grow text-center md:text-left w-full bg-transparent">
            <div class="flex flex-col md:flex-row items-center gap-4 mb-6 bg-transparent">
              <h1 class="text-4xl font-black text-[var(--sys-text-primary)] tracking-tight mb-0 italic">Nguyễn Văn An</h1>
              <span class="bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full border border-[var(--sys-success-border)] shadow-sm">Đang làm việc</span>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 pt-4 bg-transparent">
              <div class="md:border-r border-[var(--sys-border-subtle)] bg-transparent text-left">
                <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] mb-2 italic opacity-60">Mã nhân viên</p>
                <p class="text-lg font-black text-[var(--sys-text-primary)] tracking-tight italic">#NV-00123</p>
              </div>
              <div class="md:border-r border-[var(--sys-border-subtle)] bg-transparent text-left px-0 md:px-4">
                <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] mb-2 italic opacity-60">Phòng ban</p>
                <p class="text-lg font-black text-[var(--sys-brand-solid)] tracking-tight italic">Kỹ thuật & CN</p>
              </div>
              <div class="md:border-r border-[var(--sys-border-subtle)] bg-transparent text-left px-0 md:px-4">
                <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] mb-2 italic opacity-60">Chức vụ</p>
                <p class="text-lg font-black text-[var(--sys-text-primary)] tracking-tight opacity-80 italic">Senior Dev</p>
              </div>
              <div class="bg-transparent text-left px-0 md:px-4">
                <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] mb-2 italic opacity-60">Ngày gia nhập</p>
                <p class="text-lg font-black text-[var(--sys-text-primary)] tracking-tight italic">01/01/2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-transparent">
        <!-- Left Column: Personal Info & Certificates -->
        <div class="lg:col-span-8 flex flex-col gap-10 bg-transparent">
          
          <!-- Thông tin cá nhân -->
          <div class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] shadow-sm border border-[var(--sys-border-subtle)] p-8 md:p-10">
            <h2 class="text-sm font-black text-[var(--sys-text-primary)] uppercase tracking-tight italic mb-8 flex items-center gap-3">
              <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-2xl">person_edit</span>
              Hồ sơ chi tiết
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-transparent">
              <!-- Grid Items -->
              <div class="space-y-2.5 bg-transparent text-left">
                <label class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] italic opacity-60 ml-2">Họ và tên</label>
                <div class="relative group bg-transparent">
                  <span class="absolute inset-y-0 left-5 flex items-center text-[var(--sys-text-secondary)] opacity-40 group-focus-within:text-[var(--sys-brand-solid)] group-focus-within:opacity-100 transition-all">
                    <span class="material-symbols-outlined text-xl">person</span>
                  </span>
                  <input type="text" class="w-full pl-14 pr-6 py-4 rounded-2xl bg-[var(--sys-bg-hover)]/40 border border-[var(--sys-border-subtle)] text-sm font-black text-[var(--sys-text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all italic shadow-sm" value="Nguyễn Văn An" readonly>
                </div>
              </div>

              <div class="space-y-2.5 bg-transparent text-left">
                <label class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] italic opacity-60 ml-2">Ngày sinh</label>
                <div class="relative group bg-transparent">
                  <span class="absolute inset-y-0 left-5 flex items-center text-[var(--sys-text-secondary)] opacity-40 group-focus-within:text-[var(--sys-brand-solid)] group-focus-within:opacity-100 transition-all">
                    <span class="material-symbols-outlined text-xl">cake</span>
                  </span>
                  <input type="text" class="w-full pl-14 pr-6 py-4 rounded-2xl bg-[var(--sys-bg-hover)]/40 border border-[var(--sys-border-subtle)] text-sm font-black text-[var(--sys-text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all italic shadow-sm" value="15/05/1992" readonly>
                </div>
              </div>

              <div class="space-y-2.5 bg-transparent text-left">
                <label class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] italic opacity-60 ml-2">Giới tính</label>
                <div class="relative group bg-transparent">
                  <span class="absolute inset-y-0 left-5 flex items-center text-[var(--sys-text-secondary)] opacity-40 group-focus-within:text-[var(--sys-brand-solid)] group-focus-within:opacity-100 transition-all">
                    <span class="material-symbols-outlined text-xl">wc</span>
                  </span>
                  <select class="w-full pl-14 pr-6 py-4 rounded-2xl bg-[var(--sys-bg-hover)]/40 border border-[var(--sys-border-subtle)] text-sm font-black text-[var(--sys-text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all italic shadow-sm appearance-none" disabled>
                    <option selected>Nam</option>
                    <option>Nữ</option>
                  </select>
                </div>
              </div>

              <div class="space-y-2.5 bg-transparent text-left">
                <label class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] italic opacity-60 ml-2">Số điện thoại</label>
                <div class="relative group bg-transparent">
                  <span class="absolute inset-y-0 left-5 flex items-center text-[var(--sys-text-secondary)] opacity-40 group-focus-within:text-[var(--sys-brand-solid)] group-focus-within:opacity-100 transition-all">
                    <span class="material-symbols-outlined text-xl">call</span>
                  </span>
                  <input type="text" class="w-full pl-14 pr-6 py-4 rounded-2xl bg-[var(--sys-bg-hover)]/40 border border-[var(--sys-border-subtle)] text-sm font-black text-[var(--sys-text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all italic shadow-sm" value="090 123 4567" readonly>
                </div>
              </div>

              <div class="col-span-1 md:col-span-2 space-y-2.5 bg-transparent text-left">
                <label class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] italic opacity-60 ml-2">Email chi tiết</label>
                <div class="relative group bg-transparent">
                  <span class="absolute inset-y-0 left-5 flex items-center text-[var(--sys-text-secondary)] opacity-40 group-focus-within:text-[var(--sys-brand-solid)] group-focus-within:opacity-100 transition-all">
                    <span class="material-symbols-outlined text-xl">mail</span>
                  </span>
                  <input type="email" class="w-full pl-14 pr-6 py-4 rounded-2xl bg-[var(--sys-bg-hover)]/40 border border-[var(--sys-border-subtle)] text-sm font-black text-[var(--sys-text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all italic shadow-sm" value="an.nguyen92@gmail.com" readonly>
                </div>
              </div>

              <div class="col-span-1 md:col-span-2 space-y-2.5 bg-transparent text-left">
                <label class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] italic opacity-60 ml-2">Địa chỉ thường trú</label>
                <div class="relative group bg-transparent">
                  <span class="absolute inset-y-0 left-5 flex items-center text-[var(--sys-text-secondary)] opacity-40 group-focus-within:text-[var(--sys-brand-solid)] group-focus-within:opacity-100 transition-all">
                    <span class="material-symbols-outlined text-xl">location_on</span>
                  </span>
                  <input type="text" class="w-full pl-14 pr-6 py-4 rounded-2xl bg-[var(--sys-bg-hover)]/40 border border-[var(--sys-border-subtle)] text-sm font-black text-[var(--sys-text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all italic shadow-sm" value="Số 123 Đường ABC, Phường 4, Quận Tân Bình, TP. Hồ Chí Minh" readonly>
                </div>
              </div>
            </div>

            <!-- Footer Actions -->
            <div class="mt-10 pt-8 border-t border-[var(--sys-border-subtle)] flex justify-end bg-transparent">
              <button class="bg-[var(--sys-brand-solid)] hover:bg-[var(--sys-brand-hover)] text-white font-black py-4 px-10 rounded-2xl shadow-xl shadow-[var(--sys-brand-solid-lch-30)] transition-all active:scale-95 flex items-center gap-3 text-xs uppercase tracking-[0.2em] italic">
                <span class="material-symbols-outlined text-xl">save</span>
                Lưu chỉnh sửa
              </button>
            </div>
          </div>

          <!-- Bằng cấp & Chứng chỉ -->
          <div class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] shadow-sm border border-[var(--sys-border-subtle)] overflow-hidden">
            <div class="px-10 py-6 border-b border-[var(--sys-border-subtle)] flex justify-between items-center bg-[var(--sys-bg-page)]/30">
              <h2 class="text-sm font-black text-[var(--sys-text-primary)] uppercase tracking-tight italic m-0 flex items-center gap-3">
                <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-2xl">school</span>
                Học vấn & Chứng chỉ
              </h2>
              <button class="text-[var(--sys-brand-solid)] font-black text-[10px] uppercase tracking-[0.2em] hover:opacity-60 transition-all flex items-center gap-2 bg-transparent border-0 italic">
                <span class="material-symbols-outlined text-lg">add_circle</span>
                Cập nhật mới
              </button>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left border-separate border-spacing-0 bg-transparent">
                <thead>
                  <tr class="bg-transparent text-left">
                    <th class="px-10 py-5 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] italic border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Tên văn bằng / Chứng chỉ</th>
                    <th class="px-8 py-5 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] italic border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Cơ sở đào tạo</th>
                    <th class="px-8 py-5 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] italic border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-center">Năm học</th>
                    <th class="px-10 py-5 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] italic border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-end whitespace-nowrap">Hồ sơ đính kèm</th>
                  </tr>
                </thead>
                <tbody class="bg-transparent text-left">
                  <tr class="group hover:bg-[var(--sys-bg-hover)] transition-all border-b last:border-0 border-[var(--sys-border-subtle)]">
                    <td class="px-10 py-6 font-black text-[var(--sys-text-primary)] text-sm bg-transparent border-b border-[var(--sys-border-subtle)]">Kỹ sư Công nghệ thông tin</td>
                    <td class="px-8 py-6 text-[var(--sys-text-secondary)] font-bold text-xs bg-transparent border-b border-[var(--sys-border-subtle)] italic opacity-60">Đại học Bách Khoa TP.HCM</td>
                    <td class="px-8 py-6 text-center font-black text-[var(--sys-text-primary)] text-sm bg-transparent border-b border-[var(--sys-border-subtle)]">2014</td>
                    <td class="px-10 py-6 text-end bg-transparent border-b border-[var(--sys-border-subtle)]">
                      <a href="#" class="text-[var(--sys-brand-solid)] hover:opacity-60 no-underline inline-flex items-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all italic">
                        <span class="material-symbols-outlined text-lg">description</span>
                        VB_BACHKHOA.pdf
                      </a>
                    </td>
                  </tr>
                  <tr class="group hover:bg-[var(--sys-bg-hover)] transition-all border-b last:border-0 border-[var(--sys-border-subtle)]">
                    <td class="px-10 py-6 font-black text-[var(--sys-text-primary)] text-sm bg-transparent border-b border-[var(--sys-border-subtle)]">AWS Solutions Architect</td>
                    <td class="px-8 py-6 text-[var(--sys-text-secondary)] font-bold text-xs bg-transparent border-b border-[var(--sys-border-subtle)] italic opacity-60">AWS Training</td>
                    <td class="px-8 py-6 text-center font-black text-[var(--sys-text-primary)] text-sm bg-transparent border-b border-[var(--sys-border-subtle)]">2022</td>
                    <td class="px-10 py-6 text-end bg-transparent border-b border-[var(--sys-border-subtle)]">
                      <a href="#" class="text-[var(--sys-brand-solid)] hover:opacity-60 no-underline inline-flex items-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all italic">
                        <span class="material-symbols-outlined text-lg">verified</span>
                        AWS_CERT_01.pdf
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Right Column: Thông tin công việc -->
        <div class="lg:col-span-4 bg-transparent text-left">
          <div class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] shadow-sm border border-[var(--sys-border-subtle)] p-8 md:p-10 h-full flex flex-col items-stretch">
            <h2 class="text-sm font-black text-[var(--sys-text-primary)] uppercase tracking-tight italic mb-10 flex items-center gap-3">
              <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-2xl">work_history</span>
              Công việc hiện tại
            </h2>
            
            <div class="flex flex-col gap-10 flex-grow bg-transparent">
              <!-- Info Item -->
              <div class="flex gap-5 items-start bg-transparent group">
                <div class="w-12 h-12 rounded-2xl bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center shrink-0 border border-[var(--sys-brand-border)] group-hover:bg-[var(--sys-brand-solid)] group-hover:text-white transition-all shadow-sm">
                  <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">account_tree</span>
                </div>
                <div class="bg-transparent text-left">
                  <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] mb-1.5 italic opacity-60">Phòng ban</p>
                  <p class="text-sm font-black text-[var(--sys-text-primary)] mb-0 italic">Kỹ thuật & Công nghệ</p>
                </div>
              </div>

              <!-- Info Item -->
              <div class="flex gap-5 items-start bg-transparent group">
                <div class="w-12 h-12 rounded-2xl bg-[var(--sys-info-soft)] text-[var(--sys-info-text)] flex items-center justify-center shrink-0 border border-[var(--sys-info-border)] group-hover:bg-[var(--sys-info-solid)] group-hover:text-white transition-all shadow-sm">
                  <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">badge</span>
                </div>
                <div class="bg-transparent text-left">
                  <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] mb-1.5 italic opacity-60">Chức vụ cấp bậc</p>
                  <p class="text-sm font-black text-[var(--sys-text-primary)] mb-0 italic">Senior Developer (Lv.4)</p>
                </div>
              </div>

              <!-- Info Item -->
              <div class="flex gap-5 items-start bg-transparent group">
                <div class="w-12 h-12 rounded-2xl bg-[var(--sys-bg-hover)] text-[var(--sys-text-primary)] flex items-center justify-center shrink-0 border border-[var(--sys-border-subtle)] group-hover:border-[var(--sys-brand-solid)] transition-all shadow-sm">
                  <div class="w-8 h-8 rounded-xl overflow-hidden border border-[var(--sys-border-subtle)]">
                     <img src="https://i.pravatar.cc/150?u=nam_le" alt="Manager" class="w-full h-full object-cover" />
                  </div>
                </div>
                <div class="bg-transparent text-left">
                  <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] mb-1.5 italic opacity-60">Quản lý trực tiếp</p>
                  <p class="text-sm font-black text-[var(--sys-text-primary)] mb-0 italic">Lê Hoàng Nam</p>
                </div>
              </div>

              <!-- Info Item -->
              <div class="flex gap-5 items-start bg-transparent group">
                <div class="w-12 h-12 rounded-2xl bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] flex items-center justify-center shrink-0 border border-[var(--sys-success-border)] group-hover:bg-[var(--sys-success-solid)] group-hover:text-white transition-all shadow-sm">
                  <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">description</span>
                </div>
                <div class="bg-transparent text-left">
                  <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] mb-1.5 italic opacity-60">Loại hợp đồng</p>
                  <p class="text-sm font-black text-[var(--sys-text-primary)] mb-0 italic leading-tight">Hợp đồng vô thời hạn (Lâu dài)</p>
                </div>
              </div>
            </div>

            <!-- Retention Metric -->
            <div class="mt-10 pt-10 border-t border-[var(--sys-border-subtle)] bg-transparent">
              <div class="flex justify-between items-end mb-4 bg-transparent">
                <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] italic mb-0 opacity-60">Thời gian gắn bó</p>
                <p class="text-xs font-black text-[var(--sys-brand-solid)] mb-0 uppercase tracking-widest italic animate-pulse">1 năm 2 tháng</p>
              </div>
              <div class="h-3 w-full bg-[var(--sys-bg-hover)] rounded-full overflow-hidden border border-[var(--sys-border-subtle)]/30">
                <div class="h-full bg-[var(--sys-brand-solid)] transition-all shadow-[0_0_12px_var(--sys-brand-solid-lch-30)]" style="width: 50%"></div>
              </div>
              <button class="w-full mt-10 bg-[var(--sys-bg-hover)] hover:bg-[var(--sys-bg-page)] text-[var(--sys-text-secondary)] font-black text-[10px] uppercase tracking-[0.2em] py-4 rounded-2xl border border-[var(--sys-border-strong)] transition-all italic active:scale-95 shadow-sm">
                Lịch sử thăng tiến & Quyết định
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Danger Zone Footer -->
      <div class="mt-16 pt-10 border-t border-[var(--sys-danger-border)]/20 flex justify-end bg-transparent">
        <router-link to="/don-nghi-viec" class="bg-[var(--sys-danger-soft)]/50 hover:bg-[var(--sys-danger-solid)] text-[var(--sys-danger-text)] hover:text-white font-black px-10 py-4 rounded-2xl border border-[var(--sys-danger-border)]/50 transition-all active:scale-95 flex items-center gap-3 no-underline shadow-sm group">
          <span class="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform" style="font-variation-settings: 'FILL' 0;">flight_takeoff</span>
          <span class="text-[10px] uppercase tracking-[0.2em] italic">Nộp đơn nghỉ việc (Quit)</span>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.avatar-circle {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.avatar-circle:hover {
  transform: scale(1.02);
}

@media (min-width: 768px) {
  .border-end-md {
    border-right: 1px solid var(--sys-border-subtle) !important;
  }
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
