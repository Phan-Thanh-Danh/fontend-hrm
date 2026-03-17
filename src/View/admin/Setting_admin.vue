<template>
 <div class="space-y-10 pb-10 max-w-6xl mx-auto">
 <!-- Header -->
 <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 bg-transparent text-left">
 <div class="bg-transparent text-left">
 <h1 class="text-3xl font-semibold text-[var(--sys-text-primary)] mb-1">Cấu hình Hệ thống</h1>
 <p class="text-[10px] text-[var(--sys-text-secondary)] font-semibold opacity-60">Tùy chỉnh tham số, phân quyền và cấu hình vận hành HRM toàn hệ thống.</p>
 </div>
 <div class="text-left bg-transparent">
 <button 
 @click="saveAllSettings"
 class="h-14 px-12 bg-[var(--sys-brand-solid)] text-white rounded-2xl font-semibold hover:bg-[var(--sys-brand-hover)] transition-all flex items-center gap-3 active:scale-95 shadow-2xl shadow-[var(--sys-brand-solid)]/20 text-[10px] whitespace-nowrap"
 >
 <span class="material-symbols-outlined text-xl">save_as</span>
 Lưu cấu hình
 </button>
 </div>
 </div>

 <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
 <!-- Sidebar Tabs -->
 <div class="lg:col-span-3 space-y-3 bg-transparent">
 <button 
 v-for="tab in tabs" 
 :key="tab.id"
 @click="activeTab = tab.id"
 :class="[
 'w-full flex items-center gap-4 px-6 py-4 rounded-[2rem] font-semibold text-[13px] transition-all duration-300 group whitespace-nowrap',
 activeTab === tab.id ? 'bg-[var(--sys-brand-solid)] text-white shadow-xl shadow-[var(--sys-brand-solid)]/20 translate-x-1' : 'text-[var(--sys-text-secondary)] hover:bg-[var(--sys-bg-hover)]'
 ]"
 >
 <span :class="['material-symbols-outlined text-xl transition-transform group-hover:rotate-12', activeTab === tab.id ? 'text-white' : 'text-[var(--sys-brand-solid)] opacity-60']">{{ tab.icon }}</span>
 {{ tab.label }}
 </button>
 </div>

 <!-- Content Area -->
 <div class="lg:col-span-9 bg-transparent">
 <div class="bg-[var(--sys-bg-surface)] rounded-[3rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden p-10 md:p-14 relative group/content">
 <div class="absolute -right-16 -top-16 w-48 h-48 bg-[var(--sys-brand-soft)] rounded-full opacity-0 group-hover/content:opacity-20 transition-all duration-700"></div>
 
 <!-- General Settings -->
 <div v-if="activeTab === 'general'" class="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
 <div class="bg-transparent text-left">
 <h3 class="text-xl font-semibold text-[var(--sys-text-primary)] flex items-center gap-4 mb-10">
 <span class="w-2.5 h-8 bg-[var(--sys-brand-solid)] rounded-full shadow-lg shadow-[var(--sys-brand-solid)]/30"></span>
 Nhận dạng Tổ chức
 </h3>
 <div class="grid grid-cols-1 md:grid-cols-2 gap-10 bg-transparent">
 <div class="space-y-3 bg-transparent text-left">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60 block text-left">Tên pháp nhân chính thức</label>
 <input v-model="settings.companyName" type="text" class="w-full px-6 py-4 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl font-semibold text-sm text-[var(--sys-text-primary)] focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] outline-none transition-all shadow-sm">
 </div>
 <div class="space-y-3 bg-transparent text-left">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60 block text-left">Mã số thuế doanh nghiệp</label>
 <input v-model="settings.taxCode" type="text" class="w-full px-6 py-4 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl font-semibold text-sm text-[var(--sys-text-primary)] focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] outline-none transition-all shadow-sm">
 </div>
 <div class="md:col-span-2 space-y-3 bg-transparent text-left">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60 block text-left">Địa chỉ trụ sở điều hành</label>
 <input v-model="settings.address" type="text" class="w-full px-6 py-4 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl font-semibold text-sm text-[var(--sys-text-primary)] focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] outline-none transition-all shadow-sm">
 </div>
 </div>
 </div>

 <div class="h-px bg-gradient-to-r from-transparent via-[var(--sys-border-subtle)] to-transparent"></div>

 <div class="bg-transparent text-left">
 <h3 class="text-xl font-semibold text-[var(--sys-text-primary)] flex items-center gap-4 mb-10">
 <span class="w-2.5 h-8 bg-[var(--sys-success-solid)] rounded-full shadow-lg shadow-[var(--sys-success-solid)]/30"></span>
 Ngôn ngữ & Thời vận
 </h3>
 <div class="grid grid-cols-1 md:grid-cols-2 gap-10 bg-transparent">
 <div class="space-y-3 bg-transparent text-left">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60 block text-left">Ngôn ngữ giao diện mặc định</label>
 <select v-model="settings.language" class="w-full px-6 py-4 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl font-semibold text-sm text-[var(--sys-text-primary)] focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] outline-none transition-all shadow-sm appearance-none">
 <option value="vi">Tiếng Việt (Vietnam)</option>
 <option value="en">English (United States)</option>
 </select>
 </div>
 <div class="space-y-3 bg-transparent text-left">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60 block text-left">Múi giờ vận hành (Timezone)</label>
 <select v-model="settings.timezone" class="w-full px-6 py-4 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl font-semibold text-sm text-[var(--sys-text-primary)] focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] outline-none transition-all shadow-sm appearance-none">
 <option value="Asia/Ho_Chi_Minh">(GMT+07:00) Hanoi / Ho Chi Minh</option>
 <option value="UTC">(GMT+00:00) Universal UTC</option>
 </select>
 </div>
 </div>
 </div>
 </div>

 <!-- Notification Settings -->
 <div v-if="activeTab === 'notifications'" class="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
 <h3 class="text-xl font-semibold text-[var(--sys-text-primary)] mb-12 text-left">Tùy chọn Kênh phát thông tin</h3>
 
 <div class="grid grid-cols-1 gap-6">
 <div v-for="notify in notificationOptions" :key="notify.id" class="flex items-center justify-between p-8 rounded-[2.5rem] border border-[var(--sys-border-subtle)] hover:bg-[var(--sys-bg-hover)] transition-all group/item bg-[var(--sys-bg-page)]/30 hover:shadow-xl hover:scale-[1.01]">
 <div class="flex items-center gap-6 bg-transparent text-left">
 <div :class="['w-16 h-16 rounded-[1.5rem] flex items-center justify-center border transition-all shadow-lg text-lg font-semibold group-hover/item:scale-110', notify.bg, notify.color]">
 <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">{{ notify.icon }}</span>
 </div>
 <div class="bg-transparent text-left">
 <p class="text-lg font-semibold text-[var(--sys-text-primary)] mb-1 ">{{ notify.label }}</p>
 <p class="text-[10px] text-[var(--sys-text-secondary)] font-semibold opacity-60">{{ notify.desc }}</p>
 </div>
 </div>
 <label class="relative inline-flex items-center cursor-pointer scale-110">
 <input type="checkbox" v-model="notify.enabled" class="sr-only peer">
 <div class="w-16 h-8 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-[var(--sys-border-subtle)] after:border after:rounded-full after:h-5 after:w-7 after:transition-all peer-checked:bg-[var(--sys-brand-solid)] peer-checked:shadow-lg peer-checked:shadow-[var(--sys-brand-solid)]/30"></div>
 </label>
 </div>
 </div>
 </div>

 <!-- Security Settings -->
 <div v-if="activeTab === 'security'" class="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
 <div class="p-10 bg-[var(--sys-warning-soft)] rounded-[3rem] border border-[var(--sys-warning-border)] flex flex-col md:flex-row items-center md:items-start gap-8 shadow-inner">
 <div class="w-16 h-16 shrink-0 bg-[var(--sys-warning-solid)] text-white rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-[var(--sys-warning-solid)]/30 scale-110 rotate-3 animate-pulse">
 <span class="material-symbols-outlined text-3xl">verified_user</span>
 </div>
 <div class="bg-transparent text-left">
 <h4 class="text-lg font-semibold text-[var(--sys-warning-text)] mb-2 ">Giao thức Bảo mật Phê chuẩn</h4>
 <p class="text-xs text-[var(--sys-warning-text)] font-semibold leading-relaxed opacity-80 ">Thiết lập các quy trình xác thực, kiến trúc mã hóa và định danh an toàn cho toàn bộ hệ thống tri thức doanh nghiệp.</p>
 </div>
 </div>

 <div class="space-y-10 group/sec">
 <div class="flex items-center justify-between p-8 bg-[var(--sys-bg-page)]/30 border border-[var(--sys-border-subtle)] rounded-[2.5rem] hover:bg-white transition-all shadow-sm">
 <div class="bg-transparent text-left">
 <p class="text-lg font-semibold text-[var(--sys-text-primary)] mb-1 ">Cưỡng bức Xác thực 02 yếu tố (2FA)</p>
 <p class="text-[10px] text-[var(--sys-text-secondary)] font-semibold opacity-60">Yêu cầu bắt buộc đối với cấp độ quản lý và quản trị viên</p>
 </div>
 <label class="relative inline-flex items-center cursor-pointer scale-110">
 <input type="checkbox" v-model="settings.require2FA" class="sr-only peer">
 <div class="w-16 h-8 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-7 after:transition-all peer-checked:bg-[var(--sys-brand-solid)] peer-checked:shadow-lg peer-checked:shadow-[var(--sys-brand-solid)]/30"></div>
 </label>
 </div>

 <div class="space-y-4 bg-transparent text-left">
 <label class="text-[10px] font-semibold text-[var(--sys-text-secondary)] ml-2 opacity-60 block text-left">Ngưỡng thời gian tự động khóa phiên truy cập (Session Timeout)</label>
 <div class="relative group/sel">
 <select v-model="settings.sessionTimeout" class="w-full px-8 py-5 bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] rounded-2xl font-semibold text-sm text-[var(--sys-text-primary)] focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] outline-none transition-all shadow-sm appearance-none">
 <option value="30">Ngưng hoạt động sau 30 phút (Khuyên dùng)</option>
 <option value="60">Ngưng hoạt động sau 60 phút</option>
 <option value="120">Ngưng hoạt động sau 120 phút</option>
 <option value="0">Duy trì kết nối vĩnh viễn (Rủi ro cao)</option>
 </select>
 <span class="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-[var(--sys-text-secondary)] opacity-40 group-hover/sel:text-[var(--sys-brand-solid)] transition-colors">stat_minus_1</span>
 </div>
 </div>
 </div>
 </div>

 <!-- Backup Settings -->
 <div v-if="activeTab === 'backup'" class="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 py-10">
 <div class="flex flex-col items-center justify-center text-center">
 <div class="w-28 h-28 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-[2.5rem] flex items-center justify-center mb-10 shadow-xl border border-[var(--sys-brand-border)] relative overflow-hidden group/back">
 <div class="absolute inset-0 bg-white opacity-0 group-hover/back:opacity-20 transition-all duration-500"></div>
 <span class="material-symbols-outlined text-5xl group-hover/back:scale-110 transition-transform " style="font-variation-settings: 'FILL' 1;">cloud_sync</span>
 </div>
 <div class="bg-transparent text-center max-w-lg">
 <h3 class="text-3xl font-semibold text-[var(--sys-text-primary)] mb-4 ">Lưu ký & Phục hồi Tri thức</h3>
 <p class="text-[11px] text-[var(--sys-text-secondary)] font-semibold opacity-60 leading-relaxed">Đảm bảo an toàn tuyệt đối cho cơ sở dữ liệu nhân sự bằng việc thiết lập các điểm sao lưu tự động và khôi phục khi có sự cố hệ thống.</p>
 </div>
 </div>

 <div class="flex flex-col sm:flex-row items-center justify-center gap-6 bg-transparent">
 <button class="w-full sm:w-auto px-12 py-5 bg-[var(--sys-brand-solid)] text-white rounded-3xl font-semibold hover:bg-[var(--sys-brand-hover)] shadow-2xl shadow-[var(--sys-brand-solid)]/30 transition-all flex items-center justify-center gap-3 text-[10px] active:scale-95">
 <span class="material-symbols-outlined text-xl">backup</span>
 Tạo snapshot dữ liệu
 </button>
 <button class="w-full sm:w-auto px-12 py-5 bg-[var(--sys-bg-page)] border-2 border-[var(--sys-border-subtle)] text-[var(--sys-text-primary)] rounded-3xl font-semibold hover:border-[var(--sys-brand-solid)] hover:text-[var(--sys-brand-solid)] transition-all flex items-center justify-center gap-3 shadow-sm text-[10px] active:scale-95">
 <span class="material-symbols-outlined text-xl">history_toggle_off</span>
 Chọn điểm khôi phục
 </button>
 </div>

 <div class="flex flex-col items-center gap-2 bg-transparent">
 <div class="inline-flex items-center gap-3 px-6 py-2 bg-[var(--sys-bg-page)] rounded-full border border-[var(--sys-border-subtle)] shadow-inner">
 <span class="w-2 h-2 rounded-full bg-[var(--sys-success-solid)] animate-pulse"></span>
 <p class="text-[10px] text-[var(--sys-text-secondary)] font-semibold opacity-60">Lần lưu ký cuối: 14/03/2026 • 02:30 AM (Bản chính thức)</p>
 </div>
 </div>
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
 { id: 'general', label: 'Cấu hình Tổng quan', icon: 'settings' },
 { id: 'notifications', label: 'Luồng Thông tin', icon: 'notifications_active' },
 { id: 'security', label: 'Tường lửa & Bảo mật', icon: 'security' },
 { id: 'backup', label: 'Lưu ký Dữ liệu', icon: 'cloud_sync' },
];

