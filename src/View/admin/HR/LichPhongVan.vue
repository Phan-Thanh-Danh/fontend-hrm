<template>
  <div class="lich-phong-van-page space-y-6">
    <!-- Header -->
    <div class="mb-8 text-left">
      <h1 class="text-2xl font-black text-[var(--sys-text-primary)] tracking-tight text-left">Lịch Phỏng Vấn</h1>
      <p class="text-[var(--sys-text-secondary)] text-sm font-medium italic text-left">Sắp xếp, theo dõi và quản lý các buổi phỏng vấn ứng viên.</p>
    </div>

    <!-- Toolbar -->
    <div class="flex flex-wrap justify-between items-center mb-6 gap-4">
      <div class="flex gap-4 items-center flex-wrap">
        <!-- View Toggle -->
        <div class="bg-[var(--sys-bg-hover)] rounded-2xl p-1 flex border border-[var(--sys-border-subtle)] shadow-inner">
          <button @click="currentView = 'calendar'" :class="['px-5 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all', currentView === 'calendar' ? 'bg-[var(--sys-bg-surface)] text-[var(--sys-brand-solid)] shadow-sm' : 'text-[var(--sys-text-secondary)]/60 hover:text-[var(--sys-text-primary)]']">
            Lịch
          </button>
          <button @click="currentView = 'list'" :class="['px-5 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all', currentView === 'list' ? 'bg-[var(--sys-bg-surface)] text-[var(--sys-brand-solid)] shadow-sm' : 'text-[var(--sys-text-secondary)]/60 hover:text-[var(--sys-text-primary)]']">
            Danh sách
          </button>
        </div>

        <!-- Filters -->
        <Dropdown 
          v-model="filterStatus"
          :options="statusOptions"
          placeholder="Trạng thái (Tất cả)"
        />
        <Dropdown 
          v-model="filterInterviewer"
          :options="interviewerOptions"
          placeholder="Người phỏng vấn (Tất cả)"
        />
        <div class="bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] shadow-sm rounded-2xl py-2.5 px-4 text-[var(--sys-text-secondary)] text-xs font-black flex items-center gap-2 cursor-pointer hover:border-[var(--sys-brand-solid)] transition-all">
          <span class="material-symbols-outlined text-[var(--sys-icon-default)] text-lg">date_range</span>
          10/10/2023 - 17/10/2023
        </div>
      </div>

      <button @click="showCreateModal = true" class="px-6 py-3 bg-[var(--sys-brand-solid)] rounded-2xl font-black text-white hover:bg-[var(--sys-brand-hover)] shadow-xl shadow-[var(--sys-brand-solid-lch-30)] transition-all flex items-center gap-2 uppercase tracking-widest text-xs">
        <span class="material-symbols-outlined text-[20px]">add</span>
        Tạo lịch mới
      </button>
    </div>

    <!-- Main Content -->
    <div class="space-y-6">
      
      <!-- Calendar Widget -->
      <div v-show="currentView === 'calendar'" class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden">
        <div class="p-8 bg-transparent text-left">
          <!-- Calendar Header -->
          <div class="flex justify-between items-center mb-8 px-2 bg-transparent">
            <div class="flex items-center gap-4 bg-transparent">
              <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] hover:bg-[var(--sys-brand-soft)] hover:text-[var(--sys-brand-solid)] transition-all border border-[var(--sys-border-subtle)]">
                <span class="material-symbols-outlined">chevron_left</span>
              </button>
              <h3 class="text-xl font-black text-[var(--sys-text-primary)] tracking-tight italic uppercase">Tháng 10, 2023</h3>
              <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] hover:bg-[var(--sys-brand-soft)] hover:text-[var(--sys-brand-solid)] transition-all border border-[var(--sys-border-subtle)]">
                <span class="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
            <div class="bg-[var(--sys-bg-hover)] p-1 rounded-2xl flex border border-[var(--sys-border-subtle)]">
              <button class="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[var(--sys-text-secondary)]/50">Ngày</button>
              <button class="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[var(--sys-text-secondary)]/50">Tuần</button>
              <button class="px-5 py-2 text-[10px] font-black uppercase tracking-widest bg-[var(--sys-bg-surface)] text-[var(--sys-text-primary)] rounded-xl shadow-sm border border-[var(--sys-border-subtle)]">Tháng</button>
            </div>
          </div>

          <!-- Calendar Grid -->
          <div class="grid grid-cols-7 border-t border-l border-[var(--sys-border-subtle)] overflow-hidden rounded-2xl bg-transparent">
            <!-- Header -->
            <div v-for="day in ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']" :key="day" class="text-center py-4 text-[10px] font-black text-[var(--sys-text-secondary)]/60 uppercase tracking-[0.2em] bg-[var(--sys-bg-hover)] border-r border-b border-[var(--sys-border-subtle)] italic">
              {{ day }}
            </div>

            <!-- Empty cells for start of month -->
            <div v-for="i in 1" :key="'empty'+i" class="min-h-[140px] p-4 bg-[var(--sys-bg-hover)]/30 border-r border-b border-[var(--sys-border-subtle)]">
              <span class="text-xs font-bold text-[var(--sys-text-secondary)]/20">{{ 30 }}</span>
            </div>

            <!-- Days -->
            <div v-for="day in 31" :key="day" class="min-h-[140px] p-4 border-r border-b border-[var(--sys-border-subtle)] group hover:bg-[var(--sys-brand-soft)] transition-all" :class="day === 11 ? 'bg-[var(--sys-brand-soft)]/50' : 'bg-transparent'">
              <div class="flex justify-between items-start mb-3 bg-transparent text-left">
                <span :class="['text-xs font-black bg-transparent', day === 11 ? 'text-[var(--sys-brand-solid)]' : 'text-[var(--sys-text-secondary)]/40']">{{ day }}</span>
              </div>
              
              <!-- Events -->
              <div v-if="day === 11" class="space-y-2 bg-transparent">
                <div class="p-2 bg-[var(--sys-brand-solid)] rounded-lg shadow-lg shadow-[var(--sys-brand-solid-lch-30)] text-white">
                  <p class="text-[9px] font-black uppercase tracking-widest mb-0.5">09:00</p>
                  <p class="text-[10px] font-bold leading-tight">Nguyễn Văn A</p>
                </div>
                <div class="p-2 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-lg text-[var(--sys-text-primary)]">
                  <p class="text-[9px] font-black uppercase tracking-widest mb-0.5 opacity-60">14:30</p>
                  <p class="text-[10px] font-bold leading-tight italic">Lê Văn C</p>
                </div>
              </div>
              <div v-if="day === 12" class="p-2 bg-[var(--sys-warning-soft)] border border-[var(--sys-warning-border)] rounded-lg text-[var(--sys-warning-text)]">
                <p class="text-[9px] font-black uppercase tracking-widest mb-0.5">10:00</p>
                <p class="text-[10px] font-bold leading-tight italic">Hoàng Thị E</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Interviews List -->
      <div class="bg-[var(--sys-bg-surface)] rounded-[2.5rem] border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden">
        <div class="p-8 bg-transparent text-left">
          <h4 class="text-xs font-black text-[var(--sys-text-secondary)]/60 uppercase tracking-[0.2em] flex items-center gap-2 mb-8 italic bg-transparent text-left">
            <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-xl font-normal bg-transparent">view_list</span> Danh sách phỏng vấn gần đây
          </h4>

          <div class="overflow-x-auto rounded-2xl border border-[var(--sys-border-subtle)] bg-transparent">
            <table class="w-full text-left border-collapse bg-transparent">
              <thead>
                <tr class="bg-[var(--sys-bg-hover)]">
                  <th class="px-6 py-4 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest border-b border-[var(--sys-border-subtle)] italic">Ứng viên</th>
                  <th class="px-6 py-4 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest border-b border-[var(--sys-border-subtle)] italic">Thời gian</th>
                  <th class="px-6 py-4 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest border-b border-[var(--sys-border-subtle)] italic">Người phỏng vấn</th>
                  <th class="px-6 py-4 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest border-b border-[var(--sys-border-subtle)] italic text-center">Trạng thái</th>
                  <th class="px-6 py-4 text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest border-b border-[var(--sys-border-subtle)] italic text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody class="bg-transparent text-left">
                <tr v-for="interview in filteredInterviews" :key="interview.id" class="group hover:bg-[var(--sys-bg-hover)] transition-colors border-b border-[var(--sys-border-subtle)] last:border-0 text-sm bg-transparent">
                  <td class="px-6 py-5 bg-transparent text-left">
                    <span class="font-black text-[var(--sys-text-primary)]" :class="{'opacity-50 line-through': interview.status === 'Đã hủy'}">{{ interview.candidate }}</span>
                  </td>
                  <td class="px-6 py-5 bg-transparent text-left">
                    <div class="flex items-center gap-2 text-[var(--sys-text-secondary)] font-bold italic bg-transparent">
                      <span class="material-symbols-outlined text-sm bg-transparent">calendar_month</span>
                      {{ interview.date }} - {{ interview.time }}
                    </div>
                  </td>
                  <td class="px-6 py-5 bg-transparent text-left">
                    <div class="flex items-center gap-2 text-[var(--sys-text-secondary)] font-bold bg-transparent">
                      <div class="w-8 h-8 rounded-full bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center text-[10px] font-black">
                        {{ getInterviewerName(interview.interviewerId).charAt(0) }}
                      </div>
                      {{ getInterviewerName(interview.interviewerId) }}
                    </div>
                  </td>
                  <td class="px-6 py-5 text-center bg-transparent">
                    <span class="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all shadow-sm" :class="getStatusBadgeClass(interview.status)">
                      {{ interview.status }}
                    </span>
                  </td>
                  <td class="px-6 py-5 bg-transparent">
                    <div class="flex justify-center gap-3 bg-transparent">
                      <button 
                        v-if="interview.status !== 'Đã hủy'"
                        @click="openEvaluateModal(interview.candidate)" 
                        class="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] hover:bg-[var(--sys-brand-soft)] hover:text-[var(--sys-brand-solid)] transition-all shadow-sm"
                        title="Đánh giá phỏng vấn"
                      >
                        <span class="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button 
                        v-if="interview.status !== 'Đã hủy'" 
                        @click="handleCancelInterview(interview)"
                        class="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] hover:bg-[var(--sys-danger-soft)] hover:text-[var(--sys-danger-text)] transition-all shadow-sm"
                        title="Hủy phỏng vấn"
                      >
                        <span class="material-symbols-outlined text-lg">cancel</span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredInterviews.length === 0" class="bg-transparent">
                  <td colspan="5" class="px-6 py-24 text-center bg-transparent">
                    <div class="flex flex-col items-center gap-4 grayscale opacity-30 bg-transparent">
                      <span class="material-symbols-outlined text-6xl bg-transparent">search_off</span>
                      <p class="text-xs font-black text-[var(--sys-text-secondary)] uppercase tracking-[0.2em] italic bg-transparent">Không tìm thấy ca phỏng vấn phù hợp</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <transition
      enter-active-class="transition ease-out duration-300 transform"
      enter-from-class="translate-y-10 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showToast" class="fixed bottom-10 right-10 z-[11000] flex items-center gap-4 px-8 py-5 bg-[var(--sys-success-solid)] text-white rounded-[2rem] shadow-2xl shadow-[var(--sys-success-solid-lch-30)]">
        <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
          <span class="material-symbols-outlined text-xl font-black">check</span>
        </div>
        <div>
          <p class="text-xs font-black uppercase tracking-widest leading-none mb-1 text-left">Thành công</p>
          <p class="text-[10px] font-bold opacity-90 italic text-left">{{ toastMessage }}</p>
        </div>
      </div>
    </transition>

    <!-- Create Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
      >
        <div v-if="showCreateModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div class="fixed inset-0 w-screen h-screen bg-[var(--sys-bg-canvas)]/60 z-[9999] overflow-hidden backdrop-blur-md" @click="showCreateModal = false"></div>
          <div class="relative z-[10000] bg-[var(--sys-bg-surface)] w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all text-left border border-[var(--sys-border-subtle)]">
            <div class="px-8 py-6 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-transparent">
              <div class="bg-transparent text-left">
                <h3 class="text-xl font-black text-[var(--sys-text-primary)] flex items-center gap-2 bg-transparent italic uppercase tracking-tight">
                  <span class="material-symbols-outlined text-[var(--sys-brand-solid)] bg-transparent">add_box</span>
                  Thiết lập lịch mới
                </h3>
                <p class="text-xs text-[var(--sys-text-secondary)] font-bold italic mt-0.5 bg-transparent">Vui lòng điền thông tin buổi phỏng vấn</p>
              </div>
              <button @click="showCreateModal = false" class="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] hover:text-[var(--sys-brand-solid)] transition-all">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <div class="p-8 space-y-6 bg-transparent">
              <div class="bg-transparent text-left">
                <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2 ml-1 italic bg-transparent">Tên Ứng Viên</label>
                <input type="text" v-model="form.candidate" class="w-full px-5 py-4 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-black text-[var(--sys-text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all placeholder:text-[var(--sys-text-secondary)]/40" placeholder="Nhập tên ứng viên">
              </div>

              <div class="grid grid-cols-2 gap-6 bg-transparent">
                <div class="bg-transparent text-left">
                  <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2 ml-1 italic bg-transparent text-left">Ngày</label>
                  <input type="date" v-model="form.date" class="w-full px-5 py-4 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-black text-[var(--sys-text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all">
                </div>
                <div class="bg-transparent text-left">
                  <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2 ml-1 italic bg-transparent text-left">Giờ</label>
                  <input type="time" v-model="form.time" class="w-full px-5 py-4 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-black text-[var(--sys-text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all">
                </div>
              </div>

              <div class="bg-transparent text-left">
                <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2 ml-1 italic bg-transparent text-left">Người Phỏng Vấn</label>
                <Dropdown 
                  v-model="form.interviewerId"
                  :options="interviewerFormOptions"
                  class="w-full"
                />
              </div>

              <div class="bg-transparent text-left">
                <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2 ml-1 italic bg-transparent text-left">Địa điểm / Google Meet Link</label>
                <div class="relative group bg-transparent">
                  <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--sys-text-secondary)] transition-colors group-focus-within:text-[var(--sys-brand-solid)] bg-transparent">link</span>
                  <input type="text" v-model="form.link" class="w-full pl-12 pr-5 py-4 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-black text-[var(--sys-text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all placeholder:text-[var(--sys-text-secondary)]/40" placeholder="meet.google.com/...">
                </div>
              </div>

              <div class="pt-4 bg-transparent text-left">
                <button @click="saveSchedule" class="w-full py-4 bg-[var(--sys-brand-solid)] text-white rounded-2xl font-black hover:bg-[var(--sys-brand-hover)] shadow-xl shadow-[var(--sys-brand-solid-lch-30)] uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined">save</span>
                  Lưu lịch phỏng vấn
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Evaluate Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
      >
        <div v-if="showEvaluateModal" class="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div class="fixed inset-0 w-screen h-screen bg-[var(--sys-bg-canvas)]/60 z-[9999] overflow-hidden backdrop-blur-md" @click="showEvaluateModal = false"></div>
          <div class="relative z-[10000] bg-[var(--sys-bg-surface)] w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col transform transition-all text-left border border-[var(--sys-border-subtle)]">
            <div class="px-8 py-6 border-b border-[var(--sys-border-subtle)] flex items-center justify-between bg-transparent">
              <h3 class="text-xl font-black text-[var(--sys-text-primary)] flex items-center gap-2 bg-transparent italic uppercase tracking-tight">
                <span class="material-symbols-outlined text-[var(--sys-brand-solid)] bg-transparent">rate_review</span>
                Đánh giá phỏng vấn
              </h3>
              <button @click="showEvaluateModal = false" class="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] hover:text-[var(--sys-brand-solid)] transition-all">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <div class="p-8 space-y-6 bg-transparent">
              <div class="p-5 bg-[var(--sys-bg-hover)] rounded-2xl border border-[var(--sys-border-subtle)] flex items-center justify-between">
                <div class="bg-transparent text-left">
                  <span class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1 italic bg-transparent">Ứng viên</span>
                  <span class="text-sm font-black text-[var(--sys-text-primary)] uppercase tracking-tight bg-transparent">{{ selectedCandidateToEvaluate }}</span>
                </div>
                <div class="w-12 h-12 rounded-2xl bg-[var(--sys-bg-surface)] border border-[var(--sys-border-subtle)] flex items-center justify-center shadow-sm">
                  <span class="material-symbols-outlined text-[var(--sys-text-secondary)]">person</span>
                </div>
              </div>

              <div class="bg-transparent text-left">
                <label class="block text-[10px] font-black text-[var(--sys-text-secondary)] uppercase tracking-widest mb-2 ml-1 italic bg-transparent text-left">Nhận xét chi tiết</label>
                <textarea class="w-full px-5 py-4 bg-[var(--sys-bg-hover)] border border-[var(--sys-border-subtle)] rounded-2xl text-sm font-black text-[var(--sys-text-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--sys-brand-solid)]/10 focus:border-[var(--sys-brand-solid)] transition-all resize-none placeholder:text-[var(--sys-text-secondary)]/40" rows="4" placeholder="Nhập nhận xét chi tiết..."></textarea>
              </div>

              <div class="flex items-center gap-8 px-2 bg-transparent text-left">
                <label class="flex items-center gap-3 cursor-pointer group bg-transparent">
                  <input type="radio" name="passStatus" class="w-5 h-5 text-[var(--sys-success-text)] focus:ring-[var(--sys-success-solid)] border-[var(--sys-border-subtle)] bg-[var(--sys-bg-hover)]">
                  <span class="text-sm font-black text-[var(--sys-success-text)] uppercase tracking-widest italic group-hover:translate-x-1 transition-transform bg-transparent">PASS</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer group bg-transparent">
                  <input type="radio" name="passStatus" class="w-5 h-5 text-[var(--sys-danger-text)] focus:ring-[var(--sys-danger-solid)] border-[var(--sys-border-subtle)] bg-[var(--sys-bg-hover)]">
                  <span class="text-sm font-black text-[var(--sys-danger-text)] uppercase tracking-widest italic group-hover:translate-x-1 transition-transform bg-transparent">FAIL</span>
                </label>
              </div>

              <div class="pt-4 bg-transparent">
                <button @click="saveEvaluation" class="w-full py-4 bg-[var(--sys-text-primary)] text-[var(--sys-bg-surface)] rounded-2xl font-black hover:opacity-90 shadow-xl shadow-[var(--sys-text-primary-lch-30)] uppercase tracking-[0.2em] text-xs transition-all">
                  Lưu kết quả & Chốt hồ sơ
                </button>
              </div>
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

