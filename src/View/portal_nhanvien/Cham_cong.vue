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
              <button 
                @click="handleCheckIn" 
                :disabled="attendanceToday?.checkOut2"
                :class="[
                  'flex-1 h-12 rounded-md font-bold text-[14px] uppercase tracking-wide shadow-md transition-all flex items-center justify-center gap-2',
                  attendanceToday?.checkOut2 ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'bg-[var(--sys-brand-solid)] hover:brightness-95 active:scale-95 text-white'
                ]"
              >
                <span class="material-symbols-outlined text-[24px]">login</span>
                Vào {{ !attendanceToday ? 'lần 1' : (!attendanceToday.checkIn2 ? 'lần 2' : '') }}
              </button>
              <button 
                @click="handleCheckOut" 
                :disabled="!attendanceToday?.checkIn2 || attendanceToday?.checkOut2"
                :class="[
                  'flex-1 h-12 rounded-md font-bold text-[14px] uppercase tracking-wide transition-all flex items-center justify-center gap-2 shadow-sm',
                  (!attendanceToday?.checkIn2 || attendanceToday?.checkOut2) 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' 
                    : 'bg-white hover:bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] border border-[var(--sys-border-strong)] active:scale-95'
                ]"
              >
                <span class="material-symbols-outlined text-[24px]">logout</span>
                Ra {{ attendanceToday?.checkIn2 && !attendanceToday?.checkOut1 ? 'lần 1' : (attendanceToday?.checkOut1 ? 'lần 2' : '') }}
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
            <button @click="showRequestModal = true" class="h-11 px-5 bg-[var(--sys-brand-solid)] text-white rounded-md font-bold text-[11px] uppercase tracking-wide hover:brightness-90 transition-all flex items-center gap-2 shadow-sm">
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
        <router-link to="/nhanvien/giaitrinhchamcong" class="h-10 px-6 bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border border-[var(--sys-warning-border)] rounded-md font-bold text-[11px] uppercase tracking-wide hover:brightness-95 transition-all flex items-center gap-2 shadow-sm">
          <span class="material-symbols-outlined text-[20px]">report_problem</span>
          Giải trình sai lệch
        </router-link>
      </div>

      <!-- Attendance Addition Request Modal -->
      <Teleport to="body">
        <Transition name="toast">
          <div v-if="showRequestModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="showRequestModal = false"></div>
            <div class="relative bg-white border border-[var(--sys-border-subtle)] w-full max-w-xl rounded-xl shadow-2xl overflow-hidden flex flex-col text-left">
              <!-- Modal Header -->
              <div class="px-6 py-4 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-[var(--sys-bg-page)]/50">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-[var(--sys-brand-solid)]">edit_calendar</span>
                  <div>
                    <h3 class="text-sm font-bold text-[var(--sys-text-primary)] m-0 uppercase tracking-wide">Yêu cầu bổ sung chấm công</h3>
                    <p class="text-[11px] text-[var(--sys-text-secondary)] mt-0.5 font-medium uppercase tracking-widest opacity-80">Gửi admin phê duyệt điều chỉnh dữ liệu</p>
                  </div>
                </div>
                <button @click="showRequestModal = false" class="text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] transition-colors">
                  <span class="material-symbols-outlined">close</span>
                </button>
              </div>

              <!-- Modal Body -->
              <div class="p-6 space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-1.5 flex flex-col">
                    <label class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider">Ngày cần bổ sung *</label>
                    <input v-model="requestForm.date" type="date" class="h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded text-sm font-medium outline-none focus:border-[var(--sys-brand-solid)] transition-all">
                  </div>
                  <div class="space-y-1.5 flex flex-col">
                    <label class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider">Thời lượng dự kiến</label>
                    <input v-model="requestForm.duration" type="text" placeholder="Ví dụ: 8h" class="h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded text-sm font-medium outline-none focus:border-[var(--sys-brand-solid)] transition-all">
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-1.5 flex flex-col">
                    <label class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider">Giờ vào lần 1</label>
                    <input v-model="requestForm.checkIn1" type="time" class="h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded text-sm font-medium outline-none focus:border-[var(--sys-brand-solid)] transition-all">
                  </div>
                  <div class="space-y-1.5 flex flex-col">
                    <label class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider">Giờ ra lần 1</label>
                    <input v-model="requestForm.checkOut1" type="time" class="h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded text-sm font-medium outline-none focus:border-[var(--sys-brand-solid)] transition-all">
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-1.5 flex flex-col">
                    <label class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider">Giờ vào lần 2</label>
                    <input v-model="requestForm.checkIn2" type="time" class="h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded text-sm font-medium outline-none focus:border-[var(--sys-brand-solid)] transition-all">
                  </div>
                  <div class="space-y-1.5 flex flex-col">
                    <label class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider">Giờ ra lần 2</label>
                    <input v-model="requestForm.checkOut2" type="time" class="h-10 px-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded text-sm font-medium outline-none focus:border-[var(--sys-brand-solid)] transition-all">
                  </div>
                </div>

                <div class="space-y-1.5 flex flex-col">
                  <label class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider">Lý do điều chỉnh *</label>
                  <textarea v-model="requestForm.reason" rows="3" placeholder="Ví dụ: Quên quẹt thẻ, đi công tác bên ngoài..." class="p-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded text-sm font-medium outline-none focus:border-[var(--sys-brand-solid)] transition-all resize-none"></textarea>
                </div>
              </div>

              <!-- Modal Footer -->
              <div class="px-6 py-4 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/30 flex justify-end gap-3">
                <button @click="showRequestModal = false" class="px-6 py-2 text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest hover:bg-[var(--sys-bg-hover)] rounded-md transition-all border border-transparent hover:border-[var(--sys-border-strong)]">Hủy bỏ</button>
                <button @click="submitAdditionRequest" class="px-8 py-2 bg-[var(--sys-brand-solid)] text-white rounded-md font-bold text-[11px] uppercase tracking-widest hover:brightness-110 shadow-lg active:scale-95 transition-all flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px]">send</span>
                  Gửi yêu cầu
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
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
import { useCurrentUser } from '@/composables/useCurrentUser.js';

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

