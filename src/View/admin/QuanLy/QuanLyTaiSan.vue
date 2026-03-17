<template>
  <div class="space-y-6 text-sm">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="text-left">
        <h1 class="text-2xl font-black text-[var(--sys-text-primary)] tracking-tight text-left">Quản trị Tài sản</h1>
        <p class="text-[var(--sys-text-secondary)] text-sm font-medium italic text-left">Cấp phát, theo dõi vòng đời và bảo trì thiết bị công ty.</p>
      </div>
      <div class="flex items-center gap-3 text-left">
        <button 
          @click="openAddModal"
          class="px-6 py-2.5 min-h-[44px] bg-[var(--sys-brand-solid)] rounded-lg font-black text-white hover:bg-[var(--sys-brand-hover)] shadow-xl shadow-[var(--sys-brand-solid-lch-30)] transition-all flex items-center gap-2"
        >
          <span class="material-symbols-outlined text-[20px]">add_task</span>
          Bàn giao tài sản
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in stats" :key="stat.label" class="bg-[var(--sys-bg-surface)] p-6 rounded-[2rem] border border-[var(--sys-border-subtle)] shadow-sm flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
        <div :class="`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} mb-4 shadow-inner`">
          <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">{{ stat.icon }}</span>
        </div>
        <div class="text-left">
          <p class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1 italic text-left">{{ stat.label }}</p>
          <p class="text-2xl font-black text-[var(--sys-text-primary)] leading-none text-left">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <!-- Table Container -->
    <div class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col min-h-[400px]">
      <!-- Filters -->
      <div class="p-4 border-b border-[var(--sys-border-subtle)] flex flex-col md:flex-row items-center gap-3 bg-[var(--sys-bg-page)]/30 w-full">
        <div class="relative flex-1 w-full group">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--sys-icon-default)] text-xl transition-colors group-focus-within:text-[var(--sys-brand-solid)]">search</span>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Tìm theo mã TS, tên hoặc người dùng..." 
            class="w-full pl-11 pr-4 h-11 bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)]"
          >
        </div>
        <div class="flex items-center gap-2 w-full md:w-auto shrink-0">
          <Dropdown 
            v-model="filterCategory"
            :options="categoryOptions"
            placeholder="Tất cả danh mục"
          />
          <Dropdown 
            v-model="filterStatus"
            :options="statusOptions"
            placeholder="Tất cả trạng thái"
          />
        </div>
      </div>

      <!-- Main Table -->
      <div class="overflow-x-auto flex-1 h-full custom-scrollbar">
        <table class="w-full text-left border-separate border-spacing-0 h-full">
          <thead>
            <tr>
              <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Thông tin tài sản</th>
              <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Danh mục</th>
              <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Người sử dụng</th>
              <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50">Trạng thái</th>
              <th class="px-6 py-4 text-xs font-bold text-[var(--sys-text-secondary)] uppercase tracking-wider border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/50 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody class="bg-transparent text-sm font-medium">
            <tr v-for="asset in filteredAssets" :key="asset.id" 
                class="group transition-all duration-200 bg-transparent hover:bg-[var(--sys-bg-hover)]">
              <td class="px-6 py-5 bg-transparent border-b border-[var(--sys-border-subtle)]">
                <div class="flex flex-col bg-transparent">
                  <span class="font-black text-[var(--sys-text-primary)] mb-0.5 bg-transparent">{{ asset.name }}</span>
                  <span class="text-[10px] font-black text-[var(--sys-brand-solid)] uppercase tracking-tighter bg-transparent">{{ asset.code }}</span>
                </div>
              </td>
              <td class="px-6 py-5 bg-transparent border-b border-[var(--sys-border-subtle)]">
                <span class="px-2.5 py-1 bg-[var(--sys-bg-page)] text-[var(--sys-text-secondary)] border border-[var(--sys-border-subtle)] rounded-md text-[10px] font-bold uppercase tracking-wider">{{ asset.category }}</span>
              </td>
              <td class="px-6 py-5 bg-transparent border-b border-[var(--sys-border-subtle)]">
                <div v-if="asset.user" class="flex items-center gap-2 bg-transparent">
                  <span class="w-1.5 h-1.5 rounded-full bg-[var(--sys-brand-solid)]"></span>
                  <span class="font-bold text-[var(--sys-text-primary)] bg-transparent">{{ asset.user }}</span>
                </div>
                <span v-else class="text-[11px] font-bold text-[var(--sys-text-secondary)]/40 italic bg-transparent">Sẵn sàng cấp phát</span>
              </td>
              <td class="px-6 py-5 bg-transparent border-b border-[var(--sys-border-subtle)]">
                <div :class="[
                  'px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 border transition-all whitespace-nowrap',
                  getStatusColor(asset.status)
                ]">
                  <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotColor(asset.status)"></span>
                  {{ asset.status.replace('_', ' ') }}
                </div>
              </td>
              <td class="px-6 py-5 text-right bg-transparent border-b border-[var(--sys-border-subtle)]">
                <div class="flex items-center justify-end gap-2 bg-transparent">
                  <button 
                    @click="editAsset(asset)" 
                    class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-transparent text-[var(--sys-icon-default)] hover:text-[var(--sys-brand-solid)] hover:bg-[var(--sys-brand-solid)]/10 active:scale-95"
                    title="Chỉnh sửa"
                  >
                    <span class="material-symbols-outlined text-lg">edit</span>
                  </button>
                  <button 
                    v-if="!asset.user" 
                    @click="assignAsset(asset)" 
                    class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-transparent text-[var(--sys-icon-default)] hover:text-[var(--sys-success-text)] hover:bg-[var(--sys-success-soft)] active:scale-95" 
                    title="Bàn giao TS"
                  >
                    <span class="material-symbols-outlined text-lg">person_add</span>
                  </button>
                  <button 
                    v-else 
                    @click="recoverAsset(asset)" 
                    class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-transparent text-[var(--sys-icon-default)] hover:text-[var(--sys-warning-text)] hover:bg-[var(--sys-warning-soft)] active:scale-95" 
                    title="Thu hồi TS"
                  >
                    <span class="material-symbols-outlined text-lg">assignment_return</span>
                  </button>
                  <button 
                    @click="confirmLiquidate(asset)" 
                    class="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-transparent text-[var(--sys-icon-default)] hover:text-[var(--sys-danger-solid)] hover:bg-[var(--sys-danger-solid)]/10 active:scale-95" 
                    title="Thanh lý TS"
                  >
                    <span class="material-symbols-outlined text-lg">delete_sweep</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
          <div class="relative z-[10000] bg-[var(--sys-bg-surface-elevated)] border border-[var(--sys-border-subtle)] w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all text-left">
            <div class="px-8 py-6 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-[var(--sys-bg-surface-elevated)] text-left">
              <div class="text-left">
                <h3 class="text-xl font-black text-[var(--sys-text-primary)] text-left">{{ editMode ? 'Cập nhật tài sản' : 'Nhập tài sản mới' }}</h3>
                <p class="text-xs text-[var(--sys-text-secondary)] font-bold italic mt-0.5 text-left">Hệ thống sẽ ghi nhận lịch sử bàn giao</p>
              </div>
              <button @click="closeModal" class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[var(--sys-bg-hover)] transition-all text-[var(--sys-text-secondary)]">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <div class="p-8 space-y-4 bg-[var(--sys-bg-hover)]/30">
               <div class="text-left">
                  <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic text-left">Tên tài sản *</label>
                  <input v-model="form.name" type="text" placeholder="VD: MacBook Pro 14 inch..." class="w-full px-4 py-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] text-left">
               </div>

               <div class="grid grid-cols-2 gap-4 text-left">
                 <div class="text-left">
                    <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic text-left">Mã tài sản *</label>
                    <input v-model="form.code" type="text" placeholder="TS-001..." class="w-full px-4 py-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/5 focus:border-[var(--sys-brand-solid)] transition-all text-[var(--sys-text-primary)] text-left">
                 </div>
                 <div class="text-left">
                    <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic text-left">Danh mục *</label>
                    <Dropdown 
                      v-model="form.category"
                      :options="categoryOptionsForm"
                      class="w-full"
                    />
                 </div>
               </div>

               <div class="text-left">
                  <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1.5 ml-1 italic text-left">Trạng thái thiết bị</label>
                  <Dropdown 
                    v-model="form.status"
                    :options="statusOptionsForm"
                    class="w-full"
                  />
               </div>

               <div v-if="form.status === 'ĐANG_SỬ_DỤNG'" class="p-6 bg-[var(--sys-bg-surface)] border border-[var(--sys-brand-solid)] border-dashed rounded-[2rem] shadow-xl text-left">
                   <label class="block text-[10px] font-black text-[var(--sys-brand-solid)] uppercase tracking-widest mb-2 italic text-left">Người đang nắm giữ</label>
                   <input v-model="form.user" type="text" placeholder="Nhập tên nhân viên..." class="w-full bg-transparent border-0 border-b border-[var(--sys-border-subtle)] text-[var(--sys-text-primary)] font-black text-lg focus:outline-none focus:border-[var(--sys-brand-solid)] transition-all text-left">
               </div>
            </div>

            <div class="px-8 py-6 border-t border-[var(--sys-border-subtle)] bg-[var(--sys-bg-surface-elevated)] flex justify-end gap-3 text-left">
              <button @click="closeModal" class="px-6 py-2.5 min-h-[44px] text-sm font-bold text-[var(--sys-text-secondary)] hover:bg-[var(--sys-bg-hover)] rounded-lg transition-all uppercase tracking-widest">Hủy</button>
              <button @click="handleSave" class="px-8 py-2.5 min-h-[44px] bg-[var(--sys-brand-solid)] text-white rounded-lg text-sm font-black hover:bg-[var(--sys-brand-hover)] shadow-lg shadow-[var(--sys-brand-solid-lch-30)] transition-all uppercase tracking-widest">Lưu thông tin</button>
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