const showCreateModal = ref(false);
const showEvaluateModal = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const selectedCandidateToEvaluate = ref('');

const form = ref({
  candidate: '',
  date: '',
  time: '',
  interviewerId: '',
  link: ''
});

// Filter States
const currentView = ref('calendar'); // 'calendar' or 'list'
const filterStatus = ref('');
const filterInterviewer = ref('');

const statusOptions = [
  { label: 'Trạng thái (Tất cả)', value: '' },
  { label: 'Sắp diễn ra', value: 'Sắp diễn ra' },
  { label: 'Đã xong', value: 'Đã xong' },
  { label: 'Đã hủy', value: 'Đã hủy' }
];

const interviewerOptions = computed(() => [
  { label: 'Người phỏng vấn (Tất cả)', value: '' },
  ...danhSachNhanSu.value.map(ns => ({ label: ns.name, value: ns.id }))
]);

const interviewerFormOptions = computed(() => [
  { label: 'Chọn nhân sự...', value: '' },
  ...danhSachNhanSu.value.map(ns => ({ label: `${ns.name} - ${ns.role}`, value: ns.id }))
]);

// Dynamic HR Data
const danhSachNhanSu = ref([
  { id: '1', name: 'Hà Duy Kiên', role: 'Tech Lead' },
  { id: '2', name: 'Phạm Minh Đức', role: 'HR Manager' },
  { id: '3', name: 'Lê Tuyết Mai', role: 'Senior PM' },
  { id: '4', name: 'Trần Văn Hoàng', role: 'HR Specialist' },
  { id: '5', name: 'Nguyễn Thị Hương', role: 'Engineering Manager' }
]);

