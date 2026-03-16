<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div class="text-left">
        <h1 class="text-2xl font-black text-[var(--sys-text-primary)] tracking-tight text-left">Cài đặt Hệ thống</h1>
        <p class="text-[var(--sys-text-secondary)] font-medium italic text-left">Tùy chỉnh tham số, phân quyền và cấu hình vận hành HRM</p>
      </div>
      <button 
        @click="saveAllSettings"
        class="px-8 py-3.5 bg-[var(--sys-brand-solid)] text-white rounded-2xl font-black hover:bg-[var(--sys-brand-hover)] transition-all flex items-center gap-2 active:scale-95 shadow-xl shadow-[var(--sys-brand-solid-lch-30)]"
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
          :class="`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black text-sm transition-all ${activeTab === tab.id ? 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border border-[var(--sys-brand-border)]' : 'text-[var(--sys-text-secondary)]/60 hover:text-[var(--sys-text-primary)] hover:bg-[var(--sys-bg-hover)]'}`"
        >
          <span class="material-symbols-outlined">{{ tab.icon }}</span>
          {{ tab.label }}
        </button>
      </div>

      <!-- Content Area -->
      <div class="lg:col-span-9">
        <div class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden p-8 md:p-10">
          
          <!-- General Settings -->
          <div v-if="activeTab === 'general'" class="space-y-8">
            <h3 class="text-xl font-black text-[var(--sys-text-primary)] flex items-center gap-3 italic uppercase tracking-tighter">
              <span class="w-2.5 h-8 bg-[var(--sys-brand-solid)] rounded-full shadow-sm shadow-[var(--sys-brand-solid-lch-30)]"></span>
              Thông tin Công ty
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-transparent">
              <div class="space-y-2 bg-transparent">
                <label class="text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest ml-1 bg-transparent">Tên tổ chức</label>
                <input v-model="settings.companyName" type="text" class="w-full px-5 py-3.5 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-2xl font-bold text-[var(--sys-text-primary)] focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] outline-none transition-all">
              </div>
              <div class="space-y-2 bg-transparent">
                <label class="text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest ml-1 bg-transparent">Mã số thuế</label>
                <input v-model="settings.taxCode" type="text" class="w-full px-5 py-3.5 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-2xl font-bold text-[var(--sys-text-primary)] focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] outline-none transition-all">
              </div>
              <div class="md:col-span-2 space-y-2 bg-transparent">
                <label class="text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest ml-1 bg-transparent">Địa chỉ trụ sở</label>
                <input v-model="settings.address" type="text" class="w-full px-5 py-3.5 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-2xl font-bold text-[var(--sys-text-primary)] focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] outline-none transition-all">
              </div>
            </div>

            <hr class="border-[var(--sys-border-subtle)]">

            <h3 class="text-xl font-black text-[var(--sys-text-primary)] flex items-center gap-3 italic uppercase tracking-tighter">
              <span class="w-2.5 h-8 bg-[var(--sys-success-solid)] rounded-full shadow-sm shadow-[var(--sys-success-solid-lch-30)]"></span>
              Cấu hình Ngôn ngữ & Vùng
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-transparent">
              <div class="space-y-2 bg-transparent">
                <label class="text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest ml-1 bg-transparent">Ngôn ngữ mặc định</label>
                <select v-model="settings.language" class="w-full px-5 py-3.5 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-2xl font-bold text-[var(--sys-text-primary)] focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] outline-none transition-all">
                  <option value="vi">Tiếng Việt (VN)</option>
                  <option value="en">English (US)</option>
                </select>
              </div>
              <div class="space-y-2 bg-transparent">
                <label class="text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest ml-1 bg-transparent">Múi giờ (Timezone)</label>
                <select v-model="settings.timezone" class="w-full px-5 py-3.5 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-2xl font-bold text-[var(--sys-text-primary)] focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] outline-none transition-all">
                  <option value="Asia/Ho_Chi_Minh">(GMT+07:00) Hanoi</option>
                  <option value="UTC">(GMT+00:00) UTC</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Notification Settings -->
          <div v-if="activeTab === 'notifications'" class="space-y-6">
            <h3 class="text-xl font-black text-[var(--sys-text-primary)] mb-8 italic uppercase tracking-tighter">Kênh thông báo</h3>
            
            <div v-for="notify in notificationOptions" :key="notify.id" class="flex items-center justify-between p-6 rounded-3xl border border-[var(--sys-border-subtle)] hover:bg-[var(--sys-bg-hover)] transition-all group bg-[var(--sys-bg-surface)]">
              <div class="flex items-center gap-4 bg-transparent text-left">
                <div :class="`w-12 h-12 rounded-2xl flex items-center justify-center ${notify.bg} ${notify.color} shadow-inner text-base`">
                  <span class="material-symbols-outlined">{{ notify.icon }}</span>
                </div>
                <div class="bg-transparent text-left">
                  <p class="font-black text-[var(--sys-text-primary)] mb-0.5 bg-transparent text-left">{{ notify.label }}</p>
                  <p class="text-xs text-[var(--sys-text-secondary)] font-bold italic bg-transparent text-left">{{ notify.desc }}</p>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="notify.enabled" class="sr-only peer">
                <div class="w-14 h-7 bg-[var(--sys-bg-hover)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-6 after:transition-all peer-checked:bg-[var(--sys-brand-solid)]"></div>
              </label>
            </div>
          </div>

          <!-- Security Settings -->
          <div v-if="activeTab === 'security'" class="space-y-8">
             <div class="p-8 bg-[var(--sys-warning-soft)] rounded-[2rem] border border-[var(--sys-warning-border)] flex items-start gap-5">
                <div class="w-12 h-12 shrink-0 bg-[var(--sys-warning-solid)] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[var(--sys-warning-solid-lch-30)]">
                   <span class="material-symbols-outlined">security</span>
                </div>
                <div class="bg-transparent text-left">
                   <h4 class="font-black text-[var(--sys-warning-text)] mb-1 bg-transparent">Cấu hình Bảo mật Nâng cao</h4>
                   <p class="text-xs text-[var(--sys-warning-text)] font-medium leading-relaxed bg-transparent italic">Thiết lập các quy tắc đăng nhập, thời hạn token và chính sách mật khẩu cho toàn bộ thành viên trong tổ chức.</p>
                </div>
             </div>

             <div class="space-y-6">
                <div class="flex items-center justify-between py-2 bg-transparent">
                   <div class="bg-transparent text-left">
                      <p class="font-black text-[var(--sys-text-primary)] bg-transparent">Yêu cầu xác thực 2 lớp (2FA)</p>
                      <p class="text-xs text-[var(--sys-text-secondary)] font-bold italic bg-transparent">Bắt buộc đối với tài khoản Admin và Manager</p>
                   </div>
                   <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="settings.require2FA" class="sr-only peer">
                    <div class="w-14 h-7 bg-[var(--sys-bg-hover)] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-6 after:transition-all peer-checked:bg-[var(--sys-brand-solid)]"></div>
                  </label>
                </div>

                <div class="space-y-2 bg-transparent">
                  <label class="text-[11px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest ml-1 bg-transparent">Thời gian tự động đăng xuất</label>
                  <select v-model="settings.sessionTimeout" class="w-full px-5 py-3.5 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-2xl font-bold text-[var(--sys-text-primary)] focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] outline-none transition-all">
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
             <div class="w-24 h-24 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner border border-[var(--sys-brand-border)]">
                <span class="material-symbols-outlined text-5xl animate-bounce">cloud_download</span>
             </div>
             <div>
                <h3 class="text-2xl font-black text-[var(--sys-text-primary)] mb-2 italic uppercase tracking-tighter">Sao lưu & Khôi phục</h3>
                <p class="text-[var(--sys-text-secondary)] font-medium max-w-md mx-auto italic">Bảo vệ dữ liệu HRM của bạn bằng cách tạo bản sao lưu định kỳ lên đám mây hoặc tải về máy cục bộ.</p>
             </div>
             <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 bg-transparent">
                <button class="px-8 py-4 bg-[var(--sys-brand-solid)] text-white rounded-2xl font-black hover:bg-[var(--sys-brand-hover)] shadow-xl shadow-[var(--sys-brand-solid-lch-30)] transition-all flex items-center gap-2">
                   <span class="material-symbols-outlined">backup</span>
                   Tạo bản sao lưu ngay
                </button>
                <button class="px-8 py-4 bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-text-primary)] rounded-2xl font-black hover:bg-[var(--sys-bg-hover)] transition-all flex items-center gap-2 shadow-sm">
                   <span class="material-symbols-outlined">restore</span>
                   Khôi phục từ file
                </button>
             </div>
             <p class="text-[10px] text-[var(--sys-text-secondary)] font-black uppercase tracking-widest mt-8 italic bg-transparent">Bản sao lưu gần nhất: 14/03/2026 - 02:30 AM (Bản tự động)</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useConfirm } from '@/composables/useConfirm';

const { showAlert } = useConfirm();

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
  { id: 1, label: 'Email thông báo', desc: 'Gửi bảng lương, thông báo nghỉ phép qua Email', icon: 'mail', bg: 'bg-[var(--sys-brand-soft)]', color: 'text-[var(--sys-brand-solid)]', enabled: true },
  { id: 2, label: 'Thông báo đẩy (Push)', desc: 'Nhận thông báo ngay trên trình duyệt và ứng dụng di động', icon: 'send_to_mobile', bg: 'bg-[var(--sys-success-soft)]', color: 'text-[var(--sys-success-text)]', enabled: true },
  { id: 3, label: 'Tin nhắn SMS', desc: 'Gửi mã xác thực OTP và thông báo khẩn cấp (Phí 500đ/tin)', icon: 'sms', bg: 'bg-[var(--sys-warning-soft)]', color: 'text-[var(--sys-warning-text)]', enabled: false },
]);

const saveAllSettings = async () => {
  // Logic lưu vào localStorage hoặc API
  await showAlert('Cấu hình đã lưu', 'Đã lưu tất cả các cấu hình hệ thống thành công!');
};
</script>

<style scoped>
/* Custom switch animation logic is handled by Tailwind classes */
</style>
