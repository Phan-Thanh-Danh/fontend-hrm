<template>
  <div class="flex flex-col h-full font-display text-slate-900 bg-transparent rounded-xl overflow-hidden" style="min-height: calc(100vh - 100px);">
    <!-- Header Page riêng cho phiếu lương -->
    <header class="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200 shrink-0">
      <div class="flex items-center gap-4">
        <h2 class="text-lg font-bold">Quản lý Phiếu lương</h2>
      </div>
      <div class="flex items-center gap-4">
        <div class="relative">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input class="pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary transition-all focus:outline-none" placeholder="Tìm kiếm kỳ lương..." type="text"/>
        </div>
      </div>
    </header>

    <!-- Dashboard Body -->
    <div class="flex-1 flex overflow-hidden p-6 gap-6">
      <!-- Left Section: Payslip List -->
      <div class="w-1/3 flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-black dark:text-black">Lịch sử kỳ lương</h3>
          <span class="text-xs text-slate-500 font-medium">Năm 2023</span>
        </div>
        <div class="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          <!-- List Item Active -->
          <div class="p-4 rounded-xl border-2 border-primary bg-white shadow-md flex flex-col gap-3 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-1 h-full bg-primary"></div>
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-bold text-slate-900 uppercase tracking-tight">Tháng 10/2023</p>
                <p class="text-xs text-slate-500 mt-0.5">Thanh toán ngày 05/11</p>
              </div>
              <span class="bg-green-100 text-green-700 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">Đã thanh toán</span>
            </div>
            <div class="flex justify-between items-end">
              <div>
                <p class="text-xs text-slate-500">Thực nhận (Net)</p>
                <p class="text-lg font-black text-primary tracking-tight">25.000.000đ</p>
              </div>
              <button class="w-8 h-8 size-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all border-none">
                <span class="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            </div>
          </div>
          <!-- List Item -->
          <div class="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col gap-3 cursor-pointer group">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-medium text-slate-700 uppercase tracking-tight">Tháng 09/2023</p>
                <p class="text-xs text-slate-500 mt-0.5">Thanh toán ngày 05/10</p>
              </div>
              <span class="bg-green-100 text-green-700 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">Đã thanh toán</span>
            </div>
            <div class="flex justify-between items-end">
              <div>
                <p class="text-xs text-slate-500">Thực nhận (Net)</p>
                <p class="text-lg font-bold text-slate-800 tracking-tight">24.500.000đ</p>
              </div>
              <button class="w-8 h-8 size-8 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center group-hover:bg-slate-100 group-hover:text-primary transition-all border border-slate-200 group-hover:border-primary/30">
                <span class="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            </div>
          </div>
          <!-- List Item -->
          <div class="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col gap-3 cursor-pointer group">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-medium text-slate-700 uppercase tracking-tight">Tháng 08/2023</p>
                <p class="text-xs text-slate-500 mt-0.5">Thanh toán ngày 05/09</p>
              </div>
              <span class="bg-green-100 text-green-700 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">Đã thanh toán</span>
            </div>
            <div class="flex justify-between items-end">
              <div>
                <p class="text-xs text-slate-500">Thực nhận (Net)</p>
                <p class="text-lg font-bold text-slate-800 tracking-tight">26.200.000đ</p>
              </div>
              <button class="w-8 h-8 size-8 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center group-hover:bg-slate-100 group-hover:text-primary transition-all border border-slate-200 group-hover:border-primary/30">
                <span class="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Right Section: Detailed Payslip View -->
      <div class="w-2/3 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
        <!-- Top Actions -->
        <div class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span class="material-symbols-outlined text-3xl">picture_as_pdf</span>
            </div>
            <div>
              <h4 class="font-bold text-lg">Chi tiết Phiếu lương</h4>
              <p class="text-sm text-slate-500">Kỳ lương tháng 10 năm 2023</p>
            </div>
          </div>
          <button class="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/30 hover:brightness-110 active:scale-95 transition-all border-none">
            <span class="material-symbols-outlined text-lg">download</span>
            Tải PDF Phiếu lương
          </button>
        </div>
        <!-- Scrollable Content -->
        <div class="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div class="max-w-3xl mx-auto space-y-8">
            <!-- Header Info -->
            <div class="grid grid-cols-2 gap-8 pb-8 border-b border-slate-100">
              <div>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Nhân viên</p>
                <p class="font-bold text-slate-800">Nguyễn Văn A</p>
                <p class="text-sm text-slate-500">Mã NV: HR2023-0124</p>
                <p class="text-sm text-slate-500">Phòng ban: Creative Studio</p>
              </div>
              <div class="text-right">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Kỳ thanh toán</p>
                <p class="font-bold text-slate-800">01/10/2023 - 31/10/2023</p>
                <p class="text-sm text-slate-500">Ngày chi trả: 05/11/2023</p>
                <p class="text-sm text-slate-500">Số tài khoản: **** **** 1234 (Techcombank)</p>
              </div>
            </div>
            <!-- Net Salary Highlight -->
            <div class="bg-primary/5 rounded-2xl p-6 border border-primary/10 flex items-center justify-between">
              <div>
                <h5 class="text-primary font-bold text-sm uppercase tracking-wide">Thực nhận cuối cùng (NET)</h5>
                <p class="text-4xl font-black text-primary tracking-tight mt-1">25.000.000đ</p>
              </div>
              <div class="text-right">
                <p class="text-xs text-slate-500 italic">"Hai mươi lăm triệu đồng chẵn"</p>
              </div>
            </div>
            <!-- Detailed Breakdown -->
            <div class="grid grid-cols-2 gap-10">
              <!-- Income Section -->
              <div class="space-y-4">
                <h6 class="flex items-center gap-2 font-bold text-slate-800 pb-2 border-b-2 border-slate-100">
                  <span class="material-symbols-outlined text-green-500">add_circle</span>
                  Các khoản thu nhập
                </h6>
                <div class="space-y-3">
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-slate-600 dark:text-slate-400">Lương cơ bản (Gross)</span>
                    <span class="font-medium">28.000.000đ</span>
                  </div>
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-slate-600 dark:text-slate-400">Lương làm thêm giờ (OT)</span>
                    <span class="font-medium text-green-600">1.500.000đ</span>
                  </div>
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-slate-600 dark:text-slate-400">Phụ cấp ăn trưa</span>
                    <span class="font-medium">730.000đ</span>
                  </div>
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-slate-600">Thưởng hiệu suất</span>
                    <span class="font-medium">1.000.000đ</span>
                  </div>
                </div>
                <div class="pt-2 flex justify-between items-center font-bold text-slate-900">
                  <span>Tổng thu nhập</span>
                  <span>31.230.000đ</span>
                </div>
              </div>
              <!-- Deduction Section -->
              <div class="space-y-4">
                <h6 class="flex items-center gap-2 font-bold text-slate-800 pb-2 border-b-2 border-slate-100">
                  <span class="material-symbols-outlined text-red-500">remove_circle</span>
                  Các khoản khấu trừ
                </h6>
                <div class="space-y-3">
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-slate-600">BHXH (8%)</span>
                    <span class="font-medium text-red-600">-2.240.000đ</span>
                  </div>
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-slate-600 dark:text-slate-400">BHYT (1.5%)</span>
                    <span class="font-medium text-red-600">-420.000đ</span>
                  </div>
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-slate-600 dark:text-slate-400">BHTN (1%)</span>
                    <span class="font-medium text-red-600">-280.000đ</span>
                  </div>
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-slate-600">Thuế TNCN tạm tính</span>
                    <span class="font-medium text-red-600">-3.290.000đ</span>
                  </div>
                </div>
                <div class="pt-2 flex justify-between items-center font-bold text-slate-900">
                  <span>Tổng khấu trừ</span>
                  <span>-6.230.000đ</span>
                </div>
              </div>
            </div>
            <!-- Footer Note -->
            <div class="p-4 rounded-lg bg-slate-50 border border-slate-200 mt-8 mb-4 flex-shrink-0">
              <p class="text-xs text-slate-500 leading-relaxed">
                <strong>Ghi chú:</strong> Đây là phiếu lương được tạo tự động bởi hệ thống HRM. Mọi thắc mắc về các khoản tính toán xin vui lòng liên hệ Bộ phận Nhân sự (HR) trong vòng 03 ngày làm việc kể từ ngày nhận được phiếu lương.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // Inject Tailwind config nếu chưa có
  if (!document.getElementById('tailwind-config-script')) {
    const scriptConfig = document.createElement('script');
    scriptConfig.id = 'tailwind-config-script';
    scriptConfig.innerHTML = `
      window.tailwind = window.tailwind || {};
      window.tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "primary": "#1754cf",
              "background-light": "#f6f6f8",
              "background-dark": "#111621",
            },
            fontFamily: {
              "display": ["Inter", "sans-serif"]
            },
            borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
          },
        },
      };
    `;
    document.head.appendChild(scriptConfig);
  }

  // Khởi tạo Tailwind CSS via CDN nếu dự án chưa tải Tailwind cục bộ
  if (!document.getElementById('tailwind-cdn')) {
    const scriptTailwind = document.createElement('script');
    scriptTailwind.id = 'tailwind-cdn';
    scriptTailwind.src = 'https://cdn.tailwindcss.com?plugins=forms,container-queries';
    document.head.appendChild(scriptTailwind);
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

/* Đảm bảo Font icon hoạt động tốt */
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined' !important;
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
}

/* Custom cho thanh cuộn đẹp hơn xíu */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 20px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #334155;
}
</style>