// Helper to look up name by ID
const getInterviewerName = (id) => {
  const hr = danhSachNhanSu.value.find(p => p.id === id);
  return hr ? hr.name : 'Chưa phân công';
};

// Mock Interview Data
const interviewList = ref([
  { id: 1, candidate: 'Nguyễn Văn A', date: '15/10/2023', time: '09:00', interviewerId: '1', status: 'Sắp diễn ra', link: 'meet.google.co/abc' },
  { id: 2, candidate: 'Lê Văn C', date: '14/10/2023', time: '14:30', interviewerId: '3', status: 'Đã xong', link: 'Phòng họp 1' },
  { id: 3, candidate: 'Hoàng Thị E', date: '13/10/2023', time: '10:00', interviewerId: '2', status: 'Đã hủy', link: 'meet.google.co/xyz' },
  { id: 4, candidate: 'Đinh Tuấn Vũ', date: '16/10/2023', time: '13:00', interviewerId: '1', status: 'Sắp diễn ra', link: 'meet.google.co/iop' },
  { id: 5, candidate: 'Bùi Anh Đào', date: '12/10/2023', time: '09:30', interviewerId: '5', status: 'Đã xong', link: 'Phòng họp 2' }
]);

const filteredInterviews = computed(() => {
  return interviewList.value.filter(item => {
    const matchStatus = filterStatus.value ? item.status === filterStatus.value : true;
    const matchInterviewer = filterInterviewer.value ? item.interviewerId === filterInterviewer.value : true;
    return matchStatus && matchInterviewer;
  });
});

