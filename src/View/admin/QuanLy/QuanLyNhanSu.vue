<template>
 <div class="space-y-10 pb-10">
 <!-- Header Area -->
 <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-transparent text-left">
 <div class="bg-transparent text-left">
 <h1 class="text-3xl font-semibold text-[var(--sys-text-primary)] mb-1">Kiến trúc Nhân sự</h1>
 <p class="text-xs text-[var(--sys-text-secondary)] font-medium opacity-60">Quản lý hồ sơ, hợp đồng và lộ trình công tác chiến lược của toàn bộ lực lượng lao động.</p>
 </div>
 <div class="flex flex-col md:flex-row items-center gap-6 flex-1 w-full max-w-4xl bg-transparent">
 <!-- Search Bar -->
 <div class="relative flex-1 w-full group">
 <span class="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-xl text-[var(--sys-text-secondary)] opacity-40 group-focus-within:text-[var(--sys-brand-solid)] transition-all">search</span>
 <input 
 v-model="searchQuery"
 type="text" 
 placeholder="Truy vấn mã NV, tên nhân sự..." 
 class="w-full h-14 pl-16 pr-6 rounded-2xl bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[13px] font-semibold text-[var(--sys-text-primary)] focus:outline-none focus:border-[var(--sys-brand-solid)] transition-all shadow-sm"
 >
 </div>
 
 <div class="flex items-center gap-4 w-full md:w-auto">
 <Dropdown 
 v-model="filterDepartment"
 :options="departmentOptions"
 class="min-w-[200px]"
 />
 <Dropdown 
 v-model="filterStatus"
 :options="statusOptions"
 class="min-w-[200px]"
 />
 <button 
 @click="openAddModal" 
 class="h-14 px-10 bg-[var(--sys-brand-solid)] rounded-2xl font-bold text-white hover:bg-[var(--sys-brand-hover)] active:scale-95 shadow-xl shadow-[var(--sys-brand-solid)]/20 transition-all flex items-center gap-3 text-xs whitespace-nowrap"
 >
 <span class="material-symbols-outlined text-xl">person_add</span>
 Tiếp nhận hồ sơ
 </button>
 </div>
 </div>
 </div>

 <!-- Stats Section -->
 <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
 <div v-for="stat in stats" :key="stat.label" 
 class="bg-[var(--sys-bg-surface)] p-8 rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-500 group relative overflow-hidden">
 <div class="absolute top-0 right-0 w-40 h-40 bg-[var(--sys-brand-soft)] rounded-full -mr-20 -mt-20 opacity-0 group-hover:opacity-40 transition-all duration-700 blur-3xl"></div>
 <div class="flex flex-col gap-8 relative z-10 bg-transparent text-left">
 <div :class="`w-16 h-16 rounded-[1.5rem] flex items-center justify-center border transition-all shadow-lg ${
 stat.semantic === 'brand' ? 'bg-[var(--sys-brand-soft)] border-[var(--sys-brand-border)] text-[var(--sys-brand-solid)]' :
 stat.semantic === 'warning' ? 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]' :
 stat.semantic === 'danger' ? 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]' :
 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]'
 }`">
 <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">{{ stat.icon }}</span>
 </div>
 <div class="bg-transparent text-left">
 <p class="text-xs font-bold text-[var(--sys-text-secondary)] mb-2 opacity-50">{{ stat.label }}</p>
 <p class="text-4xl font-semibold text-[var(--sys-text-primary)] ">{{ stat.value }}</p>
 </div>
 </div>
 </div>
 </div>

 <!-- Main Data Table -->
 <div class="bg-[var(--sys-bg-surface)] rounded-[3rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-500">
 <div class="overflow-x-auto custom-scrollbar">
 <table class="min-w-max w-full text-left border-separate border-spacing-0">
 <thead>
 <tr>
 <th class="whitespace-nowrap px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Hồ sơ định danh</th>
 <th class="whitespace-nowrap px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Bộ phận / Vị trí</th>
 <th class="whitespace-nowrap px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-center">Gia nhập</th>
 <th class="whitespace-nowrap px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-center">Tình trạng</th>
 <th class="whitespace-nowrap px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Quản lý</th>
 </tr>
 </thead>
 <tbody class="bg-transparent">
 <tr v-for="emp in filteredEmployees" :key="emp.id" 
 class="group transition-all duration-300 bg-transparent hover:bg-[var(--sys-bg-hover)]">
 <td class="px-8 py-3 bg-transparent border-b border-[var(--sys-border-subtle)] whitespace-nowrap">
 <div class="flex flex-col bg-transparent">
 <span class="text-sm font-semibold text-[var(--sys-text-primary)] mb-0.5">{{ emp.full_name }}</span>
 <span class="text-xs font-medium text-[var(--sys-brand-solid)] opacity-60">{{ emp.employee_code }}</span>
 </div>
 </td>
 <td class="px-8 py-3 bg-transparent border-b border-[var(--sys-border-subtle)] whitespace-nowrap">
 <div class="flex flex-col bg-transparent text-left">
 <span class="text-sm font-semibold text-[var(--sys-text-primary)] mb-0.5">{{ emp.department }}</span>
 <span class="text-xs font-medium text-[var(--sys-text-secondary)] opacity-50">{{ emp.position }}</span>
 </div>
 </td>
 <td class="px-6 py-3 text-center bg-transparent border-b border-[var(--sys-border-subtle)] whitespace-nowrap">
 <span class="text-sm font-medium text-[var(--sys-text-secondary)] opacity-60">{{ emp.hire_date }}</span>
 </td>
 <td class="px-6 py-3 text-center bg-transparent border-b border-[var(--sys-border-subtle)] whitespace-nowrap">
 <span :class="[
 'px-3 py-1 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 border transition-all shadow-sm',
 getStatusBadgeClass(emp.status)
 ]">
 <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(emp.status)"></span>
 {{ emp.status.split('_').join(' ') }}
 </span>
 </td>
 <td class="px-8 py-3 text-right bg-transparent border-b border-[var(--sys-border-subtle)] whitespace-nowrap">
 <div class="flex items-center justify-end gap-2 bg-transparent">
 <button 
 @click="editEmployee(emp)" 
 class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-icon-default)] hover:text-[var(--sys-brand-solid)] hover:border-[var(--sys-brand-solid)] hover:shadow-md active:scale-95 transition-all"
 title="Chỉnh sửa hồ sơ"
 >
 <span class="material-symbols-outlined text-[18px]">account_box</span>
 </button>
 <button 
 @click="confirmResign(emp)" 
 class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-icon-default)] hover:text-[var(--sys-danger-solid)] hover:border-[var(--sys-danger-border)] hover:shadow-md active:scale-95 transition-all" 
 title="Thôi việc"
 >
 <span class="material-symbols-outlined text-[18px]">person_remove</span>
 </button>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 </div>
 <div class="px-12 py-8 bg-[var(--sys-bg-page)]/30 border-t border-[var(--sys-border-subtle)] flex justify-end">
 <button class="group/more text-[var(--sys-brand-solid)] text-[10px] font-semibold hover:opacity-80 transition-all flex items-center gap-4 active:scale-95 bg-transparent border-0 outline-none">
 Truy xuất toàn bộ danh mục nhân sự 
 <div class="w-10 h-10 rounded-full bg-[var(--sys-brand-soft)] flex items-center justify-center border border-[var(--sys-brand-border)] group-hover/more:translate-x-2 transition-transform">
 <span class="material-symbols-outlined text-xl">arrow_right_alt</span>
 </div>
 </button>
 </div>
 </div>

 <!-- Add/Edit Modal System -->
 <Teleport to="body">
 <Transition
 enter-active-class="transition ease-out duration-300"
 enter-from-class="opacity-0 scale-95 translate-y-8 blur-lg"
 enter-to-class="opacity-100 scale-100 translate-y-0 blur-0"
 leave-active-class="transition ease-in duration-200"
 leave-from-class="opacity-100 scale-100 translate-y-0 blur-0"
 leave-to-class="opacity-0 scale-95 translate-y-8 blur-lg"
 >
 <div v-if="showModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-10">
 <div class="fixed inset-0 w-screen h-screen bg-black/60 z-[9999] backdrop-blur-xl" @click="showModal = false"></div>
 <div class="relative z-[10000] bg-[var(--sys-bg-surface-elevated)] border border-[var(--sys-border-subtle)] w-full max-w-7xl max-h-[90vh] rounded-[3.5rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col transform transition-all text-left">
 <!-- Modal Header -->
 <div class="px-12 py-10 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-transparent">
 <div class="text-left bg-transparent">
 <h3 class="text-2xl font-bold text-[var(--sys-text-primary)] m-0">{{ editMode ? 'Điều chỉnh Hồ sơ Nhân sự' : 'Tiếp nhận Nhân sự mới' }}</h3>
 <p class="text-[10px] text-[var(--sys-text-secondary)] font-bold mt-2 opacity-40">Thông tin hồ sơ nhân sự và lộ trình công việc</p>
 </div>
 <button @click="showModal = false" class="w-14 h-14 flex items-center justify-center rounded-[1.5rem] bg-[var(--sys-bg-hover)] hover:text-[var(--sys-brand-solid)] hover:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)] active:scale-90 shadow-sm">
 <span class="material-symbols-outlined text-2xl">close</span>
 </button>
 </div>

 <!-- Modal Body -->
 <div class="flex-1 overflow-y-auto p-12 md:p-16 custom-scrollbar bg-transparent">
 <div class="grid grid-cols-1 lg:grid-cols-2 gap-20">
 <!-- Personal Identification Info -->
 <div class="space-y-12 bg-transparent">
 <h4 class="text-[11px] font-semibold text-[var(--sys-brand-solid)] flex items-center gap-5 opacity-80">
 <span class="w-3 h-8 bg-[var(--sys-brand-solid)] rounded-full shadow-lg shadow-[var(--sys-brand-solid)]/30"></span> 01. Định danh Nhân thân
 </h4>
 
 <div class="space-y-8 bg-transparent">
 <div class="group text-left bg-transparent">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-4 opacity-100 block mb-4 text-left">Họ và tên khai sinh chính thức (Hợp nhất) *</label>
 <input v-model="form.full_name" type="text" placeholder="VD: NGUYỄN VĂN A" class="w-full px-8 py-5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-[1.5rem] text-[15px] font-semibold focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-inner outline-none text-left placeholder:opacity-30">
 </div>
 
 <div class="grid grid-cols-1 md:grid-cols-2 gap-10 text-left bg-transparent">
 <div class="space-y-4 text-left bg-transparent">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-4 opacity-100 block">Thời điểm khai sinh</label>
 <input v-model="form.date_of_birth" type="date" class="w-full px-8 py-5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-[1.5rem] text-sm font-semibold focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-inner outline-none text-left">
 </div>
 <div class="space-y-4 text-left bg-transparent">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-4 opacity-100 block">Giới tính định danh</label>
 <Dropdown 
 v-model="form.gender"
 :options="genderOptions"
 class="w-full"
 />
 </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-2 gap-10 text-left bg-transparent">
 <div class="space-y-4 text-left bg-transparent">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-4 opacity-100 block">Kênh liên lạc khẩn cấp *</label>
 <input v-model="form.phone_number" type="tel" placeholder="09xxx..." class="w-full px-8 py-5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-[1.5rem] text-sm font-semibold focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-inner outline-none text-left placeholder:opacity-30">
 </div>
 <div class="space-y-4 text-left bg-transparent">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-4 opacity-100 block">Số định danh CCCD / Passport *</label>
 <input v-model="form.id_card" type="text" placeholder="001..." class="w-full px-8 py-5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-[1.5rem] text-sm font-semibold focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-inner outline-none text-left placeholder:opacity-30">
 </div>
 </div>

 <div class="space-y-4 text-left bg-transparent">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-4 opacity-100 block">Thư điện tử lưu chuyển cá nhân</label>
 <input v-model="form.personal_email" type="email" placeholder="example@global.com" class="w-full px-8 py-5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-[1.5rem] text-sm font-semibold focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-inner outline-none text-left placeholder:opacity-30">
 </div>

 <div class="space-y-4 text-left bg-transparent">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-4 opacity-100 block">Địa chỉ thường trú pháp lý</label>
 <textarea v-model="form.permanent_address" rows="3" placeholder="Chi tiết định vị pháp lý của nhân sự..." class="w-full px-8 py-6 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-[2rem] text-sm font-semibold focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-inner outline-none resize-none text-left placeholder:opacity-30"></textarea>
 </div>
 </div>
 </div>

 <!-- Strategic Job Placement System -->
 <div class="space-y-12 bg-transparent">
 <h4 class="text-[11px] font-semibold text-[var(--sys-success-text)] flex items-center gap-5 opacity-80">
 <span class="w-3 h-8 bg-[var(--sys-success-solid)] rounded-full shadow-lg shadow-[var(--sys-success-solid)]/30"></span> 02. Lộ trình Công vụ Chiến lược
 </h4>
 
 <div class="space-y-10 bg-transparent text-left">
 <div class="grid grid-cols-1 md:grid-cols-2 gap-10 text-left bg-transparent">
 <div class="space-y-4 text-left bg-transparent">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-4 opacity-100 block">Phòng ban bổ nhiệm *</label>
 <Dropdown 
 v-model="form.department"
 :options="departmentFormOptions"
 class="w-full"
 />
 </div>
 <div class="space-y-4 text-left bg-transparent">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-4 opacity-100 block">Chức vụ phái cử *</label>
 <Dropdown 
 v-model="form.position"
 :options="positionOptionsList"
 class="w-full"
 />
 </div>
 </div>

 <div class="space-y-4 text-left bg-transparent">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-4 opacity-100 block">Tài khoản thư điện tử công vụ *</label>
 <div class="relative group bg-transparent">
 <span class="absolute left-8 top-1/2 -translate-y-1/2 material-symbols-outlined text-[var(--sys-brand-solid)] text-2xl opacity-40">alternate_email</span>
 <input v-model="form.company_email" type="email" placeholder="official@enterprise.com" class="w-full pl-20 pr-8 py-5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-[1.5rem] text-[15px] font-semibold focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-inner outline-none text-left placeholder:opacity-30">
 </div>
 </div>

 <div class="grid grid-cols-1 md:grid-cols-2 gap-10 text-left bg-transparent">
 <div class="space-y-4 text-left bg-transparent">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-4 opacity-100 block">Ngày kích hoạt lộ trình *</label>
 <input v-model="form.hire_date" type="date" class="w-full px-8 py-5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-[1.5rem] text-sm font-semibold focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] shadow-inner outline-none text-left">
 </div>
 <div class="space-y-4 text-left bg-transparent">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-4 opacity-100 block">Trạng thái định tính công vụ</label>
 <Dropdown 
 v-model="form.status"
 :options="statusOptionsForm"
 class="w-full"
 />
 </div>
 </div>

 <!-- Digital ID Card Simulation -->
 <div class="p-12 bg-gradient-to-br from-[var(--sys-brand-soft)] to-white rounded-[3.5rem] border border-[var(--sys-brand-solid)] border-dashed transition-all hover:translate-y-[-8px] hover:shadow-3xl hover:shadow-[var(--sys-brand-solid)]/20 relative overflow-hidden group/id-big">
 <div class="absolute inset-0 bg-white/20 opacity-0 group-hover/id-big:opacity-100 transition-opacity duration-700"></div>
 <div class="flex flex-col gap-8 relative z-10 bg-transparent text-left">
 <div class="flex items-center justify-between bg-transparent">
 <div class="bg-transparent text-left">
 <p class="text-[11px] font-semibold text-[var(--sys-brand-solid)] m-0">Corporate Digital Identity</p>
 <p class="text-[9px] font-bold text-[var(--sys-text-secondary)] mt-2 opacity-50">Enterprise Resource Management System</p>
 </div>
 <span class="material-symbols-outlined text-5xl text-[var(--sys-brand-solid)] opacity-20">biotech</span>
 </div>
 <div class="flex items-center gap-10 bg-transparent text-left">
 <div class="w-28 h-28 rounded-[2rem] bg-white flex items-center justify-center shadow-2xl border border-[var(--sys-brand-soft)] relative">
 <span class="material-symbols-outlined text-6xl text-[var(--sys-brand-solid)]">qr_code_2</span>
 <div class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[var(--sys-success-solid)] border-4 border-white shadow-lg"></div>
 </div>
 <div class="bg-transparent text-left">
 <p class="text-5xl font-semibold text-[var(--sys-brand-solid)] m-0 ">{{ form.employee_code || 'EMP-XXXX-XXX' }}</p>
 <div class="flex items-center gap-3 mt-4 bg-transparent whitespace-nowrap">
 <span class="px-3 py-1 bg-[var(--sys-brand-solid)] text-white text-[8px] font-semibold rounded-lg">Validated Identity</span>
 <span class="text-[9px] font-semibold text-[var(--sys-text-secondary)] opacity-40 ">Active Access Node</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>

 <!-- Modal Fixed Footer -->
 <div class="px-12 py-10 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface-elevated)] flex justify-end gap-6">
 <button @click="showModal = false" class="px-12 py-5 text-[10px] font-semibold text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] transition-all active:scale-95 bg-transparent border-none">Hủy bỏ tiến trình</button>
 <button @click="saveEmployee" class="px-16 py-5 bg-[var(--sys-brand-solid)] text-white rounded-[1.8rem] text-[10px] font-semibold hover:bg-[var(--sys-brand-hover)] shadow-2xl shadow-[var(--sys-brand-solid)]/30 transition-all flex items-center gap-4 active:scale-95 border-none">
 <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'wght' 700;">shield_person</span>
 {{ editMode ? 'Phê chuẩn cập nhật định danh' : 'Xác nhận tiếp nhận chính thức' }}
 </button>
 </div>
 </div>
 </div>
 </Transition>
 </Teleport>
 </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Dropdown from '@/components/Dropdown.vue';
import { useConfirm } from '@/composables/useConfirm';

const { showAlert, showConfirm } = useConfirm();

const employees = ref([
 { 
 id: 1, 
 employee_code: 'EMP-2023-001', 
 full_name: 'Nguyễn Văn An', 
 department: 'Công nghệ thông tin', 
 position: 'Frontend Developer', 
 status: 'ĐANG_LÀM_VIỆC', 
 hire_date: '10/05/2023',
 gender: 'NAM',
 phone_number: '0912345678',
 id_card: '001099002345',
 company_email: 'an.nv@company.com',
 personal_email: 'an.dev@gmail.com',
 date_of_birth: '1995-05-10',
 permanent_address: '123 Đường Láng, Hà Nội'
 },
 { 
 id: 2, 
 employee_code: 'EMP-2023-005', 
 full_name: 'Trần Thị Thu', 
 department: 'Nhân sự', 
 position: 'HR Executive', 
 status: 'ĐANG_LÀM_VIỆC', 
 hire_date: '01/08/2023',
 gender: 'NỮ',
 phone_number: '0901234888',
 id_card: '001095006789',
 company_email: 'thu.tt@company.com',
 personal_email: 'thu.tran@gmail.com',
 date_of_birth: '1990-08-01',
 permanent_address: 'Ngõ 2, Lạch Tray, Hải Phòng'
 }
]);

const searchQuery = ref('');
const filterDepartment = ref('ALL');
const filterStatus = ref('ALL');
const showModal = ref(false);
const editMode = ref(false);

const stats = ref([
 { label: 'Tổng lực lượng nhân sự', value: '1,250', icon: 'groups', semantic: 'brand' },
 { label: 'Tiến trình thử việc', value: '24', icon: 'explore', semantic: 'warning' },
 { label: 'Vắng mặt định danh', value: '12', icon: 'person_off', semantic: 'danger' },
 { label: 'Sự kiện tri ân', value: '45', icon: 'cake', semantic: 'success' }
]);

const departments = ['Công nghệ thông tin', 'Nhân sự', 'Tài chính - Kế toán', 'Marketing', 'Kinh doanh', 'Vận hành'];
const departmentOptions = computed(() => [
 { label: 'Mọi phòng ban', value: 'ALL' },
 ...departments.map(dept => ({ label: dept, value: dept }))
]);

const statusOptions = [
 { label: 'Mọi trạng thái', value: 'ALL' },
 { label: 'Đang làm việc', value: 'ĐANG_LÀM_VIỆC' },
 { label: 'Trong thử việc', value: 'THỬ_VIỆC' },
 { label: 'Đã thôi việc', value: 'ĐÃ_NGHỈ_VIỆC' }
];

const positions = ['Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'HR Manager', 'HR Executive', 'Accountant', 'Sales Lead'];

const genderOptions = [
 { label: 'Nam giới', value: 'NAM' },
 { label: 'Nữ giới', value: 'NỮ' },
 { label: 'Định danh khác', value: 'KHÁC' }
];

const departmentFormOptions = departments.map(dept => ({ label: dept, value: dept }));
const positionOptionsList = positions.map(pos => ({ label: pos, value: pos }));

const statusOptionsForm = [
 { label: 'Đang làm việc chính thức', value: 'ĐANG_LÀM_VIỆC' },
 { label: 'Đang trong thời gian thử việc', value: 'THỬ_VIỆC' },
 { label: 'Hợp đồng đã chấm dứt', value: 'ĐÃ_NGHỈ_VIỆC' }
];

const emptyForm = {
 full_name: '',
 date_of_birth: '',
 gender: 'NAM',
 phone_number: '',
 id_card: '',
 personal_email: '',
 permanent_address: '',
 department: 'Công nghệ thông tin',
 position: 'Frontend Developer',
 company_email: '',
 hire_date: new Date().toISOString().substr(0, 10),
 status: 'THỬ_VIỆC',
 employee_code: ''
};

const form = ref({ ...emptyForm });

const filteredEmployees = computed(() => {
 let list = employees.value;
 if (filterDepartment.value !== 'ALL') {
 list = list.filter(e => e.department === filterDepartment.value);
 }
 if (filterStatus.value !== 'ALL') {
 list = list.filter(e => e.status === filterStatus.value);
 }
 if (searchQuery.value) {
 const q = searchQuery.value.toLowerCase();
 list = list.filter(e => 
 e.full_name.toLowerCase().includes(q) || 
 e.employee_code.toLowerCase().includes(q)
 );
 }
 return list;
});

const getStatusBadgeClass = (status) => {
 switch (status) {
 case 'ĐANG_LÀM_VIỆC': return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
 case 'THỬ_VIỆC': return 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)]';
 case 'ĐÃ_NGHỈ_VIỆC': return 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]';
 default: return 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border-[var(--sys-border-subtle)]';
 }
};

const getStatusDotClass = (status) => {
 switch (status) {
 case 'ĐANG_LÀM_VIỆC': return 'bg-[var(--sys-success-solid)]';
 case 'THỬ_VIỆC': return 'bg-[var(--sys-brand-solid)]';
 case 'ĐÃ_NGHỈ_VIỆC': return 'bg-[var(--sys-danger-solid)]';
 default: return 'bg-[var(--sys-icon-default)] opacity-40';
 }
};

const openAddModal = () => {
 editMode.value = false;
 form.value = { ...emptyForm };
 form.value.employee_code = `EMP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
 showModal.value = true;
};

