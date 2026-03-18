<template>
  <div class="leave-wrapper min-h-screen bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] p-4 md:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto space-y-6 bg-transparent">
      
      <!-- Header Area -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left">
        <div class="bg-transparent text-left">
          <h1 class="text-xl font-semibold text-[var(--sys-text-primary)] mb-1">Quản lý Nghỉ phép & Vắng mặt</h1>
          <p class="text-sm text-[var(--sys-text-secondary)]">Theo dõi quỹ phép năm và lịch sử các yêu cầu vắng mặt cá nhân.</p>
        </div>
        <button @click="showModal = true" class="h-10 px-6 bg-[var(--sys-brand-solid)] text-white rounded-md font-bold text-[13px] uppercase tracking-wide hover:brightness-90 transition-all flex items-center justify-center gap-2 shadow-sm shrink-0">
          <span class="material-symbols-outlined text-[20px]">add</span>
          Tạo đơn nghỉ phép
        </button>
      </div>

      <!-- Metric Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Balance Card -->
        <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] p-5 shadow-sm hover:border-[var(--sys-brand-solid)] transition-all flex flex-col group">
          <div class="flex justify-between items-start mb-6">
            <span class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide opacity-60">Số dư phép năm</span>
            <div class="w-9 h-9 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center border border-[var(--sys-brand-border)]">
              <span class="material-symbols-outlined text-[20px]">account_balance_wallet</span>
            </div>
          </div>
          <div class="flex items-baseline gap-2 mt-auto">
            <span class="text-4xl font-bold text-[var(--sys-text-primary)]">12</span>
            <span class="text-sm font-bold text-[var(--sys-text-disabled)] uppercase tracking-widest opacity-40">ngày</span>
          </div>
        </div>
        
        <!-- Used Card -->
        <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] p-5 shadow-sm hover:border-[var(--sys-warning-border)] transition-all flex flex-col group">
          <div class="flex justify-between items-start mb-6">
            <span class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide opacity-60">Đã sử dụng</span>
            <div class="w-9 h-9 rounded-md bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] flex items-center justify-center border border-[var(--sys-warning-border)]">
              <span class="material-symbols-outlined text-[20px]">event_available</span>
            </div>
          </div>
          <div class="flex items-baseline gap-2 mt-auto">
            <span class="text-4xl font-bold text-[var(--sys-warning-text)]">3</span>
            <span class="text-sm font-bold text-[var(--sys-text-disabled)] uppercase tracking-widest opacity-40">ngày</span>
          </div>
        </div>
        
        <!-- Pending Card -->
        <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] p-5 shadow-sm hover:border-[var(--sys-brand-solid)] transition-all flex flex-col group">
          <div class="flex justify-between items-start mb-6">
            <span class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide opacity-60">Đang chờ duyệt</span>
            <div class="w-9 h-9 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center border border-[var(--sys-brand-border)]">
              <span class="material-symbols-outlined text-[20px]">pending_actions</span>
            </div>
          </div>
          <div class="flex items-baseline gap-2 mt-auto">
            <span class="text-4xl font-bold text-[var(--sys-brand-solid)]">1</span>
            <span class="text-sm font-bold text-[var(--sys-text-disabled)] uppercase tracking-widest opacity-40">ngày</span>
          </div>
        </div>
      </div>

      <!-- History Table -->
      <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col">
        <div class="px-5 py-4 border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">
          <h2 class="text-sm font-semibold text-[var(--sys-text-primary)] uppercase tracking-wide m-0">Lịch sử yêu cầu nghỉ phép</h2>
        </div>
        
        <div class="overflow-x-auto custom-scrollbar">
          <table class="w-full text-left border-collapse">
            <thead class="bg-[var(--sys-bg-page)]">
              <tr>
                <th class="px-5 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase">Loại phép</th>
                <th class="px-5 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase">Thời gian nghỉ</th>
                <th class="px-5 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase text-center">Tổng ngày</th>
                <th class="px-5 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase text-right">Trạng thái</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[var(--sys-border-subtle)]">
              <tr v-for="(item, index) in leaveHistory" :key="index" class="hover:bg-[var(--sys-bg-hover)] transition-colors">
                <td class="px-5 py-3 whitespace-nowrap bg-transparent">
                  <span class="text-[13px] font-bold text-[var(--sys-text-primary)]">{{ item.type }}</span>
                </td>
                <td class="px-5 py-3 text-[13px] font-medium text-[var(--sys-text-secondary)] bg-transparent">
                  {{ item.duration }}
                </td>
                <td class="px-5 py-3 text-center bg-transparent">
                  <span class="text-[13px] font-bold text-[var(--sys-text-primary)]">{{ item.total }}</span>
                </td>
                <td class="px-5 py-3 text-right bg-transparent">
                  <span :class="getStatusBadgeClass(item.status)" class="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wide inline-flex items-center gap-1.5 border">
                    <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(item.status)"></span>
                    {{ item.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal: Create Request -->
      <Teleport to="body">
        <Transition name="modal">
          <div v-if="showModal" class="fixed inset-0 z-[1050] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div class="bg-white w-full max-w-xl rounded-lg shadow-2xl border border-[var(--sys-border-subtle)] flex flex-col max-h-[90vh] overflow-hidden">
              <!-- Modal Header -->
              <div class="px-6 py-4 border-b border-[var(--sys-border-subtle)] flex justify-between items-center bg-[var(--sys-bg-page)]/50">
                <h3 class="text-sm font-bold text-[var(--sys-text-primary)] uppercase tracking-wide m-0">Tạo đơn nghỉ phép</h3>
                <button @click="showModal = false" class="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] transition-all">
                  <span class="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
              
              <!-- Modal Body -->
              <form @submit.prevent="showModal = false" class="p-6 space-y-5 overflow-y-auto custom-scrollbar">
                <div>
                  <label class="block text-[11px] font-bold text-[var(--sys-text-primary)] uppercase tracking-wider mb-2">Loại nghỉ phép <span class="text-[var(--sys-danger-solid)]">*</span></label>
                  <select class="w-full h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-[13px] font-semibold text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm">
                    <option selected disabled>Chọn loại nghỉ phép...</option>
                    <option>Nghỉ phép năm</option>
                    <option>Nghỉ ốm</option>
                    <option>Nghỉ không lương</option>
                  </select>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-[11px] font-bold text-[var(--sys-text-primary)] uppercase tracking-wider mb-2">Từ ngày <span class="text-[var(--sys-danger-solid)]">*</span></label>
                    <input type="date" class="w-full h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-[13px] font-semibold text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm">
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold text-[var(--sys-text-primary)] uppercase tracking-wider mb-2">Đến ngày <span class="text-[var(--sys-danger-solid)]">*</span></label>
                    <input type="date" class="w-full h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-[13px] font-semibold text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm">
                  </div>
                </div>

                <div class="bg-[var(--sys-brand-soft)] p-4 rounded-md border border-[var(--sys-brand-border)] flex justify-between items-center">
                  <span class="text-[12px] font-bold text-[var(--sys-brand-solid)] flex items-center gap-2 uppercase tracking-tight">
                    <span class="material-symbols-outlined text-[18px]">calculate</span>
                    Tổng số ngày nghỉ dự kiến:
                  </span>
                  <span class="text-[14px] font-bold text-[var(--sys-brand-solid)]">0 ngày</span>
                </div>

                <div>
                  <label class="block text-[11px] font-bold text-[var(--sys-text-primary)] uppercase tracking-wider mb-2">Lý do nghỉ phép <span class="text-[var(--sys-danger-solid)]">*</span></label>
                  <textarea class="w-full h-24 p-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded-md text-[13px] font-medium text-[var(--sys-text-primary)] outline-none focus:border-[var(--sys-brand-solid)] shadow-sm resize-none" placeholder="Nhập chi tiết lý do..."></textarea>
                </div>

                <div>
                  <label class="block text-[11px] font-bold text-[var(--sys-text-primary)] uppercase tracking-wider mb-2">Tài liệu đính kèm (nếu có)</label>
                  <div class="border-2 border-dashed border-[var(--sys-border-subtle)] rounded-md p-6 flex flex-col items-center justify-center text-center bg-[var(--sys-bg-page)] hover:border-[var(--sys-brand-solid)] hover:bg-[var(--sys-brand-soft)]/20 cursor-pointer transition-all group">
                    <span class="material-symbols-outlined text-4xl text-[var(--sys-text-disabled)] group-hover:text-[var(--sys-brand-solid)] opacity-50 mb-2 transition-colors">cloud_upload</span>
                    <p class="text-[12px] font-bold text-[var(--sys-text-primary)] mb-1">Nhấp để tải lên hoặc kéo thả tệp tin</p>
                    <p class="text-[10px] font-medium text-[var(--sys-text-disabled)]">PDF, JPG, PNG (Tối đa 5MB)</p>
                  </div>
                </div>

                <div class="flex gap-3 pt-4 border-t border-[var(--sys-border-subtle)]">
                  <button type="submit" class="flex-grow h-11 bg-[var(--sys-brand-solid)] text-white rounded-md font-bold text-[13px] uppercase tracking-wide hover:brightness-90 transition-all flex items-center justify-center gap-2 shadow-sm">
                    <span class="material-symbols-outlined text-[18px]">send</span>
                    Gửi yêu cầu
                  </button>
                  <button type="button" @click="showModal = false" class="h-11 px-6 bg-white border border-[var(--sys-border-strong)] text-[var(--sys-text-secondary)] rounded-md font-bold text-[12px] uppercase tracking-wide hover:bg-[var(--sys-bg-hover)] shadow-sm transition-all">
                    Hủy bỏ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Transition>
      </Teleport>

    </div>
  </div>
</template>

<script setup>
/**
 * TRANG NGHỈ PHÉP (PORTAL) - PHIÊN BẢN ENTERPRISE SaaS
 * Tuân thủ 7 Golden Rules:
 * - Font Inter 14px (text-sm), Tỉ lệ table cao (text-13px)
 * - Bo góc chuẩn B2B: 6px (MD) cho Input/Button, 8px (LG) cho Card/Table
 * - Hệ màu Semantic đồng bộ, loại bỏ font-black/italic
 */
import { ref } from 'vue';

const showModal = ref(false);

const leaveHistory = ref([
  { type: 'Nghỉ phép năm', duration: '15/10/2023 - 16/10/2023', total: '2 ngày', status: 'Đã duyệt' },
  { type: 'Nghỉ ốm', duration: '05/11/2023', total: '1 ngày', status: 'Đã duyệt' },
  { type: 'Nghỉ phép năm', duration: '20/11/2023 - 21/11/2023', total: '2 ngày', status: 'Chờ duyệt' }
]);

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Đã duyệt':
      return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
    case 'Chờ duyệt':
      return 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)]';
    case 'Từ chối':
      return 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]';
    default:
      return 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border-[var(--sys-border-subtle)]';
  }
};

const getStatusDotClass = (status) => {
  switch (status) {
    case 'Đã duyệt': return 'bg-[var(--sys-success-solid)]';
    case 'Chờ duyệt': return 'bg-[var(--sys-brand-solid)]';
    case 'Từ chối': return 'bg-[var(--sys-danger-solid)]';
    default: return 'bg-[var(--sys-text-disabled)]';
  }
};
</script>

<style scoped>
.leave-wrapper {
  background-color: var(--sys-bg-page);
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

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
