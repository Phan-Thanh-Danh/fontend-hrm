<template>
  <div class="cham-cong-admin-page space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8 text-left">
      <div class="text-left">
        <h1 class="text-2xl font-black text-[var(--sys-text-primary)] tracking-tight text-left">Quản lý Chấm công & Thống kê</h1>
        <p class="text-[var(--sys-text-secondary)] text-sm font-medium italic text-left">Theo dõi chuyên cần, phê duyệt bảng công và quản lý dữ liệu nhân sự.</p>
      </div>
      <div class="flex items-center gap-3 text-left">
        <div class="flex items-center gap-2 bg-[var(--sys-bg-surface)] px-4 py-2.5 rounded-xl border border-[var(--sys-border-subtle)] text-left shadow-sm">
            <span class="text-[var(--sys-text-secondary)] text-[10px] font-black uppercase tracking-widest text-left">TRẠNG THÁI THÁNG 10/2023</span>
            <span class="flex items-center gap-1.5 text-[var(--sys-success-text)] font-black text-xs text-left">
                <span class="w-2.5 h-2.5 rounded-full bg-[var(--sys-success-solid)] shadow-sm shadow-[var(--sys-success-solid-lch-30)]"></span>
                ĐANG MỞ
            </span>
        </div>
        <button class="px-6 py-2.5 min-h-[44px] bg-[var(--sys-warning-solid)] rounded-xl font-black text-white hover:bg-[var(--sys-warning-hover)] active:scale-95 shadow-xl shadow-[var(--sys-warning-solid-lch-30)] transition-all flex items-center gap-2">
          <span class="material-symbols-outlined text-[20px]">lock_open</span> 
          Khóa bảng công
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row g-4 mb-4">
      <div class="col-md-4">
        <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] shadow-sm rounded-[2rem] h-100 p-8 flex flex-col group hover:shadow-xl transition-all duration-300">
          <div class="flex justify-between items-start mb-3 bg-transparent">
              <div class="bg-transparent">
                  <p class="text-[var(--sys-text-secondary)] text-[10px] font-black uppercase tracking-widest mb-2 italic" style="letter-spacing: 0.5px;">Tổng giờ OT tháng</p>
                  <h2 class="text-3xl font-black text-[var(--sys-text-primary)] mb-1 bg-transparent">1,240 <small class="text-sm font-bold text-[var(--sys-text-secondary)] bg-transparent italic">giờ</small></h2>
                  <p class="text-[var(--sys-success-text)] text-[11px] font-bold mb-0 flex items-center gap-1 bg-transparent">
                      <span class="material-symbols-outlined text-sm bg-transparent">trending_up</span> +12.5% so với tháng trước
                  </p>
              </div>
              <div class="w-12 h-12 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-2xl flex items-center justify-center group-hover:bg-[var(--sys-brand-solid)] group-hover:text-white transition-all duration-300">
                  <span class="material-symbols-outlined text-2xl">timer</span>
              </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] shadow-sm rounded-[2rem] h-100 p-8 flex flex-col group hover:shadow-xl transition-all duration-300">
          <div class="flex justify-between items-start mb-3 bg-transparent">
              <div class="bg-transparent">
                  <p class="text-[var(--sys-text-secondary)] text-[10px] font-black uppercase tracking-widest mb-2 italic" style="letter-spacing: 0.5px;">Tỷ lệ chuyên cần</p>
                  <h2 class="text-3xl font-black text-[var(--sys-text-primary)] mb-1 bg-transparent">98.5%</h2>
                  <p class="text-[var(--sys-success-text)] text-[11px] font-bold mb-0 flex items-center gap-1 bg-transparent">
                      <span class="material-symbols-outlined text-sm bg-transparent">trending_up</span> +0.2% so với tháng trước
                  </p>
              </div>
              <div class="w-12 h-12 bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] rounded-2xl flex items-center justify-center group-hover:bg-[var(--sys-success-solid)] group-hover:text-white transition-all duration-300">
                  <span class="material-symbols-outlined text-2xl">verified_user</span>
              </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] shadow-sm rounded-[2rem] h-100 p-8 flex flex-col group hover:shadow-xl transition-all duration-300">
          <div class="flex justify-between items-start mb-3 bg-transparent">
              <div class="bg-transparent">
                  <p class="text-[var(--sys-text-secondary)] text-[10px] font-black uppercase tracking-widest mb-2 italic" style="letter-spacing: 0.5px;">Vắng mặt hôm nay</p>
                  <h2 class="text-3xl font-black text-[var(--sys-text-primary)] mb-1 bg-transparent">12 <small class="text-sm font-bold text-[var(--sys-text-secondary)] bg-transparent italic">nhân viên</small></h2>
                  <p class="text-[var(--sys-danger-text)] text-[11px] font-bold mb-0 flex items-center gap-1 bg-transparent">
                      <span class="material-symbols-outlined text-sm bg-transparent">trending_down</span> -5% so với trung bình tuần
                  </p>
              </div>
              <div class="w-12 h-12 bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] rounded-2xl flex items-center justify-center group-hover:bg-[var(--sys-danger-solid)] group-hover:text-white transition-all duration-300">
                  <span class="material-symbols-outlined text-2xl">person_off</span>
              </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="row g-4 mb-4">
        <div class="col-xl-7">
            <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] shadow-sm rounded-[2.5rem] p-8 h-100">
                <h6 class="text-base font-black text-[var(--sys-text-primary)] mb-8 tracking-tight italic uppercase">Tổng giờ OT theo Phòng ban (Tháng này)</h6>
                <div class="flex items-end justify-around flex-grow-1 pt-4 px-2 bg-transparent" style="height: 200px;">
                    <div class="flex flex-col items-center gap-3 w-100 bg-transparent">
                        <div class="bg-[var(--sys-bg-hover)] rounded-t-xl w-12 relative" style="height: 120px;">
                            <div class="bg-[var(--sys-brand-solid)] rounded-t-xl absolute bottom-0 w-full shadow-lg shadow-[var(--sys-brand-solid-lch-30)]" style="height: 60%;"></div>
                        </div>
                        <span class="text-[var(--sys-text-secondary)] text-[10px] font-black uppercase tracking-widest bg-transparent">IT</span>
                    </div>
                    <div class="flex flex-col items-center gap-3 w-100 bg-transparent">
                        <div class="bg-[var(--sys-bg-hover)] rounded-t-xl w-12 relative" style="height: 120px;">
                            <div class="bg-[var(--sys-brand-solid)] rounded-t-xl absolute bottom-0 w-full shadow-lg shadow-[var(--sys-brand-solid-lch-30)]" style="height: 40%;"></div>
                        </div>
                        <span class="text-[var(--sys-text-secondary)] text-[10px] font-black uppercase tracking-widest bg-transparent">HR</span>
                    </div>
                    <div class="flex flex-col items-center gap-3 w-100 bg-transparent">
                        <div class="bg-[var(--sys-bg-hover)] rounded-t-xl w-12 relative" style="height: 120px;">
                            <div class="bg-[var(--sys-brand-solid)] rounded-t-xl absolute bottom-0 w-full shadow-lg shadow-[var(--sys-brand-solid-lch-30)]" style="height: 85%;"></div>
                        </div>
                        <span class="text-[var(--sys-text-secondary)] text-[10px] font-black uppercase tracking-widest bg-transparent">Sales</span>
                    </div>
                    <div class="flex flex-col items-center gap-3 w-100 bg-transparent">
                        <div class="bg-[var(--sys-bg-hover)] rounded-t-xl w-12 relative" style="height: 120px;">
                            <div class="bg-[var(--sys-brand-solid)] rounded-t-xl absolute bottom-0 w-full shadow-lg shadow-[var(--sys-brand-solid-lch-30)]" style="height: 30%;"></div>
                        </div>
                        <span class="text-[var(--sys-text-secondary)] text-[10px] font-black uppercase tracking-widest bg-transparent">MKT</span>
                    </div>
                    <div class="flex flex-col items-center gap-3 w-100 bg-transparent">
                        <div class="bg-[var(--sys-bg-hover)] rounded-t-xl w-12 relative" style="height: 120px;">
                            <div class="bg-[var(--sys-brand-solid)] rounded-t-xl absolute bottom-0 w-full shadow-lg shadow-[var(--sys-brand-solid-lch-30)]" style="height: 55%;"></div>
                        </div>
                        <span class="text-[var(--sys-text-secondary)] text-[10px] font-black uppercase tracking-widest bg-transparent">Ops</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-5">
            <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] shadow-sm rounded-[2.5rem] p-8 h-100">
                <h6 class="text-base font-black text-[var(--sys-text-primary)] mb-8 tracking-tight italic uppercase">Top nhân viên đi sớm nhất</h6>
                <div class="flex flex-col gap-6 bg-transparent">
                    <div v-for="user in topEarlyUsers" :key="user.name" class="flex items-center gap-4 bg-transparent group">
                        <span class="text-[var(--sys-text-secondary)] text-[11px] font-black uppercase tracking-widest bg-transparent w-24">{{ user.name }}</span>
                        <div class="flex-grow bg-[var(--sys-bg-hover)] rounded-full h-3 overflow-hidden">
                            <div class="bg-[var(--sys-success-solid)] h-full transition-all rounded-full group-hover:shadow-lg group-hover:shadow-[var(--sys-success-solid-lch-30)]" :style="{ width: user.percent + '%' }"></div>
                        </div>
                        <span class="text-[var(--sys-success-text)] text-[11px] font-black tracking-widest bg-transparent w-10">{{ user.earlyMinutes }}p</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Table -->
    <div class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden mb-4">
      <div class="px-8 py-5 border-b border-[var(--sys-border-subtle)] flex flex-col md:flex-row justify-between items-center gap-4 rounded-t-[2.5rem] bg-[var(--sys-bg-surface)]">
        <h6 class="text-base font-black text-[var(--sys-text-primary)] mb-0 italic uppercase tracking-tight">Danh sách Chấm công Theo Ngày</h6>
        <div class="flex items-center gap-2 w-full md:w-auto overflow-x-auto scrollbar-hide">
            <div class="flex items-center gap-2 bg-[var(--sys-bg-hover)] px-4 h-11 rounded-xl border border-[var(--sys-border-subtle)] shrink-0">
                <span class="material-symbols-outlined text-[18px] text-[var(--sys-text-secondary)] opacity-50">calendar_month</span>
                <input type="date" class="bg-transparent border-none text-[11px] font-black text-[var(--sys-text-primary)] focus:ring-0 outline-none" value="2023-10-05">
            </div>
            <Dropdown 
                v-model="filterDept"
                :options="deptOptions"
                placeholder="Phòng ban"
            />
            <Dropdown 
                v-model="filterStatus"
                :options="statusOptions"
                placeholder="Trạng thái"
            />
        </div>
      </div>
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr>
              <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]">Nhân viên</th>
              <th class="px-4 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]">Ca làm</th>
              <th class="px-4 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]">Check-in</th>
              <th class="px-4 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]">Check-out</th>
              <th class="px-4 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)] text-center">Đi muộn</th>
              <th class="px-4 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)] text-center">Về sớm</th>
              <th class="px-4 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)] text-center">Giờ OT</th>
              <th class="px-4 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]">Trạng thái</th>
              <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)] text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr v-for="record in timeRecords" :key="record.id" 
                class="group transition-colors duration-200 border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface)] hover:bg-[var(--sys-bg-hover)]">
              <td class="px-6 py-5 font-black text-[var(--sys-text-primary)] bg-transparent border-b border-[var(--sys-border-subtle)]">
                {{ record.name }}
              </td>
              <td class="px-4 py-5 font-medium text-[var(--sys-text-secondary)] italic bg-transparent border-b border-[var(--sys-border-subtle)]">
                {{ record.shift }}
              </td>
              <td class="px-4 py-5 font-black text-[var(--sys-text-primary)] bg-transparent border-b border-[var(--sys-border-subtle)]">
                {{ record.checkIn }}
              </td>
              <td class="px-4 py-5 font-black text-[var(--sys-text-primary)] bg-transparent border-b border-[var(--sys-border-subtle)]">
                {{ record.checkOut }}
              </td>
              <td class="px-4 py-5 text-center bg-transparent border-b border-[var(--sys-border-subtle)]" :class="record.late > 0 ? 'text-[var(--sys-danger-text)] font-black' : 'text-[var(--sys-text-secondary)] font-bold'">
                {{ record.late > 0 ? record.late + 'p' : '0p' }}
              </td>
              <td class="px-4 py-5 text-center text-[var(--sys-text-secondary)] font-medium bg-transparent border-b border-[var(--sys-border-subtle)]">
                {{ record.early > 0 ? record.early + 'p' : '0p' }}
              </td>
              <td class="px-4 py-5 text-center bg-transparent border-b border-[var(--sys-border-subtle)]" :class="record.ot > 0 ? 'text-[var(--sys-brand-solid)] font-black' : 'text-[var(--sys-text-secondary)] font-bold'">
                {{ record.ot > 0 ? record.ot + 'h' : '0h' }}
              </td>
              <td class="px-4 py-5 bg-transparent border-b border-[var(--sys-border-subtle)]">
                <span :class="[
                  'px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 border transition-all',
                  getStatusBadgeClass(record.statusText)
                ]">
                  <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(record.statusText)"></span>
                   {{ record.statusText }}
                </span>
              </td>
              <td class="px-6 py-5 text-right bg-transparent border-b border-[var(--sys-border-subtle)]">
                <div class="flex items-center justify-end gap-2 bg-transparent">
                  <button 
                    class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors bg-transparent text-[var(--sys-icon-default)] hover:text-[var(--sys-brand-solid)] hover:bg-[var(--sys-brand-solid)]/10" 
                    title="Chỉnh sửa"
                  >
                    <span class="material-symbols-outlined text-lg">edit</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    

  </div>
