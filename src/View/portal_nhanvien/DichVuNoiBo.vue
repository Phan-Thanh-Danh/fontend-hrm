<template>
  <div class="internal-services-page min-h-screen bg-[var(--sys-bg-page)] text-[var(--sys-text-primary)] p-4 md:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto space-y-6 bg-transparent">
      
      <!-- Header Area -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left">
        <div class="bg-transparent text-left">
          <h1 class="text-xl font-semibold text-[var(--sys-text-primary)] tracking-tight m-0">Dịch vụ nội bộ & Hỗ trợ kỹ thuật</h1>
          <p class="text-[13px] text-[var(--sys-text-secondary)] mt-0.5">Gửi yêu cầu hỗ trợ thiết bị, văn phòng và các dịch vụ hành chính trực tuyến.</p>
        </div>
        <button
          @click="openModal"
          class="h-11 px-6 bg-[var(--sys-brand-solid)] text-white rounded-md font-bold text-[13px] uppercase tracking-wide hover:brightness-95 transition-all flex items-center gap-2 shadow-sm shrink-0 active:scale-95"
        >
          <span class="material-symbols-outlined text-[20px]">add_circle</span>
          Tạo Ticket hỗ trợ
        </button>
      </div>

      <!-- Metrics Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-transparent">
        <!-- Ticket Statistics -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-[var(--sys-border-subtle)] flex items-center gap-5 group hover:border-[var(--sys-brand-solid)] transition-all">
          <div class="w-12 h-12 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center shrink-0 border border-[var(--sys-brand-border)] group-hover:bg-[var(--sys-brand-solid)] group-hover:text-white transition-all">
            <span class="material-symbols-outlined text-[24px]">confirmation_number</span>
          </div>
          <div>
            <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide opacity-60">Tổng Ticket đã tạo</p>
            <h3 class="text-3xl font-bold text-[var(--sys-text-primary)] leading-tight">{{ tickets.length }}</h3>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-[var(--sys-border-subtle)] flex items-center gap-5 group hover:border-[var(--sys-warning-border)] transition-all">
          <div class="w-12 h-12 rounded-md bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] flex items-center justify-center shrink-0 border border-[var(--sys-warning-border)] group-hover:bg-[var(--sys-warning-solid)] group-hover:text-white transition-all">
            <span class="material-symbols-outlined text-[24px]">pending</span>
          </div>
          <div>
            <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide opacity-60">Yêu cầu đang xử lý</p>
            <h3 class="text-3xl font-bold text-[var(--sys-text-primary)] leading-tight">{{ tickets.filter(t => t.status === 'Đang xử lý').length }}</h3>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm border border-[var(--sys-border-subtle)] flex items-center gap-5 group hover:border-[var(--sys-success-border)] transition-all">
          <div class="w-12 h-12 rounded-md bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] flex items-center justify-center shrink-0 border border-[var(--sys-success-border)] group-hover:bg-[var(--sys-success-solid)] group-hover:text-white transition-all">
            <span class="material-symbols-outlined text-[24px]">check_circle</span>
          </div>
          <div>
            <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-wide opacity-60">Đã hoàn thành bàn giao</p>
            <h3 class="text-3xl font-bold text-[var(--sys-text-primary)] leading-tight">{{ tickets.filter(t => t.status === 'Hoàn thành').length }}</h3>
          </div>
        </div>
      </div>

      <!-- Ticket List Section -->
      <div class="bg-white rounded-lg shadow-sm border border-[var(--sys-border-subtle)] overflow-hidden flex flex-col">
        <div class="px-5 py-4 border-b border-[var(--sys-border-subtle)] flex justify-between items-center bg-[var(--sys-bg-page)]/50">
          <h2 class="text-sm font-semibold text-[var(--sys-text-primary)] uppercase tracking-wide m-0 flex items-center gap-2">
            <span class="material-symbols-outlined text-[var(--sys-brand-solid)] text-[22px]">list_alt</span>
            Tiến độ xử lý & Lịch sử hỗ trợ
          </h2>
          <div class="relative group hidden sm:block">
            <span class="absolute inset-y-0 left-3 flex items-center text-[var(--sys-text-secondary)] opacity-50 group-focus-within:text-[var(--sys-brand-solid)] transition-colors">
              <span class="material-symbols-outlined text-[18px]">search</span>
            </span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Tìm kiếm mã Ticket..."
              class="w-64 h-9 pl-10 pr-4 rounded-md border border-[var(--sys-border-strong)] text-[12px] font-medium outline-none focus:border-[var(--sys-brand-solid)] shadow-sm transition-all placeholder:text-[var(--sys-text-secondary)]/40 bg-white"
            >
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredTickets.length === 0" class="py-20 flex flex-col items-center justify-center text-center bg-transparent">
          <div class="w-20 h-20 rounded-lg bg-[var(--sys-bg-page)] flex items-center justify-center mb-6 border border-[var(--sys-border-subtle)] shadow-inner">
            <span class="material-symbols-outlined text-[40px] text-[var(--sys-text-disabled)] opacity-30">confirmation_number</span>
          </div>
          <h3 class="text-lg font-bold text-[var(--sys-text-primary)] mb-2 uppercase tracking-tight">Chưa có yêu cầu nào được khởi tạo</h3>
          <p class="text-[13px] font-medium text-[var(--sys-text-secondary)] max-w-sm mx-auto mb-8 opacity-70 leading-relaxed">Mọi yêu cầu hỗ trợ hoặc dịch vụ nội bộ của bạn sẽ được hiển thị và cập nhật tiến độ tự động tại đây.</p>
          <button
            @click="openModal"
            class="h-10 px-6 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-md font-bold text-[12px] uppercase tracking-wide hover:bg-[var(--sys-brand-solid)] hover:text-white transition-all border border-[var(--sys-brand-border)] flex items-center gap-2 active:scale-95"
          >
            Khởi tạo Ticket đầu tiên
            <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        <!-- Ticket Table -->
        <div v-else class="overflow-x-auto">
          <table class="w-full text-[13px]">
            <thead>
              <tr class="border-b border-[var(--sys-border-subtle)] bg-[var(--sys-bg-page)]/40">
                <th class="px-5 py-3 text-left font-bold text-[11px] text-[var(--sys-text-secondary)] uppercase tracking-wider">Mã Ticket</th>
                <th class="px-5 py-3 text-left font-bold text-[11px] text-[var(--sys-text-secondary)] uppercase tracking-wider">Tiêu đề</th>
                <th class="px-5 py-3 text-left font-bold text-[11px] text-[var(--sys-text-secondary)] uppercase tracking-wider">Loại dịch vụ</th>
                <th class="px-5 py-3 text-left font-bold text-[11px] text-[var(--sys-text-secondary)] uppercase tracking-wider">Mức độ</th>
                <th class="px-5 py-3 text-left font-bold text-[11px] text-[var(--sys-text-secondary)] uppercase tracking-wider">Ngày tạo</th>
                <th class="px-5 py-3 text-left font-bold text-[11px] text-[var(--sys-text-secondary)] uppercase tracking-wider">Trạng thái</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[var(--sys-border-subtle)]">
              <tr
                v-for="ticket in filteredTickets"
                :key="ticket.id"
                class="hover:bg-[var(--sys-bg-hover)] transition-colors"
              >
                <td class="px-5 py-3.5 font-mono text-[12px] text-[var(--sys-brand-solid)] font-semibold">{{ ticket.id }}</td>
                <td class="px-5 py-3.5 font-medium text-[var(--sys-text-primary)] max-w-[200px] truncate">{{ ticket.title }}</td>
                <td class="px-5 py-3.5 text-[var(--sys-text-secondary)]">{{ ticket.category }}</td>
                <td class="px-5 py-3.5">
                  <span :class="getPriorityClass(ticket.priority)" class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide">
                    {{ ticket.priority }}
                  </span>
                </td>
                <td class="px-5 py-3.5 text-[var(--sys-text-secondary)]">{{ ticket.date }}</td>
                <td class="px-5 py-3.5">
                  <span :class="getStatusClass(ticket.status)" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide">
                    <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(ticket.status)"></span>
                    {{ ticket.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════════════════════════════
       POPUP / MODAL: TẠO TICKET HỖ TRỢ
  ══════════════════════════════════════════════════ -->
  <Transition name="modal-fade">
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <Transition name="modal-slide">
        <div v-if="showModal" class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title">

          <!-- Modal Header -->
          <div class="modal-header">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-md bg-[var(--sys-brand-soft)] border border-[var(--sys-brand-border)] flex items-center justify-center">
                <span class="material-symbols-outlined text-[20px] text-[var(--sys-brand-solid)]">support_agent</span>
              </div>
              <div>
                <h2 id="modal-title" class="text-[15px] font-bold text-[var(--sys-text-primary)] m-0 leading-tight">Tạo Ticket hỗ trợ</h2>
                <p class="text-[11px] text-[var(--sys-text-secondary)] m-0 opacity-70">Điền thông tin yêu cầu bên dưới</p>
              </div>
            </div>
            <button @click="closeModal" class="modal-close-btn" aria-label="Đóng popup">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            
            <!-- Row 1: Tiêu đề yêu cầu -->
            <div class="form-group">
              <label class="form-label" for="ticket-title">
                Tiêu đề yêu cầu <span class="text-[var(--sys-danger-solid)]">*</span>
              </label>
              <input
                id="ticket-title"
                v-model="form.title"
                type="text"
                placeholder="Nhập tiêu đề ngắn gọn mô tả vấn đề..."
                class="form-input"
                :class="{ 'border-[var(--sys-danger-solid)] focus:border-[var(--sys-danger-solid)]': errors.title }"
              />
              <p v-if="errors.title" class="form-error">{{ errors.title }}</p>
            </div>

            <!-- Row 2: Loại dịch vụ + Mức độ ưu tiên -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="form-group">
                <label class="form-label" for="ticket-category">
                  Loại dịch vụ <span class="text-[var(--sys-danger-solid)]">*</span>
                </label>
                <div class="relative">
                  <select
                    id="ticket-category"
                    v-model="form.category"
                    class="form-input form-select-custom"
                    :class="{ 'border-[var(--sys-danger-solid)]': errors.category }"
                  >
                    <option value="" disabled>Chọn loại dịch vụ...</option>
                    <option value="Hỗ trợ IT & Thiết bị">Hỗ trợ IT & Thiết bị</option>
                    <option value="Hành chính & Văn phòng">Hành chính & Văn phòng</option>
                    <option value="Phần mềm & Tài khoản">Phần mềm & Tài khoản</option>
                    <option value="Cơ sở hạ tầng">Cơ sở hạ tầng</option>
                    <option value="Nhân sự & Phúc lợi">Nhân sự & Phúc lợi</option>
                    <option value="Khác">Khác</option>
                  </select>
                  <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--sys-text-secondary)] opacity-60">
                    <span class="material-symbols-outlined text-[18px]">expand_more</span>
                  </span>
                </div>
                <p v-if="errors.category" class="form-error">{{ errors.category }}</p>
              </div>

              <div class="form-group">
                <label class="form-label" for="ticket-priority">
                  Mức độ ưu tiên <span class="text-[var(--sys-danger-solid)]">*</span>
                </label>
                <div class="relative">
                  <select
                    id="ticket-priority"
                    v-model="form.priority"
                    class="form-input form-select-custom"
                    :class="{ 'border-[var(--sys-danger-solid)]': errors.priority }"
                  >
                    <option value="" disabled>Chọn mức độ...</option>
                    <option value="Thấp">Thấp</option>
                    <option value="Trung bình">Trung bình</option>
                    <option value="Cao">Cao</option>
                    <option value="Khẩn cấp">Khẩn cấp</option>
                  </select>
                  <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--sys-text-secondary)] opacity-60">
                    <span class="material-symbols-outlined text-[18px]">expand_more</span>
                  </span>
                </div>
                <p v-if="errors.priority" class="form-error">{{ errors.priority }}</p>
              </div>
            </div>

            <!-- Row 3: Phòng ban + Thiết bị liên quan -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="form-group">
                <label class="form-label" for="ticket-department">Phòng ban</label>
                <div class="relative">
                  <select id="ticket-department" v-model="form.department" class="form-input form-select-custom">
                    <option value="" disabled>Chọn phòng ban...</option>
                    <option value="Kế toán">Kế toán</option>
                    <option value="Nhân sự">Nhân sự</option>
                    <option value="IT">IT</option>
                    <option value="Kinh doanh">Kinh doanh</option>
                    <option value="Vận hành">Vận hành</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                  <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--sys-text-secondary)] opacity-60">
                    <span class="material-symbols-outlined text-[18px]">expand_more</span>
                  </span>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="ticket-asset">Thiết bị / Tài sản liên quan</label>
                <input
                  id="ticket-asset"
                  v-model="form.asset"
                  type="text"
                  placeholder="VD: Máy tính PC-NV-042, Máy in..."
                  class="form-input"
                />
              </div>
            </div>

            <!-- Row 4: Mô tả chi tiết -->
            <div class="form-group">
              <label class="form-label" for="ticket-description">
                Mô tả chi tiết vấn đề <span class="text-[var(--sys-danger-solid)]">*</span>
              </label>
              <textarea
                id="ticket-description"
                v-model="form.description"
                rows="4"
                placeholder="Mô tả rõ ràng vấn đề gặp phải, thời điểm xảy ra, và các bước đã thực hiện (nếu có)..."
                class="form-input resize-none"
                :class="{ 'border-[var(--sys-danger-solid)]': errors.description }"
              ></textarea>
              <div class="flex justify-between items-center mt-1">
                <p v-if="errors.description" class="form-error m-0">{{ errors.description }}</p>
                <span v-else class="text-[11px] text-[var(--sys-text-secondary)] opacity-50">{{ form.description.length }}/500 ký tự</span>
              </div>
            </div>

            <!-- Row 5: Thời gian mong muốn xử lý -->
            <div class="form-group">
              <label class="form-label" for="ticket-deadline">Thời gian cần xử lý trước</label>
              <input
                id="ticket-deadline"
                v-model="form.deadline"
                type="date"
                class="form-input"
                :min="todayStr"
              />
            </div>

            <!-- Priority indicator banner -->
            <Transition name="fade-priority">
              <div v-if="form.priority === 'Khẩn cấp'" class="flex items-start gap-3 p-3.5 rounded-md bg-[var(--sys-danger-soft)] border border-[var(--sys-danger-border)]">
                <span class="material-symbols-outlined text-[20px] text-[var(--sys-danger-solid)] shrink-0 mt-0.5">warning</span>
                <p class="text-[12px] text-[var(--sys-danger-text)] font-medium m-0 leading-relaxed">
                  Ticket khẩn cấp sẽ được chuyển ngay đến bộ phận phụ trách và xử lý trong vòng <strong>2 giờ làm việc</strong>. Vui lòng đảm bảo thông tin chính xác.
                </p>
              </div>
            </Transition>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button @click="closeModal" class="btn-cancel">
              Hủy bỏ
            </button>
            <button @click="submitTicket" class="btn-submit" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
              <span v-else class="material-symbols-outlined text-[18px]">send</span>
              {{ isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu' }}
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>

  <!-- Success Toast -->
  <Transition name="toast-slide">
    <div v-if="showToast" class="success-toast">
      <span class="material-symbols-outlined text-[20px] text-[var(--sys-success-solid)]">check_circle</span>
      <div>
        <p class="text-[13px] font-bold text-[var(--sys-text-primary)] m-0">Ticket đã được tạo thành công!</p>
        <p class="text-[12px] text-[var(--sys-text-secondary)] m-0 opacity-80">Mã: <span class="font-mono font-bold text-[var(--sys-brand-solid)]">{{ lastCreatedId }}</span></p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSupportStore } from '@/composables/useSupportStore'

// ── Shared Store ───────────────────────────────────────
const store = useSupportStore()
const tickets = store.tickets

// ── State ──────────────────────────────────────────────
const showModal = ref(false)
const showToast = ref(false)
const isSubmitting = ref(false)
const lastCreatedId = ref('')
const searchQuery = ref('')

// ── Form State ─────────────────────────────────────────
const defaultForm = () => ({
  title: '',
  category: '',
  priority: '',
  department: '',
  asset: '',
  description: '',
  deadline: '',
})

const form = ref(defaultForm())
const errors = ref({})

// ── Helpers ────────────────────────────────────────────
const todayStr = new Date().toISOString().split('T')[0]

const filteredTickets = computed(() => {
  if (!searchQuery.value.trim()) return store.tickets.value
  const q = searchQuery.value.toLowerCase()
  return store.tickets.value.filter(t =>
    t.id.toLowerCase().includes(q) ||
    t.title.toLowerCase().includes(q) ||
    t.category.toLowerCase().includes(q)
  )
})

// ── Modal Controls ─────────────────────────────────────
function openModal() {
  form.value = defaultForm()
  errors.value = {}
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  showModal.value = false
  document.body.style.overflow = ''
}

// ── Validation ─────────────────────────────────────────
function validate() {
  const e = {}
  if (!form.value.title.trim()) e.title = 'Vui lòng nhập tiêu đề yêu cầu.'
  if (!form.value.category) e.category = 'Vui lòng chọn loại dịch vụ.'
  if (!form.value.priority) e.priority = 'Vui lòng chọn mức độ ưu tiên.'
  if (!form.value.description.trim()) e.description = 'Vui lòng mô tả chi tiết vấn đề.'
  else if (form.value.description.trim().length < 20) e.description = 'Mô tả cần ít nhất 20 ký tự.'
  errors.value = e
  return Object.keys(e).length === 0
}

// ── Submit ─────────────────────────────────────────────
async function submitTicket() {
  if (!validate()) return

  isSubmitting.value = true
  // Simulate API delay
  await new Promise(r => setTimeout(r, 900))

  const newId = store.addTicket({
    title: form.value.title,
    category: form.value.category,
    priority: form.value.priority,
    description: form.value.description,
    deadline: form.value.deadline,
    asset: form.value.asset,
  })

  lastCreatedId.value = newId
  isSubmitting.value = false

  closeModal()
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 4000)
}

