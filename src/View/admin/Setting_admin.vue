<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-2xl font-black text-slate-900 tracking-tight">Cài đặt Hệ thống</h1>
        <p class="text-slate-500 font-medium italic">Tùy chỉnh tham số, phân quyền và cấu hình vận hành HRM</p>
      </div>
      <button 
        @click="saveAllSettings"
        class="px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all flex items-center gap-2 active:scale-95"
      >
        <span class="material-symbols-outlined">save</span>
        Lưu tất cả thay đổi
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Sidebar Tabs -->
      <div class="lg:col-span-3 space-y-2">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black text-sm transition-all ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-lg shadow-blue-100/50 border border-blue-50' : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'}`"
        >
          <span class="material-symbols-outlined">{{ tab.icon }}</span>
          {{ tab.label }}
        </button>
      </div>

      <!-- Content Area -->
      <div class="lg:col-span-9">
        <div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-8 md:p-10">
          
          <!-- General Settings -->
          <div v-if="activeTab === 'general'" class="space-y-8">
            <h3 class="text-xl font-black text-slate-900 flex items-center gap-3">
              <span class="w-2 h-8 bg-blue-600 rounded-full"></span>
              Thông tin Công ty
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Tên tổ chức</label>
                <input v-model="settings.companyName" type="text" class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all">
              </div>
              <div class="space-y-2">
                <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Mã số thuế</label>
                <input v-model="settings.taxCode" type="text" class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all">
              </div>
              <div class="md:col-span-2 space-y-2">
                <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Địa chỉ trụ sở</label>
                <input v-model="settings.address" type="text" class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all">
              </div>
            </div>

            <hr class="border-slate-50">

            <h3 class="text-xl font-black text-slate-900 flex items-center gap-3">
              <span class="w-2 h-8 bg-emerald-500 rounded-full"></span>
              Cấu hình Ngôn ngữ & Vùng
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Ngôn ngữ mặc định</label>
                <select v-model="settings.language" class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all">
                  <option value="vi">Tiếng Việt (VN)</option>
                  <option value="en">English (US)</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Múi giờ (Timezone)</label>
                <select v-model="settings.timezone" class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all">
                  <option value="Asia/Ho_Chi_Minh">(GMT+07:00) Hanoi</option>
                  <option value="UTC">(GMT+00:00) UTC</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Notification Settings -->
          <div v-if="activeTab === 'notifications'" class="space-y-6">
            <h3 class="text-xl font-black text-slate-900 mb-8">Kênh thông báo</h3>
            
            <div v-for="notify in notificationOptions" :key="notify.id" class="flex items-center justify-between p-6 rounded-3xl border border-slate-100 hover:bg-slate-50/50 transition-all group">
              <div class="flex items-center gap-4">
                <div :class="`w-12 h-12 rounded-2xl flex items-center justify-center ${notify.bg} ${notify.color} shadow-inner text-base`">
                  <span class="material-symbols-outlined">{{ notify.icon }}</span>
                </div>
                <div>
                  <p class="font-black text-slate-900 mb-0.5">{{ notify.label }}</p>
                  <p class="text-xs text-slate-400 font-bold italic">{{ notify.desc }}</p>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="notify.enabled" class="sr-only peer">
                <div class="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <!-- Security Settings -->
          <div v-if="activeTab === 'security'" class="space-y-8">
             <div class="p-8 bg-amber-50 rounded-[2rem] border border-amber-100 flex items-start gap-5">
                <div class="w-12 h-12 shrink-0 bg-amber-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200">
                   <span class="material-symbols-outlined">security</span>
                </div>
                <div>
                   <h4 class="font-black text-amber-900 mb-1">Cấu hình Bảo mật Nâng cao</h4>
                   <p class="text-xs text-amber-700 font-medium leading-relaxed">Thiết lập các quy tắc đăng nhập, thời hạn token và chính sách mật khẩu cho toàn bộ thành viên trong tổ chức.</p>
                </div>
             </div>

             <div class="space-y-6">
                <div class="flex items-center justify-between py-2">
                   <div>
                      <p class="font-black text-slate-900">Yêu cầu xác thực 2 lớp (2FA)</p>
                      <p class="text-xs text-slate-400 font-bold italic">Bắt buộc đối với tài khoản Admin và Manager</p>
                   </div>
                   <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="settings.require2FA" class="sr-only peer">
                    <div class="w-14 h-7 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div class="space-y-2">
                  <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Thời gian tự động đăng xuất</label>
                  <select v-model="settings.sessionTimeout" class="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all">
                    <option value="30">Sau 30 phút không hoạt động</option>
                    <option value="60">Sau 60 phút không hoạt động</option>
                    <option value="120">Sau 2 giờ không hoạt động</option>
                    <option value="0">Không bao giờ</option>
                  </select>
                </div>
             </div>
          </div>

          <!-- Backup Settings -->
          <div v-if="activeTab === 'backup'" class="space-y-8 text-center py-10">
             <div class="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner border border-blue-100/50">
                <span class="material-symbols-outlined text-5xl animate-bounce">cloud_download</span>
             </div>
             <div>
                <h3 class="text-2xl font-black text-slate-900 mb-2">Sao lưu & Khôi phục</h3>
                <p class="text-slate-500 font-medium max-w-md mx-auto italic">Bảo vệ dữ liệu HRM của bạn bằng cách tạo bản sao lưu định kỳ lên đám mây hoặc tải về máy cục bộ.</p>
             </div>
             <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
                <button class="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all flex items-center gap-2">
                   <span class="material-symbols-outlined">backup</span>
                   Tạo bản sao lưu ngay
                </button>
                <button class="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black hover:bg-slate-50 transition-all flex items-center gap-2">
                   <span class="material-symbols-outlined">restore</span>
                   Khôi phục từ file
                </button>
             </div>
             <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-8 italic">Bản sao lưu gần nhất: 14/03/2026 - 02:30 AM (Bản tự động)</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('general');

const tabs = [
  { id: 'general', label: 'Cài đặt chung', icon: 'settings' },
  { id: 'notifications', label: 'Thông báo', icon: 'notifications_active' },
  { id: 'security', label: 'Bảo mật', icon: 'admin_panel_settings' },
  { id: 'backup', label: 'Sao lưu dữ liệu', icon: 'cloud_sync' },
];

const settings = ref({
  companyName: 'Công ty Cổ phần Giải pháp Công nghệ HRM-Pro',
  taxCode: '01012345678',
  address: 'Số 123, Đường Duy Tân, Quận Cầu Giấy, Hà Nội',
  language: 'vi',
  timezone: 'Asia/Ho_Chi_Minh',
  require2FA: true,
  sessionTimeout: '60'
});

const notificationOptions = ref([
  { id: 1, label: 'Email thông báo', desc: 'Gửi bảng lương, thông báo nghỉ phép qua Email', icon: 'mail', bg: 'bg-blue-50', color: 'text-blue-600', enabled: true },
  { id: 2, label: 'Thông báo đẩy (Push)', desc: 'Nhận thông báo ngay trên trình duyệt và ứng dụng di động', icon: 'send_to_mobile', bg: 'bg-emerald-50', color: 'text-emerald-600', enabled: true },
  { id: 3, label: 'Tin nhắn SMS', desc: 'Gửi mã xác thực OTP và thông báo khẩn cấp (Phí 500đ/tin)', icon: 'sms', bg: 'bg-orange-50', color: 'text-orange-600', enabled: false },
]);

const saveAllSettings = () => {
  // Logic lưu vào localStorage hoặc API
  alert('Đã lưu tất cả các cấu hình hệ thống thành công!');
};
</script>

<style scoped>
/* Custom switch animation logic is handled by Tailwind classes */
</style>
