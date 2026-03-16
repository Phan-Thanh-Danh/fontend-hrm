<template>
  <div class="space-y-6 text-sm">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-slate-900 tracking-tight">Quản trị Tài sản</h1>
        <p class="text-slate-500 text-sm font-medium italic">Cấp phát, theo dõi vòng đời và bảo trì thiết bị công ty.</p>
      </div>
      <div class="flex items-center gap-3 text-left">
        <button 
          @click="openAddModal"
          class="px-6 py-2.5 min-h-[44px] bg-blue-600 rounded-lg font-black text-white hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all flex items-center gap-2"
        >
          <span class="material-symbols-outlined text-[20px]">add_task</span>
          Bàn giao tài sản
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in stats" :key="stat.label" class="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
        <div :class="`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} mb-4 shadow-inner`">
          <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">{{ stat.icon }}</span>
        </div>
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{{ stat.label }}</p>
          <p class="text-2xl font-black text-slate-900 leading-none">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
      <div class="p-6 border-b border-slate-50 flex flex-wrap items-center gap-4 bg-slate-50/30">
        <div class="relative flex-1 min-w-[300px]">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Tìm theo mã TS, tên hoặc người dùng..." 
            class="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-slate-500/10 transition-all"
          >
        </div>
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

      <div class="overflow-x-auto flex-1">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50/50">
              <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Thông tin tài sản</th>
              <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Danh mục</th>
              <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Người sử dụng</th>
              <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Trạng thái</th>
              <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="asset in filteredAssets" :key="asset.id" 
                class="group transition-all duration-200 border-b border-slate-50 bg-white hover:bg-slate-50">
              <td class="px-8 py-5 bg-transparent">
                <div class="flex items-center gap-4 bg-transparent">
                  <div class="w-10 h-10 rounded-xl bg-transparent text-slate-500 flex items-center justify-center border border-slate-200 group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <span class="material-symbols-outlined text-xl">{{ getIcon(asset.category) }}</span>
                  </div>
                  <div>
                    <p class="font-black text-slate-900 mb-0.5">{{ asset.name }}</p>
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{{ asset.code }}</p>
                  </div>
                </div>
              </td>
              <td class="px-8 py-5">
                <span class="text-[11px] font-black text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{{ asset.category }}</span>
              </td>
              <td class="px-8 py-5">
                <div v-if="asset.user" class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span class="font-bold text-slate-700">{{ asset.user }}</span>
                </div>
                <span v-else class="text-[11px] font-bold text-slate-300 italic">Sẵn sàng cấp phát</span>
              </td>
              <td class="px-8 py-5">
                <div :class="`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusColor(asset.status)} border d-inline-flex align-items-center gap-2`">
                  <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotColor(asset.status)"></span>
                  {{ asset.status.replace('_', ' ') }}
                </div>
              </td>
              <td class="px-8 py-5 text-right">
                <div class="flex items-center justify-end gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                  <button @click="editAsset(asset)" class="btn-action-icon">
                    <span class="material-symbols-outlined">edit</span>
                  </button>
                  <button v-if="!asset.user" @click="assignAsset(asset)" class="btn-action-icon btn-success-action" title="Bàn giao TS">
                    <span class="material-symbols-outlined">person_add</span>
                  </button>
                  <button v-else @click="recoverAsset(asset)" class="btn-action-icon btn-success-action" title="Thu hồi TS">
                    <span class="material-symbols-outlined">assignment_return</span>
                  </button>
                  <button @click="confirmLiquidate(asset)" class="btn-action-icon btn-danger-action" title="Thanh lý TS">
                    <span class="material-symbols-outlined">delete_sweep</span>
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
          <div class="fixed inset-0 w-screen h-screen bg-slate-900/50 z-[9999] overflow-hidden backdrop-blur-sm" @click="closeModal"></div>
          <div class="relative z-[10000] bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all text-left">
            <div class="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white text-left">
              <div class="text-left">
                <h3 class="text-xl font-black text-slate-900 text-left">{{ editMode ? 'Cập nhật tài sản' : 'Nhập tài sản mới' }}</h3>
                <p class="text-xs text-slate-500 font-bold italic mt-0.5 text-left">Hệ thống sẽ ghi nhận lịch sử bàn giao</p>
              </div>
              <button @click="closeModal" class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-all text-slate-400">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <div class="p-8 space-y-4">
               <div>
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic text-left">Tên tài sản *</label>
                  <input v-model="form.name" type="text" placeholder="VD: MacBook Pro 14 inch..." class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all">
               </div>

               <div class="grid grid-cols-2 gap-4">
                 <div>
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic text-left">Mã tài sản *</label>
                    <input v-model="form.code" type="text" placeholder="TS-001..." class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all">
                 </div>
                 <div>
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic text-left">Danh mục *</label>
                    <Dropdown 
                      v-model="form.category"
                      :options="categoryOptionsForm"
                      class="w-full"
                    />
                 </div>
               </div>

               <div>
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Trạng thái thiết bị</label>
                  <Dropdown 
                    v-model="form.status"
                    :options="statusOptionsForm"
                    class="w-full"
                  />
               </div>

               <div v-if="form.status === 'ĐANG_SỬ_DỤNG'" class="p-6 bg-slate-900 rounded-[2rem] shadow-xl">
                   <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 italic">Người đang nắm giữ</label>
                   <input v-model="form.user" type="text" placeholder="Nhập tên nhân viên..." class="w-full bg-transparent border-0 border-b border-slate-700 text-white font-black text-lg focus:outline-none focus:border-blue-500 transition-all">
               </div>
            </div>

            <div class="px-8 py-6 border-t border-slate-50 bg-slate-50/30 flex justify-end gap-3 text-left">
              <button @click="closeModal" class="px-6 py-2.5 min-h-[44px] text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-lg transition-all uppercase tracking-widest">Hủy</button>
              <button @click="handleSave" class="px-8 py-2.5 min-h-[44px] bg-blue-600 text-white rounded-lg text-sm font-black hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all uppercase tracking-widest">Lưu thông tin</button>
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
  { label: 'Tổng tài sản', value: '1,240', icon: 'devices', bg: 'bg-slate-900', color: 'text-white' },
  { label: 'Đang cấp phát', value: '864', icon: 'person_pin', bg: 'bg-blue-50', color: 'text-blue-600' },
  { label: 'Trong kho', value: '320', icon: 'inventory_2', bg: 'bg-green-50', color: 'text-green-600' },
  { label: 'Đang sửa chữa', value: '56', icon: 'build', bg: 'bg-red-50', color: 'text-red-600' }
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
    case 'ĐANG_SỬ_DỤNG': return 'bg-blue-50 text-blue-700 border-blue-100';
    case 'SẴN_SÀNG': return 'bg-green-50 text-green-700 border-green-100';
    case 'ĐANG_SỬA_CHỮA': return 'bg-orange-50 text-orange-700 border-orange-100';
    case 'ĐÃ_THANH_LÝ': return 'bg-red-50 text-red-700 border-red-100';
    default: return 'bg-slate-50 text-slate-700 border-slate-100';
  }
};

const getStatusDotColor = (status) => {
  switch (status) {
    case 'ĐANG_SỬ_DỤNG': return 'bg-blue-500';
    case 'SẴN_SÀNG': return 'bg-green-500';
    case 'ĐANG_SỬA_CHỮA': return 'bg-orange-500';
    case 'ĐÃ_THANH_LÝ': return 'bg-red-500';
    default: return 'bg-slate-500';
  }
};

const getIcon = (cat) => {
    if (cat === 'Thiết bị IT') return 'laptop_mac';
    if (cat === 'Nội thất') return 'chair';
    if (cat === 'Phương tiện') return 'directions_car';
    return 'shelves';
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
    const ok = await showConfirm('Thanh lý tài sản', `Bạn có chắc muốn thanh lý tài sản ${asset.name}? Action này sẽ gỡ bỏ tài sản khỏi danh sách sử dụng.`);
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