const settings = ref({
 companyName: 'Tập đoàn Công nghệ & Giải pháp Nhân sự HRM Global',
 taxCode: '01099887766',
 address: 'Complex Building, 456 Trần Duy Hưng, Cầu Giấy, Hà Nội',
 language: 'vi',
 timezone: 'Asia/Ho_Chi_Minh',
 require2FA: true,
 sessionTimeout: '60'
});

const notificationOptions = ref([
 { id: 1, label: 'Email Trạm tin', desc: 'Phê duyệt lương, thông báo nội bộ qua hệ thống Mailing chuyên dụng', icon: 'mail', bg: 'bg-[var(--sys-brand-soft)]', color: 'text-[var(--sys-brand-solid)]', enabled: true },
 { id: 2, label: 'Thông báo Nội bộ (Real-time)', desc: 'Xử lý đơn từ và nhắc lịch làm việc tức thời qua Web Push', icon: 'auto_awesome', bg: 'bg-[var(--sys-success-soft)]', color: 'text-[var(--sys-success-text)]', enabled: true },
 { id: 3, label: 'SMS Gateway', desc: 'Xác thực OTP giao dịch và cảnh báo xâm nhập (Dịch vụ trả phí)', icon: 'sms_failed', bg: 'bg-[var(--sys-warning-soft)]', color: 'text-[var(--sys-warning-text)]', enabled: false },
]);

const saveAllSettings = async () => {
 await showAlert('Phê chuẩn Cấu hình', 'Toàn bộ các tham số vận hành hệ thống đã được cập nhật thành công trên máy chủ!');
};
</script>

<style scoped>
@keyframes in {
 from { opacity: 0; transform: translateY(10px); }
 to { opacity: 1; transform: translateY(0); }
}
.animate-in {
 animation: in 0.5s ease-out forwards;
}

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
