<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
      <div class="text-left">
        <h1 class="text-2xl font-black text-[var(--sys-text-primary)] tracking-tight text-left">Quản lý Phòng ban</h1>
        <p class="text-[var(--sys-text-secondary)] text-sm font-medium italic text-left">Cấu trúc sơ đồ tổ chức và quản lý nhân sự theo đơn vị.</p>
      </div>
      <div class="flex flex-wrap items-center gap-3 text-sm text-left">
        <div class="relative group hidden sm:block">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--sys-icon-default)]">search</span>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Tìm mã hoặc tên phòng..." 
            class="pl-10 pr-4 py-2.5 w-64 bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-xl text-xs font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all font-bold text-[var(--sys-text-primary)] placeholder:text-[var(--sys-text-secondary)]"
          >
        </div>

        <Dropdown 
          v-model="filterActive"
          :options="activeOptions"
          placeholder="Tất cả trạng thái"
        />

        <button 
          @click="openModal('add')" 
          class="px-6 py-2.5 min-h-[44px] bg-[var(--sys-brand-solid)] rounded-lg font-black text-white hover:bg-[var(--sys-brand-hover)] shadow-xl shadow-[var(--sys-brand-solid-lch-30)] transition-all flex items-center gap-2"
        >
          <span class="material-symbols-outlined text-[20px]">add_business</span>
          Thêm đơn vị
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="stat in stats" :key="stat.label" class="bg-[var(--sys-bg-surface)] p-6 rounded-[2rem] border border-[var(--sys-border-subtle)] shadow-sm flex items-center gap-5">
        <div :class="`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} shadow-inner`">
          <span class="material-symbols-outlined text-3xl">{{ stat.icon }}</span>
        </div>
        <div>
          <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1 italic">{{ stat.label }}</p>
          <p class="text-2xl font-black text-[var(--sys-text-primary)] leading-none">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <!-- List -->
    <div class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden text-sm">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-[var(--sys-bg-hover)]">
            <th class="px-8 py-5 text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest border-b border-[var(--sys-border-subtle)] italic">Tên đơn vị / Mã phòng</th>
            <th class="px-8 py-5 text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest border-b border-[var(--sys-border-subtle)] italic">Trưởng phòng</th>
            <th class="px-8 py-5 text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest border-b border-[var(--sys-border-subtle)] italic text-center">Nhân sự</th>
            <th class="px-8 py-5 text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest border-b border-[var(--sys-border-subtle)] italic">Trạng thái</th>
            <th class="px-8 py-5 text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest border-b border-[var(--sys-border-subtle)] italic text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[var(--sys-border-subtle)]">
          <tr v-for="dept in filteredDepartments" :key="dept.id" 
              class="group transition-all duration-200 border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface)] hover:bg-[var(--sys-bg-hover)]">
            <td class="px-8 py-5 bg-transparent">
              <div class="flex items-center gap-4 bg-transparent">
                <div class="w-10 h-10 rounded-xl bg-transparent text-[var(--sys-text-secondary)] flex items-center justify-center transition-colors border border-[var(--sys-border-subtle)] group-hover:bg-[var(--sys-brand-soft)] group-hover:text-[var(--sys-brand-solid)] group-hover:border-[var(--sys-brand-border)]">
                  <span class="material-symbols-outlined text-xl">{{ dept.icon || 'corporate_fare' }}</span>
                </div>
                <div class="bg-transparent">
                  <p class="font-black text-[var(--sys-text-primary)] mb-0.5 bg-transparent">{{ dept.name }}</p>
                  <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-tighter bg-transparent">{{ dept.code }}</p>
                </div>
              </div>
            </td>
            <td class="px-8 py-5 text-sm font-bold text-[var(--sys-text-secondary)]">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-[var(--sys-border-subtle)]"></div>
                {{ dept.manager || 'Chưa bổ nhiệm' }}
              </div>
            </td>
            <td class="px-8 py-5 text-center">
              <span class="px-3 py-1 bg-[var(--sys-bg-hover)] rounded-lg font-black text-[var(--sys-text-primary)] text-[11px]">
                {{ dept.employee_count }} NV
              </span>
            </td>
            <td class="px-8 py-5">
              <div :class="`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider d-inline-flex align-items-center gap-2 border ${dept.active ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]' : 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]'}`">
                <span :class="`w-1.5 h-1.5 rounded-full ${dept.active ? 'bg-[var(--sys-success-solid)]' : 'bg-[var(--sys-danger-solid)]'}`"></span>
                {{ dept.active ? 'Đang hoạt động' : 'Đã giải thể' }}
              </div>
            </td>
            <td class="px-8 py-5 text-right">
              <div class="flex items-center justify-end gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                <button @click="openModal('edit', dept)" class="btn-action-icon text-[var(--sys-icon-default)] hover:text-[var(--sys-brand-solid)]">
                  <span class="material-symbols-outlined">edit</span>
                </button>
                <button @click="confirmDissolve(dept)" class="btn-action-icon text-[var(--sys-icon-default)] hover:text-[var(--sys-danger-solid)]">
                  <span class="material-symbols-outlined">domain_disabled</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
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
          <div class="fixed inset-0 w-screen h-screen bg-black/40 z-[9999] overflow-hidden backdrop-blur-sm" @click="closeModal"></div>
          <div class="relative z-[10000] bg-[var(--sys-bg-surface-elevated)] border border-[var(--sys-border-subtle)] w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all text-left">
            <!-- Modal Header -->
            <div class="px-8 py-6 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-[var(--sys-bg-surface-elevated)] text-left">
              <div class="text-left">
                <h3 class="text-xl font-black text-[var(--sys-text-primary)] text-left">{{ isEdit ? 'Cập nhật phòng ban' : 'Thêm phòng ban mới' }}</h3>
                <p class="text-xs text-[var(--sys-text-secondary)] font-bold italic mt-0.5 text-left">Vui lòng điền đủ thông tin để lưu</p>
              </div>
              <button @click="closeModal" class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[var(--sys-bg-hover)] transition-all text-[var(--sys-text-secondary)]">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <!-- Body -->
            <div class="p-8 space-y-5 custom-scrollbar max-h-[70vh] overflow-y-auto bg-[var(--sys-bg-hover)]">
              <div class="space-y-4">
                <div class="grid grid-cols-5 gap-4">
                  <div class="col-span-2">
                    <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic">Mã phòng *</label>
                    <input v-model="form.code" type="text" placeholder="VD: IT-01" class="w-full px-4 py-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)]">
                  </div>
                  <div class="col-span-3">
                    <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic">Icon hiển thị</label>
                    <Dropdown 
                      v-model="form.icon"
                      :options="iconOptionsList"
                      class="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic">Tên phòng ban *</label>
                  <input v-model="form.name" type="text" placeholder="Nhập tên đơn vị..." class="w-full px-4 py-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)]">
                </div>

                <div>
                  <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic">Phòng ban cha (Cấp trên)</label>
                  <Dropdown 
                    v-model="form.parent_id"
                    :options="parentDeptOptions"
                    class="w-full"
                  />
                </div>

                <div>
                  <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic">Trưởng phòng / Người quản lý</label>
                  <input v-model="form.manager" type="text" placeholder="Tìm kiếm hoặc nhập tên..." class="w-full px-4 py-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)]">
                </div>

                <div>
                  <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic text-left">Trạng thái hoạt động</label>
                  <div class="flex items-center gap-3 text-left">
                      <button 
                          @click="form.active = !form.active"
                          type="button"
                          class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 outline-none"
                          :class="form.active ? 'bg-[var(--sys-brand-solid)]' : 'bg-[var(--sys-border-subtle)]'"
                      >
                          <span class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200"
                                :class="form.active ? 'translate-x-5' : 'translate-x-0'"></span>
                      </button>
                      <span class="text-xs font-bold" :class="form.active ? 'text-[var(--sys-brand-solid)]' : 'text-[var(--sys-text-secondary)]'">{{ form.active ? 'ĐANG HOẠT ĐỘNG' : 'TẠM NGƯNG' }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="px-8 py-6 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface-elevated)] flex justify-end gap-3 text-left">
              <button @click="closeModal" class="px-6 py-2.5 min-h-[44px] text-sm font-bold text-[var(--sys-text-secondary)] hover:bg-[var(--sys-bg-hover)] rounded-lg transition-all uppercase tracking-widest italic">Hủy</button>
              <button @click="handleSave" class="px-8 py-2.5 min-h-[44px] bg-[var(--sys-brand-solid)] text-white rounded-lg text-sm font-black hover:bg-[var(--sys-brand-hover)] shadow-lg shadow-[var(--sys-brand-solid-lch-30)] transition-all uppercase tracking-widest">
                {{ isEdit ? 'Cập nhật' : 'Lưu thông tin' }}
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

const showModal = ref(false);
const isEdit = ref(false);
const searchQuery = ref('');
const filterActive = ref('ALL');

const activeOptions = [
  { label: 'Tất cả trạng thái', value: 'ALL' },
  { label: 'Đang hoạt động', value: true },
  { label: 'Đã giải thể', value: false }
];

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
  { label: 'Tổng phòng ban', value: '12', icon: 'account_tree', bg: 'bg-[var(--sys-brand-soft)]', color: 'text-[var(--sys-brand-solid)]' },
  { label: 'Đang hoạt động', value: '10', icon: 'check_circle', bg: 'bg-[var(--sys-success-soft)]', color: 'text-[var(--sys-success-text)]' },
  { label: 'Cơ cấu tổ chức', value: '3 Cấp', icon: 'schema', bg: 'bg-[var(--sys-warning-soft)]', color: 'text-[var(--sys-warning-text)]' }
]);

const iconOptions = ['corporate_fare', 'engineering', 'groups', 'web', 'payments', 'hub', 'apartment', 'meeting_room'];
const iconOptionsList = iconOptions.map(icon => ({ label: icon.toUpperCase().replace('_', ' '), value: icon }));

const parentDeptOptions = computed(() => [
  { label: '-- Là cấp quản lý cao nhất --', value: null },
  ...departments.value.map(d => ({ label: d.name, value: d.id }))
]);

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

const handleSave = async () => {
  if (!form.value.name || !form.value.code) {
    await showAlert('Thiếu thông tin', 'Vui lòng nhập tên và mã phòng ban!');
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

const confirmDissolve = async (dept) => {
  if (dept.employee_count > 0) {
    await showAlert('Không thể giải thể', `Phòng ${dept.name} đang có ${dept.employee_count} nhân viên. Hãy điều chuyển nhân sự trước!`);
    return;
  }
  const ok = await showConfirm('Giải thể phòng ban', `Bạn có chắc muốn giải thể phòng ban ${dept.name}? Action này không thể hoàn tác.`);
  if (ok) {
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
  background: var(--sys-border-subtle);
  border-radius: 10px;
}

</style>
