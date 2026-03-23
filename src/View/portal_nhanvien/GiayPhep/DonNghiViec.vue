<template>
  <div class="resignation-page min-h-screen bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] p-4 md:p-6 lg:p-8">
    <div class="max-w-5xl mx-auto space-y-6 bg-transparent">
      
      <!-- Top Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left">
        <div class="bg-transparent text-left">
          <div class="flex items-center gap-3 mb-1">
            <button @click="$router.push('/nhanvien/hoso')" class="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] transition-all">
              <span class="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <h1 class="text-xl font-semibold text-[var(--sys-text-primary)] tracking-tight m-0">Đơn xin thôi việc & Bàn giao</h1>
          </div>
          <p class="text-[13px] text-[var(--sys-text-secondary)] ml-11">Chúng tôi rất tiếc khi thấy bạn rời đi. Vui lòng hoàn thành các thông tin bên dưới để bắt đầu quy trình bàn giao.</p>
        </div>
      </div>

      <!-- User Context Info -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded-lg border border-[var(--sys-border-subtle)] flex items-center gap-4 shadow-sm">
          <div class="w-10 h-10 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center border border-[var(--sys-brand-border)]">
            <span class="material-symbols-outlined text-[20px]">badge</span>
          </div>
          <div>
            <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide opacity-60">Chức danh hiện tại</p>
            <p class="text-[13px] font-bold text-[var(--sys-text-primary)] mt-0.5">Chuyên viên Marketing Cao cấp</p>
          </div>
        </div>

        <div class="bg-white p-4 rounded-lg border border-[var(--sys-border-subtle)] flex items-center gap-4 shadow-sm">
          <div class="w-10 h-10 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center border border-[var(--sys-brand-border)]">
            <span class="material-symbols-outlined text-[20px]">domain</span>
          </div>
          <div>
            <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide opacity-60">Phòng ban quản lý</p>
            <p class="text-[13px] font-bold text-[var(--sys-text-primary)] mt-0.5">Phòng Marketing & Truyền thông</p>
          </div>
        </div>
      </div>

      <!-- Status Banner -->
      <div class="bg-[var(--sys-warning-soft)] p-3 rounded-md border border-[var(--sys-warning-border)] flex justify-between items-center shadow-sm">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-[var(--sys-warning-text)] text-[20px]">history_edu</span>
          <div>
            <p class="text-[12px] font-bold text-[var(--sys-warning-text)] m-0">Trạng thái hồ sơ thôi việc hiện tại</p>
            <p class="text-[11px] text-[var(--sys-warning-text)] opacity-70 m-0">Hệ thống chưa ghi nhận đơn đang được xử lý</p>
          </div>
        </div>
        <span class="px-2.5 py-0.5 rounded-md bg-[var(--sys-warning-text)] text-white text-[10px] font-bold uppercase tracking-wider">
          Đang chờ tạo mới
        </span>
      </div>

      <!-- Main Form Content -->
      <div class="bg-white rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col lg:flex-row items-stretch">
        
        <!-- Form Column -->
        <div class="flex-1 p-6 md:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-[var(--sys-border-subtle)]">
          <h2 class="text-[14px] font-bold text-[var(--sys-text-primary)] uppercase tracking-wide flex items-center gap-2 mb-6">
            <span class="w-1.5 h-4 bg-[var(--sys-brand-solid)] rounded-full"></span>
            Thông tin đề xuất thôi việc
          </h2>

          <div class="space-y-5">
            <div>
              <label class="block text-[11px] font-bold text-[var(--sys-text-primary)] uppercase tracking-wider mb-2">Ngày làm việc cuối cùng <span class="text-[var(--sys-danger-solid)]">*</span></label>
              <CalendarCustom v-model="finalDate" placeholder="Chọn ngày cuối công tác" />
              <p class="text-[11px] text-[var(--sys-text-disabled)] mt-2 italic font-medium">Báo trước tối thiểu 30 ngày (Dựa trên HĐLĐ hiện tại).</p>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[var(--sys-text-primary)] uppercase tracking-wider mb-2">Lý do chính <span class="text-[var(--sys-danger-solid)]">*</span></label>
              <select class="w-full h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-[13px] font-semibold text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm">
                <option selected disabled>-- Vui lòng chọn lý do --</option>
                <option>Thay đổi định hướng cá nhân</option>
                <option>Việc gia đình / Sức khỏe</option>
                <option>Chuyển nơi cư trú xa</option>
                <option>Lý do bảo mật khác</option>
              </select>
            </div>

            <div>
              <label class="block text-[11px] font-bold text-[var(--sys-text-primary)] uppercase tracking-wider mb-2">Ghi chú & Chia sẻ (không bắt buộc)</label>
              <textarea class="w-full h-32 p-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-[13px] font-medium text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm resize-none" placeholder="Cảm nhận của bạn về môi trường làm việc hoặc lý do chi tiết hơn..."></textarea>
            </div>

            <div class="p-4 bg-[var(--sys-bg-page)] rounded-md border border-[var(--sys-border-subtle)] flex items-start gap-3">
              <input type="checkbox" id="commitCheck" class="mt-1 w-4 h-4 rounded border-[var(--sys-border-strong)] text-[var(--sys-brand-solid)] focus:ring-[var(--sys-brand-solid)]">
              <label for="commitCheck" class="text-[12px] font-medium text-[var(--sys-text-secondary)] leading-relaxed">
                Tôi cam kết sẽ thực hiện đầy đủ các nhiệm vụ được giao và bàn giao toàn bộ tài sản, tài liệu trước ngày rời đi chính thức.
              </label>
            </div>
          </div>
        </div>

        <!-- Policy Column -->
        <div class="w-full lg:w-[320px] bg-[var(--sys-bg-page)]/50 p-6 md:p-8 flex flex-col">
          <h3 class="text-[12px] font-bold text-[var(--sys-text-primary)] uppercase tracking-wider flex items-center gap-2 mb-6">
            <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-[20px]">policy</span>
            Quy trình & Chính sách
          </h3>

          <div class="space-y-6 flex-grow">
            <div class="relative pl-6 pb-6">
              <div class="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-[var(--sys-brand-solid)] shadow-sm"></div>
              <div class="absolute left-1.5 top-4 w-[1px] h-full bg-[var(--sys-border-strong)]"></div>
              <h4 class="text-[12px] font-bold text-[var(--sys-text-primary)] mb-1">Thời hạn báo trước</h4>
              <p class="text-[11px] text-[var(--sys-text-secondary)] font-medium leading-relaxed opacity-80">
                Ít nhất 30 ngày đối với HĐ xác định thời hạn hoặc 45 ngày đối với HĐ không xác định thời hạn.
              </p>
            </div>

            <div class="relative pl-6 pb-6">
              <div class="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-[var(--sys-brand-solid)] shadow-sm"></div>
              <div class="absolute left-1.5 top-4 w-[1px] h-full bg-[var(--sys-border-strong)]"></div>
              <h4 class="text-[12px] font-bold text-[var(--sys-text-primary)] mb-1">Bàn giao tài sản</h4>
              <p class="text-[11px] text-[var(--sys-text-secondary)] font-medium leading-relaxed opacity-80">
                Hoàn tất bàn giao thiết bị (laptop, thẻ), tài khoản và hồ sơ công việc cho quản lý trực tiếp.
              </p>
            </div>

            <div class="relative pl-6 pb-0">
              <div class="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-[var(--sys-brand-solid)] shadow-sm"></div>
              <h4 class="text-[12px] font-bold text-[var(--sys-text-primary)] mb-1">Quyết toán nhân sự</h4>
              <p class="text-[11px] text-[var(--sys-text-secondary)] font-medium leading-relaxed opacity-80">
                Chi trả lương, trợ cấp và chốt sổ BHXH trong vòng 7-14 ngày kể từ ngày chấm dứt HĐLĐ.
              </p>
            </div>
          </div>

          <div class="mt-10 pt-6 border-t border-[var(--sys-border-subtle)] text-center">
            <p class="text-[11px] font-bold text-[var(--sys-text-disabled)] uppercase tracking-tight mb-2">Hỗ trợ nhanh</p>
            <a href="#" class="text-[var(--sys-brand-solid)] font-bold text-[11px] hover:opacity-80 transition-opacity uppercase tracking-wide">BP. Hành chính Nhân sự</a>
          </div>
        </div>
      </div>

      <!-- Action Footer -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
        <button class="flex items-center gap-2 text-[12px] font-bold text-[var(--sys-brand-solid)] hover:opacity-80 transition-all uppercase tracking-wide">
          <span class="material-symbols-outlined text-[20px]">attach_file</span>
          Đính kèm tài liệu liên quan
        </button>
        
        <div class="flex gap-3 w-full sm:w-auto">
          <button @click="$router.push('/nhanvien/hoso')" class="h-11 px-6 bg-white text-[var(--sys-text-secondary)] border border-[var(--sys-border-strong)] rounded-md font-bold text-[12px] uppercase tracking-wide hover:bg-[var(--sys-bg-page)] shadow-sm transition-all flex-grow sm:flex-grow-0">
            Hủy bỏ
          </button>
          <button class="h-11 px-8 bg-[var(--sys-brand-solid)] text-white rounded-md font-bold text-[12px] uppercase tracking-wide hover:brightness-95 shadow-md flex items-center justify-center gap-2 transition-all flex-grow sm:flex-grow-0">
            Gửi yêu cầu <span class="material-symbols-outlined text-[18px]">send</span>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CalendarCustom from '@/components/CalendarCustom.vue';
const finalDate = ref('');
/**
 * TRANG ĐƠN XIN THÔI VIỆC (PORTAL) - PHIÊN BẢN ENTERPRISE SaaS
 * Tuân thủ 7 Golden Rules:
 * - Font Inter 14px (text-sm)
 * - Bo góc chuẩn B2B: 6px (MD), 8px (LG)
 * - Hệ màu Semantic đồng bộ, xóa bỏ font-black/italic rườm rà
 */
</script>

<style scoped>
.resignation-page {
  background-color: var(--sys-bg-page);
}
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
