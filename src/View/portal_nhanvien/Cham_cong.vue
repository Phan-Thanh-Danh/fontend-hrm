<template>
  <div class="attendance-wrapper min-h-screen bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] p-4 md:p-6 lg:p-8">
    <!-- Toast Notification -->
    <Transition name="toast">
      <div v-if="showToast" :class="['fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 border backdrop-blur-md transition-all', 
        toastType === 'success' ? 'bg-green-50/90 text-green-700 border-green-200' : 
        toastType === 'danger' ? 'bg-red-50/90 text-red-700 border-red-200' : 
        'bg-amber-50/90 text-amber-700 border-amber-200']">
        <span class="material-symbols-outlined text-[20px]">{{ toastType === 'success' ? 'check_circle' : toastType === 'danger' ? 'error' : 'warning' }}</span>
        <span class="text-sm font-bold tracking-tight">{{ toastMsg }}</span>
      </div>
    </Transition>

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
              <button @click="handleCheckIn" class="flex-1 h-12 bg-[var(--sys-brand-solid)] hover:brightness-95 text-white rounded-md font-bold text-[14px] uppercase tracking-wide shadow-md transition-all active:scale-95 flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-[24px]">login</span>
                Ghi nhận Vào
              </button>
              <button @click="handleCheckOut" class="flex-1 h-12 bg-white hover:bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] border border-[var(--sys-border-strong)] rounded-md font-bold text-[14px] uppercase tracking-wide transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm">
                <span class="material-symbols-outlined text-[24px]">logout</span>
                Ghi nhận Ra
              </button>
            </div>
            <p class="text-xs text-[var(--sys-text-secondary)] mt-6 flex items-center gap-2 opacity-80">
              <span class="material-symbols-outlined text-[16px]">history</span>
              Ghi nhận gần nhất: <span class="font-bold text-[var(--sys-text-primary)]">{{ lastLogTime }}</span>
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
                <span class="text-[12px] font-medium text-[var(--sys-text-secondary)]">Thời điểm Vào 1:</span>
                <span class="text-[13px] font-bold text-[var(--sys-text-primary)] text-right">{{ attendanceToday?.checkIn1 || '--:--' }}</span>
              </div>
              <div class="flex justify-between items-center p-3 rounded-md bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)]">
                <span class="text-[12px] font-medium text-[var(--sys-text-secondary)]">Thời điểm Vào 2:</span>
                <span class="text-[13px] font-bold text-[var(--sys-text-primary)] text-right">{{ attendanceToday?.checkIn2 || '--:--' }}</span>
              </div>
              <div class="flex justify-between items-center p-3 rounded-md bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)]">
                <span class="text-[12px] font-medium text-[var(--sys-text-secondary)]">Thời điểm Ra 1:</span>
                <span class="text-[13px] font-bold text-[var(--sys-text-primary)] text-right">{{ attendanceToday?.checkOut1 || '--:--' }}</span>
              </div>
              <div class="flex justify-between items-center p-3 rounded-md bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)]">
                <span class="text-[12px] font-medium text(--sys-text-secondary)]">Thời điểm Ra 2:</span>
                <span class="text-[13px] font-bold text-[var(--sys-text-primary)] text-right">{{ attendanceToday?.checkOut2 || '--:--' }}</span>
              </div>
              <div class="flex justify-between items-center p-3 rounded-md bg-[var(--sys-brand-soft)] border border-[var(--sys-brand-border)]">
                <span class="text-[12px] font-bold text-[var(--sys-brand-solid)]">Tổng tích lũy hiện tại:</span>
                <span class="text-[13px] font-bold text-[var(--sys-brand-solid)]">{{ calculateTotal(attendanceToday || {}) }}</span>
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
import { ref, onMounted, onUnmounted, computed } from 'vue';
import Dropdown from '@/components/Dropdown.vue';

const currentHours = ref('00');
const currentMinutes = ref('00');
const currentSeconds = ref('00');
const currentDateStr = ref('');
let timerInterval = null;

const selectedMonth = ref(new Date().getMonth() + 1);
const selectedYear = ref(new Date().getFullYear());

const monthOptions = Array.from({ length: 12 }, (_, i) => ({ label: `Tháng ${i + 1}`, value: i + 1 }));
const yearOptions = [
  { label: 'Năm 2026', value: 2026 },
  { label: 'Năm 2025', value: 2025 },
];

const userId = localStorage.getItem('userId') || 'NV002';
const attendanceToday = ref(null);
const historyItems = ref([]);
const showToast = ref(false);
const toastMsg = ref('');
const toastType = ref('success');

const lastLogTime = computed(() => {
  if (!attendanceToday.value) return '--:--:--';
  return attendanceToday.value.checkOut2 || attendanceToday.value.checkOut1 || attendanceToday.value.checkIn2 || attendanceToday.value.checkIn1 || '--:--:--';
});

const triggerToast = (msg, type = 'success') => {
  toastMsg.value = msg;
  toastType.value = type;
  showToast.value = true;
  setTimeout(() => { showToast.value = false; }, 3000);
};

