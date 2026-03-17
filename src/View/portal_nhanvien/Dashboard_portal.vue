<template>
  <div class="dashboard-wrapper min-h-screen bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] p-4 md:p-6 lg:p-8 font-sans">
    <div class="max-w-7xl mx-auto space-y-8 bg-transparent">
      
      <!-- Header Area -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-2 bg-transparent text-left">
        <div class="bg-transparent text-left">
          <h1 class="text-2xl font-black text-[var(--sys-text-primary)] tracking-tight uppercase mb-1 italic">Chào buổi sáng, A!</h1>
          <p class="text-[10px] text-[var(--sys-text-secondary)] font-black uppercase tracking-[0.2em] italic opacity-60">{{ currentDateStr }} Chúc bạn một ngày làm việc hiệu quả.</p>
        </div>
        <div class="hidden md:block bg-transparent">
          <span class="bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] px-5 py-2 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] border border-[var(--sys-brand-border)] shadow-sm">Portal Nhân Viên v2.0</span>
        </div>
      </div>

      <!-- Hero Section Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-transparent">
        
        <!-- Left Column: Clock & Summary -->
        <div class="lg:col-span-8 flex flex-col gap-8 bg-transparent">
          
          <!-- Check-in Hero Card -->
          <div class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] shadow-sm border border-[var(--sys-border-subtle)] p-8 md:p-10 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-64 h-64 bg-[var(--sys-brand-soft)] rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110 opacity-40"></div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10 bg-transparent">
              <!-- Digital Clock Display -->
              <div class="flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-[var(--sys-border-subtle)] pb-8 md:pb-0 md:pr-10 bg-transparent">
                <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] mb-4 italic opacity-60">Thời gian hiện tại</p>
                <div class="flex items-baseline gap-3 bg-transparent">
                  <span class="text-7xl font-black text-[var(--sys-brand-solid)] tracking-tighter">{{ currentHours }}:{{ currentMinutes }}</span>
                  <span class="text-2xl font-black text-[var(--sys-text-secondary)] opacity-40 italic">{{ currentSeconds }}s</span>
                </div>
                <div class="mt-6 flex flex-col gap-3 bg-transparent">
                  <div class="flex items-center gap-3 text-xs font-black text-[var(--sys-text-secondary)] uppercase tracking-widest bg-transparent">
                    <span class="material-symbols-outlined text-xl text-[var(--sys-brand-solid)]">location_on</span>
                    Văn phòng TP. Hồ Chí Minh
                  </div>
                  <div class="flex items-center gap-3 text-[10px] font-black text-[var(--sys-success-text)] uppercase tracking-widest bg-transparent">
                    <span class="w-2.5 h-2.5 rounded-full bg-[var(--sys-success-solid)] animate-pulse shadow-lg shadow-[var(--sys-success-solid-lch-30)]"></span>
                    GPS/IP: Hợp lệ
                  </div>
                </div>
              </div>

              <!-- Action Area -->
              <div class="flex flex-col gap-6 bg-transparent">
                <div class="grid grid-cols-2 gap-6 bg-transparent">
                  <button class="bg-[var(--sys-brand-solid)] hover:bg-[var(--sys-brand-hover)] text-white font-black py-6 px-4 rounded-[2rem] flex flex-col items-center justify-center gap-3 shadow-2xl shadow-[var(--sys-brand-solid-lch-30)] transition-all active:scale-[0.98] group/btn">
                    <span class="material-symbols-outlined text-4xl group-hover/btn:scale-110 transition-transform" style="font-variation-settings: 'FILL' 1;">login</span>
                    <span class="text-[11px] uppercase tracking-[0.2em]">Check-in</span>
                  </button>
                  <button class="bg-[var(--sys-bg-page)] hover:bg-[var(--sys-bg-hover)] text-[var(--sys-text-primary)] border border-[var(--sys-border-subtle)] font-black py-6 px-4 rounded-[2rem] flex flex-col items-center justify-center gap-3 transition-all active:scale-[0.98] group/btn">
                    <span class="material-symbols-outlined text-4xl text-[var(--sys-text-secondary)] group-hover/btn:scale-110 transition-transform" style="font-variation-settings: 'FILL' 0;">logout</span>
                    <span class="text-[11px] uppercase tracking-[0.2em] opacity-60">Check-out</span>
                  </button>
                </div>
                <div class="py-4 px-6 bg-[var(--sys-bg-hover)]/40 rounded-2xl border border-[var(--sys-border-subtle)] text-center">
                  <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest italic opacity-60">Ghi nhận gần nhất: <span class="text-[var(--sys-text-primary)] font-black">08:25:12</span> (Thành công)</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Secondary Metric Cards Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-transparent">
            <!-- Leave Remaining -->
            <div class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] shadow-sm border border-[var(--sys-border-subtle)] p-8 flex flex-col justify-between group hover:border-[var(--sys-brand-solid)] transition-all relative overflow-hidden">
               <div class="absolute top-0 right-0 w-32 h-32 bg-[var(--sys-brand-soft)] rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-30 transition-all"></div>
              <div class="flex justify-between items-start mb-8 bg-transparent">
                <div class="w-16 h-16 rounded-2xl bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center border border-[var(--sys-brand-border)] group-hover:bg-[var(--sys-brand-solid)] group-hover:text-white transition-all shadow-sm">
                  <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">calendar_month</span>
                </div>
                <span class="text-[9px] font-black text-[var(--sys-text-secondary)] bg-[var(--sys-bg-hover)] px-4 py-1.5 rounded-full border border-[var(--sys-border-subtle)] uppercase tracking-widest opacity-60 italic">Kỳ phép 2023/10</span>
              </div>
              <div class="bg-transparent text-left">
                <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] mb-2 italic opacity-60 text-left">Quỹ phép năm còn lại</p>
                <div class="flex items-baseline gap-3 bg-transparent">
                  <h3 class="text-6xl font-black text-[var(--sys-text-primary)] tracking-tighter">12</h3>
                  <span class="text-sm font-black text-[var(--sys-text-secondary)] uppercase tracking-widest opacity-40 italic">ngày</span>
                </div>
              </div>
              <div class="mt-8 pt-6 border-t border-[var(--sys-border-subtle)] bg-transparent">
                <div class="flex justify-between items-center text-[9px] font-black text-[var(--sys-text-secondary)] mb-3 uppercase tracking-[0.2em] opacity-60 italic">
                  <span>Đã sử dụng: 6.0</span>
                  <span>Tổng quỹ: 18.0</span>
                </div>
                <div class="h-3 w-full bg-[var(--sys-bg-hover)] rounded-full overflow-hidden border border-[var(--sys-border-subtle)]/30">
                  <div class="h-full bg-[var(--sys-brand-solid)] transition-all shadow-[0_0_12px_var(--sys-brand-solid-lch-30)]" style="width: 33%"></div>
                </div>
              </div>
            </div>

            <!-- Stats Summary -->
            <div class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] shadow-sm border border-[var(--sys-border-subtle)] p-8 flex flex-col bg-transparent">
              <h3 class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] mb-8 italic opacity-60 text-left">Tóm tắt chuyên cần tháng</h3>
              <div class="grid grid-cols-3 gap-3 flex-grow bg-transparent">
                <div class="flex flex-col items-center justify-center p-4 rounded-3xl bg-[var(--sys-success-soft)]/30 border border-[var(--sys-success-border)]/50 group hover:bg-[var(--sys-success-soft)] transition-all shadow-sm">
                  <span class="material-symbols-outlined text-[var(--sys-success-text)] mb-3 text-3xl" style="font-variation-settings: 'FILL' 1;">done_all</span>
                  <span class="text-[9px] font-black text-[var(--sys-success-text)] uppercase tracking-[0.2em] mb-1 opacity-60 italic">Ngày công</span>
                  <span class="text-2xl font-black text-[var(--sys-text-primary)]">18.5</span>
                </div>
                <div class="flex flex-col items-center justify-center p-4 rounded-3xl bg-[var(--sys-danger-soft)]/30 border border-[var(--sys-danger-border)]/50 group hover:bg-[var(--sys-danger-soft)] transition-all shadow-sm">
                  <span class="material-symbols-outlined text-[var(--sys-danger-text)] mb-3 text-3xl" style="font-variation-settings: 'FILL' 1;">event_busy</span>
                  <span class="text-[9px] font-black text-[var(--sys-danger-text)] uppercase tracking-[0.2em] mb-1 opacity-60 italic">Vắng mặt</span>
                  <span class="text-2xl font-black text-[var(--sys-text-primary)]">0.0</span>
                </div>
                <div class="flex flex-col items-center justify-center p-4 rounded-3xl bg-[var(--sys-warning-soft)]/30 border border-[var(--sys-warning-border)]/50 group hover:bg-[var(--sys-warning-soft)] transition-all shadow-sm">
                  <span class="material-symbols-outlined text-[var(--sys-warning-text)] mb-3 text-3xl" style="font-variation-settings: 'FILL' 1;">history</span>
                  <span class="text-[9px] font-black text-[var(--sys-warning-text)] uppercase tracking-[0.2em] mb-1 opacity-60 italic">Đến muộn</span>
                  <span class="text-2xl font-black text-[var(--sys-text-primary)]">15p</span>
                </div>
              </div>
              <div class="mt-8 pt-4 flex justify-center bg-transparent border-t border-[var(--sys-border-subtle)]">
                <a href="#" class="text-[var(--sys-brand-solid)] text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-60 transition-all flex items-center gap-2 italic active:scale-95 no-underline">
                  Bảng chấm công chi tiết <span class="material-symbols-outlined text-lg">arrow_right_alt</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Notifications -->
        <div class="lg:col-span-4 flex flex-col bg-transparent">
          <div class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] shadow-sm border border-[var(--sys-border-subtle)] h-full flex flex-col overflow-hidden">
            <div class="px-8 py-6 border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/30 flex justify-between items-center text-left">
              <h3 class="text-sm font-black text-[var(--sys-text-primary)] uppercase tracking-tight flex items-center gap-3 m-0 italic">
                <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-2xl font-normal">notifications_active</span>
                Thông báo mới
              </h3>
              <span class="bg-[var(--sys-danger-solid)] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg shadow-[var(--sys-danger-solid-lch-30)]">3</span>
            </div>
            
            <div class="flex-grow overflow-y-auto custom-scrollbar bg-transparent">
              <!-- Notif 1 -->
              <router-link :to="{ name: 'thong-bao' }" class="block px-8 py-6 hover:bg-[var(--sys-bg-hover)] transition-all cursor-pointer border-b border-[var(--sys-border-subtle)] group no-underline text-left">
                <div class="flex gap-5 bg-transparent text-left">
                  <div class="w-12 h-12 rounded-2xl bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] flex items-center justify-center shrink-0 shadow-sm border border-[var(--sys-success-border)] group-hover:bg-[var(--sys-success-solid)] group-hover:text-white transition-all">
                    <span class="material-symbols-outlined text-[24px]" style="font-variation-settings: 'FILL' 1;">verified</span>
                  </div>
                  <div class="bg-transparent text-left">
                    <h4 class="text-xs font-black text-[var(--sys-text-primary)] mb-1.5 group-hover:text-[var(--sys-brand-solid)] transition-colors uppercase tracking-tight">Đơn nghỉ phép đã duyệt</h4>
                    <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] leading-relaxed mb-2 opacity-60 italic">Đơn nghỉ phép ngày 28/10 của bạn đã được quản lý phê duyệt thành công.</p>
                    <span class="text-[10px] font-black text-[var(--sys-brand-solid)] uppercase tracking-widest opacity-40">10 phút trước</span>
                  </div>
                </div>
              </router-link>
              <!-- Notif 2 -->
              <router-link :to="{ name: 'thong-bao' }" class="block px-8 py-6 hover:bg-[var(--sys-bg-hover)] transition-all cursor-pointer border-b border-[var(--sys-border-subtle)] group no-underline text-left">
                <div class="flex gap-5 bg-transparent text-left">
                  <div class="w-12 h-12 rounded-2xl bg-[var(--sys-info-soft)] text-[var(--sys-info-text)] flex items-center justify-center shrink-0 shadow-sm border border-[var(--sys-info-border)] group-hover:bg-[var(--sys-info-solid)] group-hover:text-white transition-all">
                    <span class="material-symbols-outlined text-[24px]" style="font-variation-settings: 'FILL' 1;">payments</span>
                  </div>
                  <div class="bg-transparent text-left">
                    <h4 class="text-xs font-black text-[var(--sys-text-primary)] mb-1.5 group-hover:text-[var(--sys-brand-solid)] transition-colors uppercase tracking-tight">Đã có phiếu lương</h4>
                    <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] leading-relaxed mb-2 opacity-60 italic">Phiếu lương tháng 09/2023 đã sẵn sàng. Bạn có thể xem ngay bây giờ.</p>
                    <span class="text-[10px] font-black text-[var(--sys-brand-solid)] uppercase tracking-widest opacity-40">2 giờ trước</span>
                  </div>
                </div>
              </router-link>
              <!-- Notif 3 -->
              <router-link :to="{ name: 'thong-bao' }" class="block px-8 py-6 hover:bg-[var(--sys-bg-hover)] transition-all cursor-pointer group no-underline text-left">
                <div class="flex gap-5 bg-transparent text-left">
                  <div class="w-12 h-12 rounded-2xl bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] flex items-center justify-center shrink-0 shadow-sm border border-[var(--sys-warning-border)] group-hover:bg-[var(--sys-warning-solid)] group-hover:text-white transition-all">
                    <span class="material-symbols-outlined text-[24px]" style="font-variation-settings: 'FILL' 1;">campaign</span>
                  </div>
                  <div class="bg-transparent text-left">
                    <h4 class="text-xs font-black text-[var(--sys-text-primary)] mb-1.5 group-hover:text-[var(--sys-brand-solid)] transition-colors uppercase tracking-tight">Thông báo Công ty</h4>
                    <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] leading-relaxed mb-2 opacity-60 italic">Thông báo về lịch nghỉ lễ Quốc khánh và các quy định trực Tết Dương lịch...</p>
                    <span class="text-[10px] font-black text-[var(--sys-brand-solid)] uppercase tracking-widest opacity-40">Hôm qua</span>
                  </div>
                </div>
              </router-link>
            </div>

            <div class="px-8 py-5 bg-[var(--sys-bg-page)]/50 border-t border-[var(--sys-border-subtle)] text-center">
              <router-link :to="{ name: 'thong-bao' }" class="text-[var(--sys-brand-solid)] text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-60 transition-all inline-flex items-center gap-2 no-underline italic active:scale-95">
                Xem tất cả thông báo
                <span class="material-symbols-outlined text-lg">chevron_right</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity Table Section -->
      <div class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] shadow-sm border border-[var(--sys-border-subtle)] overflow-hidden">
        <div class="px-10 py-6 border-b border-[var(--sys-border-subtle)] flex justify-between items-center bg-[var(--sys-bg-page)]/30">
          <h3 class="text-base font-black text-[var(--sys-text-primary)] uppercase tracking-tight italic flex items-center gap-3 m-0">
            <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-2xl font-normal">history</span>
            Hoạt động gần đây
          </h3>
          <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-text-secondary)] hover:border-[var(--sys-brand-solid)] hover:text-[var(--sys-brand-solid)] transition-all shadow-sm">
            <span class="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-left border-separate border-spacing-0 bg-transparent">
            <thead>
              <tr class="bg-transparent text-left">
                <th class="px-10 py-5 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] italic border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Ngày thực hiện</th>
                <th class="px-8 py-5 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] italic border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Loại hoạt động</th>
                <th class="px-8 py-5 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] italic border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Thời gian chi tiết</th>
                <th class="px-10 py-5 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] italic border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-end">Trạng thái</th>
              </tr>
            </thead>
            <tbody class="bg-transparent text-left">
              <tr v-for="(act, idx) in [
                { date: 'Thứ Tư, 25/10/2023', type: 'Chấm công vào ca (Check-in)', icon: 'login', color: 'success', time: '08:02:45 AM', status: 'Thành công' },
                { date: 'Thứ Ba, 24/10/2023', type: 'Chấm công ra về (Check-out)', icon: 'logout', color: 'brand', time: '17:35:10 PM', status: 'Thành công' },
                { date: 'Thứ Ba, 24/10/2023', type: 'Gửi đơn xin nghỉ phép', icon: 'event_note', color: 'warning', time: '14:20:05 PM', status: 'Đã duyệt' }
              ]" :key="idx" class="group transition-all duration-300 border-b border-[var(--sys-border-subtle)] last:border-0 bg-transparent hover:bg-[var(--sys-bg-hover)]">
                <td class="px-10 py-5 text-[var(--sys-text-primary)] font-black text-sm bg-transparent border-b border-[var(--sys-border-subtle)]">{{ act.date }}</td>
                <td class="px-8 py-5 bg-transparent border-b border-[var(--sys-border-subtle)] text-left">
                  <div class="flex items-center gap-3 bg-transparent">
                    <span class="w-2.5 h-2.5 rounded-full shadow-lg" :class="'bg-[var(--sys-' + act.color + '-solid)]'"></span>
                    <span class="text-[var(--sys-text-primary)] font-bold text-sm bg-transparent">{{ act.type }}</span>
                  </div>
                </td>
                <td class="px-8 py-5 text-[var(--sys-text-secondary)] font-black italic text-xs bg-transparent border-b border-[var(--sys-border-subtle)]">{{ act.time }}</td>
                <td class="px-10 py-5 text-end bg-transparent border-b border-[var(--sys-border-subtle)]">
                  <span class="bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] text-[9px] font-black px-3 py-1.5 rounded-xl border border-[var(--sys-success-border)] uppercase tracking-widest shadow-sm" :class="act.status === 'Đã duyệt' ? 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)]' : ''">
                    {{ act.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="px-10 py-6 bg-[var(--sys-bg-page)]/30 border-t border-[var(--sys-border-subtle)] flex justify-end">
          <a href="#" class="text-[var(--sys-brand-solid)] text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-60 transition-all flex items-center gap-2 italic active:scale-95 no-underline">
            Xem toàn bộ lịch sử hoạt động <span class="material-symbols-outlined text-lg">arrow_right_alt</span>
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
.tracking-tighter {
  letter-spacing: -0.05em;
}

.tracking-tight {
  letter-spacing: -0.025em;
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--sys-border-subtle);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--sys-brand-solid);
}
</style>