const searchQuery = ref('');
const filterCategory = ref('ALL');
const filterStatus = ref('ALL');
const showModal = ref(false);
const editMode = ref(false);

const categories = ['Thiết bị IT', 'Nội thất', 'Phương tiện', 'Dụng cụ văn phòng'];
const categoryOptions = computed(() => [
  { label: 'Tất cả danh mục', value: 'ALL' },
  ...categories.map(cat => ({ label: cat, value: cat }))
]);

const statusOptions = [
  { label: 'Tất cả trạng thái', value: 'ALL' },
  { label: 'Sẵn sàng', value: 'SẴN_SÀNG' },
  { label: 'Đang sử dụng', value: 'ĐANG_SỬ_DỤNG' },
  { label: 'Đang sửa chữa', value: 'ĐANG_SỬA_CHỮA' },
  { label: 'Đã thanh lý', value: 'ĐÃ_THANH_LÝ' }
];

const categoryOptionsForm = categories.map(cat => ({ label: cat, value: cat }));
const statusOptionsForm = [
  { label: 'Sẵn sàng cấp phát', value: 'SẴN_SÀNG' },
  { label: 'Đang sử dụng', value: 'ĐANG_SỬ_DỤNG' },
  { label: 'Đang sửa chữa', value: 'ĐANG_SỬA_CHỮA' },
  { label: 'Cần thanh lý', value: 'CẦN_THANH_LÝ' }
];