const notifyManager = async (msg) => {
  try {
    const userRes = await fetch(`http://localhost:3000/employees/${userId}`);
    const user = await userRes.json();
    if (user && user.managerId) {
      await fetch('http://localhost:3000/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.managerId,
          type: 'info',
          title: 'Thông báo Chấm công',
          desc: `${user.name} ${msg}`,
          time: 'Vừa xong',
          isRead: false,
          icon: 'history'
        })
      });
    }
    // Also notify HR (NV001)
    await fetch('http://localhost:3000/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'NV001',
          type: 'info',
          title: 'Hệ thống Chấm công',
          desc: `${user.name} ${msg}`,
          time: 'Vừa xong',
          isRead: false,
          icon: 'history'
        })
      });
  } catch (e) { console.error('Notify Error:', e); }
};

const fetchAttendance = async () => {
  try {
    const res = await fetch(`http://localhost:3000/attendance?employeeId=${userId}`);
    const data = await res.json();
    
    // Sort by date descending
    const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    historyItems.value = sortedData.map(item => {
      const d = new Date(item.date);
      const dayStr = [`Chủ Nhật`, `Thứ Hai`, `Thứ Ba`, `Thứ Tư`, `Thứ Năm`, `Thứ Sáu`, `Thứ Bảy`][d.getDay()];
      return {
        day: `${dayStr}, ${d.getDate()}/${d.getMonth() + 1}`,
        checkIn: item.checkIn1 && item.checkIn2 ? `${item.checkIn1} | ${item.checkIn2}` : (item.checkIn1 || '--:--:--'),
        checkOut: item.checkOut1 && item.checkOut2 ? `${item.checkOut1} | ${item.checkOut2}` : (item.checkOut1 || '--:--:--'),
        total: calculateTotal(item),
        status: item.status === 'ontime' ? 'Hợp lệ' : item.status === 'late' ? 'Đi muộn' : 'Vắng mặt'
      };
    });

    const todayStr = new Date().toISOString().split('T')[0];
    attendanceToday.value = data.find(item => item.date === todayStr);
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu chấm công:', error);
  }
};

const calculateTotal = (item) => {
  if (!item.checkIn1 || !item.checkOut1) return '0h';
  const start = new Date(`2000-01-01T${item.checkIn1}`);
  const end = new Date(`2000-01-01T${item.checkOut2 || item.checkOut1}`);
  const diff = (end - start) / (1000 * 60 * 60);
  return diff > 0 ? `${diff.toFixed(1)}h` : '0h';
};

const handleCheckIn = async () => {
  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0];
  const dateStr = now.toISOString().split('T')[0];

  if (!attendanceToday.value) {
    const newEntry = {
      employeeId: userId,
      date: dateStr,
      checkIn1: timeStr,
      checkIn2: null,
      checkOut1: null,
      checkOut2: null,
      status: 'ontime',
      location: 'Văn phòng HCM'
    };
    await fetch('http://localhost:3000/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    });
    triggerToast('Ghi nhận vào lần 1 thành công!');
    notifyManager(`đã chấm công vào lúc ${timeStr}`);
  } else if (!attendanceToday.value.checkIn2) {
    await fetch(`http://localhost:3000/attendance/${attendanceToday.value.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkIn2: timeStr })
    });
    triggerToast('Ghi nhận vào lần 2 thành công!');
    notifyManager(`đã chấm công vào (lần 2) lúc ${timeStr}`);
  } else {
    triggerToast('Bạn đã ghi nhận vào đủ 2 lần cho hôm nay.', 'warning');
    return;
  }
  fetchAttendance();
};

const handleCheckOut = async () => {
  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0];

  if (!attendanceToday.value || !attendanceToday.value.checkIn1) {
    triggerToast('Bạn chưa ghi nhận vào hôm nay!', 'danger');
    return;
  }

  if (!attendanceToday.value.checkOut1) {
    await fetch(`http://localhost:3000/attendance/${attendanceToday.value.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkOut1: timeStr })
    });
    triggerToast('Ghi nhận ra lần 1 thành công!');
    notifyManager(`đã chấm công ra lúc ${timeStr}`);
  } else if (!attendanceToday.value.checkOut2) {
    await fetch(`http://localhost:3000/attendance/${attendanceToday.value.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkOut2: timeStr })
    });
    triggerToast('Ghi nhận ra lần 2 thành công!');
    notifyManager(`đã chấm công ra (lần 2) lúc ${timeStr}`);
  } else {
    triggerToast('Bạn đã ghi nhận ra đủ 2 lần cho hôm nay.', 'warning');
    return;
  }
  fetchAttendance();
};

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
  fetchAttendance();
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});

const getStatusClass = (status) => {
  switch (status) {
    case 'Hợp lệ': return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
    case 'Đi muộn': return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]';
    case 'Vắng mặt': return 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]';
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
.toast-enter-active, .toast-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px) scale(0.9);
}
</style>
