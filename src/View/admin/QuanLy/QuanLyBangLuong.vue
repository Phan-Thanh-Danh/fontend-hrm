<template>
  <div class="h-full flex flex-col gap-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-[var(--sys-text-primary)] tracking-tight">Quản lý Bảng lương</h1>
        <p class="text-[var(--sys-text-secondary)] text-sm mt-1">Theo dõi, phê duyệt và quản lý quỹ lương định kỳ của doanh nghiệp</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="flex items-center gap-2 px-4 py-2 bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-text-primary)] rounded-lg hover:bg-[var(--sys-bg-hover)] font-medium text-sm transition-colors shadow-sm">
          <span class="material-symbols-outlined text-[20px]">upgrade</span>
          Xuất báo cáo Excel
        </button>
        <button @click="openAddModal" class="flex items-center gap-2 px-4 py-2 bg-[var(--sys-brand-solid)] border border-transparent text-white rounded-lg hover:bg-[var(--sys-brand-hover)] font-medium text-sm transition-colors shadow-sm">
          <span class="material-symbols-outlined text-[20px]">add</span>
          Tạo bảng lương mới
        </button>
      </div>
    </div>

    <!-- Overview Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Card 1 -->
      <div class="bg-[var(--sys-bg-surface)] rounded-2xl p-5 border border-[var(--sys-border-subtle)] shadow-[0_2px_10px_-3px_var(--sys-brand-solid-lch-30)] flex flex-col gap-4">
        <div class="flex justify-between items-start">
          <div class="w-10 h-10 rounded-xl bg-[var(--sys-brand-soft)] flex items-center justify-center text-[var(--sys-brand-solid)]">
            <span class="material-symbols-outlined">payments</span>
          </div>
          <span class="px-2 py-1 rounded-md bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] text-xs font-bold">+5.2%</span>
        </div>
        <div>
          <p class="text-[var(--sys-text-secondary)] text-sm font-medium mb-1">Tổng quỹ lương tháng 10</p>
          <h3 class="text-2xl font-bold text-[var(--sys-text-primary)]">2.450.000.000đ</h3>
        </div>
      </div>
      
      <!-- Card 2 -->
      <div class="bg-[var(--sys-bg-surface)] rounded-2xl p-5 border border-[var(--sys-border-subtle)] shadow-[0_2px_10px_-3px_var(--sys-brand-solid-lch-30)] flex flex-col gap-4">
        <div class="flex justify-between items-start">
          <div class="w-10 h-10 rounded-xl bg-[var(--sys-brand-soft)] flex items-center justify-center text-[var(--sys-brand-solid)]">
            <span class="material-symbols-outlined">group</span>
          </div>
          <span class="px-2 py-1 rounded-md bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] text-xs font-bold">+2</span>
        </div>
        <div>
          <p class="text-[var(--sys-text-secondary)] text-sm font-medium mb-1">Tổng số nhân viên</p>
          <h3 class="text-2xl font-bold text-[var(--sys-text-primary)]">156</h3>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="bg-[var(--sys-bg-surface)] rounded-2xl p-5 border border-[var(--sys-border-subtle)] shadow-[0_2px_10px_-3px_var(--sys-brand-solid-lch-30)] flex flex-col gap-4">
        <div class="flex justify-between items-start">
          <div class="w-10 h-10 rounded-xl bg-[var(--sys-brand-soft)] flex items-center justify-center text-[var(--sys-brand-solid)]">
            <span class="material-symbols-outlined">monitoring</span>
          </div>
          <span class="px-2 py-1 rounded-md bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] text-xs font-bold">+1.5%</span>
        </div>
        <div>
          <p class="text-[var(--sys-text-secondary)] text-sm font-medium mb-1">Lương trung bình</p>
          <h3 class="text-2xl font-bold text-[var(--sys-text-primary)]">15.700.000đ</h3>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="bg-[var(--sys-bg-surface)] rounded-2xl p-5 border border-[var(--sys-border-subtle)] shadow-[0_2px_10px_-3px_var(--sys-brand-solid-lch-30)] flex flex-col gap-4">
        <div class="flex justify-between items-start">
          <div class="w-10 h-10 rounded-xl bg-[var(--sys-danger-soft)] flex items-center justify-center text-[var(--sys-danger-solid)]">
            <span class="material-symbols-outlined">account_balance_wallet</span>
          </div>
          <span class="px-2 py-1 rounded-md bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] text-xs font-bold">-0.8%</span>
        </div>
        <div>
          <p class="text-[var(--sys-text-secondary)] text-sm font-medium mb-1">Các khoản khấu trừ</p>
          <h3 class="text-2xl font-bold text-[var(--sys-text-primary)]">125.000.000đ</h3>
        </div>
      </div>
    </div>

    <!-- Main Content Box -->
    <div class="bg-[var(--sys-bg-surface)] rounded-2xl border border-[var(--sys-border-subtle)] shadow-[0_2px_10px_-3px_var(--sys-brand-solid-lch-30)] flex flex-col">
      <!-- Toolbar -->
      <div class="p-4 border-b border-[var(--sys-border-subtle)] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div class="flex flex-wrap items-center gap-3">
          <button class="flex items-center gap-2 px-3 py-2 bg-[var(--sys-bg-hover)] hover:bg-[var(--sys-bg-hover)] text-[var(--sys-text-primary)] rounded-lg border border-[var(--sys-border-subtle)] text-sm font-medium transition-colors">
            <span class="material-symbols-outlined text-[18px]">calendar_month</span>
            Tháng 10, 2023
            <span class="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
          <button class="flex items-center gap-2 px-3 py-2 bg-[var(--sys-bg-hover)] hover:bg-[var(--sys-bg-hover)] text-[var(--sys-text-primary)] rounded-lg border border-[var(--sys-border-subtle)] text-sm font-medium transition-colors">
            <span class="material-symbols-outlined text-[18px]">business</span>
            Tất cả phòng ban
            <span class="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
          <button class="flex items-center gap-2 px-3 py-2 bg-[var(--sys-bg-hover)] hover:bg-[var(--sys-bg-hover)] text-[var(--sys-text-primary)] rounded-lg border border-[var(--sys-border-subtle)] text-sm font-medium transition-colors">
            <span class="material-symbols-outlined text-[18px]">filter_list</span>
            Tất cả trạng thái
            <span class="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
        </div>

        <div class="flex flex-wrap lg:flex-nowrap items-center gap-3 w-full lg:w-auto">
          <button class="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] rounded-lg hover:bg-[var(--sys-success-soft)] font-medium text-sm transition-colors whitespace-nowrap min-w-fit">
            <span class="material-symbols-outlined text-[18px]">check_circle</span>
            Phê duyệt hàng loạt
          </button>
          <div class="relative w-full lg:w-64">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--sys-icon-default)] text-[20px]">search</span>
            <input type="text" placeholder="Tìm kiếm nhân viên..." class="w-full pl-10 pr-4 py-2 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all placeholder:text-[var(--sys-text-secondary)] text-[var(--sys-text-primary)]">
          </div>
        </div>
      </div>

      <!-- Table Section -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr class="bg-[var(--sys-bg-hover)] border-b border-[var(--sys-border-subtle)]">
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider">Nhân viên</th>
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider">Kỳ lương</th>
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider">Lương cơ bản</th>
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider">Tổng thu nhập</th>
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider">Khấu trừ</th>
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider">Thực nhận</th>
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider">Trạng thái</th>
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider text-center">Hành động</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--sys-border-subtle)]">
            <tr v-for="(item, index) in employees" :key="index" class="hover:bg-[var(--sys-bg-hover)] transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img :src="item.avatar" class="w-10 h-10 rounded-full object-cover border border-[var(--sys-border-subtle)]">
                  <div>
                    <div class="font-bold text-[var(--sys-text-primary)] text-sm">{{ item.name }}</div>
                    <div class="text-[11px] text-[var(--sys-text-secondary)] font-medium mt-0.5">ID: {{ item.id }} • {{ item.role }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm font-medium text-[var(--sys-text-secondary)]">{{ item.period }}</td>
              <td class="px-6 py-4 text-sm font-bold text-[var(--sys-text-primary)]">{{ item.baseSalary }}</td>
              <td class="px-6 py-4 text-sm font-bold text-[var(--sys-text-primary)]">{{ item.totalIncome }}</td>
              <td class="px-6 py-4 text-sm font-bold text-[var(--sys-danger-solid)]">{{ item.deduction }}</td>
              <td class="px-6 py-4 text-sm font-bold text-[var(--sys-brand-solid)]">{{ item.netSalary }}</td>
              <td class="px-6 py-4">
                <span 
                  class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-bold tracking-wide"
                  :class="{
                    'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)]': item.status === 'Đã thanh toán',
                    'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)]': item.status === 'Chờ thanh toán',
                    'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)]': item.status === 'Tạm khóa'
                  }"
                >
                  <span class="w-1.5 h-1.5 rounded-full" :class="{
                    'bg-[var(--sys-success-solid)]': item.status === 'Đã thanh toán',
                    'bg-[var(--sys-warning-solid)]': item.status === 'Chờ thanh toán',
                    'bg-[var(--sys-icon-default)]': item.status === 'Tạm khóa'
                  }"></span>
                  {{ item.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-1">
                  <button @click="openViewModal(item, index)" class="btn-action-icon text-[var(--sys-icon-default)] hover:text-[var(--sys-brand-solid)]" title="Xem chi tiết phiếu lương">
                    <span class="material-symbols-outlined">visibility</span>
                  </button>
                  <button @click="openEditModal(item, index)" class="btn-action-icon text-[var(--sys-icon-default)] hover:text-[var(--sys-brand-solid)]" title="Chỉnh sửa chi tiết">
                    <span class="material-symbols-outlined">edit</span>
                  </button>
                  <button @click="openDeleteModal(item, index)" class="btn-action-icon text-[var(--sys-icon-default)] hover:text-[var(--sys-danger-solid)]" title="Xóa bản ghi">
                    <span class="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="p-4 border-t border-[var(--sys-border-subtle)] flex flex-col sm:flex-row justify-between items-center gap-4">
        <div class="text-sm font-medium text-[var(--sys-text-secondary)]">
          Hiển thị <span class="text-[var(--sys-text-primary)] font-bold">1 - 10</span> trong số <span class="text-[var(--sys-text-primary)] font-bold">156</span> nhân viên
        </div>
        <div class="flex items-center gap-1.5">
          <button class="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--sys-text-secondary)] border border-transparent hover:border-[var(--sys-border-subtle)] hover:bg-[var(--sys-bg-hover)] transition-colors"><span class="material-symbols-outlined text-[18px]">chevron_left</span></button>
          
          <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--sys-brand-solid)] text-white font-bold text-sm shadow-[0_2px_8px_-2px_var(--sys-brand-solid-lch-30)] transition-all">1</button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--sys-text-secondary)] font-medium text-sm hover:bg-[var(--sys-bg-hover)] transition-colors">2</button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--sys-text-secondary)] font-medium text-sm hover:bg-[var(--sys-bg-hover)] transition-colors">3</button>
          <span class="w-8 h-8 flex items-center justify-center text-[var(--sys-text-secondary)] text-sm">...</span>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--sys-text-secondary)] font-medium text-sm hover:bg-[var(--sys-bg-hover)] transition-colors">16</button>
          
          <button class="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--sys-text-secondary)] border border-transparent hover:border-[var(--sys-border-subtle)] hover:bg-[var(--sys-bg-hover)] transition-colors"><span class="material-symbols-outlined text-[18px]">chevron_right</span></button>
        </div>
      </div>
    </div>

    <!-- Modal Thêm/Xem/Sửa Bảng lương -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
      >
        <div v-if="isAddEditModalOpen" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div class="fixed inset-0 w-screen h-screen bg-black/40 z-[9999] overflow-hidden backdrop-blur-sm" @click="closeModal"></div>
          <div class="relative z-[10000] bg-[var(--sys-bg-surface-elevated)] border border-[var(--sys-border-subtle)] w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-left transform transition-all">
            <div class="px-8 py-6 border-b border-[var(--sys-border-subtle)] flex justify-between items-center bg-[var(--sys-bg-surface-elevated)] text-left">
              <div class="flex items-center gap-3 text-left">
                <div class="w-12 h-12 rounded-xl bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center shadow-inner">
                  <span class="material-symbols-outlined text-2xl font-black">{{ modalMode === 'add' ? 'add_box' : (modalMode === 'edit' ? 'edit_document' : 'visibility') }}</span>
                </div>
                <div class="text-left">
                  <h3 class="text-xl font-black text-[var(--sys-text-primary)] text-left">{{ modalMode === 'add' ? 'Tạo bảng lương mới' : (modalMode === 'edit' ? 'Cập nhật bảng lương' : 'Chi tiết bảng lương') }}</h3>
                  <p class="text-xs font-bold text-[var(--sys-text-secondary)] mt-0.5 text-left italic">{{ modalMode === 'add' ? 'Nhập thông tin cho nhân viên mới' : (modalMode === 'edit' ? 'Sửa đổi chi tiết thanh toán' : 'Xem thông tin chi tiết thanh toán') }}</p>
                </div>
              </div>
              <button @click="closeModal" class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[var(--sys-bg-hover)] transition-all text-[var(--sys-text-secondary)]">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <div class="p-8 space-y-6 overflow-y-auto custom-scrollbar bg-[var(--sys-bg-hover)]">
              <div class="bg-[var(--sys-bg-surface-elevated)] p-6 rounded-[2rem] border border-[var(--sys-border-subtle)] shadow-sm space-y-4">
                <h4 class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-4 flex items-center gap-2 italic">
                  <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-[18px]">person</span> THÔNG TIN CƠ BẢN
                </h4>
                <div class="grid grid-cols-2 gap-5">
                  <div>
                    <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic text-left">Họ tên nhân viên *</label>
                    <input v-model="formData.name" :disabled="modalMode === 'view'" type="text" placeholder="VD: Nguyễn Văn A..." class="w-full px-4 py-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all text-left disabled:bg-[var(--sys-bg-hover)] text-[var(--sys-text-primary)]">
                  </div>
                  <div>
                    <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic text-left">Kỳ lương *</label>
                    <input v-model="formData.period" :disabled="modalMode === 'view'" type="text" placeholder="VD: 10/2023..." class="w-full px-4 py-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all text-left disabled:bg-[var(--sys-bg-hover)] text-[var(--sys-text-primary)]">
                  </div>
                </div>
              </div>

              <div class="bg-[var(--sys-bg-surface-elevated)] p-6 rounded-[2rem] border border-[var(--sys-border-subtle)] shadow-sm space-y-4">
                <h4 class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-4 flex items-center gap-2 italic">
                  <span class="material-symbols-outlined text-[var(--sys-success-solid)] text-[18px]">payments</span> CHI TIẾT ĐỊNH MỨC
                </h4>
                <div class="grid grid-cols-2 gap-5">
                  <div>
                    <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic text-left">Lương cơ bản (VND)</label>
                    <input v-model="formData.baseSalary" :disabled="modalMode === 'view'" type="text" class="w-full px-4 py-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all text-left disabled:bg-[var(--sys-bg-hover)] text-[var(--sys-text-primary)]">
                  </div>
                  <div>
                    <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic text-left">Tổng thu nhập (VND)</label>
                    <input v-model="formData.totalIncome" :disabled="modalMode === 'view'" type="text" class="w-full px-4 py-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-success-solid)]/5 focus:border-[var(--sys-success-solid)] transition-all text-left font-black text-[var(--sys-success-text)] disabled:bg-[var(--sys-bg-hover)]">
                  </div>
                  <div>
                    <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic text-left">Khấu trừ (VND)</label>
                    <input v-model="formData.deduction" :disabled="modalMode === 'view'" type="text" class="w-full px-4 py-3 bg-[var(--sys-danger-soft)] border border-[var(--sys-danger-border)] rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-danger-solid)]/5 focus:border-[var(--sys-danger-solid)] transition-all text-left font-black text-[var(--sys-danger-text)] disabled:bg-[var(--sys-bg-hover)]">
                  </div>
                  <div class="flex flex-col justify-end">
                    <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic text-left">Trạng thái thanh toán</label>
                    <Dropdown 
                      v-model="formData.status"
                      :options="payrollStatusOptions"
                      :disabled="modalMode === 'view'"
                      class="w-full"
                    />
                  </div>
                </div>
              </div>

              <div class="p-8 bg-[var(--sys-bg-surface-elevated)] rounded-[2.5rem] shadow-2xl text-left border border-[var(--sys-border-subtle)] relative overflow-hidden group">
                <div class="absolute top-0 right-0 w-32 h-32 bg-[var(--sys-brand-solid)]/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-[var(--sys-brand-solid)]/10 transition-all duration-700"></div>
                <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-[0.3em] mb-2 italic text-left">THỰC NHẬN DỰ KIẾN</p>
                <div class="flex items-end justify-between relative z-10">
                  <p class="text-4xl font-black text-[var(--sys-text-primary)] tracking-tighter text-left">
                    {{ formData.netSalary }} <span class="text-lg text-[var(--sys-brand-solid)] font-bold ml-1">VNĐ</span>
                  </p>
                  <div class="flex flex-col items-end">
                    <span class="px-4 py-1.5 bg-[var(--sys-brand-soft)] border border-[var(--sys-brand-border)] rounded-full text-[9px] font-black text-[var(--sys-brand-soft-text)] uppercase tracking-widest mb-1">AUTOMATED SYSTEM</span>
                    <span class="text-[10px] font-bold text-[var(--sys-text-secondary)] italic">Verify by FoxHRM </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="px-8 py-6 border-t border-[var(--sys-border-subtle)] flex justify-end gap-3 bg-[var(--sys-bg-surface-elevated)] text-left">
              <button @click="closeModal" class="px-6 py-2.5 min-h-[44px] text-sm font-bold text-[var(--sys-text-secondary)] hover:bg-[var(--sys-bg-hover)] rounded-lg transition-all uppercase tracking-widest italic">Hủy bỏ</button>
              
              <button v-if="modalMode === 'view'" @click="modalMode = 'edit'" type="button" class="px-8 py-2.5 min-h-[44px] bg-[var(--sys-warning-solid)] text-white rounded-lg text-sm font-black hover:bg-[var(--sys-warning-hover)] shadow-lg shadow-[var(--sys-warning-solid)]/20 transition-all uppercase tracking-widest flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px]">edit</span>
                Chỉnh sửa
              </button>
              
              <button v-else @click="saveData" type="button" class="px-8 py-2.5 min-h-[44px] bg-[var(--sys-brand-solid)] text-white rounded-lg text-sm font-black hover:bg-[var(--sys-brand-hover)] shadow-lg shadow-[var(--sys-brand-solid)]/20 transition-all uppercase tracking-widest flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px]">check_circle</span>
                {{ modalMode === 'add' ? 'Tạo mới' : 'Lưu cập nhật' }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- Modal Xác nhận Xóa -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
      >
        <div v-if="isDeleteModalOpen" class="fixed inset-0 z-[10001] flex items-center justify-center p-4">
          <div class="fixed inset-0 w-screen h-screen bg-black/40 z-[9999] overflow-hidden backdrop-blur-sm" @click="isDeleteModalOpen = false"></div>
          <div class="relative z-[10001] bg-[var(--sys-bg-surface-elevated)] border border-[var(--sys-border-subtle)] w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden p-8 text-left transform transition-all flex flex-col items-center text-center">
            <div class="w-20 h-20 bg-[var(--sys-danger-soft)] text-[var(--sys-danger-solid)] rounded-3xl flex items-center justify-center mb-6 border border-[var(--sys-danger-border)] shadow-inner">
              <span class="material-symbols-outlined text-4xl font-black">delete_forever</span>
            </div>
            <h3 class="text-2xl font-black text-[var(--sys-text-primary)] mb-2">Xác nhận xóa bản ghi?</h3>
            <p class="text-[var(--sys-text-secondary)] text-sm mb-8 leading-relaxed max-w-[280px]">
              Hệ thống sẽ xóa vĩnh viễn dữ liệu lương của nhân viên <span class="font-bold text-[var(--sys-text-primary)] uppercase underline decoration-[var(--sys-danger-soft)]">{{ selectedItem?.name }}</span>.
            </p>
            <div class="flex flex-col w-full gap-3">
              <button @click="confirmDelete" class="w-full py-4 bg-[var(--sys-danger-solid)] text-white rounded-2xl text-sm font-black hover:bg-[var(--sys-danger-hover)] shadow-xl shadow-[var(--sys-danger-solid)]/20 transition-all uppercase tracking-widest flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-[18px]">delete</span>
                Xác nhận xóa ngay
              </button>
              <button @click="isDeleteModalOpen = false" class="w-full py-3 text-xs font-black text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] uppercase tracking-widest transition-all italic">Hủy bỏ</button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Dropdown from '@/components/Dropdown.vue';

const payrollStatusOptions = [
  { label: 'Đã thanh toán', value: 'Đã thanh toán' },
  { label: 'Chờ thanh toán', value: 'Chờ thanh toán' },
  { label: 'Tạm khóa', value: 'Tạm khóa' }
];

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