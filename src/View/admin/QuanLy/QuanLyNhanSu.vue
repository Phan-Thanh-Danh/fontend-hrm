<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-[var(--sys-text-primary)] tracking-tight">Quản lý Nhân sự</h1>
        <p class="text-[var(--sys-text-secondary)] text-sm font-medium italic">Quản lý hồ sơ, hợp đồng và lộ trình công tác của nhân viên.</p>
      </div>
      <div class="flex flex-col md:flex-row items-center gap-3 flex-1 w-full">
        <!-- Search Bar (flex-1 - Co giãn tối đa) -->
        <div class="relative flex-1 w-full group">
          <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[18px] text-[var(--sys-text-secondary)] opacity-50 group-focus-within:text-[var(--sys-brand-solid)] group-focus-within:opacity-100 transition-all">search</span>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Tìm mã NV, tên..." 
            class="w-full h-11 pl-11 pr-4 bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold focus:outline-none focus:border-[var(--sys-brand-solid)] focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 transition-all text-[var(--sys-text-primary)]"
          >
        </div>
        
        <!-- Action Group (Cụm Dropdown & Button) -->
        <div class="flex items-center gap-2 w-full md:w-auto shrink-0">
          <Dropdown 
            v-model="filterDepartment"
            :options="departmentOptions"
            placeholder="Phòng ban"
          />

          <Dropdown 
            v-model="filterStatus"
            :options="statusOptions"
            placeholder="Trạng thái"
          />

          <button 
            @click="openAddModal"
            class="h-11 px-6 bg-[var(--sys-brand-solid)] rounded-xl font-bold text-white hover:brightness-110 shadow-sm shadow-[var(--sys-brand-solid)]/20 active:scale-95 transition-all flex items-center gap-2 uppercase tracking-widest text-[11px] whitespace-nowrap"
          >
            <span class="material-symbols-outlined text-[18px]">person_add</span>
            Thêm nhân sự
          </button>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in stats" :key="stat.label" class="bg-[var(--sys-bg-surface)] p-6 rounded-[2rem] border border-[var(--sys-border-subtle)] shadow-sm hover:shadow-xl transition-all duration-300">
        <div class="flex items-center gap-5">
          <div :class="`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner`" :style="`background-color: var(--sys-${stat.semantic}-soft); color: var(--sys-${stat.semantic}-solid);` ">
            <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">{{ stat.icon }}</span>
          </div>
          <div>
            <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1 italic opacity-70">{{ stat.label }}</p>
            <p class="text-2xl font-black text-[var(--sys-text-primary)] leading-none tracking-tight">{{ stat.value }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden">
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr>
              <th class="px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Nhân viên</th>
              <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Phòng ban / Chức vụ</th>
              <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-center">Ngày vào làm</th>
              <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Trạng thái</th>
              <th class="px-8 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="emp in filteredEmployees" :key="emp.id" 
                class="group transition-all duration-200 bg-[var(--sys-bg-surface)] hover:bg-[var(--sys-bg-hover)]">
              <td class="px-8 py-5 bg-transparent border-b border-[var(--sys-border-subtle)]">
                <div class="flex flex-col bg-transparent">
                  <span class="text-sm font-black text-[var(--sys-text-primary)] mb-0.5 bg-transparent">{{ emp.full_name }}</span>
                  <span class="text-[10px] font-bold text-[var(--sys-brand-solid)] uppercase tracking-tight bg-transparent">{{ emp.employee_code }}</span>
                </div>
              </td>
              <td class="px-6 py-5 bg-transparent border-b border-[var(--sys-border-subtle)]">
                <div class="flex flex-col bg-transparent text-left">
                  <span class="text-sm font-bold text-[var(--sys-text-primary)] mb-0.5 bg-transparent text-left">{{ emp.department }}</span>
                  <span class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-tight opacity-60 italic bg-transparent text-left">{{ emp.position }}</span>
                </div>
              </td>
              <td class="px-6 py-5 text-center bg-transparent border-b border-[var(--sys-border-subtle)]">
                <span class="text-[10px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-tight opacity-60 italic bg-transparent">{{ emp.hire_date }}</span>
              </td>
              <td class="px-6 py-5 bg-transparent border-b border-[var(--sys-border-subtle)]">
                <div :class="[
                  'px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 border transition-all shadow-sm',
                  getStatusBadgeClass(emp.status)
                ]">
                  <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(emp.status)"></span>
                  {{ emp.status.split('_').join(' ') }}
                </div>
              </td>
              <td class="px-8 py-5 text-right bg-transparent border-b border-[var(--sys-border-subtle)]">
                <div class="flex items-center justify-end gap-3 bg-transparent">
                  <button 
                    @click="editEmployee(emp)" 
                    class="w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-[var(--sys-bg-page)]/50 border border-[var(--sys-border-subtle)] text-[var(--sys-text-secondary)] hover:text-[var(--sys-brand-solid)] hover:border-[var(--sys-brand-solid)] shadow-sm active:scale-95"
                    title="Chỉnh sửa hồ sơ"
                  >
                    <span class="material-symbols-outlined text-lg">edit_note</span>
                  </button>
                  <button 
                    @click="confirmResign(emp)" 
                    class="w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-[var(--sys-bg-page)]/50 border border-[var(--sys-border-subtle)] text-[var(--sys-text-secondary)] hover:text-[var(--sys-danger-solid)] hover:border-[var(--sys-danger-border)] shadow-sm active:scale-95" 
                    title="Chuyển trạng thái nghỉ việc"
                  >
                    <span class="material-symbols-outlined text-lg">person_off</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
      >
        <div v-if="showModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div class="fixed inset-0 w-screen h-screen bg-black/40 z-[9999] overflow-hidden backdrop-blur-sm" @click="showModal = false"></div>
          <div class="relative z-[10000] bg-[var(--sys-bg-surface-elevated)] border border-[var(--sys-border-subtle)] w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all text-left">
            <!-- Modal Header -->
            <div class="px-10 py-8 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-[var(--sys-bg-surface-elevated)] text-left">
              <div class="text-left">
                <h3 class="text-xl font-black text-[var(--sys-text-primary)] text-left">{{ editMode ? 'Cập nhật hồ sơ' : 'Thêm nhân viên mới' }}</h3>
                <p class="text-sm text-[var(--sys-text-secondary)] font-medium italic text-left">Vui lòng điền các thông tin bắt buộc (*)</p>
              </div>
              <button @click="showModal = false" class="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-[var(--sys-bg-hover)] transition-all text-[var(--sys-text-secondary)]">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <!-- Modal Body (Scrollable) -->
            <div class="flex-1 overflow-y-auto p-10 custom-scrollbar">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                <!-- Left: Personal Info -->
                <div class="space-y-6">
                  <h4 class="text-xs font-black text-[var(--sys-brand-solid)] uppercase tracking-[0.2em] flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-[var(--sys-brand-solid)] animate-pulse"></span> Thông tin cá nhân
                  </h4>
                  
                  <div class="space-y-4">
                    <div class="group">
                      <label class="block text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic">Họ và tên *</label>
                      <input v-model="form.full_name" type="text" placeholder="VD: Nguyễn Văn A" class="w-full px-5 py-3.5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)]">
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="block text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic">Ngày sinh</label>
                        <input v-model="form.date_of_birth" type="date" class="w-full px-5 py-3.5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)]">
                      </div>
                      <div>
                        <label class="block text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic">Giới tính</label>
                        <Dropdown 
                          v-model="form.gender"
                          :options="genderOptions"
                          class="w-full"
                        />
                      </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                       <div>
                        <label class="block text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic">Số điện thoại *</label>
                        <input v-model="form.phone_number" type="tel" placeholder="09xxx..." class="w-full px-5 py-3.5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)]">
                      </div>
                       <div>
                        <label class="block text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic">Số CCCD *</label>
                        <input v-model="form.id_card" type="text" placeholder="001..." class="w-full px-5 py-3.5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)]">
                      </div>
                    </div>

                    <div>
                      <label class="block text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic">Email cá nhân</label>
                      <input v-model="form.personal_email" type="email" placeholder="user@gmail.com" class="w-full px-5 py-3.5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)]">
                    </div>

                    <div>
                      <label class="block text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic">Địa chỉ thường trú</label>
                      <textarea v-model="form.permanent_address" rows="1" placeholder="Số nhà, đường, phường/xã..." class="w-full px-5 py-3.5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)]"></textarea>
                    </div>
                  </div>
                </div>

                <!-- Right: Job Info -->
                <div class="space-y-6">
                  <h4 class="text-xs font-black text-[var(--sys-success-solid)] uppercase tracking-[0.2em] flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-[var(--sys-success-solid)] animate-pulse"></span> Thông tin công việc
                  </h4>
                  
                  <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                       <div>
                        <label class="block text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic">Phòng ban *</label>
                        <Dropdown 
                          v-model="form.department"
                          :options="departmentFormOptions"
                          class="w-full"
                        />
                      </div>
                       <div>
                        <label class="block text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic">Chức vụ *</label>
                        <Dropdown 
                          v-model="form.position"
                          :options="positionOptionsList"
                          class="w-full"
                        />
                      </div>
                    </div>

                     <div>
                      <label class="block text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic">Email công ty *</label>
                      <input v-model="form.company_email" type="email" placeholder="user@company.com" class="w-full px-5 py-3.5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)]">
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="block text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic">Ngày vào làm *</label>
                        <input v-model="form.hire_date" type="date" class="w-full px-5 py-3.5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)]">
                      </div>
                      <div>
                        <label class="block text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic">Trạng thái</label>
                        <Dropdown 
                          v-model="form.status"
                          :options="statusOptionsForm"
                          class="w-full"
                        />
                      </div>
                    </div>

                    <div class="p-5 bg-[var(--sys-brand-soft)] rounded-3xl border border-[var(--sys-brand-solid)] shadow-inner">
                      <p class="text-[10px] font-black text-[var(--sys-brand-soft-text)] uppercase tracking-widest mb-2 italic">Mã nhân viên (Hệ thống tự tạo)</p>
                      <p class="text-xl font-black text-[var(--sys-brand-soft-text)] tracking-wider">{{ form.employee_code || 'EMP-XXXX-XXX' }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="px-10 py-8 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface-elevated)] flex items-center justify-end gap-3">
              <button @click="showModal = false" class="px-8 py-3.5 text-sm font-black text-[var(--sys-text-secondary)] hover:text-[var(--sys-text-primary)] rounded-2xl transition-all">Đóng</button>
              <button @click="saveEmployee" class="px-10 py-3.5 bg-[var(--sys-brand-solid)] text-white rounded-2xl text-sm font-black hover:bg-[var(--sys-brand-hover)] shadow-xl shadow-[var(--sys-brand-solid)]/20 transition-all">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-sm">save</span>
                  {{ editMode ? 'Cập nhật hồ sơ' : 'Lưu nhân viên' }}
                </div>
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

// Initial Mock Data
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
    permanent_address: 'Ngõ 2, Hải Phòng'
  }
]);