// ── Badge Helpers ──────────────────────────────────────
function getPriorityClass(p) {
  switch (p) {
    case 'Khẩn cấp': return 'bg-[var(--sys-danger-soft)] text-[var(--sys-danger-text)] border border-[var(--sys-danger-border)]'
    case 'Cao': return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border border-[var(--sys-warning-border)]'
    case 'Trung bình': return 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-soft-text)] border border-[var(--sys-brand-border)]'
    default: return 'bg-[var(--sys-bg-active)] text-[var(--sys-text-secondary)] border border-[var(--sys-border-strong)]'
  }
}

function getStatusClass(s) {
  switch (s) {
    case 'Hoàn thành': return 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)]'
    case 'Đang xử lý': return 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)]'
    case 'Mới': return 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-soft-text)]'
    default: return 'bg-[var(--sys-bg-active)] text-[var(--sys-text-secondary)]'
  }
}

function getStatusDotClass(s) {
  switch (s) {
    case 'Hoàn thành': return 'bg-[var(--sys-success-solid)]'
    case 'Đang xử lý': return 'bg-[var(--sys-warning-solid)]'
    case 'Mới': return 'bg-[var(--sys-brand-solid)]'
    default: return 'bg-[var(--sys-text-disabled)]'
  }
}
</script>

