<template>
  <div class="bg-[#F8FAFC] dark:bg-[#F8FAFC] font-sans antialiased text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
    <div class="relative flex min-h-screen w-full flex-row overflow-hidden">
      <!-- Left side banner -->
      <div class="hidden lg:flex lg:w-1/2 relative bg-slate-900">
        <div class="absolute inset-0 bg-cover bg-center opacity-80" data-alt="Modern corporate office with glass walls and bright lighting" style="background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80');"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-blue-700/90 to-blue-600/40 mix-blend-multiply flex flex-col"></div>
        <!-- Left Side Content -->
        <div class="relative z-10 flex flex-col justify-between p-12 h-full text-white w-full">
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold tracking-tight text-white">HRM Portal</h1>
          </div>
          <div class="mb-12">
            <h2 class="text-4xl font-bold mb-6 leading-tight">Quản lý nhân sự <br/>với sự tự tin.</h2>
            <p class="text-lg text-blue-100 max-w-md leading-relaxed">
              Hợp lý hóa quy trình nhân sự, trao quyền cho nhân viên và xây dựng văn hóa làm việc tốt hơn với nền tảng tất cả trong một của chúng tôi.
            </p>
          </div>
        </div>
      </div>

      <!-- Right side login -->
      <div class="w-full lg:w-1/2 flex items-center justify-center bg-[#F8FAFC] dark:bg-[#F8FAFC] p-6 lg:p-12 relative">
        <div class="absolute top-0 right-0 p-8">
          <div class="h-32 w-32 rounded-full bg-blue-600/5 blur-3xl"></div>
        </div>
        <div class="w-full max-w-[480px] bg-white dark:bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-2xl p-8 md:p-10 border border-slate-100 dark:border-slate-100 relative z-10">
          <h1 class="text-2xl font-bold text-center text-slate-900 dark:text-slate-900 lg:hidden mb-8 tracking-tight">HRM Connect</h1>
          <div class="mb-8 text-center lg:text-left">
            <h1 class="text-3xl font-black text-slate-900 dark:text-slate-900 tracking-tight mb-2">Chào mừng trở lại!</h1>
            <p class="text-slate-500 dark:text-slate-500 text-sm">Vui lòng nhập thông tin của bạn để đăng nhập.</p>
            <div class="mt-4 p-4 bg-blue-50/80 text-blue-800 rounded-xl text-sm text-left border border-blue-100/50">
              <p class="font-bold mb-2 flex items-center gap-2">
                <span class="material-symbols-outlined text-blue-600 text-[18px]">info</span>
                Tài khoản trải nghiệm:
              </p>
              <ul class="list-disc pl-8 space-y-1 text-blue-700">
                <li>Admin: <b>admin@aethrm.com</b></li>
                <li>HR (Mới): <b>hr@aethrm.com</b></li>
                <li>BOD / Giám Đốc: <b>danh.phan@aethrm.com</b></li>
                <li>TP. IT: <b>loc.mai@aethrm.com</b></li>
                <li>TP. HCNS: <b>son.bui@aethrm.com</b></li>
                <li>TP. Kinh doanh: <b>phat.do@aethrm.com</b></li>
                <li>TP. Kế toán: <b>linh.tran@aethrm.com</b></li>
                <li>TP. CSKH: <b>anh.nguyen@aethrm.com</b></li>
                <li>Nhân viên: <b>ngan.bui@aethrm.com</b></li>
                <li class="mt-1 border-t border-blue-200/50 pt-1"><i>Mật khẩu chung: <b>123456</b></i></li>
              </ul>
            </div>
          </div>
          
          <form class="flex flex-col gap-5" @submit.prevent="handleLogin">
            <div class="space-y-1.5 text-left">
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-700" for="email">Tài khoản Email</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span class="material-symbols-outlined text-slate-400 group-focus-within:text-blue-600 transition-colors duration-200 text-[20px]">mail</span>
                </div>
                <input v-model="email" class="block w-full rounded-xl border border-slate-200 dark:border-slate-200 bg-slate-50 dark:bg-slate-50 text-slate-900 dark:text-slate-900 pl-11 pr-4 py-3 text-sm focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:outline-none transition-all duration-200 placeholder:text-slate-400" id="email" required placeholder="Nhập Gmail của bạn" type="email"/>
              </div>
            </div>
            
            <div class="space-y-1.5 text-left">
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-700" for="password">Mật khẩu</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span class="material-symbols-outlined text-slate-400 group-focus-within:text-blue-600 transition-colors duration-200 text-[20px]">lock</span>
                </div>
                <input v-model="password" class="block w-full rounded-xl border border-slate-200 dark:border-slate-200 bg-slate-50 dark:bg-slate-50 text-slate-900 dark:text-slate-900 pl-11 pr-10 py-3 text-sm focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:outline-none transition-all duration-200 placeholder:text-slate-400" id="password" required placeholder="Nhập mật khẩu" :type="showPassword ? 'text' : 'password'"/>
                <button @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-3.5 flex items-center cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-slate-600 transition-colors" type="button">
                  <span class="material-symbols-outlined text-[20px]">{{ showPassword ? 'visibility' : 'visibility_off' }}</span>
                </button>
              </div>
            </div>
            
            <div v-if="errorMsg" class="text-red-500 text-sm font-medium text-center bg-red-50 p-2 rounded-lg border border-red-100">
              {{ errorMsg }}
            </div>
            
            <div class="flex items-center justify-between mt-1">
              <label class="flex items-center gap-2 cursor-pointer group">
                <div class="relative flex items-center">
                  <input class="peer h-4 w-4 cursor-pointer appearance-none rounded border border-slate-300 dark:border-slate-300 bg-white dark:bg-white checked:border-blue-600 checked:bg-blue-600 transition-all focus:ring-2 focus:ring-blue-600/20 focus:outline-none" type="checkbox"/>
                  <span class="material-symbols-outlined absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[14px] text-white opacity-0 peer-checked:opacity-100 pointer-events-none">check</span>
                </div>
                <span class="text-sm font-medium text-slate-600 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-slate-900 transition-colors">Ghi nhớ đăng nhập</span>
              </label>
              <a class="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-600 dark:hover:text-blue-700 transition-colors" href="#">Quên mật khẩu?</a>
            </div>
            
            <button :disabled="isLoggingIn" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 transition-all duration-200 transform active:scale-[0.98] mt-4 flex justify-center items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed" type="submit">
              <span v-if="!isLoggingIn">Đăng nhập ngay</span>
              <span v-else>Đang xác thực...</span>
              <span v-if="!isLoggingIn" class="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              <span v-else class="material-symbols-outlined text-[20px] animate-spin">refresh</span>
            </button>
          </form>
        </div>
        
        <div class="absolute bottom-6 text-center w-full">
          <p class="text-xs text-slate-400 dark:text-slate-400 font-medium">
            &copy; 2024 HRM System Inc. Mọi quyền được bảo lưu.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { mockEmployees } from '@/mock-data/index.js';

