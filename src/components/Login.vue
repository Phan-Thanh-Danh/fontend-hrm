<template>
  <div class="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
    <div class="relative flex min-h-screen w-full flex-row overflow-hidden">
      <!-- Left side banner -->
      <div class="hidden lg:flex lg:w-1/2 relative bg-slate-900">
        <div class="absolute inset-0 bg-cover bg-center opacity-80" data-alt="Modern corporate office with glass walls and bright lighting" style="background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80');"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/40 mix-blend-multiply flex flex-col" style="background-color: rgba(23, 84, 207, 0.6)"></div>
        <!-- Left Side Content -->
        <div class="relative z-10 flex flex-col justify-between p-12 h-full text-white w-full">
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold tracking-tight text-white">HRM Connect</h1>
          </div>
          <div class="mb-12">
            <h2 class="text-4xl font-bold mb-6 leading-tight">Quản lý nhân sự <br/>với sự tự tin.</h2>
            <p class="text-lg text-slate-200 max-w-md leading-relaxed">
              Hợp lý hóa quy trình nhân sự, trao quyền cho nhân viên và xây dựng văn hóa làm việc tốt hơn với nền tảng tất cả trong một của chúng tôi.
            </p>
            <div class="flex gap-4 mt-8">
              <div class="flex -space-x-3">
                <img alt="User avatar" class="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://ui-avatars.com/api/?name=Admin&background=1754cf&color=fff"/>
                <img alt="User avatar" class="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://ui-avatars.com/api/?name=User&background=1754cf&color=fff"/>
                <img alt="User avatar" class="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://ui-avatars.com/api/?name=HR&background=1754cf&color=fff"/>
                <div class="w-10 h-10 rounded-full border-2 border-white bg-slate-800 text-white flex items-center justify-center text-xs font-bold" style="background-color: #1e293b">+2k</div>
              </div>
              <div class="flex flex-col justify-center">
                <span class="text-sm font-semibold">Được tin dùng bởi các công ty hàng đầu</span>
                <div class="flex gap-1 text-yellow-400 text-xs">
                  <span class="material-symbols-outlined w-3 h-3 text-[14px]">star</span>
                  <span class="material-symbols-outlined w-3 h-3 text-[14px]">star</span>
                  <span class="material-symbols-outlined w-3 h-3 text-[14px]">star</span>
                  <span class="material-symbols-outlined w-3 h-3 text-[14px]">star</span>
                  <span class="material-symbols-outlined w-3 h-3 text-[14px]">star</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right side login -->
      <div class="w-full lg:w-1/2 flex items-center justify-center bg-background-light dark:bg-background-dark p-6 lg:p-12 relative" style="background-color: #f6f6f8;">
        <div class="absolute top-0 right-0 p-8">
          <div class="h-32 w-32 rounded-full bg-primary/5 blur-3xl" style="background-color: rgba(23, 84, 207, 0.05)"></div>
        </div>
        <div class="w-full max-w-[480px] bg-white dark:bg-surface-dark shadow-xl shadow-slate-200/50 dark:shadow-none rounded-2xl p-8 md:p-10 border border-slate-100 dark:border-slate-800" style="background-color: white;">
          <h1 class="text-2xl font-bold text-center text-slate-900 dark:text-white lg:hidden mb-8 tracking-tight">HRM Connect</h1>
          <div class="mb-8 text-center lg:text-left">
            <h1 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Chào mừng trở lại!</h1>
            <p class="text-slate-500 dark:text-slate-400 text-sm">Vui lòng nhập thông tin của bạn để đăng nhập.</p>
            <div class="mt-4 p-3 bg-blue-50 text-blue-800 rounded-lg text-sm text-left border border-blue-100">
              <p class="font-bold mb-1">Tài khoản trải nghiệm:</p>
              <ul class="list-disc pl-5">
                <li>Admin: <b>admin@hrm.com</b> / <b>admin</b></li>
                <li>Nhân viên: <b>user@hrm.com</b> / <b>user</b></li>
              </ul>
            </div>
          </div>
          
          <form class="flex flex-col gap-5" @submit.prevent="handleLogin">
            <div class="space-y-2 text-left">
              <label class="text-sm font-medium text-slate-700 dark:text-slate-300" for="email">Gmail</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors duration-200 text-[20px]">mail</span>
                </div>
                <input v-model="email" class="block w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white pl-10 pr-4 py-3 text-sm focus:border-primary focus:ring-primary focus:ring-1 focus:outline-none transition-all duration-200 placeholder:text-slate-400" id="email" required placeholder="Nhập Gmail của bạn" type="email"/>
              </div>
            </div>
            
            <div class="space-y-2 text-left">
              <label class="text-sm font-medium text-slate-700 dark:text-slate-300" for="password">Mật khẩu</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors duration-200 text-[20px]">lock</span>
                </div>
                <input v-model="password" class="block w-full border border-slate-200 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white pl-10 pr-10 py-3 text-sm focus:border-primary focus:ring-primary focus:ring-1 focus:outline-none transition-all duration-200 placeholder:text-slate-400" id="password" required placeholder="Nhập mật khẩu" :type="showPassword ? 'text' : 'password'"/>
                <button @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" type="button">
                  <span class="material-symbols-outlined text-[20px]">{{ showPassword ? 'visibility' : 'visibility_off' }}</span>
                </button>
              </div>
            </div>
            
            <div v-if="errorMsg" class="text-red-500 text-sm text-center">
              {{ errorMsg }}
            </div>
            
            <div class="flex items-center justify-between mt-1">
              <label class="flex items-center gap-2 cursor-pointer group">
                <div class="relative flex items-center">
                  <input class="peer h-4 w-4 cursor-pointer appearance-none rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 checked:border-primary checked:bg-primary transition-all" type="checkbox"/>
                  <span class="material-symbols-outlined absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[14px] text-white opacity-0 peer-checked:opacity-100 pointer-events-none" style="font-size: 14px">check</span>
                </div>
                <span class="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200">Ghi nhớ đăng nhập</span>
              </label>
              <a class="text-sm font-semibold text-primary hover:text-blue-700 dark:hover:text-blue-400 transition-colors" href="#" style="color: #1754cf">Quên mật khẩu?</a>
            </div>
            
            <button :disabled="isLoggingIn" class="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-200 transform active:scale-[0.98] mt-2 flex justify-center items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed" style="background-color: #1754cf" type="submit">
              <span v-if="!isLoggingIn">Đăng nhập</span>
              <span v-else>Đang đăng nhập...</span>
              <span v-if="!isLoggingIn" class="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              <span v-else class="material-symbols-outlined text-[20px] animate-spin">refresh</span>
            </button>
          </form>
          
          <div class="mt-8 text-center">
            <p class="text-sm text-slate-500 dark:text-slate-400">
              Chưa có tài khoản? 
              <a class="font-semibold text-primary hover:underline" style="color: #1754cf" href="#">Liên hệ Quản trị viên</a>
            </p>
          </div>
        </div>
        
        <div class="absolute bottom-6 text-center w-full">
          <p class="text-xs text-slate-400 dark:text-slate-600">
            © 2024 HRM System Inc. Mọi quyền được bảo lưu.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const errorMsg = ref('');