</template>

<script setup>
import { ref } from 'vue';
import Dropdown from '@/components/Dropdown.vue';

const filterDept = ref('ALL');
const filterStatus = ref('ALL');

const deptOptions = [
  { label: 'Tất cả phòng ban', value: 'ALL' },
  { label: 'Kỹ thuật', value: 'IT' },
  { label: 'Nhân sự', value: 'HR' }
];

const statusOptions = [
  { label: 'Tất cả trạng thái', value: 'ALL' },
  { label: 'Đúng giờ', value: 'NORMAL' },
  { label: 'Đi muộn', value: 'LATE' }
];

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'ĐỦ CÔNG': return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
    case 'ĐI MUỘN': return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]';
    case 'VẮNG MẶT': return 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]';
    default: return 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border-[var(--sys-border-subtle)]';
  }
};

const getStatusDotClass = (status) => {
  switch (status) {
    case 'ĐỦ CÔNG': return 'bg-[var(--sys-success-solid)]';
    case 'ĐI MUỘN': return 'bg-[var(--sys-warning-solid)]';
    case 'VẮNG MẶT': return 'bg-[var(--sys-danger-solid)]';
    default: return 'bg-[var(--sys-icon-default)]';
  }
};

const topEarlyUsers = ref([
    { name: 'Nguyễn Văn A', earlyMinutes: 45, percent: 85 },
    { name: 'Trần Thị B', earlyMinutes: 30, percent: 65 },
    { name: 'Lê Văn C', earlyMinutes: 20, percent: 45 },
    { name: 'Phạm Đạt', earlyMinutes: 15, percent: 25 },
]);

const timeRecords = ref([
    { 
        id: 1, 
        name: 'Nguyễn Văn A', 
        shift: 'Sáng (08:00-17:00)', 
        checkIn: '08:15', 
        checkOut: '17:05', 
        late: 15, 
        early: 0, 
        ot: 0, 
        statusText: 'ĐI MUỘN'
    },
    { 
        id: 2, 
        name: 'Trần Thị B', 
        shift: 'Sáng (08:00-17:00)', 
        checkIn: '07:55', 
        checkOut: '18:30', 
        late: 0, 
        early: 0, 
        ot: 1.5, 
        statusText: 'ĐỦ CÔNG'
    },
    { 
        id: 3, 
        name: 'Lê Văn C', 
        shift: 'Sáng (08:00-17:00)', 
        checkIn: '--:--', 
        checkOut: '--:--', 
        late: 0, 
        early: 0, 
        ot: 0, 
        statusText: 'VẮNG MẶT'
    }
]);
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--sys-border-subtle);
  border-radius: 10px;
}
</style>
