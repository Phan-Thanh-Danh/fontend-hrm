<template>
  <div class="dashboard-wrapper min-h-screen bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] p-4 md:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto space-y-6 bg-transparent">
      
      <!-- Header Area -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left">
        <div class="bg-transparent text-left">
          <h1 class="text-xl font-semibold text-[var(--sys-text-primary)] mb-1">Chào buổi sáng, Hệ thống đã sẵn sàng.</h1>
          <p class="text-sm text-[var(--sys-text-secondary)]">{{ currentDateStr }} Chúc bạn một ngày làm việc hiệu quả.</p>
        </div>
        <div class="hidden md:block shrink-0">
          <span class="bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] px-3 py-1.5 rounded-md font-bold text-[11px] uppercase tracking-wide border border-[var(--sys-brand-border)]">Portal Nhân Viên v2.0</span>
        </div>
      </div>

      <!-- Hero Section Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-transparent">
        
        <!-- Left Column: Clock & Summary -->
        <div class="lg:col-span-8 flex flex-col gap-6 bg-transparent">
          
          <!-- Check-in Hero Card -->
          <div class="bg-[var(--sys-bg-surface)] rounded-lg shadow-sm border border-[var(--sys-border-subtle)] p-6 md:p-8 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-48 h-48 bg-[var(--sys-brand-soft)] rounded-full -mr-24 -mt-24 opacity-30 blur-2xl"></div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10 bg-transparent">
              <!-- Digital Clock Display -->
              <div class="flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-[var(--sys-border-subtle)] pb-6 md:pb-0 md:pr-8 bg-transparent">
                <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider mb-4 opacity-60">Thời gian hệ thống</p>
                <div class="flex items-baseline gap-2 bg-transparent">
                  <span class="text-6xl font-bold text-[var(--sys-brand-solid)] tracking-tight">{{ currentHours }}:{{ currentMinutes }}</span>
                  <span class="text-xl font-semibold text-[var(--sys-text-secondary)] opacity-40">{{ currentSeconds }}s</span>
                </div>
                <div class="mt-6 flex flex-col gap-3 bg-transparent">
                  <div class="flex items-center gap-2 text-[12px] font-semibold text-[var(--sys-text-secondary)] bg-transparent">
                    <span class="material-symbols-outlined text-[20px] text-[var(--sys-brand-solid)]">location_on</span>
                    Văn phòng TP. Hồ Chí Minh
                  </div>
                  <div class="flex items-center gap-2 text-[11px] font-bold text-[var(--sys-success-text)] uppercase tracking-wide bg-transparent">
                    <span class="w-2 h-2 rounded-full bg-[var(--sys-success-solid)] animate-pulse shadow-sm"></span>
                    IP: 113.161.x.x (Hợp lệ)
                  </div>
                </div>
              </div>

              <!-- Action Area -->
              <div class="flex flex-col gap-4 bg-transparent">
                <div class="grid grid-cols-2 gap-4 bg-transparent">
                  <button class="bg-[var(--sys-brand-solid)] hover:brightness-90 text-white font-bold py-5 px-4 rounded-md flex flex-col items-center justify-center gap-2 shadow-sm transition-all active:scale-95 group">
                    <span class="material-symbols-outlined text-3xl group-hover:scale-105 transition-transform">login</span>
                    <span class="text-[12px] uppercase tracking-wide">Ghi nhận Vào</span>
                  </button>
                  <button class="bg-white hover:bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] border border-[var(--sys-border-strong)] font-bold py-5 px-4 rounded-md flex flex-col items-center justify-center gap-2 transition-all active:scale-95 group shadow-sm">
                    <span class="material-symbols-outlined text-3xl text-[var(--sys-text-secondary)] group-hover:scale-105 transition-transform">logout</span>
                    <span class="text-[12px] uppercase tracking-wide opacity-80">Ghi nhận Ra</span>
                  </button>
                </div>
                <div class="py-3 px-4 bg-[var(--sys-bg-page)] rounded-md border border-[var(--sys-border-subtle)] text-center">
                  <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide opacity-60">
                    Ghi nhận gần nhất: <span class="text-[var(--sys-text-primary)] font-bold">08:25:12</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Secondary Metric Cards Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-transparent">
            <!-- Leave Remaining -->
            <div class="bg-[var(--sys-bg-surface)] rounded-lg shadow-sm border border-[var(--sys-border-subtle)] p-6 flex flex-col justify-between group hover:border-[var(--sys-brand-solid)] transition-all">
              <div class="flex justify-between items-start mb-6 bg-transparent">
                <div class="w-11 h-11 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center border border-[var(--sys-brand-border)] group-hover:bg-[var(--sys-brand-solid)] group-hover:text-white transition-all shadow-sm">
                  <span class="material-symbols-outlined text-[24px]">calendar_month</span>
                </div>
                <span class="text-[10px] font-bold text-[var(--sys-text-disabled)] bg-[var(--sys-bg-page)] px-3 py-1 rounded-md border border-[var(--sys-border-subtle)] uppercase tracking-wide">Kỳ phép 2023/10</span>
              </div>
              <div class="bg-transparent text-left">
                <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider mb-2 opacity-60">Quỹ phép năm còn lại</p>
                <div class="flex items-baseline gap-2 bg-transparent">
                  <h3 class="text-5xl font-bold text-[var(--sys-text-primary)] tracking-tight">12</h3>
                  <span class="text-[12px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest opacity-40">ngày</span>
                </div>
              </div>
              <div class="mt-6 pt-4 border-t border-[var(--sys-border-subtle)] bg-transparent">
                <div class="flex justify-between items-center text-[11px] font-bold text-[var(--sys-text-secondary)] mb-2 uppercase tracking-wide opacity-60">
                  <span>Dùng: 6.0</span>
                  <span>Quỹ: 18.0</span>
                </div>
                <div class="h-2 w-full bg-[var(--sys-bg-page)] rounded-full overflow-hidden border border-[var(--sys-border-subtle)] shadow-inner">
                  <div class="h-full bg-[var(--sys-brand-solid)] transition-all" style="width: 33%"></div>
                </div>
              </div>
            </div>

            <!-- Stats Summary -->
            <div class="bg-[var(--sys-bg-surface)] rounded-lg shadow-sm border border-[var(--sys-border-subtle)] p-6 flex flex-col bg-transparent">
              <h3 class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider mb-6 opacity-60 text-left">Tóm tắt chuyên cần tháng</h3>
              <div class="grid grid-cols-3 gap-2 flex-grow bg-transparent">
                <div class="flex flex-col items-center justify-center p-3 rounded-md bg-[var(--sys-success-soft)] border border-[var(--sys-success-border)] group hover:brightness-95 transition-all shadow-sm">
                  <span class="material-symbols-outlined text-[var(--sys-success-text)] mb-2 text-[24px]">done_all</span>
                  <span class="text-[9px] font-bold text-[var(--sys-success-text)] uppercase tracking-tighter mb-1 opacity-80">Ngày công</span>
                  <span class="text-xl font-bold text-[var(--sys-text-primary)]">18.5</span>
                </div>
                <div class="flex flex-col items-center justify-center p-3 rounded-md bg-[var(--sys-danger-soft)] border border-[var(--sys-danger-border)] group hover:brightness-95 transition-all shadow-sm">
                  <span class="material-symbols-outlined text-[var(--sys-danger-text)] mb-2 text-[24px]">event_busy</span>
                  <span class="text-[9px] font-bold text-[var(--sys-danger-text)] uppercase tracking-tighter mb-1 opacity-80">Vắng mặt</span>
                  <span class="text-xl font-bold text-[var(--sys-text-primary)]">0.0</span>
                </div>
                <div class="flex flex-col items-center justify-center p-3 rounded-md bg-[var(--sys-warning-soft)] border border-[var(--sys-warning-border)] group hover:brightness-95 transition-all shadow-sm">
                  <span class="material-symbols-outlined text-[var(--sys-warning-text)] mb-2 text-[24px]">history</span>
                  <span class="text-[9px] font-bold text-[var(--sys-warning-text)] uppercase tracking-tighter mb-1 opacity-80">Đi muộn</span>
                  <span class="text-xl font-bold text-[var(--sys-text-primary)]">15p</span>
                </div>
              </div>
              <div class="mt-6 pt-4 flex justify-center bg-transparent border-t border-[var(--sys-border-subtle)]">
                <a href="#" class="text-[var(--sys-brand-solid)] text-[11px] font-bold uppercase tracking-wide hover:underline flex items-center gap-1">
                  Bảng chi tiết <span class="material-symbols-outlined text-[18px]">chevron_right</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Notifications -->
        <div class="lg:col-span-4 flex flex-col bg-transparent">
          <div class="bg-[var(--sys-bg-surface)] rounded-lg shadow-sm border border-[var(--sys-border-subtle)] h-full flex flex-col overflow-hidden">
            <div class="px-5 py-4 border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 flex justify-between items-center text-left">
              <h3 class="text-sm font-semibold text-[var(--sys-text-primary)] uppercase tracking-wide flex items-center gap-2 m-0">
                <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-[22px]">notifications_active</span>
                Thông báo mới
              </h3>
              <span class="bg-[var(--sys-danger-solid)] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">3</span>
            </div>
            
            <div class="flex-grow overflow-y-auto custom-scrollbar bg-transparent divide-y divide-[var(--sys-border-subtle)]">
              <!-- Notif 1 -->
              <router-link :to="{ name: 'thong-bao' }" class="block px-5 py-4 hover:bg-[var(--sys-bg-hover)] transition-all cursor-pointer group no-underline text-left">
                <div class="flex gap-4 bg-transparent text-left">
                  <div class="w-10 h-10 rounded-md bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] flex items-center justify-center shrink-0 border border-[var(--sys-success-border)] group-hover:bg-[var(--sys-success-solid)] group-hover:text-white transition-all">
                    <span class="material-symbols-outlined text-[20px]">verified</span>
                  </div>
                  <div class="bg-transparent text-left">
                    <h4 class="text-[13px] font-semibold text-[var(--sys-text-primary)] mb-1 group-hover:text-[var(--sys-brand-solid)] transition-colors uppercase tracking-tight">Đơn nghỉ phép đã duyệt</h4>
                    <p class="text-[12px] font-medium text-[var(--sys-text-secondary)] leading-snug mb-2 opacity-80">Đơn nghỉ phép ngày 28/10 của bạn đã được quản lý phê duyệt thành công.</p>
                    <span class="text-[10px] font-bold text-[var(--sys-text-disabled)] uppercase tracking-widest opacity-60">10 phút trước</span>
                  </div>
                </div>
              </router-link>
              <!-- Notif 2 -->
              <router-link :to="{ name: 'thong-bao' }" class="block px-5 py-4 hover:bg-[var(--sys-bg-hover)] transition-all cursor-pointer group no-underline text-left">
                <div class="flex gap-4 bg-transparent text-left">
                  <div class="w-10 h-10 rounded-md bg-[var(--sys-info-soft)] text-[var(--sys-info-text)] flex items-center justify-center shrink-0 border border-[var(--sys-info-border)] group-hover:bg-[var(--sys-info-solid)] group-hover:text-white transition-all">
                    <span class="material-symbols-outlined text-[20px]">payments</span>
                  </div>
                  <div class="bg-transparent text-left">
                    <h4 class="text-[13px] font-semibold text-[var(--sys-text-primary)] mb-1 group-hover:text-[var(--sys-brand-solid)] transition-colors uppercase tracking-tight">Đã có phiếu lương</h4>
                    <p class="text-[12px] font-medium text-[var(--sys-text-secondary)] leading-snug mb-2 opacity-80">Phiếu lương tháng 09/2023 đã sẵn sàng. Bạn có thể xem ngay bây giờ.</p>
                    <span class="text-[10px] font-bold text-[var(--sys-text-disabled)] uppercase tracking-widest opacity-60">2 giờ trước</span>
                  </div>
                </div>
              </router-link>
              <!-- Notif 3 -->
              <router-link :to="{ name: 'thong-bao' }" class="block px-5 py-4 hover:bg-[var(--sys-bg-hover)] transition-all cursor-pointer group no-underline text-left">
                <div class="flex gap-4 bg-transparent text-left">
                  <div class="w-10 h-10 rounded-md bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] flex items-center justify-center shrink-0 border border-[var(--sys-warning-border)] group-hover:bg-[var(--sys-warning-solid)] group-hover:text-white transition-all">
                    <span class="material-symbols-outlined text-[20px]">campaign</span>
                  </div>
                  <div class="bg-transparent text-left">
                    <h4 class="text-[13px] font-semibold text-[var(--sys-text-primary)] mb-1 group-hover:text-[var(--sys-brand-solid)] transition-colors uppercase tracking-tight">Thông báo Công ty</h4>
                    <p class="text-[12px] font-medium text-[var(--sys-text-secondary)] leading-snug mb-2 opacity-80">Lịch nghỉ lễ Quốc khánh và các quy định trực Tết Dương lịch...</p>
                    <span class="text-[10px] font-bold text-[var(--sys-text-disabled)] uppercase tracking-widest opacity-60">Hôm qua</span>
                  </div>
                </div>
              </router-link>
            </div>

            <div class="px-5 py-3 bg-[var(--sys-bg-page)]/50 border-t border-[var(--sys-border-subtle)] text-center">
              <router-link :to="{ name: 'thong-bao' }" class="text-[var(--sys-brand-solid)] text-[11px] font-bold uppercase tracking-wider hover:underline inline-flex items-center gap-1 active:scale-95 no-underline">
                Tất cả thông báo <span class="material-symbols-outlined text-[18px]">chevron_right</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity Table Section -->
      <div class="bg-[var(--sys-bg-surface)] rounded-lg shadow-sm border border-[var(--sys-border-subtle)] overflow-hidden">
        <div class="px-6 py-4 border-b border-[var(--sys-border-subtle)] flex justify-between items-center bg-[var(--sys-bg-page)]/50">
          <h3 class="text-sm font-semibold text-[var(--sys-text-primary)] uppercase tracking-wide flex items-center gap-2 m-0">
            <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-[22px]">history</span>
            Hoạt động gần đây
          </h3>
          <button class="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-[var(--sys-border-strong)] text-[var(--sys-text-secondary)] hover:border-[var(--sys-brand-solid)] transition-all shadow-sm">
            <span class="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </div>
        
        <div class="overflow-x-auto custom-scrollbar">
          <table class="w-full text-left border-collapse">
            <thead class="bg-[var(--sys-bg-page)]">
              <tr>
                <th class="px-6 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] uppercase border-b border-[var(--sys-border-subtle)]">Ngày thực hiện</th>
                <th class="px-6 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] uppercase border-b border-[var(--sys-border-subtle)]">Loại hoạt động</th>
                <th class="px-6 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] uppercase border-b border-[var(--sys-border-subtle)]">Thời gian chi tiết</th>
                <th class="px-6 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] uppercase border-b border-[var(--sys-border-subtle)] text-right">Trạng thái</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[var(--sys-border-subtle)]">
              <tr v-for="(act, idx) in activities" :key="idx" class="hover:bg-[var(--sys-bg-hover)] transition-colors">
                <td class="px-6 py-3 text-[13px] font-semibold text-[var(--sys-text-primary)] whitespace-nowrap bg-transparent">{{ act.date }}</td>
                <td class="px-6 py-3 bg-transparent">
                  <div class="flex items-center gap-2">
                    <span :class="['w-2 h-2 rounded-full shadow-sm', 'bg-[var(--sys-' + act.color + '-solid)]']"></span>
                    <span class="text-[13px] font-semibold text-[var(--sys-text-primary)]">{{ act.type }}</span>
                  </div>
                </td>
                <td class="px-6 py-3 text-[13px] font-medium text-[var(--sys-text-secondary)] whitespace-nowrap bg-transparent">{{ act.time }}</td>
                <td class="px-6 py-3 text-right bg-transparent">
                  <span :class="['px-2.5 py-0.5 rounded-md text-[11px] font-bold border uppercase tracking-wide', 
                    act.status === 'Đã duyệt' ? 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)]' : 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]']">
                    {{ act.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="px-6 py-3 bg-[var(--sys-bg-page)]/50 border-t border-[var(--sys-border-subtle)] flex justify-end">
          <a href="#" class="text-[var(--sys-brand-solid)] text-[11px] font-bold uppercase tracking-wide hover:underline flex items-center gap-1 active:scale-95 no-underline">
            Toàn bộ lịch sử <span class="material-symbols-outlined text-[18px]">chevron_right</span>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
/**
 * PORTAL DASHBOARD (NHÂN VIÊN) - PHIÊN BẢN ENTERPRISE SaaS
 * Tuân thủ 7 Golden Rules:
 * - Font Inter 14px (text-sm), Tỉ lệ high-density
 * - Bo góc chuẩn B2B: 6px (MD) cho Input/Button, 8px (LG) cho Card/Table
 * - Hệ màu Blue/White/Semantic đồng bộ, xóa bỏ font-black/italic thái quá
 */
import { ref, onMounted, onUnmounted } from 'vue';

const currentHours = ref('00');
const currentMinutes = ref('00');
const currentSeconds = ref('00');
const currentDateStr = ref('');
let timerInterval = null;

const activities = [
  { date: 'Thứ Tư, 25/10/2023', type: 'Check-in (Vào ca)', icon: 'login', color: 'success', time: '08:02:45 AM', status: 'Thành công' },
  { date: 'Thứ Ba, 24/10/2023', type: 'Check-out (Ra về)', icon: 'logout', color: 'brand', time: '17:35:10 PM', status: 'Thành công' },
  { date: 'Thứ Ba, 24/10/2023', type: 'Gửi đơn nghỉ phép', icon: 'event_note', color: 'warning', time: '14:20:05 PM', status: 'Đã duyệt' }
];

const updateTime = () => {
  const now = new Date();
  currentHours.value = String(now.getHours()).padStart(2, '0');
  currentMinutes.value = String(now.getMinutes()).padStart(2, '0');
  currentSeconds.value = String(now.getSeconds()).padStart(2, '0');
  
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  currentDateStr.value = `Hôm nay là ${days[now.getDay()]}, ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}.`;
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