const isLoggingIn = ref(false);

const handleLogin = () => {
  errorMsg.value = '';
  isLoggingIn.value = true;
  
  // Simulate network request
  setTimeout(() => {
    isLoggingIn.value = false;
    // Mock login logic with seed data
    if (email.value === 'admin@hrm.com' && password.value === 'admin') {
      // 1. Simulate setting auth token/role in local storage
      localStorage.setItem('userRole', 'admin');
      // 2. Redirect to admin layout
      router.push('/admin');
    } 
    else if (email.value === 'user@hrm.com' && password.value === 'user') {
      // 1. Simulate setting auth token/role in local storage
      localStorage.setItem('userRole', 'user');
      // 2. Redirect to user layout
      router.push('/');
    } 
    else {
      errorMsg.value = 'Tài khoản hoặc mật khẩu không chính xác!';
    }
  }, 1000);
};
</script>

<style scoped>
/* Scoped imports specifically for tailwind in this file to avoid breaking other files if not setup globally */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');

.font-display {
  font-family: 'Inter', sans-serif;
}
.bg-primary {
  background-color: #1754cf !important;
}
.text-primary {
  color: #1754cf !important;
}
.border-primary {
  border-color: #1754cf !important;
}
.focus\:border-primary:focus {
  border-color: #1754cf !important;
}
.focus\:ring-primary:focus {
  --tw-ring-color: #1754cf !important;
}
.checked\:bg-primary:checked {
  background-color: #1754cf !important;
}
.checked\:border-primary:checked {
  border-color: #1754cf !important;
}
.shadow-primary\/30 {
  --tw-shadow-color: rgba(23, 84, 207, 0.3);
  --tw-shadow: var(--tw-shadow-colored);
}