const searchQuery = ref('');
const filterDepartment = ref('ALL');
const filterStatus = ref('ALL');
const showModal = ref(false);
const editMode = ref(false);

const stats = ref([
  { label: 'Tổng nhân sự', value: '1,250', icon: 'groups', semantic: 'brand' },
  { label: 'Thử việc mới', value: '24', icon: 'person_add', semantic: 'warning' },
  { label: 'Nghỉ phép today', value: '12', icon: 'event_busy', semantic: 'danger' },
  { label: 'Sinh nhật tháng', value: '45', icon: 'cake', semantic: 'success' }
]);

const departments = ['Công nghệ thông tin', 'Nhân sự', 'Tài chính - Kế toán', 'Marketing', 'Kinh doanh', 'Vận hành'];
const departmentOptions = computed(() => [
  { label: 'Tất cả phòng ban', value: 'ALL' },
  ...departments.map(dept => ({ label: dept, value: dept }))
]);

const statusOptions = [
  { label: 'Tất cả trạng thái', value: 'ALL' },
  { label: 'Đang làm việc', value: 'ĐANG_LÀM_VIỆC' },
  { label: 'Thử việc', value: 'THỬ_VIỆC' },
  { label: 'Đã nghỉ việc', value: 'ĐÃ_NGHỈ_VIỆC' }
];