const getStatusBadgeClass = (status) => {
  switch(status) {
    case 'Sắp diễn ra': return 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)]';
    case 'Đã xong': return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]';
    case 'Đã hủy': return 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)]/50 border-[var(--sys-border-subtle)]';
    default: return 'bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] border-[var(--sys-border-subtle)]';
  }
};

const saveSchedule = async () => {
  if (!form.value.candidate || !form.value.date || !form.value.time) {
    await showAlert('Thiếu thông tin', 'Vui lòng nhập đầy đủ thông tin ứng viên và thời gian phỏng vấn!');
    return;
  }
  showCreateModal.value = false;
  triggerToast('Lịch phỏng vấn đã được tạo thành công!');
  clearForm();
};

const clearForm = () => {
  form.value = { candidate: '', date: '', time: '', interviewerId: '', link: '' };
};

const triggerToast = (msg) => {
  toastMessage.value = msg;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const openEvaluateModal = (candidateName) => {
  selectedCandidateToEvaluate.value = candidateName;
  showEvaluateModal.value = true;
};

const saveEvaluation = () => {
  showEvaluateModal.value = false;
  triggerToast('Dữ liệu đánh giá đã được lưu vào hệ thống!');
};

const handleCancelInterview = async (interview) => {
  const confirmed = await showConfirm(
    'Hủy lịch phỏng vấn',
    `Bạn có chắc chắn muốn hủy buổi phỏng vấn với ứng viên ${interview.candidate} không?`
  );
  if (confirmed) {
    interview.status = 'Đã hủy';
    triggerToast('Lịch phỏng vấn đã được hủy thành công.');
  }
};
</script>

<style scoped>
/* Any specific local styles */
</style>
