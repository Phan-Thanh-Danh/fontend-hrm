<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-slate-900 tracking-tight">Quản lý Phòng ban</h1>
        <p class="text-slate-500 text-sm font-medium italic">Cấu trúc sơ đồ tổ chức và quản lý nhân sự theo đơn vị.</p>
      </div>
      <div class="flex flex-wrap items-center gap-3 text-sm">
        <div class="relative group hidden sm:block">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Tìm mã hoặc tên phòng..." 
            class="pl-10 pr-4 py-2.5 w-64 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all font-bold"
          >
        </div>

        <select v-model="filterActive" class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-500 outline-none hover:border-indigo-300 transition-all">
          <option value="ALL">Tất cả trạng thái</option>
          <option :value="true">Đang hoạt động</option>
          <option :value="false">Đã giải thể</option>
        </select>

        <button 
          @click="openModal('add')" 
          class="px-5 py-2.5 bg-indigo-600 rounded-xl font-black text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2"
        >
          <span class="material-symbols-outlined text-[20px]">add_business</span>
          Thêm phòng ban
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="stat in stats" :key="stat.label" class="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
        <div :class="`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} shadow-inner`">
          <span class="material-symbols-outlined text-3xl">{{ stat.icon }}</span>
        </div>
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{{ stat.label }}</p>
          <p class="text-2xl font-black text-slate-900 leading-none">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <!-- List -->
    <div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden text-sm">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50/50">
            <th class="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Tên đơn vị / Mã phòng</th>
            <th class="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Trưởng phòng</th>
            <th class="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic text-center">Nhân sự</th>
            <th class="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Trạng thái</th>
            <th class="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr v-for="dept in filteredDepartments" :key="dept.id" class="hover:bg-slate-50/50 transition-all group">
            <td class="px-8 py-5">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors border border-slate-200 group-hover:border-indigo-200">
                  <span class="material-symbols-outlined text-xl">{{ dept.icon || 'corporate_fare' }}</span>
                </div>
                <div>
                  <p class="font-black text-slate-900 mb-0.5">{{ dept.name }}</p>
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{{ dept.code }}</p>
                </div>
              </div>
            </td>
            <td class="px-8 py-5 text-sm font-bold text-slate-600">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-slate-300"></div>
                {{ dept.manager || 'Chưa bổ nhiệm' }}
              </div>
            </td>
            <td class="px-8 py-5 text-center">
              <span class="px-3 py-1 bg-slate-100 rounded-lg font-black text-slate-600 text-[11px]">
                {{ dept.employee_count }} NV
              </span>
            </td>
            <td class="px-8 py-5">
              <span :class="`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${dept.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`">
                {{ dept.active ? 'Đang hoạt động' : 'Đã giải thể' }}
              </span>
            </td>
            <td class="px-8 py-5 text-right">
              <div class="flex items-center justify-end gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                <button @click="openModal('edit', dept)" class="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                  <span class="material-symbols-outlined text-[20px]">edit</span>
                </button>
                <button @click="confirmDissolve(dept)" class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                  <span class="material-symbols-outlined text-[20px]">domain_disabled</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <transition name="modal">
      <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeModal"></div>
        <div class="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all">
          <!-- Modal Header -->
          <div class="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h3 class="text-lg font-black text-slate-900">{{ isEdit ? 'Cập nhật phòng ban' : 'Thêm phòng ban mới' }}</h3>
              <p class="text-xs text-slate-500 font-bold italic mt-0.5">Vui lòng điền đủ thông tin để lưu</p>
            </div>
            <button @click="closeModal" class="w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-white hover:shadow-md transition-all text-slate-400">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <!-- Body -->
          <div class="p-8 space-y-5 custom-scrollbar max-h-[70vh] overflow-y-auto">
            <div class="space-y-4">
              <div class="grid grid-cols-5 gap-4">
                <div class="col-span-2">
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Mã phòng *</label>
                  <input v-model="form.code" type="text" placeholder="VD: IT-01" class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all">
                </div>
                <div class="col-span-3">
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Icon hiển thị</label>
                  <select v-model="form.icon" class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all">
                    <option v-for="icon in iconOptions" :key="icon" :value="icon">{{ icon.toUpperCase().replace('_', ' ') }}</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Tên phòng ban *</label>
                <input v-model="form.name" type="text" placeholder="Nhập tên đơn vị..." class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all">
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Phòng ban cha (Cấp trên)</label>
                <select v-model="form.parent_id" class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all">
                  <option :value="null">-- Là cấp quản lý cao nhất --</option>
                  <option v-for="d in departments" :key="d.id" :value="d.id" :disabled="d.id === form.id">{{ d.name }}</option>
                </select>
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Trưởng phòng / Người quản lý</label>
                <input v-model="form.manager" type="text" placeholder="Tìm kiếm hoặc nhập tên..." class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all">
              </div>

              <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Trạng thái hoạt động</label>
                <div class="flex items-center gap-3">
                    <button 
                        @click="form.active = !form.active"
                        type="button"
                        :class="`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 outline-none ${form.active ? 'bg-indigo-600' : 'bg-slate-200'}`"
                    >
                        <span :class="`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ${form.active ? 'translate-x-5' : 'translate-x-0'}`"></span>
                    </button>
                    <span class="text-xs font-bold" :class="form.active ? 'text-indigo-600' : 'text-slate-400'">{{ form.active ? 'ĐANG HOẠT ĐỘNG' : 'TẠM NGƯNG' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-8 py-6 border-t border-slate-50 bg-slate-50/30 flex gap-3">
            <button @click="closeModal" class="flex-1 py-3 text-sm font-black text-slate-400 hover:text-slate-600 transition-all font-black uppercase tracking-widest rounded-2xl">Hủy</button>
            <button @click="handleSave" class="flex-1 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-black hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all uppercase tracking-widest">
              {{ isEdit ? 'Cập nhật' : 'Lưu mới' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const showModal = ref(false);
const isEdit = ref(false);
const searchQuery = ref('');
const filterActive = ref('ALL');

const departments = ref([
  { id: 1, name: 'Khối Điều Hành (HO)', code: 'HO-ADMIN', manager: 'Nguyễn Văn A', active: true, employee_count: 5, icon: 'corporate_fare', parent_id: null },
  { id: 2, name: 'Phòng Công Nghệ', code: 'IT-DEPT', manager: 'Trần Kỹ Thuật', active: true, employee_count: 12, icon: 'engineering', parent_id: 1 },
  { id: 3, name: 'Phòng Nhân Sự', code: 'HR-DEPT', manager: 'Lê Tuyển Dụng', active: true, employee_count: 8, icon: 'groups', parent_id: 1 },
  { id: 4, name: 'Tổ Frontend', code: 'IT-FE', manager: 'Chưa bổ nhiệm', active: true, employee_count: 5, icon: 'web', parent_id: 2 }
]);

const filteredDepartments = computed(() => {
    let list = departments.value;
    if (filterActive.value !== 'ALL') {
        list = list.filter(d => d.active === filterActive.value);
    }
    if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase();
        list = list.filter(d => 
            d.name.toLowerCase().includes(q) || 
            d.code.toLowerCase().includes(q)
        );
    }
    return list;
});

const stats = ref([
  { label: 'Tổng phòng ban', value: '12', icon: 'account_tree', bg: 'bg-indigo-50', color: 'text-indigo-600' },
  { label: 'Đang hoạt động', value: '10', icon: 'check_circle', bg: 'bg-green-50', color: 'text-green-600' },
  { label: 'Cơ cấu tổ chức', value: '3 Cấp', icon: 'schema', bg: 'bg-amber-50', color: 'text-amber-600' }
]);

const iconOptions = ['corporate_fare', 'engineering', 'groups', 'web', 'payments', 'hub', 'apartment', 'meeting_room'];

const emptyForm = {
  id: null,
  name: '',
  code: '',
  manager: '',
  active: true,
  icon: 'corporate_fare',
  parent_id: null
};

const form = ref({ ...emptyForm });

const openModal = (type, dept = null) => {
  isEdit.value = type === 'edit';
  if (isEdit.value && dept) {
    form.value = { ...dept };
  } else {
    form.value = { ...emptyForm };
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const handleSave = () => {
  if (!form.value.name || !form.value.code) {
    alert('Vui lòng nhập tên và mã phòng ban!');
    return;
  }

  if (isEdit.value) {
    const idx = departments.value.findIndex(d => d.id === form.value.id);
    if (idx !== -1) {
      departments.value[idx] = { ...form.value };
    }
  } else {
    departments.value.push({
      ...form.value,
      id: Date.now(),
      employee_count: 0
    });
  }
  closeModal();
};

const confirmDissolve = (dept) => {
  if (dept.employee_count > 0) {
    alert(`Không thể giải thể phòng ${dept.name} vì đang có ${dept.employee_count} nhân viên. Hãy điều chuyển nhân sự trước!`);
    return;
  }
  if (confirm(`Bạn có chắc muốn giải thể phòng ban ${dept.name}? Action này không thể hoàn tác.`)) {
    dept.active = false;
  }
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
  background: #e2e8f0;
  border-radius: 10px;
}

/* Modal Transitions */
.modal-enter-active, .modal-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(30px);
}
</style>