const positions = ['Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'HR Manager', 'HR Executive', 'Accountant', 'Sales Lead'];

const genderOptions = [
  { label: 'Nam', value: 'NAM' },
  { label: 'Nữ', value: 'NỮ' },
  { label: 'Khác', value: 'KHÁC' }
];

const departmentFormOptions = departments.map(dept => ({ label: dept, value: dept }));
const positionOptionsList = positions.map(pos => ({ label: pos, value: pos }));

const statusOptionsForm = [
  { label: 'Đang làm việc', value: 'ĐANG_LÀM_VIỆC' },
  { label: 'Thử việc', value: 'THỬ_VIỆC' },
  { label: 'Đã nghỉ việc', value: 'ĐÃ_NGHỈ_VIỆC' }
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
    case 'THỬ_VIỆC': return 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-soft-text)] border-[var(--sys-brand-border)]';
    case 'ĐÃ_NGHỈ_VIỆC': return 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]';
    default: return 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border-[var(--sys-border-subtle)]';
  }
};

const getStatusDotClass = (status) => {
  switch (status) {
    case 'ĐANG_LÀM_VIỆC': return 'bg-[var(--sys-success-solid)]';
    case 'THỬ_VIỆC': return 'bg-[var(--sys-brand-solid)]';
    case 'ĐÃ_NGHỈ_VIỆC': return 'bg-[var(--sys-danger-solid)]';
    default: return 'bg-[var(--sys-icon-default)]';
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
  // Convert date format for input date
  if (form.value.date_of_birth && form.value.date_of_birth.includes('/')) {
      const parts = form.value.date_of_birth.split('/');
      form.value.date_of_birth = `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  showModal.value = true;
};

const saveEmployee = async () => {
  if (!form.value.full_name || !form.value.company_email) {
    await showAlert('Thiếu thông tin', 'Vui lòng nhập đầy đủ các trường bắt buộc (*)');
    return;
  }

  if (editMode.value) {
    const index = employees.value.findIndex(e => e.id === form.value.id);
    if (index !== -1) {
      employees.value[index] = { ...form.value };
    }
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
  const ok = await showConfirm('Xác nhận nghỉ việc', `Bạn có chắc muốn chuyển trạng thái nghỉ việc cho nhân viên ${emp.full_name}?`);
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
</style>
