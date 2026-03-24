<template>
  <div class="space-y-6 pb-8">
    <!-- Header Area -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left">
      <div class="bg-transparent text-left">
        <h1 class="text-xl font-semibold text-[var(--sys-text-primary)] mb-1 uppercase tracking-tight">Tổng quan Hệ thống Quản trị</h1>
        <p class="text-[13px] text-[var(--sys-text-secondary)]">Theo dõi biến động nhân sự, hiệu suất vận hành và tiến độ công việc trong thời gian thực.</p>
      </div>
      <div class="flex items-center gap-3 bg-transparent shrink-0">
        <div class="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-md text-[var(--sys-text-primary)] text-[11px] font-bold shadow-sm uppercase tracking-wider">
          <span class="w-1.5 h-1.5 rounded-full bg-[var(--sys-success-solid)] animate-pulse"></span>
          Hệ thống trực tuyến
        </div>
        <div class="hidden md:block bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] px-4 py-1.5 rounded-md font-bold text-[11px] border border-[var(--sys-brand-border)] shadow-sm uppercase tracking-wider">
          Phiên bản 3.0
        </div>
      </div>
    </div>

    <!-- Stats Section (Directive 1 & 5) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="(stat, idx) in stats" :key="idx" 
        class="bg-[var(--sys-bg-surface)] p-4 rounded-lg border border-[var(--sys-border-subtle)] shadow-sm hover:border-[var(--sys-brand-solid)] transition-all flex items-center gap-4 group">
        <!-- Universal Icon Wrapper (Directive 1) -->
        <div :class="[
          'w-10 h-10 rounded-md flex items-center justify-center transition-all border shrink-0',
          getStatIconClass(stat.color)
        ]">
          <span class="material-symbols-outlined text-xl">{{ stat.icon }}</span>
        </div>
        <div class="bg-transparent flex flex-col flex-1 overflow-hidden">
          <div class="flex items-center justify-between mb-0.5">
            <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest opacity-60 truncate">{{ stat.label }}</p>
            <span :class="[
              'text-[10px] font-bold px-1.5 py-0.5 rounded-md border uppercase tracking-tighter',
              getStatIconClass(stat.color)
            ]">
              {{ stat.change }}
            </span>
          </div>
          <h2 class="text-xl font-bold text-[var(--sys-text-primary)] leading-tight m-0 tracking-tight">{{ stat.value }}</h2>
        </div>
      </div>
    </div>

    <!-- Charts Section (Directive 1 & 5) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
      <!-- Personnel Trends -->
      <div class="bg-[var(--sys-bg-surface)] p-4 rounded-lg border border-[var(--sys-border-subtle)] shadow-sm flex flex-col hover:border-[var(--sys-brand-solid)] transition-all">
        <div class="flex justify-between items-center mb-6">
          <h5 class="text-[13px] font-bold text-[var(--sys-text-primary)] flex items-center gap-2 uppercase tracking-widest leading-none">
            <div class="w-8 h-8 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center border border-[var(--sys-brand-border)]">
              <span class="material-symbols-outlined text-[18px]">analytics</span>
            </div>
            Biến động nhân sự
          </h5>
          <Dropdown v-model="timeRange" :options="timeRangeOptions" class="min-w-[150px] h-9" />
        </div>
        
        <div class="flex items-end justify-around flex-grow border-b border-[var(--sys-border-subtle)] pb-4 min-h-[200px]">
          <div v-for="i in 6" :key="i" class="flex gap-1 items-end justify-center w-full bg-transparent group/bar max-w-[40px]">
            <div class="w-3 bg-[var(--sys-brand-solid)] rounded-t-sm shadow-sm transition-all h-32 hover:brightness-110" :style="{ height: (Math.random() * 80 + 40) + 'px' }"></div>
            <div class="w-3 bg-[var(--sys-brand-soft)] rounded-t-sm border border-[var(--sys-brand-border)] transition-all h-20 hover:brightness-105" :style="{ height: (Math.random() * 40 + 20) + 'px' }"></div>
          </div>
        </div>
        <div class="flex justify-between pt-3 text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest opacity-60 px-4">
          <span>TH 01</span><span>TH 02</span><span>TH 03</span><span>TH 04</span><span>TH 05</span><span>TH 06</span>
        </div>
        
        <div class="flex justify-center gap-6 mt-6">
          <div class="flex items-center gap-2">
            <div class="w-2.5 h-2.5 rounded-sm bg-[var(--sys-brand-solid)]"></div>
            <span class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest opacity-80">Tuyển mới</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2.5 h-2.5 rounded-sm bg-[var(--sys-brand-soft)] border border-[var(--sys-brand-border)]"></div>
            <span class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest opacity-80">Nghỉ việc</span>
          </div>
        </div>
      </div>

      <!-- Resource Allocation (Directive 5) -->
      <div class="bg-[var(--sys-bg-surface)] p-4 rounded-lg border border-[var(--sys-border-subtle)] shadow-sm flex flex-col hover:border-[var(--sys-brand-solid)] transition-all">
        <div class="flex justify-between items-center mb-6">
          <h5 class="text-[13px] font-bold text-[var(--sys-text-primary)] flex items-center gap-2 uppercase tracking-widest leading-none">
            <div class="w-8 h-8 rounded-md bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] flex items-center justify-center border border-[var(--sys-success-border)]">
              <span class="material-symbols-outlined text-[18px]">pie_chart</span>
            </div>
            Phân bổ nguồn lực
          </h5>
          <button class="text-[11px] font-bold text-[var(--sys-brand-solid)] hover:opacity-80 transition-opacity flex items-center gap-1 uppercase tracking-widest">
            Báo cáo chi tiết
            <span class="material-symbols-outlined text-[16px]">arrow_right_alt</span>
          </button>
        </div>

        <div class="space-y-5 flex-grow px-2">
          <div v-for="(dept, idx) in departmentData" :key="idx" class="space-y-2">
            <div class="flex justify-between items-end">
              <span class="text-[13px] font-bold text-[var(--sys-text-primary)]">{{ dept.name }}</span>
              <div class="flex items-center gap-2 text-[11px] font-bold uppercase tracking-tight">
                <span class="text-[var(--sys-text-disabled)] opacity-60">{{ dept.count }} NV</span>
                <span class="text-[var(--sys-brand-solid)]">{{ dept.percent }}%</span>
              </div>
            </div>
            <div class="h-1.5 bg-[var(--sys-bg-page)] rounded-full overflow-hidden border border-[var(--sys-border-subtle)] shadow-inner">
              <div class="h-full rounded-full transition-all duration-1000" 
                :class="dept.color"
                :style="{ width: dept.percent + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tasks & Events Table (Directive 5) -->
    <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col">
      <div class="px-4 py-3 border-b border-[var(--sys-border-subtle)] flex flex-col sm:flex-row justify-between items-center gap-4 bg-[var(--sys-bg-page)]/50">
        <div class="text-left flex items-center gap-3">
          <!-- Universal Icon Wrapper -->
          <div class="w-10 h-10 rounded-md bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] flex items-center justify-center border border-[var(--sys-danger-border)]">
            <span class="material-symbols-outlined text-xl">assignment_late</span>
          </div>
          <div class="bg-transparent text-left">
            <h5 class="text-[13px] font-bold text-[var(--sys-text-primary)] m-0 uppercase tracking-widest leading-none">Nhiệm vụ & Sự kiện ưu tiên</h5>
            <p class="text-[11px] text-[var(--sys-text-secondary)] font-medium mt-1">Các tiến trình cần phê chuẩn hoặc can thiệp khẩn cấp.</p>
          </div>
        </div>
        <div class="flex bg-[var(--sys-bg-hover)] p-1 rounded-md border border-[var(--sys-border-subtle)] h-10">
          <button class="px-5 h-full bg-white shadow-sm rounded-md text-[11px] font-bold text-[var(--sys-brand-solid)] transition-all uppercase tracking-widest border border-[var(--sys-border-strong)]">Tất cả luồng việc</button>
          <button class="px-5 h-full rounded-md text-[11px] font-bold text-[var(--sys-text-secondary)] hover:text-[var(--sys-brand-solid)] transition-all opacity-60 uppercase tracking-widest">Việc của tôi</button>
        </div>
      </div>
      
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse">
          <thead class="bg-[var(--sys-bg-page)]">
            <tr>
              <th class="px-4 py-2.5 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest">Đối tượng thụ hưởng</th>
              <th class="px-4 py-2.5 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest">Nội dung đề xuất</th>
              <th class="px-4 py-2.5 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest">Thời hiệu</th>
              <th class="px-4 py-2.5 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest text-center">Trạng thái</th>
              <th class="px-4 py-2.5 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border(--sys-border-subtle) uppercase tracking-widest text-right">Quản trị</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--sys-border-subtle)]">
            <tr v-for="(item, idx) in taskItems" :key="idx" class="group hover:bg-[var(--sys-bg-hover)] transition-colors">
              <td class="px-4 py-3 whitespace-nowrap bg-transparent">
                <div class="flex flex-col bg-transparent max-w-[200px]">
                  <span class="text-[13px] font-bold text-[var(--sys-text-primary)] truncate transition-colors group-hover:text-[var(--sys-brand-solid)]">{{ item.name }}</span>
                  <span class="text-[10px] font-bold text-[var(--sys-brand-solid)] opacity-60 uppercase tracking-tight transition-opacity group-hover:opacity-100">{{ item.role }}</span>
                </div>
              </td>
              <td class="px-4 py-3 whitespace-nowrap bg-transparent">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-[var(--sys-brand-solid)] opacity-40"></span>
                  <span class="text-[12px] font-semibold text-[var(--sys-text-primary)] truncate max-w-[250px]">{{ item.action }}</span>
                </div>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-[12px] font-bold text-[var(--sys-text-secondary)] bg-transparent uppercase tracking-tighter">{{ item.time }}</td>
              <td class="px-4 py-3 whitespace-nowrap bg-transparent text-center">
                <span :class="[
                  'px-2.5 py-0.5 rounded-md text-[10px] font-bold border inline-flex items-center gap-1.5 transition-all shadow-sm uppercase tracking-widest',
                  item.statusClass
                ]">
                  <span class="w-1.5 h-1.5 rounded-full animate-pulse" :class="item.dotClass"></span>
                  {{ item.status }}
                </span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-right bg-transparent">
                <button class="h-8 px-4 bg-[var(--sys-brand-solid)] text-white text-[11px] font-bold rounded-md shadow-sm hover:brightness-110 transition-all flex items-center gap-2 uppercase tracking-widest active:scale-95">
                  <span class="material-symbols-outlined text-[16px]">edit_square</span>
                  Xử lý ngay
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="px-4 py-2.5 bg-[var(--sys-bg-page)] border-t border-[var(--sys-border-subtle)] flex justify-end">
        <button class="text-[11px] font-bold text-[var(--sys-brand-solid)] hover:opacity-80 transition-opacity flex items-center gap-1 uppercase tracking-widest">
          Truy xuất toàn bộ danh mục đề xuất
          <span class="material-symbols-outlined text-[18px]">arrow_right_alt</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Dropdown from '@/components/Dropdown.vue';

