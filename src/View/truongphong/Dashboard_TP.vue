<template>
  <div class="space-y-6 pb-8">
    <!-- Header Area: SaaS Enterprise Style -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left px-1">
      <div class="bg-transparent text-left">
        <h1 class="text-xl font-bold text-[var(--sys-text-primary)] mb-0.5 tracking-tight uppercase">Điều hành Tổng quan Phòng ban</h1>
        <p class="text-[13px] text-[var(--sys-text-secondary)] font-medium">Số liệu thống kê nhân sự và hiệu suất vận hành thời gian thực.</p>
      </div>
      <div class="flex items-center gap-2">
        <div class="px-3 py-1.5 bg-[var(--sys-brand-soft)] rounded-md border border-[var(--sys-brand-border)] text-[var(--sys-brand-solid)] font-bold text-[10px] uppercase tracking-widest animate-pulse">
          IT DEPARTMENT LIVE
        </div>
      </div>
    </div>

    <!-- Quick Stats Grid: Enterprise Density -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="stat in stats" :key="stat.label" 
        class="bg-[var(--sys-bg-surface)] p-5 rounded-lg border border-[var(--sys-border-subtle)] shadow-sm hover:shadow-md transition-all flex items-center gap-5 group cursor-default">
        <div :class="['w-12 h-12 rounded-md', stat.bg, stat.color, 'flex items-center justify-center shrink-0 border', stat.border, 'group-hover:scale-105 transition-all duration-300 shadow-sm']">
          <span class="material-symbols-rounded text-[24px] font-bold">{{ stat.icon }}</span>
        </div>
        <div class="flex flex-col min-w-0">
          <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1 shadow-none whitespace-nowrap">{{ stat.label }}</p>
          <h3 class="text-2xl font-bold text-[var(--sys-text-primary)] leading-none tracking-tight whitespace-nowrap">{{ stat.value }}</h3>
        </div>
      </div>
    </div>

    <!-- Main Content Split -->
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
      
      <!-- Center Column: Approvals & Activity -->
      <div class="xl:col-span-8 space-y-5">
        <!-- Attendance Performance -->
        <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col min-h-[380px]">
          <div class="px-5 py-3.5 border-b border-[var(--sys-border-subtle)] flex justify-between items-center bg-[var(--sys-bg-page)]/30">
            <h3 class="text-[11px] font-bold text-[var(--sys-text-primary)] uppercase tracking-widest m-0 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border border-[var(--sys-brand-border)] flex items-center justify-center shrink-0">
                <span class="material-symbols-rounded text-[20px] font-bold">analytics</span>
              </div>
              CHỈ SỐ CHUYÊN CẦN TUẦN
            </h3>
            <button class="text-[10px] font-bold text-[var(--sys-brand-solid)] uppercase tracking-widest hover:opacity-80 transition-opacity">Xem báo cáo bộ phận</button>
          </div>
          <div class="p-8 flex-grow flex items-end gap-3 justify-between bg-transparent">
            <div v-for="(h, i) in chartData" :key="i" class="flex-1 flex flex-col items-center gap-3">
              <div :style="`height: ${h}%`" :class="`w-full max-w-[45px] rounded-md transition-all duration-1000 ${h < 50 ? 'bg-[var(--sys-danger-solid)]' : 'bg-[var(--sys-brand-solid)]'} opacity-80 hover:opacity-100 shadow-sm border border-white/10 hover:scale-105 transition-transform cursor-pointer`"></div>
              <span class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest opacity-60">T{{ i === 6 ? 'CN' : i + 2 }}</span>
            </div>
          </div>
        </div>

        <!-- Approvals List -->
        <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden">
          <div class="px-5 py-3.5 border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/30">
            <h3 class="text-[11px] font-bold text-[var(--sys-text-primary)] uppercase tracking-widest m-0 flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-md bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border border-[var(--sys-warning-border)] flex items-center justify-center shrink-0">
                <span class="material-symbols-rounded text-[20px] font-bold">pending_actions</span>
              </div>
              YÊU CẦU CHỜ PHÊ DUYỆT ({{ pendingItems.length }})
            </h3>
          </div>
          <div class="divide-y divide-[var(--sys-border-subtle)]">
            <div v-for="item in pendingItems" :key="item.id" class="p-4 hover:bg-[var(--sys-bg-hover)] transition-all flex items-center justify-between group">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-md bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] flex items-center justify-center font-bold text-xs text-[var(--sys-brand-solid)] shadow-sm uppercase tracking-tighter">
                  {{ item.name.charAt(0) }}
                </div>
                <div>
                  <div class="flex items-center gap-2 mb-0.5">
                    <h4 class="text-[13px] font-bold text-[var(--sys-text-primary)] m-0 uppercase tracking-tight group-hover:text-[var(--sys-brand-solid)] transition-colors">{{ item.name }}</h4>
                    <span class="px-1.5 py-0.5 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border border-[var(--sys-brand-border)] rounded text-[9px] font-bold uppercase tracking-tight">IT DEPT</span>
                  </div>
                  <p class="text-[11px] font-medium text-[var(--sys-text-secondary)] m-0 flex items-center gap-2 opacity-70">
                    {{ item.type }} <span class="w-1 h-1 rounded-full bg-[var(--sys-border-strong)]"></span> {{ item.date }}
                  </p>
                </div>
              </div>
              <div class="flex gap-2">
                <button 
                  @click="handleApprove(item)"
                  class="h-8 px-4 rounded-md bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] font-bold text-[10px] uppercase tracking-widest hover:bg-[var(--sys-success-solid)] hover:text-white transition-all shadow-sm"
                >DUYỆT</button>
                <button 
                  @click="handleReject(item)"
                  class="h-8 px-4 rounded-md bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] font-bold text-[10px] uppercase tracking-widest hover:bg-[var(--sys-danger-solid)] hover:text-white transition-all shadow-sm"
                >HỦY</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Dept Information -->
      <div class="xl:col-span-4 space-y-5">
        <!-- Dept Identity -->
        <div class="bg-gradient-to-br from-[var(--sys-brand-solid)] via-indigo-700 to-violet-800 text-white p-6 rounded-lg shadow-xl relative overflow-hidden group">
          <span class="material-symbols-rounded absolute -right-4 -bottom-4 text-[140px] opacity-10 rotate-12 transition-transform duration-700 group-hover:rotate-0 group-hover:scale-110">schema</span>
          <div class="relative z-10 space-y-4 text-left">
            <h4 class="text-[11px] font-bold uppercase tracking-widest opacity-80 m-0">ĐƠN VỊ VẬN HÀNH</h4>
            <h2 class="text-2xl font-bold uppercase m-0 tracking-tighter leading-tight">{{ deptInfo.name || 'KỸ THUẬT VÀ CLOUD' }}</h2>
            
            <div class="pt-6 border-t border-white/20 grid grid-cols-2 gap-4">
              <div class="bg-white/10 p-3 rounded-md border border-white/10 backdrop-blur-sm">
                <p class="text-[9px] font-bold uppercase mb-1 opacity-70 tracking-widest leading-none">Thành viên</p>
                <p class="text-xl font-bold m-0 italic">{{ deptInfo.count }}</p>
              </div>
              <div class="bg-white/10 p-3 rounded-md border border-white/10 backdrop-blur-sm">
                <p class="text-[9px] font-bold uppercase mb-1 opacity-70 tracking-widest leading-none">Ngân sách dự kiến</p>
                <p class="text-xl font-bold m-0 italic">{{ deptInfo.budget }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Department Goals -->
        <div class="bg-[var(--sys-bg-surface)] p-6 rounded-lg border border-[var(--sys-border-subtle)] shadow-sm space-y-5 text-left">
          <h3 class="text-[11px] font-bold text-[var(--sys-text-primary)] uppercase tracking-widest m-0 flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border border-[var(--sys-brand-border)] flex items-center justify-center shrink-0">
              <span class="material-symbols-rounded text-[20px] font-bold">equalizer</span>
            </div>
            KPI VẬN HÀNH THÁNG 3
          </h3>
          <div v-for="p in projects" :key="p.name" class="space-y-2">
            <div class="flex justify-between items-center bg-transparent">
              <span class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest">{{ p.name }}</span>
              <span class="text-[11px] font-bold text-[var(--sys-brand-solid)]">{{ p.progress }}%</span>
            </div>
            <div class="w-full h-1.5 bg-[var(--sys-bg-page)] rounded-full overflow-hidden border border-[var(--sys-border-subtle)] p-[1px]">
              <div :style="`width: ${p.progress}%`" class="h-full bg-gradient-to-r from-[var(--sys-brand-solid)] to-indigo-500 rounded-full transition-all duration-1000 shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const stats = ref([])
const pendingItems = ref([])
const projects = ref([])
const deptInfo = ref({ name: 'Đang tải...', count: 0, budget: '0' })
const chartData = ref([65, 80, 45, 90, 85, 40, 75])

const userId = localStorage.getItem('userId') || 'NV008';
const userDeptId = localStorage.getItem('userDeptId') || '1';

const fetchData = async () => {
  try {
    const [empRes, deptRes, reqRes] = await Promise.all([
      fetch(`http://localhost:3000/employees?deptId=${userDeptId}`),
      fetch(`http://localhost:3000/departments/${userDeptId}`),
      fetch(`http://localhost:3000/leaveRequests?status=pending`)
    ]);

    const employees = await empRes.json();
    const department = await deptRes.json();
    const allReqs = await reqRes.json();

    deptInfo.value = {
        name: department.name || 'Phòng ban',
        count: employees.length,
        budget: department.budget || 'N/A'
    };
    
    // Filter leave requests for this department
    pendingItems.value = allReqs.filter(req => 
      employees.some(e => e.id === req.employeeId)
    ).map(req => ({
        id: req.id,
        name: req.name || 'Nhân viên',
        type: req.type || 'Nghi phép',
        date: req.requestDate || 'Hôm nay'
    }));

    projects.value = [
        { name: 'Kế hoạch Quý 2', progress: 85 },
        { name: 'Phát triển Nhân sự', progress: 40 },
        { name: 'Tối ưu Vận hành', progress: 92 }
    ];
    
    const lateCount = 1; // Mock or calculate if attendance is fetched

    stats.value = [
        { label: 'TỔNG NHÂN SỰ', value: String(deptInfo.value.count).padStart(2, '0'), icon: 'groups', bg: 'bg-[var(--sys-brand-soft)]', color: 'text-[var(--sys-brand-solid)]', border: 'border-[var(--sys-brand-border)]' },
        { label: 'ĐI MUỘN HÔM NAY', value: String(lateCount).padStart(2, '0'), icon: 'alarm_off', bg: 'bg-[var(--sys-danger-soft)]', color: 'text-[var(--sys-danger-text)]', border: 'border-[var(--sys-danger-border)]' },
        { label: 'CHỜ THẨM ĐỊNH', value: String(pendingItems.value.length).padStart(2, '0'), icon: 'pending_actions', bg: 'bg-[var(--sys-warning-soft)]', color: 'text-[var(--sys-warning-text)]', border: 'border-[var(--sys-danger-border)]' },
        { label: 'TIẾN ĐỘ DỰ ÁN', value: `72%`, icon: 'trending_up', bg: 'bg-[var(--sys-success-soft)]', color: 'text-[var(--sys-success-text)]', border: 'border-[var(--sys-success-border)]' }
    ];
    
    chartData.value = [65 + Math.random()*20, 80 + Math.random()*10, 45 + Math.random()*30, 90, 85, 40, 75];
    
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu Trưởng phòng:', error);
  }
};

const handleApprove = async (req) => {
  await fetch(`http://localhost:3000/leaveRequests/${req.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'approved', approverId: userId })
  });
  fetchData();
};

const handleReject = async (req) => {
  const reason = prompt('Lý do từ chối:');
  if (reason) {
    await fetch(`http://localhost:3000/leaveRequests/${req.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'rejected', rejectReason: reason, approverId: userId })
    });
    fetchData();
  }
};

let pollInterval = null;

onMounted(() => {
  fetchData();
  pollInterval = setInterval(fetchData, 10000); // Live sync every 10s
});

onUnmounted(() => {
  if (pollInterval) clearInterval(pollInterval);
});
</script>

<style scoped>
/* Sub-pixel text rendering for premium feel */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
