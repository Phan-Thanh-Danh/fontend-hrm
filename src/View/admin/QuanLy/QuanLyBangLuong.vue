<template>
  <div class="h-full flex flex-col gap-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800 tracking-tight">Quản lý Bảng lương</h1>
        <p class="text-slate-500 text-sm mt-1">Theo dõi, phê duyệt và quản lý quỹ lương định kỳ của doanh nghiệp</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm transition-colors shadow-sm">
          <span class="material-symbols-outlined text-[20px]">upgrade</span>
          Xuất báo cáo Excel
        </button>
        <button @click="openAddModal" class="flex items-center gap-2 px-4 py-2 bg-blue-600 border border-transparent text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors shadow-sm">
          <span class="material-symbols-outlined text-[20px]">add</span>
          Tạo bảng lương mới
        </button>
      </div>
    </div>

    <!-- Overview Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Card 1 -->
      <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex flex-col gap-4">
        <div class="flex justify-between items-start">
          <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <span class="material-symbols-outlined">payments</span>
          </div>
          <span class="px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 text-xs font-bold">+5.2%</span>
        </div>
        <div>
          <p class="text-slate-500 text-sm font-medium mb-1">Tổng quỹ lương tháng 10</p>
          <h3 class="text-2xl font-bold text-slate-800">2.450.000.000đ</h3>
        </div>
      </div>
      
      <!-- Card 2 -->
      <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex flex-col gap-4">
        <div class="flex justify-between items-start">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <span class="material-symbols-outlined">group</span>
          </div>
          <span class="px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 text-xs font-bold">+2</span>
        </div>
        <div>
          <p class="text-slate-500 text-sm font-medium mb-1">Tổng số nhân viên</p>
          <h3 class="text-2xl font-bold text-slate-800">156</h3>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex flex-col gap-4">
        <div class="flex justify-between items-start">
          <div class="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
            <span class="material-symbols-outlined">monitoring</span>
          </div>
          <span class="px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 text-xs font-bold">+1.5%</span>
        </div>
        <div>
          <p class="text-slate-500 text-sm font-medium mb-1">Lương trung bình</p>
          <h3 class="text-2xl font-bold text-slate-800">15.700.000đ</h3>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex flex-col gap-4">
        <div class="flex justify-between items-start">
          <div class="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
            <span class="material-symbols-outlined">account_balance_wallet</span>
          </div>
          <span class="px-2 py-1 rounded-md bg-red-50 text-red-500 text-xs font-bold">-0.8%</span>
        </div>
        <div>
          <p class="text-slate-500 text-sm font-medium mb-1">Các khoản khấu trừ</p>
          <h3 class="text-2xl font-bold text-slate-800">125.000.000đ</h3>
        </div>
      </div>
    </div>

    <!-- Main Content Box -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex flex-col">
      <!-- Toolbar -->
      <div class="p-4 border-b border-slate-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div class="flex flex-wrap items-center gap-3">
          <button class="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 text-sm font-medium transition-colors">
            <span class="material-symbols-outlined text-[18px]">calendar_month</span>
            Tháng 10, 2023
            <span class="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
          <button class="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 text-sm font-medium transition-colors">
            <span class="material-symbols-outlined text-[18px]">business</span>
            Tất cả phòng ban
            <span class="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
          <button class="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 text-sm font-medium transition-colors">
            <span class="material-symbols-outlined text-[18px]">filter_list</span>
            Tất cả trạng thái
            <span class="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
        </div>

        <div class="flex flex-wrap lg:flex-nowrap items-center gap-3 w-full lg:w-auto">
          <button class="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 font-medium text-sm transition-colors whitespace-nowrap min-w-fit">
            <span class="material-symbols-outlined text-[18px]">check_circle</span>
            Phê duyệt hàng loạt
          </button>
          <div class="relative w-full lg:w-64">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
            <input type="text" placeholder="Tìm kiếm nhân viên..." class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400">
          </div>
        </div>
      </div>

      <!-- Table Section -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-100">
              <th class="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nhân viên</th>
              <th class="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Kỳ lương</th>
              <th class="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Lương cơ bản</th>
              <th class="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tổng thu nhập</th>
              <th class="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Khấu trừ</th>
              <th class="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Thực nhận</th>
              <th class="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Trạng thái</th>
              <th class="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Hành động</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="(item, index) in employees" :key="index" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img :src="item.avatar" class="w-10 h-10 rounded-full object-cover border border-slate-200">
                  <div>
                    <div class="font-bold text-slate-800 text-sm">{{ item.name }}</div>
                    <div class="text-[11px] text-slate-500 font-medium mt-0.5">ID: {{ item.id }} • {{ item.role }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm font-medium text-slate-600">{{ item.period }}</td>
              <td class="px-6 py-4 text-sm font-bold text-slate-800">{{ item.baseSalary }}</td>
              <td class="px-6 py-4 text-sm font-bold text-slate-800">{{ item.totalIncome }}</td>
              <td class="px-6 py-4 text-sm font-bold text-red-500">{{ item.deduction }}</td>
              <td class="px-6 py-4 text-sm font-bold text-blue-600">{{ item.netSalary }}</td>
              <td class="px-6 py-4">
                <span 
                  class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-bold tracking-wide"
                  :class="{
                    'bg-emerald-50 text-emerald-700': item.status === 'Đã thanh toán',
                    'bg-amber-50 text-amber-700': item.status === 'Chờ thanh toán',
                    'bg-slate-100 text-slate-600': item.status === 'Tạm khóa'
                  }"
                >
                  <span class="w-1.5 h-1.5 rounded-full" :class="{
                    'bg-emerald-500': item.status === 'Đã thanh toán',
                    'bg-amber-500': item.status === 'Chờ thanh toán',
                    'bg-slate-400': item.status === 'Tạm khóa'
                  }"></span>
                  {{ item.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-1 text-slate-400">
                  <button @click="openViewModal(item, index)" class="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Xem chi tiết phiếu lương"><span class="material-symbols-outlined text-[18px]">visibility</span></button>
                  <button @click="openEditModal(item, index)" class="p-1.5 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Chỉnh sửa chi tiết"><span class="material-symbols-outlined text-[18px]">edit</span></button>
                  <button @click="openDeleteModal(item, index)" class="p-1.5 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa bản ghi"><span class="material-symbols-outlined text-[18px]">delete</span></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="p-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div class="text-sm font-medium text-slate-500">
          Hiển thị <span class="text-slate-800 font-bold">1 - 10</span> trong số <span class="text-slate-800 font-bold">156</span> nhân viên
        </div>
        <div class="flex items-center gap-1.5">
          <button class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-colors"><span class="material-symbols-outlined text-[18px]">chevron_left</span></button>
          
          <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm shadow-[0_2px_8px_-2px_rgba(37,99,235,0.5)] transition-all">1</button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 font-medium text-sm hover:bg-slate-100 transition-colors">2</button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 font-medium text-sm hover:bg-slate-100 transition-colors">3</button>
          <span class="w-8 h-8 flex items-center justify-center text-slate-400 text-sm">...</span>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-600 font-medium text-sm hover:bg-slate-100 transition-colors">16</button>
          
          <button class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-colors"><span class="material-symbols-outlined text-[18px]">chevron_right</span></button>
        </div>
      </div>
    </div>

    <!-- Modal Thêm/Xem/Sửa Bảng lương -->
    <div v-if="isAddEditModalOpen" class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-4 duration-300">
        <div class="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
              <span class="material-symbols-outlined text-2xl">{{ modalMode === 'add' ? 'add_box' : (modalMode === 'edit' ? 'edit_document' : 'visibility') }}</span>
            </div>
            <div>
              <h3 class="text-xl font-black text-slate-800">{{ modalMode === 'add' ? 'Tạo bảng lương mới' : (modalMode === 'edit' ? 'Cập nhật bảng lương' : 'Chi tiết bảng lương') }}</h3>
              <p class="text-xs font-bold text-slate-400 mt-0.5">{{ modalMode === 'add' ? 'Nhập thông tin cho nhân viên mới' : (modalMode === 'edit' ? 'Sửa đổi chi tiết thanh toán' : 'Xem thông tin chi tiết thanh toán') }}</p>
            </div>
          </div>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-xl transition-all">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="p-8 overflow-y-auto flex-1 bg-slate-50/50">
          <form @submit.prevent="saveData" class="space-y-6">
            
            <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 transition-all" :class="{'focus-within:border-blue-200 focus-within:shadow-md': modalMode !== 'view'}">
              <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-blue-400 text-[18px]">person</span> THÔNG TIN CƠ BẢN
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-xs font-bold text-slate-600 mb-2">Họ tên nhân viên</label>
                  <input v-model="formData.name" :disabled="modalMode === 'view'" type="text" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:font-medium placeholder:text-slate-400 disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-slate-100" placeholder="VD: Nguyễn Văn A">
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-600 mb-2">Kỳ lương</label>
                  <input v-model="formData.period" :disabled="modalMode === 'view'" type="text" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:font-medium placeholder:text-slate-400 disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-slate-100" placeholder="VD: 10/2023">
                </div>
              </div>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 transition-all" :class="{'focus-within:border-emerald-200 focus-within:shadow-md': modalMode !== 'view'}">
              <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-emerald-400 text-[18px]">payments</span> CHI TIẾT ĐỊNH MỨC
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-xs font-bold text-slate-600 mb-2">Lương cơ bản (đ)</label>
                  <div class="relative group">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-blue-500">₫</span>
                    <input v-model="formData.baseSalary" :disabled="modalMode === 'view'" type="text" required class="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-slate-100" placeholder="20.000.000">
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-600 mb-2">Tổng thu nhập (đ)</label>
                  <div class="relative group">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-emerald-500">₫</span>
                    <input v-model="formData.totalIncome" :disabled="modalMode === 'view'" type="text" required class="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-slate-100" placeholder="25.000.000">
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-600 mb-2">Khấu trừ (đ)</label>
                  <div class="relative group">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 font-bold group-focus-within:text-red-600">-</span>
                    <input v-model="formData.deduction" :disabled="modalMode === 'view'" type="text" required class="w-full pl-8 pr-4 py-3 bg-red-50/50 border border-red-100 rounded-xl text-sm font-bold text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-slate-100" placeholder="1.500.000">
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-600 mb-2">Thực nhận (đ)</label>
                  <div class="relative group">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 font-bold">₫</span>
                    <input v-model="formData.netSalary" :disabled="modalMode === 'view'" type="text" required class="w-full pl-8 pr-4 py-3 bg-blue-50 border border-blue-200 rounded-xl text-lg font-black text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-slate-100" placeholder="23.500.000">
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
               <div>
                  <label class="block text-xs font-bold text-slate-600 mb-2">Trạng thái thanh toán</label>
                  <select v-model="formData.status" :disabled="modalMode === 'view'" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-slate-100 cursor-pointer">
                    <option value="Đã thanh toán">✅ Đã thanh toán</option>
                    <option value="Chờ thanh toán">⏳ Chờ thanh toán</option>
                    <option value="Tạm khóa">🔒 Tạm khóa</option>
                  </select>
                </div>
            </div>
          </form>
        </div>
        <div class="px-8 py-5 border-t border-slate-100 flex justify-end gap-3 bg-white">
          <button @click="closeModal" class="px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100 bg-white border border-slate-200 rounded-xl transition-all">Đóng</button>
          
          <button v-if="modalMode === 'view'" @click="modalMode = 'edit'" type="button" class="px-6 py-3 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl transition-all shadow-[0_4px_12px_rgba(245,158,11,0.3)] hover:-translate-y-0.5 flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px]">edit</span>
            Chỉnh sửa
          </button>
          
          <button v-else @click="saveData" type="button" class="px-6 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-[0_4px_12px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_16px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px]">check_circle</span>
            {{ modalMode === 'add' ? 'Tạo mới' : 'Lưu cập nhật' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Xác nhận Xóa -->
    <div v-if="isDeleteModalOpen" class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden text-center p-8 animate-in zoom-in-95 duration-200">
        <div class="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-5 border-8 border-red-50/50">
          <span class="material-symbols-outlined text-4xl">delete_forever</span>
        </div>
        <h3 class="text-2xl font-black text-slate-800 mb-2">Xóa bản ghi?</h3>
        <p class="text-slate-500 text-sm mb-8 leading-relaxed">Bạn có chắc chắn muốn xóa bản ghi của nhân viên <br><span class="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">{{ selectedItem?.name }}</span>?<br>Hành động này không thể hoàn tác.</p>
        <div class="flex gap-3 justify-center">
          <button @click="isDeleteModalOpen = false" class="px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100 bg-white border border-slate-200 rounded-xl transition-all w-full">Hủy bỏ</button>
          <button @click="confirmDelete" class="px-6 py-3 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-lg shadow-red-600/20 w-full flex justify-center items-center gap-2">
             Xóa ngay
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const employees = ref([
  {
    id: 'NV001',
    name: 'Nguyễn Văn An',
    role: 'UI/UX Designer',
    avatar: 'https://i.pravatar.cc/150?img=11',
    period: '10/2023',
    baseSalary: '18.000.000đ',
    totalIncome: '21.500.000đ',
    deduction: '1.200.000đ',
    netSalary: '20.300.000đ',
    status: 'Đã thanh toán'
  },
  {
    id: 'NV042',
    name: 'Lê Thị Mai',
    role: 'Marketing Lead',
    avatar: 'https://i.pravatar.cc/150?img=5',
    period: '10/2023',
    baseSalary: '25.000.000đ',
    totalIncome: '28.000.000đ',
    deduction: '2.500.000đ',
    netSalary: '25.500.000đ',
    status: 'Chờ thanh toán'
  },
  {
    id: 'NV105',
    name: 'Trần Hoàng Nam',
    role: 'Web Developer',
    avatar: 'https://i.pravatar.cc/150?img=12',
    period: '10/2023',
    baseSalary: '20.000.000đ',
    totalIncome: '20.000.000đ',
    deduction: '1.500.000đ',
    netSalary: '18.500.000đ',
    status: 'Tạm khóa'
  },
  {
    id: 'NV018',
    name: 'Phạm Minh Đức',
    role: 'Product Manager',
    avatar: 'https://i.pravatar.cc/150?img=13',
    period: '10/2023',
    baseSalary: '35.000.000đ',
    totalIncome: '42.000.000đ',
    deduction: '4.800.000đ',
    netSalary: '37.200.000đ',
    status: 'Đã thanh toán'
  }
]);

const isAddEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const modalMode = ref('add'); // 'add', 'edit', 'view'
const selectedItem = ref(null);
const selectedIndex = ref(-1);

const defaultForm = {
  id: '',
  name: '',
  role: 'Nhân viên HR',
  avatar: 'https://i.pravatar.cc/150?img=68',
  period: '',
  baseSalary: '',
  totalIncome: '',
  deduction: '',
  netSalary: '',
  status: 'Chờ thanh toán'
};

const formData = ref({ ...defaultForm });

const openAddModal = () => {
  modalMode.value = 'add';
  formData.value = { ...defaultForm, id: `NV${Math.floor(Math.random() * 900) + 100}` };
  isAddEditModalOpen.value = true;
};

const openEditModal = (item, index) => {
  modalMode.value = 'edit';
  selectedIndex.value = index;
  formData.value = { ...item };
  isAddEditModalOpen.value = true;
};

const openViewModal = (item, index) => {
  modalMode.value = 'view';
  selectedIndex.value = index;
  formData.value = { ...item };
  isAddEditModalOpen.value = true;
};

const openDeleteModal = (item, index) => {
  selectedItem.value = item;
  selectedIndex.value = index;
  isDeleteModalOpen.value = true;
};

const closeModal = () => {
  isAddEditModalOpen.value = false;
};

const saveData = () => {
  if (modalMode.value === 'add') {
    employees.value.unshift({ ...formData.value });
  } else {
    employees.value[selectedIndex.value] = { ...formData.value };
  }
  closeModal();
};

const confirmDelete = () => {
  employees.value.splice(selectedIndex.value, 1);
  isDeleteModalOpen.value = false;
};
</script>