const stats = ref([
  { label: 'Tổng tài sản', value: '1,240', icon: 'devices', bg: 'bg-[var(--sys-brand-solid)]', color: 'text-white' },
  { label: 'Đang cấp phát', value: '864', icon: 'person_pin', bg: 'bg-[var(--sys-brand-soft)]', color: 'text-[var(--sys-brand-solid)]' },
  { label: 'Trong kho', value: '320', icon: 'inventory_2', bg: 'bg-[var(--sys-success-soft)]', color: 'text-[var(--sys-success-text)]' },
  { label: 'Đang sửa chữa', value: '56', icon: 'build', bg: 'bg-[var(--sys-danger-soft)]', color: 'text-[var(--sys-danger-text)]' }
]);

const assets = ref([
  { id: 1, name: 'MacBook Pro M2 14"', code: 'TS-2023-001', category: 'Thiết bị IT', user: 'Lê Văn Tám', status: 'ĐANG_SỬ_DỤNG' },
  { id: 2, name: 'Màn hình Dell UltraSharp 27"', code: 'TS-2023-002', category: 'Thiết bị IT', user: 'Lê Văn Tám', status: 'ĐANG_SỬ_DỤNG' },
  { id: 3, name: 'Bàn ghế văn phòng Pro', code: 'TS-2022-045', category: 'Nội thất', user: 'Nguyễn Thị Hoa', status: 'ĐANG_SỬ_DỤNG' },
  { id: 4, name: 'iPhone 14 Pro 256GB', code: 'TS-2023-089', category: 'Thiết bị IT', user: null, status: 'SẴN_SÀNG' },
  { id: 5, name: 'Máy chiếu Sony 4K', code: 'TS-2021-012', category: 'Thiết bị IT', user: null, status: 'ĐANG_SỬA_CHỮA' },
]);