<style scoped>
/* ─── Page ─────────────────────────────────────────── */
.internal-services-page {
  background-color: var(--sys-bg-page);
}

/* ─── Modal Overlay ──────────────────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1050;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

/* ─── Modal Panel ────────────────────────────────────── */
.modal-panel {
  background: var(--sys-bg-surface, #ffffff);
  border-radius: 12px;
  border: 1px solid var(--sys-border-subtle);
  box-shadow: 0 24px 48px -8px rgba(15, 23, 42, 0.22), 0 8px 16px -4px rgba(15, 23, 42, 0.12);
  width: 100%;
  max-width: 620px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ─── Modal Header ───────────────────────────────────── */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.125rem 1.5rem;
  border-bottom: 1px solid var(--sys-border-subtle);
  background: var(--sys-bg-page);
  flex-shrink: 0;
}

.modal-close-btn {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid var(--sys-border-subtle);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--sys-text-secondary);
  cursor: pointer;
  transition: all 0.15s ease;
}

.modal-close-btn:hover {
  background: var(--sys-bg-hover);
  color: var(--sys-text-primary);
  border-color: var(--sys-border-strong);
}

/* ─── Modal Body ─────────────────────────────────────── */
.modal-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
  overflow-y: auto;
  flex: 1;
}

.modal-body::-webkit-scrollbar {
  width: 4px;
}

