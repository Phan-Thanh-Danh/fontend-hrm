<template>
  <div class="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8 font-sans">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-7xl mx-auto">
      
      <!-- Left Column: Lịch sử kỳ lương -->
      <div class="lg:col-span-4 flex flex-col gap-4">
        <div class="flex justify-between items-center px-1">
          <h2 class="text-base font-bold text-slate-900 m-0">Lịch sử kỳ lương</h2>
          <span class="text-xs text-slate-500 font-medium">Năm 2023</span>
        </div>
        
        <div class="flex flex-col gap-3 overflow-y-auto pr-2" style="max-height: calc(100vh - 120px);">
          
          <!-- Thẻ Active (Current) -->
          <div class="bg-white rounded-2xl shadow-[0_4px_15px_rgb(0,0,0,0.02)] border-2 border-blue-600 relative overflow-hidden cursor-pointer group">
            <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600"></div>
            <div class="p-5 pl-6 flex flex-col gap-3">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-sm font-bold text-slate-900 uppercase tracking-tight mb-0.5">Tháng 10/2023</h3>
                  <p class="text-xs text-slate-500 mb-0">Thanh toán ngày 05/11</p>
                </div>
                <span class="bg-green-50 text-green-600 rounded-full px-3 py-1 font-bold border border-green-200/60 text-[10px] uppercase tracking-wider">Đã thanh toán</span>
              </div>
              <div class="flex justify-between items-end mt-1">
                <div>
                  <p class="text-xs text-slate-500 mb-0.5">Thực nhận (Net)</p>
                  <p class="text-xl font-bold text-blue-600 tracking-tight m-0">25.000.000đ</p>
                </div>
                <button class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center transition-colors group-hover:bg-blue-100">
                  <span class="material-symbols-outlined text-base">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Thẻ Inactive -->
          <div class="bg-white rounded-2xl shadow-[0_4px_15px_rgb(0,0,0,0.02)] border border-slate-200 hover:border-blue-300 transition-all cursor-pointer group">
            <div class="p-5 flex flex-col gap-3">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-sm font-bold text-slate-500 uppercase tracking-tight mb-0.5 group-hover:text-slate-900 transition-colors">Tháng 09/2023</h3>
                  <p class="text-xs text-slate-400 mb-0">Thanh toán ngày 05/10</p>
                </div>
                <span class="bg-green-50 text-green-600 rounded-full px-3 py-1 font-bold border border-green-200/60 text-[10px] uppercase tracking-wider">Đã thanh toán</span>
              </div>
              <div class="flex justify-between items-end mt-1">
                <div>
                  <p class="text-xs text-slate-400 mb-0.5">Thực nhận (Net)</p>
                  <p class="text-xl font-bold text-slate-700 tracking-tight m-0 group-hover:text-blue-600 transition-colors">24.500.000đ</p>
                </div>
                <button class="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
                  <span class="material-symbols-outlined text-base">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Thẻ Inactive -->
          <div class="bg-white rounded-2xl shadow-[0_4px_15px_rgb(0,0,0,0.02)] border border-slate-200 hover:border-blue-300 transition-all cursor-pointer group">
            <div class="p-5 flex flex-col gap-3">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-sm font-bold text-slate-500 uppercase tracking-tight mb-0.5 group-hover:text-slate-900 transition-colors">Tháng 08/2023</h3>
                  <p class="text-xs text-slate-400 mb-0">Thanh toán ngày 05/09</p>
                </div>
                <span class="bg-green-50 text-green-600 rounded-full px-3 py-1 font-bold border border-green-200/60 text-[10px] uppercase tracking-wider">Đã thanh toán</span>
              </div>
              <div class="flex justify-between items-end mt-1">
                <div>
                  <p class="text-xs text-slate-400 mb-0.5">Thực nhận (Net)</p>
                  <p class="text-xl font-bold text-slate-700 tracking-tight m-0 group-hover:text-blue-600 transition-colors">26.200.000đ</p>
                </div>
                <button class="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
                  <span class="material-symbols-outlined text-base">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Right Column: Chi tiết Phiếu lương -->
      <div class="lg:col-span-8">
        <div class="bg-white rounded-2xl shadow-[0_4px_15px_rgb(0,0,0,0.02)] border border-slate-200 overflow-hidden flex flex-col h-full min-h-[600px]">
          
          <!-- Tabs Segmented Control -->
          <div class="bg-slate-50/80 px-5 pt-4 pb-3 border-b border-slate-100 flex gap-2">
            <div class="inline-flex bg-slate-200/50 p-1 rounded-xl">
              <button 
                @click="activeTab = 'salary'" 
                :class="activeTab === 'salary' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'"
                class="px-6 py-2 rounded-lg text-sm font-semibold transition-all">
                Phiếu lương
              </button>
              <button 
                @click="activeTab = 'insurance'" 
                :class="activeTab === 'insurance' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'"
                class="px-6 py-2 rounded-lg text-sm font-semibold transition-all">
                Bảo hiểm
              </button>
            </div>
          </div>

          <!-- SALARY TAB CONTENT -->
          <div v-show="activeTab === 'salary'" class="flex-1 flex flex-col bg-white">
            <!-- Header -->
            <div class="p-5 md:px-8 border-b border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/50">
                  <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">picture_as_pdf</span>
                </div>
                <div>
                  <h4 class="text-lg font-bold text-slate-900 mb-0.5">Chi tiết Phiếu lương</h4>
                  <p class="text-xs text-slate-500 mb-0">Kỳ lương tháng 10 năm 2023</p>
                </div>
              </div>
              <button class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl flex justify-center items-center gap-2 shadow-sm shadow-blue-600/20 transition-all active:scale-95">
                <span class="material-symbols-outlined text-lg">download</span>
                Tải PDF
              </button>
            </div>

            <!-- Body -->
            <div class="p-5 md:px-8 pb-8 flex-1">
              <div class="max-w-3xl mx-auto space-y-8 mt-2">
                
                <!-- Info Row -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
                  <div>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">NHÂN VIÊN</p>
                    <p class="font-bold text-slate-900 mb-1">Nguyễn Văn A</p>
                    <p class="text-sm text-slate-500 mb-1">Mã NV: HR2023-0124</p>
                    <p class="text-sm text-slate-500 mb-0">Phòng ban: Creative Studio</p>
                  </div>
                  <div class="sm:text-right">
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">KỲ THANH TOÁN</p>
                    <p class="font-bold text-slate-900 mb-1">01/10/2023 - 31/10/2023</p>
                    <p class="text-sm text-slate-500 mb-1">Ngày chi trả: 05/11/2023</p>
                    <p class="text-sm text-slate-500 mb-0">Số tài khoản: **** **** 1234 (Techcombank)</p>
                  </div>
                </div>

                <!-- Net Value -->
                <div class="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h5 class="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-2">THỰC NHẬN CUỐI CÙNG (NET)</h5>
                    <p class="text-4xl font-black text-blue-700 tracking-tight m-0">25.000.000đ</p>
                  </div>
                  <div class="sm:text-right mt-2 sm:mt-0">
                    <p class="text-sm text-blue-600/80 italic m-0 font-medium">"Hai mươi lăm triệu đồng chẵn"</p>
                  </div>
                </div>

                <!-- Details Table Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  <!-- Incomes -->
                  <div class="flex flex-col gap-4">
                    <h6 class="font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2 m-0 text-base">
                      <span class="material-symbols-outlined text-emerald-500 text-xl" style="font-variation-settings: 'FILL' 1;">add_circle</span>
                      Các khoản thu nhập
                    </h6>
                    <div class="flex flex-col gap-3">
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-slate-500 font-medium">Lương cơ bản (Gross)</span>
                        <span class="text-sm font-bold text-slate-900">28.000.000đ</span>
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-slate-500 font-medium">Lương làm thêm giờ (OT)</span>
                        <span class="text-sm font-bold text-emerald-600">1.500.000đ</span>
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-slate-500 font-medium">Phụ cấp ăn trưa</span>
                        <span class="text-sm font-bold text-slate-900">730.000đ</span>
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-slate-500 font-medium">Thưởng hiệu suất</span>
                        <span class="text-sm font-bold text-slate-900">1.000.000đ</span>
                      </div>
                      <div class="flex justify-between items-center pt-3 mt-1 border-t border-slate-100">
                        <span class="text-sm font-bold text-slate-900">Tổng thu nhập</span>
                        <span class="text-sm font-bold text-slate-900">31.230.000đ</span>
                      </div>
                    </div>
                  </div>

                  <!-- Deductions -->
                  <div class="flex flex-col gap-4">
                    <h6 class="font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2 m-0 text-base">
                      <span class="material-symbols-outlined text-rose-500 text-xl" style="font-variation-settings: 'FILL' 1;">remove_circle</span>
                      Các khoản khấu trừ
                    </h6>
                    <div class="flex flex-col gap-3 h-full">
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-slate-500 font-medium">BHXH (8%)</span>
                        <span class="text-sm font-bold text-rose-500">-2.240.000đ</span>
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-slate-500 font-medium">BHYT (1.5%)</span>
                        <span class="text-sm font-bold text-rose-500">-420.000đ</span>
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-slate-500 font-medium">BHTN (1%)</span>
                        <span class="text-sm font-bold text-rose-500">-280.000đ</span>
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-slate-500 font-medium">Thuế TNCN tạm tính</span>
                        <span class="text-sm font-bold text-rose-500">-3.290.000đ</span>
                      </div>
                      <div class="flex justify-between items-end pt-3 mt-1 border-t border-slate-100 flex-1">
                        <span class="text-sm font-bold text-slate-900">Tổng khấu trừ</span>
                        <span class="text-sm font-bold text-slate-900">-6.230.000đ</span>
                      </div>
                    </div>
                  </div>

                </div>

                <!-- Note Box -->
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 mt-2">
                  <p class="text-xs text-slate-500 m-0 leading-relaxed font-medium">
                    <strong class="text-slate-800">Ghi chú:</strong> Đây là phiếu lương được tạo tự động bởi hệ thống HRM. Mọi thắc mắc về các khoản tính toán xin vui lòng liên hệ Bộ phận Nhân sự (HR) trong vòng 03 ngày làm việc kể từ ngày nhận được phiếu lương.
                  </p>
                </div>

              </div>
            </div>
          </div> <!-- Close v-show salary -->

          <!-- INSURANCE TAB CONTENT -->
          <div v-show="activeTab === 'insurance'" class="flex-1 flex flex-col bg-white">
            <div class="p-5 md:px-8 py-8 flex-1">
              <div class="max-w-3xl mx-auto">
                <h4 class="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span class="material-symbols-outlined text-blue-600 text-2xl" style="font-variation-settings: 'FILL' 1;">health_and_safety</span>
                  Thông báo Bảo hiểm
                </h4>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-slate-100 mb-6">
                  <div>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Số sổ BHXH</p>
                    <p class="font-bold text-slate-900 mb-1">BH2023-0987654</p>
                    <p class="text-sm text-slate-500 m-0">Nơi đăng ký KCB ban đầu: BV Đa khoa Xanh Pôn</p>
                  </div>
                  <div class="sm:text-right">
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Trạng thái</p>
                    <span class="inline-block bg-green-50 text-green-600 rounded-full px-3 py-1 font-bold border border-green-200/60 text-xs tracking-wide">ĐANG ĐÓNG</span>
                  </div>
                </div>

                <div>
                  <h6 class="font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
                    <span class="material-symbols-outlined text-blue-600 text-xl" style="font-variation-settings: 'FILL' 1;">percent</span>
                    Tỷ lệ đóng (Theo quy định hiện hành)
                  </h6>
                  <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-4">
                    <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <span class="text-sm text-slate-700 font-semibold">Bảo hiểm Xã hội (BHXH)</span>
                      <span class="text-sm font-bold text-slate-500 bg-white px-3 py-1 rounded-lg border border-slate-200">NLĐ: 8% - CTY: 17.5%</span>
                    </div>
                    <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pt-4 border-t border-slate-200/60">
                      <span class="text-sm text-slate-700 font-semibold">Bảo hiểm Y tế (BHYT)</span>
                      <span class="text-sm font-bold text-slate-500 bg-white px-3 py-1 rounded-lg border border-slate-200">NLĐ: 1.5% - CTY: 3%</span>
                    </div>
                    <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pt-4 border-t border-slate-200/60">
                      <span class="text-sm text-slate-700 font-semibold">Bảo hiểm Thất nghiệp (BHTN)</span>
                      <span class="text-sm font-bold text-slate-500 bg-white px-3 py-1 rounded-lg border border-slate-200">NLĐ: 1% - CTY: 1%</span>
                    </div>
                  </div>
                </div>
                
                <div class="p-4 rounded-xl border border-blue-200 bg-blue-50 mt-8">
                  <p class="text-xs text-blue-800 m-0 leading-relaxed font-medium">
                    <strong class="text-blue-900">Lưu ý:</strong> Thông tin bảo hiểm được đồng bộ từ hệ thống BHXH Việt Nam. Nếu có sai sót, vui lòng liên hệ bộ phận C&B để được hỗ trợ điều chỉnh.
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
import { ref } from 'vue';

const activeTab = ref('salary');
</script>
