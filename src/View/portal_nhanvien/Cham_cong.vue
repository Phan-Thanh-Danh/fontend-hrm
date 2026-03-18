<template>
  <div class="attendance-wrapper min-h-screen bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] p-4 md:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto space-y-6 bg-transparent">
      
      <!-- Header Area -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left">
        <div class="bg-transparent text-left">
          <h1 class="text-xl font-semibold text-[var(--sys-text-primary)] mb-1">Dữ liệu Chấm công & Thời gian</h1>
          <p class="text-sm text-[var(--sys-text-secondary)]">Ghi nhận giờ bắt đầu/kết thúc ca làm việc và tra cứu lịch sử chuyên cần.</p>
        </div>
        <div class="hidden md:block shrink-0">
          <p class="text-[13px] font-bold text-[var(--sys-brand-solid)] bg-[var(--sys-brand-soft)] px-3 py-1.5 rounded-md border border-[var(--sys-brand-border)] shadow-sm">{{ currentDateStr }}</p>
        </div>
      </div>

      <!-- Clock-in/out Section -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-transparent">
        <div class="lg:col-span-8">
          <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] p-6 md:p-10 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-32 h-32 bg-[var(--sys-brand-soft)] rounded-full -mr-16 -mt-16 opacity-30 blur-2xl transition-transform group-hover:scale-110"></div>
            
            <!-- Real-time Clock Style -->
            <div class="flex gap-4 mb-8 items-center">
              <div class="flex flex-col items-center gap-1.5">
                <div class="w-20 h-24 bg-[var(--sys-bg-page)] rounded-md border border-[var(--sys-border-strong)] flex items-center justify-center shadow-inner">
                  <span class="text-4xl font-bold text-[var(--sys-brand-solid)]">{{ currentHours }}</span>
                </div>
                <span class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest opacity-60">Giờ</span>
              </div>
              <div class="text-3xl font-bold text-[var(--sys-text-disabled)]">:</div>
              <div class="flex flex-col items-center gap-1.5">
                <div class="w-20 h-24 bg-[var(--sys-bg-page)] rounded-md border border-[var(--sys-border-strong)] flex items-center justify-center shadow-inner">
                  <span class="text-4xl font-bold text-[var(--sys-brand-solid)]">{{ currentMinutes }}</span>
                </div>
                <span class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest opacity-60">Phút</span>
              </div>
              <div class="text-3xl font-bold text-[var(--sys-text-disabled)] opacity-30">:</div>
              <div class="flex flex-col items-center gap-1.5">
                <div class="w-20 h-24 bg-[var(--sys-bg-page)] rounded-md border border-[var(--sys-border-strong)] flex items-center justify-center shadow-inner">
                  <span class="text-4xl font-bold text-[var(--sys-brand-solid)] opacity-60">{{ currentSeconds }}</span>
                </div>
                <span class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest opacity-60">Giây</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-4 w-full max-w-lg">
              <button class="flex-1 h-12 bg-[var(--sys-brand-solid)] hover:brightness-95 text-white rounded-md font-bold text-[14px] uppercase tracking-wide shadow-md transition-all active:scale-95 flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-[24px]">login</span>
                Ghi nhận Vào
              </button>
              <button class="flex-1 h-12 bg-white hover:bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] border border-[var(--sys-border-strong)] rounded-md font-bold text-[14px] uppercase tracking-wide transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm">
                <span class="material-symbols-outlined text-[24px]">logout</span>
                Ghi nhận Ra
              </button>
            </div>
            <p class="text-xs text-[var(--sys-text-secondary)] mt-6 flex items-center gap-2 opacity-80">
              <span class="material-symbols-outlined text-[16px]">history</span>
              Lịch sử gần nhất: <span class="font-bold text-[var(--sys-text-primary)]">08:25:12</span> (Check-in thành công)
            </p>
          </div>
        </div>

        <!-- Today's Summary -->
        <div class="lg:col-span-4">
          <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] p-6 h-full flex flex-col shadow-sm">
            <h3 class="text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider mb-6 flex items-center gap-2">
              <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-[20px]">analytics</span>
              Thông số hôm nay
            </h3>
            <div class="space-y-3 flex-grow">
              <div class="flex justify-between items-center p-3 rounded-md bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)]">
                <span class="text-[12px] font-medium text-[var(--sys-text-secondary)]">Thời điểm Vào:</span>
                <span class="text-[13px] font-bold text-[var(--sys-text-primary)] text-right">08:25 AM</span>
              </div>
              <div class="flex justify-between items-center p-3 rounded-md bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)]">
                <span class="text-[12px] font-medium text-[var(--sys-text-secondary)]">Thời điểm Ra dự kiến:</span>
                <span class="text-[13px] font-bold text-[var(--sys-text-primary)] text-right">17:30 PM</span>
              </div>
              <div class="flex justify-between items-center p-3 rounded-md bg-[var(--sys-brand-soft)] border border-[var(--sys-brand-border)]">
                <span class="text-[12px] font-bold text-[var(--sys-brand-solid)]">Tổng tích lũy hiện tại:</span>
                <span class="text-[13px] font-bold text-[var(--sys-brand-solid)]">4.5h</span>
              </div>
            </div>
            <div class="mt-8 pt-6 border-t border-[var(--sys-border-subtle)] text-center">
              <div class="h-1.5 w-full bg-[var(--sys-bg-page)] rounded-full overflow-hidden mb-3 border border-[var(--sys-border-subtle)] shadow-inner">
                <div class="h-full bg-[var(--sys-brand-solid)] transition-all" style="width: 56.25%;"></div>
              </div>
              <span class="text-[11px] font-bold text-[var(--sys-text-disabled)] uppercase tracking-wide">Bạn đã hoàn thành 56% chỉ tiêu ngày</span>
            </div>
          </div>
        </div>
      </div>

      <!-- History Table Section -->
      <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col">
        <div class="px-5 py-4 border-b border-[var(--sys-border-subtle)] flex flex-wrap gap-4 items-center justify-between bg-[var(--sys-bg-page)]/50">
          <h3 class="text-sm font-semibold text-[var(--sys-text-primary)] uppercase tracking-wide m-0">Tra cứu lịch sử công ca</h3>
          <div class="flex flex-wrap gap-3 items-center">
            <button class="h-11 px-5 bg-[var(--sys-brand-solid)] text-white rounded-md font-bold text-[11px] uppercase tracking-wide hover:brightness-90 transition-all flex items-center gap-2 shadow-sm">
              <span class="material-symbols-outlined text-[20px]">add_circle</span>
              Yêu cầu bổ sung
            </button>
            
            <Dropdown 
              v-model="selectedMonth"
              :options="monthOptions"
              class="h-11 w-36"
            />
            
            <Dropdown 
              v-model="selectedYear"
              :options="yearOptions"
              class="h-11 w-32"
            />

            <button class="w-11 h-11 flex items-center justify-center rounded-md bg-white border border-[var(--sys-border-subtle)] text-[var(--sys-text-secondary)] hover:border-[var(--sys-brand-solid)] transition-all shadow-sm">
              <span class="material-symbols-outlined text-[18px]">filter_list</span>
            </button>
          </div>
        </div>
        
        <div class="overflow-x-auto custom-scrollbar">
          <table class="w-full text-left border-collapse">
            <thead class="bg-[var(--sys-bg-page)]">
              <tr>
                <th class="px-5 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase">Ngày / Thứ</th>
                <th class="px-5 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase">Thời điểm Vào</th>
                <th class="px-5 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase">Thời điểm Ra</th>
                <th class="px-5 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase text-center">Tổng giờ</th>
                <th class="px-5 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase text-right">Trạng thái</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[var(--sys-border-subtle)]">
              <tr v-for="(item, index) in historyItems" :key="index" class="hover:bg-[var(--sys-bg-hover)] transition-colors">
                <td class="px-5 py-3 text-[13px] font-bold text-[var(--sys-text-primary)] bg-transparent">{{ item.day }}</td>
                <td class="px-5 py-3 text-[13px] font-medium text-[var(--sys-text-secondary)] bg-transparent">{{ item.checkIn }}</td>
                <td class="px-5 py-3 text-[13px] font-medium text-[var(--sys-text-secondary)] bg-transparent">{{ item.checkOut }}</td>
                <td class="px-5 py-3 text-center bg-transparent">
                  <span class="text-[13px] font-bold text-[var(--sys-text-primary)]">{{ item.total }}</span>
                </td>
                <td class="px-5 py-3 text-right bg-transparent">
                  <span :class="getStatusClass(item.status)" class="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border">
                    {{ item.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="px-5 py-3 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 flex justify-between items-center">
          <p class="text-[11px] font-bold text-[var(--sys-text-disabled)] uppercase">Hiển thị 5/22 dữ liệu</p>
          <div class="flex items-center gap-1.5">
            <button class="px-3 py-1 bg-white border border-[var(--sys-border-subtle)] rounded-md text-[11px] font-bold text-[var(--sys-text-secondary)] hover:bg-[var(--sys-bg-hover)] transition-all">Trước</button>
            <button class="w-8 h-8 flex items-center justify-center bg-[var(--sys-brand-solid)] text-white text-[11px] font-bold rounded-md shadow-sm">1</button>
            <button class="w-8 h-8 flex items-center justify-center bg-white border border-[var(--sys-border-subtle)] text-[var(--sys-text-primary)] text-[11px] font-bold rounded-md hover:bg-[var(--sys-bg-page)]">2</button>
            <button class="px-3 py-1 bg-white border border-[var(--sys-border-subtle)] rounded-md text-[11px] font-bold text-[var(--sys-text-secondary)] hover:bg-[var(--sys-bg-hover)] transition-all">Tiếp</button>
          </div>
        </div>
      </div>

      <!-- Action Footer -->
      <div class="flex justify-end pt-4">
        <router-link to="/giai-trinh-cham-cong" class="h-10 px-6 bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border border-[var(--sys-warning-border)] rounded-md font-bold text-[11px] uppercase tracking-wide hover:brightness-95 transition-all flex items-center gap-2 shadow-sm">
          <span class="material-symbols-outlined text-[20px]">report_problem</span>
          Giải trình sai lệch
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
/**
 * TRANG CHẤM CÔNG (PORTAL) - PHIÊN BẢN ENTERPRISE SaaS
 * Tuân thủ 7 Golden Rules:
 * - Font Inter 14px (text-sm), Tỉ lệ table cao (text-13px)
 * - Bo góc chuẩn B2B: 6px (MD) cho Input/Button, 8px (LG) cho Card/Thẻ
 * - Hệ màu Semantic đồng bộ, loại bỏ font-black/italic
 */
import { ref, onMounted, onUnmounted } from 'vue';
import Dropdown from '@/components/Dropdown.vue';

const currentHours = ref('00');
const currentMinutes = ref('00');
const currentSeconds = ref('00');
const currentDateStr = ref('');
let timerInterval = null;

const selectedMonth = ref(10);
const selectedYear = ref(2023);

const monthOptions = [
  { label: 'Tháng 10', value: 10 },
  { label: 'Tháng 09', value: 9 },
  { label: 'Tháng 08', value: 8 },
];

const yearOptions = [
  { label: 'Năm 2023', value: 2023 },
  { label: 'Năm 2022', value: 2022 },
];

const historyItems = ref([
  { day: 'Thứ Sáu, 20/10', checkIn: '08:10:45', checkOut: '17:35:12', total: '8.5h', status: 'Hợp lệ' },
  { day: 'Thứ Năm, 19/10', checkIn: '08:45:10', checkOut: '17:30:00', total: '7.75h', status: 'Đi muộn' },
  { day: 'Thứ Tư, 18/10', checkIn: '08:05:30', checkOut: '16:15:00', total: '7.0h', status: 'Về sớm' },
  { day: 'Thứ Ba, 17/10', checkIn: '08:00:15', checkOut: '17:45:30', total: '8.75h', status: 'Hợp lệ' },
  { day: 'Thứ Hai, 16/10', checkIn: '07:55:12', checkOut: '17:32:05', total: '8.5h', status: 'Hợp lệ' }
]);

const updateTime = () => {
  const now = new Date();
  currentHours.value = String(now.getHours()).padStart(2, '0');
  currentMinutes.value = String(now.getMinutes()).padStart(2, '0');
  currentSeconds.value = String(now.getSeconds()).padStart(2, '0');
  
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  currentDateStr.value = `${days[now.getDay()]}, ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
};

onMounted(() => {
  updateTime();
  timerInterval = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});

const getStatusClass = (status) => {
  switch (status) {
    case 'Hợp lệ': return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
    case 'Đi muộn': return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]';
    case 'Về sớm': return 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]';
    default: return 'bg-[var(--sys-bg-page)] text-[var(--sys-text-secondary)] border-[var(--sys-border-subtle)]';
  }
};
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
