<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-slate-900 tracking-tight">Quản lý Nhân sự</h1>
        <p class="text-slate-500 text-sm font-medium italic">Quản lý hồ sơ, hợp đồng và lộ trình công tác của nhân viên.</p>
      </div>
      <div class="flex flex-wrap items-center lg:justify-end gap-3 flex-1">
        <div class="relative group hidden xl:block">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Tìm mã NV, tên..." 
            class="pl-10 pr-4 py-2.5 w-52 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold"
          >
        </div>
        
        <div class="flex items-center gap-2">
          <select v-model="filterDepartment" class="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-[11px] font-black text-slate-500 outline-none hover:border-blue-300 transition-all">
            <option value="ALL">Tất cả phòng ban</option>
            <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
          </select>

          <select v-model="filterStatus" class="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-[11px] font-black text-slate-500 outline-none hover:border-blue-300 transition-all">
            <option value="ALL">Tất cả trạng thái</option>
            <option value="ĐANG_LÀM_VIỆC">Đang làm việc</option>
            <option value="THỬ_VIỆC">Thử việc</option>
            <option value="ĐÃ_NGHỈ_VIỆC">Đã nghỉ việc</option>
          </select>
        </div>

        <button 
          @click="openAddModal"
          class="px-5 py-2.5 bg-indigo-600 rounded-xl font-black text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2 whitespace-nowrap ml-auto md:ml-0"
        >
          <span class="material-symbols-outlined text-[20px]">person_add</span>
          Thêm nhân sự
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="stat in stats" :key="stat.label" class="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
        <div class="flex items-center gap-4">
          <div :class="`w-12 h-12 rounded-2xl ${stat.bgColor} ${stat.textColor} flex items-center justify-center`">
            <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">{{ stat.icon }}</span>
          </div>
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{{ stat.label }}</p>
            <p class="text-xl font-black text-slate-900 leading-none">{{ stat.value }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden text-sm">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50/50">
            <th class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Nhân viên</th>
            <th class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Phòng ban / Chức vụ</th>
            <th class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic text-center">Ngày vào làm</th>
            <th class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Trạng thái</th>
            <th class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="emp in filteredEmployees" :key="emp.id" class="hover:bg-slate-50/50 transition-all group">
            <td class="px-6 py-4 border-b border-slate-50">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 font-black flex items-center justify-center text-sm border border-blue-200">
                  {{ emp.full_name.charAt(0) }}
                </div>
                <div>
                  <p class="text-sm font-black text-slate-900 mb-0.5">{{ emp.full_name }}</p>
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{{ emp.employee_code }}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 border-b border-slate-50">
              <p class="text-xs font-bold text-slate-700 mb-0.5">{{ emp.department }}</p>
              <p class="text-[10px] font-medium text-slate-500">{{ emp.position }}</p>
            </td>
            <td class="px-6 py-4 border-b border-slate-50 text-center">
              <p class="text-[11px] font-bold text-slate-500">{{ emp.hire_date }}</p>
            </td>
            <td class="px-6 py-4 border-b border-slate-50">
              <span :class="`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusColor(emp.status)} shadow-sm font-bold`">
                {{ emp.status.replace('_', ' ') }}
              </span>
            </td>
            <td class="px-6 py-4 border-b border-slate-50 text-right">
              <div class="flex items-center justify-end gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity">
                <button @click="editEmployee(emp)" class="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <span class="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button @click="confirmResign(emp)" class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Chuyển trạng thái nghỉ việc">
                  <span class="material-symbols-outlined text-[18px]">person_off</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Modal -->
    <transition name="modal">
      <div v-if="showModal" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="showModal = false"></div>
        <div class="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
          <!-- Modal Header -->
          <div class="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h3 class="text-xl font-black text-slate-900">{{ editMode ? 'Cập nhật hồ sơ' : 'Thêm nhân viên mới' }}</h3>
              <p class="text-sm text-slate-500 font-medium italic">Vui lòng điền các thông tin bắt buộc (*)</p>
            </div>
            <button @click="showModal = false" class="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-white hover:shadow-md transition-all text-slate-400">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <!-- Modal Body (Scrollable) -->
          <div class="flex-1 overflow-y-auto p-10 custom-scrollbar">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
              <!-- Left: Personal Info -->
              <div class="space-y-6">
                <h4 class="text-xs font-black text-blue-600 uppercase tracking-[0.2em] flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span> Thông tin cá nhân
                </h4>
                
                <div class="space-y-4">
                  <div class="group">
                    <label class="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Họ và tên *</label>
                    <input v-model="form.full_name" type="text" placeholder="VD: Nguyễn Văn A" class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all">
                  </div>
                  
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Ngày sinh</label>
                      <input v-model="form.date_of_birth" type="date" class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all">
                    </div>
                    <div>
                      <label class="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Giới tính</label>
                      <select v-model="form.gender" class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all">
                        <option value="NAM">Nam</option>
                        <option value="NỮ">Nữ</option>
                        <option value="KHÁC">Khác</option>
                      </select>
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                     <div>
                      <label class="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Số điện thoại *</label>
                      <input v-model="form.phone_number" type="tel" placeholder="09xxx..." class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all">
                    </div>
                     <div>
                      <label class="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Số CCCD *</label>
                      <input v-model="form.id_card" type="text" placeholder="001..." class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all">
                    </div>
                  </div>

                  <div>
                    <label class="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Email cá nhân</label>
                    <input v-model="form.personal_email" type="email" placeholder="user@gmail.com" class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all">
                  </div>

                  <div>
                    <label class="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Địa chỉ thường trú</label>
                    <textarea v-model="form.permanent_address" rows="1" placeholder="Số nhà, đường, phường/xã..." class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all"></textarea>
                  </div>
                </div>
              </div>

              <!-- Right: Job Info -->
              <div class="space-y-6">
                <h4 class="text-xs font-black text-green-600 uppercase tracking-[0.2em] flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span> Thông tin công việc
                </h4>
                
                <div class="space-y-4">
                  <div class="grid grid-cols-2 gap-4">
                     <div>
                      <label class="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Phòng ban *</label>
                      <select v-model="form.department" class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all">
                        <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
                      </select>
                    </div>
                     <div>
                      <label class="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Chức vụ *</label>
                      <select v-model="form.position" class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all">
                        <option v-for="pos in positions" :key="pos" :value="pos">{{ pos }}</option>
                      </select>
                    </div>
                  </div>

                   <div>
                    <label class="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Email công ty *</label>
                    <input v-model="form.company_email" type="email" placeholder="user@company.com" class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all">
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Ngày vào làm *</label>
                      <input v-model="form.hire_date" type="date" class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all">
                    </div>
                    <div>
                      <label class="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Trạng thái</label>
                      <select v-model="form.status" class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all">
                        <option value="ĐANG_LÀM_VIỆC">Đang làm việc</option>
                        <option value="THỬ_VIỆC">Thử việc</option>
                        <option value="ĐÃ_NGHỈ_VIỆC">Đã nghỉ việc</option>
                      </select>
                    </div>
                  </div>

                  <div class="p-5 bg-blue-50/50 rounded-3xl border border-blue-100 shadow-inner">
                    <p class="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 italic">Mã nhân viên (Hệ thống tự tạo)</p>
                    <p class="text-xl font-black text-blue-900 tracking-wider">{{ form.employee_code || 'EMP-XXXX-XXX' }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="px-10 py-8 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
            <button @click="showModal = false" class="px-8 py-3.5 text-sm font-black text-slate-400 hover:text-slate-600 transition-all">Đóng</button>
            <button @click="saveEmployee" class="px-10 py-3.5 bg-indigo-600 text-white rounded-2xl text-sm font-black hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm">save</span>
                {{ editMode ? 'Cập nhật hồ sơ' : 'Lưu nhân viên' }}
              </div>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

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
  { label: 'Tổng nhân sự', value: '1,250', icon: 'groups', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
  { label: 'Thử việc mới', value: '24', icon: 'person_add', bgColor: 'bg-orange-50', textColor: 'text-orange-600' },
  { label: 'Nghỉ phép today', value: '12', icon: 'event_busy', bgColor: 'bg-red-50', textColor: 'text-red-600' },
  { label: 'Sinh nhật tháng', value: '45', icon: 'cake', bgColor: 'bg-green-50', textColor: 'text-green-600' }
]);

const departments = ['Công nghệ thông tin', 'Nhân sự', 'Tài chính - Kế toán', 'Marketing', 'Kinh doanh', 'Vận hành'];
const positions = ['Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'HR Manager', 'HR Executive', 'Accountant', 'Sales Lead'];

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

const getStatusColor = (status) => {
  switch (status) {
    case 'ĐANG_LÀM_VIỆC': return 'bg-green-100 text-green-700';
    case 'THỬ_VIỆC': return 'bg-blue-100 text-blue-700';
    case 'ĐÃ_NGHỈ_VIỆC': return 'bg-red-100 text-red-700';
    default: return 'bg-slate-100 text-slate-700';
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

const saveEmployee = () => {
  if (!form.value.full_name || !form.value.company_email) {
    alert('Vui lòng nhập đầy đủ các trường bắt buộc (*)');
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

const confirmResign = (emp) => {
  if (confirm(`Bạn có chắc muốn chuyển trạng thái nghỉ việc cho nhân viên ${emp.full_name}?`)) {
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
  background: #e2e8f0;
  border-radius: 10px;
}

/* Modal Transitions */
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}
</style>