const emptyForm = {
  id: null,
  name: '',
  code: '',
  category: 'Thiết bị IT',
  status: 'SẴN_SÀNG',
  user: null
};

const form = ref({ ...emptyForm });

const filteredAssets = computed(() => {
  let list = assets.value;
  if (filterCategory.value !== 'ALL') {
    list = list.filter(a => a.category === filterCategory.value);
  }
  if (filterStatus.value !== 'ALL') {
    list = list.filter(a => a.status === filterStatus.value);
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(a => 
      a.name.toLowerCase().includes(q) || 
      a.code.toLowerCase().includes(q) || 
      (a.user && a.user.toLowerCase().includes(q))
    );
  }
  return list;
});

const getStatusColor = (status) => {
  switch (status) {
    case 'ĐANG_SỬ_DỤNG': return 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-solid)]/10';
    case 'SẴN_SÀNG': return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
    case 'ĐANG_SỬA_CHỮA': return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]';
    case 'ĐÃ_THANH_LÝ': return 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border-[var(--sys-danger-border)]';
    default: return 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border-[var(--sys-border-subtle)]';
  }
};

const getStatusDotColor = (status) => {
  switch (status) {
    case 'ĐANG_SỬ_DỤNG': return 'bg-[var(--sys-brand-solid)]';
    case 'SẴN_SÀNG': return 'bg-[var(--sys-success-solid)]';
    case 'ĐANG_SỬA_CHỮA': return 'bg-[var(--sys-warning-solid)]';
    case 'ĐÃ_THANH_LÝ': return 'bg-[var(--sys-danger-solid)]';
    default: return 'bg-[var(--sys-icon-default)]';
  }
};

const openAddModal = () => {
    editMode.value = false;
    form.value = { ...emptyForm };
    form.value.code = `TS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    showModal.value = true;
};

const editAsset = (asset) => {
    editMode.value = true;
    form.value = { ...asset };
    showModal.value = true;
};

const closeModal = () => { showModal.value = false; };

const handleSave = async () => {
    if (!form.value.name || !form.value.code) {
        await showAlert('Thiếu thông tin', 'Vui lòng nhập tên và mã tài sản!');
        return;
    }
    if (editMode.value) {
        const idx = assets.value.findIndex(a => a.id === form.value.id);
        if (idx !== -1) assets.value[idx] = { ...form.value };
    } else {
        assets.value.unshift({ ...form.value, id: Date.now() });
    }
    closeModal();
};

const assignAsset = (asset) => {
    editAsset(asset);
};

const recoverAsset = async (asset) => {
    const ok = await showConfirm('Thu hồi tài sản', `Xác nhận thu hồi tài sản ${asset.name} từ nhân viên ${asset.user}?`);
    if (ok) {
        asset.user = null;
        asset.status = 'SẴN_SÀNG';
    }
};

const confirmLiquidate = async (asset) => {
    const ok = await showConfirm('Thanh lý tài sản', `Bạn có chắc muốn thanh lý tài sản ${asset.name}? Hành động này sẽ gỡ bỏ tài sản khỏi danh sách sử dụng.`);
    if (ok) {
        asset.status = 'ĐÃ_THANH_LÝ';
        asset.user = null;
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
  background: #cbd5e1;
  border-radius: 10px;
}

</style>
