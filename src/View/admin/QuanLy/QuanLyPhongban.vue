<template>
  <div class="p-4 md:p-6 w-full mx-auto flex flex-col font-sans gap-6 relative">
    
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-slate-800 tracking-tight">Quản lý phòng ban</h1>
        <p class="text-sm text-slate-500 font-medium mt-1">Phân bổ, thiết lập và quản lý sơ đồ tổ chức công ty.</p>
      </div>
      <button @click="openModal('add')" class="bg-[#3b3abb] hover:bg-blue-800 text-white font-semibold py-2.5 px-5 rounded-lg shadow-sm transition-colors flex items-center gap-2 shrink-0">
        <span class="material-symbols-outlined text-[20px] font-bold" style="font-variation-settings: 'FILL' 1;">add_box</span>
        Thêm phòng ban
      </button>
    </div>

    <!-- Stats summary (Hồi trước nằm bên phải, giờ đem lên trên) -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
      <div class="bg-indigo-50/60 rounded-xl border border-indigo-100/60 p-5 flex items-center gap-4 shadow-sm">
         <div class="w-12 h-12 rounded-full bg-white text-[#3b3abb] flex items-center justify-center shadow-sm">
           <span class="material-symbols-outlined text-[24px]" style="font-variation-settings: 'FILL' 1;">corporate_fare</span>
         </div>
         <div>
           <p class="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Tổng phòng ban</p>
           <p class="text-2xl font-extrabold text-[#3b3abb] mt-0.5">12</p>
         </div>
      </div>
      <div class="bg-emerald-50/60 rounded-xl border border-emerald-100/60 p-5 flex items-center gap-4 shadow-sm">
         <div class="w-12 h-12 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-sm">
           <span class="material-symbols-outlined text-[24px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
         </div>
         <div>
           <p class="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Đang hoạt động</p>
           <p class="text-2xl font-extrabold text-emerald-600 mt-0.5">10</p>
         </div>
      </div>
      <div class="bg-amber-50/60 rounded-xl border border-amber-100/60 p-5 flex items-center gap-4 shadow-sm">
         <div class="w-12 h-12 rounded-full bg-white text-amber-600 flex items-center justify-center shadow-sm">
           <span class="material-symbols-outlined text-[24px]">account_tree</span>
         </div>
         <div>
           <p class="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Cấu trúc</p>
           <p class="text-2xl font-extrabold text-amber-600 mt-0.5">3 <span class="text-sm font-medium text-slate-600 ml-1">cấp bậc</span></p>
         </div>
      </div>
    </div>

    <!-- Main Content: Department List -->
    <div class="w-full flex flex-col gap-5 border border-slate-100 bg-white p-6 rounded-2xl shadow-sm">
      
      <!-- Filters & Meta -->
      <div class="flex flex-wrap justify-between items-center gap-4 border-b border-slate-100 pb-5">
        <div class="flex gap-3">
          <div class="relative">
            <select class="appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#3b3abb]/50 focus:bg-white cursor-pointer transition-colors shadow-sm">
              <option>Trạng thái: Đang hoạt động</option>
              <option>Tất cả trạng thái</option>
            </select>
            <span class="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">expand_more</span>
          </div>
          <div class="relative">
            <select class="appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#3b3abb]/50 focus:bg-white cursor-pointer transition-colors shadow-sm">
              <option>Loại phòng ban</option>
              <option>Chuyên môn</option>
              <option>Kinh doanh</option>
            </select>
            <span class="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">expand_more</span>
          </div>
        </div>
        <span class="text-xs text-slate-400 font-medium italic">Cập nhật lần cuối: Hôm nay, 09:45 AM</span>
      </div>

      <!-- Table Data -->
      <div class="overflow-x-auto overflow-y-visible">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-200 text-xs text-slate-500 font-bold uppercase tracking-wider">
              <th class="py-4 px-2 w-[35%]">Tên phòng ban</th>
              <th class="py-4 px-2">Mã phòng</th>
              <th class="py-4 px-2">Trưởng phòng</th>
              <th class="py-4 px-2">Trạng thái</th>
              <th class="py-4 px-2 text-center">Số lượng nhân sự</th>
              <th class="py-4 px-2 text-center w-24">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100/80">
            <tr v-for="(dept, index) in departments" :key="index" class="hover:bg-slate-50/70 transition-colors group">
              <td class="py-5 px-2">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-indigo-50/50 text-[#3b3abb] flex items-center justify-center border border-indigo-100 shadow-sm shrink-0">
                    <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">{{ dept.icon }}</span>
                  </div>
                  <span class="font-bold text-slate-800 text-sm whitespace-nowrap">{{ dept.name }}</span>
                </div>
              </td>
              <td class="py-5 px-2 text-slate-600 font-semibold text-sm">{{ dept.code }}</td>
              <td class="py-5 px-2 text-slate-600 font-medium text-sm">{{ dept.manager }}</td>
              <td class="py-5 px-2">
                <span v-if="dept.active" class="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-bold bg-green-50 text-green-600 border border-green-200/60">
                  ĐANG HOẠT ĐỘNG
                </span>
                <span v-else class="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200/60">
                  ĐÃ GIẢI THỂ
                </span>
              </td>
              <td class="py-5 px-2 text-center font-bold text-slate-700 text-sm">{{ dept.count }}</td>
              <td class="py-5 px-2 text-center flex items-center justify-center gap-1">
                <button @click="openModal('edit', dept)" class="text-slate-400 hover:text-[#3b3abb] transition-colors rounded-lg p-2 hover:bg-indigo-50" title="Chỉnh sửa">
                  <span class="material-symbols-outlined text-[20px]">edit</span>
                </button>
                <button class="text-slate-400 hover:text-rose-500 transition-colors rounded-lg p-2 hover:bg-rose-50" title="Xoá">
                  <span class="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Overlay -->
    <div v-if="showModal" class="fixed inset-0 z-[1050] flex items-center justify-center p-4 sm:p-6" style="margin-top: 0 !important;">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" @click="closeModal"></div>
      
      <!-- Modal Panel -->
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-[500px] flex flex-col max-h-[90vh] relative z-10 transform transition-all">
        <!-- Form Header -->
        <div class="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
          <div class="flex items-center gap-2.5 text-slate-900">
            <span class="material-symbols-outlined text-[#3b3abb] text-[22px]">{{ isEdit ? 'edit' : 'add_circle' }}</span>
            <h3 class="font-bold text-[17px]">{{ isEdit ? 'Chỉnh sửa phòng ban' : 'Thêm mới phòng ban' }}</h3>
          </div>
          <button @click="closeModal" class="text-slate-400 hover:text-rose-500 transition-colors rounded-full p-1.5 hover:bg-rose-50 outline-none">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        
        <!-- Form Body -->
        <div class="p-6 flex flex-col gap-5 overflow-y-auto custom-scrollbar">
          <!-- MÃ PHÒNG BAN -->
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Mã phòng ban <span class="text-rose-500">*</span></label>
            <input type="text" :value="isEdit ? 'PPM004' : ''" placeholder="Vd: KKD001" class="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#3b3abb]/20 focus:border-[#3b3abb] font-semibold shadow-sm transition-shadow" />
          </div>

          <!-- TÊN PHÒNG BAN -->
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Tên phòng ban <span class="text-rose-500">*</span></label>
            <input type="text" :value="isEdit ? 'Phòng Phát Triển Phần Mềm' : ''" placeholder="Nhập tên phòng ban" class="w-full px-4 py-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#3b3abb]/20 focus:border-[#3b3abb] font-semibold shadow-sm transition-all" />
          </div>

          <!-- PHÒNG BAN CHA -->
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Phòng ban cha</label>
            <div class="relative">
              <select class="appearance-none w-full px-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#3b3abb]/20 focus:border-[#3b3abb] font-semibold cursor-pointer shadow-sm transition-all">
                <option value="">-- Không có (Phòng ban gốc) --</option>
                <option :selected="isEdit">Khối Kỹ Thuật</option>
                <option>Tổng Công ty (HO)</option>
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 flex items-center pr-1 border-l border-slate-300 pl-3">
                 <span class="material-symbols-outlined text-[20px]">account_tree</span>
              </div>
            </div>
          </div>

          <!-- TRƯỞNG PHÒNG -->
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Trưởng phòng</label>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
              <input type="text" placeholder="Tìm kiếm nhân sự..." class="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#3b3abb]/20 focus:border-[#3b3abb] shadow-sm font-medium transition-all placeholder:text-slate-400" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-5">
            <!-- NGÀY THÀNH LẬP -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Ngày thành lập</label>
              <div class="relative">
                <input type="date" :value="isEdit ? '2023-01-15' : ''" class="w-full pl-4 pr-4 py-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#3b3abb]/20 focus:border-[#3b3abb] font-semibold shadow-sm transition-all text-sm" />
              </div>
            </div>

            <!-- TRẠNG THÁI -->
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Trạng thái hoạt động</label>
              <div class="flex items-center gap-3 h-[42px]">
                <button class="w-11 h-6 bg-[#3b3abb] rounded-full relative transition-colors duration-200 focus:outline-none">
                  <span class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-200 transform translate-x-5"></span>
                </button>
                <span class="text-sm font-semibold text-[#3b3abb]">Đang hoạt động</span>
              </div>
            </div>
          </div>

          <!-- MÔ TẢ -->
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Mô tả</label>
            <textarea rows="3" placeholder="Ghi chú thêm về phòng ban..." class="w-full px-4 py-3 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#3b3abb]/20 focus:border-[#3b3abb] resize-none shadow-sm transition-all"></textarea>
          </div>
        </div>
        
        <!-- Form Actions -->
        <div class="px-6 py-4 border-t border-slate-100 flex gap-3 bg-slate-50/50 rounded-b-2xl shrink-0">
          <button @click="closeModal" class="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2.5 rounded-lg shadow-sm transition-all text-sm">
            Hủy
          </button>
          <button @click="closeModal" class="flex-1 bg-[#3b3abb] hover:bg-blue-800 text-white font-bold py-2.5 rounded-lg shadow-sm transition-all text-sm">
            {{ isEdit ? 'Cập nhật' : 'Thêm mới' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const showModal = ref(false);
const isEdit = ref(false);

const openModal = (type, dept = null) => {
  isEdit.value = type === 'edit';
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const departments = ref([
  { name: 'Tổng Công ty (HO)', code: 'TCT001', manager: 'Nguyễn Văn A', active: true, count: 45, icon: 'corporate_fare' },
  { name: 'Khối Kinh Doanh', code: 'KKD002', manager: 'Trần Thị B', active: true, count: 28, icon: 'groups' },
  { name: 'Khối Kỹ Thuật', code: 'KKT003', manager: 'Lê Văn C', active: true, count: 15, icon: 'engineering' },
  { name: 'Phát Triển Phần Mềm', code: 'PPM004', manager: 'Chưa cập nhật', active: false, count: 0, icon: 'event_note' },
]);
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

/* Custom scrollbar cho Modal */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 4px;
}
</style>
