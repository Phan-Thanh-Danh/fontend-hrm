<template>
  <div class="dashboard-wrapper min-h-screen bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] p-4 md:p-6 lg:p-8 font-sans">
    <div class="max-w-7xl mx-auto space-y-8">
      
      <!-- Header Area -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
        <div>
          <h1 class="text-2xl font-black text-[var(--sys-text-primary)] tracking-tight uppercase mb-1">Chào buổi sáng, A!</h1>
          <p class="text-sm text-[var(--sys-text-secondary)] font-medium italic">{{ currentDateStr }} Chúc bạn một ngày làm việc hiệu quả.</p>
        </div>
        <div class="hidden md:block">
          <span class="bg-[var(--sys-brand-soft)] text-[var(--sys-brand-soft-text)] px-4 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest border border-[var(--sys-brand-subtle)] shadow-sm">Portal Nhân Viên</span>
        </div>
      </div>

      <!-- Hero Section Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- Left Column: Clock & Summary -->
        <div class="lg:col-span-8 flex flex-col gap-6">
          
          <!-- Check-in Hero Card -->
          <div class="bg-[var(--sys-bg-surface)] rounded-4 shadow-sm border border-[var(--sys-border-subtle)] p-6 md:p-8 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-32 h-32 bg-[var(--sys-brand-solid)]/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
              <!-- Digital Clock Display -->
              <div class="flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-[var(--sys-border-subtle)] pb-6 md:pb-0 md:pr-8">
                <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-3 italic">Thời gian hiện tại</p>
                <div class="flex items-baseline gap-2">
                  <span class="text-6xl font-black text-[var(--sys-brand-solid)] tracking-tighter">{{ currentHours }}:{{ currentMinutes }}</span>
                  <span class="text-xl font-bold text-[var(--sys-text-secondary)]">{{ currentSeconds }}s</span>
                </div>
                <div class="mt-4 flex flex-col gap-2">
                  <div class="flex items-center gap-2 text-xs font-bold text-[var(--sys-text-secondary)]">
                    <span class="material-symbols-outlined text-base text-[var(--sys-brand-solid)]">location_on</span>
                    Văn phòng TP. Hồ Chí Minh
                  </div>
                  <div class="flex items-center gap-2 text-[10px] font-black text-[var(--sys-success-text)] uppercase tracking-widest">
                    <span class="w-2 h-2 rounded-full bg-[var(--sys-success-solid)] animate-pulse"></span>
                    GPS/IP: Hợp lệ
                  </div>
                </div>
              </div>

              <!-- Action Area -->
              <div class="flex flex-col gap-4">
                <div class="grid grid-cols-2 gap-4">
                  <button class="bg-[var(--sys-brand-solid)] hover:bg-[var(--sys-brand-hover)] text-white font-black py-4 px-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-lg shadow-[var(--sys-brand-solid-lch-30)] transition-all active:scale-95 group/btn">
                    <span class="material-symbols-outlined text-3xl group-hover/btn:scale-110 transition-transform" style="font-variation-settings: 'FILL' 1;">login</span>
                    <span class="text-xs uppercase tracking-widest">Vào ca</span>
                  </button>
                  <button class="bg-[var(--sys-bg-page)] hover:bg-[var(--sys-bg-hover)] text-[var(--sys-text-primary)] border border-[var(--sys-border-strong)] font-black py-4 px-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all active:scale-95 group/btn">
                    <span class="material-symbols-outlined text-3xl text-[var(--sys-text-secondary)] group-hover/btn:scale-110 transition-transform" style="font-variation-settings: 'FILL' 0;">logout</span>
                    <span class="text-xs uppercase tracking-widest opacity-80">Kết thúc</span>
                  </button>
                </div>
                <div class="p-3 bg-[var(--sys-bg-page)]/50 rounded-xl border border-[var(--sys-border-subtle)] text-center">
                  <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] mb-0 italic">Lần chấm công gần nhất: <span class="text-[var(--sys-text-primary)]">08:25:12</span> (Vào ca)</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Secondary Metric Cards Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Leave Remaining -->
            <div class="bg-[var(--sys-bg-surface)] rounded-4 shadow-sm border border-[var(--sys-border-subtle)] p-6 flex flex-col justify-between group hover:border-[var(--sys-brand-solid)] transition-all">
              <div class="flex justify-between items-start mb-6">
                <div class="w-12 h-12 rounded-2xl bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center border border-[var(--sys-brand-subtle)] group-hover:bg-[var(--sys-brand-solid)] group-hover:text-white transition-all">
                  <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">calendar_today</span>
                </div>
                <span class="text-[10px] font-black text-[var(--sys-text-secondary)] bg-[var(--sys-bg-page)] px-3 py-1 rounded-full border border-[var(--sys-border-subtle)] uppercase">Tháng 10/2023</span>
              </div>
              <div>
                <p class="text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1 italic">Quỹ phép năm còn lại</p>
                <div class="flex items-baseline gap-2">
                  <h3 class="text-5xl font-black text-[var(--sys-text-primary)] tracking-tighter">12</h3>
                  <span class="text-sm font-bold text-[var(--sys-text-secondary)] italic">ngày</span>
                </div>
              </div>
              <div class="mt-6 pt-4 border-t border-[var(--sys-border-subtle)]">
                <div class="flex justify-between items-center text-[10px] font-bold text-[var(--sys-text-secondary)] mb-2 uppercase tracking-tighter">
                  <span>Đã dùng: 6</span>
                  <span>Tổng quỹ: 18</span>
                </div>
                <div class="h-2 w-full bg-[var(--sys-bg-page)] rounded-full overflow-hidden">
                  <div class="h-full bg-[var(--sys-brand-solid)] transition-all" style="width: 33%"></div>
                </div>
              </div>
            </div>

            <!-- Stats Summary -->
            <div class="bg-[var(--sys-bg-surface)] rounded-4 shadow-sm border border-[var(--sys-border-subtle)] p-6 flex flex-col">
              <h3 class="text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-6 italic">Tóm tắt chuyên cần tháng</h3>
              <div class="grid grid-cols-3 gap-2 flex-grow">
                <div class="flex flex-col items-center justify-center p-3 rounded-2xl bg-[var(--sys-success-soft)]/40 border border-[var(--sys-success-border)]/30 group hover:bg-[var(--sys-success-soft)] transition-all">
                  <span class="material-symbols-outlined text-[var(--sys-success-text)] mb-2" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                  <span class="text-[9px] font-black text-[var(--sys-success-text)] uppercase tracking-tight mb-1">Công</span>
                  <span class="text-xl font-black text-[var(--sys-text-primary)]">18.5</span>
                </div>
                <div class="flex flex-col items-center justify-center p-3 rounded-2xl bg-[var(--sys-danger-soft)]/40 border border-[var(--sys-danger-border)]/30 group hover:bg-[var(--sys-danger-soft)] transition-all">
                  <span class="material-symbols-outlined text-[var(--sys-danger-text)] mb-2" style="font-variation-settings: 'FILL' 1;">event_busy</span>
                  <span class="text-[9px] font-black text-[var(--sys-danger-text)] uppercase tracking-tight mb-1">Vắng</span>
                  <span class="text-xl font-black text-[var(--sys-text-primary)]">0</span>
                </div>
                <div class="flex flex-col items-center justify-center p-3 rounded-2xl bg-[var(--sys-warning-soft)]/40 border border-[var(--sys-warning-border)]/30 group hover:bg-[var(--sys-warning-soft)] transition-all">
                  <span class="material-symbols-outlined text-[var(--sys-warning-text)] mb-2" style="font-variation-settings: 'FILL' 1;">timer</span>
                  <span class="text-[9px] font-black text-[var(--sys-warning-text)] uppercase tracking-tight mb-1">Muộn</span>
                  <span class="text-xl font-black text-[var(--sys-text-primary)]">15</span>
                </div>
              </div>
              <div class="mt-4 pt-3 flex justify-center italic">
                <a href="#" class="text-[var(--sys-brand-solid)] text-[10px] font-black uppercase tracking-widest hover:underline d-flex items-center gap-1">
                  Xem chi tiết bảng công <span class="material-symbols-outlined text-xs">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Notifications -->
        <div class="lg:col-span-4 flex flex-col">
          <div class="bg-[var(--sys-bg-surface)] rounded-4 shadow-sm border border-[var(--sys-border-subtle)] h-full flex flex-col overflow-hidden">
            <div class="px-6 py-5 border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/30 flex justify-between items-center">
              <h3 class="text-sm font-black text-[var(--sys-text-primary)] uppercase tracking-tight flex items-center gap-2 m-0 italic">
                <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-xl" style="font-variation-settings: 'FILL' 1;">notifications_active</span>
                Thông báo mới
              </h3>
              <span class="bg-[var(--sys-danger-solid)] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">3</span>
            </div>
            
            <div class="flex-grow overflow-y-auto">
              <!-- Notif 1 -->
              <router-link :to="{ name: 'thong-bao' }" class="block px-6 py-4 hover:bg-[var(--sys-bg-hover)] transition-colors cursor-pointer border-b border-[var(--sys-border-subtle)] group no-underline">
                <div class="flex gap-4">
                  <div class="w-10 h-10 rounded-xl bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] flex items-center justify-center shrink-0 shadow-sm border border-[var(--sys-success-border)]">
                    <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">verified</span>
                  </div>
                  <div>
                    <h4 class="text-xs font-black text-[var(--sys-text-primary)] mb-1 group-hover:text-[var(--sys-brand-solid)] transition-colors">Đơn nghỉ phép đã duyệt</h4>
                    <p class="text-[11px] text-[var(--sys-text-secondary)] leading-relaxed mb-1.5 font-medium">Đơn nghỉ phép ngày 28/10 của bạn đã được quản lý phê duyệt thành công.</p>
                    <span class="text-[10px] font-bold text-[var(--sys-text-secondary)] opacity-60">10 phút trước</span>
                  </div>
                </div>
              </router-link>
              <!-- Notif 2 -->
              <router-link :to="{ name: 'thong-bao' }" class="block px-6 py-4 hover:bg-[var(--sys-bg-hover)] transition-colors cursor-pointer border-b border-[var(--sys-border-subtle)] group no-underline">
                <div class="flex gap-4">
                  <div class="w-10 h-10 rounded-xl bg-[var(--sys-info-soft)] text-[var(--sys-info-text)] flex items-center justify-center shrink-0 shadow-sm border border-[var(--sys-info-border)]">
                    <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">payments</span>
                  </div>
                  <div>
                    <h4 class="text-xs font-black text-[var(--sys-text-primary)] mb-1 group-hover:text-[var(--sys-brand-solid)] transition-colors">Đã có phiếu lương</h4>
                    <p class="text-[11px] text-[var(--sys-text-secondary)] leading-relaxed mb-1.5 font-medium">Phiếu lương tháng 09/2023 đã sẵn sàng. Bạn có thể xem ngay bây giờ.</p>
                    <span class="text-[10px] font-bold text-[var(--sys-text-secondary)] opacity-60">2 giờ trước</span>
                  </div>
                </div>
              </router-link>
              <!-- Notif 3 -->
              <router-link :to="{ name: 'thong-bao' }" class="block px-6 py-4 hover:bg-[var(--sys-bg-hover)] transition-colors cursor-pointer group no-underline">
                <div class="flex gap-4">
                  <div class="w-10 h-10 rounded-xl bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] flex items-center justify-center shrink-0 shadow-sm border border-[var(--sys-warning-border)]">
                    <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">campaign</span>
                  </div>
                  <div>
                    <h4 class="text-xs font-black text-[var(--sys-text-primary)] mb-1 group-hover:text-[var(--sys-brand-solid)] transition-colors">Thông báo Công ty</h4>
                    <p class="text-[11px] text-[var(--sys-text-secondary)] leading-relaxed mb-1.5 font-medium">Thông báo về lịch nghỉ lễ Quốc khánh và các quy định trực Tết Dương lịch...</p>
                    <span class="text-[10px] font-bold text-[var(--sys-text-secondary)] opacity-60">Hôm qua</span>
                  </div>
                </div>
              </router-link>
            </div>

            <div class="px-6 py-4 bg-[var(--sys-bg-page)]/50 border-t border-[var(--sys-border-subtle)] text-center">
              <router-link :to="{ name: 'thong-bao' }" class="text-[var(--sys-text-secondary)] text-[11px] font-black uppercase tracking-widest hover:text-[var(--sys-brand-solid)] transition-colors inline-flex items-center gap-2 no-underline">
                Xem tất cả thông báo
                <span class="material-symbols-outlined text-sm">chevron_right</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity Table Section -->
      <div class="bg-[var(--sys-bg-surface)] rounded-4 shadow-sm border border-[var(--sys-border-subtle)] overflow-hidden">
        <div class="px-8 py-5 border-b border-[var(--sys-border-subtle)] flex justify-between items-center bg-[var(--sys-bg-page)]/30">
          <h3 class="text-base font-black text-[var(--sys-text-primary)] uppercase tracking-tight italic flex items-center gap-2 m-0">
            <span class="material-symbols-outlined text-[var(--sys-brand-solid)]" style="font-variation-settings: 'FILL' 1;">history</span>
            Hoạt động gần đây
          </h3>
          <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-text-secondary)] hover:border-[var(--sys-brand-solid)] hover:text-[var(--sys-brand-solid)] transition-all">
            <span class="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-[var(--sys-bg-hover)]/50">
                <th class="px-8 py-5 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest italic border-b border-[var(--sys-border-subtle)]">Ngày thực hiện</th>
                <th class="px-8 py-5 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest italic border-b border-[var(--sys-border-subtle)]">Loại hoạt động</th>
                <th class="px-8 py-5 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest italic border-b border-[var(--sys-border-subtle)]">Thời gian chi tiết</th>
                <th class="px-8 py-5 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest italic border-b border-[var(--sys-border-subtle)] text-end text-nowrap">Trạng thái</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[var(--sys-border-subtle)] text-sm font-medium">
              <tr class="group hover:bg-[var(--sys-bg-hover)] transition-all">
                <td class="px-8 py-4 text-[var(--sys-text-primary)] font-bold">Thứ Tư, 25/10/2023</td>
                <td class="px-8 py-4">
                  <div class="flex items-center gap-3">
                    <span class="w-2 h-2 rounded-full bg-[var(--sys-success-solid)] shadow-sm"></span>
                    <span class="text-[var(--sys-text-primary)]">Chấm công vào ca (Check-in)</span>
                  </div>
                </td>
                <td class="px-8 py-4 text-[var(--sys-text-secondary)] italic">08:02:45 AM</td>
                <td class="px-8 py-4 text-end">
                  <span class="bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] text-[10px] font-black px-3 py-1.5 rounded-lg border border-[var(--sys-success-border)] uppercase tracking-widest">Thành công</span>
                </td>
              </tr>
              <tr class="group hover:bg-[var(--sys-bg-hover)] transition-all">
                <td class="px-8 py-4 text-[var(--sys-text-primary)] font-bold">Thứ Ba, 24/10/2023</td>
                <td class="px-8 py-4">
                  <div class="flex items-center gap-3">
                    <span class="w-2 h-2 rounded-full bg-[var(--sys-brand-solid)] shadow-sm"></span>
                    <span class="text-[var(--sys-text-primary)]">Chấm công ra về (Check-out)</span>
                  </div>
                </td>
                <td class="px-8 py-4 text-[var(--sys-text-secondary)] italic">17:35:10 PM</td>
                <td class="px-8 py-4 text-end">
                  <span class="bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] text-[10px] font-black px-3 py-1.5 rounded-lg border border-[var(--sys-success-border)] uppercase tracking-widest">Thành công</span>
                </td>
              </tr>
              <tr class="group hover:bg-[var(--sys-bg-hover)] transition-all">
                <td class="px-8 py-4 text-[var(--sys-text-primary)] font-bold">Thứ Ba, 24/10/2023</td>
                <td class="px-8 py-4">
                  <div class="flex items-center gap-3">
                    <span class="w-2 h-2 rounded-full bg-[var(--sys-warning-solid)] shadow-sm"></span>
                    <span class="text-[var(--sys-text-primary)]">Gửi đơn xin nghỉ phép</span>
                  </div>
                </td>
                <td class="px-8 py-4 text-[var(--sys-text-secondary)] italic">14:20:05 PM</td>
                <td class="px-8 py-4 text-end">
                  <span class="bg-[var(--sys-brand-soft)] text-[var(--sys-brand-soft-text)] text-[10px] font-black px-3 py-1.5 rounded-lg border border-[var(--sys-brand-subtle)] uppercase tracking-widest">Đã duyệt</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="px-8 py-4 bg-[var(--sys-bg-page)]/20 border-t border-[var(--sys-border-subtle)] flex justify-end">
          <a href="#" class="text-[var(--sys-brand-solid)] text-[10px] font-black uppercase tracking-widest hover:underline d-flex items-center gap-1 leading-none">
            Xem toàn bộ hoạt động <span class="material-symbols-outlined text-sm">arrow_right_alt</span>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const currentHours = ref('00');
const currentMinutes = ref('00');
const currentSeconds = ref('00');
const currentDateStr = ref('');
let timerInterval = null;

const updateTime = () => {
  const now = new Date();
  currentHours.value = String(now.getHours()).padStart(2, '0');
  currentMinutes.value = String(now.getMinutes()).padStart(2, '0');
  currentSeconds.value = String(now.getSeconds()).padStart(2, '0');
  
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  currentDateStr.value = `Hôm nay là ${days[now.getDay()]}, ngày ${now.getDate()} tháng ${now.getMonth() + 1} năm ${now.getFullYear()}.`;
};

onMounted(() => {
  updateTime();
  timerInterval = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});
</script>

<style scoped>
.fw-black {
  font-weight: 900;
}

.tracking-tighter {
  letter-spacing: -0.05em;
}

.tracking-tight {
  letter-spacing: -0.025em;
}

.tracking-widest {
  letter-spacing: 0.1em;
}

.rounded-4 {
  border-radius: 1.25rem !important;
}

/* Custom Scrollbar for Notifications */
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--sys-border-subtle);
  border-radius: 10px;
}
</style>
