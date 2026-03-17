<template>
  <div class="min-h-screen bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] p-4 md:p-6 lg:p-8 font-sans">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-7xl mx-auto">
      
      <!-- Left Column: Lịch sử kỳ lương -->
      <div class="lg:col-span-4 flex flex-col gap-4">
        <div class="flex justify-between items-center px-1">
          <h2 class="text-base font-bold text-[var(--sys-text-primary)] m-0">Lịch sử kỳ lương</h2>
          <span class="text-xs text-[var(--sys-text-secondary)] font-medium">Năm 2023</span>
        </div>
        
        <div class="flex flex-col gap-3 overflow-y-auto pr-2" style="max-height: calc(100vh - 120px);">
          
          <!-- Thẻ Active (Current) -->
          <div class="bg-[var(--sys-bg-surface)] rounded-4 shadow-sm border-2 border-[var(--sys-brand-solid)] relative overflow-hidden cursor-pointer group">
            <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-[var(--sys-brand-solid)]"></div>
            <div class="p-5 pl-6 flex flex-col gap-3">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-sm font-bold text-[var(--sys-text-primary)] uppercase tracking-tight mb-0.5">Tháng 10/2023</h3>
                  <p class="text-xs text-[var(--sys-text-secondary)] mb-0">Thanh toán ngày 05/11</p>
                </div>
                <span class="bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] rounded-full px-3 py-1 font-bold border border-[var(--sys-success-border)] text-[10px] uppercase tracking-wider">Đã thanh toán</span>
              </div>
              <div class="flex justify-between items-end mt-1">
                <div>
                  <p class="text-xs text-[var(--sys-text-secondary)] mb-0.5">Thực nhận (Net)</p>
                  <p class="text-xl font-black text-[var(--sys-brand-solid)] tracking-tight m-0">25.000.000đ</p>
                </div>
                <button class="w-8 h-8 rounded-lg bg-[var(--sys-brand-soft)] text-[var(--sys-brand-soft-text)] flex items-center justify-center transition-colors group-hover:bg-[var(--sys-brand-solid)] group-hover:text-white">
                  <span class="material-symbols-outlined text-base">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Thẻ Inactive (Tháng 09) -->
          <div class="bg-[var(--sys-bg-surface)] rounded-4 shadow-sm border border-[var(--sys-border-subtle)] hover:border-[var(--sys-brand-solid)] transition-all cursor-pointer group">
            <div class="p-5 flex flex-col gap-3">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-sm font-bold text-[var(--sys-text-secondary)] uppercase tracking-tight mb-0.5 group-hover:text-[var(--sys-text-primary)] transition-colors">Tháng 09/2023</h3>
                  <p class="text-xs text-[var(--sys-text-secondary)]/70 mb-0">Thanh toán ngày 05/10</p>
                </div>
                <span class="bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] rounded-full px-3 py-1 font-bold border border-[var(--sys-success-border)] text-[10px] uppercase tracking-wider">Đã thanh toán</span>
              </div>
              <div class="flex justify-between items-end mt-1">
                <div>
                  <p class="text-xs text-[var(--sys-text-secondary)]/70 mb-0.5">Thực nhận (Net)</p>
                  <p class="text-xl font-bold text-[var(--sys-text-secondary)]/80 tracking-tight m-0 group-hover:text-[var(--sys-brand-solid)] transition-colors">24.500.000đ</p>
                </div>
                <button class="w-8 h-8 rounded-lg bg-[var(--sys-bg-page)] text-[var(--sys-text-secondary)] flex items-center justify-center transition-colors group-hover:bg-[var(--sys-brand-soft)] group-hover:text-[var(--sys-brand-soft-text)]">
                  <span class="material-symbols-outlined text-base">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Thẻ Inactive (Tháng 08) -->
          <div class="bg-[var(--sys-bg-surface)] rounded-4 shadow-sm border border-[var(--sys-border-subtle)] hover:border-[var(--sys-brand-solid)] transition-all cursor-pointer group">
            <div class="p-5 flex flex-col gap-3">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-sm font-bold text-[var(--sys-text-secondary)] uppercase tracking-tight mb-0.5 group-hover:text-[var(--sys-text-primary)] transition-colors">Tháng 08/2023</h3>
                  <p class="text-xs text-[var(--sys-text-secondary)]/70 mb-0">Thanh toán ngày 05/09</p>
                </div>
                <span class="bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] rounded-full px-3 py-1 font-bold border border-[var(--sys-success-border)] text-[10px] uppercase tracking-wider">Đã thanh toán</span>
              </div>
              <div class="flex justify-between items-end mt-1">
                <div>
                  <p class="text-xs text-[var(--sys-text-secondary)]/70 mb-0.5">Thực nhận (Net)</p>
                  <p class="text-xl font-bold text-[var(--sys-text-secondary)]/80 tracking-tight m-0 group-hover:text-[var(--sys-brand-solid)] transition-colors">26.200.000đ</p>
                </div>
                <button class="w-8 h-8 rounded-lg bg-[var(--sys-bg-page)] text-[var(--sys-text-secondary)] flex items-center justify-center transition-colors group-hover:bg-[var(--sys-brand-soft)] group-hover:text-[var(--sys-brand-soft-text)]">
                  <span class="material-symbols-outlined text-base">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Right Column: Chi tiết Phiếu lương -->
      <div class="lg:col-span-8">
        <div class="bg-[var(--sys-bg-surface)] rounded-4 shadow-sm border border-[var(--sys-border-subtle)] overflow-hidden flex flex-col h-full min-h-[600px]">
          
          <!-- Tabs Segmented Control -->
          <div class="bg-[var(--sys-bg-page)]/80 px-5 pt-4 pb-3 border-b border-[var(--sys-border-subtle)] flex gap-2">
            <div class="inline-flex bg-[var(--sys-border-subtle)]/30 p-1 rounded-xl">
              <button 
                @click="activeTab = 'salary'" 
                :class="activeTab === 'salary' ? 'bg-[var(--sys-bg-surface)] text-[var(--sys-brand-solid)] shadow-sm' : 'text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] hover:bg-[var(--sys-bg-hover)]'"
                class="px-6 py-2 rounded-lg text-sm font-semibold transition-all">
                Phiếu lương
              </button>
              <button 
                @click="activeTab = 'insurance'" 
                :class="activeTab === 'insurance' ? 'bg-[var(--sys-bg-surface)] text-[var(--sys-brand-solid)] shadow-sm' : 'text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] hover:bg-[var(--sys-bg-hover)]'"
                class="px-6 py-2 rounded-lg text-sm font-semibold transition-all">
                Bảo hiểm
              </button>
            </div>
          </div>

          <!-- SALARY TAB CONTENT -->
          <div v-show="activeTab === 'salary'" class="flex-1 flex flex-col bg-[var(--sys-bg-surface)]">
            <!-- Header -->
            <div class="p-5 md:px-8 border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-4 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center shrink-0 border border-[var(--sys-brand-subtle)]">
                  <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">picture_as_pdf</span>
                </div>
                <div>
                  <h4 class="text-lg font-bold text-[var(--sys-text-primary)] mb-0.5 uppercase tracking-tight">Chi tiết Phiếu lương</h4>
                  <p class="text-xs text-[var(--sys-text-secondary)] mb-0">Kỳ lương tháng 10 năm 2023</p>
                </div>
              </div>
              <button class="w-full sm:w-auto bg-[var(--sys-brand-solid)] hover:bg-[var(--sys-brand-hover)] text-white font-bold text-sm px-5 py-2.5 rounded-4 flex justify-center items-center gap-2 shadow-sm transition-all active:scale-95">
                <span class="material-symbols-outlined text-lg">download</span>
                Tải PDF
              </button>
            </div>

            <!-- Body -->
            <div class="p-5 md:px-8 pb-8 flex-1">
              <div class="max-w-3xl mx-auto space-y-8 mt-2">
                
                <!-- Info Row -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-[var(--sys-border-subtle)]">
                  <div>
                    <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2">NHÂN VIÊN</p>
                    <p class="font-bold text-[var(--sys-text-primary)] mb-1">Nguyễn Văn A</p>
                    <p class="text-sm text-[var(--sys-text-secondary)] mb-1">Mã NV: HR2023-0124</p>
                    <p class="text-sm text-[var(--sys-text-secondary)] mb-0">Phòng ban: Creative Studio</p>
                  </div>
                  <div class="sm:text-right">
                    <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2">KỲ THANH TOÁN</p>
                    <p class="font-bold text-[var(--sys-text-primary)] mb-1">01/10/2023 - 31/10/2023</p>
                    <p class="text-sm text-[var(--sys-text-secondary)] mb-1">Ngày chi trả: 05/11/2023</p>
                    <p class="text-sm text-[var(--sys-text-secondary)] mb-0">Số tài khoản: **** **** 1234 (Techcombank)</p>
                  </div>
                </div>

                <!-- Net Value -->
                <div class="bg-[var(--sys-brand-soft)] border border-[var(--sys-brand-subtle)] rounded-4 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h5 class="text-[11px] font-bold text-[var(--sys-brand-solid)] uppercase tracking-widest mb-2">THỰC NHẬN CUỐI CÙNG (NET)</h5>
                    <p class="text-4xl font-black text-[var(--sys-brand-solid)] tracking-tight m-0">25.000.000đ</p>
                  </div>
                  <div class="sm:text-right mt-2 sm:mt-0">
                    <p class="text-sm text-[var(--sys-brand-soft-text)] italic m-0 font-medium">"Hai mươi lăm triệu đồng chẵn"</p>
                  </div>
                </div>

                <!-- Details Table Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  <!-- Incomes -->
                  <div class="flex flex-col gap-4">
                    <h6 class="font-bold text-[var(--sys-text-primary)] pb-3 border-b border-[var(--sys-border-subtle)] flex items-center gap-2 m-0 text-base">
                      <span class="material-symbols-outlined text-[var(--sys-success-text)] text-xl" style="font-variation-settings: 'FILL' 1;">add_circle</span>
                      Các khoản thu nhập
                    </h6>
                    <div class="flex flex-col gap-3">
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-[var(--sys-text-secondary)] font-medium">Lương cơ bản (Gross)</span>
                        <span class="text-sm font-bold text-[var(--sys-text-primary)]">28.000.000đ</span>
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-[var(--sys-text-secondary)] font-medium">Lương làm thêm giờ (OT)</span>
                        <span class="text-sm font-bold text-[var(--sys-success-text)]">1.500.000đ</span>
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-[var(--sys-text-secondary)] font-medium">Phụ cấp ăn trưa</span>
                        <span class="text-sm font-bold text-[var(--sys-text-primary)]">730.000đ</span>
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-[var(--sys-text-secondary)] font-medium">Thưởng hiệu suất</span>
                        <span class="text-sm font-bold text-[var(--sys-text-primary)]">1.000.000đ</span>
                      </div>
                      <div class="flex justify-between items-center pt-3 mt-1 border-t border-[var(--sys-border-subtle)]">
                        <span class="text-sm font-bold text-[var(--sys-text-primary)]">Tổng thu nhập</span>
                        <span class="text-sm font-bold text-[var(--sys-text-primary)]">31.230.000đ</span>
                      </div>
                    </div>
                  </div>

                  <!-- Deductions (Refactor to Semantic Danger) -->
                  <div class="flex flex-col gap-4">
                    <h6 class="font-bold text-[var(--sys-text-primary)] pb-3 border-b border-[var(--sys-border-subtle)] flex items-center gap-2 m-0 text-base">
                      <span class="material-symbols-outlined text-[var(--sys-danger-text)] text-xl" style="font-variation-settings: 'FILL' 1;">remove_circle</span>
                      Các khoản khấu trừ
                    </h6>
                    <div class="flex flex-col gap-3 h-full">
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-[var(--sys-text-secondary)] font-medium">BHXH (8%)</span>
                        <span class="text-sm font-bold text-[var(--sys-danger-text)]">-2.240.000đ</span>
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-[var(--sys-text-secondary)] font-medium">BHYT (1.5%)</span>
                        <span class="text-sm font-bold text-[var(--sys-danger-text)]">-420.000đ</span>
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-[var(--sys-text-secondary)] font-medium">BHTN (1%)</span>
                        <span class="text-sm font-bold text-[var(--sys-danger-text)]">-280.000đ</span>
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-[var(--sys-text-secondary)] font-medium">Thuế TNCN tạm tính</span>
                        <span class="text-sm font-bold text-[var(--sys-danger-text)]">-3.290.000đ</span>
                      </div>
                      <div class="flex justify-between items-end pt-3 mt-1 border-t border-[var(--sys-border-subtle)] flex-1">
                        <span class="text-sm font-bold text-[var(--sys-text-primary)]">Tổng khấu trừ</span>
                        <span class="text-sm font-bold text-[var(--sys-text-primary)]">-6.230.000đ</span>
                      </div>
                    </div>
                  </div>

                </div>

                <!-- Note Box (Refactor to Semantic Info) -->
                <div class="p-4 rounded-4 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] mt-2">
                  <p class="text-xs text-[var(--sys-text-secondary)] m-0 leading-relaxed font-medium">
                    <strong class="text-[var(--sys-text-primary)]">Ghi chú:</strong> Đây là phiếu lương được tạo tự động bởi hệ thống HRM. Mọi thắc mắc về các khoản tính toán xin vui lòng liên hệ Bộ phận Nhân sự (HR) trong vòng 03 ngày làm việc kể từ ngày nhận được phiếu lương.
                  </p>
                </div>

              </div>
            </div>
          </div> <!-- Close v-show salary -->

          <!-- INSURANCE TAB CONTENT -->
          <div v-show="activeTab === 'insurance'" class="flex-1 flex flex-col bg-[var(--sys-bg-surface)]">
            <div class="p-5 md:px-8 py-8 flex-1">
              <div class="max-w-3xl mx-auto">
                <h4 class="text-lg font-bold text-[var(--sys-text-primary)] mb-6 flex items-center gap-2 uppercase tracking-tight">
                  <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-2xl" style="font-variation-settings: 'FILL' 1;">health_and_safety</span>
                  Thông báo Bảo hiểm
                </h4>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-[var(--sys-border-subtle)] mb-6">
                  <div>
                    <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2">Số sổ BHXH</p>
                    <p class="font-bold text-[var(--sys-text-primary)] mb-1">BH2023-0987654</p>
                    <p class="text-sm text-[var(--sys-text-secondary)] m-0">Nơi đăng ký KCB ban đầu: BV Đa khoa Xanh Pôn</p>
                  </div>
                  <div class="sm:text-right">
                    <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2">Trạng thái</p>
                    <span class="inline-block bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] rounded-full px-3 py-1 font-bold border border-[var(--sys-success-border)] text-xs tracking-wide">ĐANG ĐÓNG</span>
                  </div>
                </div>

                <div>
                  <h6 class="font-bold text-[var(--sys-text-primary)] mb-4 pb-3 border-b border-[var(--sys-border-subtle)] flex items-center gap-2">
                    <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-xl" style="font-variation-settings: 'FILL' 1;">percent</span>
                    Tỷ lệ đóng (Theo quy định hiện hành)
                  </h6>
                  <div class="p-5 rounded-4 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] flex flex-col gap-4">
                    <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <span class="text-sm text-[var(--sys-text-secondary)] font-bold">Bảo hiểm Xã hội (BHXH)</span>
                      <span class="text-sm font-bold text-[var(--sys-text-secondary)] bg-[var(--sys-bg-surface)] px-3 py-1 rounded-lg border border-[var(--sys-border-subtle)]">NLĐ: 8% - CTY: 17.5%</span>
                    </div>
                    <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pt-4 border-t border-[var(--sys-border-subtle)]/60">
                      <span class="text-sm text-[var(--sys-text-secondary)] font-bold">Bảo hiểm Y tế (BHYT)</span>
                      <span class="text-sm font-bold text-[var(--sys-text-secondary)] bg-[var(--sys-bg-surface)] px-3 py-1 rounded-lg border border-[var(--sys-border-subtle)]">NLĐ: 1.5% - CTY: 3%</span>
                    </div>
                    <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pt-4 border-t border-[var(--sys-border-subtle)]/60">
                      <span class="text-sm text-[var(--sys-text-secondary)] font-bold">Bảo hiểm Thất nghiệp (BHTN)</span>
                      <span class="text-sm font-bold text-[var(--sys-text-secondary)] bg-[var(--sys-bg-surface)] px-3 py-1 rounded-lg border border-[var(--sys-border-subtle)]">NLĐ: 1% - CTY: 1%</span>
                    </div>
                  </div>
                </div>
                
                <!-- Info Box (Refactor to Semantic Info) -->
                <div class="p-4 rounded-4 border border-[var(--sys-info-border)] bg-[var(--sys-info-soft)] mt-8">
                  <p class="text-xs text-[var(--sys-info-text)] m-0 leading-relaxed font-medium">
                    <strong class="text-[var(--sys-info-solid)]">Lưu ý:</strong> Thông tin bảo hiểm được đồng bộ từ hệ thống BHXH Việt Nam. Nếu có sai sót, vui lòng liên hệ bộ phận C&B để được hỗ trợ điều chỉnh.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- END TABS -->
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('salary')
</script>

<style scoped>
/* Không cần style local vì đã dùng Tailwind OKLCH */
</style>
