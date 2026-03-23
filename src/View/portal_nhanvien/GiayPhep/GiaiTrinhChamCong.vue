<template>
  <div class="explanation-page min-h-screen bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] p-4 md:p-6 lg:p-8">
    <div class="max-w-6xl mx-auto space-y-6 bg-transparent">
      
      <!-- Top Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left">
        <div class="bg-transparent text-left">
          <div class="flex items-center gap-3 mb-1">
            <button @click="$router.push('/nhanvien/chamcong')" class="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] transition-all">
              <span class="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <h1 class="text-xl font-semibold text-[var(--sys-text-primary)] tracking-tight m-0">Đơn giải trình sai lệch chấm công</h1>
          </div>
          <p class="text-[13px] text-[var(--sys-text-secondary)] ml-11">Vui lòng điền đầy đủ các thông tin bên dưới để gửi yêu cầu điều chỉnh dữ liệu chấm công.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- Left Column: Main Form -->
        <div class="lg:col-span-8">
          <div class="bg-white p-6 md:p-10 rounded-lg border border-[var(--sys-border-subtle)] shadow-sm">
            <form @submit.prevent class="space-y-6 text-left">
              
              <h2 class="text-[14px] font-bold text-[var(--sys-text-primary)] uppercase tracking-wide flex items-center gap-2 mb-8">
                <span class="w-1.5 h-4 bg-[var(--sys-brand-solid)] rounded-full"></span>
                Nội dung đề xuất giải trình
              </h2>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label class="block text-[11px] font-bold text-[var(--sys-text-primary)] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span class="material-symbols-outlined text-[var(--sys-text-disabled)] text-[18px]">calendar_today</span>
                    Ngày giải trình <span class="text-[var(--sys-danger-solid)]">*</span>
                  </label>
                  <input type="date" class="w-full h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-[13px] font-semibold text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm">
                </div>

                <div>
                  <label class="block text-[11px] font-bold text-[var(--sys-text-primary)] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span class="material-symbols-outlined text-[var(--sys-text-disabled)] text-[18px]">login</span>
                    Giờ vào thực tế
                  </label>
                  <input type="time" class="w-full h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-[13px] font-semibold text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm">
                </div>

                <div>
                  <label class="block text-[11px] font-bold text-[var(--sys-text-primary)] uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span class="material-symbols-outlined text-[var(--sys-text-disabled)] text-[18px]">logout</span>
                    Giờ ra thực tế
                  </label>
                  <input type="time" class="w-full h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-[13px] font-semibold text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm">
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-bold text-[var(--sys-text-primary)] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span class="material-symbols-outlined text-[var(--sys-text-disabled)] text-[18px]">category</span>
                  Loại giải trình <span class="text-[var(--sys-danger-solid)]">*</span>
                </label>
                <select class="w-full h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-[13px] font-semibold text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm">
                  <option selected disabled>-- Vui lòng chọn loại giải trình --</option>
                  <option>Quên chấm công (Vào/Ra)</option>
                  <option>Lỗi kết nối từ phía hệ thống</option>
                  <option>Đi công tác / Ra ngoài công tác</option>
                  <option>Hỏng hóc thiết bị đầu cuối</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold text-[var(--sys-text-primary)] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span class="material-symbols-outlined text-[var(--sys-text-disabled)] text-[18px]">description</span>
                  Lý do chi tiết <span class="text-[var(--sys-danger-solid)]">*</span>
                </label>
                <textarea class="w-full h-32 p-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-[13px] font-medium text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm resize-none" placeholder="Vui lòng mô tả chi tiết nguyên nhân dẫn đến sai lệch dữ liệu..."></textarea>
              </div>

              <div>
                <label class="block text-[11px] font-bold text-[var(--sys-text-primary)] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span class="material-symbols-outlined text-[var(--sys-text-disabled)] text-[18px]">attach_file</span>
                  Minh chứng đính kèm
                </label>
                <div class="border-2 border-dashed border-[var(--sys-border-subtle)] rounded-lg p-8 flex flex-col items-center justify-center text-center bg-[var(--sys-bg-page)] hover:border-[var(--sys-brand-solid)] hover:bg-[var(--sys-brand-soft)]/20 cursor-pointer transition-all group">
                  <div class="w-12 h-12 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-full flex items-center justify-center mb-4 transition-all group-hover:bg-[var(--sys-brand-solid)] group-hover:text-white">
                    <span class="material-symbols-outlined text-[28px]">cloud_upload</span>
                  </div>
                  <p class="text-[13px] font-bold text-[var(--sys-text-primary)] mb-1">
                    Nhấp để tải lên hoặc kéo thả tệp tin vào đây
                  </p>
                  <p class="text-[11px] font-medium text-[var(--sys-text-disabled)] uppercase tracking-wide">
                    JPG, PNG, PDF (Tối đa 5MB)
                  </p>
                </div>
              </div>

              <div class="flex justify-end gap-3 pt-6 border-t border-[var(--sys-border-subtle)]">
                <button type="button" @click="$router.push('/nhanvien/chamcong')" class="h-11 px-6 bg-white text-[var(--sys-text-secondary)] border border-[var(--sys-border-strong)] rounded-md font-bold text-[12px] uppercase tracking-wide hover:bg-[var(--sys-bg-page)] shadow-sm transition-all focus:outline-none">
                  Hủy bỏ
                </button>
                <button type="submit" class="h-11 px-8 bg-[var(--sys-brand-solid)] text-white rounded-md font-bold text-[12px] uppercase tracking-wide hover:brightness-95 shadow-md flex items-center justify-center gap-2 transition-all focus:outline-none">
                  Gửi yêu cầu <span class="material-symbols-outlined text-[18px]">send</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Right Column: Context Sidebar -->
        <div class="lg:col-span-4 space-y-4">
          <!-- Recent History Sidebar Card -->
          <div class="bg-white rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col">
            <div class="px-5 py-3 border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 flex justify-between items-center">
              <div>
                <h3 class="text-[12px] font-bold text-[var(--sys-text-primary)] uppercase tracking-wide flex items-center gap-2">
                  <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-[18px]">history</span>
                  Chấm công gần đây
                </h3>
              </div>
              <a href="#" class="text-[var(--sys-brand-solid)] font-bold text-[11px] hover:opacity-80 transition-opacity uppercase tracking-tight">TẤT CẢ</a>
            </div>
            
            <div class="divide-y divide-[var(--sys-border-subtle)]">
              <!-- Unvalid Item -->
              <div class="p-4 bg-red-50/20 hover:bg-red-50/40 transition-all border-l-4 border-l-[var(--sys-danger-solid)] cursor-pointer">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-[11px] font-bold text-[var(--sys-text-disabled)] uppercase tracking-tight mb-1">Hôm nay, 24/10</p>
                    <p class="text-[14px] font-bold text-[var(--sys-text-primary)]">08:00 - <span class="text-[var(--sys-danger-solid)]">--:--</span></p>
                  </div>
                  <div class="text-right">
                    <span class="px-2 py-0.5 rounded-md bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] text-[9px] font-black uppercase tracking-widest border border-[var(--sys-danger-border)]">THIẾU CÔNG</span>
                  </div>
                </div>
              </div>

              <div class="p-4 hover:bg-[var(--sys-bg-hover)] transition-all cursor-pointer">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-[11px] font-bold text-[var(--sys-text-disabled)] uppercase tracking-tight mb-1">23/10/2023</p>
                    <p class="text-[14px] font-bold text-[var(--sys-text-primary)]">09:15 - 18:30</p>
                  </div>
                  <div class="text-right">
                    <span class="px-2 py-0.5 rounded-md bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] text-[9px] font-black uppercase tracking-widest border border-[var(--sys-danger-border)]">ĐI MUỘN</span>
                  </div>
                </div>
              </div>

              <div class="p-4 hover:bg-[var(--sys-bg-hover)] transition-all cursor-pointer">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-[11px] font-bold text-[var(--sys-text-disabled)] uppercase tracking-tight mb-1">20/10/2023</p>
                    <p class="text-[14px] font-bold text-[var(--sys-text-primary)]">08:00 - 17:30</p>
                  </div>
                  <div class="text-right">
                    <span class="px-2 py-0.5 rounded-md bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] text-[9px] font-black uppercase tracking-widest border border-[var(--sys-success-border)]">HỢP LỆ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Important Banner -->
          <div class="p-5 rounded-lg border border-[var(--sys-brand-border)] bg-[var(--sys-bg-page)]">
            <h4 class="text-[12px] font-bold text-[var(--sys-brand-solid)] flex items-center gap-2 mb-3 uppercase tracking-wide">
              <span class="material-symbols-outlined text-[18px]">info</span>
              Nguyên tắc giải trình
            </h4>
            <ul class="space-y-3 m-0 p-0 list-none">
              <li class="flex gap-2 items-start">
                <span class="text-[var(--sys-brand-solid)] mt-0.5 text-[14px]">•</span>
                <span class="text-[12px] font-medium text-[var(--sys-text-secondary)] leading-tight">Yêu cầu cần được gửi trước ngày 25 hàng tháng để tổng hợp lương.</span>
              </li>
              <li class="flex gap-2 items-start">
                <span class="text-[var(--sys-brand-solid)] mt-0.5 text-[14px]">•</span>
                <span class="text-[12px] font-medium text-[var(--sys-text-secondary)] leading-tight">Phải đính kèm minh chứng đối với các trường hợp đi công tác hoặc lỗi máy móc.</span>
              </li>
              <li class="flex gap-2 items-start">
                <span class="text-[var(--sys-danger-solid)] mt-0.5 text-[14px]">•</span>
                <span class="text-[12px] font-bold text-[var(--sys-danger-text)] leading-tight">Mọi giải trình sai lệch cố ý sẽ bị xử lý theo nội quy lao động của công ty.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * TRANG GIẢI TRÌNH CHẤM CÔNG (PORTAL) - PHIÊN BẢN ENTERPRISE SaaS
 * Tuân thủ 7 Golden Rules:
 * - Font Inter 14px (text-sm)
 * - Bo góc chuẩn B2B: 6px (MD), 8px (LG)
 * - Hệ màu Semantic đồng bộ, xóa bỏ font-black/italic
 */
</script>

<style scoped>
.explanation-page {
  background-color: var(--sys-bg-page);
}
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