const timeRange = ref('6months');
const timeRangeOptions = ref([
  { label: '06 tháng gần nhất', value: '6months' },
  { label: '01 năm tài chính', value: '1year' },
  { label: 'Toàn bộ lịch sử', value: 'all' }
]);

const stats = ref([]);
const departmentData = ref([]);
const taskItems = ref([]);

import { mockEmployees, mockDepartments, mockLeaveRequests } from '@/mock-data/index.js';

const fetchData = () => {
    try {
        const emps = mockEmployees;
        const depts = mockDepartments;
        const reqs = mockLeaveRequests;
        
        // 1. Compute stats
        const activeEmpsCount = emps.filter(e => e.status !== 'ĐÃ_THÔI_VIỆC').length;
        const pendingReqsCount = reqs.filter(r => r.status === 'CHỜ_DUYỆT').length;
        stats.value = [
            { label: 'TỔNG NHÂN SỰ', value: activeEmpsCount, change: '+12%', color: 'brand', icon: 'groups' },
            { label: 'YÊU CẦU DUYỆT', value: pendingReqsCount, change: 'MỚI', color: 'warning', icon: 'pending_actions' },
            { label: 'NHÂN SỰ MỚI', value: 8, change: '+2', color: 'success', icon: 'person_add' }, 
            { label: 'TỶ LỆ NGHỈ VIỆC', value: '2.4%', change: '-0.5%', color: 'danger', icon: 'trending_down' },
            { label: 'ĐI MUỘN HÔM NAY', value: '...', change: 'LIVE', color: 'danger', icon: 'schedule' }
        ];

        // 1b. Fetch live attendance for Admin dashboard
        const today = new Date().toISOString().split('T')[0];
        fetch('http://localhost:3000/attendances?attendanceDate=' + today)
          .then(res => res.json())
          .then(atts => {
              const lateCount = atts.filter(a => a.status === 'late' || a.status === 'ĐI_MUỘN').length;
              const lateStat = stats.value.find(s => s.label === 'ĐI MUỘN HÔM NAY');
              if (lateStat) lateStat.value = String(lateCount);
          })
          .catch(e => console.error('Admin Dashboard Attendances Fetch Error:', e));

        // 2. Compute Department Allocation
        const colors = ['bg-[var(--sys-brand-solid)]', 'bg-[var(--sys-success-solid)]', 'bg-[var(--sys-warning-solid)]', 'bg-[var(--sys-danger-solid)]', 'bg-purple-500'];
        const dptArr = mockDepartments;
        departmentData.value = dptArr.map((d, index) => {
            const count = emps.filter(e => (e.department?.departmentId || e.departmentId) === d.departmentId && e.status !== 'ĐÃ_NGHỈ_VIỆC').length;
            return {
                name: d.departmentName,
                count: count,
                percent: Math.round((count / (activeEmpsCount || 1)) * 100),
                color: colors[index % colors.length]
            };
        });

        // 3. Compute Task Items (from requests)
        taskItems.value = reqs.map(req => {
            const emp = emps.find(e => e.employeeId === (req.requesterId || req.employeeId)) || {};
            const deptId = emp.department?.departmentId || emp.departmentId;
            const dept = dptArr.find(d => d.departmentId === deptId);
            const leaveType = req.requestTypeId === 2 ? 'Nghỉ ốm' : (req.requestTypeId === 3 ? 'Nghỉ thai sản' : 'Nghỉ phép năm');
            return {
                name: emp.fullName || req.requesterName || 'N/A',
                role: emp.position?.positionName || 'Nhân viên',
                action: leaveType + (req.reason ? ` — ${req.reason.substring(0, 50)}` : ''),
                time: req.requestDate || new Date().toISOString().split('T')[0],
                status: req.status === 'CHỜ_DUYỆT' ? 'Chờ thẩm định' : 'Đã xử lý',
                statusClass: req.status === 'CHỜ_DUYỆT' 
                    ? 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]' 
                    : 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]',
                dotClass: req.status === 'CHỜ_DUYỆT' ? 'bg-[var(--sys-warning-solid)]' : 'bg-[var(--sys-success-solid)]'
            };
        }).sort((a,b) => new Date(b.time) - new Date(a.time)).slice(0, 10);
        
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu từ mock DB:', error);
    }
};

const getStatIconClass = (color) => {
  switch(color) {
    case 'brand': return 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)]';
    case 'success': return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
    case 'danger': return 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]';
    case 'warning': return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]';
    default: return 'bg-[var(--sys-bg-page)] text-[var(--sys-text-secondary)] border-[var(--sys-border-subtle)]';
  }
};

onMounted(() => {
  fetchData();
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
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--sys-brand-solid);
}
</style>
