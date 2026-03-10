<template>
  <div class="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-8 font-display antialiased">
    
    <!-- Main Card -->
    <div class="w-full max-w-5xl bg-white rounded-3xl shadow-xl flex overflow-hidden ring-1 ring-slate-200">
      
      <!-- Left Side: Image & Branding -->
      <div class="hidden md:flex w-1/2 relative flex-col justify-end p-12 bg-slate-900 border-r border-slate-100">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtWsta5vx6JPcOJm-L9vtiWL9ZiqzqjS5TXuz0wUt0mrm6G95xCPoWv8g-ZLZcodLqrrv0uEncEcyDoS5BV6jb5bkNdC0_0weCHY6zFe3XZwKIm-pIdZbAIKuDOrmOLHYNJVUruCZiwDzmvWQToEGGRAe-IbxKG-EJUfPez3M0Byzn6KzW6ZXds816t42bwDvuOSh_KdlVMG4PA8URGQ2gViEaWKD48iu6d9CwQNri4dCWJHgiQRHv6JbDSMmfYY9ncy25fhot2Rsw" 
          alt="Office Background"
          class="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <!-- Layout Overlay for better text readability -->
        <div class="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-90"></div>
        
        <!-- Decoration Elements -->
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-teal-400"></div>

        <!-- Content on Image -->
        <div class="relative z-10 text-white">
          <div class="flex items-center gap-3 mb-8">
            <div class="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-lg">
              <span class="material-symbols-outlined text-white text-[28px]">diversity_3</span>
            </div>
            <span class="text-2xl font-bold tracking-tight">HRM Connect</span>
          </div>
          <h2 class="text-4xl font-extrabold leading-tight mb-4 text-white">
            Nền tảng quản lý<br/>
            <span class="text-blue-300">nhân sự tối ưu.</span>
          </h2>
          <p class="text-slate-300 text-lg max-w-md font-medium">
            Hợp lý hóa quy trình, đánh giá hiệu suất và xây dựng văn hóa làm việc tuyệt vời cho tổ chức của bạn.
          </p>

          <!-- Trusted By -->
          <div class="mt-12 flex items-center gap-4 border-t border-white/20 pt-6">
            <div class="flex -space-x-3">
              <img class="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZpWqSjk7WMqhghxhvEYxiqMlPh9V2wUvpgS9NVy-9pje1gbd-c0AZSBKVrpVd-iwNJBTxcSBz6Su_Mhe4tOBMhrYGirHRewyDgEHM9rsQvhYq-AOYZ4jQM-IwjyyehLqmwxkk1siMkCz5yXymuH08ZVWaPTKTlNjBhRu79GNZkOROjE6ryI8kw70YwYni03i2fJjamMn8Nj_JUuF4I63RPsLEqe-BNC-EAngtckb7DaOQKscLyQWIKLbNHTZitjd42CuPJ9doAdvC" alt="User 1"/>
              <img class="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBauhA7Hw4Fz5Jd7WqHNaT3g5FCFgUP9CKDceCnkLrCUI2MO26t43u4sw4Hs4L5iEcYQoROpqNr9L8OfbtDF_PrO9w9We9PLQ2jCc_l5tIbVd1vbPJkS-Ga1CAP5H8uxm2M4W58kN32iKqOSXDjP1vNyYameY9TGrM2bePSd7vWvsfK6nfF5TnQff0gxvPoNdLeTm0-18aFz5_WruyLCMo1_KjQCNmrC8zCp_ufsG4ejAtNXYv-UaW9xiNxsukOj8NKvZ2phlEYiuWx" alt="User 2"/>
              <div class="w-10 h-10 rounded-full border-2 border-slate-900 bg-blue-600 flex items-center justify-center text-xs font-bold text-white">+2k</div>
            </div>
            <div class="text-sm">
              <div class="font-semibold text-white">Doanh nghiệp tin dùng</div>
              <div class="text-yellow-400 text-xs flex gap-0.5 mt-0.5">
                <span class="material-symbols-outlined text-[14px]">star</span>
                <span class="material-symbols-outlined text-[14px]">star</span>
                <span class="material-symbols-outlined text-[14px]">star</span>
                <span class="material-symbols-outlined text-[14px]">star</span>
                <span class="material-symbols-outlined text-[14px]">star</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side: Login Form -->
      <div class="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 bg-white flex flex-col justify-center relative">
        
        <!-- Mobile Header -->
        <div class="flex md:hidden items-center gap-3 mb-8">
          <div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <span class="material-symbols-outlined text-white text-[28px]">diversity_3</span>
          </div>
          <span class="text-2xl font-bold text-slate-900 tracking-tight">HRM Connect</span>
        </div>

        <!-- Form Header -->
        <div class="mb-10 text-center md:text-left">
          <h1 class="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Đăng nhập tài khoản</h1>
          <p class="text-slate-500 font-medium">Vui lòng điền thông tin bên dưới để tiếp tục.</p>
        </div>

        <form class="space-y-6">
          <!-- Email Input -->
          <div>
            <label class="block text-sm font-bold text-slate-700 mb-2">Email hoặc tên đăng nhập</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span class="material-symbols-outlined text-slate-400 group-focus-within:text-blue-600 transition-colors">mail</span>
              </div>
              <input 
                type="email" 
                class="block w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm"
                placeholder="Ví dụ: name@company.com"
              />
            </div>
          </div>

          <!-- Password Input -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-bold text-slate-700">Mật khẩu</label>
              <a href="#" class="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">Quên mật khẩu?</a>
            </div>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span class="material-symbols-outlined text-slate-400 group-focus-within:text-blue-600 transition-colors">lock</span>
              </div>
              <input 
                type="password" 
                class="block w-full pl-12 pr-12 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm"
                placeholder="Nhập mật khẩu..."
              />
              <button type="button" class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                <span class="material-symbols-outlined text-[20px]">visibility_off</span>
              </button>
            </div>
          </div>

          <!-- Remember Me -->
          <div class="flex items-center">
            <input type="checkbox" id="remember" class="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-600 focus:ring-2 cursor-pointer transition-colors" />
            <label for="remember" class="ml-2 mt-0.5 text-sm font-semibold text-slate-600 cursor-pointer select-none">Lưu thông tin đăng nhập</label>
          </div>

          <!-- Submit Button -->
          <button type="button" class="w-full py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-base rounded-xl transition-all shadow-lg shadow-blue-600/20 flex justify-center items-center gap-2 mt-4 transform active:scale-[0.99]">
            Đăng nhập ngay
            <span class="material-symbols-outlined text-[20px]">login</span>
          </button>
        </form>
        
        <div class="mt-8 text-center md:hidden">
          <p class="text-xs text-slate-400">© 2024 HRM System Inc. All rights reserved.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // Inject Tailwind config
  const scriptConfig = document.createElement('script');
  scriptConfig.innerHTML = `
    window.tailwind = window.tailwind || {};
    window.tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            "display": ["Inter", "sans-serif"]
          }
        },
      },
    };
  `;
  document.head.appendChild(scriptConfig);

  // Inject Tailwind scripts to render properly if not exists
  if (!document.getElementById('tailwind-cdn')) {
    const scriptTailwind = document.createElement('script');
    scriptTailwind.id = 'tailwind-cdn';
    scriptTailwind.src = 'https://cdn.tailwindcss.com?plugins=forms,container-queries';
    document.head.appendChild(scriptTailwind);
  }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
}
</style>
