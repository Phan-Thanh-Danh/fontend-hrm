<template>
  <div class="salary-wrapper min-h-screen bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] p-4 md:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto space-y-6 bg-transparent">
      
      <!-- Header Area -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left">
        <div class="bg-transparent text-left">
          <h1 class="text-xl font-semibold text-[var(--sys-text-primary)] mb-1">Thu nhập & Phiếu lương cá nhân</h1>
          <p class="text-sm text-[var(--sys-text-secondary)]">Theo dõi chi tiết thu nhập hàng tháng và các khoản trích đóng bảo hiểm.</p>
        </div>
        <div class="flex items-center gap-2 shrink-0 bg-transparent">
           <div class="px-3 py-1.5 bg-white rounded-md border border-[var(--sys-border-strong)] shadow-sm">
              <span class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide mr-2">Năm tài chính</span>
              <span class="text-[13px] font-bold text-[var(--sys-brand-solid)]">2023</span>
           </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-transparent">
        
        <!-- Left Column: Period List -->
        <div class="lg:col-span-4 space-y-4 bg-transparent">
          <div class="bg-[var(--sys-bg-surface)] p-6 rounded-lg border border-[var(--sys-border-subtle)] shadow-sm h-full flex flex-col min-h-[500px]">
            <h2 class="text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider mb-6 flex items-center gap-2">
              <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-[20px]">history</span>
              Danh sách kỳ lương
            </h2>
            
            <div class="flex flex-col gap-3 overflow-y-auto pr-1 custom-scrollbar flex-grow">
              <div 
                v-for="period in salaryPeriods" 
                :key="period.id"
                @click="selectedPeriodId = period.id"
                :class="[
                  'group p-4 rounded-md border transition-all cursor-pointer relative active:scale-[0.98]',
                  selectedPeriodId === period.id 
                    ? 'bg-[var(--sys-brand-soft)] border-[var(--sys-brand-border)] shadow-sm' 
                    : 'bg-white border-[var(--sys-border-strong)] hover:border-[var(--sys-brand-solid)]/30 hover:bg-[var(--sys-bg-page)]'
                ]"
              >
                <div v-if="selectedPeriodId === period.id" class="absolute left-0 top-0 bottom-0 w-1 bg-[var(--sys-brand-solid)] rounded-l-md"></div>
                
                <div class="flex justify-between items-start mb-3 bg-transparent">
                  <div class="bg-transparent text-left">
                    <h3 :class="['text-[13px] font-bold uppercase transition-colors', selectedPeriodId === period.id ? 'text-[var(--sys-brand-solid)]' : 'text-[var(--sys-text-primary)]']">Tháng {{ period.month }}/{{ period.year }}</h3>
                    <p class="text-[11px] text-[var(--sys-text-disabled)] font-medium m-0">Kỳ thanh toán: {{ period.payDate }}</p>
                  </div>
                  <span :class="['px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border', period.status === 'Đã thanh toán' ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]' : 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]']">
                    {{ period.status }}
                  </span>
                </div>

                <div class="flex justify-between items-end bg-transparent">
                  <div class="bg-transparent text-left">
                    <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide mb-0.5 opacity-60">Thực nhận (Net)</p>
                    <p :class="['text-lg font-bold transition-colors m-0', selectedPeriodId === period.id ? 'text-[var(--sys-brand-solid)]' : 'text-[var(--sys-text-primary)]']">
                      {{ formatCurrency(period.net) }}
                    </p>
                  </div>
                  <div :class="['w-8 h-8 rounded-md flex items-center justify-center transition-all', selectedPeriodId === period.id ? 'bg-[var(--sys-brand-solid)] text-white' : 'bg-[var(--sys-bg-page)] text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)]']">
                    <span class="material-symbols-outlined text-[18px]">{{ selectedPeriodId === period.id ? 'check' : 'chevron_right' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Detail View -->
        <div class="lg:col-span-8 bg-transparent">
          <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col h-full min-h-[600px]">
            
            <!-- Standardized Tabs -->
            <div class="px-6 py-4 border-b border-[var(--sys-border-subtle)] flex flex-wrap items-center justify-between gap-4 bg-[var(--sys-bg-page)]/50">
              <div class="flex items-center gap-1 bg-[var(--sys-bg-page)] p-1 rounded-md border border-[var(--sys-border-strong)] shadow-inner w-full md:w-auto">
                <button 
                  @click="activeTab = 'salary'" 
                  :class="[
                    'flex-1 md:flex-none px-6 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wide transition-all',
                    activeTab === 'salary' ? 'bg-white text-[var(--sys-brand-solid)] shadow-sm border border-[var(--sys-border-subtle)]' : 'text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] opacity-70'
                  ]"
                >
                  Phiếu lương
                </button>
                <button 
                  @click="activeTab = 'insurance'" 
                  :class="[
                    'flex-1 md:flex-none px-6 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wide transition-all',
                    activeTab === 'insurance' ? 'bg-white text-[var(--sys-brand-solid)] shadow-sm border border-[var(--sys-border-subtle)]' : 'text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] opacity-70'
                  ]"
                >
                  Bảo hiểm
                </button>
              </div>

              <div class="flex items-center gap-2 bg-transparent w-full md:w-auto justify-end" v-if="activeTab === 'salary'">
                <button class="w-9 h-9 bg-white text-[var(--sys-text-primary)] border border-[var(--sys-border-strong)] rounded-md hover:bg-[var(--sys-bg-page)] transition-all flex items-center justify-center shadow-sm">
                  <span class="material-symbols-outlined text-[18px]">mail</span>
                </button>
                <button class="h-9 px-4 bg-[var(--sys-brand-solid)] text-white rounded-md text-[11px] font-bold uppercase tracking-wide hover:brightness-95 transition-all flex items-center gap-2 shadow-sm">
                  <span class="material-symbols-outlined text-[18px]">download</span>
                  Tải PDF
                </button>
              </div>
            </div>

            <!-- SALARY TAB CONTENT -->
            <div v-if="activeTab === 'salary'" class="flex-1 flex flex-col bg-transparent overflow-y-auto custom-scrollbar">
              <div class="p-8 md:p-10 space-y-10 bg-transparent">
                
                <!-- Document Header -->
                <div class="flex flex-col md:flex-row justify-between items-start gap-6 pb-8 border-b border-[var(--sys-border-subtle)]">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center border border-[var(--sys-brand-border)]">
                      <span class="material-symbols-outlined text-[28px]">payments</span>
                    </div>
                    <div>
                      <h4 class="text-lg font-bold text-[var(--sys-text-primary)] uppercase tracking-tight mb-0.5">Chi tiết Phiếu lương</h4>
                      <p class="text-[11px] font-bold text-[var(--sys-brand-solid)] uppercase tracking-wider">Kỳ quyết toán: {{ currentPeriod.month }}/{{ currentPeriod.year }}</p>
                    </div>
                  </div>
                  
                  <div class="grid grid-cols-2 gap-x-6 gap-y-2 text-left bg-transparent w-full md:w-auto">
                    <div>
                      <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase opacity-60 mb-0.5">Nhân viên</p>
                      <p class="text-[13px] font-bold text-[var(--sys-text-primary)]">Nguyễn Văn An</p>
                    </div>
                    <div>
                      <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase opacity-60 mb-0.5">Mã số</p>
                      <p class="text-[13px] font-bold text-[var(--sys-text-primary)]">HR2023-0124</p>
                    </div>
                  </div>
                </div>

                <!-- Net Summary Banner -->
                <div class="bg-[var(--sys-brand-solid)] p-8 rounded-lg shadow-sm overflow-hidden relative group">
                  <div class="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl"></div>
                  <div class="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div class="text-center md:text-left">
                      <p class="text-[11px] font-bold text-white/80 uppercase tracking-widest mb-2">Thực lĩnh cuối cùng (NET)</p>
                      <h3 class="text-4xl font-bold text-white tracking-tight m-0">{{ formatCurrency(currentPeriod.net) }}</h3>
                    </div>
                    <div class="px-5 py-3 bg-white/20 rounded-md border border-white/20 text-center md:text-right backdrop-blur-sm">
                       <p class="text-[10px] font-bold text-white/60 uppercase tracking-wide mb-1">Trạng thái thanh toán</p>
                       <p class="text-[13px] font-bold text-white uppercase tracking-wider m-0 flex items-center justify-center md:justify-end gap-2">
                         <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                         {{ currentPeriod.status }}
                       </p>
                    </div>
                  </div>
                </div>

                <!-- Breakdown Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-10 bg-transparent">
                  <!-- Incomes -->
                  <div class="space-y-4">
                    <h5 class="text-[12px] font-bold text-[var(--sys-text-primary)] uppercase tracking-wider pb-3 border-b-2 border-[var(--sys-success-solid)] flex items-center gap-2">
                      Thu nhập (+)
                    </h5>
                    <div class="space-y-3">
                      <div v-for="inc in incomes" :key="inc.label" class="flex justify-between items-center group">
                        <span class="text-[13px] font-medium text-[var(--sys-text-secondary)] group-hover:text-[var(--sys-text-primary)] transition-colors">{{ inc.label }}</span>
                        <span class="text-[13px] font-bold text-[var(--sys-text-primary)]">{{ formatCurrency(inc.value) }}</span>
                      </div>
                      <div class="pt-4 mt-4 border-t border-[var(--sys-border-subtle)] flex justify-between items-center">
                        <span class="text-[12px] font-bold text-[var(--sys-text-primary)] uppercase">Tổng thu nhập</span>
                        <span class="text-base font-bold text-[var(--sys-success-text)]">{{ formatCurrency(totalIncome) }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Deductions -->
                  <div class="space-y-4">
                    <h5 class="text-[12px] font-bold text-[var(--sys-text-primary)] uppercase tracking-wider pb-3 border-b-2 border-[var(--sys-danger-solid)] flex items-center gap-2">
                      Khấu trừ (-)
                    </h5>
                    <div class="space-y-3">
                      <div v-for="ded in deductions" :key="ded.label" class="flex justify-between items-center group">
                        <span class="text-[13px] font-medium text-[var(--sys-text-secondary)] group-hover:text-[var(--sys-text-primary)] transition-colors">{{ ded.label }}</span>
                        <span class="text-[13px] font-bold text-[var(--sys-danger-text)]">-{{ formatCurrency(ded.value) }}</span>
                      </div>
                      <div class="pt-4 mt-4 border-t border-[var(--sys-border-subtle)] flex justify-between items-center">
                        <span class="text-[12px] font-bold text-[var(--sys-text-primary)] uppercase">Tổng khấu trừ</span>
                        <span class="text-base font-bold text-[var(--sys-danger-text)]">{{ formatCurrency(totalDeduction) }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Footer Disclaimer -->
                <div class="p-6 bg-[var(--sys-bg-page)] rounded-md border border-[var(--sys-border-subtle)] border-dashed">
                  <div class="flex gap-4 items-start">
                    <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-[24px]">verified_user</span>
                    <div class="bg-transparent text-left">
                      <p class="text-[11px] font-bold text-[var(--sys-text-primary)] uppercase tracking-wide mb-1.5">Thông tin xác thực hệ thống</p>
                      <p class="text-[12px] text-[var(--sys-text-secondary)] font-medium leading-relaxed m-0">
                        Chứng từ điện tử trích xuất từ FoxMobile HRM. Mọi thắc mắc về sai sót vui lòng phản hồi phòng <strong>C&B</strong> trước ngày {{ currentPeriod.feedbackDeadline }}.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <!-- INSURANCE TAB CONTENT -->
            <div v-if="activeTab === 'insurance'" class="flex-1 flex flex-col bg-transparent overflow-y-auto custom-scrollbar">
              <div class="p-8 md:p-10 space-y-10 bg-transparent">
                <div class="flex items-center gap-4 text-left">
                  <div class="w-12 h-12 rounded-md bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] flex items-center justify-center border border-[var(--sys-success-border)]">
                    <span class="material-symbols-outlined text-[28px]">health_and_safety</span>
                  </div>
                  <div>
                    <h4 class="text-lg font-bold text-[var(--sys-text-primary)] uppercase mb-0.5">Quá trình tham gia Bảo hiểm</h4>
                    <p class="text-[11px] font-bold text-[var(--sys-success-text)] uppercase tracking-wider">Trạng thái: Đang tham gia (Active)</p>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-transparent">
                   <div v-for="ins in insuranceStats" :key="ins.label" class="p-4 bg-white rounded-md border border-[var(--sys-border-strong)] shadow-sm group transition-all hover:border-[var(--sys-brand-solid)]">
                      <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide mb-2 opacity-60 group-hover:text-[var(--sys-brand-solid)] transition-colors">{{ ins.label }}</p>
                      <p class="text-[14px] font-bold text-[var(--sys-text-primary)] m-0 leading-tight">{{ ins.value }}</p>
                   </div>
                </div>

                <div class="bg-white rounded-md border border-[var(--sys-border-subtle)] overflow-hidden shadow-sm">
                   <div class="px-5 py-3 border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">
                      <h5 class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide m-0">Định mức trích đóng hiện tại</h5>
                   </div>
                   <div class="overflow-x-auto">
                      <table class="w-full text-left border-collapse">
                         <thead class="bg-[var(--sys-bg-page)]">
                            <tr>
                               <th class="px-5 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] uppercase border-b border-[var(--sys-border-subtle)]">Loại quỹ</th>
                               <th class="px-5 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] uppercase border-b border-[var(--sys-border-subtle)] text-center">NLĐ (%)</th>
                               <th class="px-5 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] uppercase border-b border-[var(--sys-border-subtle)] text-center">CTY (%)</th>
                               <th class="px-5 py-3 text-[12px] font-semibold text-[var(--sys-text-secondary)] uppercase border-b border-[var(--sys-border-subtle)] text-right">Mức đóng/Tháng</th>
                            </tr>
                         </thead>
                         <tbody class="divide-y divide-[var(--sys-border-subtle)]">
                            <tr v-for="row in insuranceRows" :key="row.label" class="group hover:bg-[var(--sys-bg-hover)] transition-colors">
                               <td class="px-5 py-4 text-[13px] font-bold text-[var(--sys-text-primary)] bg-transparent">{{ row.label }}</td>
                               <td class="px-5 py-4 text-[13px] font-bold text-[var(--sys-danger-text)] text-center bg-transparent">{{ row.employeeRate }}%</td>
                               <td class="px-5 py-4 text-[13px] font-bold text-[var(--sys-brand-solid)] text-center bg-transparent">{{ row.companyRate }}%</td>
                               <td class="px-5 py-4 text-[13px] font-bold text-[var(--sys-text-primary)] text-right bg-transparent">{{ formatCurrency(row.value) }}</td>
                            </tr>
                         </tbody>
                      </table>
                   </div>
                </div>

                <div class="p-6 bg-[var(--sys-info-soft)] rounded-md border border-[var(--sys-info-border)] flex items-start gap-4">
                   <div class="w-10 h-10 rounded-md bg-[var(--sys-info-solid)] text-white flex items-center justify-center shadow-md shrink-0">
                      <span class="material-symbols-outlined text-[20px]">info</span>
                   </div>
                   <div class="bg-transparent text-left">
                      <h4 class="text-[13px] font-bold text-[var(--sys-info-text)] mb-1 uppercase tracking-tight">Cổng thông tin Bảo hiểm xã hội</h4>
                      <p class="text-[12px] text-[var(--sys-info-text)] font-medium leading-relaxed m-0 opacity-90">
                        Số liệu được cập nhật tự động dựa trên mức lương đóng bảo hiểm đăng ký với cơ quan chức năng.
                      </p>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * TRANG PHIẾU LƯƠNG (PORTAL) - PHIÊN BẢN ENTERPRISE SaaS
 * Tuân thủ 7 Golden Rules:
 * - Font Inter 14px (text-sm), Tỉ lệ table cao (text-13px)
 * - Bo góc chuẩn B2B: 6px (MD) cho Input/Button, 8px (LG) cho Card/Thẻ
 * - Hệ màu Semantic đồng bộ, loại bỏ font-black/italic
 */
import { ref, computed } from 'vue';

const activeTab = ref('salary');
const selectedPeriodId = ref(1);

const salaryPeriods = ref([
  { id: 1, month: '10', year: '2023', payDate: '05/11/2023', status: 'Đã thanh toán', net: 25000000, feedbackDeadline: '08/11/2023' },
  { id: 2, month: '09', year: '2023', payDate: '05/10/2023', status: 'Đã thanh toán', net: 24500000, feedbackDeadline: '08/10/2023' },
  { id: 3, month: '08', year: '2023', payDate: '05/09/2023', status: 'Đã thanh toán', net: 26200000, feedbackDeadline: '08/09/2023' },
]);

const currentPeriod = computed(() => {
  return salaryPeriods.value.find(p => p.id === selectedPeriodId.value) || salaryPeriods.value[0];
});

const incomes = ref([
  { label: 'Lương cơ bản (Gross)', value: 28000000 },
  { label: 'Lương làm thêm giờ (OT)', value: 1500000 },
  { label: 'Phụ cấp ăn trưa', value: 730000 },
  { label: 'Thưởng hiệu suất', value: 1000000 },
]);

const totalIncome = computed(() => incomes.value.reduce((sum, item) => sum + item.value, 0));

const deductions = ref([
  { label: 'BHXH (8%)', value: 2240000 },
  { label: 'BHYT (1.5%)', value: 420000 },
  { label: 'BHTN (1%)', value: 280000 },
  { label: 'Thuế TNCN tạm tính', value: 3290000 },
]);

const totalDeduction = computed(() => deductions.value.reduce((sum, item) => sum + item.value, 0));

const insuranceStats = ref([
  { label: 'Số sổ BHXH', value: 'BH2023-0987654' },
  { label: 'Nơi KCB Ban đầu', value: 'BV Đa khoa Xanh Pôn' },
  { label: 'Tổng quá trình', value: '08 Năm 04 Tháng' },
]);

const insuranceRows = ref([
  { label: 'BH Xã hội', employeeRate: 8, companyRate: 17.5, value: 2240000 },
  { label: 'BH Y tế', employeeRate: 1.5, companyRate: 3, value: 420000 },
  { label: 'BH Thất nghiệp', employeeRate: 1, companyRate: 1, value: 280000 },
]);

const formatCurrency = (val) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
};
</script>

<style scoped>
.salary-wrapper {
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
</style>