const editEmployee = (emp) => {
 editMode.value = true;
 form.value = { ...emp };
 if (form.value.date_of_birth && form.value.date_of_birth.includes('/')) {
 const parts = form.value.date_of_birth.split('/');
 form.value.date_of_birth = `${parts[2]}-${parts[1]}-${parts[0]}`;
 }
 showModal.value = true;
};

const saveEmployee = async () => {
 if (!form.value.full_name || !form.value.company_email) {
 await showAlert('Ràng buộc dữ liệu', 'Vui lòng cung cấp đầy đủ thông tin định danh và email công vụ!');
 return;
 }
 if (editMode.value) {
 const index = employees.value.findIndex(e => e.id === form.value.id);
 if (index !== -1) employees.value[index] = { ...form.value };
 } else {
 employees.value.unshift({
 ...form.value,
 id: Date.now(),
 hire_date: new Date(form.value.hire_date).toLocaleDateString('vi-VN')
 });
 }
 showModal.value = false;
};

const confirmResign = async (emp) => {
 const ok = await showConfirm('Kết thúc Công tác', `Bạn có chắc muốn thực hiện quy trình thôi việc cho nhân sự ${emp.full_name}? Mọi quyền truy cập sẽ bị thu hồi.`);
 if (ok) {
 emp.status = 'ĐÃ_NGHỈ_VIỆC';
 }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
 width: 6px;
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

.space-y-10 {
 animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
 from { opacity: 0; transform: translateY(20px); }
 to { opacity: 1; transform: translateY(0); }
}

.material-symbols-outlined {
 font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24;
}
</style>