// Lấy thông tin user đang đăng nhập
const { employeeId: currentEmpId, fullName: currentUserName } = useCurrentUser();
const userId = computed(() => currentEmpId.value);
const attendanceToday = ref(null);
const historyItems = ref([]);
const showToast = ref(false);
const toastMsg = ref('');
const toastType = ref('success');

const showRequestModal = ref(false);
const requestForm = ref({
  date: new Date().toISOString().split('T')[0],
  checkIn1: '',
  checkOut1: '',
  checkIn2: '',
  checkOut2: '',
  duration: '',
  reason: ''
});

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
    const userRes = await fetch(`http://localhost:3000/employees/${userId.value}`);
    const user = await userRes.json();
    if (user && user.managerId) {
      await fetch('http://localhost:3000/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.managerId,
          type: 'info',
          title: 'Thông báo Chấm công',
          desc: `${user.name || user.fullName || currentUserName.value} ${msg}`,
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
          desc: `${user.name || user.fullName || currentUserName.value} ${msg}`,
          time: 'Vừa xong',
          isRead: false,
          icon: 'history'
        })
      });
  } catch (e) { console.error('Notify Error:', e); }
};

const fetchAttendance = async () => {
  try {
    const res = await fetch(`http://localhost:3000/attendances?employeeId=${userId.value}`);
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

  // Nếu đã chấm ra lần 2 rồi thì không cho làm gì nữa
  if (attendanceToday.value?.checkOut2) {
    triggerToast('Bạn đã hoàn tất chấm công cho hôm nay (đã Check-out lần 2).', 'warning');
    return;
  }

  if (!attendanceToday.value) {
    const newEntry = {
      employeeId: userId.value,
      date: dateStr,
      checkIn1: timeStr,
      checkIn2: null,
      checkOut1: null,
      checkOut2: null,
      status: 'ontime',
      location: 'Văn phòng HCM'
    };
    await fetch('http://localhost:3000/attendances', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    });
    triggerToast('Ghi nhận vào lần 1 thành công!');
    notifyManager(`đã chấm công vào lúc ${timeStr}`);
  } else if (!attendanceToday.value.checkIn2) {
    await fetch(`http://localhost:3000/attendances/${attendanceToday.value.id}`, {
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
    triggerToast('Bạn chưa ghi nhận vào lần 1 hôm nay!', 'danger');
    return;
  }

  // Ràng buộc: Chỉ cho chấm ra nếu đã chấm vào đủ 2 lần
  if (!attendanceToday.value.checkIn2) {
    triggerToast('Bạn phải hoàn tất ghi nhận VÀO lần 2 trước khi ghi nhận RA.', 'warning');
    return;
  }

  // Nếu đã chấm ra lần 2 rồi thì không cho làm gì nữa
  if (attendanceToday.value.checkOut2) {
    triggerToast('Bạn đã hoàn tất tất cả lượt chấm công cho hôm nay.', 'warning');
    return;
  }

  if (!attendanceToday.value.checkOut1) {
    await fetch(`http://localhost:3000/attendances/${attendanceToday.value.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkOut1: timeStr })
    });
    triggerToast('Ghi nhận ra lần 1 thành công!');
    notifyManager(`đã chấm công ra lúc ${timeStr}`);
  } else {
    await fetch(`http://localhost:3000/attendances/${attendanceToday.value.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkOut2: timeStr })
    });
    triggerToast('Ghi nhận ra lần 2 (Kết thúc ngày) thành công!');
    notifyManager(`đã chấm công ra (cuối ngày) lúc ${timeStr}`);
  }
  fetchAttendance();
};

const submitAdditionRequest = async () => {
  if (!requestForm.value.date || !requestForm.value.reason) {
    triggerToast('Vui lòng điền đầy đủ các thông tin bắt buộc (*)', 'danger');
    return;
  }

  try {
    const today = new Date().toISOString().split('T')[0];
    const newRequest = {
      requesterId: userId.value,
      requesterName: currentUserName.value,
      requestDate: today,
      startDate: requestForm.value.date,
      endDate: requestForm.value.date,
      days: 1,
      requestTypeId: 11, // Bổ sung chấm công
      reason: requestForm.value.reason,
      status: 'CHỜ_DUYỆT',
      notes: `Bổ sung công ngày ${requestForm.value.date}. Giờ vào/ra: ${requestForm.value.checkIn1 || '--'} - ${requestForm.value.checkOut2 || requestForm.value.checkOut1 || '--'}`,
      details: {
        checkIn1: requestForm.value.checkIn1,
        checkOut1: requestForm.value.checkOut1,
        checkIn2: requestForm.value.checkIn2,
        checkOut2: requestForm.value.checkOut2,
        duration: requestForm.value.duration
      }
    };

    const res = await fetch('http://localhost:3000/leaveRequests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRequest)
    });

    if (res.ok) {
      triggerToast('Đã gửi yêu cầu bổ sung chấm công đến Admin!');
      showRequestModal.value = false;
      // Reset form
      requestForm.value = {
        date: new Date().toISOString().split('T')[0],
        checkIn1: '',
        checkOut1: '',
        checkIn2: '',
        checkOut2: '',
        duration: '',
        reason: ''
      };
      // Notify admin
      notifyAdminAddition(requestForm.value.date);
    }
  } catch (error) {
    console.error('Lỗi khi gửi yêu cầu:', error);
    triggerToast('Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.', 'danger');
  }
};

const notifyAdminAddition = async (date) => {
  try {
    await fetch('http://localhost:3000/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'NV001', // Admin
        type: 'warning',
        title: 'Yêu cầu Bổ sung Công',
        desc: `${currentUserName.value} vừa gửi yêu cầu bổ sung công ngày ${date}`,
        time: 'Vừa xong',
        isRead: false,
        icon: 'edit_calendar'
      })
    });
  } catch (e) { console.error('Notify Admin Error:', e); }
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