/* Fallback base styles for Tailwind classes if Tailwind is not globally configured */
.min-h-screen { min-height: 100vh; }
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }
.w-full { width: 100%; }
.h-full { height: 100%; }
.relative { position: relative; }
.absolute { position: absolute; }
.inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
.inset-y-0 { top: 0; bottom: 0; }
.overflow-hidden { overflow: hidden; }
.bg-cover { background-size: cover; }
.bg-center { background-position: center; }
.bg-white { background-color: #ffffff; }
.text-white { color: #ffffff; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-xs { font-size: 0.75rem; line-height: 1rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
.font-bold { font-weight: 700; }
.font-black { font-weight: 900; }
.font-semibold { font-weight: 600; }
.font-medium { font-weight: 500; }
.text-center { text-align: center; }
.text-left { text-align: left; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1rem; }
.gap-5 { gap: 1.25rem; }
.p-3 { padding: 0.75rem; }
.p-6 { padding: 1.5rem; }
.p-8 { padding: 2rem; }
.p-12 { padding: 3rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.py-3\.5 { padding-top: 0.875rem; padding-bottom: 0.875rem; }
.pt-10 { padding-top: 2.5rem; }
.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-4 { margin-top: 1rem; }
.mt-8 { margin-top: 2rem; }
.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mb-8 { margin-bottom: 2rem; }
.mb-12 { margin-bottom: 3rem; }
.pl-3 { padding-left: 0.75rem; }
.pl-5 { padding-left: 1.25rem; }
.pl-10 { padding-left: 2.5rem; }
.pr-3 { padding-right: 0.75rem; }
.pr-4 { padding-right: 1rem; }
.pr-10 { padding-right: 2.5rem; }
.bottom-6 { bottom: 1.5rem; }
.left-0 { left: 0; }
.right-0 { right: 0; }
.w-4 { width: 1rem; }
.h-4 { height: 1rem; }
.w-10 { width: 2.5rem; }
.h-10 { height: 2.5rem; }
.w-32 { width: 8rem; }
.h-32 { height: 8rem; }
.max-w-\[480px\] { max-width: 480px; }
.max-w-md { max-width: 28rem; }
.rounded { border-radius: 0.25rem; }
.rounded-lg { border-radius: 0.5rem; }
.rounded-2xl { border-radius: 1rem; }
.rounded-full { border-radius: 9999px; }
.border { border-width: 1px; }
.border-2 { border-width: 2px; }
.border-slate-100 { border-color: #f1f5f9; }
.border-slate-200 { border-color: #e2e8f0; }
.border-blue-100 { border-color: #dbeafe; }
.bg-slate-50 { background-color: #f8fafc; }
.bg-slate-800 { background-color: #1e293b; }
.bg-slate-900 { background-color: #0f172a; }
.bg-blue-50 { background-color: #eff6ff; }
.text-slate-200 { color: #e2e8f0; }
.text-slate-400 { color: #94a3b8; }
.text-slate-500 { color: #64748b; }
.text-slate-600 { color: #475569; }
.text-slate-700 { color: #334155; }
.text-slate-900 { color: #0f172a; }
.text-blue-800 { color: #1e40af; }
.text-red-500 { color: #ef4444; }
.text-yellow-400 { color: #facc15; }
.shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
.shadow-slate-200\/50 { --tw-shadow-color: rgba(226, 232, 240, 0.5); --tw-shadow: var(--tw-shadow-colored); }
.opacity-0 { opacity: 0; }
.opacity-80 { opacity: 0.8; }
.z-10 { z-index: 10; }
.pointer-events-none { pointer-events: none; }
.cursor-pointer { cursor: pointer; }
.list-disc { list-style-type: disc; }
.tracking-tight { letter-spacing: -0.025em; }
.leading-tight { line-height: 1.25; }
.leading-relaxed { line-height: 1.625; }
.transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.transition-transform { transition-property: transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.duration-200 { transition-duration: 200ms; }
.-translate-x-1\/2 { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); --tw-translate-x: -50%; }
.-translate-y-1\/2 { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); --tw-translate-y: -50%; }
.peer:checked ~ .peer-checked\:opacity-100 { opacity: 1; }

@media (min-width: 768px) {
  .md\:p-10 { padding: 2.5rem; }
}
@media (min-width: 1024px) {
  .lg\:flex { display: flex; }
  .lg\:hidden { display: none; }
  .lg\:w-1\/2 { width: 50%; }
  .lg\:p-12 { padding: 3rem; }
  .lg\:text-left { text-align: left; }
}
</style>
