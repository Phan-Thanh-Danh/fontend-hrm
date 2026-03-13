<template>
  <div class="p-4 md:p-6 w-full mx-auto flex flex-col font-sans gap-6">
    
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-slate-800 tracking-tight">Quản lý Hợp đồng</h1>
        <p class="text-sm text-slate-500 font-medium mt-1">Theo dõi, gia hạn và quản lý hồ sơ pháp lý nhân sự công ty.</p>
      </div>
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <button class="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-5 rounded-lg shadow-sm transition-colors flex items-center gap-2">
          <span class="material-symbols-outlined text-[20px]">download</span>
          Xuất dữ liệu
        </button>
        <button class="bg-[#3b3abb] hover:bg-blue-800 text-white font-semibold py-2.5 px-5 rounded-lg shadow-sm transition-colors flex items-center gap-2">
          <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">add</span>
          Thêm hợp đồng mới
        </button>
      </div>
    </div>

    <!-- Alert Box -->
    <div class="bg-amber-50/80 border border-amber-200 rounded-xl p-4 flex items-start sm:items-center gap-3 shadow-sm">
      <div class="text-amber-600 bg-amber-100/50 p-1.5 rounded-lg shrink-0">
        <span class="material-symbols-outlined text-[24px]" style="font-variation-settings: 'FILL' 1;">warning</span>
      </div>
      <div class="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 class="text-amber-800 font-bold text-sm">Cảnh báo: 12 Hợp đồng sắp hết hạn</h3>
          <p class="text-amber-700 text-sm mt-0.5">Có 12 hợp đồng lao động sẽ hết hiệu lực trong vòng 30 ngày tới. Vui lòng kiểm tra và thực hiện quy trình gia hạn hoặc thanh lý.</p>
        </div>
        <button class="text-amber-800 font-extrabold text-sm hover:underline whitespace-nowrap shrink-0">
          Xem ngay
        </button>
      </div>
    </div>

    <!-- Table Section -->
    <div class="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
      
      <!-- Toolbar -->
      <div class="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="relative w-full sm:max-w-md">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
          <input type="text" placeholder="Tìm tên nhân viên hoặc số hợp đồng..." class="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-[#3b3abb] focus:ring-1 focus:ring-[#3b3abb] shadow-sm font-medium transition-all">
        </div>
        <div class="flex items-center gap-1 bg-slate-50/80 p-1 rounded-lg self-end sm:self-auto overflow-x-auto w-full sm:w-auto border border-slate-100">
          <button class="px-4 py-1.5 rounded-md bg-white text-[#3b3abb] font-bold text-sm shadow-sm whitespace-nowrap">Tất cả</button>
          <button class="px-4 py-1.5 rounded-md text-slate-600 hover:text-slate-900 font-semibold text-sm whitespace-nowrap transition-colors">Đang hiệu lực</button>
          <button class="px-4 py-1.5 rounded-md text-slate-600 hover:text-slate-900 font-semibold text-sm whitespace-nowrap transition-colors">Hết hạn (12)</button>
          <button class="px-4 py-1.5 rounded-md text-slate-600 hover:text-slate-900 font-semibold text-sm whitespace-nowrap transition-colors">Đã thanh lý</button>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-200 text-xs text-slate-500 font-extrabold uppercase tracking-widest bg-slate-50/50">
              <th class="py-4 px-6">Số hợp đồng</th>
              <th class="py-4 px-6">Nhân viên</th>
              <th class="py-4 px-6">Loại hợp đồng</th>
              <th class="py-4 px-6">Thời hạn</th>
              <th class="py-4 px-6">Trạng thái</th>
              <th class="py-4 px-6 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="(item, index) in contracts" :key="index" class="hover:bg-slate-50/70 transition-colors">
              <td class="py-4 px-6 text-sm font-extrabold text-slate-800">{{ item.id }}</td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200 shadow-sm">
                    <img :src="item.avatar" alt="avatar" class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 class="text-sm font-bold text-slate-800">{{ item.employeeName }}</h4>
                    <p class="text-xs text-slate-500 font-medium tracking-wide">Mã NV: {{ item.employeeId }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6 text-sm text-slate-600 font-medium">{{ item.type }}</td>
              <td class="py-4 px-6">
                <div class="text-xs font-semibold text-slate-500 mb-0.5"><span class="text-slate-400">BĐ:</span> {{ item.startDate }}</div>
                <div :class="{'text-amber-600': item.status === 'Sắp hết hạn', 'text-slate-500': item.status !== 'Sắp hết hạn'}" class="text-xs font-semibold">
                  <span class="text-slate-400">KT:</span> <span :class="{'font-bold': item.status === 'Sắp hết hạn'}">{{ item.endDate }}</span>
                </div>
              </td>
              <td class="py-4 px-6">
                <span v-if="item.status === 'Đang hiệu lực'" class="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                  Đang hiệu lực
                </span>
                <span v-else-if="item.status === 'Sắp hết hạn'" class="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200/60">
                  Sắp hết hạn
                </span>
                <span v-else class="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200/60">
                  Đã thanh lý
                </span>
              </td>
              <td class="py-4 px-6 text-center">
                <div class="flex items-center justify-center gap-1">
                  <button class="text-slate-400 hover:text-[#3b3abb] transition-colors p-1.5 rounded-lg hover:bg-indigo-50" title="Xem chi tiết">
                    <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">visibility</span>
                  </button>
                  <button class="text-slate-400 hover:text-slate-700 transition-colors p-1.5 rounded-lg hover:bg-slate-100" title="Khác">
                    <span class="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Form -->
      <div class="p-4 border-t border-slate-200 flex items-center justify-between bg-white">
        <p class="text-xs font-semibold text-slate-500 tracking-wide">Hiển thị 1-10 của 185 kết quả</p>
        <div class="flex items-center gap-1">
          <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 bg-white hover:bg-slate-50 transition-colors">
            <span class="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-[#3b3abb] bg-[#3b3abb] text-white font-bold text-sm shadow-sm transition-colors">
            1
          </button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 text-sm font-semibold transition-colors">
            2
          </button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 text-sm font-semibold transition-colors">
            3
          </button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 bg-white hover:bg-slate-50 transition-colors">
            <span class="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom Detail Section -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start mt-2">
      
      <!-- Contract Detail Card -->
      <div class="xl:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div class="flex items-center justify-between p-5 border-b border-slate-100">
          <div class="flex items-center gap-2.5 text-[#3b3abb]">
            <span class="material-symbols-outlined text-[22px]" style="font-variation-settings: 'FILL' 1;">description</span>
            <h3 class="font-extrabold text-[16px] text-slate-800">Chi tiết hợp đồng (HD-2023-0845)</h3>
          </div>
          <div class="flex items-center gap-2">
            <button class="bg-indigo-50/80 text-[#3b3abb] font-bold px-3.5 py-1.5 rounded-lg text-xs hover:bg-indigo-100 transition-colors">Gia hạn</button>
            <button class="bg-rose-50/80 text-rose-600 font-bold px-3.5 py-1.5 rounded-lg text-xs hover:bg-rose-100 transition-colors">Thanh lý</button>
          </div>
        </div>

        <div class="p-6 flex flex-col md:flex-row gap-8 items-center md:items-stretch">
          <div class="flex-1 flex flex-col gap-6 w-full">
            <div>
              <p class="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Tên nhân viên</p>
              <h4 class="font-bold text-slate-800 text-[15px]">Trần Thị B</h4>
            </div>
            <div>
              <p class="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Loại hợp đồng</p>
              <h4 class="font-bold text-slate-800 text-[15px]">Hợp đồng lao động xác định thời hạn (1 năm)</h4>
            </div>
            <div class="flex gap-12">
              <div>
                <p class="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Ngày bắt đầu</p>
                <h4 class="font-bold text-slate-800 text-[15px]">15/04/2023</h4>
              </div>
              <div>
                <p class="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Ngày kết thúc</p>
                <h4 class="font-bold text-slate-800 text-[15px]">15/04/2024</h4>
              </div>
            </div>
          </div>
          <!-- PDF Block -->
          <div class="flex-1 w-full min-h-[160px] border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-xl flex flex-col items-center justify-center p-6 hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer group">
            <div class="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center text-slate-500 mb-3 group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-[28px]" style="font-variation-settings: 'FILL' 1;">picture_as_pdf</span>
            </div>
            <h4 class="font-bold text-slate-700 text-sm">HOP_DONG_TRANTHIB_2023.pdf</h4>
            <p class="text-[11px] text-slate-400 font-semibold mt-1 uppercase tracking-wide">Dung lượng: 1.2 MB</p>
          </div>
        </div>
      </div>

      <!-- History Card -->
      <div class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
        <div class="p-5 border-b border-slate-100 flex items-center gap-2.5 text-[#3b3abb]">
          <span class="material-symbols-outlined text-[22px]">history</span>
          <h3 class="font-extrabold text-[16px] text-slate-800">Lịch sử thay đổi</h3>
        </div>
        <div class="p-6 relative flex-grow">
          <!-- Timeline Line -->
          <div class="absolute left-[39px] top-8 bottom-8 w-0.5 bg-slate-100"></div>
          
          <div class="flex flex-col gap-6 relative z-10">
            <!-- Timeline Item 1 -->
            <div class="flex gap-4">
              <div class="w-8 h-8 rounded-full bg-[#3b3abb] text-white flex items-center justify-center shrink-0 border-[3px] border-white shadow-sm z-10">
                <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">add</span>
              </div>
              <div class="pt-1.5 flex flex-col gap-0.5">
                <h4 class="font-bold text-slate-800 text-[14px]">Tạo mới hợp đồng</h4>
                <p class="text-[13px] text-slate-500 font-medium">Thực hiện bởi: <span class="font-bold text-slate-700">Lê Minh Admin</span></p>
                <p class="text-[11px] text-slate-400 font-bold mt-1 uppercase tracking-wide">15/04/2023 09:30 AM</p>
              </div>
            </div>
            <!-- Timeline Item 2 -->
            <div class="flex gap-4">
              <div class="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 border-[3px] border-white shadow-sm z-10">
                <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">edit</span>
              </div>
              <div class="pt-1.5 flex flex-col gap-0.5">
                <h4 class="font-bold text-slate-800 text-[14px]">Cập nhật thông tin</h4>
                <p class="text-[13px] text-slate-500 font-medium">Gia hạn thêm phụ lục lương</p>
                <p class="text-[11px] text-slate-400 font-bold mt-1 uppercase tracking-wide">20/08/2023 02:15 PM</p>
              </div>
            </div>
            <!-- Timeline Item 3 -->
            <div class="flex gap-4">
              <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 border-[3px] border-white shadow-sm z-10">
                <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">visibility</span>
              </div>
              <div class="pt-1.5 flex flex-col gap-0.5">
                <h4 class="font-bold text-slate-800 text-[14px]">Xem tập tin đính kèm</h4>
                <p class="text-[13px] text-slate-500 font-medium">Nhân viên HR-02</p>
                <p class="text-[11px] text-slate-400 font-bold mt-1 uppercase tracking-wide">12/03/2024 10:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const contracts = ref([
  {
    id: 'HD-2024-0012',
    avatar: 'https://i.pravatar.cc/150?u=12',
    employeeName: 'Nguyễn Văn A',
    employeeId: 'NV-1029',
    type: 'Vô thời hạn',
    startDate: '01/01/2024',
    endDate: '--/--/----',
    status: 'Đang hiệu lực'
  },
  {
    id: 'HD-2023-0845',
    avatar: 'https://i.pravatar.cc/150?u=45',
    employeeName: 'Trần Thị B',
    employeeId: 'NV-2045',
    type: '1 năm',
    startDate: '15/04/2023',
    endDate: '15/04/2024',
    status: 'Sắp hết hạn'
  },
  {
    id: 'HD-2022-0100',
    avatar: 'https://i.pravatar.cc/150?u=10',
    employeeName: 'Lê Văn C',
    employeeId: 'NV-3012',
    type: 'Thử việc',
    startDate: '01/01/2022',
    endDate: '01/03/2022',
    status: 'Đã thanh lý'
  }
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
</style>
