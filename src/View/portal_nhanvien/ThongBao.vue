<template>
  <div class="notifications-page min-h-screen bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] p-4 md:p-6 lg:p-8 font-sans">
    <div class="max-w-5xl mx-auto space-y-8 text-left">
      
      <!-- Top Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-transparent text-left">
        <div class="bg-transparent text-left">
          <h1 class="text-3xl font-black text-[var(--sys-text-primary)] tracking-tight uppercase flex items-center gap-3 italic text-left">
            <span class="material-symbols-outlined text-3xl text-[var(--sys-brand-solid)] font-normal" style="font-variation-settings: 'FILL' 1;">notifications_active</span>
            Trung tâm Thông báo
          </h1>
          <p class="text-[10px] text-[var(--sys-text-secondary)] font-black uppercase tracking-[0.2em] italic opacity-60 mt-1 text-left">Cập nhật tin tức, phê duyệt và hoạt động hệ thống mới nhất của bạn.</p>
        </div>
        
        <div class="flex items-center gap-3 w-full md:w-auto bg-transparent">
          <div class="relative flex-grow md:w-64">
            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--sys-text-secondary)]/40 text-xl font-normal">search</span>
            <input 
              v-model="searchQuery"
              type="text" 
              class="w-full pl-12 pr-4 py-3 bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] rounded-2xl text-xs font-black focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all placeholder:text-[var(--sys-text-secondary)]/30 text-[var(--sys-text-primary)]" 
              placeholder="Tìm kiếm thông báo..."
            >
          </div>
          <button class="w-12 h-12 flex items-center justify-center rounded-2xl bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] text-[var(--sys-text-secondary)] hover:border-[var(--sys-brand-solid)] hover:text-[var(--sys-brand-solid)] transition-all shadow-sm active:scale-95">
            <span class="material-symbols-outlined text-xl font-normal">tune</span>
          </button>
        </div>
      </div>

      <!-- Filters & Sort -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-transparent text-left">
        <div class="flex flex-wrap gap-2 bg-transparent text-left">
          <button 
            v-for="f in ['Tất cả', 'Chưa đọc', 'Hành chính', 'Hệ thống']" 
            :key="f"
            @click="activeFilter = f"
            :class="[
              'px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all italic border',
              activeFilter === f 
                ? 'bg-[var(--sys-brand-solid)] text-white border-[var(--sys-brand-solid)] shadow-lg shadow-[var(--sys-brand-solid-lch-30)]' 
                : 'bg-[var(--sys-bg-surface)] text-[var(--sys-text-secondary)] border-[var(--sys-border-subtle)] hover:bg-[var(--sys-bg-hover)]'
            ]"
          >
            {{ f }}
          </button>
        </div>
        
        <div class="flex items-center gap-3 bg-transparent text-left">
          <span class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest italic opacity-40">Sắp xếp theo:</span>
          <button class="flex items-center gap-1 text-[10px] font-black text-[var(--sys-brand-solid)] uppercase tracking-widest hover:opacity-60 transition-all italic bg-transparent">
            Mới nhất <span class="material-symbols-outlined text-lg font-normal">expand_more</span>
          </button>
        </div>
      </div>

      <!-- Group: Gần đây -->
      <div class="space-y-4 bg-transparent text-left">
        <h2 class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.3em] mb-4 ml-1 opacity-40 italic text-left">Gần đây</h2>
        
        <div class="flex flex-col gap-4 bg-transparent">
          <!-- Notification Card 1 -->
          <div class="group relative bg-[var(--sys-bg-surface)] rounded-[2rem] border-2 border-[var(--sys-brand-solid)] shadow-xl shadow-[var(--sys-brand-solid-lch-30)]/5 overflow-hidden cursor-pointer hover:bg-[var(--sys-bg-hover)] transition-all transform active:scale-[0.99] text-left">
            <div class="absolute top-0 left-0 w-1.5 h-full bg-[var(--sys-brand-solid)]"></div>
            <div class="p-6 md:p-8 flex gap-6 items-start bg-transparent text-left">
              <div class="w-16 h-16 rounded-[1.25rem] bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center shrink-0 border border-[var(--sys-brand-border)] group-hover:bg-[var(--sys-brand-solid)] group-hover:text-white transition-all shadow-sm">
                <span class="material-symbols-outlined text-3xl font-normal" style="font-variation-settings: 'FILL' 1;">event_available</span>
              </div>
              <div class="flex-grow bg-transparent text-left">
                <div class="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2 bg-transparent text-left">
                  <h3 class="text-sm md:text-base font-black text-[var(--sys-text-primary)] group-hover:text-[var(--sys-brand-solid)] transition-colors uppercase tracking-tight text-left">Đơn nghỉ phép đã được duyệt</h3>
                  <div class="flex items-center gap-3 bg-transparent self-end sm:self-auto">
                    <span class="text-[10px] font-black text-[var(--sys-text-secondary)] opacity-40 uppercase tracking-widest italic">10 phút trước</span>
                    <div class="w-2.5 h-2.5 rounded-full bg-[var(--sys-brand-solid)] animate-pulse shadow-lg shadow-[var(--sys-brand-solid-lch-30)]"></div>
                  </div>
                </div>
                <p class="text-xs md:text-sm font-bold text-[var(--sys-text-secondary)] leading-relaxed mb-4 opacity-60 italic max-w-2xl text-left">
                  Đơn nghỉ phép của bạn từ ngày 20/10 đến 22/10 đã được phê duyệt bởi Trưởng phòng Hành chính Nhân sự.
                </p>
                <span class="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--sys-brand-soft)] text-[var(--sys-brand-soft-text)] text-[10px] font-black uppercase tracking-[0.2em] border border-[var(--sys-brand-border)] italic">Hành chính</span>
              </div>
            </div>
          </div>

          <!-- Notification Card 2 -->
          <div class="group relative bg-[var(--sys-bg-surface)] rounded-[2rem] border-2 border-[var(--sys-brand-solid)] shadow-xl shadow-[var(--sys-brand-solid-lch-30)]/5 overflow-hidden cursor-pointer hover:bg-[var(--sys-bg-hover)] transition-all transform active:scale-[0.99] text-left">
            <div class="absolute top-0 left-0 w-1.5 h-full bg-[var(--sys-brand-solid)]"></div>
            <div class="p-6 md:p-8 flex gap-6 items-start bg-transparent text-left">
              <div class="w-16 h-16 rounded-[1.25rem] bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center shrink-0 border border-[var(--sys-brand-border)] group-hover:bg-[var(--sys-brand-solid)] group-hover:text-white transition-all shadow-sm">
                <span class="material-symbols-outlined text-3xl font-normal" style="font-variation-settings: 'FILL' 1;">payments</span>
              </div>
              <div class="flex-grow bg-transparent text-left">
                <div class="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2 bg-transparent text-left">
                  <h3 class="text-sm md:text-base font-black text-[var(--sys-text-primary)] group-hover:text-[var(--sys-brand-solid)] transition-colors uppercase tracking-tight text-left">Phiếu lương tháng 10 đã sẵn sàng</h3>
                  <div class="flex items-center gap-3 bg-transparent self-end sm:self-auto">
                    <span class="text-[10px] font-black text-[var(--sys-text-secondary)] opacity-40 uppercase tracking-widest italic">2 giờ trước</span>
                    <div class="w-2.5 h-2.5 rounded-full bg-[var(--sys-brand-solid)] animate-pulse shadow-lg shadow-[var(--sys-brand-solid-lch-30)]"></div>
                  </div>
                </div>
                <p class="text-xs md:text-sm font-bold text-[var(--sys-text-secondary)] leading-relaxed mb-4 opacity-60 italic max-w-2xl text-left">
                  Hệ thống đã cập nhật phiếu lương tháng 10 của bạn. Vui lòng kiểm tra và xác nhận nếu không có sai sót.
                </p>
                <span class="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] text-[10px] font-black uppercase tracking-[0.2em] border border-[var(--sys-success-border)] italic">Tài chính</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Group: Trước đó -->
      <div class="space-y-4 bg-transparent text-left">
        <h2 class="text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.3em] mb-4 ml-1 opacity-40 italic text-left">Trước đó</h2>
        
        <div class="flex flex-col gap-4 bg-transparent">
          <div v-for="(item, idx) in [
            { title: 'Thông báo họp nội bộ quý 4', desc: 'Tất cả nhân viên tham gia buổi họp tổng kết quý 3 và định hướng quý 4 tại phòng họp lớn vào lúc 09:00 sáng Thứ 2 tuần sau.', icon: 'campaign', time: 'Hôm qua, 14:30', tag: 'Sự kiện', color: 'brand' },
            { title: 'Yêu cầu thay đổi mật khẩu định kỳ', desc: 'Mật khẩu của bạn đã quá hạn 90 ngày. Vui lòng cập nhật mật khẩu mới để đảm bảo an toàn cho tài khoản Portal.', icon: 'security', time: '2 ngày trước', tag: 'Hệ thống', color: 'warning' },
            { title: 'Chúc mừng sinh nhật tháng 11', desc: 'Công ty thân gửi lời chúc mừng sinh nhật đến các thành viên có sinh nhật trong tháng 11. Bữa tiệc trà sẽ diễn ra vào lúc 16:00 chiều nay.', icon: 'cake', time: '1 tuần trước', tag: 'Văn hóa', color: 'danger' }
          ]" :key="idx" 
          class="group bg-[var(--sys-bg-surface)] rounded-[2rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden cursor-pointer hover:bg-[var(--sys-bg-hover)] hover:border-[var(--sys-brand-solid)] transition-all transform active:scale-[0.99] text-left">
            <div class="p-6 md:p-8 flex gap-6 items-start bg-transparent text-left">
              <div :class="`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all shadow-sm bg-[var(--sys-${item.color}-soft)] text-[var(--sys-${item.color}-text)] border-[var(--sys-${item.color}-border)] group-hover:bg-[var(--sys-${item.color}-solid)] group-hover:text-white`">
                <span class="material-symbols-outlined text-2xl font-normal" style="font-variation-settings: 'FILL' 1;">{{ item.icon }}</span>
              </div>
              <div class="flex-grow bg-transparent text-left">
                <div class="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2 bg-transparent text-left">
                  <h3 class="text-xs md:text-sm font-black text-[var(--sys-text-primary)] group-hover:text-[var(--sys-brand-solid)] transition-colors uppercase tracking-tight text-left">{{ item.title }}</h3>
                  <span class="text-[10px] font-black text-[var(--sys-text-secondary)] opacity-40 uppercase tracking-widest italic self-end sm:self-auto">{{ item.time }}</span>
                </div>
                <p class="text-[11px] md:text-xs font-bold text-[var(--sys-text-secondary)] leading-relaxed mb-4 opacity-60 italic max-w-2xl text-left">{{ item.desc }}</p>
                <span :class="`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border italic bg-[var(--sys-${item.color}-soft)] text-[var(--sys-${item.color}-text)] border-[var(--sys-${item.color}-border)]`">{{ item.tag }}</span>
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

const searchQuery = ref('');
const activeFilter = ref('Tất cả');
</script>

<style scoped>
/* Individual styles managed by Tailwind and OKLCH design system */
</style>
