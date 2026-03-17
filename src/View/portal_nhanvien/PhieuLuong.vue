<template>
  <div class="min-h-screen bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] p-4 md:p-6 lg:p-10 font-sans">
    <div class="max-w-7xl mx-auto space-y-8 bg-transparent">
      
      <!-- Header Section -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent mb-2">
        <div class="bg-transparent text-left">
          <h1 class="text-3xl font-black text-[var(--sys-text-primary)] tracking-tight uppercase mb-1 italic">Thu nhập cá nhân</h1>
          <p class="text-[10px] text-[var(--sys-text-secondary)] font-black uppercase tracking-[0.2em] italic opacity-60">Theo dõi chi tiết lương, phụ cấp và các khoản trích đóng bảo hiểm</p>
        </div>
        <div class="flex items-center gap-3 bg-transparent">
           <div class="px-4 py-2 bg-[var(--sys-bg-surface)] rounded-xl border border-[var(--sys-border-subtle)] shadow-sm">
              <span class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.1em] mr-2 italic">Năm tài chính</span>
              <span class="text-xs font-black text-[var(--sys-brand-solid)]">2023</span>
           </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-transparent">
        
        <!-- Left Column: Lịch sử kỳ lương -->
        <div class="lg:col-span-4 space-y-6 bg-transparent">
          <div class="bg-[var(--sys-bg-surface)] p-8 rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm h-full flex flex-col">
            <h2 class="text-xs font-black text-[var(--sys-text-primary)] uppercase tracking-[0.2em] mb-8 flex items-center gap-3 italic">
              <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-xl">history</span>
              Lịch sử kỳ lương
            </h2>
            
            <div class="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar flex-grow" style="max-height: 600px;">
              <div 
                v-for="period in salaryPeriods" 
                :key="period.id"
                @click="selectedPeriodId = period.id"
                :class="[
                  'group p-6 rounded-[2rem] border transition-all cursor-pointer relative overflow-hidden active:scale-[0.98]',
                  selectedPeriodId === period.id 
                    ? 'bg-[var(--sys-brand-soft)] border-[var(--sys-brand-border)] shadow-xl shadow-[var(--sys-brand-solid-lch-30)]/10' 
                    : 'bg-[var(--sys-bg-page)] border-[var(--sys-border-subtle)] hover:border-[var(--sys-brand-solid)]/30 hover:bg-[var(--sys-bg-surface)]'
                ]"
              >
                <div v-if="selectedPeriodId === period.id" class="absolute left-0 top-0 bottom-0 w-1.5 bg-[var(--sys-brand-solid)]"></div>
                
                <div class="flex justify-between items-start mb-4 bg-transparent">
                  <div class="bg-transparent text-left">
                    <h3 :class="['text-sm font-black uppercase tracking-tight mb-1 transition-colors', selectedPeriodId === period.id ? 'text-[var(--sys-brand-solid)]' : 'text-[var(--sys-text-primary)]']">Tháng {{ period.month }}/{{ period.year }}</h3>
                    <p class="text-[10px] text-[var(--sys-text-secondary)] font-bold italic opacity-60 m-0">Thanh toán: {{ period.payDate }}</p>
                  </div>
                  <span :class="['px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border', period.status === 'Đã thanh toán' ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]' : 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]']">
                    {{ period.status }}
                  </span>
                </div>

                <div class="flex justify-between items-end bg-transparent">
                  <div class="bg-transparent text-left">
                    <p class="text-[9px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.1em] mb-1 italic opacity-60">Thực nhận (Net)</p>
                    <p :class="['text-xl font-black tracking-tighter m-0 transition-colors', selectedPeriodId === period.id ? 'text-[var(--sys-brand-solid)]' : 'text-[var(--sys-text-primary)]']">
                      {{ formatCurrency(period.net) }}
                    </p>
                  </div>
                  <div :class="['w-10 h-10 rounded-xl flex items-center justify-center transition-all', selectedPeriodId === period.id ? 'bg-[var(--sys-brand-solid)] text-white shadow-lg' : 'bg-[var(--sys-bg-surface)] text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)] group-hover:bg-[var(--sys-brand-soft)] group-hover:text-[var(--sys-brand-solid)]']">
                    <span class="material-symbols-outlined text-lg">{{ selectedPeriodId === period.id ? 'check' : 'chevron_right' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Chi tiết Phiếu lương -->
        <div class="lg:col-span-8 bg-transparent">
          <div class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col h-full min-h-[700px]">
            
            <!-- Tabs Segmented Control -->
            <div class="px-8 py-6 border-b border-[var(--sys-border-subtle)] flex flex-wrap items-center justify-between gap-4 bg-[var(--sys-bg-page)]/20">
              <div class="flex items-center gap-1 bg-[var(--sys-bg-hover)] p-1.5 rounded-[2rem] border border-[var(--sys-border-subtle)] shadow-inner">
                <button 
                  @click="activeTab = 'salary'" 
                  :class="[
                    'px-8 py-2.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all italic',
                    activeTab === 'salary' ? 'bg-[var(--sys-bg-surface)] text-[var(--sys-brand-solid)] shadow-lg scale-100' : 'text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] scale-95 opacity-70'
                  ]"
                >
                  Phiếu lương
                </button>
                <button 
                  @click="activeTab = 'insurance'" 
                  :class="[
                    'px-8 py-2.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all italic',
                    activeTab === 'insurance' ? 'bg-[var(--sys-bg-surface)] text-[var(--sys-brand-solid)] shadow-lg scale-100' : 'text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] scale-95 opacity-70'
                  ]"
                >
                  Bảo hiểm
                </button>
              </div>

              <div class="flex items-center gap-2 bg-transparent" v-if="activeTab === 'salary'">
                <button class="p-3 bg-[var(--sys-bg-page)] text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)] rounded-xl hover:bg-[var(--sys-bg-hover)] hover:text-[var(--sys-brand-solid)] transition-all active:scale-95 shadow-sm" title="Gửi qua Email">
                  <span class="material-symbols-outlined text-xl">mail</span>
                </button>
                <button class="px-6 py-3 bg-[var(--sys-brand-solid)] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--sys-brand-hover)] transition-all active:scale-95 shadow-xl shadow-[var(--sys-brand-solid-lch-30)] flex items-center gap-2">
                  <span class="material-symbols-outlined text-lg">download</span>
                  Tải PDF
                </button>
              </div>
            </div>

            <!-- SALARY TAB CONTENT -->
            <div v-if="activeTab === 'salary'" class="flex-1 flex flex-col bg-transparent">
              <div class="p-10 md:p-12 space-y-12 bg-transparent overflow-y-auto">
                
                <!-- Document Header -->
                <div class="flex flex-col md:flex-row justify-between items-start gap-8 pb-10 border-b border-[var(--sys-border-subtle)] bg-transparent">
                  <div class="bg-transparent text-left">
                    <div class="flex items-center gap-4 mb-4 bg-transparent text-left">
                      <div class="w-14 h-14 rounded-2xl bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center border border-[var(--sys-brand-border)] shadow-inner">
                        <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">payments</span>
                      </div>
                      <div class="bg-transparent text-left">
                        <h4 class="text-xl font-black text-[var(--sys-text-primary)] uppercase tracking-tight mb-1 italic text-left">Phiếu lương chi tiết</h4>
                        <p class="text-xs font-black text-[var(--sys-brand-solid)] uppercase tracking-[0.2em] italic bg-transparent text-left">Kỳ lương tháng {{ currentPeriod.month }}/{{ currentPeriod.year }}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="grid grid-cols-2 gap-x-8 gap-y-4 text-left bg-transparent">
                    <div class="bg-transparent text-left">
                      <p class="text-[9px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1 italic opacity-60">Nhân viên</p>
                      <p class="text-sm font-black text-[var(--sys-text-primary)] italic bg-transparent">Nguyễn Văn An</p>
                    </div>
                    <div class="bg-transparent text-left">
                      <p class="text-[9px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1 italic opacity-60">Mã nhân viên</p>
                      <p class="text-sm font-black text-[var(--sys-text-primary)] italic bg-transparent">HR2023-0124</p>
                    </div>
                    <div class="bg-transparent text-left">
                      <p class="text-[9px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1 italic opacity-60">Phòng ban</p>
                      <p class="text-sm font-black text-[var(--sys-text-primary)] italic bg-transparent">Creative Studio</p>
                    </div>
                    <div class="bg-transparent text-left">
                      <p class="text-[9px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1 italic opacity-60">Ngày thanh toán</p>
                      <p class="text-sm font-black text-[var(--sys-text-primary)] italic bg-transparent">{{ currentPeriod.payDate }}</p>
                    </div>
                  </div>
                </div>

                <!-- Summary Banner -->
                <div class="relative bg-gradient-to-br from-[var(--sys-brand-solid)] to-[var(--sys-brand-hover)] p-10 rounded-[2.5rem] shadow-2xl shadow-[var(--sys-brand-solid-lch-30)]/40 overflow-hidden group">
                  <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                  <div class="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 bg-transparent">
                    <div class="bg-transparent text-center md:text-left">
                      <p class="text-[10px] font-black text-white/70 uppercase tracking-[0.3em] mb-3 italic">Tổng thực nhận (Net Salary)</p>
                      <h3 class="text-5xl font-black text-white tracking-tighter m-0">{{ formatCurrency(currentPeriod.net) }}</h3>
                    </div>
                    <div class="px-8 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center md:text-right">
                       <p class="text-[9px] font-black text-white/50 uppercase tracking-widest mb-1 italic">Trạng thái phiếu lương</p>
                       <p class="text-sm font-black text-white italic uppercase tracking-widest m-0 flex items-center justify-center md:justify-end gap-2">
                         <span class="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white] animate-pulse"></span>
                         {{ currentPeriod.status }}
                       </p>
                    </div>
                  </div>
                </div>

                <!-- Detailed Breakdown -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12 bg-transparent">
                  
                  <!-- Incomes Section -->
                  <div class="space-y-6 bg-transparent">
                    <h5 class="text-xs font-black text-[var(--sys-text-primary)] uppercase tracking-widest pb-4 border-b-2 border-[var(--sys-success-solid)] flex items-center gap-3 italic text-left">
                      <span class="w-2 h-6 bg-[var(--sys-success-solid)] rounded-full"></span>
                      Các khoản Thu nhập (+)
                    </h5>
                    <div class="space-y-4 bg-transparent text-left">
                      <div v-for="inc in incomes" :key="inc.label" class="flex justify-between items-center bg-transparent group/row">
                        <span class="text-xs font-bold text-[var(--sys-text-secondary)] group-hover/row:text-[var(--sys-text-primary)] transition-colors italic">{{ inc.label }}</span>
                        <span class="text-sm font-black text-[var(--sys-text-primary)]">{{ formatCurrency(inc.value) }}</span>
                      </div>
                      <div class="pt-6 mt-6 border-t border-[var(--sys-border-subtle)] flex justify-between items-center bg-transparent">
                        <span class="text-xs font-black text-[var(--sys-text-primary)] uppercase tracking-widest italic">Tổng thu nhập</span>
                        <span class="text-base font-black text-[var(--sys-success-text)]">{{ formatCurrency(totalIncome) }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Deductions Section -->
                  <div class="space-y-6 bg-transparent text-left">
                    <h5 class="text-xs font-black text-[var(--sys-text-primary)] uppercase tracking-widest pb-4 border-b-2 border-[var(--sys-danger-solid)] flex items-center gap-3 italic text-left">
                      <span class="w-2 h-6 bg-[var(--sys-danger-solid)] rounded-full"></span>
                      Các khoản Khấu trừ (-)
                    </h5>
                    <div class="space-y-4 bg-transparent text-left">
                      <div v-for="ded in deductions" :key="ded.label" class="flex justify-between items-center bg-transparent group/row">
                        <span class="text-xs font-bold text-[var(--sys-text-secondary)] group-hover/row:text-[var(--sys-text-primary)] transition-colors italic">{{ ded.label }}</span>
                        <span class="text-sm font-black text-[var(--sys-danger-text)]">-{{ formatCurrency(ded.value) }}</span>
                      </div>
                      <div class="pt-6 mt-6 border-t border-[var(--sys-border-subtle)] flex justify-between items-center bg-transparent">
                        <span class="text-xs font-black text-[var(--sys-text-primary)] uppercase tracking-widest italic">Tổng khấu trừ</span>
                        <span class="text-base font-black text-[var(--sys-danger-text)]">{{ formatCurrency(totalDeduction) }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Footer Note -->
                <div class="p-8 bg-[var(--sys-bg-page)] rounded-[2rem] border border-[var(--sys-border-subtle)] border-dashed relative overflow-hidden group">
                  <span class="material-symbols-outlined absolute -top-4 -right-4 text-[var(--sys-text-secondary)] text-8xl opacity-5 rotate-12 group-hover:opacity-10 transition-opacity">info</span>
                  <div class="relative z-10 flex gap-5 items-start bg-transparent text-left">
                    <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-3xl font-normal">verified_user</span>
                    <div class="bg-transparent text-left">
                      <p class="text-[10px] font-black text-[var(--sys-text-primary)] uppercase tracking-widest mb-1.5 italic text-left">Xác nhận từ hệ thống</p>
                      <p class="text-xs text-[var(--sys-text-secondary)] font-bold italic leading-relaxed m-0 text-left">
                        Đây là chứng từ điện tử hợp lệ được xuất từ hệ thống quản trị nhân sự tập trung. Nếu phát hiện sai sót về số liệu hoặc các khoản phụ cấp, vui lòng gửi phản hồi về phòng <strong>C&B (Compensation & Benefits)</strong> trước ngày {{ currentPeriod.feedbackDeadline }}.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <!-- INSURANCE TAB CONTENT -->
            <div v-if="activeTab === 'insurance'" class="flex-1 flex flex-col bg-transparent overflow-y-auto">
              <div class="p-10 md:p-12 space-y-12 bg-transparent">
                <div class="flex items-center gap-4 bg-transparent mb-4 text-left">
                  <div class="w-14 h-14 rounded-2xl bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] flex items-center justify-center border border-[var(--sys-success-border)] shadow-inner">
                    <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">health_and_safety</span>
                  </div>
                  <div class="bg-transparent text-left">
                    <h4 class="text-xl font-black text-[var(--sys-text-primary)] uppercase tracking-tight mb-1 italic text-left">Thông tin Bảo hiểm</h4>
                    <p class="text-xs font-black text-[var(--sys-success-text)] uppercase tracking-[0.2em] italic bg-transparent text-left">Trạng thái: Đang tham gia (Active)</p>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 bg-transparent">
                   <div v-for="ins in insuranceStats" :key="ins.label" class="p-6 bg-[var(--sys-bg-surface)] rounded-3xl border border-[var(--sys-border-subtle)] shadow-sm hover:border-[var(--sys-brand-solid)] transition-all group bg-transparent">
                      <p class="text-[9px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-3 italic opacity-60 group-hover:text-[var(--sys-brand-solid)] transition-colors text-left">{{ ins.label }}</p>
                      <p class="text-lg font-black text-[var(--sys-text-primary)] tracking-tight italic m-0 text-left">{{ ins.value }}</p>
                   </div>
                </div>

                <div class="bg-[var(--sys-bg-page)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] overflow-hidden">
                   <div class="px-10 py-6 border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">
                      <h5 class="text-[10px] font-black text-[var(--sys-text-primary)] uppercase tracking-[0.2em] m-0 italic text-left">Biên độ đóng bảo hiểm hiện tại</h5>
                   </div>
                   <div class="p-0">
                      <table class="w-full text-left border-separate border-spacing-0">
                         <thead>
                            <tr>
                               <th class="px-10 py-4 text-[9px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest border-b border-[var(--sys-border-subtle)]">Loại bảo hiểm</th>
                               <th class="px-10 py-4 text-[9px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest border-b border-[var(--sys-border-subtle)] text-center">Tỷ lệ NLĐ (%)</th>
                               <th class="px-10 py-4 text-[9px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest border-b border-[var(--sys-border-subtle)] text-center">Tỷ lệ CTY (%)</th>
                               <th class="px-10 py-4 text-[9px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest border-b border-[var(--sys-border-subtle)] text-right">Chi trả/Tháng</th>
                            </tr>
                         </thead>
                         <tbody>
                            <tr v-for="row in insuranceRows" :key="row.label" class="group hover:bg-[var(--sys-bg-hover)] transition-all">
                               <td class="px-10 py-6 text-xs font-black text-[var(--sys-text-primary)] italic bg-transparent border-b border-[var(--sys-border-subtle)]">{{ row.label }}</td>
                               <td class="px-10 py-6 text-sm font-black text-[var(--sys-danger-text)] text-center bg-transparent border-b border-[var(--sys-border-subtle)]">{{ row.employeeRate }}%</td>
                               <td class="px-10 py-6 text-sm font-black text-[var(--sys-brand-solid)] text-center bg-transparent border-b border-[var(--sys-border-subtle)]">{{ row.companyRate }}%</td>
                               <td class="px-10 py-6 text-sm font-black text-[var(--sys-text-primary)] text-right bg-transparent border-b border-[var(--sys-border-subtle)]">{{ formatCurrency(row.value) }}</td>
                            </tr>
                         </tbody>
                      </table>
                   </div>
                </div>

                <div class="p-8 bg-[var(--sys-info-soft)] rounded-[2rem] border border-[var(--sys-info-border)] flex items-start gap-6 bg-transparent text-left">
                   <div class="w-12 h-12 rounded-2xl bg-[var(--sys-info-solid)] text-white flex items-center justify-center shadow-lg shadow-[var(--sys-info-solid-lch-30)] shrink-0">
                      <span class="material-symbols-outlined text-2xl font-normal">account_balance_wallet</span>
                   </div>
                   <div class="bg-transparent text-left">
                      <h4 class="text-sm font-black text-[var(--sys-info-text)] mb-1 uppercase tracking-tight italic bg-transparent text-left">Quỹ bảo hiểm & Phúc lợi</h4>
                      <p class="text-xs text-[var(--sys-info-text)] font-medium leading-relaxed italic bg-transparent m-0 text-left">
                        Dữ liệu bảo hiểm được trích xuất trực tiếp từ cổng thông tin BHXH Việt Nam. Số tiền NLĐ trích đóng đã được khấu trừ trực tiếp vào phiếu lương hàng tháng của bạn.
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
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--sys-border-subtle);
  border-radius: 10px;
}

.material-symbols-outlined {
  font-variation-settings: 'opsz' 48, 'wght' 400, 'FILL' 0, 'GRAD' 0;
}
</style>