.modal-body::-webkit-scrollbar-track {
  background: transparent;
}

.modal-body::-webkit-scrollbar-thumb {
  background: var(--sys-border-strong);
  border-radius: 99px;
}

/* ─── Modal Footer ───────────────────────────────────── */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--sys-border-subtle);
  background: var(--sys-bg-page);
  flex-shrink: 0;
}

/* ─── Form Helpers ───────────────────────────────────── */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.form-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--sys-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.form-input {
  height: 40px;
  padding: 0 0.875rem;
  border-radius: 6px;
  border: 1px solid var(--sys-border-strong);
  background: var(--sys-bg-surface, #ffffff);
  color: var(--sys-text-primary);
  font-size: 13px;
  font-weight: 500;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
}

.form-input:focus {
  border-color: var(--sys-brand-solid);
  box-shadow: 0 0 0 3px var(--sys-ring-focus);
}

.form-input::placeholder {
  color: var(--sys-text-secondary);
  opacity: 0.45;
  font-weight: 400;
}

textarea.form-input {
  height: auto;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  line-height: 1.6;
}

.form-select-custom {
  appearance: none;
  -webkit-appearance: none;
  padding-right: 2.25rem;
  cursor: pointer;
}

.form-error {
  font-size: 11px;
  font-weight: 600;
  color: var(--sys-danger-solid);
  margin: 0;
}

/* ─── Buttons ────────────────────────────────────────── */
.btn-cancel {
  height: 40px;
  padding: 0 1.25rem;
  border-radius: 6px;
  border: 1px solid var(--sys-border-strong);
  background: transparent;
  color: var(--sys-text-secondary);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-cancel:hover {
  background: var(--sys-bg-hover);
  color: var(--sys-text-primary);
}

.btn-submit {
  height: 40px;
  padding: 0 1.5rem;
  border-radius: 6px;
  border: none;
  background: var(--sys-brand-solid);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.15s ease;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.btn-submit:hover:not(:disabled) {
  background: var(--sys-brand-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
}

.btn-submit:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: none;
}

.btn-submit:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

/* ─── Success Toast ──────────────────────────────────── */
.success-toast {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 1100;
  background: var(--sys-bg-surface, #ffffff);
  border: 1px solid var(--sys-success-border);
  border-left: 4px solid var(--sys-success-solid);
  border-radius: 8px;
  padding: 0.875rem 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.15);
  max-width: 320px;
}

/* ─── Transitions ────────────────────────────────────── */

/* Overlay fade */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Panel slide-up */
.modal-slide-enter-active {
  transition: all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-slide-leave-active {
  transition: all 0.18s ease-in;
}
.modal-slide-enter-from {
  opacity: 0;
  transform: translateY(24px) scale(0.97);
}
.modal-slide-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

/* Priority banner */
.fade-priority-enter-active,
.fade-priority-leave-active {
  transition: all 0.2s ease;
}
.fade-priority-enter-from,
.fade-priority-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Toast */
.toast-slide-enter-active {
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-slide-leave-active {
  transition: all 0.25s ease-in;
}
.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* Spin animation for loading */
@keyframes spin {
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 0.8s linear infinite;
}

/* ─── Dark mode extras ───────────────────────────────── */
:global(html.dark) .modal-panel {
  background: oklch(0.22 0.015 265) !important;
  border-color: oklch(0.3 0.025 265) !important;
}
:global(html.dark) .modal-header,
:global(html.dark) .modal-footer {
  background: oklch(0.19 0.012 265) !important;
  border-color: oklch(0.3 0.025 265) !important;
}
:global(html.dark) .form-input {
  background: oklch(0.25 0.02 265) !important;
  border-color: oklch(0.35 0.025 265) !important;
  color: oklch(0.91 0.01 265) !important;
}
:global(html.dark) .form-input:focus {
  border-color: oklch(0.65 0.15 260) !important;
  box-shadow: 0 0 0 3px oklch(0.65 0.15 260 / 0.2) !important;
}
:global(html.dark) .success-toast {
  background: oklch(0.22 0.015 265) !important;
}
</style>