const router = useRouter();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const errorMsg = ref('');
const isLoggingIn = ref(false);

// Force Light Mode on Login Page
onMounted(() => {
  document.documentElement.classList.remove('dark');
  localStorage.removeItem('theme'); // Fail-safe if a theme key is used
  
  // Clear old mockDB data to reload fresh data
  localStorage.removeItem('HRM_MOCK_DB_V2');
});

const handleLogin = async () => {
  errorMsg.value = '';
  isLoggingIn.value = true;
  
  try {
    // Sử dụng data ảo từ mockDB
    const employees = mockEmployees;
    
    // Check credentials against companyEmail
    const user = employees.find(e => e.companyEmail === email.value && (e.password === password.value || password.value === '123456'));

    if (user) {
      let uiRole = 'employee';
      let targetRoute = '/nhanvien';

      if (user.role === 'ADMIN') {
         uiRole = 'admin';
         targetRoute = '/admin';
      } else if (user.role === 'HR') {
         uiRole = 'hr';
         targetRoute = '/admin';
      } else if (user.role === 'MANAGER') {
         uiRole = 'manager';
         targetRoute = '/truongphong';
      } else if (user.role === 'DIRECTOR') {
         uiRole = 'director';
         targetRoute = '/giamdoc';
      }

      localStorage.setItem('userRole', uiRole);
      localStorage.setItem('userId', user.employeeId);
      localStorage.setItem('userName', user.fullName);
      localStorage.setItem('userEmail', user.companyEmail);
      localStorage.setItem('userDeptId', user.department?.departmentId || user.departmentId || null);
      localStorage.setItem('userCode', user.employeeCode || '');
      localStorage.setItem('userPhone', user.phoneNumber || '');
      localStorage.setItem('userDeptName', user.department?.departmentName || '');
      localStorage.setItem('userPosition', user.position?.positionName || '');

      router.push(targetRoute);
    } else if (email.value === 'admin@aethrm.com' && password.value === '123456') {
      // Fallback for HR Admin specifically going to /admin
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('userId', 'NV00000');
      localStorage.setItem('userDeptId', '4');
      router.push('/admin');
    } else {
      errorMsg.value = 'Tài khoản hoặc mật khẩu không chính xác!';
    }
  } catch (error) {
    console.error('Login error:', error);
    errorMsg.value = 'Lỗi kết nối hệ thống!';
  } finally {
    isLoggingIn.value = false;
  }
};
</script>

<style scoped>
/* Removed old global tailwind overrides, tailwind rules are expected to be available globally */
</style>
